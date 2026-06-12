"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = ["#ff4d1c", "#f48ab4", "#437ee6", "#c8e84f", "#0e0e0e"];

const SHAPES = [
  // flower
  <g key="flower" fill="currentColor">
    {[0, 60, 120, 180, 240, 300].map((r) => (
      <ellipse key={r} cx="0" cy="-9" rx="4.5" ry="8" transform={`rotate(${r})`} />
    ))}
    <circle r="3.5" fill="var(--cream)" />
  </g>,
  // sparkle / 4-point star
  <path
    key="sparkle"
    fill="currentColor"
    d="M0 -14 L3 -3 L14 0 L3 3 L0 14 L-3 3 L-14 0 L-3 -3 Z"
  />,
  // smiley
  <g key="smiley" fill="none" stroke="currentColor" strokeWidth="2.2">
    <circle r="11" />
    <circle cx="-4" cy="-3" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="4" cy="-3" r="1.4" fill="currentColor" stroke="none" />
    <path d="M-5 3.5 Q0 8.5 5 3.5" strokeLinecap="round" />
  </g>,
  // squiggle
  <path
    key="squiggle"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    d="M-13 0 Q-9 -8 -5 0 T3 0 T11 0"
  />,
  // spiral-ish swirl
  <path
    key="swirl"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    d="M0 0 a2.5 2.5 0 0 1 2.5 2.5 a5 5 0 0 1 -5 5 a8 8 0 0 1 -8 -8 a11 11 0 0 1 11 -11 a13.5 13.5 0 0 1 13.5 13.5"
  />,
  // heart
  <path
    key="heart"
    fill="currentColor"
    d="M0 5 C-1.5 1 -9 -1 -9 -6 C-9 -10 -5 -12 -2.5 -10 C-1 -9 0 -7.5 0 -7.5 C0 -7.5 1 -9 2.5 -10 C5 -12 9 -10 9 -6 C9 -1 1.5 1 0 5 Z"
  />,
];

type Doodle = {
  id: number;
  x: number;
  y: number;
  shape: number;
  color: string;
  size: number;
  rot: number;
};

export default function DoodleTrail() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [doodles, setDoodles] = useState<Doodle[]>([]);
  const last = useRef({ x: -999, y: -999 });
  const counter = useRef(0);

  useEffect(() => {
    const host = hostRef.current;
    const parent = host?.parentElement;
    if (!host || !parent) return;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = x - last.current.x;
      const dy = y - last.current.y;
      if (dx * dx + dy * dy < 110 * 110) return;
      last.current = { x, y };

      const n = counter.current++;
      const d: Doodle = {
        id: n,
        x,
        y,
        shape: n % SHAPES.length,
        color: COLORS[n % COLORS.length],
        size: 44 + ((n * 17) % 40),
        rot: ((n * 53) % 50) - 25,
      };
      setDoodles((prev) => [...prev.slice(-14), d]);
      setTimeout(
        () => setDoodles((prev) => prev.filter((it) => it.id !== n)),
        1000
      );
    };

    parent.addEventListener("mousemove", onMove);
    return () => parent.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {doodles.map((d) => (
        <svg
          key={d.id}
          viewBox="-16 -16 32 32"
          className="absolute animate-[doodlePop_1s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{
            left: d.x,
            top: d.y,
            width: d.size,
            height: d.size,
            color: d.color,
            transform: `translate(-50%, -50%) rotate(${d.rot}deg)`,
          }}
        >
          {SHAPES[d.shape]}
        </svg>
      ))}
    </div>
  );
}
