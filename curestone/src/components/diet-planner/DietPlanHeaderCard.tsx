import React from "react";
import Image from "next/image";
import { Droplets, Flame, Leaf, Gauge, Sparkles } from "lucide-react";
import type { DietPlanTargets } from "@/lib/dietPlanner/types";

export default function DietPlanHeaderCard({ targets }: { targets: DietPlanTargets }) {
  const stats = [
    { icon: Droplets, value: `${(targets.hydrationMlPerDay / 1000).toFixed(1)}L`, label: "Daily water" },
    { icon: Flame, value: `${targets.dailyCalorieKcal} kcal`, label: "Daily intake (est.)" },
    { icon: Leaf, value: `${targets.animalProteinCapG}g`, label: "Protein cap" },
    { icon: Gauge, value: `<${targets.sodiumCapMg}mg`, label: "Sodium limit" },
  ];

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center gap-6"
      style={{ background: "linear-gradient(135deg, #eaf0ff 0%, #f3f6ff 50%, #fdf0f3 100%)" }}
    >
      <div className="flex-1 w-full">
        <h1 className="text-2xl sm:text-3xl font-black text-blue-950 mb-2 leading-tight">
          Your Personalized Kidney Stone Diet Plan
        </h1>
        <p className="text-sm text-slate-500 mb-6 max-w-lg">
          Simple food choices, better habits and guidance tailored to your stone type and lifestyle.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2.5">
              <s.icon className="w-4 h-4 text-primary mb-1" strokeWidth={2} />
              <p className="text-sm font-black text-foreground leading-none">{s.value}</p>
              <p className="text-[9px] font-bold text-text-light uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/Colorful Quinoa Chickpea Salad Bowl.png"
            alt="Healthy salad bowl"
            fill
            sizes="176px"
            className="object-cover"
          />
        </div>
        <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent shadow-md flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </span>
      </div>
    </div>
  );
}
