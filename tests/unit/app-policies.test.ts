import { describe, expect, it } from "vitest";

import { appPolicySlugs, getAppPolicy } from "@/lib/app-policies";

describe("app privacy policies", () => {
  it("publishes Ektifai under the canonical slug", () => {
    expect(appPolicySlugs).toContain("ektifai");
    expect(getAppPolicy("ektifai")?.packageName).toBe("org.binaskar.ektifai");
  });

  it("supports case-insensitive policy lookup", () => {
    expect(getAppPolicy("EKTIFAI")?.appNameAr).toBe("اكتفائي");
  });

  it("includes a prominent account-deletion section", () => {
    const policy = getAppPolicy("ektifai");
    expect(policy?.sections.some((section) => section.id === "account-deletion")).toBe(true);
  });

  it("states the auto-renew subscription terms Apple requires at a public URL", () => {
    // Guideline 3.1.2(c): these terms must be reachable outside the binary. The App
    // Store listing links here, so losing this section is a rejection, not a typo.
    const section = getAppPolicy("ektifai")?.sections.find((s) => s.id === "subscriptions");
    expect(section).toBeDefined();
    const en = [...section!.en.paragraphs, ...(section!.en.bullets ?? [])].join(" ");
    expect(en).toContain("renew automatically");
    expect(en).toContain("24 hours");
    expect(en).toContain("Apple account settings");
    const ar = [...section!.ar.paragraphs, ...(section!.ar.bullets ?? [])].join(" ");
    expect(ar).toContain("يتجدد تلقائياً");
    expect(ar).toContain("24 ساعة");
  });

  it("publishes the care support email for customers", () => {
    expect(getAppPolicy("ektifai")?.supportEmail).toBe("care@binaskar.org");
  });
});
