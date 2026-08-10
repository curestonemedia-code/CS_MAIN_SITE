import type { MetadataRoute } from "next";
import { SERVICES } from "@/constants/services";
import { escapeXml } from "@/lib/xml";

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
      // Only services with a real slug have a reachable canonical URL to
      // attach video sitemap entries to.
      ...(service.slug
        ? {
            videos: service.videoGallery.map((video) => ({
              title: escapeXml(video.title),
              thumbnail_loc: `https://img.youtube.com/vi/${video.ytId}/maxresdefault.jpg`,
              description: escapeXml(`${video.title} — ${service.name} at Cure Stone Hospital, Gurgaon.`),
              player_loc: `https://www.youtube.com/embed/${video.ytId}`,
              family_friendly: "yes" as const,
            })),
          }
        : {}),
    })),
  ];
}
