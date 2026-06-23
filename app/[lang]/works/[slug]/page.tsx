import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects, getAltGaleriFiles } from "@/lib/projects";
import { Link } from "@/i18n/navigation";
import CaseStudyContent from "./CaseStudyContent";

export async function generateStaticParams() {
  const projects = getAllProjects();
  const langs = ["en", "tr"];
  return langs.flatMap((lang) =>
    projects.map((p) => ({ lang, slug: p.slug }))
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  setRequestLocale(lang);

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const locale = lang as "en" | "tr";
  const altGaleriFiles = getAltGaleriFiles(slug);

  return <CaseStudyContent project={project} locale={locale} altGaleriFiles={altGaleriFiles} />;
}
