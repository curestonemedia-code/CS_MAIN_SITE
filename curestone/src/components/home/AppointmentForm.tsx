"use client";

import React, { useState, useRef } from "react";
import {
  cleanText,
  normalizeIndianPhone,
  validateIndianPhone,
  validateName,
  validateOptionalDescription,
  validateOptionalEmail,
  validateSelect,
} from "@/utils/formValidation";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const STONE_SIZES = [
  "Less than 5mm",
  "5mm - 10mm",
  "10mm - 15mm",
  "15mm - 20mm",
  "20mm - 30mm",
  "Greater than 30mm",
  "Unknown / Not Diagnosed"
];

const CONSULTATION_TYPES = [
  "Kidney Stone Removal (RIRS)",
  "Prostate Laser Treatment",
  "UTI Consultation",
  "General Urology",
];

const SCRIPT_URL = process.env.NEXT_PUBLIC_APPOINTMENT_FORM_SHEET_URL || "https://script.google.com/macros/s/AKfycbznh1P-N_hf16qop9l3squGsuPrf4nj03pVuWeYawZsdB8DBC1Oct-1SNX6KAZBHyVy8w/exec";

type FormField = "fullName" | "phone" | "state" | "stoneSize" | "consultationType" | "email" | "description";
type FormErrors = Partial<Record<FormField, string>>;

const baseFieldClass = "w-full px-5 py-3.5 bg-white border rounded-xl outline-none focus:border-primary transition-all text-slate-900";

function getFieldClass(field: FormField, errors: FormErrors, extra = "") {
  return `${baseFieldClass} ${errors[field] ? "border-red-300 bg-red-50 focus:border-red-500" : "border-slate-100"} ${extra}`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="ml-1 text-xs font-bold text-red-600" role="alert">
      {message}
    </p>
  );
}

export default function AppointmentForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const phone = normalizeIndianPhone(formData.get("phone"));
    const data = {
      source: "Main Website Form",
      name: cleanText(formData.get("fullName")),
      phone: `+91 ${phone}`,
      state: cleanText(formData.get("state")),
      stoneSize: cleanText(formData.get("stoneSize")),
      consultationType: cleanText(formData.get("consultationType")),
      email: cleanText(formData.get("email")),
      description: cleanText(formData.get("description")),
    };

    const nextErrors: FormErrors = {
      fullName: validateName(data.name),
      phone: validateIndianPhone(phone),
      state: validateSelect(data.state, INDIAN_STATES, "State"),
      stoneSize: validateSelect(data.stoneSize, STONE_SIZES, "Stone size"),
      consultationType: validateSelect(data.consultationType, CONSULTATION_TYPES, "Treatment"),
      email: validateOptionalEmail(data.email),
      description: validateOptionalDescription(data.description),
    };
    const activeErrors = Object.fromEntries(Object.entries(nextErrors).filter(([, message]) => message));

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      const firstField = Object.keys(activeErrors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      return;
    }

    setErrors({});
    setLoading(true);
    
    const payload = {
      ...data,
      email: data.email || "Not Provided",
      description: data.description || "No description",
    };

    try {
      // Using 'no-cors' mode as standard for Google Apps Script Web App redirects
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      // Since 'no-cors' doesn't return a readable response, we assume success 
      // if the fetch doesn't throw.
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
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 text-green-600 rounded-full mb-8">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            Consultation <span className="text-primary italic">Scheduled!</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-lg mx-auto mb-10 font-medium">
            Thank you. Our medical coordinator will contact you within 15 minutes to confirm your appointment.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all"
          >
            Book Another Appointment
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment-section" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">
                Priority Booking
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Experience <br />
                <span className="text-primary italic">World-Class</span> Care.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Book your FANS-RIRS consultation. Zero radiation, zero cuts, 100% recovery focus.              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white/50 border border-white shadow-sm">
                <h4 className="font-bold text-slate-900 mb-1">Fast Track</h4>
                <p className="text-xs text-slate-500 font-medium italic">Confirmed slots within 30 mins.</p>
              </div>
              <div className="p-6 rounded-3xl bg-white/50 border border-white shadow-sm">
                <h4 className="font-bold text-slate-900 mb-1">Expert Care</h4>
                <p className="text-xs text-slate-500 font-medium italic">Direct Medical Case Review</p>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white/70 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white shadow-2xl shadow-primary/5">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input name="fullName" required type="text" placeholder="Your Name" minLength={2} maxLength={80} aria-invalid={Boolean(errors.fullName)} className={getFieldClass("fullName", errors)} />
                    <FieldError message={errors.fullName} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                    <input name="phone" required type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile number" pattern="[6-9][0-9]{9}" maxLength={10} aria-invalid={Boolean(errors.phone)} className={getFieldClass("phone", errors)} />
                    <FieldError message={errors.phone} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Indian State</label>
                    <select name="state" required aria-invalid={Boolean(errors.state)} className={getFieldClass("state", errors, "appearance-none")}>
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <FieldError message={errors.state} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Stone Size</label>
                    <select name="stoneSize" required aria-invalid={Boolean(errors.stoneSize)} className={getFieldClass("stoneSize", errors, "appearance-none")}>
                      <option value="">Select Range</option>
                      {STONE_SIZES.map(sz => <option key={sz} value={sz}>{sz}</option>)}
                    </select>
                    <FieldError message={errors.stoneSize} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Treatment Required</label>
                    <select name="consultationType" required aria-invalid={Boolean(errors.consultationType)} className={getFieldClass("consultationType", errors, "appearance-none")}>
                      {CONSULTATION_TYPES.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                    <FieldError message={errors.consultationType} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email (Optional)</label>
                    <input name="email" type="email" maxLength={120} placeholder="email@example.com" aria-invalid={Boolean(errors.email)} className={getFieldClass("email", errors)} />
                    <FieldError message={errors.email} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Brief Description</label>
                  <textarea name="description" rows={2} maxLength={500} placeholder="Current symptoms..." aria-invalid={Boolean(errors.description)} className={getFieldClass("description", errors, "resize-none")}></textarea>
                  <FieldError message={errors.description} />
                </div>

                <button 
                  disabled={loading} 
                  type="submit" 
                  className="w-full py-4 bg-primary text-white font-black rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 disabled:opacity-70 transition-all"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      SENDING...
                    </span>
                  ) : "SCHEDULE FREE CONSULTATION"}
                </button>
                
                <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest">
                  Secure & Confidential
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
