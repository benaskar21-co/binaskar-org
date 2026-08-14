import type { Metadata } from "next";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import {
  appLinkSlugs,
  appStoreUrl,
  getAppLinks,
  playStoreUrl,
} from "@/lib/app-links";
import { siteConfig } from "@/lib/i18n/config";

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

  const title = `تحميل ${links.nameAr} | Download ${links.nameEn}`;
  const description = `${links.taglineAr} ${links.taglineEn}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", locale: "ar_SA" },
    robots: { index: true, follow: true },
  };
}

function StoreButton({
  href,
  labelAr,
  labelEn,
  primary,
}: {
  href: string;
  labelAr: string;
  labelEn: string;
  primary?: boolean;
}) {
  const base =
    "inline-flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-lg px-8 py-3 text-center transition-colors duration-200";
  const tone = primary
    ? "bg-primary text-white hover:bg-accent"
    : "border border-border bg-surface text-primary hover:border-accent hover:text-accent";
  return (
    <a href={href} className={`${base} ${tone}`} rel="noopener">
      <span lang="ar" dir="rtl" className="font-display text-base font-semibold">
        {labelAr}
      </span>
      <span lang="en" dir="ltr" className="text-xs opacity-80">
        {labelEn}
      </span>
    </a>
  );
}

/**
 * One link that lands everyone in the right place: /apps/{slug}.
 *
 * Phones are redirected to their own store by {@link StoreRedirect}; everyone else —
 * desktop, crawlers, JS disabled — reads this page and picks a store button. An
 * unknown slug renders the same shell with general information rather than a 404,
 * because these links go out in campaigns and print, where a dead end costs a
 * download and cannot be corrected after the fact.
 */
export default async function AppDownloadPage({ params }: PageProps) {
  const { appName } = await params;
  const links = getAppLinks(appName);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface/90">
        <div className="section-shell flex min-h-20 items-center py-4">
          <Link
            href="/ar"
            className="flex min-h-11 cursor-pointer items-center gap-3 transition-colors duration-200 hover:text-accent"
            aria-label="العودة إلى موقع بن عسكر للتقنية"
          >
            <BrandMark className="h-10 w-11 shrink-0" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-sm font-semibold sm:text-base">
                {siteConfig.nameAr}
              </span>
              <span lang="en" dir="ltr" className="text-[0.68rem] text-muted-foreground sm:text-xs">
                {siteConfig.name}
              </span>
            </span>
          </Link>
        </div>
      </header>

      <main id="main-content">
        <section className="py-16 sm:py-24">
          <div className="section-shell max-w-3xl">
            {links ? (
              <>
                <p className="eyebrow">
                  {links.nameAr} · <span lang="en" dir="ltr">{links.nameEn}</span>
                </p>
                <h1 className="hero-title mt-6 font-display font-semibold text-primary">
                  حمّل التطبيق
                  <span
                    lang="en"
                    dir="ltr"
                    className="mt-3 block font-[var(--font-display-latin)] text-[0.44em] tracking-[-0.04em] text-accent"
                  >
                    Download the app
                  </span>
                </h1>
                <p lang="ar" dir="rtl" className="mt-6 text-lg leading-8 text-secondary">
                  {links.taglineAr}
                </p>
                <p lang="en" dir="ltr" className="mt-2 text-base leading-7 text-secondary">
                  {links.taglineEn}
                </p>

                <div className="mt-10 space-y-4">
                  <StoreRedirect links={links} />
                  <div className="flex flex-wrap gap-4">
                    {links.iosAppId ? (
                      <StoreButton
                        href={appStoreUrl(links.iosAppId)}
                        labelAr="App Store — آيفون وآيباد"
                        labelEn="Download on the App Store"
                        primary
                      />
                    ) : null}
                    {links.androidPackage ? (
                      <StoreButton
                        href={playStoreUrl(links.androidPackage)}
                        labelAr="Google Play — أندرويد"
                        labelEn="Get it on Google Play"
                        primary={!links.iosAppId}
                      />
                    ) : null}
                  </div>
                  {/* Stated plainly rather than left as a guess when one store is absent. */}
                  {!links.iosAppId || !links.androidPackage ? (
                    <p className="text-sm text-secondary">
                      <span lang="ar" dir="rtl">
                        {links.iosAppId
                          ? "نسخة أندرويد قادمة قريبًا."
                          : "نسخة iOS قادمة قريبًا."}
                      </span>
                    </p>
                  ) : null}
                </div>

                <p className="mt-10 text-sm text-secondary">
                  <Link href={`/policy/${links.slug}`} className="border-b border-accent text-primary hover:text-accent">
                    سياسة الخصوصية والشروط / Privacy &amp; terms
                  </Link>
                </p>
              </>
            ) : (
              <>
                <p className="eyebrow">{siteConfig.nameAr} · <span lang="en" dir="ltr">{siteConfig.name}</span></p>
                <h1 className="hero-title mt-6 font-display font-semibold text-primary">
                  هذا التطبيق غير متوفر
                  <span
                    lang="en"
                    dir="ltr"
                    className="mt-3 block font-[var(--font-display-latin)] text-[0.44em] tracking-[-0.04em] text-accent"
                  >
                    App not found
                  </span>
                </h1>
                <p lang="ar" dir="rtl" className="mt-6 text-lg leading-8 text-secondary">
                  الرابط الذي فتحته لا يطابق أي تطبيق منشور. قد يكون الرابط قديمًا أو
                  فيه خطأ مطبعي. تجد تطبيقاتنا المتوفرة أدناه.
                </p>
                <p lang="en" dir="ltr" className="mt-2 text-base leading-7 text-secondary">
                  This link does not match a published app — it may be out of date or
                  mistyped. Our available apps are listed below.
                </p>

                <ul className="mt-10 space-y-4">
                  {appLinkSlugs.map((slug) => {
                    const app = getAppLinks(slug);
                    if (!app) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/apps/${slug}`}
                          className="inline-flex min-h-11 items-center border-b border-accent text-base font-semibold text-primary transition-colors duration-200 hover:text-accent"
                        >
                          {app.nameAr} — <span lang="en" dir="ltr" className="ms-1">{app.nameEn}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-10 text-sm text-secondary">
                  <Link href="/ar" className="border-b border-accent text-primary hover:text-accent">
                    كل التطبيقات / All apps
                  </Link>
                </p>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
