import React, { useState } from "react";
import Link from "next/link";
import { Phone, ShieldCheck, Download, Loader2 } from "lucide-react";
import DietPlanHeaderCard from "./DietPlanHeaderCard";
import FoodRecommendations from "./FoodRecommendations";
import SampleMealPlan from "./SampleMealPlan";
import KeyGuidelines from "./KeyGuidelines";
import ProfileSummary from "./ProfileSummary";
import SafetyOverrideBanner from "./SafetyOverrideBanner";
import { PHONE_DISPLAY, PHONE_TEL } from "@/constants/business";
import type { DietPlanApiResponse, DietPlanInput, FoodItem } from "@/lib/dietPlanner/types";

export default function DietPlanResults({
  plan,
  input,
  onReset,
}: {
  plan: DietPlanApiResponse;
  input: DietPlanInput;
  onReset: () => void;
}) {
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const foodsBySlug = new Map<string, FoodItem>();
  for (const food of [...plan.foods.eatFreely, ...plan.foods.moderate, ...plan.foods.avoid]) {
    if (food.slug) foodsBySlug.set(food.slug, food);
  }

  // A real, generated PDF — not a window.print() snapshot of the live page,
  // which only ever captured whatever happened to be expanded on screen
  // (one day of the meal plan, collapsed food categories). Dynamically
  // imported so @react-pdf/renderer's bundle cost is only paid when someone
  // actually clicks Download.
  async function handleDownloadPdf() {
    setGeneratingPdf(true);
    try {
      const [{ pdf }, { default: DietPlanPdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./DietPlanPdfDocument"),
      ]);
      const blob = await pdf(<DietPlanPdfDocument plan={plan} input={input} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "kidney-stone-diet-plan.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setGeneratingPdf(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
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

          <div className="flex flex-col gap-2">
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
              onClick={handleDownloadPdf}
              disabled={generatingPdf}
              className="inline-flex items-center justify-center gap-2 bg-primary/5 text-primary font-bold text-sm px-5 py-3 rounded-full disabled:opacity-60"
            >
              {generatingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Download PDF Plan
                </>
              )}
            </button>
          </div>

          {plan.disclaimers.map((disclaimer) => (
            <p key={disclaimer} className="text-xs text-text-light">
              {disclaimer}
            </p>
          ))}

          <button onClick={onReset} className="text-xs font-bold text-primary hover:underline text-center">
            Build another plan
          </button>
        </aside>
      </div>

      <div className="h-10" />
    </div>
  );
}
