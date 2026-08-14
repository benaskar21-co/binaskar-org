import type { MetadataRoute } from "next";

import { appLinkSlugs } from "@/lib/app-links";
import { appPolicySlugs } from "@/lib/app-policies";
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

  const appPolicyPages = appPolicySlugs.map((slug) => ({
    url: `${baseUrl}/policy/${slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const appPages = [
    {
      url: `${baseUrl}/apps`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...appLinkSlugs.map((slug) => ({
      url: `${baseUrl}/apps/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...homePages, ...privacyPages, ...appPolicyPages, ...appPages];
}
