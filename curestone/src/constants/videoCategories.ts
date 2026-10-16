import {
  LayoutGrid,
  Ruler,
  Apple,
  Scissors,
  Activity,
  Syringe,
  Stethoscope,
  Zap,
  ShieldCheck,
  AlertCircle,
  HeartPulse,
  Users,
  Lightbulb,
  CircleHelp,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";
import type { VideoCategory } from "@/lib/youtubeVideos";

export interface CategoryMeta {
  value: VideoCategory;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  bg: string;
  text: string;
}

export const CATEGORY_META: Record<VideoCategory, CategoryMeta> = {
  size: {
    value: "size",
    label: "By Stone Size",
    shortLabel: "Stone Size",
    description: "Videos grouped by stone size — from under 5mm to over 10mm — and what's typically considered at each size.",
    icon: Ruler,
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  diet: {
    value: "diet",
    label: "Diet",
    shortLabel: "Diet",
    description: "Nutrition guidance — foods to eat and avoid, hydration habits, and diet after surgery.",
    icon: Apple,
    bg: "bg-rose-50",
    text: "text-rose-600",
  },
  ot: {
    value: "ot",
    label: "Surgery (OT)",
    shortLabel: "Surgery",
    description: "Kidney stone surgery and procedures — RIRS, PCNL, URSL, ESWL and DJ stents explained.",
    icon: Scissors,
    bg: "bg-slate-100",
    text: "text-slate-700",
  },
  rirs: {
    value: "rirs",
    label: "RIRS",
    shortLabel: "RIRS",
    description: "Retrograde Intra-Renal Surgery — how it works, recovery, and what to expect.",
    icon: Activity,
    bg: "bg-red-50",
    text: "text-red-600",
  },
  pcnl: {
    value: "pcnl",
    label: "PCNL",
    shortLabel: "PCNL",
    description: "Percutaneous Nephrolithotomy (incl. Mini-PCNL) — procedure details and recovery.",
    icon: Syringe,
    bg: "bg-red-50",
    text: "text-red-600",
  },
  ursl: {
    value: "ursl",
    label: "URSL",
    shortLabel: "URSL",
    description: "Ureteroscopy (URS/URSL) — laser stone removal from the ureter.",
    icon: Stethoscope,
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  eswl: {
    value: "eswl",
    label: "ESWL",
    shortLabel: "ESWL",
    description: "Extracorporeal Shock Wave Lithotripsy — breaking stones with sound waves, non-surgically.",
    icon: Zap,
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  prevention: {
    value: "prevention",
    label: "Prevention",
    shortLabel: "Prevention",
    description: "Lifestyle, hydration and habits to prevent kidney stones from forming or recurring.",
    icon: ShieldCheck,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  symptoms: {
    value: "symptoms",
    label: "Symptoms",
    shortLabel: "Symptoms",
    description: "Recognizing symptoms, pain patterns, and when to see a doctor.",
    icon: AlertCircle,
    bg: "bg-pink-50",
    text: "text-pink-600",
  },
  recovery: {
    value: "recovery",
    label: "Recovery",
    shortLabel: "Recovery",
    description: "Post-surgery care, recovery timelines, and aftercare following a procedure.",
    icon: HeartPulse,
    bg: "bg-sky-50",
    text: "text-sky-600",
  },
  patient_stories: {
    value: "patient_stories",
    label: "Patient Stories",
    shortLabel: "Stories",
    description: "Real patient experiences and journeys, in their own words.",
    icon: Users,
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  myths_facts: {
    value: "myths_facts",
    label: "Myths & Facts",
    shortLabel: "Myths & Facts",
    description: "Correcting common misconceptions about kidney stones and their treatment.",
    icon: Lightbulb,
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  urology_other: {
    value: "urology_other",
    label: "Prostate & Urology",
    shortLabel: "Urology",
    description: "Other urology topics — prostate, UTI and conditions beyond kidney stones.",
    icon: CircleHelp,
    bg: "bg-indigo-50",
    text: "text-indigo-600",
  },
  other: {
    value: "other",
    label: "Other",
    shortLabel: "Other",
    description: "Everything else — general awareness and topics outside the main categories.",
    icon: MoreHorizontal,
    bg: "bg-slate-100",
    text: "text-slate-600",
  },
};

export const ALL_VIDEOS_META = {
  label: "All Videos",
  icon: LayoutGrid,
};

export const CATEGORY_ORDER: VideoCategory[] = [
  "size",
  "diet",
  "ot",
  "rirs",
  "pcnl",
  "ursl",
  "eswl",
  "prevention",
  "symptoms",
  "recovery",
  "patient_stories",
  "myths_facts",
  "urology_other",
  "other",
];

// URL slugs for /videos/[category] — hyphenated so category state is a real,
// crawlable route instead of only a client-side filter.
export function categorySlug(category: VideoCategory): string {
  return category.replace(/_/g, "-");
}

export function categoryFromSlug(slug: string): VideoCategory | undefined {
  return CATEGORY_ORDER.find((category) => categorySlug(category) === slug);
}
