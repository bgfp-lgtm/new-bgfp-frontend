import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Script from "next/script";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getGlobalData } from "@/data/loader";

import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Birthgiver Film Productions",
  description:
    "Birthgiver Film Productions offers comprehensive film and video production services",
  // Add the icons property here to point to your SVG in the public folder
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
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-Z05REZD9HS"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z05REZD9HS');
          `}
        </Script>
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
