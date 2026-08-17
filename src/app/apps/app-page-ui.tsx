import Image from "next/image";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import {
  appStoreUrl,
  playStoreUrl,
  type AppStoreLinks,
  type ExtensionStore,
} from "@/lib/app-links";
import { siteConfig } from "@/lib/i18n/config";

/** Slim site header shared by the apps index and every app page. */
export function AppsHeader() {
  return (
    <header className="border-b border-border bg-surface/90 backdrop-blur-sm">
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
  );
}

/** Store icon glyph (App Store apple / Play triangle), drawn inline in currentColor. */
function StoreGlyph({ store }: { store: "ios" | "android" }) {
  if (store === "ios") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M17.05 12.54c-.03-2.89 2.36-4.27 2.47-4.34-1.35-1.97-3.44-2.24-4.18-2.27-1.78-.18-3.47 1.05-4.37 1.05-.9 0-2.29-1.02-3.77-1-1.94.03-3.72 1.13-4.72 2.86-2.01 3.49-.51 8.66 1.45 11.49.96 1.39 2.1 2.94 3.6 2.88 1.44-.06 1.99-.93 3.73-.93s2.23.93 3.76.9c1.55-.03 2.53-1.41 3.48-2.8 1.1-1.61 1.55-3.17 1.57-3.25-.03-.02-3.01-1.16-3.02-4.59zM14.16 4.06c.8-.96 1.33-2.3 1.19-3.64-1.15.05-2.53.76-3.35 1.72-.74.86-1.38 2.22-1.2 3.53 1.27.1 2.57-.65 3.36-1.61z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M3.6 1.8c-.36.38-.57.97-.57 1.73v16.94c0 .76.21 1.35.58 1.72l.09.08L13.2 12.8v-.21L3.7 1.7l-.1.1zm12.76 14.16-3.16-3.16v-.21l3.17-3.17.07.04 3.75 2.13c1.07.6 1.07 1.6 0 2.21l-3.75 2.12-.08.04zm-.72.68L12.4 13.4 3.75 22.1c.35.37.93.42 1.59.05l10.3-5.51zM12.4 11.4l3.24-3.24L5.34 2.6c-.66-.37-1.24-.32-1.59.05l8.65 8.75z" />
    </svg>
  );
}

/**
 * A store badge in the site's own visual language rather than a copy of the
 * official artwork — bilingual labels, brand tokens, consistent radii.
 */
export function StoreButton({
  href,
  store,
  primary,
}: {
  href: string;
  store: "ios" | "android";
  primary?: boolean;
}) {
  const labels =
    store === "ios"
      ? { top: "حمّله من", name: "App Store", en: "Download on the" }
      : { top: "احصل عليه من", name: "Google Play", en: "Get it on" };
  const tone = primary
    ? "bg-primary text-primary-foreground hover:bg-accent hover:text-white"
    : "border border-border-strong bg-surface text-primary hover:border-accent hover:text-accent";

  return (
    <a
      href={href}
      rel="noopener"
      className={`inline-flex min-h-14 min-w-52 cursor-pointer items-center justify-center gap-3 rounded-xl px-6 py-3 transition-colors duration-200 ${tone}`}
    >
      <StoreGlyph store={store} />
      <span className="flex flex-col text-start leading-tight">
        <span lang="ar" className="text-[0.68rem] opacity-80">
          {labels.top} <span lang="en" dir="ltr">({labels.en})</span>
        </span>
        <span lang="en" dir="ltr" className="font-display text-base font-semibold">
          {labels.name}
        </span>
      </span>
    </a>
  );
}

const EXTENSION_STORE_LABELS: Record<
  ExtensionStore["key"],
  { nameEn: string; topAr: string }
> = {
  chrome: { nameEn: "Chrome Web Store", topAr: "أضفه من" },
  firefox: { nameEn: "Firefox Add-ons", topAr: "أضفه من" },
  safari: { nameEn: "App Store", topAr: "لسفاري من" },
};

/** Puzzle-piece glyph — the universal "browser extension" mark, in currentColor. */
function ExtensionGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M20.5 11h-1.75V7.5c0-1.1-.9-2-2-2h-3.5V3.75a2.25 2.25 0 1 0-4.5 0V5.5h-3.5c-1.1 0-2 .9-2 2v3.33h1.67a2.42 2.42 0 1 1 0 4.84H3.25v3.33c0 1.1.9 2 2 2h3.33v-1.67a2.42 2.42 0 1 1 4.84 0V21h3.33c1.1 0 2-.9 2-2v-3.5h1.75a2.25 2.25 0 1 0 0-4.5z" />
    </svg>
  );
}

/**
 * One extension-store card: a real link when the listing is live, and a clearly
 * labeled "in review" state when it is not — an in-review URL is a guaranteed 404,
 * so it is never rendered as a link.
 */
