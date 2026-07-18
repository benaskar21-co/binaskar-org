# Email module (`src/lib/email`)

A small, framework-agnostic email layer designed to be **copied into any Node/Next.js project**.
It has no project-specific logic — configuration comes entirely from environment variables.

## Reuse in another project

1. Copy the whole `src/lib/email/` folder.
2. Install the providers you need: `npm i resend` and/or `npm i nodemailer` (`npm i -D @types/nodemailer`).
3. Set the env vars below.
4. Send:

```ts
import { sendEmail } from "@/lib/email";

await sendEmail({
  to: "someone@example.com",
  subject: "Hello",
  text: "Plain-text body (always required)",
  html: "<p>Optional HTML body</p>",
  replyTo: "visitor@example.com",
});
```

`sendEmail` returns `{ ok: true, provider, id? }` or `{ ok: false, provider, error }`. It never
throws for delivery failures, so callers can treat email as best-effort.

## Environment variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `EMAIL_PROVIDER` | `resend` \| `smtp` \| `console` \| `auto` | `auto` |
| `EMAIL_FROM` | Default sender for any provider | provider-specific |
| `RESEND_API_KEY` | Resend API key | — |
| `RESEND_FROM` | Resend sender (overrides `EMAIL_FROM`) | `onboarding@resend.dev` |
| `SMTP_USER` / `SMTP_PASS` | SMTP credentials | — |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | SMTP connection | `mail.privateemail.com` / `465` / `true` |
| `SMTP_FROM_NAME` | Display name for the SMTP sender | `Notifications` |

### Provider selection

- **`auto`** (default): tries **Resend first**, then **SMTP**. Resend uses HTTPS and works on hosts
  that block outbound SMTP ports (e.g. Render's free plan) — this is why it is preferred.
- **`resend`** / **`smtp`**: force a single provider.
- **`console`**: log the message instead of sending (handy for local dev / CI).
- When nothing is configured, it falls back to the console provider **outside production only**.

## Extending

Add a provider by implementing `EmailProvider` (`name`, `isConfigured()`, `send()`) in
`providers/`, then include it in `mailer.ts`'s `resolveChain`. Keep providers self-contained: they
read their own env and must return a `SendResult` rather than throwing.
