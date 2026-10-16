// Re-runs classification for every synced video against the current
// taxonomy — needed whenever the taxonomy itself changes (categories went
// from single-select to multi-select, new buckets were added), since a
// video's *correct* categories can change even if its old single category
// was already technically right.
//
// Uses whichever classifier provider is configured (NVIDIA_API_KEY first,
// GROQ_API_KEY as a fallback — see src/lib/nvidia.ts / youtubeSync.ts).
// Skips any video an editor has manually corrected in Studio (aiCategorized
// === false) — those are never touched by an automated pass.
//
// Safe to re-run any time the taxonomy changes again.
//
// Run with:
//
//   npm run reclassify-all-videos

import { reclassifyAllVideos } from "../src/lib/youtubeSync.ts";

async function main() {
  console.log("Re-classifying every synced video against the current taxonomy...");
  const summary = await reclassifyAllVideos();
  console.log(`\n${summary.candidateCount} candidate video(s) considered.`);
  console.log(`${summary.changedCount} document(s) patched with a fresh classification.`);
  if (summary.skippedEditorReviewed > 0) {
    console.log(`${summary.skippedEditorReviewed} video(s) skipped — editor-reviewed (aiCategorized: false).`);
  }
  if (summary.skippedClassificationFailure > 0) {
    console.log(
      `${summary.skippedClassificationFailure} video(s) left untouched — classification failed even after a retry (their existing categories were NOT overwritten).`
    );
  }
}

main().catch((err) => {
  console.error("Reclassify failed:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
