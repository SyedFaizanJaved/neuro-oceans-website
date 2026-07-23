import type { Metadata } from "next";

import { site } from "@/content/site";

/**
 * Absolute site URL. Needed for canonical links, Open Graph and sitemap.xml —
 * those cannot use relative paths. Set NEXT_PUBLIC_SITE_URL in production.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type BuildMetadataOptions = {
  title: string;
  description?: string;
  /** Route path, e.g. "/work/example-project". Used for the canonical URL. */
  path?: string;
};

/**
 * Builds a page's metadata.
 *
 * Every page calls this instead of hand-writing a Metadata object, so titles,
 * canonicals and social cards cannot drift apart page to page.
 */
export function buildMetadata({
  title,
  description = site.description,
  path = "/",
}: BuildMetadataOptions): Metadata {
  const url = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
