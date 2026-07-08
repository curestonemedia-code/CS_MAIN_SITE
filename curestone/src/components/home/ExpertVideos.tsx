"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface Video {
  id: string;
  ytId: string;
  title: string;
  tag: string;
  meta: string;
  bgColor: string;
}

const VIDEOS: Video[] = [
  {
    id: "1",
    ytId: "K5va1bE282M",
    title: "How RIRS Laser Surgery Works — Complete Guide",
    tag: "Surgery Guide",
    meta: "Dr. Deepanshu Gupta · Cure Stone",
    bgColor: "bg-blue-900",
  },
  {
    id: "2",
    ytId: "qobqvzQ6za4",
    title: "DJ Stent Removal — Is It Painful?",
    tag: "Post Surgery",
    meta: "Dr. Deepanshu Gupta · Cure Stone",
    bgColor: "bg-emerald-900",
  },
  {
    id: "3",
    ytId: "aHsGua3WaVM",
    title: "Kidney Stone Prevention — Diet & Hydration",
    tag: "Prevention",
    meta: "Dr. Deepanshu Gupta · Cure Stone",
    bgColor: "bg-orange-900",
  },
];

const ExpertVideos = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-[#eff2f8] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-[#2563ff] bg-[#2563ff]/5 border border-[#2563ff]/10 rounded-full uppercase">
            Watch & Learn
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Expert Videos by <span className="text-primary">Dr. Deepanshu Gupta</span>
          </h2>
          <p className="mt-4 text-text-light font-medium max-w-2xl mx-auto">
            Educational videos on kidney stone treatment, RIRS surgery, and prevention — straight from our expert urologist.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEOS.map((video) => (
            <div key={video.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-border/50 group flex flex-col h-full">
              {/* Thumbnail / Embed Container */}
              <div className="relative aspect-video overflow-hidden">
                {playingId === video.id ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.ytId}?autoplay=1&rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 cursor-pointer ${video.bgColor}`}
                    onClick={() => setPlayingId(video.id)}
                  >
                    <Image
                      src={`https://img.youtube.com/vi/${video.ytId}/maxresdefault.jpg`}
                      alt={video.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 group-active:scale-95">
                        <svg className="w-8 h-8 text-primary fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-black text-white px-3 py-1 rounded-full uppercase tracking-widest">
                      ▶ Click to Play
                    </div>
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary/5 text-[9px] font-black text-primary border border-primary/10 rounded-lg uppercase tracking-widest">
                    {video.tag}
                  </span>
                </div>
                <h3 className="text-xl font-black text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                  <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">
                    {video.meta}
                  </p>
                  <button
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${video.ytId}`, '_blank')}
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@cure_stone"
            target="_blank"
            className="inline-flex items-center gap-3 bg-white border-2 border-border/50 text-text-mid font-black px-10 py-4 rounded-2xl hover:border-primary/30 hover:text-primary transition-all active:scale-95 no-underline"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF0000">
              <path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-1-1.9-1-2.3-1C17.2 2.7 12 2.7 12 2.7s-5.2 0-8.3.2c-.5.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.2 8.1.2 9.9v1.7c0 1.8.3 3.7.3 3.7s.2 1.6.9 2.3c.9 1 2.1.9 2.6 1 1.9.2 8 .2 8 .2s5.2 0 8.3-.3c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.3-1.9.3-3.7V9.9c0-1.8-.3-3.7-.3-3.7zM9.7 14.8V8.6l6.3 3.1-6.3 3.1z" />
            </svg>
            View More on YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExpertVideos;