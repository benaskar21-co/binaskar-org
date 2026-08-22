import { getAppPolicy } from "@/lib/app-policies";

export type StorePlatform = "ios" | "android" | "other";

/**
 * Optional ranking content for an app page.
 *
 * Everything here is optional by design: an app without a `seo` block renders
 * exactly as it did before this existed, so pages can be filled in one at a
 * time without regressing the others. Copy is authored per language — Arabic
 * first, English written natively rather than translated from it.
 */
export type AppSeo = {
  /** Overrides the default `تحميل ${nameAr}` title. Target the problem, not the brand. */
  titleAr?: string;
  titleEn?: string;
  /** Overrides the meta description. */
  descriptionAr?: string;
  descriptionEn?: string;
  /** Rendered as <h2> + prose, in order. Blank lines separate paragraphs. */
  sections?: Array<{
    headingAr: string;
    headingEn: string;
    bodyAr: string;
    bodyEn: string;
  }>;
  /** Rendered as an FAQ block AND emitted as FAQPage JSON-LD. */
  faq?: Array<{ qAr: string; aAr: string; qEn: string; aEn: string }>;
};

export type ExtensionStore = {
  key: "chrome" | "firefox" | "safari";
  /** Permanent listing URL. AMO slugs and Apple ids are fixed at submission. */
  url: string;
  /** False while the listing is still in review — shown as "in review", never linked. */
  live: boolean;
};

export type AppStoreLinks = {
  slug: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  categoryAr: string;
  categoryEn: string;
  /** Path under /public. Store artwork for store apps, wordmark for web platforms. */
  icon: string;
  /** Square store icons get the tile treatment; wordmarks sit on a light card. */
  iconShape: "square" | "wordmark";
  /** Product website, shown for every app and the primary action for web platforms. */
  website: string | null;
  /** Apple's numeric App Store id. Null when the app is not on the App Store. */
  iosAppId: string | null;
  /** Play Store applicationId. Null when the app is not on Google Play. */
  androidPackage: string | null;
  /**
   * Browser-extension listings (Chrome Web Store / AMO / App Store), for products
   * that ship as an extension rather than a phone app. Ordered as displayed.
   */
  extensionStores: ExtensionStore[] | null;
  /** Privacy policy hosted outside this site (product subdomains). */
  privacyUrl: string | null;
  /** Slug under /policy when the policy is hosted on this site (our own apps only). */
  policySlug: string | null;
  /**
   * True for products Bin Askar builds and operates itself (shown on the landing
   * page); false for client products we led (shown as case studies).
   */
  own: boolean;
  /** Ranking content. Absent means the page renders as it always has. */
  seo?: AppSeo;
};

/**
 * schema.org subtype for the app's category. Google reads this to classify the
 * result; an unmapped category falls back to the generic type rather than
 * guessing a wrong one.
 */
export function applicationCategory(app: AppStoreLinks): string {
  // A browser extension is classified by what it is, not by the subject it
  // serves — "BrowserApplication" is the schema.org value for this shape.
  if (app.extensionStores) return "BrowserApplication";
  const map: Record<string, string> = {
    Finance: "FinanceApplication",
    Travel: "TravelApplication",
    Education: "EducationApplication",
  };
  return map[app.categoryEn] ?? "BusinessApplication";
}

const BROWSER_NAMES: Record<ExtensionStore["key"], string> = {
  chrome: "Chrome",
  firefox: "Firefox",
  safari: "Safari",
};

/** Live extension listings, in display order. Empty while all are unreleased. */
export function liveExtensionStores(app: AppStoreLinks): ExtensionStore[] {
  return app.extensionStores?.filter((store) => store.live) ?? [];
}

/** True when the page has something real to describe as installable software. */
export function isInstallableSoftware(app: AppStoreLinks): boolean {
  return Boolean(
    app.iosAppId || app.androidPackage || liveExtensionStores(app).length,
  );
}

/** "iOS, Android" — only the platforms the app is actually published on. */
export function operatingSystems(app: AppStoreLinks): string {
  // For an extension the useful answer is which browsers it runs in, and only
  // the ones actually published — an in-review listing is not availability.
  if (app.extensionStores) {
    return liveExtensionStores(app)
      .map((store) => BROWSER_NAMES[store.key])
      .join(", ");
  }
  const systems = [
    app.iosAppId ? "iOS" : null,
    app.androidPackage ? "Android" : null,
  ].filter(Boolean);
  return systems.join(", ");
}

