import type { SanityImage } from "@/lib/blogs";

export type StoneStatus = "before_surgery" | "after_surgery" | "prevention";
export type StoneType = "calcium_oxalate" | "uric_acid" | "struvite" | "cystine" | "not_sure";
export type DietaryPreference = "vegetarian" | "eggetarian" | "non_vegetarian";
export type ActivityLevel = "sedentary" | "moderate" | "high_heat_or_exercise";
export type FoodLevel = "low" | "moderate" | "high";
export type FoodCategory =
  | "fruit"
  | "vegetable"
  | "whole_grain"
  | "legume"
  | "dairy"
  | "animal_protein"
  | "plant_protein"
  | "beverage"
  | "spice_herb"
  | "nut_seed"
  | "oil_fat"
  | "sweet_snack"
  | "other";

export interface DietPlanInput {
  /** Optional — used only to personalize the generated PDF's title, never sent to the API. */
  name?: string;
  stoneStatus: StoneStatus;
  ageYears?: number;
  weightKg?: number;
  heightCm?: number;
  stoneType?: StoneType;
  dietaryPreference?: DietaryPreference;
  activityLevel?: ActivityLevel;
  hasRecurrentStones?: boolean;
  safetyFlags?: {
    pregnant?: boolean;
    hasCkdOrDialysis?: boolean;
    isDiabetic?: boolean;
  };
}

export interface FoodItem {
  _id: string;
  name: string;
  slug?: string;
  image?: SanityImage;
  category: FoodCategory;
  oxalateLevel: FoodLevel;
  purineLevel: FoodLevel;
  sodiumLevel: FoodLevel;
  isAnimalProtein: boolean;
  isCalciumRich: boolean;
  dietaryType: DietaryPreference;
  clinicalNote?: string;
}

export interface DietPlanTargets {
  hydrationMlPerDay: number;
  hydrationGlassesPerDay: number;
  sodiumCapMg: number;
  calciumGuidanceMg: { min: number; max: number };
  animalProteinCapG: number;
  dailyCalorieKcal: number;
  oxalateStrategy: "standard" | "strict";
  rulesConfigVersion: string;
}

export interface FoodItemSelection {
  eatFreely: FoodItem[];
  moderate: FoodItem[];
  avoid: FoodItem[];
}

export interface SafetyOverride {
  reason: string;
  message: string;
}

export interface DietPlanComputation {
  targets: DietPlanTargets;
  foods: FoodItemSelection;
  safetyOverride?: SafetyOverride;
}

export type MealSlot = "breakfast" | "lunch" | "evening_snack" | "dinner";

export interface Meal {
  slot: MealSlot;
  time: string;
  name: string;
  tags: string[];
  /** Slug of the FoodItem this meal is built around — used to pick a representative photo. */
  primaryFoodSlug?: string;
}

export interface MealPlanDay {
  day: number;
  meals: Meal[];
}

export interface DietPlanApiResponse {
  targets: DietPlanTargets;
  foods: FoodItemSelection;
  narrative: string;
  guidelines: string[];
  mealPlan: MealPlanDay[];
  safetyOverride?: SafetyOverride;
  disclaimers: string[];
  meta: {
    generatedAt: string;
    rulesConfigVersion: string;
    narrativeSource: "ai" | "template";
    mealPlanSource: "ai" | "template";
  };
}
