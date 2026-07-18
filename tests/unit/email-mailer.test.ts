import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Mailer, createMailer } from "@/lib/email/mailer";
import type { EmailMessage, EmailProvider, SendResult } from "@/lib/email/types";

function stubProvider(
  name: string,
  isConfigured: boolean,
  result: SendResult
): EmailProvider & { send: ReturnType<typeof vi.fn> } {
  return {
    name,
    isConfigured: () => isConfigured,
    send: vi.fn(async () => result),
  };
}

const message: EmailMessage = {
  to: "to@example.com",
  subject: "Subject",
  text: "Body",
};

describe("Mailer", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns the first successful provider and stops the chain", async () => {
    const first = stubProvider("first", true, { ok: true, provider: "first" });
    const second = stubProvider("second", true, { ok: true, provider: "second" });
    const mailer = new Mailer([first, second]);

    const result = await mailer.send(message);

    expect(result).toEqual({ ok: true, provider: "first" });
    expect(first.send).toHaveBeenCalledOnce();
    expect(second.send).not.toHaveBeenCalled();
  });

  it("advances to the next provider when one fails", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const first = stubProvider("first", true, { ok: false, provider: "first", error: new Error("x") });
    const second = stubProvider("second", true, { ok: true, provider: "second" });

    const result = await new Mailer([first, second]).send(message);

    expect(result).toEqual({ ok: true, provider: "second" });
    expect(second.send).toHaveBeenCalledOnce();
    errorSpy.mockRestore();
  });

  it("reports a clear failure when no provider is available", async () => {
    const result = await new Mailer([]).send(message);
    expect(result.ok).toBe(false);
    expect(result.provider).toBe("none");
  });
});

describe("createMailer chain resolution", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("orders Resend before SMTP in auto mode", () => {
    vi.stubEnv("EMAIL_PROVIDER", "auto");
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("SMTP_USER", "user@example.com");
    vi.stubEnv("SMTP_PASS", "secret");

    expect(createMailer().chain).toEqual(["resend", "smtp"]);
  });

  it("falls back to the console provider outside production when nothing is configured", () => {
    vi.stubEnv("EMAIL_PROVIDER", "auto");
    vi.stubEnv("NODE_ENV", "development");

    expect(createMailer().chain).toEqual(["console"]);
  });

  it("uses only the forced provider", () => {
    vi.stubEnv("EMAIL_PROVIDER", "smtp");
    vi.stubEnv("SMTP_USER", "user@example.com");
    vi.stubEnv("SMTP_PASS", "secret");

    expect(createMailer().chain).toEqual(["smtp"]);
  });
});
