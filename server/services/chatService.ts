
type ChatLocale = "en" | "ar" | "fr";
type ChatTopic = "greeting" | "about" | "hama" | "recycling" | "programs" | "greenEnergy" | "arish" | "team" | "regions" | "governance" | "partnership" | "contact" | "sdg" | "general";

function topicFor(message: string): ChatTopic {
    const msg = message.toLowerCase();
    if (msg.match(/^(hello|hi|hey|مرحبا|bonjour|greetings|good\s+(morning|afternoon|evening))/) || msg.includes("السلام") || msg.includes("أهلا") || msg.includes("مساء")) return "greeting";
    if (msg.includes("what") && (msg.includes("aiabasd") || msg.includes("alliance") || msg.includes("organization"))) return "about";
    if (msg.includes("hama") || msg.includes("syria") || msg.includes("school") || msg.includes("health center") || msg.includes("fida'an")) return "hama";
    if (msg.includes("recycl") || msg.includes("rubble") || msg.includes("debris") || msg.includes("concrete") || msg.includes("eco-brick")) return "recycling";
    if (msg.includes("green energy") || msg.includes("solar")) return "greenEnergy";
    if (msg.includes("program") || msg.includes("project") || msg.includes("portfolio") || msg.includes("initiative")) return "programs";
    if (msg.includes("arish") || msg.includes("al-arish") || msg.includes("gaza")) return "arish";
    if (msg.includes("team") || msg.includes("founder") || msg.includes("leadership") || msg.includes("who is") || msg.includes("ziad") || msg.includes("faris") || msg.includes("mohammed") || msg.includes("abdel moneim")) return "team";
    if (msg.includes("countr") || msg.includes("where") || msg.includes("region") || msg.includes("africa") || msg.includes("arab")) return "regions";
    if (msg.includes("governance") || msg.includes("compliance") || msg.includes("kyc") || msg.includes("amls") || msg.includes("audit")) return "governance";
    if (msg.includes("partner") || msg.includes("invest") || msg.includes("fund") || msg.includes("capital")) return "partnership";
    if (msg.includes("contact") || msg.includes("email") || msg.includes("reach") || msg.includes("join")) return "contact";
    if (msg.includes("sdg") || msg.includes("sustainable")) return "sdg";
    return "general";
}

