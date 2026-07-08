"use client";

import { useState } from "react";
import type { FaqItem } from "@/constants/faqs";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;

        return (
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
            <h3 className="m-0">
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-bold text-slate-900 hover:text-primary transition-colors"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <svg
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </h3>
            {isOpen && (
              <div className="px-6 pb-5 text-sm md:text-base text-slate-600 font-medium leading-relaxed border-t border-slate-200 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
