"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const COVER_MS = 550;
const REVEAL_MS = 650;

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "cover" | "reveal">("idle");
  const pending = useRef<string | null>(null);
  const prevPath = useRef(pathname);

  // intercept internal link clicks and play the cover wipe first
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/")) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(href, location.href);
      if (url.pathname === location.pathname) return;

      e.preventDefault();
      e.stopPropagation();
      pending.current = href;
      setState("cover");
      setTimeout(() => router.push(href), COVER_MS + 30);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // when the new route lands, reveal it
  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;
    if (!pending.current && state !== "cover") return;
    pending.current = null;
    window.scrollTo(0, 0);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setState("reveal");
        setTimeout(() => setState("idle"), REVEAL_MS + 50);
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const style: React.CSSProperties =
    state === "cover"
      ? {
          transform: "translateY(0%)",
          transition: `transform ${COVER_MS}ms cubic-bezier(0.76,0,0.24,1)`,
        }
      : state === "reveal"
        ? {
            transform: "translateY(-100%)",
            transition: `transform ${REVEAL_MS}ms cubic-bezier(0.76,0,0.24,1)`,
          }
        : { transform: "translateY(100%)", transition: "none" };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-ink"
      style={style}
      aria-hidden
    >
      <span
        className="font-display text-[26px] text-cream"
        style={{
          opacity: state === "idle" ? 0 : 1,
          transition: "opacity 0.25s",
        }}
      >
        HJ<sup className="text-[11px] align-super">®</sup>
      </span>
    </div>
  );
}
