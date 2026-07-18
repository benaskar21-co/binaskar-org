/**
 * Framework-agnostic email contracts. This module has no project-specific logic, so it can be
 * copied into any Node/Next.js project as-is. Configuration is read entirely from env vars.
 */

export type EmailAddress = string;

export type EmailMessage = {
  to: EmailAddress | EmailAddress[];
  subject: string;
  /** Plain-text body. Always required so providers that reject html-only payloads still deliver. */
  text: string;
  html?: string;
  replyTo?: EmailAddress;
  /** Overrides the provider's default sender ("Name <addr>" or a bare address). */
  from?: EmailAddress;
};

export type SendResult =
  | { ok: true; provider: string; id?: string }
  | { ok: false; provider: string; error: unknown };

export interface EmailProvider {
  /** Stable identifier returned in {@link SendResult.provider}. */
  readonly name: string;
  /** True when the required env vars for this provider are present. */
  isConfigured(): boolean;
  /** Delivers the message. Must resolve (never throw) — transport errors are returned as results. */
  send(message: EmailMessage): Promise<SendResult>;
}
