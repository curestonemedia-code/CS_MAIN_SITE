import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import LocationLeadForm from "@/components/home/LocationLeadForm";
import GetEstimateModalButton from "@/components/home/GetEstimateModalButton";
import { FAQ_CATEGORIES } from "@/constants/faqs";
import { ORGANIZATION_ID } from "@/constants/business";
import { Phone } from "lucide-react";

const faqCategory = FAQ_CATEGORIES.find((category) => category.slug === "ursl-cost")!;

const TITLE = "URSL Surgery Cost in India";
const DESCRIPTION =
  "How much does URSL (ureteroscopic lithotripsy) cost in India? Typical market ranges, what affects the price, and Cure Stone Hospital's Gurgaon starting price.";
const URL = "https://thecurestone.com/ursl-cost";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Cure Stone",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-image.svg"] },
};

// Deliberately no Offer/price schema — see /rirs-cost for the reasoning.
const procedureSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "URSL Surgery Cost",
  procedureType: "http://schema.org/PercutaneousProcedure",
  description: DESCRIPTION,
  bodyLocation: "Ureter",
  provider: { "@type": "MedicalBusiness", name: "Cure Stone", "@id": ORGANIZATION_ID },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
    { "@type": "ListItem", position: 2, name: "URSL Treatment", item: "https://thecurestone.com/ursl" },
    { "@type": "ListItem", position: 3, name: "URSL Cost", item: URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategory.items.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

// Real video from the Cure Stone YouTube channel — the general URSL
// procedure explainer (no dedicated "cost" video exists for this procedure).
const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "URSL Procedure Video",
  description: "Live-OT footage of a URSL (ureteroscopic lithotripsy) procedure, performed by Dr. Deepanshu Gupta at Cure Stone Hospital, Gurgaon.",
  thumbnailUrl: ["https://img.youtube.com/vi/w-0pRk1MyUM/maxresdefault.jpg"],
  uploadDate: "2022-04-08T20:49:49-07:00",
  duration: "PT5M31S",
  embedUrl: "https://www.youtube.com/embed/w-0pRk1MyUM",
  contentUrl: "https://www.youtube.com/watch?v=w-0pRk1MyUM",
  publisher: { "@type": "Organization", name: "Cure Stone", "@id": ORGANIZATION_ID },
};

