import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

// Accent pills beside the name. On a real pointer they sit as thin colour
// capsules and spring open on hover to reveal the cover + name. On touch
// (no hover — phones, iPad) they show the cover thumbnail outright, so they
// stay meaningful and tappable. Behaviour lives in globals.css (.hero-pill).
export default function HeroPills() {
  return (
    <span className="pointer-events-auto ml-[2vw] hidden items-center gap-3 md:flex">
      {projects.map((p) => (
        <Link
          key={p.slug}
          href={`/work/${p.slug}`}
          aria-label={`${p.title} — case study`}
          className="hero-pill group/pill relative block shrink-0 overflow-hidden rounded-[0.55vw]"
          style={{ backgroundColor: p.accent }}
        >
          <Image
            src={p.cover}
            alt=""
            fill
            sizes="16vw"
            className="hero-pill-img object-cover"
          />
          <span
            className="hero-pill-label absolute inset-x-0 bottom-0 flex items-center gap-2 px-3 py-2 text-[12px] font-semibold uppercase tracking-wide"
            style={{ backgroundColor: p.accent, color: p.accentFg }}
          >
            <span className="truncate">{p.title}</span>
            <span aria-hidden>↗</span>
          </span>
        </Link>
      ))}
    </span>
  );
}
