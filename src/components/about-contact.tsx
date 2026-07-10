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
      className="scroll-mt-24 border-y border-border bg-base py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            id="about-heading"
            title={messages.about.title}
            subtitle={messages.about.intro}
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <Reveal
              as="article"
              className="rounded-2xl border border-border bg-surface-2/60 p-6"
            >
              <h3 className="font-display text-xl font-semibold text-white">
                {messages.about.mission.title}
              </h3>
              <p className="mt-3 leading-relaxed text-brand-100/80">
                {messages.about.mission.description}
              </p>
            </Reveal>

            <article>
              <h3 className="font-display text-xl font-semibold text-white">
                {messages.about.whoWeServe.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {audienceKeys.map((key, index) => (
                  <Reveal
                    as="li"
                    key={key}
                    delay={index * 60}
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface/60 p-4 transition hover:border-accent/30"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_var(--glow)]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-white">
                        {messages.about.whoWeServe.items[key].title}
                      </p>
                      <p className="mt-1 text-sm text-brand-100/70">
                        {messages.about.whoWeServe.items[key].description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </article>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-white">
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
                    className="rounded-2xl border border-border bg-gradient-to-b from-surface-2/70 to-surface p-5 transition hover:border-accent/30"
                  >
                    <h4 className="font-display text-lg font-semibold text-accent-strong">
                      {value.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-brand-100/75">
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
      className="relative scroll-mt-24 overflow-hidden bg-surface py-24"
      aria-labelledby="contact-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(55% 50% at 100% 0%, rgba(230,182,87,0.12), transparent 55%), radial-gradient(55% 50% at 0% 100%, rgba(47,116,196,0.2), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span
            className="mx-auto inline-block h-1 w-12 rounded-full bg-gradient-to-r from-accent to-transparent"
            aria-hidden="true"
          />
          <h2
            id="contact-heading"
            className="mt-5 font-display text-3xl font-semibold text-white sm:text-4xl"
          >
            {messages.cta.title}
          </h2>
          <p className="mt-4 text-brand-100/80">{messages.cta.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="text-white">
            <h3 className="font-display text-2xl font-semibold">
              {messages.contact.title}
            </h3>
            <p className="mt-3 text-brand-100/80">{messages.contact.subtitle}</p>
            <p className="mt-6 text-sm text-muted">{messages.contact.location}</p>
            <div className="mt-8 space-y-3">
              <p className="text-sm text-muted">{messages.contact.emailLabel}</p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="inline-flex text-lg font-semibold text-accent-strong underline decoration-accent/50 underline-offset-4 transition hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
            <p className="mt-6 text-sm text-muted">
              {messages.contact.alternative}{" "}
              <a
                href={siteConfig.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-50 underline underline-offset-2 hover:text-white"
              >
                LinkedIn
              </a>
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-surface-2/70 p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.85)] backdrop-blur">
            <ContactForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
