import { NextRequest, NextResponse } from "next/server";
import { getGroq } from "@/lib/groq";
import { getRatelimit } from "@/lib/rateLimit";
import { fetchActiveFoodItems } from "@/lib/foodItems";
import { computeDietPlan } from "@/lib/dietPlanner/rulesEngine";
import { buildGuidelines } from "@/lib/dietPlanner/guidelines";
import { generateMealPlan } from "@/lib/dietPlanner/mealPlan";
import type { DietPlanInput } from "@/lib/dietPlanner/types";
import { validateNumberInRange, validateSelect } from "@/utils/formValidation";
import { PHONE_DISPLAY } from "@/constants/business";
import {
  ACTIVITY_LEVELS,
  DIETARY_PREFERENCES,
  STONE_STATUSES,
  STONE_TYPES,
} from "@/constants/dietPlannerOptions";

const STONE_STATUS_VALUES = STONE_STATUSES.map((o) => o.value);
const STONE_TYPE_VALUES = STONE_TYPES.map((o) => o.value);
const DIETARY_PREFERENCE_VALUES = DIETARY_PREFERENCES.map((o) => o.value);
const ACTIVITY_LEVEL_VALUES = ACTIVITY_LEVELS.map((o) => o.value);

const DISCLAIMERS = [
  "This planner provides general nutrition guidance for kidney stone prevention — it does not replace a personalized clinical plan.",
  `Always confirm major dietary changes with Dr. Deepanshu Gupta, especially if you're pregnant, have kidney disease, or are diabetic. Call ${PHONE_DISPLAY} to book a consultation.`,
];

function validateInput(body: unknown): { input?: DietPlanInput; errors?: Record<string, string> } {
  if (typeof body !== "object" || body === null) {
    return { errors: { _: "Invalid request body." } };
  }

  const raw = body as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const stoneStatus = String(raw.stoneStatus ?? "");
  const stoneStatusError = validateSelect(stoneStatus, STONE_STATUS_VALUES as unknown as string[], "Stone status");
  if (stoneStatusError) errors.stoneStatus = stoneStatusError;

  const ageYears = raw.ageYears != null ? String(raw.ageYears) : "";
  const ageError = validateNumberInRange(ageYears, 1, 120, "Age");
  if (ageError) errors.ageYears = ageError;

  const weightKg = raw.weightKg != null ? String(raw.weightKg) : "";
  const weightError = validateNumberInRange(weightKg, 10, 300, "Weight");
  if (weightError) errors.weightKg = weightError;

  const heightCm = raw.heightCm != null ? String(raw.heightCm) : "";
  const heightError = validateNumberInRange(heightCm, 50, 250, "Height");
  if (heightError) errors.heightCm = heightError;

  const stoneType = raw.stoneType ? String(raw.stoneType) : "";
  if (stoneType && !STONE_TYPE_VALUES.includes(stoneType as (typeof STONE_TYPE_VALUES)[number])) {
    errors.stoneType = "Select a valid stone type.";
  }

  const dietaryPreference = raw.dietaryPreference ? String(raw.dietaryPreference) : "";
  if (
    dietaryPreference &&
    !DIETARY_PREFERENCE_VALUES.includes(dietaryPreference as (typeof DIETARY_PREFERENCE_VALUES)[number])
  ) {
    errors.dietaryPreference = "Select a valid dietary preference.";
  }

  const activityLevel = raw.activityLevel ? String(raw.activityLevel) : "";
  if (activityLevel && !ACTIVITY_LEVEL_VALUES.includes(activityLevel as (typeof ACTIVITY_LEVEL_VALUES)[number])) {
    errors.activityLevel = "Select a valid activity level.";
  }

  if (Object.keys(errors).length > 0) return { errors };

  const safetyFlagsRaw = raw.safetyFlags as Record<string, unknown> | undefined;

  return {
    input: {
      stoneStatus: stoneStatus as DietPlanInput["stoneStatus"],
      ageYears: ageYears ? Number(ageYears) : undefined,
      weightKg: weightKg ? Number(weightKg) : undefined,
      heightCm: heightCm ? Number(heightCm) : undefined,
      stoneType: (stoneType || undefined) as DietPlanInput["stoneType"],
      dietaryPreference: (dietaryPreference || undefined) as DietPlanInput["dietaryPreference"],
      activityLevel: (activityLevel || undefined) as DietPlanInput["activityLevel"],
      hasRecurrentStones: Boolean(raw.hasRecurrentStones),
      safetyFlags: safetyFlagsRaw
        ? {
            pregnant: Boolean(safetyFlagsRaw.pregnant),
            hasCkdOrDialysis: Boolean(safetyFlagsRaw.hasCkdOrDialysis),
            isDiabetic: Boolean(safetyFlagsRaw.isDiabetic),
          }
        : undefined,
    },
  };
}

