"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS, type SortOrder } from "./videoListHelpers";

export default function SortDropdown({ sort, onChange }: { sort: SortOrder; onChange: (sort: SortOrder) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 bg-white border border-border/70 rounded-full px-4 py-2 text-xs font-bold text-text-mid"
      >
        Sort: {SORT_OPTIONS.find((o) => o.value === sort)?.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl border border-slate-100 shadow-xl py-2 z-[65]">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 text-sm font-bold transition-colors ${
                sort === opt.value ? "text-primary bg-primary/5" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
