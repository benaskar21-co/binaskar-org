import { Reveal } from "@/components/reveal";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { sections } from "@/lib/sections";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
  variant?: "light" | "dark";
  id?: string;
};

export function SectionHeader({
  title,
  subtitle,
  centered = false,
  id,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span
        className={`inline-block h-1 w-12 rounded-full bg-gradient-to-r from-accent to-transparent ${
          centered ? "mx-auto" : ""
        }`}
        aria-hidden="true"
      />
      <h2
        id={id}
        className="mt-5 font-display text-3xl font-semibold text-white sm:text-4xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-lg leading-relaxed text-brand-100/75">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

type ServicesSectionProps = {
  locale: Locale;
};

const serviceKeys = ["cto", "strategy", "architecture", "ai", "product"] as const;

export function ServicesSection({ locale }: ServicesSectionProps) {
  const messages = getMessages(locale);

  return (
    <section
      id={sections.services}
      className="scroll-mt-24 bg-surface py-24"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            id="services-heading"
            title={messages.services.title}
            subtitle={messages.services.subtitle}
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((key, index) => {
            const item = messages.services.items[key];
            return (
              <Reveal
                as="article"
                key={key}
                delay={index * 70}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface-2/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-2"
              >
                <span
                  className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-colors duration-300 group-hover:bg-accent/10"
                  aria-hidden="true"
                />
                <span className="text-sm font-bold tabular-nums text-accent-strong">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-100/70">
                  {item.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
