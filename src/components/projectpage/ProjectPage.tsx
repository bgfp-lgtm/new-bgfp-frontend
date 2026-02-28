"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import Image from "next/image";
import VideoModal from "./VideoModal";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import CTASectionTwo from "../CTASectionTwo";

export default function ProjectPage({
  cta,
  projects,
  showHero = true,
  showCta = true,
  heading = "Featured Projects",
  limit,
}: any) {
  const [openVideoUrl, setOpenVideoUrl] = useState<string | null>(null);
  const [openTitle, setOpenTitle] = useState<string | undefined>(undefined);

  // Filter projects if limit is set
  const displayedProjects =
    limit && projects ? projects.slice(0, limit) : projects;

  return (
    <div>
      {/* =========================================
          1. CINEMATIC HERO SECTION
      ========================================= */}
      {showHero && (
        <section className="relative h-[90vh] w-full flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 overflow-hidden bg-black">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90"
            >
              <source src="/about.mp4" type="video/mp4" />
            </video>
            {/* Gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-screen-2xl mx-auto border-t border-white/20 pt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/80">
                Our Portfolio
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 text-white max-w-6xl"
            >
              Our Projects
            </motion.h1>

            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed"
              >
                Discover our portfolio of creative projects and see the impact
                of our work.
              </motion.p>
            </div>
          </div>
        </section>
      )}

      {/* --- Projects Grid --- */}
      <div className="w-full px-4 md:px-10 py-10 bg-white">
        <div className="w-full mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {heading}
            </h2>
            <p className="text-gray-500">Click a project to watch its video.</p>
          </div>

          {!displayedProjects ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-lg text-gray-600">Loading projects...</div>
            </div>
          ) : displayedProjects.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-lg text-gray-600">
                No projects available at the moment.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayedProjects.map((project: any) => {
                const hasLink = project.link && project.link.trim().length > 0;

                return (
                  <button
                    key={project.id}
                    disabled={!hasLink}
                    suppressHydrationWarning // ADD THIS
                    onClick={() => {
                      if (hasLink) {
                        setOpenVideoUrl(project.link);
                        setOpenTitle(project.title);
                      }
                    }}
                    className={`group relative w-full aspect-video rounded-3xl overflow-hidden text-left focus:outline-none transition-all duration-500 ${
                      hasLink ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    {/* 1. Background Image (Scales on Hover) */}
                    {project.image?.url ? (
                      <Image
                        width={1000}
                        height={1000}
                        src={project.image.url}
                        alt={`${project.title} image`}
                        className="w-full h-full object-cover transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-200">
                        No Preview
                      </div>
                    )}

                    {/* 2. Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

                    {/* 3. Content Overlay */}
                    {/* UPDATED: flex-row, justify-start to group them left-aligned */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-row items-center justify-start gap-4">
                      {/* A. Watch Button (FIRST) */}
                      <div className="shrink-0">
                        {hasLink ? (
                          <div
                            className="inline-flex items-center gap-3 px-5 py-3 md:px-6 md:py-3 rounded-lg font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 
                            bg-transparent border border-red-600 text-white
                            group-hover:bg-red-600 group-hover:text-white group-hover:shadow-lg group-hover:-translate-y-1"
                          >
                            <FaPlay className="w-2 h-2 md:w-3 md:h-3" />
                            <span className="hidden sm:inline">Watch Now</span>
                            <span className="sm:hidden">Play</span>
                          </div>
                        ) : (
                          <span className="text-white/60 text-xs font-mono uppercase tracking-widest">
                            Soon
                          </span>
                        )}
                      </div>

                      {/* B. Title (SECOND) */}
                      <h3 className="text-xl md:text-xl font-bold text-white tracking-wide drop-shadow-md leading-tight text-left">
                        {project.title}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* View More Button */}
          {limit && (
            <div className="mt-16 flex justify-center">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white border border-gray-300 text-black hover:text-white rounded-full font-bold uppercase tracking-wider hover:bg-red-600 transition-colors duration-300"
              >
                View More Projects
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <CTASectionTwo />

      <VideoModal
        open={Boolean(openVideoUrl)}
        videoUrl={openVideoUrl}
        title={openTitle}
        onClose={() => {
          setOpenVideoUrl(null);
          setOpenTitle(undefined);
        }}
      />
    </div>
  );
}
