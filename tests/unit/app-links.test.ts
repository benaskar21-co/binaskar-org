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
    // A store URL with no Apple tokens at all stays bare.
    expect(
      appStoreUrl({
        iosAppId: "6793854538",
        iosProviderToken: null,
        iosDefaultCampaign: null,
      }),
    ).toBe("https://apps.apple.com/sa/app/id6793854538");
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
      campaignExplicit: false,
    });

    // A named channel beats the app's default ct, and the provider token rides
    // along: losing ig_bio to web_ektifai would erase per-channel reporting.
    expect(appStoreUrl(getAppLinks("ektifai")!, attribution)).toBe(
      "https://apps.apple.com/sa/app/id6793854538?pt=129210939&ct=ig_bio&mt=8",
    );
    // The utm string is one parameter value: its separators must arrive encoded.
    expect(playStoreUrl("org.binaskar.ektifai", attribution)).toBe(
      "https://play.google.com/store/apps/details?id=org.binaskar.ektifai" +
        "&referrer=utm_source%3Dinstagram%26utm_medium%3Dbio%26utm_campaign%3Dwein_rah_ratbak",
    );
  });

  it("maps every documented bio channel to its own source", () => {
    expect(marketingChannels).toEqual(["ig_bio", "tt_bio", "sc_bio", "yt_bio"]);
    expect(parseAttribution("?c=tt_bio")?.source).toBe("tiktok");
    expect(parseAttribution("?c=sc_bio")?.source).toBe("snapchat");
    // Registered rather than left to the fallback, which would have reported
    // YouTube as source "yt_bio" on medium "onelink", apart from the others.
    expect(parseAttribution("?c=yt_bio")).toMatchObject({
      source: "youtube",
      medium: "bio",
    });
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
    // No channel token still attributes as plain web traffic — this is the
    // exact URL marketing asked the iOS redirect to produce.
    expect(appStoreUrl(getAppLinks("ektifai")!, null)).toBe(
      "https://apps.apple.com/sa/app/id6793854538?pt=129210939&ct=web_ektifai&mt=8",
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
    // All three of Fursara's listings are live (Apple id 6802211692 verified
    // against the lookup API 2026-09-16). The point of the assertion is that
    // the string is derived from `live`, not hardcoded — flipping a store back
    // to unreleased must drop it rather than advertise a 404.
    expect(operatingSystems(getAppLinks("fursara")!)).toBe(
      "Chrome, Firefox, Safari",
    );

    const unreleasedSafari = {
      ...getAppLinks("fursara")!,
      extensionStores: getAppLinks("fursara")!.extensionStores!.map((store) =>
        store.key === "safari" ? { ...store, live: false } : store,
      ),
    };
    expect(operatingSystems(unreleasedSafari)).toBe("Chrome, Firefox");
    expect(liveExtensionStores(unreleasedSafari).map((s) => s.key)).toEqual([
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

describe("Apple provider token", () => {
  it("produces marketing's exact untagged iOS URL for Ektifai", () => {
    expect(storeUrlForPlatform(getAppLinks("ektifai")!, "ios", null)).toBe(
      "https://apps.apple.com/sa/app/id6793854538?pt=129210939&ct=web_ektifai&mt=8",
    );
  });

  it("never puts our provider token on a client's app", () => {
    const hido = getAppLinks("hido")!;
    expect(hido.iosProviderToken).toBeNull();
    const url = storeUrlForPlatform(hido, "ios", parseAttribution("?c=ig_bio"))!;
    expect(url).not.toContain("pt=");
    expect(url).toBe("https://apps.apple.com/sa/app/id6477162077?ct=ig_bio&mt=8");
  });

  it("keeps Apple-only params out of the Android link", () => {
    const android = storeUrlForPlatform(getAppLinks("ektifai")!, "android", null)!;
    // Android carries a Play referrer instead; pt/ct/mt are Apple's alone.
    for (const p of ["pt=", "&ct=", "mt=8"]) expect(android).not.toContain(p);
  });
});

describe("Android web-redirect attribution", () => {
  const play = "https://play.google.com/store/apps/details?id=org.binaskar.ektifai";
  const referrer = (url: string) =>
    decodeURIComponent(new URL(url).searchParams.get("referrer") ?? "");

  it("attributes an untagged Android install from the website", () => {
    // Previously bare: Play Console filed these as organic, so iOS website
    // traffic was measured and Android website traffic was not.
    const url = storeUrlForPlatform(getAppLinks("ektifai")!, "android", null)!;
    expect(url).toBe(
      `${play}&referrer=utm_source%3Dweb%26utm_medium%3Dredirect%26utm_campaign%3Dektifai_sep`,
    );
  });

  it("keeps the channel as the source while naming the path", () => {
    const url = storeUrlForPlatform(
      getAppLinks("ektifai")!,
      "android",
      parseAttribution("?c=ig_bio"),
    )!;
    // source is the mapped platform, not the raw ig_bio token: one platform
    // must not appear under two source names across the two paths.
    expect(referrer(url)).toBe(
      "utm_source=instagram&utm_medium=redirect&utm_campaign=ektifai_sep",
    );
  });

  it("still lets an explicit ?campaign= win", () => {
    const url = storeUrlForPlatform(
      getAppLinks("ektifai")!,
      "android",
      parseAttribution("?c=ig_bio&campaign=ramadan_2027"),
    )!;
    expect(referrer(url)).toContain("utm_campaign=ramadan_2027");
  });

  it("encodes the referrer once, as Play requires", () => {
    const url = storeUrlForPlatform(getAppLinks("ektifai")!, "android", null)!;
    const raw = new URL(url).search;
    // Inner separators arrive percent-encoded; decoding once yields real ones.
    expect(raw).toContain("utm_source%3Dweb%26utm_medium");
    expect(raw).not.toContain("utm_source=web&utm_medium");
  });

  it("leaves a client app's Play link alone", () => {
    const hido = getAppLinks("hido")!;
    expect(hido.androidRedirect).toBeNull();
    expect(storeUrlForPlatform(hido, "android", null)).toBe(
      "https://play.google.com/store/apps/details?id=com.hido.hidoapp",
    );
  });

  it("does not leak Android utm into the iOS branch", () => {
    const ios = storeUrlForPlatform(getAppLinks("ektifai")!, "ios", null)!;
    expect(ios).toBe(
      "https://apps.apple.com/sa/app/id6793854538?pt=129210939&ct=web_ektifai&mt=8",
    );
    expect(ios).not.toContain("referrer");
  });
});
