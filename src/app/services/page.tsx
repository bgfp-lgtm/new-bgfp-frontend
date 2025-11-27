import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import { getGlobalData, getPageBySlug, getHomepageQuery } from "@/data/loader";
import LogoLoop from "@/components/homepage/LogoLoop";
import { getStrapiMedia } from "@/lib/utils";

export default async function Services() {
  // 1. Existing Page Data Fetching
  const response = await getPageBySlug("services");
  const serviceBlock = response.data[0]?.blocks?.find(
    (block: any) => block.__component === "blocks.service"
  );
  const herosection = serviceBlock?.herosection;
  const services = serviceBlock?.services || [];

  const globalresponse = await getGlobalData();
  const cta = globalresponse?.data?.cta[0];

  // 2. Fetch Homepage data to get the Partner Brands (Collaborations)
  const homepageResponse = await getHomepageQuery();
  const collaborations = homepageResponse?.data?.blocks?.find(
    (block: any) => block.__component === "homepage.collaborations"
  );

  // 3. Transform data for the LogoLoop component
  const logos =
    collaborations?.brands?.map((brand: any) => ({
      src: getStrapiMedia(brand.url),
      alt: brand.name,
      title: brand.name,
    })) || [];

  return (
    <main className="bg-white min-h-screen text-zinc-900 selection:bg-black selection:text-white">
      {/* --- Redesigned Hero Section (Immersive & Typographic) --- */}
      <section className="relative h-[90vh] w-full flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 border-b border-zinc-200">
        {/* Background Video with refined overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 opacity-90 grayscale-[20%]"
          >
            <source src={herosection?.video?.url} type="video/mp4" />
          </video>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <span className="inline-block px-4 py-2 mb-6 rounded-full border border-zinc-800 bg-white/80 backdrop-blur-md text-xs font-mono uppercase tracking-widest">
            Our Capabilities
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-zinc-900 mb-8 max-w-5xl">
            {herosection.title}
          </h1>

          <div className="flex justify-between items-end border-t border-black/10 pt-8 mt-12">
            <p className="text-zinc-600 max-w-md text-sm md:text-base">
              We craft digital experiences that merge art, technology, and
              strategy to push brands forward.
            </p>
            <div className="hidden md:flex flex-col items-center gap-2 animate-bounce duration-1000">
              <span className="text-[10px] uppercase tracking-widest">
                Scroll
              </span>
              <FaArrowDown className="text-xs" />
            </div>
          </div>
        </div>
      </section>

      {/* --- Redesigned Services Loop (Sticky Layout) --- */}
      <div className="w-full px-6 md:px-12 py-24 bg-white">
        <div className="max-w-7xl mx-auto space-y-32">
          {services.map((service: any, index: number) => (
            <div
              key={index}
              className="group/section grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 pt-12 border-t border-zinc-200 first:border-t-0 first:pt-0"
            >
              {/* Left Column: Sticky Title & Description */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                <span className="text-xs font-mono text-zinc-400 mb-4 block">
                  0{index + 1} / SERVICES
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  {service.title}
                </h2>
                <p className="text-zinc-500 text-lg leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="hidden lg:block">
                  <Link
                    href={service.href || "#"}
                    className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wide hover:gap-6 transition-all duration-300"
                  >
                    View Case Studies <FaArrowRight />
                  </Link>
                </div>
              </div>

              {/* Right Column: Sub-Services Grid */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                  {service.subServices.map(
                    (subService: any, subIndex: number) => (
                      <div key={subIndex} className="group cursor-pointer">
                        {/* Image Container with "Reveal" Effect */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100 mb-6">
                          <Image
                            src={
                              subService.image?.url ||
                              "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963f?q=80&w=1200&auto=format&fit=crop"
                            }
                            alt={subService.name || "Service Image"}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          {/* Corner Arrow Overlay */}
                          <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white rounded-full p-3">
                              <FaArrowRight className="w-4 h-4 -rotate-45" />
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:underline decoration-1 underline-offset-4">
                          {subService.title}
                        </h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                          {subService.description}
                        </p>
                      </div>
                    )
                  )}

                  {/* "Get Quote" Card */}
                  <div className="group relative w-full aspect-[4/3] bg-zinc-900 text-white flex flex-col justify-between p-8 overflow-hidden">
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6">
                        <FaArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                      </div>
                      <h4 className="text-2xl font-bold">Have an idea?</h4>
                      <p className="text-zinc-400 text-sm mt-2">
                        Let's build it together.
                      </p>
                    </div>

                    <div className="relative z-10">
                      <Link
                        href="/contact"
                        className="inline-block border-b border-white pb-1 text-sm uppercase tracking-widest hover:text-zinc-300 transition-colors"
                      >
                        Get a Quote
                      </Link>
                    </div>

                    {/* Hover Effect Background */}
                    <div className="absolute inset-0 bg-zinc-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- NEW SECTION: Logo Loop (Clients) --- */}
      {logos.length > 0 && (
        <section className="w-full py-24 bg-zinc-50 border-t border-zinc-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h3 className="text-sm font-mono uppercase tracking-widest text-center text-zinc-500 mb-12">
              Trusted by Industry Leaders
            </h3>
            <div className="relative h-32 flex items-center overflow-hidden">
              <LogoLoop
                logos={logos}
                speed={50}
                direction="left"
                logoHeight={60}
                gap={80}
                pauseOnHover
                fadeOut
              />
            </div>
          </div>
        </section>
      )}

      <CTASection data={cta} />
    </main>
  );
}
