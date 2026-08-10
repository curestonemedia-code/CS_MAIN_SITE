import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQ_CATEGORIES } from "@/constants/faqs";

const faqCategory = FAQ_CATEGORIES.find((category) => category.slug === "ursl")!;

const TITLE = "URSL Treatment in Gurgaon | Laser Surgery";
const DESCRIPTION = "URSL uses a rigid or semi-rigid scope to treat selected ureteric stones with laser. Consult Cure Stone Hospital in Gurgaon for scan-based planning.";
const URL = "https://thecurestone.com/ursl";

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
  name: "URSL — Ureteroscopic Lithotripsy",
  procedureType: "http://schema.org/PercutaneousProcedure",
  description: DESCRIPTION,
  howPerformed:
    "A rigid or semi-rigid ureteroscope is passed through natural pathways to the ureter, where high-power laser pulses fragment the stone before fragments are removed with a basket or flushed out.",
  preparation: "A CT KUB scan maps the stone's exact size and location in the mid or lower ureter beforehand.",
  followup: "Most patients are mobile within hours and discharged within 24 hours.",
  bodyLocation: "Ureter",
  provider: {
    "@type": "MedicalBusiness",
    name: "Cure Stone",
    "@id": "https://thecurestone.com/#organization",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
    { "@type": "ListItem", position: 2, name: "Specialties", item: "https://thecurestone.com/specialties" },
    { "@type": "ListItem", position: 3, name: "URSL Treatment", item: URL },
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

// Real video from the Cure Stone YouTube channel embedded on this page.
// uploadDate/duration pulled from the video's own YouTube watch page metadata.
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
  publisher: {
    "@type": "Organization",
    name: "Cure Stone",
    "@id": "https://thecurestone.com/#organization",
  },
};

const steps = [
  { num: "01", title: "Diagnostic Prep", desc: "A precise CT KUB scan is performed to map the stone's exact size and location." },
  { num: "02", title: "Anaesthesia", desc: "Patient is given spinal or general anaesthesia for comfort during the procedure." },
  { num: "03", title: "Scope Insertion", desc: "A rigid or semi-rigid ureteroscope is gently passed through natural pathways." },
  { num: "04", title: "Laser Pulsing", desc: "High-power laser energy pulses are used to fragment the stone instantly." },
  { num: "05", title: "Clearance", desc: "Small stone fragments are either removed with a basket or flushed out." },
  { num: "06", title: "Recovery", desc: "Most patients are mobile within hours and discharged within 24 Hours." },
];

const tableData = [
  { feature: "Stone Location", rirs: "Kidney / Upper Ureter", ursl: "Mid / Lower Ureter", eswl: "Kidney / Upper Ureter" },
  { feature: "Outcome Factors", rirs: "Upper tract anatomy", ursl: "Ureter stone position", eswl: "Selected small stones" },
  { feature: "Incisions", rirs: "None", ursl: "None", eswl: "None" },
  { feature: "Hospital Stay", rirs: "24 Hrs", ursl: "24 Hrs", eswl: "Outpatient" },
  { feature: "Scope Used", rirs: "Flexible", ursl: "Rigid / Semi-rigid", eswl: "No Scope" },
];

