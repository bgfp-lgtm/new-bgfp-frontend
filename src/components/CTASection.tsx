"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaFilm,
  FaHandPeace,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

// Maps icons to the titles from your Strapi data
const iconMap: { [key: string]: React.ReactNode } = {
  "Our Address": <FaMapMarkerAlt className="text-red-500 text-2xl" />,
  "Contact Us": <FaPhone className="text-red-500 text-2xl" />,
  "Opening Hours": <FaClock className="text-red-500 text-2xl" />,
};

export default function CTASection({ data }: any) {
  const router = useRouter();

  const handleGetQuoteClick = () => {
    router.push("/contact");
  };

  if (!data?.card) return null; // Don't render if no data

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gray-900 py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-20">
        <div className="text-center mb-16">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 border border-white rounded-full mb-8"
          >
            <FaFilm className="text-red-500 text-lg" />
            <span className="text-white font-medium text-sm uppercase tracking-wide">
              {data.subtitle}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            // Use whitespace-pre-line to respect '\n' from the JSON
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-red-500 mb-12 leading-tight whitespace-pre-line"
          >
            {data.title}
          </motion.h2>
        </div>

        {/* Three Cards Grid - Mapped Dynamically */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {data.card.map((card: any, index: number) => {
            // Get the icon from the map, or null
            const icon = iconMap[card.title];

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.6 + index * 0.2, // Staggered delay
                }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20 hover:border-red-500/50 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6 group-hover:bg-red-500/30 transition-colors duration-300">
                    {icon} {/* Dynamic Icon */}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {card.title} {/* Dynamic Title */}
                  </h3>
                  {/* Use whitespace-pre-line for subtitles */}
                  <p className="text-gray-300 leading-relaxed mb-4 whitespace-pre-line">
                    {card.subtitle} {/* Dynamic Subtitle */}
                  </p>

                  {/* Conditionally render button for 'Contact Us' card */}
                  {card.title === "Contact Us" && (
                    <motion.button
                      onClick={handleGetQuoteClick}
                      className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors duration-300 font-semibold group/btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaHandPeace className="text-lg group-hover/btn:rotate-12 transition-transform duration-300" />
                      Get Your Quote
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
