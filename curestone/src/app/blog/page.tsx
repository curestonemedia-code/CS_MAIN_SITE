import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SanityImage from "@/components/blog/SanityImage";
import {
  BLOGS_PER_PAGE,
  type BlogCard,
  type BlogFilters,
  type BlogTaxonomy,
  formatDate,
  getBlogIndex,
  getReadTime,
} from "@/lib/blogs";
import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Folder, Search } from "lucide-react";

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
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <form action="/blog" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <label htmlFor="blog-search" className="mb-3 block text-xs font-black uppercase tracking-widest text-slate-500">
                Search Articles
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  id="blog-search"
                  name="q"
                  defaultValue={filters.q}
                  placeholder="RIRS, diet, recovery..."
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
              {filters.category && <input type="hidden" name="category" value={filters.category} />}
              <button className="mt-3 w-full rounded-xl bg-primary px-4 py-3 text-sm font-black text-white transition-colors hover:bg-blue-700">
                Search
              </button>
            </form>

            <FilterPanel
              title="Categories"
              icon={<Folder className="h-4 w-4" />}
              items={categories}
              activeSlug={filters.category}
              param="category"
              filters={filters}
            />
          </aside>

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
                  <BlogCardItem key={post._id} post={post} />
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

            <Pagination page={page} totalPages={totalPages} filters={filters} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function BlogCardItem({ post }: { post: BlogCard }) {
  const category = post.categories?.[0];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {post.coverImage?.asset?.url ? (
          <SanityImage
            image={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-blue-50 text-sm font-black text-blue-700">
            Cure Stone Blog
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {category && (
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            {category.title}
          </p>
        )}
        <h2 className="line-clamp-2 text-lg font-black leading-snug text-slate-900 transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 flex-1 text-sm font-medium leading-6 text-slate-500">
          {post.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {getReadTime(post)}
          </span>
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-primary">
          Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function FilterPanel({
  title,
  icon,
  items,
  activeSlug,
  param,
  filters,
}: {
  title: string;
  icon: React.ReactNode;
  items: BlogTaxonomy[];
  activeSlug?: string;
  param: "category";
  filters: BlogFilters;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
        {icon}
        {title}
      </h2>
      <div className="space-y-2">
        {items.map((item) => {
          const isActive = activeSlug === item.slug;
          const disabled = item.count === 0;

          return (
            <Link
              key={item._id}
              href={disabled ? "#" : blogHref({ ...filters, [param]: isActive ? undefined : item.slug, page: 1 })}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-bold transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : disabled
                    ? "cursor-not-allowed bg-slate-50 text-slate-300"
                    : "text-slate-600 hover:bg-slate-50 hover:text-primary"
              }`}
              aria-disabled={disabled}
            >
              <span>{item.title}</span>
              <span className={isActive ? "text-white/70" : "text-slate-400"}>{item.count || 0}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  filters,
}: {
  page: number;
  totalPages: number;
  filters: BlogFilters;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (item) => item === 1 || item === totalPages || Math.abs(item - page) <= 2
  );

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <PageLink disabled={page <= 1} href={blogHref({ ...filters, page: page - 1 })}>
        Previous
      </PageLink>
      {pages.map((item, index) => {
        const previous = pages[index - 1];
        const showGap = previous && item - previous > 1;

        return (
          <span key={item} className="flex items-center gap-2">
            {showGap && <span className="px-2 text-slate-400">...</span>}
            <PageLink active={item === page} href={blogHref({ ...filters, page: item })}>
              {item}
            </PageLink>
          </span>
        );
      })}
      <PageLink disabled={page >= totalPages} href={blogHref({ ...filters, page: page + 1 })}>
        Next
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  active,
  disabled,
  children,
}: {
  href: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-300">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`rounded-xl border px-4 py-2 text-sm font-black transition-colors ${
        active
          ? "border-primary bg-primary text-white"
          : "border-slate-200 text-slate-600 hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </Link>
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
