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
    <div ref={containerRef} className="object-cover w-full h-full">
      {isVisible ? (
        <video
          autoPlay
          loop
          muted={true}
          playsInline
          poster={poster}
          className="w-full h-full object-cover"
          preload="none"
          aria-hidden="true"
          width={1920}
          height={1080}
        >
          <source src={url} />
        </video>
      ) : (
        // Placeholder while lazy-waiting — show poster as static image
        poster && (
          <img
            src={poster}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        )
      )}
    </div>
  );
}
