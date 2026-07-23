import type { Post } from "@/types";

/**
 * Blog posts. Each `slug` becomes a route at /blog/[slug].
 *
 * Post bodies are not modelled here yet. When articles need real long-form
 * formatting, add MDX and swap the source inside `lib/content.ts` — pages and
 * components read through the getters, so they will not need to change.
 */
export const posts: Post[] = [
  {
    slug: "example-post",
    title: "Example Post",
    excerpt: "A one-line summary used in listings and social previews.",
    date: "2026-01-15",
    author: "Neuro Oceans",
  },
];
