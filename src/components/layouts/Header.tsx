"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { getStrapiMedia } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  data: {
    logo: { url: string; name: string };
    link: { id: number; name: string; path: string }[];
    cta: { id: number; name: string; path: string };
  };
}

export default function Header({ data }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [expandedLink, setExpandedLink] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false); // New state for scroll detection

  const pathname = usePathname();
  const logoUrl = getStrapiMedia(data?.logo?.url) || "/logo.png";

  const navLinks = [
    { id: 1, name: "Home", path: "/" },
    {
      id: 2,
      name: "Services",
      path: "/services",
      children: [
        { name: "Film Production", path: "/film-production" },
        { name: "Software Development", path: "/software-development" },
        { name: "Marketing Strategy", path: "/marketing-strategy" },
      ],
    },
    { id: 3, name: "About us", path: "/about-us" },
    { id: 4, name: "Projects", path: "/projects" },
    { id: 5, name: "Careers", path: "/careers" },
    { id: 6, name: "Blog Posts", path: "/blog" },
  ];

  // Handle Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls down more than 50px, toggle state
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Robust Active Link Checker
  const isActiveLink = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Check if any child is active to highlight the parent
  const isParentActive = (children: { path: string }[]) => {
    return children.some((child) => isActiveLink(child.path));
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedLink(null);
  };

  // Dynamic Background Logic
  // 1. If Menu is Open -> Keep Solid Black (so white text is visible over white menu)
  // 2. If Scrolled -> Transparent Black + Blur
  // 3. Default -> Solid Black
  const headerBackgroundClass = isMenuOpen
    ? "bg-black"
    : isScrolled
    ? "bg-black/80 backdrop-blur-md shadow-sm" // Reduced opacity + blur
    : "bg-black";

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-500 ${headerBackgroundClass}`}
    >
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-20 py-5">
        <Link href="/" passHref onClick={closeMenu}>
          <Image
            src={logoUrl}
            alt={data?.logo?.name || "logo"}
            width={130}
            height={130}
            priority
            className="w-24 md:w-[130px] h-auto"
          />
        </Link>

        {/* --- DESKTOP NAV --- */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link) => (
            <div
              key={link.id}
              className="relative"
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.children ? (
                /* --- RENDER AS SPAN (UNCLICKABLE) IF CHILDREN EXIST --- */
                <span
                  className={`flex items-center gap-1 text-sm transition-colors duration-300 cursor-default
                    ${
                      isParentActive(link.children)
                        ? "font-bold text-red-500"
                        : "font-medium text-white hover:text-red-500"
                    }
                  `}
                >
                  {link.name}
                  <FiChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      hoveredLink === link.id ? "rotate-180" : ""
                    }`}
                  />
                </span>
              ) : (
                /* --- RENDER AS LINK IF NORMAL ITEM --- */
                <Link
                  href={link.path}
                  className={`flex items-center gap-1 text-sm transition-colors duration-300 hover:text-red-500 
                    ${
                      isActiveLink(link.path)
                        ? "font-bold text-red-500"
                        : "font-medium text-white"
                    }
                  `}
                >
                  {link.name}
                </Link>
              )}

              {/* Dropdown Menu */}
              <AnimatePresence>
                {link.children && hoveredLink === link.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-6 w-64"
                  >
                    <div className="bg-neutral-900 border border-white/10 rounded-xl p-2 shadow-2xl overflow-hidden backdrop-blur-md">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200 
                            ${
                              isActiveLink(child.path)
                                ? "bg-red-600/10 text-red-500"
                                : "text-gray-300 hover:bg-white/5 hover:text-white"
                            }
                          `}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        {data?.cta && (
          <Link
            href={data.cta.path}
            className="hidden lg:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-red-500/20 text-red-600 transition-colors duration-300 hover:bg-red-200"
          >
            {data.cta.name}
          </Link>
        )}

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-md focus:ring-2 focus:ring-red-500 text-white"
        >
          {isMenuOpen ? (
            <RxCross2 className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full w-full px-6 overflow-y-auto">
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="absolute top-7 right-6 p-2 text-gray-700 focus:ring-2 focus:ring-red-500"
          >
            <RxCross2 className="h-8 w-8" />
          </button>

          <div className="flex flex-col items-center gap-6 w-full max-w-sm">
            {navLinks.map((link) => (
              <div key={link.id} className="w-full flex flex-col items-center">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    if (link.children) {
                      setExpandedLink(
                        expandedLink === link.id ? null : link.id
                      );
                    } else {
                      closeMenu();
                    }
                  }}
                >
                  {link.children ? (
                    /* --- MOBILE: CLICKING TEXT TOGGLES ACCORDION --- */
                    <div
                      className={`text-2xl text-gray-800 hover:text-red-500 ${
                        isParentActive(link.children)
                          ? "font-bold text-red-600"
                          : "font-semibold"
                      }`}
                    >
                      {link.name}
                    </div>
                  ) : (
                    /* --- MOBILE: CLICKING TEXT NAVIGATES --- */
                    <Link
                      href={link.path}
                      className={`text-2xl text-gray-800 hover:text-red-500 ${
                        isActiveLink(link.path)
                          ? "font-bold text-red-600"
                          : "font-semibold"
                      }`}
                      onClick={closeMenu}
                    >
                      {link.name}
                    </Link>
                  )}

                  {/* Mobile Chevron */}
                  {link.children && (
                    <FiChevronDown
                      className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                        expandedLink === link.id ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Mobile Submenu Accordion */}
                <AnimatePresence>
                  {link.children && expandedLink === link.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden w-full flex flex-col items-center gap-4 mt-4 bg-gray-50 rounded-xl"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          onClick={closeMenu}
                          className={`text-lg py-2 ${
                            isActiveLink(child.path)
                              ? "text-red-600 font-semibold"
                              : "text-gray-600"
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                      <div className="pb-2" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {data?.cta && (
              <Link
                href={data.cta.path}
                onClick={closeMenu}
                className="mt-6 inline-flex items-center px-8 py-4 rounded-xl text-xl font-semibold bg-red-500 text-white transition-colors duration-300 hover:bg-red-600"
              >
                {data.cta.name}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