function localizedResponse(locale: Exclude<ChatLocale, "en">, topic: ChatTopic): string {
    const responses: Record<Exclude<ChatLocale, "en">, Record<ChatTopic, string>> = {
        ar: {
            greeting: "مرحباً بك في AIABASD. يمكنني الإجابة عن برامجنا، فريقنا، مناطق عملنا، الحوكمة، أو فرص الشراكة والاستثمار. كيف يمكنني مساعدتك؟",
            about: "AIABASD هو تحالف دولي أفريقي للأعمال والتنمية المستدامة ينسق برامج بنية تحتية قابلة للتمويل عبر أفريقيا والعالم العربي، مع أطر ESIA/ESMS وفحص KYC/AML ورقابة مستقلة.",
            hama: "تقود AIABASD مبادرة إعادة تأهيل 50 مدرسة و20 مركزاً صحياً في حماة، سوريا. لمزيد من التفاصيل، يرجى زيارة صفحة مشروع حماة أو التواصل معنا.",
            recycling: "يعالج برنامج إعادة تدوير الأنقاض في سوريا مخلفات البناء، بما في ذلك تكسير الخرسانة وتصنيع الطوب البيئي، لدعم التعافي الحضري.",
            programs: "تشمل برامجنا إعادة تأهيل حماة، إعادة تدوير الأنقاض، مركز العريش، الطاقة الخضراء، البنية الرقمية، المدن المتكاملة، والأمن الغذائي. ما البرنامج الذي تود معرفته؟",
            greenEnergy: "الطاقة الخضراء قيد التطوير. يشمل النطاق المنشور طاقة شمسية على نطاق المرافق بقدرة 150 ميغاواط أو أكثر، مع هياكل EPC+F متعددة المناطق. لمزيد من المعلومات، يرجى التواصل معنا.",
            arish: "مركز العريش هو مركز لوجستي إقليمي يخدم إعادة إعمار غزة، ويشمل التخزين، والتخزين المبرد، وإدارة الأسطول، وتسهيل الجمارك.",
            team: "يضم فريق القيادة المنشور الدكتور محمد عبد المنعم، وفارس صافي، وزياد شنيكات، بصفات نائب الرئيس والشريك المؤسس والشريك.",
            regions: "نعمل في ممرات مستهدفة تشمل غانا، غامبيا، سيراليون، بوركينا فاسو، ساحل العاج، أنغولا، السودان، مصر، الأردن، سوريا، والسعودية.",
            governance: "تتضمن منظومة الحوكمة لدينا ESIA/ESMS، وفحص KYC/AML، ومهندساً ومدققاً مستقلاً لكل برنامج، ورسوم نجاح مرتبطة بالمعالم التي يتم التحقق منها بصورة مستقلة.",
            partnership: "ترتبط AIABASD بالمؤسسات العامة ورأس المال الخاص وشركاء التنفيذ. للاستفسارات، استخدم نموذج التواصل أو بوابة المستثمرين.",
            contact: "للاستفسارات، استخدم نموذج التواصل في الموقع أو راسل contact@aiabasd.org أو gs@aiabasd.org أو fo@aiabasd.org.",
            sdg: "تتوافق مواقعنا وبرامجنا مع أهداف التنمية المستدامة للأمم المتحدة 2030 وأجندة الاتحاد الأفريقي 2063، مع مجالات تشمل الطاقة النظيفة والأمن الغذائي.",
            general: "أنا مساعد AIABASD. يمكنني الإجابة عن المعلومات المنشورة حول البرامج، فريق القيادة، مناطق العمل، الحوكمة، وطرق التواصل. إذا لم تكن المعلومة منشورة، استخدم نموذج التواصل."
        },
        fr: {
            greeting: "Bienvenue à l'AIABASD. Je peux répondre à vos questions sur nos programmes, notre équipe, nos zones d'intervention, notre gouvernance ou les partenariats. Comment puis-je vous aider ?",
            about: "L'AIABASD est une alliance internationale africaine pour les affaires et le développement durable. Elle coordonne des programmes d'infrastructure bancables en Afrique et dans le monde arabe, avec des cadres ESIA/ESMS, KYC/AML et une supervision indépendante.",
            hama: "L'AIABASD dirige la réhabilitation de 50 écoles et 20 centres de santé à Hama, en Syrie. Consultez la page du projet de Hama ou contactez-nous pour plus d'informations.",
            recycling: "Le programme syrien de recyclage des débris traite les gravats, notamment par le concassage du béton et la fabrication d'éco-briques, pour soutenir la reconstruction urbaine.",
            programs: "Nos programmes comprennent la réhabilitation de Hama, le recyclage des débris, le hub d'Al-Arish, l'énergie verte, l'infrastructure numérique, les villes intégrées et la sécurité alimentaire. Quel programme vous intéresse ?",
            greenEnergy: "L'énergie verte est en développement. Le périmètre publié comprend plus de 150 MW de solaire à grande échelle, avec des structures EPC+F multi-régionales. Contactez-nous pour plus d'informations.",
            arish: "Le hub d'Al-Arish est une plateforme logistique régionale dédiée à la reconstruction de Gaza : entreposage, chaîne du froid, flotte et facilitation douanière.",
            team: "L'équipe dirigeante publiée comprend le Dr Mohammed Abdel Moneim, Faris Safi et Ziad Shneikat, respectivement vice-président, cofondateur et partenaire.",
            regions: "Nous intervenons dans des corridors ciblés au Ghana, en Gambie, en Sierra Leone, au Burkina Faso, en Côte d'Ivoire, en Angola, au Soudan, en Égypte, en Jordanie, en Syrie et en Arabie saoudite.",
            governance: "Notre gouvernance comprend les cadres ESIA/ESMS, le filtrage KYC/AML, un ingénieur et un auditeur indépendants par programme, ainsi que des frais de succès liés à des jalons vérifiés indépendamment.",
            partnership: "L'AIABASD travaille avec des institutions publiques, des capitaux privés et des partenaires de mise en œuvre. Pour toute demande, utilisez le formulaire de contact ou le portail investisseurs.",
            contact: "Pour nous joindre, utilisez le formulaire du site ou écrivez à contact@aiabasd.org, gs@aiabasd.org ou fo@aiabasd.org.",
            sdg: "Nos sites et programmes sont alignés sur les ODD de l'ONU à l'horizon 2030 et l'Agenda 2063 de l'Union africaine, avec des domaines comme l'énergie propre et la sécurité alimentaire.",
            general: "Je suis l'assistant AIABASD. Je peux répondre aux informations publiées sur nos programmes, notre équipe, nos zones d'intervention, notre gouvernance et nos moyens de contact. Si un détail n'est pas publié, utilisez le formulaire de contact."
        }
    };
    return responses[locale][topic];
}

