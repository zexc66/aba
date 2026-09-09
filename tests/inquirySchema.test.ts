import test, { describe } from "node:test";
import assert from "node:assert/strict";
import {
  inquirySchema,
  projectSubmissionSchema,
} from "../server/inquirySchema.ts";

describe("inquirySchema", () => {
  test("valid minimal inquiry (email + consent) parses, type defaults to GENERAL", () => {
    const payload = {
      email: "partner@example.com",
      consent: true,
    };
    const result = inquirySchema.safeParse(payload);
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data.type, "GENERAL");
      assert.equal(result.data.email, "partner@example.com");
      assert.equal(result.data.consent, true);
    }
  });

  test("invalid email rejected", () => {
    const invalidEmails = [
      "not-an-email",
      "user@",
      "@domain.com",
      "user space@domain.com",
      "",
    ];

    for (const email of invalidEmails) {
      const result = inquirySchema.safeParse({ email, consent: true });
      assert.equal(
        result.success,
        false,
        `Expected invalid email to fail: ${email}`
      );
    }

    const missingEmail = inquirySchema.safeParse({ consent: true });
    assert.equal(missingEmail.success, false, "Expected missing email to fail");
  });

  test("consent anything but literal true rejected", () => {
    const invalidConsents = [false, "true", 1, 0, null, undefined, {}, []];

    for (const consent of invalidConsents) {
      const result = inquirySchema.safeParse({
        email: "test@example.com",
        consent,
      });
      assert.equal(
        result.success,
        false,
        `Expected consent ${JSON.stringify(consent)} to fail`
      );
    }

    const missingConsent = inquirySchema.safeParse({
      email: "test@example.com",
    });
    assert.equal(
      missingConsent.success,
      false,
      "Expected missing consent to fail"
    );
  });

  test("label fields reject <, >, {, }, ;, $, backtick, backslash and >60 chars", () => {
    const forbiddenChars = ["<", ">", "{", "}", ";", "$", "`", "\\"];
    const labelFields = [
      "sector",
      "region",
      "ticket",
      "timeline",
      "partyType",
      "targetService",
      "role",
      "capitalBand",
    ] as const;

    for (const field of labelFields) {
      for (const char of forbiddenChars) {
        const payload = {
          email: "test@example.com",
          consent: true,
          [field]: `valid${char}test`,
        };
        const result = inquirySchema.safeParse(payload);
        assert.equal(
          result.success,
          false,
          `Expected field "${field}" containing forbidden char "${char}" to fail`
        );
      }

      // >60 characters rejected
      const over60 = "a".repeat(61);
      const payloadOver = {
        email: "test@example.com",
        consent: true,
        [field]: over60,
      };
      const resultOver = inquirySchema.safeParse(payloadOver);
      assert.equal(
        resultOver.success,
        false,
        `Expected field "${field}" with length >60 to fail`
      );

      // exactly 60 characters accepted
      const exactly60 = "a".repeat(60);
      const payload60 = {
        email: "test@example.com",
        consent: true,
        [field]: exactly60,
      };
      const result60 = inquirySchema.safeParse(payload60);
      assert.equal(
        result60.success,
        true,
        `Expected field "${field}" with length 60 to succeed`
      );
    }
  });

  test("message >4000 chars rejected", () => {
    const over4000 = "m".repeat(4001);
    const resultOver = inquirySchema.safeParse({
      email: "test@example.com",
      consent: true,
      message: over4000,
    });
    assert.equal(
      resultOver.success,
      false,
      "Expected message >4000 chars to fail"
    );

    const exactly4000 = "m".repeat(4000);
    const result4000 = inquirySchema.safeParse({
      email: "test@example.com",
      consent: true,
      message: exactly4000,
    });
    assert.equal(
      result4000.success,
      true,
      "Expected message of 4000 chars to succeed"
    );
  });
});

