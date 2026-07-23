import type { Project } from "@/types";

/** Case studies. Each `slug` becomes a route at /work/[slug]. */
export const projects: Project[] = [
  {
    slug: "example-project",
    title: "Example Project",
    client: "Example Client",
    summary: "What the problem was, what was built, what changed as a result.",
    date: "2026-01-15",
    tags: ["Example"],
  },
];
