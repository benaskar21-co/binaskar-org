# Bin Askar Technology — Brand direction (identity v4 «Royal Violet»)

## Concept

The identity is **Order from Noise — النظام من الضجيج**. The mark shows scattered dots resolving, column by column, into a precise grid that ends in one Royal Violet column: digitalization as the act of turning chaos into structure. The mark is the service.

## Logo system

- Primary mark: «Order from Noise» dot-matrix in `src/components/brand-mark.tsx` (viewBox 64×64, 5 columns × 4 rows; columns 1–3 jittered and faded, column 4 ordered ink, column 5 Royal Violet).
- Colors are token-driven in the component: `variant="dark"` renders ink dots for light surfaces; `variant="light"` renders light dots for dark surfaces (`--primary-foreground` + `--accent-bright`).
- Favicon (`src/app/icon.svg`): simplified **3-column** derivative (noise → ink → violet), adaptive to browser dark mode via an embedded `prefers-color-scheme` media query. Hex values are hardcoded there by necessity — keep them in sync with `globals.css` tokens.
- App icon (`src/app/apple-icon.svg`): plum tile (`#1A1226`, radius 40/180) with light dots and violet resolved column.
- Reading direction: the mark resolves left→right in all locales (it is an abstract diagram, not script; do not mirror it in RTL).
- Small-size use: mark alone; clear space equal to one quarter of the mark width.
- Never stretch, rotate, outline, add gradients to, or place the mark over a busy image.
- Trademark note: a good-faith similarity search (2026-08) found no existing company mark using this scattered-to-ordered dot transition; formal clearance via SAIP/WIPO (classes 35/42) is still recommended before registration.

## Color

| Token | Hex | Use |
| --- | --- | --- |
| Plum Black | `#1A1226` | Dark sections, primary text, app-icon tile |
| Royal Violet | `#5B2EBC` | Mark's resolved column, actions, emphasis (flat only — never gradients) |
| Violet Bright | `#A886F0` | Accent on dark surfaces (labels, mark) |
| Quartz | `#FBFAFD` | Page background |
| White | `#FFFFFF` | Cards and form surfaces |
| Graphite Mauve | `#5A5168` | Supporting text |
| Lilac Ash | `#EEEAF4` | Muted fills, soft accents |

Contrast standard: **AA+** — body text ≥ 4.5:1, headings and CTAs target ≥ 7:1.

## Typography

- Latin (display + body): **Sora** (variable). Display weight 600–700, tracking −0.03em; body 300–500.
- Arabic (display + body): **Readex Pro** (variable), tracking 0 — never inherit negative Latin tracking.
- Loaded via `next/font/google` in `src/app/[locale]/layout.tsx`.

## Voice and composition

Use confident, concise, product-grade layouts. Lead with the founder’s judgment, show the work through case studies, then make contact easy. The visual language should feel premium and precise—flat color fields, soft 8–12px radii, scarce violet—never playful, glossy, gradient-washed, or startup-generic.

## Messaging direction

- Lead with the client decision and its business consequence, not a list of technologies.
- Position the company as a founder-led technology advisory practice that stays close to delivery.
- Describe every service through the situation it resolves and the output the client can own.
- Prefer concrete language: direction, architecture, delivery, governance, evaluation, and knowledge transfer.
- Avoid generic “digital journey” language, inflated transformation claims, and unsupported performance metrics.
