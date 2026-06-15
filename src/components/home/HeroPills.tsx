import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

// Accent pills beside the name. At rest: a row of colour capsules. On hover
// the capsule springs open into a rectangle — revealing the project's cover
// and name — and pushes the other pills aside (flex reflow).
export default function HeroPills() {
  return (
    <span className="pointer-events-auto ml-[2vw] hidden items-center gap-3 md:flex">
      {projects.map((p) => (
        <Link
          key={p.slug}
          href={`/work/${p.slug}`}
          aria-label={`${p.title} — case study`}
          className="group/pill relative block h-[3.4vw] w-[1.7vw] shrink-0 overflow-hidden rounded-[0.55vw] hover:w-[12vw]"
          style={{
            backgroundColor: p.accent,
            transition: "width 450ms cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <Image
            src={p.cover}
            alt=""
            fill
            sizes="16vw"
            className="scale-105 object-cover opacity-0 transition-all duration-500 group-hover/pill:scale-100 group-hover/pill:opacity-100"
          />
          <span
            className="absolute inset-x-0 bottom-0 flex translate-y-1 items-center gap-2 px-3 py-2 text-[12px] font-semibold uppercase tracking-wide opacity-0 transition-all delay-100 duration-300 group-hover/pill:translate-y-0 group-hover/pill:opacity-100"
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
