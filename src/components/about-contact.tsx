import { ContactForm } from "@/components/contact-form";
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
      className="scroll-mt-24 border-y border-border bg-surface py-24 sm:py-32"
      aria-labelledby="about-heading"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            id="about-heading"
            title={messages.about.title}
            subtitle={messages.about.intro}
          />
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-px bg-border">
            <Reveal
              as="article"
              className="bg-background p-8 sm:p-10"
            >
              <h3 className="font-display text-xl font-semibold text-primary">
                {messages.about.mission.title}
              </h3>
              <p className="mt-3 leading-relaxed text-secondary">
                {messages.about.mission.description}
              </p>
            </Reveal>

            <article className="bg-background p-8 sm:p-10">
              <h3 className="font-display text-2xl font-medium text-primary">
                {messages.about.whoWeServe.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {audienceKeys.map((key, index) => (
                  <Reveal
                    as="li"
                    key={key}
                    delay={index * 60}
                    className="group flex items-start gap-4 border-t border-border py-5 first:border-t-0"
                  >
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-primary">
                        {messages.about.whoWeServe.items[key].title}
                      </p>
                      <p className="mt-1 text-sm text-secondary">
                        {messages.about.whoWeServe.items[key].description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </article>
          </div>

          <div className="bg-surface p-8 sm:p-10">
            <h3 className="font-display text-2xl font-medium text-primary">
              {messages.about.values.title}
            </h3>
            <div className="mt-4 grid gap-4">
              {valueKeys.map((key, index) => {
                const value = messages.about.values.items[key];
                return (
                  <Reveal
                    as="article"
                    key={key}
                    delay={index * 70}
                    className="border-t border-border py-6 first:border-t-0"
                  >
                    <h4 className="font-display text-lg font-semibold text-primary">
                      {value.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-secondary">
                      {value.description}
                    </p>
                  </Reveal>
                );
              })}
            </div>
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
      className="grain relative scroll-mt-24 overflow-hidden bg-accent py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(55% 55% at 0% 100%, rgba(20,35,30,0.26), transparent 60%)",
        }}
      />
      <div className="section-shell relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center text-primary" aria-hidden="true" />
          <h2
            id="contact-heading"
            className="mt-5 font-display text-4xl font-medium tracking-[-0.05em] text-primary sm:text-6xl"
          >
            {messages.cta.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-primary/70">{messages.cta.subtitle}</p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="text-primary">
            <h3 className="font-display text-3xl font-medium">
              {messages.contact.title}
            </h3>
            <p className="mt-4 max-w-md text-lg leading-8 text-primary/70">{messages.contact.subtitle}</p>
            <p className="mt-8 text-sm text-primary/60">
              {messages.contact.location}
            </p>
            <div className="mt-8 space-y-3">
              <p className="text-sm text-primary/60">
                {messages.contact.emailLabel}
              </p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="inline-flex cursor-pointer text-lg font-semibold text-primary underline decoration-primary/40 decoration-2 underline-offset-4 transition hover:decoration-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
            <p className="mt-6 text-sm text-primary/60">
              {messages.contact.alternative}{" "}
              <a
                href={siteConfig.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-medium text-primary underline underline-offset-2 hover:text-primary/70"
              >
                LinkedIn
              </a>
            </p>
          </div>

          <div className="border border-primary/15 bg-surface p-7 shadow-xl sm:p-10">
            <ContactForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
