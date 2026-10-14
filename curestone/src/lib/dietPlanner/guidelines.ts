import type { DietPlanInput, DietPlanTargets } from "./types";

/**
 * Deterministic, plain-language guideline bullets built from the computed
 * targets — not AI-generated, so these never drift from the numbers shown
 * elsewhere on the same plan.
 */
export function buildGuidelines(targets: DietPlanTargets, input: DietPlanInput): string[] {
  const guidelines: string[] = [
    `Drink ${(targets.hydrationMlPerDay / 1000).toFixed(1)} litres of water daily — helps flush out stone-forming minerals.`,
    `Keep sodium under ${targets.sodiumCapMg}mg/day — reduces calcium in urine.`,
  ];

  if (input.stoneType === "calcium_oxalate" || !input.stoneType || input.stoneType === "not_sure") {
    guidelines.push("Include more citrate-rich fruits — like lemon, orange and sweet lime.");
  }
  if (input.stoneType === "uric_acid") {
    guidelines.push("Limit high-purine animal protein — a major driver of uric-acid stones.");
  }

  guidelines.push("Maintain a healthy weight — helps reduce stone recurrence.");
  guidelines.push("Follow a balanced, varied diet — focus on whole foods and fibre.");

  return guidelines;
}
