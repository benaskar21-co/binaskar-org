export const sections = {
  home: "home",
  services: "services",
  methodology: "methodology",
  experience: "experience",
  caseStudies: "case-studies",
  about: "about",
  leader: "leader",
  contact: "contact",
} as const;

export type SectionId = (typeof sections)[keyof typeof sections];

export function sectionHref(locale: string, section: SectionId): string {
  return section === "home" ? `/${locale}` : `/${locale}#${section}`;
}
