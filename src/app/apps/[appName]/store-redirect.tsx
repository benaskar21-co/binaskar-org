"use client";

import { useEffect, useState } from "react";

import {
  detectPlatform,
  parseAttribution,
  storeUrlForPlatform,
  type AppStoreLinks,
} from "@/lib/app-links";

/**
 * Sends a phone straight to its store and leaves everyone else on the page.
 *
 * Behavior contract for /apps/{slug}:
 * - iPhone/iPad/Android with a matching store listing → redirected automatically.
 * - Desktop, crawlers, JS disabled, or web-only products → stay on the page.
 * - `?stay=1` suppresses the jump on phones too — share this variant when the
 *   page itself (details, both store buttons) is what people should see.
 * - `?c={channel}` carries campaign attribution into whichever store the visitor
 *   lands in, so one bio link attributes correctly on both platforms.
 *
 * The page always renders first and this only replaces the location afterwards, so
 * nobody ever gets a blank redirect shell.
 */
export function StoreRedirect({ links }: { links: AppStoreLinks }) {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("stay")) return;

    const search = window.location.search;
    const platform = detectPlatform(
      window.navigator.userAgent,
      window.navigator.maxTouchPoints,
    );
    const url = storeUrlForPlatform(links, platform, parseAttribution(search));
    if (!url) return;

    // Deferred so the state update is asynchronous relative to the effect body;
    // the status line appears in the same frame the navigation starts.
    const statusTimer = window.setTimeout(() => setRedirecting(true), 0);
    // `replace`, not `assign`: Back should return to whatever linked here, not bounce
    // the visitor into the store again.
    window.location.replace(url);
    return () => window.clearTimeout(statusTimer);
  }, [links]);

  if (!redirecting) return null;

  return (
    <p className="mb-4 text-sm text-secondary" role="status" aria-live="polite">
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
