import { describe, expect, it } from "vitest";

import {
  applicationCategory,
  appStoreUrl,
  DEFAULT_CAMPAIGN,
  marketingChannels,
  isInstallableSoftware,
  liveExtensionStores,
  operatingSystems,
  parseAttribution,
  detectPlatform,
  getAppLinks,
  playStoreUrl,
  storeUrlForPlatform,
} from "@/lib/app-links";

describe("app store links", () => {
  it("resolves Ektifai with both stores", () => {
    const links = getAppLinks("ektifai");
    expect(links?.iosAppId).toBe("6793854538");
    expect(links?.androidPackage).toBe("org.binaskar.ektifai");
  });

  it("accepts a slug typed in caps, since links get retyped by hand", () => {
    expect(getAppLinks("EKTIFAI")?.slug).toBe("ektifai");
  });

  it("returns null for an unknown slug so the page can fall back instead of 404", () => {
    expect(getAppLinks("not-an-app")).toBeNull();
  });

  it("builds the store URLs Apple and Google actually serve", () => {
    expect(appStoreUrl("6793854538")).toBe(
      "https://apps.apple.com/sa/app/id6793854538",
    );
    expect(playStoreUrl("org.binaskar.ektifai")).toBe(
      "https://play.google.com/store/apps/details?id=org.binaskar.ektifai",
    );
  });

  describe("platform detection", () => {
    it("routes iPhone and Android to their own stores", () => {
      const iphone =
        "Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15";
      const android = "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36";
      expect(detectPlatform(iphone)).toBe("ios");
      expect(detectPlatform(android)).toBe("android");
    });

    /**
     * iPadOS 13+ reports a desktop Macintosh UA. Without the touch-point check every
     * iPad visitor lands on the fallback page instead of the App Store.
     */
    it("treats a touch-capable Macintosh as iPadOS", () => {
      const ipad = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15";
      expect(detectPlatform(ipad, 5)).toBe("ios");
      expect(detectPlatform(ipad, 0)).toBe("other");
    });

    it("leaves desktop and crawlers on the page rather than guessing", () => {
      expect(detectPlatform("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")).toBe("other");
      expect(detectPlatform("Googlebot/2.1 (+http://www.google.com/bot.html)")).toBe("other");
      expect(detectPlatform("")).toBe("other");
    });
  });

  describe("redirect target", () => {
    const links = getAppLinks("ektifai")!;

    it("sends each platform to its own store", () => {
      expect(storeUrlForPlatform(links, "ios")).toContain("apps.apple.com");
      expect(storeUrlForPlatform(links, "android")).toContain("play.google.com");
    });

    it("does not redirect desktop anywhere", () => {
      expect(storeUrlForPlatform(links, "other")).toBeNull();
    });

    it("does not redirect a platform the app has not shipped on", () => {
      const iosOnly = { ...links, androidPackage: null };
      expect(storeUrlForPlatform(iosOnly, "android")).toBeNull();
    });
  });
});

describe("campaign attribution", () => {
  it("expands a channel token into Apple's ct and Play's utm referrer", () => {
    const attribution = parseAttribution("?c=ig_bio");
    expect(attribution).toEqual({
      token: "ig_bio",
      source: "instagram",
      medium: "bio",
      campaign: DEFAULT_CAMPAIGN,
    });

    expect(appStoreUrl("6793854538", attribution)).toBe(
      "https://apps.apple.com/sa/app/id6793854538?ct=ig_bio&mt=8",
    );
    // The utm string is one parameter value: its separators must arrive encoded.
    expect(playStoreUrl("org.binaskar.ektifai", attribution)).toBe(
      "https://play.google.com/store/apps/details?id=org.binaskar.ektifai" +
        "&referrer=utm_source%3Dinstagram%26utm_medium%3Dbio%26utm_campaign%3Dwein_rah_ratbak",
    );
  });

  it("maps every documented bio channel to its own source", () => {
    expect(marketingChannels).toEqual(["ig_bio", "tt_bio", "sc_bio"]);
    expect(parseAttribution("?c=tt_bio")?.source).toBe("tiktok");
    expect(parseAttribution("?c=sc_bio")?.source).toBe("snapchat");
  });

  it("accepts ct= as an alias and is case-insensitive", () => {
    expect(parseAttribution("?ct=IG_BIO")?.source).toBe("instagram");
  });

  it("still attributes an unregistered token instead of dropping it", () => {
    expect(parseAttribution("?c=x_bio")).toMatchObject({
      source: "x_bio",
      medium: "onelink",
    });
  });

  it("allows naming a different campaign", () => {
    expect(parseAttribution("?c=ig_bio&campaign=ramadan_2027")?.campaign).toBe(
      "ramadan_2027",
    );
  });

  it("drops malformed tokens rather than forwarding them into a store URL", () => {
    for (const search of ["", "?c=", "?c=a b", "?c=<script>", "?c=" + "a".repeat(41)]) {
      expect(parseAttribution(search)).toBeNull();
    }
    // No token means the plain store URL, unchanged.
    expect(appStoreUrl("6793854538", null)).toBe(
      "https://apps.apple.com/sa/app/id6793854538",
    );
  });

  it("carries attribution through the platform redirect", () => {
    const links = getAppLinks("ektifai")!;
    const attribution = parseAttribution("?c=sc_bio");
    expect(storeUrlForPlatform(links, "ios", attribution)).toContain("ct=sc_bio");
    expect(storeUrlForPlatform(links, "android", attribution)).toContain(
      "utm_source%3Dsnapchat",
    );
  });
});

