import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import { getGlobalData, getPageBySlug, getHomepageQuery } from "@/data/loader";
import LogoLoop from "@/components/homepage/LogoLoop";
import { getStrapiMedia } from "@/lib/utils";
import NewsletterSection from "@/components/NewsletterSection";
// 1. Import the Newsletter Component

export default async function Services() {
  // --- Data Fetching ---
  const response = await getPageBySlug("services");
  const serviceBlock = response.data[0]?.blocks?.find(
    (block: any) => block.__component === "blocks.service"
  );
  const herosection = serviceBlock?.herosection;
  const services = serviceBlock?.services || [];

  const globalresponse = await getGlobalData();
  const cta = globalresponse?.data?.cta[0];

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

  return (
    <main className="bg-white min-h-screen text-zinc-900 selection:bg-black selection:text-white">
      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-[90vh] w-full flex flex-col justify-end pb-12 px-6 md:px-12 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70"
          >
            <source src={herosection?.video?.url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto text-white">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]">
            {herosection.title}
          </h1>
          <div className="flex justify-between items-end border-t border-white/20 pt-8 mt-8">
            <p className="max-w-md text-lg text-zinc-300 font-light">
              We craft digital experiences that merge art, technology, and
              strategy.
            </p>
            <div className="hidden md:flex flex-col items-center animate-bounce">
              <span className="text-[10px] uppercase tracking-widest mb-2">
                Scroll
              </span>
              <FaArrowDown />
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. THE NEW LAYOUT: Editorial / Zig-Zag --- */}
      <div className="w-full bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-32">
          {services.map((service: any, index: number) => (
            <div key={index} className="mb-48 last:mb-0">
              {/* Category Header */}
              <div className="text-center max-w-5xl mx-auto mb-24">
                <span className="inline-block py-1 px-3 border border-zinc-200 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
                  0{index + 1} — {service.title}
                </span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6">
                  {service.title} Solutions
                </h2>
                <p className="text-xl text-zinc-500 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Sub-Services: Alternating Rows */}
              <div className="flex flex-col gap-32">
                {service.subServices.map(
                  (subService: any, subIndex: number) => {
                    // Logic to alternate layout: Even = Image Left, Odd = Image Right
                    const isEven = subIndex % 2 === 0;

                    return (
                      <div
                        key={subIndex}
                        className={`group flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
                          !isEven ? "lg:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Image Side (Half Width) */}
                        <div className="w-full lg:w-1/2">
                          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-100">
                            <Image
                              src={
                                subService.image?.url ||
                                "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
                              }
                              alt={subService.title}
                              fill
                              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            />
                            {/* Reveal Effect overlay */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                          </div>
                        </div>

                        {/* Text Side (Half Width) */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-center">
                          <span className="text-xs font-mono text-zinc-400 mb-4 block">
                            0{index + 1}.0{subIndex + 1}
                          </span>
                          <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 leading-tight group-hover:text-zinc-600 transition-colors">
                            {subService.title}
                          </h3>
                          <p className="text-lg text-zinc-500 leading-relaxed mb-8 max-w-md">
                            {subService.description}
                          </p>

                          <div className="flex items-center gap-6">
                            <Link
                              href="/contact"
                              className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:gap-5 transition-all duration-300"
                            >
                              Contact Us <FaArrowRight />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
                <NewsletterSection />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 3. NEWSLETTER SECTION (Added Here) --- */}

      {/* --- 4. Logo Loop --- */}
      {logos.length > 0 && (
        <section className="w-full py-24 bg-zinc-50 border-t border-zinc-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-12">
              Our Collaborative Partners
            </h3>
            <div className="relative h-20 w-full overflow-hidden grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
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

      <CTASection data={cta} />
    </main>
  );
}
