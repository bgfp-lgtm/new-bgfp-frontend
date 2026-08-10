import { getGlobalData, getPageBySlug } from "@/data/loader";
import AboutUs from "@/components/aboutpage/AboutUs";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const response = await getPageBySlug("about");
  return buildMetadata({
    seo: response?.data?.[0]?.seo,
    path: "/about-us",
    fallbackTitle: "About Us | Birthgiver Film Productions",
    fallbackDescription:
      "Meet the team behind Birthgiver Film Productions — a creative film production studio delivering cinematic video, marketing and software work.",
  });
}

type Props = {};

export default async function About() {
  const response = await getPageBySlug("about");

  const aboutBlock = response.data[0]?.blocks?.find(
    (block: any) => block.__component === "blocks.about-us"
  );

  console.log("response data in about us page:", response);

  const globalresponse = await getGlobalData();
  const cta = globalresponse?.data?.cta[0];

  const herosectionData = aboutBlock?.herosection;
  const mission = aboutBlock?.mission;
  const vision = aboutBlock?.vision;
  const ourStory = aboutBlock?.ourStory;
  const highlights = aboutBlock?.highlights;
  const features = aboutBlock?.features;
  const members = aboutBlock?.members;

  return (
    <div>
      <AboutUs
        herosectionData={herosectionData}
        mission={mission}
        vision={vision}
        ourStory={ourStory}
        highlights={highlights}
        features={features}
        members={members}
        cta={cta}
      />
    </div>
  );
}
