import type { MetadataRoute } from "next";
import { SERVICES } from "@/constants/services";
import { sanityFetch } from "@/lib/sanity";

const SITE_URL = "https://thecurestone.com";

type SlugEntry = { slug: string; updatedAt?: string; publishedAt?: string };

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/dr-deepanshu-gupta", changeFrequency: "monthly", priority: 0.7 },
  { path: "/specialties", changeFrequency: "monthly", priority: 0.8 },
  { path: "/rirs", changeFrequency: "monthly", priority: 0.8 },
  { path: "/eswl", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mini-pcnl", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ursl", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gurgaon", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sector-52", changeFrequency: "monthly", priority: 0.7 },
  { path: "/book", changeFrequency: "monthly", priority: 0.7 },
  { path: "/checker", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blog", changeFrequency: "daily", priority: 0.7 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.7 },
];

async function getAllBlogSlugs(): Promise<SlugEntry[]> {
  try {
    return await sanityFetch<SlugEntry[]>({
      query: `*[_type == "blogPost" && defined(slug.current) && isPublished != false]{
        "slug": slug.current,
        publishedAt,
        updatedAt
      }`,
    });
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getAllBlogSlugs();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const specialtyEntries: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/specialties/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...specialtyEntries, ...blogEntries];
}
