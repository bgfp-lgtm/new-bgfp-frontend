"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import {
  BsArrowRight,
  BsTelephone,
  BsX,
  BsGeoAlt,
  BsEnvelope,
} from "react-icons/bs"; // Added icons for ContactModal
import { FaTimes, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

// --- 1. Quote Form Modal (Get Your Quote) ---
const QuoteFormModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-zinc-900/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-lg rounded-3xl p-8 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-red-600 transition-colors"
        >
          <FaTimes size={24} />
        </button>

        <div className="mb-8">
          <span className="text-red-600 font-mono text-xs font-bold uppercase tracking-widest mb-2 block">
            Get in Touch
          </span>
          <h3 className="text-3xl font-bold text-zinc-900">
            Start Your Project
          </h3>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="hello@company.com"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
              Phone (Optional)
            </label>
            <input
              type="tel"
              placeholder="Your Phone Number"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
              Inquiry Type
            </label>
            <div className="relative">
              <select
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>
                  Select an Option
                </option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Film Production">Film Production</option>
                <option value="Marketing">Marketing</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
              Project Details
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about your project..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="group/submit flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 mt-4 bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg hover:-translate-y-1"
          >
            <span>Send Request</span>
            <FaArrowRight className="transition-transform duration-300 group-hover/submit:translate-x-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

// --- 2. Contact Modal (Contact Us) ---
const ContactModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl overflow-hidden text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full z-50 cursor-pointer"
          >
            <BsX className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Header Icon */}
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-red-100">
              <BsTelephone className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">Get in Touch</h3>
              <p className="text-gray-500 text-sm">
                We'd love to hear from you. Reach out to us directly or visit
                our contact page.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-100" />

            {/* Contact Details */}
            <div className="w-full space-y-4 text-left">
              {/* Address */}
              <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="mt-1 text-red-500">
                  <BsGeoAlt className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Address
                  </p>
                  <p className="text-gray-800 font-medium text-sm leading-relaxed">
                    Seymour Road London,
                    <br />
                    UK N8 0BH
                  </p>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="mt-1 text-red-500">
                  <BsEnvelope className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Contact Info
                  </p>
                  <p className="text-gray-800 font-medium text-sm">
                    bgfp@birthgiverfilmproduction.com
                  </p>
                  <p className="text-gray-800 font-medium text-sm mt-1">
                    +44 7776 842718
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button to Contact Page */}
            <Link
              href="/contact"
              className="w-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-4 rounded-xl transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2 group"
            >
              <span>Go to Contact Page</span>
              <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function CTASectionTwo() {
  // activeModal state: 'quote' | 'contact' | null
  const [activeModal, setActiveModal] = useState<"quote" | "contact" | null>(
    null
  );

  return (
    <>
      {/* Render Modals */}
      <QuoteFormModal
        isOpen={activeModal === "quote"}
        onClose={() => setActiveModal(null)}
      />
      <ContactModal
        isOpen={activeModal === "contact"}
        onClose={() => setActiveModal(null)}
      />

      <div className="max-w-8xl mx-auto px-4 md:px-8 my-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 sm:px-16 sm:py-24 shadow-2xl"
        >
          {/* --- BACKGROUND IMAGE SECTION START --- */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/bg.jpg"
              alt="CTA Background"
              fill
              className="object-cover"
              priority
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/35" />
          </div>
          {/* --- BACKGROUND IMAGE SECTION END --- */}

          {/* Background Decor: Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none z-0"></div>

          {/* Content Section */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            {/* Static Title */}
            <h3 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl leading-tight">
              Ready to bring your vision to life?
            </h3>

            {/* Static Description */}
            <p className="mb-10 max-w-2xl text-lg text-white">
              Join hundreds of satisfied clients. Let's create something
              extraordinary together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Primary Button - Opens Quote Form */}
              <button
                onClick={() => setActiveModal("quote")}
                className="group relative inline-flex items-center justify-center bg-transparent text-white border border-red-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] cursor-pointer hover:-translate-y-1"
              >
                <span className="mr-2">{"Get Your Quote"}</span>
                <BsArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary Button - Opens Contact Modal */}
              <button
                onClick={() => setActiveModal("contact")}
                className="group inline-flex items-center justify-center bg-transparent border border-white/50 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-black cursor-pointer hover:border-white/40"
              >
                <BsTelephone className="w-5 h-5 mr-2 text-gray-400 group-hover:text-black transition-colors" />
                <span>Contact Us</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-white">
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
    </>
  );
}
