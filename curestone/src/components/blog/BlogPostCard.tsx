import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import SanityImage from "@/components/blog/SanityImage";
import { formatDate, getPostCategorySlug, getReadTime, type BlogCard } from "@/lib/blogs";

export default function BlogPostCard({ post }: { post: BlogCard }) {
  const category = post.categories?.[0];

  return (
    <Link
      href={`/${getPostCategorySlug(post)}/${post.slug}`}
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
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary">{category.title}</p>
        )}
        <h2 className="line-clamp-2 text-lg font-black leading-snug text-slate-900 transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 flex-1 text-sm font-medium leading-6 text-slate-500">{post.excerpt}</p>
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
