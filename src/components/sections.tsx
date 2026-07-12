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
  variant = "light",
  id,
}: SectionHeaderProps) {
  const isDark = variant === "dark";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className={`eyebrow ${centered ? "justify-center" : ""}`} aria-hidden="true" />
      <h2
        id={id}
        className={`mt-5 max-w-3xl font-display text-4xl font-medium tracking-[-0.05em] sm:text-6xl ${
          isDark ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-3 text-lg leading-relaxed ${
            isDark ? "text-slate-300" : "text-secondary"
          }`}
        >
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
      className="scroll-mt-24 bg-surface py-24 sm:py-32"
      aria-labelledby="services-heading"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            id="services-heading"
            title={messages.services.title}
            subtitle={messages.services.subtitle}
          />
        </Reveal>
        <div className="mt-16 grid border-t border-s border-border sm:grid-cols-2 lg:grid-cols-6">
          {serviceKeys.map((key, index) => {
            const item = messages.services.items[key];
            return (
              <Reveal
                as="article"
                key={key}
                delay={index * 70}
                className={`group min-h-72 border-e border-b border-border bg-surface p-7 transition duration-300 hover:bg-background lg:p-9 ${index === 0 ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-2"}`}
              >
                <span className="text-xs font-bold tabular-nums text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-12 max-w-sm font-display text-2xl font-medium text-primary sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-secondary">
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
