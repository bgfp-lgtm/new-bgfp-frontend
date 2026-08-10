import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

/**
 * `contact/page.tsx` is a client component and cannot export metadata, so the
 * route's title/description/canonical live here.
 */
export const metadata: Metadata = buildMetadata({
  path: "/contact",
  fallbackTitle: "Contact | Birthgiver Film Productions",
  fallbackDescription:
    "Get in touch with Birthgiver Film Productions to discuss your film, video marketing or software project.",
});

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
