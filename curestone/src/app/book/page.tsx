"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  cleanText,
  normalizeIndianPhone,
  validateIndianPhone,
  validateName,
  validateOptionalDescription,
  validateOptionalSelect,
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

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwMzUdglP89pw8ZCzSt65DIg3bgn43krFUSeGTQ4A8B7AFnSL053agigLcoC78foHgU/exec";

const STONE_SIZES = ["Less than 5mm", "5mm - 10mm", "10mm - 15mm", "15mm - 20mm", "20mm - 30mm", "Greater than 30mm", "Unknown"];
const CONSULTATION_TYPES = ["Kidney Stone Treatment", "Gall Bladder Stone Treatment", "Urology Treatment", "Andrology Treatment", "Second Opinion", "Online Video Consult"];

type FormField = "fullName" | "phone" | "state" | "stoneSize" | "consultationType" | "description";
type FormErrors = Partial<Record<FormField, string>>;

const baseFieldClass = "w-full px-5 py-3.5 bg-white border rounded-xl outline-none focus:border-primary transition-all text-slate-900 font-medium";

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

const faqs = [
  { q: "How soon will I get a confirmation?", a: "Our coordinator calls within 15 minutes of form submission during clinic hours (10 AM – 7 PM On Appoinment)." },
  { q: "Is the consultation free?", a: "The first online video consultation is free. In-clinic consultations start at ₹800." },
  { q: "Do I need to carry any reports?", a: "If you have existing ultrasound, CT KUB or blood reports, please carry them. It helps our team assess your case faster." },
  { q: "Can I book for a family member?", a: "Yes. Just fill in the patient's details in the form. You can also contact us directly via WhatsApp." },
  { q: "What if I am outside India?", a: "We offer international video consultations. Select 'Online Video' as consultation type and mention your country in the description." },
];

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const phone = normalizeIndianPhone(fd.get("phone"));
    const data = {
      name: cleanText(fd.get("fullName")),
      phone: `${phone}`,
      state: cleanText(fd.get("state")),
      stoneSize: cleanText(fd.get("stoneSize")),
      consultationType: cleanText(fd.get("consultationType")),
      email: "Not Provided",
      description: cleanText(fd.get("description")),
    };

    const nextErrors: FormErrors = {
      fullName: validateName(data.name),
      phone: validateIndianPhone(phone),
      state: validateSelect(data.state, INDIAN_STATES, "State"),
      stoneSize: validateOptionalSelect(data.stoneSize, STONE_SIZES, "Stone size"),
      consultationType: validateSelect(data.consultationType, CONSULTATION_TYPES, "Consultation type"),
      description: validateOptionalDescription(data.description),
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

    const payload = {
      ...data,
      description: data.description || "No description",
    };

    try {
      await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setSubmitted(true);
    } catch { alert("Connection issue. Please try again or call us directly."); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-24 bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(43,92,230,0.35),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">Priority Booking Open</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.05] mb-6">
            Book Your <span className="text-primary italic">Consultation</span>
          </h1>
          <p className="text-lg text-white/60 font-medium max-w-2xl mx-auto mb-10">Speak with Dr. Deepanshu Gupta about kidney stone surgery in Gurgaon, RIRS options, scan review, and treatment planning.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Call Back in 15 mins", "Online & In-Clinic", "Free First Consult", "Secure & Confidential"].map((t, i) => (
              <span key={i} className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full text-sm font-bold text-white/70">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-grow bg-background py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Form Section */}
            <div className="lg:col-span-2 space-y-12">
              {submitted ? (
                <div className="bg-white/70 backdrop-blur-2xl p-14 rounded-[2.5rem] border border-white shadow-2xl shadow-primary/5 text-center">
                  <div className="w-20 h-20 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-3">Booking <span className="text-primary italic">Confirmed!</span></h2>
                  <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">Our coordinator will call you within 15 minutes to finalize your appointment slot.</p>
                  <button onClick={() => setSubmitted(false)} className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all uppercase tracking-widest text-sm">Book Another Slot</button>
                </div>
              ) : (
                <div className="bg-white/70 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white shadow-2xl shadow-primary/5">
                  <h2 className="text-2xl font-black text-slate-900 mb-1">Schedule Free Consultation</h2>
                  <p className="text-sm text-slate-500 font-medium mb-8">Fill in the details and we&apos;ll reach out within 15 minutes.</p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name *</label>
                        <input name="fullName" required type="text" minLength={2} maxLength={80} placeholder="Your Name" aria-invalid={Boolean(errors.fullName)} className={getFieldClass("fullName", errors)} />
                        <FieldError message={errors.fullName} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number *</label>
                        <div className="flex">
                          <span className="bg-slate-50 border-r border-slate-200 py-4 px-4 rounded-l-xl text-slate-600 font-medium">+91</span>
                          <input name="phone" required type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile number" pattern="[6-9][0-9]{9}" maxLength={10} aria-invalid={Boolean(errors.phone)} className={getFieldClass("phone", errors)} />
                        </div>
                        <FieldError message={errors.phone} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">State *</label>
                        <select name="state" required aria-invalid={Boolean(errors.state)} className={getFieldClass("state", errors, "appearance-none")}>
                          <option value="">Select State</option>
                          {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <FieldError message={errors.state} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Stone Size</label>
                        <select name="stoneSize" aria-invalid={Boolean(errors.stoneSize)} className={getFieldClass("stoneSize", errors, "appearance-none")}>
                          <option value="">Select Range</option>
                          {STONE_SIZES.map(s => <option key={s}>{s}</option>)}
                        </select>
                        <FieldError message={errors.stoneSize} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Consultation Type</label>
                      <select name="consultationType" required aria-invalid={Boolean(errors.consultationType)} className={getFieldClass("consultationType", errors, "appearance-none")}>
                        {CONSULTATION_TYPES.map(s => <option key={s}>{s}</option>)}
                      </select>
                      <FieldError message={errors.consultationType} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Brief Description</label>
                      <textarea name="description" rows={3} maxLength={500} placeholder="Describe symptoms or previous treatments..." aria-invalid={Boolean(errors.description)} className={getFieldClass("description", errors, "resize-none")} />
                      <FieldError message={errors.description} />
                    </div>
                    <button disabled={loading} type="submit" className="w-full py-4 bg-primary text-white font-black rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 disabled:opacity-70 transition-all text-base tracking-wide uppercase">
                      {loading ? "Sending..." : "Schedule Free Consultation"}
                    </button>
                    <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 17.91c-3.71-.94-6-4.79-6-8.91V6.3l6-2.25 6 2.25V11c0 4.12-2.29 7.97-6 8.91z" /></svg>
                      Secure & Confidential
                    </p>
                  </form>
                </div>
              )}

              {/* FAQ Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-black text-foreground">Frequently Asked Questions</h3>
                  <Link href="/faqs" className="text-sm font-black text-primary hover:underline whitespace-nowrap">
                    See All FAQs →
                  </Link>
                </div>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div key={i} className="bg-white border border-border/50 rounded-2xl overflow-hidden">
                      <button className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-slate-800 hover:text-primary transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                        <span>{faq.q}</span>
                        <svg className={`w-5 h-5 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      </button>
                      {openFaq === i && <div className="px-6 pb-5 text-sm text-slate-500 font-medium leading-relaxed border-t border-border/30 pt-4">{faq.a}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-foreground p-8 rounded-3xl text-white">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-5">Direct Contact</p>
                <a href="tel:+918800263884" className="flex items-center gap-3 group mb-5">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div><p className="font-black text-white text-lg">+91 88002 63884</p><p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Available 10 AM – 7 PM On Appoinment</p></div>
                </a>
                <a href="https://wa.me/918800263884" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors text-sm uppercase tracking-wide">
                  WhatsApp Now
                </a>
              </div>

              {/* Map Card */}
              <div className="bg-white border border-border/50 rounded-3xl overflow-hidden shadow-sm">
                <div className="w-full h-64 bg-slate-100">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14033.273570394473!2d77.070288!3d28.439817!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19559d21f213%3A0xa736733167a5023b!2sCure%20Stone!5e0!3m2!1sen!2sin!4v1782981388299!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="w-full h-full"></iframe>
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Our Location</p>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 leading-tight">Cure Stone Hospital</p>
                      <p className="text-xs text-slate-500 mt-1">Sector 52, Near Plot 3, Rd No D-13 A, Ardee City, Gurugram, Haryana 122003</p>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-2">Mon–Sat, 10 AM – 7 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Card */}
              <div className="bg-primary/5 border border-primary/10 p-8 rounded-3xl space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Why Cure Stone</p>
                {["RIRS Surgery in Gurgaon", "9000+ Surgeries Done", "Radiation-Aware Planning", "Sector 52 Hospital"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/checker" className="flex items-center justify-center gap-3 w-full py-5 bg-foreground text-white font-black rounded-2xl hover:bg-slate-800 transition-all text-sm uppercase tracking-widest">
                Cure Stone AI
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
