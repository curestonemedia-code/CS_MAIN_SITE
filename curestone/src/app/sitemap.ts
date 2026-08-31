import type { MetadataRoute } from "next";
import { escapeXml } from "@/lib/xml";

const SITE_URL = "https://thecurestone.com";

/**
 * Core/marketing pages niche. Specialties (procedures) and blog articles have
 * their own sitemaps at /specialties/sitemap.xml and /blog/sitemap.xml so each
 * content type can be crawled, split and refreshed independently.
 */
const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/dr-deepanshu-gupta", changeFrequency: "monthly", priority: 0.7 },
  { path: "/rirs", changeFrequency: "monthly", priority: 0.8 },
  { path: "/eswl", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mini-pcnl", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ursl", changeFrequency: "monthly", priority: 0.8 },
  { path: "/rirs-in-gurgaon", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mini-pcnl-in-gurgaon", changeFrequency: "monthly", priority: 0.8 },
  { path: "/eswl-in-gurgaon", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ursl-in-gurgaon", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gurgaon", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sector-52", changeFrequency: "monthly", priority: 0.7 },
  { path: "/book", changeFrequency: "monthly", priority: 0.7 },
  { path: "/checker", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.7 },
];

// Real, distinct videos from the Cure Stone YouTube channel, keyed by the
// page they're embedded on — surfaces them to Google via a video sitemap
// (https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps).
const VIDEOS_BY_PATH: Record<string, MetadataRoute.Sitemap[number]["videos"]> = {
  "/": [
    {
      title: "How RIRS Laser Surgery Works — Complete Guide",
      thumbnail_loc: "https://img.youtube.com/vi/K5va1bE282M/maxresdefault.jpg",
      description: "Dr. Deepanshu Gupta explains how RIRS laser surgery works for kidney stone treatment at Cure Stone Hospital, Gurgaon.",
      player_loc: "https://www.youtube.com/embed/K5va1bE282M",
      family_friendly: "yes",
    },
    {
      title: "DJ Stent Removal — Is It Painful?",
      thumbnail_loc: "https://img.youtube.com/vi/qobqvzQ6za4/maxresdefault.jpg",
      description: "Dr. Deepanshu Gupta on what to expect during DJ stent removal after kidney stone surgery, and how much discomfort is typical.",
      player_loc: "https://www.youtube.com/embed/qobqvzQ6za4",
      family_friendly: "yes",
    },
    {
      title: "Kidney Stone Prevention — Diet & Hydration",
      thumbnail_loc: "https://img.youtube.com/vi/aHsGua3WaVM/maxresdefault.jpg",
      description: "Dietary and hydration guidance from Dr. Deepanshu Gupta to help reduce the risk of recurrent kidney stones.",
      player_loc: "https://www.youtube.com/embed/aHsGua3WaVM",
      family_friendly: "yes",
    },
    {
      title: "11mm Kidney Stone Treatment — Patient Case",
      thumbnail_loc: "https://img.youtube.com/vi/4FE-zSpLWPQ/maxresdefault.jpg",
      description: "A Cure Stone Hospital patient case discussing treatment for an 11mm kidney stone.",
      player_loc: "https://www.youtube.com/embed/4FE-zSpLWPQ",
      family_friendly: "yes",
    },
  ],
  "/rirs": [
    {
      title: "RIRS Procedure Video",
      thumbnail_loc: "https://img.youtube.com/vi/cQMDYm__gHM/maxresdefault.jpg",
      description: "Live-OT footage of a laser RIRS procedure for a 10mm kidney stone, performed by Dr. Deepanshu Gupta at Cure Stone Hospital, Gurgaon.",
      player_loc: "https://www.youtube.com/embed/cQMDYm__gHM",
      family_friendly: "yes",
    },
  ],
  "/eswl": [
    {
      title: "ESWL Procedure Video",
      thumbnail_loc: "https://img.youtube.com/vi/tNx0HcofMgc/maxresdefault.jpg",
      description: "Dr. Deepanshu Gupta explains the benefits and drawbacks of ESWL (shock wave lithotripsy) for kidney stone treatment at Cure Stone Hospital, Gurgaon.",
      player_loc: "https://www.youtube.com/embed/tNx0HcofMgc",
      family_friendly: "yes",
    },
  ],
  "/mini-pcnl": [
    {
      title: "Mini PCNL Procedure Video",
      thumbnail_loc: "https://img.youtube.com/vi/UL6rs2nAXsU/maxresdefault.jpg",
      description: "Dr. Deepanshu Gupta explains what PCNL (Percutaneous Nephrolithotomy) is and how it's used to treat larger kidney stones at Cure Stone Hospital, Gurgaon.",
      player_loc: "https://www.youtube.com/embed/UL6rs2nAXsU",
      family_friendly: "yes",
    },
  ],
  "/ursl": [
    {
      title: "URSL Procedure Video",
      thumbnail_loc: "https://img.youtube.com/vi/w-0pRk1MyUM/maxresdefault.jpg",
      description: "Live-OT footage of a URSL (ureteroscopic lithotripsy) procedure, performed by Dr. Deepanshu Gupta at Cure Stone Hospital, Gurgaon.",
      player_loc: "https://www.youtube.com/embed/w-0pRk1MyUM",
      family_friendly: "yes",
    },
  ],
};

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((route) => {
    const videos = VIDEOS_BY_PATH[route.path];
    return {
      url: `${SITE_URL}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(videos
        ? {
            videos: videos.map((video) => ({
              ...video,
              title: escapeXml(video.title),
              description: escapeXml(video.description),
            })),
          }
        : {}),
    };
  });
}
