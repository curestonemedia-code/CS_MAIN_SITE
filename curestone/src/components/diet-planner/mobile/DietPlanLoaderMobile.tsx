"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Leaf, Sparkles, Check, Lightbulb } from "lucide-react";
import { LOADER_TOTAL_MS } from "../DietPlanLoader";

const CHECKLIST = [
  "Processing your information",
  "Analyzing dietary needs",
  "Matching with stone-safe foods",
  "Finalizing your plan",
];

const STAGE_MS = LOADER_TOTAL_MS / CHECKLIST.length;

export default function DietPlanLoaderMobile() {
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    if (doneCount >= CHECKLIST.length) return;
    const timer = setTimeout(() => setDoneCount((c) => c + 1), STAGE_MS);
    return () => clearTimeout(timer);
  }, [doneCount]);

  return (
    <div className="lg:hidden max-w-md mx-auto bg-white rounded-3xl border border-border/50 shadow-sm p-8 text-center">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <FileText className="w-9 h-9 text-primary" strokeWidth={1.75} />
        </div>
        <span className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent shadow-md flex items-center justify-center">
          <Leaf className="w-4 h-4 text-white" />
        </span>
        <motion.span
          className="absolute -top-2 -left-2 text-amber-400"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.span>
        <motion.span
          className="absolute -top-1 -right-3 text-amber-400"
          animate={{ opacity: [1, 0.3, 1], scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
        >
          <Sparkles className="w-3 h-3" />
        </motion.span>
      </div>

      <h2 className="text-xl font-black text-foreground mb-2">Building your personalized plan</h2>
      <p className="text-sm text-text-light leading-relaxed mb-6">
        Analyzing your details to create the best food guidance for your stone health.
      </p>

      <div className="w-full h-1.5 bg-border/50 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: LOADER_TOTAL_MS / 1000, ease: "linear" }}
        />
      </div>

      <div className="space-y-3 text-left mb-6">
        {CHECKLIST.map((item, i) => {
          const done = i < doneCount;
          return (
            <div key={item} className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  done ? "bg-primary" : "bg-border/60"
                }`}
              >
                {done && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </span>
              <span className={`text-sm font-semibold ${done ? "text-foreground" : "text-text-light"}`}>{item}</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2.5 bg-primary/5 rounded-xl px-4 py-3 text-left">
        <Lightbulb className="w-4 h-4 text-primary shrink-0" />
        <p className="text-xs font-semibold text-text-mid">This usually takes less than a minute.</p>
      </div>
    </div>
  );
}
