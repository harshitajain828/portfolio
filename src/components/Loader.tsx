"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [phase, setPhase] = useState<"shown" | "leaving" | "hidden">("shown");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("leaving"), 1600);
    const t2 = setTimeout(() => setPhase("hidden"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      data-overlay
      style={{
        transform: phase === "leaving" ? "translateY(-100%)" : "translateY(0)",
      }}
      aria-hidden
    >
      <div className="overflow-hidden">
        <div className="font-display text-cream text-center text-[34px] leading-[0.95] animate-[loaderUp_0.9s_cubic-bezier(0.22,1,0.36,1)_both]">
          HARSHITA
          <br />
          JAIN
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-8">
        <span className="mono text-cream/60 animate-[loaderFade_0.8s_0.5s_both]">
          UDAIPUR, (IN)
        </span>
        <span className="mono text-cream/60 animate-[loaderFade_0.8s_0.7s_both]">
          PORTFOLIO ©2026
        </span>
      </div>
    </div>
  );
}
