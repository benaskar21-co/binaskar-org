# DEPLOYMENT.md — Bin Askar Technology

## 1. Render

### إنشاء الخدمة

1. ادخل إلى [Render Dashboard](https://dashboard.render.com).
2. **New → Blueprint** واربط المستودع `benaskar21-co/binaskar-org`، أو **New → Web Service** يدوياً.
3. إذا استخدمت Blueprint، سيُقرأ `render.yaml` تلقائياً.

### إعداد يدوي (بدون Blueprint)

| الحقل | القيمة |
|-------|--------|
| Runtime | Node |
| Build Command | `npm ci && npm run build` |
| Start Command | `npm start` |
| Health Check Path | `/ar` |

### متغيرات البيئة

**الخيار الموصى به — PrivateEmail (SMTP):**

| المتغير | الوصف |
|---------|-------|
| `SMTP_HOST` | `mail.privateemail.com` |
| `SMTP_PORT` | `465` (SSL) أو `587` (STARTTLS) |
| `SMTP_SECURE` | `true` للمنفذ 465، `false` للمنفذ 587 |
| `SMTP_USER` | البريد الكامل، مثلاً `abdullah@binaskar.org` |
| `SMTP_PASS` | كلمة مرور صندوق PrivateEmail (Secret) |
| `SMTP_FROM_NAME` | `Bin Askar Technology` (اختياري) |
| `CONTACT_EMAIL` | `abdullah@binaskar.org` — مستلم رسائل النموذج |

> **مهم:** عنوان `from` يجب أن يطابق `SMTP_USER` (قيد PrivateEmail).

**بديل اختياري — Resend** (يُستخدم فقط إذا لم تُضبط SMTP):

| المتغير | الوصف |
|---------|-------|
| `RESEND_API_KEY` | مفتاح Resend |
| `RESEND_FROM` | عنوان المرسل المعتمد في Resend |

| المتغير | الوصف |
|---------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://binaskar.org` |
| `NODE_VERSION` | `20.18.0` (اختياري — مُعرّف في `render.yaml`) |

### النطاق المخصص على Render

1. في إعدادات الخدمة: **Settings → Custom Domains**.
2. أضف `binaskar.org` و `www.binaskar.org`.
3. اتبع تعليمات Render لسجلات DNS (عادة CNAME لـ `www`).

## 2. Namecheap DNS

> **تحذير:** لا تعدّل DNS دون موافقة صريحة. احتفظ بسجلات البريد الحالية.

بعد إضافة النطاق في Render، استخدم السجلات التي يعرضها Render (قد تختلف حسب الخطة). النموذج الشائع:

| النوع | الاسم | القيمة |
|-------|-------|--------|
| CNAME | www | `<your-service>.onrender.com` |
| ALIAS/ANAME أو A | @ | حسب تعليمات Render للنطاق الجذري |

### استخدام مهارة Namecheap

```bash
python3 .agents/skills/namecheap/namecheap.py domains.dns.getHosts --domain binaskar.org
```

راجع `.agents/skills/namecheap/SKILL.md` للتفاصيل.

## 3. الإصدارات

| الإصدار | الوصف |
|---------|-------|
| `v1.0.0` | الإصدار الأول — موقع ثنائي اللغة، نموذج تواصل، SEO، llms.txt |

```bash
git tag -l
git checkout v1.0.0
```

## 4. التحقق بعد النشر

- [ ] HTTPS يعمل على `binaskar.org` و `www.binaskar.org`
- [ ] `/ar` و `/en` يعملان مع RTL/LTR
- [ ] نموذج التواصل يرسل بنجاح
- [ ] `sitemap.xml` و `robots.txt` و `/llms.txt`
- [ ] Open Graph في معاينة المشاركة
