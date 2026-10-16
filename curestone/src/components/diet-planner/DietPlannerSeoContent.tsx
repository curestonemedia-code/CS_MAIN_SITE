import Link from "next/link";
import { Check, X, Droplets, ArrowRight } from "lucide-react";

// Static, crawlable content that exists before anyone touches the
// interactive planner above — search engines never see the AI-generated
// plan (it only exists after form submission), so this section carries the
// page's topical SEO weight. Every figure here matches the same constants
// the live tool uses (src/lib/dietPlanner/clinicalConfig.ts,
// rulesEngine.ts) — this is a prose restatement of that logic, not new
// unreviewed medical claims.

const SEVEN_DAY_CHART: { day: number; breakfast: string; lunch: string; snack: string; dinner: string }[] = [
  { day: 1, breakfast: "Vegetable poha + a glass of buttermilk", lunch: "Roti, moong dal, lauki (bottle gourd) sabzi, cucumber salad", snack: "Fresh coconut water", dinner: "Roti, dal, steamed rice" },
  { day: 2, breakfast: "Idli, sambar (light on tomato), coconut chutney", lunch: "Rice, rajma (moderate portion), cabbage sabzi", snack: "Orange or sweet lime", dinner: "Chapati, paneer bhurji, sautéed beans" },
  { day: 3, breakfast: "Vegetable upma + curd", lunch: "Roti, arhar dal, bhindi (okra) sabzi", snack: "Roasted chana + lemon water", dinner: "Vegetable khichdi + curd" },
  { day: 4, breakfast: "Besan chilla + mint chutney", lunch: "Rice, moong dal, cauliflower sabzi", snack: "Banana + a few almonds", dinner: "Roti, light egg curry, salad" },
  { day: 5, breakfast: "Oats porridge with milk", lunch: "Roti, chana dal, pumpkin sabzi", snack: "Watermelon slices", dinner: "Vegetable pulao + raita" },
  { day: 6, breakfast: "Stuffed roti (aloo/gobi, light masala) + curd", lunch: "Rice, masoor dal, tinda sabzi", snack: "Coconut water + roasted makhana", dinner: "Roti, light chicken curry (lean cut), salad" },
  { day: 7, breakfast: "Vegetable daliya (broken wheat)", lunch: "Roti, dal, lauki sabzi, salad", snack: "Fresh fruit bowl", dinner: "Khichdi + curd" },
];

const FOODS_TO_EAT = [
  "Water and citrus drinks — lemon or orange water through the day",
  "Low-oxalate vegetables — cabbage, cauliflower, cucumber, bottle gourd",
  "Dairy in normal amounts — milk, curd, paneer (don't restrict calcium)",
  "Whole grains in moderate portions — rice, roti, oats, daliya",
  "Low-oxalate fruits — apple, watermelon, banana, citrus fruits",
];

const FOODS_TO_LIMIT = [
  "Excess salt and packaged or processed foods",
  "High-oxalate foods in large amounts — spinach, beetroot, excess nuts",
  "Excess animal protein and organ meats, especially for uric acid stones",
  "Sugary drinks, and generally low overall fluid intake",
];

const STONE_TYPE_GUIDANCE = [
  {
    name: "Calcium Oxalate Stones",
    note: "The most common type.",
    body: "Diet focuses on moderating high-oxalate foods while keeping sodium low — sodium drives urinary calcium loss regardless of stone type. Dietary calcium is never restricted; low calcium intake actually raises oxalate absorption.",
  },
  {
    name: "Uric Acid Stones",
    note: "Linked to purine intake.",
    body: "Diet shifts toward limiting high-purine foods — organ meats, excess red meat and certain seafood — since purine breakdown raises uric acid. Plant proteins are generally better tolerated than animal protein here.",
  },
  {
    name: "Struvite Stones",
    note: "Infection-driven.",
    body: "These form from urinary tract infections, so treatment is primarily medical (antibiotics, sometimes surgery) rather than dietary. Diet plays a smaller supporting role — general low-oxalate, low-sodium eating still helps.",
  },
  {
    name: "Cystine Stones",
    note: "A rarer, genetic type.",
    body: "Diet focuses on keeping sodium low and fluid intake high, since both directly affect how much cystine the kidneys need to excrete. This type benefits from the highest hydration targets of the four.",
  },
];

