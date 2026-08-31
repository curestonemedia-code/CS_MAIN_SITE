import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQ_CATEGORIES } from "@/constants/faqs";

const faqCategory = FAQ_CATEGORIES.find((category) => category.slug === "pcnl")!;

const TITLE = "Mini PCNL Kidney Stone Surgery, Gurgaon";
const DESCRIPTION = "Mini PCNL is a minimally invasive kidney stone surgery option for selected large or complex stones. Consult Cure Stone Hospital in Gurgaon for case-based guidance.";
const URL = "https://thecurestone.com/mini-pcnl";

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
  name: "Mini PCNL — Percutaneous Nephrolithotomy",
  procedureType: "http://schema.org/PercutaneousProcedure",
  description: DESCRIPTION,
  howPerformed:
    "A small (~1cm) keyhole incision is made on the back to create a direct tract into the kidney, through which a telescope and laser or lithotripter fragment and remove large or staghorn stones.",
  preparation: "Suitable for large or complex kidney stones (20mm and above), confirmed by CT KUB imaging.",
  followup: "A short hospital stay of 1 to 2 days is typically required before discharge.",
  bodyLocation: "Kidney",
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
    { "@type": "ListItem", position: 3, name: "Mini PCNL", item: URL },
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

const steps = [
  { num: "01", title: "Anaesthesia & Vitals", desc: "General or spinal anaesthesia is given so you remain comfortable. Vitals are checked before starting." },
  { num: "02", title: "Small Incision", desc: "A tiny 'keyhole' incision (about 1 cm) is made on the back to access the kidney directly." },
  { num: "03", title: "Tract Creation", desc: "A narrow path (tract) is created and a sheath is placed to reach the stone directly." },
  { num: "04", title: "Stone Fragmentation", desc: "A small telescope and a laser or lithotripter break the large or staghorn stone into pieces." },
  { num: "05", title: "Stone Removal", desc: "The fragmented stone pieces are removed through the tube, ensuring high clearance in one session." },
  { num: "06", title: "Recovery", desc: "A short hospital stay of 1 to 2 days is typically required before discharge." },
];

const tableData = [
  { feature: "Stone Size", pcnl: "20mm+ (Staghorn)", rirs: "Up to 20mm", eswl: "Up to 10mm" },
  { feature: "Outcome Factors", pcnl: "Large or complex stones", rirs: "Selected smaller stones", eswl: "Selected small stones" },
  { feature: "Incisions", pcnl: "Small keyhole (~1cm)", rirs: "None", eswl: "None" },
  { feature: "Recovery", pcnl: "3–5 days", rirs: "1–2 days", eswl: "2–3 days" },
  { feature: "Anaesthesia", pcnl: "General / Spinal", rirs: "Spinal", eswl: "None" },
];

// Real video from the Cure Stone YouTube channel embedded on this page.
// uploadDate/duration pulled from the video's own YouTube watch page metadata.
const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Mini PCNL Procedure Video",
  description: "Dr. Deepanshu Gupta explains what PCNL (Percutaneous Nephrolithotomy) is and how it's used to treat larger kidney stones at Cure Stone Hospital, Gurgaon.",
  thumbnailUrl: ["https://img.youtube.com/vi/UL6rs2nAXsU/maxresdefault.jpg"],
  uploadDate: "2022-10-29T04:30:06-07:00",
  duration: "PT3M41S",
  embedUrl: "https://www.youtube.com/embed/UL6rs2nAXsU",
  contentUrl: "https://www.youtube.com/watch?v=UL6rs2nAXsU",
  publisher: {
    "@type": "Organization",
    name: "Cure Stone",
    "@id": "https://thecurestone.com/#organization",
  },
};

