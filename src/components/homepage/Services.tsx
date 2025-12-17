"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  BsLightbulb,
  BsClipboardData,
  BsMegaphone,
  BsCode,
  BsArrowRight,
} from "react-icons/bs";

const iconMap: { [key: string]: React.ReactNode } = {
  "End-to-End Film Production": <BsClipboardData className="w-6 h-6" />,
  "Marketing & Strategy": <BsMegaphone className="w-6 h-6" />,
  "Software & Website Development": <BsLightbulb className="w-6 h-6" />,
};

export default function Services({ data }: any) {
  if (!data?.cards) return null;

  return (
    <section className="w-full py-10 bg-gray-50 lg:mt-10">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-red-600 uppercase"
          >
            What We Do
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-900"
          >
            {data.title || "Our Services"}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-red-600 mx-auto rounded-full mt-6"
          />
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.cards.map((card: any, index: number) => {
            const icon = iconMap[card.title] || <BsCode className="w-6 h-6" />;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative h-[500px] w-full overflow-hidden rounded-3xl cursor-pointer"
              >
                {/* 1. Background Image with Zoom Effect */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={card.image.url}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 hover:opacity-20"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 hover:backdrop-blur-md via-black/70 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                </div>

                {/* 2. Floating Icon Badge */}
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white shadow-lg group-hover:bg-red-600 group-hover:border-red-600 transition-colors duration-300">
                  {icon}
                </div>

                {/* 3. Content Area */}
                {/* Added 'pb-12' here to lift everything up from the bottom edge */}
                <div className="absolute bottom-0 left-0 w-full px-8 pb-12 flex flex-col justify-end h-full pointer-events-none">
                  {/* Container that slides up on hover */}
                  <div className="transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight drop-shadow-md">
                      {card.title}
                    </h3>

                    {/* Description - Collapsible */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                      <div className="overflow-hidden">
                        <p className="text-gray-200 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {/* Call to Action Button - RED PILL */}
                    {/* Added 'mt-6' to give breathing room between text and button */}
                    <div className="mt-6 pointer-events-auto">
                      <Link 
  href={card.link?.path || "#"} 
  className="..."
  // Add this line to give context to screen readers/bots
  aria-label={`Learn more about ${card.title}`} 
>
  <span className="mr-2">{card.link?.name || "Learn More"}</span>
  <BsArrowRight ... />
</Link>
                    </div>
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
