"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  History,
  Bandage,
  ShieldCheck,
  Check,
  ArrowRight,
  Calendar,
  Scale,
  Ruler,
  HeartPulse,
  Candy,
  Repeat,
  User,
  UserRound,
  Droplet,
  Heart,
  BarChart3,
} from "lucide-react";
import { validateNumberInRange, validateOptionalName, validateSelect } from "@/utils/formValidation";
import {
  ACTIVITY_LEVELS,
  DIETARY_PREFERENCES,
  STONE_STATUSES,
  STONE_TYPES,
} from "@/constants/dietPlannerOptions";
import type { DietPlanInput } from "@/lib/dietPlanner/types";

const TOTAL_STEPS = 4;

const STATUS_ICONS: Record<string, typeof History> = {
  before_surgery: History,
  after_surgery: Bandage,
  prevention: ShieldCheck,
};

type FieldErrors = Partial<Record<"name" | "stoneStatus" | "ageYears" | "weightKg" | "heightCm", string>>;

type WizardValues = {
  name: string;
  stoneStatus: string;
  ageYears: string;
  weightKg: string;
  heightCm: string;
  stoneType: string;
  dietaryPreference: string;
  activityLevel: string;
  hasRecurrentStones: boolean;
  pregnant: boolean;
  hasCkdOrDialysis: boolean;
  isDiabetic: boolean;
};

const INITIAL_VALUES: WizardValues = {
  name: "",
  stoneStatus: "",
  ageYears: "",
  weightKg: "",
  heightCm: "",
  stoneType: "",
  dietaryPreference: "",
  activityLevel: "",
  hasRecurrentStones: false,
  pregnant: false,
  hasCkdOrDialysis: false,
  isDiabetic: false,
};

function ProgressDots({ step }: { step: number }) {
  // step 0 is the intro screen and shares the same indicator as question 1.
  const activeDot = Math.max(0, step - 1);
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <span key={i} className={`h-1.5 w-7 rounded-full ${i === activeDot ? "bg-primary" : "bg-border"}`} />
      ))}
    </div>
  );
}

function TopBar({ step, onBack }: { step: number; onBack: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 0}
        className="w-9 h-9 rounded-full border border-border/70 flex items-center justify-center text-text-mid disabled:opacity-30"
        aria-label="Back"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <ProgressDots step={step} />
    </div>
  );
}

function FieldLabel({ icon: Icon, color, children }: { icon: typeof Calendar; color: string; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-1.5 text-xs font-bold text-text-light uppercase tracking-wider mb-2">
      <Icon className="w-3.5 h-3.5" style={{ color }} strokeWidth={2.5} />
      {children}
    </label>
  );
}

const inputClass = (hasError?: string) =>
  `w-full bg-slate-50 border border-transparent focus:border-primary focus:ring-0 rounded-xl py-3.5 px-4 text-sm text-slate-900 transition-colors ${
    hasError ? "border-red-300 bg-red-50 focus:border-red-500" : ""
  }`;

