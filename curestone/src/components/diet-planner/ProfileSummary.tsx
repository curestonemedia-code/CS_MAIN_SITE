import React from "react";
import { Calendar, Scale, Ruler, HeartPulse, Candy, Repeat, Pencil } from "lucide-react";
import { STONE_TYPES, DIETARY_PREFERENCES, ACTIVITY_LEVELS } from "@/constants/dietPlannerOptions";
import type { DietPlanInput } from "@/lib/dietPlanner/types";

function labelFor(options: readonly { value: string; label: string }[], value?: string, fallback = "Not sure") {
  return options.find((o) => o.value === value)?.label ?? fallback;
}

export default function ProfileSummary({ input, onEdit }: { input: DietPlanInput; onEdit: () => void }) {
  const stats = [
    { icon: Calendar, label: "Age", value: input.ageYears ? `${input.ageYears} years` : "—" },
    { icon: Scale, label: "Weight", value: input.weightKg ? `${input.weightKg} kg` : "—" },
    { icon: Ruler, label: "Height", value: input.heightCm ? `${input.heightCm} cm` : "—" },
    { icon: HeartPulse, label: "Stone Type", value: labelFor(STONE_TYPES, input.stoneType) },
    { icon: Candy, label: "Diet Preference", value: labelFor(DIETARY_PREFERENCES, input.dietaryPreference, "Non-vegetarian") },
    { icon: Repeat, label: "Activity Level", value: labelFor(ACTIVITY_LEVELS, input.activityLevel, "Moderate") },
  ];

  return (
    <div className="bg-white rounded-2xl border border-border/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="font-black text-foreground">Your Profile Summary</p>
        <button onClick={onEdit} className="inline-flex items-center gap-1 text-xs font-bold text-primary">
          <Pencil className="w-3 h-3" /> Edit
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <div key={s.label} className="bg-slate-50 rounded-xl p-2.5">
            <s.icon className="w-3.5 h-3.5 text-primary mb-1.5" />
            <p className="text-xs font-black text-foreground leading-snug truncate">{s.value}</p>
            <p className="text-[9px] font-bold text-text-light uppercase tracking-wider mt-0.5 truncate">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
