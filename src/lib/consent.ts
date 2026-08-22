/**
 * Analytics consent, stored on the visitor's own device.
 *
 * The value is read in two places that cannot share a runtime — the inline GA
 * bootstrap (rendered on the server, executed before hydration) and the banner
 * (a client component) — so the key and the accepted values live here rather
 * than as a string literal duplicated across both.
 */
export const CONSENT_KEY = "ba-analytics-consent";

export type ConsentChoice = "granted" | "denied";

/** Narrow an unknown localStorage value; anything else means "not asked yet". */
export function isConsentChoice(value: unknown): value is ConsentChoice {
  return value === "granted" || value === "denied";
}
