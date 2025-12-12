"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import VideoModal from "@/components/projectpage/VideoModal";
import { cn, getStrapiMedia } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

export default function CinematicCarousel({ projects }: { projects: any[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [openVideoUrl, setOpenVideoUrl] = useState<string | null>(null);
  const [openTitle, setOpenTitle] = useState<string | undefined>(undefined);

  // 1. Configure Auto-play: 2000ms delay as per your code
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleStreamClick = (
    e: React.MouseEvent,
    videoUrl: string,
    title: string
  ) => {
    e.stopPropagation();

    // Stop autoplay when "Watch Now" is clicked/tapped
    if (plugin.current) {
      plugin.current.stop();
    }

    if (videoUrl) {
      setOpenVideoUrl(videoUrl);
      setOpenTitle(title);
    }
  };

  if (!projects || projects.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-12">
      <div className="w-full">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl text-center font-bold text-zinc-900 mb-3 tracking-tight">
            Featured Productions
          </h2>
          <p className="text-zinc-500 text-center text-base md:text-lg">
            Our latest originals and cinematic releases.
          </p>
        </div>

        {/* Cinematic Carousel */}
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
          // Stop on hover
          onMouseEnter={() => plugin.current.stop()}
          // Resume on hover leave
          onMouseLeave={() => plugin.current.play()}
        >
          {/* Zero Gap Layout */}
          <CarouselContent className="ml-0">
            {projects.map((project, index) => {
              const isActive = index === current;
              const imageUrl = getStrapiMedia(project.image?.url);

              return (
                <CarouselItem
                  key={project.id}
                  // Responsive Basis: 90% on mobile (more focus), 80% on desktop (peek effect)
                  className="pl-0 basis-[90%] sm:basis-[85%] md:basis-[80%] lg:basis-[80%] xl:basis-[75%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                >
                  <div
                    className={cn(
                      // Responsive Height: 50vh mobile -> 80vh desktop
                      // Responsive Radius: rounded-2xl mobile -> rounded-3xl desktop
                      "relative h-[50vh] sm:h-[60vh] md:h-[80vh] w-full rounded-2xl md:rounded-3xl overflow-hidden transform transition-all duration-700",
                      isActive
                        ? "scale-100 opacity-100 z-10"
                        : "scale-[0.92] opacity-50 blur-[1px] z-0"
                    )}
                  >
                    {/* Background Image */}
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority={index < 3}
                        sizes="(max-width: 768px) 90vw, 80vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400">
                        Image Unavailable
                      </div>
                    )}

                    {/* Gradient Overlay - Subtle bottom shade for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                    {/* MINIMAL CONTENT OVERLAY */}
                    {/* Responsive Padding: p-6 mobile -> p-16 desktop */}
                    <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 md:p-16 flex flex-col justify-end h-full pointer-events-none">
                      <div
                        className={cn(
                          // Flex gap adjustment for mobile
                          "transition-all duration-700 flex flex-row items-center gap-4 md:gap-6 pointer-events-auto",
                          isActive
                            ? "translate-y-0 opacity-100 delay-100"
                            : "translate-y-8 opacity-0"
                        )}
                      >
                        {/* 1. Watch Now Button (UPDATED STYLE & RESPONSIVE PADDING) */}
                        {project.link && (
                          <button
                            onClick={(e) =>
                              handleStreamClick(e, project.link, project.title)
                            }
                            className="group inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 
                            
                            /* Inactive State */
                            bg-transparent border border-red-600 text-white
                            
                            /* Active/Hover State */
                            hover:bg-red-600 hover:text-white hover:shadow-lg hover:-translate-y-1"
                          >
                            <FaPlay className="w-2 h-2 md:w-3 md:h-3" />
                            <span className="hidden xs:inline">Watch Now</span>
                            <span className="xs:hidden">Play</span>
                          </button>
                        )}

                        {/* 2. Responsive Title Size */}
                        <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-white tracking-wide drop-shadow-md line-clamp-1">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Circle Sliders (Dots) */}
        <div className="flex justify-center items-center gap-4 mt-8 md:mt-12">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-500 cursor-pointer",
                current === index
                  ? "bg-zinc-900 "
                  : "bg-zinc-300 hover:bg-zinc-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <VideoModal
        open={Boolean(openVideoUrl)}
        videoUrl={openVideoUrl}
        title={openTitle}
        onClose={() => {
          setOpenVideoUrl(null);
          setOpenTitle(undefined);
        }}
      />
    </section>
  );
}
