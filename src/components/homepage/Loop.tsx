"use client";

import React, { useState, useEffect, useRef } from "react";
import LogoLoop from "./LogoLoop";
import { getStrapiMedia } from "@/lib/utils"; // Import your utility

const CountingNumber = ({
  end,
  duration = 2000,
  suffix = "",
  className = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className={className}>
      {count}
      {suffix}
    </div>
  );
};

export default function Loop({ data }: any) {
  const logos =
    data?.brands?.map((brand: any) => ({
      src: getStrapiMedia(brand.url), // Use the util
      alt: brand.name,
      title: brand.name,
      width: brand.width || 120,
      height: brand.height || 45,
    })) || [];

  const colors = [
    "text-blue-600 dark:text-blue-400",
    "text-green-600 dark:text-green-400",
    "text-purple-600 dark:text-purple-400",
    "text-red-600 dark:text-red-400",
  ];

  if (!data?.numbers || !data?.brands) return null;
  return (
    <section className="w-full py-10 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-8xl mx-auto px-6 md:px-10 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-blue-400 font-medium">
            {data.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {data.numbers.map((item: any, index: number) => {
            const numberValue = parseInt(item.number) || 0;
            const suffix = item.number.endsWith("+") ? "+" : "";
            const color = colors[index % colors.length];

            return (
              <div key={item.id} className="text-center group">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-100 dark:border-gray-700">
                  <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    {item.subtitleOne || <>&nbsp;</>}
                  </div>
                  <div
                    className={`text-4xl md:text-5xl font-bold ${color} mb-2`}
                  >
                    <CountingNumber
                      end={numberValue}
                      duration={2500}
                      suffix={suffix}
                      className="inline-block"
                    />
                  </div>

                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {item.subtitleTwo}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
