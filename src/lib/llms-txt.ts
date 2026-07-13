import { siteConfig } from "@/lib/i18n/config";

export function buildLlmsTxt(): string {
  const { url, name, contactEmail, linkedIn, leader } = siteConfig;

  return `# ${name}

> Founder-led technology advisory and leadership practice — clearer decisions, stronger digital products, and delivery capability from Riyadh, Saudi Arabia.

${name} (بن عسكر للتقنية) works with enterprises, founders, and public-sector programs when the challenge sits in technology direction, architecture, or delivery. Engagements stay close to execution and transfer ownership to the internal team. The site is bilingual (Arabic default, English available). Primary contact: ${contactEmail}.

## Main Pages

- [Home (Arabic)](${url}/ar): Company overview, services, methodology, experience, case studies, about, and contact form.
- [Home (English)](${url}/en): English version of the same single-page site.
- [Privacy Policy (Arabic)](${url}/ar/privacy): How contact form data is collected and used.
- [Privacy Policy (English)](${url}/en/privacy): Privacy policy in English.

## Services

- [Services](${url}/en#services): CTO as a Service, technology strategy, solution architecture, production-minded applied AI, and digital product engineering.
- [Methodology](${url}/en#methodology): Understand → Decide → Deliver → Enable, with a usable output at every stage.
- [Experience](${url}/en#experience): More than a decade across telecom, government, digital products and payments, and startups.
- [About](${url}/en#about): Mission, clients served, and company values.
- [Contact](${url}/en#contact): Inquiry form and official email ${contactEmail}.

## Case Studies

- [Minnha — منحة](https://www.minnha.sa): University admissions and scholarship platform; payments and business model pivot.
- [Hido — هايدو](https://hido.app): Local digital tourism platform with booking and community-hosted experiences.

## Leadership

- [About the Leader](${url}/en#leader): ${leader} — Founder & Technology Advisor; PSPO, PSM I/II, CQRS & Event Sourcing.
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
