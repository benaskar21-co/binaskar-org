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
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface/70 text-brand-50 backdrop-blur transition hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
      </button>

      {open ? (
        <nav
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full z-50 border-b border-border bg-base/95 px-4 py-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
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
                      "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-surface-2 text-white"
                        : "text-brand-100/70 hover:bg-surface hover:text-white"
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
