import type { MetadataRoute } from "next";
import { CATEGORY_ORDER, categorySlug } from "@/constants/videoCategories";

const SITE_URL = "https://thecurestone.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/videos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...CATEGORY_ORDER.map((category) => ({
      url: `${SITE_URL}/videos/${categorySlug(category)}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.6,
    })),
  ];
}
