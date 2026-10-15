import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { STONE_STATUSES, STONE_TYPES, DIETARY_PREFERENCES, ACTIVITY_LEVELS } from "@/constants/dietPlannerOptions";
import type { DietPlanApiResponse, DietPlanInput, FoodCategory, FoodItem, FoodItemSelection, MealSlot } from "@/lib/dietPlanner/types";

// A real, generated PDF (not a window.print() snapshot of the live page) —
// every detail is rendered here directly from the plan data, regardless of
// what's expanded/collapsed in the on-screen UI. In particular, the meal
// plan always prints all 7 days in one consistent repeating block, never
// just the one day the UI happens to have selected. Food photos (same
// Sanity-hosted images used on screen) are embedded directly rather than
// just listing names, so the PDF doesn't read as a bare text dump.

const CATEGORY_LABELS: Record<FoodCategory, string> = {
  vegetable: "Vegetables",
  fruit: "Fruits",
  whole_grain: "Grains & Cereals",
  legume: "Legumes",
  dairy: "Dairy & Calcium",
  animal_protein: "Meat, Poultry & Fish",
  plant_protein: "Plant Protein",
  beverage: "Beverages",
  spice_herb: "Spices & Herbs",
  nut_seed: "Nuts & Seeds",
  oil_fat: "Oils & Fats",
  sweet_snack: "Sweets & Snacks",
  other: "Other",
};

const SLOT_LABELS: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  evening_snack: "Evening Snack",
  dinner: "Dinner",
};

const TIER_META: { key: keyof FoodItemSelection; label: string; accent: string; bg: string }[] = [
  { key: "eatFreely", label: "Eat Freely", accent: "#15803d", bg: "#f0fdf4" },
  { key: "moderate", label: "Eat in Moderation", accent: "#b45309", bg: "#fffbeb" },
  { key: "avoid", label: "Limit / Avoid", accent: "#b91c1c", bg: "#fef2f2" },
];

function labelFor(options: readonly { value: string; label: string }[], value?: string, fallback = "Not specified") {
  return options.find((o) => o.value === value)?.label ?? fallback;
}

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, fontFamily: "Helvetica", color: "#1e293b" },
  coverRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 16 },
  heroImage: { width: 76, height: 76, borderRadius: 10 },
  h1: { fontSize: 18, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  subtitle: { fontSize: 9, color: "#64748b" },
  sectionTitle: { fontSize: 13, fontFamily: "Helvetica-Bold", marginTop: 18, marginBottom: 8, color: "#0f172a" },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 6 },
  statBox: { width: "23%", backgroundColor: "#f1f5f9", borderRadius: 6, padding: 8 },
  statValue: { fontSize: 12, fontFamily: "Helvetica-Bold" },
  statLabel: { fontSize: 7, color: "#64748b", textTransform: "uppercase", marginTop: 2 },
  targetsNote: { fontSize: 8, color: "#64748b" },
  profileGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  profileBox: { width: "31%", backgroundColor: "#f8fafc", borderRadius: 6, padding: 8 },
  profileValue: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  profileLabel: { fontSize: 7, color: "#64748b", textTransform: "uppercase", marginTop: 2 },
  guidelineRow: { flexDirection: "row", marginBottom: 5 },
  bullet: { width: 10 },
  guidelineText: { flex: 1 },
  tierHeading: { fontSize: 11, fontFamily: "Helvetica-Bold", marginTop: 12, marginBottom: 5 },
  categoryHeading: { fontSize: 9, fontFamily: "Helvetica-Bold", marginTop: 7, marginBottom: 4, color: "#334155" },
  foodGrid: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  foodCard: { width: 64, alignItems: "center", borderRadius: 6, padding: 4 },
  foodThumb: { width: 44, height: 44, borderRadius: 6, marginBottom: 3 },
  foodThumbPlaceholder: { width: 44, height: 44, borderRadius: 6, marginBottom: 3, backgroundColor: "#e2e8f0" },
  foodName: { fontSize: 6.5, textAlign: "center", lineHeight: 1.2 },
  dayBlock: { marginBottom: 14 },
  dayTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 6, backgroundColor: "#eef2ff", padding: 5, borderRadius: 4 },
  mealRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 5,
  },
  mealThumb: { width: 32, height: 32, borderRadius: 5 },
  mealThumbPlaceholder: { width: 32, height: 32, borderRadius: 5, backgroundColor: "#e2e8f0" },
  mealSlot: { width: "25%", fontFamily: "Helvetica-Bold", fontSize: 8 },
  mealName: { width: "40%", fontSize: 8 },
  mealTags: { width: "25%", fontSize: 7, color: "#64748b", textAlign: "right" },
  disclaimer: { fontSize: 7, color: "#94a3b8", marginTop: 3 },
  footer: { position: "absolute", bottom: 18, left: 32, right: 32, fontSize: 7, color: "#94a3b8", textAlign: "center" },
});

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ProfileBox({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.profileBox}>
      <Text style={styles.profileValue}>{value}</Text>
      <Text style={styles.profileLabel}>{label}</Text>
    </View>
  );
}

