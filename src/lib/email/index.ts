/**
 * Reusable email module. Copy `src/lib/email/` into any Node/Next.js project, set the env vars
 * (see README.md), and call `sendEmail(...)`. No project-specific logic lives here.
 */
import { createMailer } from "./mailer";
import type { EmailMessage, SendResult } from "./types";

export type { EmailAddress, EmailMessage, EmailProvider, SendResult } from "./types";
export { Mailer, createMailer } from "./mailer";
export type { MailerOptions, ProviderName } from "./mailer";
export { ResendProvider } from "./providers/resend";
export { SmtpProvider } from "./providers/smtp";
export { ConsoleProvider } from "./providers/console";

/** Convenience one-shot send using the default env-configured provider chain. */
export async function sendEmail(message: EmailMessage): Promise<SendResult> {
  return createMailer().send(message);
}
