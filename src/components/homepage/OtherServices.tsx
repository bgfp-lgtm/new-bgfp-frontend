"use client";

import React, { useState, useEffect } from "react";
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
  BsEnvelope,
  BsGeoAlt,
} from "react-icons/bs";
import { FaArrowRight, FaTimes, FaPaperPlane } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

// --- Component Helpers ---

const ICON_MAP: { [key: string]: React.ReactNode } = {
  "Event Coverage": <BsCameraVideo className="w-6 h-6" />,
  "Corporate Videos": <BsBuilding className="w-6 h-6" />,
  "Music Video Production": <BsMusicNote className="w-6 h-6" />,
  "TV and Digital Commercials": <BsTv className="w-6 h-6" />,
  "Digital Content Creation": <BsPhone className="w-6 h-6" />,
};

// --- Updated Contact Modal ---
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
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full z-50 cursor-pointer"
          >
            <BsX className="w-6 h-6" />
          </button>

          <div className="relative z-10 flex flex-col items-center gap-6">
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

            <div className="w-full h-px bg-gray-100" />

            <div className="w-full space-y-4 text-left">
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

// --- New Quote Form Modal with Google Sheets Integration ---
const QuoteFormModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setStatus("idle"); // Reset status when closing
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || !form.inquiryType) {
      setStatus("error");
      return;
    }

    try {
      setStatus("submitting");
      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbz_le-IdpRryQJHTL7TTl0aXRp5O3Zj0mD7y8vDa5R1kyB9PH5KzrAhxnu7ZCk3xDIGlg/exec";

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
      });

      // Close modal after a delay on success
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

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

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
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
              name="email"
              required
              value={form.email}
              onChange={handleChange}
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
              name="phone"
              value={form.phone}
              onChange={handleChange}
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
                name="inquiryType"
                required
                value={form.inquiryType}
                onChange={handleChange}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all appearance-none cursor-pointer"
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
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group/submit flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 mt-4 bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg hover:-translate-y-1"
          >
            <span>
              {status === "submitting"
                ? "Processing..."
                : status === "success"
                ? "Sent!"
                : "Send Request"}
            </span>
            {status === "success" ? (
              <FaPaperPlane />
            ) : (
              <FaArrowRight className="transition-transform duration-300 group-hover/submit:translate-x-1" />
            )}
          </button>

          {status === "error" && (
            <p className="mt-2 text-red-600 text-center text-xs font-bold uppercase tracking-widest">
              * Please fill out all required fields.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

// Service Card
const ServiceCard = ({ service }: { service: any }) => (
  <Link
    href="/services"
    className="group relative bg-white p-8 h-full border-r border-gray-100 min-w-[300px] md:min-w-[400px] flex flex-col justify-between hover:bg-red-50/30 transition-colors duration-300 block cursor-pointer"
  >
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
    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-xs transition-all duration-300 bg-transparent border border-red-600 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-lg group-hover:-translate-y-1 mt-auto w-fit">
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
    </div>
  </Link>
);

// --- Main Component ---
export default function OtherServices({ data, readyData }: any) {
  const [activeModal, setActiveModal] = useState<"contact" | "quote" | null>(
    null
  );

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

  const marqueeServices = [...services, ...services];

  return (
    <>
      <ContactModal
        isOpen={activeModal === "contact"}
        onClose={() => setActiveModal(null)}
        data={readyData}
      />

      <QuoteFormModal
        isOpen={activeModal === "quote"}
        onClose={() => setActiveModal(null)}
      />

      <div className="w-full py-10 bg-linear-to-br from-gray-50 to-white overflow-hidden">
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

        <div className="relative w-full bg-white border-y border-gray-100 shadow-inner">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track {
              animation: marquee 25s linear infinite;
            }
            .marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="flex overflow-hidden px-4 md:px-10">
            <div className="flex gap-0 marquee-track">
              {marqueeServices.map((service, index) => (
                <ServiceCard key={`${service.id}-${index}`} service={service} />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-8xl mx-auto px-4 md:px-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 sm:px-16 sm:py-24"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/bg.jpg"
                alt="CTA Background"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/35" />
            </div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none z-0"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <h3 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl leading-tight">
                {readyData?.title || "Ready to bring your vision to life?"}
              </h3>

              <p className="mb-10 max-w-2xl text-lg text-white">
                {readyData?.description ||
                  "Join hundreds of satisfied clients. Let's create something extraordinary together."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModal("quote")}
                  className="group relative inline-flex items-center justify-center bg-transparent text-white border border-red-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] cursor-pointer hover:-translate-y-1"
                >
                  <span className="mr-2">
                    {readyData?.quote?.name || "Get Your Quote"}
                  </span>
                  <BsArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => setActiveModal("contact")}
                  className="group inline-flex items-center justify-center bg-transparent border border-white/50 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-black cursor-pointer hover:border-white/40"
                >
                  <BsTelephone className="w-5 h-5 mr-2 text-gray-400 group-hover:text-black transition-colors" />
                  <span>Contact Us</span>
                </button>
              </div>

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
      </div>
    </>
  );
}
