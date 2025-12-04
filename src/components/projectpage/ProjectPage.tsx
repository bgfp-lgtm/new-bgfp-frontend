"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import Image from "next/image";
import VideoModal from "./VideoModal";
import { FaArrowRight } from "react-icons/fa";

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
          1. CINEMATIC HERO SECTION (UPDATED)
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
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
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

              <div className="flex items-center gap-4 text-white/60 text-xs font-mono uppercase tracking-widest">
                <span>Scroll to View</span>
                <div className="h-px w-12 bg-white/40"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- Projects Grid (Unchanged) --- */}
      <div className="w-full px-4 md:px-20 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {displayedProjects.map((project: any) => {
                const hasLink = project.link && project.link.trim().length > 0;

                return (
                  <button
                    key={project.id}
                    disabled={!hasLink}
                    onClick={() => {
                      if (hasLink) {
                        setOpenVideoUrl(project.link);
                        setOpenTitle(project.title);
                      }
                    }}
                    className={`group flex flex-col items-center text-left focus:outline-none ${
                      hasLink ? "cursor-pointer" : "cursor-default opacity-80"
                    }`}
                  >
                    {/* Media Container */}
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-gray-900 shadow-sm group-hover:shadow-xl transition-all duration-300 ease-out">
                      {project.image?.url ? (
                        <Image
                          width={1000}
                          height={1000}
                          src={project.image.url}
                          alt={`${project.title} image`}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
                          No Preview
                        </div>
                      )}

                      {/* Overlay: Play Button aesthetics */}
                      {hasLink && (
                        <>
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

                          {/* Centered Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-black/30 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-8 h-8 text-white ml-1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="mt-6 text-center space-y-1">
                      <h2 className="text-xl font-bold text-gray-900">
                        {project.title}
                      </h2>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                        {hasLink ? "Watch Video" : "Coming Soon"}
                      </p>
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

      {showCta && <CTASection data={cta} />}
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
