import {
  ANIMAL_PROTEIN_CAP_G_PER_DAY,
  CALCIUM_DIETARY_TARGET_MG,
  CALORIE_CEILING_KCAL,
  CALORIE_FLOOR_KCAL,
  CALORIES_PER_KG_BY_ACTIVITY,
  DEFAULT_WEIGHT_KG,
  HYDRATION_ACTIVITY_MULTIPLIER,
  HYDRATION_CEILING_ML,
  HYDRATION_FLOOR_ML,
  HYDRATION_ML_PER_KG,
  POST_SURGERY_HYDRATION_BUMP,
  RULES_CONFIG_VERSION,
  SODIUM_CAP_MG,
} from "./clinicalConfig";
import type {
  DietPlanComputation,
  DietPlanInput,
  DietPlanTargets,
  FoodItem,
  FoodItemSelection,
} from "./types";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function computeTargets(input: DietPlanInput): DietPlanTargets {
  const weightKg = input.weightKg ?? DEFAULT_WEIGHT_KG;
  const activityMultiplier = HYDRATION_ACTIVITY_MULTIPLIER[input.activityLevel ?? "moderate"];
  const postSurgeryBump = input.stoneStatus === "after_surgery" ? POST_SURGERY_HYDRATION_BUMP : 1;

  const hydrationMlPerDay = Math.round(
    clamp(weightKg * HYDRATION_ML_PER_KG * activityMultiplier * postSurgeryBump, HYDRATION_FLOOR_ML, HYDRATION_CEILING_ML)
  );

  const oxalateStrategy =
    input.stoneType === "calcium_oxalate" && input.hasRecurrentStones ? "strict" : "standard";

  const dailyCalorieKcal = Math.round(
    clamp(weightKg * CALORIES_PER_KG_BY_ACTIVITY[input.activityLevel ?? "moderate"], CALORIE_FLOOR_KCAL, CALORIE_CEILING_KCAL) / 50
  ) * 50;

  return {
    hydrationMlPerDay,
    hydrationGlassesPerDay: Math.round(hydrationMlPerDay / 250),
    sodiumCapMg: SODIUM_CAP_MG,
    calciumGuidanceMg: { ...CALCIUM_DIETARY_TARGET_MG },
    animalProteinCapG: ANIMAL_PROTEIN_CAP_G_PER_DAY,
    dailyCalorieKcal,
    oxalateStrategy,
    rulesConfigVersion: RULES_CONFIG_VERSION,
  };
}

function matchesDietaryPreference(food: FoodItem, preference: DietPlanInput["dietaryPreference"]) {
  if (!preference || preference === "non_vegetarian") return true;
  if (preference === "eggetarian") return food.dietaryType !== "non_vegetarian";
  return food.dietaryType === "vegetarian";
}

type Tier = "eatFreely" | "moderate" | "avoid";

function tierFood(food: FoodItem, input: DietPlanInput, oxalateStrategy: DietPlanTargets["oxalateStrategy"]): Tier {
  if (food.isCalciumRich) return "eatFreely";

  if (food.isAnimalProtein) {
    if (input.stoneType === "uric_acid" && food.purineLevel === "high") return "avoid";
    return food.purineLevel === "low" ? "moderate" : "avoid";
  }

  let tier: Tier;
  switch (input.stoneType) {
    case "uric_acid":
      tier = food.purineLevel === "low" ? "eatFreely" : food.purineLevel === "moderate" ? "moderate" : "avoid";
      break;
    case "cystine":
      tier = food.sodiumLevel === "low" ? "eatFreely" : food.sodiumLevel === "moderate" ? "moderate" : "avoid";
      break;
    case "struvite":
      // Struvite stones are infection-driven; diet plays a smaller role —
      // tier everything gently rather than imposing an oxalate-led avoid list.
      tier = food.oxalateLevel === "high" ? "moderate" : "eatFreely";
      break;
    case "calcium_oxalate":
    case "not_sure":
    default:
      if (food.oxalateLevel === "high") {
        tier = oxalateStrategy === "strict" ? "avoid" : "moderate";
      } else if (food.oxalateLevel === "moderate") {
        tier = "moderate";
      } else {
        tier = "eatFreely";
      }
      break;
  }

  // High-sodium foods are capped at "moderate" regardless of stone type —
  // sodium drives urinary calcium loss independent of stone composition.
  if (food.sodiumLevel === "high" && tier === "eatFreely") {
    tier = "moderate";
  }

  return tier;
}

function buildSafetyOverride(input: DietPlanInput) {
  const flags = input.safetyFlags;
  if (!flags) return undefined;

  const reasons: string[] = [];
  if (flags.pregnant) reasons.push("pregnancy");
  if (flags.hasCkdOrDialysis) reasons.push("chronic kidney disease / dialysis");
  if (flags.isDiabetic) reasons.push("diabetes");

  if (!reasons.length) return undefined;

  return {
    reason: reasons.join(", "),
    message:
      "You've indicated " +
      reasons.join(" / ") +
      " — these change dietary calculus significantly. This general plan is a starting point, not a substitute for " +
      "a plan reviewed in person with Dr. Deepanshu Gupta.",
  };
}

export function computeDietPlan(input: DietPlanInput, allFoods: FoodItem[]): DietPlanComputation {
  const targets = computeTargets(input);

  const eligibleFoods = allFoods.filter((food) => matchesDietaryPreference(food, input.dietaryPreference));

  const foods: FoodItemSelection = { eatFreely: [], moderate: [], avoid: [] };
  for (const food of eligibleFoods) {
    const tier = tierFood(food, input, targets.oxalateStrategy);
    foods[tier].push(food);
  }

  return {
    targets,
    foods,
    safetyOverride: buildSafetyOverride(input),
  };
}
