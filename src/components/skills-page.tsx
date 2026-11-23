"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import PageShell, { BASE_DELAY } from "@/components/page-shell";
import { SKILL_INSTALLS, SKILLS, SKILLS_REPO, type Skill } from "@/content";

export default function SkillsPage() {
  return (
    <PageShell
      title="skills"
      summary={
        <>
          The agent skills I use every day, kept in{" "}
          <a href={SKILLS_REPO} target="_blank" rel="noopener noreferrer" style={{ whiteSpace: "nowrap" }}>
            avinav-b/skills ↗
          </a>
          . They work in Claude Code, Codex, Cursor, and any other agent that reads Agent Skills.
        </>
      }
    >
      <section className="rise" style={{ animationDelay: `${BASE_DELAY + 0.15}s` }} aria-label="install">
        <Install />
      </section>

      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 20 }}>
        {SKILLS.map((skill, i) => (
          <li key={skill.id} id={skill.id} className="rise" style={{ animationDelay: `${BASE_DELAY + 0.23 + i * 0.08}s` }}>
            <SkillCard skill={skill} />
          </li>
        ))}
      </ol>
    </PageShell>
  );
}

function Install() {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  const current = SKILL_INSTALLS[tab];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(current.lines.join("\n"));
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard can be blocked; the commands are still selectable.
    }
  };

  return (
    <div className="entry term">
      <div className="term-bar" role="tablist" aria-label="agent">
        {SKILL_INSTALLS.map((inst, i) => (
          <button
            key={inst.agent}
            type="button"
            role="tab"
            aria-selected={i === tab}
            className={`term-tab${i === tab ? " on" : ""}`}
            onClick={() => {
              setTab(i);
              setCopied(false);
            }}
          >
            {inst.agent}
          </button>
        ))}
        <button type="button" className="term-copy" onClick={copy} aria-live="polite">
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="term-body" role="tabpanel">
        {current.lines.map((line) => (
          <div key={line}>
            <span className="accent" aria-hidden="true">
              ${" "}
            </span>
            {line}
          </div>
        ))}
      </pre>
    </div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const href = `${SKILLS_REPO}/blob/main/skills/${skill.id}/SKILL.md`;

  return (
    <article
      className="entry"
      style={{ padding: "clamp(20px, 3vw, 32px)", display: "flex", flexWrap: "wrap", gap: "12px 40px" }}
    >
      <p style={{ margin: 0, flex: "0 0 160px", fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
        <span style={{ color: "var(--dim)" }}>invoke with</span>
        <br />
        {skill.trigger}
      </p>
      <div style={{ flex: "1 1 360px", minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 19, fontWeight: 500, lineHeight: 1.4 }}>
          <span className="accent">/</span>
          {skill.id}
        </h2>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "var(--fg-soft)" }}>{skill.summary}</p>
        {skill.chains && <Chain ids={skill.chains} />}
        <ul className="highlights">
          {skill.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
          <a className="chip" href={href} target="_blank" rel="noopener noreferrer">
            <span className="caret accent" aria-hidden="true">&gt;</span>
            <span>skill.md ↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

// bye-bye's pipeline: each skill it runs links to that skill's card, and the
// fix step it does itself sits between the investigation and the review.
function Chain({ ids }: { ids: string[] }) {
  const steps = [ids[0], "fix", ...ids.slice(1)];
  return (
    <p className="chain" aria-label="runs in order">
      {steps.map((s, i) => (
        <Fragment key={s}>
          {i > 0 && (
            <span className="accent" aria-hidden="true">
              →
            </span>
          )}
          {s === "fix" ? <span className="chain-self">{s}</span> : <a href={`#${s}`}>{s}</a>}
        </Fragment>
      ))}
    </p>
  );
}
