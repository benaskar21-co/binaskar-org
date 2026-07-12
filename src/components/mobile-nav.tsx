"use client";

import { useState } from "react";

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

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border border-white/20 bg-white/[0.04] text-white transition duration-200 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open ? (
        <nav
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full z-50 border-b border-white/10 bg-primary px-4 py-3 shadow-lg"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.section;
              const label = messages.nav[item.key];

              return (
                <li key={item.key}>
                  <AnchorLink
                    href={sectionHref(locale, item.section)}
                    onNavigate={() => setOpen(false)}
                    className={cn(
                      "block cursor-pointer rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200",
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
