import { getGroq } from "./groq.ts";
import { extractJsonObject, nvidiaChat } from "./nvidia.ts";
import { sanityMutate } from "./sanity.ts";
import { fetchAllVideosForReclassification, fetchKnownVideoIds } from "./youtubeVideos.ts";
import type { SizeSubcategory, VideoCategory } from "./youtubeVideos.ts";

const CHANNEL_HANDLE = "@cure_stone";
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

// Keep this list in sync with CATEGORY_OPTIONS in
// sanity-cms/schemaTypes/youtubeVideo.ts (separate repo/package, not shared
// — a taxonomy change means editing both).
const CATEGORY_VALUES: VideoCategory[] = [
  "size",
  "diet",
  "ot",
  "rirs",
  "pcnl",
  "ursl",
  "eswl",
  "prevention",
  "symptoms",
  "recovery",
  "patient_stories",
  "myths_facts",
  "urology_other",
  "other",
];
const SIZE_SUBCATEGORY_VALUES: SizeSubcategory[] = ["small_under_5mm", "medium_5_10mm", "large_over_10mm"];

interface RawVideoDetails {
  ytId: string;
  title: string;
  /** Classifier input only — never persisted to Sanity. */
  description: string;
  publishedAt: string;
  durationIso?: string;
  durationSeconds?: number;
  viewCount?: number;
}

interface Classification {
  categories: VideoCategory[];
  sizeSubcategory?: SizeSubcategory;
  tags: string[];
}

export interface SyncSummary {
  totalOnChannel: number;
  newCount: number;
  classifiedAsOther: number;
  errors: string[];
}

function requireApiKey(): string {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error("YOUTUBE_API_KEY is not set");
  return key;
}

/** Parses an ISO 8601 duration ("PT6M29S") into total seconds. */
export function isoDurationToSeconds(iso?: string): number | undefined {
  if (!iso) return undefined;
  const match = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return undefined;
  const [, h, m, s] = match;
  return (Number(h) || 0) * 3600 + (Number(m) || 0) * 60 + (Number(s) || 0);
}

export async function resolveUploadsPlaylistId(handle: string = CHANNEL_HANDLE): Promise<string> {
  const url = new URL(`${YOUTUBE_API_BASE}/channels`);
  url.searchParams.set("part", "contentDetails");
  url.searchParams.set("forHandle", handle.replace(/^@/, ""));
  url.searchParams.set("key", requireApiKey());

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`channels.list failed with ${res.status}: ${await res.text()}`);

  const data = await res.json();
  const playlistId = data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!playlistId) throw new Error(`Could not resolve uploads playlist for channel "${handle}"`);
  return playlistId;
}

export async function fetchAllUploadedVideoIds(playlistId: string): Promise<string[]> {
  const ids: string[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(`${YOUTUBE_API_BASE}/playlistItems`);
    url.searchParams.set("part", "contentDetails");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", requireApiKey());
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`playlistItems.list failed with ${res.status}: ${await res.text()}`);

    const data = await res.json();
    for (const item of data.items ?? []) {
      const id = item?.contentDetails?.videoId;
      if (id) ids.push(id);
    }
    pageToken = data.nextPageToken;
  } while (pageToken);

  return ids;
}

export async function fetchVideoDetails(ids: string[]): Promise<RawVideoDetails[]> {
  const results: RawVideoDetails[] = [];

  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);
    const url = new URL(`${YOUTUBE_API_BASE}/videos`);
    url.searchParams.set("part", "snippet,contentDetails,statistics");
    url.searchParams.set("id", batch.join(","));
    url.searchParams.set("key", requireApiKey());

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`videos.list failed with ${res.status}: ${await res.text()}`);

    const data = await res.json();
    for (const item of data.items ?? []) {
      const durationIso: string | undefined = item?.contentDetails?.duration;
      const viewCount = item?.statistics?.viewCount;
      results.push({
        ytId: item.id,
        title: item?.snippet?.title ?? "Untitled",
        description: (item?.snippet?.description ?? "").slice(0, 2000),
        publishedAt: item?.snippet?.publishedAt,
        durationIso,
        durationSeconds: isoDurationToSeconds(durationIso),
        viewCount: viewCount !== undefined ? Number(viewCount) : undefined,
      });
    }
  }

  return results;
}

