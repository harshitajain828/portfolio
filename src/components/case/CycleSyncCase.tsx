import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import FooterStrip from "@/components/FooterStrip";
import { Reveal, ScrollProgress } from "@/components/case/blocks";
import FigmaEmbed from "@/components/case/FigmaEmbed";

const CREAM = "#F4EEE4";
const SURFACE = "#FBF7EF";
const INK = "#33222A";
const TERRA = "#C2674A";
const SAGE = "#7F9374";
const PLUM = "#6B3A52";
const AMBER = "#D29A4E";
const LINE = "rgba(51,34,42,0.12)";

/* Year Ring motif — 12 month arcs */
function RingGraphic({ size = 240, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;
  const seg = (i: number) => {
    const pad = 0.06;
    const a0 = (i / 12) * 2 * Math.PI - Math.PI / 2 + pad;
    const a1 = ((i + 1) / 12) * 2 * Math.PI - Math.PI / 2 - pad;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const hot = i === 1 || i === 2 || i === 6;
    return (
      <path
        key={i}
        d={`M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`}
        fill="none"
        stroke={hot ? TERRA : SAGE}
        strokeOpacity={hot ? 1 : 0.5}
        strokeWidth={hot ? 9 : 5}
        strokeLinecap="round"
      />
    );
  };
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className={className} style={style} aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => seg(i))}
    </svg>
  );
}

function HandArrow({ flip, color = TERRA, className = "" }: { flip?: boolean; color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 64" className={className} style={{ transform: flip ? "scaleX(-1)" : undefined, color }} aria-hidden>
      <path d="M108 14 C 70 8, 32 22, 16 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 48 L 34 44 M16 48 L 22 30" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`mx-auto w-fit overflow-hidden rounded-[26px] border p-2 ${className}`} style={{ borderColor: LINE, backgroundColor: SURFACE }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="block max-h-[600px] w-auto rounded-[18px]" />
    </div>
  );
}

function Eyebrow({ label, center = false }: { label: string; center?: boolean }) {
  return (
    <div className={`label flex items-center gap-3 ${center ? "justify-center" : ""}`} style={{ color: TERRA }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: TERRA }} />
      <span>{label}</span>
    </div>
  );
}

