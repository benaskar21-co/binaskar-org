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
    <footer className="bg-primary text-slate-300">
      <div className="section-shell py-16 sm:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <BrandLockup locale={locale} />
            <p className="mt-2 text-sm text-slate-400">{messages.meta.tagline}</p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-4 inline-block cursor-pointer text-sm text-slate-300 transition duration-200 hover:text-white"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
              {messages.nav.home}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <AnchorLink
                  href={sectionHref(locale, sections.services)}
                  className="cursor-pointer transition duration-200 hover:text-white"
                >
                  {messages.nav.services}
                </AnchorLink>
              </li>
              <li>
                <AnchorLink
                  href={sectionHref(locale, sections.caseStudies)}
                  className="cursor-pointer transition duration-200 hover:text-white"
                >
                  {messages.nav.caseStudies}
                </AnchorLink>
              </li>
              <li>
                <AnchorLink
                  href={sectionHref(locale, sections.about)}
                  className="cursor-pointer transition duration-200 hover:text-white"
                >
                  {messages.nav.about}
                </AnchorLink>
              </li>
              <li>
                <AnchorLink
                  href={sectionHref(locale, sections.contact)}
                  className="cursor-pointer transition duration-200 hover:text-white"
                >
                  {messages.nav.contact}
                </AnchorLink>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
              {messages.leader.linkedin}
            </p>
            <a
              href={siteConfig.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block cursor-pointer text-sm transition duration-200 hover:text-white"
            >
              LinkedIn
            </a>
            <p className="mt-4 text-xs text-slate-500">{messages.footer.built}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteName}. {messages.footer.rights}
          </p>
          <Link
            href={`/${locale}/privacy`}
            prefetch={false}
            className="cursor-pointer transition duration-200 hover:text-white"
          >
            {messages.nav.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
