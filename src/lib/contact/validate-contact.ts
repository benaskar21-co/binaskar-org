import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/get-messages";
import {
  contactSchema,
  type ContactFormData,
  type ContactFormState,
} from "@/lib/validation/contact";

type ContactInput = {
  name: unknown;
  email: unknown;
  company?: unknown;
  message: unknown;
  website?: unknown;
};

export function mapContactFieldErrors(
  locale: Locale,
  issues: { path: PropertyKey[] }[]
): ContactFormState["fieldErrors"] {
  const fieldErrors: ContactFormState["fieldErrors"] = {};

  for (const issue of issues) {
    const field = issue.path[0];
    if (typeof field !== "string" || fieldErrors[field as keyof ContactFormData]) {
      continue;
    }

    if (field === "name") {
      fieldErrors.name = t(locale, "contact.form.validation.nameRequired");
    } else if (field === "email") {
      fieldErrors.email = t(locale, "contact.form.validation.emailInvalid");
    } else if (field === "message") {
      fieldErrors.message = t(locale, "contact.form.validation.messageMin");
    }
  }

  return fieldErrors;
}

export function validateContactInput(
  locale: Locale,
  input: ContactInput
):
  | { ok: true; data: ContactFormData }
  | { ok: false; fieldErrors: ContactFormState["fieldErrors"] } {
  const raw = {
    name: input.name,
    email: input.email,
    company: input.company || undefined,
    message: input.message,
    website: input.website || "",
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: mapContactFieldErrors(locale, parsed.error.issues),
    };
  }

  return { ok: true, data: parsed.data };
}
