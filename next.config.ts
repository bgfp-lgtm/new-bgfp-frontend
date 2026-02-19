import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "delightful-trust-ed829e5176.media.strapiapp.com",
      },
      {
        protocol: "https",
        hostname: "delightful-trust-ed829e5176.strapiapp.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      // ---------------------
    ],
  },

  /* other config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            // Start with Report-Only or a very permissive policy to avoid breaking external scripts (like framer-motion, strapi images, etc.)
            // Ideally this should be stricter in production after testing.
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*; style-src 'self' 'unsafe-inline' https://*; img-src 'self' data: https://*; font-src 'self' data: https://*; connect-src 'self' https://*; media-src 'self' https://* data: blob:; upgrade-insecure-requests;",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
