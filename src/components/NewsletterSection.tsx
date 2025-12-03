"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your subscribe logic here
    console.log("Subscribed:", email);
  };

  return (
    <section className="w-full py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-zinc-900 rounded-[2.5rem] overflow-hidden p-8 md:p-16 lg:p-20 shadow-2xl"
        >
          {/* Background Ambient Glows */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-zinc-700/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                Turning bold ideas into
                <span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-orange-400">
                  measurable impact!
                </span>
              </h2>

              <p className="text-lg text-zinc-400 font-medium">
                Stay ahead of the curve. Get the latest industry trends,
                strategic insights, and agency news delivered directly to your
                inbox.
              </p>

              {/* Pill Shaped Form */}
              <form
                onSubmit={handleSubmit}
                className="relative max-w-md w-full"
              >
                <input
                  type="email"
                  placeholder="Enter your work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 rounded-full py-5 pl-8 pr-36 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all backdrop-blur-sm"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 text-white px-6 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20 flex items-center gap-2 group"
                >
                  <span>Subscribe</span>
                  <FaPaperPlane className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                  alt="Creative team brainstorming"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Badge on Image */}
                <div className="absolute bottom-6 left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg">
                  <span className="text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    Agency Insights
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
