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

  it("uses dev mode when no email provider is configured", async () => {
    const logSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const { sendContactEmail } = await import("@/lib/email/send-contact-email");

    const result = await sendContactEmail({
      name: "Test User",
      email: "test@example.com",
      message: "Hello from the contact form.",
    });

    expect(result).toEqual({ sent: true, provider: "dev" });
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });

  it("prefers SMTP when SMTP credentials are set", async () => {
    vi.stubEnv("SMTP_USER", "abdullah@binaskar.org");
    vi.stubEnv("SMTP_PASS", "secret");
    vi.stubEnv("RESEND_API_KEY", "re_test");

    const { sendContactEmail } = await import("@/lib/email/send-contact-email");
    const result = await sendContactEmail({
      name: "Visitor",
      email: "visitor@example.com",
      message: "Interested in CTO services.",
    });

    expect(result).toEqual({ sent: true, provider: "smtp" });
    expect(sendMail).toHaveBeenCalledOnce();
    expect(resendSend).not.toHaveBeenCalled();
  });

  it("falls back to Resend when SMTP fails", async () => {
    vi.stubEnv("SMTP_USER", "abdullah@binaskar.org");
    vi.stubEnv("SMTP_PASS", "secret");
    vi.stubEnv("RESEND_API_KEY", "re_test");
    sendMail.mockRejectedValueOnce(new Error("SMTP timeout"));

    const { sendContactEmail } = await import("@/lib/email/send-contact-email");
    const result = await sendContactEmail({
      name: "Visitor",
      email: "visitor@example.com",
      message: "Interested in CTO services.",
    });

    expect(result).toEqual({ sent: true, provider: "resend" });
    expect(sendMail).toHaveBeenCalledOnce();
    expect(resendSend).toHaveBeenCalledOnce();
  });
});