const FALLBACK_CLASSIFICATION: Classification = { categories: ["other"], tags: [] };

// The classification model carries a large fixed "reasoning" cost per call
// regardless of prompt size, so classifying one video per call burns through
// a free-tier daily token budget almost immediately (hit in practice: ~270
// single-video calls exhausted a 200k-token/day quota on Groq). Batching
// many videos into one call amortizes that fixed cost. Kept smaller than
// Groq's working value (15) because the currently-available NVIDIA model is
// a lighter 11B model, which is more prone to malformed/truncated JSON on a
// long multi-category output — a smaller batch means a retry (or, worst
// case, a skip) costs fewer videos.
const CLASSIFY_BATCH_SIZE = 8;

export interface ClassifiableVideo {
  ytId: string;
  title: string;
  /** Optional — only available for freshly-crawled videos, never persisted. */
  description?: string;
}

const BATCH_SYSTEM_PROMPT = `You classify a batch of kidney-stone hospital YouTube videos into a fixed taxonomy for thecurestone.com. Return strict JSON only, matching this shape, nothing else:
{ "results": [ { "ytId": "string", "categories": ["string"], "sizeSubcategory": "small_under_5mm|medium_5_10mm|large_over_10mm|null", "tags": ["string"] } ] }

You will receive a JSON array of videos (ytId + title, sometimes a short description). Return exactly one result object per input video, matched by "ytId" — never skip one.

"categories" is an ARRAY — a video is often in scope for more than one bucket (e.g. a video about diet right after surgery is BOTH "diet" and "recovery"; a video about preventing recurrence after a 7mm stone surgery is "prevention", "size" AND "ot"). Include every bucket that genuinely applies, but do not pad it — most videos still belong to just one or two categories. Pick from exactly these values:
- "size": primarily about a specific kidney stone size or a size-driven treatment choice (e.g. "5mm stone", "13mm stone removal"). Only when this is included, set "sizeSubcategory" to the closest bucket: under 5mm -> small_under_5mm, 5-10mm -> medium_5_10mm, over 10mm -> large_over_10mm. If "size" is not included, sizeSubcategory MUST be null.
- "diet": nutrition, food, hydration, foods to eat or avoid for kidney stones.
- "ot": surgery/procedure videos about kidney/ureter stones specifically (RIRS, PCNL, URSL, ESWL, DJ stent, operation theatre) — include "ot" alongside the specific procedure tag below, not instead of it.
- "rirs": specifically about RIRS (Retrograde Intra-Renal Surgery) — include both "ot" and "rirs" together.
- "pcnl": specifically about PCNL (Percutaneous Nephrolithotomy, incl. Mini-PCNL) — include both "ot" and "pcnl" together.
- "ursl": specifically about URSL/URS (Ureteroscopy / Ureterorenoscopy) — include both "ot" and "ursl" together.
- "eswl": specifically about ESWL (Extracorporeal Shock Wave Lithotripsy) — include both "ot" and "eswl" together.
- "prevention": advice on preventing stones forming or recurring (lifestyle, hydration habits, recurrence risk) — distinct from a one-off diet video.
- "symptoms": recognizing symptoms, pain, when to see a doctor, diagnosis (ultrasound/CT).
- "recovery": post-surgery care, recovery timeline, stent removal experience, aftercare tied to having just had a procedure.
- "patient_stories": patient testimonials or journeys told from the patient's perspective.
- "myths_facts": myth-busting or correcting common misconceptions.
- "urology_other": urology content NOT about kidney stones specifically — e.g. prostate (TURP, BPH), UTI, other urological conditions.
- "other": only when truly nothing else above applies.
- "tags": up to 4 short lowercase keywords drawn from the title/description (e.g. "rirs", "stent", "hydration") — freeform, but keep them short and relevant.
Never return a category outside the list above.`;

