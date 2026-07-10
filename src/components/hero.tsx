import { AnchorLink } from "@/components/anchor-link";
import { sectionHref, sections } from "@/lib/sections";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  const messages = getMessages(locale);
  const sectors = Object.values(messages.experience.sectors);

  return (
    <section
      id={sections.home}
      className="relative scroll-mt-24 overflow-hidden bg-base"
    >
      {/* Layered atmosphere: gradient mesh + gold glow orb + faint grid. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 15% 10%, rgba(47,116,196,0.28), transparent 55%), radial-gradient(90% 70% at 95% 0%, rgba(230,182,87,0.16), transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute -top-24 start-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(230,182,87,0.22), transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,187,240,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,187,240,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(70% 60% at 50% 20%, black, transparent 80%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-32">
        <div className="space-y-7">
          <p
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-accent-strong backdrop-blur"
            style={{ animation: "rise-in 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {messages.hero.eyebrow}
          </p>
          <h1
            className="font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
            style={{ animation: "rise-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s both" }}
          >
            {messages.hero.title}
          </h1>
          <p
            className="max-w-xl text-lg leading-relaxed text-brand-100/85"
            style={{ animation: "rise-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.16s both" }}
          >
            {messages.hero.subtitle}
          </p>
          <div
            className="flex flex-wrap gap-3 pt-3"
            style={{ animation: "rise-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.24s both" }}
          >
            <AnchorLink
              href={sectionHref(locale, sections.contact)}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#1a1204] shadow-[0_0_0_1px_rgba(230,182,87,0.4),0_18px_40px_-12px_var(--glow)] transition hover:bg-accent-strong hover:shadow-[0_0_0_1px_rgba(230,182,87,0.6),0_22px_50px_-10px_var(--glow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {messages.hero.ctaPrimary}
            </AnchorLink>
            <AnchorLink
              href={sectionHref(locale, sections.services)}
              className="inline-flex items-center rounded-full border border-border-strong bg-surface/60 px-6 py-3 text-sm font-semibold text-brand-50 backdrop-blur transition hover:border-accent/50 hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {messages.hero.ctaSecondary}
            </AnchorLink>
          </div>
        </div>

        <div
          className="relative hidden lg:block"
          style={{ animation: "rise-in 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
        >
          <div
            className="absolute -end-8 top-6 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface-2 to-surface p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(230,182,87,0.7), transparent)",
              }}
            />
            <div className="space-y-4">
              {sectors.map((sector, i) => (
                <div
                  key={sector}
                  className="flex items-center gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-base text-sm font-bold tabular-nums text-accent-strong">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium text-brand-50">{sector}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
