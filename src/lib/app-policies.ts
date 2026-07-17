export type LocalizedPolicySection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type AppPolicySection = {
  id: string;
  ar: LocalizedPolicySection;
  en: LocalizedPolicySection;
};

export type AppPolicy = {
  slug: string;
  appNameAr: string;
  appNameEn: string;
  developerAr: string;
  developerEn: string;
  packageName: string;
  supportEmail: string;
  effectiveDateAr: string;
  effectiveDateEn: string;
  summaryAr: string;
  summaryEn: string;
  sections: readonly AppPolicySection[];
};

const ektifaiPolicy: AppPolicy = {
  slug: "ektifai",
  appNameAr: "اكتفائي",
  appNameEn: "Ektifai",
  developerAr: "بن عسكر للتقنية",
  developerEn: "Bin Askar Technology",
  packageName: "org.binaskar.ektifai",
  supportEmail: "abdullah@binaskar.org",
  effectiveDateAr: "آخر تحديث: 17 يوليو 2026",
  effectiveDateEn: "Last updated: July 17, 2026",
  summaryAr:
    "توضح هذه السياسة كيف يتعامل تطبيق اكتفائي مع بيانات الحساب والميزانية والمصروفات ورسائل المعاملات البنكية. نعالج الحد الأدنى اللازم لتقديم الخدمة، ولا نبيع بياناتك الشخصية.",
  summaryEn:
    "This policy explains how Ektifai handles account, budget, spending, and bank-transaction SMS data. We process only what is needed to provide the service and do not sell personal data.",
  sections: [
    {
      id: "scope",
      ar: {
        title: "النطاق والجهة المسؤولة",
        paragraphs: [
          "تنطبق هذه السياسة على تطبيق اكتفائي للحزمة org.binaskar.ektifai وخدماته المرتبطة. الجهة المسؤولة عن معالجة البيانات هي بن عسكر للتقنية.",
          "يمكن استخدام بعض خصائص التطبيق كضيف، أو إنشاء حساب للاستفادة من المزامنة والخصائص المرتبطة بالاشتراك.",
        ],
      },
      en: {
        title: "Scope and data controller",
        paragraphs: [
          "This policy applies to the Ektifai mobile application, package org.binaskar.ektifai, and its related services. Bin Askar Technology is the data controller.",
          "Some features can be used as a guest. Users may also create an account to use synchronization and subscription-related features.",
        ],
      },
    },
    {
      id: "data-we-handle",
      ar: {
        title: "البيانات التي نتعامل معها",
        paragraphs: [
          "تعتمد البيانات على طريقة استخدامك للتطبيق والخصائص التي تختارها.",
        ],
        bullets: [
          "بيانات الحساب: الاسم، البريد الإلكتروني، وبيانات المصادقة المشفرة.",
          "البيانات المالية التي تدخلها: الراتب، فئات المصروفات، الميزانيات، المعاملات، الدخل، وأهداف وخطط الاستثمار.",
          "بيانات الاشتراك والدفع: الخطة، حالة الاشتراك، مبلغ الطلب، العملة، ورقم مرجع العملية. لا نخزن رقم البطاقة الكامل أو رمز الحماية.",
          "بيانات الإشعارات: رمز إشعار الجهاز وتفضيلات التنبيه.",
          "بيانات تشغيل محدودة: شاشات وعمليات مستخدمة، وقت الحدث، نوع المنصة، إصدار التطبيق، ومعرّف جلسة عشوائي للضيف. لا تتضمن أحداث الاستخدام نص رسالة SMS الخام.",
        ],
      },
      en: {
        title: "Data we handle",
        paragraphs: [
          "The data involved depends on how you use the app and which features you choose.",
        ],
        bullets: [
          "Account data: name, email address, and cryptographically protected authentication data.",
          "Financial-planning data you enter: salary, spending categories, budgets, transactions, income, and investment goals and plans.",
          "Subscription and payment data: plan, subscription status, order amount, currency, and transaction reference. We do not store full payment-card numbers or security codes.",
          "Notification data: device push token and alert preferences.",
          "Limited operational data: screens and actions used, event time, platform, app version, and a random guest-session identifier. Usage events do not include raw SMS message text.",
        ],
      },
    },
    {
      id: "sms-data",
      ar: {
        title: "رسائل SMS البنكية",
        paragraphs: [
          "على Android، يطلب اكتفائي إذني قراءة واستقبال SMS فقط لتحديد رسائل المعاملات البنكية، استخراج المبلغ والتاجر، واقتراح فئة المصروف. الإذن اختياري، ويمكنك رفضه وإدخال أو لصق الرسالة يدويًا.",
          "يبدأ التحليل على جهازك. يُحفظ نص الرسالة الخام محليًا على جهازك. إذا كنت مسجل الدخول، فقد يُرسل النص مؤقتًا عبر اتصال مشفر إلى خدمة التصنيف لتحسين النتيجة؛ لا نحتفظ عمدًا بنص SMS الخام في سجلات بياناتنا السحابية. لا يقرأ التطبيق رموز التحقق لمعاملتها كمصروفات.",
          "على iOS لا يقرأ التطبيق الرسائل تلقائيًا؛ تتم المعالجة فقط عند لصق الرسالة أو مشاركتها من اختصار يختاره المستخدم.",
        ],
      },
      en: {
        title: "Bank SMS data",
        paragraphs: [
          "On Android, Ektifai requests SMS read and receive permissions only to identify bank-transaction messages, extract the amount and merchant, and suggest a spending category. Permission is optional; you can decline and enter or paste a message manually.",
          "Processing starts on your device. Raw message text is stored locally on the device. If you are signed in, the text may be sent transiently over an encrypted connection to the categorization service to improve the result; we do not intentionally retain raw SMS text in our cloud data records. Verification-code messages are not treated as expenses.",
          "On iOS, the app does not read messages automatically. Processing occurs only when a user pastes a message or shares it through a user-configured shortcut.",
        ],
      },
    },
    {
      id: "purposes",
      ar: {
        title: "لماذا نستخدم البيانات",
        paragraphs: [
          "نستخدم البيانات لتشغيل الحساب، تسجيل المصروفات وتصنيفها، عرض الميزانية والتحليلات، مزامنة بيانات المستخدم المسجل بين الأجهزة، إنشاء خطط ادخار واستثمار تقديرية، البحث عن عروض، إدارة الاشتراكات، إرسال التنبيهات، حماية الخدمة، تشخيص الأعطال، وتحسين الاعتمادية وتجربة الاستخدام.",
          "التحليلات والخطط الاستثمارية داخل التطبيق معلومات تقديرية للتخطيط الشخصي وليست تنفيذًا لاستثمار أو ضمانًا لعائد.",
        ],
      },
      en: {
        title: "Why we use data",
        paragraphs: [
          "We use data to operate accounts; record and categorize spending; display budgets and insights; synchronize signed-in user data across devices; generate estimated saving and investment plans; search for offers; administer subscriptions; send alerts; protect the service; diagnose failures; and improve reliability and usability.",
          "In-app insights and investment plans are estimates for personal planning. They are not investment execution or a guarantee of returns.",
        ],
      },
    },
    {
      id: "storage-sharing",
      ar: {
        title: "التخزين والمشاركة",
        paragraphs: [
          "تظل بيانات الميزانية والمصروفات الخاصة بالضيف في قاعدة بيانات محلية على الجهاز ولا تتم مزامنتها مع حساب سحابي. قد تُرسل أحداث تشغيل محدودة للضيف بمعرّف جلسة عشوائي كما هو موضح أعلاه.",
          "تتم مزامنة بيانات المستخدم المسجل مع خوادمنا. قد نعتمد على مزودي استضافة وقواعد بيانات وإشعارات وبريد ودفع كمعالجي خدمة يعملون وفق تعليماتنا أو سياساتهم اللازمة لتقديم الخدمة. وقد نكشف بيانات عند وجوب ذلك نظامًا أو لحماية الحقوق والأمان.",
          "لا نبيع بياناتك الشخصية، ولا نشارك بيانات SMS أو البيانات المالية لأغراض الإعلان أو التسويق السلوكي.",
        ],
      },
      en: {
        title: "Storage and sharing",
        paragraphs: [
          "A guest’s budget and spending data remains in a local on-device database and is not synchronized to a cloud account. Limited guest operational events may be transmitted using a random session identifier as described above.",
          "Signed-in user data is synchronized with our servers. We may use hosting, database, notification, email, and payment providers as service processors acting under our instructions or their service policies. We may also disclose data when legally required or necessary to protect rights and safety.",
          "We do not sell personal data, and we do not share SMS or financial data for advertising or behavioral marketing.",
        ],
      },
    },
    {
      id: "payments-links",
      ar: {
        title: "المدفوعات والروابط الخارجية",
        paragraphs: [
          "عند شراء اشتراك، قد تُستكمل العملية عبر متجر التطبيقات أو صفحة دفع مستضافة لدى مزود دفع. يعالج المزود بيانات وسيلة الدفع وفق سياسته، بينما نستلم حالة العملية ومرجعها لتفعيل الخدمة والتحقق منها.",
          "قد يفتح البحث عن العروض روابط بحث لدى متاجر خارجية. يخضع استخدام تلك المواقع لسياسات المتجر الخارجي، ولا نتحكم في توافر المنتج أو السعر النهائي.",
        ],
      },
      en: {
        title: "Payments and external links",
        paragraphs: [
          "When purchasing a subscription, checkout may be completed through the applicable app store or a hosted page operated by a payment provider. That provider processes payment-method data under its policy; we receive transaction status and reference information to verify and activate service.",
          "Offer search may open search links on third-party retailer sites. Use of those sites is governed by the retailer’s policy, and we do not control product availability or final price.",
        ],
      },
    },
    {
      id: "choices",
      ar: {
        title: "اختياراتك وصلاحيات الجهاز",
        paragraphs: [
          "يمكنك رفض إذن SMS واستخدام الإدخال اليدوي، تعطيل الإشعارات من إعدادات الجهاز، تعديل أو حذف معاملات وفئات داخل التطبيق، أو استخدام وضع الضيف دون حساب. يؤدي مسح بيانات التطبيق أو إلغاء تثبيته إلى إزالة البيانات المحلية، ما لم تكن قد تمت مزامنتها مع حساب مسجل.",
          "يمكنك التواصل معنا لطلب الوصول إلى بيانات حسابك أو تصحيحها أو حذفها، مع مراعاة المتطلبات النظامية المطبقة.",
        ],
      },
      en: {
        title: "Your choices and device permissions",
        paragraphs: [
          "You can decline SMS permission and use manual entry, disable notifications in device settings, edit or remove transactions and categories in the app, or use guest mode without an account. Clearing app data or uninstalling removes local data unless it was synchronized to a registered account.",
          "You may contact us to request access to, correction of, or deletion of account data, subject to applicable legal requirements.",
        ],
      },
    },
    {
      id: "account-deletion",
      ar: {
        title: "حذف الحساب والبيانات",
        paragraphs: [
          "لطلب حذف حساب اكتفائي والبيانات المرتبطة به، استخدم زر طلب الحذف في هذه الصفحة وأرسل الطلب من البريد المسجل في الحساب. سنطلب معلومات كافية للتحقق من ملكية الحساب، ولن نطلب كلمة المرور أو رمز التحقق أو بيانات البطاقة.",
          "بعد التحقق، نحذف الحساب والبيانات المرتبطة به من أنظمتنا ونطلب من معالجي الخدمة حذف ما يلزم، باستثناء السجلات التي يجب الاحتفاظ بها لأسباب نظامية أو أمنية أو لمنع الاحتيال وتسوية المدفوعات. تُفصل تلك السجلات عن الاستخدام التشغيلي وتُحذف عند انتهاء مدة الاحتفاظ اللازمة.",
          "إذا كان لديك اشتراك متجدد، فألغِ التجديد من الجهة التي اشتريت منها قبل طلب حذف الحساب؛ حذف الحساب لا يلغي تلقائيًا التزامًا قائمًا لدى متجر التطبيقات أو مزود الدفع.",
        ],
      },
      en: {
        title: "Account and data deletion",
        paragraphs: [
          "To request deletion of your Ektifai account and associated data, use the deletion button on this page and send the request from the email registered to the account. We will request enough information to verify account ownership; we will never ask for your password, verification code, or card details.",
          "After verification, we delete the account and associated data from our systems and request relevant service processors to delete data where required, except records that must be retained for legal, security, fraud-prevention, or payment-settlement reasons. Such records are separated from operational use and removed when the required retention period ends.",
          "If you have a renewing subscription, cancel renewal with the original purchase provider before requesting account deletion. Deleting the account does not automatically cancel an existing obligation with an app store or payment provider.",
        ],
      },
    },
    {
      id: "retention-security",
      ar: {
        title: "الاحتفاظ والأمان",
        paragraphs: [
          "نحتفظ ببيانات الحساب والمزامنة ما دام الحساب قائمًا أو بالقدر اللازم لتقديم الخدمة. قد نحتفظ بسجلات تشغيلية ونسخ احتياطية وسجلات معاملات لفترة محدودة تلزم للأمان والاسترداد والالتزام النظامي، ثم نحذفها أو نجعلها غير مرتبطة بك.",
          "نستخدم اتصال HTTPS، وضوابط وصول، وحماية لبيانات المصادقة، وممارسات تشغيلية معقولة. لا توجد وسيلة نقل أو تخزين آمنة بصورة مطلقة؛ لذلك نراجع الضوابط ونحد من البيانات بحسب الحاجة.",
        ],
      },
      en: {
        title: "Retention and security",
        paragraphs: [
          "We retain account and synchronized data while the account remains active or as needed to provide the service. Operational logs, backups, and transaction records may be kept for a limited period required for security, recovery, and legal compliance, after which they are deleted or de-identified.",
          "We use HTTPS transport, access controls, authentication-data protection, and reasonable operational safeguards. No transmission or storage method is completely secure, so we review controls and limit data according to need.",
        ],
      },
    },
    {
      id: "children-contact",
      ar: {
        title: "الأطفال والتغييرات والتواصل",
        paragraphs: [
          "اكتفائي أداة للتخطيط المالي الشخصي وليست موجهة للأطفال دون 13 عامًا أو الحد الأدنى للعمر الرقمي في بلدهم، ولا نجمع عن علم بيانات حسابات أطفال دون ذلك العمر.",
          "قد نحدّث هذه السياسة عند تغيير المنتج أو المتطلبات. سننشر النسخة الجديدة في هذه الصفحة ونحدّث التاريخ أعلاه، ونقدم إشعارًا إضافيًا إذا كان التغيير جوهريًا ومطلوبًا نظامًا.",
          "لأسئلة الخصوصية أو الحقوق أو الشكاوى، تواصل مع بن عسكر للتقنية عبر البريد الموضح أدناه.",
        ],
      },
      en: {
        title: "Children, changes, and contact",
        paragraphs: [
          "Ektifai is a personal financial-planning tool and is not directed to children under 13 or the applicable digital-consent age in their country. We do not knowingly collect account data from children below that age.",
          "We may update this policy when the product or requirements change. We will publish the revised version on this page and update the date above, and provide additional notice when a material change legally requires it.",
          "For privacy questions, rights requests, or complaints, contact Bin Askar Technology using the email below.",
        ],
      },
    },
  ],
};

const appPolicies: Record<string, AppPolicy> = {
  [ektifaiPolicy.slug]: ektifaiPolicy,
};

export const appPolicySlugs = Object.keys(appPolicies);

export function getAppPolicy(slug: string): AppPolicy | undefined {
  return appPolicies[slug.toLowerCase()];
}
