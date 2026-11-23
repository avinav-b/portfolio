import type { Metadata } from "next";
import SkillsPage from "@/components/skills-page";

export const metadata: Metadata = { title: "avinav — skills" };

export default function Page() {
  return <SkillsPage />;
}
