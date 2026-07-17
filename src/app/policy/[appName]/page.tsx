import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BrandMark } from "@/components/brand-mark";
import {
  appPolicySlugs,
  getAppPolicy,
  type LocalizedPolicySection,
} from "@/lib/app-policies";
import { siteConfig } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{ appName: string }>;
};

export function generateStaticParams() {
  return appPolicySlugs.map((appName) => ({ appName }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { appName } = await params;
  const policy = getAppPolicy(appName);
  if (!policy) return {};

  const url = `${siteConfig.url}/policy/${policy.slug}`;
  const title = `سياسة خصوصية ${policy.appNameAr} | ${policy.appNameEn} Privacy Policy`;
  const description = `${policy.summaryAr} ${policy.summaryEn}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: policy.developerEn,
      locale: "ar_SA",
      alternateLocale: ["en_US"],
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

function PolicyCopy({
  copy,
  lang,
  dir,
}: {
  copy: LocalizedPolicySection;
  lang: "ar" | "en";
  dir: "rtl" | "ltr";
}) {
  return (
    <div lang={lang} dir={dir}>
      <h2 className="font-display text-2xl font-semibold leading-tight text-primary sm:text-3xl">
        {copy.title}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-8 text-secondary">
        {copy.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {copy.bullets ? (
          <ul className="space-y-3 ps-5">
            {copy.bullets.map((item) => (
              <li key={item} className="list-disc ps-1 marker:text-accent">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default async function AppPolicyPage({ params }: PageProps) {
  const { appName } = await params;
  const policy = getAppPolicy(appName);
  if (!policy) notFound();

  const deletionSubject = encodeURIComponent(
    `${policy.appNameEn} account deletion request`,
  );
  const deletionHref = `mailto:${policy.supportEmail}?subject=${deletionSubject}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-3 focus:text-white focus:shadow-lg"
      >
        تخطي إلى المحتوى / Skip to content
      </a>

      <header className="border-b border-border bg-surface/90">
        <div className="section-shell flex min-h-20 items-center justify-between gap-5 py-4">
          <Link
            href="/ar"
            className="flex min-h-11 cursor-pointer items-center gap-3 transition-colors duration-200 hover:text-accent"
            aria-label="العودة إلى موقع بن عسكر للتقنية"
          >
            <BrandMark className="h-10 w-11 shrink-0" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-sm font-semibold sm:text-base">
                {policy.developerAr}
              </span>
              <span
                lang="en"
                dir="ltr"
                className="text-[0.68rem] text-muted-foreground sm:text-xs"
              >
                {policy.developerEn}
              </span>
            </span>
          </Link>
          <a
            href="#account-deletion"
            className="inline-flex min-h-11 cursor-pointer items-center border-b border-accent px-1 text-sm font-semibold text-primary transition-colors duration-200 hover:text-accent"
          >
            حذف الحساب / Delete account
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="border-b border-border py-16 sm:py-24 lg:py-28">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="eyebrow">{policy.appNameAr} · {policy.appNameEn}</p>
                <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,7vw,6.5rem)] font-semibold leading-[0.98] text-primary">
                  سياسة الخصوصية
                  <span
                    lang="en"
                    dir="ltr"
                    className="mt-3 block font-[var(--font-display-latin)] text-[0.44em] tracking-[-0.04em] text-accent"
                  >
                    Privacy Policy
                  </span>
                </h1>
              </div>

              <dl className="border-t border-border-strong text-sm">
                <div className="flex items-center justify-between gap-6 border-b border-border py-4">
                  <dt className="text-muted-foreground">التطبيق / App</dt>
                  <dd className="font-semibold text-primary">
                    {policy.appNameAr} · {policy.appNameEn}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-6 border-b border-border py-4">
                  <dt className="text-muted-foreground">التحديث / Updated</dt>
                  <dd className="text-end font-semibold text-primary">
                    <span className="block">{policy.effectiveDateAr.replace("آخر تحديث: ", "")}</span>
                    <span lang="en" dir="ltr" className="block text-xs text-muted-foreground">
                      {policy.effectiveDateEn.replace("Last updated: ", "")}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-14 grid border border-border bg-surface md:grid-cols-2">
              <div lang="ar" dir="rtl" className="p-6 sm:p-8 md:border-l md:border-border">
                <p className="text-lg leading-8 text-primary">{policy.summaryAr}</p>
              </div>
              <div lang="en" dir="ltr" className="border-t border-border p-6 sm:p-8 md:border-t-0">
                <p className="font-[var(--font-body)] text-lg leading-8 text-primary">
                  {policy.summaryEn}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="account-deletion" className="scroll-mt-6 border-b border-border bg-primary py-14 text-white sm:py-18">
          <div className="section-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="grid gap-6 md:grid-cols-2">
              <div lang="ar" dir="rtl">
                <p className="text-xs font-bold tracking-[0.14em] text-accent-soft">إدارة بياناتك</p>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">طلب حذف الحساب والبيانات</h2>
                <p className="mt-4 max-w-xl leading-7 text-white/75">
                  أرسل الطلب من البريد المسجل في حساب اكتفائي. لا ترسل كلمة المرور أو رمز التحقق أو بيانات البطاقة.
                </p>
              </div>
              <div lang="en" dir="ltr">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-soft">Your data controls</p>
                <h2 className="mt-3 font-[var(--font-display-latin)] text-3xl font-semibold sm:text-4xl">Request account and data deletion</h2>
                <p className="mt-4 max-w-xl font-[var(--font-body)] leading-7 text-white/75">
                  Send the request from the email registered to your Ektifai account. Never send a password, verification code, or card details.
                </p>
              </div>
            </div>
            <a
              href={deletionHref}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center bg-accent px-6 py-3 text-center font-bold text-primary transition-colors duration-200 hover:bg-surface focus-visible:outline-white"
            >
              طلب الحذف / Request deletion
            </a>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="section-shell">
            <div className="border-t border-border-strong">
              {policy.sections.map((section, index) => (
                <article
                  id={section.id}
                  key={section.id}
                  className="scroll-mt-8 grid gap-7 border-b border-border py-10 sm:py-12 lg:grid-cols-[4rem_1fr_1fr] lg:gap-10"
                >
                  <span
                    aria-hidden="true"
                    className="font-[var(--font-display-latin)] text-lg font-semibold tabular-nums text-accent"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <PolicyCopy copy={section.ar} lang="ar" dir="rtl" />
                  <div className="border-t border-border pt-7 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0">
                    <PolicyCopy copy={section.en} lang="en" dir="ltr" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface py-14 sm:py-18">
          <div className="section-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="eyebrow">الخصوصية / Privacy</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-primary sm:text-4xl">
                تواصل مع بن عسكر للتقنية
              </h2>
              <p lang="en" dir="ltr" className="mt-2 font-[var(--font-display-latin)] text-xl text-secondary">
                Contact Bin Askar Technology
              </p>
            </div>
            <a
              href={`mailto:${policy.supportEmail}`}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center border border-primary px-6 py-3 font-semibold text-primary transition-colors duration-200 hover:border-accent hover:bg-accent-soft"
            >
              <bdi dir="ltr">{policy.supportEmail}</bdi>
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-primary-deep py-8 text-white/65">
        <div className="section-shell flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {policy.developerAr} · {policy.developerEn}</p>
          <Link
            href="/ar"
            className="inline-flex min-h-11 cursor-pointer items-center transition-colors duration-200 hover:text-white"
          >
            binaskar.org
          </Link>
        </div>
      </footer>
    </div>
  );
}
