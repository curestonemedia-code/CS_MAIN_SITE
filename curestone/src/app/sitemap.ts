import type { MetadataRoute } from "next";

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
  { path: "/gurgaon", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sector-52", changeFrequency: "monthly", priority: 0.7 },
  { path: "/book", changeFrequency: "monthly", priority: 0.7 },
  { path: "/checker", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
