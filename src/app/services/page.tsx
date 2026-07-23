import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Services", path: "/services" });

export default function ServicesPage() {
  return <main>Services</main>;
}
