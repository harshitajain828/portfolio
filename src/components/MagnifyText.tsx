"use client";

import { useEffect, useRef } from "react";

type Part = { text: string; className?: string };

/**
 * Dock-style per-letter magnifier. Each letter swells as the cursor passes,
 * with a smooth Gaussian falloff. Letters are grouped into words so the text
 * still wraps only at spaces. Effect runs on fine-pointer (desktop) only;
 * on touch it renders as normal text. Renders an <a> when `href` is given,
 * otherwise a <span> (so it can be used inside headings).
 */
export default function MagnifyText({
  parts,
  href,
  className = "",
  style,
  sigma = 70,
  scale = 0.3,
  lift = 8,
  ariaLabel,
}: {
  parts: Part[];
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  sigma?: number;
  scale?: number;
  lift?: number;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLSpanElement>(null);
  const spans = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        for (const s of spans.current) {
          if (!s) continue;
          const r = s.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const d = e.clientX - cx;
          const amp = Math.exp(-(d * d) / (2 * sigma * sigma));
          s.style.transform = `translateY(${-amp * lift}px) scale(${1 + amp * scale})`;
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
  }, [sigma, scale, lift]);

  // flatten parts to per-letter descriptors, then group into words (so the
  // line only ever breaks at spaces, never mid-word)
  const letters = parts.flatMap((p) =>
    [...p.text].map((ch) => ({ ch, className: p.className }))
  );
  type Desc = { ch: string; className?: string; idx: number };
  const tokens: ({ type: "word"; chars: Desc[] } | { type: "space" })[] = [];
  let cur: Desc[] = [];
  let idx = 0;
  for (const l of letters) {
    if (l.ch === " ") {
      if (cur.length) {
        tokens.push({ type: "word", chars: cur });
        cur = [];
      }
      tokens.push({ type: "space" });
    } else {
      cur.push({ ch: l.ch, className: l.className, idx: idx++ });
    }
  }
  if (cur.length) tokens.push({ type: "word", chars: cur });

  const aria = ariaLabel ?? parts.map((p) => p.text).join("");

  const content = tokens.map((t, ti) =>
    t.type === "space" ? (
      <span key={`s${ti}`}> </span>
    ) : (
      <span key={`w${ti}`} className="inline-block whitespace-nowrap align-baseline">
        {t.chars.map((c) => (
          <span
            key={c.idx}
            ref={(n) => {
              spans.current[c.idx] = n;
            }}
            aria-hidden
            className={`inline-block origin-bottom align-baseline transition-transform duration-150 ease-out will-change-transform ${
              c.className ?? ""
            }`}
          >
            {c.ch}
          </span>
        ))}
      </span>
    )
  );

  if (href) {
    return (
      <a ref={ref} href={href} aria-label={aria} className={className} style={style}>
        {content}
      </a>
    );
  }
  return (
    <span ref={ref} aria-label={aria} className={className} style={style}>
      {content}
    </span>
  );
}
