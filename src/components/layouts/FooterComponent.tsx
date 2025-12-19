"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsInstagram, BsLinkedin, BsTiktok } from "react-icons/bs";
import Image from "next/image";

export default function FooterComponent({ data }: any) {
  // Map social icons to the component array
  const icons = [BsInstagram, BsLinkedin, BsTiktok];

  // --- Form State ---
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setStatus("submitting");

      // Your provided Google Apps Script URL
      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbz_le-IdpRryQJHTL7TTl0aXRp5O3Zj0mD7y8vDa5R1kyB9PH5KzrAhxnu7ZCk3xDIGlg/exec";

      // Send data to the script
      // We include 'type: "newsletter"' so your script knows to put this in Sheet2
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          type: "newsletter",
        }),
      });

      setStatus("success");
      setEmail("");

      // Reset status to idle after 3 seconds so the user can see the button again if needed
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  return (
    <motion.footer
      id="contact"
      className="relative bg-neutral-950 text-neutral-300 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* --- Ambient Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Border Gradient */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-900/50 to-transparent" />

        {/* Red Glow (Top Right) */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-red-600/10 blur-[100px]" />

        {/* Cool Glow (Bottom Left) */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-900/10 blur-[100px]" />

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-10 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Section 1: Brand and Socials (Spans 4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Image
                src={"/logo.webp"}
                alt={"logo"}
                width={130}
                height={130}
                priority
                className="w-24 md:w-[180px] h-auto mb-5"
              />
              <p className="text-neutral-500 leading-relaxed text-sm max-w-xs">
                {data?.description}
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {data?.socials?.map((social: any, index: number) => {
                const IconComponent = icons[index] || BsInstagram;
                return (
                  <Link
                    key={social.id}
                    href={social.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Spacer Column (Optional) */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Section 2: Services (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {data?.services?.map((service: any) => (
                <li key={service.id}>
                  <Link
                    href={`/${service.path}`}
                    className="text-neutral-400 hover:text-red-500 transition-colors duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Company (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {data?.company?.map((item: any) => (
                <li key={item.id}>
                  <Link
                    href={`/${item.path}`}
                    className="text-neutral-400 hover:text-red-500 transition-colors duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Newsletter (Spans 3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors duration-500">
              <h4 className="text-white font-bold mb-2">{data?.loop?.title}</h4>
              <p className="text-neutral-400 text-xs mb-6 leading-relaxed">
                {data?.loop?.description}
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address"
                    placeholder="Your email address"
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500/50 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className={`w-full rounded-xl font-semibold text-sm py-3 transition-all flex items-center justify-center gap-2 group
                    ${
                      status === "success"
                        ? "bg-green-600 text-white"
                        : status === "error"
                        ? "bg-red-800 text-white"
                        : "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20 hover:shadow-red-900/40"
                    }
                  `}
                >
                  {status === "submitting" ? (
                    "Subscribing..."
                  ) : status === "success" ? (
                    "Subscribed!"
                  ) : status === "error" ? (
                    "Try Again"
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-neutral-500 text-[10px] leading-tight">
                  {data?.loop?.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Locations & Copyright */}
        <div className="mt-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-neutral-500">
          {/* We Work With - Horizontal List */}
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="text-neutral-300 font-semibold">We work in:</span>
            {data?.workWith?.map((location: any, index: number) => (
              <span key={location.id} className="flex items-center">
                {index > 0 && <span className="mx-2 text-neutral-700">•</span>}
                <span className="text-neutral-400">{location.name}</span>
              </span>
            ))}
            <span className="mx-2 text-neutral-700">•</span>
            <span className="text-red-500 font-medium">Global</span>
          </div>

          <div className="text-right">{data?.rights}</div>
        </div>
      </div>
    </motion.footer>
  );
}
