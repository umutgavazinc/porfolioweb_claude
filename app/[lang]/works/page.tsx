import { setRequestLocale } from "next-intl/server";
import { getAllProjects } from "@/lib/projects";
import WorksClient from "./WorksClient";

export default async function WorksPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);

  const projects = getAllProjects();

  return <WorksClient projects={projects} lang={lang} />;
}
