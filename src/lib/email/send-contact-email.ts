import { sendEmail } from "./index";

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

/**
 * Project-specific wrapper: builds the contact inquiry message and delegates delivery to the
 * reusable email module. Provider selection and fallback live in `./mailer`.
 */
export async function sendContactEmail(
  payload: ContactEmailPayload
): Promise<{ sent: boolean; provider?: string }> {
  const to = process.env.CONTACT_EMAIL ?? "abdullah@binaskar.org";

  const result = await sendEmail({
    to,
    replyTo: payload.email,
    subject: `[Bin Askar] New inquiry from ${payload.name}`,
    text: buildEmailBody(payload),
  });

  if (result.ok) {
    return { sent: true, provider: result.provider };
  }

  console.error("Contact email failed to send:", result.error);
  return { sent: false };
}
