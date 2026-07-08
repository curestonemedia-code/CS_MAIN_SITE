import type { MetadataRoute } from "next";
import { SERVICES } from "@/constants/services";

const SITE_URL = "https://thecurestone.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/specialties`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...SERVICES.map((service) => ({
      url: `${SITE_URL}/specialties/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
