import { getAppPolicy } from "@/lib/app-policies";

export type StorePlatform = "ios" | "android" | "other";

export type ExtensionStore = {
  key: "chrome" | "firefox" | "safari";
  /** Permanent listing URL. AMO slugs and Apple ids are fixed at submission. */
  url: string;
  /** False while the listing is still in review — shown as "in review", never linked. */
  live: boolean;
};

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
  /**
   * Browser-extension listings (Chrome Web Store / AMO / App Store), for products
   * that ship as an extension rather than a phone app. Ordered as displayed.
   */
  extensionStores: ExtensionStore[] | null;
  /** Privacy policy hosted outside this site (product subdomains). */
  privacyUrl: string | null;
  /** Slug under /policy when the policy is hosted on this site (our own apps only). */
  policySlug: string | null;
  /**
   * True for products Bin Askar builds and operates itself (shown on the landing
   * page); false for client products we led (shown as case studies).
   */
  own: boolean;
};

/** The products we build and run ourselves, in landing-page order. */
export function getOwnApps(): AppStoreLinks[] {
  return appLinkSlugs
    .map((slug) => getAppLinks(slug))
    .filter((app): app is AppStoreLinks => app !== null && app.own);
}

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
    extensionStores: null,
    privacyUrl: null,
    policySlug: "ektifai",
    own: true,
  },
  fursara: {
    nameAr: "فُرصارا",
    nameEn: "Fursara",
    taglineAr: "مساعد التقديم على الوظائف داخل متصفحك.",
    taglineEn: "Your job-application assistant, inside the browser.",
    descriptionAr:
      "إضافة متصفح تملأ حقول طلبات التوظيف من ملفك الشخصي بنقرة واحدة، وتكتب مسوّدات الإجابات النصية بالذكاء الاصطناعي لتراجعها، وتقارن سيرتك الذاتية بإعلان الوظيفة بدرجة توافق وسببها — لا تُرسل شيئًا حتى تُرسله أنت.",
    descriptionEn:
      "A browser extension that fills job-application fields from your profile in one click, drafts written answers with AI for your review, and scores your CV against the open job posting — nothing is submitted until you submit it.",
    categoryAr: "إضافة متصفح · التوظيف",
    categoryEn: "Browser extension · Careers",
    icon: "/apps/fursara.png",
    iconShape: "square",
    website: "https://fursara.binaskar.org",
    iosAppId: null,
    androidPackage: null,
    // Mirrors app/lib/extension-stores.ts in the fursati repo (the flip-point).
    // Chrome live 2026-08-17, Firefox/AMO live 2026-08-19; the Apple id is
    // permanent but still in review — never linked until it goes live.
    extensionStores: [
      {
        key: "chrome",
        url: "https://chromewebstore.google.com/detail/ajpnpplmkilneffbjnnlkelbppnmldid",
        live: true,
      },
      {
        key: "firefox",
        url: "https://addons.mozilla.org/firefox/addon/fursara/",
        live: true,
      },
      {
        key: "safari",
        url: "https://apps.apple.com/app/id6802211692",
        live: false,
      },
    ],
    privacyUrl: "https://fursara.binaskar.org/ar/privacy",
    policySlug: null,
    own: true,
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
    extensionStores: null,
    privacyUrl: null,
    policySlug: null,
    own: false,
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
    extensionStores: null,
    privacyUrl: null,
    policySlug: null,
    own: false,
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

/**
 * Campaign attribution carried from one onelink into both stores.
 *
 * Apple and Google disagree about how attribution travels: Apple reads a single
 * opaque Campaign Token (`ct`) in App Analytics, while Google expects a whole
 * urlencoded utm string in `referrer` that the Play Install Referrer API hands
 * back to the app. One token in our URL therefore has to expand into both shapes.
 */
export type Attribution = {
  /** Apple Campaign Token, verbatim — also the Play utm_source fallback. */
  token: string;
  source: string;
  medium: string;
  campaign: string;
};

/** Saudi storefront: the market these apps are published and marketed for. */
const APPLE_STOREFRONT = "sa";

/** Current campaign, used when a link does not name its own. */
export const DEFAULT_CAMPAIGN = "wein_rah_ratbak";

/**
 * Channel tokens marketing puts in bios. The token is what they swap per channel;
 * the mapping turns it into the utm triple Play needs.
 */
const CHANNELS: Record<string, { source: string; medium: string }> = {
  ig_bio: { source: "instagram", medium: "bio" },
  tt_bio: { source: "tiktok", medium: "bio" },
  sc_bio: { source: "snapchat", medium: "bio" },
};

export const marketingChannels = Object.keys(CHANNELS);

/**
 * Tokens end up inside URLs we hand to the stores, so anything outside this
 * shape is dropped rather than forwarded — a junk or hostile value must never
 * reach a store URL, and losing attribution is better than breaking the link.
 */
const TOKEN_PATTERN = /^[a-z0-9_-]{1,40}$/i;

/**
 * Reads the channel off our own onelink. `c` is the documented parameter;
 * `ct` is accepted too because it is Apple's own name for the same thing and
 * marketing reaches for it by habit. An unregistered but well-formed token
 * still attributes: source falls back to the token itself.
 */
export function parseAttribution(
  search: string | URLSearchParams,
): Attribution | null {
  const params =
    typeof search === "string" ? new URLSearchParams(search) : search;
  const raw = (params.get("c") ?? params.get("ct") ?? "").trim();
  if (!TOKEN_PATTERN.test(raw)) return null;

  const token = raw.toLowerCase();
  const known = CHANNELS[token];
  const requested = (params.get("campaign") ?? "").trim();
  return {
    token,
    source: known?.source ?? token,
    medium: known?.medium ?? "onelink",
    campaign: TOKEN_PATTERN.test(requested)
      ? requested.toLowerCase()
      : DEFAULT_CAMPAIGN,
  };
}

export function appStoreUrl(
  iosAppId: string,
  attribution?: Attribution | null,
): string {
  const url = `https://apps.apple.com/${APPLE_STOREFRONT}/app/id${iosAppId}`;
  if (!attribution) return url;
  // mt=8 (mobile software) is legacy but harmless, and marketing's existing
  // links carry it — keeping it means our links match theirs character for
  // character when they audit a campaign.
  return `${url}?ct=${encodeURIComponent(attribution.token)}&mt=8`;
}

export function playStoreUrl(
  androidPackage: string,
  attribution?: Attribution | null,
): string {
  const url = `https://play.google.com/store/apps/details?id=${androidPackage}`;
  if (!attribution) return url;
  // The whole utm string is one parameter value, so it is encoded as a unit:
  // the inner separators must arrive at Play as %3D/%26, not as real =/&.
  const referrer = `utm_source=${attribution.source}&utm_medium=${attribution.medium}&utm_campaign=${attribution.campaign}`;
  return `${url}&referrer=${encodeURIComponent(referrer)}`;
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
  attribution?: Attribution | null,
): string | null {
  if (platform === "ios" && links.iosAppId) {
    return appStoreUrl(links.iosAppId, attribution);
  }
  if (platform === "android" && links.androidPackage) {
    return playStoreUrl(links.androidPackage, attribution);
  }
  // Extension products: on iOS every browser is WebKit, so the extension arrives
  // through the App Store; on Android only Firefox can run extensions at all.
  // Desktop always stays on the page. Redirect only to LIVE listings — an
  // in-review URL is a guaranteed 404.
  if (links.extensionStores) {
    const target =
      platform === "ios"
        ? links.extensionStores.find((s) => s.key === "safari")
        : platform === "android"
          ? links.extensionStores.find((s) => s.key === "firefox")
          : undefined;
    if (target?.live) return target.url;
  }
  return null;
}
