"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function HomeHero() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const nameRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [stripX, setStripX] = useState(0);

  // pin the hero; scroll progress drives the active project
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${projects.length * 90}%`,
      pin: true,
      onUpdate: (self) => {
        const i = Math.min(
          projects.length - 1,
          Math.floor(self.progress * projects.length)
        );
        setActive(i);
      },
    });
    return () => st.kill();
  }, []);

  // center the active giant name under the ruler
  useEffect(() => {
    const measure = () => {
      const el = nameRefs.current[active];
      const strip = stripRef.current;
      if (!el || !strip) return;
      const center = el.offsetLeft + el.offsetWidth / 2;
      setStripX(window.innerWidth / 2 - center);
    };
    measure();
    // re-measure once webfonts land — Anton changes the name widths
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const p = projects[active];

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen flex-col overflow-hidden bg-cream"
    >
      {/* corner statements */}
      <div className="pointer-events-none absolute inset-x-5 top-24 z-20 flex justify-between md:inset-x-8">
        <div className="label max-w-[240px] text-[15px] leading-tight">
          <strong>I design products.</strong>
          <br />
          Then I build them myself.
        </div>
        <div className="label max-w-[260px] text-right text-[15px] leading-tight">
          AI-native workflow.
          <br />
          <strong>Shipped, not handed off.</strong>
        </div>
      </div>

      {/* center photo stack */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="relative h-[52vh] w-[34vh] md:h-[58vh] md:w-[38vh]">
          {projects.map((proj, i) => {
            const offset = i - active;
            const hidden = Math.abs(offset) > 1;
            return (
              <button
                key={proj.slug}
                onClick={() => router.push(`/work/${proj.slug}`)}
                aria-label={`Open ${proj.title} case study`}
                className="absolute inset-0 cursor-pointer"
                style={{
                  transform: `translateX(${offset * 46}%) rotate(${
                    offset * 7
                  }deg) scale(${offset === 0 ? 1 : 0.82})`,
                  zIndex: 10 - Math.abs(offset),
                  opacity: hidden ? 0 : offset === 0 ? 1 : 0.9,
                  transition: `transform 0.8s ${EASE}, opacity 0.6s ${EASE}`,
                  pointerEvents: offset === 0 ? "auto" : "none",
                }}
              >
                <Image
                  src={proj.cover}
                  alt={proj.title}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 768px) 38vh, 34vh"
                  className="object-cover shadow-[0_24px_80px_rgba(0,0,0,0.25)]"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* scrubber: ruler + giant names + ruler */}
      <div className="relative z-20 pb-2">
        <div className="ruler ruler--up text-ink" />
        <div
          ref={stripRef}
          className="flex w-max items-baseline gap-[6vw] whitespace-nowrap py-1"
          style={{
            transform: `translateX(${stripX}px)`,
            transition: `transform 0.9s ${EASE}`,
          }}
        >
          {projects.map((proj, i) => (
            <span
              key={proj.slug}
              ref={(el) => {
                nameRefs.current[i] = el;
              }}
              className="font-display cursor-pointer text-[9vw] leading-none md:text-[5.5vw]"
              style={{
                color: i === active ? "var(--ink)" : "var(--dim)",
                transition: `color 0.5s ${EASE}`,
              }}
              onClick={() => router.push(`/work/${proj.slug}`)}
            >
              {proj.title}
            </span>
          ))}
        </div>
        <div className="ruler text-ink" />

        {/* footer strip of the hero */}
        <div className="label flex items-center justify-between px-5 pt-3 md:px-8">
          <span className="mono">©2026</span>
          <span className="hidden md:block">Last update: Jun 2026</span>
          <span className="mono">
            0{active + 1} <span className="opacity-50">//</span> 0
            {projects.length}
          </span>
          <span className="hidden text-right md:block">{p.statement}</span>
          <span className="mono hidden lg:block">Scroll</span>
        </div>
      </div>
    </section>
  );
}
