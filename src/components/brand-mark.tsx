import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/i18n/config";

type BrandMarkProps = {
  className?: string;
  title?: string;
  /**
   * "dark"  — dark (ink) dots for LIGHT surfaces (default).
   * "light" — light dots for DARK surfaces.
   */
  variant?: "dark" | "light";
};

/**
 * «النظام من الضجيج» — Order from Noise.
 * Scattered dots resolve, column by column, into an ordered grid;
 * the final column is Royal Violet. Colors come from design tokens.
 * Keep geometry in sync with src/app/icon.svg and apple-icon.svg.
 */
export function BrandMark({
  className = "h-10 w-10",
  title = "Bin Askar Technology",
  variant = "dark",
}: BrandMarkProps) {
  const ink = variant === "dark" ? "var(--foreground)" : "var(--primary-foreground)";
  const violet = variant === "dark" ? "var(--accent)" : "var(--accent-bright)";

  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* noise — jittered, faded */}
      <circle cx="8.8" cy="13.6" r="2.8" fill={ink} opacity="0.35" />
      <circle cx="7" cy="27.3" r="2.4" fill={ink} opacity="0.35" />
      <circle cx="6.9" cy="38.1" r="1.9" fill={ink} opacity="0.35" />
      <circle cx="9.5" cy="46" r="1.9" fill={ink} opacity="0.35" />
      <circle cx="20.6" cy="17.5" r="2" fill={ink} opacity="0.55" />
      <circle cx="19.7" cy="27.6" r="3.3" fill={ink} opacity="0.55" />
      <circle cx="21.4" cy="37.5" r="3.4" fill={ink} opacity="0.55" />
      <circle cx="18.9" cy="50.7" r="2.3" fill={ink} opacity="0.55" />
      <circle cx="31.2" cy="15.1" r="2.3" fill={ink} opacity="0.75" />
      <circle cx="32.7" cy="26.3" r="2.7" fill={ink} opacity="0.75" />
      <circle cx="32.3" cy="37.7" r="2.7" fill={ink} opacity="0.75" />
      <circle cx="31" cy="48" r="2.1" fill={ink} opacity="0.75" />
      {/* order — aligned */}
      <circle cx="43" cy="16" r="3.2" fill={ink} />
      <circle cx="43" cy="27" r="3.2" fill={ink} />
      <circle cx="43" cy="38" r="3.2" fill={ink} />
      <circle cx="43" cy="49" r="3.2" fill={ink} />
      {/* resolved — Royal Violet */}
      <circle cx="54" cy="16" r="3.4" fill={violet} />
      <circle cx="54" cy="27" r="3.4" fill={violet} />
      <circle cx="54" cy="38" r="3.4" fill={violet} />
      <circle cx="54" cy="49" r="3.4" fill={violet} />
    </svg>
  );
}

type BrandLockupProps = {
  locale: Locale;
  compact?: boolean;
  /** Surface the lockup sits on; controls mark and text colors. */
  variant?: "dark" | "light";
};

export function BrandLockup({
  locale,
  compact = false,
  variant = "dark",
}: BrandLockupProps) {
  const name = locale === "ar" ? siteConfig.nameAr : siteConfig.name;
  const onDark = variant === "dark";

  return (
    <span className="flex items-center gap-3">
      <BrandMark
        className="h-9 w-10 shrink-0"
        variant={onDark ? "light" : "dark"}
      />
      {!compact ? (
        <span className="flex flex-col leading-tight">
          <span
            className={`font-display text-base font-medium ${
              onDark ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            {name}
          </span>
          <span
            className={`text-[0.65rem] ${
              onDark ? "text-primary-foreground/65" : "text-secondary"
            }`}
          >
            Bin Askar Technology
          </span>
        </span>
      ) : null}
    </span>
  );
}
