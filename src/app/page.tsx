import CTASection from "@/components/CTASection";
import CustomerTestimonials from "@/components/homepage/CustomerTestimonials";
import HeroSection from "@/components/homepage/HeroSection";
import IntroSection from "@/components/homepage/IntroSection";
import Loop from "@/components/homepage/Loop";
import OtherServices from "@/components/homepage/OtherServices";
import Services from "@/components/homepage/Services";
import CinematicCarousel from "@/components/film/CinematicCarousel"; // Import the carousel
import { getGlobalData, getHomepageQuery, getProject } from "@/data/loader";
import OurBrandsLogos from "@/components/OurBrandsLogos";

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
    // FIX: Added 'overflow-x-hidden' to the main wrapper to prevent horizontal scrollbars
    // caused by animations or off-screen elements.
    <div className="w-full overflow-x-hidden">
      <HeroSection data={herosection} />
      <IntroSection data={introSection} />
      <OurBrandsLogos data={collaborations} />
      <Services data={services} />
      <CinematicCarousel projects={projects} />
      <OtherServices data={otherServices} readyData={ready} />
      <CustomerTestimonials data={testimonials} />
      <Loop data={collaborations} />
      <CTASection data={cta} />
    </div>
  );
}
