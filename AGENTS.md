# AGENTS.md — Bin Askar Technology

> **للـ AI:** اقرأ هذا الملف + [`docs/memory.md`](docs/memory.md) + [`docs/PHASES.md`](docs/PHASES.md) قبل أي تغيير. حدّث `memory.md` و `PHASES.md` بعد كل مرحلة.

## هيكل المشروع

```
binaskar-org/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── [locale]/     # ar | en
│   │   └── api/          # Route handlers
│   ├── components/       # UI components
│   ├── lib/              # i18n, SEO, validation
│   ├── actions/          # Server Actions
│   └── messages/         # ar.json, en.json
├── docs/                 # memory, phases, deployment
├── scripts/              # skills.sh
├── .agents/skills/       # skills.sh installed skills
└── tests/                # unit + e2e
```

## أوامر التشغيل

```bash
npm run dev          # تطوير محلي
npm run build        # بناء الإنتاج
npm run lint         # ESLint
npm run test         # Vitest
npm run test:e2e     # Playwright
```

## قواعد إلزامية (AI)

| # | القاعدة | المرجع |
|---|---------|--------|
| 1 | العربية هي اللغة الافتراضية (`/ar`) | `src/lib/i18n/config.ts` |
| 2 | دعم RTL/LTR كامل لكل locale | `.cursor/rules/i18n-rtl.mdc` |
| 3 | لا تنشر الهاتف الشخصي أو أسرار API | `docs/memory.md` |
| 4 | Server Components افتراضياً — `'use client'` عند الحاجة فقط | `.cursor/rules/nextjs-standards.mdc` |
| 5 | بعد كل مرحلة: حدّث `docs/PHASES.md` + `docs/memory.md` | — |

## Skills (`.agents/skills/`)

| Skill | متى تستخدمه |
|-------|-------------|
| `frontend-design` | تصميم واجهات مميزة، typography، motion |
| `react-expert` | مكونات React، hooks، accessibility |
| `nextjs` | App Router، metadata، Server Actions |
| `namecheap` | ربط DNS لـ binaskar.org (بموافقة صريحة) |
| `brainstorming` | **قبل** أي عمل إبداعي: استكشاف النية والمتطلبات قبل التنفيذ |
| `writing-plans` | خطة التنفيذ بعد اعتماد التصميم (المرحلة التالية لـ `brainstorming`) |
| `ux-writing` | صياغة microcopy: أزرار، رسائل خطأ، حالات فارغة، نجاح |
| `high-end-visual-design` | مرجع بصري متقدم — **بقيود، انظر أدناه** |

> **`brainstorming` → `writing-plans`:** المهارة الأولى تكتب المواصفات في `docs/superpowers/specs/` ولا تستدعي بعدها إلا `writing-plans`.

### ⚠️ قيود `high-end-visual-design`

هذه المهارة تفرض جماليات عامة تتعارض مع هوية الموقع. **`design-system/bin-askar-technology/MASTER.md` يتقدّم عليها دائماً.** استخدمها كمرجع للتقنيات فقط (عمق، إيقاع، حركة)، مع تجاهل ما يلي:

| تفرضه المهارة | القاعدة المعتمدة هنا (هوية Royal Violet v4) |
|----------------|----------------------|
| خطوط Geist / Clash Display / Plus Jakarta Sans | `Sora` (لاتيني) + `Readex Pro` (عربي) |
| نمط "Ethereal Glass": أسود OLED + كرات بنفسجية متوهجة وتدرّجات | بنفسجي **مسطّح** #5B2EBC على بلوم #1A1226 وكوارتز #FBFAFD — **أي تدرّج ممنوع** |
| "Variance Mandate": لا تكرر التخطيط أبداً | الاتساق مع نظام التصميم مقدَّم على التنويع |
| افتراضات LTR (أيقونة يمين الزر، `translate-x-1`، `w-1/2` يسار) | RTL/LTR إلزامي — راجع كل اتجاه منطقياً (`ms-`/`me-`) |

**مفيد منها فعلاً:** حواجز الأداء (تحريك `transform`/`opacity` فقط، `backdrop-blur` للعناصر الثابتة فقط، `IntersectionObserver` بدل `scroll` listener، `min-h-[100dvh]`) — وهي متوافقة مع مكوّن `Reveal` الحالي.

```bash
npx skills ls
./scripts/skills.sh find react
```

## Skill: ui-ux-pro-max (`.cursor/skills/ui-ux-pro-max/`)

محرك ذكاء تصميمي **v2.0** (84 نمطاً، 192 لوحة ألوان، 74 اقتران خطوط، 192 نوع منتج، 98 إرشاد UX، 25 نوع رسم بياني، 22 stack). **استخدمه قبل أي عمل UI/UX جديد أو إعادة تصميم.**

- **نظام التصميم المعتمد للموقع:** `design-system/bin-askar-technology/MASTER.md` — هو **مصدر الحقيقة** للألوان/الخطوط/المسافات. عند بناء صفحة، تحقق أولاً من `design-system/bin-askar-technology/pages/[page].md`؛ إن وُجد فقواعده تتجاوز MASTER.
- **النمط:** Royal Violet (هوية v4) — بنفسجي مسطّح + بلوم داكن + كوارتز، تباين **AA+** (نص ≥4.5:1، عناوين هدف ≥7:1)، وضع فاتح فقط.
- **تجنّب (anti-patterns):** تصاميم مرحة، أي تدرّجات (خاصة AI البنفسجية/الوردية)، إخفاء الاعتمادات، إيموجي كأيقونات.

```bash
# توليد/تحديث نظام تصميم
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system -p "Bin Askar Technology" --persist
# بحث ضمن مجال محدد (style/color/typography/ux/landing…)
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain>
```

> **Python 3 مطلوب** لتشغيل سكربت البحث (مكتبة قياسية فقط، بلا شبكة).
>
> ⚠️ **`--persist` يعيد توليد `MASTER.md`** — وهو مصدر الحقيقة للموقع المنشور. لا تستخدمه إلا عند إعادة تصميم مقصودة؛ للاستكشاف استخدم الأمر بدون `--persist`.
>
> للتحقق من سلامة بيانات المهارة: `python3 .cursor/skills/ui-ux-pro-max/scripts/validate_data.py`

## النشر

- **Vercel:** معاينة + إنتاج
- **النطاق:** binaskar.org عبر Namecheap DNS
- **الأسرار:** `.env.local` فقط — راجع `.env.example`
