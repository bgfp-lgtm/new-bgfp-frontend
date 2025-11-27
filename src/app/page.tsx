import CTASection from "@/components/CTASection";
import CustomerTestimonials from "@/components/homepage/CustomerTestimonials";
import HeroSection from "@/components/homepage/HeroSection";
import IntroSection from "@/components/homepage/IntroSection";
import Loop from "@/components/homepage/Loop";
import OtherServices from "@/components/homepage/OtherServices";
import Services from "@/components/homepage/Services";
import ProjectPage from "@/components/projectpage/ProjectPage";
import { getGlobalData, getHomepageQuery, getProject } from "@/data/loader";

export default async function Home() {
  const response = await getHomepageQuery();
  // Fetch Project Data
  const { data: projects } = await getProject();

  const herosection = response.data.blocks.find(
    (blocks: any) => blocks.__component === "blocks.hero-section"
  );

  const introSection = response.data.blocks.find(
    (blocks: any) => blocks.__component === "homepage.spectrum"
  );

  const services = response.data.blocks.find(
    (blocks: any) => blocks.__component === "homepage.service"
  );

  const otherServices = response.data.blocks.find(
    (blocks: any) => blocks.__component === "homepage.other-services"
  );

  const ready = response.data.blocks.find(
    (blocks: any) => blocks.__component === "homepage.ready-to-get-started"
  );

  const testimonials = response.data.blocks.find(
    (blocks: any) => blocks.__component === "homepage.testimonials"
  );

  const collaborations = response.data.blocks.find(
    (blocks: any) => blocks.__component === "homepage.collaborations"
  );

  const globalresponse = await getGlobalData();
  const cta = globalresponse?.data?.cta[0];

  return (
    <div>
      <HeroSection data={herosection} />
      <IntroSection data={introSection} />
      <Services data={services} />
      <OtherServices data={otherServices} readyData={ready} />

      {/* Projects Section - Reusing the ProjectPage component with limit */}
      <ProjectPage
        projects={projects}
        showHero={false}
        showCta={false}
        heading="Our Latest Projects"
        limit={2}
      />

      <CustomerTestimonials data={testimonials} />
      <Loop data={collaborations} />
      <CTASection data={cta} />
    </div>
  );
}
