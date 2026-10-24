import { Document, Page, Text, View, Image, Svg, Path, Circle, Link, StyleSheet } from "@react-pdf/renderer";
import { STONE_STATUSES, STONE_TYPES, DIETARY_PREFERENCES, ACTIVITY_LEVELS, DIET_VIDEOS_URL, DIET_CONSULTATION_PHONE_DISPLAY } from "@/constants/dietPlannerOptions";
import type {
  DietPlanApiResponse,
  DietPlanInput,
  FoodCategory,
  FoodItem,
  MealSlot,
  StoneType,
} from "@/lib/dietPlanner/types";

// Card-based "nutrition planner" layout (brand asterisk mark as a faint
// watermark, logo + accent-colour label in the header, icon-badge stat
// cards, a continuous tinted-tag food grid that packs tightly instead of
// one category per row, and a QR-linked footer) — icons are hand-ported
// from lucide-react's path data (24x24, stroke-based) since
// @react-pdf/renderer can't render React DOM/SVG components directly, only
// its own Svg/Path primitives.

const PRIMARY = "#2B5CE6";
const PRIMARY_LIGHT = "#EEF3FF";
const ACCENT = "#16A34A";
const ACCENT_LIGHT = "#DCFCE7";
const WARNING = "#EA580C";
const WARNING_LIGHT = "#FFF7ED";
const DANGER = "#DC2626";
const DANGER_LIGHT = "#FEE2E2";
const INK = "#0f172a";
const MUTED = "#64748b";
const MUTED_LIGHT = "#94a3b8";
const BORDER = "#e2e8f0";

const LOGO_FILE = "PNG-Black-e1664728676618.png";
const WATERMARK_FILE = "Curestone wm.png";
const DOCTOR_PHOTO_FILE = "assets/doctor.png";

const ICON_PATHS = {
  droplets: [
    "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
    "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
  ],
  gauge: ["m12 14 4-4", "M3.34 19a10 10 0 1 1 17.32 0"],
  bone: [
    "M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z",
  ],
  beef: [
    "M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3",
    "m18.5 6 2.19 4.5a6.48 6.48 0 0 1-2.29 7.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5",
  ],
  leaf: [
    "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
    "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",
  ],
  apple: [
    "M12 6.528V3a1 1 0 0 1 1-1h0",
    "M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21",
  ],
  wheat: [
    "M2 22 16 8",
    "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
    "M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
    "M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
    "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z",
    "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
    "M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
    "M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
  ],
  sprout: [
    "M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3",
    "M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4",
    "M5 21h14",
  ],
  milk: [
    "M8 2h8",
    "M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2",
    "M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0",
  ],
  cupSoda: [
    "m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8",
    "M5 8h14",
    "M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0",
    "m12 8 1-6h2",
  ],
  nut: [
    "M12 4V2",
    "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4",
    "M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z",
  ],
  droplet: [
    "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
  ],
  candy: [
    "M10 7v10.9",
    "M14 6.1V17",
    "M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4",
    "M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07",
    "M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4",
  ],
  check: ["M20 6 9 17l-5-5"],
  utensils: [
    "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",
    "M7 2v20",
    "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",
  ],
} as const;

type IconKey = keyof typeof ICON_PATHS;

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

const CATEGORY_ICON: Record<FoodCategory, IconKey> = {
  vegetable: "leaf",
  fruit: "apple",
  whole_grain: "wheat",
  legume: "sprout",
  dairy: "milk",
  animal_protein: "beef",
  plant_protein: "sprout",
  beverage: "cupSoda",
  spice_herb: "leaf",
  nut_seed: "nut",
  oil_fat: "droplet",
  sweet_snack: "candy",
  other: "leaf",
};

const SLOT_LABELS: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  evening_snack: "Evening Snack",
  dinner: "Dinner",
};

const STONE_TYPE_PILL_LABEL: Partial<Record<StoneType, string>> = {
  calcium_oxalate: "Calcium oxalate stone",
  uric_acid: "Uric acid stone",
  struvite: "Struvite stone",
  cystine: "Cystine stone",
};

function stonePillText(input: DietPlanInput): string {
  if (input.stoneType && STONE_TYPE_PILL_LABEL[input.stoneType]) return STONE_TYPE_PILL_LABEL[input.stoneType]!;
  return "General guidance";
}

function labelFor(options: readonly { value: string; label: string }[], value?: string, fallback = "Not specified") {
  return options.find((o) => o.value === value)?.label ?? fallback;
}

