/**
 * Shared content types.
 *
 * Every file in `src/content/` is typed against these, so a malformed or
 * incomplete entry fails `next build` instead of rendering a broken page.
 *
 * Add a type here first, then the data file, then the getter in `lib/content.ts`.
 */

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  /** ISO date (YYYY-MM-DD). Drives ordering and sitemap `lastModified`. */
  date: string;
  tags: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD). Drives ordering and sitemap `lastModified`. */
  date: string;
  author: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
};

export type Role = {
  slug: string;
  title: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
};
