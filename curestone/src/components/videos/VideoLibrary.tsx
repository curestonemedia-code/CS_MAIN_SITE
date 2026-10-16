"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Flame, Clock } from "lucide-react";
import VideoCard from "./VideoCard";
import CategoryCard from "./CategoryCard";
import SortDropdown from "./SortDropdown";
import { CATEGORY_META, CATEGORY_ORDER, ALL_VIDEOS_META, categorySlug } from "@/constants/videoCategories";
import { countVideosByCategory, sortVideos, type SortOrder } from "./videoListHelpers";
import { useVideoPageSize } from "./useVideoPageSize";
import type { YoutubeVideo } from "@/lib/youtubeVideos";

const FEATURED_COUNT = 3;

export default function VideoLibrary({ videos }: { videos: YoutubeVideo[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOrder>("newest");
  const [pages, setPages] = useState(1);
  const [latestPages, setLatestPages] = useState(1);
  const pageSize = useVideoPageSize();

  const countByCategory = countVideosByCategory(videos);

  const q = query.trim().toLowerCase();
  const isSearching = q.length > 0;

  const searchResults = isSearching
    ? sortVideos(
        videos.filter((v) => v.title.toLowerCase().includes(q) || v.tags?.some((t) => t.toLowerCase().includes(q))),
        sort
      )
    : [];
  const visibleSearchResults = searchResults.slice(0, pageSize * pages);

  const featured = sortVideos(videos, "most_viewed").slice(0, FEATURED_COUNT);
  const latest = sortVideos(videos, "newest");
  const latestVisible = pageSize * latestPages;

  function handleQueryChange(next: string) {
    setQuery(next);
    setPages(1);
  }

  return (
    <div>
      {/* Category pills — real links, so each category is its own crawlable
          page rather than only a client-side filter. */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Link
          href="/videos"
          className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border transition-colors no-underline bg-primary border-primary text-white"
        >
          <ALL_VIDEOS_META.icon className="w-3.5 h-3.5" />
          All Videos
        </Link>
        {CATEGORY_ORDER.map((cat) => {
          const meta = CATEGORY_META[cat];
          return (
            <Link
              key={cat}
              href={`/videos/${categorySlug(cat)}`}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border transition-colors no-underline bg-white border-border/70 text-text-mid hover:border-primary/30 hover:text-primary"
            >
              <meta.icon className="w-3.5 h-3.5" />
              {meta.label}
              <span className="opacity-70">({countByCategory[cat]})</span>
            </Link>
          );
        })}
      </div>

      {/* Search + sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
          <input
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search videos (e.g. RIRS, diet, stent, 10mm)"
            className="w-full bg-slate-50 border border-transparent focus:border-primary focus:ring-0 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900"
          />
        </div>
        {isSearching && <SortDropdown sort={sort} onChange={setSort} />}
      </div>

      {isSearching ? (
        <>
          <p className="text-sm text-text-light mb-5">
            {searchResults.length} result{searchResults.length === 1 ? "" : "s"} for &quot;{query}&quot;
          </p>
          {searchResults.length === 0 ? (
            <p className="text-sm text-text-light py-12 text-center">No videos match your search.</p>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {visibleSearchResults.map((video) => (
                  <VideoCard key={video._id} video={video} />
                ))}
              </div>
              {searchResults.length > visibleSearchResults.length && (
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
        </>
      ) : (
        <>
          {/* Featured Videos */}
          {featured.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-foreground">
                  <Flame className="w-5 h-5 text-orange-500" /> Featured Videos
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featured.map((video) => (
                  <VideoCard key={video._id} video={video} />
                ))}
              </div>
            </section>
          )}

          {/* Browse by Category */}
          <section className="mb-10">
            <h2 className="text-lg font-black text-foreground mb-4">Browse by Category</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CATEGORY_ORDER.map((cat) => (
                <CategoryCard
                  key={cat}
                  meta={CATEGORY_META[cat]}
                  count={countByCategory[cat]}
                  href={`/videos/${categorySlug(cat)}`}
                />
              ))}
            </div>
          </section>

          {/* Latest Videos */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-black text-foreground mb-4">
              <Clock className="w-5 h-5 text-primary" /> Latest Videos
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {latest.slice(0, latestVisible).map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
            {latest.length > latestVisible && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setLatestPages((c) => c + 1)}
                  className="inline-flex items-center gap-2 bg-white border-2 border-border/50 text-text-mid font-black px-8 py-3 rounded-2xl hover:border-primary/30 hover:text-primary transition-all active:scale-95"
                >
                  Load More Videos
                </button>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
