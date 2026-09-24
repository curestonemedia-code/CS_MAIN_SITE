"use client";

import { useEffect, useState } from "react";
import BlogLeadForm from "./BlogLeadForm";

const PHONE_TEL = "+918800263884";
const DONE_KEY = "blog-lead-done";

type Mode = "idle" | "popup" | "bar";

/**
 * Lightweight engagement layer for article pages: a name+phone popup 3s after
 * load, which collapses into a floating Call / Book Now bar when dismissed.
 * No animation or modal library - the popup is a plain conditional render so
 * it opens instantly.
 */
export default function BlogEngagement({ postTitle }: { postTitle: string }) {
  const [mode, setMode] = useState<Mode>("idle");

  useEffect(() => {
    let alreadyLeft = false;
    try {
      alreadyLeft = sessionStorage.getItem(DONE_KEY) === "1";
    } catch {}
    // Someone who already left their number this session skips the popup.
    const timer = setTimeout(() => setMode(alreadyLeft ? "bar" : "popup"), alreadyLeft ? 0 : 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mode !== "popup") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode("bar");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mode]);

  // Keep the last bit of page content clear of the bar on phones.
  useEffect(() => {
    if (mode !== "bar" || !window.matchMedia("(max-width: 767px)").matches) return;
    const prev = document.body.style.paddingBottom;
    document.body.style.paddingBottom = "5rem";
    return () => {
      document.body.style.paddingBottom = prev;
    };
  }, [mode]);

  const handleSuccess = () => {
    try {
      sessionStorage.setItem(DONE_KEY, "1");
    } catch {}
  };

  return (
    <>
      {mode === "popup" && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-4" data-lenis-prevent>
          <div className="absolute inset-0 bg-slate-900/60" onClick={() => setMode("bar")} aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Request a call back"
            className="relative w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setMode("bar")}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Free Consultation</p>
            <h2 className="mt-1 pr-8 text-2xl font-black leading-tight text-slate-900">
              Talk to a kidney stone specialist
            </h2>
            <p className="mb-5 mt-2 text-sm font-medium text-slate-600">
              Leave your number and our coordinator will call you back shortly.
            </p>
            <BlogLeadForm postTitle={postTitle} onSuccess={handleSuccess} />
          </div>
        </div>
      )}

      {mode === "bar" && (
        <div
          className="fixed inset-x-0 bottom-0 z-[80] border-t border-slate-200 bg-white/95 px-3 pt-3 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur pb-[max(0.75rem,env(safe-area-inset-bottom))] md:inset-x-auto md:bottom-6 md:left-1/2 md:w-[24rem] md:-translate-x-1/2 md:rounded-2xl md:border md:pb-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary py-3 text-sm font-black text-primary"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
            <button
              type="button"
              onClick={() => setMode("popup")}
              className="rounded-xl bg-primary py-3 text-sm font-black text-white"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
