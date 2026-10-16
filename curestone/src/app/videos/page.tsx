import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VideoLibrary from "@/components/videos/VideoLibrary";
import VideosHero from "@/components/videos/VideosHero";
import FaqAccordion from "@/components/FaqAccordion";
import { fetchActiveVideos } from "@/lib/youtubeVideos";
import { ORGANIZATION_ID } from "@/constants/business";
import { FAQ_CATEGORIES } from "@/constants/faqs";

const faqCategory = FAQ_CATEGORIES.find((category) => category.slug === "videos")!;

const TITLE = "Kidney Stone Videos: RIRS, PCNL, ESWL, URSL, Diet & Size";
const DESCRIPTION =
  "Watch kidney stone videos by Dr. Deepanshu Gupta — browse by procedure (RIRS, PCNL, URSL, ESWL), stone size, diet, prevention, symptoms, recovery, patient stories and more.";
const URL = "https://thecurestone.com/videos";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "kidney stone videos",
    "kidney stone surgery video",
    "RIRS video",
    "PCNL video",
    "URSL video",
    "ESWL video",
    "kidney stone size treatment",
    "kidney stone diet video",
    "kidney stone symptoms video",
    "kidney stone recovery video",
    "kidney stone patient stories",
    "DJ stent video",
    "kidney stone removal video",
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
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
    { "@type": "ListItem", position: 2, name: "Videos", item: URL },
  ],
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

function buildCollectionSchema(videos: Awaited<ReturnType<typeof fetchActiveVideos>>) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    url: URL,
    description: DESCRIPTION,
    about: {
      "@type": "MedicalCondition",
      name: "Kidney Stones",
      alternateName: "Nephrolithiasis",
    },
    publisher: {
      "@type": "MedicalBusiness",
      name: "Cure Stone",
      "@id": ORGANIZATION_ID,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: videos.slice(0, 30).map((video, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoObject",
          name: video.title,
          thumbnailUrl: `https://img.youtube.com/vi/${video.ytId}/hqdefault.jpg`,
          uploadDate: video.publishedAt,
          duration: video.durationIso,
          genre: video.categories,
          embedUrl: `https://www.youtube-nocookie.com/embed/${video.ytId}`,
          contentUrl: `https://www.youtube.com/watch?v=${video.ytId}`,
        },
      })),
    },
  };
}

export default async function VideosPage() {
  const videos = await fetchActiveVideos();
  const collectionSchema = buildCollectionSchema(videos);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main className="flex-grow pt-20 md:pt-28 pb-16 bg-gradient-to-b from-[#eff2f8] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <VideosHero totalVideos={videos.length} />

          {videos.length === 0 ? (
            <p className="text-sm text-text-light py-16 text-center">
              Videos are being synced — check back shortly.
            </p>
          ) : (
            <VideoLibrary videos={videos} />
          )}
        </div>

        <div className="max-w-3xl mx-auto mb-10 mt-16 px-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
            Video Library <span className="text-primary italic">FAQs</span>
          </h2>
          <FaqAccordion items={faqCategory.items} />
        </div>
      </main>
      <Footer />
    </>
  );
}
