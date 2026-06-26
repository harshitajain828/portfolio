import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import FooterStrip from "@/components/FooterStrip";
import { Reveal, ScrollProgress } from "@/components/case/blocks";
import FigmaEmbed from "@/components/case/FigmaEmbed";

// Vibrant, joyful palette (derived from the Behance refs). Names kept for
// diffing; values are now coral / green / violet / sun / sky. Still anti-pink.
const CREAM = "#FBF4EA";
const INK = "#3A2A30";
const TERRA = "#F4663C"; // coral (primary)
const SAGE = "#2BC48A"; // green
const PLUM = "#7B61FF"; // violet
const BUTTER = "#FFC23D"; // sun
const SKY = "#4FA4F0"; // sky
const LINE = "rgba(58,42,48,0.12)";

function Sparkle({ className = "", color = TERRA }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={{ color }} aria-hidden>
      <path d="M12 0 C13.2 8, 16 10.8, 24 12 C16 13.2, 13.2 16, 12 24 C10.8 16, 8 13.2, 0 12 C8 10.8, 10.8 8, 12 0 Z" fill="currentColor" />
    </svg>
  );
}

/* colourful 12-month Year Ring motif */
function RingGraphic({ size = 240, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 10;
  const cols = [TERRA, SAGE, BUTTER, PLUM, SKY];
  const seg = (i: number) => {
    const pad = 0.07;
    const a0 = (i / 12) * 2 * Math.PI - Math.PI / 2 + pad;
    const a1 = ((i + 1) / 12) * 2 * Math.PI - Math.PI / 2 - pad;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const hot = i === 1 || i === 2 || i === 7;
    return (
      <path key={i} d={`M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`} fill="none"
        stroke={cols[i % cols.length]} strokeOpacity={hot ? 1 : 0.55}
        strokeWidth={hot ? 10 : 6} strokeLinecap="round" />
    );
  };
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className={className} style={style} aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => seg(i))}
    </svg>
  );
}

