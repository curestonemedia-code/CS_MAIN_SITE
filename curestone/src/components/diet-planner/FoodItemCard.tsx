import React from "react";
import SanityImage from "@/components/blog/SanityImage";
import { Apple } from "lucide-react";
import type { FoodItem } from "@/lib/dietPlanner/types";

const CATEGORY_LABELS: Record<FoodItem["category"], string> = {
  fruit: "Fruit",
  vegetable: "Vegetable",
  whole_grain: "Whole Grain",
  legume: "Legume",
  dairy: "Dairy",
  animal_protein: "Animal Protein",
  plant_protein: "Plant Protein",
  beverage: "Beverage",
  spice_herb: "Spice & Herb",
  nut_seed: "Nut & Seed",
  oil_fat: "Oil & Fat",
  sweet_snack: "Sweet & Snack",
  other: "Other",
};

export default function FoodItemCard({ food }: { food: FoodItem }) {
  const hasImage = Boolean(food.image?.asset?.url);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-lg transition-shadow duration-300"
      title={food.clinicalNote}
    >
      <div className="relative aspect-square bg-primary/5 overflow-hidden">
        {hasImage ? (
          <SanityImage
            image={food.image}
            alt={food.name}
            fill
            sizes="(min-width: 1024px) 20vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Apple className="w-8 h-8 text-primary/30" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="font-bold text-foreground text-sm leading-snug truncate">{food.name}</p>
        <p className="text-[9px] font-bold text-text-light uppercase tracking-wider mt-0.5">
          {CATEGORY_LABELS[food.category]}
        </p>
      </div>
    </div>
  );
}
