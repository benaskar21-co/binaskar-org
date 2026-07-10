import { notFound } from "next/navigation";

import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata(locale, "privacy");
}

const sectionKeys = ["collect", "use", "cookies", "contact"] as const;

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const messages = getMessages(locale);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <span
          className="inline-block h-1 w-12 rounded-full bg-gradient-to-r from-accent to-transparent"
          aria-hidden="true"
        />
        <h1 className="mt-5 font-display text-4xl font-semibold text-white">
          {messages.privacy.title}
        </h1>
        <p className="mt-2 text-sm text-muted">{messages.privacy.updated}</p>

        <div className="mt-10 space-y-8">
          {sectionKeys.map((key) => {
            const section = messages.privacy.sections[key];
            return (
              <article
                key={key}
                className="rounded-2xl border border-border bg-surface/60 p-6"
              >
                <h2 className="font-display text-xl font-semibold text-accent-strong">
                  {section.title}
                </h2>
                <p className="mt-3 leading-relaxed text-brand-100/80">
                  {section.content}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
