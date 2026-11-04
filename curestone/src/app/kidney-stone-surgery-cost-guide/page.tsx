import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import GetEstimateModalButton from "@/components/home/GetEstimateModalButton";
import { FAQ_CATEGORIES } from "@/constants/faqs";
import { ORGANIZATION_ID } from "@/constants/business";

const faqCategory = FAQ_CATEGORIES.find((category) => category.slug === "surgery-cost-guide")!;

const TITLE = "What Determines Kidney Stone Surgery Cost";
const DESCRIPTION =
  "Kidney stone surgery cost varies hospital to hospital and policy to policy. Here's exactly what moves the number — stone size, staging, room category and insurance — explained plainly.";
const URL = "https://thecurestone.com/kidney-stone-surgery-cost-guide";

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

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: TITLE,
  description: DESCRIPTION,
  url: URL,
  about: { "@type": "MedicalBusiness", name: "Cure Stone", "@id": ORGANIZATION_ID },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
    { "@type": "ListItem", position: 2, name: "Surgery Cost Guide", item: URL },
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

const factors = [
  { icon: "🪨", title: "Stone size & complexity", desc: "Larger, multiple, or harder-to-reach stones generally mean more procedure time and, sometimes, a staged approach." },
  { icon: "🔧", title: "Which procedure fits your case", desc: "RIRS, Mini-PCNL, URSL and ESWL have different cost bands — the right one for your stone is confirmed by your scan, not chosen by price." },
  { icon: "🛏️", title: "Length of hospital stay", desc: "Most stone procedures are same-day to 2-day stays. A longer recovery stay adds to the total." },
  { icon: "💉", title: "Anaesthesia type", desc: "Spinal vs. general anaesthesia is case-specific and factors into theatre and recovery costs." },
  { icon: "🛎️", title: "Room category", desc: "General ward vs. a private room upgrade is one of the biggest swing factors within any given procedure's range." },
  { icon: "🏥", title: "Hospital tier & city", desc: "The same procedure can cost meaningfully different amounts between hospitals and cities — there is no single national price." },
];

const included = ["Surgeon's fee", "OT & anaesthesia charges", "Standard ward stay for the usual admission"];
const canAdd = [
  "Private room upgrade",
  "Stay extended beyond standard",
  "DJ stent insertion & later removal, where applicable",
  "Additional pre-op imaging or labs",
];

const procedureLinks = [
  { name: "RIRS", desc: "Laser surgery for most kidney stones.", min: "₹78,000", max: "₹1,50,000", href: "/rirs-cost", gurgaonHref: "/rirs-cost-in-gurgaon" },
  { name: "Mini-PCNL", desc: "Keyhole surgery for large or staghorn stones.", min: "₹70,000", max: "₹1,40,000", href: "/mini-pcnl-cost", gurgaonHref: "/mini-pcnl-cost-in-gurgaon" },
  { name: "URSL", desc: "Scope-based removal for ureter stones.", min: "₹58,000", max: "₹1,30,000", href: "/ursl-cost", gurgaonHref: "/ursl-cost-in-gurgaon" },
];

const CheckIcon = () => (
  <svg className="w-5 h-5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 20 20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 4v12M4 10h12" />
  </svg>
);

