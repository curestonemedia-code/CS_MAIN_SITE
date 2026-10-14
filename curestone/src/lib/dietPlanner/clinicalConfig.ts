/**
 * TODO(clinical-review): Dr. Deepanshu Gupta must review every constant
 * below before the diet planner ships live. These are a first-pass drawn
 * from general published urology/nutrition guidance for kidney stone
 * prevention, not his personal protocol — treat this file as a draft
 * pending clinical sign-off, not a finished answer.
 */

export const HYDRATION_ML_PER_KG = 35;

export const HYDRATION_ACTIVITY_MULTIPLIER = {
  sedentary: 1.0,
  moderate: 1.1,
  high_heat_or_exercise: 1.25,
} as const;

// A kidney stone patient recovering from surgery is advised to flush the
// urinary tract more aggressively than the general prevention case.
export const POST_SURGERY_HYDRATION_BUMP = 1.1;

export const HYDRATION_FLOOR_ML = 2000;
export const HYDRATION_CEILING_ML = 4000;

// Used only when the visitor skips the (optional) weight field.
export const DEFAULT_WEIGHT_KG = 65;

export const SODIUM_CAP_MG = 2300;

// Dietary calcium should NOT be restricted for stone formers — low dietary
// calcium increases oxalate absorption in the gut, which raises urinary
// oxalate and stone risk. This range is a normal adult intake target, not
// a cap.
export const CALCIUM_DIETARY_TARGET_MG = { min: 1000, max: 1200 };

export const ANIMAL_PROTEIN_CAP_G_PER_DAY = 170;

// Rough wellness estimate only (no gender/body-fat input is collected) — not
// a clinical calorie prescription. kcal per kg bodyweight per day, scaled by
// activity level, is a standard quick-estimate approach when a full
// Mifflin-St Jeor calculation isn't possible.
export const CALORIES_PER_KG_BY_ACTIVITY = {
  sedentary: 28,
  moderate: 32,
  high_heat_or_exercise: 36,
} as const;

export const CALORIE_FLOOR_KCAL = 1200;
export const CALORIE_CEILING_KCAL = 3200;

export const RULES_CONFIG_VERSION = "2026-10-14-draft1";
