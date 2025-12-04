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
import { FaArrowRight, FaFilm } from "react-icons/fa";
import LogoLoop from "@/components/homepage/LogoLoop";
import ProjectPage from "@/components/projectpage/ProjectPage";

export default async function FilmProductionPage() {
  // 1. Fetch Global Data (for CTA)
  const globalResponse = await getGlobalData();
  const cta = globalResponse?.data?.cta?.[0];

  // 2. Fetch Data for Hero
  const pageResponse = await getPageBySlug("film-production");
  const pageBlock =
    pageResponse?.data?.[0]?.blocks?.find(
      (block: any) => block.__component === "blocks.film"
    ) ||
    pageResponse?.data?.[0]?.blocks?.find(
      (block: any) => block.__component === "blocks.marketing"
    );

  const herosection = pageBlock?.herosection;

  // 3. Fetch Data for Services Grid
  const servicesResponse = await getPageBySlug("services");
  const serviceBlock = servicesResponse?.data?.[0]?.blocks?.find(
    (block: any) => block.__component === "blocks.service"
  );

  const filmServiceData = serviceBlock?.services?.find(
    (service: any) => service.href === "/film-production"
  );
  const subServices = filmServiceData?.subServices || [];

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
  const heroTitle = herosection?.title || "Film Production";
  const heroDesc =
    herosection?.description ||
    "Bringing stories to life with cinematic excellence. We manage every frame from concept to final cut.";
  const heroVideo = herosection?.video?.url
    ? getStrapiMedia(herosection.video.url)
    : "/film.mp4";

  return (
    <main className="bg-white text-zinc-900 w-full min-h-screen selection:bg-red-600 selection:text-white">
      {/* =========================================
          1. CINEMATIC HERO SECTION
      ========================================= */}
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
              Production House
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
              <span>Scroll to View</span>
              <div className="h-px w-12 bg-white/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          2. PRODUCTION SERVICES (FIXED LAYOUT)
      ========================================= */}
      <section className="relative w-full px-6 md:px-12 py-32 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 border-b border-zinc-200 pb-10">
            <div className="max-w-5xl">
              <span className="text-red-600 font-mono text-xs font-bold uppercase tracking-widest mb-4 block">
                What We Do
              </span>
              <h2 className="text-5xl md:text-5xl w-full font-bold tracking-tighter text-zinc-900 mb-6">
                {filmServiceData?.title || "Production Services"}
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl leading-relaxed">
                From pre-production logistics to post-production polish, we
                provide end-to-end solutions for commercials, documentaries, and
                feature films.
              </p>
            </div>

            {/* Decorative Icon */}
            <div className="hidden lg:block pb-2">
              <FaFilm className="text-zinc-200 text-6xl" />
            </div>
          </div>

          {/* The Grid */}
          {/* FIX: Used 'items-start' to allow cards to be natural height, preventing awkward stretching/whitespace */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 shadow-sm items-start">
            {subServices.map((service: any, index: number) => {
              const imageUrl = getStrapiMedia(service.image?.url);

              return (
                <div
                  key={service.id || index}
                  className="group relative bg-white h-full flex flex-col overflow-hidden hover:z-10 transition-all duration-500"
                >
                  {/* Text Content */}
                  {/* FIX: Added min-h-[320px] to force text sections to be roughly equal, aligning the image tops */}
                  <div className="p-8 md:p-10 relative z-20 flex flex-col items-start bg-white min-h-[320px]">
                    <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
                      {service.title}
                    </h3>

                    <p className="text-zinc-500 text-base leading-relaxed mb-8 max-w-md">
                      {service.description}
                    </p>

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

                  {/* Image Area - FULL WIDTH & NATURAL HEIGHT */}
                  <div className="relative w-full border-t border-zinc-100">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={service.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        // FIX: w-full h-auto ensures NO CROP and FULL WIDTH.
                        className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-64 bg-zinc-50 flex items-center justify-center text-zinc-300 text-sm font-mono">
                        IMAGE NOT FOUND
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================
          3. OUR BRANDS
      ========================================= */}
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

      {/* =========================================
          4. LATEST PROJECTS
      ========================================= */}
      <div className="pt-20">
        <ProjectPage
          projects={projects}
          showHero={false}
          showCta={false}
          heading="Featured Works"
          limit={2}
        />
      </div>

      <CTASection data={cta} />
    </main>
  );
}
