import type { Metadata } from "next";
import { SERVICES } from "@/constants/services";
import { getYouTubeMeta } from "@/lib/youtube";

const SITE_URL = "https://thecurestone.com";

type SpecialtyLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: SpecialtyLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Specialty Not Found | Cure Stone" };
  }

  const title = `${service.name}, Gurgaon`;
  const description = service.shortDesc;
  const url = `${SITE_URL}/specialties/${service.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "Cure Stone",
      locale: "en_IN",
      images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.svg"],
    },
  };
}

export default async function SpecialtyLayout({ children, params }: SpecialtyLayoutProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) return children;

  const url = `${SITE_URL}/specialties/${service.slug}`;

  const medicalProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.name,
    description: service.fullDesc,
    procedureType: "http://schema.org/NoninvasiveProcedure",
    howPerformed: service.treatments.join(", "),
    signOrSymptom: service.symptoms,
    provider: {
      "@type": "MedicalBusiness",
      name: "Cure Stone",
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
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
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Specialties", item: `${SITE_URL}/specialties` },
      { "@type": "ListItem", position: 3, name: service.name, item: url },
    ],
  };

  // Only emit video schema for services with a real, reachable slug — the
  // rest of the pipeline (generateStaticParams, canonical URL) can't
  // produce a valid indexable page for an empty slug anyway.
  const videoSchemas = service.slug
    ? await Promise.all(
        service.videoGallery.map(async (video) => {
          const meta = await getYouTubeMeta(video.ytId);
          return {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: video.title,
            description: `${video.title} — ${service.name} at Cure Stone Hospital, Gurgaon.`,
            thumbnailUrl: [`https://img.youtube.com/vi/${video.ytId}/maxresdefault.jpg`],
            ...(meta.uploadDate ? { uploadDate: meta.uploadDate } : {}),
            ...(meta.duration ? { duration: meta.duration } : {}),
            embedUrl: `https://www.youtube.com/embed/${video.ytId}`,
            contentUrl: `https://www.youtube.com/watch?v=${video.ytId}`,
            publisher: {
              "@type": "Organization",
              name: "Cure Stone",
              "@id": `${SITE_URL}/#organization`,
            },
          };
        })
      )
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      {videoSchemas.map((schema) => (
        <script
          key={schema.embedUrl}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      {children}
    </>
  );
}
