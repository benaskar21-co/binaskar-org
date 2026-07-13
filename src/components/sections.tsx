import { Reveal } from "@/components/reveal";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { sections } from "@/lib/sections";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  variant?: "light" | "dark";
  id?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  variant = "light",
  id,
}: SectionHeaderProps) {
  const isDark = variant === "dark";

  if (centered) {
    return (
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow ? (
          <p className="eyebrow justify-center">{eyebrow}</p>
        ) : null}
        <h2
          id={id}
          className={`mt-5 font-display text-[clamp(2.75rem,5.5vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.055em] ${
            isDark ? "text-white" : "text-primary"
          }`}
        >
          {title}
        </h2>
        {subtitle ? (
          <p className={`mx-auto mt-6 max-w-2xl text-lg leading-8 ${isDark ? "text-white/62" : "text-secondary"}`}>
            {subtitle}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[1.08fr_0.72fr] lg:items-end lg:gap-16">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2
          id={id}
          className={`mt-5 max-w-4xl font-display text-[clamp(2.75rem,5.5vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.055em] ${
            isDark ? "text-white" : "text-primary"
          }`}
        >
          {title}
        </h2>
      </div>
      {subtitle ? (
        <p className={`max-w-xl border-s ps-5 text-lg leading-8 ${isDark ? "border-white/18 text-white/62" : "border-border-strong text-secondary"}`}>
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

const serviceClasses = [
  "lg:col-span-7 lg:row-span-2 lg:min-h-[34rem]",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-6",
  "lg:col-span-6",
] as const;

function ServiceGlyph({ index }: { index: number }) {
  const paths = [
    <path key="cto" d="M5 5h14v14H5zM9 9h6v6H9z" />,
    <path key="strategy" d="M4 18 10 6l4 8 6-9M4 18h16" />,
    <path key="architecture" d="M4 19V9l8-5 8 5v10M8 19v-6h8v6" />,
    <path key="ai" d="M8 4h8v4h4v8h-4v4H8v-4H4V8h4V4Zm2 6v4m4-4v4" />,
    <path key="product" d="M5 6h14v12H5zM9 3v3m6-3v3M8 11h8" />,
  ];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      {paths[index]}
    </svg>
  );
}

export function ServicesSection({ locale }: ServicesSectionProps) {
  const messages = getMessages(locale);

  return (
    <section
      id={sections.services}
      className="scroll-mt-24 bg-surface py-24 sm:py-32 lg:py-40"
      aria-labelledby="services-heading"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            id="services-heading"
            eyebrow={messages.services.eyebrow}
            title={messages.services.title}
            subtitle={messages.services.subtitle}
          />
        </Reveal>

        <div className="mt-16 grid gap-3 lg:grid-cols-12 lg:auto-rows-fr">
          {serviceKeys.map((key, index) => {
            const item = messages.services.items[key];
            const featured = index === 0;

            return (
              <Reveal
                as="article"
                key={key}
                delay={index * 70}
                className={`group relative flex min-h-[21rem] flex-col overflow-hidden border border-border bg-background p-7 transition-colors duration-300 hover:bg-accent-soft sm:p-9 ${serviceClasses[index]}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center border border-border-strong text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-primary">
                    <ServiceGlyph index={index} />
                  </span>
                  <span className="text-xs font-bold tabular-nums tracking-[0.14em] text-secondary/60">
                    / {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className={featured ? "mt-auto pt-20" : "mt-auto pt-12"}>
                  <h3 className={`max-w-xl font-display font-medium leading-[1.08] tracking-[-0.045em] text-primary ${featured ? "text-4xl sm:text-5xl" : "text-3xl"}`}>
                    {item.title}
                  </h3>
                  <p className={`mt-5 max-w-xl leading-7 text-secondary ${featured ? "text-lg" : "text-base"}`}>
                    {item.description}
                  </p>
                  <p className="mt-7 border-t border-border pt-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-accent-hover">
                    {item.deliverable}
                  </p>
                </div>
                <span
                  className="pointer-events-none absolute -bottom-14 -end-6 font-display text-[10rem] font-medium leading-none text-primary/[0.035] transition-colors duration-300 group-hover:text-primary/[0.055]"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
