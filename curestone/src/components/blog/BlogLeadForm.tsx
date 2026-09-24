"use client";

import { useId, useState } from "react";
import { cleanText, normalizeIndianPhone, validateIndianPhone, validateName } from "@/utils/formValidation";
import { sendCrmLead } from "@/utils/crmWebhook";

const inputClass =
  "w-full rounded-xl border bg-slate-50 px-4 py-3.5 text-base font-medium text-slate-900 outline-none transition-colors focus:border-primary focus:bg-white";

export default function BlogLeadForm({
  postTitle,
  onSuccess,
  submitLabel = "Request Call Back",
}: {
  postTitle: string;
  onSuccess?: () => void;
  submitLabel?: string;
}) {
  const uid = useId();
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = cleanText(fd.get("name"));
    const phone = normalizeIndianPhone(fd.get("phone"));

    const next = { name: validateName(name), phone: validateIndianPhone(phone) };
    if (next.name || next.phone) {
      setErrors({ name: next.name || undefined, phone: next.phone || undefined });
      return;
    }

    setErrors({});
    setFailed(false);
    setLoading(true);
    try {
      await sendCrmLead({
        form_type: "get_estimate",
        name,
        phone,
        consultationType: `Blog enquiry — ${postTitle}`.slice(0, 150),
      });
      setDone(true);
      onSuccess?.();
    } catch (error) {
      console.error("Blog lead submission error:", error);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="py-4 text-center" role="status">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-base font-black text-slate-900">Thank you!</p>
        <p className="mt-1 text-sm font-medium text-slate-600">Our coordinator will call you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <div>
        <label htmlFor={`${uid}-name`} className="sr-only">Your name</label>
        <input
          id={`${uid}-name`}
          name="name"
          type="text"
          autoComplete="name"
          maxLength={80}
          placeholder="Your name"
          aria-invalid={Boolean(errors.name)}
          className={`${inputClass} ${errors.name ? "border-red-300 bg-red-50" : "border-slate-200"}`}
        />
        {errors.name && <p className="mt-1 text-xs font-bold text-red-600" role="alert">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor={`${uid}-phone`} className="sr-only">Mobile number</label>
        <div className="flex">
          <span className="flex items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 px-3 text-sm font-bold text-slate-600">+91</span>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={10}
            placeholder="10-digit mobile number"
            aria-invalid={Boolean(errors.phone)}
            className={`${inputClass} rounded-l-none ${errors.phone ? "border-red-300 bg-red-50" : "border-slate-200"}`}
          />
        </div>
        {errors.phone && <p className="mt-1 text-xs font-bold text-red-600" role="alert">{errors.phone}</p>}
      </div>
      {failed && (
        <p className="text-xs font-bold text-red-600" role="alert">
          Connection issue — please try again or call us directly.
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary py-3.5 text-sm font-black text-white shadow-lg shadow-primary/20 transition-colors hover:bg-blue-700 disabled:opacity-70"
      >
        {loading ? "Sending..." : submitLabel}
      </button>
    </form>
  );
}
