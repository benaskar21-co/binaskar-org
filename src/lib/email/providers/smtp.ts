import nodemailer from "nodemailer";

import type { EmailMessage, EmailProvider, SendResult } from "../types";

const SMTP_TIMEOUT_MS = 12_000;

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  auth: { user: string; pass: string };
  connectionTimeout: number;
  greetingTimeout: number;
  socketTimeout: number;
};

function readSmtpConfig(): SmtpConfig | null {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;

  return {
    host: process.env.SMTP_HOST ?? "mail.privateemail.com",
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
  };
}

/**
 * Delivers email over SMTP via nodemailer. Requires an outbound SMTP connection, so it will not
 * work on hosts that block SMTP ports — prefer {@link ResendProvider} there.
 *
 * Env: `SMTP_USER`, `SMTP_PASS` (required); `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`,
 * `SMTP_FROM_NAME`/`EMAIL_FROM` (optional).
 */
export class SmtpProvider implements EmailProvider {
  readonly name = "smtp";

  isConfigured(): boolean {
    return readSmtpConfig() !== null;
  }

  private resolveFrom(message: EmailMessage, user: string): string {
    if (message.from) return message.from;
    if (process.env.EMAIL_FROM) return process.env.EMAIL_FROM;
    const name = process.env.SMTP_FROM_NAME ?? "Notifications";
    return `${name} <${user}>`;
  }

  async send(message: EmailMessage): Promise<SendResult> {
    const smtp = readSmtpConfig();
    if (!smtp) {
      return { ok: false, provider: this.name, error: new Error("SMTP is not configured") };
    }

    try {
      const transporter = nodemailer.createTransport(smtp);
      const info = await transporter.sendMail({
        from: this.resolveFrom(message, smtp.auth.user),
        to: message.to,
        replyTo: message.replyTo,
        subject: message.subject,
        text: message.text,
        html: message.html,
      });
      return { ok: true, provider: this.name, id: info?.messageId };
    } catch (error) {
      return { ok: false, provider: this.name, error };
    }
  }
}
