import type { Metadata } from "next";
import { RESUME_HREF } from "@/content";
import Redirect from "@/components/redirect";

export const metadata: Metadata = { title: "avinav — resume" };

// The site is a static export, so this redirect has to happen in the page.
export default function ResumePage() {
  return <Redirect to={RESUME_HREF} />;
}
