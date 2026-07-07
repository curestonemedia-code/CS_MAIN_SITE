import os

locations = []

template = """import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import DoctorProfile from "@/components/home/DoctorProfile";
import GlobalReach from "@/components/home/GlobalReach";
import LocationLeadForm from "@/components/home/LocationLeadForm";

export const metadata: Metadata = {
  title: "Kidney Stone Surgery Cost in {{LOCATION}} | Cure Stone",
  description: "Advanced laser treatment starting from ₹58,000. Experience USFDA approved technology with {{LOCATION}}'s top-tier urologists.",
  alternates: {
    canonical: "https://curestone.in/{{LOCATION_LOWER}}",
  },
  openGraph: {
    title: "Kidney Stone Surgery Cost in {{LOCATION}} | Cure Stone",
    description: "Advanced laser treatment starting from ₹58,000. Experience USFDA approved technology with {{LOCATION}}'s top-tier urologists.",
    url: "https://curestone.in/{{LOCATION_LOWER}}",
    siteName: "Cure Stone",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Kidney Stone Surgery Cost in {{LOCATION}} | Cure Stone" }],
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
      item: "https://curestone.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Kidney Stone Surgery {{LOCATION}}",
      item: "https://curestone.in/{{LOCATION_LOWER}}",
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Cure Stone – Kidney Stone Surgery {{LOCATION}}",
  description: "Advanced RIRS laser kidney stone surgery serving patients from {{LOCATION}}. No cuts, 98% success rate.",
  url: "https://curestone.in/{{LOCATION_LOWER}}",
  telephone: "+91-88002-63884",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gurgaon",
    addressRegion: "Haryana",
    postalCode: "122003",
    addressCountry: "IN",
  },
  areaServed: "{{LOCATION}}",
  medicalSpecialty: "Urology",
};

export default function {{LOCATION_COMPONENT}}SurgeryPage() {
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
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-[1.0]"
              src="/Edit.mp4"
            />
            {/* Gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50/90 via-slate-50/70 to-transparent"></div>
          </div>
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="material-symbols-outlined text-sm">location_on</span> {{LOCATION}} Clinical Excellence
              </div>
              <h1 className="font-sans text-5xl lg:text-7xl font-extrabold text-blue-900 leading-tight tracking-tighter mb-8">
                Kidney Stone Surgery <br />Cost in <span className="text-amber-600">{{LOCATION}}</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mb-12">
                Advanced laser treatment starting from <span className="text-blue-900 font-bold text-3xl block lg:inline mt-2 lg:mt-0">₹58,000</span>. Experience USFDA approved technology with {{LOCATION}}'s top-tier urologists.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-blue-900 font-bold text-2xl">9000+</span>
                  <span className="text-sm text-slate-600 font-medium">Successful Surgeries</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-blue-900 font-bold text-2xl">4.9/5</span>
                  <span className="text-sm text-slate-600 font-medium">Patient Satisfaction</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-blue-900 font-bold text-2xl">Cashless</span>
                  <span className="text-sm text-slate-600 font-medium">Insurance Support</span>
                </div>
              </div>
            </div>

            {/* Lead Gen Card */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 lg:p-10 rounded-[2rem] ambient-shadow border border-slate-200">
                <h3 className="font-sans text-2xl font-bold text-blue-900 mb-2">Get Free Estimate</h3>
                <p className="text-slate-600 text-sm mb-8">Personalized cost breakdown for {{LOCATION}} residents</p>
                <LocationLeadForm locationName="{{LOCATION}}" />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section - Why Choose Cure Stone */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-sans text-4xl lg:text-5xl font-bold text-blue-900 tracking-tight mb-6">Why Choose <span className="text-amber-600">Cure Stone</span> in {{LOCATION}}?</h2>
                <p className="text-lg text-slate-600">We redefine kidney stone care by combining clinical precision with a sanctuary-like patient experience.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-10 rounded-[2.5rem] flex flex-col gap-6 group hover:bg-slate-100 transition-colors duration-500">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-600 text-3xl">medical_services</span>
                </div>
                <h4 className="font-sans text-2xl font-bold text-blue-900">Advanced Laser Tech</h4>
                <p className="text-slate-600 leading-relaxed">Painless, stitchless, and bloodless procedures using state-of-the-art Holmium Laser technology for 100% stone clearance.</p>
              </div>
              <div className="bg-slate-50 p-10 rounded-[2.5rem] flex flex-col gap-6 group hover:bg-slate-100 transition-colors duration-500">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-600 text-3xl">schedule</span>
                </div>
                <h4 className="font-sans text-2xl font-bold text-blue-900">24-Hour Recovery</h4>
                <p className="text-slate-600 leading-relaxed">Our daycare procedures allow most patients to return home within 24 hours of surgery, minimizing hospital stay.</p>
              </div>
              <div className="bg-slate-50 p-10 rounded-[2.5rem] flex flex-col gap-6 group hover:bg-slate-100 transition-colors duration-500">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-600 text-3xl">shield_with_heart</span>
                </div>
                <h4 className="font-sans text-2xl font-bold text-blue-900">Insurance Managed</h4>
                <p className="text-slate-600 leading-relaxed">Our dedicated team handles all insurance documentation and approvals, offering a seamless cashless experience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Doctors Section */}
        <DoctorProfile />

        {/* Global Reach Component */}
        <GlobalReach />

        {/* CTA Section */}
        <section className="py-20 max-w-7xl mx-auto px-8">
          <div className="editorial-gradient rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-sans text-4xl lg:text-6xl font-extrabold text-white mb-8 tracking-tighter">Ready to be Stone-Free?</h2>
              <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-12 opacity-90">Join 9000+ happy patients in {{LOCATION}}. Book your first clinical consultation with our experts today.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="bg-amber-500 text-white px-12 py-5 rounded-full font-sans font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300">
                  Book Free Appointment
                </button>
                <a className="text-white flex items-center gap-2 font-sans font-bold text-lg" href="tel:+919876543210">
                  <span className="material-symbols-outlined">call</span> Call +91 98765 43210
                </a>
              </div>
            </div>
            {/* Abstract Design Elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
"""

base_dir = "/Users/yash/Documents/Developer/Cure-Stone-Landing-Page/curestone/src/app"

for location in locations:
    location_lower = location.lower().replace(" ", "-")
    location_component = location.replace(" ", "")
    
    dir_path = os.path.join(base_dir, location_lower)
    os.makedirs(dir_path, exist_ok=True)
    
    file_path = os.path.join(dir_path, "page.tsx")
    
    content = template.replace("{{LOCATION}}", location)
    content = content.replace("{{LOCATION_LOWER}}", location_lower)
    content = content.replace("{{LOCATION_COMPONENT}}", location_component)
    
    with open(file_path, "w") as f:
        f.write(content)
    
    print(f"Created page for {location} at {file_path}")
