import { notFound } from "next/navigation";

import {
  AboutSection,
  ContactSection,
} from "@/components/about-contact";
import { CaseStudiesSection, LeaderSection } from "@/components/case-studies-leader";
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { Hero } from "@/components/hero";
import {
  ExperienceSection,
  MethodologySection,
} from "@/components/methodology-experience";
import { ServicesSection } from "@/components/sections";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();
  const locale = localeParam as Locale;

  return (
    <>
      <HashScrollHandler />
      <Hero locale={locale} />
      <ServicesSection locale={locale} />
      <MethodologySection locale={locale} />
      <ExperienceSection locale={locale} />
      <CaseStudiesSection locale={locale} />
      <AboutSection locale={locale} />
      <LeaderSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
