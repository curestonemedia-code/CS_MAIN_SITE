"use client";

import { useEffect, useState } from "react";
import LocationLeadForm from "./LocationLeadForm";

/**
 * Opens the same "Get Estimate" form used elsewhere (LocationLeadForm) in an
 * in-page modal instead of navigating to /book. Deliberately no modal
 * library/animation dependency - just conditional render + a CSS opacity
 * transition, so there's nothing extra to download or hydrate and no
 * layout-shift/lag on open.
 */
export default function GetEstimateModalButton({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  const [open, setOpen] = useState(false);

  // Esc to close, and stop body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/60"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Get free cost estimate"
            // stopPropagation: without this, a tap on a native <select>'s option
            // list can be misread as a tap on the backdrop underneath, closing
            // the select (and sometimes the modal) before the choice registers.
            // No overflow/scroll container here either - a native <select>
            // inside a scrollable ancestor is a known trigger for Chrome
            // closing the dropdown the instant it opens; this form is short
            // enough to never need to scroll, so there's nothing to lose.
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-[2rem] shadow-2xl max-w-md w-full p-6 md:p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="font-sans text-2xl font-bold text-blue-900 mb-2">Get Estimate</h3>
            <p className="text-slate-600 text-sm mb-6">Personalized cost breakdown for Gurgaon residents</p>
            <LocationLeadForm />
          </div>
        </div>
      )}
    </>
  );
}
