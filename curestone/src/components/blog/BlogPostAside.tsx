import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import BlogLeadForm from "./BlogLeadForm";
import { DOCTOR_REGISTRATION_DISPLAY } from "@/constants/business";

const CREDENTIALS = [
  "MBBS · MS (PGIMS) · MCh Urology (Rank 1, RML Hospital)",
  "Chief Urologist & Founder, Cure Stone Hospital",
  "Formerly at Apollo, RML / PGIMER, Fortis and Max Hospitals",
  DOCTOR_REGISTRATION_DISPLAY,
];

const STATS = [
  { value: "15+", label: "Years" },
  { value: "9K+", label: "Surgeries" },
  { value: "4.9", label: "Google" },
];

export default function BlogPostAside({ postTitle }: { postTitle: string }) {
  return (
    <aside id="blog-enquiry" className="mt-12 scroll-mt-28 lg:mt-0" aria-label="Book a consultation">
      <div className="space-y-6 lg:sticky lg:top-28">
        <a
          href="https://www.google.com/preferences/source?q=https://thecurestone.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-3xl bg-gradient-to-br from-blue-900 via-blue-700 to-primary p-6 shadow-xl shadow-primary/25 transition-transform hover:scale-[1.015]"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/75">Google Search</span>
          </div>
          <h2 className="text-lg font-black leading-snug text-white">Prefer Cure Stone on Google</h2>
          <p className="mt-1.5 text-xs font-medium leading-relaxed text-white/80">
            See more from thecurestone.com in your search results and AI Overviews.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-black text-primary transition-colors group-hover:bg-blue-50">
            Add as Preferred Source <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </a>

        <div className="rounded-3xl border border-primary/15 bg-white p-6 shadow-xl shadow-primary/5">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary">Patient Enquiry</p>
          <h2 className="mb-1 mt-1 text-xl font-black text-slate-900">Get a call back</h2>
          <p className="mb-4 text-sm font-medium text-slate-500">Share your number — we&apos;ll reach out shortly.</p>
          <BlogLeadForm postTitle={postTitle} />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/doctor.png"
              alt="Dr. Deepanshu Gupta"
              width={753}
              height={807}
              sizes="80px"
              className="h-20 w-20 shrink-0 rounded-2xl bg-slate-100 object-cover object-top"
            />
            <div>
              <h2 className="text-lg font-black leading-tight text-slate-900">Dr. Deepanshu Gupta</h2>
              <p className="mt-0.5 text-xs font-bold text-primary">Senior Urologist &amp; Kidney Stone Specialist</p>
              <div className="mt-1.5 flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
                <span className="ml-1 text-[11px] font-bold text-slate-500">4.9 on Google</span>
              </div>
            </div>
          </div>

          <ul className="mt-5 space-y-2 text-xs font-medium leading-relaxed text-slate-600">
            {CREDENTIALS.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-lg font-black text-slate-900">{s.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>

          <Link
            href="/dr-deepanshu-gupta"
            className="mt-4 block text-center text-xs font-black text-primary hover:underline"
          >
            View full profile →
          </Link>
        </div>
      </div>
    </aside>
  );
}