export function ExtensionStoreButton({
  store,
  primary,
}: {
  store: ExtensionStore;
  primary?: boolean;
}) {
  const labels = EXTENSION_STORE_LABELS[store.key];

  if (!store.live) {
    return (
      <span className="inline-flex min-h-14 min-w-52 items-center justify-center gap-3 rounded-xl border border-dashed border-border-strong bg-surface-muted px-6 py-3 text-muted-foreground">
        <ExtensionGlyph />
        <span className="flex flex-col text-start leading-tight">
          <span lang="ar" className="text-[0.68rem]">
            قيد المراجعة <span lang="en" dir="ltr">(in review)</span>
          </span>
          <span lang="en" dir="ltr" className="font-display text-base font-semibold">
            {labels.nameEn}
          </span>
        </span>
      </span>
    );
  }

  const tone = primary
    ? "bg-primary text-primary-foreground hover:bg-accent hover:text-white"
    : "border border-border-strong bg-surface text-primary hover:border-accent hover:text-accent";

  return (
    <a
      href={store.url}
      rel="noopener"
      className={`inline-flex min-h-14 min-w-52 cursor-pointer items-center justify-center gap-3 rounded-xl px-6 py-3 transition-colors duration-200 ${tone}`}
    >
      <ExtensionGlyph />
      <span className="flex flex-col text-start leading-tight">
        <span lang="ar" className="text-[0.68rem] opacity-80">
          {labels.topAr}
        </span>
        <span lang="en" dir="ltr" className="font-display text-base font-semibold">
          {labels.nameEn}
        </span>
      </span>
    </a>
  );
}

/** App icon: store artwork on a tile, or a wordmark on a light card. */
export function AppIcon({
  app,
  size = "large",
}: {
  app: AppStoreLinks;
  size?: "large" | "small";
}) {
  const px = size === "large" ? 160 : 64;
  const frame =
    size === "large"
      ? "h-32 w-32 rounded-3xl sm:h-40 sm:w-40"
      : "h-16 w-16 rounded-xl";

  if (app.iconShape === "wordmark") {
    return (
      <span
        className={`flex items-center justify-center border border-border bg-surface p-3 shadow-sm ${frame}`}
      >
        <Image
          src={app.icon}
          alt={`شعار ${app.nameAr} — ${app.nameEn} logo`}
          width={px}
          height={px}
          className="h-full w-full object-contain"
        />
      </span>
    );
  }
  return (
    <Image
      src={app.icon}
      alt={`أيقونة تطبيق ${app.nameAr} — ${app.nameEn} app icon`}
      width={px}
      height={px}
      className={`border border-border object-cover shadow-md ${frame}`}
    />
  );
}

/** Compact card used on the index page and in the "more apps" strip. */
export function AppCard({ app }: { app: AppStoreLinks }) {
  const isStoreApp = Boolean(app.iosAppId || app.androidPackage);
  return (
    <Link
      href={`/apps/${app.slug}`}
      className="group flex cursor-pointer items-center gap-5 rounded-xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-accent hover:bg-accent-soft sm:p-6"
    >
      <AppIcon app={app} size="small" />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-lg font-semibold text-primary">
            {app.nameAr}
          </span>
          <span lang="en" dir="ltr" className="text-sm text-muted-foreground">
            {app.nameEn}
          </span>
        </span>
        <span lang="ar" className="text-sm leading-6 text-secondary">
          {app.taglineAr}
        </span>
        <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-accent-hover">
          {app.extensionStores ? (
            <span lang="en" dir="ltr">Chrome · Firefox · Safari</span>
          ) : isStoreApp ? (
            <span lang="en" dir="ltr">iOS · Android</span>
          ) : (
            <span lang="ar">منصة ويب</span>
          )}
        </span>
      </span>
      <span
        className="text-border-strong transition-colors duration-200 group-hover:text-accent rtl:rotate-180"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

/** Store buttons + availability note for an app, or the website action for web platforms. */
export function AppActions({ app }: { app: AppStoreLinks }) {
  const isStoreApp = Boolean(app.iosAppId || app.androidPackage);

  if (app.extensionStores) {
    const liveCount = app.extensionStores.filter((s) => s.live).length;
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          {app.extensionStores.map((store, index) => (
            <ExtensionStoreButton
              key={store.key}
              store={store}
              primary={store.live && index === app.extensionStores!.findIndex((s) => s.live)}
            />
          ))}
        </div>
        {liveCount < app.extensionStores.length ? (
          <p className="text-sm text-secondary">
            <span lang="ar">
              المتاجر المعلّمة «قيد المراجعة» ستُفتح روابطها فور اعتمادها.
            </span>
          </p>
        ) : null}
      </div>
    );
  }

  if (!isStoreApp) {
    return (
      <div className="space-y-4">
        {app.website ? (
          <a
            href={app.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 cursor-pointer items-center gap-3 rounded-xl bg-primary px-8 py-3 font-display text-base font-semibold text-primary-foreground transition-colors duration-200 hover:bg-accent hover:text-white"
          >
            <span lang="ar">زيارة المنصة</span>
            <span lang="en" dir="ltr" className="text-sm opacity-80">
              Visit the platform
            </span>
          </a>
        ) : null}
        <p className="text-sm text-secondary">
          <span lang="ar">منصة ويب — تعمل من المتصفح مباشرة دون تنزيل.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {app.iosAppId ? (
          <StoreButton href={appStoreUrl(app.iosAppId)} store="ios" primary />
        ) : null}
        {app.androidPackage ? (
          <StoreButton
            href={playStoreUrl(app.androidPackage)}
            store="android"
            primary={!app.iosAppId}
          />
        ) : null}
      </div>
      {/* Stated plainly rather than left as a guess when one store is absent. */}
      {!app.iosAppId || !app.androidPackage ? (
        <p className="text-sm text-secondary">
          <span lang="ar">
            {app.iosAppId ? "نسخة أندرويد قادمة قريبًا." : "نسخة iOS قادمة قريبًا."}
          </span>
        </p>
      ) : null}
    </div>
  );
}
