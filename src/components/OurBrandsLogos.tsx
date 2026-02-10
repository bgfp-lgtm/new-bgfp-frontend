import { getStrapiMedia } from "@/lib/utils";
import LogoLoop from "./homepage/LogoLoop";

export default function OurBrandsLogos({ data }: any) {
  const logos =
    data?.brands?.map((brand: any) => ({
      src: getStrapiMedia(brand.url), // Use the util
      alt: brand.name,
      title: brand.name,
      width: brand.width || 120,
      height: brand.height || 45,
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
    </div>
  );
}
