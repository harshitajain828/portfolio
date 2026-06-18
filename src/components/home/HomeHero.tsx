"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

export default function HomeHero() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const nameRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const n = projects.length;
    const section = sectionRef.current;
    if (!section) return;

    const measure = () =>
      nameRefs.current.map((el) =>
        el ? el.offsetLeft + el.offsetWidth / 2 : 0
      );
    let nameCenters = measure();

    // one render pass per scroll frame — Lenis supplies the smoothing,
    // we just map progress -> deck + scrubber transforms imperatively
    const render = (p: number) => {
      const f = p * (n - 1); // fractional deck position

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = i - f;
        if (d >= 0) {
          // waiting in the deck: peek below the active card, slightly
          // smaller and tilted, fading out past the 3rd card
          const dd = Math.min(d, 3);
          el.style.transform = `translateY(${dd * 30}px) rotate(${
            d * 3
          }deg) scale(${1 - dd * 0.06})`;
          el.style.zIndex = String(20 - Math.ceil(d));
          el.style.opacity = String(d > 2.5 ? Math.max(0, 1 - (d - 2.5) * 2) : 1);
        } else {
          // dismissed: slides up and off, riding above the deck
          el.style.transform = `translateY(${d * 130}%) rotate(${d * -4}deg)`;
          el.style.zIndex = String(30 + Math.ceil(-d));
          el.style.opacity = "1";
        }
        // only the active card is clickable; dismissed cards must not
        // swallow clicks meant for the nav as they pass over it
        el.style.pointerEvents = Math.abs(d) < 0.5 ? "auto" : "none";
      });

      // names strip — continuous horizontal scrub between name centers
      const strip = stripRef.current;
      if (strip && nameCenters.length) {
        const i0 = Math.max(0, Math.min(n - 1, Math.floor(f)));
        const i1 = Math.min(n - 1, i0 + 1);
        const c =
          nameCenters[i0] + (nameCenters[i1] - nameCenters[i0]) * (f - i0);
        strip.style.transform = `translateX(${window.innerWidth / 2 - c}px)`;
      }

      const a = Math.round(f);
      nameRefs.current.forEach((el, i) => {
        if (el) el.style.color = i === a ? "var(--ink)" : "var(--dim)";
      });
      setActive((prev) => (prev === a ? prev : a));
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${n * 100}%`,
      pin: true,
      anticipatePin: 1,
      snap: {
        snapTo: 1 / (n - 1),
        duration: { min: 0.3, max: 0.8 },
        ease: "power2.out",
      },
      onUpdate: (self) => {
        progressRef.current = self.progress;
        render(self.progress);
      },
    });

    const remeasure = () => {
      nameCenters = measure();
      render(progressRef.current);
    };
    render(0);
    document.fonts?.ready.then(remeasure);
    window.addEventListener("resize", remeasure);
    return () => {
      st.kill();
      window.removeEventListener("resize", remeasure);
    };
  }, []);

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
          AI-native, end to end.
        </div>
        <div className="label max-w-[260px] text-right text-[15px] leading-tight">
          I build with AI tools.
          <br />
          <strong>Udaipur → remote.</strong>
        </div>
      </div>

      {/* deck of cards */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="relative h-[50vh] w-[33vh] md:h-[56vh] md:w-[37vh]">
          {projects.map((proj, i) => (
            <button
              key={proj.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => router.push(`/work/${proj.slug}`)}
              aria-label={`Open ${proj.title} case study`}
              className="absolute inset-0 cursor-pointer will-change-transform"
            >
              <Image
                src={proj.cover}
                alt={proj.title}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 37vh, 33vh"
                className="object-cover shadow-[0_24px_80px_rgba(0,0,0,0.25)]"
              />
            </button>
          ))}
        </div>
      </div>

      {/* scrubber: ruler + giant names + ruler */}
      <div className="relative z-20 pb-2">
        <div className="ruler ruler--up text-ink" />
        <div
          ref={stripRef}
          className="flex w-max items-baseline gap-[6vw] whitespace-nowrap py-1 will-change-transform"
        >
          {projects.map((proj, i) => (
            <span
              key={proj.slug}
              ref={(el) => {
                nameRefs.current[i] = el;
              }}
              className="font-display cursor-pointer text-[9vw] leading-none transition-colors duration-300 md:text-[5.5vw]"
              style={{ color: i === 0 ? "var(--ink)" : "var(--dim)" }}
              onClick={() => router.push(`/work/${proj.slug}`)}
            >
              {proj.title}
            </span>
          ))}
        </div>
        <div className="ruler text-ink" />

        {/* hero footer strip */}
        <div className="label flex items-center justify-between px-5 pt-3 md:px-8">
          <span className="mono">©2026</span>
          <span className="hidden md:block">Last update: Jun 2026</span>
          <span className="mono">
            0{active + 1} <span className="opacity-50">{"//"}</span> 0
            {projects.length}
          </span>
          <span className="hidden text-right md:block">{p.statement}</span>
          <span className="mono hidden lg:block">Scroll</span>
        </div>
      </div>
    </section>
  );
}
