"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";


interface Testimonial {
  id: number;
  title: string;
  name: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  isTall?: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    title: "15mm Kidney Stone RIRS",
    name: "Rahul Agarwal",
    category: "RIRS Surgery",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/4FE-zSpLWPQ?si=oIQ3JlWAWHeJWGAs&amp;controls=0",
    isTall: true,
  },
  {
    id: 2,
    title: "11mm Kidney Stone Removal",
    name: "Baby Bhavika",
    category: "Pediatric Care",
    thumbnail: "/testimonials/11mm.jpg",
    videoUrl: "https://www.youtube.com/embed/4FE-zSpLWPQ?si=oIQ3JlWAWHeJWGAs&amp;controls=0",
  },
  {
    id: 3,
    title: "Assam To Cure Stone",
    name: "Ms Sakshi",
    category: "Stone-Free",
    thumbnail: "/testimonials/11mm.png",
    videoUrl: "https://www.youtube.com/embed/4FE-zSpLWPQ?si=oIQ3JlWAWHeJWGAs&amp;controls=0",
  },
  {
    id: 4,
    title: "14mm Ureter Stone",
    name: "Mr. Devender Singh",
    category: "Laser Surgery",
    thumbnail: "/testimonials/14mm.jpg",
    videoUrl: "https://www.youtube.com/embed/4FE-zSpLWPQ?si=oIQ3JlWAWHeJWGAs&amp;controls=0",
  },
  {
    id: 5,
    title: "Full Family Recovery",
    name: "Madhav Choudhary",
    category: "Urology",
    thumbnail: "/6Tj_fWRvCpo-HD.jpg",
    videoUrl: "https://www.youtube.com/embed/4FE-zSpLWPQ?si=oIQ3JlWAWHeJWGAs&amp;controls=0",
    isTall: true,
  },
  {
    id: 6,
    title: "RIRS Live OT",
    name: "Dr. Deepanshu Gupta",
    category: "Post-Op",
    thumbnail: "/testimonials/20mm.jpg",
    videoUrl: "https://www.youtube.com/embed/4FE-zSpLWPQ?si=oIQ3JlWAWHeJWGAs&amp;controls=0",
  },
  {
    id: 7,
    title: "Live OT",
    name: "Vikram Sharma",
    category: "Laser Treatment",
    thumbnail: "/testimonials/Live OT - Part 4.jpg",
    videoUrl: "https://www.youtube.com/embed/4FE-zSpLWPQ?si=oIQ3JlWAWHeJWGAs&amp;controls=0",
  },
  {
    id: 8,
    title: "Lower Pole",
    name: "Sunita Choudhary",
    category: "Patient Story",
    thumbnail: "/testimonials/Lower Pole.jpg",
    videoUrl: "https://www.youtube.com/embed/4FE-zSpLWPQ?si=oIQ3JlWAWHeJWGAs&amp;controls=0",
  },
];

export default function PatientMosaic() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "unset";
  }, [activeVideo]);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">

        {/* Header - Horizontal Padding kept here */}
        <div className="px-4 sm:px-6 flex flex-col lg:flex-row lg:items-end justify-between mb-10 lg:mb-12 gap-6 lg:gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1]">
              Real Patients.{" "}
              <span className="text-blue-600 italic">Real Voices.</span>
            </h2>
          </div>

          <p className="text-slate-500 text-sm sm:text-base lg:text-lg font-medium max-w-sm border-l-2 border-slate-200 pl-4 sm:pl-6">
            Watch authentic recovery journeys from India&apos;s most advanced
            kidney stone center.
          </p>
        </div>

        {/* Desktop/Tablet Grid View */}
        <div
          className="
          hidden
          sm:grid 
          sm:grid-cols-2 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-4 
          auto-rows-[200px] 
          lg:auto-rows-[220px]
          px-4 sm:px-6
        "
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className={`
                ${item.isTall ? "sm:row-span-2" : "row-span-1"}
              `}
            >
              <TestimonialCard
                item={item}
                onClick={() => setActiveVideo(item.videoUrl)}
              />
            </div>
          ))}
        </div>

        {/* Mobile Auto-Scroll Carousel (Infinite Marquee) */}
        <div className="sm:hidden relative">
          <motion.div
            className="flex gap-4 px-4 pr-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30, // Adjust speed here
              ease: "linear",
              repeat: Infinity
            }}
            style={{ width: "fit-content" }}
          >
            {/* Double the array for seamless infinite loop */}
            {[...TESTIMONIALS, ...TESTIMONIALS].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="w-[280px] h-[340px] shrink-0"
              >
                <TestimonialCard
                  item={item}
                  onClick={() => setActiveVideo(item.videoUrl)}
                />
              </div>
            ))}
          </motion.div>

          {/* Edge Gradients for smooth fade */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl"
              onClick={() => setActiveVideo(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl z-10"
            >
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function TestimonialCard({
  item,
  onClick,
}: {
  item: Testimonial;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative h-full w-full rounded-2xl sm:rounded-[1.5rem] overflow-hidden bg-slate-200 cursor-pointer transition-all duration-500 active:scale-95 hover:shadow-2xl hover:shadow-blue-900/10 border border-slate-100"
    >
      <Image
        src={item.thumbnail}
        alt={item.title}
        fill
        sizes="(max-width: 639px) 280px, (max-width: 1023px) 50vw, (max-width: 1279px) 25vw, 20vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

      {/* Content */}
      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <span className="px-2 py-1 sm:px-2.5 sm:py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[8px] sm:text-[10px] font-bold text-white uppercase tracking-widest">
            {item.category}
          </span>

          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
            ▶
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight line-clamp-2">
            {item.title}
          </h4>
          <p className="text-white/70 text-[10px] sm:text-xs font-medium">
            {item.name}
          </p>
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
    </div>
  );
}
