"use client";

import { useEffect, useState } from "react";

import {
  detectPlatform,
  storeUrlForPlatform,
  type AppStoreLinks,
} from "@/lib/app-links";

/**
 * Sends a phone straight to its store and leaves everyone else on the page.
 *
 * The page always renders first and this only replaces the location afterwards, so a
 * desktop visitor, a crawler, or anyone with JS disabled still sees both store buttons
 * instead of a blank redirect shell. `?stay=1` suppresses the jump, which is how the
 * page can be checked on a real phone without being bounced out of the browser.
 */
export function StoreRedirect({ links }: { links: AppStoreLinks }) {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("stay")) return;

    const platform = detectPlatform(
      window.navigator.userAgent,
      window.navigator.maxTouchPoints,
    );
    const url = storeUrlForPlatform(links, platform);
    if (!url) return;

    setRedirecting(true);
    // `replace`, not `assign`: Back should return to whatever linked here, not bounce
    // the visitor into the store again.
    window.location.replace(url);
  }, [links]);

  if (!redirecting) return null;

  return (
    <p className="text-sm text-secondary" role="status" aria-live="polite">
      <span lang="ar" dir="rtl">
        جاري تحويلك إلى المتجر…
      </span>
      <span className="mx-2 text-muted">·</span>
      <span lang="en" dir="ltr">
        Taking you to the store…
      </span>
    </p>
  );
}
