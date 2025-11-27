"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiZap } from "react-icons/fi";

// Make slugs for URLs
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ & /g, "-")
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

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

  // Extract text sections with highlights
  const main = highlightText(data?.title, "UK");
  const titleTwo = highlightText(data?.title2, "Empowering Businesses.");
  const rightDesc = highlightText(
    data?.right_description,
    "real business success"
  );

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

      <div className="relative w-full px-6 md:px-20 pt-30">
        <div className="max-w-6xl mx-auto">
          {/* ------------------ HERO TITLE ------------------ */}
          <div className="text-center mb-24">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* ========== LEFT SIDE CONTENT ========== */}
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

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href={data?.link?.path || "#"}
                  className="bg-linear-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center group"
                >
                  {data?.link?.name || "View Our Projects"}
                  <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* ========== RIGHT SIDE CONTENT ========== */}
            <div className="space-y-10">
              <motion.div
                className="bg-linear-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-8 shadow-sm"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Description with highlight */}
                <motion.p
                  className="text-gray-700 text-lg leading-relaxed mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {rightDesc.before}
                  <span className="font-semibold text-red-600">
                    real business success
                  </span>
                  {rightDesc.after}
                </motion.p>

                {/* Four cards */}
                <div className="grid grid-cols-2 gap-4">
                  {data?.right_block?.map((item: any, index: number) => (
                    <Link
                      href={`/${slugify(item.title)}`}
                      key={item.id}
                      // This class ensures the last item spans full width if the total count is odd
                      className="last:odd:col-span-2"
                    >
                      <motion.div
                        className="group h-full p-4 rounded-xl bg-white border border-gray-100 hover:border-red-200 hover:shadow-md transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                        whileHover={{ y: -4 }}
                      >
                        <div className="h-10 w-10 rounded-lg bg-red-600 mb-3 flex items-center justify-center">
                          <FiZap className="h-5 w-5 text-white" />
                        </div>

                        <p className="font-semibold text-gray-900 text-base mb-1">
                          {item.title}
                        </p>
                        <p className="text-gray-500 text-sm">{item.subtitle}</p>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
