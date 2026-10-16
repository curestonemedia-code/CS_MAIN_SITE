"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import VideoCard from "./VideoCard";
import CategoryCard from "./CategoryCard";
import SortDropdown from "./SortDropdown";
import { CATEGORY_META, CATEGORY_ORDER, categorySlug } from "@/constants/videoCategories";
import { sortVideos, type SortOrder } from "./videoListHelpers";
import { useVideoPageSize } from "./useVideoPageSize";
import type { SizeSubcategory, VideoCategory, YoutubeVideo } from "@/lib/youtubeVideos";

const SIZE_SUBCATEGORY_PILLS: { value: "all" | SizeSubcategory; label: string }[] = [
  { value: "all", label: "All Sizes" },
  { value: "small_under_5mm", label: "Under 5mm" },
  { value: "medium_5_10mm", label: "5–10mm" },
  { value: "large_over_10mm", label: "Over 10mm" },
];

export default function CategoryVideoLibrary({
  category,
  videos,
  countByCategory,
}: {
  category: VideoCategory;
  videos: YoutubeVideo[];
  countByCategory: Record<VideoCategory, number>;
}) {
  const [sizeSubcategory, setSizeSubcategory] = useState<"all" | SizeSubcategory>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOrder>("newest");
  const [pages, setPages] = useState(1);
  const pageSize = useVideoPageSize();

  const bySize =
    category === "size" && sizeSubcategory !== "all"
      ? videos.filter((v) => v.sizeSubcategory === sizeSubcategory)
      : videos;

  const q = query.trim().toLowerCase();
  const filtered = q
    ? bySize.filter((v) => v.title.toLowerCase().includes(q) || v.tags?.some((t) => t.toLowerCase().includes(q)))
    : bySize;

  const sorted = sortVideos(filtered, sort);
  const visible = sorted.slice(0, pageSize * pages);

  function resetPage() {
    setPages(1);
  }

  return (
    <div>
      {category === "size" && (
        <div className="flex flex-wrap gap-2 mb-4">
          {SIZE_SUBCATEGORY_PILLS.map((pill) => (
            <button
              key={pill.value}
              onClick={() => {
                setSizeSubcategory(pill.value);
                resetPage();
              }}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-colors ${
                sizeSubcategory === pill.value
                  ? "bg-foreground border-foreground text-white"
                  : "bg-slate-50 border-border/70 text-text-mid"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetPage();
            }}
            placeholder={`Search ${CATEGORY_META[category].label.toLowerCase()} videos`}
            className="w-full bg-slate-50 border border-transparent focus:border-primary focus:ring-0 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900"
          />
        </div>
        <SortDropdown sort={sort} onChange={setSort} />
      </div>

      {sorted.length === 0 ? (
        <p className="text-sm text-text-light py-12 text-center">No videos match your filters.</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {visible.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>

          {sorted.length > visible.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setPages((c) => c + 1)}
                className="inline-flex items-center gap-2 bg-white border-2 border-border/50 text-text-mid font-black px-8 py-3 rounded-2xl hover:border-primary/30 hover:text-primary transition-all active:scale-95"
              >
                Load More Videos
              </button>
            </div>
          )}
        </>
      )}

      {/* Jump to another category without going back through /videos */}
      <section className="mt-12">
        <h2 className="text-lg font-black text-foreground mb-4">Browse by Category</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CATEGORY_ORDER.filter((cat) => cat !== category).map((cat) => (
            <CategoryCard
              key={cat}
              meta={CATEGORY_META[cat]}
              count={countByCategory[cat]}
              href={`/videos/${categorySlug(cat)}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
