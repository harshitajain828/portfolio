"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/lib/projects";
import FooterStrip from "@/components/FooterStrip";

export default function WorkIndex() {
  const [active, setActive] = useState<number | null>(null);
  const p = active !== null ? projects[active] : null;

  return (
    <main
      className="flex min-h-screen flex-col"
      style={{
        backgroundColor: p ? p.accent : "var(--cream)",
        color: p ? p.accentFg : "var(--ink)",
        transition: "background-color 0.6s ease, color 0.6s ease",
      }}
    >
      <div className="px-5 pt-32 pb-4 md:px-8">
        <h1 className="font-display text-[18vw] leading-[0.9] md:text-[11vw]">
          Work
          <sup className="mono ml-3 align-super text-[14px] opacity-70">
            ({projects.length})
          </sup>
        </h1>
        <p className="serif-italic mt-3 text-[20px] opacity-80 md:text-[26px]">
          Three products, designed end-to-end.
        </p>
      </div>

      <div className="flex-1" onMouseLeave={() => setActive(null)}>
        {projects.map((proj, i) => (
          <Link
            key={proj.slug}
            href={`/work/${proj.slug}`}
            onMouseEnter={() => setActive(i)}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-t border-current/20 px-5 py-6 md:grid-cols-[60px_1fr_auto_140px_60px] md:gap-10 md:px-8 md:py-8"
          >
            <span className="mono opacity-60">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="min-w-0">
              <span className="font-display block text-[10vw] leading-[0.95] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 md:text-[5.8vw]">
                {proj.title}
              </span>
              <span className="label mt-2 block opacity-70">
                {proj.outcomeLine}
              </span>
            </span>

            <span className="label hidden text-right leading-snug opacity-70 lg:block">
              {proj.type}
              <br />
              {proj.year}
            </span>

            {/* thumb — straightens + scales on hover */}
            <span className="relative hidden aspect-[3/4] w-[140px] overflow-hidden rounded-sm shadow-[0_14px_40px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:block md:rotate-3 group-hover:rotate-0 group-hover:scale-105">
              <Image
                src={proj.cover}
                alt={proj.title}
                fill
                sizes="140px"
                className="object-cover"
              />
            </span>

            <span className="hidden text-[28px] transition-transform duration-500 group-hover:translate-x-2 md:block">
              →
            </span>

            {/* mobile thumb */}
            <span className="relative col-span-3 block aspect-[16/9] w-full overflow-hidden rounded-sm md:hidden">
              <Image
                src={proj.cover}
                alt={proj.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </span>
          </Link>
        ))}
      </div>

      <div className="label flex items-center justify-between border-t border-current/20 px-5 py-6 opacity-80 md:px-8">
        <span>All work is self-initiated concept work — honestly labeled</span>
        <Link href="/playground" className="hover-line hidden sm:block">
          Playground →
        </Link>
      </div>

      <FooterStrip />
    </main>
  );
}
