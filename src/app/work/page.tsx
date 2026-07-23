import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Work", path: "/work" });

export default function WorkPage() {
  return <main>Work</main>;
}
