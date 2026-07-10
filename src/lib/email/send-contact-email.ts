import nodemailer from "nodemailer";
import { Resend } from "resend";

export type ContactEmailPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

function buildEmailBody({ name, email, company, message }: ContactEmailPayload) {
  return [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");
}

function getSmtpConfig() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  return {
    host: process.env.SMTP_HOST ?? "mail.privateemail.com",
    port,
    secure,
    auth: { user, pass },
  };
}

async function sendViaPrivateEmail(
  to: string,
  payload: ContactEmailPayload
): Promise<{ ok: true } | { ok: false; error: unknown }> {
  const smtp = getSmtpConfig();
  if (!smtp) {
    return { ok: false, error: new Error("SMTP not configured") };
  }

  const fromName = process.env.SMTP_FROM_NAME ?? "Bin Askar Technology";
  const from = `${fromName} <${smtp.auth.user}>`;

  try {
    const transporter = nodemailer.createTransport(smtp);
    await transporter.sendMail({
      from,
      to,
      replyTo: payload.email,
      subject: `[Bin Askar] New inquiry from ${payload.name}`,
      text: buildEmailBody(payload),
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}

async function sendViaResend(
  to: string,
  payload: ContactEmailPayload
): Promise<{ ok: true } | { ok: false; error: unknown }> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return { ok: false, error: new Error("Resend not configured") };
  }

  const from =
    process.env.RESEND_FROM ?? "Bin Askar Technology <onboarding@resend.dev>";

  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: `[Bin Askar] New inquiry from ${payload.name}`,
    text: buildEmailBody(payload),
  });

  if (error) {
    return { ok: false, error };
  }

  return { ok: true };
}

export async function sendContactEmail(
  payload: ContactEmailPayload
): Promise<{ sent: boolean; provider?: "smtp" | "resend" | "dev" }> {
  const to = process.env.CONTACT_EMAIL ?? "abdullah@binaskar.org";

  if (getSmtpConfig()) {
    const result = await sendViaPrivateEmail(to, payload);
    if (result.ok) {
      return { sent: true, provider: "smtp" };
    }
    console.error("PrivateEmail SMTP error:", result.error);
    return { sent: false };
  }

  if (process.env.RESEND_API_KEY) {
    const result = await sendViaResend(to, payload);
    if (result.ok) {
      return { sent: true, provider: "resend" };
    }
    console.error("Resend error:", result.error);
    return { sent: false };
  }

  console.info("Contact form submission (dev mode):", payload);
  return { sent: true, provider: "dev" };
}
