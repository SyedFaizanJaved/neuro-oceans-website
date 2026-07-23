import type { NavItem, SocialLink } from "@/types";

/**
 * Single source of truth for company identity and navigation.
 * Change the company name in one place and it updates everywhere.
 */
export const site = {
  name: "Neuro Oceans",
  legalName: "Neuro Oceans",
  tagline: "Applied AI, engineered for depth.",
  description:
    "Neuro Oceans builds applied AI systems for teams that need them to actually work in production.",
  email: "hello@neurooceans.ai",
} as const;

/** Primary navigation. Order here is the order rendered in the header. */
export const nav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const socials: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "GitHub", href: "https://github.com/" },
];
