"use client";

import Link from "next/link";
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

export default function Hud() {
  const time = useClock();

  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-cream">
      <div className="grid grid-cols-3 items-center px-5 py-4 md:grid-cols-[1fr_auto_1fr] md:px-8">
        {/* left — location + clock */}
        <div className="label hidden items-center gap-3 md:flex">
          <span>Udaipur, (IN)</span>
          <span className="opacity-50">//</span>
          <span className="flex items-center gap-2">
            <span className="rec-dot" />
            {time}
          </span>
          <span className="bracket ml-4 opacity-70" />
        </div>
        <div className="label md:hidden">
          <Link href="/">HJ®</Link>
        </div>

        {/* center — wordmark */}
        <Link
          href="/"
          className="font-display hidden text-center text-[22px] leading-[0.9] tracking-tight md:block"
        >
          HARSHITA
          <br />
          JAIN<sup className="text-[10px] align-super">®</sup>
        </Link>

        {/* right — nav */}
        <nav className="label flex items-center justify-end gap-5 md:gap-7">
          <Link href="/work" className="hover-line">
            Work<sup className="mono">({projects.length})</sup>
          </Link>
          <Link href="/playground" className="hover-line hidden sm:block">
            Playground
          </Link>
          <Link href="/index" className="hover-line hidden md:block">
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
