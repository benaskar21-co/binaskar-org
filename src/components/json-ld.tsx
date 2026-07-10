import type { Locale } from "@/lib/i18n/config";
import { buildJsonLd } from "@/lib/seo";

type JsonLdProps = {
  locale: Locale;
};

export function JsonLd({ locale }: JsonLdProps) {
  const data = buildJsonLd(locale);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
