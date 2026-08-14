import { describe, expect, it } from "vitest";

import {
  appStoreUrl,
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
    expect(appStoreUrl("6793854538")).toBe("https://apps.apple.com/app/id6793854538");
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
