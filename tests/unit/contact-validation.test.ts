import { describe, expect, it } from "vitest";

import { contactSchema } from "@/lib/validation/contact";

describe("contactSchema", () => {
  it("accepts valid contact data", () => {
    const result = contactSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      company: "Acme",
      message: "Hello, I need consulting.",
      website: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short message", () => {
    const result = contactSchema.safeParse({
      name: "Test",
      email: "test@example.com",
      message: "short",
      website: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects honeypot filled", () => {
    const result = contactSchema.safeParse({
      name: "Bot",
      email: "bot@spam.com",
      message: "Spam message here",
      website: "http://spam.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      name: "Test",
      email: "not-an-email",
      message: "Valid length message here",
      website: "",
    });
    expect(result.success).toBe(false);
  });
});
