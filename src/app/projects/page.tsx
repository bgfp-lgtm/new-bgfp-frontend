import type { Metadata } from "next";
import ProjectPage from "@/components/projectpage/ProjectPage";
import { getGlobalData, getPageBySlug, getProject } from "@/data/loader";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const response = await getPageBySlug("projects");
  return buildMetadata({
    seo: response?.data?.[0]?.seo,
    path: "/projects",
    fallbackTitle: "Projects | Birthgiver Film Productions",
    fallbackDescription:
      "Explore our film production portfolio — cinematic video projects delivered for brands across the UK.",
  });
}

export default async function Projects() {
  const globalresponse = await getGlobalData();
  const cta = globalresponse?.data?.cta[0];

  const { data } = await getProject();
  return (
    <div>
      {" "}
      <ProjectPage cta={cta} projects={data} />
    </div>
  );
}
