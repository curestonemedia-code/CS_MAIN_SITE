/**
 * Option lists for the kidney stone diet planner form. Kept separate from
 * leadFormOptions.ts, which is hand-synced with the sister Dr. Deepanshu
 * Gupta repo for an unrelated shared lead-capture form — this feature
 * doesn't exist there, so mixing the two would create sync burden for no
 * reason.
 */

export const STONE_STATUSES = [
  { value: "before_surgery", label: "Diagnosed, haven't had surgery yet" },
  { value: "after_surgery", label: "Recovering after surgery" },
  { value: "prevention", label: "No current stone — preventing one" },
] as const;

export const STONE_TYPES = [
  { value: "not_sure", label: "Not sure" },
  { value: "calcium_oxalate", label: "Calcium oxalate (most common)" },
  { value: "uric_acid", label: "Uric acid" },
  { value: "struvite", label: "Struvite (infection stone)" },
  { value: "cystine", label: "Cystine" },
] as const;

export const DIETARY_PREFERENCES = [
  { value: "non_vegetarian", label: "Non-vegetarian" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "eggetarian", label: "Eggetarian" },
] as const;

export const ACTIVITY_LEVELS = [
  { value: "moderate", label: "Moderate (typical daily activity)" },
  { value: "sedentary", label: "Sedentary (mostly seated)" },
  { value: "high_heat_or_exercise", label: "High heat exposure or heavy exercise" },
] as const;
export const DIET_VIDEOS_URL = "https://thecurestone.com/videos/diet";
export const DIET_CONSULTATION_PHONE_DISPLAY = "+91 88003 02166";
export const DIET_CONSULTATION_PHONE_TEL = "+918800302166";
