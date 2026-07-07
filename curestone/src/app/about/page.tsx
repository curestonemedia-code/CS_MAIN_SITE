import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Building2, MapPin, ShieldCheck, Stethoscope } from "lucide-react";

const TITLE = "About Cure Stone Hospital | Kidney Stone Care in Gurgaon";
const DESCRIPTION =
  "Learn about Cure Stone Hospital in Sector 52, Gurgaon, focused on kidney stone treatment, RIRS, PCNL, URSL, ESWL, and urology care.";
const URL = "https://thecurestone.com/about";

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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
    { "@type": "ListItem", position: 2, name: "About", item: URL },
  ],
};

const carePoints = [
  {
    icon: Stethoscope,
    title: "Focused Urology Care",
    text: "Consultation and treatment planning for kidney stones, urinary symptoms, and related urology concerns.",
  },
  {
    icon: ShieldCheck,
    title: "Minimally Invasive Options",
    text: "RIRS, Mini PCNL, URSL, and ESWL options are discussed based on scan findings and clinical suitability.",
  },
  {
    icon: MapPin,
    title: "Sector 52, Gurgaon",
    text: "Cure Stone Hospital, Sector 52, Near Plot 3, Road No D-13 A, Ardee City, Gurugram, Haryana 122003",
  },
];

const milestones = [
  "Scan-based treatment planning",
  "Laser stone treatment options",
  "Radiation-aware surgical approach where suitable",
  "Online and in-clinic consultations",
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />

      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,92,230,0.38),transparent_36%),linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)]" />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-blue-100">
                About Cure Stone
              </p>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
                Kidney Stone Care in Sector 52, Gurgaon
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-blue-100">
                Cure Stone Hospital provides focused urology consultations and kidney stone
                treatment planning with RIRS, PCNL, URSL, and ESWL options selected by clinical evaluation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/book" className="rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950">
                  Book Consultation
                </Link>
                <Link href="/contact" className="rounded-2xl border border-white/20 px-6 py-4 text-sm font-black text-white">
                  Contact Hospital
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl">
              <div className="flex min-h-[420px] flex-col justify-between p-8 sm:p-10">
                <div>
                  <p className="text-xs font-black tracking-[0.25em] text-primary">
                    Cure Stone
                  </p>
                  <div className="mt-10 flex justify-center">
                    <div className="relative h-48 w-48 sm:h-64 sm:w-64">
                      <Image
                        src="/Curestone wm.png"
                        alt="Cure Stone Hospital logo"
                        fill
                        priority
                        sizes="(min-width: 640px) 256px, 192px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                      Focus
                    </p>
                    <p className="mt-2 text-sm font-black leading-6 text-slate-950">
                      Kidney stone care, RIRS, PCNL, URSL, and ESWL
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                      Location
                    </p>
                    <p className="mt-2 text-sm font-black leading-6 text-slate-950">
                      Sector 52, Gurgaon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative bg-slate-950 p-8 text-white lg:p-10">
              <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
              <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-200">
                Care Model
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight lg:text-5xl">
                Clear decisions, not generic treatment packages.
              </h2>
              <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/65">
                Cure Stone keeps the first conversation practical: where the stone is,
                what symptoms are present, which reports are available, and what
                treatment path is clinically sensible.
              </p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/35">
                  Hospital Base
                </p>
                <p className="mt-2 text-base font-bold leading-7 text-white/90">
                  Sector 52, Gurgaon, with online and in-clinic consultation support.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-200">
              {carePoints.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="grid gap-5 p-7 transition-colors hover:bg-slate-50 sm:grid-cols-[88px_1fr] lg:p-8">
                    <div className="flex items-start gap-3 sm:block">
                      <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300">
                        0{index + 1}
                      </div>
                      <div className="mt-0 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:mt-5">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight text-slate-950">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-primary">Our Approach</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
                Treatment planning starts with the scan, symptoms, and patient profile.
              </h2>
              <p className="mt-5 text-base font-medium leading-8 text-slate-600">
                Every kidney stone case is different. Our team reviews stone size, location,
                anatomy, infection risk, kidney function, previous procedures, and patient
                preference before discussing treatment options.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Building2 className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-black text-slate-900">What Patients Can Expect</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {milestones.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm font-black text-slate-800">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/dr-deepanshu-gupta" className="inline-flex items-center gap-2 text-sm font-black text-primary">
                  Meet Dr. Deepanshu Gupta <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-black text-slate-600 hover:text-primary">
                  Read patient education blogs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="grid items-center gap-10 rounded-[2rem] bg-slate-950 p-8 text-white lg:grid-cols-[1fr_0.8fr] lg:p-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-200">
                Visit Us
              </p>
              <h2 className="mt-3 text-3xl font-black">Cure Stone Hospital, Gurgaon</h2>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/60">
                Sector 52, Near Plot 3, Road No D-13 A, Ardee City, Gurugram, Haryana 122003.
                For appointments, scan review, and directions, contact our care team.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950">
                Contact
              </Link>
              <a href="tel:+918800263884" className="rounded-xl bg-primary px-5 py-3 text-sm font-black text-white">
                Call Now
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
