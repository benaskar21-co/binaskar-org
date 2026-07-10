export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};

export const localeDirections: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const siteConfig = {
  name: "Bin Askar Technology",
  nameAr: "بن عسكر للتقنية",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://binaskar.org",
  linkedIn: "https://www.linkedin.com/in/abdullah-bin-askar",
  contactEmail: "abdullah@binaskar.org",
  leader: "Abdullah Bin Askar",
  leaderAr: "عبدالله بن عسكر",
};
