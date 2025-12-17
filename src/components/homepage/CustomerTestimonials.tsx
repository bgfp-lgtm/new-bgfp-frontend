"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { LuStar } from "react-icons/lu";
import Image from "next/image";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <LuStar
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function CustomerTestimonials({ data }: any) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!data?.testimonials) return null;

  return (
    <section className="py-10">
      <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Carousel Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full"
        >
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full mx-auto"
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
          >
            <CarouselContent className="-ml-4 py-6">
              {data.testimonials.map((testimonial: any, index: number) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 md:basis-1/2"
                >
                  <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden h-full flex flex-col md:flex-row hover:shadow-lg transition-shadow duration-300">
                    {/* Image Section - UPDATED HERE */}
                    {testimonial.image?.url && (
                      <div className="relative h-96 w-full md:h-auto md:w-2/5 shrink-0 overflow-hidden">
                        <Image
                          width={400}
                          height={400}
                          src={testimonial.image.url}
                          alt={`${testimonial.name}`}
                          // Changed 'lg:object-cover' to just 'object-cover' to ensure it looks good on mobile too
                          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6 md:p-8 flex flex-col grow justify-center">
                      <div className="mb-3">
                        <StarRating rating={+testimonial.starCount || 0} />
                      </div>

                      <blockquote className="text-gray-700 mb-4 grow">
                        <p className="text-base leading-relaxed italic line-clamp-5 md:line-clamp-4">
                          "{testimonial.feedback.replace(/^"|"$/g, "")}"
                        </p>
                      </blockquote>

                      <div className="mt-auto">
                        <div className="font-bold text-gray-900 text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-500 font-medium flex items-center">
                          Verified Customer
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Slider Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  current === index
                    ? "w-8 h-2 bg-gray-800"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
