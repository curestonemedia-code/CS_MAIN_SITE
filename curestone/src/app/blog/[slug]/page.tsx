import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";
import SanityImage from "@/components/blog/SanityImage";
import { formatDate, getBlogPost, getReadTime, getRelatedBlogs, type BlogCard } from "@/lib/blogs";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock3, UserRound } from "lucide-react";

export const dynamic = "force-dynamic";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found | Cure Stone",
    };
  }

  const title = post.seo?.metaTitle || `${post.title} | Cure Stone Health Blog`;
  const description = post.seo?.metaDescription || post.excerpt || "";
  const image = post.seo?.ogImage?.asset?.url || post.coverImage?.asset?.url;
  const url = `https://thecurestone.com/blog/${post.slug}`;

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
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedBlogs(post);
  const primaryCategory = post.categories?.[0];
  const postUrl = `https://thecurestone.com/blog/${post.slug}`;
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://thecurestone.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

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
                  <Link href={`/blog?category=${primaryCategory.slug}`} className="text-primary hover:underline">
                    {primaryCategory.title}
                  </Link>
                </>
              )}
            </nav>

            <div className="mb-5 flex flex-wrap gap-2">
              {post.categories?.map((category) => (
                <Link
                  key={category._id}
                  href={`/blog?category=${category.slug}`}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-primary"
                >
                  {category.title}
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
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-2xl">
                <SanityImage
                  image={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 1100px, 100vw"
                  className="object-cover"
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
                    href={`/blog?category=${primaryCategory.slug}`}
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
      href={`/blog/${post.slug}`}
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
