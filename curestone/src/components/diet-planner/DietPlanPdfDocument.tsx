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

const SLOT_META: Record<MealSlot, { label: string; accent: string; bg: string }> = {
  breakfast: { label: "Breakfast", accent: "#b45309", bg: "#fffbeb" },
  lunch: { label: "Lunch", accent: "#1d4ed8", bg: "#eff6ff" },
  evening_snack: { label: "Evening Snack", accent: "#7e22ce", bg: "#faf5ff" },
  dinner: { label: "Dinner", accent: "#4f46e5", bg: "#eef2ff" },
};

const TIER_META: { key: keyof FoodItemSelection; label: string; accent: string; bg: string; blurb: string }[] = [
  { key: "eatFreely", label: "Eat Freely", accent: "#15803d", bg: "#f0fdf4", blurb: "Low-risk for your stone type — build meals around these." },
  { key: "moderate", label: "Eat in Moderation", accent: "#b45309", bg: "#fffbeb", blurb: "Fine in modest portions — don't make these the main event." },
  { key: "avoid", label: "Limit / Avoid", accent: "#b91c1c", bg: "#fef2f2", blurb: "Keep these occasional, not everyday staples." },
];

function labelFor(options: readonly { value: string; label: string }[], value?: string, fallback = "Not specified") {
  return options.find((o) => o.value === value)?.label ?? fallback;
}

const styles = StyleSheet.create({
  page: { padding: 32, paddingBottom: 40, fontSize: 10, fontFamily: "Helvetica", color: "#1e293b" },
  coverRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 16 },
  heroImage: { width: 76, height: 76, borderRadius: 10 },
  h1: { fontSize: 18, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  subtitle: { fontSize: 9, color: "#64748b" },
  sectionTitle: { fontSize: 13, fontFamily: "Helvetica-Bold", marginTop: 18, marginBottom: 8, color: "#0f172a" },
  pageSubtitle: { fontSize: 9, color: "#64748b", marginTop: -4, marginBottom: 14, lineHeight: 1.45, maxWidth: 440 },
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

  // Tier legend (top of the Food Recommendations page) — gives the page
  // visible content immediately, instead of starting straight into a grid
  // that can look sparse if a tier only has a handful of items.
  legendRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 18 },
  legendChip: { flexDirection: "row", alignItems: "center", gap: 6, borderRadius: 8, paddingVertical: 7, paddingHorizontal: 10, width: "31.5%" },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendTextWrap: { flex: 1 },
  legendCount: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  legendBlurb: { fontSize: 6.5, color: "#475569", marginTop: 1, lineHeight: 1.3 },

  tierHeading: { fontSize: 11, fontFamily: "Helvetica-Bold", marginTop: 14, marginBottom: 6 },
  categoryHeading: { fontSize: 9, fontFamily: "Helvetica-Bold", marginTop: 8, marginBottom: 5, color: "#334155" },
  foodGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  foodCard: { width: 76, alignItems: "center", borderRadius: 8, padding: 6, borderWidth: 0.5, borderColor: "#e2e8f0" },
  foodThumb: { width: 54, height: 54, borderRadius: 7, marginBottom: 4 },
  foodThumbPlaceholder: { width: 54, height: 54, borderRadius: 7, marginBottom: 4, backgroundColor: "#e2e8f0" },
  foodName: { fontSize: 7, textAlign: "center", lineHeight: 1.25 },

  // Meal plan — each day is its own card (not a bare list of rows), and
  // meals sit two-per-row so the page uses its full width instead of a
  // single narrow column surrounded by whitespace.
  tipBox: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  tipMarker: { width: 16, height: 16, borderRadius: 8, backgroundColor: "#1d4ed8", color: "#fff", fontSize: 9, fontFamily: "Helvetica-Bold", textAlign: "center", lineHeight: 1.15 },
  tipText: { flex: 1, fontSize: 8, color: "#1e3a8a", lineHeight: 1.4 },
  dayCard: { marginBottom: 14, borderRadius: 10, backgroundColor: "#f8fafc", borderWidth: 0.5, borderColor: "#e2e8f0", padding: 10 },
  dayTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 8, color: "#1e293b" },
  mealGrid: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  mealCard: { width: "48.5%", flexDirection: "row", alignItems: "center", gap: 7, borderRadius: 7, padding: 7 },
  mealThumb: { width: 36, height: 36, borderRadius: 6 },
  mealThumbPlaceholder: { width: 36, height: 36, borderRadius: 6, backgroundColor: "#e2e8f0" },
  mealTextWrap: { flex: 1 },
  mealSlot: { fontFamily: "Helvetica-Bold", fontSize: 7.5, textTransform: "uppercase", letterSpacing: 0.3 },
  mealName: { fontSize: 8, marginTop: 2 },
  mealTags: { fontSize: 6.5, color: "#64748b", marginTop: 2 },

  disclaimerBox: { backgroundColor: "#f8fafc", borderRadius: 8, padding: 10, marginTop: 4 },
  disclaimer: { fontSize: 7, color: "#64748b", marginTop: 3, lineHeight: 1.4 },
  footer: { position: "absolute", bottom: 18, left: 32, right: 32, fontSize: 7, color: "#94a3b8", textAlign: "center" },
});

