import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity";

const SITE_URL = "https://thecurestone.com";

type SlugEntry = { slug: string; updatedAt?: string; publishedAt?: string };

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
  const posts = await getAllBlogSlugs();

  return [
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
