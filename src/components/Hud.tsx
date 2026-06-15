"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { projects } from "@/lib/projects";

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
        if (el.closest("header")) continue;
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pathname]);

  return tone;
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

        {/* center — wordmark */}
        <Link
          href="/"
          className="font-display hidden text-center text-[22px] tracking-tight md:block"
        >
          HARSHITA
        </Link>

        {/* right — nav */}
        <nav className="label flex items-center justify-end gap-5 md:gap-7">
          <Link href="/work" className="hover-line">
            Work<sup className="mono">({projects.length})</sup>
          </Link>
          <Link href="/playground" className="hover-line hidden sm:block">
            Playground
          </Link>
          <Link href="/directory" className="hover-line hidden md:block">
            Index
          </Link>
          <Link href="/about" className="hover-line">
            About
          </Link>
          <Link href="/contact" className="hover-line">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
