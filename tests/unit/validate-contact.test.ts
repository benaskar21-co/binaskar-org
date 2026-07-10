import { describe, expect, it } from "vitest";

import { validateContactInput } from "@/lib/contact/validate-contact";

describe("validateContactInput", () => {
  it("returns field errors for short message", () => {
    const result = validateContactInput("en", {
      name: "Test",
      email: "test@example.com",
      message: "short",
      website: "",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors?.message).toBeTruthy();
    }
  });

  it("accepts valid contact data", () => {
    const result = validateContactInput("en", {
      name: "Test User",
      email: "test@example.com",
      message: "This is a valid inquiry message.",
      website: "",
    });

    expect(result.ok).toBe(true);
  });
});
