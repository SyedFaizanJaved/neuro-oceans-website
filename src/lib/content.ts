import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { roles } from "@/content/roles";
import { services } from "@/content/services";
import { team } from "@/content/team";
import type { Post, Project, Role, Service, TeamMember } from "@/types";

/**
 * The seam between content and the rest of the app.
 *
 * Nothing outside this file imports from `src/content/` directly. That single
 * rule is what makes the content source swappable: move to MDX or a CMS and
 * only the bodies of these functions change — every page and component that
 * calls them keeps working untouched.
 *
 * Functions returning a single item return `undefined` when nothing matches.
 * Callers are expected to hand that to `notFound()`.
 */

/** Newest first. */
export function getProjects(): Project[] {
  return [...projects].sort((a, b) => b.date.localeCompare(a.date));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Newest first. */
export function getPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getServices(): Service[] {
  return services;
}

export function getTeam(): TeamMember[] {
  return team;
}

export function getRoles(): Role[] {
  return roles;
}
