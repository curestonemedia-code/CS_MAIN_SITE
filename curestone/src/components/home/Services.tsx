"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { SERVICES } from '@/constants/services';

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselControls = useAnimation();
  const cardWidth = 296; // 280 (card width) + 16 (gap-4)

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICES.length);
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    carouselControls.start({
      x: -activeIndex * cardWidth,
      transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 }
    });
  }, [activeIndex, carouselControls]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">
            Our Specialties
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Center of Excellence for <span className="text-primary">Kidney Stone</span> Treatment
          </h2>
          <p className="mt-4 text-text-light font-medium max-w-2xl mx-auto text-sm sm:text-base">
            Specialised care across kidney stones, urology & gallbladder — all under one expert roof in Sector 52, Gurgaon.
          </p>
        </div>

        {/* Desktop Grid / Mobile Carousel */}
        <div className="relative">
          {/* Mobile view: Draggable Carousel */}
          <div 
            className="md:hidden -mx-6 px-6 cursor-grab active:cursor-grabbing"
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div 
              animate={carouselControls}
              drag="x"
              dragConstraints={{ right: 0, left: -(SERVICES.length - 1) * cardWidth }}
              onDragStart={() => setIsPaused(true)}
              onDragEnd={(_, info) => {
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold) {
                  setActiveIndex((prev) => Math.min(prev + 1, SERVICES.length - 1));
                } else if (info.offset.x > swipeThreshold) {
                  setActiveIndex((prev) => Math.max(prev - 1, 0));
                }
                setTimeout(() => setIsPaused(false), 3000);
              }}
              className="flex gap-4 pb-8"
            >
              {SERVICES.map((service, i) => (
                <ServiceCard key={i} service={service} />
              ))}
            </motion.div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {SERVICES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "w-8 bg-primary" : "w-2 bg-primary/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Tablet/Desktop view: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <ServiceCard key={i} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: typeof SERVICES[0] }) => (
  <div className="group w-[280px] md:w-full flex-shrink-0 p-6 sm:p-10 bg-white border border-border/50 rounded-3xl shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col items-center text-center">
    <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-primary transition-all duration-500 group-hover:text-white">
      {service.icon}
    </div>
    <h3 className="text-xl font-black text-foreground mb-4">{service.name}</h3>
    <p className="text-text-mid font-medium leading-relaxed mb-8 flex-grow">
      {service.shortDesc}
    </p>
    <Link
      href={`/specialties/${service.slug}`}
      className="text-primary font-black text-sm uppercase tracking-widest hover:tracking-[0.2em] transition-all flex items-center gap-2 group/btn no-underline"
    >
      Explore Excellence <span className="group-hover:translate-x-2 transition-transform">→</span>
    </Link>
  </div>
);

export default Services;
