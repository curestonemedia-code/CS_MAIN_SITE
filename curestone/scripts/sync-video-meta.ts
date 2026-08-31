// Keeps src/lib/youtube.ts's KNOWN_VIDEO_META table in sync with every
// video ID actually embedded in the site — the fix for a real failure mode:
// a video ID missing from that table falls back to a live fetch at *build*
// time, and Vercel's build servers were getting rate-limited/blocked on
// that fetch, silently dropping `uploadDate` and failing Search Console's
// VideoObject validation.
//
// Run this after adding a new video's ytId anywhere in src/, before
// building or deploying:
//
//   npm run sync-video-meta
//
// It scans src/ for every video ID in use, fetches metadata for any ID not
// already in the table (from your machine, not Vercel's build servers —
// exactly the environment that was getting blocked), and rewrites
// KNOWN_VIDEO_META with the new entries appended. Commit the result.
//
// Exits non-zero if any video's metadata couldn't be resolved, so a broken
// video ID (typo, deleted/private video) is caught here rather than
// shipping a VideoObject with a missing uploadDate.

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fetchLiveVideoMeta, KNOWN_VIDEO_META } from "../src/lib/youtube.ts";

const SRC_DIR = join(import.meta.dirname, "..", "src");
const YOUTUBE_TS = join(import.meta.dirname, "..", "src", "lib", "youtube.ts");
const INSERT_MARKER = "  // -- sync-video-meta appends new entries below this line --";

const YT_ID_PATTERNS = [
  /(?:ytId|videoId|vid)['"]?\s*:\s*['"]([A-Za-z0-9_-]{11})['"]/g,
  /youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{11})/g,
  /youtu\.be\/([A-Za-z0-9_-]{11})/g,
];

function findSourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next") continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      findSourceFiles(full, out);
    } else if (/\.(ts|tsx)$/.test(entry) && full !== YOUTUBE_TS) {
      out.push(full);
    }
  }
  return out;
}

function findUsedVideoIds(): Set<string> {
  const ids = new Set<string>();
  for (const file of findSourceFiles(SRC_DIR)) {
    const text = readFileSync(file, "utf8");
    for (const pattern of YT_ID_PATTERNS) {
      for (const match of text.matchAll(pattern)) {
        ids.add(match[1]);
      }
    }
  }
  return ids;
}

// Matches the existing table's convention: unquoted bare key when the ID
// happens to be a valid JS identifier, quoted otherwise (leading digit or a
// hyphen — most real YouTube IDs need this).
function formatKey(id: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(id) ? id : `"${id}"`;
}

async function main() {
  const used = findUsedVideoIds();
  const missing = [...used].filter((id) => !KNOWN_VIDEO_META[id]);

  console.log(`Found ${used.size} video ID(s) referenced in src/, ${missing.length} missing from KNOWN_VIDEO_META.`);

  if (missing.length === 0) {
    console.log("Nothing to do — every embedded video already has metadata.");
    return;
  }

  const resolved: Record<string, { uploadDate: string; duration: string }> = {};
  const failed: string[] = [];

  for (const id of missing) {
    process.stdout.write(`Fetching ${id}... `);
    try {
      const meta = await fetchLiveVideoMeta(id);
      if (meta.uploadDate && meta.duration) {
        resolved[id] = { uploadDate: meta.uploadDate, duration: meta.duration };
        console.log(`OK — ${meta.uploadDate}, ${meta.duration}`);
      } else {
        failed.push(id);
        console.log("FAILED — response ok but couldn't parse uploadDate/duration from the page.");
      }
    } catch (err) {
      failed.push(id);
      console.log(`FAILED — ${err instanceof Error ? err.message : err}`);
    }
  }

  if (Object.keys(resolved).length > 0) {
    const source = readFileSync(YOUTUBE_TS, "utf8");
    if (!source.includes(INSERT_MARKER)) {
      throw new Error(`Could not find insert marker in ${YOUTUBE_TS} — has the file been restructured?`);
    }
    const newLines = Object.entries(resolved)
      .map(([id, meta]) => `  ${formatKey(id)}: { uploadDate: "${meta.uploadDate}", duration: "${meta.duration}" },`)
      .join("\n");
    const updated = source.replace(INSERT_MARKER, `${newLines}\n${INSERT_MARKER}`);
    writeFileSync(YOUTUBE_TS, updated);
    console.log(`\nWrote ${Object.keys(resolved).length} new entr${Object.keys(resolved).length === 1 ? "y" : "ies"} to ${YOUTUBE_TS}.`);
  }

  if (failed.length > 0) {
    console.error(
      `\n${failed.length} video ID(s) could not be resolved: ${failed.join(", ")}\n` +
        `Check they're correct, public, and not deleted — then add their metadata to KNOWN_VIDEO_META by hand if the fetch keeps failing.`
    );
    process.exitCode = 1;
  } else {
    console.log("\nDone. Review the diff, then commit src/lib/youtube.ts.");
  }
}

main();
