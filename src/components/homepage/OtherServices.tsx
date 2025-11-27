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
  BsEnvelope,
  BsTelephone,
  BsGeoAlt,
  BsChevronLeft,
  BsChevronRight,
  BsQuestion,
} from "react-icons/bs";
import Link from "next/link";
import { useInfiniteCarousel } from "@/hooks/useInfiniteCarousel";
// Assuming you save the hook in a 'hooks' folder

// --- Component Helpers ---

// Maps icons to the titles from your Strapi data
const ICON_MAP: { [key: string]: React.ReactNode } = {
  "Event Coverage": <BsCameraVideo className="w-6 h-6" />,
  "Corporate Videos": <BsBuilding className="w-6 h-6" />,
  "Music Video Production": <BsMusicNote className="w-6 h-6" />,
  "TV and Digital Commercials": <BsTv className="w-6 h-6" />,
  "Digital Content Creation": <BsPhone className="w-6 h-6" />,
};

// Component for the Contact Pop-up Modal
const ContactModal = ({
  isOpen,
  onClose,
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
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <BsX className="w-6 h-6" />
          </button>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Get Your Quote
            </h3>
            <p className="text-gray-600">Contact us for a personalized quote</p>
          </div>

          {/* Contact Details (hardcoded, using data if available) */}
          <div className="space-y-4">
            {/* Phone */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <BsTelephone className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-800">Phone</p>
                <p className="text-gray-600">+44 7776 842718</p>
              </div>
            </div>
            {/* Email */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <BsEnvelope className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-800">Email</p>
                <p className="text-gray-600">
                  bgfp@birthgiverfilmproduction.com
                </p>
              </div>
            </div>
            {/* Address */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <BsGeoAlt className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-800">Address</p>
                <p className="text-gray-600">Seymour Road London, UK N8 0BH</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => window.open("tel:+447776842718")}
              className="w-full bg-red-600 text-white py-3 cursor-pointer rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <BsTelephone className="w-4 h-4 mr-2" />
              Call Now
            </button>
            <button
              onClick={() =>
                window.open("mailto:bgfp@birthgiverfilmproduction.com")
              }
              className="w-full bg-gray-100 text-gray-800 cursor-pointer py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <BsEnvelope className="w-4 h-4 mr-2" />
              Send Email
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Component for a single service card
const ServiceCard = ({ service, index }: { service: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.16, 1, 0.3, 1],
    }}
    whileHover={{
      y: -8,
      scale: 1.02,
      transition: { duration: 0.2 },
    }}
    className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 relative overflow-hidden flex flex-col"
  >
    {/* Background Gradient */}
    <div className="absolute inset-0 bg-linear-to-br from-red-50/0 to-red-50/0 group-hover:from-red-50/20 group-hover:to-red-50/10 transition-all duration-300" />

    {/* Icon */}
    <div className="flex items-center justify-center w-16 h-16 bg-linear-to-br from-red-500 to-red-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
      <div className="text-white">{service.icon}</div>
    </div>

    {/* Content */}
    <div className="grow">
      <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-red-600 transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-6">
        {service.description}
      </p>
    </div>

    {/* Learn More Link (Styled as a Link) */}
    <Link
      href={service.link?.path || "#"}
      className="flex items-center text-red-600 font-medium group-hover:text-red-700 transition-colors duration-300 mt-auto"
    >
      <span className="mr-2">{service.link?.name || "Learn More"}</span>
      {/* SVG Arrow icon */}
      <svg
        className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
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
  </motion.div>
);

// --- Main Component ---
export default function OtherServices({ data, readyData }: any) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // --- Create services array from dynamic data ---
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

  // --- Use the custom hook for carousel logic ---
  const carousel = useInfiniteCarousel(services.length);

  // Helper to render service cards for a given slide chunk
  const renderSlideChunk = (slideIndex: number, keyPrefix: string) => {
    const start = slideIndex * 3;
    const end = start + 3;
    return (
      <div key={`${keyPrefix}-${slideIndex}`} className="w-full shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {services.slice(start, end).map((service: any, index: number) => (
            <ServiceCard
              key={`${keyPrefix}-${service.id}`}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  };

  // Create slides for infinite loop: [Last Real] + [All Real] + [First Real]
  const slidesToRender = [
    renderSlideChunk(carousel.totalRealSlides - 1, "dup-start"), // Duplicate last slide (Index 0 in carousel)
    ...Array.from({ length: carousel.totalRealSlides }, (_, index) =>
      renderSlideChunk(index, "orig")
    ), // All original slides (Index 1 to N)
    renderSlideChunk(0, "dup-end"), // Duplicate first slide (Index N+1 in carousel)
  ];
  // ------------------------------------------------

  return (
    <>
      {/* 1. Contact Pop-up Modal */}
      <ContactModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        data={readyData}
      />

      <div className="w-full px-4 md:px-20 py-20 bg-linear-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* 2. Header and Main CTA Section */}
          <div className="relative text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-bold mb-6 bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              {data?.title || "Our Other Services"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              {data?.description ||
                "Find the perfect production service for your needs, from corporate branding to music videos."}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.8,
              }}
              onClick={() => setIsPopupOpen(true)}
              className="bg-linear-to-r from-red-600 cursor-pointer to-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300 inline-flex items-center group"
            >
              {data?.link?.name || "GET YOUR QUOTE NOW"}
              {/* SVG Arrow */}
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.button>
          </div>

          {/* 3. Services Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
            onMouseEnter={() => carousel.setIsHovered(true)}
            onMouseLeave={() => carousel.setIsHovered(false)}
          >
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-2xl py-12 -my-12">
              <motion.div
                className={`flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${carousel.transitionClass}`}
                style={carousel.slideStyle}
              >
                {slidesToRender}
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <motion.button
              onClick={carousel.prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl rounded-full p-3 text-gray-600 hover:text-red-600 transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 border border-gray-200 hover:border-red-200"
              aria-label="Previous slide"
            >
              <BsChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={carousel.nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl rounded-full p-3 text-gray-600 hover:text-red-600 transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 border border-gray-200 hover:border-red-200"
              aria-label="Next slide"
            >
              <BsChevronRight className="w-5 h-5" />
            </motion.button>

            {/* Progress Indicator Dots */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                {Array.from(
                  { length: carousel.totalRealSlides },
                  (_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        carousel.activeDotIndex === index
                          ? "bg-red-600 w-8"
                          : "bg-gray-300 w-3"
                      }`}
                    />
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* 4. Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="text-center bg-gray-900 rounded-2xl p-12 relative overflow-hidden mt-10"
          >
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-linear-to-br from-red-600/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/5 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4 text-white">
                {readyData?.title}
              </h3>
              <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                {readyData?.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPopupOpen(true)}
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg border-2 border-red-600 flex items-center"
                >
                  {readyData?.quote?.name}
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(`tel:${readyData?.call?.path}`)}
                  className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 flex items-center"
                >
                  <BsTelephone className="w-5 h-5 mr-2" />
                  {readyData?.call?.name}
                </motion.button>
              </div>

              <div className="mt-8 flex justify-center items-center space-x-8 text-gray-400 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                  {readyData?.support}
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                  {readyData?.response}
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                    {readyData?.discrete}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
