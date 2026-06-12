import type { Project } from "@/lib/projects";

/* ── research insights — cards ── */
export function Insights({
  items,
  accent,
}: {
  items: { title: string; body: string }[];
  accent: string;
}) {
  return (
    <section className="grid gap-8 border-t border-ink/10 px-5 py-20 md:grid-cols-[220px_1fr] md:px-10">
      <div className="label flex items-start gap-3 opacity-70">
        <span className="mono">+</span>
        <span>What the research said:</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it, i) => (
          <div
            key={it.title}
            className="rounded-sm border border-ink/15 p-6"
            style={{ borderTopWidth: 3, borderTopColor: accent }}
          >
            <div className="mono mb-4 opacity-50">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h4 className="text-[15px] font-semibold normal-case leading-snug">
              {it.title}
            </h4>
            <p className="mt-2 text-[13px] normal-case leading-relaxed opacity-75">
              {it.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── flow diagram — step chips with arrows ── */
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
    <section className="border-t border-ink/10 px-5 py-20 md:px-10">
      <div className="label mb-10 flex items-center gap-3 opacity-70">
        <span className="mono">→</span>
        <span>The core flow:</span>
      </div>
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-3 md:gap-4">
            <div
              className="rounded-full px-5 py-3 text-[13px] font-medium md:px-6 md:py-4 md:text-[15px]"
              style={
                i === steps.length - 1
                  ? { backgroundColor: accent, color: accentFg }
                  : { border: "1.5px solid var(--ink)" }
              }
            >
              <span className="mono mr-2 opacity-50">{i + 1}</span>
              {s}
            </div>
            {i < steps.length - 1 && (
              <span className="text-[20px] opacity-40">→</span>
            )}
          </div>
        ))}
      </div>
      {note && (
        <p className="serif-italic mt-8 text-[18px] opacity-70 md:text-[20px]">
          {note}
        </p>
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
    <section className="border-t border-ink/10 px-5 py-20 md:px-10">
      <div className="label mb-10 flex items-center gap-3 opacity-70">
        <span className="mono">vs</span>
        <span>The shift:</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-sm border border-ink/15 p-7 md:p-9">
          <div className="label mb-6 opacity-50">{theirLabel}</div>
          <ul className="flex flex-col gap-3">
            {theirs.map((t) => (
              <li
                key={t}
                className="flex gap-3 text-[14px] normal-case leading-snug opacity-70"
              >
                <span className="mono">✕</span> {t}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-sm p-7 md:p-9"
          style={{ backgroundColor: accent, color: accentFg }}
        >
          <div className="label mb-6 opacity-80">{ourLabel}</div>
          <ul className="flex flex-col gap-3">
            {ours.map((t) => (
              <li
                key={t}
                className="flex gap-3 text-[14px] font-medium normal-case leading-snug"
              >
                <span className="mono">✓</span> {t}
              </li>
            ))}
          </ul>
        </div>
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
          label="The signature decision, visualised:"
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
          label="The promise, visualised:"
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
          label="The behavioural gap, visualised:"
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
          label="Who the design serves, visualised:"
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
  children,
}: {
  label: string;
  left: string;
  right: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-ink/10 px-5 py-20 md:px-10">
      <div className="label mb-10 flex items-center gap-3 opacity-70">
        <span className="mono">◎</span>
        <span>{label}</span>
      </div>
      <div className="mx-auto max-w-[980px]">
        {children}
        <div className="mt-6 grid gap-4 text-[13px] normal-case leading-snug opacity-70 md:grid-cols-2">
          <p>{left}</p>
          <p className="md:text-right">{right}</p>
        </div>
      </div>
    </section>
  );
}
