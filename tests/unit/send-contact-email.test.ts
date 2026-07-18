import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendMail = vi.fn();

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({ sendMail })),
  },
}));

const resendSend = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn(function MockResend() {
    return { emails: { send: resendSend } };
  }),
}));

describe("sendContactEmail", () => {
  beforeEach(() => {
    sendMail.mockReset();
    resendSend.mockReset();
    sendMail.mockResolvedValue({ messageId: "1" });
    resendSend.mockResolvedValue({ data: { id: "1" }, error: null });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("logs via the console provider when nothing is configured (non-production)", async () => {
    const logSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const { sendContactEmail } = await import("@/lib/email/send-contact-email");

    const result = await sendContactEmail({
      name: "Test User",
      email: "test@example.com",
      message: "Hello from the contact form.",
    });

    expect(result).toEqual({ sent: true, provider: "console" });
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });

  it("prefers Resend in auto mode even when SMTP is also configured", async () => {
    vi.stubEnv("SMTP_USER", "abdullah@binaskar.org");
    vi.stubEnv("SMTP_PASS", "secret");
    vi.stubEnv("RESEND_API_KEY", "re_test");

    const { sendContactEmail } = await import("@/lib/email/send-contact-email");
    const result = await sendContactEmail({
      name: "Visitor",
      email: "visitor@example.com",
      message: "Interested in CTO services.",
    });

    expect(result).toEqual({ sent: true, provider: "resend" });
    expect(resendSend).toHaveBeenCalledOnce();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("falls back to SMTP when Resend fails", async () => {
    vi.stubEnv("SMTP_USER", "abdullah@binaskar.org");
    vi.stubEnv("SMTP_PASS", "secret");
    vi.stubEnv("RESEND_API_KEY", "re_test");
    resendSend.mockResolvedValueOnce({ data: null, error: { message: "Resend down" } });

    const { sendContactEmail } = await import("@/lib/email/send-contact-email");
    const result = await sendContactEmail({
      name: "Visitor",
      email: "visitor@example.com",
      message: "Interested in CTO services.",
    });

    expect(result).toEqual({ sent: true, provider: "smtp" });
    expect(resendSend).toHaveBeenCalledOnce();
    expect(sendMail).toHaveBeenCalledOnce();
  });

  it("returns not sent when the forced provider fails with no fallback", async () => {
    vi.stubEnv("EMAIL_PROVIDER", "resend");
    vi.stubEnv("RESEND_API_KEY", "re_test");
    resendSend.mockResolvedValueOnce({ data: null, error: { message: "bad key" } });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { sendContactEmail } = await import("@/lib/email/send-contact-email");
    const result = await sendContactEmail({
      name: "Visitor",
      email: "visitor@example.com",
      message: "Interested in CTO services.",
    });

    expect(result).toEqual({ sent: false });
    expect(sendMail).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
