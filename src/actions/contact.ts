"use server";

import { Resend } from "resend";

import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/get-messages";
import {
  contactSchema,
  type ContactFormState,
} from "@/lib/validation/contact";

export async function submitContactForm(
  locale: Locale,
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    message: formData.get("message"),
    website: formData.get("website") || "",
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field as keyof typeof fieldErrors]) {
        if (field === "name") {
          fieldErrors.name = t(locale, "contact.form.validation.nameRequired");
        } else if (field === "email") {
          fieldErrors.email = t(locale, "contact.form.validation.emailInvalid");
        } else if (field === "message") {
          fieldErrors.message = t(locale, "contact.form.validation.messageMin");
        }
      }
    }
    return { success: false, fieldErrors };
  }

  if (parsed.data.website) {
    return { success: true };
  }

  const { name, email, company, message } = parsed.data;
  const contactEmail =
    process.env.CONTACT_EMAIL ?? "abdullah@binaskar.org";
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey && contactEmail) {
    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: "Bin Askar Technology <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: email,
      subject: `[Bin Askar] New inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: t(locale, "contact.form.error") };
    }
  } else {
    console.info("Contact form submission (dev mode):", {
      name,
      email,
      company,
      message,
    });
  }

  return { success: true };
}
