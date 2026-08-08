# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Bin Askar Technology
**Generated:** 2026-08-09 (identity v4 — "Royal Violet", user-approved from curated candidates)
**Category:** Premium Technology Advisory (B2B, founder-led)
**Design Dials:** Variance 6/10 (Balanced / Modern) | Motion 5/10 (Standard) | Density 3/10 (Spacious)

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary (Plum Black) | `#1A1226` | `--color-primary` |
| Primary Deep | `#120C1B` | `--color-primary-deep` |
| On Primary | `#F4F1FA` | `--color-primary-foreground` |
| Secondary (Graphite Mauve) | `#5A5168` | `--color-secondary` |
| Accent/CTA (Royal Violet) | `#5B2EBC` | `--color-accent` |
| Accent Hover | `#4A25A0` | `--color-accent-hover` |
| Accent Soft | `#EEEAF4` | `--color-accent-soft` |
| Background (Quartz) | `#FBFAFD` | `--color-background` |
| Surface | `#FFFFFF` | `--color-surface` |
| Surface Muted | `#F2EFF7` | `--color-surface-muted` |
| Foreground | `#1A1226` | `--color-foreground` |
| Muted (Lilac Ash) | `#EEEAF4` | `--color-muted` |
| Muted Foreground | `#5A5168` | `--color-muted-foreground` |
| Border | `#E0DAEA` | `--color-border` |
| Border Strong | `#C4B9D6` | `--color-border-strong` |
| Destructive | `#B42318` | `--color-destructive` |
| Ring | `#5B2EBC` | `--color-ring` |

**Dark-section pairs (hero, methodology, contact):** text `#F4F1FA` on `#1A1226` (16.2:1); muted text `#A99BC6` (7.1:1); accent-on-dark `#A886F0` (6.3:1, large text/labels only).

**Color Notes:** Flat royal violet on plum black and quartz — premium product-company authority. **No gradients of any kind** (the violet is always flat; AI-style purple/pink gradients remain banned). Violet marks action and emphasis only; headings stay ink. Contrast verified: body ≥4.5:1 (AA+), headings and CTA ≥7:1 (AAA).

### Typography

- **Heading Font:** Sora (Latin) — weight 600/700, tracking -0.03em
- **Body Font:** Sora (Latin) — weight 300/400/500
- **Arabic Font:** Readex Pro (display + body) — weight 300–700, tracking 0
- **Mood:** premium, precise, product-grade, modern, bilingual-first
- **Loading:** `next/font/google` variable fonts (`Sora`, `Readex_Pro`) — one variable file per family
- **Google Fonts (preview only):** [Sora + Readex Pro](https://fonts.googleapis.com/css2?family=Sora:wght@300..700&family=Readex+Pro:wght@300..700&display=swap)

### Spacing Variables

*Density: 3/10 — Spacious*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `24px` / `1.5rem` | Standard padding |
| `--space-lg` | `32px` / `2rem` | Section padding |
| `--space-xl` | `48px` / `3rem` | Large gaps |
| `--space-2xl` | `64px` / `4rem` | Section margins |
| `--space-3xl` | `96px` / `6rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button — flat royal violet, 8px radius */
.btn-primary {
  background: #5B2EBC;
  color: #FFFFFF;
  padding: 12px 26px;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 200ms ease, transform 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: #4A25A0;
}

/* On dark sections the primary button may invert: bg #F4F1FA, color #1A1226 */

/* Secondary Button — quiet outline */
.btn-secondary {
  background: transparent;
  color: #1A1226;
  border: 1px solid #C4B9D6;
  padding: 11px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: border-color 200ms ease, background-color 200ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: #5B2EBC;
  background: #EEEAF4;
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border: 1px solid #E0DAEA;
  border-radius: 12px;
  padding: 28px;
  box-shadow: var(--shadow-sm);
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  border-color: #C4B9D6;
  box-shadow: var(--shadow-md);
}

/* Emphasis variant: 3px inline-start rule in Royal Violet (RTL-aware: border-inline-start) */
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E0DAEA;
  border-radius: 8px;
  font-size: 16px;
  background: #FFFFFF;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.input:focus {
  border-color: #5B2EBC;
  outline: none;
  box-shadow: 0 0 0 3px #5B2EBC20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Royal Violet — premium product-company authority (identity v4)

**Keywords:** flat violet, plum black, quartz calm, soft 8–12px radii, precise grotesk, bilingual-first, scarce accent, quiet depth

**Best For:** founder-led B2B technology advisory positioning itself with product-company polish rather than corporate-consultancy tropes

**Key Effects:** flat color fields (never gradients), soft diffuse shadows, 3px violet inline-start rules for emphasis, ghost numerals, 200–300ms transitions, visible focus, WCAG AA+ (body ≥4.5:1, headings/CTA target ≥7:1)

### Page Pattern

**Pattern Name:** Trust & Authority journey (structure retained from v3, reskinned)

- **Conversion Strategy:** decision-first narrative; proof through real case studies; low-friction contact form.
- **CTA Placement:** hero + nav + final contact section
- **Section Order:** 1. Hero (decision + proof), 2. Fit signals, 3. Services, 4. Case studies, 5. Operating model, 6. Practice + leadership, 7. Contact
- **Section Rhythm:** dark plum hero → quartz/white light sections → dark methodology → light → dark contact (alternation retained)

---

## Motion

**Stagger List** (Standard) — Trigger: load or scroll | Duration: 300-450ms | Easing: `back.out(1.4)`

```js
gsap.from('.grid-item', { opacity: 0, scale: 0.92, y: 16, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)' });
```

**Framework notes:** grid: 'auto' lets GSAP infer rows/columns from a CSS grid layout for a natural wave stagger

- ✅ Combine with from: 'center' for a bento-grid layout to draw the eye inward first
- ❌ Don't use back.out on dense data tables; the overshoot reads as sloppy on informational UI
- ⚡ Group DOM writes; avoid interleaving layout reads (getBoundingClientRect) between staggered tweens

---

## Anti-Patterns (Do NOT Use)

- ❌ Gradients of any kind — the violet is always flat (AI purple/pink gradients remain hard-banned)
- ❌ Playful design, decorative flourishes
- ❌ Violet as a text/heading color at body sizes (accent marks action and labels only)
- ❌ Cheap visuals
- ❌ Fast animations

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
