import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/i18n/config";

type BrandMarkProps = {
  className?: string;
  title?: string;
  variant?: "dark" | "light";
};

/** The Bin Askar monogram: B + A joined as one architectural, upward mark. */
export function BrandMark({
  className = "h-10 w-10",
  title = "Bin Askar Technology",
  variant = "dark",
}: BrandMarkProps) {
  const ink = variant === "dark" ? "#14231E" : "#FFFDF8";
  const brass = "#B8792B";

  return (
    <svg
      className={className}
      viewBox="0 0 72 64"
      fill="none"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <rect x="1" y="1" width="70" height="62" rx="15" fill={ink} />
      <path
        d="M14 50V14h12.5c8.2 0 12.8 3.5 12.8 9.7 0 4-2.2 6.8-6.5 8.1 5.1 1.1 7.8 4.2 7.8 8.9 0 6.5-4.9 10.3-14.2 10.3H14Zm7.3-21.2h5c3.8 0 5.8-1.4 5.8-4.1 0-2.5-2-3.8-5.8-3.8h-5v7.9Zm0 14.7h6c4.1 0 6.1-1.4 6.1-4.3 0-2.8-2-4.2-6.1-4.2h-6v8.5Z"
        fill={brass}
      />
      <path
        d="m39 50 10.3-36h7.4L67 50h-7.6l-2-7.6H48.2L46.1 50H39Zm11-14h5.8l-2.9-11.2L50 36Z"
        fill={variant === "dark" ? "#FFFDF8" : brass}
      />
      <path d="M39 50h7.1" stroke={brass} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type BrandLockupProps = {
  locale: Locale;
  compact?: boolean;
};

export function BrandLockup({ locale, compact = false }: BrandLockupProps) {
  const name = locale === "ar" ? siteConfig.nameAr : siteConfig.name;

  return (
    <span className="flex items-center gap-3">
      <BrandMark className="h-9 w-10 shrink-0" />
      {!compact ? (
        <span className="flex flex-col leading-tight">
          <span className="font-display text-base font-medium tracking-[-0.03em] text-white">
            {name}
          </span>
          <span className="text-[0.65rem] text-white/65">
            Bin Askar Technology
          </span>
        </span>
      ) : null}
    </span>
  );
}
