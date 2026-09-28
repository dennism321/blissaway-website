import type { MetadataRoute } from "next";
import { CANONICAL_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: CANONICAL_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
