import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DietPlannerApp from "@/components/diet-planner/DietPlannerApp";
import DietPlannerSeoContent from "@/components/diet-planner/DietPlannerSeoContent";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQ_CATEGORIES } from "@/constants/faqs";

const faqCategory = FAQ_CATEGORIES.find((category) => category.slug === "diet-planner")!;

const TITLE = "7-Day Kidney Stone Diet Chart & Free Planner";
const DESCRIPTION =
  "Explore a 7-day Indian kidney stone diet chart, foods to eat and avoid, and a free personalized diet planner with hydration and stone-type guidance.";
const URL = "https://thecurestone.com/kidney-stone-diet-planner";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "7 day kidney stone diet chart",
    "kidney stone diet chart",
    "kidney stone diet plan",
    "kidney stone diet",
    "foods to avoid kidney stones",
    "foods to eat kidney stones",
    "low oxalate kidney stone diet",
    "kidney stone meal plan",
    "kidney stone diet plan pdf",
    "diet after kidney stone surgery",
    "kidney stone diet Indian food",
  ],
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
    images: [{ url: "/assets/doctor.png", width: 753, height: 807, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/doctor.png"],
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cure Stone Kidney Stone Diet Planner",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  url: URL,
  description: DESCRIPTION,
  provider: {
    "@type": "MedicalBusiness",
    name: "Cure Stone",
    "@id": "https://thecurestone.com/#organization",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

// Signals topical relevance for medical/health search surfaces (Google's
// health-content guidelines look for this kind of structured context) —
// no reviewedBy/lastReviewed claim here since the clinical constants are
// still pending Dr. Gupta's sign-off (see clinicalConfig.ts).
const medicalWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: TITLE,
  url: URL,
  description: DESCRIPTION,
  aspect: "Diet and Nutrition",
  about: {
    "@type": "MedicalCondition",
    name: "Kidney Stones",
    alternateName: "Nephrolithiasis",
  },
  audience: {
    "@type": "MedicalAudience",
    audienceType: "Patient",
  },
  publisher: {
    "@type": "MedicalBusiness",
    name: "Cure Stone",
    "@id": "https://thecurestone.com/#organization",
  },
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
    { "@type": "ListItem", position: 2, name: "Kidney Stone Diet Planner", item: URL },
  ],
};

export default function DietPlannerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main className="flex-grow pt-20 md:pt-28 pb-10 bg-gradient-to-b from-[#eff2f8] to-white">
        <DietPlannerApp />

        <DietPlannerSeoContent />

        <div className="max-w-3xl mx-auto mb-10 mt-16 px-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
            Frequently Asked <span className="text-primary italic">Questions</span>
          </h2>
          <FaqAccordion items={faqCategory.items} />
        </div>
      </main>
      <Footer />
    </>
  );
}
