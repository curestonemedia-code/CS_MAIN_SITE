import type { Metadata } from "next";
import { ALL_FAQS } from "@/constants/faqs";

const TITLE = "Kidney Stone FAQs | RIRS, PCNL, ESWL & URSL Questions Answered";
const DESCRIPTION =
  "Answers to common questions on RIRS, Mini PCNL, ESWL, URSL, gallbladder stone surgery, cost, insurance and booking a urologist consultation at Cure Stone Hospital, Sector 52, Gurgaon.";
const URL = "https://thecurestone.com/faqs";

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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQS.map((faq) => ({
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
    { "@type": "ListItem", position: 2, name: "FAQs", item: URL },
  ],
};

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      {children}
    </>
  );
}
