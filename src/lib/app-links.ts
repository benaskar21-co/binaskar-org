import { getAppPolicy } from "@/lib/app-policies";

export type StorePlatform = "ios" | "android" | "other";

export type AppStoreLinks = {
  slug: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  /** Apple's numeric App Store id. Null until the app is approved. */
  iosAppId: string | null;
  /** Play Store applicationId. Null until the app is published. */
  androidPackage: string | null;
};

/**
 * Store destinations for /apps/{slug}.
 *
 * Names come from the policy registry rather than being repeated here, so an app
 * cannot end up called one thing on its policy page and another on its download
 * page. Only the store identifiers live in this file.
 */
const APP_STORE_IDS: Record<
  string,
  { iosAppId: string | null; androidPackage: string | null; taglineAr: string; taglineEn: string }
> = {
  ektifai: {
    // Verified against Apple's lookup service for bundleId org.binaskar.ektifai,
    // not copied from a dashboard.
    iosAppId: "6793854538",
    androidPackage: "org.binaskar.ektifai",
    taglineAr: "خطّط راتبك، تابع مصروفاتك، واعرف أين يذهب مالك.",
    taglineEn: "Plan your salary, track spending, and see where your money goes.",
  },
};

export const appLinkSlugs = Object.keys(APP_STORE_IDS);

/** Case-insensitive, so a link typed in caps still resolves. */
export function getAppLinks(slug: string): AppStoreLinks | null {
  const key = slug?.trim().toLowerCase();
  const ids = APP_STORE_IDS[key];
  const policy = getAppPolicy(key);
  if (!ids || !policy) return null;
  return {
    slug: key,
    nameAr: policy.appNameAr,
    nameEn: policy.appNameEn,
    taglineAr: ids.taglineAr,
    taglineEn: ids.taglineEn,
    iosAppId: ids.iosAppId,
    androidPackage: ids.androidPackage,
  };
}

export function appStoreUrl(iosAppId: string): string {
  return `https://apps.apple.com/app/id${iosAppId}`;
}

export function playStoreUrl(androidPackage: string): string {
  return `https://play.google.com/store/apps/details?id=${androidPackage}`;
}

/**
 * Which store this visitor should land on.
 *
 * Deliberately runs in the browser off `navigator`, not from the User-Agent header on
 * the server: a redirect chosen server-side gets cached by the CDN and then served to
 * the wrong platform, and every visitor after the first lands in the wrong store.
 *
 * iPadOS 13+ reports a desktop Macintosh UA, so a Mac claiming multiple touch points
 * is treated as iOS — otherwise every iPad user is sent to the fallback page.
 */
export function detectPlatform(
  userAgent: string,
  maxTouchPoints = 0,
): StorePlatform {
  const ua = userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/i.test(ua)) return "ios";
  if (/Macintosh/i.test(ua) && maxTouchPoints > 1) return "ios";
  return "other";
}

/** The URL a visitor should be sent to, or null when there is nothing to send them to. */
export function storeUrlForPlatform(
  links: AppStoreLinks,
  platform: StorePlatform,
): string | null {
  if (platform === "ios" && links.iosAppId) return appStoreUrl(links.iosAppId);
  if (platform === "android" && links.androidPackage) {
    return playStoreUrl(links.androidPackage);
  }
  return null;
}
