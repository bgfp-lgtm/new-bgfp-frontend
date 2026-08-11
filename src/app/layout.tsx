// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getGlobalData } from "@/data/loader";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

/**
 * Root metadata is site-wide DEFAULTS only.
 *
 * Deliberately no `title`, `description`, or `alternates.canonical` here:
 * every value set at this level is inherited by every route, which is how
 * the whole site ended up sharing the homepage's title and canonicalling to
 * `/`. Per-route values live in each route's own `generateMetadata`.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  icons: {
    icon: "/logofav.png",
  },
};

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
