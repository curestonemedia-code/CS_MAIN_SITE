import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryVideoLibrary from "@/components/videos/CategoryVideoLibrary";
import { countVideosByCategory } from "@/components/videos/videoListHelpers";
import { fetchActiveVideos } from "@/lib/youtubeVideos";
import type { VideoCategory } from "@/lib/youtubeVideos";
import { CATEGORY_META, categoryFromSlug } from "@/constants/videoCategories";
import { ORGANIZATION_ID } from "@/constants/business";

const SITE_URL = "https://thecurestone.com";

const CATEGORY_SEO: Record<VideoCategory, { title: string; description: string; keywords: string[] }> = {
  size: {
    title: "Kidney Stone Size Videos — By mm (Under 5mm to 10mm+)",
    description:
      "Watch kidney stone videos grouped by size — under 5mm, 5–10mm and over 10mm — and what's typically considered at each size.",
    keywords: ["kidney stone size video", "5mm kidney stone", "10mm kidney stone video", "kidney stone size treatment"],
  },
  diet: {
    title: "Kidney Stone Diet Videos — Foods & Hydration",
    description:
      "Dr. Deepanshu Gupta's videos on kidney stone diet — foods to eat and avoid, hydration habits, and diet after surgery.",
    keywords: ["kidney stone diet video", "kidney stone food video", "hydration kidney stone"],
  },
  ot: {
    title: "Kidney Stone Surgery Videos — RIRS, PCNL, URSL, ESWL",
    description: "OT and procedure videos covering RIRS, PCNL, URSL, ESWL and DJ stents for kidney stone surgery.",
    keywords: ["kidney stone surgery video", "OT video kidney stone", "kidney stone operation video"],
  },
  rirs: {
    title: "RIRS Videos — Laser Kidney Stone Surgery Explained",
    description: "Watch RIRS (Retrograde Intra-Renal Surgery) videos — how it works, recovery, and what to expect.",
    keywords: ["RIRS video", "RIRS laser surgery video", "RIRS procedure video"],
  },
  pcnl: {
    title: "PCNL Videos — Percutaneous Nephrolithotomy Explained",
    description: "Watch PCNL and Mini-PCNL videos — procedure details and recovery for larger kidney stones.",
    keywords: ["PCNL video", "mini PCNL video", "PCNL procedure video"],
  },
  ursl: {
    title: "URSL Videos — Ureteroscopy Laser Stone Removal",
    description: "Watch URSL (Ureteroscopy) videos — laser stone removal from the ureter, explained step by step.",
    keywords: ["URSL video", "ureteroscopy video", "laser stone removal video"],
  },
  eswl: {
    title: "ESWL Videos — Shock Wave Lithotripsy Explained",
    description: "Watch ESWL videos — breaking kidney stones with sound waves, a non-surgical treatment option.",
    keywords: ["ESWL video", "shock wave lithotripsy video", "ESWL procedure video"],
  },
  prevention: {
    title: "Kidney Stone Prevention Videos — Diet & Habits",
    description: "Videos on lifestyle, hydration and habits that help prevent kidney stones from forming or recurring.",
    keywords: ["kidney stone prevention video", "prevent kidney stones video"],
  },
  symptoms: {
    title: "Kidney Stone Symptoms Videos — Signs & Pain Patterns",
    description: "Videos on recognizing kidney stone symptoms, pain patterns, and when to see a doctor.",
    keywords: ["kidney stone symptoms video", "kidney stone pain video"],
  },
  recovery: {
    title: "Kidney Stone Recovery Videos — Aftercare & Timelines",
    description: "Videos on post-surgery care, recovery timelines, and aftercare following a kidney stone procedure.",
    keywords: ["kidney stone recovery video", "post surgery recovery kidney stone"],
  },
  patient_stories: {
    title: "Kidney Stone Patient Stories — Real Experiences",
    description: "Real patient experiences and journeys with kidney stone treatment, in their own words.",
    keywords: ["kidney stone patient stories", "kidney stone patient testimonial"],
  },
  myths_facts: {
    title: "Kidney Stone Myths & Facts — Common Misconceptions",
    description: "Videos correcting common misconceptions about kidney stones and their treatment.",
    keywords: ["kidney stone myths", "kidney stone facts video"],
  },
  urology_other: {
    title: "Prostate & Urology Videos — Beyond Kidney Stones",
    description: "Videos on other urology topics — prostate, UTI and conditions beyond kidney stones.",
    keywords: ["prostate video", "urology video", "UTI video"],
  },
  other: {
    title: "More Kidney Stone & Urology Videos",
    description: "Additional kidney stone and urology awareness videos from Dr. Deepanshu Gupta.",
    keywords: ["kidney stone videos", "urology videos"],
  },
};

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) return {};

  const seo = CATEGORY_SEO[category];
  const url = `${SITE_URL}/videos/${slug}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: "Cure Stone",
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

function buildCollectionSchema(
  category: VideoCategory,
  videos: Awaited<ReturnType<typeof fetchActiveVideos>>,
  url: string,
  seo: { title: string; description: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seo.title,
    url,
    description: seo.description,
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

export default async function VideoCategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) notFound();

  const allVideos = await fetchActiveVideos();
  const categoryVideos = allVideos.filter((v) => v.categories.includes(category));
  const countByCategory = countVideosByCategory(allVideos);
  const meta = CATEGORY_META[category];
  const seo = CATEGORY_SEO[category];
  const url = `${SITE_URL}/videos/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Videos", item: `${SITE_URL}/videos` },
      { "@type": "ListItem", position: 3, name: meta.label, item: url },
    ],
  };

  const collectionSchema = buildCollectionSchema(category, categoryVideos, url, seo);

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
      <Navbar />
      <main className="flex-grow pt-20 md:pt-28 pb-16 bg-gradient-to-b from-[#eff2f8] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link
            href="/videos"
            className="inline-flex items-center gap-1 text-xs font-bold text-text-light hover:text-primary mb-6 no-underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Videos
          </Link>

          <div className="flex items-center gap-4 bg-white border border-border/50 rounded-2xl p-5 mb-8">
            <span className={`flex h-14 w-14 items-center justify-center rounded-2xl shrink-0 ${meta.bg}`}>
              <meta.icon className={`w-6 h-6 ${meta.text}`} />
            </span>
            <div>
              <h1 className="text-lg font-black text-foreground">{meta.label} Videos</h1>
              <p className="text-xs text-text-light mt-0.5">{meta.description}</p>
              <p className="text-xs font-bold text-primary mt-1">{categoryVideos.length} videos</p>
            </div>
          </div>

          {categoryVideos.length === 0 ? (
            <p className="text-sm text-text-light py-16 text-center">Videos are being synced — check back shortly.</p>
          ) : (
            <CategoryVideoLibrary category={category} videos={categoryVideos} countByCategory={countByCategory} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
