"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import { RESUME_URL } from "@/lib/links";

function useClock() {
  const [time, setTime] = useState("--:-- --");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function parseRGB(str: string) {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
  const [r, g, b, a = 1] = parts;
  return { r, g, b, a };
}

// relative luminance (WCAG)
function luminance(r: number, g: number, b: number) {
  const f = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

// Pick header text tone from whatever sits behind the bar — keeps it readable
// over cream, ink, and every accent panel without the muddy mix-blend trick.
function useHeaderTone() {
  const pathname = usePathname();
  const [tone, setTone] = useState<"light" | "dark">("dark");

  useEffect(() => {
    let raf = 0;
    const sample = () => {
      raf = 0;
      const x = Math.round(window.innerWidth / 2);
      const y = 76; // just below the header band
      const stack = document.elementsFromPoint(x, y);
      for (const el of stack) {
        if (!(el instanceof HTMLElement)) continue;
        // ignore the header itself and any full-screen overlay (loader /
        // page-transition wipe) — otherwise we'd sample the ink overlay on
        // first paint and turn the header cream-on-cream until a scroll.
        if (el.closest("header") || el.closest("[data-overlay]")) continue;
        const rgb = parseRGB(getComputedStyle(el).backgroundColor);
        if (rgb && rgb.a > 0.5) {
          setTone(luminance(rgb.r, rgb.g, rgb.b) < 0.35 ? "light" : "dark");
          return;
        }
      }
      setTone("dark");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sample);
    };
    sample();
    const t = setTimeout(sample, 80); // re-sample after route paint
    const t2 = setTimeout(sample, 2700); // re-sample once the loader has lifted
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [pathname]);

  return tone;
}

// Dock-style per-letter magnifier on the wordmark: each letter swells as the
// cursor passes, with a smooth Gaussian falloff. Desktop / fine-pointer only.
function Wordmark() {
  const ref = useRef<HTMLAnchorElement>(null);
  const spans = useRef<(HTMLSpanElement | null)[]>([]);
  const letters = "HARSHITA".split("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const sigma = 46;
        for (const s of spans.current) {
          if (!s) continue;
          const r = s.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const d = e.clientX - cx;
          const amp = Math.exp(-(d * d) / (2 * sigma * sigma)); // 0..1
          s.style.transform = `translateY(${-amp * 5}px) scale(${1 + amp * 0.42})`;
        }
      });
    };
    const reset = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      for (const s of spans.current)
        if (s) s.style.transform = "translateY(0) scale(1)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Link
      ref={ref}
      href="/"
      aria-label="Harshita — home"
      className="font-display hidden text-center text-[22px] tracking-tight md:flex md:justify-center"
    >
      {letters.map((ch, i) => (
        <span
          key={i}
          ref={(n) => {
            spans.current[i] = n;
          }}
          className="inline-block origin-bottom transition-transform duration-150 ease-out will-change-transform"
        >
          {ch}
        </span>
      ))}
    </Link>
  );
}

export default function Hud() {
  const time = useClock();
  const tone = useHeaderTone();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        tone === "light" ? "text-cream" : "text-ink"
      }`}
    >
      <div className="grid grid-cols-3 items-center px-5 py-4 md:grid-cols-[1fr_auto_1fr] md:px-8">
        {/* left — location + clock */}
        <div className="label hidden items-center gap-3 md:flex">
          <span>Udaipur, (IN)</span>
          <span className="opacity-50">{"//"}</span>
          <span className="flex items-center gap-2">
            <span className="rec-dot" />
            {time}
          </span>
        </div>
        <div className="label md:hidden">
          <Link href="/">HJ</Link>
        </div>

        {/* center — wordmark (magnifier) */}
        <Wordmark />

        {/* right — nav */}
        <nav className="label flex items-center justify-end gap-5 md:gap-7">
          <Link href="/work" className="hover-line">
            Work<sup className="mono">({projects.length})</sup>
          </Link>
          <Link href="/about" className="hover-line">
            About
          </Link>
          <Link href="/contact" className="hover-line">
            Contact
          </Link>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-line"
          >
            Resume<span className="mono"> ↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
