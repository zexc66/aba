export type AppLocale = "en" | "ar" | "fr";

export interface LegalSectionCopy {
  title: string;
  body: string[];
}

export interface LocalizedCopy {
  privacy: {
    eyebrow: string;
    title: string;
    lastUpdated: string;
    description: string;
    sections: LegalSectionCopy[];
  };
  terms: {
    eyebrow: string;
    title: string;
    lastUpdated: string;
    description: string;
    sections: LegalSectionCopy[];
  };
  consent: {
    contactLabel: string;
    contactText: string;
    newsletterLabel: string;
    newsletterText: string;
    privacyLinkLabel: string;
  };
  notFound: {
    seoTitle: string;
    seoDescription: string;
    failureCode: string;
    syncFailure: string;
    title: string;
    quote: string;
    home: string;
    rescan: string;
    audit: string;
    redacted: string;
    errorLog: string;
    coreProtect: string;
  };
  chatbot: {
    initialGreeting: string;
    fallback: string;
    connectionError: string;
    toggleChat: string;
    assistantLabel: string;
    closeChat: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendMessage: string;
  };
  search: {
    placeholder: string;
    close: string;
    noResults: string;
    navigation: string;
    home: string;
    about: string;
    programs: string;
    team: string;
    visions: string;
    intelligence: string;
    projects: string;
    gallery: string;
    contact: string;
    actions: string;
    switchLanguage: string;
    toggleHint: string;
  };
}

