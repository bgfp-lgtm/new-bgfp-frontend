"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

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
    if (videoUrl) {
      setOpenVideoUrl(videoUrl);
      setOpenTitle(title);
    }
  };

  if (!projects || projects.length === 0) return null;

  return (
    <section className="w-full py-12 md:py-20">
      <div className="w-full">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12">
          <h2 className="text-4xl md:text-5xl text-center font-bold text-zinc-900 mb-3 tracking-tight">
            Featured Productions
          </h2>
          <p className="text-zinc-500 text-center text-lg">
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
          onMouseEnter={() => plugin.current.stop()}
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
                  // Full-bleed width effect (85% mobile, 80% desktop)
                  className="pl-0 basis-[85%] md:basis-[80%] lg:basis-[85%] xl:basis-[80%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                >
                  <div
                    className={cn(
                      "relative h-[60vh] md:h-[80vh] w-full rounded-3xl overflow-hidden transform transition-all duration-700 shadow-2xl",
                      isActive
                        ? "scale-100 opacity-100 shadow-black/30 z-10"
                        : "scale-[0.92] opacity-60 grayscale-[30%] blur-[1px] z-0"
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
                        sizes="(max-width: 768px) 85vw, 85vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400">
                        Image Unavailable
                      </div>
                    )}

                    {/* Gradient Overlay - Subtle bottom shade for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                    {/* MINIMAL CONTENT OVERLAY */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col justify-end h-full pointer-events-none">
                      <div
                        className={cn(
                          "transition-all duration-700 flex flex-row items-center gap-6 pointer-events-auto",
                          isActive
                            ? "translate-y-0 opacity-100 delay-100"
                            : "translate-y-8 opacity-0"
                        )}
                      >
                        {/* 1. Watch Now Button */}
                        {project.link && (
                          <button
                            onClick={(e) =>
                              handleStreamClick(e, project.link, project.title)
                            }
                            className="group bg-white text-black hover:bg-zinc-200 transition-all duration-300 px-8 py-3.5 rounded-full font-bold text-sm md:text-base inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
                          >
                            <FaPlay className="w-3 h-3" />
                            <span>Watch Now</span>
                          </button>
                        )}

                        {/* 2. Small Title Next to Button */}
                        <h3 className="text-xl md:text-3xl font-bold text-white tracking-wide drop-shadow-md">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Navigation Arrows */}
          {/* <div className="hidden md:block">
            <CarouselPrevious className="left-8 lg:left-16 h-16 w-16 bg-white/10 hover:bg-white border-none text-white hover:text-black backdrop-blur-md transition-all scale-110" />
            <CarouselNext className="right-8 lg:right-16 h-16 w-16 bg-white/10 hover:bg-white border-none text-white hover:text-black backdrop-blur-md transition-all scale-110" />
          </div> */}
        </Carousel>

        {/* Circle Sliders (Dots) */}
        <div className="flex justify-center items-center gap-4 mt-12">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-500",
                current === index
                  ? "bg-zinc-900"
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
