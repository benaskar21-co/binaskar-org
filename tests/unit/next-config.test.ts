import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";

describe("next.config redirects", () => {
  it("only redirects locale contact routes, not /api/contact", async () => {
    const redirects = await nextConfig.redirects!();
    const contactRedirect = redirects.find((rule) =>
      String(rule.source).includes("contact")
    );

    expect(contactRedirect?.source).toBe("/:locale(ar|en)/contact");
    expect(String(contactRedirect?.source)).not.toMatch(/^\/:locale\/contact$/);
  });
});