export const LOCALIZED_COPY: Record<AppLocale, LocalizedCopy> = {
  en: {
    privacy: {
      eyebrow: "Legal",
      title: "Privacy Policy",
      lastUpdated: "Last updated: August 2026",
      description: "How AIABASD collects, uses, and protects the information you submit through this website.",
      sections: [
        { title: "1. Who we are", body: ["This website is operated by the African International Alliance for Business & Sustainable Development (AIABASD), with headquarters in London, United Kingdom, and a regional secretariat in Dakar, Senegal. For any privacy question, contact contact@aiabasd.org."] },
        { title: "2. Information we collect", body: ["When you submit the contact form, the investor access request, or the newsletter subscription, we collect the details you provide: your name, email address, organization, and message. We do not collect any other personal information through this website.", "We do not currently use analytics or advertising cookies on this website."] },
        { title: "3. How we use your information", body: ["We use the information you submit solely to respond to your inquiry, to process investor access requests, or to send you the institutional updates you subscribed to. We do not sell, rent, or share your information with third parties for marketing purposes."] },
        { title: "4. Storage and retention", body: ["Inquiries are stored securely on our server and accessible only to authorized personnel. We retain inquiry records for as long as necessary to handle your request and to meet our legal and institutional obligations, after which they are deleted."] },
        { title: "5. Your rights", body: ["Depending on your jurisdiction, including under the UK GDPR and the EU GDPR, you may have the right to access, correct, or delete the personal information we hold about you, and to withdraw consent at any time. To exercise these rights, email contact@aiabasd.org."] },
        { title: "6. Changes to this policy", body: ["We may update this policy from time to time. The latest version is always published on this page."] },
      ],
    },
    terms: {
      eyebrow: "Legal",
      title: "Terms of Use",
      lastUpdated: "Last updated: August 2026",
      description: "Terms governing the use of the AIABASD website and the information published on it.",
      sections: [
        { title: "1. Purpose of this website", body: ["This website provides information about the African International Alliance for Business & Sustainable Development (AIABASD), its programs, and its governance. It is informational in nature and does not constitute an offer, solicitation, or invitation to invest in any program."] },
        { title: "2. No financial or investment advice", body: ["Nothing on this website — including program descriptions, pipeline figures, or responses from the website assistant — constitutes financial, investment, legal, or tax advice. Any figures shown are illustrative objectives, not promises or guarantees of return. Decisions to engage with AIABASD must be based on your own due diligence and formal contractual documentation."] },
        { title: "3. Accuracy of information", body: ["We take care to keep the information on this website accurate and current, but it is provided \"as is\" without warranty of completeness. AIABASD accepts no liability for actions taken in reliance on this website's content."] },
        { title: "4. Inquiries", body: ["Submitting an inquiry, newsletter subscription, or investor access request through this website expresses your interest in being contacted by AIABASD. It does not create any contractual relationship."] },
        { title: "5. Intellectual property", body: ["The name AIABASD, the alliance's logo, and the content of this website are protected. You may share links to this site; reproducing substantial parts of its content requires prior written permission."] },
        { title: "6. Governing terms", body: ["Any engagement with AIABASD is ultimately governed by separately executed written agreements, which prevail over anything stated on this website. Questions: contact@aiabasd.org."] },
      ],
    },
    consent: {
      contactLabel: "PRIVACY / PROCESSING CONSENT",
      contactText: "I consent to AIABASD processing the information I provide to review and respond to my inquiry.",
      newsletterLabel: "PRIVACY / PROCESSING CONSENT",
      newsletterText: "I consent to AIABASD processing my email address to send the institutional updates I requested.",
      privacyLinkLabel: "Read the privacy policy",
    },
    notFound: {
      seoTitle: "Mandate Void | 404",
      seoDescription: "Sovereign protocol error: the requested path was not identified.",
      failureCode: "FAILURE_CODE_0x404",
      syncFailure: "NODAL_SYNC_FAILURE",
      title: "Mandate Void.",
      quote: "The requested path has been de-indexed or does not belong to the sovereign institutional cluster.",
      home: "REBOOT_TO_HOME",
      rescan: "INITIATE_PATH_RESCAN",
      audit: "SYSTEM_CORE_AUDIT: NO_LOG_ENTRY_FOR_CURRENT_ROUTE",
      redacted: "OVERSIGHT_STATUS: REDACTED_PATHWAY",
      errorLog: "ERROR_LOG_V.01",
      coreProtect: "INSTITUTIONAL_CORE_PROTECT",
    },
    chatbot: {
      initialGreeting: "Hello! How can I help you today?",
      fallback: "I'm sorry, I couldn't process that.",
      connectionError: "Sorry, I'm having trouble connecting. Please try again later.",
      toggleChat: "Toggle chat",
      assistantLabel: "AIABASD Assistant",
      closeChat: "Close chat",
      messageLabel: "Message",
      messagePlaceholder: "Type your message...",
      sendMessage: "Send message",
    },
    search: {
      placeholder: "Type a command or search...",
      close: "Close",
      noResults: "No results found.",
      navigation: "Navigation",
      home: "Home",
      about: "About",
      programs: "Programs",
      team: "Team",
      visions: "Visions",
      intelligence: "Program Intelligence",
      projects: "Projects",
      gallery: "Gallery",
      contact: "Contact",
      actions: "Actions",
      switchLanguage: "Switch language",
      toggleHint: "Press Ctrl + K to toggle",
    },
  },
  ar: {
    privacy: {
      eyebrow: "قانوني",
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: أغسطس 2026",
      description: "كيفية جمع AIABASD للمعلومات التي تقدمها عبر هذا الموقع واستخدامها وحمايتها.",
      sections: [
        { title: "1. من نحن", body: ["يدير هذا الموقع التحالف الدولي الأفريقي للأعمال والتنمية المستدامة (AIABASD)، ومقره في لندن بالمملكة المتحدة، وأمانته الإقليمية في داكار بالسنغال. لأي سؤال يتعلق بالخصوصية، يرجى التواصل عبر contact@aiabasd.org."] },
        { title: "2. المعلومات التي نجمعها", body: ["عند إرسال نموذج التواصل أو طلب الوصول إلى المستثمرين أو الاشتراك في النشرة، نجمع التفاصيل التي تقدمها: اسمك وعنوان بريدك الإلكتروني ومؤسستك ورسالتك. لا نجمع أي معلومات شخصية أخرى عبر هذا الموقع.", "لا نستخدم حالياً ملفات تعريف الارتباط للتحليلات أو الإعلانات على هذا الموقع."] },
        { title: "3. كيفية استخدام معلوماتك", body: ["نستخدم المعلومات التي تقدمها حصراً للرد على استفسارك أو معالجة طلبات وصول المستثمرين أو إرسال التحديثات المؤسسية التي اشتركت فيها. لا نبيع معلوماتك أو نؤجرها أو نشاركها مع أطراف ثالثة لأغراض تسويقية."] },
        { title: "4. التخزين والاحتفاظ", body: ["تُخزّن الاستفسارات بأمان على خادمنا ولا يمكن الوصول إليها إلا من قبل الأشخاص المخولين. نحتفظ بسجلات الاستفسارات للمدة اللازمة لمعالجة طلبك والوفاء بالتزاماتنا القانونية والمؤسسية، ثم نحذفها."] },
        { title: "5. حقوقك", body: ["بحسب نطاق اختصاصك، بما في ذلك بموجب UK GDPR وEU GDPR، قد يكون لك الحق في الوصول إلى معلوماتك الشخصية التي نحتفظ بها وتصحيحها أو حذفها، وسحب موافقتك في أي وقت. لممارسة هذه الحقوق، أرسل بريداً إلى contact@aiabasd.org."] },
        { title: "6. التغييرات على هذه السياسة", body: ["قد نحدّث هذه السياسة من وقت لآخر. تُنشر أحدث نسخة دائماً على هذه الصفحة."] },
      ],
    },
    terms: {
      eyebrow: "قانوني",
      title: "شروط الاستخدام",
      lastUpdated: "آخر تحديث: أغسطس 2026",
      description: "الشروط المنظمة لاستخدام موقع AIABASD والمعلومات المنشورة عليه.",
      sections: [
        { title: "1. الغرض من هذا الموقع", body: ["يوفر هذا الموقع معلومات عن التحالف الدولي الأفريقي للأعمال والتنمية المستدامة (AIABASD) وبرامجه وحوكمته. وطبيعته معلوماتية ولا يشكل عرضاً أو طلباً أو دعوة للاستثمار في أي برنامج."] },
        { title: "2. لا تُقدَّم مشورة مالية أو استثمارية", body: ["لا يشكل أي شيء في هذا الموقع — بما في ذلك أوصاف البرامج وأرقام خط الأنابيب أو الردود الصادرة عن مساعد الموقع — مشورة مالية أو استثمارية أو قانونية أو ضريبية. وأي أرقام معروضة هي أهداف توضيحية وليست وعوداً أو ضمانات للعائد. يجب أن تستند قرارات التعامل مع AIABASD إلى العناية الواجبة الخاصة بك والوثائق التعاقدية الرسمية."] },
        { title: "3. دقة المعلومات", body: ["نحرص على إبقاء المعلومات الواردة في هذا الموقع دقيقة وحديثة، لكنها مقدمة \"كما هي\" دون ضمان اكتمالها. ولا يتحمل AIABASD مسؤولية الأفعال المتخذة اعتماداً على محتوى هذا الموقع."] },
        { title: "4. الاستفسارات", body: ["يعبر إرسال استفسار أو الاشتراك في النشرة أو طلب الوصول إلى المستثمرين عبر هذا الموقع عن اهتمامك بأن يتواصل معك AIABASD. ولا ينشئ ذلك أي علاقة تعاقدية."] },
        { title: "5. الملكية الفكرية", body: ["اسم AIABASD وشعار التحالف ومحتوى هذا الموقع محميون. يمكنك مشاركة روابط هذا الموقع؛ أما إعادة إنتاج أجزاء كبيرة من محتواه فتتطلب إذناً خطياً مسبقاً."] },
        { title: "6. الشروط الحاكمة", body: ["يخضع أي تعامل مع AIABASD في نهاية المطاف لاتفاقيات مكتوبة منفذة بشكل منفصل، وتعلو تلك الاتفاقيات على أي شيء مذكور في هذا الموقع. للاستفسارات: contact@aiabasd.org."] },
      ],
    },
    consent: {
      contactLabel: "الموافقة على الخصوصية والمعالجة",
      contactText: "أوافق على معالجة AIABASD للمعلومات التي أقدمها لمراجعة استفساري والرد عليه.",
      newsletterLabel: "الموافقة على الخصوصية والمعالجة",
      newsletterText: "أوافق على معالجة AIABASD لعنوان بريدي الإلكتروني لإرسال التحديثات المؤسسية التي طلبتها.",
      privacyLinkLabel: "قراءة سياسة الخصوصية",
    },
    notFound: {
      seoTitle: "المسار غير متاح | 404",
      seoDescription: "خطأ في البروتوكول: لم يتم التعرف على المسار المطلوب.",
      failureCode: "رمز_الفشل_0x404",
      syncFailure: "فشل_مزامنة_العقدة",
      title: "المسار غير متاح.",
      quote: "تمت إزالة المسار المطلوب من الفهرس أو لا ينتمي إلى المجموعة المؤسسية السيادية.",
      home: "إعادة_التشغيل_إلى_الرئيسية",
      rescan: "بدء_إعادة_فحص_المسار",
      audit: "تدقيق_النواة: لا_سجل_للمسار_الحالي",
      redacted: "حالة_الرقابة: مسار_محجوب",
      errorLog: "سجل_الخطأ_V.01",
      coreProtect: "حماية_النواة_المؤسسية",
    },
    chatbot: {
      initialGreeting: "مرحباً! كيف يمكنني مساعدتك اليوم؟",
      fallback: "عذراً، لم أتمكن من معالجة ذلك.",
      connectionError: "عذراً، أواجه مشكلة في الاتصال. يرجى المحاولة لاحقاً.",
      toggleChat: "تبديل المحادثة",
      assistantLabel: "مساعد AIABASD",
      closeChat: "إغلاق المحادثة",
      messageLabel: "الرسالة",
      messagePlaceholder: "اكتب رسالتك...",
      sendMessage: "إرسال الرسالة",
    },
    search: {
      placeholder: "اكتب أمراً أو ابحث...",
      close: "إغلاق",
      noResults: "لم يتم العثور على نتائج.",
      navigation: "التنقل",
      home: "الرئيسية",
      about: "من نحن",
      programs: "البرامج",
      team: "الفريق",
      visions: "الرؤى",
      intelligence: "ذكاء البرامج",
      projects: "المشاريع",
      gallery: "المعرض",
      contact: "تواصل",
      actions: "الإجراءات",
      switchLanguage: "تغيير اللغة",
      toggleHint: "اضغط Ctrl + K للتبديل",
    },
  },
  fr: {
    privacy: {
      eyebrow: "Juridique",
      title: "Politique de confidentialité",
      lastUpdated: "Dernière mise à jour : août 2026",
      description: "Comment AIABASD collecte, utilise et protège les informations que vous transmettez sur ce site.",
      sections: [
        { title: "1. Qui sommes-nous ?", body: ["Ce site est exploité par l'Alliance Internationale Africaine pour les Affaires et le Développement Durable (AIABASD), dont le siège est à Londres, au Royaume-Uni, et le secrétariat régional à Dakar, au Sénégal. Pour toute question relative à la confidentialité, contactez contact@aiabasd.org."] },
        { title: "2. Informations collectées", body: ["Lorsque vous envoyez le formulaire de contact, une demande d'accès investisseur ou vous abonnez à la newsletter, nous collectons les informations que vous fournissez : votre nom, votre adresse e-mail, votre organisation et votre message. Nous ne collectons aucune autre information personnelle par l'intermédiaire de ce site.", "Nous n'utilisons actuellement aucun cookie d'analyse ou de publicité sur ce site."] },
        { title: "3. Utilisation de vos informations", body: ["Nous utilisons les informations transmises uniquement pour répondre à votre demande, traiter les demandes d'accès investisseur ou vous envoyer les mises à jour institutionnelles auxquelles vous vous êtes inscrit. Nous ne vendons, ne louons ni ne partageons vos informations avec des tiers à des fins marketing."] },
        { title: "4. Stockage et conservation", body: ["Les demandes sont stockées de manière sécurisée sur notre serveur et ne sont accessibles qu'au personnel autorisé. Nous conservons les dossiers aussi longtemps que nécessaire pour traiter votre demande et respecter nos obligations légales et institutionnelles, puis nous les supprimons."] },
        { title: "5. Vos droits", body: ["Selon votre juridiction, notamment au titre du UK GDPR et de l'EU GDPR, vous pouvez avoir le droit d'accéder aux informations personnelles que nous détenons, de les corriger ou de les supprimer, et de retirer votre consentement à tout moment. Pour exercer ces droits, écrivez à contact@aiabasd.org."] },
        { title: "6. Modifications de cette politique", body: ["Nous pouvons mettre à jour cette politique de temps à autre. La dernière version est toujours publiée sur cette page."] },
      ],
    },
    terms: {
      eyebrow: "Juridique",
      title: "Conditions d'utilisation",
      lastUpdated: "Dernière mise à jour : août 2026",
      description: "Conditions régissant l'utilisation du site AIABASD et des informations qui y sont publiées.",
      sections: [
        { title: "1. Objet du site", body: ["Ce site fournit des informations sur l'Alliance Internationale Africaine pour les Affaires et le Développement Durable (AIABASD), ses programmes et sa gouvernance. Il est informatif et ne constitue pas une offre, une sollicitation ou une invitation à investir dans un programme."] },
        { title: "2. Aucun conseil financier ou d'investissement", body: ["Rien sur ce site — y compris les descriptions de programmes, les chiffres du pipeline ou les réponses de l'assistant — ne constitue un conseil financier, d'investissement, juridique ou fiscal. Les chiffres présentés sont des objectifs indicatifs, et non des promesses ou garanties de rendement. Toute décision de collaborer avec AIABASD doit reposer sur vos propres vérifications et sur une documentation contractuelle formelle."] },
        { title: "3. Exactitude des informations", body: ["Nous veillons à ce que les informations publiées sur ce site soient exactes et à jour, mais elles sont fournies \"en l'état\", sans garantie d'exhaustivité. AIABASD décline toute responsabilité pour les actions entreprises sur la base du contenu de ce site."] },
        { title: "4. Demandes", body: ["L'envoi d'une demande, l'inscription à la newsletter ou une demande d'accès investisseur exprime votre intérêt à être contacté par AIABASD. Cela ne crée aucune relation contractuelle."] },
        { title: "5. Propriété intellectuelle", body: ["Le nom AIABASD, le logo de l'alliance et le contenu de ce site sont protégés. Vous pouvez partager les liens vers ce site ; la reproduction de parties substantielles de son contenu nécessite une autorisation écrite préalable."] },
        { title: "6. Conditions applicables", body: ["Toute relation avec AIABASD est en définitive régie par des accords écrits distincts et signés, qui prévalent sur toute information publiée sur ce site. Questions : contact@aiabasd.org."] },
      ],
    },
    consent: {
      contactLabel: "CONSENTEMENT CONFIDENTIALITÉ / TRAITEMENT",
      contactText: "J'autorise AIABASD à traiter les informations que je fournis afin d'examiner ma demande et d'y répondre.",
      newsletterLabel: "CONSENTEMENT CONFIDENTIALITÉ / TRAITEMENT",
      newsletterText: "J'autorise AIABASD à traiter mon adresse e-mail afin d'envoyer les mises à jour institutionnelles demandées.",
      privacyLinkLabel: "Lire la politique de confidentialité",
    },
    notFound: {
      seoTitle: "Mandat introuvable | 404",
      seoDescription: "Erreur de protocole : le chemin demandé n'a pas été identifié.",
      failureCode: "CODE_ERREUR_0x404",
      syncFailure: "ÉCHEC_SYNCHRONISATION_NODALE",
      title: "Mandat introuvable.",
      quote: "Le chemin demandé a été retiré de l'index ou n'appartient pas au cluster institutionnel souverain.",
      home: "REDÉMARRER_VERS_ACCUEIL",
      rescan: "LANCER_NOUVEAU_SCAN",
      audit: "AUDIT_DU_NOYAU : AUCUNE_TRACE_POUR_CETTE_ROUTE",
      redacted: "STATUT_DE_SUPERVISION : VOIE_REDACTÉE",
      errorLog: "JOURNAL_ERREUR_V.01",
      coreProtect: "PROTECTION_DU_NOYAU_INSTITUTIONNEL",
    },
    chatbot: {
      initialGreeting: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      fallback: "Désolé, je n'ai pas pu traiter votre demande.",
      connectionError: "Désolé, la connexion rencontre un problème. Veuillez réessayer plus tard.",
      toggleChat: "Ouvrir ou fermer le chat",
      assistantLabel: "Assistant AIABASD",
      closeChat: "Fermer le chat",
      messageLabel: "Message",
      messagePlaceholder: "Saisissez votre message...",
      sendMessage: "Envoyer le message",
    },
    search: {
      placeholder: "Saisissez une commande ou recherchez...",
      close: "Fermer",
      noResults: "Aucun résultat trouvé.",
      navigation: "Navigation",
      home: "Accueil",
      about: "À propos",
      programs: "Programmes",
      team: "Équipe",
      visions: "Visions",
      intelligence: "Intelligence programmes",
      projects: "Projets",
      gallery: "Galerie",
      contact: "Contact",
      actions: "Actions",
      switchLanguage: "Changer de langue",
      toggleHint: "Appuyez sur Ctrl + K pour basculer",
    },
  },
};
