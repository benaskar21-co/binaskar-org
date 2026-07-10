import type { Locale } from "@/lib/i18n/config";
import { sendContactEmail } from "@/lib/email/send-contact-email";
import { t } from "@/lib/i18n/get-messages";
import { validateContactInput } from "@/lib/contact/validate-contact";
import type { ContactFormState } from "@/lib/validation/contact";

type ContactSubmissionInput = {
  name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  company?: FormDataEntryValue | null;
  message: FormDataEntryValue | null;
  website?: FormDataEntryValue | null;
};

export async function processContactSubmission(
  locale: Locale,
  input: ContactSubmissionInput
): Promise<ContactFormState> {
  const validation = validateContactInput(locale, {
    name: input.name,
    email: input.email,
    company: input.company,
    message: input.message,
    website: input.website,
  });

  if (!validation.ok) {
    return { success: false, fieldErrors: validation.fieldErrors };
  }

  if (validation.data.website) {
    return { success: true };
  }

  const { name, email, company, message } = validation.data;
  const result = await sendContactEmail({ name, email, company, message });

  if (!result.sent) {
    return { success: false, error: t(locale, "contact.form.error") };
  }

  return { success: true };
}