export default function DietPlannerSeoContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 mt-16 space-y-16">
      {/* 7-Day Indian Diet Chart */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 text-center">
          7-Day Indian Kidney Stone Diet Chart
        </h2>
        <p className="text-sm text-text-light text-center max-w-2xl mx-auto mb-7">
          A general-purpose starting point using everyday Indian meals. It isn&apos;t personalized to your stone type — use the free
          planner above for guidance tailored to you.
        </p>
        <div className="bg-white border border-border/50 rounded-2xl overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-border/50 bg-slate-50">
                <th className="text-left font-black text-foreground px-4 py-3 w-16">Day</th>
                <th className="text-left font-black text-foreground px-4 py-3">Breakfast</th>
                <th className="text-left font-black text-foreground px-4 py-3">Lunch</th>
                <th className="text-left font-black text-foreground px-4 py-3">Evening Snack</th>
                <th className="text-left font-black text-foreground px-4 py-3">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {SEVEN_DAY_CHART.map((row) => (
                <tr key={row.day} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-3 font-black text-primary">{row.day}</td>
                  <td className="px-4 py-3 text-text-mid">{row.breakfast}</td>
                  <td className="px-4 py-3 text-text-mid">{row.lunch}</td>
                  <td className="px-4 py-3 text-text-mid">{row.snack}</td>
                  <td className="px-4 py-3 text-text-mid">{row.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-text-light text-center mt-3">
          Illustrative chart, not a clinical prescription. Portions and substitutions should follow your doctor&apos;s advice,
          particularly if you have reduced kidney function, diabetes, or are pregnant.
        </p>
      </section>

      {/* Foods to Eat and Avoid */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-7 text-center">Foods to Eat and Avoid with Kidney Stones</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-accent-light/40 border border-accent/20 rounded-2xl p-6">
            <h3 className="flex items-center gap-2 font-black text-foreground mb-4">
              <Check className="w-5 h-5 text-accent" /> Generally Safe to Eat
            </h3>
            <ul className="space-y-2.5">
              {FOODS_TO_EAT.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-text-mid">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-danger-light/40 border border-danger/20 rounded-2xl p-6">
            <h3 className="flex items-center gap-2 font-black text-foreground mb-4">
              <X className="w-5 h-5 text-danger" /> Limit or Avoid
            </h3>
            <ul className="space-y-2.5">
              {FOODS_TO_LIMIT.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-text-mid">
                  <X className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stone-type guidance */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 text-center">Diet Plans for Different Kidney Stone Types</h2>
        <p className="text-sm text-text-light text-center max-w-2xl mx-auto mb-7">
          Diet guidance isn&apos;t one-size-fits-all — it depends on what your stones are made of.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {STONE_TYPE_GUIDANCE.map((stone) => (
            <div key={stone.name} className="bg-white border border-border/50 rounded-2xl p-6">
              <p className="font-black text-foreground">{stone.name}</p>
              <p className="text-xs font-bold text-primary uppercase tracking-wide mt-0.5 mb-3">{stone.note}</p>
              <p className="text-sm text-text-mid leading-relaxed">{stone.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to use the tool + cross-link */}
      <section className="bg-gradient-to-br from-primary/5 to-blue-50 border border-primary/10 rounded-3xl p-8 text-center">
        <Droplets className="w-8 h-8 text-primary mx-auto mb-3" />
        <h2 className="text-xl md:text-2xl font-black text-foreground mb-2">How to Use Your Personalized Diet Plan</h2>
        <p className="text-sm text-text-mid max-w-xl mx-auto mb-6">
          The chart above is a general starting point. For guidance that accounts for your specific stone type, weight, activity
          level and dietary preference — including your own hydration and sodium targets and a full 7-day meal plan — answer a few
          questions in the free planner above.
        </p>
        <a
          href="#diet-planner-tool"
          className="inline-flex items-center gap-2 bg-gradient-to-br from-blue-900 to-blue-700 text-white font-bold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity no-underline"
        >
          Start Free Diet Planner <ArrowRight className="w-4 h-4" />
        </a>
        <p className="text-xs text-text-light mt-6">
          Want broader general nutrition advice too?{" "}
          <Link href="/diet/right-diet-for-kidney-stones" className="font-bold text-primary hover:underline">
            Read our full guide on the right diet for kidney stones →
          </Link>
        </p>
      </section>
    </div>
  );
}
