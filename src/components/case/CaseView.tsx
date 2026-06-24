import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import FooterStrip from "@/components/FooterStrip";
import {
  Insights,
  Flow,
  Compare,
  Signature,
  Reveal,
  Kicker,
  ScrollProgress,
} from "@/components/case/blocks";

export default function CaseView({
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

  return (
    <main className="bg-cream text-ink">
      <ScrollProgress accent={project.accent} />

      {/* ── hero: the project's color world ── */}
      <section
        className="relative flex min-h-screen flex-col overflow-hidden px-5 pt-28 md:px-10"
        style={{ backgroundColor: project.accent, color: project.accentFg }}
      >
        <div className="label flex items-center justify-between opacity-80">
          <Link href="/work" className="hover-line pointer-events-auto">
            ← All work
          </Link>
          <span className="flex items-center gap-4">
            <span className="mono">
              {String(index + 1).padStart(2, "0")}/
              {String(total).padStart(2, "0")}
            </span>
            <span className="hidden sm:inline">{project.type}</span>
            <span className="mono">{project.year}</span>
          </span>
        </div>

        <div className="label mt-10 flex items-center gap-3 opacity-90">
          <span className="mono">✦</span>
          <span>{project.role}</span>
        </div>

        <h1 className="font-display mt-4 text-[15vw] leading-[0.93] md:text-[10vw]">
          <span className="mask-line">
            <span>{project.title}</span>
          </span>
        </h1>
        <p className="serif-italic mt-5 max-w-[28ch] text-[22px] leading-snug md:text-[34px]">
          {project.statement}
        </p>

        {/* cover bleeding off the bottom edge */}
        <div className="relative mx-auto mt-12 w-full max-w-[860px] flex-1">
          <div className="label absolute -top-7 left-0 hidden items-center gap-2 opacity-70 md:flex">
            <span className="mono">↓</span>
            <span>Scroll</span>
          </div>
          <div className="relative h-full min-h-[42vh] overflow-hidden rounded-t-md shadow-[0_-20px_80px_rgba(0,0,0,0.25)]">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              priority
              sizes="(min-width: 768px) 860px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* ── TL;DR: the whole story in ~5 seconds ── */}
      <section className="border-b border-ink/10 px-5 py-14 md:px-10 md:py-16">
        <Reveal>
          <Kicker mark="TL;DR" label="The 5-second version" accent={project.accent} />
        </Reveal>
        <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <Reveal>
            <p className="serif max-w-[32ch] text-[22px] normal-case leading-snug md:text-[28px]">
              {project.statement}
            </p>
            <div className="label mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 opacity-70">
              <span>{project.role}</span>
              <span style={{ color: project.accent }}>/</span>
              <span>{project.type}</span>
              <span style={{ color: project.accent }}>/</span>
              <span className="mono">{project.year}</span>
            </div>
          </Reveal>
          <Reveal delay={100} className="md:border-l md:border-ink/10 md:pl-16">
            <div className="label mb-4 opacity-50">Key moves</div>
            <ul className="flex flex-col gap-3">
              {n.decisions.slice(0, 3).map((d, i) => (
                <li key={d.title} className="flex gap-3 text-[14px] normal-case leading-snug">
                  <span className="mono mt-[1px]" style={{ color: project.accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{d.title}</span>
                </li>
              ))}
            </ul>
            <div className="label mb-1 mt-7 opacity-50">Outcome</div>
            <p className="text-[14px] normal-case leading-snug opacity-80">
              {project.outcomeLine}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── spec strip ── */}
      <section className="grid grid-cols-2 gap-6 border-b border-ink/10 px-5 py-10 md:grid-cols-4 md:px-10">
        <Spec k="Role" v={project.role} accent={project.accent} />
        <Spec k="Type" v={project.type} accent={project.accent} />
        <Spec k="Skills" v={project.skills.join(" · ")} accent={project.accent} />
        <Spec k="Tools" v={project.tools.join(" · ")} accent={project.accent} />
      </section>

      {/* ── lead: the project in one breath (summary) ── */}
      <section className="grid gap-8 px-5 py-20 md:grid-cols-[220px_1fr] md:px-10 md:py-28">
        <Reveal>
          <Kicker mark="00" label="In short" accent={project.accent} />
        </Reveal>
        <Reveal y={28}>
          <p className="serif max-w-[40ch] text-[24px] normal-case leading-[1.35] md:text-[34px]">
            {project.summary}
          </p>
        </Reveal>
      </section>

      {/* ── stats ── */}
      <section className="grid gap-10 border-y border-ink/10 px-5 py-16 md:grid-cols-3 md:px-10">
        {n.stats.map((s, i) => (
          <Reveal key={s} delay={i * 100} className="border-t border-ink/10 pt-5">
            <div className="mono mb-3 opacity-50">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div
              className="font-display text-[34px] leading-[1.05] md:text-[2.6vw]"
              style={{ color: project.accent }}
            >
              {s}
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── problem ── */}
      <section className="grid gap-8 px-5 py-20 md:grid-cols-[220px_1fr] md:px-10 md:py-28">
        <Reveal>
          <Kicker mark="01" label="The problem" accent={project.accent} />
        </Reveal>
        <Reveal y={28}>
          <p className="serif max-w-[46ch] text-[22px] normal-case leading-[1.4] md:text-[30px]">
            {n.problem}
          </p>
        </Reveal>
      </section>

      {/* ── research insights ── */}
      {n.insights && <Insights items={n.insights} accent={project.accent} />}

      {/* ── bespoke signature graphic ── */}
      <Signature project={project} />

      {/* (screens are shown, contained and captioned, in the gallery below) */}

      {/* ── core flow diagram ── */}
      {n.flow && (
        <Flow
          steps={n.flow.steps}
          note={n.flow.note}
          accent={project.accent}
          accentFg={project.accentFg}
        />
      )}

      {/* ── decisions ── */}
      <section className="border-t border-ink/10 px-5 py-20 md:px-10 md:py-28">
        <Reveal className="mb-14">
          <Kicker mark="02" label="Key decisions" accent={project.accent} />
        </Reveal>
        <div className="grid gap-x-14 gap-y-16 md:grid-cols-2">
          {n.decisions.map((d, i) => (
            <Reveal
              key={d.title}
              delay={(i % 2) * 90}
              className="group max-w-[58ch] border-t border-ink/10 pt-6"
            >
              <div
                className="font-display mb-4 text-[44px] leading-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 md:text-[56px]"
                style={{ color: project.accent }}
              >
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

      {/* ── the shift: comparison ── */}
      {n.compare && (
        <Compare
          {...n.compare}
          accent={project.accent}
          accentFg={project.accentFg}
        />
      )}

      {/* ── gallery: contained, never cropped, captioned ── */}
      {project.images.length > 0 && (
        <section className="border-t border-ink/10 px-5 py-20 md:px-10 md:py-28">
          <Reveal className="mb-12 md:mb-16">
            <Kicker mark="◇" label="Selected screens" accent={project.accent} />
          </Reveal>
          <div className="mx-auto flex max-w-[1060px] flex-col gap-16 md:gap-24">
            {project.images.map((src, i) => {
              const caption = project.imageCaptions?.[i];
              return (
                <Reveal key={src} y={28}>
                  <div
                    className="mx-auto w-fit max-w-full overflow-hidden rounded-2xl border border-ink/10 p-2 md:p-3"
                    style={{ backgroundColor: `${project.accent}14` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={caption ?? `${project.title} — screen ${i + 1}`}
                      loading="lazy"
                      className="block max-h-[680px] w-auto max-w-full rounded-xl object-contain"
                    />
                  </div>
                  {caption && (
                    <div className="mx-auto mt-5 flex max-w-[60ch] gap-3 md:gap-4">
                      <span
                        className="mono mt-[3px] shrink-0 text-[13px]"
                        style={{ color: project.accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[14px] normal-case leading-relaxed opacity-80 md:text-[15px]">
                        {caption}
                      </p>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* ── outcome: back into the color world ── */}
      <section
        className="px-5 py-24 md:px-10 md:py-32"
        style={{ backgroundColor: project.accent, color: project.accentFg }}
      >
        <Reveal className="mb-10">
          <Kicker mark="03" label="Outcome" accent={project.accent} tone="light" />
        </Reveal>
        <Reveal y={28}>
          <p className="serif max-w-[34ch] text-[26px] normal-case leading-[1.3] md:text-[40px]">
            {n.outcome}
          </p>
        </Reveal>
        <div className="label mt-12 flex flex-wrap gap-x-10 gap-y-3 opacity-80">
          {n.stats.map((s, i) => (
            <Reveal
              key={s}
              as="span"
              delay={i * 90}
              y={12}
              className="flex items-center gap-2"
            >
              <span className="mono">✦</span> {s}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── learnings ── */}
      <section className="grid gap-8 px-5 py-20 md:grid-cols-[220px_1fr] md:px-10 md:py-28">
        <Reveal>
          <Kicker mark="04" label="What I learned" accent={project.accent} />
        </Reveal>
        <ul className="flex max-w-[60ch] flex-col gap-5">
          {n.learnings.map((l, i) => (
            <Reveal
              key={l}
              as="li"
              delay={i * 80}
              y={16}
              className="border-l-2 pl-5 text-[15px] normal-case leading-relaxed opacity-85"
              style={{ borderColor: project.accent }}
            >
              {l}
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── next project: the next color world peeks through ── */}
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
            <Image
              src={next.cover}
              alt={next.title}
              fill
              sizes="160px"
              className="object-cover"
            />
          </span>
        </div>
      </Link>

      <FooterStrip />
    </main>
  );
}

function Spec({ k, v, accent }: { k: string; v: string; accent: string }) {
  return (
    <div>
      <div className="label mb-2 flex items-center gap-2 opacity-50">
        <span className="h-px w-4" style={{ backgroundColor: accent, opacity: 0.9 }} />
        {k}
      </div>
      <div className="text-[13px] leading-snug">{v}</div>
    </div>
  );
}
