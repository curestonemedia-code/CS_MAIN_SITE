"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, Star, Sparkle, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const AestheticSection = () => {
  const features = [
    { icon: <Droplet className="w-5 h-5" />, title: "Skin Rejuvenation", desc: "Anti-aging & glow treatments" },
    { icon: <Target className="w-5 h-5" />, title: "Laser Hair Reduction", desc: "Comfort-focused treatment plans" },
    { icon: <Sparkle className="w-5 h-5" />, title: "Clinical Aesthetics", desc: "Botox, fillers & injectables" },
    { icon: <Star className="w-5 h-5" />, title: "Hair Restoration", desc: "Advanced PRP & transplants" }
  ];

  return (
    <section className="py-24 bg-zinc-950 text-white overflow-hidden relative">
      {/* Abstract Background pattern for luxury feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row-reverse">
          
          {/* Visual Column */}
          <div className="relative h-[500px] lg:h-[650px] w-full rounded-t-full rounded-b-[3rem] overflow-hidden border border-white/10 shadow-2xl group lg:order-first">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10"></div>
            <Image
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2000&auto=format&fit=crop"
              alt="Aesthetic Medicine"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            
            <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
               <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full flex items-center gap-4">
                 <div className="flex -space-x-3">
                   {[1,2,3].map((i) => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center">
                       <Star className="w-4 h-4 text-amber-400" />
                     </div>
                   ))}
                 </div>
                 <div className="text-left">
                   <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Premium Care</p>
                   <p className="text-sm font-medium">Dermatology Care Team</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-10 lg:order-last">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 text-[10px] font-black tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full uppercase">
                Aesthetic & Dermatology
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Redefining <span className="text-amber-500 italic font-light">Beauty</span> <br className="hidden sm:block" />
                With Precision.
              </h2>
              <p className="text-lg text-zinc-400 font-medium leading-relaxed max-w-lg">
                Step into a world of refined aesthetic medicine. We deliver subtle, natural-looking enhancements using advanced laser and clinical technologies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 pt-4 border-t border-white/10">
              {features.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs font-medium text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link 
                href="/book" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-zinc-950 font-black text-sm rounded-full uppercase tracking-wider hover:bg-amber-500 hover:text-white transition-all duration-300"
              >
                Discover Treatments <Sparkle className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AestheticSection;
