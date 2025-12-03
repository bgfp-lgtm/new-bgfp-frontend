/*  */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import CTASection from "@/components/CTASection";
import {
  FaArrowRight,
  FaPlus,
  FaMinus,
  FaBullhorn,
  FaChartLine,
} from "react-icons/fa";
import Link from "next/link";

export default function MarketingStrategyPage() {
  const [activeTrend, setActiveTrend] = useState<number | null>(0);

  const toggleTrend = (index: number) => {
    setActiveTrend(activeTrend === index ? null : index);
  };

  const pillars = [
    {
      title: "Traditional Media",
      description:
        "The foundation of mass awareness. Print, Broadcast, OOH, and Direct Mail strategies for broad demographic targeting and high-trust local presence.",
      image:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop",
      icon: <FaBullhorn className="w-4 h-4" />,
    },
    {
      title: "Digital Ecosystems",
      description:
        "Precision targeting with real-time attribution. SEO, SEM, Social Commerce, and Content Engines driving modern growth.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      icon: <FaChartLine className="w-4 h-4" />,
    },
  ];

  const steps = [
    {
      title: "Market Research",
      desc: "Data-driven insights into customer behavior.",
    },
    {
      title: "Identify Goals",
      desc: "Define clear, measurable objectives (KPIs, ROAS).",
    },
    {
      title: "Target Audience",
      desc: "Create detailed personas and understand pain points.",
    },
    {
      title: "Competitor Analysis",
      desc: "Identify gaps in the market and capitalize on them.",
    },
    {
      title: "Value Proposition",
      desc: "Define your unique angle and why you matter.",
    },
    {
      title: "Budget Allocation",
      desc: "Strategic resource distribution for maximum impact.",
    },
    {
      title: "Content Strategy",
      desc: "Crafting the narrative and tone of voice.",
    },
    { title: "Launch Campaign", desc: "Execution across selected channels." },
    {
      title: "Monitor & Optimize",
      desc: "Real-time analytics and performance tuning.",
    },
  ];

  const trends = [
    {
      title: "AI Integration",
      desc: "Automating personalization and predictive analytics.",
    },
    {
      title: "Data Analytics",
      desc: "Leveraging big data for granular decision making.",
    },
    {
      title: "Social Commerce",
      desc: "Seamless shopping experiences within social apps.",
    },
    {
      title: "Video Dominance",
      desc: "Short-form and live streaming as primary drivers.",
    },
    {
      title: "Hyper-Personalization",
      desc: "Individualized customer journeys at scale.",
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
            <source src="/marketing.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto border-t border-white/20 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/80">
              Global Strategy
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 text-white max-w-6xl">
            Marketing <br /> & Strategy
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed">
              Comprehensive solutions to maximize reach. We don't just guess; we
              engineer impact through data and creativity.
            </p>

            <div className="flex items-center gap-4 text-white/60 text-xs font-mono uppercase tracking-widest">
              <span>Scroll to Analyze</span>
              <div className="h-px w-12 bg-white/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. Core Pillars (Architectural Grid - 2 Cols) --- */}
      <section className="relative w-full px-6 md:px-12 py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-200 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                Strategic Channels
              </h2>
              <p className="text-zinc-500 font-medium">
                Bridging the gap between traditional trust and digital
                precision.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="group relative bg-white h-full min-h-[500px] flex flex-col justify-between overflow-hidden hover:bg-zinc-50 transition-colors duration-500"
              >
                {/* Header */}
                <div className="p-8 md:p-10 pb-0 flex justify-between items-start">
                  <span className="text-xs font-mono text-zinc-300">
                    0{index + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors duration-300">
                    <FaArrowRight className="w-3 h-3 text-zinc-300 -rotate-45 group-hover:rotate-0 group-hover:text-white transition-all duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 relative z-10 max-w-lg">
                  <h3 className="text-3xl font-bold text-zinc-900 mb-4 leading-tight group-hover:translate-x-1 transition-transform duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-8 opacity-80 group-hover:opacity-100">
                    {pillar.description}
                  </p>
                </div>

                {/* Image Reveal */}
                <div className="relative w-full aspect-video overflow-hidden mt-auto border-t border-zinc-100">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-overlay"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. The Blueprint (Grid - 3 Cols) --- */}
      <section className="relative w-full px-6 md:px-12 pb-24 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-200 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                The Blueprint
              </h2>
              <p className="text-zinc-500 font-medium">
                Our proven methodology for market dominance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group bg-white p-8 md:p-10 hover:bg-zinc-50 transition-colors duration-500 min-h-[300px] flex flex-col"
              >
                <div className="mb-auto">
                  <span className="text-4xl font-black text-zinc-100 group-hover:text-red-600 transition-colors duration-300">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:translate-x-1 transition-transform duration-300">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. 2025 Forecast (Clean Accordion) --- */}
      <section className="w-full px-6 md:px-12 pb-24 bg-white">
        <div className="max-w-screen-2xl mx-auto bg-zinc-50 rounded-3xl p-8 md:p-16">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              2025 Forecast
            </h2>
            <p className="text-zinc-500">
              Emerging trends that define the future landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
            {trends.map((trend, i) => (
              <div key={i} className="border-b border-zinc-200">
                <button
                  onClick={() => toggleTrend(i)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span
                    className={`text-xl font-bold transition-colors duration-300 ${
                      activeTrend === i
                        ? "text-red-600"
                        : "text-zinc-900 group-hover:text-red-600"
                    }`}
                  >
                    {trend.title}
                  </span>
                  <div
                    className={`transition-transform duration-300 p-2 rounded-full ${
                      activeTrend === i
                        ? "rotate-180 bg-red-100 text-red-600"
                        : "bg-zinc-200 text-zinc-500 group-hover:bg-red-50 group-hover:text-red-600"
                    }`}
                  >
                    {activeTrend === i ? (
                      <FaMinus size={12} />
                    ) : (
                      <FaPlus size={12} />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeTrend === i
                      ? "max-h-40 opacity-100 mb-6"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-zinc-600 leading-relaxed font-medium">
                    {trend.desc}
                  </p>
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
