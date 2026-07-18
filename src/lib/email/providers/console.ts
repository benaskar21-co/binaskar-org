import type { EmailMessage, EmailProvider, SendResult } from "../types";

/**
 * Development fallback. Logs the message to the console instead of delivering it, so email-dependent
 * flows stay testable locally without any provider credentials. Never used in production by default.
 */
export class ConsoleProvider implements EmailProvider {
  readonly name = "console";

  isConfigured(): boolean {
    return true;
  }

  async send(message: EmailMessage): Promise<SendResult> {
    console.info(
      `[email:console] to=${JSON.stringify(message.to)} subject=${message.subject}\n${message.text}`
    );
    return { ok: true, provider: this.name };
  }
}
