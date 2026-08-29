/** Grounded assistant: Gemini with a compact, owner-approved facts base.
 *  Honest degradation — when GEMINI_API_KEY is unconfigured or the call
 *  fails, the caller falls back to the rule-based chatService. */

const FACTS = `
ORGANIZATION
- AIABASD = African International Alliance for Business & Sustainable Development.
- A multi-country alliance orchestrating bankable PPP/BOT infrastructure programs across Africa and the Arab world. It is an alliance orchestrator — NOT a fund and NOT an EPC contractor.
- Governance: ESIA/ESMS environmental and social framework, KYC/AML counterparty screening, independent engineer and auditor per program, success fees tied to independently verified milestones.
- Pipeline: over USD 550 million across 11 sovereign corridors. Jobs enabled: 10,000+ (owner-approved figures — the only financial figures that may be stated).

PROGRAMS (status is owner-approved; never upgrade a status)
1. Hama Rehabilitation (Syria) — Active. Rehabilitation of 50 schools and 20 health centers (Fida'an for Hama Initiative). Page: /hama-project
2. Debris Recycling & Circular Material Recovery (Syria) — Active. Rubble processing, concrete crushing, eco-brick manufacturing.
3. Al-Arish Logistics & Reconstruction Hub (Egypt) — Active. Humanitarian logistics hub serving Gaza reconstruction: warehousing, cold storage, fleet, customs facilitation.
4. Green Energy — In development. 150MW+ utility-scale solar with EPC+F structures, multi-region.
5. Digital Africa — In development. Telecom and cyber infrastructure, broadband and data centers, multi-region.
6. Integrated Cities — In development. Industrial and logistics PPP/BOT zones, multi-region.
7. Food Security — In development. End-to-end agro-processing and cold chain, multi-region.

CORRIDORS
Ghana, The Gambia, Sierra Leone, Côte d'Ivoire, Burkina Faso (West Africa); Angola (Central); Sudan; Egypt; Jordan; Syria; Saudi Arabia. Explorer: /pipeline

TEAM
- Dr. Mohammed Abdel Moneim — Vice President
- Faris Safi — Co-Founder & Partner
- Ziad Shneikat — Co-Founder & Partner

CONVERSION PATHS
- General/qualified inquiries: contact form on the home page (#contact) — a reference ID is issued; response within two business days.
- Investors: /investor-portal — director-issued access key for the data room; access requests are reviewed by the directorate. No self-serve signup.
- Emails: contact@aiabasd.org (general), gs@aiabasd.org (General Secretariat), fo@aiabasd.org (Field Operations).
- Sites aligned with UN SDG 2030 and AU Agenda 2063.
`;

const SYSTEM_PROMPT = `You are the AIABASD site assistant for the African International Alliance for Business & Sustainable Development.

RULES (binding):
- Answer ONLY from the facts below. If something is not in the facts, say honestly that you cannot answer and point to the contact form or contact@aiabasd.org.
- Never invent news, testimonials, figures, programs, or timelines. Never promise returns, timelines, or outcomes. The only financial figures allowed are the owner-approved ones in the facts.
- Program statuses are fixed: Active means executing; "In development" means phase two; never call a program "coming soon" or claim approvals that are not listed.
- Keep answers under 120 words. Use plain, institutional language. Format with short paragraphs or at most a short list; no markdown headers.
- Reply in the language the visitor wrote in (English, Arabic, or French).
- For partnership, investment, or government inquiries, encourage the contact form or the investor portal (director-issued access).

FACTS:
${FACTS}`;

export function aiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

export async function generateAiResponse(message: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("AI_NOT_CONFIGURED");

  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts: [{ text: message }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 400,
          },
          safetySettings: [],
        }),
      }
    );
    if (!response.ok) throw new Error(`GEMINI_HTTP_${response.status}`);
    const body = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = body.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim();
    if (!text) throw new Error("GEMINI_EMPTY");
    return text;
  } finally {
    clearTimeout(timeout);
  }
}
