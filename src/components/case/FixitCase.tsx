import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import FooterStrip from "@/components/FooterStrip";
import { Reveal, ScrollProgress } from "@/components/case/blocks";

const NAVY = "#00224F";
const BLUE = "#0071C2";
const GREEN = "#3E8E5A";

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
      <path d="M108 14 C 70 8, 32 22, 16 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 48 L 34 44 M16 48 L 22 30" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/* recreated confidence bar (illustrative graphic) */
function ConfidenceBar({ pct = 78, label = "Fairly sure" }: { pct?: number; label?: string }) {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="mono text-[12px] opacity-60">CONFIDENCE</span>
        <span className="font-display text-[20px]" style={{ color: GREEN }}>{label}</span>
      </div>
      <div className="relative h-3 rounded-full" style={{ background: `linear-gradient(90deg, #D8DFE6, ${GREEN})` }}>
        <span
          className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] bg-white"
          style={{ left: `${pct}%`, borderColor: NAVY }}
        />
      </div>
      <div className="mono mt-3 flex justify-between text-[11px] opacity-45">
        <span>low certainty</span>
        <span>high certainty</span>
      </div>
    </div>
  );
}

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`mx-auto w-fit overflow-hidden rounded-[22px] border border-ink/10 p-2 ${className}`} style={{ backgroundColor: `${BLUE}0E` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="block max-h-[560px] w-auto rounded-[14px]" />
    </div>
  );
}

