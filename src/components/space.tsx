"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

const GLYPHS = ["0", "1", "·", ":", "+", "*", "/", "\\", "{", "}", "#", "%", "~", "^", "=", "░", "×", "."];
const POOL = 40;
const SPACING = 16;

type Star = { x: string; y: string; size: number; o: string; delay: string; cls: string };
type Particle = { x: number; y: number; ch: string; cls: string; color: string };

// Seeded so the server and client render the same sky.
function makeStars(count: number): Star[] {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const out: Star[] = [];
  for (let i = 0; i < count; i++) {
    const big = rnd() < 0.12;
    out.push({
      x: (rnd() * 100).toFixed(2),
      y: (rnd() * 100).toFixed(2),
      size: big ? 2 : 1,
      o: (0.15 + rnd() * (big ? 0.6 : 0.4)).toFixed(2),
      delay: (rnd() * 4).toFixed(2),
      cls: rnd() < 0.35 ? "star tw" : "star",
    });
  }
  return out;
}

const EMPTY: Particle = { x: -100, y: -100, ch: "", cls: "", color: "transparent" };

type Pointer = { x: number; y: number; cx: number; cy: number; w: number; vh: number };

/**
 * Drives the starfield parallax, the glyph trail behind the cursor, and an
 * optional push that nudges a centred element away from the cursor.
 */
export function useSpace({ push = false, accent = "#a78bfa" } = {}) {
  // A fixed pool of trail slots recycled in a ring. Slots are never added or
  // removed, so each glyph keeps its DOM node and its animation is never
  // handed to a different glyph mid-fade.
  const slots = useRef<Particle[]>(Array.from({ length: POOL }, () => EMPTY));
  const phase = useRef<number[]>(Array.from({ length: POOL }, () => 0));
  const head = useRef(0);
  const last = useRef<{ x: number; y: number } | null>(null);
  const pending = useRef<Pointer | null>(null);
  const raf = useRef(0);

  const [parts, setParts] = useState<Particle[]>(slots.current);
  const [offset, setOffset] = useState({ ox: 0, oy: 0, sx: 0, sy: 0 });

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const spawn = useCallback(
    (x: number, y: number) => {
      const i = head.current;
      head.current = (i + 1) % POOL;
      phase.current[i] = phase.current[i] ? 0 : 1;
      slots.current[i] = {
        x: Math.round(x),
        y: Math.round(y),
        ch: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        cls: "d" + (1 + Math.floor(Math.random() * 4)) + (phase.current[i] ? "a" : "b"),
        color: Math.random() < 0.7 ? accent : "rgba(255,255,255,0.65)",
      };
    },
    [accent],
  );

  const flush = useCallback(() => {
    raf.current = 0;
    const m = pending.current;
    if (!m) return;
    pending.current = null;

    const dx = m.cx - m.w / 2;
    const dy = m.cy - m.vh / 2;
    const next = { ox: 0, oy: 0, sx: -dx * 0.015, sy: -dy * 0.015 };
    if (push) {
      const dist = Math.hypot(dx, dy) || 1;
      const amount = Math.max(0, 1 - dist / 700) * 16;
      next.ox = (-dx / dist) * amount;
      next.oy = (-dy / dist) * amount;
    }
    setOffset(next);

    if (!last.current) {
      last.current = { x: m.x, y: m.y };
      return;
    }
    const d = Math.hypot(m.x - last.current.x, m.y - last.current.y);
    if (d < SPACING) return;
    // Fill the gap along the path so fast moves leave an even trail.
    const steps = Math.min(4, Math.floor(d / SPACING));
    for (let k = 1; k <= steps; k++) {
      const t = k / steps;
      spawn(last.current.x + (m.x - last.current.x) * t, last.current.y + (m.y - last.current.y) * t);
    }
    last.current = { x: m.x, y: m.y };
    setParts(slots.current.slice());
  }, [push, spawn]);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      pending.current = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        cx: e.clientX,
        cy: e.clientY,
        w: r.width,
        vh: window.innerHeight,
      };
      if (!raf.current) raf.current = requestAnimationFrame(flush);
    },
    [flush],
  );

  const onMouseLeave = useCallback(() => {
    last.current = null;
    pending.current = null;
    setOffset({ ox: 0, oy: 0, sx: 0, sy: 0 });
  }, []);

  return { parts, ...offset, onMouseMove, onMouseLeave };
}

export function Stars({ count, sx, sy, hidden = false }: { count: number; sx: number; sy: number; hidden?: boolean }) {
  const [stars] = useState(() => makeStars(count));
  return (
    <div
      className="stars"
      aria-hidden="true"
      style={{ opacity: hidden ? 0 : 1, transform: `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px)` }}
    >
      {stars.map((s, i) => (
        <div
          key={i}
          className={s.cls}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: Number(s.o),
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Trail({ parts }: { parts: Particle[] }) {
  return (
    <div className="trail" aria-hidden="true">
      {parts.map((p, i) => (
        <span key={i} className={`pt ${p.cls}`} style={{ left: p.x, top: p.y, color: p.color }}>
          {p.ch}
        </span>
      ))}
    </div>
  );
}