export function generateChatResponse(message: string, locale: ChatLocale = "en"): string {
    const msg = message.toLowerCase();
    const safeLocale: ChatLocale = locale === "ar" || locale === "fr" ? locale : "en";

    if (safeLocale !== "en") return localizedResponse(safeLocale, topicFor(message));

    if (msg.match(/^(hello|hi|hey|مرحبا|bonjour|greetings|good\s+(morning|afternoon|evening))/)) {
        return "Hello! Welcome to AIABASD (African International Alliance for Business & Sustainable Development). I'm here to answer questions about our specific projects like the Hama Initiative, our focus across Africa and the Arab world, our team, or how to partner with us.\n\nHow may I assist you today?";
    }

    if (msg.includes("what") && (msg.includes("aiabasd") || msg.includes("alliance") || msg.includes("organization"))) {
        return "**About AIABASD**\n\nThe African International Alliance for Business & Sustainable Development (AIABASD) is a multi-country alliance coordinating bankable infrastructure and development programs across Africa and the Arab world.\n\nOur model connects public institutions, private capital, and delivery partners through PPP/BOT structures, with ESIA/ESMS, KYC/AML, independent oversight, and milestone-linked success fees.";
    }

    if (msg.includes("hama") || msg.includes("syria") || msg.includes("school") || msg.includes("health center") || msg.includes("fida'an")) {
        return "**The Hama Project (Fida'an for Hama Initiative)**\n\nAIABASD is leading the rehabilitation of **50 schools and 20 health centers** in Hama, Syria.\n\nSee the dedicated Hama Project page for the published scope and project information.";
    }

    if (msg.includes("recycl") || msg.includes("rubble") || msg.includes("debris") || msg.includes("concrete") || msg.includes("eco-brick")) {
        return "**Debris Recycling & Circular Material Recovery — Syria**\n\nAIABASD's circular economy program in Syria covers industrial rubble processing, concrete crushing, and eco-brick manufacturing for urban recovery.";
    }

    if (msg.includes("green energy") || msg.includes("solar")) {
        return "**Green Energy**\n\nGreen Energy is listed as in development. The published scope is 150MW+ utility-scale solar with EPC+F structures across multiple regions.\n\nFor current project information, use the contact form.";
    }

    if (msg.includes("program") || msg.includes("project") || msg.includes("portfolio") || msg.includes("initiative")) {
        return "**Flagship Programs**\n\nOur primary initiatives include:\n\n1. **Rehabilitation in Hama, Syria** (50 schools and 20 health centers)\n2. **Debris Recycling & Circular Recovery** (Rubble processing and eco-bricks in Syria)\n3. **Al‑Arish Hub** (Logistics and reconstruction serving Gaza)\n4. **Green Energy** (Utility-scale solar and EPC+F structures)\n5. **Digital Africa** (Telecom and cyber infrastructure)\n6. **Integrated Cities** (Industrial and logistics PPP/BOT zones)\n7. **Food Security** (Agro-processing and cold chain)\n\nWhich program would you like to know more about?";
    }

    if (msg.includes("arish") || msg.includes("al-arish") || msg.includes("gaza")) {
        return "**Al-Arish Logistics & Reconstruction Hub**\n\nThis regional humanitarian logistics hub serves Gaza reconstruction. The published scope includes warehousing, cold storage, fleet operations, and customs facilitation.";
    }

    if (msg.includes("team") || msg.includes("founder") || msg.includes("leadership") || msg.includes("who is") || msg.includes("ziad") || msg.includes("faris") || msg.includes("mohammed") || msg.includes("abdel moneim")) {
        return "**Our Leadership Team**\n\n• **Dr. Mohammed Abdel Moneim** — Vice President\n• **Faris Safi** — Co-Founder & Partner\n• **Ziad Shneikat** — Co-Founder & Partner";
    }

    if (msg.includes("countr") || msg.includes("where") || msg.includes("region") || msg.includes("africa") || msg.includes("arab")) {
        return "**Where We Operate**\n\nOur primary geographies include:\n\n• Ghana\n• The Gambia\n• Sierra Leone\n• Burkina Faso\n• Côte d'Ivoire\n• Angola\n• Jordan\n• Egypt\n• Syria\n• Sudan\n• Saudi Arabia\n\nWould you like information about a specific region?";
    }

    if (msg.includes("governance") || msg.includes("compliance") || msg.includes("kyc") || msg.includes("amls") || msg.includes("audit")) {
        return "**Governance & Compliance**\n\nOur delivery model includes:\n\n• **ESIA & ESMS**: Environmental and social impact management.\n• **KYC/AML**: Counterparty screening.\n• **Independent Oversight**: Engineers and auditors per program.\n• **Contracts**: PPP/BOT/EPC+F structures with milestone-linked success fees.";
    }

    if (msg.includes("partner") || msg.includes("invest") || msg.includes("fund") || msg.includes("capital")) {
        return "**Strategic Partnerships & Investment**\n\nFor partnership or investment inquiries, use the contact form or the Investor Portal. Investor access is director-issued and reviewed by the directorate.";
    }

    if (msg.includes("contact") || msg.includes("email") || msg.includes("reach") || msg.includes("join")) {
        return "**Get in Touch**\n\nUse the Contact form or write to contact@aiabasd.org, gs@aiabasd.org, or fo@aiabasd.org.";
    }

    if (msg.includes("sdg") || msg.includes("sustainable")) {
        return "**Sustainable Development Goals (SDG)**\n\nOur sites align with the UN Sustainable Development Goals for 2030 and the AU Agenda 2063. Published program areas include clean utility-scale solar and food-security logistics.";
    }

    if (msg.includes("السلام") || msg.includes("أهلا") || msg.includes("مساء")) {
        return "مرحباً بك في التحالف الدولي الإفريقي للأعمال والتنمية المستدامة (AIABASD).\n\nمن خلال هذا المركز، نقوم بتسريع النمو المستدام عبر إفريقيا عن طريق التحالفات وشراكات القطاع العام والخاص.\n\nكيف يمكنني مساعدتك؟ (مثلاً يمكنك سؤالي عن برامجنا، أو مشاريعنا مثل مشروع حماة، أو فريق العمل).";
    }

    return "I'm the AIABASD assistant. I can answer questions about published programs, leadership, geographies, governance, and contact routes. If a detail is not published, please use the Contact form.";
}
