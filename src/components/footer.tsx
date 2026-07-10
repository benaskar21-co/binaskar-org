import { AnchorLink } from "@/components/anchor-link";
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
    <footer className="border-t border-border bg-base text-brand-100/80">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-white">
              {siteName}
            </p>
            <p className="mt-2 text-sm text-brand-100/60">
              {messages.meta.tagline}
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-4 inline-block text-sm text-brand-100/80 transition hover:text-accent-strong"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {messages.nav.home}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <AnchorLink
                  href={sectionHref(locale, sections.services)}
                  className="transition hover:text-white"
                >
                  {messages.nav.services}
                </AnchorLink>
              </li>
              <li>
                <AnchorLink
                  href={sectionHref(locale, sections.caseStudies)}
                  className="transition hover:text-white"
                >
                  {messages.nav.caseStudies}
                </AnchorLink>
              </li>
              <li>
                <AnchorLink
                  href={sectionHref(locale, sections.about)}
                  className="transition hover:text-white"
                >
                  {messages.nav.about}
                </AnchorLink>
              </li>
              <li>
                <AnchorLink
                  href={sectionHref(locale, sections.contact)}
                  className="transition hover:text-white"
                >
                  {messages.nav.contact}
                </AnchorLink>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {messages.leader.linkedin}
            </p>
            <a
              href={siteConfig.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm transition hover:text-white"
            >
              LinkedIn
            </a>
            <p className="mt-4 text-xs text-brand-100/50">
              {messages.footer.built}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-brand-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteName}. {messages.footer.rights}
          </p>
          <Link
            href={`/${locale}/privacy`}
            prefetch={false}
            className="transition hover:text-white"
          >
            {messages.nav.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
