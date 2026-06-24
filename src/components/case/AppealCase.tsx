import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import FooterStrip from "@/components/FooterStrip";
import { Reveal, ScrollProgress } from "@/components/case/blocks";
import FigmaEmbed from "@/components/case/FigmaEmbed";

const INK = "#16243D";
const PAPER = "#F6F2EA";
const MARIGOLD = "#E0A23B";
const GREEN = "#1F7A5C";
const BRICK = "#B4472F";

/* hand-drawn annotation arrow */
function HandArrow({ flip, color = INK, className = "" }: { flip?: boolean; color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 64" className={className} style={{ transform: flip ? "scaleX(-1)" : undefined, color }} aria-hidden>
      <path d="M108 14 C 70 8, 32 22, 16 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 48 L 34 44 M16 48 L 22 30" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/* recreated case-strength meter (illustrative graphic) */
function StrengthMeter({ filled = 4, total = 5, label = "Strong case" }: { filled?: number; total?: number; label?: string }) {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="mono text-[12px] opacity-60">CASE STRENGTH</span>
        <span className="font-fraunces text-[20px]" style={{ color: GREEN }}>{label}</span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className="h-2.5 flex-1 rounded-full" style={{ background: i < filled ? GREEN : "rgba(22,36,61,0.12)" }} />
        ))}
      </div>
      <div className="mono mt-3 text-[11px] opacity-45">base rate — appeals like this succeed roughly 40–80% of the time</div>
    </div>
  );
}

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`mx-auto w-fit overflow-hidden rounded-[22px] border border-[#16243D]/10 p-2 ${className}`} style={{ backgroundColor: "rgba(224,162,59,0.12)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="block max-h-[560px] w-auto rounded-[14px]" />
    </div>
  );
}

function Eyebrow({ mark, label, color = MARIGOLD, light = false }: { mark: string; label: string; color?: string; light?: boolean }) {
  return (
    <div className={`label flex items-center gap-3 ${light ? "opacity-90" : "opacity-70"}`}>
      <span className="mono" style={{ color }}>{mark}</span>
      <span className="h-px w-10" style={{ background: color, opacity: light ? 0.6 : 1 }} />
      <span>{label}</span>
    </div>
  );
}

