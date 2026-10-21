import type { Metadata } from "next";
import EntriesPage from "@/components/entries-page";
import { PROJECTS } from "@/content";

export const metadata: Metadata = { title: "avinav — projects" };

export default function ProjectsPage() {
  return (
    <EntriesPage
      title="projects"
      summary="Things I've built on my own and for courses, from mobile apps down to hardware and FPGAs."
      entries={PROJECTS}
    />
  );
}
