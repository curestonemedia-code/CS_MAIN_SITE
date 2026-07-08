import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SERVICES } from "@/constants/services";
import Link from "next/link";
import type { Metadata } from "next";

const TITLE = "Our Specialties | Kidney Stone, Urology & Gallbladder Care";
const DESCRIPTION =
  "Explore Cure Stone's medical specialties in Sector 52, Gurgaon — kidney stone treatment (RIRS, ESWL, URSL, PCNL), urology & andrology, and gallbladder stone surgery.";
const URL = "https://thecurestone.com/specialties";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://thecurestone.com/specialties/${service.slug}`,
    name: service.name,
  })),
};

const PROCEDURES = [
  {
    icon: "🔬",
    name: "RIRS",
    href: "/rirs",
    desc: "Retrograde Intra-Renal Surgery — scope-based laser treatment for selected kidney stones via natural pathways.",
  },
  {
    icon: "🩺",
    name: "URSL",
    href: "/ursl",
    desc: "Ureteroscopy with laser fragmentation for selected ureteric stones, using a rigid or semi-rigid scope.",
  },
  {
    icon: "🔎",
    name: "Mini PCNL",
    href: "/mini-pcnl",
    desc: "Minimally invasive keyhole surgery for large or complex kidney stones through a small tract.",
  },
  {
    icon: "💥",
    name: "ESWL",
    href: "/eswl",
    desc: "Extracorporeal Shock Wave Lithotripsy — non-invasive shock waves break stones without any incision.",
  },
];

export default function SpecialtiesPage() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-grow bg-white">
        {/* Hero */}
        <section className="relative pt-24 pb-16 md:pt-40 md:pb-24 bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(43,92,230,0.1),transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
            <span className="inline-block px-3 py-1 mb-6 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">
              Centers of Excellence
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
              Our <span className="text-primary italic">Specialties</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-slate-600 font-medium leading-relaxed">
              Specialised, evidence-based care across kidney stones, urology &
              andrology, and gallbladder disease — delivered by an expert team
              under one roof in Sector 52, Gurgaon.
            </p>
          </div>
        </section>

        {/* Specialties Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/specialties/${service.slug}`}
                  className="group flex flex-col p-6 sm:p-10 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 no-underline"
                >
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-primary transition-all duration-500 group-hover:text-white">
                    {service.icon}
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mb-4">
                    {service.name}
                  </h2>
                  <p className="text-slate-600 font-medium leading-relaxed mb-8 grow">
                    {service.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.treatments.slice(0, 3).map((treatment) => (
                      <span
                        key={treatment}
                        className="px-3 py-1 text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-full"
                      >
                        {treatment}
                      </span>
                    ))}
                  </div>

                  <span className="text-primary font-black text-sm uppercase tracking-widest group-hover:tracking-[0.2em] transition-all flex items-center gap-2 mt-auto">
                    Explore Excellence{" "}
                    <span className="group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Procedures & Techniques */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">
                Procedures & Techniques
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
                Advanced <span className="text-primary italic">Treatment Options</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {PROCEDURES.map((procedure) => (
                <Link
                  key={procedure.href}
                  href={procedure.href}
                  className="group flex flex-col p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 no-underline"
                >
                  <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-500 group-hover:text-white">
                    {procedure.icon}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3">{procedure.name}</h3>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6 grow">
                    {procedure.desc}
                  </p>
                  <span className="text-primary font-black text-xs uppercase tracking-widest group-hover:tracking-[0.15em] transition-all flex items-center gap-2 mt-auto">
                    Learn More <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary text-center px-4">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Not Sure Which Specialty You Need?
          </h2>
          <p className="max-w-xl mx-auto text-blue-100 font-medium mb-8">
            Use our free AI symptom checker or book a consultation and our team
            will guide you to the right specialist.
          </p>
          <div className="flex xs:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-4 bg-white text-primary font-black rounded-xl text-lg hover:scale-105 transition-all no-underline"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/checker"
              className="px-8 py-4 bg-primary-dark border border-white/20 text-white font-black rounded-xl text-lg hover:scale-105 transition-all no-underline"
            >
              Check My Symptoms
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
