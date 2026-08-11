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
import { FaCode } from "react-icons/fa";
import LogoLoop from "@/components/homepage/LogoLoop";
import CTASectionTwo from "@/components/CTASectionTwo";
import CinematicCarousel from "@/components/film/CinematicCarousel";
import ServiceCard from "@/components/film/ServiceCard";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  // NOTE: no `software-development` entry exists in Strapi yet, so `seo` is
  // undefined and the fallbacks below ship. Adding the entry picks it up.
  const response = await getPageBySlug("software-development");
  return buildMetadata({
    seo: response?.data?.[0]?.seo,
    path: "/software-development",
    fallbackTitle:
      "Software & Website Development UK | Birthgiver Film Productions",
    fallbackDescription:
      "Custom software and website development — from marketing sites to bespoke web applications, built and shipped by Birthgiver.",
  });
}

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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: heroTitle,
    description: heroDesc,
    serviceType: "Software Development",
    provider: {
      "@type": "Organization",
      name: "Birthgiver Film Productions",
      url: "https://www.birthgiverfilmproductions.com",
      logo: "https://www.birthgiverfilmproductions.com/logo.png",
    },
    areaServed: "Global",
    url: "https://www.birthgiverfilmproductions.com/software-development",
  };

  return (
    <main className="bg-white text-zinc-900 w-full min-h-screen selection:bg-red-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
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

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 text-white max-w-6xl">
            {heroTitle}
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed">
              {heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* --- 2. Engineering Services --- */}
      {/* UPDATED: py-24 -> py-10 to match Film Page */}
      <section className="relative w-full py-10 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* Section Header */}
          {/* UPDATED: mb-16 -> mb-12 and pb-8 -> pb-10 */}
          <div className="flex flex-col px-6 md:flex-row justify-between items-end mb-12 border-b border-zinc-200 pb-10">
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

          {/* The Grid: 2 Columns with Gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-100 p-5 w-full items-stretch">
            {subServices.map((service: any, index: number) => {
              const imageUrl = getStrapiMedia(service.image?.url);

              // 2. USE THE POPUP COMPONENT HERE
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

      {/* --- 4. Our Latest Projects --- */}
      <CinematicCarousel projects={projects} />

      {/* --- 3. Our Brands (Collaborative Partners) --- */}
      {logos.length > 0 && (
        // UPDATED: py-24 -> py-10 to match Film Page
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
