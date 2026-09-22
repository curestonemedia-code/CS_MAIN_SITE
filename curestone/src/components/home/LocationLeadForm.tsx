"use client";

import React, { useState } from "react";
import {
  cleanText,
  normalizeIndianPhone,
  validateIndianPhone,
  validateName,
  validateOptionalDescription,
  validateSelect,
} from "@/utils/formValidation";
import { sendCrmLead } from "@/utils/crmWebhook";
import {
  CATEGORIES,
  STONE_SIZES,
  STONE_SIZE_CATEGORIES,
  SUB_TREATMENTS,
  SUB_TREATMENT_CATEGORY,
} from "@/constants/leadFormOptions";

// Unchanged from the original "Get Estimate" form - kept exactly as it was,
// deliberately not migrated to the newer Category model below.
const ESTIMATE_CONSULTATION_TYPES = [
  "Laser Stone Removal (RIRS)",
  "PCNL (Large/Staghorn Stones)",
  "ESWL (Shockwave Lithotripsy)",
  "URS (Ureteroscopic Stone Removal)",
  "Not Sure - Need Diagnosis",
];

type EstimateFormField = "fullName" | "phone" | "consultationType";
type EstimateFormErrors = Partial<Record<EstimateFormField, string>>;

type BookingFormField = "fullName" | "phone" | "category" | "stoneSize" | "subTreatment" | "description";
type BookingFormErrors = Partial<Record<BookingFormField, string>>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="mt-2 text-xs font-bold text-red-600" role="alert">
      {message}
    </p>
  );
}

