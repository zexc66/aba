import * as React from "react";

// The static copy is authored with classic JSX; provide its runtime only for
// this Node smoke check (Vite supplies it in the browser build).
(globalThis as unknown as Record<string, unknown>).React = React;

(async () => {
  const { COPY } = await import("../client/src/data");
  const { mergeCmsContent } = await import("../client/src/services/cms");

  const defaultPrograms = COPY.en.programs.list;
  const incompleteRemote = {
    metaTitle: "Localized CMS title",
    hero: { title: "Localized CMS hero" },
    programs: {
      list: [],
    },
  };

  const merged = mergeCmsContent("en", incompleteRemote);
  const partialRemote = mergeCmsContent("en", {
    programs: { list: [{ name: "Localized Hama name" }] },
  });
  const report = {
    preservedDefaultProgramCount: merged.programs.list.length === defaultPrograms.length,
    preservedDefaultProgramSlugs: merged.programs.list.map((program) => program.slug).join(",") ===
      defaultPrograms.map((program) => program.slug).join(","),
    preservedValidRemoteTitle: merged.metaTitle === "Localized CMS title",
    preservedDefaultHeroSubtitle: merged.hero.subtitle === COPY.en.hero.subtitle,
    preservedPartialProgramName: partialRemote.programs.list[0]?.name === "Localized Hama name",
    preservedPartialProgramDefaults: partialRemote.programs.list[0]?.desc === defaultPrograms[0]?.desc &&
      partialRemote.programs.list[0]?.detail.overview === defaultPrograms[0]?.detail.overview,
  };

  console.log(JSON.stringify(report));

  if (Object.values(report).some((value) => !value)) process.exit(1);
})();
