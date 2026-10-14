"use client";

import React, { useState } from "react";
import { Sun, Moon, ChevronDown, Utensils } from "lucide-react";
import SanityImage from "@/components/blog/SanityImage";
import type { FoodItem, MealPlanDay, MealSlot } from "@/lib/dietPlanner/types";

const SLOT_ICON: Record<MealSlot, typeof Sun> = {
  breakfast: Sun,
  lunch: Sun,
  evening_snack: Moon,
  dinner: Moon,
};

const SLOT_LABEL: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  evening_snack: "Evening Snack",
  dinner: "Dinner",
};

export default function SampleMealPlan({ mealPlan, foodsBySlug }: { mealPlan: MealPlanDay[]; foodsBySlug: Map<string, FoodItem> }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [showAllDays, setShowAllDays] = useState(false);
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  if (!mealPlan.length) return null;

  const daysToRender = showAllDays ? mealPlan : mealPlan.filter((d) => d.day === selectedDay);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-black text-foreground">Sample Meal Plan</h2>
        {!showAllDays && (
          <button onClick={() => setShowAllDays(true)} className="text-sm font-bold text-primary hover:underline">
            View full plan →
          </button>
        )}
      </div>

      {!showAllDays && (
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {mealPlan.map((d) => (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
              className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-colors ${
                selectedDay === d.day ? "bg-primary border-primary text-white" : "bg-white border-border/70 text-text-mid"
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-8">
        {daysToRender.map((d) => (
          <div key={d.day}>
            {showAllDays && <p className="text-xs font-black text-text-light uppercase tracking-widest mb-3">Day {d.day}</p>}
            <div className="space-y-4">
              {d.meals.map((meal) => {
                const food = meal.primaryFoodSlug ? foodsBySlug.get(meal.primaryFoodSlug) : undefined;
                const Icon = SLOT_ICON[meal.slot];
                const mealKey = `${d.day}-${meal.slot}`;
                const isOpen = expandedMeal === mealKey;

                return (
                  <div key={mealKey} className="bg-white border border-border/50 rounded-2xl p-4">
                    <div className="flex gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-text-light mb-1.5">
                          <Icon className="w-3.5 h-3.5" />
                          {SLOT_LABEL[meal.slot]}
                          <span className="text-text-light font-medium">· {meal.time}</span>
                        </div>
                        <p className="font-bold text-foreground text-sm leading-snug mb-2">{meal.name}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {meal.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-bold text-accent bg-accent-light px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {food?.image?.asset?.url && (
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                          <SanityImage image={food.image} alt={food.name} fill sizes="80px" className="object-cover" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setExpandedMeal(isOpen ? null : mealKey)}
                      className="flex items-center gap-1 text-xs font-bold text-text-light mt-3"
                    >
                      Details <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <p className="text-xs text-text-mid mt-2 pt-2 border-t border-border/50">
                        {food?.clinicalNote || `Built around ${food?.name ?? "your eat-freely list"} — one of the foods your plan recommends.`}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!showAllDays && (
        <button
          onClick={() => setShowAllDays(true)}
          className="w-full flex items-center justify-center gap-2 bg-primary/5 text-primary font-bold text-sm py-3.5 rounded-xl mt-5"
        >
          <Utensils className="w-4 h-4" /> View Full 7-Day Meal Plan
        </button>
      )}
      {showAllDays && (
        <button
          onClick={() => setShowAllDays(false)}
          className="w-full flex items-center justify-center gap-2 bg-primary/5 text-primary font-bold text-sm py-3.5 rounded-xl mt-5"
        >
          Show Day-by-Day View
        </button>
      )}
    </div>
  );
}
