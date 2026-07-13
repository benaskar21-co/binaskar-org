import { AnchorLink } from "@/components/anchor-link";
import { BrandLockup } from "@/components/brand-mark";
import Link from "next/link";

import { sectionHref, sections } from "@/lib/sections";
import { siteConfig, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const messages = getMessages(locale);
  const siteName = locale === "ar" ? siteConfig.nameAr : siteConfig.name;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-primary-deep text-white/65">
      <div className="section-shell py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <BrandLockup locale={locale} />
            <p className="mt-8 max-w-3xl font-display text-3xl font-medium leading-tight tracking-[-0.04em] text-white sm:text-4xl">
              {messages.meta.tagline}
            </p>
            <p className="mt-5 text-sm text-white/60">{messages.footer.built}</p>
          </div>

          <nav aria-label={messages.nav.footerLabel}>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-semibold sm:flex sm:flex-wrap sm:justify-end">
              <li>
                <AnchorLink href={sectionHref(locale, sections.services)} className="inline-flex min-h-11 cursor-pointer items-center transition-colors duration-200 hover:text-accent">
                  {messages.nav.services}
                </AnchorLink>
              </li>
              <li>
                <AnchorLink href={sectionHref(locale, sections.caseStudies)} className="inline-flex min-h-11 cursor-pointer items-center transition-colors duration-200 hover:text-accent">
                  {messages.nav.caseStudies}
                </AnchorLink>
              </li>
              <li>
                <AnchorLink href={sectionHref(locale, sections.about)} className="inline-flex min-h-11 cursor-pointer items-center transition-colors duration-200 hover:text-accent">
                  {messages.nav.about}
                </AnchorLink>
              </li>
              <li>
                <AnchorLink href={sectionHref(locale, sections.contact)} className="inline-flex min-h-11 cursor-pointer items-center transition-colors duration-200 hover:text-accent">
                  {messages.nav.contact}
                </AnchorLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteName}. {messages.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a href={`mailto:${siteConfig.contactEmail}`} className="inline-flex min-h-11 cursor-pointer items-center transition-colors duration-200 hover:text-white">
              {siteConfig.contactEmail}
            </a>
            <a href={siteConfig.linkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 cursor-pointer items-center transition-colors duration-200 hover:text-white">
              LinkedIn
            </a>
            <Link href={`/${locale}/privacy`} prefetch={false} className="inline-flex min-h-11 cursor-pointer items-center transition-colors duration-200 hover:text-white">
              {messages.nav.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
