import { ConsoleProvider } from "./providers/console";
import { ResendProvider } from "./providers/resend";
import { SmtpProvider } from "./providers/smtp";
import type { EmailMessage, EmailProvider, SendResult } from "./types";

export type ProviderName = "resend" | "smtp" | "console" | "auto";

export type MailerOptions = {
  /** Which provider to use. Defaults to `EMAIL_PROVIDER` env, or "auto". */
  provider?: ProviderName;
  /** Log-only fallback when nothing is configured. Defaults to true outside production. */
  allowConsoleFallback?: boolean;
  /** Inject providers (mainly for tests). Overrides `provider` selection. */
  providers?: EmailProvider[];
};

/**
 * Sends email through an ordered list of providers, returning the first success. Delivery is
 * best-effort: a provider failure is logged and the next provider is tried.
 */
export class Mailer {
  private readonly providers: EmailProvider[];

  constructor(providers: EmailProvider[]) {
    this.providers = providers;
  }

  /** Provider names in the order they will be attempted. */
  get chain(): string[] {
    return this.providers.map((provider) => provider.name);
  }

  async send(message: EmailMessage): Promise<SendResult> {
    if (this.providers.length === 0) {
      return {
        ok: false,
        provider: "none",
        error: new Error("No email provider is configured"),
      };
    }

    let last: SendResult = {
      ok: false,
      provider: "none",
      error: new Error("No email provider was attempted"),
    };

    for (const provider of this.providers) {
      last = await provider.send(message);
      if (last.ok) {
        return last;
      }
      console.error(`[email] provider "${provider.name}" failed:`, last.error);
    }

    return last;
  }
}

function resolveChain(options?: MailerOptions): EmailProvider[] {
  if (options?.providers) {
    return options.providers;
  }

  const requested =
    options?.provider ?? (process.env.EMAIL_PROVIDER as ProviderName | undefined) ?? "auto";
  const isProduction = process.env.NODE_ENV === "production";
  const allowConsoleFallback = options?.allowConsoleFallback ?? !isProduction;

  const resend = new ResendProvider();
  const smtp = new SmtpProvider();

  const chain: EmailProvider[] = [];
  const addIfConfigured = (provider: EmailProvider) => {
    if (provider.isConfigured()) {
      chain.push(provider);
    }
  };

  switch (requested) {
    case "resend":
      addIfConfigured(resend);
      break;
    case "smtp":
      addIfConfigured(smtp);
      break;
    case "console":
      return [new ConsoleProvider()];
    case "auto":
    default:
      // Resend first: it uses HTTPS and works on hosts that block SMTP ports (e.g. Render free).
      addIfConfigured(resend);
      addIfConfigured(smtp);
      break;
  }

  if (chain.length === 0 && allowConsoleFallback) {
    chain.push(new ConsoleProvider());
  }

  return chain;
}

export function createMailer(options?: MailerOptions): Mailer {
  return new Mailer(resolveChain(options));
}
