import { AnchorLink } from "@/components/anchor-link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { sectionHref, sections } from "@/lib/sections";
import { siteConfig, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { cn } from "@/lib/utils";

type HeaderProps = {
  locale: Locale;
  activeSection?: string;
  hash?: string;
};

const navItems = [
  { key: "home" as const, section: sections.home },
  { key: "services" as const, section: sections.services },
  { key: "caseStudies" as const, section: sections.caseStudies },
  { key: "about" as const, section: sections.about },
] as const;

export function Header({
  locale,
  activeSection = "home",
  hash = "",
}: HeaderProps) {
  const messages = getMessages(locale);
  const siteName = locale === "ar" ? siteConfig.nameAr : siteConfig.name;
  const hashSuffix = hash || "";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-base/70 backdrop-blur-xl">
      <div className="relative mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <AnchorLink
            href={sectionHref(locale, sections.home)}
            className="group flex flex-col leading-tight"
            aria-label={siteName}
          >
            <span className="font-display text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-accent-strong">
              {siteName}
            </span>
            <span className="text-xs text-muted">{messages.meta.tagline}</span>
          </AnchorLink>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const href = sectionHref(locale, item.section);
              const isActive = activeSection === item.section;
              const label = messages.nav[item.key];

              return (
                <AnchorLink
                  key={item.key}
                  href={href}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-white"
                      : "text-brand-100/70 hover:text-white"
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {label}
                  {isActive ? (
                    <span
                      className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                      aria-hidden="true"
                    />
                  ) : null}
                </AnchorLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} hash={hashSuffix} />
            <AnchorLink
              href={sectionHref(locale, sections.contact)}
              className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[#1a1204] transition hover:bg-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex"
            >
              {messages.nav.contact}
            </AnchorLink>
            <MobileNav locale={locale} activeSection={activeSection} />
          </div>
        </div>
      </div>
    </header>
  );
}
