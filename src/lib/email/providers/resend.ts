import { Resend } from "resend";

import type { EmailMessage, EmailProvider, SendResult } from "../types";

/**
 * Delivers email over the Resend HTTPS API. Works on hosts that block outbound SMTP ports
 * (e.g. Render's free plan), which is why it is the preferred provider in "auto" mode.
 *
 * Env:
 * - `RESEND_API_KEY` (required)
 * - `RESEND_FROM` or `EMAIL_FROM` — default sender; falls back to Resend's shared test sender.
 */
export class ResendProvider implements EmailProvider {
  readonly name = "resend";

  isConfigured(): boolean {
    return Boolean(process.env.RESEND_API_KEY);
  }

  private resolveFrom(message: EmailMessage): string {
    return (
      message.from ??
      process.env.RESEND_FROM ??
      process.env.EMAIL_FROM ??
      "onboarding@resend.dev"
    );
  }

  async send(message: EmailMessage): Promise<SendResult> {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { ok: false, provider: this.name, error: new Error("RESEND_API_KEY is not set") };
    }

    try {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from: this.resolveFrom(message),
        to: message.to,
        replyTo: message.replyTo,
        subject: message.subject,
        text: message.text,
        html: message.html,
      });

      if (error) {
        return { ok: false, provider: this.name, error };
      }
      return { ok: true, provider: this.name, id: data?.id };
    } catch (error) {
      return { ok: false, provider: this.name, error };
    }
  }
}
