"use client";

import { useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaTimes } from "react-icons/fa";

export default function ServiceCard({
  service,
  imageUrl,
}: {
  service: any;
  imageUrl: string | null;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent scrolling when modal is open
  const toggleModal = (state: boolean) => {
    setIsModalOpen(state);
    if (state) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  return (
    <>
      {/* --- SERVICE CARD UI --- */}
      <div className="group relative bg-white h-full flex flex-col p-8 md:p-10 transition-all duration-500 hover:z-10 shadow-sm hover:shadow-md border border-zinc-100/50">
        {/* 1. IMAGE */}
        <div className="relative w-full mb-6 overflow-hidden bg-zinc-50 rounded-lg aspect-video">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-300 text-sm font-mono border border-zinc-100">
              IMAGE NOT FOUND
            </div>
          )}
        </div>

        {/* 2. TITLE */}
        <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6 tracking-tight">
          {service.title}
        </h3>

        {/* 3. DESCRIPTION */}
        <p className="text-zinc-500 text-base leading-relaxed mb-8 flex-grow">
          {service.description}
        </p>

        {/* 4. BUTTON (Main Card) */}
        <div className="mt-auto w-full">
          <button
            onClick={() => toggleModal(true)}
            className="group/btn flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-md transition-all duration-300 cursor-pointer bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg hover:-translate-y-1"
          >
            <span>Start Project</span>
            <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      {/* --- MODAL / POPUP --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-zinc-900/90 backdrop-blur-sm transition-opacity"
            onClick={() => toggleModal(false)}
          />

          <div className="relative bg-white w-full max-w-lg rounded-3xl p-8 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => toggleModal(false)}
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

              {/* --- UPDATED SUBMIT BUTTON --- */}
              <button
                type="submit"
                className="group/submit flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 mt-4 
                
                /* Inactive State (Ghost) */
                bg-transparent border border-red-600 text-red-600 
                
                /* Hover State (Filled & Animated) */
                hover:bg-red-600 hover:text-white hover:shadow-lg hover:-translate-y-1"
              >
                <span>Send Request</span>
                <FaArrowRight className="transition-transform duration-300 group-hover/submit:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
