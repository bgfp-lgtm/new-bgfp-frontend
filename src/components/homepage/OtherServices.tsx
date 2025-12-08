"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BsCameraVideo,
  BsBuilding,
  BsMusicNote,
  BsTv,
  BsPhone,
  BsX,
  BsQuestion,
  BsArrowRight,
  BsTelephone,
} from "react-icons/bs";
import Link from "next/link";
import Image from "next/image"; // <--- 1. Imported Image

// --- Component Helpers ---

const ICON_MAP: { [key: string]: React.ReactNode } = {
  "Event Coverage": <BsCameraVideo className="w-6 h-6" />,
  "Corporate Videos": <BsBuilding className="w-6 h-6" />,
  "Music Video Production": <BsMusicNote className="w-6 h-6" />,
  "TV and Digital Commercials": <BsTv className="w-6 h-6" />,
  "Digital Content Creation": <BsPhone className="w-6 h-6" />,
};

// Contact Modal (Unchanged)
const ContactModal = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <BsX className="w-6 h-6" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <BsTelephone className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Get Your Quote
            </h3>
            <p className="text-gray-600">
              We'll get back to you within 24 hours.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl text-center text-gray-500 border border-gray-100">
              {/* Placeholder for form or contact info */}
              <p>Contact Details / Form Area</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Service Card (Unchanged)
const ServiceCard = ({ service }: { service: any }) => (
  <div className="group relative bg-white p-8 h-full border-r border-gray-100 min-w-[300px] md:min-w-[400px] flex flex-col justify-between hover:bg-red-50/30 transition-colors duration-300">
    <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-red-600 transition-colors duration-300" />
    <div>
      <div className="flex items-center justify-center w-14 h-14 bg-linear-to-br from-red-500 to-red-600 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
        <div className="text-white">{service.icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-red-600 transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
        {service.description}
      </p>
    </div>
    <Link
      href={service.link?.path || "#"}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-xs transition-all duration-300 bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg hover:-translate-y-1 mt-auto w-fit"
    >
      <span>{service.link?.name || "Learn More"}</span>
      <svg
        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
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
);

// --- Main Component ---
export default function OtherServices({ data, readyData }: any) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 1. Prepare Data
  const services =
    data?.cards?.map((card: any) => ({
      id: card.id,
      title: card.title,
      description: card.description,
      link: card.link,
      icon: ICON_MAP[card.title] || <BsQuestion className="w-6 h-6" />,
    })) || [];

  if (!services || services.length === 0) {
    return null;
  }

  // 2. Duplicate Data for Infinite Loop
  const marqueeServices = [...services, ...services];

  return (
    <>
      <ContactModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        data={readyData}
      />

      <div className="w-full py-10 bg-linear-to-br from-gray-50 to-white overflow-hidden">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-20 text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
          >
            {data?.title || "Our Other Services"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8"
          >
            {data?.description ||
              "Find the perfect production service for your needs."}
          </motion.p>
        </div>

        {/* 3. The Infinite Auto-Scroll Track */}
        <div className="relative w-full bg-white border-y border-gray-100 shadow-inner">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Define CSS Keyframes and Class locally */}
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track {
              animation: marquee 25s linear infinite;
            }
            /* Pause animation when the track is hovered */
            .marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="flex overflow-hidden px-4 md:px-10">
            {/* Switched from motion.div to standard div with CSS class */}
            <div className="flex gap-0 marquee-track">
              {marqueeServices.map((service, index) => (
                <ServiceCard key={`${service.id}-${index}`} service={service} />
              ))}
            </div>
          </div>
        </div>

        {/* --- ATTRACTIVE BOTTOM CTA SECTION --- */}
        <div className="max-w-8xl mx-auto px-4 md:px-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            // Removed 'bg-neutral-900', kept relative and overflow-hidden
            className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 sm:px-16 sm:py-24"
          >
            {/* --- NEW BACKGROUND IMAGE LOGIC --- */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/bg.jpg"
                alt="CTA Background"
                fill
                className="object-cover"
                priority
              />
              {/* Dark Overlay because text is white. 
                  Adjust 'bg-black/80' to 'bg-black/60' if you want image to be brighter. */}
              <div className="absolute inset-0 bg-black/80" />
            </div>

            {/* Background Decor: Red Glows (Kept, but on top of image/overlay) */}
            {/* <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-red-600/20 blur-[100px] pointer-events-none z-0" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none z-0" /> */}

            {/* Background Decor: Grid Pattern (Optional, can remove if looks busy) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none z-0"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <h3 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl leading-tight">
                {readyData?.title || "Ready to bring your vision to life?"}
              </h3>

              <p className="mb-10 max-w-2xl text-lg text-gray-400">
                {readyData?.description ||
                  "Join hundreds of satisfied clients. Let's create something extraordinary together."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* Primary Button */}
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="group relative inline-flex items-center justify-center bg-transparent text-white border border-red-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] cursor-pointer hover:-translate-y-1"
                >
                  <span className="mr-2">
                    {readyData?.quote?.name || "Get Your Quote"}
                  </span>
                  <BsArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {/* Secondary Button */}
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="group inline-flex items-center justify-center bg-transparent border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white/10 cursor-pointer hover:border-white/40"
                >
                  <BsTelephone className="w-5 h-5 mr-2 text-gray-400 group-hover:text-white transition-colors" />
                  <span>Contact Us</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Fast Response
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Free Consultation
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
