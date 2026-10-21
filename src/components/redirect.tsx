"use client";

import { useEffect } from "react";

export default function Redirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <main className="space" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <a href={to}>
        <span className="accent">&gt;</span> redirecting…
      </a>
    </main>
  );
}