/** The products we build and run ourselves, in landing-page order. */
export function getOwnApps(): AppStoreLinks[] {
  return appLinkSlugs
    .map((slug) => getAppLinks(slug))
    .filter((app): app is AppStoreLinks => app !== null && app.own);
}

/**
 * Everything /apps/{slug} needs, in one place.
 *
 * Store identifiers are verified against the stores themselves (Apple's lookup
 * service and the public Play listing), not copied from dashboards — a wrong id
 * here sends a campaign's worth of visitors to a dead page. Client products
 * (Minnha, Hido) list only what is publicly true about them; Ektifai is ours,
 * so it also carries the policy link.
 */
const APP_REGISTRY: Record<string, Omit<AppStoreLinks, "slug" | "nameAr" | "nameEn"> & {
  nameAr?: string;
  nameEn?: string;
}> = {
  ektifai: {
    // Names come from the policy registry so the download page and the policy
    // page can never disagree about what the app is called.
    taglineAr: "خطّط راتبك، تابع مصروفاتك، واعرف أين يذهب مالك.",
    taglineEn: "Plan your salary, track spending, and see where your money goes.",
    descriptionAr:
      "يجمع اكتفائي راتبك وميزانياتك ومصروفاتك في مكان واحد، لتعرف أين يذهب مالك وما المتبقي من خطتك خلال الشهر.",
    descriptionEn:
      "Ektifai brings your salary, budgets, and expenses together in one place, so you always know where your money goes and what remains in your plan.",
    categoryAr: "المالية الشخصية",
    categoryEn: "Finance",
    icon: "/apps/ektifai.jpg",
    iconShape: "square",
    website: null,
    // Verified against Apple's lookup service for bundleId org.binaskar.ektifai.
    iosAppId: "6793854538",
    androidPackage: "org.binaskar.ektifai",
    extensionStores: null,
    privacyUrl: null,
    policySlug: "ektifai",
    own: true,
    // Copy derived from the approved store pack in where-my-salary-go/
    // store-listing/ANDROID_PLAY_CONSOLE.md — the same claims that shipped to
    // Play, not new marketing language. Keywords follow ASO_REVIEW_2026-08 §4.
    seo: {
      titleAr: "وين راح راتبك؟ تطبيق ميزانية ومصروفات بالريال — اكتفائي",
      titleEn:
        "Where did your salary go? Salary budget & expense tracker — Ektifai",
      descriptionAr:
        "طبّق ميزانية شهرية على راتبك، سجّل مصروفاتك من رسائل البنك تلقائيًا، واعرف أين ذهب مالك وكم تبقّى. مجاني للتحميل ومصمم للرواتب السعودية بالريال.",
      descriptionEn:
        "Put a monthly budget on your salary, log expenses automatically from bank SMS, and see exactly where your money went. Free to download, built for Saudi salaries in SAR.",
      sections: [
        {
          headingAr: "أين يذهب راتبك كل شهر؟",
          headingEn: "Where does your salary go each month?",
          bodyAr:
            "راتبك ينزل مرة واحدة، لكن المصروفات تتوزع على ثلاثين يومًا. النتيجة المعتادة أن يصل منتصف الشهر ولا تعرف تحديدًا أين ذهب المبلغ: كم صُرف على المطاعم، وكم على الاشتراكات، وكم على مشتريات لم تكن في الحسبان أصلًا.\n\nاكتفائي يجمع الراتب والميزانيات والمصروفات في شاشة واحدة. تعرف من نظرة واحدة كم صرفت، وعلى ماذا، وكم تبقّى من خطة الشهر — بدل تقليب كشف الحساب في آخر الشهر ومحاولة تذكّر عملية عمرها أسبوعان.",
          bodyEn:
            "Your salary arrives once; spending spreads across thirty days. Ektifai puts the salary, the budgets, and the actual expenses on one screen, so mid-month you can answer where the money went instead of scrolling a bank statement trying to recognise a two-week-old transaction.",
        },
        {
          headingAr: "ميزانية شهرية بالريال: المخطّط مقابل الفعلي",
          headingEn: "A monthly budget in SAR: planned versus actual",
          bodyAr:
            "أضف راتبك الشهري وحدد يوم نزوله، ثم خصّص ميزانية مستقلة لكل مصروف. بعدها يتابع التطبيق بندًا بندًا: كم خطّطت، وكم صرفت فعلًا، والفرق بينهما.\n\nالمصروفات تُنظَّم كما تحدث في الواقع — شهري متكرر، مخطط لمرة واحدة، غير مخطط، مصاريف تأسيس، وقروض — لأن دمجها كلها في رقم واحد يخفي المشكلة بدل أن يظهرها. وعند اقترابك من حد أي ميزانية أو تجاوزه يصلك تنبيه في حينه، لا بعد فوات الأوان.",
          bodyEn:
            "Add your salary and its pay date, then give every expense its own budget. The app tracks each line: what you planned, what you actually spent, and the gap. Expenses stay separated into recurring, one-off planned, unplanned, setup costs, and loans, and an alert arrives as you approach a limit rather than after you pass it.",
        },
        {
          headingAr: "تسجيل المصروفات من رسائل البنك — دون إدخال يدوي",
          headingEn: "Log expenses from bank SMS — without typing them",
          bodyAr:
            "أكثر ما يُفشل تطبيقات الميزانية هو الإدخال اليدوي: تسجّل أسبوعًا ثم تتوقف. على أندرويد، وبعد موافقتك الصريحة، يقرأ اكتفائي رسائل العمليات البنكية ويستخرج المبلغ والتاجر ويقترح المصروف المناسب.\n\nيعالج رسائل الخصم والتحويل فقط، ويتجاهل رموز التحقق (OTP) والرسائل الشخصية. والإذن اختياري تمامًا: إن لم ترغب بمنحه، الصق نص الرسالة أو سجّل العملية يدويًا في أي وقت. التطبيق يتعرّف على صيغ رسائل البنوك السعودية ويعمل بالريال.",
          bodyEn:
            "Manual entry is what kills most budgeting apps: you log for a week, then stop. On Android, after your explicit consent, Ektifai reads bank transaction messages, extracts the amount and merchant, and suggests the matching expense. It processes debit and transfer messages only, ignoring OTP codes and personal texts, and the permission is entirely optional — paste the message or add the transaction by hand instead.",
        },
        {
          headingAr: "اعرف نسبة ادخارك وتوقّع صرف الشهر القادم",
          headingEn: "See your savings rate and next month's likely spend",
          bodyAr:
            "التتبّع وحده لا يوفّر مالًا؛ ما يوفّره هو رؤية النمط. يعرض اكتفائي تفصيل إنفاقك حسب التصنيف مرتبًا من الأعلى إلى الأقل مع نسبة كل بند من إجمالي صرفك، فيظهر البند الذي يستهلك راتبك فعليًا.\n\nإلى جانب ذلك تجد نسبة الادخار — دخلك مقابل صرفك خلال أي فترة تختارها — وتوقعًا تقديريًا لصرف الشهر القادم مبنيًا على متوسط آخر ثلاثة أشهر لكل تصنيف، ورسومًا تقارن الراتب والمخطّط والفعلي شهرًا بشهر. وتستطيع تصفّح الأشهر السابقة ومقارنة شهرك الحالي بما قبله.",
          bodyEn:
            "Tracking alone does not save money — seeing the pattern does. Ektifai breaks spending down by category from highest to lowest with each one's share of the total, shows your savings rate for any period, and estimates next month from your last three months per category, with charts comparing salary, planned, and actual month by month.",
        },
        {
          headingAr: "بياناتك المالية تبقى لك",
          headingEn: "Your financial data stays yours",
          bodyAr:
            "رسائل البنك تُحلَّل على جهازك، ولا يُحفظ نص الرسالة الخام في بياناتك السحابية. التطبيق ليس تطبيق الرسائل الافتراضي ولا يرسل أي رسالة SMS.\n\nتستطيع البدء في وضع الضيف دون إنشاء حساب، وتبقى بيانات ميزانيتك ومصروفاتك على جهازك ولا تُرفع إلى الخادم. لا نرسل مبالغ راتبك أو عملياتك ضمن بيانات الاستخدام، ولا نبيع بياناتك الشخصية لأغراض تسويقية.",
          bodyEn:
            "Bank messages are parsed on your device, and the raw message text is never stored in your cloud data. Ektifai is not your default SMS app and never sends a message. Start in guest mode without an account and your budget and expenses stay on the device; salary and transaction amounts are never included in usage analytics, and personal data is not sold for marketing.",
        },
      ],
      faq: [
        {
          qAr: "هل يقرأ التطبيق كل رسائلي؟",
          aAr: "لا. يعالج اكتفائي رسائل العمليات البنكية فقط — الخصم والتحويل — ويتجاهل رموز التحقق والرسائل الشخصية. الإذن اختياري تمامًا، ويمكنك استخدام التطبيق دون منحه.",
          qEn: "Does the app read all my messages?",
          aEn: "No. Ektifai processes bank transaction messages only — debits and transfers — and ignores OTP codes and personal texts. The permission is optional and the app works without it.",
        },
        {
          qAr: "هل أحتاج إلى حساب للبدء؟",
          aAr: "لا. ابدأ كضيف وتبقى بياناتك محفوظة على جهازك. أنشئ حسابًا فقط إذا أردت المزامنة بين أجهزتك.",
          qEn: "Do I need an account to start?",
          aEn: "No. Start as a guest with your data stored on the device, and create an account only if you want to sync across devices.",
        },
        {
          qAr: "هل يعمل التطبيق بدون إنترنت؟",
          aAr: "نعم. التخطيط وتسجيل المصروفات والتحليل تعمل على جهازك دون اتصال.",
          qEn: "Does it work offline?",
          aEn: "Yes. Planning, logging expenses, and analysis all run on your device without a connection.",
        },
        {
          qAr: "ما الفرق بين المخطّط والفعلي؟",
          aAr: "المخطّط هو الميزانية التي حددتها لبند معين، والفعلي هو ما صرفته عليه بالفعل. الفرق بينهما هو ما يخبرك أين تحتاج إلى ضبط إنفاقك.",
          qEn: "What is the difference between planned and actual?",
          aEn: "Planned is the budget you set for a line; actual is what you really spent on it. The gap between them is what tells you where to adjust.",
        },
        {
          qAr: "هل يناسب الرواتب السعودية والبنوك المحلية؟",
          aAr: "نعم. التطبيق مصمم للسوق السعودي، ويعمل بالريال، ويتعرّف على صيغ رسائل البنوك السعودية.",
          qEn: "Does it suit Saudi salaries and local banks?",
          aEn: "Yes. It is built for the Saudi market, works in SAR, and recognises Saudi bank message formats.",
        },
        {
          qAr: "هل التطبيق مجاني؟",
          aAr: "التحميل والتخطيط وتسجيل المصروفات والتحليل الأساسي مجانية. بعض المزايا المتقدمة تتطلب اشتراكًا. واكتفائي أداة تنظيم وتخطيط؛ التوقعات والسيناريوهات تقديرية لأغراض التوعية وليست نصيحة استثمارية.",
          qEn: "Is the app free?",
          aEn: "Downloading, planning, logging expenses, and core analysis are free; some advanced features need a subscription. Ektifai is a planning tool — its forecasts and scenarios are estimates for awareness, not investment advice.",
        },
      ],
    },
  },
  fursara: {
    nameAr: "فُرصارا",
    nameEn: "Fursara",
    taglineAr: "مساعد التقديم على الوظائف داخل متصفحك.",
    taglineEn: "Your job-application assistant, inside the browser.",
    descriptionAr:
      "إضافة متصفح تملأ حقول طلبات التوظيف من ملفك الشخصي بنقرة واحدة، وتكتب مسوّدات الإجابات النصية بالذكاء الاصطناعي لتراجعها، وتقارن سيرتك الذاتية بإعلان الوظيفة بدرجة توافق وسببها — لا تُرسل شيئًا حتى تُرسله أنت.",
    descriptionEn:
      "A browser extension that fills job-application fields from your profile in one click, drafts written answers with AI for your review, and scores your CV against the open job posting — nothing is submitted until you submit it.",
    categoryAr: "إضافة متصفح · التوظيف",
    categoryEn: "Browser extension · Careers",
    icon: "/apps/fursara.png",
    iconShape: "square",
    website: "https://fursara.binaskar.org",
    iosAppId: null,
    androidPackage: null,
    // Mirrors app/lib/extension-stores.ts in the fursati repo (the flip-point).
    // Chrome live 2026-08-17, Firefox/AMO live 2026-08-19; the Apple id is
    // permanent but still in review — never linked until it goes live.
    extensionStores: [
      {
        key: "chrome",
        url: "https://chromewebstore.google.com/detail/ajpnpplmkilneffbjnnlkelbppnmldid",
        live: true,
      },
      {
        key: "firefox",
        url: "https://addons.mozilla.org/firefox/addon/fursara/",
        live: true,
      },
      {
        key: "safari",
        url: "https://apps.apple.com/app/id6802211692",
        live: false,
      },
    ],
    privacyUrl: "https://fursara.binaskar.org/ar/privacy",
    policySlug: null,
    own: true,
    // Copy derived from the approved store pack in fursati/browser-extension/
    // store/listing-copy.md — the same claims reviewed for Chrome and AMO.
    // Numerals kept Western; the store copy's "١٠٠" would mix scripts here.
    seo: {
      titleAr: "إضافة تملأ طلبات التوظيف وتحلّل توافق سيرتك — فُرصارا",
      titleEn: "Autofill job applications and score your CV fit — Fursara",
      descriptionAr:
        "املأ طلبات التوظيف بنقرة من ملفك الشخصي، واكتب مسوّدات الإجابات بالذكاء الاصطناعي، واعرف درجة توافق سيرتك مع الوظيفة قبل أن تتقدم. تعمل داخل متصفحك.",
      descriptionEn:
        "Fill job applications in one click from your profile, draft written answers with AI, and score your CV against the posting before you apply — all inside your browser.",
      sections: [
        {
          headingAr: "التقديم على الوظائف يستهلك وقتك في إعادة الكتابة",
          headingEn: "Applying wastes your time on retyping",
          bodyAr:
            "كل طلب توظيف يطلب المعلومات نفسها: الاسم والبريد والجوال وسنوات الخبرة والتعليم. تكتبها مرة، ثم تكتبها مجددًا في الموقع التالي، ثم في الذي يليه. النتيجة أن الوقت يذهب إلى النسخ واللصق بدل أن يذهب إلى اختيار الوظائف المناسبة وكتابة إجابات جيدة.\n\nفُرصارا إضافة متصفح تتولى هذا الجزء المتكرر: تملأ الحقول من ملفك المحفوظ، وتساعدك على الإجابات النصية، وتخبرك قبل أن تتقدم ما إذا كانت الوظيفة تستحق وقتك أصلًا.",
          bodyEn:
            "Every application asks for the same things: name, email, phone, years of experience, education. You type them, then type them again on the next site. Fursara takes over that repetitive part — filling fields from your saved profile, helping with written answers, and telling you before you apply whether the role is worth your time.",
        },
        {
          headingAr: "تعبئة الطلب بنقرة واحدة",
          headingEn: "One click fills the application",
          bodyAr:
            "اضغط زرًا واحدًا فيملأ فُرصارا الاسم والبريد والجوال والخبرات والتعليم وبقية الحقول من ملفك المحفوظ في لوحة التحكم. الإضافة تميّز الحقول التي غيّرتها لتراجعها بنفسك قبل الإرسال.\n\nالتعبئة مجانية دائمًا ولا تستهلك رصيدًا، وتعمل على مواقع التوظيف العربية والعالمية على حد سواء. واجهة الإضافة بالعربية والإنجليزية مع إمكانية التبديل بينهما من داخلها.",
          bodyEn:
            "One button fills your name, email, phone, experience, education, and the rest from the profile saved in your dashboard, marking what it changed so you can review before sending. Filling is always free, never uses a credit, and works on Arabic and international job sites alike.",
        },
        {
          headingAr: "مسوّدات الإجابات النصية بالذكاء الاصطناعي",
          headingEn: "AI drafts for the written questions",
          bodyAr:
            "الأسئلة المفتوحة هي ما يوقف أغلب المتقدمين: «اذكر تحديًا واجهته وكيف تجاوزته»، «لماذا تناسب هذا الدور؟». يكتب لك فُرصارا مسوّدة مبنية على خبراتك الحقيقية كما وردت في سيرتك الذاتية، لا على كلام عام.\n\nالمسوّدة نقطة بداية تحرّرها كما تشاء، ولا تُرسل حتى تُرسلها أنت بنفسك.",
          bodyEn:
            "Open questions are where most applicants stall: \"describe a challenge you faced\", \"why are you a fit?\". Fursara drafts an answer from the real experience in your CV rather than generic filler. It is a starting point you edit, and nothing is sent until you send it.",
        },
        {
          headingAr: "اعرف درجة توافقك قبل أن تتقدم",
          headingEn: "Know your fit score before applying",
          bodyAr:
            "افتح أي إعلان وظيفة واضغط «حلّل توافقي». يقرأ فُرصارا وصف الوظيفة من الصفحة المفتوحة أمامك، ويقارنه بسيرتك الذاتية، ويعطيك درجة من 100 مع شرح واضح لسببها: أين تتطابق خبرتك فعلًا، وأين الفجوة الحقيقية.\n\nهذا يغيّر ترتيب أولوياتك: بدل التقديم على عشرين وظيفة بالتساوي، تعرف أي خمس منها تستحق إجابات مكتوبة بعناية.",
          bodyEn:
            "Open any posting and press \"Analyze my fit\". Fursara reads the job description from the page, compares it with your CV, and returns a score out of 100 with the reasoning: where your experience genuinely matches and where the real gap is — so you can spend careful answers on the roles that deserve them.",
        },
        {
          headingAr: "ما لا يفعله فُرصارا — وهذا مقصود",
          headingEn: "What Fursara deliberately does not do",
          bodyAr:
            "لا يضغط زر الإرسال أبدًا؛ المراجعة والإرسال قرارك وحدك. لا يتجاوز اختبارات التحقق البشري. لا يقرأ أي صفحة ولا يملأ أي حقل دون ضغطة صريحة منك. ولا يبيع بياناتك ولا بيانات سيرتك الذاتية لأي جهة.\n\nترسل الإضافة نص إعلان الوظيفة وحقول ملفك إلى خوادم فُرصارا فقط لتنفيذ ما طلبته، وتُحفظ جلسة الدخول والإعدادات في تخزين المتصفح وتُحذف عند إزالة الإضافة.",
          bodyEn:
            "It never presses submit — reviewing and sending is your decision alone. It never bypasses a CAPTCHA, reads no page and fills no field without an explicit click, and does not sell your data or CV. The extension sends the posting text and your profile fields to Fursara servers only to do what you asked; session and settings live in browser storage and are removed when you uninstall.",
        },
      ],
      faq: [
        {
          qAr: "هل يرسل فُرصارا الطلب نيابة عني؟",
          aAr: "لا. الإضافة تملأ الحقول فقط وتترك المراجعة والإرسال لك. لا تضغط زر الإرسال ولا تتجاوز اختبارات التحقق البشري.",
          qEn: "Does Fursara submit the application for me?",
          aEn: "No. It fills the fields and leaves reviewing and submitting to you. It never presses submit and never bypasses a CAPTCHA.",
        },
        {
          qAr: "ما المتصفحات المدعومة؟",
          aAr: "فُرصارا متاح على متصفح كروم والمتصفحات المبنية عليه مثل Edge وBrave، وعلى فايرفوكس. نسخة سفاري قادمة قريبًا.",
          qEn: "Which browsers are supported?",
          aEn: "Chrome and Chromium browsers such as Edge and Brave, plus Firefox. A Safari version is on the way.",
        },
        {
          qAr: "هل أحتاج إلى حساب؟",
          aAr: "نعم، حساب مجاني وسيرة ذاتية مرفوعة على لوحة التحكم — منها تأتي البيانات التي تُملأ في الطلبات وتُبنى عليها الإجابات وتحليل التوافق.",
          qEn: "Do I need an account?",
          aEn: "Yes — a free account with a CV uploaded to the dashboard. That is the source for the filled fields, the drafted answers, and the fit analysis.",
        },
        {
          qAr: "هل يعمل مع مواقع التوظيف العربية؟",
          aAr: "نعم. فُرصارا يدعم مواقع التوظيف العربية والعالمية، وواجهته متاحة بالعربية والإنجليزية مع إمكانية التبديل من داخل الإضافة.",
          qEn: "Does it work with Arabic job sites?",
          aEn: "Yes. Fursara supports Arabic and international job sites, and its interface switches between Arabic and English from inside the extension.",
        },
        {
          qAr: "هل بيانات سيرتي الذاتية آمنة؟",
          aAr: "لا تُباع بياناتك ولا بيانات سيرتك لأي جهة. يُرسل نص إعلان الوظيفة وحقول ملفك إلى خوادم فُرصارا فقط لتنفيذ ما طلبته. التفاصيل الكاملة في سياسة الخصوصية.",
          qEn: "Is my CV data safe?",
          aEn: "Your data and CV are not sold to anyone. The posting text and your profile fields go to Fursara servers only, to do what you asked. Full details in the privacy policy.",
        },
        {
          qAr: "هل الإضافة مجانية؟",
          aAr: "تعبئة الطلبات مجانية دائمًا ولا تستهلك رصيدًا. مزايا الذكاء الاصطناعي — كتابة الإجابات وتحليل التوافق — تعمل برصيد على حسابك.",
          qEn: "Is the extension free?",
          aEn: "Application autofill is always free and never uses a credit. The AI features — drafted answers and fit analysis — run on credit in your account.",
        },
      ],
    },
  },
  hido: {
    nameAr: "هايدو",
    nameEn: "Hido",
    taglineAr: "تجارب سياحية أصيلة يستضيفها المجتمع المحلي.",
    taglineEn: "Authentic local experiences, hosted by the community.",
    descriptionAr:
      "منصة حجز تربط الزوّار بمرشدين وتجارب من قلب المجتمع المحلي في السعودية — اكتشف التجربة، احجزها، وتنقّل عبر الخريطة في رحلة واحدة.",
    descriptionEn:
      "An on-demand booking platform connecting visitors with local guides and experiences across Saudi Arabia — discover, book, and navigate in one journey.",
    categoryAr: "السفر والسياحة",
    categoryEn: "Travel",
    icon: "/apps/hido.jpg",
    iconShape: "square",
    website: "https://hido.app",
    // App Store id 6477162077 (Hido هايدو) and the matching public Play listing.
    iosAppId: "6477162077",
    androidPackage: "com.hido.hidoapp",
    extensionStores: null,
    privacyUrl: null,
    policySlug: null,
    own: false,
  },
  minnha: {
    nameAr: "منحة",
    nameEn: "Minnha",
    taglineAr: "منصة القبول الجامعي والابتعاث.",
    taglineEn: "University admission and scholarship services.",
    descriptionAr:
      "منصة متكاملة لخدمات القبول الجامعي والابتعاث، من اختيار الوجهة إلى مسارات دفع وخدمة موثوقة — تعمل عبر المتصفح دون تنزيل.",
    descriptionEn:
      "An integrated platform for university admission and scholarship services, from choosing a destination to reliable payment and service journeys — runs in the browser, no download needed.",
    categoryAr: "التعليم",
    categoryEn: "Education",
    icon: "/apps/minnha.png",
    iconShape: "wordmark",
    website: "https://www.minnha.sa",
    // Web platform: verified as having no App Store or Play listing.
    iosAppId: null,
    androidPackage: null,
    extensionStores: null,
    privacyUrl: null,
    policySlug: null,
    own: false,
  },
};

