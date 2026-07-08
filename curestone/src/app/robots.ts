import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/portal/", "/api/"],
      },
    ],
    sitemap: [
      "https://thecurestone.com/sitemap.xml",
      "https://thecurestone.com/specialties/sitemap.xml",
      "https://thecurestone.com/blog/sitemap.xml",
    ],
    host: "https://thecurestone.com",
  };
}