function UnitField({
  icon,
  color,
  label,
  value,
  onChange,
  placeholder,
  unit,
  min,
  max,
  error,
}: {
  icon: typeof Calendar;
  color: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  unit: string;
  min: number;
  max: number;
  error?: string;
}) {
  return (
    <div>
      <FieldLabel icon={icon} color={color}>{label}</FieldLabel>
      <div className="relative">
        <input
          type="number"
          min={min}
          max={max}
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClass(error)} pr-12`}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-text-light pointer-events-none">
          {unit}
        </span>
      </div>
      {error && <p className="mt-1.5 text-xs font-bold text-danger">{error}</p>}
    </div>
  );
}

function NextButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-br from-blue-900 to-blue-700 text-white font-sans font-bold py-4 rounded-full hover:opacity-90 active:scale-[0.99] transition-all mt-8"
    >
      {children} <ArrowRight className="w-4 h-4" />
    </button>
  );
}

export default function MobileDietWizard({ onSubmit }: { onSubmit: (input: DietPlanInput) => void }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<WizardValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});

  const set = <K extends keyof WizardValues>(key: K, value: WizardValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const goToStep1 = () => {
    const error = validateSelect(values.stoneStatus, STONE_STATUSES.map((o) => o.value) as unknown as string[], "Stone status");
    if (error) {
      setErrors({ stoneStatus: error });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const goToStep2 = () => {
    const nextErrors: FieldErrors = {
      name: validateOptionalName(values.name),
      ageYears: validateNumberInRange(values.ageYears, 1, 120, "Age"),
      weightKg: validateNumberInRange(values.weightKg, 10, 300, "Weight"),
      heightCm: validateNumberInRange(values.heightCm, 50, 250, "Height"),
    };
    const active = Object.fromEntries(Object.entries(nextErrors).filter(([, m]) => m));
    if (Object.keys(active).length > 0) {
      setErrors(active);
      return;
    }
    setErrors({});
    setStep(3);
  };

  const handleCreate = () => {
    onSubmit({
      name: values.name || undefined,
      stoneStatus: values.stoneStatus as DietPlanInput["stoneStatus"],
      ageYears: values.ageYears ? Number(values.ageYears) : undefined,
      weightKg: values.weightKg ? Number(values.weightKg) : undefined,
      heightCm: values.heightCm ? Number(values.heightCm) : undefined,
      stoneType: (values.stoneType || undefined) as DietPlanInput["stoneType"],
      dietaryPreference: (values.dietaryPreference || undefined) as DietPlanInput["dietaryPreference"],
      activityLevel: (values.activityLevel || undefined) as DietPlanInput["activityLevel"],
      hasRecurrentStones: values.hasRecurrentStones,
      safetyFlags: {
        pregnant: values.pregnant,
        hasCkdOrDialysis: values.hasCkdOrDialysis,
        isDiabetic: values.isDiabetic,
      },
    });
  };

  return (
    <div id="mobile-diet-wizard" className="lg:hidden max-w-md mx-auto bg-white rounded-3xl border border-border/50 shadow-sm p-6">
      {step === 0 && (
        <div>
          <TopBar step={0} onBack={goBack} />
          <h2 className="text-[26px] leading-[1.15] font-black text-blue-950 mb-3">
            Let&apos;s create your personalized diet plan
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            Answer a few quick questions so we can suggest the right food guidance for your stone health.
          </p>
          <div className="relative w-full aspect-square max-w-[240px] mx-auto mb-8">
            <Image
              src="/Colorful Quinoa Chickpea Salad Bowl.png"
              alt="Healthy salad bowl"
              fill
              sizes="240px"
              className="object-contain drop-shadow-xl"
            />
            <span className="absolute top-0 right-2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </span>
            <span className="absolute bottom-6 -left-2 w-9 h-9 rounded-full bg-accent shadow-md flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </span>
            <span className="absolute bottom-0 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary" />
            </span>
          </div>
          <NextButton onClick={() => setStep(1)}>Let&apos;s Get Started</NextButton>
        </div>
      )}

      {step === 1 && (
        <div>
          <TopBar step={1} onBack={goBack} />
          <p className="text-[10px] font-black text-text-light uppercase tracking-widest mb-2">Step 1 of 4</p>
          <h2 className="text-xl font-black text-foreground mb-2">Where are you in your journey?</h2>
          <p className="text-sm text-text-light mb-6">This helps us tailor the right guidance for your stone health.</p>

          <div className="space-y-3">
            {STONE_STATUSES.map((option) => {
              const Icon = STATUS_ICONS[option.value];
              const selected = values.stoneStatus === option.value;
              return (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => set("stoneStatus", option.value)}
                  className={`w-full flex items-center gap-3 border-2 rounded-2xl px-4 py-4 text-left transition-colors ${
                    selected ? "border-primary bg-primary/5" : "border-border/60 bg-white"
                  }`}
                >
                  <Icon className="w-5 h-5 text-primary shrink-0" strokeWidth={2} />
                  <span className="text-sm font-bold text-slate-800 flex-1">{option.label}</span>
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selected ? "bg-primary border-primary" : "border-border"
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.stoneStatus && <p className="mt-2 text-xs font-bold text-danger">{errors.stoneStatus}</p>}

          <NextButton onClick={goToStep1}>Next</NextButton>
        </div>
      )}

      {step === 2 && (
        <div>
          <TopBar step={2} onBack={goBack} />
          <p className="text-[10px] font-black text-text-light uppercase tracking-widest mb-2">Step 2 of 4</p>
          <h2 className="text-xl font-black text-foreground mb-2">Tell us about yourself</h2>
          <p className="text-sm text-text-light mb-6">Basic details to personalize your plan.</p>

          <div className="space-y-5">
            <div>
              <FieldLabel icon={UserRound} color="#2563ff">Your name (optional)</FieldLabel>
              <input
                type="text"
                maxLength={80}
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Rohan Sharma"
                className={inputClass(errors.name)}
              />
              {errors.name && <p className="mt-1.5 text-xs font-bold text-danger">{errors.name}</p>}
            </div>
            <UnitField
              icon={Calendar}
              color="#f59e0b"
              label="Age"
              value={values.ageYears}
              onChange={(v) => set("ageYears", v)}
              placeholder="Enter your age"
              unit="years"
              min={1}
              max={120}
              error={errors.ageYears}
            />
            <UnitField
              icon={Scale}
              color="#2563ff"
              label="Weight"
              value={values.weightKg}
              onChange={(v) => set("weightKg", v)}
              placeholder="Enter your weight"
              unit="kg"
              min={10}
              max={300}
              error={errors.weightKg}
            />
            <UnitField
              icon={Ruler}
              color="#10b981"
              label="Height"
              value={values.heightCm}
              onChange={(v) => set("heightCm", v)}
              placeholder="Enter your height"
              unit="cm"
              min={50}
              max={250}
              error={errors.heightCm}
            />
          </div>

          <NextButton onClick={goToStep2}>Next</NextButton>
        </div>
      )}

      {step === 3 && (
        <div>
          <TopBar step={3} onBack={goBack} />
          <p className="text-[10px] font-black text-text-light uppercase tracking-widest mb-2">Step 3 of 4</p>
          <h2 className="text-xl font-black text-foreground mb-2">A few more details</h2>
          <p className="text-sm text-text-light mb-6">This helps us suggest better recommendations.</p>

          <div className="space-y-5">
            <div>
              <FieldLabel icon={HeartPulse} color="#f43f5e">Stone type</FieldLabel>
              <select value={values.stoneType} onChange={(e) => set("stoneType", e.target.value)} className={inputClass()}>
                <option value="">Not sure</option>
                {STONE_TYPES.filter((o) => o.value !== "not_sure").map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel icon={Candy} color="#65a30d">Diet preference</FieldLabel>
              <select value={values.dietaryPreference} onChange={(e) => set("dietaryPreference", e.target.value)} className={inputClass()}>
                <option value="">Non-vegetarian</option>
                {DIETARY_PREFERENCES.filter((o) => o.value !== "non_vegetarian").map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel icon={Repeat} color="#9333ea">Activity level</FieldLabel>
              <select value={values.activityLevel} onChange={(e) => set("activityLevel", e.target.value)} className={inputClass()}>
                <option value="">Moderate</option>
                {ACTIVITY_LEVELS.filter((o) => o.value !== "moderate").map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2.5 text-sm font-bold text-slate-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={values.hasRecurrentStones}
                onChange={(e) => set("hasRecurrentStones", e.target.checked)}
                className="accent-blue-900 w-4 h-4 rounded"
              />
              I&apos;ve had kidney stones more than once
            </label>
          </div>

          <NextButton onClick={() => setStep(4)}>Next</NextButton>
        </div>
      )}

      {step === 4 && (
        <div>
          <TopBar step={4} onBack={goBack} />
          <p className="text-[10px] font-black text-text-light uppercase tracking-widest mb-2">Step 4 of 4</p>
          <h2 className="text-xl font-black text-foreground mb-2">Does any of this apply to you?</h2>
          <p className="text-sm text-text-light mb-6">
            This won&apos;t stop the planner — it just helps us review with Dr. Deepanshu Gupta in person.
          </p>

          <div className="space-y-3">
            {[
              { key: "pregnant" as const, label: "Pregnant", icon: User },
              { key: "hasCkdOrDialysis" as const, label: "CKD / dialysis", icon: HeartPulse },
              { key: "isDiabetic" as const, label: "Diabetic", icon: Droplet },
            ].map((flag) => (
              <button
                type="button"
                key={flag.key}
                onClick={() => set(flag.key, !values[flag.key])}
                className={`w-full flex items-center gap-3 border rounded-2xl px-4 py-3.5 text-left transition-colors ${
                  values[flag.key] ? "border-primary bg-primary/5" : "border-border/60 bg-white"
                }`}
              >
                <span className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <flag.icon className="w-4 h-4 text-text-mid" />
                </span>
                <span className="text-sm font-bold text-slate-800 flex-1">{flag.label}</span>
                <span
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                    values[flag.key] ? "bg-primary border-primary" : "border-border"
                  }`}
                >
                  {values[flag.key] && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </span>
              </button>
            ))}
          </div>

          <NextButton onClick={handleCreate}>Create My Diet Plan</NextButton>
        </div>
      )}
    </div>
  );
}
