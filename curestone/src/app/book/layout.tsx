import type { Metadata } from "next";

const faqs = [
  { q: "How soon will I get a confirmation?", a: "Our coordinator calls within 15 minutes of form submission during clinic hours (10 AM – 7 PM On Appoinment)." },
  { q: "Is the consultation free?", a: "The first online video consultation is free. In-clinic consultations start at ₹800." },
  { q: "Do I need to carry any reports?", a: "If you have existing ultrasound, CT KUB or blood reports, please carry them. It helps our team assess your case faster." },
  { q: "Can I book for a family member?", a: "Yes. Just fill in the patient's details in the form. You can also contact us directly via WhatsApp." },
  { q: "What if I am outside India?", a: "We offer international video consultations. Select 'Online Video' as consultation type and mention your country in the description." },
];

const TITLE = "Book a Kidney Stone Consultation | Cure Stone Hospital, Gurgaon";
const DESCRIPTION =
  "Book a free video or in-clinic consultation with Dr. Deepanshu Gupta for kidney stone treatment, RIRS, PCNL, ESWL or URSL at Cure Stone Hospital, Sector 52, Gurgaon.";
const URL = "https://thecurestone.com/book";

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
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Book a Consultation | Cure Stone" }],
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
  mainEntity: faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 2, name: "Book Consultation", item: URL },
  ],
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
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
