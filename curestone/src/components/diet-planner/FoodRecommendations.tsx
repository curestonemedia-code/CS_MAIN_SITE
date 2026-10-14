"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Leaf,
  Apple,
  Wheat,
  Sprout,
  Milk,
  Beef,
  Nut,
  CupSoda,
  Package,
  Lightbulb,
} from "lucide-react";
import FoodItemCard from "./FoodItemCard";
import SanityImage from "@/components/blog/SanityImage";
import type { FoodCategory, FoodItem, FoodItemSelection } from "@/lib/dietPlanner/types";

type Tier = "eatFreely" | "moderate" | "avoid";

const CATEGORY_META: Record<FoodCategory, { label: string; icon: typeof Leaf }> = {
  vegetable: { label: "Vegetables", icon: Leaf },
  fruit: { label: "Fruits", icon: Apple },
  whole_grain: { label: "Grains & Cereals", icon: Wheat },
  legume: { label: "Legumes", icon: Sprout },
  dairy: { label: "Dairy & Calcium", icon: Milk },
  animal_protein: { label: "Meat, Poultry & Fish", icon: Beef },
  plant_protein: { label: "Plant Protein", icon: Sprout },
  beverage: { label: "Beverages", icon: CupSoda },
  spice_herb: { label: "Spices & Herbs", icon: Leaf },
  nut_seed: { label: "Nuts & Seeds", icon: Nut },
  oil_fat: { label: "Oils & Fats", icon: Package },
  sweet_snack: { label: "Sweets & Snacks", icon: Package },
  other: { label: "Other", icon: Package },
};

const TIER_META: Record<Tier, { label: string; badge: string; descriptor: string; dot: string }> = {
  eatFreely: { label: "Eat Freely", badge: "bg-accent-light text-accent", descriptor: "Safe and recommended", dot: "bg-accent" },
  moderate: { label: "Eat in Moderation", badge: "bg-warning-light text-warning", descriptor: "Consume in moderation", dot: "bg-warning" },
  avoid: { label: "Limit / Avoid", badge: "bg-danger-light text-danger", descriptor: "Limit or avoid", dot: "bg-danger" },
};

const TIER_RANK: Record<Tier, number> = { eatFreely: 0, moderate: 1, avoid: 2 };

const FILTERS: { value: "all" | Tier; label: string }[] = [
  { value: "all", label: "All Foods" },
  { value: "eatFreely", label: "Eat Freely" },
  { value: "moderate", label: "Eat in Moderation" },
  { value: "avoid", label: "Limit / Avoid" },
];

export default function FoodRecommendations({ foods }: { foods: FoodItemSelection }) {
  const [filter, setFilter] = useState<"all" | Tier>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const tagged = [
    ...foods.eatFreely.map((food) => ({ food, tier: "eatFreely" as Tier })),
    ...foods.moderate.map((food) => ({ food, tier: "moderate" as Tier })),
    ...foods.avoid.map((food) => ({ food, tier: "avoid" as Tier })),
  ];

  const filteredByTier = filter === "all" ? tagged : tagged.filter((t) => t.tier === filter);

  const matchingSearch = query.trim()
    ? filteredByTier.filter((t) => t.food.name.toLowerCase().includes(query.trim().toLowerCase()))
    : null;

  const categoryMap = new Map<FoodCategory, { items: FoodItem[]; tierCounts: Record<Tier, number> }>();
  for (const { food, tier } of filteredByTier) {
    const entry = categoryMap.get(food.category) || { items: [], tierCounts: { eatFreely: 0, moderate: 0, avoid: 0 } };
    entry.items.push(food);
    entry.tierCounts[tier] += 1;
    categoryMap.set(food.category, entry);
  }
  const categories = Array.from(categoryMap.entries())
    .map(([category, data]) => {
      const dominantTier = (Object.entries(data.tierCounts).sort((a, b) => b[1] - a[1])[0][0] as Tier) ?? "eatFreely";
      return { category, dominantTier, ...data };
    })
    .sort((a, b) => TIER_RANK[a.dominantTier] - TIER_RANK[b.dominantTier] || b.items.length - a.items.length);

  const tip =
    foods.eatFreely.find((f) => f.clinicalNote)?.clinicalNote ||
    "Stay hydrated and include more citrate-rich fruits like lemon and orange.";

  return (
    <div className="mb-10">
      <h2 className="text-xl font-black text-foreground mb-1">Your Food Recommendations</h2>
      <p className="text-sm text-text-light mb-5">Based on your profile and stone risk factors</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`text-xs font-bold px-4 py-2 rounded-full border transition-colors ${
              filter === f.value ? "bg-primary border-primary text-white" : "bg-white border-border/70 text-text-mid"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search foods (e.g. banana, spinach, milk)"
          className="w-full bg-slate-50 border border-transparent focus:border-primary focus:ring-0 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900"
        />
      </div>

      {matchingSearch ? (
        matchingSearch.length ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {matchingSearch.map(({ food }) => (
              <FoodItemCard key={food._id} food={food} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-light py-6 text-center">No foods match &quot;{query}&quot;.</p>
        )
      ) : (
        <div className="space-y-3">
          {categories.map(({ category, items, dominantTier }) => {
            const meta = CATEGORY_META[category];
            const tierMeta = TIER_META[dominantTier];
            const isOpen = expanded === category;
            const thumb = items.find((i) => i.image?.asset?.url);

            return (
              <div key={category} className="border border-border/50 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => setExpanded(isOpen ? null : category)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                >
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tierMeta.badge}`}>
                    <meta.icon className="w-4.5 h-4.5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-foreground text-sm">{meta.label}</p>
                      <span className="text-[10px] font-bold text-text-light bg-slate-100 px-2 py-0.5 rounded-full">
                        {items.length} foods
                      </span>
                    </div>
                    <p className="text-xs text-text-light mt-0.5">{tierMeta.descriptor}</p>
                  </div>
                  {thumb && (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 hidden sm:block">
                      <SanityImage image={thumb.image} alt={thumb.name} fill sizes="40px" className="object-cover" />
                    </div>
                  )}
                  <ChevronDown className={`w-4 h-4 text-text-light shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 grid grid-cols-3 sm:grid-cols-4 gap-3 border-t border-border/50 pt-4">
                    {items.map((food) => (
                      <FoodItemCard key={food._id} food={food} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-2.5 bg-primary/5 rounded-xl px-4 py-3 mt-5">
        <Lightbulb className="w-4 h-4 text-primary shrink-0" />
        <p className="text-xs font-semibold text-text-mid">
          <span className="font-bold text-foreground">Tip for you: </span>
          {tip}
        </p>
      </div>
    </div>
  );
}
