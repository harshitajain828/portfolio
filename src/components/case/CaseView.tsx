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
        {/* giant title straddling the seam */}
        <h1
          className="font-display pointer-events-none fixed top-[16vh] left-1/2 z-30 w-[92vw] -translate-x-1/2 text-center text-[13vw] leading-none text-cream mix-blend-difference md:text-[9vw]"
        >
          {project.title}
        </h1>

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
          <div className="sticky top-0 flex h-auto min-h-[60vh] flex-col justify-center gap-10 px-5 py-28 md:h-screen md:px-14">
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

        {/* fixed chrome: back + counter */}
        <Link
          href="/"
          className="label fixed bottom-5 left-5 z-40 mix-blend-difference text-cream hover-line md:left-8"
        >
          ← Back
        </Link>
        <div className="mono fixed bottom-5 right-5 z-40 mix-blend-difference text-cream md:right-8">
          {pad(current + 1)} <span className="opacity-50">//</span>{" "}
          {pad(media.length)}
        </div>
      </div>

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
