"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import VideoComponent from "../VideoComponent";

export default function HeroSection({ data }: any) {
  // FIX: Explicitly type these as 'Variants' to fix the ease array error
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1], // TypeScript now accepts this cubic-bezier
      },
    },
  };

  return (
    <div className="h-[90vh] lg:h-screen w-full relative overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <VideoComponent url={data?.video?.url} />
      </div>

      {/* Cinematic Gradient Overlay */}
      {/* Dark floor for text, clear top for video visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-10" />

      {/* Content Container */}
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

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-white text-5xl sm:text-7xl md:text-9xl font-black mb-6 tracking-tighter uppercase drop-shadow-xl"
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-[10px] uppercase tracking-[0.2em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"
        />
      </motion.div>
    </div>
  );
}