function templateNarrative(computation: ReturnType<typeof computeDietPlan>) {
  const { targets, foods } = computation;
  const eat = foods.eatFreely.slice(0, 6).map((f) => f.name);
  const limit = foods.moderate.slice(0, 4).map((f) => f.name);
  const avoid = foods.avoid.slice(0, 4).map((f) => f.name);

  return [
    eat.length ? `- **Eat:** ${eat.join(", ")}` : "",
    limit.length ? `- **Limit:** ${limit.join(", ")}` : "",
    avoid.length ? `- **Avoid:** ${avoid.join(", ")}` : "",
    `- **Water:** ${(targets.hydrationMlPerDay / 1000).toFixed(1)}L/day. **Salt:** under ${targets.sodiumCapMg}mg/day.`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function buildNarrative(computation: ReturnType<typeof computeDietPlan>): Promise<{ narrative: string; source: "ai" | "template" }> {
  const groq = getGroq();
  if (!groq) {
    return { narrative: templateNarrative(computation), source: "template" };
  }

  const { targets, foods, safetyOverride } = computation;
  const payload = {
    targets,
    foods: {
      eatFreely: foods.eatFreely.map((f) => f.name),
      moderate: foods.moderate.map((f) => f.name),
      avoid: foods.avoid.map((f) => f.name),
    },
    safetyOverride,
  };

  const systemPrompt = `You write the shortest possible answer for a kidney-stone diet app. No yapping, no intro, no sign-off, no explanations.
You get ALREADY-COMPUTED targets and a pre-tiered food list. Never invent, add, remove, rename, or re-tier a food or number — use only what's given.
Output EXACTLY 4 lines, each starting with "- **Label:**":
- **Eat:** up to 6 item names, comma-separated, from foods.eatFreely only.
- **Limit:** up to 4 item names from foods.moderate only.
- **Avoid:** up to 4 item names from foods.avoid only.
- **Water:** hydrationMlPerDay in liters (1 decimal) + "L/day." then "Salt: under " + sodiumCapMg + "mg/day."
Nothing else. No headings, no paragraphs, no tables, no extra lines.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(payload) },
      ],
      model: "openai/gpt-oss-20b",
      reasoning_effort: "low",
      temperature: 0.2,
      max_tokens: 150,
      stream: false,
    });

    const text = completion.choices[0]?.message?.content?.trim();
    if (!text) return { narrative: templateNarrative(computation), source: "template" };
    return { narrative: text, source: "ai" };
  } catch (error) {
    console.warn("Diet plan narrative generation failed, falling back to template:", error);
    return { narrative: templateNarrative(computation), source: "template" };
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

  try {
    const ratelimit = getRatelimit();
    const rateLimitResult = await ratelimit?.limit(`diet_plan_${ip}`);

    if (!rateLimitResult) {
      console.warn("Rate limiting disabled: Upstash Redis environment is not configured.");
    } else if (!rateLimitResult.success) {
      const { limit, reset } = rateLimitResult;
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute and try again." },
        {
          status: 429,
          headers: { "X-RateLimit-Limit": limit.toString(), "X-RateLimit-Reset": reset.toString() },
        }
      );
    }
  } catch (rateLimitError) {
    console.warn("Rate limit check failed (Redis might be down), allowing request:", rateLimitError);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { input, errors } = validateInput(body);
  if (!input) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  try {
    const foods = await fetchActiveFoodItems();
    const computation = computeDietPlan(input, foods);
    const [{ narrative, source }, { mealPlan, source: mealPlanSource }] = await Promise.all([
      buildNarrative(computation),
      generateMealPlan(computation.foods),
    ]);
    const guidelines = buildGuidelines(computation.targets, input);

    return NextResponse.json({
      targets: computation.targets,
      foods: computation.foods,
      narrative,
      guidelines,
      mealPlan,
      safetyOverride: computation.safetyOverride,
      disclaimers: DISCLAIMERS,
      meta: {
        generatedAt: new Date().toISOString(),
        rulesConfigVersion: computation.targets.rulesConfigVersion,
        narrativeSource: source,
        mealPlanSource,
      },
    });
  } catch (error) {
    console.error("Diet plan API error:", error);
    return NextResponse.json(
      { error: `Something went wrong building your plan. Please call ${PHONE_DISPLAY} and our team can help directly.` },
      { status: 500 }
    );
  }
}
