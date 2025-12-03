"use client";

import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaArrowDown,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import Link from "next/link";

export default function CareersPage({ careersBlock, cta }: any) {
  // Helpers for grid logic
  const cultureCards = careersBlock?.culture?.cards || [];
  const perkCards = careersBlock?.gain?.cards || [];
  const processSteps = careersBlock?.apply?.cards || [];
  const jobs = careersBlock?.internship?.jobs || [];

  return (
    <div className="bg-white min-h-screen text-zinc-900 selection:bg-red-600 selection:text-white">
      {/* --- 1. Cinematic Hero Section --- */}
      <section className="relative h-[90vh] w-full flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source
              src={careersBlock?.herosection?.video?.url}
              type="video/mp4"
            />
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto border-t border-white/20 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/80">
              Careers & Culture
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 text-white max-w-6xl"
          >
            {careersBlock?.herosection?.title || "Join the Movement."}
          </motion.h1>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-200 text-lg md:text-xl leading-relaxed mb-6"
              >
                {careersBlock?.herosection?.description}
              </motion.p>

              {/* Tags as Pill Labels */}
              <div className="flex flex-wrap gap-2">
                {careersBlock?.herosection?.tags?.map((tag: any) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 border border-white/30 rounded-full text-xs font-mono uppercase tracking-widest text-white/80 backdrop-blur-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-white/60 text-xs font-mono uppercase tracking-widest">
              <span>Scroll to Explore</span>
              <FaArrowDown className="animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. Company Culture (Architectural Grid) --- */}
      <section className="relative w-full px-6 md:px-12 py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-200 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                {careersBlock?.culture?.title || "Our Culture"}
              </h2>
              <p className="text-zinc-500 font-medium max-w-xl">
                {careersBlock?.culture?.description}
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200">
            {cultureCards.map((card: any, index: number) => (
              <div
                key={card.id}
                className="group relative bg-white h-full p-8 md:p-10 flex flex-col justify-between hover:bg-zinc-50 transition-colors duration-500 min-h-[300px]"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center mb-6 group-hover:border-red-600 transition-colors duration-300">
                    {card.image?.url ? (
                      <Image
                        src={card.image.url}
                        alt={card.title}
                        width={24}
                        height={24}
                        className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all"
                      />
                    ) : (
                      <span className="text-xs font-mono">0{index + 1}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:translate-x-1 transition-transform duration-300">
                    {card.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. Job Openings (Clean List Layout) --- */}
      <section className="w-full px-6 md:px-12 py-24 bg-zinc-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-600 font-mono text-xs uppercase tracking-widest mb-4 block">
              Join the Team
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6">
              {careersBlock?.internship?.title || "Open Positions"}
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              {careersBlock?.internship?.description}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {jobs.map((job: any) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white rounded-none border border-zinc-200 p-8 md:p-12 hover:border-red-600 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-red-600 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>

                <div className="flex flex-col lg:flex-row gap-12">
                  {/* Left: Title & Meta */}
                  <div className="lg:w-1/3">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job?.tags?.map((tag: any) => (
                        <span
                          key={tag.id}
                          className="px-2 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-mono uppercase tracking-widest"
                        >
                          {tag.title}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-bold text-zinc-900 mb-2 group-hover:text-red-600 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-zinc-400 text-sm font-medium mb-6 lg:mb-0">
                      <FaBriefcase className="mr-2" />
                      {job.place}
                    </div>
                  </div>

                  {/* Right: Description & Requirements */}
                  <div className="lg:w-2/3">
                    <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
                      {job.job_description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="font-bold text-zinc-900 mb-4 uppercase text-xs tracking-widest border-b border-zinc-100 pb-2">
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {job.requirements
                            ?.split("\n")
                            .slice(1)
                            .map((req: string, i: number) => (
                              <li
                                key={i}
                                className="flex items-start text-sm text-zinc-500"
                              >
                                <span className="mr-2 mt-1.5 w-1 h-1 bg-red-600 rounded-full shrink-0"></span>
                                {req.replace(/^- /, "")}
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 mb-4 uppercase text-xs tracking-widest border-b border-zinc-100 pb-2">
                          Benefits
                        </h4>
                        <ul className="space-y-2">
                          {job.benefits
                            ?.split("\n")
                            .slice(1)
                            .map((ben: string, i: number) => (
                              <li
                                key={i}
                                className="flex items-start text-sm text-zinc-500"
                              >
                                <FaCheck className="mr-2 mt-0.5 w-3 h-3 text-zinc-300 shrink-0" />
                                {ben.replace(/^- /, "")}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-red-600 transition-colors duration-300">
                      Apply Now <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. Perks & Benefits (Grid with Iconography) --- */}
      <section className="relative w-full px-6 md:px-12 py-24 bg-white border-t border-zinc-100">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {careersBlock?.gain?.title || "Why Join Us?"}
            </h2>
            <p className="text-zinc-500 max-w-2xl">
              {careersBlock?.gain?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200">
            {perkCards.map((card: any, index: number) => (
              <div
                key={card.id}
                className="bg-white p-8 flex flex-col items-start hover:bg-zinc-50 transition-colors duration-300 min-h-[200px]"
              >
                <div className="mb-auto">
                  {card.image?.url && (
                    <Image
                      src={card.image.url}
                      alt={card.title}
                      width={32}
                      height={32}
                      className="w-8 h-8 mb-6"
                    />
                  )}
                </div>
                <h3 className="text-lg font-bold text-zinc-900">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. Application Process (Numbered Grid) --- */}
      <section className="w-full px-6 md:px-12 py-24 bg-zinc-900 text-white">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16 border-b border-white/10 pb-8">
            <h2 className="text-4xl font-bold mb-4">
              {careersBlock?.apply?.title || "How It Works"}
            </h2>
            <p className="text-zinc-400">{careersBlock?.apply?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {processSteps.map((step: any, index: number) => (
              <div key={step.id} className="relative group">
                <div className="text-6xl md:text-8xl font-black text-white/5 absolute -top-4 -left-4 z-0 group-hover:text-white/10 transition-colors">
                  0{index + 1}
                </div>
                <div className="relative z-10 pt-12 pl-6">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-red-500 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed border-l-2 border-white/10 pl-6 group-hover:border-red-600 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection data={cta} />
    </div>
  );
}
