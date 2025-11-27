"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsInstagram, BsLinkedin, BsTiktok } from "react-icons/bs";

export default function FooterComponent({ data }: any) {
  // Map social icons to the component array
  const icons = [BsInstagram, BsLinkedin, BsTiktok];

  return (
    <motion.footer
      id="contact"
      className="relative bg-gray-950 text-gray-300"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gray-800 to-transparent" />
        <div className="absolute -top-24 right-0 w-72 h-72 rounded-full bg-red-600/10 blur-3xl" />
      </div>

      <div className="max-w-8xl mx-auto px-6 md:px-10 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Section 1: Brand and Socials */}
          <div>
            <h3 className="text-white text-2xl font-bold tracking-wide mb-3">
              {data?.title}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              {data?.description}
            </p>
            <div className="flex items-center w-full gap-4 lg:gap-16 text-gray-400">
              {data?.socials?.map((social: any, index: number) => {
                const IconComponent = icons[index];
                return (
                  <Link
                    key={social.id}
                    href={social.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-6 h-6" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section 2: Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {data?.services?.map((service: any) => (
                <li
                  key={service.id}
                  className="hover:text-white transition-colors"
                >
                  <Link href={`/${service.path}`}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {data?.company?.map((item: any) => (
                <li
                  key={item.id}
                  className="hover:text-white transition-colors"
                >
                  <Link href={`/${item.path}`}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: We Work With */}
          <div>
            <h4 className="text-white font-semibold mb-4">We Work With</h4>
            <ul className="space-y-2 text-sm">
              {data?.workWith?.map((location: any) => (
                <li key={location.id} className="text-gray-400">
                  {location.name}
                </li>
              ))}
              <li className=" text-red-400">and across the globe</li>
            </ul>
          </div>

          {/* Section 5: Stay in the loop (Newsletter) */}
          {/* Newsletter Section - Wrapped in a container for better layout separation */}
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
            <h4 className="text-white font-semibold mb-3">
              {data?.loop?.title}
            </h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {data?.loop?.description}
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-col gap-3 items-center"
            >
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="Your email address"
                // FIX: Added 'sm:flex-1' to make it expand to fill space on desktop
                className="w-full sm:flex-1 rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                // FIX: Added 'w-full sm:w-auto' so it shrinks to text width on desktop
                className=" rounded-lg bg-red-600 hover:bg-red-700 text-white p-1 w-full text-sm font-medium py-3 transition-colors whitespace-nowrap shadow-lg shadow-red-900/20 flex items-center justify-center"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-md w-full text-gray-600">
              {data?.loop?.subtitle}
            </p>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div>{data?.rights}</div>
          {/* Legal pages removed until implemented */}
        </div>
      </div>
    </motion.footer>
  );
}
