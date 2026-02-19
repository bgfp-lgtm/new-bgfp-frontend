"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

type Props = {
  url: string;
  poster?: string;
  lazy?: boolean;
};

export default function VideoComponent({ url, poster, lazy = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!lazy);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!lazy || isVisible) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [lazy, isVisible]);

  // FIX: Detect if the poster is a local static file (e.g. /bg.jpg) or a remote/Strapi file.
  // Strapi files usually start with /uploads. Local files are just root relative.
  const isLocal = poster?.startsWith("/") && !poster.startsWith("/uploads");
  const finalPoster = poster
    ? (isLocal ? poster : getStrapiMedia(poster))
    : null;

  return (
    <div ref={containerRef} className="object-cover w-full h-full relative overflow-hidden">
      {finalPoster && (
        <Image
          src={finalPoster}
          alt="Video background"
          fill
          priority
          sizes="100vw"
          unoptimized
          className={`object-cover z-0 transition-opacity duration-700 ${isMounted && !isMobile && isVisible ? "opacity-0" : "opacity-100"
            }`}
        />
      )}

      {isMounted && !isMobile && isVisible && (
        <video
          autoPlay
          loop
          muted={true}
          playsInline
          poster={finalPoster || undefined}
          className="absolute inset-0 w-full h-full object-cover z-10"
          preload="none"
          aria-hidden="true"
        >
          <source src={url} />
          <track
            kind="captions"
            src="/captions.vtt"
            label="English"
            default={false}
          />
        </video>
      )}
    </div>
  );
}
