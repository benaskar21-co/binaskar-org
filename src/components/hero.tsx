import { AnchorLink } from "@/components/anchor-link";
import { BrandMark } from "@/components/brand-mark";
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
    <section id={sections.home} className="grain relative scroll-mt-24 overflow-hidden bg-primary text-white">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(50% 70% at 92% 12%, rgba(184,121,43,0.28), transparent 62%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(70% 65% at 65% 20%, black, transparent 78%)",
        }}
      />

      <div className="section-shell relative grid min-h-[calc(100svh-76px)] gap-16 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
        <div className="max-w-4xl space-y-8">
          <p
            className="eyebrow text-accent"
            style={{ animation: "rise-in 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            {messages.hero.eyebrow}
          </p>
          <h1
            className="max-w-4xl font-display text-[clamp(3.2rem,8vw,7.8rem)] font-medium leading-[0.9] tracking-[-0.06em] text-white"
            style={{ animation: "rise-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s both" }}
          >
            {messages.hero.title}
          </h1>
          <p
            className="max-w-2xl text-lg leading-8 text-white/70 sm:text-xl"
            style={{ animation: "rise-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.16s both" }}
          >
            {messages.hero.subtitle}
          </p>
          <div
            className="flex flex-wrap gap-3 pt-2"
            style={{ animation: "rise-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.24s both" }}
          >
            <AnchorLink
              href={sectionHref(locale, sections.contact)}
              className="inline-flex min-h-12 cursor-pointer items-center rounded-sm bg-accent px-7 py-3 text-sm font-semibold text-primary transition duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {messages.hero.ctaPrimary}
            </AnchorLink>
            <AnchorLink
              href={sectionHref(locale, sections.services)}
              className="inline-flex min-h-12 cursor-pointer items-center border-b border-white/40 px-2 py-3 text-sm font-semibold text-white transition duration-200 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {messages.hero.ctaSecondary}
            </AnchorLink>
          </div>
        </div>

        <div
          className="relative hidden lg:block"
          style={{ animation: "rise-in 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
        >
          <div className="relative min-h-[28rem] border border-white/15 bg-white/[0.035] p-8 shadow-2xl backdrop-blur-sm">
            <div className="hero-orbit pointer-events-none absolute -end-8 -top-8 h-28 w-28 rounded-full border border-accent/50" aria-hidden="true" />
            <div className="flex h-full flex-col justify-between gap-12">
              <div className="flex items-start justify-between border-b border-white/15 pb-6">
                <BrandMark className="h-20 w-[5.6rem]" title={messages.meta.siteName} />
                <span className="text-end text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/50">{messages.contact.location}</span>
              </div>
              <div className="space-y-0">
              {sectors.map((sector, i) => (
                <div
                  key={sector}
                  className="group flex items-center gap-4 border-b border-white/15 py-5 first:pt-0 last:border-0"
                >
                  <span className="text-xs font-bold tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-medium text-white transition-colors group-hover:text-accent">{sector}</span>
                </div>
              ))}
              </div>
              <span className="text-xs uppercase tracking-[0.18em] text-white/50">{messages.meta.tagline}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
