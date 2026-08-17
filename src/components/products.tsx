import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/sections";
import { getOwnApps, type AppStoreLinks } from "@/lib/app-links";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { sections } from "@/lib/sections";

function availabilityLabel(app: AppStoreLinks): string {
  if (app.extensionStores) return "Chrome · Firefox · Safari";
  if (app.iosAppId || app.androidPackage) return "iOS · Android";
  return "Web";
}

/**
 * The products Bin Askar builds and operates itself — proof the methodology on
 * this page survives contact with our own roadmap, not only with clients'.
 * Cards come from the /apps registry so the landing page can never disagree
 * with the download pages about names, taglines, or store availability.
 */
export function ProductsSection({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const apps = getOwnApps();
  const isAr = locale === "ar";

  return (
    <section
      id={sections.products}
      className="scroll-mt-24 border-t border-border bg-background py-24 sm:py-32 lg:py-36"
      aria-labelledby="products-heading"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            id="products-heading"
            eyebrow={messages.products.eyebrow}
            title={messages.products.title}
            subtitle={messages.products.subtitle}
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {apps.map((app, index) => (
            <Reveal as="article" key={app.slug} delay={index * 80}>
              <Link
                href={`/apps/${app.slug}`}
                className="group flex h-full cursor-pointer items-start gap-6 rounded-xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent hover:bg-accent-soft sm:p-8"
              >
                <Image
                  src={app.icon}
                  alt={`${app.nameAr} — ${app.nameEn}`}
                  width={96}
                  height={96}
                  className="h-20 w-20 shrink-0 rounded-2xl border border-border object-cover shadow-md sm:h-24 sm:w-24"
                />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                      {isAr ? app.nameAr : app.nameEn}
                    </span>
                    <span
                      lang={isAr ? "en" : "ar"}
                      dir={isAr ? "ltr" : "rtl"}
                      className="text-base text-muted-foreground"
                    >
                      {isAr ? app.nameEn : app.nameAr}
                    </span>
                  </span>
                  <span className="mt-2 leading-7 text-secondary">
                    {isAr ? app.taglineAr : app.taglineEn}
                  </span>
                  <span className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
                    <span
                      lang="en"
                      dir="ltr"
                      className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-accent-hover"
                    >
                      {availabilityLabel(app)}
                    </span>
                    <span className="text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-accent">
                      {messages.products.visit}
                    </span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="mt-8">
            <Link
              href="/apps"
              className="inline-flex min-h-11 cursor-pointer items-center border-b border-accent text-sm font-bold text-primary transition-colors duration-200 hover:text-accent"
            >
              {messages.products.allApps}
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