describe("projectSubmissionSchema", () => {
  const validPayload = {
    type: "PROJECT_SUBMISSION" as const,
    email: "partner@example.com",
    consent: true,
    organization: "Acme Infrastructure",
    partyType: "government" as const,
    sector: "Renewable Energy",
    region: "North Africa",
    targetProject: "Solar Facility 200MW",
    targetService: "EPC+F",
    interest: "Structured public-private partnership",
    timeline: "12-24 months",
    message: "Proposal for comprehensive solar grid development.",
  };

  test("full valid payload parses", () => {
    const result = projectSubmissionSchema.safeParse(validPayload);
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data.type, "PROJECT_SUBMISSION");
      assert.equal(result.data.organization, "Acme Infrastructure");
      assert.equal(result.data.partyType, "government");
      assert.equal(result.data.sector, "Renewable Energy");
      assert.equal(result.data.region, "North Africa");
      assert.equal(result.data.targetProject, "Solar Facility 200MW");
      assert.equal(result.data.targetService, "EPC+F");
      assert.equal(
        result.data.interest,
        "Structured public-private partnership"
      );
      assert.equal(result.data.timeline, "12-24 months");
      assert.equal(
        result.data.message,
        "Proposal for comprehensive solar grid development."
      );
      assert.equal(result.data.email, "partner@example.com");
      assert.equal(result.data.consent, true);
    }
  });

  test("missing any required field rejected", () => {
    const requiredFields = [
      "organization",
      "sector",
      "region",
      "targetProject",
      "targetService",
      "interest",
      "timeline",
      "message",
    ] as const;

    for (const field of requiredFields) {
      const copy = { ...validPayload };
      delete (copy as Record<string, unknown>)[field];
      const result = projectSubmissionSchema.safeParse(copy);
      assert.equal(
        result.success,
        false,
        `Expected missing "${field}" to fail`
      );

      // empty string should also be rejected due to min(1)
      const emptyCopy = { ...validPayload, [field]: "" };
      const emptyResult = projectSubmissionSchema.safeParse(emptyCopy);
      assert.equal(
        emptyResult.success,
        false,
        `Expected empty string for "${field}" to fail`
      );
    }
  });

  test("invalid partyType enum value rejected", () => {
    const validParties = [
      "government",
      "investor",
      "operator",
      "epc",
      "ngo",
      "technology",
    ] as const;
    for (const pt of validParties) {
      const result = projectSubmissionSchema.safeParse({
        ...validPayload,
        partyType: pt,
      });
      assert.equal(
        result.success,
        true,
        `Expected valid partyType "${pt}" to succeed`
      );
    }

    const invalidParties = ["individual", "corporation", "bank", "other", ""];
    for (const pt of invalidParties) {
      const result = projectSubmissionSchema.safeParse({
        ...validPayload,
        partyType: pt,
      });
      assert.equal(
        result.success,
        false,
        `Expected invalid partyType "${pt}" to fail`
      );
    }
  });

  test("label fields reject <, >, {, }, ;, $, backtick, backslash", () => {
    const forbiddenChars = ["<", ">", "{", "}", ";", "$", "`", "\\"];
    const labelFields = [
      "sector",
      "region",
      "targetService",
      "timeline",
    ] as const;

    for (const field of labelFields) {
      for (const char of forbiddenChars) {
        const result = projectSubmissionSchema.safeParse({
          ...validPayload,
          [field]: `valid${char}test`,
        });
        assert.equal(
          result.success,
          false,
          `Expected field "${field}" containing forbidden char "${char}" to fail`
        );
      }
    }
  });

  test("wrong type literal rejected", () => {
    const wrongTypes = ["GENERAL", "PROJECT", "SUBMISSION", "", "OTHER"];
    for (const wrongType of wrongTypes) {
      const result = projectSubmissionSchema.safeParse({
        ...validPayload,
        type: wrongType,
      });
      assert.equal(
        result.success,
        false,
        `Expected wrong type "${wrongType}" to fail`
      );
    }
  });
});
