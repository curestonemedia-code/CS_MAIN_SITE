"use client";

import { useState } from "react";
import LocationLeadForm from "./LocationLeadForm";

export default function AppointmentForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

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
              <LocationLeadForm
                formType="book_appointment"
                submitLabel="SCHEDULE FREE CONSULTATION"
                onSuccess={() => setIsSubmitted(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
