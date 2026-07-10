import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogPostCard from "@/components/blog/BlogPostCard";
import BlogPagination from "@/components/blog/BlogPagination";
import { BLOGS_PER_PAGE, type BlogFilters, getBlogIndex } from "@/lib/blogs";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

const TITLE = "Kidney Stone Blogs & Health Articles";
const DESCRIPTION =
  "Articles on kidney stones, laser treatment, RIRS, PCNL, diet, and urology care from Cure Stone Hospital in Gurgaon.";
const URL = "https://thecurestone.com/blog";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Cure Stone",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.svg"],
  },
};

type BlogListPageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    q?: string;
  }>;
};

export default async function BlogListPage({ searchParams }: BlogListPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters: BlogFilters = {
    page: Number(resolvedSearchParams.page || "1") || 1,
    category: resolvedSearchParams.category,
    q: resolvedSearchParams.q?.trim(),
  };

  const { posts, total, totalPages, page, categories } = await getBlogIndex(filters);
  const selectedCategory = categories.find((category) => category.slug === filters.category);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Navbar />

      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,92,230,0.45),transparent_35%),linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)]" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-blue-100">
                Knowledge Centre
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
                Kidney Stone Health Blog
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-blue-100">
                Browse Sanity-powered articles on kidney stones, RIRS, PCNL, diet,
                symptoms, recovery, and urology care in Gurgaon.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-blue-100">
                <span>{total} articles</span>
                {selectedCategory && <span>Category: {selectedCategory.title}</span>}
                {filters.q && <span>Search: {filters.q}</span>}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[280px_1fr] lg:px-12">
          <BlogSidebar
            searchAction="/blog"
            searchQuery={filters.q}
            categories={categories}
            activeCategorySlug={filters.category}
          />

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-bold text-slate-500">
                Showing {posts.length ? (page - 1) * BLOGS_PER_PAGE + 1 : 0}
                {posts.length ? `-${(page - 1) * BLOGS_PER_PAGE + posts.length}` : ""} of {total}
              </p>
              {(filters.category || filters.q) && (
                <Link href="/blog" className="text-sm font-black text-primary hover:underline">
                  Clear filters
                </Link>
              )}
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

            <BlogPagination page={page} totalPages={totalPages} buildHref={(target) => blogHref({ ...filters, page: target })} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function blogHref(filters: BlogFilters) {
  const params = new URLSearchParams();

  if (filters.page && filters.page > 1) params.set("page", String(filters.page));
  if (filters.category) params.set("category", filters.category);
  if (filters.q) params.set("q", filters.q);

  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}
