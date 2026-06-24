"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

/* ──────────────────────────────────────────────────────────
   Reveal — scroll-into-view entrance (transform + opacity only,
   one-shot, IntersectionObserver, respects prefers-reduced-motion).
   ────────────────────────────────────────────────────────── */
type RevealProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  y?: number;
  id?: string;
};

export function Reveal({
  children,
  as,
  className,
  style,
  delay = 0,
  y = 22,
  id,
}: RevealProps) {
  const Tag = as ?? "div";
  const [shown, setShown] = useState(false);

  const setRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={setRef}
      id={id}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition:
          "opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrollProgress — hairline reading indicator in the project accent.
   Sits above content, below the HUD text. transform-only, rAF-throttled.
   ────────────────────────────────────────────────────────── */
export function ScrollProgress({ accent }: { accent: string }) {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-40 h-[2px]" aria-hidden>
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{ backgroundColor: accent, transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Kicker — shared section header: mark · accent tick · label.
   Numbered chapters and symbol-marked interludes share one rhythm.
   ────────────────────────────────────────────────────────── */
export function Kicker({
  mark,
  label,
  accent,
  tone = "dark",
  className = "",
}: {
  mark: string;
  label: string;
  accent: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={`label flex items-center gap-3 ${
        tone === "light" ? "opacity-90" : "opacity-80"
      } ${className}`}
    >
      <span
        className="mono"
        style={tone === "light" ? undefined : { color: accent }}
      >
        {mark}
      </span>
      <span
        className="h-px w-8 md:w-12"
        style={{
          backgroundColor: tone === "light" ? "currentColor" : accent,
          opacity: tone === "light" ? 0.5 : 1,
        }}
      />
      <span>{label}</span>
    </div>
  );
}

/* ── research insights — cards ── */
export function Insights({
  items,
  accent,
}: {
  items: { title: string; body: string }[];
  accent: string;
}) {
  return (
    <section className="grid gap-8 border-t border-ink/10 px-5 py-20 md:grid-cols-[220px_1fr] md:px-10 md:py-28">
      <Reveal>
        <Kicker mark="+" label="What the research said" accent={accent} />
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal
            key={it.title}
            delay={i * 90}
            className="group rounded-sm border border-ink/15 p-6 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(14,14,14,0.08)]"
            style={{ borderTopWidth: 3, borderTopColor: accent }}
          >
            <div className="font-display text-[26px] leading-none" style={{ color: accent }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <h4 className="mt-4 text-[15px] font-semibold normal-case leading-snug">
              {it.title}
            </h4>
            <p className="mt-2 text-[13px] normal-case leading-relaxed opacity-75">
              {it.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── flow diagram — step chips with connectors ── */
export function Flow({
  steps,
  note,
  accent,
  accentFg,
}: {
  steps: string[];
  note?: string;
  accent: string;
  accentFg: string;
}) {
  return (
    <section className="border-t border-ink/10 px-5 py-20 md:px-10 md:py-28">
      <Reveal className="mb-12">
        <Kicker mark="→" label="The core flow" accent={accent} />
      </Reveal>
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <Reveal
              key={s}
              delay={i * 110}
              className="flex items-center gap-3 md:gap-4"
            >
              <div
                className="flex items-center gap-2.5 rounded-full px-5 py-3 text-[13px] font-medium md:px-6 md:py-4 md:text-[15px]"
                style={
                  last
                    ? { backgroundColor: accent, color: accentFg }
                    : { border: "1.5px solid var(--ink)" }
                }
              >
                <span
                  className="mono"
                  style={{
                    opacity: last ? 0.7 : 0.45,
                    color: last ? accentFg : undefined,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </div>
              {!last && (
                <span className="text-[18px] md:text-[20px]" style={{ color: accent }}>
                  →
                </span>
              )}
            </Reveal>
          );
        })}
      </div>
      {note && (
        <Reveal delay={steps.length * 90}>
          <p className="serif-italic mt-10 text-[20px] opacity-70 md:text-[24px]">
            {note}
          </p>
        </Reveal>
      )}
    </section>
  );
}

/* ── comparison — them vs us ── */
export function Compare({
  theirLabel,
  ourLabel,
  theirs,
  ours,
  accent,
  accentFg,
}: {
  theirLabel: string;
  ourLabel: string;
  theirs: string[];
  ours: string[];
  accent: string;
  accentFg: string;
}) {
  return (
    <section className="border-t border-ink/10 px-5 py-20 md:px-10 md:py-28">
      <Reveal className="mb-12">
        <Kicker mark="vs" label="The shift" accent={accent} />
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal className="rounded-sm border border-ink/15 p-7 md:p-9">
          <div className="label mb-6 opacity-50">{theirLabel}</div>
          <ul className="flex flex-col gap-3.5">
            {theirs.map((t) => (
              <li
                key={t}
                className="flex gap-3 text-[14px] normal-case leading-snug opacity-65"
              >
                <span className="mono mt-[2px] opacity-60">✕</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal
          delay={90}
          className="rounded-sm p-7 md:p-9"
          style={{ backgroundColor: accent, color: accentFg }}
        >
          <div className="label mb-6 opacity-80">{ourLabel}</div>
          <ul className="flex flex-col gap-3.5">
            {ours.map((t) => (
              <li
                key={t}
                className="flex gap-3 text-[14px] font-medium normal-case leading-snug"
              >
                <span className="mono mt-[2px]">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ── signature graphic — bespoke SVG per project ── */
export function Signature({ project }: { project: Project }) {
  const a = project.accent;
  switch (project.slug) {
    case "cyclesync":
      return (
        <GraphicShell
          accent={a}
          label="The signature decision, visualised"
          left="A month grid assumes a 28-day loop — irregularity reads as an error."
          right="A year ring has no 'correct' length — irregularity is just the shape of your year."
        >
          <svg viewBox="0 0 560 240" className="w-full" aria-hidden>
            {/* month grid with error marks */}
            {Array.from({ length: 35 }, (_, i) => {
              const x = 30 + (i % 7) * 30;
              const y = 30 + Math.floor(i / 7) * 38;
              const isX = [9, 16, 24].includes(i);
              return isX ? (
                <g key={i} stroke={a} strokeWidth="2.5">
                  <line x1={x - 6} y1={y - 6} x2={x + 6} y2={y + 6} />
                  <line x1={x - 6} y1={y + 6} x2={x + 6} y2={y - 6} />
                </g>
              ) : (
                <circle key={i} cx={x} cy={y} r="7" fill="none" stroke="#0e0e0e" strokeOpacity="0.25" strokeWidth="1.5" />
              );
            })}
            {/* year ring with uneven arcs */}
            <g transform="translate(420 120)">
              <circle r="80" fill="none" stroke="#0e0e0e" strokeOpacity="0.15" strokeWidth="14" />
              {[
                [0, 40],
                [70, 28],
                [120, 55],
                [200, 22],
                [250, 48],
                [320, 25],
              ].map(([start, len], i) => (
                <circle
                  key={i}
                  r="80"
                  fill="none"
                  stroke={a}
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={`${(len / 360) * 502} 502`}
                  transform={`rotate(${start - 90})`}
                />
              ))}
              <circle r="3.5" fill={a} />
            </g>
          </svg>
        </GraphicShell>
      );
    case "streamnow":
      return (
        <GraphicShell
          accent={a}
          label="The promise, visualised"
          left="≈45 hours a year lost to scrolling, sampling, giving up."
          right="One 90-second match flow — three confident picks."
        >
          <svg viewBox="0 0 560 240" className="w-full" aria-hidden>
            {/* scattered time blocks */}
            {Array.from({ length: 28 }, (_, i) => (
              <rect
                key={i}
                x={25 + (i % 7) * 32}
                y={35 + Math.floor(i / 7) * 42}
                width="20"
                height="26"
                rx="3"
                fill="#0e0e0e"
                opacity={0.12 + (i % 3) * 0.05}
              />
            ))}
            {/* 90s dial */}
            <g transform="translate(420 120)">
              <circle r="80" fill="none" stroke="#0e0e0e" strokeOpacity="0.15" strokeWidth="12" />
              <circle
                r="80"
                fill="none"
                stroke={a}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="125 502"
                transform="rotate(-90)"
              />
              <text textAnchor="middle" y="-2" fontSize="30" fontWeight="800" fill="#0e0e0e">
                90s
              </text>
              <text textAnchor="middle" y="22" fontSize="12" fill="#0e0e0e" opacity="0.6">
                3 PICKS
              </text>
            </g>
          </svg>
        </GraphicShell>
      );
    case "finance-ai":
      return (
        <GraphicShell
          accent={a}
          label="The behavioural gap, visualised"
          left="Cash forced a pause — you watched money leave."
          right="Digital spending is frictionless; Finance AI puts the pause back, as a coach."
        >
          <svg viewBox="0 0 560 240" className="w-full" aria-hidden>
            {/* cash path: pauses */}
            <path
              d="M30 80 h90 m18 0 h90 m18 0 h90 m18 0 h90"
              stroke="#0e0e0e"
              strokeOpacity="0.4"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {[120, 228, 336, 444].map((x) => (
              <circle key={x} cx={x} cy={80} r="6" fill="none" stroke="#0e0e0e" strokeOpacity="0.5" strokeWidth="2" />
            ))}
            <text x="30" y="52" fontSize="12" fill="#0e0e0e" opacity="0.55">
              CASH — EVERY PAYMENT IS A PAUSE
            </text>
            {/* digital path: straight, fast */}
            <path d="M30 160 H530" stroke="#0e0e0e" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
            <text x="30" y="132" fontSize="12" fill="#0e0e0e" opacity="0.55">
              DIGITAL — NO PAUSE AT ALL
            </text>
            {/* the coach moment */}
            <g transform="translate(280 160)">
              <circle r="22" fill={a} />
              <text textAnchor="middle" y="5" fontSize="16" fontWeight="700" fill="#fcfaf5">
                ✦
              </text>
            </g>
            <text x="280" y="212" fontSize="12" textAnchor="middle" fill="#0e0e0e" opacity="0.7">
              FINANCE AI — THE PAUSE, REBUILT AS A NUDGE
            </text>
          </svg>
        </GraphicShell>
      );
    case "mushroom-juniors":
      return (
        <GraphicShell
          accent={a}
          label="Who the design serves, visualised"
          left="A storefront is only half the product."
          right="One system, three users — shopper, store operator, developer."
        >
          <svg viewBox="0 0 560 240" className="w-full" aria-hidden>
            {[
              [200, 105, "SHOPPER"],
              [280, 150, "OPERATOR"],
              [360, 105, "DEVELOPER"],
            ].map(([cx, cy, label]) => (
              <g key={label as string}>
                <circle
                  cx={cx as number}
                  cy={cy as number}
                  r="62"
                  fill={a}
                  opacity="0.35"
                />
                <text
                  x={cx as number}
                  y={(cy as number) + (label === "OPERATOR" ? 45 : -45) * 1.6}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#0e0e0e"
                  opacity="0.7"
                >
                  {label}
                </text>
              </g>
            ))}
            <text x="280" y="122" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e0e0e">
              ONE SYSTEM
            </text>
          </svg>
        </GraphicShell>
      );
    case "sentinel":
      return (
        <GraphicShell
          accent={a}
          label="The signature decision, visualised"
          left="Agents act faster than any human can watch — most actions are low-risk and flow straight through."
          right="The risky ones stop at a human gate: approve, reject, or send back — before anything executes."
        >
          <svg viewBox="0 0 560 240" className="w-full" aria-hidden>
            {/* agents on the left */}
            {[48, 96, 144, 192].map((y, i) => (
              <g key={y}>
                <rect
                  x="24"
                  y={y - 15}
                  width="92"
                  height="30"
                  rx="6"
                  fill="none"
                  stroke="#0e0e0e"
                  strokeOpacity="0.25"
                  strokeWidth="1.5"
                />
                <circle cx="42" cy={y} r="4" fill={a} />
                <text x="56" y={y + 4} fontSize="11" fill="#0e0e0e" opacity="0.6">
                  agent {i + 1}
                </text>
                {/* flow line to the gate */}
                <line
                  x1="116"
                  y1={y}
                  x2="270"
                  y2="120"
                  stroke="#0e0e0e"
                  strokeOpacity={i === 1 ? "0" : "0.18"}
                  strokeWidth="1.5"
                />
              </g>
            ))}

            {/* the high-risk action that gets held */}
            <line
              x1="116"
              y1="96"
              x2="250"
              y2="110"
              stroke={a}
              strokeWidth="2.5"
            />
            <g transform="translate(250 110)">
              <circle r="11" fill="#fff" stroke={a} strokeWidth="2" />
              <line x1="-3" y1="-4" x2="-3" y2="4" stroke={a} strokeWidth="2" strokeLinecap="round" />
              <line x1="3" y1="-4" x2="3" y2="4" stroke={a} strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* human gate */}
            <line
              x1="300"
              y1="30"
              x2="300"
              y2="210"
              stroke={a}
              strokeWidth="2"
              strokeDasharray="4 6"
            />
            <g transform="translate(300 120)">
              <circle r="30" fill={a} />
              <circle cx="0" cy="-7" r="6" fill="#fcfaf5" />
              <path d="M-11 13a11 11 0 0 1 22 0z" fill="#fcfaf5" />
            </g>
            <text x="300" y="178" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e0e0e">
              HUMAN GATE
            </text>

            {/* approved flow continues to execution */}
            <line x1="330" y1="120" x2="500" y2="120" stroke="#0e0e0e" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
            <g transform="translate(516 120)">
              <circle r="14" fill="none" stroke="#0e0e0e" strokeOpacity="0.4" strokeWidth="1.5" />
              <path d="M-5 0 4 0 M0 -4 4 0 0 4" fill="none" stroke="#0e0e0e" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <text x="516" y="150" textAnchor="middle" fontSize="10" fill="#0e0e0e" opacity="0.55">
              EXECUTE
            </text>
          </svg>
        </GraphicShell>
      );
    case "fixit":
      return (
        <GraphicShell
          accent={a}
          label="The signature decision, visualised"
          left="A vision model hands you one confident answer — and it’s often wrong."
          right="Fixit shows a ranked differential with honest confidence, and refuses the fixes that could hurt you."
        >
          <svg viewBox="0 0 560 240" className="w-full" aria-hidden>
            {/* left: a single confident-but-wrong answer */}
            <rect x="24" y="66" width="170" height="104" rx="10" fill="none" stroke="#0e0e0e" strokeOpacity="0.25" strokeWidth="1.5" />
            <text x="40" y="94" fontSize="11" fill="#0e0e0e" opacity="0.55">ONE ANSWER</text>
            <rect x="40" y="108" width="138" height="10" rx="5" fill="#0e0e0e" opacity="0.12" />
            <rect x="40" y="108" width="132" height="10" rx="5" fill={a} />
            <text x="40" y="146" fontSize="12" fill="#0e0e0e" opacity="0.7">“It’s the pump.”</text>
            <g transform="translate(178 82)" stroke="#D5402B" strokeWidth="2.5" strokeLinecap="round">
              <line x1="-7" y1="-7" x2="7" y2="7" />
              <line x1="-7" y1="7" x2="7" y2="-7" />
            </g>
            <text x="244" y="124" fontSize="22" fill={a}>→</text>
            {/* right: a ranked differential + a safety check */}
            <g transform="translate(300 0)">
              <g transform="translate(0 60)">
                <circle cx="6" cy="6" r="5" fill={a} />
                <text x="20" y="10" fontSize="11" fill="#0e0e0e" opacity="0.6">Most likely</text>
                <rect x="20" y="20" width="150" height="9" rx="4.5" fill="#0e0e0e" opacity="0.1" />
                <rect x="20" y="20" width="132" height="9" rx="4.5" fill={a} />
              </g>
              <g transform="translate(0 102)">
                <circle cx="6" cy="6" r="5" fill={a} opacity="0.55" />
                <text x="20" y="10" fontSize="11" fill="#0e0e0e" opacity="0.6">Possible</text>
                <rect x="20" y="20" width="150" height="9" rx="4.5" fill="#0e0e0e" opacity="0.1" />
                <rect x="20" y="20" width="86" height="9" rx="4.5" fill={a} opacity="0.55" />
              </g>
              <g transform="translate(0 144)">
                <circle cx="6" cy="6" r="5" fill={a} opacity="0.3" />
                <text x="20" y="10" fontSize="11" fill="#0e0e0e" opacity="0.6">Less likely</text>
                <rect x="20" y="20" width="150" height="9" rx="4.5" fill="#0e0e0e" opacity="0.1" />
                <rect x="20" y="20" width="48" height="9" rx="4.5" fill={a} opacity="0.3" />
              </g>
              <g transform="translate(214 108)">
                <path d="M0 -24 L20 -14 V4 C20 19 0 28 0 28 C0 28 -20 19 -20 4 V-14 Z" fill={a} />
                <path d="M-8 2 l6 6 l10 -12" fill="none" stroke="#fcfaf5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <text x="214" y="152" textAnchor="middle" fontSize="10" fill="#0e0e0e" opacity="0.55">SAFE TO COACH</text>
            </g>
          </svg>
        </GraphicShell>
      );
    case "appeal":
      return (
        <GraphicShell
          accent={a}
          label="The signature move, visualised"
          left="A denial is written to be opaque — dense, procedural, easy to give up on."
          right="Appeal highlights the decisive clause and translates it, cited back to your own letter."
        >
          <svg viewBox="0 0 560 240" className="w-full" aria-hidden>
            {/* left: the dense denial letter with one clause highlighted */}
            <rect x="24" y="24" width="196" height="192" rx="8" fill="#fff" stroke="#0e0e0e" strokeOpacity="0.14" strokeWidth="1.5" />
            {[44, 60, 76, 92].map((y, i) => (
              <rect key={y} x="42" y={y} width={i % 2 ? 120 : 150} height="6" rx="3" fill="#0e0e0e" opacity="0.16" />
            ))}
            <rect x="34" y="106" width="176" height="28" rx="5" fill="#F1DAD3" />
            <rect x="42" y="117" width="150" height="6" rx="3" fill="#B4472F" />
            {[148, 164, 180].map((y, i) => (
              <rect key={y} x="42" y={y} width={i % 2 ? 110 : 150} height="6" rx="3" fill="#0e0e0e" opacity="0.16" />
            ))}
            <text x="246" y="124" fontSize="22" fill={a}>→</text>
            {/* right: the plain-language meaning + a citation chip */}
            <g transform="translate(300 40)">
              <rect x="0" y="0" width="236" height="160" rx="10" fill="#fff" stroke="#0e0e0e" strokeOpacity="0.12" strokeWidth="1.5" />
              <text x="18" y="36" fontSize="14" fontWeight="700" fill="#16243D">They never proved it.</text>
              {[56, 74, 92].map((y, i) => (
                <rect key={y} x="18" y={y} width={i === 2 ? 120 : 200} height="6" rx="3" fill="#16243D" opacity="0.18" />
              ))}
              <g transform="translate(18 116)">
                <rect x="0" y="0" width="156" height="28" rx="14" fill="#F6E4C2" />
                <circle cx="16" cy="14" r="4" fill={a} />
                <text x="28" y="18" fontSize="11" fill="#16243D">Denial letter, p.1</text>
              </g>
            </g>
          </svg>
        </GraphicShell>
      );
    default:
      return null;
  }
}

function GraphicShell({
  label,
  left,
  right,
  accent,
  children,
}: {
  label: string;
  left: string;
  right: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-ink/10 px-5 py-20 md:px-10 md:py-28">
      <Reveal className="mb-12">
        <Kicker mark="◎" label={label} accent={accent} />
      </Reveal>
      <Reveal
        className="mx-auto max-w-[980px] rounded-sm border border-ink/10 p-6 md:p-10"
        style={{
          backgroundColor: `color-mix(in srgb, ${accent} 5%, transparent)`,
        }}
        y={32}
      >
        {children}
        <div className="mt-8 grid gap-4 border-t border-ink/10 pt-6 text-[13px] normal-case leading-snug opacity-70 md:grid-cols-2">
          <p>{left}</p>
          <p className="md:text-right">{right}</p>
        </div>
      </Reveal>
    </section>
  );
}
