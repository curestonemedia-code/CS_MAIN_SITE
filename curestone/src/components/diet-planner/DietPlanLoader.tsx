"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Droplets, ScanSearch, Sparkles } from "lucide-react";

const STAGES = [
  { icon: User, caption: "Reading your profile" },
  { icon: Droplets, caption: "Calculating hydration & sodium targets" },
  { icon: ScanSearch, caption: "Matching foods from our clinical database" },
  { icon: Sparkles, caption: "Personalizing your plan" },
] as const;

const STAGE_DURATION_MS = 1150;
export const LOADER_TOTAL_MS = STAGES.length * STAGE_DURATION_MS;

export default function DietPlanLoader() {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (stageIndex >= STAGES.length - 1) return;
    const timer = setTimeout(() => setStageIndex((i) => i + 1), STAGE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [stageIndex]);

  const Stage = STAGES[stageIndex];

  return (
    <div className="hidden lg:flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="relative w-28 h-28 mb-10">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/10"
          aria-hidden
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stageIndex}
              initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 10 }}
              transition={{ duration: 0.35 }}
            >
              <Stage.icon className="w-10 h-10 text-primary" strokeWidth={2} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={stageIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-lg font-bold text-foreground mb-6"
        >
          {Stage.caption}…
        </motion.p>
      </AnimatePresence>

      <div className="w-full max-w-xs h-1.5 bg-border/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: LOADER_TOTAL_MS / 1000, ease: "linear" }}
        />
      </div>

      <div className="flex gap-2 mt-8" aria-hidden>
        {STAGES.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i <= stageIndex ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
