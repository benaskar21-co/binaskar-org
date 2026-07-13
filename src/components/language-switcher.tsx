"use client";

import { useRouter } from "next/navigation";

import { locales, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();
  const messages = getMessages(locale);

  function switchLocale(target: Locale) {
    if (target === locale) return;
    const hash = window.location.hash;
    router.replace(`/${target}${hash}`);
  }

  return (
    <div
      className="flex rounded-sm border border-white/20 bg-white/[0.04] p-0.5"
      role="group"
      aria-label={messages.nav.languageSwitcher}
    >
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition duration-200 ${
            loc === locale
              ? "bg-accent text-primary"
              : "text-white/70 hover:bg-white/10 hover:text-white"
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