export const appLinkSlugs = Object.keys(APP_REGISTRY);

/** Case-insensitive, so a link typed in caps still resolves. */
export function getAppLinks(slug: string): AppStoreLinks | null {
  const key = slug?.trim().toLowerCase();
  const entry = APP_REGISTRY[key];
  if (!entry) return null;
  const policy = entry.policySlug ? getAppPolicy(entry.policySlug) : null;
  const nameAr = policy?.appNameAr ?? entry.nameAr;
  const nameEn = policy?.appNameEn ?? entry.nameEn;
  if (!nameAr || !nameEn) return null;
  return { ...entry, slug: key, nameAr, nameEn };
}

/**
 * Campaign attribution carried from one onelink into both stores.
 *
 * Apple and Google disagree about how attribution travels: Apple reads a single
 * opaque Campaign Token (`ct`) in App Analytics, while Google expects a whole
 * urlencoded utm string in `referrer` that the Play Install Referrer API hands
 * back to the app. One token in our URL therefore has to expand into both shapes.
 */
export type Attribution = {
  /** Apple Campaign Token, verbatim — also the Play utm_source fallback. */
  token: string;
  source: string;
  medium: string;
  campaign: string;
};

/** Saudi storefront: the market these apps are published and marketed for. */
const APPLE_STOREFRONT = "sa";

