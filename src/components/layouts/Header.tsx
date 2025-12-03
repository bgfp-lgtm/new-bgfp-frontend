"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { getStrapiMedia } from "@/lib/utils";

interface HeaderProps {
  data: {
    logo: { url: string; name: string };
    link: { id: number; name: string; path: string }[];
    cta: { id: number; name: string; path: string };
  };
}

export default function Header({ data }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const logoUrl = getStrapiMedia(data.logo?.url) || "/logo.png";

  // 1. HARDCODED STATIC LINKS
  const navLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Services", path: "/services" },
    { id: 3, name: "About us", path: "/about-us" },
    { id: 4, name: "Projects", path: "/projects" },
    { id: 5, name: "Careers", path: "/careers" },
    { id: 6, name: "Blog Posts", path: "/blog" },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // 2. Robust Active Link Checker
  const isActiveLink = (path: string) => {
    if (path === "/") return pathname === "/";
    // Active if path matches exactly OR if it's a sub-path (e.g. /services/marketing)
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`relative w-full bg-black`}>
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-20 py-5">
        <Link href="/" passHref>
          <Image
            src={logoUrl}
            alt={data.logo.name || "logo"}
            width={130}
            height={130}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.path}
              className={`text-sm transition-colors duration-300 hover:text-red-500 
                text-white
                ${
                  isActiveLink(link.path)
                    ? "font-bold text-red-500"
                    : "font-medium"
                }
              `}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button (Still Dynamic from Strapi) */}
        {data.cta && (
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
          className={`lg:hidden p-2 rounded-md focus:ring-2 focus:ring-red-500 ${
            isHomePage ? "text-white" : "text-gray-700"
          }`}
        >
          {isMenuOpen ? (
            <RxCross2 className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="absolute top-7 right-6 p-2 text-gray-700 focus:ring-2 focus:ring-red-500"
          >
            <RxCross2 className="h-8 w-8" />
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.id}
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
          ))}

          {data.cta && (
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
    </header>
  );
}
