"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Stars, Trail, useSpace } from "@/components/space";

const ACCENT = "#a78bfa";
// Content starts rising as the intro lids finish parting.
export const BASE_DELAY = 0.75;

// Shared frame for the inner pages: starfield, back link, terminal header,
// and the lids that part on entry.
export default function PageShell({ title, summary, children }: { title: string; summary: ReactNode; children: ReactNode }) {
  const space = useSpace({ accent: ACCENT });

  return (
    <main className="space" onMouseMove={space.onMouseMove} onMouseLeave={space.onMouseLeave}>
      <Stars count={90} sx={space.sx} sy={space.sy} />
      <Trail parts={space.parts} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 880,
          margin: "0 auto",
          boxSizing: "border-box",
          padding: "clamp(40px, 8vw, 96px) 24px 120px",
          display: "flex",
          flexDirection: "column",
          gap: 56,
        }}
      >
        <nav aria-label="breadcrumb" className="rise" style={{ animationDelay: `${BASE_DELAY}s` }}>
          <Link className="back" href="/">
            <span className="caret accent" aria-hidden="true">&lt;</span>
            <span>back</span>
          </Link>
        </nav>

        <header
          className="rise"
          style={{ animationDelay: `${BASE_DELAY + 0.07}s`, display: "flex", flexDirection: "column", gap: 16 }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            <span className="accent">&gt;</span> {title}
            <span className="cursor" aria-hidden="true" />
          </h1>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--muted)", maxWidth: "60ch" }}>
            {summary}
          </p>
        </header>

        {children}
      </div>

      <div className="lid lid-top" aria-hidden="true" />
      <div className="lid lid-bot" aria-hidden="true" />
      <div className="seam" aria-hidden="true" />
    </main>
  );
}
