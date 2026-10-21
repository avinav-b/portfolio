import type { Metadata } from "next";
import EntriesPage from "@/components/entries-page";
import { EXPERIENCES } from "@/content";

export const metadata: Metadata = { title: "avinav — experiences" };

export default function ExperiencesPage() {
  return (
    <EntriesPage
      title="experiences"
      summary="Full-stack and AI engineering, from RAG platforms and agentic tooling to mobile apps and rocket avionics."
      entries={EXPERIENCES}
    />
  );
}