/** Current campaign, used when a link does not name its own. */
export const DEFAULT_CAMPAIGN = "wein_rah_ratbak";

/**
 * Channel tokens marketing puts in bios. The token is what they swap per channel;
 * the mapping turns it into the utm triple Play needs.
 */
const CHANNELS: Record<string, { source: string; medium: string }> = {
  ig_bio: { source: "instagram", medium: "bio" },
  tt_bio: { source: "tiktok", medium: "bio" },
  sc_bio: { source: "snapchat", medium: "bio" },
  yt_bio: { source: "youtube", medium: "bio" },
};

export const marketingChannels = Object.keys(CHANNELS);

/**
 * Tokens end up inside URLs we hand to the stores, so anything outside this
 * shape is dropped rather than forwarded — a junk or hostile value must never
 * reach a store URL, and losing attribution is better than breaking the link.
 */
const TOKEN_PATTERN = /^[a-z0-9_-]{1,40}$/i;

/**
 * Reads the channel off our own onelink. `c` is the documented parameter;
 * `ct` is accepted too because it is Apple's own name for the same thing and
 * marketing reaches for it by habit. An unregistered but well-formed token
 * still attributes: source falls back to the token itself.
 */
export function parseAttribution(
  search: string | URLSearchParams,
): Attribution | null {
  const params =
    typeof search === "string" ? new URLSearchParams(search) : search;
  const raw = (params.get("c") ?? params.get("ct") ?? "").trim();
  if (!TOKEN_PATTERN.test(raw)) return null;

  const token = raw.toLowerCase();
  const known = CHANNELS[token];
  const requested = (params.get("campaign") ?? "").trim();
  return {
    token,
    source: known?.source ?? token,
    medium: known?.medium ?? "onelink",
    campaign: TOKEN_PATTERN.test(requested)
      ? requested.toLowerCase()
      : DEFAULT_CAMPAIGN,
  };
}

