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
