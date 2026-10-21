"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Redirect from "@/components/redirect";

// Old route: /work?tab=projects&scrollTo=<id> now lives at /projects#<id>.
function WorkRedirect() {
  const params = useSearchParams();
  const base = params.get("tab") === "projects" ? "/projects" : "/experiences";
  const id = params.get("scrollTo");
  return <Redirect to={id ? `${base}#${id}` : base} />;
}

export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <WorkRedirect />
    </Suspense>
  );
}
