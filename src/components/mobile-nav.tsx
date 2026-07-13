"use client";

import { useEffect, useState } from "react";

import { AnchorLink } from "@/components/anchor-link";
import { sectionHref, sections } from "@/lib/sections";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  locale: Locale;
  activeSection?: string;
};

const navItems = [
  { key: "home" as const, section: sections.home },
  { key: "services" as const, section: sections.services },
  { key: "caseStudies" as const, section: sections.caseStudies },
  { key: "about" as const, section: sections.about },
  { key: "contact" as const, section: sections.contact },
] as const;

export function MobileNav({ locale, activeSection = "home" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const messages = getMessages(locale);
  const activeNavSection =
    activeSection === sections.experience || activeSection === sections.methodology
      ? sections.services
      : activeSection === sections.leader
        ? sections.about
        : activeSection;

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm border border-white/20 bg-white/[0.04] text-white transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? messages.nav.closeMenu : messages.nav.openMenu}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open ? (
        <nav
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full z-50 border-y border-white/10 bg-primary px-4 py-4 shadow-2xl"
          aria-label={messages.nav.mobileLabel}
        >
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeNavSection === item.section;
              const label = messages.nav[item.key];

              return (
                <li key={item.key}>
                  <AnchorLink
                    href={sectionHref(locale, item.section)}
                    onNavigate={() => setOpen(false)}
                    className={cn(
                      "flex min-h-12 cursor-pointer items-center rounded-sm px-4 py-3 text-base font-medium transition-colors duration-200",
                      isActive
                        ? "bg-accent text-primary"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {label}
                  </AnchorLink>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
