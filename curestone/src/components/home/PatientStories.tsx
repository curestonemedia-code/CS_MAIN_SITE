"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Story {
  id: number;
  badge: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  videoThumbnail: string;
  videoTitle: string;
  videoUrl: string;
}

const STORIES: Story[] = [
  {
    id: 1,
    badge: "SUCCESS STORY",
    title: "Life After RIRS Surgery: A Transparent Journey",
    description: "Follow patient recovery journeys after stone procedures and the specialized care planning that defines the Cure Stone experience.",
    stats: [
      { label: "Case Review", value: "Scan-Based" },
      { label: "Treatment Plan", value: "Personalized" },
      { label: "Recovery", value: "Case-Based" }
    ],
    videoThumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoTitle: "RIRS Post-Op: Real Patient Recovery Vlog",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
  },
  {
    id: 2,
    badge: "PATIENT CASE",
    title: "Compassionate Care, Long-Term Planning",
    description: "Real stories from patients who travelled for advanced urological care, scan review, minimally invasive options, and prevention guidance.",
    stats: [
      { label: "Patients", value: "30,000+" },
      { label: "Reviews", value: "4.9" },
      { label: "Care", value: "Follow-Up" }
    ],
    videoThumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoTitle: "Real Stories, Real Care — Patient Recovery Journeys",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
  }
];

export default function PatientStories() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeVideo]);

  return (
    <section className="relative py-32 bg-[#0A192F] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-emerald-600/10 blur-[140px] rounded-full translate-y-1/2" />
        <div 
          className="absolute inset-0 opacity-[0.1]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)`, 
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header (Optional/Implicit) */}
        
        <div className="space-y-40 lg:space-y-64">
          {STORIES.map((story, index) => (
            <div 
              key={story.id} 
              className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Text Side */}
              <div className="w-full lg:w-1/2">
                <div className="flex flex-col space-y-10">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-3xl">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-black tracking-[0.3em] uppercase text-white/90">{story.badge}</span>
                    </div>

                    <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1] tracking-tighter">
                      {story.title}
                    </h2>
                    
                    <p className="text-xl lg:text-2xl text-white/50 font-medium leading-relaxed max-w-xl">
                      {story.description}
                    </p>
                  </div>

                  {/* Stats with Glass Highlighting */}
                  <div className="grid grid-cols-3 gap-6">
                    {story.stats.map((stat, sIdx) => (
                      <div 
                        key={sIdx} 
                        className="group relative p-6 rounded-[2rem] bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:shadow-emerald-500/10"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
                        <p className="text-2xl lg:text-4xl font-black text-white mb-2 relative z-10">
                          {stat.value}
                        </p>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] relative z-10">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Cta Row */}
                  <div className="flex flex-wrap gap-5 pt-4">
                    <button className="group relative flex items-center gap-4 px-10 py-5 bg-primary rounded-[1.5rem] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative z-10 font-black text-white text-lg">Book Consultation</span>
                      <svg className="relative z-10 w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                    
                    <button className="px-10 py-5 rounded-[1.5rem] border border-white/20 text-white font-black text-lg hover:bg-white/10 transition-all hover:-translate-y-1">
                      More Patient Stories
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Side */}
              <div className="w-full lg:w-1/2 relative">
                {/* Decorative Floating Label */}
                <div className={`absolute -top-12 ${index % 2 === 0 ? '-right-12' : '-left-12'} hidden xl:flex flex-col items-center gap-4 opacity-20 hover:opacity-100 transition-opacity duration-700`}>
                  <p className="vertical-text text-[10px] font-black uppercase tracking-[1em] text-white">RECOVERY PROTOCOL · ANALYZED</p>
                  <div className="w-px h-24 bg-gradient-to-b from-white to-transparent" />
                </div>

                <div 
                  className="group relative aspect-video rounded-[3rem] overflow-hidden bg-slate-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] cursor-pointer ring-1 ring-white/10 hover:ring-emerald-500/50 transition-all duration-700"
                  onClick={() => setActiveVideo(story.videoUrl)}
                >
                  <Image 
                    src={story.videoThumbnail} 
                    alt={story.videoTitle} 
                    fill 
                    className="object-cover opacity-60 group-hover:opacity-30 group-hover:scale-105 transition-all duration-1000 ease-out"
                  />
                  
                  {/* Glass Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500/30 blur-3xl rounded-full scale-150 animate-pulse" />
                      <div className="relative w-28 h-28 bg-white/10 border border-white/20 backdrop-blur-2xl rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:border-transparent">
                        <svg className="w-12 h-12 text-white ml-2 drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-10 pt-32 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div className="flex items-end justify-between gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-white">CS</div>
                          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Cure Stone Exclusive Vlog</p>
                        </div>
                        <h4 className="text-white font-black text-2xl lg:text-3xl tracking-tight leading-none group-hover:text-primary transition-colors">
                          {story.videoTitle}
                        </h4>
                      </div>
                      <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-black backdrop-blur-md">
                        TRUSTED RECOVERY
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
          {/* Animated Overlay */}
          <div 
            className="absolute inset-0 bg-[#0A192F]/90 backdrop-blur-2xl transition-opacity animate-in fade-in duration-300"
            onClick={() => setActiveVideo(null)}
          />
          
          <div className="relative w-full max-w-6xl aspect-video rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 animate-in zoom-in-95 duration-300">
             <button 
               className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 backdrop-blur-xl transition-all"
               onClick={() => setActiveVideo(null)}
             >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
             <iframe 
                src={activeVideo} 
                className="w-full h-full" 
                allowFullScreen 
                allow="autoplay; encrypted-media"
             />
          </div>
        </div>
      )}
    </section>
  );
}
