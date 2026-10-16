// One-time (or manually re-run) backfill: crawls every video currently on
// the @cure_stone YouTube channel, classifies any not already in Sanity
// (Size/Diet/OT/Other + size subcategory + tags), and writes them via
// src/lib/youtubeSync.ts — the same module the recurring Vercel Cron job
// uses, so backfill and ongoing sync never drift into different logic.
//
// Run with:
//
//   npm run crawl-youtube-videos
//
// Requires YOUTUBE_API_KEY, SANITY_TOKEN and GROQ_API_KEY in .env (loaded
// via Node's --env-file flag, see package.json). Exits non-zero on a hard
// failure (missing/invalid API key, channel not found) so a broken setup
// is caught here rather than producing an empty video library.

import { syncVideos } from "../src/lib/youtubeSync.ts";

async function main() {
  console.log("Crawling @cure_stone's uploads...");
  const summary = await syncVideos();

  console.log(`\nFound ${summary.totalOnChannel} video(s) on the channel.`);
  console.log(`${summary.newCount} new video(s) synced this run.`);
  if (summary.newCount > 0) {
    console.log(`${summary.classifiedAsOther} of them classified as "other".`);
  }

  if (summary.errors.length > 0) {
    console.error(`\n${summary.errors.length} video(s) failed to sync:`);
    for (const err of summary.errors) console.error(`  - ${err}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("Crawl failed:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
