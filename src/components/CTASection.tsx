"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaFilm,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

// Maps icons to the titles from your Strapi data
const iconMap: { [key: string]: React.ReactNode } = {
  "Our Address": <FaMapMarkerAlt className="text-white text-2xl" />,
  "Contact Us": <FaPhone className="text-white text-2xl" />,
  "Opening Hours": <FaClock className="text-white text-2xl" />,
};

export default function CTASection({ data }: any) {
  const router = useRouter();

  const handleGetQuoteClick = () => {
    router.push("/contact");
  };

  if (!data?.card) return null;

  return (
    <section className="relative w-full bg-neutral-950 py-24 md:py-16 overflow-hidden">
      {/* --- Ambient Background Effects --- */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-8 backdrop-blur-md"
          >
            <FaFilm className="text-red-500 text-sm" />
            <span className="text-red-400 font-bold text-xs uppercase tracking-[0.2em]">
              {data.subtitle}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight whitespace-pre-line"
          >
            {data.title}
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-red-600 to-transparent mx-auto rounded-full"
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {data.card.map((card: any, index: number) => {
            const icon = iconMap[card.title];
            const isContactCard = card.title === "Contact Us";

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + index * 0.15,
                }}
                className={`relative group p-8 md:p-6 lg:p-8 rounded-3xl border transition-all duration-500
                  ${
                    isContactCard
                      ? "bg-linear-to-br from-neutral-900 to-neutral-800 border-red-500/50 hover:border-red-500"
                      : "bg-neutral-900/50 border-red-500/50 hover:border-red-500 hover:bg-neutral-900"
                  }
                  backdrop-blur-sm shadow-2xl hover:shadow-red-900/20 hover:-translate-y-2
                `}
              >
                <div className="absolute inset-0 bg-linear-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div
                    className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3
                    ${
                      isContactCard
                        ? "bg-red-600 text-white shadow-red-600/20"
                        : "bg-red-600 text-gray-200 group-hover:bg-red-600"
                    }
                  `}
                  >
                    {icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-8 whitespace-pre-line text-sm md:text-base wrap-break-words w-full">
                    {card.subtitle}
                  </p>

                  <div className="mt-auto">
                    {isContactCard ? (
                      <motion.button
                        onClick={handleGetQuoteClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        // UPDATED CTA STYLE
                        className="group/btn relative overflow-hidden rounded-lg bg-transparent text-white cursor-pointer border border-red-600 px-8 py-3 font-bold text-sm transition-all hover:bg-red-600 hover:text-white hover:border-red-600 flex items-center gap-2"
                      >
                        <span>Get Your Quote</span>
                        <FaArrowRight className="-rotate-45 group-hover/btn:rotate-0 transition-transform duration-300" />
                      </motion.button>
                    ) : (
                      <div className="w-12 h-1 bg-neutral-800 rounded-full group-hover:bg-red-500/50 transition-colors duration-300" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
