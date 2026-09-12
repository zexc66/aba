import { Link } from "wouter";
import { introductionPath } from "@/companies";
import { NETWORK_COPY } from "@/networkCopy";
import { STATUSES, projectLastReviewed, type Project, type Locale3 } from "@/projects";
import { localizedLinkPath } from "@/localePath";
import { networkLink } from "@/components/NetworkLayout";
import { PREPARATION_COPY } from "@/preparation";

export default function ProjectNeeds({ project, locale }: { project: Project; locale: Locale3 }) {
  const t = NETWORK_COPY[locale];
  return <section id="project-needs" className="border-y border-[#0b0b10]/20 py-8">
    <h2 className="text-xl font-semibold">{t.needsTitle}</h2>
    <p className="mt-3 text-sm leading-relaxed text-[#0b0b10]/70">{t.needsNote}</p>
    <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
      <div><dt className="font-semibold">{t.current}</dt><dd className="mt-1">{STATUSES[project.status][locale]}</dd></div>
      <div><dt className="font-semibold">{t.reviewed}</dt><dd className="mt-1"><time dateTime={projectLastReviewed(project)}>{projectLastReviewed(project)}</time></dd></div>
    </dl>
    <ul className="mt-6 divide-y divide-[#0b0b10]/10">
      {project.partnership.map((need, i) => <li key={i} className="py-4">
        <p className="text-base leading-relaxed">{need[locale]}</p>
        <Link asChild href={localizedLinkPath(introductionPath("", project.slug, String(i)), locale)}><a className={networkLink}>{t.express}</a></Link>
      </li>)}
    </ul>
    {project.partnership.length === 0 && <p className="mt-4 text-sm">{t.noNeeds}</p>}
    <Link asChild href={localizedLinkPath("/companies", locale)}><a className={`${networkLink} mt-5`}>{t.directory}</a></Link>
    <div><Link asChild href={localizedLinkPath(`/preparation?project=${project.slug}`, locale)}><a className={networkLink}>{PREPARATION_COPY[locale].title}</a></Link></div>
  </section>;
}
