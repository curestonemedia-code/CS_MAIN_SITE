import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortableTextRenderer, { getYouTubeId } from "@/components/blog/PortableTextRenderer";
import SanityImage from "@/components/blog/SanityImage";
import {
  formatDate,
  getBlogPost,
  getPostCategorySlug,
  getReadTime,
  getRelatedBlogs,
  type BlogCard,
  type PortableTextBlock,
} from "@/lib/blogs";
import { getYouTubeMeta } from "@/lib/youtube";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowRight, CalendarDays, Clock3, UserRound } from "lucide-react";

export const dynamic = "force-dynamic";

type BlogPostPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found | Cure Stone",
    };
  }

  const title = post.seo?.metaTitle || `${post.title} | Health Blog`;
  const description = post.seo?.metaDescription || post.excerpt || "";
  const image = post.seo?.ogImage?.asset?.url || post.coverImage?.asset?.url;
  const url = `https://thecurestone.com/${getPostCategorySlug(post)}/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Cure Stone",
      locale: "en_IN",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: [{ url: image || "/og-image.svg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || "/og-image.svg"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const canonicalCategory = getPostCategorySlug(post);
  if (category !== canonicalCategory) {
    permanentRedirect(`/${canonicalCategory}/${post.slug}`);
  }

  const relatedPosts = await getRelatedBlogs(post);
  const primaryCategory = post.categories?.[0];
  const postUrl = `https://thecurestone.com/${canonicalCategory}/${post.slug}`;
  const postImage = post.seo?.ogImage?.asset?.url || post.coverImage?.asset?.url;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: post.title,
    description: post.seo?.metaDescription || post.excerpt || "",
    url: postUrl,
    image: postImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "Cure Stone Editorial Team",
    },
    publisher: {
      "@type": "MedicalBusiness",
      name: "Cure Stone",
      "@id": "https://thecurestone.com/#organization",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  // FAQPage schema, extracted from the post's own visible content rather than
  // invented: some articles are written with question-style H2/H3 headings
  // ("What is the best treatment for...?") followed by their answer
  // paragraph(s). Google requires FAQPage markup to mirror on-page content,
  // so posts without this pattern simply get no FAQPage block — nothing is
  // fabricated to force one.
  const faqPairs = extractFaqPairs(post.body || []);

  const faqSchema =
    faqPairs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqPairs.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://thecurestone.com/blog" },
      ...(primaryCategory
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: primaryCategory.title,
              item: `https://thecurestone.com/${canonicalCategory}`,
            },
          ]
        : []),
      { "@type": "ListItem", position: primaryCategory ? 4 : 3, name: post.title, item: postUrl },
    ],
  };

  // Any YouTube videos embedded in this post's body get their own VideoObject
  // schema so Google can index them as video content, not just page content.
  // uploadDate/duration come from the editor-filled Sanity fields first (see
  // schemaTypes/youtube.ts) — only unpublished-vintage posts without those
  // filled in fall back to getYouTubeMeta()'s known-video table / live fetch.
  const embeddedVideoIds = (post.body || [])
    .filter((block) => block._type === "youtube")
    .map((block) => ({
      ytId: getYouTubeId(block.url),
      caption: block.caption,
      uploadDate: block.uploadDate,
      duration: block.duration,
    }))
    .filter(
      (v): v is { ytId: string; caption: string | undefined; uploadDate: string | undefined; duration: string | undefined } =>
        v.ytId !== null
    );

  const videoSchemas = await Promise.all(
    embeddedVideoIds.map(async ({ ytId, caption, uploadDate, duration }) => {
      const meta = uploadDate && duration ? {} : await getYouTubeMeta(ytId);
      return {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: caption || post.title,
        description: post.seo?.metaDescription || post.excerpt || post.title,
        thumbnailUrl: [`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`],
        ...(uploadDate || meta.uploadDate ? { uploadDate: uploadDate || meta.uploadDate } : {}),
        ...(duration || meta.duration ? { duration: duration || meta.duration } : {}),
        embedUrl: `https://www.youtube.com/embed/${ytId}`,
        contentUrl: `https://www.youtube.com/watch?v=${ytId}`,
        publisher: {
          "@type": "Organization",
          name: "Cure Stone",
          "@id": "https://thecurestone.com/#organization",
        },
      };
    })
  );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
        />
      )}
      {videoSchemas.map((schema) => (
        <script
          key={schema.embedUrl}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <Navbar />

      <main className="flex-grow pt-28">
        <article>
          <header className="mx-auto max-w-5xl px-6 lg:px-12">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Link href="/blog" className="hover:text-primary">
                Blog
              </Link>
              {primaryCategory && (
                <>
                  <span>/</span>
                  <Link href={`/${canonicalCategory}`} className="text-primary hover:underline">
                    {primaryCategory.title}
                  </Link>
                </>
              )}
            </nav>

            <div className="mb-5 flex flex-wrap gap-2">
              {post.categories?.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/${cat.slug}`}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-primary"
                >
                  {cat.title}
                </Link>
              ))}
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-6 max-w-3xl text-xl font-medium leading-8 text-slate-600">
                {post.excerpt}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-5 border-y border-slate-200 py-6 text-sm font-bold text-slate-500">
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4 text-primary" />
                {post.author?.name || "Cure Stone Editorial Team"}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-primary" />
                {getReadTime(post)}
              </span>
            </div>
          </header>

          {post.coverImage?.asset?.url && (
            <div className="mx-auto mt-10 max-w-6xl px-6 lg:px-12">
              <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-2xl">
                <SanityImage
                  image={post.coverImage}
                  alt={post.title}
                  width={post.coverImage.asset?.metadata?.dimensions?.width || 1600}
                  height={post.coverImage.asset?.metadata?.dimensions?.height || 900}
                  priority
                  sizes="(min-width: 1024px) 1100px, 100vw"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 to-transparent" />
              </div>
            </div>
          )}

          <div className="mx-auto max-w-4xl px-6 py-14 lg:px-12">
            <PortableTextRenderer value={post.body} />

            {post.tags?.length ? (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-200 pt-8">
                {post.tags.map((tag) => (
                  <Link
                    key={tag._id}
                    href={`/blog?tag=${tag.slug}`}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-500 hover:border-primary hover:text-primary"
                  >
                    {tag.title}
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="mt-14 rounded-3xl border border-primary/10 bg-primary/5 p-8 text-center md:p-10">
              <h2 className="text-2xl font-black text-slate-900">Have Questions About This Topic?</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-slate-600">
                Get a personalized consultation at Cure Stone Hospital, Sector 52, Gurgaon.
              </p>
              <Link
                href="/book"
                className="mt-6 inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-sm font-black text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="border-t border-slate-200 bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-primary">
                    Related Articles
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-slate-900">
                    More From {primaryCategory?.title || "Cure Stone"}
                  </h2>
                </div>
                {primaryCategory && (
                  <Link
                    href={`/${canonicalCategory}`}
                    className="text-sm font-black text-primary hover:underline"
                  >
                    View category
                  </Link>
                )}
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <RelatedCard key={related._id} post={related} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

function RelatedCard({ post }: { post: BlogCard }) {
  return (
    <Link
      href={`/${getPostCategorySlug(post)}/${post.slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {post.coverImage?.asset?.url && (
          <SanityImage
            image={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 30vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-6">
        <p className="text-xs font-bold text-slate-400">{formatDate(post.publishedAt)}</p>
        <h3 className="mt-2 line-clamp-2 text-lg font-black leading-snug text-slate-900 group-hover:text-primary">
          {post.title}
        </h3>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-primary">
          Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

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

// Two house styles are used for an individual FAQ entry, inconsistently
// across two-plus years of content:
//   A (newer posts)  — the question is a fully-bold "normal" paragraph
//                       ending in "?", immediately followed by a plain
//                       answer paragraph.
//   B (legacy posts) — the question is its own H3 heading ending in "?",
//                       immediately followed by a plain answer paragraph.
// Both are only recognised once already inside an FAQ section (see
// extractFaqPairs) — outside that section an H3 or bold sentence ending in
// "?" is just article prose, not an FAQ item.
function isQuestionBlock(block: PortableTextBlock): boolean {
  const text = blockText(block);
  if (!text.endsWith("?")) return false;

  if (block.style === "h3") return true; // pattern B

  if (block._type === "block" && block.style === "normal" && !block.listItem) {
    const visibleSpans = (block.children || []).filter((child) => (child.text || "").trim().length > 0);
    if (visibleSpans.length === 0) return false;
    return visibleSpans.every((child) => (child.marks || []).includes("strong")); // pattern A
  }

  return false;
}

/**
 * Pulls real Q&A pairs out of a post's own body — never invented. Google
 * requires FAQPage markup to mirror on-page content exactly, so this only
 * extracts from an explicit "Frequently Asked Questions" (or "FAQ(s)")
 * heading: everything after it, up to the next H2 that isn't itself another
 * FAQ label (an H3 doesn't end the section — it may itself be a pattern-B
 * question), is scanned for question/answer pairs. Posts without that
 * labelled section yield an empty array and get no FAQPage schema —
 * deliberately not falling back to guessing at question-shaped headings
 * elsewhere in the article, which produced false positives (a rhetorical
 * section heading like "Should You Stop Your Vitamin D?" is not an FAQ item).
 */
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
