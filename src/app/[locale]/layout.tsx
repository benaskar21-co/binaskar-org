import { notFound } from "next/navigation";
import {
  IBM_Plex_Sans_Arabic,
  Lexend,
  Source_Sans_3,
} from "next/font/google";

import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import {
  isValidLocale,
  localeDirections,
  type Locale,
} from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

import "../globals.css";

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const displayFont = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display-latin",
  display: "swap",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata(locale, "home");
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dir = localeDirections[locale];
  const fontClass = `${bodyFont.variable} ${arabicFont.variable} ${displayFont.variable}`;
  const displayVar =
    locale === "ar"
      ? "var(--font-arabic), var(--font-display-latin)"
      : "var(--font-display-latin)";
  const bodyFamily =
    locale === "ar"
      ? "var(--font-arabic), system-ui, sans-serif"
      : "var(--font-body), system-ui, sans-serif";

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      className={`${fontClass} h-full antialiased`}
      style={{ "--font-display": displayVar } as React.CSSProperties}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: bodyFamily }}
      >
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-800 focus:px-4 focus:py-2 focus:text-white"
        >
          {locale === "ar" ? "تخطي إلى المحتوى" : "Skip to content"}
        </a>
        <JsonLd locale={locale} />
        <SiteHeader locale={locale} />
        <main id="main-content" className="flex-1 overflow-x-clip">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
