import React from "react";
import { Droplets, Gauge, Citrus, Dumbbell, Utensils, Beef, Check } from "lucide-react";

function pickIcon(text: string) {
  const t = text.toLowerCase();
  if (t.includes("water") || t.includes("litre") || t.includes("hydrat")) return Droplets;
  if (t.includes("sodium") || t.includes("salt")) return Gauge;
  if (t.includes("citrate") || t.includes("citrus") || t.includes("lemon") || t.includes("fruit")) return Citrus;
  if (t.includes("weight")) return Dumbbell;
  if (t.includes("purine") || t.includes("protein") || t.includes("meat")) return Beef;
  if (t.includes("balanced") || t.includes("varied") || t.includes("fibre") || t.includes("fiber")) return Utensils;
  return Check;
}

export default function KeyGuidelines({ guidelines }: { guidelines: string[] }) {
  return (
    <div className="bg-white rounded-2xl border border-border/50 p-5">
      <p className="font-black text-foreground mb-4">Key Guidelines for You</p>
      <div className="space-y-3.5">
        {guidelines.map((line) => {
          const [bold, ...rest] = line.split(" — ");
          const Icon = pickIcon(line);
          return (
            <div key={line} className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground leading-snug">{bold}</p>
                {rest.length > 0 && <p className="text-xs text-text-light mt-0.5">{rest.join(" — ")}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
