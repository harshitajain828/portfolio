import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import FooterStrip from "@/components/FooterStrip";

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
  const [heroExtra, ...rest] = project.images;
  const gallery = rest;

  return (
    <main className="bg-cream text-ink">
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

        <h1 className="font-display mt-8 text-[15vw] leading-[0.93] md:text-[10vw]">
          {project.title}
        </h1>
        <p className="serif-italic mt-4 max-w-[28ch] text-[22px] leading-snug md:text-[32px]">
          {project.statement}
        </p>

        {/* cover bleeding off the bottom edge */}
        <div className="relative mx-auto mt-12 w-full max-w-[860px] flex-1">
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

      {/* ── spec strip ── */}
      <section className="grid grid-cols-2 gap-6 border-b border-ink/10 px-5 py-10 md:grid-cols-4 md:px-10">
        <Spec k="Role" v={project.role} />
        <Spec k="Type" v={project.type} />
        <Spec k="Skills" v={project.skills.join(" · ")} />
        <Spec k="Tools" v={project.tools.join(" · ")} />
      </section>

      {/* ── stats ── */}
      <section className="grid gap-10 border-b border-ink/10 px-5 py-16 md:grid-cols-3 md:px-10">
        {n.stats.map((s, i) => (
          <div key={s}>
            <div className="mono mb-3 opacity-50">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div
              className="font-display text-[34px] leading-[1.05] md:text-[2.6vw]"
              style={{ color: project.accent }}
            >
              {s}
            </div>
          </div>
        ))}
      </section>

      {/* ── problem ── */}
      <section className="grid gap-8 px-5 py-20 md:grid-cols-[220px_1fr] md:px-10 md:py-28">
        <div className="label flex items-start gap-3 opacity-70">
          <span className="mono">01</span>
          <span>The problem:</span>
        </div>
        <p className="serif max-w-[46ch] text-[22px] normal-case leading-[1.4] md:text-[30px]">
          {n.problem}
        </p>
      </section>

      {/* ── first image, full bleed ── */}
      {heroExtra && (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={heroExtra}
            alt={`${project.title} — overview`}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* ── decisions ── */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="label mb-14 flex items-start gap-3 opacity-70">
          <span className="mono">02</span>
          <span>Key decisions:</span>
        </div>
        <div className="grid gap-x-14 gap-y-16 md:grid-cols-2">
          {n.decisions.map((d, i) => (
            <div key={d.title} className="max-w-[58ch]">
              <div
                className="font-display mb-4 text-[44px] leading-none md:text-[56px]"
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
            </div>
          ))}
        </div>
      </section>

      {/* ── gallery ── */}
      {gallery.length > 0 && (
        <section className="grid gap-3 px-3 pb-3 md:grid-cols-2">
          {gallery.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-sm ${
                i % 3 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={src}
                alt={`${project.title} — ${i + 2}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </section>
      )}

      {/* ── outcome: back into the color world ── */}
      <section
        className="px-5 py-24 md:px-10 md:py-32"
        style={{ backgroundColor: project.accent, color: project.accentFg }}
      >
        <div className="label mb-10 flex items-start gap-3 opacity-80">
          <span className="mono">03</span>
          <span>Outcome:</span>
        </div>
        <p className="serif max-w-[34ch] text-[26px] normal-case leading-[1.3] md:text-[40px]">
          {n.outcome}
        </p>
        <div className="label mt-12 flex flex-wrap gap-x-10 gap-y-3 opacity-80">
          {n.stats.map((s) => (
            <span key={s} className="flex items-center gap-2">
              <span className="mono">✦</span> {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── learnings ── */}
      <section className="grid gap-8 px-5 py-20 md:grid-cols-[220px_1fr] md:px-10">
        <div className="label flex items-start gap-3 opacity-70">
          <span className="mono">04</span>
          <span>What I learned:</span>
        </div>
        <ul className="flex max-w-[60ch] flex-col gap-5">
          {n.learnings.map((l) => (
            <li
              key={l}
              className="border-l-2 pl-5 text-[15px] normal-case leading-relaxed opacity-85"
              style={{ borderColor: project.accent }}
            >
              {l}
            </li>
          ))}
        </ul>
      </section>

      {/* ── next project: the next color world peeks through ── */}
      <Link
        href={`/work/${next.slug}`}
        className="group relative block overflow-hidden px-5 py-20 md:px-10 md:py-24"
        style={{ backgroundColor: next.accent, color: next.accentFg }}
      >
        <div className="label mb-5 opacity-80">Next project</div>
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

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="label mb-2 opacity-50">{k}:</div>
      <div className="text-[13px] leading-snug">{v}</div>
    </div>
  );
}
