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
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <div className="relative h-screen w-full overflow-hidden">
        {herosectionData?.video?.url && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src={getStrapiMedia(herosectionData.video.url) || ""}
              type="video/mp4"
            />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              {herosectionData?.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed"
            >
              {herosectionData?.description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="px-6 py-16 md:px-12 md:py-24 max-w-[1400px] mx-auto overflow-hidden"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- WHY CHOOSE US SECTION (FIXED: Automatic Full Width for Last Odd Card) --- */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {featureCards.map((feature: any, index: number) => {
              // 2. Logic: Is this the last item? Is the total count odd?
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
                  // 3. Apply col-span-2 if condition is met
                  className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-8 hover:border-red-200 hover:shadow-lg transition-all duration-300 ${
                    shouldSpan ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300">
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
                    <p className="text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* --- MEMBERS SECTION --- */}
        <div className="w-full flex flex-col gap-24 md:gap-32">
          {members?.map((member: any, index: number) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-10 md:gap-16`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 flex justify-center lg:shrink-0"
              >
                <div className="relative w-full h-[450px] lg:w-[450px] lg:h-[650px] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 mx-auto">
                  <SafeImage
                    url={member.image?.url}
                    alt={`${member.name} - ${member.title}`}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              <div className="w-full lg:w-1/2 flex flex-col gap-6 py-4">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
                    {member.title}
                  </h2>
                  <h3 className="text-xl md:text-2xl font-medium text-red-500">
                    {member.name}
                  </h3>
                </div>

                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  {member.description}
                </p>

                {member.skills && (
                  <div className="mt-2">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Key Skills & Expertise:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill: any) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-full text-sm font-medium"
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

        {/* --- CTA SECTION --- */}
        <div className="mt-32">
          <CTASection data={cta} />
        </div>

        {/* --- FOOTER --- */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-24 p-8 bg-gray-50 rounded-2xl border border-gray-100"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Ready to Collaborate?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            BGFP is always open to exploring new opportunities and partnerships.
            Let's create something extraordinary together.
          </p>

          {/* CTA Button Added Here */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:-translate-y-1"
          >
            <span className="mr-2">Contact Us</span>
            <FaArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.footer>
      </motion.div>
    </div>
  );
}
