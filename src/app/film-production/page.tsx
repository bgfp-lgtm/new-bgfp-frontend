import Image from "next/image";
import Link from "next/link";
import {
  getPageBySlug,
  getGlobalData,
  getHomepageQuery,
  getProject,
} from "@/data/loader";
import { getStrapiMedia } from "@/lib/utils";
import { FaFilm } from "react-icons/fa";
import LogoLoop from "@/components/homepage/LogoLoop";
import CTASectionTwo from "@/components/CTASectionTwo";
import CinematicCarousel from "@/components/film/CinematicCarousel";
import ServiceCard from "@/components/film/ServiceCard";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const response = await getPageBySlug("film-production");
  return buildMetadata({
    seo: response?.data?.[0]?.seo,
    path: "/film-production",
    // NOTE: this page's Strapi `seo.metaTitle` is currently empty, so this
    // fallback is what actually ships. Set metaTitle in Strapi to override.
    fallbackTitle:
      "Film Production Services UK | Birthgiver Film Productions",
    fallbackDescription:
      "Full-service film production in the UK — from concept to final cut. Corporate video, commercials and cinematic brand storytelling.",
  });
}

export default async function FilmProductionPage() {
  const globalResponse = await getGlobalData();
  const cta = globalResponse?.data?.cta?.[0];

  const pageResponse = await getPageBySlug("film-production");
  const pageBlock =
    pageResponse?.data?.[0]?.blocks?.find(
      (block: any) => block.__component === "blocks.film"
    ) ||
    pageResponse?.data?.[0]?.blocks?.find(
      (block: any) => block.__component === "blocks.marketing"
    );

  const herosection = pageBlock?.herosection;

  const servicesResponse = await getPageBySlug("services");
  const serviceBlock = servicesResponse?.data?.[0]?.blocks?.find(
    (block: any) => block.__component === "blocks.service"
  );

  const filmServiceData = serviceBlock?.services?.find(
    (service: any) => service.href === "/film-production"
  );
  const subServices = filmServiceData?.subServices || [];

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

  const { data: projects } = await getProject();

  const heroTitle = herosection?.title || "Film Production";
  const heroDesc =
    herosection?.description ||
    "Bringing stories to life with cinematic excellence. We manage every frame from concept to final cut.";
  const heroVideo = herosection?.video?.url
    ? getStrapiMedia(herosection.video.url)
    : "/film.mp4";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: heroTitle,
    description: heroDesc,
    serviceType: "Film Production",
    provider: {
      "@type": "Organization",
      name: "Birthgiver Film Productions",
      url: "https://www.birthgiverfilmproductions.com",
      logo: "https://www.birthgiverfilmproductions.com/logo.png",
    },
    areaServed: "Global",
    url: "https://www.birthgiverfilmproductions.com/film-production",
  };

  return (
    <main className="bg-white text-zinc-900 w-full min-h-screen selection:bg-red-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* 1. HERO SECTION (NO CHANGE) */}
      <section className="relative h-[90vh] w-full flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 overflow-hidden">
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
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        </div>

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

            {/* <div className="flex items-center gap-4 text-white/60 text-xs font-mono uppercase tracking-widest">
              <span>Scroll to View</span>
              <div className="h-px w-12 bg-white/40"></div>
            </div> */}
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      {/* UPDATED: py-32 -> py-10 */}
      <section className="relative w-full py-10 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* UPDATED: mb-20 -> mb-12 */}
          <div className="flex flex-col px-6 md:px-12 lg:flex-row justify-between items-end mb-12 border-b border-zinc-200 pb-10">
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
            <div className="hidden lg:block pb-2">
              <FaFilm className="text-zinc-200 text-6xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-100 p-5 w-full items-stretch">
            {subServices.map((service: any, index: number) => {
              const imageUrl = getStrapiMedia(service.image?.url);

              return (
                <ServiceCard
                  key={service.id || index}
                  service={service}
                  imageUrl={imageUrl}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. NEW CINEMATIC CAROUSEL (NO CHANGE) */}
      <CinematicCarousel projects={projects} />

      {/* 4. BRANDS LOOP */}
      {logos.length > 0 && (
        // UPDATED: py-24 -> py-10
        <section className="w-full py-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-12">
              Brands we&apos;ve filmed for
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

      <CTASectionTwo />
    </main>
  );
}
