import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import Link from "next/link";
import DoctorProfile from "@/components/home/DoctorProfile";
import GlobalReach from "@/components/home/GlobalReach";
import LocationLeadForm from "@/components/home/LocationLeadForm";

export const metadata: Metadata = {
  title: "Kidney Stone Surgery in Sector 52, Gurgaon | RIRS & Laser Treatment",
  description: "Consult a urologist doctor in Gurgaon for kidney stone treatment, RIRS surgery in Gurgaon, PCNL, ESWL and URSL care at Cure Stone Hospital, Sector 52.",
  alternates: {
    canonical: "https://thecurestone.com/sector-52",
  },
  openGraph: {
    title: "Kidney Stone Surgery in Sector 52, Gurgaon | RIRS & Laser Treatment",
    description: "Kidney stone hospital in Gurgaon offering RIRS surgery, PCNL, ESWL and URSL care at Cure Stone Hospital, Sector 52.",
    url: "https://thecurestone.com/sector-52",
    siteName: "Cure Stone",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Kidney Stone Surgery in Sector 52, Gurgaon | RIRS & Laser Treatment" }],
    locale: "en_IN",
    type: "website",
  },
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://thecurestone.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Kidney Stone Surgery Sector 52 Gurgaon",
      item: "https://thecurestone.com/sector-52",
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Cure Stone – Kidney Stone Surgery Sector 52 Gurgaon",
  description: "Kidney stone surgery, RIRS laser treatment, PCNL, ESWL and URSL care at Cure Stone Hospital in Sector 52, Gurgaon.",
  url: "https://thecurestone.com/sector-52",
  telephone: "+91-88002-63884",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gurgaon",
    addressRegion: "Haryana",
    postalCode: "122003",
    addressCountry: "IN",
  },
  areaServed: "Sector 52 Gurgaon",
  medicalSpecialty: "Urology",
};

export default function Sector52SurgeryPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{
        __html: `
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
        .editorial-gradient { background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%); }
        .ambient-shadow { box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.1); }
      `}} />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-10 py-20 lg:py-32">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-100"
              src="/Edit.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/85 to-transparent"></div>
          </div>
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="material-symbols-outlined text-sm">workspace_premium</span> Specialized Urology Clinic in Gurgaon
              </div>
              <h1 className="font-sans text-5xl lg:text-7xl font-extrabold text-blue-900 leading-tight tracking-tighter mb-8">
                Kidney Stone Surgery in <span className="text-amber-600">Sector 52, Gurgaon</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mb-12">
                Consult a urologist doctor in Gurgaon for RIRS surgery, PCNL, ESWL and URSL options. Treatment planning depends on stone size, location, symptoms and scan findings.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-blue-900 font-bold text-2xl">NABH</span>
                  <span className="text-sm text-slate-600 font-medium">Standard Hospitals</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-blue-900 font-bold text-2xl">No-Stitch</span>
                  <span className="text-sm text-slate-600 font-medium">Surgery (RIRS)</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-blue-900 font-bold text-2xl">Cashless</span>
                  <span className="text-sm text-slate-600 font-medium">TPA Assistance</span>
                </div>
              </div>
            </div>

            {/* Lead Gen Card */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 lg:p-10 rounded-[2rem] ambient-shadow border border-slate-200">
                <h3 className="font-sans text-2xl font-bold text-blue-900 mb-2">Expert Consultation</h3>
                <p className="text-slate-600 text-sm mb-8">Book an appointment with Sector 52, Gurgaon&apos;s senior urology consultants.</p>
                <LocationLeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* SEO-Rich Content Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-16">
              <h2 className="font-sans text-4xl lg:text-5xl font-bold text-blue-900 tracking-tight mb-6">Painless Kidney Stone Treatment Options in <span className="text-amber-600">Sector 52, Gurgaon</span></h2>
              <p className="text-lg text-slate-600 max-w-4xl">
                Cure Stone Hospital in Sector 52, Gurgaon offers care for renal stones, ureteric stones, and bladder stones. Treatment may include RIRS, PCNL, ESWL or URSL after clinical evaluation and imaging review.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-transparent hover:border-blue-200 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-blue-700 text-3xl">precision_manufacturing</span>
                </div>
                <h4 className="font-sans text-2xl font-bold text-blue-900 mb-4">RIRS Laser Surgery</h4>
                <p className="text-slate-600 leading-relaxed">RIRS surgery in Gurgaon uses a flexible scope and laser to treat selected kidney stones through natural urinary pathways. Recovery and discharge timing vary by case.</p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-transparent hover:border-blue-200 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-blue-700 text-3xl">personal_injury</span>
                </div>
                <h4 className="font-sans text-2xl font-bold text-blue-900 mb-4">PCNL & Mini-PERC</h4>
                <p className="text-slate-600 leading-relaxed">Specialized treatment for Large Staghorn Stones (20mm). Our Sector 52, Gurgaon urologists use ultra-miniature scopes for faster healing compared to traditional open surgery.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-transparent hover:border-blue-200 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-blue-700 text-3xl">verified</span>
                </div>
                <h4 className="font-sans text-2xl font-bold text-blue-900 mb-4">Cashless Support</h4>
                <p className="text-slate-600 leading-relaxed">We are empanelled with all major Insurance TPAs and Corporates in Gurgaon. Our team handles your pre-auth and documentation for a zero-hassle experience.</p>
              </div>
            </div>
          </div>
        </section>

        <DoctorProfile />

        <GlobalReach />

        {/* Explore by Procedure */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="font-sans text-3xl lg:text-4xl font-bold text-blue-900 tracking-tight mb-10 text-center">Explore Treatment Options in Sector 52</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "RIRS in Gurgaon", href: "/rirs-in-gurgaon" },
                { label: "Mini-PCNL in Gurgaon", href: "/mini-pcnl-in-gurgaon" },
                { label: "ESWL in Gurgaon", href: "/eswl-in-gurgaon" },
                { label: "URSL in Gurgaon", href: "/ursl-in-gurgaon" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-white border border-slate-200 rounded-2xl p-6 text-center font-sans font-bold text-blue-900 hover:border-amber-400 hover:shadow-md transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Localized CTA Section */}
        <section className="py-20 max-w-7xl mx-auto px-8">
          <div className="editorial-gradient rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-sans text-4xl lg:text-6xl font-extrabold text-white mb-8 tracking-tighter">Stone-Free Life Starts Here</h2>
              <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-12 opacity-90">
                Join thousands of patients who have successfully undergone laser lithotripsy at our Sector 52, Gurgaon clinics. Consult with a Senior Urologist today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="bg-amber-500 text-white px-12 py-5 rounded-full font-sans font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300">
                  Book Free Consultation
                </button>
                <a className="text-white flex items-center gap-2 font-sans font-bold text-lg" href="tel:+918800263884">
                  <span className="material-symbols-outlined">call</span> Sector 52, Gurgaon Helpline: +91 88002 63884
                </a>
              </div>
            </div>
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-2xl"></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
