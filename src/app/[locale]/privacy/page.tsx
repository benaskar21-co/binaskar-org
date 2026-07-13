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
    <section className="bg-background py-20 sm:py-28 lg:py-32">
      <div className="section-shell max-w-5xl">
        <p className="eyebrow">{messages.meta.siteName}</p>
        <h1 className="mt-5 max-w-3xl font-display text-[clamp(3rem,7vw,6rem)] font-medium leading-none tracking-[-0.06em] text-primary">
          {messages.privacy.title}
        </h1>
        <p className="mt-5 text-sm font-semibold text-muted-foreground">
          {messages.privacy.updated}
        </p>

        <div className="mt-14 border-t border-border-strong">
          {sectionKeys.map((key, index) => {
            const section = messages.privacy.sections[key];
            return (
              <article
                key={key}
                className="grid gap-4 border-b border-border py-8 sm:grid-cols-[4rem_0.7fr_1.3fr] sm:gap-8 sm:py-10"
              >
                <span className="font-display text-xl font-medium tabular-nums text-accent" aria-hidden="true">
                  0{index + 1}
                </span>
                <h2 className="font-display text-2xl font-medium tracking-[-0.035em] text-primary">
                  {section.title}
                </h2>
                <p className="max-w-xl leading-7 text-secondary">
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
