import { useMemo, useState } from "react";
import { Link } from "wouter";
import NetworkLayout, { networkField, networkLink } from "@/components/NetworkLayout";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { GLOSSARY, GLOSSARY_COPY } from "@/glossary";
import { localizedLinkPath } from "@/localePath";

export default function Glossary() {
  const { lang } = useLanguageContext();
  const t = GLOSSARY_COPY[lang];
  const [query, setQuery] = useState("");
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);

  const matches = useMemo(() => {
    const sorted = [...GLOSSARY].sort((a, b) => a.term[lang].localeCompare(b.term[lang], lang));
    if (words.length === 0) return sorted;
    return sorted.filter((item) => {
      const haystack = `${item.term[lang]} ${item.def[lang]}`.toLocaleLowerCase();
      return words.every((w) => haystack.includes(w));
    });
  }, [query, lang]);

  return (
    <NetworkLayout title={t.title} description={t.intro} path="/glossary">
      <label className="mb-8 block max-w-xl space-y-2 text-sm font-medium">
        {t.search}
        <input type="search" className={networkField} value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>

      <p role="status" className="mb-6 text-sm text-[#0b0b10]/70">
        {matches.length} {t.count}
      </p>

      <dl className="divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
        {matches.map((item) => (
          <div key={item.id} className="grid grid-cols-1 gap-3 py-6 md:grid-cols-[20rem_1fr] md:gap-8">
            <dt className="min-w-0">
              <h2 className="break-words text-base font-semibold text-[#0b0b10]">{item.term[lang]}</h2>
            </dt>
            <dd className="min-w-0 max-w-[75ch] text-sm leading-relaxed text-[#0b0b10]/75">{item.def[lang]}</dd>
          </div>
        ))}
      </dl>

      {matches.length === 0 && <p className="py-10 text-base">{t.noResults}</p>}

      <p className="mt-8 max-w-[75ch] text-sm leading-relaxed text-[#0b0b10]/70">{t.notice}</p>

      <h2 className="mt-12 text-xl font-semibold">{t.sources}</h2>
      <p className="mt-2 text-sm text-[#0b0b10]/70">{t.sourcesIntro}</p>
      <ul className="mt-4 space-y-2">
        <li><Link asChild href={localizedLinkPath("/governments", lang)}><a className={networkLink}>For Governments</a></Link></li>
        <li><Link asChild href={localizedLinkPath("/knowledge", lang)}><a className={networkLink}>Knowledge</a></Link></li>
        <li><Link asChild href={localizedLinkPath("/preparation", lang)}><a className={networkLink}>Preparation</a></Link></li>
      </ul>
    </NetworkLayout>
  );
}
