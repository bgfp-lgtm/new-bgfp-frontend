import type { Metadata } from "next";
import CareersPage from "@/components/careerpage/CareersPage";
import { getGlobalData, getPageBySlug } from "@/data/loader";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const response = await getPageBySlug("careers");
  return buildMetadata({
    seo: response?.data?.[0]?.seo,
    path: "/careers",
    fallbackTitle: "Careers | Birthgiver Film Productions",
    fallbackDescription:
      "Explore creative film careers and production roles at Birthgiver Film Productions.",
  });
}

export default async function Careers() {
  const response = await getPageBySlug("careers");

  const careersBlock = response.data[0]?.blocks?.find(
    (block: any) => block.__component === "blocks.careers"
  );

  const globalresponse = await getGlobalData();
  const cta = globalresponse?.data?.cta[0];
  return (
    <div>
      <CareersPage careersBlock={careersBlock} cta={cta} />
    </div>
  );
}
