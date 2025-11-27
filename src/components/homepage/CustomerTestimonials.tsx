"use client";

import * as React from "react"; // Needed for the plugin ref
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"; // Import Autoplay
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
  // 1. Create the plugin instance for Auto-move
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  if (!data?.testimonials) return null;

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
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
          className="relative"
        >
          <Carousel
            plugins={[plugin.current]} // Add the autoplay plugin here
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto" // Increased max-width for horizontal cards
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-4 py-6">
              {data.testimonials.map((testimonial: any, index: number) => (
                // Changed basis to usually show 2 cards on desktop for the wide layout
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 md:basis-1/2"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    // 2. LAYOUT CHANGE: flex-col on mobile, flex-row on desktop
                    className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden h-full flex flex-col md:flex-row"
                  >
                    {/* Image Section - Left Side on Desktop */}
                    {testimonial.image?.url && (
                      <div className="relative h-64 w-full md:h-auto md:w-2/5 shrink-0 overflow-hidden">
                        <Image
                          width={400}
                          height={400}
                          src={testimonial.image.url}
                          alt={`${testimonial.name}`}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Content Section - Right Side on Desktop */}
                    <div className="p-6 md:p-8 flex flex-col grow justify-center">
                      <div className="mb-3">
                        <StarRating rating={+testimonial.starCount || 0} />
                      </div>

                      <blockquote className="text-gray-700 mb-4 grow">
                        {/* 3. LINE CLAMP: This fixes the 'uneven' height issue */}
                        <p className="text-base leading-relaxed italic line-clamp-5 md:line-clamp-4">
                          "{testimonial.feedback.replace(/^"|"$/g, "")}"
                        </p>
                      </blockquote>

                      <div className="mt-auto">
                        <div className="font-bold text-gray-900 text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                          Verified Customer
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex -left-12 bg-white hover:bg-gray-100" />
            <CarouselNext className="hidden md:flex -right-12 bg-white hover:bg-gray-100" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
