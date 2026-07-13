# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Bin Askar Technology
**Generated:** 2026-07-13 — redesigned as a founder-led technology advisory practice
**Category:** B2B Service
**Design Dials:** Variance 8/10 (Editorial / Asymmetric) | Motion 5/10 (Standard) | Density 3/10 (Spacious)

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#14231E` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#53635C` | `--color-secondary` |
| Accent/CTA | `#B8792B` | `--color-accent` |
| Background | `#F3EFE7` | `--color-background` |
| Foreground | `#14231E` | `--color-foreground` |
| Muted | `#E8E1D5` | `--color-muted` |
| Border | `#D6CEC0` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring | `#0F172A` | `--color-ring` |

**Color Notes:** Ink green + brass editorial authority

### Typography

- **Heading Font:** Lexend
- **Body Font:** Source Sans 3
- **Mood:** corporate, trustworthy, accessible, readable, professional, clean
- **Google Fonts:** [Lexend + Source Sans 3](https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

*Density: 3/10 — Spacious*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

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
/* Primary Button */
.btn-primary {
  background: #B8792B;
  color: #14231E;
  padding: 12px 24px;
  border-radius: 2px;
  font-weight: 700;
  transition: color 200ms ease, background-color 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: #FFFDF8;
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #14231E;
  border-bottom: 1px solid #14231E;
  padding: 12px 24px;
  border-radius: 0;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FFFDF8;
  border: 1px solid #D6CEC0;
  border-radius: 0;
  padding: 32px;
  box-shadow: none;
  transition: background-color 200ms ease, border-color 200ms ease;
}

.card:hover {
  background: #F0DFC5;
  border-color: #B8792B;
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #D6CEC0;
  border-radius: 2px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #B8792B;
  outline: none;
  box-shadow: 0 0 0 3px #B8792B20;
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

**Style:** Trust & Authority + Founder-led Editorial Advisory

**Keywords:** decisive, editorial, founder-led, architecture, field notes, real products, quiet authority, spacious, asymmetric

**Best For:** Healthcare/medical landing pages, financial services, enterprise software, premium/luxury products, legal services

**Key Effects:** thin editorial rules, restrained reveal motion, large numeric markers, paper/ink contrast, precise hover color shifts

### Page Pattern

**Pattern Name:** Trust & Authority + Conversion

- **Conversion Strategy:** Name the decision problem, show where the practice fits, prove through real products, make the first conversation low-friction.
- **CTA Placement:** Hero + navigation + final contact section.
- **Section Order:** 1. Hero (decision + proof), 2. Fit signals, 3. Services, 4. Case studies, 5. Operating model, 6. Practice + leadership, 7. Contact.

---

## Motion

**Reveal motion** — Trigger: first viewport entry | Duration: 700ms | Easing: `cubic-bezier(0.16, 1, 0.3, 1)`

- Use opacity + translateY only, with 60–90ms stagger for related items.
- Keep hover/focus transitions between 150–300ms and avoid layout-shifting transforms.
- `prefers-reduced-motion` must disable all decorative motion and smooth scrolling.

---

## Anti-Patterns (Do NOT Use)

- ❌ Playful design
- ❌ Hidden credentials
- ❌ AI purple/pink gradients

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
