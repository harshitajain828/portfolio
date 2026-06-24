import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import FooterStrip from "@/components/FooterStrip";
import { Reveal, ScrollProgress } from "@/components/case/blocks";
import FigmaEmbed from "@/components/case/FigmaEmbed";

const BASE = "#0E1117";
const S900 = "#141821";
const LINE = "rgba(255,255,255,0.08)";
const LINE2 = "rgba(255,255,255,0.16)";
const TEXT = "#C2C8D4";
const DIM = "#6B7385";
const WHITE = "#FFFFFF";
const ACCENT = "#4F86E6";
const GREEN = "#18A957";
const AMBER = "#E0980E";
const RED = "#E0392B";
const VIOLET = "#7C5CF0";

/* faux app-window chrome around a wide console screenshot */
function Window({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-xl border shadow-[0_30px_80px_rgba(0,0,0,0.5)]" style={{ borderColor: LINE2, background: S900 }}>
      <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: LINE }}>
        <span className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#3a4150" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#3a4150" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#3a4150" }} />
        </span>
        <span className="mono text-[11px]" style={{ color: DIM }}>{label}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </div>
  );
}

export default function SentinelCase({
  project,
  index,
  total,
  next,
}: {
  project: Project;
  index: number;
  total: number;
  next: Project;
}) {
  const n = project.narrative;
  const cap = project.imageCaptions ?? [];
  // 0 agent detail · 1 oversight gate · 2 investigation · 3 audit · 4 review queue · 5 design system · 6 analytics

  const telemetry: [string, string][] = [
    ["REGULATION", "EU AI Act Art. 14"],
    ["SCREENS", "40"],
    ["FLOWS", "3"],
    ["SYSTEM", "One design system"],
    ["STATUS", "Concept"],
  ];

  const obligations = [
    {
      n: "01",
      word: "Understand",
      img: project.images[1],
      label: "oversight-gate — sentinel",
      body:
        "Every decision surfaces the model’s confidence, the policy checks it passed or failed, and a step-by-step reasoning trace — including a fairness check — before the operator commits. A decision a person cannot interrogate is not oversight.",
    },
    {
      n: "02",
      word: "Intervene",
      img: project.images[0],
      label: "agent-detail — sentinel",
      body:
        "When an agent drifts, the operator can throttle or pause that single agent while the rest keep running. High-risk actions pause and wait for a human, and the review queue is ranked so the most dangerous item is always on top.",
    },
    {
      n: "03",
      word: "Prove",
      img: project.images[3],
      label: "audit-trail — sentinel",
      body:
        "A tamper-evident timeline records every system, agent and human action as the work happens — reconstructable exactly as it stood at decision time, and mapped to the rule it satisfies. The audit answer exists before a regulator asks.",
    },
  ];

  return (
    <main style={{ backgroundColor: BASE, color: TEXT }}>
      <ScrollProgress accent={ACCENT} />

      {/* ══ HERO — app chrome + full-bleed console ══ */}
      <section className="pt-16 md:pt-20">
        <div className="flex items-center justify-between border-b px-5 py-3.5 md:px-10" style={{ borderColor: LINE }}>
          <span className="mono text-[12px]">
            <span style={{ letterSpacing: "0.2em", color: WHITE }}>SENTINEL</span>
            <span style={{ color: DIM }}> / OVERSIGHT CONSOLE</span>
          </span>
          <span className="label flex items-center gap-4" style={{ color: DIM }}>
            <Link href="/work" className="hover-line pointer-events-auto">← All work</Link>
            <span className="mono">{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
            <span className="mono">{project.year}</span>
          </span>
        </div>

        <div className="px-5 pt-16 md:px-10 md:pt-24">
          <div className="label mb-5" style={{ color: ACCENT }}>{project.type} · Enterprise · {project.role}</div>
          <h1 className="max-w-[18ch] text-[9vw] font-semibold leading-[1.04] tracking-tight md:text-[4.6vw]" style={{ color: WHITE }}>
            Supervising the AI agents that decide who gets a loan.
          </h1>
          <p className="mt-6 max-w-[62ch] text-[16px] leading-relaxed md:text-[19px]" style={{ color: TEXT }}>
            One operator supervises a fleet of financial agents — catching an
            agent as it drifts, approving or rejecting a high-risk action before
            it runs, and reconstructing any past decision for an auditor.
          </p>
          <a href="#prototype" className="mt-8 inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-[15px] font-semibold" style={{ backgroundColor: ACCENT, color: BASE }}>
            <span>▶</span> View the prototype
          </a>
        </div>

        <div className="px-5 pt-12 md:px-10 md:pt-16">
          <Reveal y={28}>
            <Window src={project.images[4]} alt="Sentinel — the risk-ranked review queue" label="review-queue — sentinel" />
          </Reveal>
        </div>
      </section>

      {/* ══ TELEMETRY STRIP ══ */}
      <section className="mt-20 border-y md:mt-28" style={{ borderColor: LINE }}>
        <div className="grid grid-cols-2 md:grid-cols-5">
          {telemetry.map(([k, v], i) => (
            <div
              key={k}
              className="px-5 py-7 md:px-8"
              style={{ borderLeft: i === 0 ? undefined : `1px solid ${LINE}` }}
            >
              <div className="mono text-[11px]" style={{ color: DIM }}>{k}</div>
              <div className="mt-2 text-[15px] md:text-[16px]" style={{ color: WHITE }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ THE MANDATE ══ */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="label flex items-center gap-3" style={{ color: ACCENT }}>
            <span className="mono">01</span>
            <span className="h-px w-10" style={{ background: ACCENT }} />
            <span>The mandate</span>
          </div>
        </Reveal>
        <Reveal y={24} className="mt-10 grid gap-12 md:grid-cols-[1.25fr_1fr] md:gap-16">
          <div>
            <p className="text-[26px] font-semibold normal-case leading-[1.18] tracking-tight md:text-[36px]" style={{ color: WHITE }}>
              From August 2026, the EU AI Act requires a human who can understand a
              high-risk credit decision, override it, and stop it.
            </p>
            <p className="mt-7 max-w-[56ch] text-[15px] normal-case leading-relaxed md:text-[16px]" style={{ color: TEXT }}>
              High-stakes finance is handing these decisions — who gets a loan,
              whose account is frozen, which borrower is contacted — to agents that
              act faster than any person can watch. The design problem is not
              building the agents; it is building the cockpit that lets one person
              genuinely supervise many of them, step in within seconds, and prove
              afterwards that a human was in control.
            </p>
          </div>
          <div className="self-start rounded-2xl border p-7" style={{ borderColor: LINE2, background: S900 }}>
            <div className="mono text-[11px]" style={{ color: RED }}>THE COST OF GETTING IT WRONG</div>
            <p className="mt-4 text-[15px] normal-case leading-relaxed" style={{ color: TEXT }}>
              In July 2025 the Massachusetts Attorney General settled with a lender
              for <span style={{ color: WHITE }}>$2.5M</span> over an AI model that
              produced disparate impact through a proxy variable.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ══ THE ARTICLE 14 SPINE ══ */}
      <section className="border-t px-5 py-20 md:px-10 md:py-28" style={{ borderColor: LINE }}>
        <Reveal className="mb-4">
          <div className="label flex items-center gap-3" style={{ color: ACCENT }}>
            <span className="mono">02</span>
            <span className="h-px w-10" style={{ background: ACCENT }} />
            <span>Three obligations, one console</span>
          </div>
        </Reveal>
        <div className="flex flex-col gap-24 md:gap-32">
          {obligations.map((o) => (
            <Reveal key={o.word} y={28}>
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <span className="mono text-[13px]" style={{ color: ACCENT }}>{o.n}</span>
                <h3 className="text-[12vw] font-semibold leading-[0.95] tracking-tight md:text-[4.2vw]" style={{ color: WHITE }}>
                  {o.word}
                </h3>
                <span className="label" style={{ color: DIM }}>EU AI Act · Article 14</span>
              </div>
              <p className="mt-6 max-w-[72ch] text-[15px] normal-case leading-relaxed md:text-[17px]" style={{ color: TEXT }}>
                {o.body}
              </p>
              <div className="mt-10">
                <Window src={o.img} alt={o.word} label={o.label} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ MORE OF THE CONSOLE ══ */}
      <section className="border-t px-5 py-20 md:px-10 md:py-28" style={{ borderColor: LINE }}>
        <Reveal className="mb-12">
          <div className="label flex items-center gap-3" style={{ color: ACCENT }}>
            <span className="mono">03</span>
            <span className="h-px w-10" style={{ background: ACCENT }} />
            <span>Across the console</span>
          </div>
        </Reveal>
        <div className="flex flex-col gap-20">
          {[
            { img: project.images[2], cap: cap[2], label: "investigation — sentinel" },
            { img: project.images[6], cap: cap[6], label: "analytics — sentinel" },
          ].filter((g) => g.img).map((g, i) => (
            <Reveal key={g.label} y={24}>
              <Window src={g.img} alt={g.cap ?? g.label} label={g.label} />
              <div className={`mt-5 flex ${i % 2 ? "justify-end" : ""}`}>
                <p className="hand max-w-[44ch] text-[24px] leading-snug md:text-[28px]" style={{ color: "#E7ECF4" }}>
                  {g.cap}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ KEY DECISIONS ══ */}
      <section className="border-t px-5 py-20 md:px-10 md:py-28" style={{ borderColor: LINE }}>
        <Reveal className="mb-12">
          <div className="label flex items-center gap-3" style={{ color: ACCENT }}>
            <span className="mono">04</span>
            <span className="h-px w-10" style={{ background: ACCENT }} />
            <span>Key decisions</span>
          </div>
        </Reveal>
        <div className="flex flex-col">
          {n.decisions.map((d, i) => (
            <Reveal key={d.title} className="grid gap-4 border-t py-8 md:grid-cols-[64px_1fr] md:gap-10" >
              <div className="mono text-[14px]" style={{ color: DIM }}>{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="text-[20px] font-semibold leading-tight tracking-tight md:text-[24px]" style={{ color: WHITE }}>
                  {d.title}
                </h3>
                <p className="mt-3 max-w-[80ch] text-[14px] normal-case leading-relaxed md:text-[15px]" style={{ color: TEXT }}>{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ DESIGN SYSTEM ══ */}
      <section className="border-t px-5 py-20 md:px-10 md:py-28" style={{ borderColor: LINE }}>
        <Reveal className="mb-8">
          <div className="label flex items-center gap-3" style={{ color: ACCENT }}>
            <span className="mono">05</span>
            <span className="h-px w-10" style={{ background: ACCENT }} />
            <span>One design system</span>
          </div>
        </Reveal>
        <Reveal className="mb-10 flex flex-wrap items-center gap-3">
          {[["Agent", ACCENT], ["Approved", GREEN], ["Awaiting", AMBER], ["Reject", RED], ["AI", VIOLET]].map(([name, c]) => (
            <div key={name} className="flex items-center gap-2.5 rounded-full border py-2 pl-2 pr-4" style={{ borderColor: LINE2 }}>
              <span className="h-6 w-6 rounded-full" style={{ backgroundColor: c }} />
              <span className="text-[13px]" style={{ color: TEXT }}>{name}</span>
            </div>
          ))}
          <span className="label ml-2" style={{ color: DIM }}>Inter · IBM Plex Mono · status never by colour alone</span>
        </Reveal>
        {project.images[5] && (
          <Reveal y={24}>
            <Window src={project.images[5]} alt={cap[5] ?? "Design system"} label="design-system — sentinel" />
          </Reveal>
        )}
      </section>

      {/* ══ PROTOTYPE ══ */}
      <section id="prototype" className="border-t px-5 py-24 md:px-10 md:py-32" style={{ borderColor: LINE }}>
        <Reveal>
          <div className="label mb-5 flex items-center gap-3" style={{ color: ACCENT }}>
            <span className="mono">▶</span>
            <span>The prototype</span>
          </div>
          <p className="max-w-[58ch] text-[18px] normal-case leading-relaxed md:text-[22px]" style={{ color: TEXT }}>
            The console is wired end to end — fleet monitoring, the review gate,
            reasoning-replay, the audit trail, policy governance and the full
            shell — navigable from a single start.
          </p>
          {project.figmaUrl ? (
            <div className="mt-9 max-w-[1000px]">
              <FigmaEmbed url={project.figmaUrl} title="Sentinel — Figma prototype" accent={ACCENT} />
            </div>
          ) : (
            <span className="mono mt-8 inline-block rounded-full border px-5 py-3 text-[12px]" style={{ borderColor: LINE2, color: DIM }}>
              Figma file — to be linked
            </span>
          )}
        </Reveal>
      </section>

      {/* ══ STATUS ══ */}
      <section className="grid gap-10 border-t px-5 py-20 md:grid-cols-[230px_1fr] md:px-10 md:py-28" style={{ borderColor: LINE }}>
        <Reveal>
          <div className="label flex items-center gap-3" style={{ color: ACCENT }}>
            <span className="mono">06</span>
            <span className="h-px w-10" style={{ background: ACCENT }} />
            <span>What it is</span>
          </div>
        </Reveal>
        <Reveal y={24}>
          <p className="max-w-[64ch] text-[19px] normal-case leading-[1.5] md:text-[22px]" style={{ color: TEXT }}>{n.outcome}</p>
        </Reveal>
      </section>

      {/* ══ NEXT ══ */}
      <Link
        href={`/work/${next.slug}`}
        className="group relative block overflow-hidden px-5 py-20 md:px-10 md:py-24"
        style={{ backgroundColor: next.accent, color: next.accentFg }}
      >
        <div className="label mb-5 flex items-center gap-3 opacity-80">
          <span className="mono">→</span><span>Next project</span>
        </div>
        <div className="flex items-end justify-between gap-8">
          <span className="font-display text-[12vw] leading-[0.95] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 md:text-[7vw]">
            {next.title} →
          </span>
          <span className="relative hidden aspect-[3/4] w-[160px] rotate-3 overflow-hidden rounded-sm shadow-[0_16px_50px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:rotate-0 md:block">
            <Image src={next.cover} alt={next.title} fill sizes="160px" className="object-cover" />
          </span>
        </div>
      </Link>

      <FooterStrip />
    </main>
  );
}