function Pill({ children, bg = "rgba(43,196,138,0.18)", color = INK, className = "" }: { children: React.ReactNode; bg?: string; color?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium ${className}`} style={{ backgroundColor: bg, color }}>
      {children}
    </span>
  );
}

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`mx-auto w-fit overflow-hidden rounded-[30px] border-[6px] border-white p-0 shadow-[0_30px_70px_rgba(58,42,48,0.22)] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="block max-h-[600px] w-auto rounded-[24px]" />
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
  const statColors = [BUTTER, SAGE, SKY];

  return (
    <main className="font-round overflow-hidden" style={{ backgroundColor: CREAM, color: INK }}>
      <ScrollProgress accent={TERRA} />

      {/* ══ HERO ══ */}
      <section className="relative px-5 pb-24 pt-28 text-center md:px-10">
        {/* decorative shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full" style={{ background: SAGE, opacity: 0.16 }} />
          <div className="absolute -right-16 top-44 h-56 w-56 rounded-full" style={{ background: BUTTER, opacity: 0.2 }} />
          <div className="absolute bottom-10 left-1/4 h-40 w-40 rounded-full" style={{ background: SKY, opacity: 0.16 }} />
          <Sparkle className="absolute left-[18%] top-[22%] h-6 w-6" color={TERRA} />
          <Sparkle className="absolute right-[22%] top-[30%] h-5 w-5" color={PLUM} />
          <Sparkle className="absolute left-[40%] top-[12%] h-4 w-4" color={BUTTER} />
        </div>

        <div className="relative">
          <div className="label flex items-center justify-between" style={{ color: "rgba(58,42,48,0.55)" }}>
            <Link href="/work" className="hover-line pointer-events-auto">← All work</Link>
            <span className="flex items-center gap-4">
              <span className="mono">{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
              <span className="hidden sm:inline">{project.type}</span>
              <span className="mono">{project.year}</span>
            </span>
          </div>

          <div className="mt-14 flex flex-col items-center">
            <Pill bg="rgba(43,196,138,0.18)" color="#0E7A52">
              <span className="h-2 w-2 rounded-full" style={{ background: SAGE }} />
              Cycle &amp; wellbeing companion · iOS
            </Pill>
            <h1 className="font-round mt-6 text-[20vw] leading-[0.95] md:text-[9.5vw]" style={{ fontWeight: 600, color: TERRA }}>
              CycleSync<span style={{ color: SAGE }}>.</span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed md:text-[20px]" style={{ color: "rgba(58,42,48,0.78)" }}>
              A cycle and wellbeing companion for irregular bodies first. It shows
              the user’s real pattern instead of a broken month, is honest when it
              is not sure, keeps wellbeing alongside tracking, and treats the data
              as the user’s own.
            </p>
            <a href="#prototype" className="mt-8 inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-semibold shadow-[0_12px_30px_rgba(244,102,60,0.35)]" style={{ backgroundColor: TERRA, color: CREAM }}>
              <span>▶</span> View the prototype
            </a>
          </div>

          {/* phone on a colored shape */}
          <div className="relative mx-auto mt-16 flex w-fit items-center justify-center">
            <div className="absolute bottom-0 h-[300px] w-[300px] rounded-full md:h-[400px] md:w-[400px]" style={{ background: BUTTER, opacity: 0.35 }} />
            <RingGraphic size={460} className="pointer-events-none absolute hidden md:block" style={{ opacity: 0.5 }} />
            <Reveal y={28} className="relative z-10">
              <Phone src={project.images[0]} alt="CycleSync — the Year Ring" />
            </Reveal>
            <div className="absolute -left-2 top-12 z-20 hidden rounded-2xl bg-white px-4 py-3 shadow-[0_14px_34px_rgba(58,42,48,0.18)] md:block">
              <div className="text-[12px]" style={{ color: SAGE }}>Within your range</div>
              <div className="text-[15px] font-semibold">Day 34</div>
            </div>
            <div className="absolute -right-2 bottom-20 z-20 hidden items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[0_14px_34px_rgba(58,42,48,0.18)] md:flex">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: TERRA }} />
              <span className="text-[13px] font-medium">Mood logged</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 01 · THE PROBLEM ══ */}
      <section className="relative px-5 py-20 text-center md:px-10 md:py-28">
        <div className="pointer-events-none absolute right-6 top-8 select-none font-round text-[26vw] font-bold leading-none md:text-[12vw]" style={{ color: TERRA, opacity: 0.06 }} aria-hidden>01</div>
        <Reveal className="relative">
          <Pill bg="rgba(244,102,60,0.16)" color={TERRA}>01 · The problem</Pill>
          <p className="font-round mx-auto mt-7 max-w-[22ch] text-[30px] font-semibold leading-[1.12] md:text-[46px]">
            The most common hormonal condition produces the most unpredictable
            cycles — and the tools are built for predictability.
          </p>
        </Reveal>
        <Reveal delay={120} className="relative mx-auto mt-12 grid max-w-[920px] gap-5 md:grid-cols-3">
          {n.stats.map((s, i) => (
            <div key={s} className="rounded-3xl px-6 py-8 text-left" style={{ backgroundColor: `${statColors[i]}22` }}>
              <div className="font-round text-[22px] font-semibold leading-tight md:text-[24px]" style={{ color: INK }}>{s}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ══ 02 · THE YEAR RING (signature) ══ */}
      <section className="relative px-5 py-20 md:px-10 md:py-28" style={{ backgroundColor: "rgba(43,196,138,0.12)" }}>
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-6">
            <div className="relative flex items-center justify-center">
              <RingGraphic size={360} className="pointer-events-none absolute" style={{ opacity: 0.5 }} />
              <Phone src={project.images[0]} alt="The Year Ring" className="relative z-10" />
            </div>
          </Reveal>
          <Reveal delay={100} className="md:col-span-6">
            <Pill bg="rgba(43,196,138,0.2)" color="#0E7A52">02 · The signature</Pill>
            <h2 className="font-round mt-5 text-[34px] font-semibold leading-[1.04] md:text-[46px]">The Year Ring</h2>
            <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed md:text-[18px]" style={{ color: "rgba(58,42,48,0.8)" }}>
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

      {/* ══ 03 · HONESTY ══ */}
      <section className="relative px-5 py-20 md:px-10 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-6 md:order-2">
            <Phone src={project.images[1]} alt="An estimate shown with its confidence" />
          </Reveal>
          <Reveal delay={100} className="md:col-span-6 md:order-1">
            <Pill bg="rgba(79,164,240,0.28)" color="#1E5C99">03 · Honesty over certainty</Pill>
            <h2 className="font-round mt-5 text-[30px] font-semibold leading-[1.06] md:text-[40px]">
              A window with its confidence, not a false countdown.
            </h2>
            <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed md:text-[18px]" style={{ color: "rgba(58,42,48,0.8)" }}>
              Calendar prediction is only around 18% accurate for irregular
              cycles, so the app shows a probability window with its confidence
              and names anovulatory cycles plainly, rather than promising a date
              that may not come. For an anxious audience, being clear about
              uncertainty is what builds trust.
            </p>
            <p className="hand mt-6 text-[26px] leading-tight" style={{ color: TERRA }}>
              an estimate, not a promise
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 04 · TRUST ══ */}
      <section className="relative px-5 py-20 md:px-10 md:py-28" style={{ backgroundColor: "rgba(255,194,61,0.12)" }}>
        <Reveal className="mb-14 text-center">
          <Pill bg="rgba(255,194,61,0.28)" color="#9A6B00">04 · Built on trust</Pill>
        </Reveal>
        <div className="mx-auto grid max-w-[1000px] gap-12 md:grid-cols-2 md:gap-10">
          {[
            { img: project.images[2], cap: cap[2] },
            { img: project.images[3], cap: cap[3] },
          ].filter((g) => g.img).map((g, i) => (
            <Reveal key={g.img} delay={i * 100} className="flex flex-col items-center rounded-[32px] bg-white/60 p-8 text-center">
              <Phone src={g.img} alt={g.cap ?? `CycleSync screen ${i + 1}`} />
              <p className="hand mt-6 max-w-[34ch] text-[24px] leading-snug md:text-[26px]" style={{ color: PLUM }}>{g.cap}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 05 · DECISIONS ══ */}
      <section className="relative px-5 py-20 md:px-10 md:py-28">
        <Reveal className="mb-12 text-center">
          <Pill bg="rgba(123,97,255,0.16)" color={PLUM}>05 · Key decisions</Pill>
        </Reveal>
        <div className="mx-auto flex max-w-[820px] flex-col gap-5">
          {n.decisions.map((d, i) => (
            <Reveal key={d.title} delay={(i % 2) * 80} className="rounded-3xl bg-white/70 p-7 md:p-8">
              <div className="flex items-start gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-round text-[18px] font-semibold" style={{ backgroundColor: [TERRA, SAGE, PLUM, BUTTER, SKY][i % 5], color: "#fff" }}>
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-round text-[22px] font-semibold leading-tight md:text-[24px]">{d.title}</h3>
                  <p className="mt-2 max-w-[62ch] text-[14px] leading-relaxed md:text-[15px]" style={{ color: "rgba(58,42,48,0.78)" }}>{d.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ DESIGN SYSTEM ══ */}
      <section className="relative px-5 py-16 text-center md:px-10 md:py-20" style={{ backgroundColor: "rgba(43,196,138,0.1)" }}>
        <Reveal className="mb-7">
          <Pill bg="rgba(43,196,138,0.2)" color="#0E7A52">Design system</Pill>
          <p className="mx-auto mt-6 max-w-[58ch] text-[15px] leading-relaxed md:text-[16px]" style={{ color: "rgba(58,42,48,0.8)" }}>
            One warm, deliberately non-pink palette and a shared component set run
            through the product, so a symptom or a mood reads the same way on the
            ring, the log and the doctor summary.
          </p>
        </Reveal>
        <Reveal className="flex flex-wrap items-center justify-center gap-3">
          {[["Cream", CREAM], ["Coral", TERRA], ["Green", SAGE], ["Violet", PLUM], ["Sun", BUTTER], ["Sky", SKY]].map(([name, c]) => (
            <div key={name} className="flex items-center gap-2.5 rounded-full bg-white py-2 pl-2 pr-4 shadow-[0_6px_16px_rgba(58,42,48,0.08)]">
              <span className="h-7 w-7 rounded-full border" style={{ backgroundColor: c, borderColor: LINE }} />
              <span className="text-[13px]">{name}</span>
            </div>
          ))}
          <span className="label ml-2" style={{ color: "rgba(58,42,48,0.55)" }}>Fredoka · Inter</span>
        </Reveal>
      </section>

      {/* ══ PROTOTYPE ══ */}
      <section id="prototype" className="relative px-5 py-24 text-center md:px-10 md:py-32" style={{ backgroundColor: PLUM, color: CREAM }}>
        <Sparkle className="absolute left-[14%] top-16 h-6 w-6" color={BUTTER} />
        <Sparkle className="absolute right-[18%] top-24 h-5 w-5" color={SKY} />
        <Reveal>
          <Pill bg="rgba(246,239,227,0.16)" color="#F0D9B8">The prototype</Pill>
          <p className="mx-auto mt-6 max-w-[52ch] text-[18px] leading-relaxed md:text-[22px]" style={{ opacity: 0.92 }}>
            A 24-screen mobile flow — onboarding, the Year Ring, logging, honest
            insights, the doctor summary, community and privacy controls — wired
            so it can be navigated from start to finish.
          </p>
          {project.figmaUrl && (
            <div className="mx-auto mt-9 max-w-[400px]">
              <FigmaEmbed url={project.figmaUrl} title="CycleSync — Figma prototype" accent={TERRA} aspect="39 / 84" />
            </div>
          )}
        </Reveal>
      </section>

      {/* ══ WHAT IT IS ══ */}
      <section className="px-5 py-20 text-center md:px-10 md:py-28">
        <Reveal>
          <Pill bg="rgba(244,102,60,0.16)" color={TERRA}>What it is</Pill>
          <p className="mx-auto mt-7 max-w-[58ch] text-[20px] leading-[1.45] md:text-[24px]" style={{ color: "rgba(58,42,48,0.85)" }}>{n.outcome}</p>
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
