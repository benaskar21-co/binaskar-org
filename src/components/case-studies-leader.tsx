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

export function CaseStudiesSection({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);

  return (
    <section
      id={sections.caseStudies}
      className="scroll-mt-24 bg-surface py-24 sm:py-32"
      aria-labelledby="case-studies-heading"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            id="case-studies-heading"
            title={messages.caseStudies.title}
            subtitle={messages.caseStudies.subtitle}
          />
        </Reveal>
        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-2">
          {caseStudyKeys.map((key, index) => {
            const study = messages.caseStudies.items[key];
            const outcomes = Object.values(study.outcomes);

            return (
              <Reveal
                as="article"
                key={key}
                delay={index * 90}
                className="group relative flex min-h-[34rem] flex-col overflow-hidden bg-background p-8 transition duration-300 hover:bg-surface sm:p-12"
              >
                <span className="pointer-events-none absolute -end-4 -top-10 font-display text-[11rem] font-medium leading-none text-primary/[0.045] transition-transform duration-500 group-hover:translate-y-3" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  {study.sector}
                </p>
                <h3 className="relative mt-4 max-w-lg font-display text-4xl font-medium tracking-[-0.05em] text-primary sm:text-5xl">
                  {study.title}
                </h3>
                <p className="relative mt-6 flex-1 max-w-lg text-base leading-7 text-secondary">
                  {study.description}
                </p>
                <ul className="relative mt-8 space-y-3 border-s border-border ps-4">
                  {outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-2 text-sm text-secondary"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
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
                      {outcome}
                    </li>
                  ))}
                </ul>
                <Link
                  href={caseStudyLinks[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-8 inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-accent transition duration-200 hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span>{messages.caseStudies.viewProject}</span>
                  <DirectionalArrow locale={locale} />
                </Link>
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
      className="scroll-mt-24 bg-primary py-24 text-white sm:py-32"
      aria-labelledby="leader-heading"
    >
      <div className="section-shell">
        <Reveal className="grid gap-12 border-y border-white/15 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:py-16">
          <div>
            <p className="eyebrow text-accent">
              {messages.leader.title}
            </p>
            <h2
              id="leader-heading"
              className="mt-5 font-display text-4xl font-medium text-white sm:text-5xl"
            >
              {messages.leader.name}
            </h2>
            <p className="mt-2 text-slate-300">{messages.leader.role}</p>
            <a
              href="https://www.linkedin.com/in/abdullah-bin-askar"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-accent transition duration-200 hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span>{messages.leader.linkedin}</span>
              <DirectionalArrow locale={locale} />
            </a>
          </div>
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute -end-3 -top-16 font-display text-[14rem] font-medium leading-none text-white/[0.04]" aria-hidden="true">AB</span>
            <p className="max-w-2xl text-lg leading-8 text-slate-200">{messages.leader.bio}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {credentials.map((cred) => (
                <li
                  key={cred}
                  className="border border-white/20 px-3 py-1.5 text-xs font-medium text-slate-200"
                >
                  {cred}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
