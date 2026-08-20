import type { Metadata } from "next";
import Link from "next/link";

import {
  applicationCategory,
  appLinkSlugs,
  getAppLinks,
  isInstallableSoftware,
  liveExtensionStores,
  operatingSystems,
  type AppStoreLinks,
} from "@/lib/app-links";
import { siteConfig } from "@/lib/i18n/config";

import { AppActions, AppCard, AppIcon, AppsHeader } from "../app-page-ui";
import { StoreAttribution } from "./store-attribution";
import { StoreRedirect } from "./store-redirect";

type PageProps = {
  params: Promise<{ appName: string }>;
};

export function generateStaticParams() {
  return appLinkSlugs.map((appName) => ({ appName }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { appName } = await params;
  const links = getAppLinks(appName);
  const url = `${siteConfig.url}/apps/${appName}`;

  if (!links) {
    return {
      metadataBase: new URL(siteConfig.url),
      title: `تطبيقات بن عسكر للتقنية | Bin Askar Technology apps`,
      alternates: { canonical: url },
      // An unknown slug is usually a typo in a shared link, so keep it out of search
      // results while still serving something useful to whoever followed it.
      robots: { index: false, follow: true },
    };
  }

  const isStoreApp = Boolean(links.iosAppId || links.androidPackage);
  // A brand-name title is only ever searched by someone who already knows the
  // app exists, so a page that has problem-focused copy titles itself with it.
  const defaultTitle = isStoreApp
    ? `تحميل ${links.nameAr} | Download ${links.nameEn}`
    : `${links.nameAr} | ${links.nameEn}`;
  const seoTitle = links.seo?.titleAr
    ? [links.seo.titleAr, links.seo.titleEn].filter(Boolean).join(" | ")
    : null;
  const title = seoTitle ?? defaultTitle;
  const description = links.seo?.descriptionAr
    ? [links.seo.descriptionAr, links.seo.descriptionEn].filter(Boolean).join(" ")
    : `${links.taglineAr} ${links.taglineEn}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "ar_SA",
      images: [{ url: links.icon }],
    },
    robots: { index: true, follow: true },
  };
}

/** Paragraphs from a body string; a blank line starts a new one. */
function paragraphs(body: string): string[] {
  return body.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean);
}

/**
 * Structured data for the app.
 *
 * `aggregateRating` is deliberately absent: inventing one is a structured-data
 * violation that can get rich results suppressed sitewide, and these apps have
 * no ratings yet. `price: "0"` is the cost to install — accurate for a free
 * download even when advanced features are subscription-based.
 */
function AppJsonLd({ app }: { app: AppStoreLinks }) {
  // Covers phone apps and browser extensions alike; a web-only platform or an
  // extension whose stores are all still unreleased has nothing to declare.
  if (!isInstallableSoftware(app)) return null;

  const installUrl = liveExtensionStores(app)[0]?.url;
  const graph: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: app.nameAr,
      alternateName: app.nameEn,
      applicationCategory: applicationCategory(app),
      operatingSystem: operatingSystems(app),
      description: app.seo?.descriptionAr ?? app.descriptionAr,
      url: `${siteConfig.url}/apps/${app.slug}`,
      image: `${siteConfig.url}${app.icon}`,
      inLanguage: "ar-SA",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "SAR",
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.nameAr,
        url: siteConfig.url,
      },
      ...(installUrl ? { installUrl } : {}),
    },
  ];

  // Only claim an FAQ when the page actually shows one.
  if (app.seo?.faq?.length) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: app.seo.faq.map((item) => ({
        "@type": "Question",
        name: item.qAr,
        acceptedAnswer: { "@type": "Answer", text: item.aAr },
      })),
    });
  }

  return (
    <>
      {graph.map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}

/** The ranking content: prose sections then an FAQ, Arabic first. */
function AppSeoContent({ app }: { app: AppStoreLinks }) {
  const seo = app.seo;
  if (!seo?.sections?.length && !seo?.faq?.length) return null;

  return (
    <section className="border-b border-border py-14 sm:py-20">
      <div className="section-shell max-w-3xl">
        {seo.sections?.map((section) => (
          <article key={section.headingAr} className="mb-12 last:mb-0">
            <h2 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-2xl font-semibold text-primary sm:text-3xl">
              <span lang="ar">{section.headingAr}</span>
              <span
                lang="en"
                dir="ltr"
                className="text-base font-medium text-muted-foreground"
              >
                {section.headingEn}
              </span>
            </h2>
            {paragraphs(section.bodyAr).map((text) => (
              <p key={text} lang="ar" className="mt-4 text-base leading-8 text-secondary">
                {text}
              </p>
            ))}
            <p
              lang="en"
              dir="ltr"
              className="mt-4 border-t border-border pt-4 text-sm leading-7 text-muted-foreground"
            >
              {section.bodyEn}
            </p>
          </article>
        ))}

        {seo.faq?.length ? (
          <div className="mt-14 border-t border-border pt-10">
            <h2 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-2xl font-semibold text-primary sm:text-3xl">
              <span lang="ar">أسئلة شائعة</span>
              <span
                lang="en"
                dir="ltr"
                className="text-base font-medium text-muted-foreground"
              >
                Frequently asked questions
              </span>
            </h2>
            <dl className="mt-8">
              {seo.faq.map((item) => (
                <div key={item.qAr} className="mb-8 last:mb-0">
                  <dt lang="ar" className="font-display text-lg font-semibold text-primary">
                    {item.qAr}
                  </dt>
                  <dd lang="ar" className="mt-2 text-base leading-8 text-secondary">
                    {item.aAr}
                  </dd>
                  <dd
                    lang="en"
                    dir="ltr"
                    className="mt-2 text-sm leading-7 text-muted-foreground"
                  >
                    <span className="font-semibold">{item.qEn}</span> {item.aEn}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/**
 * One link that lands everyone in the right place: /apps/{slug}.
 *
 * Phones are redirected to their own store by {@link StoreRedirect}; everyone else —
 * desktop, crawlers, JS disabled — reads this page and picks a store button. An
 * unknown slug renders the same shell with the full app list rather than a 404,
 * because these links go out in campaigns and print, where a dead end costs a
 * download and cannot be corrected after the fact.
 */
export default async function AppDownloadPage({ params }: PageProps) {
  const { appName } = await params;
  const app = getAppLinks(appName);
  const others = appLinkSlugs
    .filter((slug) => slug !== app?.slug)
    .map((slug) => getAppLinks(slug))
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AppsHeader />

      <main id="main-content" className="flex-1 overflow-x-clip">
        {app ? (
          <>
            <section className="relative overflow-hidden border-b border-border bg-surface">
              <div
                className="pointer-events-none absolute -end-28 -top-28 opacity-[0.05]"
                aria-hidden="true"
              >
                <div className="h-[26rem] w-[26rem] rounded-full bg-accent blur-3xl" />
              </div>
              <div className="section-shell relative max-w-5xl py-14 sm:py-20">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
                  <AppIcon app={app} size="large" />
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow">
                      {app.categoryAr} · <span lang="en" dir="ltr">{app.categoryEn}</span>
                    </p>
                    <h1 className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-display text-4xl font-semibold text-primary sm:text-5xl">
                      <span lang="ar">{app.nameAr}</span>
                      <span
                        lang="en"
                        dir="ltr"
                        className="text-[0.5em] font-medium text-muted-foreground"
                      >
                        {app.nameEn}
                      </span>
                    </h1>
                    <p lang="ar" className="mt-4 max-w-2xl text-xl font-medium leading-9 text-primary">
                      {app.taglineAr}
                    </p>
                    <p lang="ar" className="mt-3 max-w-2xl text-base leading-8 text-secondary">
                      {app.descriptionAr}
                    </p>
                    <p lang="en" dir="ltr" className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                      {app.descriptionEn}
                    </p>

                    <div className="mt-8">
                      <StoreRedirect links={app} />
                      <StoreAttribution links={app} />
                      <AppActions app={app} />
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5 text-sm">
                      {app.website ? (
                        <a
                          href={app.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer border-b border-accent text-primary transition-colors duration-200 hover:text-accent"
                        >
                          <span lang="en" dir="ltr">
                            {app.website.replace(/^https?:\/\/(www\.)?/, "")}
                          </span>
                        </a>
                      ) : null}
                      {app.policySlug ? (
                        <Link
                          href={`/policy/${app.policySlug}`}
                          className="cursor-pointer border-b border-accent text-primary transition-colors duration-200 hover:text-accent"
                        >
                          سياسة الخصوصية / Privacy &amp; terms
                        </Link>
                      ) : app.privacyUrl ? (
                        <a
                          href={app.privacyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer border-b border-accent text-primary transition-colors duration-200 hover:text-accent"
                        >
                          سياسة الخصوصية / Privacy &amp; terms
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <AppJsonLd app={app} />
            <AppSeoContent app={app} />

            {others.length > 0 ? (
              <section className="py-14 sm:py-20">
                <div className="section-shell max-w-5xl">
                  <h2 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-2xl font-semibold text-primary">
                    <span lang="ar">من أعمالنا أيضًا</span>
                    <span lang="en" dir="ltr" className="text-base font-medium text-muted-foreground">
                      More from our work
                    </span>
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {others.map((other) => (
                      <AppCard key={other.slug} app={other} />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
          </>
        ) : (
          <section className="py-16 sm:py-24">
            <div className="section-shell max-w-3xl">
              <p className="eyebrow">
                {siteConfig.nameAr} · <span lang="en" dir="ltr">{siteConfig.name}</span>
              </p>
              <h1 className="hero-title mt-6 font-display font-semibold text-primary">
                هذا التطبيق غير متوفر
                <span
                  lang="en"
                  dir="ltr"
                  className="mt-3 block text-[0.44em] text-accent"
                >
                  App not found
                </span>
              </h1>
              <p lang="ar" className="mt-6 text-lg leading-8 text-secondary">
                الرابط الذي فتحته لا يطابق أي تطبيق منشور. قد يكون الرابط قديمًا أو
                فيه خطأ مطبعي. تجد تطبيقاتنا المتوفرة أدناه.
              </p>
              <p lang="en" dir="ltr" className="mt-2 text-base leading-7 text-secondary">
                This link does not match a published app — it may be out of date or
                mistyped. Our available apps are listed below.
              </p>

              <div className="mt-10 grid gap-4">
                {appLinkSlugs.map((slug) => {
                  const entry = getAppLinks(slug);
                  if (!entry) return null;
                  return <AppCard key={slug} app={entry} />;
                })}
              </div>

              <p className="mt-10 text-sm text-secondary">
                <Link
                  href="/apps"
                  className="cursor-pointer border-b border-accent text-primary hover:text-accent"
                >
                  كل التطبيقات / All apps
                </Link>
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
