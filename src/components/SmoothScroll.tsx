"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Recompute the scroll limit whenever the page height changes after mount.
    // Without this, Lenis caches the height it saw at init — and once the big
    // display font swaps in or images decode, the document grows taller but the
    // stale limit caps downward scrolling partway down the page.
    let rafId = 0;
    const refresh = () => {
      rafId = 0;
      lenis.resize();
      ScrollTrigger.refresh();
    };
    const scheduleRefresh = () => {
      if (!rafId) rafId = requestAnimationFrame(refresh);
    };

    const ro = new ResizeObserver(scheduleRefresh);
    ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);

    window.addEventListener("load", scheduleRefresh);
    document.fonts?.ready.then(scheduleRefresh).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener("load", scheduleRefresh);
      if (rafId) cancelAnimationFrame(rafId);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
