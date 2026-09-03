/** Deferred Gemini assistant with a compact, owner-approved facts base.
 *  Public chat routes intentionally do not call this module. Keep it unused
 *  until the model returns structured fact IDs and citations that can be
 *  validated before any model text is exposed. */

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

const APPROVED_NUMBERS = new Set(["2", "11", "20", "50", "150", "550", "10000", "2030", "2063"]);

const FACT_ANCHOR_PATTERNS = [
  /\bAIABASD\b|African International Alliance|alliance/i,
  /Hama|Fida['’]an|Al[- ]Arish|debris|rubble|eco[- ]brick|Green Energy|Digital Africa|Integrated Cities|Food Security/i,
  /ESIA|ESMS|KYC|AML|PPP|BOT|EPC\+F|independent (?:engineer|auditor|oversight)/i,
  /Africa|Arab world|Ghana|Gambia|Sierra Leone|Burkina Faso|Côte d['’]Ivoire|Angola|Sudan|Egypt|Jordan|Syria|Saudi Arabia|Gaza/i,
  /Investor Portal|access key|contact form|contact@aiabasd\.org|gs@aiabasd\.org|fo@aiabasd\.org/i,
  /\b(?:550|10,?000|50|20|150|11|2030|2063)\b/i,
];

const APPROVED_LOCATION_TERMS = new Set([
  "africa", "arab world", "ghana", "the gambia", "gambia", "sierra leone", "burkina faso",
  "côte d'ivoire", "côte d’ivoire", "angola", "sudan", "egypt", "jordan", "syria",
  "saudi arabia", "gaza", "hama", "al-arish", "middle east", "west africa", "central africa",
]);

const UNSAFE_RESPONSE_PATTERNS = [
  /ignore\s+(?:all|any|the\s+previous|previous)\s+instructions?/i,
  /(?:system|developer|internal)\s+(?:prompt|message|instructions?)/i,
  /reveal\s+(?:the\s+)?(?:prompt|instructions?|hidden)/i,
  /\b(?:jailbreak|you\s+are\s+now)\b/i,
  /<script\b|javascript:/i,
  /\b(?:expected|projected|targeted|guarantee(?:d|s)?|risk[- ]free|no\s+risk|assured|profit|yield|roi|return(?:s)?|interest\s+rate|financial\s+return|revenue|valuation|approved|approval|certified|certification|licensed|authorized|signed|contract(?:s|ed|ual)?|promis(?:e|ed|es|ing)|climate[- ]positive|world[- ]class|best[- ]in[- ]class|market[- ]leading)\b/i,
  /\b(?:offices?|branches?|locations?|employees?|staff|facilities|countries)\b/i,
];

function hasOnlyApprovedNumbers(text: string): boolean {
  const factualText = text.replace(/^\s*\d+[.)]\s+/gm, "");
  const numberPattern = /(?<![A-Za-z])\d[\d,]*(?:\.\d+)?(?:[A-Za-z]+)?%?\+?/g;
  let match: RegExpExecArray | null;
  while ((match = numberPattern.exec(factualText)) !== null) {
    const token = match[0];
    const number = token.match(/^\d[\d,]*(?:\.\d+)?/)?.[0].replace(/,/g, "");
    if (number === undefined || !APPROVED_NUMBERS.has(number)) return false;

    // Allow an approved number only in the fact context in which it is
    // approved. This blocks otherwise-valid tokens being repurposed for new
    // project, office, location, or financial claims.
    const context = factualText.slice(Math.max(0, match.index - 60), match.index + token.length + 60).toLowerCase();
    const validContext = approvedNumberContext(number, context);
    if (!validContext) return false;
  }
  return true;
}

function approvedNumberContext(number: string, context: string): boolean {
  switch (number) {
    case "2": return /business days?/.test(context);
    case "11": return /corridors?/.test(context);
    case "20": return /health centers?/.test(context);
    case "50": return /schools?/.test(context);
    case "150": return /\bmw\b|solar/.test(context);
    case "550": return /usd|million|pipeline|capital/.test(context);
    case "10000": return /jobs?/.test(context);
    case "2030": return /sdg|sustainable development|un/.test(context);
    case "2063": return /agenda|au\b/.test(context);
    default: return false;
  }
}

function hasApprovedLocationTerms(text: string): boolean {
  const locationPattern = /\b(?:in|across|from|to|near|within|serving)\s+([A-ZÀ-ÖØ-Þ][A-Za-zÀ-ÖØ-öø-ÿ'-]*(?:\s+[A-ZÀ-ÖØ-Þ][A-Za-zÀ-ÖØ-öø-ÿ'-]*){0,2})/g;
  let match: RegExpExecArray | null;
  while ((match = locationPattern.exec(text)) !== null) {
    const candidate = match[1].toLowerCase().replace(/[.,;:!?]+$/, "").trim();
    if (["ppp", "bot", "epc", "esia", "esms"].includes(candidate)) continue;
    if (!APPROVED_LOCATION_TERMS.has(candidate)) return false;
  }
  return true;
}

function hasApprovedEmploymentClaims(text: string): boolean {
  if (!/\bjobs?\b/i.test(text)) return true;
  return /\b10,?000\+?\s+jobs?\b/i.test(text);
}

/** Gate model output before it can be labelled as grounded. */
export function sanitizeGroundedResponse(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const text = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  if (!text || text.length > 2000 || text.split(/\s+/).length > 120) return null;
  if (UNSAFE_RESPONSE_PATTERNS.some((pattern) => pattern.test(text))) return null;
  if (!hasOnlyApprovedNumbers(text) || !hasApprovedLocationTerms(text) || !hasApprovedEmploymentClaims(text)) return null;
  if (!FACT_ANCHOR_PATTERNS.some((pattern) => pattern.test(text))) return null;
  return text;
}

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
