"use client";

import React, { useRef, useState, useEffect } from "react";

type Props = {
  url: string;
  poster?: string;
  lazy?: boolean;
};

export default function VideoComponent({ url, poster, lazy = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!lazy);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile to avoid hydration mismatch, or use a specific strategy

  // Check viewport size on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!lazy || isVisible) return;

    const el = containerRef.current;
    if (!el) return;

    // Only mount the <video> once it's near the viewport
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

  return (
    <div ref={containerRef} className="object-cover w-full h-full relative">
      {/* Always render poster image first/underneath to prevent layout shift & provide mobile fallback */}
      {poster && (
        <img
          src={poster}
          alt=""
          className={`w-full h-full object-cover absolute inset-0 ${!isMobile && isVisible ? 'opacity-0 transition-opacity duration-500' : 'opacity-100'}`}
          // If it's the hero video, we want this to be eager
          loading="eager"
          fetchPriority="high"
          aria-hidden="true"
        />
      )}

      {!isMobile && isVisible && (
        <video
          autoPlay
          loop
          muted={true}
          playsInline
          poster={poster}
          className="w-full h-full object-cover relative z-10"
          preload="none" // we only mount when visible, but explicit none is good hygiene if we change logic
          aria-hidden="true"
          width={1920}
          height={1080}
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
