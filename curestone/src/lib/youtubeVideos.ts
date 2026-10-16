import { sanityFetch } from "./sanity.ts";

export type VideoCategory =
  | "size"
  | "diet"
  | "ot"
  | "rirs"
  | "pcnl"
  | "ursl"
  | "eswl"
  | "prevention"
  | "symptoms"
  | "recovery"
  | "patient_stories"
  | "myths_facts"
  | "urology_other"
  | "other";

export type SizeSubcategory = "small_under_5mm" | "medium_5_10mm" | "large_over_10mm";

export interface YoutubeVideo {
  _id: string;
  ytId: string;
  title: string;
  publishedAt: string;
  durationIso?: string;
  durationSeconds?: number;
  viewCount?: number;
  categories: VideoCategory[];
  sizeSubcategory?: SizeSubcategory;
  tags?: string[];
}

const videoFields = `
  _id,
  ytId,
  title,
  publishedAt,
  durationIso,
  durationSeconds,
  viewCount,
  categories,
  sizeSubcategory,
  tags
`;

export async function fetchActiveVideos(): Promise<YoutubeVideo[]> {
  return sanityFetch<YoutubeVideo[]>({
    query: `*[_type == "youtubeVideo" && isActive != false] | order(publishedAt desc){${videoFields}}`,
  });
}

export async function fetchKnownVideoIds(): Promise<Set<string>> {
  const ids = await sanityFetch<string[]>({
    query: `*[_type == "youtubeVideo"].ytId`,
  });
  return new Set(ids);
}

/**
 * Every stored video, for a full re-classification pass (used when the
 * taxonomy itself changes, e.g. going from single-category to multi-category
 * or adding new buckets — a per-video diff against "still other" doesn't
 * make sense here since a video's *correct* categories may have changed even
 * if it was already labeled something real). `aiCategorized` is included so
 * callers can skip any video an editor has manually corrected.
 */
export async function fetchAllVideosForReclassification(): Promise<
  { _id: string; ytId: string; title: string; aiCategorized?: boolean }[]
> {
  return sanityFetch<{ _id: string; ytId: string; title: string; aiCategorized?: boolean }[]>({
    query: `*[_type == "youtubeVideo"]{_id, ytId, title, aiCategorized}`,
  });
}
