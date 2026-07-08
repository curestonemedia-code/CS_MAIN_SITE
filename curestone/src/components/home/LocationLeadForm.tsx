"use client";

import React, { useState } from "react";
import {
  cleanText,
  normalizeIndianPhone,
  validateIndianPhone,
  validateName,
  validateSelect,
} from "@/utils/formValidation";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx7PzS4zQuLEOyTVe9U0VpcWT3ZR3m9gRMDU6NrVUOQ99D8svQCIZzCCNNv5Y8hki_R/exec";
const CONSULTATION_TYPES = [
  "Laser Stone Removal (RIRS)",
  "PCNL (Large/Staghorn Stones)",
  "ESWL (Shockwave Lithotripsy)",
  "URS (Ureteroscopic Stone Removal)",
  "Not Sure - Need Diagnosis",
];

type FormField = "fullName" | "phone" | "consultationType";
type FormErrors = Partial<Record<FormField, string>>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="mt-2 text-xs font-bold text-red-600" role="alert">
      {message}
    </p>
  );
}

export default function LocationLeadForm({ locationName = "your area" }: { locationName?: string }) {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const phone = normalizeIndianPhone(formData.get("phone"));
    const name = cleanText(formData.get("fullName"));
    const consultationType = cleanText(formData.get("consultationType"));

    const nextErrors: FormErrors = {
      fullName: validateName(name),
      phone: validateIndianPhone(phone),
      consultationType: validateSelect(consultationType, CONSULTATION_TYPES, "Procedure"),
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
    
    // Create the payload for Google Sheets matching the App Script expectations
    const data = {
      source: `Lead from ${locationName}`,
      name,
      phone: `${phone}`,
      state: locationName,
      stoneSize: "Not Provided",
      consultationType,
      email: "Not Provided",
      description: `Patient requested callback from the ${locationName} landing page.`,
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setIsSubmitted(true);
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
          <span className="material-symbols-outlined text-3xl">check</span>
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
          {CONSULTATION_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <FieldError message={errors.consultationType} />
      </div>
      <button disabled={loading} type="submit" className="w-full editorial-gradient text-white font-sans font-bold py-5 rounded-full mt-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70">
        {loading ? "Submitting..." : "Get Estimate Now"} <span className="material-symbols-outlined">event_available</span>
      </button>
    </form>
  );
}
