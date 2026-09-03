import { generateChatResponse } from "../server/services/chatService";

const prompts = [
  ["completion date", "What is the completion date?"],
  ["active Green Energy", "Is Green Energy active?"],
  ["Kenya", "Do you operate in Kenya?"],
  ["water treatment", "Do you have a water treatment project?"],
  ["returns", "What returns should an investor expect?"],
  ["guaranteed", "Is the outcome guaranteed?"],
  ["certified", "Are the materials certified?"],
  ["9+ countries", "Do you operate in 9+ countries?"],
  ["kitting", "Do you provide kitting?"],
] as const;

const bannedPhrases = [
  /completion\s+date/i,
  /active\s+green\s+energy/i,
  /\bkenya\b/i,
  /water\s+treatment/i,
  /\breturns?\b/i,
  /\bguarante(?:e|ed|es|ing)\b/i,
  /\bcertif(?:ied|ication|y|ies)\b/i,
  /9\+\s+countries/i,
  /\bkitting\b/i,
];

const results = prompts.map(([label, message]) => {
  const response = generateChatResponse(message, "en");
  const violations = bannedPhrases
    .filter((pattern) => pattern.test(response))
    .map((pattern) => pattern.source);

  return { label, pass: violations.length === 0, violations, response };
});

const emptyResponse = generateChatResponse("", "en");
const arabicResponse = generateChatResponse("unknown question", "ar");
const frenchResponse = generateChatResponse("unknown question", "fr");
const noInternalDisclosure = [emptyResponse, arabicResponse, frenchResponse].every(
  (response) => !/system prompt|facts base|gemini_api_key|internal instructions/i.test(response)
);

const report = {
  allPassed: results.every((result) => result.pass) &&
    Boolean(emptyResponse && arabicResponse && frenchResponse) &&
    noInternalDisclosure,
  results,
  localeFallbacks: {
    ar: Boolean(arabicResponse),
    fr: Boolean(frenchResponse),
  },
  emptyPromptSafe: Boolean(emptyResponse),
  noInternalDisclosure,
};

console.log(JSON.stringify(report, null, 2));

if (!report.allPassed) process.exit(1);
