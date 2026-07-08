import type { Metadata } from "next";

const TITLE = "Cure Stone AI Symptom Checker | Kidney Stone Assistant";
const DESCRIPTION =
  "Ask Cure Stone AI about kidney stone symptoms, RIRS, PCNL, ESWL and URSL treatment options. A free, instant assistant from Cure Stone Hospital, Sector 52, Gurgaon.";
const URL = "https://thecurestone.com/checker";

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
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Cure Stone AI Symptom Checker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.svg"],
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cure Stone AI",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
    { "@type": "ListItem", position: 2, name: "Cure Stone AI", item: URL },
  ],
};

export default function CheckerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      {children}
    </>
  );
}