// cdn.sanity.io doesn't send Access-Control-Allow-Origin, so this browser's
// fetch() for the raw bytes (needed to embed images in the generated PDF)
// gets blocked by CORS even though the same URL displays fine in an <img>
// tag everywhere else on the site. Routing through our own /api/image-proxy
// sidesteps that — see that route for details.
//
// `size` requests a resized, compressed rendition straight from Sanity's
// own image pipeline (standard query params on any cdn.sanity.io asset URL)
// instead of fetching the full original — these print at most ~50pt in the
// PDF, so embedding e.g. a 2000x1333 original per food (the unscaled
// originals here) inflated a single plan's PDF to 30+MB for nothing.
function proxied(url: string, origin: string, size: number): string {
  const resized = `${url}?w=${size}&h=${size}&fit=crop&q=70&auto=format`;
  return `${origin}/api/image-proxy?url=${encodeURIComponent(resized)}`;
}

function FoodCard({ food, bg, origin }: { food: FoodItem; bg: string; origin: string }) {
  const imageUrl = food.image?.asset?.url;
  return (
    <View style={[styles.foodCard, { backgroundColor: bg }]}>
      {imageUrl ? (
        <Image src={proxied(imageUrl, origin, 100)} style={styles.foodThumb} />
      ) : (
        <View style={styles.foodThumbPlaceholder} />
      )}
      <Text style={styles.foodName}>{food.name}</Text>
    </View>
  );
}

function groupByCategory(foods: FoodItem[]): [FoodCategory, FoodItem[]][] {
  const map = new Map<FoodCategory, FoodItem[]>();
  for (const food of foods) {
    const list = map.get(food.category) ?? [];
    list.push(food);
    map.set(food.category, list);
  }
  return Array.from(map.entries());
}

