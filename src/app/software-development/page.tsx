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
import { FaArrowRight, FaCode } from "react-icons/fa";
import LogoLoop from "@/components/homepage/LogoLoop";
import ProjectPage from "@/components/projectpage/ProjectPage";

export default async function SoftwareDevelopmentPage() {
  // 1. Fetch Global Data (for CTA)
  const globalResponse = await getGlobalData();
  const cta = globalResponse?.data?.cta?.[0];

  // 2. Fetch Data for Hero
  const pageResponse = await getPageBySlug("software-development");
  const pageBlock = pageResponse?.data?.[0]?.blocks?.find(
    (block: any) => block.__component === "blocks.software"
  );
  const herosection = pageBlock?.herosection;

  // 3. Fetch Data for Services Grid
  const servicesResponse = await getPageBySlug("services");
  const serviceBlock = servicesResponse?.data?.[0]?.blocks?.find(
    (block: any) => block.__component === "blocks.service"
  );

  const softwareServiceData = serviceBlock?.services?.find(
    (service: any) => service.href === "/software-development"
  );
  const subServices = softwareServiceData?.subServices || [];

  // 4. Fetch Homepage Data for Brands
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
  const heroTitle = herosection?.title || "Software & Development";
  const heroDesc =
    herosection?.description ||
    "We engineer robust digital products. From complex backend architectures to fluid frontend experiences, we build the future.";
  const heroVideo = herosection?.video?.url
    ? getStrapiMedia(herosection.video.url)
    : "/coding.mp4";

  return (
    <main className="bg-white text-zinc-900 w-full min-h-screen selection:bg-red-600 selection:text-white">
      {/* --- 1. Cinematic Hero Section --- */}
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
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto border-t border-white/20 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/80">
              Engineering Division
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
              <span>Scroll to Explore</span>
              <div className="h-px w-12 bg-white/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. Engineering Services (Architectural Grid) --- */}
      <section className="relative w-full px-6 md:px-12 py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-200 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                {softwareServiceData?.title || "Core Competencies"}
              </h2>
              <p className="text-zinc-500 font-medium">
                Agnostic stack focus on performance, security, and scalability.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full">
              <FaCode className="text-zinc-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Full Stack
              </span>
            </div>
          </div>

          {/* The Grid: 2 Columns for Cinematic Width */}
          {/* UPDATED: items-start to prevent stretching */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 shadow-sm items-start">
            {subServices.map((service: any, index: number) => {
              const imageUrl = getStrapiMedia(service.image?.url);

              return (
                <div
                  key={service.id || index}
                  // UPDATED: h-full flex column
                  className="group relative bg-white h-full flex flex-col justify-between overflow-hidden hover:bg-zinc-50 transition-colors duration-500"
                >
                  {/* Text Wrapper - UPDATED: min-h-[320px] for alignment */}
                  <div className="p-8 md:p-10 relative z-20 flex flex-col bg-white min-h-[320px]">
                    {/* Header: Number & Icon */}
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-xs font-mono text-zinc-300">
                        0{index + 1}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors duration-300">
                        <FaArrowRight className="w-3 h-3 text-zinc-300 -rotate-45 group-hover:rotate-0 group-hover:text-white transition-all duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-3xl font-bold text-zinc-900 mb-4 leading-tight group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-8 opacity-80 group-hover:opacity-100">
                      {service.description}
                    </p>

                    {/* Start Project Button - ADDED */}
                    <div className="mt-auto">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-zinc-200 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-900 transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-lg"
                      >
                        <span>Start Project</span>
                        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Cinematic Image Reveal (Bottom) */}
                  {/* UPDATED: Fixed height h-64 to match marketing page */}
                  <div className="relative w-full h-64 border-t border-zinc-100">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-300 text-sm font-mono">
                        [Image Not Available]
                      </div>
                    )}
                    {/* Subtle noise overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-overlay transition-opacity duration-500"></div>
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

      {/* --- 4. Our Latest Projects (Added Section) --- */}
      <ProjectPage
        projects={projects}
        showHero={false}
        showCta={false}
        heading="Our Latest Projects"
        limit={2}
      />

      <CTASection data={cta} />
    </main>
  );
}
