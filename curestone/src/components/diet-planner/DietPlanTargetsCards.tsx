import React from "react";
import { Droplets, Gauge, Bone, Beef } from "lucide-react";
import type { DietPlanTargets } from "@/lib/dietPlanner/types";

export default function DietPlanTargetsCards({ targets }: { targets: DietPlanTargets }) {
  const stats = [
    { icon: Droplets, value: `${(targets.hydrationMlPerDay / 1000).toFixed(1)}L`, label: "Water/day" },
    { icon: Gauge, value: `${targets.sodiumCapMg}mg`, label: "Salt cap" },
    { icon: Bone, value: `${targets.calciumGuidanceMg.min}-${targets.calciumGuidanceMg.max}`, label: "Calcium mg" },
    { icon: Beef, value: `${targets.animalProteinCapG}g`, label: "Protein cap" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-2.5 bg-primary/5 rounded-xl px-3 py-2.5">
          <s.icon className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
          <div className="min-w-0">
            <p className="text-sm font-black text-foreground leading-none truncate">{s.value}</p>
            <p className="text-[9px] font-bold text-text-light uppercase tracking-wider mt-1 truncate">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
