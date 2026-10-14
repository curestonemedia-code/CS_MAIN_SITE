import React from "react";
import FoodItemCard from "./FoodItemCard";
import type { FoodItem } from "@/lib/dietPlanner/types";

const TIER_STYLES = {
  eatFreely: { label: "Eat Freely", badge: "bg-accent-light text-accent" },
  moderate: { label: "In Moderation", badge: "bg-warning-light text-warning" },
  avoid: { label: "Limit / Avoid", badge: "bg-danger-light text-danger" },
} as const;

export default function FoodItemGrid({
  tier,
  foods,
}: {
  tier: keyof typeof TIER_STYLES;
  foods: FoodItem[];
}) {
  if (!foods.length) return null;

  const { label, badge } = TIER_STYLES[tier];

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${badge}`}>
          {label}
        </span>
        <span className="text-xs text-text-light font-medium">{foods.length} items</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {foods.map((food) => (
          <FoodItemCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
}
