
export function generateChatResponse(message: string): string {
    const msg = message.toLowerCase();

    // Greetings
    if (msg.match(/^(hello|hi|hey|مرحبا|bonjour|greetings|good\s+(morning|afternoon|evening))/)) {
        return "Hello! Welcome to AIABASD (African International Alliance for Business & Sustainable Development). I'm here to answer questions about our specific projects like the Hama Initiative, our focus across Africa and the Arab world, our team, or how to partner with us.\n\nHow may I assist you today?";
    }

    // About AIABASD
    if (msg.includes("what") && (msg.includes("aiabasd") || msg.includes("alliance") || msg.includes("organization"))) {
        return "**About AIABASD**\n\nThe African International Alliance for Business & Sustainable Development (AIABASD) is a multi-country alliance orchestrating high-impact infrastructure and development programs.\n\nWe focus on:\n• **Connecting** governments, private capital, and impact operators.\n• **Delivering** bankable PPP/BOT programs across energy, logistics, agriculture, digital infrastructure, and resilient cities.\n• **Ensuring** robust governance (ESIA/ESMS, KYC/AML, Independent Auditor) and transparent success-fee structures.\n\nOur goal is to accelerate sustainable growth across Africa and the Arab world, strongly aligned with SDG 2030 and AU Agenda 2063.";
    }

    // Specific Hama Project
    if (msg.includes("hama") || msg.includes("syria") || msg.includes("school") || msg.includes("health center") || msg.includes("fida'an")) {
        return "**The Hama Project (Fida'an for Hama Initiative)**\n\nAIABASD is leading the comprehensive rehabilitation of **50 Schools and 20 Health Centers** in Hama, Syria.\n\nThis humanitarian-focused infrastructure project aims to provide safe, dignified environments for local communities, supporting early recovery and sustainable development in vital coordination with local and international partners.\n\nYou can view more details, including our objective roadmap and partner list, on the dedicated Hama Project page (click 'Programs' > 'Hama Project').";
    }

    // Specific Recycling in Syria Project
    if (msg.includes("recycl") || msg.includes("rubble") || msg.includes("debris") || msg.includes("concrete") || msg.includes("eco-brick")) {
        return "**Debris Recycling & Circular Material Recovery — Syria**\n\nAIABASD's circular economy program in Syria establishes industrial rubble processing, concrete crushing, and eco-brick manufacturing facilities across affected governorates.\n\nThis initiative transforms conflict rubble into certified sustainable building materials for urban recovery, creating local jobs while providing eco-friendly construction inputs.";
    }

    // Programs / Projects / Portfolio
    if (msg.includes("program") || msg.includes("project") || msg.includes("portfolio") || msg.includes("initiative")) {
        return "**Flagship Programs**\n\nAIABASD has over +$550M in pipeline projects. Our primary initiatives include:\n\n1. **Rehabilitation in Hama, Syria** (50 Schools & 20 Health Centers)\n2. **Debris Recycling & Circular Recovery** (Industrial rubble processing & eco-bricks in Syria)\n3. **Al‑Arish Hub** (Logistics & Reconstruction serving Gaza)\n4. **Green Energy** (150MW+ Utility-Scale Solar & EPC+F structures)\n5. **Digital Africa** (Telecom & Cyber Infrastructure including broadband & data centers)\n6. **Integrated Cities** (Industrial & Logistics PPP/BOT Zones)\n7. **Food Security** (End-to-end Agro-processing & Cold Chain)\n\nWhich program would you like to know more about?";
    }

    // Al-Arish
    if (msg.includes("arish") || msg.includes("al-arish") || msg.includes("gaza")) {
        return "**Al-Arish Logistics & Reconstruction Hub**\n\nThis is our regional humanitarian logistics hub specifically serving Gaza reconstruction. We provide warehousing (ambient and cold storage), fleet operations, kitting, customs facilitation, and NGO contracting.";
    }

    // Team / Founders / Leadership
    if (msg.includes("team") || msg.includes("founder") || msg.includes("leadership") || msg.includes("who is") || msg.includes("ziad") || msg.includes("faris") || msg.includes("mohammed") || msg.includes("abdel moneim")) {
        return "**Our Leadership Team**\n\nAIABASD's impact is driven by expert visionaries:\n\n• **Dr. Mohammed Abdel Moneim** (Vice President): Distinguished executive leading regional strategic development, sovereign partnerships, and institutional governance.\n• **Faris Safi** (Co-Founder & Partner): Strategic visionary with extensive experience in emerging market infrastructure and international capacity.\n• **Ziad Shneikat** (Co-Founder & Partner): Expert in PPP structuring and project finance with a track record in bankable African/Middle-Eastern programs.\n\nOur leadership guides the successful deployment of capital in target emerging markets.";
    }

    // Countries / Regions / Geography
    if (msg.includes("countr") || msg.includes("where") || msg.includes("region") || msg.includes("africa") || msg.includes("arab")) {
        return "**Where We Operate**\n\nWe actively operate and maintain a pipeline in 9+ target countries, generating thousands of jobs. Our primary geographies include:\n\n• Ghana\n• The Gambia\n• Sierra Leone\n• Burkina Faso\n• Côte d'Ivoire\n• Angola\n• Jordan\n• Egypt\n• Syria\n• Sudan\n• Saudi Arabia\n\nAre you looking to invest or partner in any of these specific regions?";
    }

    // Governance / Compliance
    if (msg.includes("governance") || msg.includes("compliance") || msg.includes("kyc") || msg.includes("amls") || msg.includes("audit")) {
        return "**Governance & Compliance**\n\nOur delivery model embeds independent oversight and rigorous safeguards:\n\n• **ESIA & ESMS**: Strict Environmental & Social impact management.\n• **KYC/AML**: Top-tier counterparty screening against corruption.\n• **Independent Oversight**: Integration of 3rd Party Engineers, Auditors, and RACI mapping.\n• **Contracts**: Clean PPP/BOT/EPC+F templates that protect investors and municipalities.";
    }

    // Partnership / Investor
    if (msg.includes("partner") || msg.includes("invest") || msg.includes("fund") || msg.includes("capital")) {
        return "**Strategic Partnerships & Investment**\n\nAIABASD delivers targeted internal rates of return (IRR: 22–30%) by structuring bankable opportunities.\n\nWe continually seek strategic partners across:\n• Public Sector & Municipalities\n• Development Finance Institutions (DFIs)\n• Investors & Private Capital\n• EPCs and Operating Partners\n\nIf you want to access locked documents or financial analytics, you can navigate to our exclusive **Investor Portal** from the menu to request an access code.";
    }

    // Contact
    if (msg.includes("contact") || msg.includes("email") || msg.includes("reach") || msg.includes("join")) {
        return "**Get in Touch**\n\nTo discuss mandates, funding opportunities, or project operation, you can reach out via the Contact form at the bottom of the page.\n\nPlease provide your Full Name, Work Email, Organization, and a brief message regarding how we can collaborate. We actively monitor these channels and a Partner will respond swiftly.";
    }

    // SDGs
    if (msg.includes("sdg") || msg.includes("sustainable")) {
        return "**Sustainable Development Goals (SDG)**\n\nOur pipeline is entirely climate-positive and SDG-aligned. We focus fiercely on achieving the UN SDGs for 2030 and the AU Agenda 2063 by enabling local jobs, expanding clean utility-scale solar (Green Energy), and ensuring food security through cold-chain logistics.";
    }

    // Arabic greetings
    if (msg.includes("السلام") || msg.includes("أهلا") || msg.includes("مساء")) {
        return "مرحباً بك في التحالف الدولي الإفريقي للأعمال والتنمية المستدامة (AIABASD).\n\nمن خلال هذا المركز، نقوم بتسريع النمو المستدام عبر إفريقيا عن طريق التحالفات وشراكات القطاع العام والخاص.\n\nكيف يمكنني مساعدتك؟ (مثلاً يمكنك سؤالي عن برامجنا، أو مشاريعنا مثل مشروع حماة، أو فريق العمل).";
    }

    // Default response
    return "I'm the AIABASD assistant. I have details about all our website content!\n\nYou can ask me about:\n• Our Flagship Programs (like Hama or Al-Arish)\n• The Leadership Team (Dr. Mohammed Abdel Moneim, Faris, Ziad)\n• Our core Geographies (9+ countries)\n• Or how to access the Investor Portal.\n\nWhat would you like to explore?";
}
