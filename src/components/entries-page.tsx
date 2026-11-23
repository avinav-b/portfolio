"use client";

import { useState } from "react";
import PageShell, { BASE_DELAY } from "@/components/page-shell";
import type { Entry } from "@/content";

export default function EntriesPage({ title, summary, entries }: { title: string; summary: string; entries: Entry[] }) {
  return (
    <PageShell title={title} summary={summary}>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 20 }}>
        {entries.map((entry, i) => (
          <li key={entry.id} id={entry.id} className="rise" style={{ animationDelay: `${BASE_DELAY + 0.15 + i * 0.08}s` }}>
            <EntryCard entry={entry} />
          </li>
        ))}
      </ol>
    </PageShell>
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