/** The original, unchanged "Get Estimate" form: Name, Phone, Procedure Search. */
function EstimateForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<EstimateFormErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const phone = normalizeIndianPhone(formData.get("phone"));
    const name = cleanText(formData.get("fullName"));
    const consultationType = cleanText(formData.get("consultationType"));

    const nextErrors: EstimateFormErrors = {
      fullName: validateName(name),
      phone: validateIndianPhone(phone),
      consultationType: validateSelect(consultationType, ESTIMATE_CONSULTATION_TYPES, "Procedure"),
    };
    const activeErrors = Object.fromEntries(Object.entries(nextErrors).filter(([, message]) => message));

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      const firstField = Object.keys(activeErrors)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await sendCrmLead({
        form_type: "get_estimate",
        name,
        phone: `${phone}`,
        consultationType,
      });
      setIsSubmitted(true);
      onSuccess?.();
    } catch (error) {
      console.error("Submission Error:", error);
      alert("There was a connection issue. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="font-sans text-xl font-bold text-blue-900 mb-2">Request Received</h4>
        <p className="text-sm text-slate-600">Our medical coordinator will contact you shortly to confirm your slot.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Patient Name</label>
        <input name="fullName" required minLength={2} maxLength={80} aria-invalid={Boolean(errors.fullName)} className={`w-full bg-slate-50 border-transparent focus:border-blue-900 focus:ring-0 rounded-xl py-4 px-5 text-slate-900 ${errors.fullName ? "border-red-300 bg-red-50 focus:border-red-500" : ""}`} placeholder="Enter full name" type="text" />
        <FieldError message={errors.fullName} />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">WhatsApp Number</label>
        <div className="flex">
          <span className="bg-slate-50 border-r border-slate-200 py-4 px-4 rounded-l-xl text-slate-600 font-medium">+91</span>
          <input name="phone" required className={`w-full bg-slate-50 border-transparent focus:border-blue-900 focus:ring-0 rounded-r-xl py-4 px-5 text-slate-900 ${errors.phone ? "border-red-300 bg-red-50 focus:border-red-500" : ""}`} placeholder="10-digit mobile" type="tel" inputMode="numeric" autoComplete="tel" pattern="[6-9][0-9]{9}" maxLength={10} aria-invalid={Boolean(errors.phone)} />
        </div>
        <FieldError message={errors.phone} />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Procedure Search</label>
        <select name="consultationType" required aria-invalid={Boolean(errors.consultationType)} className={`w-full bg-slate-50 border-transparent focus:border-blue-900 focus:ring-0 rounded-xl py-4 px-5 text-slate-900 ${errors.consultationType ? "border-red-300 bg-red-50 focus:border-red-500" : ""}`}>
          {ESTIMATE_CONSULTATION_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <FieldError message={errors.consultationType} />
      </div>
      <button disabled={loading} type="submit" className="w-full bg-gradient-to-br from-blue-900 to-blue-700 text-white font-sans font-bold py-5 rounded-full mt-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70">
        {loading ? "Submitting..." : "Get Estimate Now"}
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </form>
  );
}

/** The newer "Book Appointment" form: Name, Phone, Category + conditional Stone Size / Sub-treatment. */
function BookingLeadForm({ submitLabel, onSuccess }: { submitLabel: string; onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [category, setCategory] = useState("");

  const showStoneSize = STONE_SIZE_CATEGORIES.includes(category as (typeof STONE_SIZE_CATEGORIES)[number]);
  const showSubTreatment = category === SUB_TREATMENT_CATEGORY;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const phone = normalizeIndianPhone(formData.get("phone"));
    const name = cleanText(formData.get("fullName"));
    const categoryValue = cleanText(formData.get("category"));
    const stoneSize = cleanText(formData.get("stoneSize"));
    const subTreatment = cleanText(formData.get("subTreatment"));
    const description = cleanText(formData.get("description"));

    const nextErrors: BookingFormErrors = {
      fullName: validateName(name),
      phone: validateIndianPhone(phone),
      category: validateSelect(categoryValue, CATEGORIES as unknown as string[], "Category"),
      description: validateOptionalDescription(description),
    };
    if (showStoneSize) {
      nextErrors.stoneSize = validateSelect(stoneSize, STONE_SIZES, "Stone size");
    }
    if (showSubTreatment) {
      nextErrors.subTreatment = validateSelect(subTreatment, SUB_TREATMENTS, "Sub-treatment");
    }
    const activeErrors = Object.fromEntries(Object.entries(nextErrors).filter(([, message]) => message));

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      const firstField = Object.keys(activeErrors)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      return;
    }

    setErrors({});
    setLoading(true);

    // What CRM staff see as the lead's complaint/summary text - keeps the
    // shared webhook working with zero backend changes (it folds whatever
    // arrives under `consultationType` into a free-text field).
    const consultationType = showSubTreatment && subTreatment ? `${categoryValue} — ${subTreatment}` : categoryValue;

    try {
      await sendCrmLead({
        form_type: "book_appointment",
        name,
        phone: `${phone}`,
        consultationType,
        category: categoryValue,
        ...(showStoneSize ? { stoneSize } : {}),
        ...(showSubTreatment && subTreatment ? { subTreatment } : {}),
        description: description || "No description",
      });
      setIsSubmitted(true);
      onSuccess?.();
    } catch (error) {
      console.error("Submission Error:", error);
      alert("There was a connection issue. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="font-sans text-xl font-bold text-blue-900 mb-2">Request Received</h4>
        <p className="text-sm text-slate-600">Our medical coordinator will contact you shortly to confirm your slot.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Patient Name</label>
        <input name="fullName" required minLength={2} maxLength={80} aria-invalid={Boolean(errors.fullName)} className={`w-full bg-slate-50 border-transparent focus:border-blue-900 focus:ring-0 rounded-xl py-4 px-5 text-slate-900 ${errors.fullName ? "border-red-300 bg-red-50 focus:border-red-500" : ""}`} placeholder="Enter full name" type="text" />
        <FieldError message={errors.fullName} />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">WhatsApp Number</label>
        <div className="flex">
          <span className="bg-slate-50 border-r border-slate-200 py-4 px-4 rounded-l-xl text-slate-600 font-medium">+91</span>
          <input name="phone" required className={`w-full bg-slate-50 border-transparent focus:border-blue-900 focus:ring-0 rounded-r-xl py-4 px-5 text-slate-900 ${errors.phone ? "border-red-300 bg-red-50 focus:border-red-500" : ""}`} placeholder="10-digit mobile" type="tel" inputMode="numeric" autoComplete="tel" pattern="[6-9][0-9]{9}" maxLength={10} aria-invalid={Boolean(errors.phone)} />
        </div>
        <FieldError message={errors.phone} />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
        <select
          name="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-invalid={Boolean(errors.category)}
          className={`w-full bg-slate-50 border-transparent focus:border-blue-900 focus:ring-0 rounded-xl py-4 px-5 text-slate-900 ${errors.category ? "border-red-300 bg-red-50 focus:border-red-500" : ""}`}
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <FieldError message={errors.category} />
      </div>
      {showStoneSize && (
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Stone Size</label>
          <select name="stoneSize" required aria-invalid={Boolean(errors.stoneSize)} className={`w-full bg-slate-50 border-transparent focus:border-blue-900 focus:ring-0 rounded-xl py-4 px-5 text-slate-900 ${errors.stoneSize ? "border-red-300 bg-red-50 focus:border-red-500" : ""}`}>
            <option value="">Select range</option>
            {STONE_SIZES.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <FieldError message={errors.stoneSize} />
        </div>
      )}
      {showSubTreatment && (
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Sub-treatment</label>
          <select name="subTreatment" required aria-invalid={Boolean(errors.subTreatment)} className={`w-full bg-slate-50 border-transparent focus:border-blue-900 focus:ring-0 rounded-xl py-4 px-5 text-slate-900 ${errors.subTreatment ? "border-red-300 bg-red-50 focus:border-red-500" : ""}`}>
            <option value="">Select sub-treatment</option>
            {SUB_TREATMENTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <FieldError message={errors.subTreatment} />
        </div>
      )}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Brief Description (Optional)</label>
        <textarea name="description" rows={3} maxLength={500} aria-invalid={Boolean(errors.description)} className={`w-full bg-slate-50 border-transparent focus:border-blue-900 focus:ring-0 rounded-xl py-4 px-5 text-slate-900 resize-none ${errors.description ? "border-red-300 bg-red-50 focus:border-red-500" : ""}`} placeholder="Current symptoms or anything else we should know..." />
        <FieldError message={errors.description} />
      </div>
      <button disabled={loading} type="submit" className="w-full bg-gradient-to-br from-blue-900 to-blue-700 text-white font-sans font-bold py-5 rounded-full mt-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70">
        {loading ? "Submitting..." : submitLabel}
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </form>
  );
}

export default function LocationLeadForm({
  formType = "get_estimate",
  submitLabel = "Schedule Free Consultation",
  onSuccess,
}: {
  formType?: "get_estimate" | "book_appointment";
  submitLabel?: string;
  onSuccess?: () => void;
}) {
  if (formType === "get_estimate") {
    return <EstimateForm onSuccess={onSuccess} />;
  }
  return <BookingLeadForm submitLabel={submitLabel} onSuccess={onSuccess} />;
}
