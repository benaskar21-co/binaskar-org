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
      className="grain relative scroll-mt-24 overflow-hidden bg-primary py-24 text-white sm:py-32"
      aria-labelledby="methodology-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(55% 55% at 100% 0%, rgba(184,121,43,0.25), transparent 60%)",
        }}
      />
      <div className="section-shell relative">
        <Reveal>
          <SectionHeader
            id="methodology-heading"
            title={messages.methodology.title}
            subtitle={messages.methodology.subtitle}
            variant="dark"
          />
        </Reveal>
        <ol className="mt-16 grid border-s border-white/15 sm:grid-cols-2 xl:grid-cols-4">
          {stepKeys.map((key, index) => {
            const step = messages.methodology.steps[key];
            const stepNumber = String(index + 1).padStart(2, "0");

            return (
              <Reveal as="li" key={key} delay={index * 90}>
                <article className="flex min-h-[19rem] h-full flex-col border-e border-b border-white/15 bg-white/[0.025] p-6 transition duration-300 hover:bg-white/[0.08] sm:p-8">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center border border-accent text-sm font-bold tabular-nums text-accent"
                    aria-hidden="true"
                  >
                    {stepNumber}
                  </span>
                  <h3 className="mt-auto pt-10 font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-300">
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
      className="scroll-mt-24 bg-background py-24 sm:py-32"
      aria-labelledby="experience-heading"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            id="experience-heading"
            title={messages.experience.title}
            subtitle={messages.experience.subtitle}
          />
        </Reveal>
        <ul className="mt-16 grid border-y border-border sm:grid-cols-2">
          {highlights.map((item, index) => (
            <Reveal
              as="li"
              key={item}
              delay={index * 60}
              className="group flex min-h-44 items-start gap-5 border-e border-b border-border bg-surface p-7 transition duration-300 hover:bg-background sm:p-9"
            >
              <svg
                className="mt-1 h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-display text-xl font-medium leading-snug text-primary sm:text-2xl">{item}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
