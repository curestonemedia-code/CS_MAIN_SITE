import Link from "next/link";
import type { CategoryMeta } from "@/constants/videoCategories";

export default function CategoryCard({ meta, count, href }: { meta: CategoryMeta; count: number; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 bg-white border border-border/50 rounded-2xl px-4 py-3.5 text-left hover:border-primary/30 hover:shadow-sm transition-all no-underline"
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${meta.bg}`}>
        <meta.icon className={`w-4.5 h-4.5 ${meta.text}`} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-black text-foreground truncate">{meta.label}</p>
        <p className="text-xs font-bold text-text-light">{count} videos</p>
      </div>
    </Link>
  );
}
