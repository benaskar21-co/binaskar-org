import { describe, expect, it } from "vitest";

import { isValidLocale, locales, defaultLocale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/get-messages";

describe("i18n config", () => {
  it("has ar as default locale", () => {
    expect(defaultLocale).toBe("ar");
  });

  it("validates locales", () => {
    expect(isValidLocale("ar")).toBe(true);
    expect(isValidLocale("en")).toBe(true);
    expect(isValidLocale("fr")).toBe(false);
  });

  it("supports both locales", () => {
    expect(locales).toEqual(["ar", "en"]);
  });
});

describe("t() translation helper", () => {
  it("returns Arabic hero title", () => {
    const title = t("ar", "hero.title");
    expect(title).toContain("رؤية");
  });

  it("returns English hero title", () => {
    const title = t("en", "hero.title");
    expect(title.toLowerCase()).toContain("technology");
  });

  it("returns key for missing path", () => {
    expect(t("en", "missing.key")).toBe("missing.key");
  });
});