export default function UrslCostPage() {
  return (
    <div className="cost-page flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(43,92,230,0.1),transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="cost-shell max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">URSL Cost</span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
                URSL Surgery <span className="text-primary italic">Cost in India</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mb-10">
                What URSL typically costs for ureteric stones across India, what changes the price, and Cure Stone Hospital&apos;s starting price in Gurgaon.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <GetEstimateModalButton
                  label="Get My Cost Estimate →"
                  className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all text-center whitespace-nowrap"
                />
                <Link href="/ursl-cost-in-gurgaon" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-sm text-center whitespace-nowrap">
                  Gurgaon Cost Breakdown
                </Link>
              </div>
            </div>

            {/* Get Estimate form */}
            <div className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(15,23,42,0.1)] border border-slate-200">
              <h3 className="font-sans text-2xl font-bold text-blue-900 mb-2">Get Free Estimate</h3>
              <p className="text-slate-600 text-sm mb-8">Personalized URSL cost breakdown for Gurgaon residents</p>
              <LocationLeadForm />
              <Link href="tel:+918800263884" className="block text-center bg-amber-600 text-white font-black text-xs uppercase tracking-widest hover:underline mt-6 rounded-full p-5">
                <Phone className="w-4 h-4 inline-block mr-2" />
                Call for immediate assistance
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow bg-background">
        {/* Video */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">URSL — <span className="text-primary">How It Works</span></h2>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/w-0pRk1MyUM"
                title="URSL Procedure Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Cost Summary — brief + "Learn More" link. Full factor-by-factor
            breakdown lives on /kidney-stone-surgery-cost-guide so it isn't
            repeated on every procedure's cost page. */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-4xl font-black text-foreground">URSL Cost at <span className="text-primary">Cure Stone, Gurgaon</span></h2>
            </div>
            <div className="bg-primary rounded-[2rem] p-8 md:p-10 shadow-xl shadow-primary/20 text-white">
              <div className="cost-stats grid grid-cols-3 gap-3 mb-6">
                <div>
                  <p className="cost-stat-label text-[10px] font-bold uppercase tracking-widest text-white/60">Minimum</p>
                  <p className="cost-stat-value font-bold">₹58,000</p>
                </div>
                <div>
                  <p className="cost-stat-label text-[10px] font-bold uppercase tracking-widest text-white/60">Average</p>
                  <p className="cost-stat-value font-bold">₹70,000</p>
                </div>
                <div>
                  <p className="cost-stat-label text-[10px] font-bold uppercase tracking-widest text-white/60">Maximum</p>
                  <p className="cost-stat-value font-bold">₹1,30,000</p>
                </div>
              </div>
              <p className="text-sm text-white/80 font-medium leading-relaxed mb-2">
                Costs vary hospital to hospital and policy to policy. Your final cost is confirmed only after Dr.
                Deepanshu Gupta reviews your CT or USG scan — never quoted sight-unseen.
              </p>
              <p className="text-sm text-white/80 font-medium leading-relaxed">
                Larger or multiple stones may need a staged approach (more than one procedure) — this clearly
                depends on your case.
              </p>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <span className="text-xl leading-none mb-2 block">📍</span>
                <h3 className="text-sm font-black text-slate-900 mb-1">Stone Location</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Mid or upper-ureter stones need slower, more careful scope work than a lower-ureter stone.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <span className="text-xl leading-none mb-2 block">🧵</span>
                <h3 className="text-sm font-black text-slate-900 mb-1">DJ Stent, If Needed</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Placement plus a later removal visit adds to the ₹58,000 starting price.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <span className="text-xl leading-none mb-2 block">🔁</span>
                <h3 className="text-sm font-black text-slate-900 mb-1">More Than One Sitting</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Rare — mainly for a stone impacted long enough to need a stent first, cleared later.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/kidney-stone-surgery-cost-guide" className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
                Read the Full Cost Guide →
              </Link>
            </div>

            <div className="mt-8 bg-white border border-primary/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-start gap-4 text-left">
                <span className="text-2xl shrink-0">🛡️</span>
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-1">Cashless Insurance Support</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    URSL is covered under cashless health insurance in most policies when medically indicated — the
                    front desk at Sector 52 handles pre-authorization directly with your insurer&apos;s TPA, so
                    approvals are settled before your admission date, not scrambled together on the day of.
                  </p>
                </div>
              </div>
              <GetEstimateModalButton
                label="Ask About My Policy →"
                className="shrink-0 px-6 py-3 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-primary-dark transition-all text-center whitespace-nowrap"
              />
            </div>
          </div>
        </section>

        {/* Your Surgeon */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
              <Image src="/assets/doctor.png" alt="Dr. Deepanshu Gupta" fill sizes="144px" className="object-cover object-top" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Your Surgeon</p>
              <h3 className="text-xl font-black text-slate-900 mb-1">Dr. Deepanshu Gupta</h3>
              <p className="text-sm text-slate-500 font-medium mb-3">MBBS · MS (PGIMS) · MCh Urology (Rank 1) — performs every URSL procedure at Cure Stone.</p>
              <Link href="/dr-deepanshu-gupta" className="text-primary font-black text-xs uppercase tracking-widest hover:underline">
                Full profile →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
              URSL Cost <span className="text-primary italic">FAQs</span>
            </h2>
            <FaqAccordion items={faqCategory.items} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Get Your Exact URSL Cost</h2>
            <p className="text-white/70 font-medium mb-10 text-base md:text-lg">
              Book a consultation. Dr. Deepanshu Gupta reviews your scan and gives you a case-specific estimate.
            </p>
            <GetEstimateModalButton
              label="Book Consultation →"
              className="inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-white text-primary font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-base md:text-lg whitespace-nowrap"
            />
            <p className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
              <Link href="/ursl" className="text-white/60 text-sm font-bold underline underline-offset-4 hover:text-white">
                ← Learn how URSL works
              </Link>
              <Link href="/ursl-cost-in-gurgaon" className="text-white/60 text-sm font-bold underline underline-offset-4 hover:text-white">
                See the Gurgaon cost breakdown →
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
