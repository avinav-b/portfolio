"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Stars, Trail, useSpace } from "@/components/space";
import { RESUME_HREF, SOCIALS } from "@/content";

const ACCENT = "#a78bfa";

export default function Landing() {
  const router = useRouter();
  const space = useSpace({ push: true, accent: ACCENT });
  const [leaving, setLeaving] = useState(false);
  const [aboutIn, setAboutIn] = useState(false);
  const aboutRef = useRef<HTMLElement>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout>>();

  // Reveal the about section once a good part of it scrolls into view.
  useEffect(() => {
    const el = aboutRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setAboutIn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          setAboutIn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(exitTimer.current), []);

  // Exit transition: the box flashes to the accent and switches off like an
  // old screen, then the route changes.
  const leave = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    if (leaving) return;
    setLeaving(true);
    exitTimer.current = setTimeout(() => router.push(href), 540);
  };

  return (
    <main
      className="space"
      onMouseMove={space.onMouseMove}
      onMouseLeave={space.onMouseLeave}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Stars count={160} sx={space.sx} sy={space.sy} hidden={leaving} />
      <Trail parts={space.parts} />

      <section
        id="top"
        style={{
          position: "relative",
          minHeight: "100vh",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 16px 120px",
        }}
      >
        <div
          className={leaving ? "off" : ""}
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 640,
            transform: `translate(${space.ox.toFixed(1)}px, ${space.oy.toFixed(1)}px)`,
            transition: "transform 1.6s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <div
            className="float"
            style={{
              border: `1px solid ${leaving ? ACCENT : "#3b2f5c"}`,
              background: leaving ? ACCENT : "rgba(0, 0, 0, 0.82)",
              transition: "background-color 140ms linear, border-color 140ms linear",
              padding: "clamp(32px, 6vw, 56px)",
              display: "flex",
              flexDirection: "column",
              gap: 48,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(30px, 5vw, 52px)",
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              hi, i&apos;m <span className="accent">avinav</span>
              <span className="cursor" aria-hidden="true" />
            </h1>
            <nav
              aria-label="primary"
              style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: "clamp(16px, 2vw, 19px)" }}
            >
              <a className="opt" href={RESUME_HREF}>
                <span className="caret accent" aria-hidden="true">&gt;</span>
                <span>just show me your resume</span>
              </a>
              <Link className="opt" href="/experiences" onClick={leave("/experiences")}>
                <span className="caret accent" aria-hidden="true">&gt;</span>
                <span>experiences</span>
              </Link>
              <Link className="opt" href="/projects" onClick={leave("/projects")}>
                <span className="caret accent" aria-hidden="true">&gt;</span>
                <span>projects</span>
              </Link>
              <Link className="opt" href="/skills" onClick={leave("/skills")}>
                <span className="caret accent" aria-hidden="true">&gt;</span>
                <span>skills</span>
              </Link>
            </nav>
          </div>
        </div>
        <a className="more" href="#about" style={{ zIndex: 1, opacity: aboutIn || leaving ? 0 : 1 }}>
          <span>more about me</span>
          <span className="arrow accent" aria-hidden="true">↓</span>
        </a>
      </section>

      <section
        id="about"
        ref={aboutRef}
        aria-labelledby="about-title"
        className={aboutIn ? "in" : ""}
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          boxSizing: "border-box",
          padding: "clamp(80px, 12vw, 160px) clamp(24px, 8vw, 120px) 64px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(48px, 7vw, 88px)",
            flex: 1,
          }}
        >
          <div className="rule" aria-hidden="true" style={{ height: 1, background: ACCENT }} />

          <div style={{ display: "flex", flexWrap: "wrap", gap: "40px clamp(40px, 8vw, 120px)" }}>
            <div
              className="rv"
              style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 12, transitionDelay: "0.1s" }}
            >
              <h2
                id="about-title"
                style={{
                  margin: 0,
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 500,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                more about <span className="accent">me</span>
              </h2>
            </div>
            <div
              className="rv"
              style={{
                flex: "2 1 420px",
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                fontSize: "clamp(15px, 1.4vw, 17px)",
                lineHeight: 1.85,
                color: "var(--fg-soft)",
                transitionDelay: "0.22s",
              }}
            >
              <p style={{ margin: 0, maxWidth: "62ch" }}>
                I&apos;m a Computer Engineering student at the University of Toronto, with a minor in Artificial
                Intelligence Engineering. Right now I&apos;m a software engineering intern on AI &amp; full stack at
                BiblioCommons, and co-founder and lead engineer at Rheely, a media provenance platform.
              </p>
              <p style={{ margin: 0, maxWidth: "62ch" }}>
                I like building across the stack: RAG and agentic AI systems, web and mobile apps, and embedded
                things down to a CPU on a breadboard. Outside of that I help run Mecha Mayhem, Canada&apos;s largest
                robotics tournament, and I enjoy gaming, hiking and reffing soccer games.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px clamp(40px, 8vw, 120px)" }}>
            <nav
              className="rv"
              aria-label="site"
              style={{
                flex: "1 1 260px",
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                borderTop: "1px solid var(--line)",
                fontSize: "clamp(15px, 1.4vw, 17px)",
                transitionDelay: "0.32s",
              }}
            >
              <SiteLink href={RESUME_HREF} label="resume" />
              <SiteLink href="/experiences" label="experiences" />
              <SiteLink href="/projects" label="projects" />
              <SiteLink href="/skills" label="skills" />
            </nav>
            <nav
              className="rv"
              aria-label="socials"
              style={{
                flex: "2 1 420px",
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                borderTop: "1px solid var(--line)",
                fontSize: "clamp(15px, 1.4vw, 17px)",
                transitionDelay: "0.42s",
              }}
            >
              <SocialLink href={SOCIALS.github.href} label="github" note={`${SOCIALS.github.label} ↗`} external />
              <SocialLink
                href={SOCIALS.linkedin.href}
                label="linkedin"
                note={`${SOCIALS.linkedin.label} ↗`}
                external
              />
              <SocialLink href={SOCIALS.email.href} label="email" note={SOCIALS.email.label} />
            </nav>
          </div>

          <footer
            className="rv"
            style={{
              marginTop: "auto",
              paddingTop: 48,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 12,
              fontSize: 12,
              color: "var(--dim)",
              transitionDelay: "0.5s",
            }}
          >
            <span>avinav</span>
            <a href="#top" style={{ color: "var(--muted)", textDecoration: "none" }}>
              back to top ↑
            </a>
          </footer>
        </div>
      </section>
    </main>
  );
}

function SiteLink({ href, label }: { href: string; label: string }) {
  const body = (
    <>
      <span style={{ display: "flex", gap: 12 }}>
        <span className="caret accent" aria-hidden="true">&gt;</span>
        <span>{label}</span>
      </span>
      <span className="soc-note" aria-hidden="true">→</span>
    </>
  );
  // The resume is a static file, not a route.
  return href.startsWith("/") && !href.endsWith(".pdf") ? (
    <Link className="soc" href={href}>
      {body}
    </Link>
  ) : (
    <a className="soc" href={href}>
      {body}
    </a>
  );
}

function SocialLink({ href, label, note, external = false }: { href: string; label: string; note: string; external?: boolean }) {
  return (
    <a className="soc" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span style={{ display: "flex", gap: 12 }}>
        <span className="caret accent" aria-hidden="true">&gt;</span>
        <span>{label}</span>
      </span>
      <span className="soc-note">{note}</span>
    </a>
  );
}
