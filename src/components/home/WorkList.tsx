"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { projects } from "@/lib/projects";

export default function WorkList() {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const quickX = useRef<((v: number) => void) | null>(null);
  const quickY = useRef<((v: number) => void) | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = previewRef.current;
    if (!el) return;
    if (!quickX.current || !quickY.current) {
      quickX.current = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      quickY.current = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    }
    quickX.current(e.clientX);
    quickY.current(e.clientY);
  };

  return (
    <section
      className="relative border-t border-ink/10"
      onMouseMove={onMove}
      onMouseLeave={() => setActive(null)}
    >
      <div className="label flex items-center gap-3 px-5 pt-14 pb-6 md:px-8">
        <span className="bracket" />
        <span>Selected work</span>
        <sup className="mono">({projects.length})</sup>
      </div>

      {projects.map((p, i) => (
        <Link
          key={p.slug}
          href={`/work/${p.slug}`}
          onMouseEnter={() => setActive(i)}
          className="group relative block border-t border-ink/10 px-5 py-8 transition-colors duration-300 last:border-b md:px-8 md:py-10"
          style={{
            backgroundColor: active === i ? "var(--ink)" : "transparent",
            color: active === i ? "var(--cream)" : "var(--ink)",
          }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <span className="font-display text-[11vw] leading-[0.95] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 md:text-[5.5vw]">
              {p.title}
            </span>
            <span className="mono opacity-60">
              {String(i + 1).padStart(2, "0")} · {p.year}
            </span>
          </div>
          <div className="label mt-2 flex items-center justify-between gap-6 opacity-60">
            <span>{p.outcomeLine}</span>
            <span className="hidden transition-transform duration-500 group-hover:translate-x-1 sm:block">
              →
            </span>
          </div>
          {/* mobile inline thumb — no hover on touch */}
          <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden md:hidden">
            <Image
              src={p.cover}
              alt={p.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Link>
      ))}

      {/* cursor-following preview (desktop only) */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[300px] w-[240px] -translate-x-1/2 -translate-y-1/2 md:block"
        style={{ opacity: active === null ? 0 : 1, transition: "opacity 0.3s" }}
        aria-hidden
      >
        {projects.map((p, i) => (
          <Image
            key={p.slug}
            src={p.cover}
            alt=""
            fill
            sizes="240px"
            className="object-cover shadow-[0_18px_60px_rgba(0,0,0,0.3)]"
            style={{
              opacity: active === i ? 1 : 0,
              transform: active === i ? "scale(1)" : "scale(1.06)",
              transition: "opacity 0.35s, transform 0.5s",
            }}
          />
        ))}
      </div>
    </section>
  );
}
