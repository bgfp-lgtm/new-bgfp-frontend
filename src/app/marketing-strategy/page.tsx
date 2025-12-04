import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import {
  getPageBySlug,
  getGlobalData,
  getHomepageQuery,
  getProject,
} from "@/data/loader";
import { getStrapiMedia } from "@/lib/utils";
import { FaArrowRight, FaChartLine } from "react-icons/fa";
import LogoLoop from "@/components/homepage/LogoLoop";
import ProjectPage from "@/components/projectpage/ProjectPage";
import CTASectionTwo from "@/components/CTASectionTwo";

export default async function MarketingStrategyPage() {
  // 1. Fetch Global Data (for CTA)
  const globalResponse = await getGlobalData();
  const cta = globalResponse?.data?.cta?.[0];

  // 2. Fetch Data for Hero
  const pageResponse = await getPageBySlug("marketing-strategy");
  const pageBlock = pageResponse?.data?.[0]?.blocks?.find(
    (block: any) => block.__component === "blocks.marketing"
  );
  const herosection = pageBlock?.herosection;

  // 3. Fetch Data for Services Grid
  const servicesResponse = await getPageBySlug("services");
  const serviceBlock = servicesResponse?.data?.[0]?.blocks?.find(
    (block: any) => block.__component === "blocks.service"
  );

  const marketingServiceData = serviceBlock?.services?.find(
    (service: any) => service.href === "/marketing-strategy"
  );
  const subServices = marketingServiceData?.subServices || [];

  // 4. Fetch Homepage Data for Brands (Collaborations)
  const homepageResponse = await getHomepageQuery();
  const collaborations = homepageResponse?.data?.blocks?.find(
    (block: any) => block.__component === "homepage.collaborations"
  );

  const logos =
    collaborations?.brands?.map((brand: any) => ({
      src: getStrapiMedia(brand.url),
      alt: brand.name,
      title: brand.name,
    })) || [];

  // 5. Fetch Projects Data
  const { data: projects } = await getProject();

  // Fallback values
  const heroTitle = herosection?.title || "Marketing & Strategy";
  const heroDesc =
    herosection?.description ||
    "Comprehensive solutions to maximize reach. We don't just guess; we engineer impact through data and creativity.";
  const heroVideo = herosection?.video?.url
    ? getStrapiMedia(herosection.video.url)
    : "/marketing.mp4";

  return (
    <main className="bg-white text-zinc-900 w-full min-h-screen selection:bg-red-600 selection:text-white">
      {/* --- 1. Cinematic Hero Section (UNCHANGED) --- */}
      <section className="relative h-[90vh] w-full flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90"
          >
            <source src={heroVideo || ""} type="video/mp4" />
          </video>
          {/* Gradient for text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10  w-full max-w-screen-2xl mx-auto border-t border-white/20 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/80">
              Global Strategy
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 text-white max-w-6xl">
            {heroTitle}
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed">
              {heroDesc}
            </p>

            <div className="flex items-center gap-4 text-white/60 text-xs font-mono uppercase tracking-widest">
              <span>Scroll to Analyze</span>
              <div className="h-px w-12 bg-white/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. Strategic Services (FINAL DESIGN) --- */}
      <section className="relative w-full  py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col px-6 md:px-12 md:flex-row justify-between items-end mb-16 border-b border-zinc-200 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                {marketingServiceData?.title || "Strategic Channels"}
              </h2>
              <p className="text-zinc-500 font-medium">
                Bridging the gap between creative vision and market impact.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full">
              <FaChartLine className="text-zinc-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Growth Engine
              </span>
            </div>
          </div>

          {/* The Grid: 2 Columns with Gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-100 p-5 w-full items-stretch">
            {subServices.map((service: any, index: number) => {
              const imageUrl = getStrapiMedia(service.image?.url);

              return (
                <div
                  key={service.id || index}
                  className="group relative bg-white h-full flex flex-col p-8 md:p-10 transition-all duration-500 hover:z-10"
                >
                  {/* 1. TITLE */}
                  <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6 tracking-tight">
                    {service.title}
                  </h3>

                  {/* 2. IMAGE (Aspect Video) */}
                  <div className="relative w-full mb-8 overflow-hidden bg-zinc-50 rounded-lg aspect-video">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-300 text-sm font-mono border border-zinc-100">
                        [Image Not Available]
                      </div>
                    )}
                  </div>

                  {/* 3. DESCRIPTION (Flex Grow) */}
                  <p className="text-zinc-500 text-base leading-relaxed mb-8 flex-grow">
                    {service.description}
                  </p>

                  {/* 4. BUTTON (Full width, rounded-2xl) */}
                  <div className="mt-auto w-full">
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-zinc-200 text-zinc-900 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-lg group-hover:border-zinc-300"
                    >
                      <span>Start Project</span>
                      <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- 3. Our Brands (Collaborative Partners) --- */}
      {logos.length > 0 && (
        <section className="w-full py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-12">
              Our Brand Partners
            </h3>
            <div className="relative h-20 w-full overflow-hidden transition-all duration-500">
              <LogoLoop
                logos={logos}
                speed={40}
                direction="left"
                logoHeight={45}
                gap={80}
                pauseOnHover
              />
            </div>
          </div>
        </section>
      )}

      {/* --- 4. Our Latest Projects --- */}
      <ProjectPage
        projects={projects}
        showHero={false}
        showCta={false}
        heading="Our Latest Projects"
        limit={2}
      />

      <CTASectionTwo />
    </main>
  );
}
