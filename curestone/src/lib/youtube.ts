// Real uploadDate/duration for every YouTube video currently embedded
// anywhere on the site, pulled from each video's own YouTube watch page
// metadata. Google's video rich-result guidelines list uploadDate as a
// required property (https://developers.google.com/search/docs/appearance/structured-data/video),
// and a page with several embedded videos (e.g. a blog post) triggering one
// live fetch per video at build time was getting rate-limited/blocked on
// Vercel's build servers, silently dropping uploadDate and tripping Search
// Console's "Missing field 'uploadDate'" check. Checking this table first
// removes that dependency entirely for known videos; the live fetch below
// only runs as a fallback for a video ID that isn't in here yet.
//
// Adding a new video: run `npm run sync-video-meta` after adding its ytId
// anywhere in src/ — it scans the codebase for every video ID in use,
// fetches metadata (from your machine, not Vercel's build servers, which is
// exactly the environment that was getting blocked), and writes the new
// entries into this table for you. Never hand-edit uploadDate/duration.
export const KNOWN_VIDEO_META: Record<string, { uploadDate: string; duration: string }> = {
  K5va1bE282M: { uploadDate: "2024-06-08T09:01:46-07:00", duration: "PT20M21S" },
  qobqvzQ6za4: { uploadDate: "2022-11-28T03:30:08-08:00", duration: "PT1M12S" },
  aHsGua3WaVM: { uploadDate: "2026-01-24T07:45:00-08:00", duration: "PT10M18S" },
  "4FE-zSpLWPQ": { uploadDate: "2025-01-25T04:00:05-08:00", duration: "PT7M5S" },
  cQMDYm__gHM: { uploadDate: "2026-03-17T07:30:39-07:00", duration: "PT6M29S" },
  tNx0HcofMgc: { uploadDate: "2024-05-04T07:00:07-07:00", duration: "PT6M6S" },
  UL6rs2nAXsU: { uploadDate: "2022-10-29T04:30:06-07:00", duration: "PT3M41S" },
  "w-0pRk1MyUM": { uploadDate: "2022-04-08T20:49:49-07:00", duration: "PT5M31S" },
  ZIIGg4vRM5c: { uploadDate: "2025-08-05T06:45:04-07:00", duration: "PT1M26S" },
  du1GlfAni60: { uploadDate: "2025-06-24T06:01:11-07:00", duration: "PT1M42S" },
  nrotiPAChVY: { uploadDate: "2025-06-10T05:30:06-07:00", duration: "PT1M38S" },
  "6-KjjkLXmrU": { uploadDate: "2025-05-13T05:00:13-07:00", duration: "PT1M17S" },
  "oyxi-GYEs30": { uploadDate: "2025-04-01T05:17:52-07:00", duration: "PT1M7S" },
  m_l58PaJLjE: { uploadDate: "2025-03-25T03:30:31-07:00", duration: "PT1M39S" },
  Cd07UbuxVho: { uploadDate: "2024-10-08T06:30:07-07:00", duration: "PT1M32S" },
  y0vrA8T0q2g: { uploadDate: "2024-10-15T05:45:04-07:00", duration: "PT1M47S" },
  dQw4w9WgXcQ: { uploadDate: "2009-10-24T23:57:33-07:00", duration: "PT3M33S" },
  // -- sync-video-meta appends new entries below this line --
};

/**
 * Parses uploadDate/duration out of a YouTube watch page's own HTML. Shared
 * by the live-fetch fallback below and by scripts/sync-video-meta.ts, so the
 * two never drift into parsing the page differently.
 */
export function parseVideoMetaFromWatchHtml(html: string): { uploadDate?: string; duration?: string } {
  const uploadDate = html.match(/"uploadDate":"([^"]+)"/)?.[1];
  const lengthSeconds = html.match(/"lengthSeconds":"(\d+)"/)?.[1];
  let duration: string | undefined;
  if (lengthSeconds) {
    const total = parseInt(lengthSeconds, 10);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    duration = `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s}S`;
  }
  return { uploadDate, duration };
}

export async function fetchLiveVideoMeta(ytId: string): Promise<{ uploadDate?: string; duration?: string }> {
  const res = await fetch(`https://www.youtube.com/watch?v=${ytId}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
    next: { revalidate: 60 * 60 * 24 * 7 },
  });
  if (!res.ok) return {};
  return parseVideoMetaFromWatchHtml(await res.text());
}

export async function getYouTubeMeta(ytId: string): Promise<{ uploadDate?: string; duration?: string }> {
  const known = KNOWN_VIDEO_META[ytId];
  if (known) return known;

  // Reaching here means a video is embedded somewhere without an entry in
  // KNOWN_VIDEO_META — exactly the situation that used to fail silently on
  // Vercel. `npm run sync-video-meta` prevents this by populating the table
  // *before* a build ever runs; this warning exists so that if someone
  // skipped that step, the gap shows up loudly in build output instead of
  // only as a missing field discovered later in Search Console.
  console.warn(
    `[youtube.ts] "${ytId}" has no entry in KNOWN_VIDEO_META — falling back to a live fetch, ` +
      `which is unreliable on Vercel's build servers. Run \`npm run sync-video-meta\` and commit ` +
      `the result to fix this permanently.`
  );

  try {
    const meta = await fetchLiveVideoMeta(ytId);
    if (!meta.uploadDate) {
      console.warn(`[youtube.ts] Live fetch for "${ytId}" returned no uploadDate — VideoObject for this video will omit it.`);
    }
    return meta;
  } catch (err) {
    console.warn(`[youtube.ts] Live fetch for "${ytId}" failed:`, err);
    return {};
  }
}
