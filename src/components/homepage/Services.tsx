"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  BsLightbulb,
  BsClipboardData,
  BsMegaphone,
  BsCode,
} from "react-icons/bs";

const iconMap: { [key: string]: React.ReactNode } = {
  "End-to-End Film Production": <BsClipboardData className="w-5 h-5" />,
  "Marketing & Strategy": <BsMegaphone className="w-5 h-5" />,
  "Software & Website Development": <BsLightbulb className="w-5 h-5" />,
};

export default function Services({ data }: any) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  if (!data?.cards) return null;

  return (
    <div className="w-full px-4 md:px-20 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-7xl w-full mb-4 font-bold text-center"
        >
          {data.title || "Services"}
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8"
        >
          {data.cards.map((card: any) => {
            const icon = iconMap[card.title] || <BsCode className="w-5 h-5" />;

            return (
              <motion.div
                key={card.id}
                variants={itemVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={card.image.url}
                    alt={card.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover transition-all duration-500"
                  />

                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-red-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>

                  {/* Dynamic Learn More Button */}
                  <Link
                    href={card.link?.path || "#"}
                    className="mt-4 text-red-600 font-medium text-sm hover:text-red-800 transition-colors inline-flex items-center pointer-events-auto"
                  >
                    {card.link?.name || "Learn More"}
                    <svg
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
