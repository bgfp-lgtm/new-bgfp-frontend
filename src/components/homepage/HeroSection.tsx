"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import VideoComponent from "../VideoComponent";

export default function HeroSection({ data }: any) {
  // FIX: Only animate transform (y), never opacity.
  // The container is always visible so the <h1> paints immediately for LCP.
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 1, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="h-[90vh] lg:h-screen w-full relative overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <VideoComponent url={data?.video?.url} poster={data?.poster?.url || data?.video?.previewUrl || "/hero-poster.webp"} />
      </div>

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black z-10" />

      {/* Content Container — always opacity:1 for instant LCP */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center px-4 md:px-6 flex flex-col items-center max-w-6xl mx-auto"
        >
          {/* Optional Tagline/Eyebrow */}
          {data?.tagline && (
            <motion.span
              variants={itemVariants}
              className="text-yellow-400 font-semibold tracking-[0.3em] uppercase text-xs md:text-sm mb-6"
            >
              {data.tagline}
            </motion.span>
          )}

          {/* Main Title — visible in initial HTML, only y offset animates */}
          <motion.h1
            variants={itemVariants}
            className="text-white text-5xl sm:text-7xl md:text-9xl font-black mb-6 tracking-tighter drop-shadow-xl"
          >
            {data?.title || "Limitless"}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-white/90 text-lg sm:text-xl md:text-3xl tracking-wide max-w-3xl font-light leading-relaxed drop-shadow-lg"
          >
            {data?.subtitle || "Experience the energy and passion."}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator — CSS-only infinite animation */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-[fade-in_1s_1.5s_both]"
      >
        <span className="text-white/50 text-[10px] uppercase tracking-[0.2em]">
          Scroll
        </span>
        <div
          className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent animate-[scroll-bounce_2s_ease-in-out_infinite]"
        />
      </div>

      <style jsx>{`
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
