import type { MetadataRoute } from "next";

import { locales, siteConfig } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const homePages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const privacyPages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/privacy`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...homePages, ...privacyPages];
}
