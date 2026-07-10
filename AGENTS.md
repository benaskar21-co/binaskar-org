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

```bash
npx skills ls
./scripts/skills.sh find react
```

## النشر

- **Vercel:** معاينة + إنتاج
- **النطاق:** binaskar.org عبر Namecheap DNS
- **الأسرار:** `.env.local` فقط — راجع `.env.example`
