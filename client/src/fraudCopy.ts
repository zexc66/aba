import type { Locale3 } from "./projects";

export const FRAUD_COPY: Record<Locale3, {
  title: string; intro: string; rulesTitle: string;
  rules: { title: string; body: string }[];
  channelsTitle: string; channels: { label: string; value: string }[];
  reportTitle: string; reportBody: string;
  notice: string;
}> = {
  en: {
    title: "Verify AIABASD communications", intro: "Impersonation fraud exists in the development sector. This page states exactly how AIABASD communicates, so any message claiming to come from us can be checked in seconds.",
    rulesTitle: "Five rules that never change",
    rules: [
      { title: "We never charge fees", body: "AIABASD never asks individuals or institutions for registration fees, advance payments, \u201Cfacility charges\u201D, or any payment to consider a project or grant access. The platform is strictly non-custodial." },
      { title: "Official emails end @aiabasd.org", body: "Genuine messages come only from gs@aibasd.org, gs@aiabasd.org, or fo@aiabasd.org. Look-alike domains (extra words, changed endings) are fraudulent." },
      { title: "No offers of guaranteed returns", body: "AIABASD does not sell investments, promise returns, or solicit funds from the public. Anyone offering \u201Cguaranteed profit\u201D in our name is impersonating us." },
      { title: "One official website", body: "Our only website is https://aiabasd.org. Beware of copied designs on other domains." },
      { title: "Agreements come through verified channels", body: "Real contracts and mandates are signed through institutional channels with authorized signatories — never over messaging apps alone." },
    ],
    channelsTitle: "Our only official channels",
    channels: [
      { label: "Website", value: "https://aiabasd.org" },
      { label: "General inquiries", value: "gs@aibasd.org" },
      { label: "General Secretariat", value: "gs@aiabasd.org" },
      { label: "Finance & Oversight Bureau", value: "fo@aiabasd.org" },
    ],
    reportTitle: "Received a suspicious message?",
    reportBody: "Do not pay, do not share documents, and forward the message to gs@aibasd.org. We review reports and warn others where impersonation is confirmed.",
    notice: "This page is published as a standing public notice. It is not legal advice; report suspected fraud also to your local authorities.",
  },
  ar: {
    title: "التحقق من رسائل التحالف", intro: "انتحال الشخصيات شائع في قطاع التنمية. توضح هذه الصفحة بالضبط كيف يتواصل التحالف، بحيث يمكن فحص أي رسالة تدعي تمثيلنا في ثوانٍ.",
    rulesTitle: "خمس قواعد لا تتغير أبداً",
    rules: [
      { title: "نحن لا نطلب رسوماً أبداً", body: "لا يطلب التحالف من الأفراد أو المؤسسات رسوم تسجيل أو دفعات مقدمة أو \u201Cرسوم معاملات\u201D أو أي دفعة لدراسة مشروع أو منح وصول. المنصة غير حافظة للأموال." },
      { title: "البريد الرسمي ينتهي @aiabasd.org فقط", body: "الرسائل الحقيقية تأتي فقط من gs@aibasd.org أو gs@aiabasd.org أو fo@aiabasd.org. النطاقات المشابهة (كلمات إضافية أو نهايات مغايرة) احتيالية." },
      { title: "لا وعوداً بأرباح مضمونة", body: "لا يبيع التحالف استثمارات ولا يعد بعوائد ولا يجمع أموالاً من الجمهور. من يعرض \u201Cربحاً مضموناً\u201D باسمنا ينتحل شخصيتنا." },
      { title: "موقع رسمي واحد", body: "موقعنا الوحيد هو https://aiabasd.org. احذر التصاميم المنسوخة على نطاقات أخرى." },
      { title: "الاتفاقيات عبر قنوات موثقة", body: "العقود والتفويضات الحقيقية تُوقّع عبر قنوات مؤسسية بمفوضين معتمدين — وليس عبر تطبيقات المراسلة وحدها أبداً." },
    ],
    channelsTitle: "قنواتنا الرسمية الوحيدة",
    channels: [
      { label: "الموقع", value: "https://aiabasd.org" },
      { label: "الاستفسارات العامة", value: "gs@aibasd.org" },
      { label: "الأمانة العامة", value: "gs@aiabasd.org" },
      { label: "مكتب المالية والرقابة", value: "fo@aiabasd.org" },
    ],
    reportTitle: "هل وصلك مشكل؟",
    reportBody: "لا تدفع ولا تشارك مستندات، وأعد توجيه الرسالة إلى gs@aibasd.org. نراجع البلاغات ونحذر الآخرين عند تأكد الانتحال.",
    notice: "هذه الصفحة إشعار عام دائم. ليست استشارة قانونية؛ بلّغ السلطات المحلية أيضاً عن أي احتيال مشتبه.",
  },
  fr: {
    title: "Vérifier les communications AIABASD", intro: "L'usurpation d'identité est fréquente dans le secteur du développement. Cette page explique précisément comment l'AIABASD communique, afin de vérifier en quelques secondes tout message prétendant venir de nous.",
    rulesTitle: "Cinq règles qui ne changent jamais",
    rules: [
      { title: "Nous ne facturons jamais de frais", body: "L'AIABASD ne demande ni frais d'inscription, ni paiements anticipés, ni \u201Cfrais de dossier\u201D pour étudier un projet ou accorder un accès. La plateforme est strictement non conservatrice." },
      { title: "Les e-mails officiels finissent par @aiabasd.org", body: "Les messages authentiques proviennent uniquement de gs@aibasd.org, gs@aiabasd.org ou fo@aiabasd.org. Les domaines imités (mots ajoutés, terminaisons modifiées) sont frauduleux." },
      { title: "Aucune promesse de rendement garanti", body: "L'AIABASD ne vend pas d'investissements, ne promet pas de rendements et ne collecte pas de fonds auprès du public. Quiconque propose un \u201Cprofit garanti\u201D en notre nom nous usurpe." },
      { title: "Un seul site officiel", body: "Notre unique site est https://aiabasd.org. Méfiez-vous des copies sur d'autres domaines." },
      { title: "Les accords passent par des canaux vérifiés", body: "Les vrais contrats et mandats sont signés par des canaux institutionnels avec des signataires autorisés — jamais par simple messagerie." },
    ],
    channelsTitle: "Nos seuls canaux officiels",
    channels: [
      { label: "Site web", value: "https://aiabasd.org" },
      { label: "Demandes générales", value: "gs@aibasd.org" },
      { label: "Secrétariat général", value: "gs@aiabasd.org" },
      { label: "Bureau Finances & Surveillance", value: "fo@aiabasd.org" },
    ],
    reportTitle: "Reçu un message suspect ?",
    reportBody: "Ne payez pas, ne partagez pas de documents, et transférez le message à gs@aibasd.org. Nous examinons les signalements et alertons le public en cas d'usurpation confirmée.",
    notice: "Cette page est un avis public permanent. Elle ne constitue pas un conseil juridique ; signalez aussi toute fraude suspectée aux autorités locales.",
  },
};
