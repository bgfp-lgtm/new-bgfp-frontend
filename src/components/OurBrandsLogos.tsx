import { getStrapiMedia } from "@/lib/utils";
import LogoLoop from "./homepage/LogoLoop";

import Image from "next/image";

export default function OurBrandsLogos({ data }: any) {
  const logos =
    data?.brands?.map((brand: any) => ({
      node: (
        <Image
          src={getStrapiMedia(brand.url) || ""}
          alt={brand.name || "Brand Logo"}
          width={brand.width || 120}
          height={brand.height || 45}
          className="h-[45px] w-auto object-contain"
          unoptimized
          // Logos are usually below the fold or small enough that lazy is fine,
          // but if they are in viewport, priority might be needed.
          // Given "OurBrandsLogos", it's likely further down -> lazy default is good.
        />
      ),
      href: brand.url?.startsWith("http") ? brand.url : undefined, // Optional link if data has it
      title: brand.name,
    })) || [];
  return (
    <div className="relative mt-16">
      {logos.length > 0 && (
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-12">
              Our Brand Partners
            </h3>
            <div className="relative h-20 w-full overflow-hidden transition-all duration-500">
              <LogoLoop
                logos={logos}
                speed={800}
                direction="left"
                logoHeight={45}
                gap={80}
                pauseOnHover
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
