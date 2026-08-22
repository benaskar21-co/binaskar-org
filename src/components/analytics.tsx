import Script from "next/script";

import { ConsentBanner } from "@/components/consent-banner";
import {
  DEFAULT_CAMPAIGN,
  marketingChannels,
  parseAttribution,
} from "@/lib/app-links";
import { CONSENT_KEY } from "@/lib/consent";

/**
 * GA4 measurement id. Public by design — it ships in the client HTML — so the
 * real id is the default and no deploy configuration is required. The env var
 * exists to point a fork or a staging deploy at a different property, and
 * setting it empty disables analytics entirely.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-DE5K54FWZ6";

/**
 * Channel token → the campaign fields GA4 understands.
 *
 * Marketing pastes one link with our own `?c=` token; GA4 has never heard of
 * that parameter and would file every one of those visits as direct traffic.
 * The table below is derived at build time by running the real
 * `parseAttribution()` over every registered channel, so the source and medium
 * a visit is credited with here are the same ones the store links carry. Adding
 * a channel in `app-links.ts` is enough — nothing needs changing in this file.
 */
const CAMPAIGN_BY_TOKEN: Record<string, Record<string, string>> =
  Object.fromEntries(
    marketingChannels.map((token) => {
      const attribution = parseAttribution(`c=${token}`);
      return [
        token,
        {
          campaign_source: attribution?.source ?? token,
          campaign_medium: attribution?.medium ?? "onelink",
          campaign_name: attribution?.campaign ?? DEFAULT_CAMPAIGN,
        },
      ];
    }),
  );

/**
 * Google Analytics 4, site-wide, behind Consent Mode v2.
 *
 * Skipped outside production builds, and the `config` call is additionally
 * guarded on hostname: the Playwright suite runs a *production* server on
 * localhost, so NODE_ENV alone would let test runs land in the property. GA
 * only transmits on `config`, so guarding that call is enough.
 *
 * Consent starts **denied** for every visitor. Under Consent Mode v2 that does
 * not mean silence: the tag still sends cookieless pings, which GA4 uses to
 * model the traffic it was not allowed to measure directly. That is the whole
 * reason to run consent mode rather than withhold the tag until someone clicks
 * — a declined visit still informs the totals, without a cookie on the device.
 *
 * A returning visitor's stored answer is applied in the same script, before
 * `config`, so their first pageview is measured under the choice they already
 * made rather than under the default.
 *
 * GA4's enhanced measurement tracks history changes by default, so client-side
 * navigations are counted without a manual page_view on each route.
 *
 * `afterInteractive` keeps the tag off the critical path: it loads once the
 * page is usable rather than blocking first paint. The inline bootstrap is
 * emitted before the loader so that consent and campaign state are already
 * queued in `dataLayer` by the time gtag.js arrives and drains it.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production" || !GA_ID) return null;

  const bootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied'
});
gtag('set', 'ads_data_redaction', true);

try {
  if (localStorage.getItem(${JSON.stringify(CONSENT_KEY)}) === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {
  /* Storage can throw in private modes and in embedded webviews. A visitor we
     cannot read a stored answer for is treated as one who has not answered. */
}

if (!/^(localhost|127\\.0\\.0\\.1|\\[::1\\])$/.test(location.hostname)) {
  var campaigns = ${JSON.stringify(CAMPAIGN_BY_TOKEN)};
  var params = new URLSearchParams(location.search);
  var token = (params.get('c') || params.get('ct') || '').trim().toLowerCase();
  var config = {};
  if (/^[a-z0-9_-]{1,40}$/.test(token)) {
    config = campaigns[token] || {
      campaign_source: token,
      campaign_medium: 'onelink',
      campaign_name: ${JSON.stringify(DEFAULT_CAMPAIGN)}
    };
  }
  gtag('config', ${JSON.stringify(GA_ID)}, config);
}`.trim();

  return (
    <>
      <Script id="ga4-init" strategy="afterInteractive">
        {bootstrap}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <ConsentBanner />
    </>
  );
}
