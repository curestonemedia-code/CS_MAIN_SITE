import type { VideoCategory, YoutubeVideo } from "@/lib/youtubeVideos";

export type SortOrder = "newest" | "oldest" | "most_viewed";

export const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "most_viewed", label: "Most Viewed" },
];

export const PAGE_SIZE = 24;
export const MOBILE_PAGE_SIZE = 7;

export function countVideosByCategory(videos: YoutubeVideo[]): Record<VideoCategory, number> {
  return videos.reduce<Record<VideoCategory, number>>(
    (acc, v) => {
      for (const c of v.categories) acc[c] = (acc[c] ?? 0) + 1;
      return acc;
    },
    {
      size: 0,
      diet: 0,
      ot: 0,
      rirs: 0,
      pcnl: 0,
      ursl: 0,
      eswl: 0,
      prevention: 0,
      symptoms: 0,
      recovery: 0,
      patient_stories: 0,
      myths_facts: 0,
      urology_other: 0,
      other: 0,
    }
  );
}

export function sortVideos(videos: YoutubeVideo[], sort: SortOrder): YoutubeVideo[] {
  const copy = [...videos];
  if (sort === "most_viewed") copy.sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0));
  else if (sort === "oldest") copy.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
  else copy.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return copy;
}
