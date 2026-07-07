"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

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

const SCRIPT_URL = process.env.NEXT_PUBLIC_APPOINTMENT_FORM_SHEET_URL || "https://script.google.com/macros/s/AKfycbznh1P-N_hf16qop9l3squGsuPrf4nj03pVuWeYawZsdB8DBC1Oct-1SNX6KAZBHyVy8w/exec";

export default function AppointmentForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Create the payload for Google Sheets
    const data = {
      source: "Main Website Form",
      name: formData.get("fullName"),
      phone: formData.get("phone"),
      state: formData.get("state"),
      stoneSize: formData.get("stoneSize"),
      consultationType: formData.get("consultationType"),
      email: formData.get("email") || "Not Provided",
      description: formData.get("description") || "No description",
    };

    try {
      // Using 'no-cors' mode as standard for Google Apps Script Web App redirects
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
                Book your FANS-RIRS consultation for kidney stone treatment in Gurgaon. Your recovery plan depends on your scan, stone size, and clinical condition.
              </p>
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
                    <input name="fullName" required type="text" placeholder="Your Name" className="w-full px-5 py-3.5 bg-white border border-slate-100 rounded-xl outline-none focus:border-primary transition-all text-slate-900" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                    <input name="phone" required type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-5 py-3.5 bg-white border border-slate-100 rounded-xl outline-none focus:border-primary transition-all text-slate-900" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Indian State</label>
                    <select name="state" required className="w-full px-5 py-3.5 bg-white border border-slate-100 rounded-xl outline-none focus:border-primary transition-all text-slate-900 appearance-none">
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Stone Size</label>
                    <select name="stoneSize" required className="w-full px-5 py-3.5 bg-white border border-slate-100 rounded-xl outline-none focus:border-primary transition-all text-slate-900 appearance-none">
                      <option value="">Select Range</option>
                      {STONE_SIZES.map(sz => <option key={sz} value={sz}>{sz}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Treatment Required</label>
                    <select name="consultationType" className="w-full px-5 py-3.5 bg-white border border-slate-100 rounded-xl outline-none focus:border-primary transition-all text-slate-900 appearance-none">
                      <option>Kidney Stone Removal (RIRS)</option>
                      <option>Prostate Laser Treatment</option>
                      <option>UTI Consultation</option>
                      <option>General Urology</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email (Optional)</label>
                    <input name="email" type="email" placeholder="email@example.com" className="w-full px-5 py-3.5 bg-white border border-slate-100 rounded-xl outline-none focus:border-primary transition-all text-slate-900" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Brief Description</label>
                  <textarea name="description" rows={2} placeholder="Current symptoms..." className="w-full px-5 py-3.5 bg-white border border-slate-100 rounded-xl outline-none focus:border-primary transition-all text-slate-900 resize-none"></textarea>
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
