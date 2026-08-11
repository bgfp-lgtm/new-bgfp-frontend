import type { Metadata } from "next";
import { getStrapiMedia } from "@/lib/utils";

export const SITE_URL = "https://www.birthgiverfilmproductions.com";
export const SITE_NAME = "Birthgiver Film Productions";

const DEFAULT_OG_IMAGE = "/logofav.png";

type StrapiImage = { url?: string | null } | null;

export type StrapiSeo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  /** Present in Strapi but deliberately NOT rendered — see below. */
  keywords?: string | null;
  metaRobots?: string | null;
  canonicalURL?: string | null;
  metaImage?: StrapiImage;
  socialNetwork?: Array<{
    title?: string | null;
    description?: string | null;
    image?: StrapiImage;
  }> | null;
} | null;

type BuildMetadataArgs = {
  /** Strapi `seo` component for this route, when the content type has one. */
  seo?: StrapiSeo;
  /** Route path, always leading-slash (`/`, `/about-us`, `/blog/my-post`). */
  path: string;
  /** Used when Strapi has no metaTitle for this route. */
  fallbackTitle: string;
  /** Used when Strapi has no metaDescription for this route. */
  fallbackDescription: string;
  /** `article` for blog posts, `website` (default) for everything else. */
  ogType?: "website" | "article";
};

/**
 * Builds per-route metadata with a canonical that points at THIS route.
 *
 * The canonical is derived from `path` unless Strapi explicitly sets
 * `canonicalURL`. Never let it fall back to the site root — a homepage
 * canonical on a sub-page tells Google the page is a duplicate and
 * de-indexes it.
 */
export function buildMetadata({
  seo,
  path,
  fallbackTitle,
  fallbackDescription,
  ogType = "website",
}: BuildMetadataArgs): Metadata {
  const title = seo?.metaTitle || fallbackTitle;
  const description = seo?.metaDescription || fallbackDescription;
  const canonical = seo?.canonicalURL || new URL(path, SITE_URL).href;

  const social = seo?.socialNetwork?.[0];
  const ogImage =
    getStrapiMedia(social?.image?.url) ||
    getStrapiMedia(seo?.metaImage?.url) ||
    DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    // `meta keywords` is deliberately not emitted: search engines have
    // ignored it for years and it leaks target terms to competitors. The
    // Strapi field is left in place for editors, just not rendered.
    robots: seo?.metaRobots || "index, follow",
    alternates: {
      canonical,
    },
    openGraph: {
      title: social?.title || title,
      description: social?.description || description,
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
