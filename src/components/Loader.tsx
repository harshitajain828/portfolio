"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [phase, setPhase] = useState<"hidden" | "shown" | "leaving">("hidden");

  useEffect(() => {
    if (sessionStorage.getItem("hj-loader") === "1") return;
    sessionStorage.setItem("hj-loader", "1");
    setPhase("shown");
    const t1 = setTimeout(() => setPhase("leaving"), 1500);
    const t2 = setTimeout(() => setPhase("hidden"), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{
        transform: phase === "leaving" ? "translateY(-100%)" : "translateY(0)",
      }}
      aria-hidden
    >
      <div className="overflow-hidden">
        <div
          className="font-display text-cream text-[34px] leading-[0.9] text-center animate-[loaderUp_0.9s_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          HARSHITA
          <br />
          JAIN<sup className="text-[12px] align-super">®</sup>
        </div>
      </div>
      <style jsx>{`
        @keyframes loaderUp {
          from {
            transform: translateY(110%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