function Eyebrow({ mark, label, color = BLUE, light = false }: { mark: string; label: string; color?: string; light?: boolean }) {
  return (
    <div className={`label flex items-center gap-3 ${light ? "opacity-90" : "opacity-70"}`}>
      <span className="mono" style={{ color }}>{mark}</span>
      <span className="h-px w-10" style={{ background: color, opacity: light ? 0.6 : 1 }} />
      <span>{label}</span>
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
  const gallery = [
    { src: project.images[2], cap: cap[2] },
    { src: project.images[4], cap: cap[4] },
    { src: project.images[5], cap: cap[5] },
  ].filter((g) => g.src);

  return (
    <main className="bg-cream text-ink">
      <ScrollProgress accent={BLUE} />

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden px-5 pt-28 md:px-10" style={{ backgroundColor: NAVY, color: "#fff" }}>
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
            <h1 className="font-anton text-[24vw] leading-[0.86] md:text-[11vw]">
              FIXIT<span style={{ color: BLUE }}>.</span>
            </h1>
            <p className="mt-7 max-w-[46ch] text-[17px] leading-relaxed opacity-85 md:text-[20px]">
              A camera-first repair application. The user points their phone at a
              broken object, and the app identifies the likely fault, guides the
              repair, and recommends a professional when the task is unsafe.
            </p>
            <a href="#prototype" className="mt-8 inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-[15px] font-semibold" style={{ backgroundColor: BLUE, color: "#fff" }}>
              <span>▶</span> View the prototype
            </a>
          </div>

          {/* composed two-device cluster */}
          <div className="relative mx-auto flex w-full max-w-[400px] items-end justify-center pb-12 md:pb-20">
            <div className="relative w-[46%] -translate-y-2 -rotate-[7deg]">
              <div className="overflow-hidden rounded-[20px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <Image src={project.images[2]} alt="" width={390} height={844} className="block h-auto w-full" />
              </div>
            </div>
            <div className="relative z-10 -ml-5 w-[54%] rotate-[3deg]">
              <div className="overflow-hidden rounded-[24px] border border-white/10 shadow-[0_38px_85px_rgba(0,0,0,0.55)]">
                <Image src={project.images[1]} alt="Fixit — diagnosis screen" width={390} height={844} priority className="block h-auto w-full" />
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
            <p className="serif max-w-[28ch] text-[28px] leading-[1.18] md:text-[40px]">
              Many repairable items are discarded — not because repair is
              impossible, but because of one intimidating moment at the start.
            </p>
            <p className="hand mt-9 max-w-[24ch] text-[26px] leading-tight md:text-[34px]" style={{ color: BLUE }}>
              “I don’t know what’s wrong, I don’t know what it’s called, and I’m
              afraid I’ll make it worse.”
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-center gap-8 md:border-l md:border-ink/10 md:pl-16">
            {n.stats.map((s) => (
              <div key={s} className="font-display text-[26px] leading-tight md:text-[30px]" style={{ color: BLUE }}>
                {s}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ WHERE EXISTING TOOLS FALL SHORT ══ */}
      <section className="px-5 py-20 md:px-10 md:py-28" style={{ backgroundColor: NAVY, color: "#fff" }}>
        <Reveal><Eyebrow mark="02" label="Where existing tools fall short" color="#ffffff" light /></Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="serif text-[24px] leading-[1.3] md:text-[30px]">
              Existing resources require the user to name the fault first. Repair
              guides, video tutorials and manuals all depend on a search the user
              cannot yet write.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="serif text-[24px] leading-[1.3] md:text-[30px]">
              Recent AI assistants respond regardless of certainty, and an
              incorrect instruction on electrical, gas or structural work can be
              dangerous.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ THE IDEA ══ */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <Reveal><Eyebrow mark="◇" label="The approach" /></Reveal>
        <Reveal y={24} className="mt-10">
          <p className="serif max-w-[42ch] text-[24px] leading-[1.35] md:text-[34px]">
            The central idea is to remove the most difficult step: identifying the
            problem. The user points the camera, and the application determines
            the item and its most likely fault.
          </p>
          <p className="mt-6 max-w-[64ch] text-[15px] normal-case leading-relaxed opacity-80 md:text-[17px]">
            The remainder of the design is concerned with making that diagnosis
            trustworthy — communicating how confident the system is, and defining
            its behaviour when it is uncertain.
          </p>
        </Reveal>
      </section>

      {/* ══ CONFIDENCE & SAFETY ══ */}
      <section className="px-5 py-20 md:px-10 md:py-28" style={{ backgroundColor: `${BLUE}0A` }}>
        <Reveal className="mb-14"><Eyebrow mark="◎" label="Confidence and safety" /></Reveal>

        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-7">
            <Phone src={project.images[1]} alt="Diagnosis with a calibrated level of confidence" />
          </Reveal>
          <Reveal delay={100} className="md:col-span-5">
            <h3 className="font-display text-[26px] leading-tight md:text-[34px]">
              The diagnosis is never a single verdict.
            </h3>
            <p className="mt-4 text-[15px] normal-case leading-relaxed opacity-80">
              Each result presents several possible faults, ranked, with a
              calibrated indication of certainty expressed in plain language
              rather than a percentage. It also distinguishes guidance drawn from
              the model’s manual from general guidance.
            </p>
            <div className="mt-7 rounded-2xl border border-ink/10 bg-white p-5">
              <ConfidenceBar />
            </div>
            <p className="hand mt-5 text-[24px] leading-tight" style={{ color: BLUE }}>
              communicated in words, not a percentage
            </p>
          </Reveal>
        </div>

        <div className="mt-24 grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-7 md:order-2">
            <Phone src={project.images[3]} alt="Safety stop for hazardous work" />
          </Reveal>
          <Reveal delay={100} className="md:col-span-5 md:order-1 md:text-right">
            <h3 className="font-display text-[26px] leading-tight md:text-[34px]">
              The system defers when a task is unsafe.
            </h3>
            <p className="mt-4 text-[15px] normal-case leading-relaxed opacity-80">
              For hazardous work — gas, mains electricity, sealed refrigerant or
              structural repairs — the application stops and directs the user to a
              professional. No option to proceed is offered.
            </p>
            <p className="hand mt-5 text-[24px] leading-tight" style={{ color: "#D5402B" }}>
              no option to proceed
            </p>
            <HandArrow flip color="#D5402B" className="ml-auto mt-2 h-12 w-24" />
          </Reveal>
        </div>
      </section>

      {/* ══ THE CORE LOOP ══ */}
      {project.images[0] && (
        <section className="px-5 py-20 md:px-10 md:py-28">
          <Reveal className="mb-10"><Eyebrow mark="→" label="The core loop" /></Reveal>
          <Reveal y={28}>
            <div className="overflow-hidden rounded-2xl border border-ink/10 p-3" style={{ backgroundColor: `${BLUE}0A` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.images[0]} alt={cap[0] ?? "Core loop"} loading="lazy" className="block w-full rounded-xl" />
            </div>
            <p className="hand mx-auto mt-6 max-w-[42ch] text-center text-[26px] leading-snug" style={{ color: NAVY }}>
              {cap[0]}
            </p>
          </Reveal>
        </section>
      )}

      {/* ══ INSIDE THE APP ══ */}
      {gallery.length > 0 && (
        <section className="border-t border-ink/10 px-5 py-20 md:px-10 md:py-28">
          <Reveal className="mb-16"><Eyebrow mark="◇" label="Inside the app" /></Reveal>
          <div className="mx-auto flex max-w-[1100px] flex-col gap-24 md:gap-32">
            {gallery.map((g, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal key={g.src} y={28}>
                  <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                    <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                      <Phone src={g.src} alt={g.cap ?? `Fixit screen ${i + 1}`} />
                    </div>
                    <div className={`md:col-span-5 ${flip ? "md:order-1 md:text-right" : ""}`}>
                      <div className="mono mb-3 text-[12px]" style={{ color: BLUE }}>{String(i + 1).padStart(2, "0")}</div>
                      <p className="hand text-[28px] leading-snug md:text-[34px]" style={{ color: NAVY }}>{g.cap}</p>
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
      <section className="border-t border-ink/10 px-5 py-20 md:px-10 md:py-28">
        <Reveal className="mb-14"><Eyebrow mark="03" label="Key decisions" /></Reveal>
        <div className="mx-auto flex max-w-[920px] flex-col">
          {n.decisions.map((d, i) => (
            <Reveal key={d.title} className="grid gap-4 border-t border-ink/10 py-9 md:grid-cols-[90px_1fr] md:gap-10">
              <div className="font-display text-[40px] leading-none md:text-[52px]" style={{ color: BLUE }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-display text-[24px] leading-tight md:text-[28px]">{d.title}</h3>
                <p className="mt-3 max-w-[64ch] text-[14px] normal-case leading-relaxed opacity-80 md:text-[15px]">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ DESIGN SYSTEM ══ */}
      <section className="px-5 py-16 md:px-10 md:py-20" style={{ backgroundColor: `${BLUE}0A` }}>
        <Reveal className="mb-6"><Eyebrow mark="◳" label="Design system" /></Reveal>
        <Reveal>
          <p className="mb-7 max-w-[60ch] text-[15px] normal-case leading-relaxed opacity-80 md:text-[16px]">
            Every screen is assembled from a single set of colour and type tokens
            and shared components, so a status or a level of confidence reads the
            same way throughout the product.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {[["Blue", BLUE], ["Navy", NAVY], ["Yellow", "#FEBB02"], ["Healthy", GREEN], ["Critical", "#D5402B"]].map(([name, c]) => (
              <div key={name} className="flex items-center gap-2.5 rounded-full border border-ink/10 bg-white py-2 pl-2 pr-4">
                <span className="h-7 w-7 rounded-full" style={{ backgroundColor: c }} />
                <span className="text-[13px]">{name}</span>
              </div>
            ))}
            <span className="label ml-2 opacity-60">Anton · Plus Jakarta Sans · Space Mono</span>
          </div>
        </Reveal>
      </section>

      {/* ══ PROTOTYPE ══ */}
      <section id="prototype" className="px-5 py-24 md:px-10 md:py-32" style={{ backgroundColor: NAVY, color: "#fff" }}>
        <Reveal>
          <Eyebrow mark="▶" label="The prototype" color="#ffffff" light />
          <p className="mt-7 max-w-[58ch] text-[18px] leading-relaxed opacity-90 md:text-[22px]">
            All 94 screens are connected into a single flow — capture, diagnosis,
            guided repair, the safety stop, parts, the library and the edge cases
            — that can be navigated from start to finish.
          </p>
          <span className="mono mt-8 inline-block rounded-full px-5 py-3 text-[13px] opacity-80" style={{ border: `1px solid ${BLUE}` }}>
            Interactive embed to follow
          </span>
        </Reveal>
      </section>

      {/* ══ WHAT IT IS ══ */}
      <section className="grid gap-10 px-5 py-20 md:grid-cols-[230px_1fr] md:px-10 md:py-28">
        <Reveal><Eyebrow mark="04" label="What it is" /></Reveal>
        <Reveal y={24}>
          <p className="serif max-w-[48ch] text-[22px] normal-case leading-[1.4] md:text-[28px]">{n.outcome}</p>
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
