import type { MetadataRoute } from "next";

import { nav } from "@/content/site";
import { getPosts, getProjects } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

/**
 * Generated at build time from the same sources the pages use, so publishing a
 * project or post indexes it automatically. There is no list to maintain here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", ...nav.map((item) => item.href)].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
  }));

  const projectRoutes = getProjects().map((project) => ({
    url: new URL(`/work/${project.slug}`, siteUrl).toString(),
    lastModified: new Date(project.date),
  }));

  const postRoutes = getPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