function PageFooter() {
  return (
    <Text
      style={styles.footer}
      fixed
      render={({ pageNumber, totalPages }) => `Cure Stone Hospital · thecurestone.com · Page ${pageNumber} of ${totalPages}`}
    />
  );
}

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
        <Image src={proxied(imageUrl, origin, 120)} style={styles.foodThumb} />
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
            <Text style={styles.h1}>
              {input.name ? `Diet Plan For "${input.name}"` : "Your Personalized Kidney Stone Diet Plan"}
            </Text>
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

      {/* Food recommendations get their own page(s) — a legend summarising
          all three tiers up top (so the page has substance even before the
          grid), then a real photo grid per tier/category. */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Food Recommendations</Text>
        <Text style={styles.pageSubtitle}>
          Foods are grouped into three tiers based on your stone type and profile. Swap freely within a tier — exact
          portions matter less than which tier a food sits in.
        </Text>

        <View style={styles.legendRow}>
          {TIER_META.map((tier) => (
            <View key={tier.key} style={[styles.legendChip, { backgroundColor: tier.bg }]}>
              <View style={[styles.legendDot, { backgroundColor: tier.accent }]} />
              <View style={styles.legendTextWrap}>
                <Text style={[styles.legendCount, { color: tier.accent }]}>
                  {plan.foods[tier.key].length} {tier.label}
                </Text>
                <Text style={styles.legendBlurb}>{tier.blurb}</Text>
              </View>
            </View>
          ))}
        </View>

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

        <PageFooter />
      </Page>

      {/* Meal plan on its own page(s) — all 7 days, always, regardless of
          which single day the on-screen tab happens to be showing. Each day
          is a card with a 2-column grid of meals (not a thin single-column
          list), so the page reads as designed rather than a bare table. */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>7-Day Sample Meal Plan</Text>
        <Text style={styles.pageSubtitle}>
          A sample structure for the week ahead — swap any item for another from the same tier on the previous page
          to match your own taste, schedule and budget.
        </Text>

        <View style={styles.tipBox}>
          <Text style={styles.tipMarker}>i</Text>
          <Text style={styles.tipText}>
            Consistency across the week matters more than any single meal. Aim to hit your daily water target
            (previous page) spread evenly through the day, not all at once.
          </Text>
        </View>

        {plan.mealPlan.map((day) => (
          <View key={day.day} style={styles.dayCard} wrap={false}>
            <Text style={styles.dayTitle}>Day {day.day}</Text>
            <View style={styles.mealGrid}>
              {day.meals.map((meal) => {
                const food = meal.primaryFoodSlug ? foodsBySlug.get(meal.primaryFoodSlug) : undefined;
                const imageUrl = food?.image?.asset?.url;
                const slotMeta = SLOT_META[meal.slot];
                return (
                  <View key={meal.slot} style={[styles.mealCard, { backgroundColor: slotMeta.bg }]}>
                    {imageUrl ? (
                      <Image src={proxied(imageUrl, origin, 90)} style={styles.mealThumb} />
                    ) : (
                      <View style={styles.mealThumbPlaceholder} />
                    )}
                    <View style={styles.mealTextWrap}>
                      <Text style={[styles.mealSlot, { color: slotMeta.accent }]}>
                        {slotMeta.label} · {meal.time}
                      </Text>
                      <Text style={styles.mealName}>{meal.name}</Text>
                      {meal.tags.length > 0 && <Text style={styles.mealTags}>{meal.tags.join(", ")}</Text>}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Disclaimers</Text>
        <View style={styles.disclaimerBox}>
          {plan.disclaimers.map((disclaimer, i) => (
            <Text key={i} style={styles.disclaimer}>
              {disclaimer}
            </Text>
          ))}
        </View>

        <PageFooter />
      </Page>
    </Document>
  );
}
