import React from "react";
import Link from "next/link";
import { Phone, ShieldCheck, Download } from "lucide-react";
import DietPlanHeaderCard from "./DietPlanHeaderCard";
import FoodRecommendations from "./FoodRecommendations";
import SampleMealPlan from "./SampleMealPlan";
import KeyGuidelines from "./KeyGuidelines";
import ProfileSummary from "./ProfileSummary";
import SafetyOverrideBanner from "./SafetyOverrideBanner";
import { PHONE_DISPLAY, PHONE_TEL } from "@/constants/business";
import type { DietPlanApiResponse, DietPlanInput, FoodItem } from "@/lib/dietPlanner/types";

const PRINT_STYLES = `
@media print {
  body * { visibility: hidden; }
  .diet-print-area, .diet-print-area * { visibility: visible; }
  .diet-print-area { position: absolute; left: 0; top: 0; width: 100%; }
  .no-print { display: none !important; }
}
`;

export default function DietPlanResults({
  plan,
  input,
  onReset,
}: {
  plan: DietPlanApiResponse;
  input: DietPlanInput;
  onReset: () => void;
}) {
  const foodsBySlug = new Map<string, FoodItem>();
  for (const food of [...plan.foods.eatFreely, ...plan.foods.moderate, ...plan.foods.avoid]) {
    if (food.slug) foodsBySlug.set(food.slug, food);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 diet-print-area">
      <style dangerouslySetInnerHTML={{ __html: PRINT_STYLES }} />

      {plan.safetyOverride && <SafetyOverrideBanner safetyOverride={plan.safetyOverride} />}

      <DietPlanHeaderCard targets={plan.targets} />

      <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
        <div className="min-w-0">
          <FoodRecommendations foods={plan.foods} />
          <SampleMealPlan mealPlan={plan.mealPlan} foodsBySlug={foodsBySlug} />
        </div>

        <aside className="lg:sticky lg:top-24 flex flex-col gap-4 w-full">
          <KeyGuidelines guidelines={plan.guidelines} />
          <ProfileSummary input={input} onEdit={onReset} />

          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-foreground">Built on Clinical Guidelines</p>
              <p className="text-xs text-text-mid mt-0.5">
                This plan follows standard kidney-stone nutrition guidance. Confirm specifics with Dr. Deepanshu Gupta in person.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 no-print">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-blue-900 to-blue-700 text-white font-bold text-sm px-5 py-3 rounded-full hover:opacity-90 transition-opacity no-underline"
            >
              Book an Appointment
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-border/50 text-text-mid font-bold text-sm px-5 py-3 rounded-full hover:border-primary/30 hover:text-primary transition-all no-underline"
            >
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 bg-primary/5 text-primary font-bold text-sm px-5 py-3 rounded-full"
            >
              <Download className="w-4 h-4" /> Download PDF Plan
            </button>
          </div>

          {plan.disclaimers.map((disclaimer) => (
            <p key={disclaimer} className="text-xs text-text-light">
              {disclaimer}
            </p>
          ))}

          <button onClick={onReset} className="text-xs font-bold text-primary hover:underline text-center no-print">
            Build another plan
          </button>
        </aside>
      </div>

      <div className="h-10" />
    </div>
  );
}
