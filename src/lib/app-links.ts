import { getAppPolicy } from "@/lib/app-policies";

export type StorePlatform = "ios" | "android" | "other";

export type AppStoreLinks = {
  slug: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  categoryAr: string;
  categoryEn: string;
  /** Path under /public. Store artwork for store apps, wordmark for web platforms. */
  icon: string;
  /** Square store icons get the tile treatment; wordmarks sit on a light card. */
  iconShape: "square" | "wordmark";
  /** Product website, shown for every app and the primary action for web platforms. */
  website: string | null;
  /** Apple's numeric App Store id. Null when the app is not on the App Store. */
  iosAppId: string | null;
  /** Play Store applicationId. Null when the app is not on Google Play. */
  androidPackage: string | null;
  /** Slug under /policy when the policy is hosted on this site (our own apps only). */
  policySlug: string | null;
};

/**
 * Everything /apps/{slug} needs, in one place.
 *
 * Store identifiers are verified against the stores themselves (Apple's lookup
 * service and the public Play listing), not copied from dashboards — a wrong id
 * here sends a campaign's worth of visitors to a dead page. Client products
 * (Minnha, Hido) list only what is publicly true about them; Ektifai is ours,
 * so it also carries the policy link.
 */
const APP_REGISTRY: Record<string, Omit<AppStoreLinks, "slug" | "nameAr" | "nameEn"> & {
  nameAr?: string;
  nameEn?: string;
}> = {
  ektifai: {
    // Names come from the policy registry so the download page and the policy
    // page can never disagree about what the app is called.
    taglineAr: "خطّط راتبك، تابع مصروفاتك، واعرف أين يذهب مالك.",
    taglineEn: "Plan your salary, track spending, and see where your money goes.",
    descriptionAr:
      "يجمع اكتفائي راتبك وميزانياتك ومصروفاتك في مكان واحد، لتعرف أين يذهب مالك وما المتبقي من خطتك خلال الشهر.",
    descriptionEn:
      "Ektifai brings your salary, budgets, and expenses together in one place, so you always know where your money goes and what remains in your plan.",
    categoryAr: "المالية الشخصية",
    categoryEn: "Finance",
    icon: "/apps/ektifai.jpg",
    iconShape: "square",
    website: null,
    // Verified against Apple's lookup service for bundleId org.binaskar.ektifai.
    iosAppId: "6793854538",
    androidPackage: "org.binaskar.ektifai",
    policySlug: "ektifai",
  },
  hido: {
    nameAr: "هايدو",
    nameEn: "Hido",
    taglineAr: "تجارب سياحية أصيلة يستضيفها المجتمع المحلي.",
    taglineEn: "Authentic local experiences, hosted by the community.",
    descriptionAr:
      "منصة حجز تربط الزوّار بمرشدين وتجارب من قلب المجتمع المحلي في السعودية — اكتشف التجربة، احجزها، وتنقّل عبر الخريطة في رحلة واحدة.",
    descriptionEn:
      "An on-demand booking platform connecting visitors with local guides and experiences across Saudi Arabia — discover, book, and navigate in one journey.",
    categoryAr: "السفر والسياحة",
    categoryEn: "Travel",
    icon: "/apps/hido.jpg",
    iconShape: "square",
    website: "https://hido.app",
    // App Store id 6477162077 (Hido هايدو) and the matching public Play listing.
    iosAppId: "6477162077",
    androidPackage: "com.hido.hidoapp",
    policySlug: null,
  },
  minnha: {
    nameAr: "منحة",
    nameEn: "Minnha",
    taglineAr: "منصة القبول الجامعي والابتعاث.",
    taglineEn: "University admission and scholarship services.",
    descriptionAr:
      "منصة متكاملة لخدمات القبول الجامعي والابتعاث، من اختيار الوجهة إلى مسارات دفع وخدمة موثوقة — تعمل عبر المتصفح دون تنزيل.",
    descriptionEn:
      "An integrated platform for university admission and scholarship services, from choosing a destination to reliable payment and service journeys — runs in the browser, no download needed.",
    categoryAr: "التعليم",
    categoryEn: "Education",
    icon: "/apps/minnha.png",
    iconShape: "wordmark",
    website: "https://www.minnha.sa",
    // Web platform: verified as having no App Store or Play listing.
    iosAppId: null,
    androidPackage: null,
    policySlug: null,
  },
};

export const appLinkSlugs = Object.keys(APP_REGISTRY);

/** Case-insensitive, so a link typed in caps still resolves. */
export function getAppLinks(slug: string): AppStoreLinks | null {
  const key = slug?.trim().toLowerCase();
  const entry = APP_REGISTRY[key];
  if (!entry) return null;
  const policy = entry.policySlug ? getAppPolicy(entry.policySlug) : null;
  const nameAr = policy?.appNameAr ?? entry.nameAr;
  const nameEn = policy?.appNameEn ?? entry.nameEn;
  if (!nameAr || !nameEn) return null;
  return { ...entry, slug: key, nameAr, nameEn };
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
