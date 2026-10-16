"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import type { YoutubeVideo } from "@/lib/youtubeVideos";
import { CATEGORY_META } from "@/constants/videoCategories";

const MAX_VISIBLE_BADGES = 2;

function formatDuration(seconds?: number): string | null {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatViewCount(count?: number): string | null {
  if (!count) return null;
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(count >= 10_000_000 ? 0 : 1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(count >= 10_000 ? 0 : 1)}K`;
  return `${count}`;
}

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return "Today";
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export default function VideoCard({ video }: { video: YoutubeVideo }) {
  const [playing, setPlaying] = useState(false);
  const duration = formatDuration(video.durationSeconds);
  const views = formatViewCount(video.viewCount);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 group flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.ytId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full cursor-pointer"
            aria-label={`Play ${video.title}`}
          >
            <Image
              src={`https://img.youtube.com/vi/${video.ytId}/hqdefault.jpg`}
              alt={video.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                <Play className="w-5 h-5 text-primary fill-current ml-0.5" />
              </div>
            </div>
            {duration && (
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                {duration}
              </span>
            )}
          </button>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {video.categories.slice(0, MAX_VISIBLE_BADGES).map((cat) => {
            const meta = CATEGORY_META[cat];
            return (
              <span
                key={cat}
                className={`px-2.5 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest ${meta.bg} ${meta.text}`}
              >
                {meta.shortLabel}
              </span>
            );
          })}
          {video.categories.length > MAX_VISIBLE_BADGES && (
            <span className="px-2 py-1 bg-slate-50 text-[9px] font-black text-text-light border border-border/50 rounded-lg">
              +{video.categories.length - MAX_VISIBLE_BADGES}
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <p className="text-[10px] font-bold text-text-light uppercase tracking-widest truncate">
            {views ? `${views} views · ` : ""}
            {formatRelativeTime(video.publishedAt)}
          </p>
          <a
            href={`https://www.youtube.com/watch?v=${video.ytId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-light hover:text-primary transition-colors shrink-0 ml-2"
            aria-label="Open on YouTube"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
