import type { Locale } from "@/lib/i18n/config";

export function DirectionalArrow({ locale }: { locale: Locale }) {
  return (
    <span aria-hidden="true" className="inline-block">
      {locale === "ar" ? "←" : "→"}
    </span>
  );
}

type FlowArrowProps = {
  locale: Locale;
  className?: string;
};

export function FlowArrow({ locale, className = "" }: FlowArrowProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block text-accent ${className}`.trim()}
    >
      {locale === "ar" ? "←" : "→"}
    </span>
  );
}
