import type { Metadata } from "next";

import { getMessages, t } from "@/lib/i18n/get-messages";
import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/i18n/config";

export function buildMetadata(
  locale: Locale,
  pageKey: "home" | "privacy" = "home"
): Metadata {
  const messages = getMessages(locale);
  const siteName =
    locale === "ar" ? siteConfig.nameAr : siteConfig.name;
  const isHome = pageKey === "home";
  const title = isHome
    ? `${siteName} | ${messages.meta.tagline}`
    : `${messages.privacy.title} | ${siteName}`;
  const description = isHome
    ? messages.meta.description
    : messages.privacy.sections.collect.content;
  const path = isHome ? `/${locale}` : `/${locale}/privacy`;
  const url = `${siteConfig.url}${path}`;

  const keywords = isHome
    ? locale === "ar"
      ? [
          "استشارات تقنية",
          "CTO",
          "التحول الرقمي",
          "هندسة الحلول",
          "الذكاء الاصطناعي",
          "الرياض",
          "بن عسكر للتقنية",
        ]
      : [
          "technology consulting",
          "CTO as a Service",
          "digital transformation",
          "solution architecture",
          "applied AI",
          "Riyadh",
          "Bin Askar Technology",
        ]
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        ar: `${siteConfig.url}/ar${isHome ? "" : "/privacy"}`,
        en: `${siteConfig.url}/en${isHome ? "" : "/privacy"}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildJsonLd(locale: Locale) {
  const siteName =
    locale === "ar" ? siteConfig.nameAr : siteConfig.name;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/${locale}#organization`,
        name: siteName,
        url: `${siteConfig.url}/${locale}`,
        description: t(locale, "meta.description"),
        email: siteConfig.contactEmail,
        founder: {
          "@type": "Person",
          name: locale === "ar" ? siteConfig.leaderAr : siteConfig.leader,
          jobTitle: "CTO",
          sameAs: siteConfig.linkedIn,
        },
        areaServed: {
          "@type": "Country",
          name: "Saudi Arabia",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Riyadh",
          addressCountry: "SA",
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.contactEmail,
          contactType: "customer service",
          availableLanguage: ["Arabic", "English"],
        },
        knowsAbout: [
          "Technology Strategy",
          "CTO as a Service",
          "Solution Architecture",
          "Digital Transformation",
          "Applied AI",
          "Digital Product Engineering",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/${locale}#webpage`,
        url: `${siteConfig.url}/${locale}`,
        name: siteName,
        description: t(locale, "meta.description"),
        inLanguage: locale === "ar" ? "ar-SA" : "en-US",
        isPartOf: { "@id": `${siteConfig.url}/${locale}#organization` },
      },
    ],
  };
}
