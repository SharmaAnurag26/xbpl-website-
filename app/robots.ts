import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/** Only the production deployment is indexable; Vercel preview URLs are kept out of search. */
export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== "production";
  if (isPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/styleguide"] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
