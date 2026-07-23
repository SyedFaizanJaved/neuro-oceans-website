import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { site } from "@/content/site";
import { siteUrl } from "@/lib/seo";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Site-wide defaults. `template` means a page setting `title: "About"` renders
 * as "About — Neuro Oceans" without repeating the company name every time.
 * `metadataBase` is what lets relative Open Graph image paths resolve.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Header and Footer from components/layout/ mount here, around {children}. */}
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