// cdn.sanity.io doesn't send Access-Control-Allow-Origin, so this browser's
// fetch() for the raw bytes (needed to embed images in the generated PDF)
// gets blocked by CORS even though the same URL displays fine in HTML image elements
// tag everywhere else on the site. Routing through our own /api/image-proxy
// sidesteps that — see that route for details. `size` requests a resized,
// compressed rendition straight from Sanity's own image pipeline instead of
// the full original, which is what inflated an earlier version of this PDF
// to 30+MB for photos that print at ~50pt.
function proxied(url: string, origin: string, size: number): string {
  const resized = `${url}?w=${size}&h=${size}&fit=crop&q=70&auto=format`;
  return `${origin}/api/image-proxy?url=${encodeURIComponent(resized)}`;
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

// Each category becomes its own framed, tinted card (icon + name header,
// then a small photo grid) rather than a bare strip. Cards are ~half the
// page wide and flow through one flex-wrap row (not two pre-split column
// containers) — @react-pdf/renderer can break a page between independent
// wrapped siblings, but a tall two-column block built as two separate
// side-by-side Views gets measured as one atomic unit and jumps to the
// next page as a whole the moment it doesn't fit, stranding a nearly
// empty page behind it. Flowing cards as siblings avoids that.

// "Choose these more often" must always read as one page, and "Eat in
// moderation" + "Limit/avoid" must always read as one page together — but a
// stone profile can realistically come back with anywhere from 3 to 40+
// foods in a tier. Rather than one fixed card size (which either wastes
// space for a short list or overflows a long one), the grid picks the
// densest preset that still comfortably fits, and any single category long
// enough to blow the budget on its own gets truncated with a "+N more" tag
// — a hard ceiling so "always fits" holds regardless of how much data
// comes back, not just for the profiles this was tested against.
interface GridDensity {
  thumb: number;
  gap: number;
  pad: number;
  headerFont: number;
  nameFont: number;
  cardGap: number;
  iconSize: number;
  maxItemsPerCard: number;
}

const GRID_DENSITIES: GridDensity[] = [
  { thumb: 54, gap: 8, pad: 11, headerFont: 9.5, nameFont: 7, cardGap: 11, iconSize: 13, maxItemsPerCard: 9 },
  { thumb: 44, gap: 7, pad: 9, headerFont: 8.6, nameFont: 6.4, cardGap: 9, iconSize: 11, maxItemsPerCard: 8 },
  { thumb: 34, gap: 6, pad: 8, headerFont: 7.8, nameFont: 5.8, cardGap: 8, iconSize: 10, maxItemsPerCard: 7 },
  { thumb: 26, gap: 5, pad: 6, headerFont: 7, nameFont: 5.3, cardGap: 6, iconSize: 9, maxItemsPerCard: 6 },
  { thumb: 20, gap: 4, pad: 5, headerFont: 6.3, nameFont: 4.9, cardGap: 5, iconSize: 8, maxItemsPerCard: 5 },
];

// A category card's own column is roughly half the page's usable width.
const GRID_COLUMN_WIDTH_PT = 250;

function estimateCardHeight(itemCount: number, d: GridDensity): number {
  const innerWidth = GRID_COLUMN_WIDTH_PT - d.pad * 2;
  const perRow = Math.max(1, Math.floor((innerWidth + d.gap) / (d.thumb + d.gap)));
  const shown = Math.min(itemCount, d.maxItemsPerCard);
  const rows = Math.max(1, Math.ceil(shown / perRow));
  const headerH = d.headerFont * 1.25 + 7;
  const rowH = d.thumb + 4 + d.nameFont * 1.2 * 2; // thumb + its own margin + up to 2 lines of name
  return headerH + rows * rowH + d.pad * 2 + d.cardGap;
}

// Mirrors the real flex-wrap grid's greedy packing (not a strict 50/50
// split) closely enough to predict whether a set of category groups will
// fit a given vertical budget.
function estimateSectionHeight(groups: [FoodCategory, FoodItem[]][], d: GridDensity): number {
  const heights = groups.map(([, items]) => estimateCardHeight(items.length, d));
  let col0 = 0;
  let col1 = 0;
  for (const h of heights) {
    if (col0 <= col1) col0 += h;
    else col1 += h;
  }
  return Math.max(col0, col1);
}

function pickDensity(sections: [FoodCategory, FoodItem[]][][], budget: number): GridDensity {
  for (const d of GRID_DENSITIES) {
    const total = sections.reduce((sum, groups) => sum + estimateSectionHeight(groups, d), 0);
    if (total <= budget) return d;
  }
  return GRID_DENSITIES[GRID_DENSITIES.length - 1];
}

// Vertical room left for the category grid(s) after the logo, title,
// subtitle and tier banner(s) on a food-tier page (A4 content height minus
// that fixed chrome, with a safety margin for estimation error).
// Measured against real renders, with a wide margin — the greedy
// two-column estimate runs a bit optimistic versus the real flex-wrap
// layout, and the single-banner budget also has to leave room for the
// "Tip" bar that follows the grid on that page.
const SINGLE_BANNER_GRID_BUDGET = 454;
const DUAL_BANNER_GRID_BUDGET = 394;

const styles = StyleSheet.create({
  // Text and imagery keep a readable inset; header and footer rules are full bleed.
  page: { paddingTop: 88, paddingBottom: 96, paddingHorizontal: 32, fontFamily: "Helvetica", fontSize: 9, color: INK },
  watermark: { position: "absolute", width: 300, height: 300, top: 260, left: 148, opacity: 0.035 },

  fullBleedHeader: { position: "absolute", top: 0, left: 0, right: 0, width: "100%", backgroundColor: "#FFFFFF" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", height: 62, paddingHorizontal: 32 },
  logo: { width: 88, height: 34, objectFit: "contain" },
  headerLabelRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  headerLabelBar: { width: 2.5, height: 11, borderRadius: 1.5 },
  headerLabel: { fontSize: 7.5, fontFamily: "Helvetica-Bold", letterSpacing: 1 },
  headerRule: { borderBottomWidth: 1.5, borderBottomColor: PRIMARY, width: "100%", margin: 0, padding: 0 },

  heroRow: { flexDirection: "row", alignItems: "flex-start", gap: 16, marginBottom: 4 },
  heroLeft: { flex: 1 },
  titleBlack: { fontSize: 25, fontFamily: "Helvetica-Bold", color: INK, lineHeight: 1.05 },
  titleBlue: { fontSize: 25, fontFamily: "Helvetica-Bold", color: PRIMARY, lineHeight: 1.05, marginBottom: 9 },
  pageTitleRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 3 },
  pageTitleBlack: { fontSize: 19, fontFamily: "Helvetica-Bold", color: INK },
  pageTitleBlue: { fontSize: 19, fontFamily: "Helvetica-Bold", color: PRIMARY },
  subtitle: { fontSize: 9.5, color: MUTED, marginBottom: 12 },
  subtitleName: { fontFamily: "Helvetica-Bold", color: INK },

  doctorCard: { width: 96, alignItems: "center" },
  doctorPhoto: { width: 96, height: 108, borderRadius: 12, objectFit: "cover" },
  doctorName: { fontSize: 7.3, fontFamily: "Helvetica-Bold", color: INK, textAlign: "center", marginTop: 5 },
  doctorRole: { fontSize: 6.3, color: MUTED, textAlign: "center", marginTop: 1 },

  stonePill: { alignSelf: "flex-start", backgroundColor: PRIMARY_LIGHT, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 5, marginBottom: 16 },
  stonePillText: { fontSize: 9, fontFamily: "Helvetica-Bold", color: PRIMARY },

  sectionTitle: { fontSize: 13, fontFamily: "Helvetica-Bold", color: INK, marginBottom: 9 },
  pageTitle: { fontSize: 19, fontFamily: "Helvetica-Bold", color: INK, marginBottom: 3 },
  foodPageSubtitle: { fontSize: 9, color: MUTED, marginBottom: 12 },

  focusPanel: { backgroundColor: "#F8FAFC", borderRadius: 14, padding: 11, marginBottom: 16 },
  focusGrid: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
  focusCard: { width: "48%", backgroundColor: "#FFFFFF", borderRadius: 10, padding: 9, flexDirection: "row", gap: 8, alignItems: "flex-start", borderWidth: 1, borderColor: BORDER },
  focusIconCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: PRIMARY_LIGHT, alignItems: "center", justifyContent: "center" },
  focusTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: PRIMARY, marginBottom: 2 },
  focusValue: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: INK, marginBottom: 1 },
  focusSub: { fontSize: 6.8, color: MUTED },

  twoCol: { flexDirection: "row", gap: 14, marginBottom: 14 },
  panelBox: { flex: 1, borderRadius: 14, padding: 12 },
  profilePanel: { backgroundColor: "#FBF7F2" },
  habitsPanel: { backgroundColor: PRIMARY_LIGHT },
  panelTitle: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: INK, marginBottom: 8 },

  profileRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4, borderBottomWidth: 0.5, borderBottomColor: "rgba(15,23,42,0.08)" },
  profileLabel: { fontSize: 7.2, color: MUTED, textTransform: "uppercase", letterSpacing: 0.4 },
  profileValue: { fontSize: 8.2, fontFamily: "Helvetica-Bold", color: INK, maxWidth: "62%", textAlign: "right" },

  habitRow: { flexDirection: "row", alignItems: "flex-start", gap: 6, marginBottom: 6 },
  habitIconCircle: { width: 15, height: 15, borderRadius: 7.5, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", marginTop: 1, flexShrink: 0 },
  habitText: { fontSize: 8, color: INK, flex: 1, lineHeight: 1.25 },

  noteBar: { flexDirection: "row", gap: 10, backgroundColor: PRIMARY_LIGHT, borderRadius: 12, padding: 11, alignItems: "flex-start" },
  noteIconCircle: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  noteTitle: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: INK, marginBottom: 2 },
  noteText: { fontSize: 7.2, color: MUTED, lineHeight: 1.3 },

  tierBanner: { flexDirection: "row", alignItems: "center", gap: 9, borderRadius: 11, paddingVertical: 11, paddingHorizontal: 14, marginBottom: 12 },
  tierBannerText: { fontSize: 11.5, fontFamily: "Helvetica-Bold", letterSpacing: 0.6 },

  categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 11, marginBottom: 4 },
  categoryCard: { flexGrow: 1, flexBasis: "47%", borderRadius: 13, padding: 11, marginBottom: 11 },
  categoryCardHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 9 },
  categoryCardTitle: { fontSize: 9.5, fontFamily: "Helvetica-Bold" },
  categoryCardGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },

  foodThumbWrap: { overflow: "hidden", marginBottom: 4, borderWidth: 1, borderColor: "rgba(15,23,42,0.08)" },
  foodThumbPlaceholder: { backgroundColor: "#F1F5F9" },
  foodName: { textAlign: "center", color: INK, lineHeight: 1.2 },
  emptyNote: { fontSize: 8, color: MUTED, marginTop: 4, marginBottom: 10 },

  miniTipBar: { flexDirection: "row", alignItems: "center", gap: 7, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 11, marginTop: 8 },
  miniTipIconCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  miniTipText: { fontSize: 7.3, color: INK, flex: 1, lineHeight: 1.3 },
  miniTipBold: { fontFamily: "Helvetica-Bold" },

  mealTable: { marginTop: 6, borderRadius: 12, overflow: "hidden", borderWidth: 1, borderColor: BORDER },
  mealHeaderRow: { flexDirection: "row", paddingVertical: 8, paddingHorizontal: 10, backgroundColor: PRIMARY_LIGHT },
  mealHeaderDay: { width: 38 },
  mealHeaderCell: { flex: 1, fontSize: 8, fontFamily: "Helvetica-Bold", color: PRIMARY, textTransform: "uppercase", letterSpacing: 0.3, paddingLeft: 4 },
  mealRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, paddingHorizontal: 10 },
  mealRowAlt: { backgroundColor: "#F8FAFC" },
  mealDayBadge: { width: 34, height: 34, borderRadius: 17, backgroundColor: PRIMARY_LIGHT, alignItems: "center", justifyContent: "center" },
  mealDayBadgeText: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: PRIMARY },
  mealCell: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6, paddingLeft: 4, paddingRight: 6 },
  mealThumbWrap: { width: 34, height: 34, borderRadius: 7, overflow: "hidden", borderWidth: 0.5, borderColor: BORDER, flexShrink: 0 },
  mealThumb: { width: 34, height: 34 },
  mealThumbPlaceholder: { width: 34, height: 34, backgroundColor: "#F1F5F9" },
  mealName: { fontSize: 7.6, color: INK, lineHeight: 1.2, flex: 1 },

  ctaBar: { backgroundColor: PRIMARY, borderRadius: 12, padding: 12, marginTop: 16 },
  ctaText: { fontSize: 8, color: "#FFFFFF", lineHeight: 1.35 },

  footerBand: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#CBD5E1",
    paddingTop: 10,
    paddingHorizontal: 32,
  },
  footerQr: { width: 44, height: 44 },
  footerInfoCol: { flex: 1 },
  footerHospital: { fontSize: 9, fontFamily: "Helvetica-Bold", color: INK, marginBottom: 2 },
  footerContact: { fontSize: 7.5, color: MUTED, marginTop: 2 },
  footerPageText: { fontSize: 8, color: MUTED, textAlign: "right", marginBottom: 2 },
  footerNote: { fontSize: 6.5, color: MUTED_LIGHT, textAlign: "right" },
});