export function appStoreUrl(
  iosAppId: string,
  attribution?: Attribution | null,
): string {
  const url = `https://apps.apple.com/${APPLE_STOREFRONT}/app/id${iosAppId}`;
  if (!attribution) return url;
  // mt=8 (mobile software) is legacy but harmless, and marketing's existing
  // links carry it — keeping it means our links match theirs character for
  // character when they audit a campaign.
  return `${url}?ct=${encodeURIComponent(attribution.token)}&mt=8`;
}

export function playStoreUrl(
  androidPackage: string,
  attribution?: Attribution | null,
): string {
  const url = `https://play.google.com/store/apps/details?id=${androidPackage}`;
  if (!attribution) return url;
  // The whole utm string is one parameter value, so it is encoded as a unit:
  // the inner separators must arrive at Play as %3D/%26, not as real =/&.
  const referrer = `utm_source=${attribution.source}&utm_medium=${attribution.medium}&utm_campaign=${attribution.campaign}`;
  return `${url}&referrer=${encodeURIComponent(referrer)}`;
}

/**
 * Which store this visitor should land on.
 *
 * Deliberately runs in the browser off `navigator`, not from the User-Agent header on
 * the server: a redirect chosen server-side gets cached by the CDN and then served to
 * the wrong platform, and every visitor after the first lands in the wrong store.
 *
 * iPadOS 13+ reports a desktop Macintosh UA, so a Mac claiming multiple touch points
 * is treated as iOS — otherwise every iPad user is sent to the fallback page.
 */
export function detectPlatform(
  userAgent: string,
  maxTouchPoints = 0,
): StorePlatform {
  const ua = userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/i.test(ua)) return "ios";
  if (/Macintosh/i.test(ua) && maxTouchPoints > 1) return "ios";
  return "other";
}

/** The URL a visitor should be sent to, or null when there is nothing to send them to. */
export function storeUrlForPlatform(
  links: AppStoreLinks,
  platform: StorePlatform,
  attribution?: Attribution | null,
): string | null {
  if (platform === "ios" && links.iosAppId) {
    return appStoreUrl(links.iosAppId, attribution);
  }
  if (platform === "android" && links.androidPackage) {
    return playStoreUrl(links.androidPackage, attribution);
  }
  // Extension products: on iOS every browser is WebKit, so the extension arrives
  // through the App Store; on Android only Firefox can run extensions at all.
  // Desktop always stays on the page. Redirect only to LIVE listings — an
  // in-review URL is a guaranteed 404.
  if (links.extensionStores) {
    const target =
      platform === "ios"
        ? links.extensionStores.find((s) => s.key === "safari")
        : platform === "android"
          ? links.extensionStores.find((s) => s.key === "firefox")
          : undefined;
    if (target?.live) return target.url;
  }
  return null;
}
