"use client";

import Link from "next/link";
// Removed unused Fa imports
import { motion } from "framer-motion";
import { BsArrowRight, BsTelephone } from "react-icons/bs";
import Image from "next/image"; // <--- 1. Import Image

export default function CTASectionTwo() {
  return (
    <div className="max-w-8xl mx-auto px-4 md:px-8 my-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        // 2. Removed 'bg-neutral-900' here. Kept relative, overflow-hidden, rounded, shadow.
        className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 sm:px-16 sm:py-24 shadow-2xl"
      >
        {/* --- 3. NEW BACKGROUND IMAGE SECTION START --- */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg.jpg"
            alt="CTA Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay to ensure white text readability.
              Adjust 'bg-black/80' to 'bg-black/60' or 'bg-black/90' to tune brightness. */}
          <div className="absolute inset-0 bg-black/35" />
        </div>
        {/* --- BACKGROUND IMAGE SECTION END --- */}

        {/* Background Decor: Red/Blue Glows (These will sit on top of the dark overlay) */}
        {/* <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-red-600/20 blur-[100px] pointer-events-none z-0" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none z-0" /> */}

        {/* Background Decor: Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none z-0"></div>

        {/* Content Section (Has z-10 to stay on top) */}
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
            {/* Primary Button */}
            <Link
              href={"/contact"}
              className="group relative inline-flex items-center justify-center bg-transparent text-white border border-red-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] cursor-pointer hover:-translate-y-1"
            >
              <span className="mr-2">{"Get Your Quote"}</span>
              <BsArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Button */}
            <Link
              href={"/contact"}
              className="group inline-flex items-center justify-center bg-transparent border border-white/50 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-black cursor-pointer hover:border-white/40"
            >
              <BsTelephone className="w-5 h-5 mr-2 text-gray-400 group-hover:text-black transition-colors" />
              <span>Contact Us</span>
            </Link>
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
  );
}