export default function DietPlanPdfDocument({
  plan,
  input,
  foodsBySlug,
  heroImageUrl,
  origin,
}: {
  plan: DietPlanApiResponse;
  input: DietPlanInput;
  foodsBySlug: Map<string, FoodItem>;
  heroImageUrl?: string;
  origin: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.coverRow}>
          {heroImageUrl && <Image src={heroImageUrl} style={styles.heroImage} />}
          <View style={{ flex: 1 }}>
            <Text style={styles.h1}>Your Personalized Kidney Stone Diet Plan</Text>
            <Text style={styles.subtitle}>
              Generated{" "}
              {new Date(plan.meta.generatedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })} ·
              Cure Stone Hospital · thecurestone.com
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Daily Targets</Text>
        <View style={styles.statsGrid}>
          <StatBox value={`${(plan.targets.hydrationMlPerDay / 1000).toFixed(1)}L`} label="Daily Water" />
          <StatBox value={`${plan.targets.dailyCalorieKcal} kcal`} label="Daily Intake (est.)" />
          <StatBox value={`${plan.targets.animalProteinCapG}g`} label="Protein Cap" />
          <StatBox value={`<${plan.targets.sodiumCapMg}mg`} label="Sodium Limit" />
        </View>
        <Text style={styles.targetsNote}>
          Calcium guidance: {plan.targets.calciumGuidanceMg.min}–{plan.targets.calciumGuidanceMg.max}mg/day (never restrict dietary
          calcium, even on a low-oxalate plan).
        </Text>

        <Text style={styles.sectionTitle}>Your Profile</Text>
        <View style={styles.profileGrid}>
          <ProfileBox value={labelFor(STONE_STATUSES, input.stoneStatus)} label="Stone Status" />
          <ProfileBox value={input.ageYears ? `${input.ageYears} years` : "Not specified"} label="Age" />
          <ProfileBox value={input.weightKg ? `${input.weightKg} kg` : "Not specified"} label="Weight" />
          <ProfileBox value={input.heightCm ? `${input.heightCm} cm` : "Not specified"} label="Height" />
          <ProfileBox value={labelFor(STONE_TYPES, input.stoneType)} label="Stone Type" />
          <ProfileBox value={labelFor(DIETARY_PREFERENCES, input.dietaryPreference, "Non-vegetarian")} label="Diet Preference" />
          <ProfileBox value={labelFor(ACTIVITY_LEVELS, input.activityLevel, "Moderate")} label="Activity Level" />
        </View>

        <Text style={styles.sectionTitle}>Key Guidelines</Text>
        {plan.guidelines.map((guideline, i) => (
          <View key={i} style={styles.guidelineRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.guidelineText}>{guideline}</Text>
          </View>
        ))}
      </Page>

      {/* Food recommendations get their own page(s) — a real photo grid per
          tier/category, not a bare list of names. */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Food Recommendations</Text>
        {TIER_META.map((tier) => {
          const foods = plan.foods[tier.key];
          if (!foods.length) return null;
          return (
            <View key={tier.key}>
              <Text style={[styles.tierHeading, { color: tier.accent }]}>
                {tier.label} ({foods.length})
              </Text>
              {groupByCategory(foods).map(([category, items]) => (
                <View key={category} wrap={false}>
                  <Text style={styles.categoryHeading}>{CATEGORY_LABELS[category]}</Text>
                  <View style={styles.foodGrid}>
                    {items.map((food) => (
                      <FoodCard key={food._id} food={food} bg={tier.bg} origin={origin} />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          );
        })}
      </Page>

      {/* Meal plan on its own page(s) — all 7 days, always, regardless of
          which single day the on-screen tab happens to be showing. Each meal
          shows its representative food photo, same as the on-screen cards. */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>7-Day Sample Meal Plan</Text>
        {plan.mealPlan.map((day) => (
          <View key={day.day} style={styles.dayBlock} wrap={false}>
            <Text style={styles.dayTitle}>Day {day.day}</Text>
            {day.meals.map((meal) => {
              const food = meal.primaryFoodSlug ? foodsBySlug.get(meal.primaryFoodSlug) : undefined;
              const imageUrl = food?.image?.asset?.url;
              return (
                <View key={meal.slot} style={styles.mealRow}>
                  {imageUrl ? (
                    <Image src={proxied(imageUrl, origin, 70)} style={styles.mealThumb} />
                  ) : (
                    <View style={styles.mealThumbPlaceholder} />
                  )}
                  <Text style={styles.mealSlot}>
                    {SLOT_LABELS[meal.slot]} · {meal.time}
                  </Text>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealTags}>{meal.tags.join(", ")}</Text>
                </View>
              );
            })}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Disclaimers</Text>
        {plan.disclaimers.map((disclaimer, i) => (
          <Text key={i} style={styles.disclaimer}>
            {disclaimer}
          </Text>
        ))}

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) => `Cure Stone Hospital · thecurestone.com · Page ${pageNumber} of ${totalPages}`}
        />
      </Page>
    </Document>
  );
}
