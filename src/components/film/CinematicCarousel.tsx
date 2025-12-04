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

  // 1. Configure Auto-play: 4000ms (4 seconds) delay
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
    if (videoUrl) {
      setOpenVideoUrl(videoUrl);
      setOpenTitle(title);
    }
  };

  if (!projects || projects.length === 0) return null;

  return (
    <section className="w-full py-16 md:py-24">
      <div className="w-full">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-3 tracking-tight">
            Featured Productions
          </h2>
          <p className="text-zinc-500 text-lg">
            Our latest originals and cinematic releases.
          </p>
        </div>

        {/* Cinematic Carousel */}
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]} // Add the Autoplay plugin here
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
          onMouseEnter={() => plugin.current.stop()} // Pause on hover
          onMouseLeave={() => plugin.current.play()} // Resume on leave
        >
          <CarouselContent className="-ml-4 md:-ml-8">
            {projects.map((project, index) => {
              const isActive = index === current;
              const imageUrl = getStrapiMedia(project.image?.url);

              return (
                <CarouselItem
                  key={project.id}
                  // 2. BIGGER CARDS: basis-[70%] on large screens
                  className="pl-4 md:pl-8 basis-[90%] md:basis-[80%] lg:basis-[70%] xl:basis-[65%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                >
                  <div
                    className={cn(
                      "relative aspect-video rounded-3xl overflow-hidden transform transition-all duration-700 shadow-xl",
                      isActive
                        ? "scale-100 opacity-100 shadow-2xl shadow-black/20"
                        : "scale-90 opacity-50 grayscale-[20%] blur-[0.5px]"
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
                        sizes="(max-width: 768px) 90vw, 70vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400">
                        Image Unavailable
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col items-start justify-end h-full">
                      <div
                        className={cn(
                          "transition-all duration-700 flex flex-col items-start gap-4 md:gap-6",
                          isActive
                            ? "translate-y-0 opacity-100 delay-100"
                            : "translate-y-8 opacity-0"
                        )}
                      >
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] drop-shadow-md">
                          {project.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base font-medium text-zinc-200/90">
                          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/10">
                            Film Production
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(
                              project.updatedAt || Date.now()
                            ).getFullYear()}
                          </span>
                          <span>•</span>
                          <span>4K Ultra HD</span>
                        </div>

                        <p className="hidden md:block max-w-lg text-zinc-300 text-lg leading-relaxed line-clamp-2">
                          {project.description ||
                            "A cinematic masterpiece produced by BirthGiver Film Productions."}
                        </p>

                        {project.link && (
                          <button
                            onClick={(e) =>
                              handleStreamClick(e, project.link, project.title)
                            }
                            className="group mt-2 bg-white text-black hover:bg-zinc-200 transition-all duration-300 px-8 py-4 rounded-full font-bold text-sm md:text-base inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
                          >
                            <span>Watch Now</span>
                            <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <FaPlay className="w-2.5 h-2.5 ml-0.5" />
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Navigation Arrows */}
          <div className="hidden md:block">
            <CarouselPrevious className="left-8 lg:left-12 h-12 w-12 bg-white/10 hover:bg-white border-none text-white hover:text-black backdrop-blur-md" />
            <CarouselNext className="right-8 lg:right-12 h-12 w-12 bg-white/10 hover:bg-white border-none text-white hover:text-black backdrop-blur-md" />
          </div>
        </Carousel>

        {/* 3. Circle Sliders (Dots) */}
        <div className="flex justify-center items-center gap-3 mt-10">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300",
                current === index
                  ? "bg-zinc-900 scale-125 ring-2 ring-offset-2 ring-zinc-900"
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
