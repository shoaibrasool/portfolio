import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/linkedin"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/linkedin"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/linkedin"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/linkedin"],
      },
    ],
    sitemap: "https://your-domain.com/sitemap.xml",
  };
}
