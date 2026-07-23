import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "About", path: "/about" });

export default function AboutPage() {
  return <main>About</main>;
}
