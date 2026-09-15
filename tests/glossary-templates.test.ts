import { test } from "node:test";
import assert from "node:assert/strict";
import { GLOSSARY, GLOSSARY_COPY } from "../client/src/glossary";
import { TEMPLATES, TEMPLATES_COPY } from "../client/src/templates";

const LOCALES = ["en", "ar", "fr"] as const;

test("glossary carries 40 unique terms, fully localized and non-empty", () => {
  assert.equal(GLOSSARY.length, 40);
  assert.equal(new Set(GLOSSARY.map((item) => item.id)).size, 40);
  for (const locale of LOCALES) {
    for (const item of GLOSSARY) {
      assert.ok(item.term[locale].trim().length > 1, `${item.id} term ${locale}`);
      assert.ok(item.def[locale].trim().length > 20, `${item.id} def ${locale}`);
    }
  }
});

test("glossary page chrome is localized in all three locales", () => {
  for (const locale of LOCALES) {
    const copy = GLOSSARY_COPY[locale];
    assert.ok(copy.title.length > 5);
    assert.ok(copy.noResults.length > 3);
    assert.ok(copy.notice.length > 20);
  }
  assert.notEqual(GLOSSARY_COPY.en.title, GLOSSARY_COPY.ar.title);
});

test("templates build localized markdown with honesty footer and placeholders", () => {
  assert.equal(TEMPLATES.length, 2);
  assert.equal(new Set(TEMPLATES.map((tpl) => tpl.id)).size, 2);
  const cautions: Record<string, string> = {
    en: "Not legal advice",
    ar: "ليس استشارة قانونية",
    fr: "Sans valeur de conseil juridique",
  };
  for (const locale of LOCALES) {
    for (const template of TEMPLATES) {
      const doc = template.build(locale);
      assert.ok(doc.length > 300, `${template.id} ${locale} too short`);
      assert.ok(doc.includes(cautions[locale]), `${template.id} ${locale} honesty footer`);
      assert.ok(/\[\.\.\.\]|\[Organization|\[YYYY-MM-DD/.test(doc), `${template.id} ${locale} placeholders`);
    }
  }
});
