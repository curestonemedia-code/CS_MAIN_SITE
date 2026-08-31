import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQ_CATEGORIES } from "@/constants/faqs";
import DoctorProfile from "@/components/home/DoctorProfile";
import GoogleReviews from "@/components/home/GoogleReviews";
import {
  ADDRESS_DISPLAY,
  CONSULTATION_HOURS,
  MAPS_DIRECTIONS_URL,
  MAPS_EMBED_SRC,
  ORGANIZATION_ID,
  PHONE_SCHEMA,
  PHONE_TEL,
  PHYSICIAN_ID,
} from "@/constants/business";

const faqCategory = FAQ_CATEGORIES.find((category) => category.slug === "mini-pcnl-gurgaon")!;

const TITLE = "Mini-PCNL in Gurgaon: Cure Stone Hospital, Sector 52";
const DESCRIPTION =
  "Considering Mini-PCNL for a large kidney stone in Gurgaon? Meet the surgeon, see Cure Stone Hospital's Sector 52 facility, and how to book — the local decision guide, not the procedure explainer.";
const URL = "https://thecurestone.com/mini-pcnl-in-gurgaon";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Cure Stone",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.svg"],
  },
};

const procedureSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "Mini-PCNL in Gurgaon at Cure Stone Hospital",
  procedureType: "http://schema.org/PercutaneousProcedure",
  description: DESCRIPTION,
  bodyLocation: "Kidney",
  areaServed: { "@type": "City", name: "Gurgaon" },
  performer: { "@id": PHYSICIAN_ID },
  provider: {
    "@type": "MedicalBusiness",
    name: "Cure Stone",
    "@id": ORGANIZATION_ID,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
    { "@type": "ListItem", position: 2, name: "Mini PCNL", item: "https://thecurestone.com/mini-pcnl" },
    { "@type": "ListItem", position: 3, name: "Mini-PCNL in Gurgaon", item: URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategory.items.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const differentiators = [
  {
    icon: "🎯",
    title: "Single-Session Clearance Focus",
    desc: "Mini-PCNL at Cure Stone is planned to clear large or staghorn stones in one session where possible, reducing the chance of a repeat procedure.",
  },
  {
    icon: "🏥",
    title: "Single Sector 52 Facility",
    desc: "Consultation, imaging review, surgery and follow-up all happen at one Gurgaon address — no referral to a separate surgical centre across the city.",
  },
  {
    icon: "🩺",
    title: "Surgeon-Led Scan Review",
    desc: "Dr. Deepanshu Gupta personally reviews your CT KUB before confirming Mini-PCNL as the right approach for a large or complex stone — not a call-centre triage step.",
  },
];

const journey = [
  { step: "Consultation", desc: "Free video consult or in-clinic visit at Sector 52 — bring your CT KUB scan, or get one done locally beforehand." },
  { step: "Admission Day", desc: "Same-facility admission in Gurgaon; pre-anaesthesia checks completed on site." },
  { step: "Short Hospital Stay", desc: "A typical 1–2 day stay at the Sector 52 facility before discharge, monitored on site." },
  { step: "Local Follow-Up", desc: "Follow-up visits are scheduled back at the same Gurgaon hospital." },
];

export default function MiniPcnlInGurgaonPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(43,92,230,0.1),transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">Sector 52, Gurgaon</span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
            Mini-PCNL in Gurgaon: <span className="text-primary italic">Cure Stone Hospital</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            Deciding where to treat a large or staghorn kidney stone in Gurgaon? This is the surgeon, the facility and the booking process — not the procedure explainer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all text-center">
              Book PCNL Consultation →
            </Link>
            <Link href="/mini-pcnl" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-sm text-center">
              Learn How Mini-PCNL Works
            </Link>
          </div>
        </div>
      </section>

      <main className="flex-grow bg-background">
        {/* Why Cure Stone */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground">Why Cure Stone for <span className="text-primary">Mini-PCNL in Gurgaon</span></h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {differentiators.map((d, i) => (
                <div key={i} className="bg-primary/5 border border-primary/10 rounded-3xl p-6 md:p-8">
                  <span className="text-3xl">{d.icon}</span>
                  <h3 className="text-lg font-black text-slate-900 mt-4 mb-2">{d.title}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials */}
        <DoctorProfile />

        {/* Facility & Logistics */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="rounded-[2rem] overflow-hidden border border-slate-200 aspect-video lg:aspect-auto lg:h-80 relative shadow-lg">
                <iframe
                  src={MAPS_EMBED_SRC}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Cure Stone Hospital, Sector 52, Gurgaon"
                />
              </div>
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-foreground mb-6">The <span className="text-primary">Sector 52</span> Facility</h2>
                <p className="text-slate-600 font-medium mb-2"><strong className="text-slate-900">Address:</strong> {ADDRESS_DISPLAY}</p>
                <p className="text-slate-600 font-medium mb-2"><strong className="text-slate-900">Consultation hours:</strong> {CONSULTATION_HOURS}</p>
                <p className="text-slate-600 font-medium mb-6"><strong className="text-slate-900">Parking:</strong> On-site parking for patients and attendants.</p>
                <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest hover:gap-3 transition-all">
                  Get Directions →
                </a>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 text-center">Admission to <span className="text-primary">Recovery at Home</span></h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {journey.map((j, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
                  <span className="text-xs font-black uppercase tracking-widest text-primary">{`Step ${i + 1}`}</span>
                  <h3 className="text-base font-black text-slate-900 mt-2 mb-2">{j.step}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{j.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-slate-500 font-medium">
              Want the clinical step-by-step of how Mini-PCNL itself works?{" "}
              <Link href="/mini-pcnl" className="text-primary font-bold underline underline-offset-4">Read the full Mini-PCNL guide →</Link>
            </p>
          </div>
        </section>

        {/* Cost & Insurance */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">Cost & Insurance</h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-4">
              Mini-PCNL cost depends on stone size, complexity and length of hospital stay — there is no fixed number until your scan is reviewed. Most patients use cashless health insurance when medically indicated, and Cure Stone&apos;s team handles the documentation and approvals.
            </p>
            <p className="text-slate-600 font-medium leading-relaxed">
              The first video consultation is free; in-clinic consultations start at ₹800.
            </p>
          </div>
        </section>

        {/* Real Patient Outcomes */}
        <GoogleReviews />

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
              Mini-PCNL in Gurgaon <span className="text-primary italic">FAQs</span>
            </h2>
            <FaqAccordion items={faqCategory.items} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready to Book Mini-PCNL in Gurgaon?</h2>
            <p className="text-white/70 font-medium mb-10 text-base md:text-lg">Bring your CT KUB scan, or get one done locally, and meet Dr. Deepanshu Gupta at Sector 52.</p>
            <Link href="/book" className="inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-white text-primary font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-base md:text-lg">
              Book Free PCNL Consultation →
            </Link>
            <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-6">
              <a href={`tel:${PHONE_TEL}`}>{PHONE_SCHEMA}</a> · {CONSULTATION_HOURS}
            </p>
            <p className="mt-4">
              <Link href="/mini-pcnl" className="text-white/60 text-sm font-bold underline underline-offset-4 hover:text-white">
                ← Back to the Mini-PCNL procedure guide
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
