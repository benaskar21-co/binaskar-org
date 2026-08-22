import Script from "next/script";

/**
 * GA4 measurement id. Public by design — it ships in the client HTML — so the
 * real id is the default and no deploy configuration is required. The env var
 * exists to point a fork or a staging deploy at a different property, and
 * setting it empty disables analytics entirely.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-DE5K54FWZ6";

/**
 * Google Analytics 4, site-wide.
 *
 * Skipped outside production builds, and the `config` call is additionally
 * guarded on hostname: the Playwright suite runs a *production* server on
 * localhost, so NODE_ENV alone would let test runs land in the property. GA
 * only transmits on `config`, so guarding that call is enough.
 *
 * GA4's enhanced measurement tracks history changes by default, so client-side
 * navigations are counted without a manual page_view on each route.
 *
 * `afterInteractive` keeps the tag off the critical path: it loads once the
 * page is usable rather than blocking first paint.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production" || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
if (!/^(localhost|127\\.0\\.0\\.1|\\[::1\\])$/.test(location.hostname)) {
  gtag('config', '${GA_ID}');
}`}
      </Script>
    </>
  );
}
