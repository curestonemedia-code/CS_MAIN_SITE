import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity";
import { UNCATEGORIZED_SLUG } from "@/lib/blogs";

const SITE_URL = "https://thecurestone.com";

type SlugEntry = {
  slug: string;
  updatedAt?: string;
  publishedAt?: string;
  categorySlug?: string | null;
};

async function getAllBlogSlugs(): Promise<SlugEntry[]> {
  try {
    // The dataset is shared with drdeepanshugupta.com — without this scope
    // their posts would show up in Cure Stone's own sitemap.
    return await sanityFetch<SlugEntry[]>({
      query: `*[_type == "blogPost" && coalesce(siteId, "cure-stone") == "cure-stone" && defined(slug.current) && isPublished != false]{
        "slug": slug.current,
        publishedAt,
        updatedAt,
        "categorySlug": categories[0]->slug.current
      }`,
    });
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogSlugs();
  const categorySlugs = new Set(posts.map((post) => post.categorySlug || UNCATEGORIZED_SLUG));

  const categoryEntries: MetadataRoute.Sitemap = Array.from(categorySlugs).map((categorySlug) => ({
    url: `${SITE_URL}/${categorySlug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.categorySlug || UNCATEGORIZED_SLUG}/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    ...categoryEntries,
    ...postEntries,
  ];
}
