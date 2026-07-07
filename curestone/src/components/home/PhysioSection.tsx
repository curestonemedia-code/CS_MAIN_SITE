"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, HeartPulse, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const PhysioSection = () => {
  const features = [
    { icon: <Activity className="w-5 h-5" />, title: "Movement Analysis", desc: "Advanced biomechanical assessments" },
    { icon: <HeartPulse className="w-5 h-5" />, title: "Sports Rehab", desc: "Return to peak performance" },
    { icon: <Shield className="w-5 h-5" />, title: "Pain Management", desc: "Non-invasive holistic care" },
    { icon: <Sparkles className="w-5 h-5" />, title: "Post-Op Recovery", desc: "Accelerated healing protocols" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Column */}
          <div className="space-y-8 z-10">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">
                Restoring Mobility
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                Advanced <span className="text-primary italic">Physiotherapy</span> <br className="hidden sm:block" />
                & Rehabilitation
              </h2>
              <p className="text-lg text-text-light font-medium leading-relaxed max-w-lg">
                Experience world-class physiotherapy designed for elite recovery. We combine evidence-based therapies with cutting-edge technology to restore your body's natural strength and agility.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {features.map((item, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-border/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs font-medium text-text-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Link 
                href="/book" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-white font-black text-sm rounded-full uppercase tracking-wider hover:bg-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                Book Assessment <Activity className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Visual Column */}
          <div className="relative z-10 h-[500px] lg:h-[600px] w-full rounded-[2.5rem] overflow-hidden bg-slate-200 border border-border/50 shadow-2xl group">
            {/* Using a placeholder aesthetic image for Physio if a real one doesn't exist, styled beautifully */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-transparent z-10 opacity-60 mix-blend-multiply group-hover:opacity-40 transition-opacity duration-500"></div>
            <Image
              src="https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=2000&auto=format&fit=crop"
              alt="Advanced Physiotherapy"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Floating Badge */}
            <div className="absolute bottom-8 left-8 z-20 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 max-w-[240px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-black uppercase tracking-widest text-foreground">Active Recovery</span>
              </div>
              <p className="text-sm font-medium text-text-mid leading-snug">Personalized 1-on-1 sessions with expert therapists.</p>
            </div>
          </div>

        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      </div>
    </section>
  );
};

export default PhysioSection;
