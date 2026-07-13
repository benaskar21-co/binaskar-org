import { AnchorLink } from "@/components/anchor-link";
import { BrandLockup } from "@/components/brand-mark";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { sectionHref, sections } from "@/lib/sections";
import { type Locale } from "@/lib/i18n/config";
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

export function Header({ locale, activeSection = "home" }: HeaderProps) {
  const messages = getMessages(locale);
  const activeNavSection =
    activeSection === sections.experience || activeSection === sections.methodology
      ? sections.services
      : activeSection === sections.leader
        ? sections.about
        : activeSection;
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary/95 text-white shadow-sm backdrop-blur-md">
      <span className="absolute inset-x-0 top-0 h-px bg-accent/70" aria-hidden="true" />
      <div className="section-shell relative py-3.5">
        <div className="flex items-center justify-between gap-4">
          <AnchorLink
            href={sectionHref(locale, sections.home)}
            className="group flex min-h-11 cursor-pointer items-center gap-3 leading-tight"
            aria-label={locale === "ar" ? "بن عسكر للتقنية" : "Bin Askar Technology"}
          >
            <BrandLockup locale={locale} />
          </AnchorLink>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label={messages.nav.mainLabel}
          >
            {navItems.map((item) => {
              const href = sectionHref(locale, item.section);
              const isActive = activeNavSection === item.section;
              const label = messages.nav[item.key];

              return (
                <AnchorLink
                  key={item.key}
                  href={href}
                  className={cn(
                    "relative min-h-11 cursor-pointer px-3 py-3 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-accent"
                      : "text-white/70 hover:text-white"
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {label}
                  {isActive ? (
                    <span
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                      aria-hidden="true"
                    />
                  ) : null}
                </AnchorLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} />
            <AnchorLink
              href={sectionHref(locale, sections.contact)}
              className="hidden min-h-11 cursor-pointer items-center rounded-sm bg-accent px-5 py-2 text-sm font-bold text-primary transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white xl:inline-flex"
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
