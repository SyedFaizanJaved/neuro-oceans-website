import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Contact", path: "/contact" });

export default function ContactPage() {
  return <main>Contact</main>;
}
