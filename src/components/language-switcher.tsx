import Link from "next/link";

import { locales, type Locale } from "@/lib/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  hash?: string;
};

export function LanguageSwitcher({ locale, hash = "" }: LanguageSwitcherProps) {
  return (
    <div
      className="flex rounded-full border border-border bg-surface/70 p-0.5 backdrop-blur"
      role="group"
      aria-label="Language switcher"
    >
      {locales.map((loc) => (
        <Link
          key={loc}
          href={`/${loc}${hash}`}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition ${
            loc === locale
              ? "bg-accent text-[#1a1204]"
              : "text-brand-100/70 hover:bg-surface-2 hover:text-white"
          }`}
          aria-current={loc === locale ? "true" : undefined}
          lang={loc}
        >
          {loc}
        </Link>
      ))}
    </div>
  );
}