async function callClassifierModel(systemPrompt: string, userContent: string, maxTokens: number): Promise<string | null> {
  const nvidiaResult = await nvidiaChat(systemPrompt, userContent, maxTokens);
  if (nvidiaResult !== null) return nvidiaResult;

  const groq = getGroq();
  if (!groq) return null;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ],
    model: "openai/gpt-oss-20b",
    reasoning_effort: "low",
    temperature: 0.1,
    max_tokens: maxTokens,
    response_format: { type: "json_object" },
    stream: false,
  });

  return completion.choices[0]?.message?.content ?? null;
}

// IMPORTANT: this returns a *partial* map on failure — a video missing from
// the result means "couldn't classify it", not "classify it as other". Never
// fill in FALLBACK_CLASSIFICATION here. The two callers below need
// different defaults for a missing entry (a brand-new video being created
// is fine defaulting to "other"; an existing video being re-classified must
// be left untouched) — baking a default in at this layer previously caused
// a single malformed model response to wipe 1,450 already-correct
// categories down to "other" in one patch. Never repeat that.
async function classifyBatchOnce(videos: ClassifiableVideo[]): Promise<Map<string, Classification>> {
  const result = new Map<string, Classification>();

  const userContent = JSON.stringify(
    videos.map((v) => ({ ytId: v.ytId, title: v.title, description: v.description?.slice(0, 200) }))
  );
  const raw = await callClassifierModel(BATCH_SYSTEM_PROMPT, userContent, 350 * videos.length);
  if (!raw) throw new Error("no classifier provider configured (set NVIDIA_API_KEY or GROQ_API_KEY)");

  const parsed = JSON.parse(extractJsonObject(raw)) as {
    results?: Array<{ ytId?: string; categories?: unknown; sizeSubcategory?: string | null; tags?: unknown }>;
  };

  for (const item of parsed.results ?? []) {
    if (!item.ytId) continue;

    const rawCategories = Array.isArray(item.categories) ? item.categories : [];
    const categories = rawCategories.filter((c): c is VideoCategory => CATEGORY_VALUES.includes(c as VideoCategory));
    const finalCategories = categories.length > 0 ? categories : (["other"] as VideoCategory[]);

    const sizeSubcategory: SizeSubcategory | undefined =
      finalCategories.includes("size") && SIZE_SUBCATEGORY_VALUES.includes(item.sizeSubcategory as SizeSubcategory)
        ? (item.sizeSubcategory as SizeSubcategory)
        : undefined;

    const tags = Array.isArray(item.tags)
      ? item.tags.filter((t): t is string => typeof t === "string").slice(0, 4)
      : [];

    result.set(item.ytId, { categories: finalCategories, sizeSubcategory, tags });
  }

  return result;
}

async function classifyBatch(videos: ClassifiableVideo[]): Promise<Map<string, Classification>> {
  // One retry before giving up on the whole batch — a transient malformed
  // response (truncation, a stray trailing comma) shouldn't cost a video
  // its classification when trying again usually just works.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      return await classifyBatchOnce(videos);
    } catch (error) {
      if (attempt === 2) {
        console.warn(
          `Batch classification failed for ${videos.length} video(s) after retry — leaving them unclassified (not touching existing data):`,
          error
        );
      }
    }
  }
  return new Map();
}

export async function classifyVideos(videos: ClassifiableVideo[]): Promise<Map<string, Classification>> {
  const combined = new Map<string, Classification>();
  const totalBatches = Math.ceil(videos.length / CLASSIFY_BATCH_SIZE);

  for (let i = 0; i < videos.length; i += CLASSIFY_BATCH_SIZE) {
    const batch = videos.slice(i, i + CLASSIFY_BATCH_SIZE);
    const batchResult = await classifyBatch(batch);
    for (const [ytId, classification] of batchResult) combined.set(ytId, classification);

    const batchNumber = i / CLASSIFY_BATCH_SIZE + 1;
    console.log(`Classified batch ${batchNumber}/${totalBatches} (${combined.size}/${videos.length} videos so far)`);
  }
  return combined;
}

