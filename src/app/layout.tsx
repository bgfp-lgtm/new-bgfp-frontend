// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Script from "next/script";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getGlobalData, getHomepageQuery } from "@/data/loader"; // Import getHomepageData
import { getStrapiMedia } from "@/lib/utils"; // Import for URL formatting

import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

// Dynamic metadata generation
export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepageQuery();
  const seo = homepage?.data?.seo;

  // Find the social network image or fallback to a default logo path
  const ogImage = seo?.socialNetwork?.[0]?.image?.url
    ? getStrapiMedia(seo.socialNetwork[0].image.url)
    : "/logofav.png"; // Fallback to your local logo

  return {
    title: seo?.metaTitle || "Birthgiver Film Productions",
    description:
      seo?.metaDescription ||
      "Comprehensive film and video production services",
    keywords: seo?.keywords,
    robots: seo?.metaRobots || "index, follow",
    alternates: {
      canonical: seo?.canonicalURL,
    },
    icons: {
      icon: "/logofav.png",
    },
    openGraph: {
      title: seo?.socialNetwork?.[0]?.title || seo?.metaTitle,
      description: seo?.socialNetwork?.[0]?.description || seo?.metaDescription,
      url: seo?.canonicalURL || "https://www.birthgiverfilmproductions.com/",
      siteName: "Birthgiver Film Productions",
      images: [
        {
          url: ogImage || "/logofav.png",
          width: 1200,
          height: 630,
          alt: seo?.metaTitle,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle,
      description: seo?.metaDescription,
      images: [ogImage || ""],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalResponse = await getGlobalData();
  const headerData = globalResponse?.data?.header;

  return (
    <html lang="en">
      <body className={`antialiased ${dmSans.className}`}>
        {/* ... (keep your existing Scripts and layout structure) */}
        <div className="overflow-x-hidden lg:overflow-x-visible">
          <Header data={headerData} />
        </div>
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
