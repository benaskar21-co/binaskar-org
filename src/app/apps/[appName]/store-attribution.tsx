"use client";

import { useEffect } from "react";

import {
  appStoreUrl,
  parseAttribution,
  playStoreUrl,
  type AppStoreLinks,
} from "@/lib/app-links";

/**
 * Re-tags the visible store buttons with campaign attribution.
 *
 * The page is statically prerendered, so the server has no way to know which
 * campaign link the visitor followed; the buttons ship with plain store URLs
 * that work for everyone, including crawlers and no-JS visitors. When a
 * campaign token is present this rewrites those hrefs on the client, which is
 * why it edits attributes rather than rendering the buttons itself: doing it
 * this way keeps the untagged links in the static HTML as the fallback.
 *
 * Phones are usually redirected before reaching the buttons — this covers the
 * desktop click and anyone who arrived with `?stay=1`.
 */
export function StoreAttribution({ links }: { links: AppStoreLinks }) {
  useEffect(() => {
    const attribution = parseAttribution(window.location.search);
    if (!attribution) return;

    const retag = (selector: string, url: string) => {
      document
        .querySelectorAll<HTMLAnchorElement>(`a[data-store-link="${selector}"]`)
        .forEach((anchor) => {
          anchor.href = url;
        });
    };

    if (links.iosAppId) {
      retag("ios", appStoreUrl(links.iosAppId, attribution));
    }
    if (links.androidPackage) {
      retag("android", playStoreUrl(links.androidPackage, attribution));
    }
  }, [links]);

  return null;
}
