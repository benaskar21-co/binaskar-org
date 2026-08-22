"use client";

import { useSyncExternalStore } from "react";

import { CONSENT_KEY, isConsentChoice, type ConsentChoice } from "@/lib/consent";

type Copy = {
  body: string;
  accept: string;
  decline: string;
  privacy: string;
  label: string;
};

/**
 * Written here rather than in `messages/`: two of the three layouts that mount
 * analytics (`/apps` and `/policy`) sit outside the locale prefix and never
 * load a message bundle, so the banner has to carry its own copy. Same reason
 * the skip link in the locale layout is written inline.
 */
const COPY: Record<"ar" | "en", Copy> = {
  ar: {
    label: "اختيار التحليلات",
    body: "نستخدم Google Analytics لمعرفة عدد الزيارات وأكثر الصفحات مطالعة. لا نستخدم تتبعًا إعلانيًا، ولا نربط البيانات باسمك أو بريدك.",
    accept: "أوافق",
    decline: "أرفض",
    privacy: "سياسة الخصوصية",
  },
  en: {
    label: "Analytics choice",
    body: "We use Google Analytics to see how many people visit and which pages they read. No advertising tracking, and nothing is linked to your name or email.",
    accept: "Accept",
    decline: "Decline",
    privacy: "Privacy policy",
  },
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * The stored answer, read as an external store rather than into component
 * state. `localStorage` is not React's to own, and a `storage` subscription
 * means answering in one tab dismisses the banner in the others.
 */
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function readConsent(): ConsentChoice | null {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return isConsentChoice(stored) ? stored : null;
  } catch {
    // Storage is unavailable (private mode, embedded webview). With no way to
    // remember an answer, asking on every page would be the worse of the two
    // failures — stay silent and leave consent at its denied default.
    return "denied";
  }
}

/**
 * Nothing renders on the server, so a visitor who has already answered never
 * sees a flash of the banner between HTML and hydration.
 */
function readConsentOnServer(): ConsentChoice {
  return "denied";
}

/**
 * Asks before analytics cookies are stored.
 *
 * Consent Mode v2 means this banner governs *storage*, not measurement: the tag
 * is already sending cookieless pings by the time it renders. Accepting adds a
 * cookie and turns those pings into identified sessions; declining leaves the
 * device untouched. Either way the visit is counted, which is why declining is
 * offered as plainly as accepting — the two buttons carry the same weight
 * because a refusal here costs nothing worth nudging a person away from.
 */
export function ConsentBanner() {
  const choice = useSyncExternalStore(
    subscribe,
    readConsent,
    readConsentOnServer,
  );

  if (choice !== null) return null;

  // Safe to read here and not above: the server snapshot is never null, so this
  // line is only ever reached in the browser.
  const locale = document.documentElement.lang === "en" ? "en" : "ar";
  const copy = COPY[locale];

  function decide(next: ConsentChoice) {
    try {
      localStorage.setItem(CONSENT_KEY, next);
    } catch {
      // The choice still applies to this pageview; only its persistence is lost.
    }
    window.gtag?.("consent", "update", {
      analytics_storage: next === "granted" ? "granted" : "denied",
    });
    for (const listener of listeners) listener();
  }

  return (
    <section
      aria-label={copy.label}
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-border bg-surface/95 px-4 py-4 shadow-[0_-8px_24px_rgba(26,18,38,0.08)] backdrop-blur sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {copy.body}{" "}
          <a
            href={`/${locale}/privacy`}
            className="text-accent underline underline-offset-4 transition-colors duration-200 hover:text-accent-hover"
          >
            {copy.privacy}
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="min-h-11 cursor-pointer rounded-full border border-border-strong px-5 text-sm font-medium text-primary transition-colors duration-200 hover:bg-surface-muted"
          >
            {copy.decline}
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="min-h-11 cursor-pointer rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </section>
  );
}