export default function MiniPCNLPage() {
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(43,92,230,0.1),transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">For Large & Complex Stones</span>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] md:leading-[1.05] mb-6">
                Mini <span className="text-primary italic">PCNL</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mb-10">
                Percutaneous Nephrolithotomy may be recommended for selected large or hard kidney stones. It is a minimally invasive keyhole procedure planned after imaging review.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book" className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all text-center">
                  Book PCNL Consultation →
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
                src="https://www.youtube.com/embed/UL6rs2nAXsU?si=rBR32zX4Tn309RFP"
                title="Mini PCNL Procedure Video"
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
      <div className="bg-primary py-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[["PCNL", "Large Stone Option"], ["1-2 Days", "Typical Stay"], ["~1 cm", "Keyhole Incision"], ["9000+", "Surgeries Done"]].map(([val, lab], i) => (
            <div key={i}>
              <p className="text-3xl font-black">{val}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/70 mt-1">{lab}</p>
            </div>
          ))}
        </div>
      </div>

      <main className="flex-grow bg-background">
        {/* What Is Mini PCNL */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">What Is PCNL?</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-6">Keyhole Surgery for <span className="text-primary">Large Stones</span></h2>
                <p className="text-sm sm:text-base md:text-lg text-text-mid font-medium leading-relaxed mb-6">
                  PCNL (Percutaneous Nephrolithotomy) is a procedure used to get rid of kidney stones that are too large to pass on their own or be treated by other methods like ESWL or RIRS.
                </p>
                <p className="text-base md:text-lg text-text-mid font-medium leading-relaxed mb-8">
                  Percutaneous means through the skin. A small ~1 cm cut is made on the back, creating a direct path to the kidney. A telescope is used to locate the stone, break it up with a laser or lithotripter, and remove it. This replaces open stone surgery, with recovery depending on the case.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Case-based Stone Removal", "Minimally Invasive Keyhole", "Used for Selected Staghorn Stones", "Designed for Faster Healing vs Open Surgery"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span className="text-sm font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 md:p-8">
                <h3 className="text-xl font-black text-foreground mb-6 text-center lg:text-left">PCNL is recommended when…</h3>
                <div className="space-y-4">
                  {[
                    ["📏", "Stones > 2cm", "When kidney stones have a diameter greater than 0.8 inches (2 cm)."],
                    ["🦌", "Staghorn Stones", "Large stones obstructing multiple branches in the kidney's collecting system."],
                    ["🛑", "Blocked Ureter", "Significant stones located in the upper tube that connects the kidney to the bladder."],
                    ["🔁", "Failed Treatments", "When other treatments like ESWL,RIRS have been tried and didn’t work out."],
                    ["🪨", "Very Hard Stones", "When the stone density is too high for soundwave therapy."],
                  ].map(([icon, title, desc], i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-border/30 shadow-sm">
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

        {/* Procedure Steps */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">The Procedure</span>
              <h2 className="text-3xl md:text-5xl font-black text-foreground">Step-by-Step: What Happens <span className="text-primary">During PCNL</span></h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="bg-white border border-border/30 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group">
                  <span className="text-4xl md:text-5xl font-black text-primary/20 group-hover:text-primary/40 transition-colors">{step.num}</span>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 mt-4 mb-2">{step.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground">Mini PCNL vs <span className="text-primary">Alternatives</span></h2>
              <p className="text-slate-500 font-medium mt-4 max-w-xl mx-auto text-sm sm:text-base">Compare PCNL to other treatments for understanding suitable approaches for large stones.</p>
            </div>
            <div className="relative rounded-[2rem] border border-slate-200 bg-white shadow-2xl overflow-hidden">
              <div className="overflow-x-auto scrollbar-none sm:scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <table className="w-full text-left border-collapse min-w-[600px] lg:min-w-0">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="p-4 sm:p-6 text-[10px] font-black uppercase tracking-widest border-b border-white/10">Feature</th>
                      <th className="p-4 sm:p-6 text-[10px] font-black uppercase tracking-widest text-primary border-b border-white/10">🏆 PCNL</th>
                      <th className="p-4 sm:p-6 text-[10px] font-black uppercase tracking-widest border-b border-white/10">RIRS</th>
                      <th className="p-4 sm:p-6 text-[10px] font-black uppercase tracking-widest border-b border-white/10">ESWL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tableData.map((row, i) => (
                      <tr key={i} className="hover:bg-primary/5 transition-colors group/row">
                        <td className="p-4 sm:p-6 text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wide border-r border-slate-100 group-hover/row:text-primary">
                          {row.feature}
                        </td>
                        <td className="p-4 sm:p-6 text-xs sm:text-sm font-black text-primary bg-primary/5 border-r border-slate-100">
                          {row.pcnl}
                        </td>
                        <td className="p-4 sm:p-6 text-xs sm:text-sm font-bold text-slate-800 border-r border-slate-100">
                          {row.rirs}
                        </td>
                        <td className="p-4 sm:p-6 text-xs sm:text-sm font-medium text-slate-600">
                          {row.eswl}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
              Mini PCNL <span className="text-primary italic">FAQs</span>
            </h2>
            <FaqAccordion items={faqCategory.items} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready to Clear Large Stones?</h2>
            <p className="text-white/70 font-medium mb-10 text-base md:text-lg">Book a free consultation with Dr. Deepanshu Gupta to see if Mini PCNL is right for you.</p>
            <Link href="/book" className="inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-white text-primary font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-base md:text-lg">
              Book Free PCNL Consultation →
            </Link>
            <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-6">+91 88002 63884 · Available 10 AM – 7 PM On Appoinment</p>
            <p className="mt-4">
              <Link href="/mini-pcnl-in-gurgaon" className="text-white/60 text-sm font-bold underline underline-offset-4 hover:text-white">
                Ready to book in Gurgaon? See Cure Stone Hospital, Sector 52 →
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
