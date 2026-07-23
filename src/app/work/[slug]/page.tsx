import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProject, getProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

/**
 * Reference implementation for a dynamic route. The blog detail route mirrors
 * it exactly — copy this file's shape when adding another content collection.
 */
type Props = {
  params: Promise<{ slug: string }>;
};

/** Prerenders one static page per project at build time. */
export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return buildMetadata({ title: "Not found" });

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  // Unknown slug renders app/not-found.tsx with a real 404 status.
  if (!project) notFound();

  return <main>{project.title}</main>;
}
