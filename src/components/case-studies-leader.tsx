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
      className="scroll-mt-24 bg-base py-24"
      aria-labelledby="case-studies-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            id="case-studies-heading"
            title={messages.caseStudies.title}
            subtitle={messages.caseStudies.subtitle}
          />
        </Reveal>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {caseStudyKeys.map((key, index) => {
            const study = messages.caseStudies.items[key];
            const outcomes = Object.values(study.outcomes);

            return (
              <Reveal
                as="article"
                key={key}
                delay={index * 90}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface-2/80 to-surface p-8 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.85)] transition duration-300 hover:border-accent/40"
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(230,182,87,0.7), transparent)",
                  }}
                />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {study.sector}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                  {study.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-100/75">
                  {study.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-2 text-sm text-brand-100/85"
                    >
                      <span className="text-accent" aria-hidden="true">
                        ✓
                      </span>
                      {outcome}
                    </li>
                  ))}
                </ul>
                <Link
                  href={caseStudyLinks[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent-strong transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
      className="scroll-mt-24 bg-surface py-24"
      aria-labelledby="leader-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="relative grid gap-10 overflow-hidden rounded-3xl border border-border bg-surface-2/60 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div
            className="pointer-events-none absolute -start-10 -top-10 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {messages.leader.title}
            </p>
            <h2
              id="leader-heading"
              className="mt-3 font-display text-3xl font-semibold text-white"
            >
              {messages.leader.name}
            </h2>
            <p className="mt-1 text-brand-100/70">{messages.leader.role}</p>
            <a
              href="https://www.linkedin.com/in/abdullah-bin-askar"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-strong transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span>{messages.leader.linkedin}</span>
              <DirectionalArrow locale={locale} />
            </a>
          </div>
          <div className="relative">
            <p className="leading-relaxed text-brand-100/80">
              {messages.leader.bio}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {credentials.map((cred) => (
                <li
                  key={cred}
                  className="rounded-full border border-border bg-base/60 px-3 py-1 text-xs font-medium text-brand-100/85"
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
