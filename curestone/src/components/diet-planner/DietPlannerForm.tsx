"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  History,
  Bandage,
  ShieldCheck,
  Calendar,
  Scale,
  Ruler,
  Repeat,
  Baby,
  HeartPulse,
  Candy,
  Check,
  ArrowRight,
  Heart,
  BarChart3,
  UserRound,
} from "lucide-react";
import { cleanText, validateNumberInRange, validateOptionalName, validateSelect } from "@/utils/formValidation";
import {
  ACTIVITY_LEVELS,
  DIETARY_PREFERENCES,
  STONE_STATUSES,
  STONE_TYPES,
} from "@/constants/dietPlannerOptions";
import type { DietPlanInput } from "@/lib/dietPlanner/types";

type FormField = "name" | "stoneStatus" | "ageYears" | "weightKg" | "heightCm" | "stoneType" | "dietaryPreference" | "activityLevel";
type FormErrors = Partial<Record<FormField, string>>;

const STATUS_ICONS: Record<string, typeof History> = {
  before_surgery: History,
  after_surgery: Bandage,
  prevention: ShieldCheck,
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs font-bold text-danger" role="alert">
      {message}
    </p>
  );
}

const inputClass = (hasError?: string) =>
  `w-full bg-slate-50 border border-transparent focus:border-primary focus:ring-0 rounded-xl py-3.5 px-4 text-sm text-slate-900 transition-colors ${
    hasError ? "border-red-300 bg-red-50 focus:border-red-500" : ""
  }`;

function FieldLabel({ icon: Icon, color, children }: { icon: typeof Calendar; color: string; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-1.5 text-xs font-bold text-text-light uppercase tracking-wider mb-2">
      <Icon className="w-3.5 h-3.5" style={{ color }} strokeWidth={2.5} />
      {children}
    </label>
  );
}

function UnitInput({ name, placeholder, unit, min, max, error }: { name: string; placeholder: string; unit: string; min: number; max: number; error?: string }) {
  return (
    <div>
      <div className="relative">
        <input
          name={name}
          type="number"
          min={min}
          max={max}
          inputMode="numeric"
          placeholder={placeholder}
          className={`${inputClass(error)} pr-12`}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-text-light pointer-events-none">
          {unit}
        </span>
      </div>
      <FieldError message={error} />
    </div>
  );
}

