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
});