describe("app page SEO content", () => {
  it("leaves apps without a seo block untouched", () => {
    // Client products stay as they were; only our own products get copy.
    for (const slug of ["hido", "minnha"]) {
      expect(getAppLinks(slug)!.seo).toBeUndefined();
    }
  });

  it("gives Ektifai problem-focused copy, not brand copy", () => {
    const seo = getAppLinks("ektifai")!.seo!;
    // The old title was "تحميل اكتفائي" — only searched by people who already
    // know the app. The new one has to lead with the problem instead.
    expect(seo.titleAr).not.toContain("تحميل");
    expect(seo.titleAr).toContain("راتب");
    expect(seo.sections).toHaveLength(5);
    expect(seo.faq).toHaveLength(6);
  });

  it("carries enough Arabic prose to rank", () => {
    const seo = getAppLinks("ektifai")!.seo!;
    const words = [
      ...seo.sections!.flatMap((s) => [s.headingAr, s.bodyAr]),
      ...seo.faq!.flatMap((f) => [f.qAr, f.aAr]),
    ]
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;
    expect(words).toBeGreaterThan(500);
  });

  it("writes each language natively rather than mirroring one into the other", () => {
    const seo = getAppLinks("ektifai")!.seo!;
    for (const section of seo.sections!) {
      expect(section.bodyAr).not.toEqual(section.bodyEn);
      expect(section.bodyEn.length).toBeGreaterThan(40);
    }
  });

  it("maps categories to schema.org application types", () => {
    expect(applicationCategory(getAppLinks("ektifai")!)).toBe("FinanceApplication");
    expect(applicationCategory(getAppLinks("hido")!)).toBe("TravelApplication");
    expect(applicationCategory(getAppLinks("minnha")!)).toBe("EducationApplication");
    // An extension is classified by its shape, not the subject it serves.
    expect(applicationCategory(getAppLinks("fursara")!)).toBe("BrowserApplication");
  });

  it("reports only the platforms an app actually ships on", () => {
    expect(operatingSystems(getAppLinks("ektifai")!)).toBe("iOS, Android");
    expect(operatingSystems(getAppLinks("minnha")!)).toBe("");
  });

  it("declares only browsers an extension is actually published on", () => {
    // Safari is submitted but unreleased: claiming it would advertise a 404.
    expect(operatingSystems(getAppLinks("fursara")!)).toBe("Chrome, Firefox");
    expect(liveExtensionStores(getAppLinks("fursara")!).map((s) => s.key)).toEqual([
      "chrome",
      "firefox",
    ]);
  });

  it("emits structured data for extensions but not for web-only platforms", () => {
    expect(isInstallableSoftware(getAppLinks("fursara")!)).toBe(true);
    expect(isInstallableSoftware(getAppLinks("ektifai")!)).toBe(true);
    expect(isInstallableSoftware(getAppLinks("minnha")!)).toBe(false);
  });

  it("gives Fursara problem-focused copy too", () => {
    const seo = getAppLinks("fursara")!.seo!;
    expect(seo.sections).toHaveLength(5);
    expect(seo.faq).toHaveLength(6);
    // Western digits only — the store copy's "١٠٠" would mix scripts on a line.
    const arabic = seo.sections!.map((x) => x.bodyAr).join(" ");
    expect(arabic).not.toMatch(/[٠-٩]/);
  });
});