function PdfIcon({ paths, size = 14, color }: { paths: readonly string[]; size?: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {paths.map((d, i) => (
        <Path key={i} d={d} stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </Svg>
  );
}

function BanIcon({ size = 14, color }: { size?: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} fill="none" />
      <Path d="M4.929 4.929 19.07 19.071" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

function Watermark({ origin }: { origin: string }) {
  return <Image src={`${origin}/${encodeURIComponent(WATERMARK_FILE)}`} style={styles.watermark} fixed />;
}

function PageHeader({ origin, labelText, labelColor }: { origin: string; labelText: string; labelColor: string }) {
  return (
    <View style={styles.fullBleedHeader} fixed>
      <View style={styles.headerRow}>
        <Image src={`${origin}/${LOGO_FILE}`} style={styles.logo} />
        <View style={styles.headerLabelRow}>
          <View style={[styles.headerLabelBar, { backgroundColor: labelColor }]} />
          <Text style={[styles.headerLabel, { color: labelColor }]}>{labelText}</Text>
        </View>
      </View>
      <View style={styles.headerRule} />
    </View>
  );
}

function PageFooter({ qrDataUrl }: { qrDataUrl?: string }) {
  return (
    <View style={styles.footerBand} fixed>
      {qrDataUrl ? (
        <Link src={DIET_VIDEOS_URL}>
          <Image src={qrDataUrl} style={styles.footerQr} />
        </Link>
      ) : null}
      <View style={styles.footerInfoCol}>
        <Text style={styles.footerHospital}>Cure Stone Hospital</Text>
        <Text style={styles.footerContact}>Sector 52, Ardee City, Gurugram</Text>
        <Text style={styles.footerContact}>{DIET_CONSULTATION_PHONE_DISPLAY} · thecurestone.com</Text>
        <Text style={styles.footerContact}>Scan for kidney stone diet videos</Text>
      </View>
      <View style={{ alignItems: "flex-end", flexShrink: 0 }}>
        <Text style={styles.footerPageText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        <Text style={styles.footerNote}>Clinical review recommended</Text>
      </View>
    </View>
  );
}

function FocusCard({ iconKey, title, value, sub }: { iconKey: IconKey; title: string; value: string; sub: string }) {
  return (
    <View style={styles.focusCard}>
      <View style={styles.focusIconCircle}>
        <PdfIcon paths={ICON_PATHS[iconKey]} size={12} color={PRIMARY} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.focusTitle}>{title}</Text>
        <Text style={styles.focusValue}>{value}</Text>
        <Text style={styles.focusSub}>{sub}</Text>
      </View>
    </View>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.profileRow}>
      <Text style={styles.profileLabel}>{label}</Text>
      <Text style={styles.profileValue}>{value}</Text>
    </View>
  );
}

function HabitRow({ text }: { text: string }) {
  return (
    <View style={styles.habitRow}>
      <View style={styles.habitIconCircle}>
        <PdfIcon paths={ICON_PATHS.check} size={8} color={PRIMARY} />
      </View>
      <Text style={styles.habitText}>{text}</Text>
    </View>
  );
}

function MiniTipBar({ label, text, bg, color }: { label: string; text: string; bg: string; color: string }) {
  return (
    <View style={[styles.miniTipBar, { backgroundColor: bg }]} wrap={false}>
      <View style={styles.miniTipIconCircle}>
        <PdfIcon paths={ICON_PATHS.check} size={8} color={color} />
      </View>
      <Text style={styles.miniTipText}>
        <Text style={styles.miniTipBold}>{label}: </Text>
        {text}
      </Text>
    </View>
  );
}

function CategoryCard({
  category,
  items,
  origin,
  tint,
  density,
  columns = 2,
}: {
  category: FoodCategory;
  items: FoodItem[];
  origin: string;
  tint: { bg: string; color: string };
  density: GridDensity;
  columns?: 2 | 3;
}) {
  const shown = items.slice(0, density.maxItemsPerCard);
  const hiddenCount = items.length - shown.length;
  const thumbStyle = { width: density.thumb, height: density.thumb, borderRadius: Math.max(5, density.thumb * 0.17) };

  return (
    <View
      style={[styles.categoryCard, { backgroundColor: tint.bg, padding: density.pad, marginBottom: density.cardGap, flexBasis: columns === 3 ? "31%" : "47%" }]}
      wrap={false}
    >
      <View style={[styles.categoryCardHeader, { marginBottom: density.headerFont * 0.25 + 4 }]}>
        <PdfIcon paths={ICON_PATHS[CATEGORY_ICON[category]]} size={density.iconSize} color={tint.color} />
        <Text style={[styles.categoryCardTitle, { color: tint.color, fontSize: density.headerFont }]}>
          {CATEGORY_LABELS[category]}
        </Text>
      </View>
      <View style={[styles.categoryCardGrid, { gap: density.gap }]}>
        {shown.map((food) => (
          <View key={food._id} style={{ width: density.thumb + 8, alignItems: "center" }}>
            <View style={[styles.foodThumbWrap, thumbStyle]}>
              {food.image?.asset?.url ? (
                <Image src={proxied(food.image.asset.url, origin, 130)} style={thumbStyle} />
              ) : (
                <View style={[styles.foodThumbPlaceholder, thumbStyle]} />
              )}
            </View>
            <Text style={[styles.foodName, { fontSize: density.nameFont }]}>{food.name}</Text>
          </View>
        ))}
        {hiddenCount > 0 && (
          <View style={{ width: density.thumb + 8, alignItems: "center", justifyContent: "center" }}>
            <View style={[styles.foodThumbPlaceholder, thumbStyle, { alignItems: "center", justifyContent: "center" }]}>
              <Text style={{ fontSize: density.nameFont, fontFamily: "Helvetica-Bold", color: tint.color }}>
                +{hiddenCount}
              </Text>
            </View>
            <Text style={[styles.foodName, { fontSize: density.nameFont }]}>more</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function CategoryColumns({
  foods,
  origin,
  tint,
  density,
  compact = false,
  columns = 2,
}: {
  foods: FoodItem[];
  origin: string;
  tint: { bg: string; color: string };
  density: GridDensity;
  compact?: boolean;
  columns?: 2 | 3;
}) {
  return (
    <View style={[styles.categoryGrid, compact ? { gap: 5 } : {}]}>
      {groupByCategory(foods).map(([category, items]) => (
        <CategoryCard key={category} category={category} items={items} origin={origin} tint={tint} density={density} columns={columns} />
      ))}
    </View>
  );
}

export default function DietPlanPdfDocument({
  plan,
  input,
  foodsBySlug,
  origin,
  qrDataUrl,
}: {
  plan: DietPlanApiResponse;
  input: DietPlanInput;
  foodsBySlug: Map<string, FoodItem>;
  origin: string;
  qrDataUrl?: string;
}) {
  const { targets } = plan;
  const formattedDate = new Date(plan.meta.generatedAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const consultationGuidance = (plan.disclaimers[1] ?? "")
    .replace(/\s*Call\s+\+91[\d\s]+\s+to book a consultation\.?\s*$/i, "")
    .trim();

  // Picked once per tier section so "choose more often" is always one page
  // and "moderation" + "limit/avoid" are always one page together, no
  // matter how many foods a given profile comes back with.
  const eatFreelyDensity = pickDensity([groupByCategory(plan.foods.eatFreely)], SINGLE_BANNER_GRID_BUDGET);
  const fittedLimitDensity = pickDensity(
    [groupByCategory(plan.foods.moderate), groupByCategory(plan.foods.avoid)],
    DUAL_BANNER_GRID_BUDGET
  );
  // Keep food photos the same size on both food pages. The second page
  // accommodates its extra categories by tightening the cards instead.
  const limitDensity: GridDensity = {
    ...fittedLimitDensity,
    thumb: eatFreelyDensity.thumb,
    gap: 5,
    pad: 6,
    headerFont: 8,
    nameFont: 6.2,
    cardGap: 0,
    iconSize: 10,
    maxItemsPerCard: 8,
  };

  return (
    <Document>
      {/* Page 1 — cover, daily targets, profile and habits */}
      <Page size="A4" style={styles.page}>
        <Watermark origin={origin} />
        <PageHeader origin={origin} labelText="AI-BASED DIET PLAN" labelColor={PRIMARY} />

        <View style={styles.heroRow}>
          <View style={styles.heroLeft}>
            <Text style={styles.titleBlack}>Your kidney stone</Text>
            <Text style={styles.titleBlue}>AI-based diet plan</Text>
            <Text style={styles.subtitle}>
              Prepared for <Text style={styles.subtitleName}>{input.name || "You"}</Text> · {formattedDate}
            </Text>
            <View style={styles.stonePill}>
              <Text style={styles.stonePillText}>{stonePillText(input)}</Text>
            </View>
          </View>
          <View style={styles.doctorCard}>
            <Image src={`${origin}/${DOCTOR_PHOTO_FILE}`} style={styles.doctorPhoto} />
            <Text style={styles.doctorName}>Dr. Deepanshu Gupta</Text>
            <Text style={styles.doctorRole}>Urologist · Cure Stone Hospital</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your Daily Focus</Text>
        <View style={styles.focusPanel}>
          <View style={styles.focusGrid}>
            <FocusCard
              iconKey="droplets"
              title="Hydration"
              value={`${(targets.hydrationMlPerDay / 1000).toFixed(1)}L / day`}
              sub="Spread fluids through the day"
            />
            <FocusCard
              iconKey="gauge"
              title="Sodium"
              value={`Under ${targets.sodiumCapMg}mg/day`}
              sub="Check labels and added salt"
            />
            <FocusCard
              iconKey="bone"
              title="Dietary Calcium"
              value={`${targets.calciumGuidanceMg.min}-${targets.calciumGuidanceMg.max}mg/day`}
              sub="Prefer food sources with meals"
            />
            <FocusCard
              iconKey="beef"
              title="Balanced Protein"
              value={`${targets.animalProteinCapG}g/day cap`}
              sub="Avoid excessive animal protein"
            />
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={[styles.panelBox, styles.profilePanel]}>
            <Text style={styles.panelTitle}>Your Profile</Text>
            <ProfileRow label="Name" value={input.name || "Not provided"} />
            <ProfileRow label="Age" value={input.ageYears ? `${input.ageYears} years` : "Not specified"} />
            <ProfileRow label="Weight" value={input.weightKg ? `${input.weightKg} kg` : "Not specified"} />
            <ProfileRow label="Height" value={input.heightCm ? `${input.heightCm} cm` : "Not specified"} />
            <ProfileRow label="Stone Type" value={labelFor(STONE_TYPES, input.stoneType, "Not sure")} />
            <ProfileRow label="Diet" value={labelFor(DIETARY_PREFERENCES, input.dietaryPreference, "Non-vegetarian")} />
            <ProfileRow label="Activity" value={labelFor(ACTIVITY_LEVELS, input.activityLevel, "Moderate")} />
            <ProfileRow label="Status" value={labelFor(STONE_STATUSES, input.stoneStatus)} />
          </View>
          <View style={[styles.panelBox, styles.habitsPanel]}>
            <Text style={styles.panelTitle}>Habits to Build On</Text>
            {plan.guidelines.map((guideline, i) => (
              <HabitRow key={i} text={guideline} />
            ))}
          </View>
        </View>

        <View style={styles.noteBar} wrap={false}>
          <View style={styles.noteIconCircle}>
            <PdfIcon paths={ICON_PATHS.check} size={10} color={PRIMARY} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.noteTitle}>Made for Your Routine</Text>
            <Text style={styles.noteText}>{plan.disclaimers[0]}</Text>
          </View>
        </View>

        <PageFooter qrDataUrl={qrDataUrl} />
      </Page>

      {/* Page 2 — foods to build meals around (Eat Freely tier) */}
      <Page size="A4" style={styles.page}>
        <Watermark origin={origin} />
        <PageHeader origin={origin} labelText="DIET PLAN" labelColor={ACCENT} />

        <View style={styles.pageTitleRow}>
          <Text style={styles.pageTitleBlack}>Foods to eat </Text>
          <Text style={styles.pageTitleBlue}>freely</Text>
        </View>
        <Text style={styles.foodPageSubtitle}>{stonePillText(input)} · Everyday choices in appropriate portions</Text>

        <View style={[styles.tierBanner, { backgroundColor: ACCENT_LIGHT }]} wrap={false}>
          <PdfIcon paths={ICON_PATHS.check} size={15} color={ACCENT} />
          <Text style={[styles.tierBannerText, { color: ACCENT }]}>CHOOSE THESE MORE OFTEN</Text>
        </View>

        {plan.foods.eatFreely.length === 0 ? (
          <Text style={styles.emptyNote}>No specific foods were flagged for this tier — follow general balanced-diet guidance.</Text>
        ) : (
          <CategoryColumns foods={plan.foods.eatFreely} origin={origin} tint={{ bg: ACCENT_LIGHT, color: ACCENT }} density={eatFreelyDensity} />
        )}

        <MiniTipBar
          label="Tip"
          text="Keep calcium-rich foods like milk, curd or paneer in your meals, and prefer whole fruit over juice."
          bg={ACCENT_LIGHT}
          color={ACCENT}
        />

        <PageFooter qrDataUrl={qrDataUrl} />
      </Page>

      {/* Page 3 — foods to limit or avoid (Moderate + Avoid tiers) */}
      <Page size="A4" style={styles.page}>
        <Watermark origin={origin} />
        <PageHeader origin={origin} labelText="DIET PLAN" labelColor={DANGER} />

        <View style={styles.pageTitleRow}>
          <Text style={styles.pageTitleBlack}>Foods to limit </Text>
          <Text style={styles.pageTitleBlue}>thoughtfully</Text>
        </View>
        <Text style={styles.foodPageSubtitle}>{stonePillText(input)} · Review portions and individual needs</Text>

        {plan.foods.moderate.length > 0 && (
          <>
            <View style={[styles.tierBanner, { backgroundColor: WARNING_LIGHT, marginTop: 4 }]} wrap={false}>
              <PdfIcon paths={ICON_PATHS.utensils} size={15} color={WARNING} />
              <Text style={[styles.tierBannerText, { color: WARNING }]}>EAT IN MODERATION</Text>
            </View>
            <CategoryColumns foods={plan.foods.moderate} origin={origin} tint={{ bg: WARNING_LIGHT, color: WARNING }} density={limitDensity} columns={3} compact />
          </>
        )}

        {plan.foods.avoid.length > 0 && (
          <>
            <View style={[styles.tierBanner, { backgroundColor: DANGER_LIGHT, marginTop: plan.foods.moderate.length > 0 ? 6 : 4 }]} wrap={false}>
              <BanIcon size={15} color={DANGER} />
              <Text style={[styles.tierBannerText, { color: DANGER }]}>LIMIT / AVOID — REVIEW INDIVIDUALLY</Text>
            </View>
            <CategoryColumns foods={plan.foods.avoid} origin={origin} tint={{ bg: DANGER_LIGHT, color: DANGER }} density={limitDensity} compact />
          </>
        )}

        {plan.foods.moderate.length === 0 && plan.foods.avoid.length === 0 && (
          <Text style={styles.emptyNote}>No foods were flagged to limit or avoid for this profile.</Text>
        )}

        <PageFooter qrDataUrl={qrDataUrl} />
      </Page>

      {/* Page 4 — the 7-day sample meal plan, as a compact day x meal-slot
          table instead of a long repeating row-per-meal list, plus the
          closing CTA/disclaimer. */}
      <Page size="A4" style={styles.page}>
        <Watermark origin={origin} />
        <PageHeader origin={origin} labelText="YOUR WEEKLY PLAN" labelColor={PRIMARY} />

        <Text style={styles.pageTitle}>Your 7-day meal plan</Text>
        <Text style={styles.foodPageSubtitle}>A simple weekly structure · Sample meals built from your recommended foods</Text>

        {plan.mealPlan.length > 0 && (
          <View style={styles.mealTable}>
            <View style={styles.mealHeaderRow}>
              <View style={styles.mealHeaderDay} />
              {(["breakfast", "lunch", "evening_snack", "dinner"] as MealSlot[]).map((slot) => (
                <Text key={slot} style={styles.mealHeaderCell}>
                  {SLOT_LABELS[slot]}
                </Text>
              ))}
            </View>
            {plan.mealPlan.map((day, i) => (
              <View key={day.day} style={[styles.mealRow, i % 2 === 1 ? styles.mealRowAlt : undefined]} wrap={false}>
                <View style={styles.mealDayBadge}>
                  <Text style={styles.mealDayBadgeText}>{day.day}</Text>
                </View>
                {(["breakfast", "lunch", "evening_snack", "dinner"] as MealSlot[]).map((slot) => {
                  const meal = day.meals.find((m) => m.slot === slot);
                  const food = meal?.primaryFoodSlug ? foodsBySlug.get(meal.primaryFoodSlug) : undefined;
                  const imageUrl = food?.image?.asset?.url;
                  return (
                    <View key={slot} style={styles.mealCell}>
                      <View style={styles.mealThumbWrap}>
                        {imageUrl ? (
                          <Image src={proxied(imageUrl, origin, 90)} style={styles.mealThumb} />
                        ) : (
                          <View style={styles.mealThumbPlaceholder} />
                        )}
                      </View>
                      <Text style={styles.mealName}>{meal?.name ?? "—"}</Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        )}

        <View style={styles.ctaBar} wrap={false}>
          {consultationGuidance && <Text style={styles.ctaText}>{consultationGuidance}</Text>}
          <Text style={[styles.ctaText, { marginTop: consultationGuidance ? 4 : 0 }]}>
            Call {DIET_CONSULTATION_PHONE_DISPLAY} to book a consultation.
          </Text>
        </View>

        <PageFooter qrDataUrl={qrDataUrl} />
      </Page>
    </Document>
  );
}
