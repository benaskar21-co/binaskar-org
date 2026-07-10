import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/sections";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { sections } from "@/lib/sections";

const stepKeys = ["discover", "design", "build", "scale"] as const;

export function MethodologySection({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);

  return (
    <section
      id={sections.methodology}
      className="relative scroll-mt-24 overflow-hidden bg-base py-24 text-white"
      aria-labelledby="methodology-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(50% 40% at 8% 0%, rgba(230,168,83,0.12), transparent 45%), radial-gradient(60% 60% at 92% 100%, rgba(47,116,196,0.22), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            id="methodology-heading"
            title={messages.methodology.title}
            subtitle={messages.methodology.subtitle}
          />
        </Reveal>
        <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-6">
          {stepKeys.map((key, index) => {
            const step = messages.methodology.steps[key];
            const stepNumber = String(index + 1).padStart(2, "0");

            return (
              <Reveal as="li" key={key} delay={index * 90}>
                <article className="flex min-h-[11.5rem] h-full flex-col rounded-2xl border border-border bg-surface-2/70 p-5 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm transition duration-300 hover:border-accent/40 hover:bg-surface-2 sm:min-h-[12.5rem] sm:p-6">
                  <span
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-base text-sm font-bold tabular-nums text-accent-strong"
                    aria-hidden="true"
                  >
                    {stepNumber}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-white sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-start text-sm leading-relaxed text-brand-100/80 sm:text-[0.9375rem]">
                    {step.description}
                  </p>
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
  const highlights = Object.values(messages.experience.highlights);

  return (
    <section
      id={sections.experience}
      className="scroll-mt-24 bg-surface py-24"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            id="experience-heading"
            title={messages.experience.title}
            subtitle={messages.experience.subtitle}
          />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {highlights.map((item, index) => (
            <Reveal
              as="li"
              key={item}
              delay={index * 60}
              className="flex items-start gap-3 rounded-xl border border-border bg-surface-2/50 p-5 transition hover:border-accent/30"
            >
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_var(--glow)]"
                aria-hidden="true"
              />
              <span className="text-brand-100/85">{item}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
