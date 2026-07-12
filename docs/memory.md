# memory.md — Bin Askar Technology

## الحالة الحالية

- موقع شركة استشارية تقنية ثنائي اللغة (ar/en)
- العلامة: **Bin Askar Technology | بن عسكر للتقنية**
- القائد: عبدالله بن عسكر — CTO ومستشار تقني
- الاستضافة: Render أو Vercel + Namecheap DNS (اختيار المنصة لم يُحسم)

## قرارات تقنية

| القرار | الاختيار | السبب |
|--------|----------|-------|
| Framework | Next.js 16 App Router | SEO، Server Actions، i18n |
| Styling | Tailwind CSS v4 | سرعة التطوير، RTL |
| i18n | Custom `[locale]` + JSON | خفيف، تحكم كامل بـ RTL |
| Email | PrivateEmail SMTP (primary) + Resend HTTPS fallback | PrivateEmail works on a paid Render service; Render Free blocks SMTP ports |
| الاختبارات | Vitest + Playwright | وحدة + e2e |
| الهوية البصرية | داكن فخم/تقني (Dark luxury-tech) | تمييز، إحساس Premium |

## نظام التصميم (UI) — Trust & Authority

مُولّد بمهارة `ui-ux-pro-max`، مصدر الحقيقة: `design-system/bin-askar-technology/MASTER.md`.

- **النمط:** Trust & Authority (استشارات B2B) — لوحة احترافية فاتحة.
- **الألوان:** primary أخضر حبري #14231E، accent ذهبي #B8792B، خلفية ورقية #F3EFE7، وأسطح #FFFDF8.
- **الاتجاه:** Editorial Founder Profile — ملف شخصي جريء يقود إلى خدمات الشركة ودراسات الحالة ثم التواصل.
- **الشعار:** monogram هندسي BA يربط بين القيادة التقنية (B) والحركة الصاعدة/المعمارية (A)، بصيغة SVG في `src/components/brand-mark.tsx`.
- **الخطوط:** `Lexend` (عناوين لاتينية) + `Source Sans 3` (نص لاتيني)؛ `IBM Plex Sans Arabic` للعربية.
- **الحركة:** كشف عند التمرير بمكوّن `Reveal` (يحترم `prefers-reduced-motion`)، انتقالات 150-300ms، ظلال ناعمة.
- **الوصولية:** WCAG AA+ ، تباين ≥ 4.5:1، حلقات focus مرئية، أيقونات SVG.
- **تجنّب:** تصاميم مرحة، تدرّجات AI بنفسجية/وردية، إخفاء الاعتمادات، إيموجي كأيقونات.
- **ثبات المحتوى:** إعادة التصميم لم تغيّر أي نص في `messages/ar.json` و`en.json`.

## محتوى حساس — لا تنشر

- رقم الهاتف الشخصي
- تفاصيل تعاقدات الأوقاف (Emdad/Sure/Ejada)
- أرقام أعمال غير مؤكدة
- مفاتيح API (Namecheap، Resend، Vercel)

## قنوات التواصل العامة

- LinkedIn: https://www.linkedin.com/in/abdullah-bin-askar
- نموذج تواصل على الموقع
- بريد مهني عند توفره عبر `CONTACT_EMAIL`

## دراسات الحالة

- [Minnha](https://www.minnha.sa) — قبول جامعي وابتعاث
- [Hido](https://hido.app) — سياحة محلية رقمية
