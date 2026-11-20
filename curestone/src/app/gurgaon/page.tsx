import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LocationLeadForm from "@/components/home/LocationLeadForm";

const address = "Cure Stone Hospital, Sector 52, Near Plot 3, Road No. D-13 A, Ardee City, Gurugram, Haryana 122003";
const phone = "+91 88002 63884";

export const metadata: Metadata = {
  title: "Kidney Stone Treatment & Surgery in Gurgaon | Cure Stone",
  description: "Meet Dr. Deepanshu Gupta at Cure Stone Hospital, Sector 52, Gurgaon. Discuss RIRS, URSL, Mini-PCNL or ESWL after scan review. Call +91 88002 63884.",
  alternates: { canonical: "https://thecurestone.com/gurgaon" },
  openGraph: {
    title: "Kidney Stone Treatment & Surgery in Gurgaon | Cure Stone",
    description: "Scan-based kidney stone care at Cure Stone Hospital, Sector 52, Gurgaon.",
    url: "https://thecurestone.com/gurgaon",
    siteName: "Cure Stone",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/assets/doctor.png", width: 753, height: 807, alt: "Dr. Deepanshu Gupta at Cure Stone" }],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
      { "@type": "ListItem", position: 2, name: "Kidney stone treatment in Gurgaon", item: "https://thecurestone.com/gurgaon" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Cure Stone Hospital",
    description: "Kidney stone consultation and treatment at Cure Stone Hospital in Sector 52, Gurgaon.",
    url: "https://thecurestone.com/gurgaon",
    telephone: "+918800263884",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Plot 3, Road No. D-13 A, Ardee City, Sector 52",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122003",
      addressCountry: "IN",
    },
    areaServed: "Gurugram",
    medicalSpecialty: "Urology",
  },
];

const treatments = [
  { name: "RIRS", detail: "A flexible scope reaches selected stones inside the kidney; a laser breaks them into smaller pieces.", href: "/rirs-in-gurgaon" },
  { name: "URSL", detail: "A scope reaches a stone in the ureter. The urologist may use a laser and remove fragments.", href: "/ursl-in-gurgaon" },
  { name: "Mini-PCNL", detail: "A small access tract through the back can help remove larger or more complex kidney stones.", href: "/mini-pcnl-in-gurgaon" },
  { name: "ESWL", detail: "Shock waves from outside the body may suit certain kidney stones, depending on size, location and density.", href: "/eswl-in-gurgaon" },
];

export default function GurgaonPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      {structuredData.map((data) => (
        <script key={data["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
      ))}
      <Navbar />
      <main className="flex-grow pt-20">
        <section className="relative isolate overflow-hidden bg-blue-950 py-8 text-white lg:flex lg:min-h-[calc(100svh-5rem)] lg:items-center">
          <Image
            src="/assets/gurgaon-care-hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%]"
            style={{ transform: "scale(1.08) translateX(4%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(4, 18, 45, 0.78) 0%, rgba(4, 18, 45, 0.22) 53%, rgba(4, 18, 45, 0.5) 100%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto grid w-full max-w-[1600px] gap-10 px-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:px-10">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-amber-300">Cure Stone Hospital · Sector 52, Gurgaon</p>
              <h1 className="max-w-[34rem] text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]">Kidney stone treatment and surgery in Gurgaon</h1>
              <p className="mt-6 max-w-[31rem] text-lg leading-relaxed text-blue-100">Bring your ultrasound or CT report to discuss your stone&apos;s size, position and symptoms with a urologist. Dr. Deepanshu Gupta can explain whether observation, medicine or a procedure is appropriate for your case.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/book" className="rounded-full bg-amber-400 px-7 py-4 font-bold text-blue-950 hover:bg-amber-300">Book an appointment</Link>
                <a href="tel:+918800263884" className="rounded-full border border-white px-7 py-4 font-bold text-white hover:bg-white/10">Call {phone}</a>
              </div>
              <p className="mt-6 max-w-[32rem] text-sm text-blue-100">Appointments: 10 AM–7 PM, by appointment · {address}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 text-slate-900 shadow-2xl lg:max-h-[calc(100svh-9rem)] lg:overflow-y-auto">
              <h2 className="text-2xl font-bold text-blue-950">Request a Gurgaon consultation</h2>
              <p className="mb-3 mt-2 text-sm text-slate-600">Our team will contact you to discuss an appointment. Bring your latest scan or report.</p>
              <LocationLeadForm formType="book_appointment" submitLabel="Request appointment" compact />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Your urologist</p>
              <h2 className="mt-3 text-3xl font-bold text-blue-950">Dr. Deepanshu Gupta</h2>
              <p className="mt-4 leading-relaxed text-slate-600">MBBS, MS, MCh Urology · DMC registration 70308. Dr. Gupta evaluates kidney and ureter stones and discusses treatment based on imaging and clinical findings.</p>
              <Link href="/dr-deepanshu-gupta" className="mt-5 inline-block font-bold text-blue-800 underline underline-offset-4">View doctor profile</Link>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-blue-950">Treatment options at our Gurgaon hospital</h2>
              <p className="mt-4 text-slate-600">The choice depends on where the stone is, its size and density, infection or obstruction, and your preferences. A procedure is not required for every stone.</p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {treatments.map((treatment) => (
                  <div key={treatment.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="text-xl font-bold text-blue-950">{treatment.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{treatment.detail}</p>
                    <Link href={treatment.href} className="mt-4 inline-block font-semibold text-blue-800 underline underline-offset-4">Explore {treatment.name} in Gurgaon</Link>
                  </div>
                ))}
              </div>
              <Link href="/specialties/kidney-stone-treatment" className="mt-6 inline-block text-sm font-semibold text-blue-800 underline underline-offset-4">Compare kidney stone treatment choices</Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-10">
            <div>
              <h2 className="text-3xl font-bold text-blue-950">Visit Cure Stone Hospital</h2>
              <p className="mt-4 text-slate-700">{address}</p>
              <p className="mt-3 text-slate-700">Call {phone} to confirm your appointment and ask what records to bring. Appointments are available from 10 AM to 7 PM by appointment.</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/book" className="rounded-full bg-blue-900 px-6 py-3 font-bold text-white hover:bg-blue-800">Book a visit</Link>
                <a href="https://www.google.com/maps/search/?api=1&query=Cure+Stone+Hospital+Sector+52+Gurugram" target="_blank" rel="noopener noreferrer" className="rounded-full border border-blue-900 px-6 py-3 font-bold text-blue-900 hover:bg-blue-50">Get directions</a>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <h2 className="text-2xl font-bold text-blue-950">Hear from a patient</h2>
              <p className="mt-3 leading-relaxed text-slate-600">Watch Mukesh describe his experience after treatment for a 10 mm kidney stone in a video on Cure Stone&apos;s YouTube channel. A patient story does not predict another person&apos;s outcome.</p>
              <a href="https://www.youtube.com/watch?v=cQMDYm__gHM&t=359s" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block font-bold text-blue-800 underline underline-offset-4">Watch Mukesh&apos;s patient story</a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10">
          <h2 className="text-3xl font-bold text-blue-950">Ready to discuss your scan?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Book a consultation for a clear diagnosis and a treatment plan suited to your stone.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link href="/book" className="rounded-full bg-blue-900 px-7 py-4 font-bold text-white hover:bg-blue-800">Book an appointment</Link>
            <a href="tel:+918800263884" className="rounded-full border border-blue-900 px-7 py-4 font-bold text-blue-900 hover:bg-blue-50">Call {phone}</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
