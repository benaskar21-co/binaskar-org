import Link from "next/link";

import { DirectionalArrow } from "@/components/directional-arrow";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/sections";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { sections } from "@/lib/sections";

const caseStudyLinks = {
  minnha: "https://www.minnha.sa",
  hido: "https://hido.app",
} as const;

const caseStudyKeys = ["minnha", "hido"] as const;

function CaseVisual({
  index,
  title,
  sector,
  label,
}: {
  index: number;
  title: string;
  sector: string;
  label: string;
}) {
  const dark = index === 0;

  return (
    <div className={`relative flex min-h-[25rem] overflow-hidden p-7 sm:min-h-[31rem] sm:p-10 ${dark ? "bg-primary text-white" : "bg-accent-soft text-primary"}`}>
      <div
        className={`pointer-events-none absolute inset-0 ${dark ? "hero-grid opacity-70" : "opacity-35"}`}
        style={dark ? undefined : {
          backgroundImage: "linear-gradient(to right, rgba(20,35,30,.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,35,30,.16) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />
      <span className={`absolute -end-8 -top-14 font-display text-[12rem] font-medium leading-none ${dark ? "text-white/[0.045]" : "text-primary/[0.055]"}`} aria-hidden="true">
        0{index + 1}
      </span>
      <div className="relative z-10 flex w-full flex-col justify-between border border-current/20 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-60">
            {label} / 0{index + 1}
          </span>
          <span className="h-3 w-3 rounded-full bg-accent" aria-hidden="true" />
        </div>
        <div>
          <div className="mb-6 grid grid-cols-3 gap-2" aria-hidden="true">
            <span className="h-1 bg-current opacity-20" />
            <span className="h-1 bg-accent" />
            <span className="h-1 bg-current opacity-20" />
          </div>
          <p className="font-display text-4xl font-medium leading-none tracking-[-0.055em] sm:text-6xl">
            {title}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-6 opacity-62">{sector}</p>
        </div>
      </div>
    </div>
  );
}

export function CaseStudiesSection({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);

  return (
    <section
      id={sections.caseStudies}
      className="scroll-mt-24 bg-surface py-24 sm:py-32 lg:py-40"
      aria-labelledby="case-studies-heading"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            id="case-studies-heading"
            eyebrow={messages.caseStudies.eyebrow}
            title={messages.caseStudies.title}
            subtitle={messages.caseStudies.subtitle}
          />
        </Reveal>

        <div className="mt-16 space-y-5">
          {caseStudyKeys.map((key, index) => {
            const study = messages.caseStudies.items[key];
            const outcomes = Object.values(study.outcomes);

            return (
              <Reveal
                as="article"
                key={key}
                delay={index * 80}
                className="grid overflow-hidden border border-border bg-background lg:grid-cols-[0.82fr_1.18fr]"
              >
                <div className={index === 1 ? "lg:order-2" : undefined}>
                  <CaseVisual
                    index={index}
                    title={study.title}
                    sector={study.sector}
                    label={messages.caseStudies.caseLabel}
                  />
                </div>
                <div className="flex flex-col p-7 sm:p-10 lg:p-14">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent-hover">
                    {messages.caseStudies.challengeLabel}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-medium tracking-[-0.045em] text-primary sm:text-4xl">
                    {study.title}
                  </h3>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-secondary">
                    {study.description}
                  </p>

                  <div className="mt-9 border-t border-border pt-7">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-secondary/65">
                      {messages.caseStudies.impactLabel}
                    </p>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                      {outcomes.map((outcome, outcomeIndex) => (
                        <li key={outcome} className="border-s border-accent ps-3 text-sm leading-6 text-secondary">
                          <span className="mb-1 block text-[0.62rem] font-bold tabular-nums text-accent-hover" aria-hidden="true">
                            0{outcomeIndex + 1}
                          </span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={caseStudyLinks[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-10 inline-flex min-h-11 w-fit cursor-pointer items-center gap-3 border-b border-primary/35 pb-1 text-sm font-bold text-primary transition-colors duration-200 hover:border-accent hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    <span>{messages.caseStudies.viewProject}</span>
                    <DirectionalArrow
                      locale={locale}
                      className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                    />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LeaderSection({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const credentials = Object.values(messages.leader.credentials);

  return (
    <section
      id={sections.leader}
      className="scroll-mt-24 bg-background py-24 sm:py-32 lg:py-40"
      aria-labelledby="leader-heading"
    >
      <div className="section-shell">
        <Reveal className="grid overflow-hidden border border-border bg-surface lg:grid-cols-[0.72fr_1.28fr]">
          <div className="grain relative flex min-h-[25rem] overflow-hidden bg-primary p-8 text-white sm:p-12">
            <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <span className="relative z-10 mt-auto font-display text-[clamp(7rem,18vw,14rem)] font-medium leading-[0.68] tracking-[-0.09em] text-accent" aria-hidden="true">
              AB
            </span>
          </div>
          <div className="p-7 sm:p-11 lg:p-16">
            <p className="eyebrow">{messages.leader.eyebrow}</p>
            <h2
              id="leader-heading"
              className="mt-5 max-w-3xl font-display text-[clamp(2.7rem,5vw,4.8rem)] font-medium leading-[1.02] tracking-[-0.055em] text-primary"
            >
              {messages.leader.title}
            </h2>
            <blockquote className="mt-9 max-w-3xl border-s-2 border-accent ps-6 font-display text-2xl font-medium leading-[1.45] tracking-[-0.025em] text-primary sm:text-3xl">
              “{messages.leader.quote}”
            </blockquote>
            <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-[0.78fr_1.22fr]">
              <div>
                <h3 className="font-display text-2xl font-medium text-primary">
                  {messages.leader.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-accent-hover">
                  {messages.leader.role}
                </p>
                <Link
                  href="https://www.linkedin.com/in/abdullah-bin-askar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-bold text-primary underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <span>{messages.leader.linkedin}</span>
                  <DirectionalArrow locale={locale} />
                </Link>
              </div>
              <div>
                <p className="text-base leading-8 text-secondary">
                  {messages.leader.bio}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {credentials.map((credential) => (
                    <li key={credential} className="border border-border bg-background px-3 py-2 text-xs font-semibold text-secondary">
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
