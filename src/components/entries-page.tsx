"use client";

import { useState } from "react";
import Link from "next/link";
import { Stars, Trail, useSpace } from "@/components/space";
import type { Entry } from "@/content";

const ACCENT = "#a78bfa";
// Entries start rising as the intro lids finish parting.
const BASE_DELAY = 0.75;

export default function EntriesPage({ title, summary, entries }: { title: string; summary: string; entries: Entry[] }) {
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

        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 20 }}>
          {entries.map((entry, i) => (
            <li key={entry.id} id={entry.id} className="rise" style={{ animationDelay: `${BASE_DELAY + 0.15 + i * 0.08}s` }}>
              <EntryCard entry={entry} />
            </li>
          ))}
        </ol>
      </div>

      <div className="lid lid-top" aria-hidden="true" />
      <div className="lid lid-bot" aria-hidden="true" />
      <div className="seam" aria-hidden="true" />
    </main>
  );
}

function EntryCard({ entry }: { entry: Entry }) {
  return (
    <article
      className="entry"
      style={{ padding: "clamp(20px, 3vw, 32px)", display: "flex", flexWrap: "wrap", gap: "12px 40px" }}
    >
      <p style={{ margin: 0, flex: "0 0 160px", fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
        {entry.dates}
        {entry.context && (
          <>
            <br />
            <span style={{ color: "var(--dim)" }}>{entry.context}</span>
          </>
        )}
      </p>
      <div style={{ flex: "1 1 360px", minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 19, fontWeight: 500, lineHeight: 1.4 }}>
          {entry.title}
          {entry.org && (
            <>
              {" "}
              <span className="accent">@</span>{" "}
              {entry.orgHref ? (
                <a href={entry.orgHref} target="_blank" rel="noopener noreferrer">
                  {entry.org}
                </a>
              ) : (
                entry.org
              )}
            </>
          )}
        </h2>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "var(--fg-soft)" }}>{entry.summary}</p>
        {entry.images && <ImageDeck images={entry.images} />}
        {entry.highlights.length > 0 && (
          <ul className="highlights">
            {entry.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
          {entry.github && (
            <a className="chip" href={entry.github} target="_blank" rel="noopener noreferrer">
              <span className="caret accent" aria-hidden="true">&gt;</span>
              <span>github ↗</span>
            </a>
          )}
          {entry.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ImageDeck({ images }: { images: { src: string; caption: string }[] }) {
  const [i, setI] = useState(0);
  const many = images.length > 1;
  const step = (d: number) => setI((i + d + images.length) % images.length);

  return (
    <figure style={{ margin: "4px 0", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
      <img
        src={images[i].src}
        alt={images[i].caption}
        style={{ width: "100%", height: "auto", display: "block", border: "1px solid var(--edge)" }}
      />
      <figcaption style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "var(--muted)" }}>
        {many && (
          <button type="button" className="deck-btn" aria-label="previous image" onClick={() => step(-1)}>
            &lt;
          </button>
        )}
        <span style={{ flex: 1, minWidth: 0 }}>
          {many && (
            <span className="accent">
              {i + 1}/{images.length}{" "}
            </span>
          )}
          {images[i].caption}
        </span>
        {many && (
          <button type="button" className="deck-btn" aria-label="next image" onClick={() => step(1)}>
            &gt;
          </button>
        )}
      </figcaption>
    </figure>
  );
}
