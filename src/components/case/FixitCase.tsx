import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import FooterStrip from "@/components/FooterStrip";
import { Reveal, ScrollProgress } from "@/components/case/blocks";

const NAVY = "#00224F";
const BLUE = "#0071C2";
const YELLOW = "#FEBB02";

/* camera viewfinder corner brackets */
function Reticle({ color = YELLOW }: { color?: string }) {
  const arm = 26;
  const t = 3;
  const bar = (s: React.CSSProperties, k: string) => (
    <span key={k} className="absolute" style={{ background: color, ...s }} />
  );
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden>
      {bar({ left: -10, top: -10, width: arm, height: t }, "tl1")}
      {bar({ left: -10, top: -10, width: t, height: arm }, "tl2")}
      {bar({ right: -10, top: -10, width: arm, height: t }, "tr1")}
      {bar({ right: -10, top: -10, width: t, height: arm }, "tr2")}
      {bar({ left: -10, bottom: -10, width: arm, height: t }, "bl1")}
      {bar({ left: -10, bottom: -10, width: t, height: arm }, "bl2")}
      {bar({ right: -10, bottom: -10, width: arm, height: t }, "br1")}
      {bar({ right: -10, bottom: -10, width: t, height: arm }, "br2")}
    </span>
  );
}

/* hand-drawn annotation arrow */
function HandArrow({
  flip,
  color = BLUE,
  className = "",
}: {
  flip?: boolean;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 64"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined, color }}
      aria-hidden
    >
      <path
        d="M108 14 C 70 8, 32 22, 16 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M16 48 L 34 44 M16 48 L 22 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Phone({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-fit overflow-hidden rounded-[22px] border border-ink/10 p-2 ${className}`}
      style={{ backgroundColor: `${BLUE}10` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="block max-h-[560px] w-auto rounded-[14px]"
      />
    </div>
  );
}

export default function FixitCase({
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
  // images: 0 flow-map · 1 diagnosis · 2 guided · 3 safety · 4 AR · 5 parts
  const gallery = [
    { src: project.images[2], cap: cap[2] },
    { src: project.images[4], cap: cap[4] },
    { src: project.images[5], cap: cap[5] },
  ].filter((g) => g.src);

  return (
    <main className="bg-cream text-ink">
      <ScrollProgress accent={BLUE} />

      {/* ── hero: navy workshop, camera-first ── */}
      <section
        className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10"
        style={{ backgroundColor: NAVY, color: "#fff" }}
      >
        <div className="label flex items-center justify-between opacity-80">
          <Link href="/work" className="hover-line pointer-events-auto">
            ← All work
          </Link>
          <span className="flex items-center gap-4">
            <span className="mono">
              {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </span>
            <span className="hidden sm:inline">{project.type}</span>
            <span className="mono">{project.year}</span>
          </span>
        </div>

        <div className="mt-14 grid items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div
              className="label mb-5 flex items-center gap-3"
              style={{ color: YELLOW }}
            >
              <span className="mono">◎</span>
              <span>Camera-first AI repair · iOS</span>
            </div>
            <h1 className="font-display text-[22vw] leading-[0.88] md:text-[9.5vw]">
              Fixit<span style={{ color: BLUE }}>.</span>
            </h1>
            <p className="mt-6 max-w-[46ch] text-[18px] leading-snug opacity-85 md:text-[22px]">
              Point your phone at a broken thing. Fixit names the fault with
              visible confidence, walks you through the fix — and knows when to
              stop and tell you to call a pro.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Camera-first", "Confidence-calibrated", "Safety-first"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full px-4 py-2 text-[12px] font-medium"
                    style={{ border: "1px solid rgba(255,255,255,0.28)" }}
                  >
                    {t}
                  </span>
                )
              )}
            </div>
            <a
              href="#prototype"
              className="mt-9 inline-flex items-center gap-3 rounded-full px-5 py-3.5 text-[15px] font-semibold"
              style={{ backgroundColor: BLUE, color: "#fff" }}
            >
              <span>▶</span> Walk the prototype
            </a>
          </div>

          <div className="relative mx-auto w-fit">
            <Reticle />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <Image
                src={project.images[1]}
                alt="Fixit — diagnosis with calibrated confidence"
                width={390}
                height={844}
                priority
                className="block h-auto w-[clamp(230px,42vw,320px)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── the stakes ── */}
      <section className="grid grid-cols-1 gap-8 border-b border-ink/10 px-5 py-16 md:grid-cols-3 md:px-10">
        {n.stats.map((s, i) => (
          <Reveal key={s} delay={i * 90} className="border-t border-ink/10 pt-5">
            <div className="mono mb-3 opacity-40">{String(i + 1).padStart(2, "0")}</div>
            <div
              className="font-display text-[30px] leading-tight md:text-[2.2vw]"
              style={{ color: BLUE }}
            >
              {s}
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── the problem ── */}
      <section className="grid gap-10 px-5 py-20 md:grid-cols-[230px_1fr] md:px-10 md:py-28">
        <Reveal>
          <div className="label flex items-center gap-3 opacity-70">
            <span className="mono" style={{ color: BLUE }}>
              01
            </span>
            <span className="h-px w-10" style={{ background: BLUE }} />
            <span>The problem</span>
          </div>
        </Reveal>
        <div>
          <Reveal y={24}>
            <p className="serif max-w-[46ch] text-[22px] normal-case leading-[1.4] md:text-[30px]">
              {n.problem}
            </p>
          </Reveal>
          <Reveal delay={120} y={20}>
            <p
              className="hand mt-10 max-w-[24ch] text-[30px] leading-tight md:text-[40px]"
              style={{ color: BLUE }}
            >
              “I don’t know what’s wrong, I don’t know what it’s called, and I’m
              scared I’ll make it worse.”
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── signature: confidence + safety ── */}
      <section
        className="px-5 py-20 md:px-10 md:py-28"
        style={{ backgroundColor: `${BLUE}0A` }}
      >
        <Reveal className="mb-14">
          <div className="label flex items-center gap-3 opacity-70">
            <span className="mono" style={{ color: BLUE }}>
              ◎
            </span>
            <span>The signature — it shows its confidence, and knows when to stop</span>
          </div>
        </Reveal>
        <div className="grid gap-14 md:grid-cols-2 md:gap-10">
          <Reveal className="relative">
            <Phone src={project.images[1]} alt="Confidence-calibrated diagnosis" />
            <div className="mx-auto mt-5 max-w-[40ch] text-center">
              <p className="hand text-[26px] leading-snug md:text-[30px]" style={{ color: NAVY }}>
                A ranked differential with honest confidence — never one
                confidently-wrong answer.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100} className="relative">
            <Phone src={project.images[3]} alt="Safety hard-stop" />
            <div className="mx-auto mt-5 max-w-[40ch] text-center">
              <p className="hand text-[26px] leading-snug md:text-[30px]" style={{ color: NAVY }}>
                On gas, mains or structural work it refuses to coach — no
                “proceed anyway”, only “find a pro”.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── the core flow (wide) ── */}
      {project.images[0] && (
        <section className="px-5 py-20 md:px-10 md:py-28">
          <Reveal className="mb-10">
            <div className="label flex items-center gap-3 opacity-70">
              <span className="mono" style={{ color: BLUE }}>
                →
              </span>
              <span>The core loop</span>
            </div>
          </Reveal>
          <Reveal y={28}>
            <div
              className="overflow-hidden rounded-2xl border border-ink/10 p-3"
              style={{ backgroundColor: `${BLUE}0A` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.images[0]}
                alt={cap[0] ?? "Core loop"}
                loading="lazy"
                className="block w-full rounded-xl"
              />
            </div>
            {cap[0] && (
              <p className="hand mx-auto mt-5 max-w-[44ch] text-center text-[24px] leading-snug" style={{ color: NAVY }}>
                {cap[0]}
              </p>
            )}
          </Reveal>
        </section>
      )}

      {/* ── annotated walkthrough (alternating) ── */}
      {gallery.length > 0 && (
        <section className="border-t border-ink/10 px-5 py-20 md:px-10 md:py-28">
          <Reveal className="mb-16">
            <div className="label flex items-center gap-3 opacity-70">
              <span className="mono" style={{ color: BLUE }}>
                ◇
              </span>
              <span>Inside the app</span>
            </div>
          </Reveal>
          <div className="mx-auto flex max-w-[1100px] flex-col gap-24 md:gap-32">
            {gallery.map((g, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal key={g.src} y={28}>
                  <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
                    <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                      <Phone src={g.src} alt={g.cap ?? `Fixit screen ${i + 1}`} />
                    </div>
                    <div
                      className={`md:col-span-5 ${
                        flip ? "md:order-1 md:text-right" : ""
                      }`}
                    >
                      <div className="mono mb-3 text-[12px]" style={{ color: BLUE }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p
                        className="hand text-[28px] leading-snug md:text-[34px]"
                        style={{ color: NAVY }}
                      >
                        {g.cap}
                      </p>
                      <HandArrow
                        flip={flip}
                        className={`mt-4 h-14 w-28 ${flip ? "ml-auto" : ""}`}
                      />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* ── key decisions ── */}
      <section className="border-t border-ink/10 px-5 py-20 md:px-10 md:py-28">
        <Reveal className="mb-14">
          <div className="label flex items-center gap-3 opacity-70">
            <span className="mono" style={{ color: BLUE }}>
              02
            </span>
            <span>Key decisions</span>
          </div>
        </Reveal>
        <div className="grid gap-x-14 gap-y-16 md:grid-cols-2">
          {n.decisions.map((d, i) => (
            <Reveal key={d.title} delay={(i % 2) * 90} className="max-w-[58ch] border-t border-ink/10 pt-6">
              <div className="font-display mb-4 text-[44px] leading-none md:text-[56px]" style={{ color: BLUE }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-[24px] leading-tight md:text-[28px]">
                {d.title}
              </h3>
              <p className="mt-3 text-[14px] normal-case leading-relaxed opacity-80">
                {d.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── one design system ── */}
      <section className="border-t border-ink/10 px-5 py-20 md:px-10 md:py-24">
        <Reveal className="mb-8">
          <div className="label flex items-center gap-3 opacity-70">
            <span className="mono" style={{ color: BLUE }}>
              ◳
            </span>
            <span>Built on one system</span>
          </div>
        </Reveal>
        <Reveal className="flex flex-wrap items-center gap-3">
          {[
            ["Blue", BLUE],
            ["Navy", NAVY],
            ["Yellow", YELLOW],
            ["Healthy", "#3E8E5A"],
            ["Critical", "#D5402B"],
          ].map(([name, c]) => (
            <div key={name} className="flex items-center gap-2.5 rounded-full border border-ink/10 py-2 pl-2 pr-4">
              <span className="h-7 w-7 rounded-full" style={{ backgroundColor: c }} />
              <span className="text-[13px]">{name}</span>
            </div>
          ))}
          <span className="label ml-2 opacity-60">
            Anton · Plus Jakarta Sans · Space Mono
          </span>
        </Reveal>
      </section>

      {/* ── prototype CTA ── */}
      <section
        id="prototype"
        className="px-5 py-20 md:px-10 md:py-28"
        style={{ backgroundColor: NAVY, color: "#fff" }}
      >
        <Reveal>
          <div className="label mb-5 flex items-center gap-3" style={{ color: YELLOW }}>
            <span className="mono">▶</span>
            <span>The prototype</span>
          </div>
          <p className="font-display max-w-[18ch] text-[10vw] leading-[0.95] md:text-[5vw]">
            94 screens. One connected flow.
          </p>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-snug opacity-80">
            Every flow is wired end to end — capture, diagnosis, guided repair,
            the safety hard-stop, parts, library and the edge cases — playable
            from a single start.
          </p>
          <span className="mt-8 inline-flex items-center gap-3 rounded-full px-5 py-3.5 text-[15px] font-semibold opacity-90" style={{ backgroundColor: BLUE }}>
            Interactive prototype — embed coming
          </span>
        </Reveal>
      </section>

      {/* ── outcome ── */}
      <section className="grid gap-10 px-5 py-20 md:grid-cols-[230px_1fr] md:px-10 md:py-28">
        <Reveal>
          <div className="label flex items-center gap-3 opacity-70">
            <span className="mono" style={{ color: BLUE }}>
              03
            </span>
            <span>Where it landed</span>
          </div>
        </Reveal>
        <Reveal y={24}>
          <p className="serif max-w-[46ch] text-[22px] normal-case leading-[1.4] md:text-[30px]">
            {n.outcome}
          </p>
          <ul className="mt-10 flex max-w-[60ch] flex-col gap-4">
            {n.learnings.map((l) => (
              <li
                key={l}
                className="border-l-2 pl-5 text-[15px] normal-case leading-relaxed opacity-85"
                style={{ borderColor: BLUE }}
              >
                {l}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ── next ── */}
      <Link
        href={`/work/${next.slug}`}
        className="group relative block overflow-hidden px-5 py-20 md:px-10 md:py-24"
        style={{ backgroundColor: next.accent, color: next.accentFg }}
      >
        <div className="label mb-5 flex items-center gap-3 opacity-80">
          <span className="mono">→</span>
          <span>Next project</span>
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
