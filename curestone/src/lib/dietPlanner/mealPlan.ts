import { getGroq } from "@/lib/groq";
import type { FoodItemSelection, Meal, MealPlanDay, MealSlot } from "./types";

const MEAL_SLOTS: { slot: MealSlot; time: string }[] = [
  { slot: "breakfast", time: "7:00 - 8:00 AM" },
  { slot: "lunch", time: "12:30 - 1:30 PM" },
  { slot: "evening_snack", time: "4:00 - 5:00 PM" },
  { slot: "dinner", time: "7:00 - 8:00 PM" },
];

const ALLOWED_TAGS = [
  "Low Sodium",
  "High Protein",
  "Low Oxalate",
  "High Fiber",
  "Rich in Citrate",
  "Antioxidants",
  "Light",
  "Hydrating",
  "Plant-Based",
  "Low Purine",
];

function templateMealPlan(pool: FoodItemSelection["eatFreely"]): MealPlanDay[] {
  if (!pool.length) return [];
  const days: MealPlanDay[] = [];
  for (let day = 1; day <= 7; day++) {
    const meals: Meal[] = MEAL_SLOTS.map((slotDef, i) => {
      const food = pool[(day - 1 + i) % pool.length];
      return {
        slot: slotDef.slot,
        time: slotDef.time,
        name: `${food.name} Bowl`,
        tags: ["Stone-Safe"],
        primaryFoodSlug: food.slug,
      };
    });
    days.push({ day, meals });
  }
  return days;
}

export async function generateMealPlan(
  foods: FoodItemSelection
): Promise<{ mealPlan: MealPlanDay[]; source: "ai" | "template" }> {
  const pool = [...foods.eatFreely, ...foods.moderate];
  const groq = getGroq();

  if (!groq || pool.length < 4) {
    return { mealPlan: templateMealPlan(pool), source: "template" };
  }

  const allowedFoods = pool.map((f) => ({ name: f.name, slug: f.slug }));
  const systemPrompt = `You build a 7-day sample meal plan for a kidney-stone diet app.
You get a list of ALLOWED foods (name + slug) in the user message — use ONLY these foods as meal ingredients, never invent a food not in the list.
Return strict JSON only, matching this shape, nothing else:
{ "days": [ { "day": 1, "meals": [ { "slot": "breakfast|lunch|evening_snack|dinner", "name": "string", "tags": ["string"], "primaryFoodSlug": "string" } ] } ] }
Rules:
- Exactly 7 days, each with exactly 4 meals in this order: breakfast, lunch, evening_snack, dinner.
- "name" is a short real dish name built around the allowed foods (e.g. "Quinoa Salad with Grilled Chicken"), under 6 words.
- "primaryFoodSlug" MUST be one of the allowed slugs and should be the dish's main visual ingredient.
- "tags" is exactly 2 short tags from this list only: ${ALLOWED_TAGS.join(", ")}.
- Vary meals across the week — do not repeat the same dish name twice.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify({ allowedFoods }) },
      ],
      model: "openai/gpt-oss-20b",
      reasoning_effort: "low",
      temperature: 0.5,
      max_tokens: 4000,
      response_format: { type: "json_object" },
      stream: false,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) return { mealPlan: templateMealPlan(pool), source: "template" };

    const parsed = JSON.parse(raw) as {
      days?: Array<{ day: number; meals: Array<{ slot: string; name: string; tags: string[]; primaryFoodSlug: string }> }>;
    };
    const allowedSlugs = new Set(pool.map((f) => f.slug).filter(Boolean));

    const days: MealPlanDay[] = (parsed.days || [])
      .filter((d) => d && Array.isArray(d.meals))
      .slice(0, 7)
      .map((d) => ({
        day: d.day,
        meals: MEAL_SLOTS.map((slotDef) => {
          const match = d.meals.find((m) => m.slot === slotDef.slot);
          const validSlug = match?.primaryFoodSlug && allowedSlugs.has(match.primaryFoodSlug) ? match.primaryFoodSlug : pool[0]?.slug;
          return {
            slot: slotDef.slot,
            time: slotDef.time,
            name: match?.name?.slice(0, 60) || "Stone-Safe Meal",
            tags: Array.isArray(match?.tags) ? match.tags.filter((t) => ALLOWED_TAGS.includes(t)).slice(0, 2) : [],
            primaryFoodSlug: validSlug,
          };
        }),
      }));

    if (days.length !== 7) return { mealPlan: templateMealPlan(pool), source: "template" };
    return { mealPlan: days, source: "ai" };
  } catch (error) {
    console.warn("Meal plan generation failed, falling back to template:", error);
    return { mealPlan: templateMealPlan(pool), source: "template" };
  }
}