export default function SurgeryCostGuidePage() {
  return (
    <div className="cost-page flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-28 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(43,92,230,0.1),transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">
            Surgery Cost Guide
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
            What Determines <span className="text-primary italic">Kidney Stone Surgery Cost</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            There is no single fixed price for RIRS, Mini-PCNL, URSL or ESWL. Costs vary hospital to hospital and
            policy to policy — here&apos;s exactly what moves the number, explained plainly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GetEstimateModalButton
              label="Get My Cost Estimate →"
              className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all text-center whitespace-nowrap"
            />
            <Link href="#by-procedure" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-sm text-center whitespace-nowrap">
              See Cost by Procedure
            </Link>
          </div>
        </div>
      </section>

      <main className="flex-grow bg-background">
        {/* The honest answer */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="relative bg-slate-900 rounded-[2.5rem] p-8 md:p-14 lg:p-16 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
              <span className="text-7xl md:text-8xl font-black text-white/10 leading-none select-none absolute top-6 left-8 md:left-12">
                &ldquo;
              </span>
              <div className="relative grid md:grid-cols-[auto_1fr] gap-6 md:gap-12 items-center">
                <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 shrink-0">
                  <span className="text-4xl md:text-5xl">🤷</span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white md:mt-2">
                    It <span className="text-primary">Depends</span>.
                  </h2>
                </div>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed">
                    Costs vary hospital to hospital, and policy to policy. Two patients with a similar-sized stone,
                    treated at two different hospitals — or even covered by two different insurance policies at the
                    same hospital — can see genuinely different final bills.
                  </p>
                  <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed">
                    Any number you see quoted online — on this site included — is a range built from real cases, not
                    a fixed price. Your own cost is confirmed only after Dr. Deepanshu Gupta reviews your CT or USG
                    scan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What moves the number */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">The Factors</span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground">
                What <span className="text-primary">Moves the Number</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {factors.map((f, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
                  <span className="text-2xl leading-none mb-4 block">{f.icon}</span>
                  <h3 className="text-sm font-black text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Staged procedures */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <div className="bg-primary/5 border border-primary/10 rounded-[2rem] p-8 md:p-10 text-center">
              <span className="text-2xl block mb-4">🔁</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
                Will You Need More Than One Procedure?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Larger stones, multiple stones, or stones in a difficult location can sometimes need a{" "}
                <strong className="text-slate-900">staged approach</strong> — more than one sitting — which adds to
                the total. This clearly depends on your specific stone size, number and location, and isn&apos;t
                something a general cost page can predict for you. Dr. Deepanshu Gupta tells you upfront, after
                reviewing your CT or USG scan, whether your case is likely to need staging.
              </p>
            </div>
          </div>
        </section>

        {/* What's in your cost */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">Cost Breakdown</span>
              <h2 className="text-2xl sm:text-4xl font-black text-foreground">What&apos;s <span className="text-primary">In Your Cost</span></h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-5 pb-3 border-b border-slate-100">Included Every Time</h3>
                <div className="space-y-4">
                  {included.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-5 pb-3 border-b border-slate-100">Can Add Extra</h3>
                <div className="space-y-4">
                  {canAdd.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <PlusIcon />
                      <span className="text-sm font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-primary/5 border border-primary/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4 text-left">
                <span className="text-2xl shrink-0">🛡️</span>
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-1">Cashless Insurance Support</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    Kidney stone surgery is generally covered when medically indicated — but coverage terms differ
                    policy to policy. Cure Stone&apos;s team checks your specific policy and handles documentation
                    and insurer approvals before your admission date.
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

        {/* By procedure */}
        <section id="by-procedure" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">Pick Your Procedure</span>
              <h2 className="text-2xl sm:text-4xl font-black text-foreground">Cost by <span className="text-primary">Procedure</span></h2>
              <p className="text-slate-500 font-medium mt-4 max-w-xl mx-auto text-sm sm:text-base">
                Starting price at Cure Stone Hospital, Gurgaon.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {procedureLinks.map((p) => (
                <div key={p.name} className="group bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 hover:border-primary/30 hover:shadow-lg transition-all">
                  <h3 className="text-lg font-black text-slate-900 mb-1">{p.name}</h3>
                  <p className="text-sm text-slate-500 font-medium mb-5">{p.desc}</p>
                  <div className="flex items-baseline gap-1.5 pb-5 mb-5 border-b border-slate-200">
                    <span className="text-xl font-black text-primary">{p.min}</span>
                    <span className="text-xs font-bold text-slate-400">– {p.max}</span>
                  </div>
                  <div className="space-y-2">
                    <Link href={p.href} className="flex items-center justify-between text-primary font-black text-xs uppercase tracking-widest hover:gap-1 transition-all">
                      National cost range <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                    <Link href={p.gurgaonHref} className="flex items-center justify-between text-primary font-black text-xs uppercase tracking-widest hover:gap-1 transition-all">
                      Gurgaon cost <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              ))}
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
              <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Who Confirms Your Cost</p>
              <h3 className="text-xl font-black text-slate-900 mb-1">Dr. Deepanshu Gupta</h3>
              <p className="text-sm text-slate-500 font-medium mb-3">MBBS · MS (PGIMS) · MCh Urology (Rank 1) — personally reviews every CT or USG scan before confirming a cost estimate.</p>
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
              Cost <span className="text-primary italic">FAQs</span>
            </h2>
            <FaqAccordion items={faqCategory.items} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Get Your Exact Cost</h2>
            <p className="text-white/70 font-medium mb-10 text-base md:text-lg">
              Book a consultation. Dr. Deepanshu Gupta reviews your scan and gives you a case-specific estimate
              — not a generic range.
            </p>
            <GetEstimateModalButton
              label="Book Consultation →"
              className="inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-white text-primary font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-base md:text-lg whitespace-nowrap"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