export async function syncVideos(): Promise<SyncSummary> {
  const errors: string[] = [];

  const playlistId = await resolveUploadsPlaylistId();
  const [allIds, knownIds] = await Promise.all([fetchAllUploadedVideoIds(playlistId), fetchKnownVideoIds()]);

  const newIds = allIds.filter((id) => !knownIds.has(id));
  if (newIds.length === 0) {
    return { totalOnChannel: allIds.length, newCount: 0, classifiedAsOther: 0, errors };
  }

  const details = await fetchVideoDetails(newIds);
  const classifications = await classifyVideos(details);
  let classifiedAsOther = 0;

  const mutations = [];
  for (const video of details) {
    try {
      const classification = classifications.get(video.ytId) ?? FALLBACK_CLASSIFICATION;
      if (classification.categories.length === 1 && classification.categories[0] === "other") classifiedAsOther += 1;

      mutations.push({
        createOrReplace: {
          _id: `youtubeVideo-${video.ytId}`,
          _type: "youtubeVideo",
          ytId: video.ytId,
          title: video.title,
          publishedAt: video.publishedAt,
          durationIso: video.durationIso,
          durationSeconds: video.durationSeconds,
          viewCount: video.viewCount,
          categories: classification.categories,
          sizeSubcategory: classification.sizeSubcategory,
          tags: classification.tags,
          aiCategorized: true,
          isActive: true,
          syncedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      errors.push(`"${video.title}" (${video.ytId}): ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (mutations.length > 0) {
    await sanityMutate(mutations);
  }

  return { totalOnChannel: allIds.length, newCount: details.length, classifiedAsOther, errors };
}

export interface ReclassifySummary {
  candidateCount: number;
  changedCount: number;
  skippedEditorReviewed: number;
  skippedClassificationFailure: number;
}

/**
 * Full re-classification pass — used when the taxonomy itself changes (e.g.
 * going from one category per video to several, or adding new buckets),
 * since a video's *correct* categories can change even if its old single
 * category was already right. Skips any video an editor has manually
 * corrected (aiCategorized === false).
 */
export async function reclassifyAllVideos(): Promise<ReclassifySummary> {
  const all = await fetchAllVideosForReclassification();
  const candidates = all.filter((v) => v.aiCategorized !== false);
  const skippedEditorReviewed = all.length - candidates.length;

  if (candidates.length === 0) {
    return { candidateCount: 0, changedCount: 0, skippedEditorReviewed, skippedClassificationFailure: 0 };
  }

  const classifications = await classifyVideos(candidates.map((c) => ({ ytId: c.ytId, title: c.title })));

  const mutations = [];
  let skippedClassificationFailure = 0;
  for (const candidate of candidates) {
    const classification = classifications.get(candidate.ytId);
    if (!classification) {
      skippedClassificationFailure += 1;
      continue;
    }

    // `set` silently omits an undefined key rather than clearing it, so a
    // video reclassified away from "size" needs an explicit `unset` or its
    // old sizeSubcategory value would linger as stale data.
    const set: Record<string, unknown> = {
      categories: classification.categories,
      tags: classification.tags,
      syncedAt: new Date().toISOString(),
    };
    const unset: string[] = [];
    if (classification.sizeSubcategory) {
      set.sizeSubcategory = classification.sizeSubcategory;
    } else {
      unset.push("sizeSubcategory");
    }

    mutations.push({
      patch: { id: candidate._id, set, ...(unset.length ? { unset } : {}) },
    });
  }

  // Chunked rather than one giant mutate call — keeps a single bad batch's
  // blast radius small and gives visible progress on a 1000+ video run.
  const MUTATE_BATCH_SIZE = 200;
  for (let i = 0; i < mutations.length; i += MUTATE_BATCH_SIZE) {
    await sanityMutate(mutations.slice(i, i + MUTATE_BATCH_SIZE));
  }

  return { candidateCount: candidates.length, changedCount: mutations.length, skippedEditorReviewed, skippedClassificationFailure };
}
