// One-time backfill: the youtubeVideo schema gained a `viewCount` field
// after the initial 1,450-video crawl, so none of the existing documents
// have it. New syncs pick it up automatically (see fetchVideoDetails /
// syncVideos in youtubeSync.ts) — this just catches the existing backlog.
//
// Only ever patches the `viewCount` field — never touches categories, tags,
// or anything else. Safe to re-run any time to refresh view counts.
//
// Run with:
//
//   npm run backfill-view-counts

import { sanityFetch, sanityMutate } from "../src/lib/sanity.ts";
import { fetchVideoDetails } from "../src/lib/youtubeSync.ts";

async function main() {
  const videos = await sanityFetch<{ _id: string; ytId: string }[]>({
    query: `*[_type == "youtubeVideo"]{_id, ytId}`,
  });
  console.log(`Fetching view counts for ${videos.length} video(s)...`);

  const ytIdToDocId = new Map(videos.map((v) => [v.ytId, v._id]));
  const details = await fetchVideoDetails(videos.map((v) => v.ytId));

  const mutations = details
    .filter((d) => d.viewCount !== undefined)
    .map((d) => ({
      patch: { id: ytIdToDocId.get(d.ytId)!, set: { viewCount: d.viewCount } },
    }));

  const BATCH_SIZE = 200;
  for (let i = 0; i < mutations.length; i += BATCH_SIZE) {
    await sanityMutate(mutations.slice(i, i + BATCH_SIZE));
    console.log(`Patched ${Math.min(i + BATCH_SIZE, mutations.length)}/${mutations.length}...`);
  }

  console.log(`\nDone. ${mutations.length}/${videos.length} video(s) had a view count to store.`);
}

main().catch((err) => {
  console.error("Backfill failed:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
