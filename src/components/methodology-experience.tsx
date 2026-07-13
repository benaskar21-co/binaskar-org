import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/sections";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { sections } from "@/lib/sections";

const stepKeys = ["discover", "design", "build", "scale"] as const;
const highlightKeys = ["direction", "delivery", "architecture", "ai"] as const;

export function MethodologySection({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);

  return (
    <section
      id={sections.methodology}
      className="grain relative scroll-mt-24 overflow-hidden bg-primary py-24 text-white sm:py-32 lg:py-40"
      aria-labelledby="methodology-heading"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="section-shell relative z-10">
        <Reveal>
          <SectionHeader
            id="methodology-heading"
            eyebrow={messages.methodology.eyebrow}
            title={messages.methodology.title}
            subtitle={messages.methodology.subtitle}
            variant="dark"
          />
        </Reveal>

        <ol className="relative mt-16 grid border-s border-white/16 sm:grid-cols-2 xl:grid-cols-4">
          {stepKeys.map((key, index) => {
            const step = messages.methodology.steps[key];
            const stepNumber = String(index + 1).padStart(2, "0");

            return (
              <Reveal
                as="li"
                key={key}
                delay={index * 80}
                className="relative"
              >
                <article className="group flex h-full min-h-[19rem] flex-col border-e border-b border-white/16 bg-white/[0.025] p-6 transition-colors duration-300 hover:bg-white/[0.075] sm:min-h-[24rem] sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-medium tabular-nums text-accent">
                      {stepNumber}
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full border border-accent transition-colors duration-300 group-hover:bg-accent" aria-hidden="true" />
                  </div>
                  <div className="mt-auto pt-16">
                    <h3 className="font-display text-3xl font-medium tracking-[-0.045em] text-white">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-white/60">
                      {step.description}
                    </p>
                    <p className="mt-7 border-t border-white/14 pt-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-accent">
                      {step.output}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function ExperienceSection({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const sectors = Object.values(messages.experience.sectors);

  return (
    <section
      id={sections.experience}
      className="scroll-mt-24 border-b border-border bg-background py-24 sm:py-32 lg:py-36"
      aria-labelledby="experience-heading"
    >
      <div className="section-shell">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">{messages.experience.eyebrow}</p>
              <h2
                id="experience-heading"
                className="mt-5 max-w-xl font-display text-[clamp(2.8rem,5.4vw,5rem)] font-medium leading-[1.02] tracking-[-0.055em] text-primary"
              >
                {messages.experience.title}
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-secondary">
                {messages.experience.subtitle}
              </p>
              <ul className="mt-9 flex flex-wrap gap-2" aria-label={locale === "ar" ? "قطاعات الخبرة" : "Experience sectors"}>
                {sectors.map((sector) => (
                  <li key={sector} className="border border-border bg-surface px-3 py-2 text-xs font-semibold text-secondary">
                    {sector}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="border-t border-border-strong">
            {highlightKeys.map((key, index) => {
              const item = messages.experience.highlights[key];

              return (
                <Reveal
                  as="article"
                  key={key}
                  delay={index * 65}
                  className="group grid gap-4 border-b border-border py-8 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-10"
                >
                  <span className="font-display text-xl font-medium tabular-nums text-accent" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="grid gap-3 sm:grid-cols-[0.9fr_1.1fr] sm:gap-8">
                    <h3 className="max-w-sm font-display text-2xl font-medium leading-tight tracking-[-0.035em] text-primary transition-colors duration-200 group-hover:text-accent-hover sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="max-w-md leading-7 text-secondary">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