export default function CycleSyncCase({
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
  // 0 Year Ring · 1 honest prediction · 2 onboarding · 3 community/trust

  return (
    <main style={{ backgroundColor: CREAM, color: INK }}>
      <ScrollProgress accent={TERRA} />

      {/* ══ HERO — centred, warm, ring motif ══ */}
      <section className="px-5 pt-28 pb-20 md:px-10 md:pb-24">
        <div className="label flex items-center justify-between" style={{ color: "rgba(51,34,42,0.55)" }}>
          <Link href="/work" className="hover-line pointer-events-auto">← All work</Link>
          <span className="flex items-center gap-4">
            <span className="mono">{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
            <span className="hidden sm:inline">{project.type}</span>
            <span className="mono">{project.year}</span>
          </span>
        </div>

        <div className="mt-16 flex flex-col items-center text-center">
          <Eyebrow label={`${project.role} · iOS`} center />
          <h1 className="serif mt-5 text-[19vw] leading-[0.95] md:text-[9vw]">CycleSync</h1>
          <p className="mt-6 max-w-[56ch] text-[17px] normal-case leading-relaxed md:text-[20px]" style={{ color: "rgba(51,34,42,0.78)" }}>
            A cycle and wellbeing companion for irregular bodies first. It shows
            the user’s real pattern instead of a broken month, is honest when it
            is not sure, keeps wellbeing alongside tracking, and treats the data
            as the user’s own.
          </p>
          <a href="#prototype" className="mt-8 inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-[15px] font-semibold" style={{ backgroundColor: TERRA, color: CREAM }}>
            <span>▶</span> View the prototype
          </a>

          <div className="relative mt-16 flex items-center justify-center">
            <RingGraphic size={520} className="pointer-events-none absolute hidden md:block" style={{ opacity: 0.4 }} />
            <Reveal y={28} className="relative z-10">
              <Phone src={project.images[0]} alt="CycleSync — the Year Ring" className="shadow-[0_34px_80px_rgba(51,34,42,0.18)]" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ THE PROBLEM ══ */}
      <section className="border-t px-5 py-20 text-center md:px-10 md:py-28" style={{ borderColor: LINE }}>
        <Reveal><Eyebrow label="The problem" center /></Reveal>
        <Reveal y={24}>
          <p className="serif mx-auto mt-8 max-w-[24ch] text-[30px] leading-[1.16] md:text-[46px]">
            The most common hormonal condition produces the most unpredictable
            cycles — and the tools are all built for predictability.
          </p>
        </Reveal>
        <Reveal delay={120} className="mx-auto mt-12 grid max-w-[820px] gap-8 md:grid-cols-3">
          {n.stats.map((s) => (
            <div key={s} className="serif text-[24px] leading-tight md:text-[26px]" style={{ color: TERRA }}>
              {s}
            </div>
          ))}
        </Reveal>
      </section>

      {/* ══ THE SIGNATURE — the Year Ring ══ */}
      <section className="px-5 py-20 md:px-10 md:py-28" style={{ backgroundColor: SURFACE }}>
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-6">
            <Phone src={project.images[0]} alt="The Year Ring" className="shadow-[0_24px_60px_rgba(51,34,42,0.14)]" />
          </Reveal>
          <Reveal delay={100} className="md:col-span-6">
            <Eyebrow label="The signature" />
            <div className="mt-5 flex items-center gap-5">
              <RingGraphic size={92} className="shrink-0" />
              <h2 className="serif text-[32px] leading-[1.05] md:text-[44px]">The Year Ring</h2>
            </div>
            <p className="mt-5 max-w-[48ch] text-[16px] normal-case leading-relaxed md:text-[18px]" style={{ color: "rgba(51,34,42,0.8)" }}>
              Instead of a monthly grid, the cycle is shown as a 12-month radial
              view. Period days, cycle lengths and symptoms sit around a circle,
              so a long or skipped cycle reads as the user’s real pattern rather
              than an error. A familiar month-detail grid stays one tap away.
            </p>
            <p className="hand mt-6 text-[26px] leading-tight" style={{ color: PLUM }}>
              an irregular cycle, read as a pattern — not a mistake
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ HONEST PREDICTION ══ */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-6 md:order-2">
            <Phone src={project.images[1]} alt="An estimate shown with its confidence" className="shadow-[0_24px_60px_rgba(51,34,42,0.14)]" />
          </Reveal>
          <Reveal delay={100} className="md:col-span-6 md:order-1">
            <Eyebrow label="Honesty over certainty" />
            <h2 className="serif mt-5 text-[30px] leading-[1.08] md:text-[40px]">
              A window with its confidence, not a false countdown.
            </h2>
            <p className="mt-5 max-w-[48ch] text-[16px] normal-case leading-relaxed md:text-[18px]" style={{ color: "rgba(51,34,42,0.8)" }}>
              Calendar prediction is only around 18% accurate for irregular
              cycles, so the app shows a probability window with its confidence
              and names anovulatory cycles plainly, rather than promising a date
              that may not come. For an anxious audience, being clear about
              uncertainty is what builds trust.
            </p>
            <p className="hand mt-6 text-[26px] leading-tight" style={{ color: TERRA }}>
              an estimate, not a promise
            </p>
            <HandArrow className="mt-2 h-12 w-24" />
          </Reveal>
        </div>
      </section>

      {/* ══ ONBOARDING + TRUST ══ */}
      <section className="px-5 py-20 md:px-10 md:py-28" style={{ backgroundColor: SURFACE }}>
        <Reveal className="mb-14"><Eyebrow label="Built on trust" center /></Reveal>
        <div className="mx-auto grid max-w-[1000px] gap-16 md:grid-cols-2 md:gap-12">
          {[
            { img: project.images[2], cap: cap[2] },
            { img: project.images[3], cap: cap[3] },
          ].filter((g) => g.img).map((g, i) => (
            <Reveal key={g.img} delay={i * 100} className="flex flex-col items-center text-center">
              <Phone src={g.img} alt={g.cap ?? `CycleSync screen ${i + 1}`} />
              <p className="hand mt-6 max-w-[34ch] text-[24px] leading-snug md:text-[26px]" style={{ color: PLUM }}>
                {g.cap}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ KEY DECISIONS ══ */}
      <section className="border-t px-5 py-20 md:px-10 md:py-28" style={{ borderColor: LINE }}>
        <Reveal className="mb-14"><Eyebrow label="Key decisions" /></Reveal>
        <div className="mx-auto flex max-w-[920px] flex-col">
          {n.decisions.map((d, i) => (
            <Reveal key={d.title} className="grid gap-4 border-t py-9 md:grid-cols-[64px_1fr] md:gap-10" style={{ borderColor: LINE }}>
              <div className="serif text-[34px] leading-none" style={{ color: TERRA }}>{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="serif text-[24px] leading-tight md:text-[28px]">{d.title}</h3>
                <p className="mt-3 max-w-[64ch] text-[14px] normal-case leading-relaxed md:text-[15px]" style={{ color: "rgba(51,34,42,0.78)" }}>{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ DESIGN SYSTEM ══ */}
      <section className="px-5 py-16 md:px-10 md:py-20" style={{ backgroundColor: SURFACE }}>
        <Reveal className="mb-6"><Eyebrow label="Design system" /></Reveal>
        <Reveal>
          <p className="mb-7 max-w-[60ch] text-[15px] normal-case leading-relaxed md:text-[16px]" style={{ color: "rgba(51,34,42,0.8)" }}>
            One warm, deliberately non-pink palette and a shared component set run
            through the product, so a symptom or a mood reads the same way on the
            ring, the log and the doctor summary.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {[["Cream", CREAM], ["Terracotta", TERRA], ["Sage", SAGE], ["Plum", PLUM], ["Amber", AMBER]].map(([name, c]) => (
              <div key={name} className="flex items-center gap-2.5 rounded-full border bg-white py-2 pl-2 pr-4" style={{ borderColor: LINE }}>
                <span className="h-7 w-7 rounded-full border" style={{ backgroundColor: c, borderColor: LINE }} />
                <span className="text-[13px]">{name}</span>
              </div>
            ))}
            <span className="label ml-2" style={{ color: "rgba(51,34,42,0.55)" }}>Instrument Serif · Inter</span>
          </div>
        </Reveal>
      </section>

      {/* ══ PROTOTYPE ══ */}
      <section id="prototype" className="px-5 py-24 text-center md:px-10 md:py-32" style={{ backgroundColor: PLUM, color: CREAM }}>
        <Reveal>
          <div className="label mb-5 flex items-center justify-center gap-3" style={{ color: "#E6C9A8" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#E6C9A8" }} />
            <span>The prototype</span>
          </div>
          <p className="mx-auto max-w-[52ch] text-[18px] normal-case leading-relaxed md:text-[22px]" style={{ opacity: 0.92 }}>
            A 24-screen mobile flow — onboarding, the Year Ring, logging, honest
            insights, the doctor summary, community and privacy controls — wired
            so it can be navigated from start to finish.
          </p>
          {project.figmaUrl ? (
            <div className="mx-auto mt-9 max-w-[400px]">
              <FigmaEmbed url={project.figmaUrl} title="CycleSync — Figma prototype" accent={TERRA} aspect="39 / 84" />
            </div>
          ) : (
            <span className="mono mt-8 inline-block rounded-full border px-5 py-3 text-[12px]" style={{ borderColor: "rgba(244,238,228,0.3)", opacity: 0.8 }}>
              Figma file — to be linked
            </span>
          )}
        </Reveal>
      </section>

      {/* ══ WHAT IT IS ══ */}
      <section className="grid gap-10 px-5 py-20 md:grid-cols-[230px_1fr] md:px-10 md:py-28">
        <Reveal><Eyebrow label="What it is" /></Reveal>
        <Reveal y={24}>
          <p className="serif max-w-[50ch] text-[22px] normal-case leading-[1.4] md:text-[28px]">{n.outcome}</p>
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
