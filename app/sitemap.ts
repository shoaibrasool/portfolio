import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://your-domain.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://your-domain.com/linkedin", lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}
