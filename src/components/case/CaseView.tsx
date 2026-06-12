"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import FooterStrip from "@/components/FooterStrip";

export default function CaseView({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const media = [project.cover, ...project.images];
  const [current, setCurrent] = useState(0);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);

  // track which media frame is in view → drives the 01 // NN counter
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = frameRefs.current.indexOf(e.target as HTMLDivElement);
            if (i >= 0) setCurrent(i);
          }
        }
      },
      { threshold: 0.55 }
    );
    frameRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <main className="bg-cream">
      <div className="relative md:grid md:grid-cols-2">
        {/* sticky chrome: giant title + back + counter, scoped to the split
            section so it scrolls away with it instead of haunting the footer */}
        <div className="pointer-events-none absolute inset-0 z-30">
          <div className="sticky top-0 flex h-screen flex-col justify-between">
            <h1 className="font-display pt-[13vh] text-center text-[11vw] leading-none text-cream mix-blend-difference md:text-[7vw]">
              {project.title}
            </h1>
            <div className="flex items-end justify-between px-5 pb-5 md:px-8">
              <Link
                href="/"
                className="label pointer-events-auto mix-blend-difference text-cream hover-line"
              >
                ← Back
              </Link>
              <div className="mono mix-blend-difference text-cream">
                {pad(current + 1)} <span className="opacity-50">//</span>{" "}
                {pad(media.length)}
              </div>
            </div>
          </div>
        </div>

        {/* left — media column */}
        <div className="relative">
          {media.map((src, i) => (
            <div
              key={src}
              ref={(el) => {
                frameRefs.current[i] = el;
              }}
              className="relative h-[70vh] w-full md:h-screen"
            >
              <Image
                src={src}
                alt={`${project.title} — ${pad(i + 1)}`}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* right — spec sheet, sticky */}
        <div className="relative">
          <div className="sticky top-0 flex h-auto min-h-[60vh] flex-col justify-start gap-10 px-5 py-28 md:h-screen md:px-14 md:pt-[32vh]">
            <SpecRow label="Credits">
              <Pair k="Role:" v={project.role} />
              <Pair k="Type:" v={project.type} />
              <Pair k="Year:" v={project.year} />
            </SpecRow>

            <SpecRow label="Skills">
              {project.skills.map((s) => (
                <Pair key={s} k="" v={s} />
              ))}
            </SpecRow>

            <SpecRow label="Tools">
              <Pair k="" v={project.tools.join(", ")} />
            </SpecRow>

            <SpecRow label="Brief">
              <p className="max-w-[46ch] text-[13px] normal-case leading-snug opacity-85">
                {project.summary}
              </p>
            </SpecRow>
          </div>
        </div>

      </div>

      {/* narrative — the part a hiring manager actually reads */}
      <section className="border-t border-ink/10 px-5 py-20 md:px-8">
        {/* stats strip */}
        <div className="mb-20 grid grid-cols-1 gap-px overflow-hidden border border-ink/10 sm:grid-cols-3">
          {project.narrative.stats.map((s) => (
            <div
              key={s}
              className="mono bg-cream px-6 py-5 text-center outline outline-1 outline-ink/10"
            >
              {s}
            </div>
          ))}
        </div>

        <NarrativeBlock n="01" label="Problem">
          <p className="max-w-[62ch] text-[16px] normal-case leading-relaxed">
            {project.narrative.problem}
          </p>
        </NarrativeBlock>

        <NarrativeBlock n="02" label="Decisions">
          <div className="flex flex-col gap-10">
            {project.narrative.decisions.map((d, i) => (
              <div key={d.title} className="grid gap-3 md:grid-cols-[48px_1fr]">
                <span className="mono pt-1 opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mb-2 text-[16px] font-semibold">{d.title}</h3>
                  <p className="max-w-[58ch] text-[14px] normal-case leading-relaxed opacity-80">
                    {d.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </NarrativeBlock>

        <NarrativeBlock n="03" label="Outcome">
          <p className="max-w-[30ch] font-display text-[28px] leading-[1.1] md:text-[36px]">
            {project.statement}
          </p>
          <p className="mt-6 max-w-[62ch] text-[15px] normal-case leading-relaxed opacity-85">
            {project.narrative.outcome}
          </p>
        </NarrativeBlock>

        <NarrativeBlock n="04" label="Learnings" last>
          <ul className="flex max-w-[62ch] flex-col gap-4">
            {project.narrative.learnings.map((l) => (
              <li
                key={l}
                className="border-l border-ink/20 pl-4 text-[14px] normal-case leading-relaxed opacity-80"
              >
                {l}
              </li>
            ))}
          </ul>
        </NarrativeBlock>
      </section>

      {/* next project */}
      <Link
        href={`/work/${next.slug}`}
        className="group block border-t border-ink/10 px-5 py-20 md:px-8"
      >
        <div className="label mb-4 opacity-60">Next project</div>
        <div className="font-display text-[11vw] leading-none transition-transform duration-500 group-hover:translate-x-4 md:text-[7vw]">
          {next.title} →
        </div>
      </Link>

      <FooterStrip />
    </main>
  );
}

function NarrativeBlock({
  n,
  label,
  last = false,
  children,
}: {
  n: string;
  label: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grid gap-6 py-14 md:grid-cols-[220px_1fr] ${
        last ? "" : "border-b border-ink/10"
      }`}
    >
      <div className="label flex items-start gap-3 opacity-70">
        <span className="mono">{n}</span>
        <span>{label}:</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

function SpecRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[110px_1fr] items-start gap-6">
      <div className="label opacity-60">{label}:</div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function Pair({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 text-[13px]">
      {k ? <span className="opacity-60">{k}</span> : <span />}
      <span className="text-right font-medium">{v}</span>
    </div>
  );
}
