import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQ_CATEGORIES } from "@/constants/faqs";

const faqCategory = FAQ_CATEGORIES.find((category) => category.slug === "eswl")!;

const TITLE = "ESWL Lithotripsy — Kidney Stone Treatment";
const DESCRIPTION = "ESWL uses shock waves to break kidney stones without surgery. Learn about candidacy, procedure and recovery at Cure Stone Hospital in Sector 52, Gurgaon.";
const URL = "https://thecurestone.com/eswl";

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
  name: "ESWL — Extracorporeal Shock Wave Lithotripsy",
  procedureType: "http://schema.org/NoninvasiveProcedure",
  description: DESCRIPTION,
  howPerformed:
    "A lithotripter machine directs high-energy shock waves through the skin to the stone under ultrasound or fluoroscopy guidance, fragmenting it into pieces small enough to pass in urine.",
  preparation: "Suitable for stones smaller than 10mm in the kidney or upper/middle ureter, confirmed by CT KUB imaging.",
  followup: "Most patients resume light activities within 24–48 hours; multiple sessions may be required for larger stones.",
  bodyLocation: "Kidney, Ureter",
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
    { "@type": "ListItem", position: 3, name: "ESWL Lithotripsy", item: URL },
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

const facts = [
  { icon: "💥", title: "Non-Invasive", desc: "No incisions, no anaesthesia required for most patients." },
  { icon: "⏱", title: "45–60 Min", desc: "Typical session lasts under an hour. Outpatient procedure." },
  { icon: "🚶", title: "Walk Out within 24 Hours", desc: "Resume light activities within 24–48 hours." },
  { icon: "🔄", title: "Repeat Sessions", desc: "Multiple sessions may be needed for larger stones." },
];

// Real video from the Cure Stone YouTube channel embedded on this page.
// uploadDate/duration pulled from the video's own YouTube watch page metadata.
const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "ESWL Procedure Video",
  description: "Dr. Deepanshu Gupta explains the benefits and drawbacks of ESWL (shock wave lithotripsy) for kidney stone treatment at Cure Stone Hospital, Gurgaon.",
  thumbnailUrl: ["https://img.youtube.com/vi/tNx0HcofMgc/maxresdefault.jpg"],
  uploadDate: "2024-05-04T07:00:07-07:00",
  duration: "PT6M6S",
  embedUrl: "https://www.youtube.com/embed/tNx0HcofMgc",
  contentUrl: "https://www.youtube.com/watch?v=tNx0HcofMgc",
  publisher: {
    "@type": "Organization",
    name: "Cure Stone",
    "@id": "https://thecurestone.com/#organization",
  },
};

export default function ESWLPage() {
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
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(43,92,230,0.1),transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">Non-Invasive Treatment</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] md:leading-[1.05] mb-6">
                ESWL <span className="text-primary italic">Lithotripsy</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mb-10">
                Extracorporeal Shock Wave Lithotripsy — shock waves delivered from outside the body to shatter kidney stones without any cuts or surgery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book" className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark hover:scale-105 transition-all text-center">
                  Book ESWL Consultation →
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
                src="https://www.youtube.com/embed/tNx0HcofMgc"
                title="ESWL Procedure Video"
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

      <div className="bg-primary/5 border-y border-primary/10 py-8">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((f, i) => (
            <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-border/50 shadow-sm">
              <span className="text-2xl">{f.icon}</span>
              <div><p className="font-black text-sm text-slate-900">{f.title}</p><p className="text-xs text-slate-500 font-medium mt-0.5">{f.desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      <main className="flex-grow bg-background py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-4xl font-black text-foreground mb-6">How <span className="text-primary">ESWL Works</span></h2>
              <p className="text-lg text-text-mid font-medium leading-relaxed mb-5">A lithotripter machine directs high-energy shock waves through the skin to the exact location of the stone. These waves cause the stone to vibrate and eventually fragment into small pieces that pass through urine.</p>
              <p className="text-lg text-text-mid font-medium leading-relaxed mb-8">Imaging guidance (ultrasound or fluoroscopy) is used to precisely target the stone without any incisions.</p>
              <div className="space-y-3">
                {["Best for stones smaller than 10mm", "Upper and middle ureter stones", "Stones in the renal pelvis", "Patients who cannot undergo surgery"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white border border-border/30 rounded-2xl shadow-sm">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8">
                <h3 className="font-black text-amber-900 text-lg mb-4">⚠️ When ESWL Might Not Work</h3>
                <ul className="space-y-3 text-sm text-amber-800 font-medium">
                  {["Stones larger than 10–15mm", "Hard stones (calcium oxalate monohydrate)", "Lower pole kidney stones", "Stones close to blood vessels or aorta", "Pregnancy (absolute contraindication)"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="shrink-0 mt-0.5">•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-border/50 rounded-3xl p-8 shadow-sm">
                <h3 className="font-black text-slate-900 text-lg mb-4">ESWL vs RIRS — Which Is Better for You?</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">RIRS is generally preferred for stones above 10mm or failed ESWL. However, ESWL requires no anaesthesia and is ideal for smaller stones in certain positions.</p>
                <Link href="/checker" className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest hover:gap-3 transition-all">
                  Use Our Symptom Checker <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
              ESWL <span className="text-primary italic">FAQs</span>
            </h2>
            <FaqAccordion items={faqCategory.items} />
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(43,92,230,0.05),transparent)]" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4">Is ESWL Right for Your Stone?</h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium mb-8 max-w-lg mx-auto">Dr. Deepanshu Gupta will review your CT KUB and determine the best treatment — ESWL, RIRS or PCNL — for your specific case.</p>
              <Link href="/book" className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark hover:scale-105 transition-all text-center">
                Get Expert Opinion →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
