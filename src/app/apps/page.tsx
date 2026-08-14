import type { Metadata } from "next";
import Link from "next/link";

import { appLinkSlugs, getAppLinks } from "@/lib/app-links";
import { siteConfig } from "@/lib/i18n/config";

import { AppCard, AppsHeader } from "./app-page-ui";

const title = "تطبيقاتنا ومنتجاتنا | Apps & products — Bin Askar Technology";
const description =
  "تطبيقات ومنصات شاركنا في بنائها وقيادتها تقنيًا. Apps and platforms we build and lead.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/apps` },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/apps`,
    type: "website",
    locale: "ar_SA",
  },
  robots: { index: true, follow: true },
};

/** The gallery behind every /apps/{slug} link — one page listing everything we ship. */
export default function AppsIndexPage() {
  const apps = appLinkSlugs
    .map((slug) => getAppLinks(slug))
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AppsHeader />

      <main id="main-content" className="flex-1 overflow-x-clip">
        <section className="py-14 sm:py-20">
          <div className="section-shell max-w-4xl">
            <p className="eyebrow">
              تطبيقات ومنصات · <span lang="en" dir="ltr">Apps &amp; platforms</span>
            </p>
            <h1 className="section-title mt-5 font-display font-semibold text-primary">
              منتجات نبنيها ونقودها تقنيًا.
            </h1>
            <p lang="ar" className="mt-5 max-w-2xl text-lg leading-8 text-secondary">
              تطبيقاتنا الخاصة، ومنتجات شاركنا في قيادتها التقنية من نموذج العمل إلى
              المعمارية والإطلاق.
            </p>
            <p lang="en" dir="ltr" className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">
              Our own apps, and products where we led the technology — from business
              model to architecture and launch.
            </p>

            <div className="mt-10 grid gap-4">
              {apps.map((app) => (
                <AppCard key={app.slug} app={app} />
              ))}
            </div>

            <p className="mt-12 text-sm text-secondary">
              <Link
                href="/ar"
                className="cursor-pointer border-b border-accent text-primary transition-colors duration-200 hover:text-accent"
              >
                العودة إلى الموقع الرئيسي / Back to the main site
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
