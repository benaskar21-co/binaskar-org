import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { defaultLocale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://binaskar.org"
  ),
};

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
