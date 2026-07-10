"use client";

import { useRouter } from "next/navigation";

import { locales, type Locale } from "@/lib/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();

  function switchLocale(target: Locale) {
    if (target === locale) return;
    const hash = window.location.hash;
    router.replace(`/${target}${hash}`);
  }

  return (
    <div
      className="flex rounded-full border border-border bg-surface/70 p-0.5 backdrop-blur"
      role="group"
      aria-label="Language switcher"
    >
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition ${
            loc === locale
              ? "bg-accent text-[#1a1204]"
              : "text-brand-100/70 hover:bg-surface-2 hover:text-white"
          }`}
          aria-current={loc === locale ? "true" : undefined}
          aria-pressed={loc === locale}
          lang={loc}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
