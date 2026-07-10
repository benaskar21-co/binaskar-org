import { siteConfig } from "@/lib/i18n/config";

export function buildLlmsTxt(): string {
  const { url, name, contactEmail, linkedIn, leader } = siteConfig;

  return `# ${name}

> Technology consultancy led by Abdullah Bin Askar (CTO) — strategy, solution architecture, applied AI, and digital product engineering from Riyadh, Saudi Arabia.

${name} (بن عسكر للتقنية) helps enterprises, startups, and government organizations turn technology vision into reliable digital products. The site is bilingual (Arabic default, English available). Primary contact: ${contactEmail}.

## Main Pages

- [Home (Arabic)](${url}/ar): Company overview, services, methodology, experience, case studies, about, and contact form.
- [Home (English)](${url}/en): English version of the same single-page site.
- [Privacy Policy (Arabic)](${url}/ar/privacy): How contact form data is collected and used.
- [Privacy Policy (English)](${url}/en/privacy): Privacy policy in English.

## Services

- [Services](${url}/en#services): CTO as a Service, digital transformation, solution architecture, applied AI (RAG, agents), and digital product engineering.
- [Methodology](${url}/en#methodology): Discover → Design → Build → Scale delivery process.
- [Experience](${url}/en#experience): 10+ years across telecom, government, fintech, and startups.
- [About](${url}/en#about): Mission, clients served, and company values.
- [Contact](${url}/en#contact): Inquiry form and official email ${contactEmail}.

## Case Studies

- [Minnha — منحة](https://www.minnha.sa): University admissions and scholarship platform; payments and business model pivot.
- [Hido — هايدو](https://hido.app): Local digital tourism platform with booking and community-hosted experiences.

## Leadership

- [About the Leader](${url}/en#leader): ${leader} — Founder & Technical Leader; PSPO, PSM I/II, CQRS & Event Sourcing.
- [LinkedIn](${linkedIn}): Professional profile of ${leader}.

## Optional

- [Sitemap](${url}/sitemap.xml): Machine-readable list of public URLs.
- [Robots](${url}/robots.txt): Crawler directives for search engines.
`;
}

export const llmsTxtHeaders = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=86400",
} as const;
