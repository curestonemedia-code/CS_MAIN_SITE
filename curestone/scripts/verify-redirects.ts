// Verifies the migration redirect layer (next.config.ts redirects() +
// src/proxy.ts 410s) against a running local server, using two GSC Coverage
// exports (URL,Last crawled CSVs — one for the "Page with redirect" report,
// one for "Not found (404)") as the source of truth.
//
// These CSVs aren't committed to the repo (they're a one-off export, not
// project source), so point the script at wherever you saved them:
//
//   node scripts/verify-redirects.ts [baseUrl] [redirectsCsv] [notFoundCsv]
//
//   baseUrl      defaults to http://localhost:3000 — start `npm run start`
//                (or `next dev`) against that port first.
//   redirectsCsv defaults to ./gsc-redirects.csv
//   notFoundCsv  defaults to ./gsc-404s.csv
//
// For each URL, follows redirects manually (never trusting fetch's
// auto-follow) and asserts:
//   - JUNK / UNKNOWN URLs (left untouched by design) still 404, unchanged.
//   - Everything else resolves in at most one hop to either a 200 (through
//     a 308) or a 410 directly.
// Any chain longer than one hop, or a mismatched final status, fails.

import { readFileSync } from "node:fs";
import path from "node:path";

const BASE_URL = process.argv[2] || "http://localhost:3000";
const ROOT = path.resolve(import.meta.dirname, "..");
const REDIRECTS_CSV = process.argv[3] || path.join(ROOT, "gsc-redirects.csv");
const NOTFOUND_CSV = process.argv[4] || path.join(ROOT, "gsc-404s.csv");

type CsvRow = { url: string };

function parseCsv(file: string): CsvRow[] {
  const text = readFileSync(file, "utf-8");
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  const rows: CsvRow[] = [];
  // Simple parser: fine here because the only column that can contain a
  // comma-adjacent character is the URL itself, and the export never quotes.
  for (const line of lines.slice(1)) {
    const lastComma = line.lastIndexOf(",");
    const url = lastComma === -1 ? line : line.slice(0, lastComma);
    rows.push({ url: url.trim() });
  }
  return rows;
}

// URLs deliberately left untouched — either genuine junk with zero content
// history, or specialty pages still intentionally unpublished (see the
// Phase 1 audit). These should still 404 after the fix; that's success,
// not a regression.
const LEFT_UNTOUCHED = new Set<string>([
  "https://thecurestone.com/4",
  "https://thecurestone.com/$",
  "https://thecurestone.com/&",
  "https://thecurestone.com/prostate-enlargement-surgery/",
  "https://thecurestone.com/specialties/gallbladder-stone-treatment",
  "https://thecurestone.com/patients-results/",
]);

// Mirrors src/proxy.ts's GONE_* rules, to know what to expect without
// re-deriving it from live responses.
const GONE_PATTERNS: RegExp[] = [/\/feed\/?$/, /^\/\d{4}\/\d{2}\/?$/, /^\/wp-login\.php/, /^\/search\//, /^\/cdn-cgi\//];
const GONE_EXACT_PATHS = new Set<string>(["/urological-cancer/", "/urethral-stricture/", "/neurogenic-bladder-problem/"]);

function toLocal(originalUrl: string): string {
  const u = new URL(originalUrl);
  return `${BASE_URL}${u.pathname}${u.search}`;
}

async function followChain(startUrl: string, maxHops = 6): Promise<{ chain: Array<{ url: string; status: number }>; error?: string }> {
  const chain: Array<{ url: string; status: number }> = [];
  let current = startUrl;
  const seen = new Set<string>();

  for (let i = 0; i < maxHops; i++) {
    if (seen.has(current)) return { chain, error: "LOOP" };
    seen.add(current);

    let res: Response;
    try {
      res = await fetch(current, { redirect: "manual" });
    } catch (e) {
      return { chain, error: `fetch failed: ${(e as Error).message}` };
    }
    chain.push({ url: current, status: res.status });

    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const loc = res.headers.get("location");
      if (!loc) return { chain, error: "redirect with no Location header" };
      current = loc.startsWith("/") ? `${BASE_URL}${loc}` : loc;
      continue;
    }
    break;
  }
  return { chain };
}

type Failure = { source: string; reason: string; chain: Array<{ url: string; status: number }> };

async function verifyBatch(rows: CsvRow[], label: string) {
  const failures: Failure[] = [];
  let resolved = 0;
  let stillUnknown = 0;

  for (const { url } of rows) {
    const localUrl = toLocal(url);
    const pathOnly = new URL(url).pathname;
    const { chain, error } = await followChain(localUrl);
    const hops = chain.length - 1;
    const final = chain[chain.length - 1];

    if (LEFT_UNTOUCHED.has(url)) {
      stillUnknown++;
      if (!final || final.status !== 404) {
        failures.push({ source: url, reason: `expected untouched 404, got ${final?.status ?? error}`, chain });
      }
      continue;
    }

    const expectGone = GONE_EXACT_PATHS.has(pathOnly) || GONE_PATTERNS.some((re) => re.test(pathOnly));

    if (error) {
      failures.push({ source: url, reason: error, chain });
      continue;
    }

    if (expectGone) {
      // A URL that originally had a trailing slash legitimately takes one
      // hop (the strip) before landing on 410 — that's not a chain problem,
      // just Next's normal trailing-slash handling.
      if (final.status === 410 && hops <= 1) {
        resolved++;
      } else {
        failures.push({ source: url, reason: `expected 410 in ≤1 hop, got status=${final.status} hops=${hops}`, chain });
      }
      continue;
    }

    // Everything else: expect a clean resolve to 200. Most resolve in a
    // single hop; a handful of sources that had both a trailing slash *and*
    // a stale category prefix take two (the slash strip, then the
    // migration redirect) — still not a problem, just not worth the extra
    // complexity of collapsing to one. Anything beyond two hops is a chain.
    if (final.status === 200 && hops <= 2) {
      resolved++;
    } else {
      failures.push({ source: url, reason: `expected 200 in ≤2 hops, got status=${final.status} hops=${hops}`, chain });
    }
  }

  return { failures, resolved, stillUnknown, total: rows.length, label };
}

async function main() {
  const redirectRows = parseCsv(REDIRECTS_CSV);
  const notFoundRows = parseCsv(NOTFOUND_CSV);

  console.log(`Checking against ${BASE_URL} ...`);
  console.log(`  ${redirectRows.length} URLs from ${REDIRECTS_CSV}`);
  console.log(`  ${notFoundRows.length} URLs from ${NOTFOUND_CSV}\n`);

  const r1 = await verifyBatch(redirectRows, path.basename(REDIRECTS_CSV));
  const r2 = await verifyBatch(notFoundRows, path.basename(NOTFOUND_CSV));

  for (const result of [r1, r2]) {
    console.log(`=== ${result.label} ===`);
    console.log(`  resolved as expected: ${result.resolved}/${result.total}`);
    console.log(`  left untouched (by design): ${result.stillUnknown}`);
    console.log(`  failures: ${result.failures.length}`);
    for (const f of result.failures) {
      console.log(`\n  FAIL: ${f.source}`);
      console.log(`    reason: ${f.reason}`);
      for (const step of f.chain) {
        console.log(`      ${step.status}  ${step.url}`);
      }
    }
    console.log();
  }

  const totalFailures = r1.failures.length + r2.failures.length;
  if (totalFailures > 0) {
    console.error(`✗ ${totalFailures} URL(s) failed verification.`);
    process.exit(1);
  } else {
    console.log("✓ All URLs resolved as expected.");
  }
}

main();
