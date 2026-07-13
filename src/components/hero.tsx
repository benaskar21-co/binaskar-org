import { AnchorLink } from "@/components/anchor-link";
import { BrandMark } from "@/components/brand-mark";
import { DirectionalArrow } from "@/components/directional-arrow";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { sectionHref, sections } from "@/lib/sections";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  const messages = getMessages(locale);
  const proofItems = Object.values(messages.hero.proof);
  const briefItems = Object.values(messages.hero.brief.items);

  return (
    <section
      id={sections.home}
      className="grain relative scroll-mt-24 overflow-hidden bg-primary text-white"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -end-40 -top-56 h-[38rem] w-[38rem] rounded-full border border-accent/25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -end-20 -top-36 h-[24rem] w-[24rem] rounded-full border border-white/10"
        aria-hidden="true"
      />

      <div className="section-shell relative z-10 grid min-h-[calc(100svh-72px)] gap-14 py-16 lg:grid-cols-[1.08fr_0.72fr] lg:items-center lg:gap-20 lg:py-24">
        <div className="max-w-5xl">
          <p className="eyebrow hero-enter text-accent">
            {messages.hero.eyebrow}
          </p>
          <h1
            className="hero-enter mt-7 max-w-[13ch] font-display text-[clamp(3.25rem,7.5vw,7.25rem)] font-medium leading-[0.94] tracking-[-0.065em] text-white"
            style={{ animationDelay: "80ms" }}
          >
            {messages.hero.title}
          </h1>
          <p
            className="hero-enter mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9"
            style={{ animationDelay: "160ms" }}
          >
            {messages.hero.subtitle}
          </p>
          <div
            className="hero-enter mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <AnchorLink
              href={sectionHref(locale, sections.contact)}
              className="group inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-sm bg-accent px-6 py-3 text-sm font-bold text-primary transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span>{messages.hero.ctaPrimary}</span>
              <DirectionalArrow
                locale={locale}
                className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </AnchorLink>
            <AnchorLink
              href={sectionHref(locale, sections.methodology)}
              className="inline-flex min-h-12 cursor-pointer items-center border-b border-white/35 px-1 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {messages.hero.ctaSecondary}
            </AnchorLink>
          </div>

          <dl
            className="hero-enter mt-14 grid max-w-3xl border-y border-white/14 sm:grid-cols-3"
            style={{ animationDelay: "320ms" }}
          >
            {proofItems.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[4rem_1fr] items-center gap-3 border-b border-white/14 py-4 last:border-b-0 sm:block sm:border-b-0 sm:border-e sm:px-5 sm:first:ps-0 sm:last:border-e-0"
              >
                <dt className="text-xs leading-5 text-white/62 sm:mt-2 sm:max-w-[11rem]">
                  {item.label}
                </dt>
                <dd className="-order-1 font-display text-2xl font-medium tabular-nums text-accent sm:order-none">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="hero-enter relative lg:ps-6"
          style={{ animationDelay: "260ms" }}
        >
          <div className="relative border border-white/16 bg-white/[0.045] p-5 shadow-2xl backdrop-blur-sm sm:p-8">
            <span
              className="absolute -end-2 -top-10 font-display text-[8rem] font-medium leading-none text-white/[0.035]"
              aria-hidden="true"
            >
              01
            </span>
            <div className="flex items-center justify-between border-b border-white/14 pb-5">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-accent">
                {messages.hero.brief.label}
              </p>
              <BrandMark
                className="h-11 w-12"
                variant="light"
                title={messages.meta.siteName}
              />
            </div>
            <p className="mt-9 max-w-md font-display text-3xl font-medium leading-[1.15] tracking-[-0.05em] text-white sm:text-4xl">
              {messages.hero.brief.title}
            </p>
            <ul className="mt-10 border-t border-white/14">
              {briefItems.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-white/14 py-4 text-sm leading-6 text-white/74"
                >
                  <span className="font-bold tabular-nums text-accent" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex items-center gap-3 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-white/60">
              <span className="h-px flex-1 bg-white/14" aria-hidden="true" />
              <span>{messages.hero.brief.footer}</span>
            </div>
          </div>
          <div
            className="absolute -bottom-4 -end-4 h-full w-full border border-accent/25"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
