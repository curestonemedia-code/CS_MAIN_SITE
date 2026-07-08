"use client";
import React from 'react';
import Image from 'next/image';

interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: "30,000+", label: "Patients Treated" },
  { value: "9,000+", label: "Surgeries Done" },
  { value: "RIRS", label: "Laser Stone Care" },
  { value: "15+ yrs", label: "Experience" }
];

export default function GlobalReach() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Premium Background Gradient */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          background: 'linear-gradient(160deg, #1322a0 0%, #2B5CE6 60%, #1B3A9E 100%)' 
        }} 
      />

      {/* Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Soft Ambient Glow */}
      <div 
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-0 opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #6391FF 0%, transparent 70%)' }}
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <span className="text-xs font-black uppercase tracking-[0.2em]">Beyond Boundaries</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95]">
              Advanced <br/> Kidney Stone Care,<br />
              <span className="text-blue-200/80"> Trusted By Patient Across India.</span><br />
            </h2>

            <button className="group relative flex items-center gap-4 py-4 px-10 rounded-full bg-white text-blue-700 font-black hover:bg-blue-50 transition-all shadow-2xl shadow-blue-900/20">
              <span> Book Free Consultation </span>
              <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          </div>

          {/* Right Content: Photo-Collage Map */}
          <div className="relative group overflow-visible">
            <div className="relative z-10 transition-transform duration-1000">
              <Image 
                src="/Website World Map Cropped.png" 
                alt="Global Reach Patient Stories Collage Map" 
                width={1000} 
                height={800} 
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] saturate-[1.1] scale-110 lg:scale-125 xl:scale-140 transition-transform"
                priority
              />
            </div>
            
            {/* Map Underglow */}
            <div className="absolute inset-0 bg-blue-400/20 blur-[100px] -z-10 transform scale-90" />
          </div>
        </div>

        {/* Separator Line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-16" />

       {/* Statistics Bar */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center justify-items-center">
  {STATS.map((stat, idx) => (
    <div key={idx} className="space-y-1">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter">
        {stat.value}
      </div>
      <div className="text-sm font-bold text-blue-100/60 uppercase tracking-widest">
        {stat.label}
      </div>
    </div>
  ))}
</div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
