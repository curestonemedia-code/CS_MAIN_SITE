import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogPostCard from "@/components/blog/BlogPostCard";
import BlogPagination from "@/components/blog/BlogPagination";
import { BLOGS_PER_PAGE, type BlogFilters, getBlogIndex, getBlogPost, getPostCategorySlug } from "@/lib/blogs";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const { categories } = await getBlogIndex({ category });
  const match = categories.find((c) => c.slug === category);

  if (!match) return {};

  const title = `${match.title} Articles | Health Blog`;
  const description =
    match.description || `Articles on ${match.title.toLowerCase()} from Cure Stone Hospital, Sector 52, Gurgaon.`;
  const url = `https://thecurestone.com/${match.slug}`;

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
      type: "website",
      locale: "en_IN",
      images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.svg"],
    },
  };
}

export default async function BlogCategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const filters: BlogFilters = {
    page: Number(resolvedSearchParams.page || "1") || 1,
    category,
    q: resolvedSearchParams.q?.trim(),
  };

  const { posts, total, totalPages, page, categories } = await getBlogIndex(filters);
  const match = categories.find((c) => c.slug === category);

  if (!match) {
    // Not a real category — this may be a legacy flat post URL (/blog/[slug]
    // from before posts were nested under their category).
    const post = await getBlogPost(category);
    if (!post) notFound();
    permanentRedirect(`/${getPostCategorySlug(post)}/${post.slug}`);
  }

  const categoryUrl = `https://thecurestone.com/${match.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://thecurestone.com/blog" },
      { "@type": "ListItem", position: 3, name: match.title, item: categoryUrl },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />

      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,92,230,0.45),transparent_35%),linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)]" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
            <nav className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-200">
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <span>/</span>
              <span className="text-white">{match.title}</span>
            </nav>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
              {match.title}
            </h1>
            {match.description && (
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-blue-100">{match.description}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-blue-100">
              <span>{total} articles</span>
              {filters.q && <span>Search: {filters.q}</span>}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[280px_1fr] lg:px-12">
          <BlogSidebar
            searchAction={`/${match.slug}`}
            searchQuery={filters.q}
            categories={categories}
            activeCategorySlug={match.slug}
          />

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-bold text-slate-500">
                Showing {posts.length ? (page - 1) * BLOGS_PER_PAGE + 1 : 0}
                {posts.length ? `-${(page - 1) * BLOGS_PER_PAGE + posts.length}` : ""} of {total}
              </p>
              <Link href="/blog" className="text-sm font-black text-primary hover:underline">
                Clear Filter — Show All Articles
              </Link>
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <BlogPostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
                <h2 className="text-2xl font-black text-slate-900">No articles found</h2>
                <p className="mt-3 text-sm font-medium text-slate-500">
                  Try a different category or search term.
                </p>
              </div>
            )}

            <BlogPagination
              page={page}
              totalPages={totalPages}
              buildHref={(target) => categoryHref(match.slug, { ...filters, page: target })}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function categoryHref(category: string, filters: BlogFilters) {
  const params = new URLSearchParams();

  if (filters.page && filters.page > 1) params.set("page", String(filters.page));
  if (filters.q) params.set("q", filters.q);

  const query = params.toString();
  return query ? `/${category}?${query}` : `/${category}`;
}
