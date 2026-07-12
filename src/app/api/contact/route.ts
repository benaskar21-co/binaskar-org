import { NextResponse } from "next/server";

import { processContactSubmission } from "@/lib/contact/submit-contact";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";

// Nodemailer requires the Node.js runtime; keep this route off the Edge runtime.
export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const localeValue = String(formData.get("locale") ?? defaultLocale);
  const locale = isValidLocale(localeValue) ? localeValue : defaultLocale;

  const result = await processContactSubmission(locale, {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  return NextResponse.json(result, {
    status: result.success ? 200 : 400,
  });
}
