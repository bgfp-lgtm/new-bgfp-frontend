"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CTASection from "@/components/CTASection";
import { getStrapiMedia } from "@/lib/utils";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

// --- Helper Component ---
const SafeImage = ({
  url,
  alt,
  className,
  width,
  height,
}: {
  url: string | null;
  alt: string;
  className?: string;
  width: number;
  height: number;
}) => {
  const fullUrl = getStrapiMedia(url);
  if (!fullUrl) return null;

  return (
    <Image
      src={fullUrl}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className}`}
    />
  );
};

export default function AboutUs({
  herosectionData,
  mission,
  vision,
  ourStory,
  highlights,
  features,
  members,
  cta,
}: any) {
  const title = features?.title || "";
  const highlightWord = "BirthGiver";
  const parts = title.split(highlightWord);
  const titlePart1 = parts[0] || "";
  const titlePart2 = parts[1] || "";

  // 1. Safely get cards array to check length later
  const featureCards = features?.cards || [];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* =========================================
          1. CINEMATIC HERO SECTION (UPDATED)
      ========================================= */}
      <section className="relative h-[90vh] w-full flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 overflow-hidden bg-black">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          {herosectionData?.video?.url && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90"
            >
              <source
                src={getStrapiMedia(herosectionData.video.url) || ""}
                type="video/mp4"
              />
            </video>
          )}
          {/* Gradient for text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto border-t border-white/20 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/80">
              Who We Are
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 text-white max-w-6xl"
          >
            {herosectionData?.title}
          </motion.h1>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed"
            >
              {herosectionData?.description}
            </motion.p>

            <div className="flex items-center gap-4 text-white/60 text-xs font-mono uppercase tracking-widest">
              <span>Scroll to Explore</span>
              <div className="h-px w-12 bg-white/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative px-6 py-16 md:px-12 md:py-24 max-w-[1400px] mx-auto w-full"
      >
        {/* --- WHAT IS BGFP SECTION --- */}
        <section className="mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              What Is BirthGiver Film Productions?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-8 h-full"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex-1 hover:shadow-xl transition-shadow duration-300">
                <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1.5 h-8 bg-red-500 rounded-full mr-4 shrink-0"></span>
                  {mission?.title}
                </h4>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {mission?.description}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex-1 hover:shadow-xl transition-shadow duration-300">
                <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1.5 h-8 bg-red-500 rounded-full mr-4 shrink-0"></span>
                  {vision?.title}
                </h4>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {vision?.description}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-br from-red-50 to-gray-50 rounded-2xl shadow-lg p-8 lg:p-10 border border-gray-100 h-full flex flex-col justify-center"
            >
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-1.5 h-8 bg-red-500 rounded-full mr-4 shrink-0"></span>
                {ourStory?.title}
              </h4>
              <p className="text-gray-700 leading-relaxed text-lg">
                {ourStory?.description}
              </p>
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {highlights?.map((highlight: any, index: number) => (
              <motion.div
                key={highlight.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-5 shrink-0">
                  <SafeImage
                    url={highlight.image?.url}
                    alt={highlight.title || "icon"}
                    width={24}
                    height={24}
                    className="w-6 h-6 text-red-500"
                  />
                </div>
                <h5 className="text-xl font-bold text-gray-900 mb-3">
                  {highlight.title}
                </h5>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base flex-grow">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- WHY CHOOSE US SECTION --- */}
        <section className="mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {titlePart1}
              <span className="text-red-500 mx-2">{highlightWord}</span>
              {titlePart2}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {features?.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 auto-rows-fr">
            {featureCards.map((feature: any, index: number) => {
              const isLastItem = index === featureCards.length - 1;
              const isOddTotal = featureCards.length % 2 !== 0;
              const shouldSpan = feature.span || (isLastItem && isOddTotal);

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: feature.delay || 0 }}
                  className={`group relative bg-linear-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-8 hover:border-red-200 hover:shadow-lg transition-all duration-300 h-full ${
                    shouldSpan ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300 shrink-0">
                      <SafeImage
                        url={feature.image?.url}
                        alt={feature.title || "feature"}
                        width={24}
                        height={24}
                        className="w-6 h-6 text-red-500 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* --- MEMBERS SECTION (UPDATED: Clean, No Gray Backdrop) --- */}
        <section className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 border-b border-zinc-200 pb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900">
              The Minds Behind the Magic.
            </h2>
          </motion.div>

          <div className="flex flex-col gap-32">
            {members?.map((member: any, index: number) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12 lg:gap-24`}
              >
                {/* Image Side - CLEAN, NO BACKDROP */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                      <SafeImage
                        url={member.image?.url}
                        alt={`${member.name}`}
                        width={800}
                        height={1000}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient Overlay for Texture */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                  {/* Title is now the label */}
                  <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">
                    {member.title}
                  </span>

                  {/* Name is now the main heading */}
                  <h3 className="text-4xl md:text-6xl font-black text-zinc-900 mb-8 leading-tight">
                    {member.name}
                  </h3>

                  <p className="text-zinc-500 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                    {member.description}
                  </p>

                  {member.skills && (
                    <div className="w-full">
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">
                        Expertise
                      </h4>
                      <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                        {member.skills.map((skill: any) => (
                          <span
                            key={skill.id}
                            className="px-5 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-full text-sm font-medium hover:border-red-500 hover:text-red-600 transition-colors duration-300 shadow-sm"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
      <CTASection data={cta} />
    </div>
  );
}
