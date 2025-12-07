"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// Helper: split text into 2 parts around a highlight word
const highlightText = (text: string | undefined, highlight: string) => {
  if (!text) return { before: "", after: "" };
  const parts = text.split(highlight);
  return {
    before: parts[0],
    after: parts.slice(1).join(highlight),
  };
};

export default function IntroSection({ data }: any) {
  if (!data) return null;

  const main = highlightText(data?.title, "UK");
  const titleTwo = highlightText(data?.title2, "Empowering Businesses.");

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Soft floating background circles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 h-80 w-80 rounded-full bg-red-600/8 blur-3xl"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 h-64 w-64 rounded-full bg-gray-900/5 blur-3xl"
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative w-full px-6 md:px-20 pt-16">
        <div className="max-w-6xl mx-auto">
          {/* ------------------ HERO TITLE ------------------ */}
          <div className="text-center mb-16">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-red-100 bg-red-50 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
            >
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-sm font-medium text-red-600">
                {data?.subtitle || "Full Spectrum Services"}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {main.before}
              <span className="relative inline-block text-red-600">UK</span>
              {main.after}
            </motion.h2>
          </div>

          {/* ------------------------------------------------- */}
          {/* ------------------ CONTENT GRID ------------------ */}
          {/* ------------------------------------------------- */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* ========== LEFT SIDE CONTENT (Text & Button) ========== */}
            <div className="space-y-10">
              <div className="space-y-6">
                {/* Second Title */}
                <motion.h3
                  className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {titleTwo.before}
                  <span className="text-red-600">Empowering Businesses.</span>
                  {titleTwo.after}
                </motion.h3>

                <motion.p
                  className="text-gray-600 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  {data?.subtitle2}
                </motion.p>
              </div>

              {/* Two bullet points */}
              <div className="space-y-4 border-l-2 border-red-600 pl-6">
                {[1, 2].map((num, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                  >
                    <p className="text-gray-700 leading-relaxed text-base">
                      <span className="font-semibold text-gray-900">
                        {data[`ques${num}`]}
                      </span>{" "}
                      {data[`ans${num}`]}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button (UPDATED STYLE) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href={data?.link?.path || "#"}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 group
                  
                  /* Inactive: Red Border, Red Text, Transparent BG */
                  bg-transparent border border-red-600 text-red-600
                  
                  /* Active/Hover: Filled Red, White Text, Shadow & Lift */
                  hover:bg-red-600 hover:text-white hover:shadow-lg hover:-translate-y-1"
                >
                  {data?.link?.name || "View Our Projects"}
                  <FiArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* ========== RIGHT SIDE CONTENT (Image Only) ========== */}
            <div className="h-full w-full">
              <motion.div
                className="relative w-full h-full min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 18, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {data?.right_image_url ? (
                  <Image
                    src={data.right_image_url}
                    alt={data?.title || "Intro section image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 font-medium">
                    Image Not Found
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