export default function AppealCase({
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
  // images: 0 flow · 1 decode · 2 verdict · 3 draft · 4 timeline · 5 privacy
  const gallery = [
    { src: project.images[3], cap: cap[3] },
    { src: project.images[4], cap: cap[4] },
    { src: project.images[5], cap: cap[5] },
  ].filter((g) => g.src);

  return (
    <main style={{ backgroundColor: PAPER, color: INK }}>
      <ScrollProgress accent={MARIGOLD} />

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden px-5 pt-28 md:px-10" style={{ backgroundColor: INK, color: PAPER }}>
        <div className="label flex items-center justify-between opacity-75">
          <Link href="/work" className="hover-line pointer-events-auto">← All work</Link>
          <span className="flex items-center gap-4">
            <span className="mono">{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
            <span className="hidden sm:inline">{project.type}</span>
            <span className="mono">{project.year}</span>
          </span>
        </div>

        <div className="grid items-center gap-10 pt-12 md:grid-cols-[1.1fr_0.9fr] md:pt-14">
          <div className="pb-16 md:pb-24">
            <div className="label mb-5 opacity-65">{project.role} · iOS</div>
            <h1 className="font-fraunces text-[20vw] leading-[0.9] md:text-[10vw]">
              Appeal<span style={{ color: MARIGOLD }}>.</span>
            </h1>
            <p className="mt-7 max-w-[48ch] text-[17px] leading-relaxed opacity-85 md:text-[20px]">
              An AI tool for contesting a denied health-insurance claim. The user
              photographs the denial letter; the app explains the real reason in
              plain language, sets out the grounds for an appeal — each cited to
              the user’s own documents — and helps draft a letter the user edits
              and sends.
            </p>
            <a href="#prototype" className="mt-8 inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-[15px] font-semibold" style={{ backgroundColor: MARIGOLD, color: INK }}>
              <span>▶</span> View the prototype
            </a>
          </div>

          <div className="relative mx-auto flex w-full max-w-[400px] items-end justify-center pb-12 md:pb-20">
            <div className="relative w-[46%] -translate-y-2 -rotate-[7deg]">
              <div className="overflow-hidden rounded-[20px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <Image src={project.images[2]} alt="" width={390} height={844} className="block h-auto w-full" />
              </div>
            </div>
            <div className="relative z-10 -ml-5 w-[54%] rotate-[3deg]">
              <div className="overflow-hidden rounded-[24px] border border-white/10 shadow-[0_38px_85px_rgba(0,0,0,0.55)]">
                <Image src={project.images[1]} alt="Appeal — the decode screen" width={390} height={844} priority className="block h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ THE PROBLEM ══ */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <Reveal><Eyebrow mark="01" label="The problem" /></Reveal>
        <div className="mt-10 grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <Reveal y={24}>
            <p className="font-fraunces max-w-[28ch] text-[28px] leading-[1.2] md:text-[38px]">
              Most denied claims are never appealed — not because they lack merit,
              but because the process is made opaque and exhausting.
            </p>
            <p className="hand mt-9 max-w-[26ch] text-[26px] leading-tight md:text-[32px]" style={{ color: INK }}>
              “What does this even mean — do I have a case, and what am I supposed
              to say?”
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-center gap-8 md:border-l md:border-[#16243D]/15 md:pl-16">
            {n.stats.map((s) => (
              <div key={s} className="font-fraunces text-[24px] leading-tight md:text-[28px]" style={{ color: BRICK }}>
                {s}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ WHERE EXISTING TOOLS FALL SHORT ══ */}
      <section className="px-5 py-20 md:px-10 md:py-28" style={{ backgroundColor: INK, color: PAPER }}>
        <Reveal><Eyebrow mark="02" label="Where existing tools fall short" color={MARIGOLD} light /></Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="font-fraunces text-[24px] leading-[1.32] md:text-[30px]">
              Letter generators produce a document full of claims the user cannot
              verify, and some imply that they act as a lawyer.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-fraunces text-[24px] leading-[1.32] md:text-[30px]">
              The cautionary case is a service whose regulatory settlement
              describes exactly what to avoid: untested advice, fabricated
              documents and overstated authority.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ THE APPROACH ══ */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <Reveal><Eyebrow mark="◇" label="The approach" /></Reveal>
        <Reveal y={24} className="mt-10">
          <p className="font-fraunces max-w-[42ch] text-[24px] leading-[1.32] md:text-[34px]">
            The aim is to address the part no existing tool owns: helping the user
            understand the denial and judge whether they have a case, before any
            letter is written.
          </p>
          <p className="mt-6 max-w-[64ch] text-[15px] normal-case leading-relaxed opacity-80 md:text-[17px]">
            The design is built on traceability and honest confidence — every
            claim is tied to a source the user can check, the strength of the case
            is stated plainly, and the user remains the author of the appeal
            throughout.
          </p>
        </Reveal>
      </section>

      {/* ══ THE SIGNATURE — decode + cited verdict ══ */}
      <section className="px-5 py-20 md:px-10 md:py-28" style={{ backgroundColor: "rgba(224,162,59,0.10)" }}>
        <Reveal className="mb-14"><Eyebrow mark="◎" label="Traceability and honest confidence" /></Reveal>

        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-7">
            <Phone src={project.images[1]} alt="The decode — the decisive clause explained" />
          </Reveal>
          <Reveal delay={100} className="md:col-span-5">
            <h3 className="font-fraunces text-[26px] leading-tight md:text-[34px]">
              The real reason, in plain language.
            </h3>
            <p className="mt-4 text-[15px] normal-case leading-relaxed opacity-80">
              The user’s own letter is shown with the decisive clause highlighted,
              beside a plain-language explanation of what it means. Where a denial
              gives no stated reason — the largest category — that absence is
              itself presented as a basis for appeal.
            </p>
            <p className="hand mt-5 text-[24px] leading-tight" style={{ color: INK }}>
              highlighted in the user’s own letter
            </p>
          </Reveal>
        </div>

        <div className="mt-24 grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-7 md:order-2">
            <Phone src={project.images[2]} alt="The verdict — cited grounds and a calibrated strength estimate" />
          </Reveal>
          <Reveal delay={100} className="md:col-span-5 md:order-1 md:text-right">
            <h3 className="font-fraunces text-[26px] leading-tight md:text-[34px]">
              A verdict that can be checked.
            </h3>
            <p className="mt-4 text-[15px] normal-case leading-relaxed opacity-80">
              The verdict pairs a calibrated strength estimate with an honest base
              rate, and every ground carries a citation that traces back to a
              specific line in the user’s documents or a named regulation.
            </p>
            <div className="mt-7 rounded-2xl border border-[#16243D]/10 bg-white p-5 text-left">
              <StrengthMeter />
            </div>
            <p className="hand mt-5 text-[24px] leading-tight" style={{ color: BRICK }}>
              every ground cited to a source
            </p>
            <HandArrow flip color={BRICK} className="ml-auto mt-2 h-12 w-24" />
          </Reveal>
        </div>
      </section>

      {/* ══ THE CORE LOOP ══ */}
      {project.images[0] && (
        <section className="px-5 py-20 md:px-10 md:py-28">
          <Reveal className="mb-10"><Eyebrow mark="→" label="The core loop" /></Reveal>
          <Reveal y={28}>
            <div className="overflow-hidden rounded-2xl border border-[#16243D]/10 p-3" style={{ backgroundColor: "rgba(224,162,59,0.10)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.images[0]} alt={cap[0] ?? "Core loop"} loading="lazy" className="block w-full rounded-xl" />
            </div>
            <p className="hand mx-auto mt-6 max-w-[42ch] text-center text-[26px] leading-snug" style={{ color: INK }}>
              {cap[0]}
            </p>
          </Reveal>
        </section>
      )}

      {/* ══ INSIDE THE APP ══ */}
      {gallery.length > 0 && (
        <section className="border-t border-[#16243D]/10 px-5 py-20 md:px-10 md:py-28">
          <Reveal className="mb-16"><Eyebrow mark="◇" label="Inside the app" /></Reveal>
          <div className="mx-auto flex max-w-[1100px] flex-col gap-24 md:gap-32">
            {gallery.map((g, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal key={g.src} y={28}>
                  <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                    <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                      <Phone src={g.src} alt={g.cap ?? `Appeal screen ${i + 1}`} />
                    </div>
                    <div className={`md:col-span-5 ${flip ? "md:order-1 md:text-right" : ""}`}>
                      <div className="mono mb-3 text-[12px]" style={{ color: MARIGOLD }}>{String(i + 1).padStart(2, "0")}</div>
                      <p className="hand text-[28px] leading-snug md:text-[34px]" style={{ color: INK }}>{g.cap}</p>
                      <HandArrow flip={flip} className={`mt-4 h-14 w-28 ${flip ? "ml-auto" : ""}`} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* ══ KEY DECISIONS ══ */}
      <section className="border-t border-[#16243D]/10 px-5 py-20 md:px-10 md:py-28">
        <Reveal className="mb-14"><Eyebrow mark="03" label="Key decisions" /></Reveal>
        <div className="mx-auto flex max-w-[920px] flex-col">
          {n.decisions.map((d, i) => (
            <Reveal key={d.title} className="grid gap-4 border-t border-[#16243D]/10 py-9 md:grid-cols-[90px_1fr] md:gap-10">
              <div className="font-fraunces text-[40px] leading-none md:text-[52px]" style={{ color: MARIGOLD }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-fraunces text-[24px] leading-tight md:text-[28px]">{d.title}</h3>
                <p className="mt-3 max-w-[64ch] text-[14px] normal-case leading-relaxed opacity-80 md:text-[15px]">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ DESIGN SYSTEM ══ */}
      <section className="px-5 py-16 md:px-10 md:py-20" style={{ backgroundColor: "rgba(224,162,59,0.10)" }}>
        <Reveal className="mb-6"><Eyebrow mark="◳" label="Design system" /></Reveal>
        <Reveal>
          <p className="mb-7 max-w-[60ch] text-[15px] normal-case leading-relaxed opacity-80 md:text-[16px]">
            One set of tokens and shared components runs through the product, so a
            citation, a verdict or a strength estimate reads the same way on every
            screen.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {[["Ink", INK], ["Paper", PAPER], ["Marigold", MARIGOLD], ["Verdict", GREEN], ["Denial", BRICK]].map(([name, c]) => (
              <div key={name} className="flex items-center gap-2.5 rounded-full border border-[#16243D]/15 bg-white py-2 pl-2 pr-4">
                <span className="h-7 w-7 rounded-full border border-[#16243D]/10" style={{ backgroundColor: c }} />
                <span className="text-[13px]">{name}</span>
              </div>
            ))}
            <span className="label ml-2 opacity-60">Fraunces · Inter · Space Mono</span>
          </div>
        </Reveal>
      </section>

      {/* ══ PROTOTYPE ══ */}
      <section id="prototype" className="px-5 py-24 md:px-10 md:py-32" style={{ backgroundColor: INK, color: PAPER }}>
        <Reveal>
          <Eyebrow mark="▶" label="The prototype" color={MARIGOLD} light />
          <p className="mt-7 max-w-[58ch] text-[18px] leading-relaxed opacity-90 md:text-[22px]">
            All 78 screens are connected into a single flow — capture, the decode,
            the cited verdict, the draft editor, send-and-track, the evidence
            locker, privacy and the edge cases — that can be navigated from start
            to finish.
          </p>
          {project.figmaUrl && (
            <div className="mt-9 max-w-[920px]">
              <FigmaEmbed url={project.figmaUrl} title="Appeal — Figma prototype" accent={MARIGOLD} />
            </div>
          )}
        </Reveal>
      </section>

      {/* ══ WHAT IT IS ══ */}
      <section className="grid gap-10 px-5 py-20 md:grid-cols-[230px_1fr] md:px-10 md:py-28">
        <Reveal><Eyebrow mark="04" label="What it is" /></Reveal>
        <Reveal y={24}>
          <p className="font-fraunces max-w-[50ch] text-[22px] normal-case leading-[1.4] md:text-[28px]">{n.outcome}</p>
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
