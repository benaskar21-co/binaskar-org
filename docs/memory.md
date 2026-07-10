# memory.md — Bin Askar Technology

## الحالة الحالية

- موقع شركة استشارية تقنية ثنائي اللغة (ar/en)
- العلامة: **Bin Askar Technology | بن عسكر للتقنية**
- القائد: عبدالله بن عسكر — CTO ومستشار تقني
- الاستضافة المستهدفة: Vercel + Namecheap DNS

## قرارات تقنية

| القرار | الاختيار | السبب |
|--------|----------|-------|
| Framework | Next.js 16 App Router | SEO، Server Actions، i18n |
| Styling | Tailwind CSS v4 | سرعة التطوير، RTL |
| i18n | Custom `[locale]` + JSON | خفيف، تحكم كامل بـ RTL |
| Email | Resend (اختياري) | بسيط مع Vercel |
| الاختبارات | Vitest + Playwright | وحدة + e2e |
| الهوية البصرية | داكن فخم/تقني (Dark luxury-tech) | تمييز، إحساس Premium |

## نظام التصميم (UI)

- **الثيم:** داكن — خلفية أساس `--base` (#050b14) وطبقات `--surface`/`--surface-2`، حدود `--border`.
- **لون التمييز:** ذهبي `--accent` (#e6b657) + مقياس `brand-*` أزرق عميق للعمق.
- **الخطوط:** عناوين `Fraunces` (en) و`El Messiri` (ar) عبر `--font-display`؛ النص `DM Sans` / `IBM Plex Sans Arabic`.
- **الحركة:** كشف عند التمرير بمكوّن `Reveal` (يُعطّل تلقائيًا مع `prefers-reduced-motion`) — بدون مكتبات حركة خارجية.
- **الوصولية:** تباين AA على الخلفيات الداكنة، حلقات تركيز ذهبية واضحة.
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
