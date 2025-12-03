"use client";

import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import { FaArrowRight, FaCode } from "react-icons/fa";

export default function SoftwareDevelopmentPage() {
  const services = [
    {
      title: "Custom Web Apps",
      description:
        "Scalable, secure web applications tailored to business workflows.",
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&h=300&fit=crop&crop=center",
      link: "/services/web-apps",
    },
    {
      title: "Mobile Ecosystems",
      description:
        "High-performance native and cross-platform apps for iOS and Android.",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop&crop=center",
      link: "/services/mobile",
    },
    {
      title: "ERP & CRM",
      description:
        "Enterprise systems that streamline operations and enhance relationships.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop&crop=center",
      link: "/services/erp-crm",
    },
    {
      title: "API Integration",
      description: "Robust, secure APIs for seamless system communication.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop&crop=center",
      link: "/services/api",
    },
    {
      title: "Cloud Infrastructure",
      description:
        "Cloud-native applications and serverless architecture on AWS/Azure.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center",
      link: "/services/cloud",
    },
    {
      title: "E-Commerce",
      description:
        "Custom online stores with secure payment and subscription management.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop&crop=center",
      link: "/services/ecommerce",
    },
    {
      title: "Automation",
      description: "RPA solutions to reduce manual tasks and minimize errors.",
      image:
        "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=600&auto=format&fit=crop&q=60",
      link: "/services/automation",
    },
    {
      title: "UI/UX Engineering",
      description: "User-centered design creating clean, beautiful interfaces.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop&crop=center",
      link: "/services/ui-ux",
    },
  ];

  return (
    <main className="bg-white text-zinc-900 w-full min-h-screen selection:bg-red-600 selection:text-white">
      {/* --- 1. Cinematic Hero Section (Matched to Film Page) --- */}
      <section className="relative h-[90vh] w-full flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90"
          >
            <source src="/coding.mp4" type="video/mp4" />
          </video>
          {/* Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto border-t border-white/20 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/80">
              Engineering Division
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 text-white max-w-6xl">
            Software <br /> & Development
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed">
              We engineer robust digital products. From complex backend
              architectures to fluid frontend experiences, we build the future.
            </p>

            <div className="flex items-center gap-4 text-white/60 text-xs font-mono uppercase tracking-widest">
              <span>Scroll to Explore</span>
              <div className="h-px w-12 bg-white/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. Engineering Services (Architectural Grid) --- */}
      <section className="relative w-full px-6 md:px-12 py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-200 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                Core Competencies
              </h2>
              <p className="text-zinc-500 font-medium">
                Agnostic stack focus on performance, security, and scalability.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full">
              <FaCode className="text-zinc-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Full Stack
              </span>
            </div>
          </div>

          {/* The Grid: 4 Columns for Software (more density) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white h-full min-h-[450px] flex flex-col justify-between overflow-hidden hover:bg-zinc-50 transition-colors duration-500"
              >
                {/* Header: Number & Icon */}
                <div className="p-8 pb-0 flex justify-between items-start">
                  <span className="text-xs font-mono text-zinc-300">
                    0{index + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors duration-300">
                    <FaArrowRight className="w-3 h-3 text-zinc-300 -rotate-45 group-hover:rotate-0 group-hover:text-white transition-all duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 relative z-10">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-4 leading-tight group-hover:translate-x-1 transition-transform duration-300">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 opacity-80 group-hover:opacity-100 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Explicit CTA */}
                  <Link
                    href={service.link || "/contact"}
                    className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 group-hover:border-red-600 transition-colors duration-300"
                  >
                    View Stack
                    <FaArrowRight className="w-2 h-2 text-red-600 ml-1" />
                  </Link>
                </div>

                {/* Image Reveal (Bottom) */}
                <div className="relative w-full aspect-[4/3] overflow-hidden mt-auto border-t border-zinc-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-overlay"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
