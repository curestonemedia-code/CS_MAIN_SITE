// Audits FAQPage extraction coverage across every published Cure Stone blog
// post, using a standalone copy of the exact extraction logic in
// src/app/[category]/[slug]/page.tsx (kept in sync manually — this is a
// one-off diagnostic, not imported by the app). Queries Sanity directly, no
// dev server required.
//
//   node scripts/audit-faq-extraction.ts
//
// Prints: total posts, how many yield an FAQPage (and how many Q&A pairs
// each), and — most importantly — flags any post where a "Frequently Asked
// Questions" heading was found but zero pairs were extracted, since that's
// the one failure mode worth eyeballing by hand (a real FAQ section written
// in a format the extractor doesn't recognise yet).

const SANITY_PROJECT_ID = "pxhg726k";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2025-01-01";

type PortableTextChild = {
  _key: string;
  _type: string;
  text?: string;
  marks?: string[];
};

type PortableTextBlock = {
  _key: string;
  _type: string;
  style?: string;
  listItem?: string;
  children?: PortableTextChild[];
};

type Post = {
  slug: string;
  title: string;
  body: PortableTextBlock[];
};

async function sanityFetch<T>(query: string): Promise<T> {
  const url = new URL(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
  );
  url.searchParams.set("query", query);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity request failed: ${res.status}`);
  const payload = (await res.json()) as { result?: T; error?: { message?: string; description?: string } };
  if (payload.error) throw new Error(payload.error.description || payload.error.message);
  return payload.result as T;
}

// --- exact copy of the extraction logic from [category]/[slug]/page.tsx ---

function blockText(block: PortableTextBlock): string {
  return (block.children || [])
    .map((child) => child.text || "")
    .join("")
    .trim();
}

const FAQ_HEADING_RE = /frequently asked questions|^faqs?\b/i;

function isFaqSectionHeading(block: PortableTextBlock): boolean {
  if (block.style !== "h2" && block.style !== "h3") return false;
  return FAQ_HEADING_RE.test(blockText(block));
}

function isQuestionBlock(block: PortableTextBlock): boolean {
  const text = blockText(block);
  if (!text.endsWith("?")) return false;

  if (block.style === "h3") return true; // pattern B: legacy H3 question

  if (block._type === "block" && block.style === "normal" && !block.listItem) {
    const visibleSpans = (block.children || []).filter((child) => (child.text || "").trim().length > 0);
    if (visibleSpans.length === 0) return false;
    return visibleSpans.every((child) => (child.marks || []).includes("strong")); // pattern A: bold paragraph
  }

  return false;
}

function extractFaqPairs(body: PortableTextBlock[]): Array<{ question: string; answer: string }> {
  const startIndex = body.findIndex(isFaqSectionHeading);
  if (startIndex === -1) return [];

  const pairs: Array<{ question: string; answer: string }> = [];
  let i = startIndex + 1;

  while (i < body.length) {
    const block = body[i];
    if (block.style === "h2" && !isFaqSectionHeading(block)) break;

    if (!isQuestionBlock(block)) {
      i++;
      continue;
    }

    const question = blockText(block);
    const answerParts: string[] = [];
    let j = i + 1;
    while (j < body.length && !isQuestionBlock(body[j]) && !(body[j].style === "h2" && !isFaqSectionHeading(body[j]))) {
      const text = blockText(body[j]);
      if (text) answerParts.push(text);
      j++;
    }

    if (answerParts.length > 0) {
      pairs.push({ question, answer: answerParts.join(" ") });
    }
    i = j;
  }

  return pairs;
}

// --- audit ---

async function main() {
  const posts = await sanityFetch<Post[]>(
    `*[_type == "blogPost" && coalesce(siteId, "cure-stone") == "cure-stone" && isPublished != false && defined(slug.current)]{"slug": slug.current, title, body}`
  );

  console.log(`Total published posts: ${posts.length}\n`);

  let withFaqHeading = 0;
  let withPairs = 0;
  let totalPairs = 0;
  const histogram: Record<number, number> = {};
  const headingButZeroPairs: string[] = [];

  for (const post of posts) {
    const body = post.body || [];
    const hasHeading = body.some(isFaqSectionHeading);
    if (hasHeading) withFaqHeading++;

    const pairs = extractFaqPairs(body);
    if (pairs.length > 0) {
      withPairs++;
      totalPairs += pairs.length;
    }
    histogram[pairs.length] = (histogram[pairs.length] || 0) + 1;

    if (hasHeading && pairs.length === 0) {
      headingButZeroPairs.push(`${post.slug}  ("${post.title}")`);
    }
  }

  console.log(`Posts with a "Frequently Asked Questions" heading: ${withFaqHeading}`);
  console.log(`Posts that yield at least 1 extracted Q&A pair:    ${withPairs}`);
  console.log(`Total Q&A pairs extracted across the site:         ${totalPairs}`);
  console.log(`Average pairs per post (of those with any):        ${(totalPairs / (withPairs || 1)).toFixed(1)}\n`);

  console.log("Pairs-per-post histogram:");
  Object.entries(histogram)
    .sort(([a], [b]) => Number(a) - Number(b))
    .forEach(([count, n]) => console.log(`  ${count} pairs: ${n} posts`));

  if (headingButZeroPairs.length > 0) {
    console.log(`\n⚠ ${headingButZeroPairs.length} post(s) have an FAQ heading but 0 pairs extracted — worth checking by hand:`);
    headingButZeroPairs.forEach((s) => console.log(`  - ${s}`));
  } else {
    console.log("\n✓ Every post with a detected FAQ heading yielded at least one pair.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
