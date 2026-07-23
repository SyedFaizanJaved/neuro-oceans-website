import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Blog", path: "/blog" });

export default function BlogPage() {
  return <main>Blog</main>;
}
