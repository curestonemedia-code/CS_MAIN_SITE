import Link from "next/link";
import { Folder, Search } from "lucide-react";
import type { BlogTaxonomy } from "@/lib/blogs";

export default function BlogSidebar({
  searchAction,
  searchQuery,
  categories,
  activeCategorySlug,
}: {
  searchAction: string;
  searchQuery?: string;
  categories: BlogTaxonomy[];
  activeCategorySlug?: string;
}) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <form action={searchAction} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <label htmlFor="blog-search" className="mb-3 block text-xs font-black uppercase tracking-widest text-slate-500">
          Search Articles
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            id="blog-search"
            name="q"
            defaultValue={searchQuery}
            placeholder="RIRS, diet, recovery..."
            className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>
        <button className="mt-3 w-full rounded-xl bg-primary px-4 py-3 text-sm font-black text-white transition-colors hover:bg-blue-700">
          Search
        </button>
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
          <Folder className="h-4 w-4" />
          Categories
        </h2>
        <div className="space-y-2">
          {categories.map((item) => {
            const isActive = activeCategorySlug === item.slug;
            const disabled = item.count === 0;

            return (
              <Link
                key={item._id}
                href={disabled ? "#" : `/${item.slug}`}
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
    </aside>
  );
}
