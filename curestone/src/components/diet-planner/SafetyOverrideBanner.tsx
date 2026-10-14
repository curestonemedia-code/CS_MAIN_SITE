import React from "react";
import { AlertTriangle } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/constants/business";
import type { SafetyOverride } from "@/lib/dietPlanner/types";

export default function SafetyOverrideBanner({ safetyOverride }: { safetyOverride: SafetyOverride }) {
  return (
    <div className="flex items-start gap-3 bg-warning-light border border-warning/30 rounded-2xl p-5 mb-8">
      <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" strokeWidth={2} />
      <div>
        <p className="font-bold text-foreground text-sm">Please review this plan with Dr. Deepanshu Gupta</p>
        <p className="text-sm text-text-mid mt-1">{safetyOverride.message}</p>
        <a href={`tel:${PHONE_TEL}`} className="inline-block mt-2 text-sm font-bold text-primary">
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