export default function DietPlannerForm({ onSubmit }: { onSubmit: (input: DietPlanInput) => void }) {
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = cleanText(formData.get("name"));
    const stoneStatus = cleanText(formData.get("stoneStatus"));
    const ageYears = cleanText(formData.get("ageYears"));
    const weightKg = cleanText(formData.get("weightKg"));
    const heightCm = cleanText(formData.get("heightCm"));
    const stoneType = cleanText(formData.get("stoneType"));
    const dietaryPreference = cleanText(formData.get("dietaryPreference"));
    const activityLevel = cleanText(formData.get("activityLevel"));
    const hasRecurrentStones = formData.get("hasRecurrentStones") === "on";
    const pregnant = formData.get("pregnant") === "on";
    const hasCkdOrDialysis = formData.get("hasCkdOrDialysis") === "on";
    const isDiabetic = formData.get("isDiabetic") === "on";

    const nextErrors: FormErrors = {
      name: validateOptionalName(name),
      stoneStatus: validateSelect(stoneStatus, STONE_STATUSES.map((o) => o.value) as unknown as string[], "Stone status"),
      ageYears: validateNumberInRange(ageYears, 1, 120, "Age"),
      weightKg: validateNumberInRange(weightKg, 10, 300, "Weight"),
      heightCm: validateNumberInRange(heightCm, 50, 250, "Height"),
    };
    const activeErrors = Object.fromEntries(Object.entries(nextErrors).filter(([, message]) => message));

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      const firstField = Object.keys(activeErrors)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      return;
    }

    setErrors({});

    onSubmit({
      name: name || undefined,
      stoneStatus: stoneStatus as DietPlanInput["stoneStatus"],
      ageYears: ageYears ? Number(ageYears) : undefined,
      weightKg: weightKg ? Number(weightKg) : undefined,
      heightCm: heightCm ? Number(heightCm) : undefined,
      stoneType: (stoneType || undefined) as DietPlanInput["stoneType"],
      dietaryPreference: (dietaryPreference || undefined) as DietPlanInput["dietaryPreference"],
      activityLevel: (activityLevel || undefined) as DietPlanInput["activityLevel"],
      hasRecurrentStones,
      safetyFlags: { pregnant, hasCkdOrDialysis, isDiabetic },
    });
  };

  return (
    <div className="hidden lg:grid max-w-5xl mx-auto bg-white rounded-3xl border border-border/50 shadow-sm overflow-hidden lg:grid-cols-[300px_1fr]">
      {/* Left: illustration panel */}
      <div
        className="relative px-8 py-10 flex flex-col"
        style={{ background: "linear-gradient(160deg, #dde6fb 0%, #eef0fb 45%, #fbeef1 100%)" }}
      >
        <span className="inline-flex self-start items-center bg-white/70 backdrop-blur-sm text-[10px] font-black text-blue-900 uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
          Step 1 of 4
        </span>
        <h2 className="text-[26px] leading-[1.15] font-black text-blue-950 mb-3">
          Let&apos;s create your personalized diet plan
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          Answer a few questions so we can suggest the right food guidance for your stone health.
        </p>

        <div className="relative mt-auto w-full aspect-square max-w-[220px] mx-auto">
          <Image
            src="/Colorful Quinoa Chickpea Salad Bowl.png"
            alt="Healthy salad bowl"
            fill
            sizes="220px"
            className="object-contain drop-shadow-xl"
          />
          <span className="absolute top-2 -right-2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </span>
          <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-9 h-9 rounded-full bg-accent shadow-md flex items-center justify-center">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </span>
          <span className="absolute bottom-2 left-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-primary" />
          </span>
        </div>
      </div>

      {/* Right: form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        <div>
          <FieldLabel icon={UserRound} color="#2563ff">Your name (optional)</FieldLabel>
          <input name="name" type="text" maxLength={80} placeholder="e.g. Rohan Sharma" className={inputClass(errors.name)} />
          <FieldError message={errors.name} />
        </div>

        <div>
          <p className="text-sm font-black text-foreground mb-3">
            Where are you in your journey? <span className="text-danger">*</span>
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {STONE_STATUSES.map((option) => {
              const Icon = STATUS_ICONS[option.value];
              return (
                <label
                  key={option.value}
                  className="relative flex flex-col items-center text-center gap-2 bg-slate-50 border-2 border-transparent rounded-2xl py-5 px-3 cursor-pointer transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <input type="radio" name="stoneStatus" value={option.value} required className="peer sr-only" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-white items-center justify-center hidden peer-checked:flex">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                  <Icon className="w-5 h-5 text-primary" strokeWidth={2} />
                  <span className="text-xs font-bold text-slate-800 leading-snug">{option.label}</span>
                </label>
              );
            })}
          </div>
          <FieldError message={errors.stoneStatus} />
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <FieldLabel icon={Calendar} color="#f59e0b">Age</FieldLabel>
            <UnitInput name="ageYears" placeholder="Enter your age" unit="years" min={1} max={120} error={errors.ageYears} />
          </div>
          <div>
            <FieldLabel icon={Scale} color="#2563ff">Weight</FieldLabel>
            <UnitInput name="weightKg" placeholder="Enter weight" unit="kg" min={10} max={300} error={errors.weightKg} />
          </div>
          <div>
            <FieldLabel icon={Ruler} color="#10b981">Height</FieldLabel>
            <UnitInput name="heightCm" placeholder="Enter height" unit="cm" min={50} max={250} error={errors.heightCm} />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <FieldLabel icon={HeartPulse} color="#f43f5e">Stone type</FieldLabel>
            <select name="stoneType" defaultValue="" className={inputClass()}>
              <option value="">Not sure</option>
              {STONE_TYPES.filter((o) => o.value !== "not_sure").map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel icon={Candy} color="#65a30d">Diet preference</FieldLabel>
            <select name="dietaryPreference" defaultValue="" className={inputClass()}>
              <option value="">Non-vegetarian</option>
              {DIETARY_PREFERENCES.filter((o) => o.value !== "non_vegetarian").map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel icon={Repeat} color="#9333ea">Activity level</FieldLabel>
            <select name="activityLevel" defaultValue="" className={inputClass()}>
              <option value="">Moderate</option>
              {ACTIVITY_LEVELS.filter((o) => o.value !== "moderate").map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2.5 text-sm font-bold text-slate-700 cursor-pointer">
          <input type="checkbox" name="hasRecurrentStones" className="accent-blue-900 w-4 h-4 rounded" />
          I&apos;ve had kidney stones more than once
        </label>

        <div className="bg-slate-50 rounded-2xl p-5">
          <p className="text-sm font-black text-foreground">Does any of this apply to you?</p>
          <p className="text-xs text-text-light mt-1 mb-4">
            This won&apos;t stop the planner — it just helps Dr. Deepanshu Gupta review your plan in person.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {[
              { name: "pregnant", label: "Pregnant", icon: Baby },
              { name: "hasCkdOrDialysis", label: "CKD / dialysis", icon: HeartPulse },
              { name: "isDiabetic", label: "Diabetic", icon: Candy },
            ].map((flag) => (
              <label
                key={flag.name}
                className="inline-flex items-center gap-2 bg-white border border-border/70 rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 cursor-pointer transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary"
              >
                <input type="checkbox" name={flag.name} className="accent-blue-900 w-3.5 h-3.5 rounded" />
                <flag.icon className="w-4 h-4" />
                {flag.label}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-blue-900 to-blue-700 text-white font-sans font-bold px-7 py-3.5 rounded-full hover:opacity-90 active:scale-[0.99] transition-all"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