export default function URSLPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,163,74,0.1),transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">Ureteric Stone Specialist</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] md:leading-[1.05] mb-6">
                URSL <span className="text-primary italic">Treatment</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mb-10">
                Ureteroscopic Lithotripsy (URSL) is a laser treatment option for selected stones stuck in the ureter. It can help clear obstruction after clinical evaluation and imaging review.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book" className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all text-center">
                  Consult for URSL →
                </Link>
                <Link href="/checker" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-sm text-center">
                  Check My Symptoms
                </Link>
              </div>
            </div>

            <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-[0_32px_80px_-20px_rgba(43,92,230,0.3)] border-8 border-white bg-white group hover:scale-[1.02] transition-transform duration-500">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/w-0pRk1MyUM"
                title="URSL Procedure Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-primary py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[["URSL", "Ureter Stone Care"], ["24 Hrs", "Typical Stay"], ["Natural", "Urinary Pathway"], ["9000+", "Surgeries Done"]].map(([val, lab], i) => (
            <div key={i}>
              <p className="text-3xl md:text-4xl font-black tracking-tight">{val}</p>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/60 mt-2">{lab}</p>
            </div>
          ))}
        </div>
      </div>

      <main className="flex-grow bg-background">
        {/* What Is URSL */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">The Procedure</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-6">Direct Access to <span className="text-primary">Ureteric Stones</span></h2>
                <p className="text-sm sm:text-base md:text-lg text-text-mid font-medium leading-relaxed mb-6">
                  URSL is specifically optimized for stones that have moved from the kidney into the ureter. Using a slim, rigid ureteroscope, our surgeons directly reach the stone to deliver laser energy.
                </p>
                <p className="text-base md:text-lg text-text-mid font-medium leading-relaxed mb-8">
                  This procedure may be used for impacted stones that cause severe pain or blockage, with no external incision.
                </p>
                <div className="space-y-4">
                  {["Rigid & Semi-Rigid Technology", "Laser Fragmentation Precision", "Effective for Stuck Stones", "Minimal Downtime"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      <span className="text-sm font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
                <h3 className="text-xl font-black text-foreground mb-6">Who is candidate for URSL?</h3>
                <div className="space-y-4">
                  {[
                    ["📍", "Ureteric Stones", "Stones located in the lower or middle ureter."],
                    ["🩹", "Obstructive Pain", "When stones cause severe kidney swelling/pain."],
                    ["⚡", "Emergency Relief", "Urgent clearance needed for high fever or pain."],
                    ["🚫", "Failed ESWL", "Stones that did not break with shockwave therapy."],
                  ].map(([icon, title, desc], i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-hover hover:border-primary/30">
                      <span className="text-2xl shrink-0">{icon}</span>
                      <div>
                        <p className="font-black text-sm text-slate-900">{title}</p>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step by Step */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">Workflow</span>
              <h2 className="text-3xl md:text-5xl font-black text-foreground">Step-by-Step <span className="text-primary">Journey</span></h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 -mr-12 -mt-12 rounded-full group-hover:scale-110 transition-transform" />
                  <span className="text-4xl md:text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors">{step.num}</span>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 mt-4 mb-3">{step.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Treatment Comparison */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground">URSL vs <span className="text-primary">Alternatives</span></h2>
              <p className="text-slate-500 font-medium mt-4 max-w-xl mx-auto text-sm sm:text-base">Comparison of treatments specifically for ureteric stones.</p>
            </div>
            <div className="relative rounded-[2rem] border border-slate-200 bg-white shadow-2xl overflow-hidden">
              <div className="overflow-x-auto scrollbar-none sm:scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <table className="w-full text-left border-collapse min-w-[600px] lg:min-w-0">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="p-4 sm:p-6 text-[10px] font-black uppercase tracking-widest border-b border-white/10">Feature</th>
                      <th className="p-4 sm:p-6 text-[10px] font-black uppercase tracking-widest text-primary border-b border-white/10">⚡ URSL</th>
                      <th className="p-4 sm:p-6 text-[10px] font-black uppercase tracking-widest border-b border-white/10">RIRS</th>
                      <th className="p-4 sm:p-6 text-[10px] font-black uppercase tracking-widest border-b border-white/10">ESWL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tableData.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors group/row">
                        <td className="p-4 sm:p-6 text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wide border-r border-slate-100 group-hover/row:text-primary">{row.feature}</td>
                        <td className="p-4 sm:p-6 text-xs sm:text-sm font-black text-primary bg-primary/5 border-r border-slate-100">{row.ursl}</td>
                        <td className="p-4 sm:p-6 text-xs sm:text-sm font-medium text-slate-600 border-r border-slate-100">{row.rirs}</td>
                        <td className="p-4 sm:p-6 text-xs sm:text-sm font-medium text-slate-600">{row.eswl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Recovery Roadmap */}
        <section className="py-16 md:py-24 bg-foreground relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(43,92,230,0.1),transparent)]" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white">Recovery <span className="text-primary italic">Roadmap</span></h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { day: "Day 0", title: "Discharge", desc: "Return home within 24 hours feeling relieved." },
                { day: "Day 1-3", title: "Resumption", desc: "Light activity resumed with minimal discomfort." },
                { day: "Week 1", title: "Healing", desc: "Body adjusts to the temporary DJ stent." },
                { day: "Week 2", title: "Freedom", desc: "Stent removed; complete freedom from pain." },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl group hover:bg-white/10 transition-all">
                  <span className="inline-block px-3 py-1 mb-4 bg-primary text-white text-[10px] font-black uppercase rounded-lg">{item.day}</span>
                  <h4 className="text-xl font-black text-white mb-2">{item.title}</h4>
                  <p className="text-white/50 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
              URSL <span className="text-primary italic">FAQs</span>
            </h2>
            <FaqAccordion items={faqCategory.items} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="bg-green-50 border border-green-100 rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,163,74,0.05),transparent)]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-green-900 mb-6">Immediate Relief <span className="text-green-600 italic">Is Possible</span></h2>
                <p className="text-green-700 font-bold text-lg mb-10 max-w-2xl mx-auto uppercase tracking-wide">Ureteric stones are a medical urgency. Our surgical team is ready to help you resume a pain-free life.</p>
                <div className="flex flex-wrap justify-center gap-6">
                  <a href="tel:+918800263884" className="px-10 py-5 bg-green-600 text-white font-black rounded-2xl shadow-xl hover:bg-green-700 hover:scale-105 transition-all text-lg">📞 Call +91 88002 63884</a>
                  <Link href="/book" className="px-10 py-5 bg-white border-2 border-green-200 text-green-700 font-black rounded-2xl hover:bg-green-50 transition-all shadow-sm text-lg underline decoration-green-200 decoration-4 underline-offset-8">Book Priority Consult</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
