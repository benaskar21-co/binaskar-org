import { ContactForm } from "@/components/contact-form";
import { DirectionalArrow } from "@/components/directional-arrow";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/sections";
import { siteConfig, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { sections } from "@/lib/sections";

export function AboutSection({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const valueKeys = ["clarity", "craft", "partnership"] as const;
  const audienceKeys = ["enterprise", "startups", "government"] as const;

  return (
    <section
      id={sections.about}
      className="scroll-mt-24 border-y border-border bg-surface py-24 sm:py-32 lg:py-40"
      aria-labelledby="about-heading"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            id="about-heading"
            eyebrow={messages.about.eyebrow}
            title={messages.about.title}
            subtitle={messages.about.intro}
          />
        </Reveal>

        <div className="mt-16 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal
            as="article"
            className="relative flex min-h-[28rem] flex-col overflow-hidden border border-border bg-accent-soft p-7 sm:p-10 lg:p-12"
          >
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent-hover">
              01 / {messages.about.mission.title}
            </span>
            <p className="mt-auto max-w-3xl pt-20 font-display text-[clamp(2.3rem,4.5vw,4.4rem)] font-medium leading-[1.08] tracking-[-0.05em] text-primary">
              {messages.about.mission.description}
            </p>
            <span className="pointer-events-none absolute -bottom-16 -end-5 font-display text-[13rem] font-medium leading-none text-primary/[0.035]" aria-hidden="true">
              BA
            </span>
          </Reveal>

          <Reveal as="article" delay={80} className="border border-border bg-background p-7 sm:p-10 lg:p-12">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent-hover">
              02 / {messages.about.whoWeServe.title}
            </p>
            <ul className="mt-8 border-t border-border-strong">
              {audienceKeys.map((key, index) => {
                const audience = messages.about.whoWeServe.items[key];

                return (
                  <li key={key} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-border py-6">
                    <span className="font-display text-lg font-medium tabular-nums text-accent" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-medium tracking-[-0.035em] text-primary">
                        {audience.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-6 text-secondary">
                        {audience.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <div className="mt-4 border border-border bg-primary text-white">
          <div className="border-b border-white/14 px-7 py-5 sm:px-10">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent">
              03 / {messages.about.values.title}
            </p>
          </div>
          <div className="grid md:grid-cols-3">
            {valueKeys.map((key, index) => {
              const value = messages.about.values.items[key];
              return (
                <Reveal
                  as="article"
                  key={key}
                  delay={index * 65}
                  className="border-b border-white/14 p-7 last:border-b-0 md:border-b-0 md:border-e md:last:border-e-0 sm:p-9"
                >
                  <span className="font-display text-xl font-medium tabular-nums text-accent" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className="mt-8 font-display text-2xl font-medium text-white">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">
                    {value.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);

  return (
    <section
      id={sections.contact}
      className="grain relative scroll-mt-24 overflow-hidden bg-primary py-24 text-white sm:py-32 lg:py-40"
      aria-labelledby="contact-heading"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="section-shell relative z-10">
        <Reveal>
          <SectionHeader
            id="contact-heading"
            eyebrow={messages.cta.eyebrow}
            title={messages.cta.title}
            subtitle={messages.cta.subtitle}
            variant="dark"
          />
        </Reveal>

        <div className="mt-16 grid overflow-hidden border border-white/16 bg-white/[0.025] lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal className="flex flex-col border-b border-white/16 p-7 lg:border-b-0 lg:border-e sm:p-10 lg:p-12">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent">
              {messages.contact.location}
            </p>
            <h3 className="mt-6 max-w-md font-display text-3xl font-medium leading-tight tracking-[-0.045em] text-white sm:text-4xl">
              {messages.contact.title}
            </h3>
            <p className="mt-5 max-w-md text-base leading-7 text-white/60">
              {messages.contact.subtitle}
            </p>
            <p className="mt-7 max-w-md border-s border-accent ps-4 text-sm leading-6 text-white/65">
              {messages.contact.expectation}
            </p>

            <div className="mt-12 border-t border-white/14 pt-7 lg:mt-auto">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white/65">
                {messages.contact.emailLabel}
              </p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-2 inline-flex min-h-11 cursor-pointer items-center text-lg font-semibold text-white underline decoration-white/25 underline-offset-4 transition-colors duration-200 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {siteConfig.contactEmail}
              </a>
              <a
                href={siteConfig.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 flex min-h-11 w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-white/60 transition-colors duration-200 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span>{messages.contact.alternative} · LinkedIn</span>
                <DirectionalArrow locale={locale} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={90} className="bg-surface p-7 text-primary sm:p-10 lg:p-12">
            <ContactForm locale={locale} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
