import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function WorkList() {
  return (
    <section id="work">
      <div className="label flex items-center gap-3 border-t border-ink/10 px-5 pt-14 pb-8 md:px-8">
        <span className="bracket" />
        <span>Selected work</span>
        <sup className="mono">({projects.length})</sup>
      </div>

      {projects.map((p, i) => (
        <Link
          key={p.slug}
          href={`/work/${p.slug}`}
          className="group block overflow-hidden"
          style={{ backgroundColor: p.accent, color: p.accentFg }}
        >
          <div
            className={`mx-auto grid max-w-[1700px] items-center gap-10 px-5 py-16 md:gap-16 md:px-12 md:py-24 ${
              i % 2 === 1 ? "md:grid-cols-[1fr_1.1fr]" : "md:grid-cols-[1.1fr_1fr]"
            }`}
          >
            {/* text side */}
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="label mb-6 flex items-center gap-4 opacity-80">
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <span>{p.type}</span>
                <span className="mono">{p.year}</span>
              </div>
              <h2 className="font-display text-[12vw] leading-[0.95] md:text-[5vw]">
                {p.title}
              </h2>
              <p className="serif-italic mt-5 max-w-[30ch] text-[22px] leading-snug md:text-[28px]">
                {p.statement}
              </p>
              <div className="label mt-6 opacity-80">{p.outcomeLine}</div>
              <div className="label mt-10 inline-flex items-center gap-3">
                <span
                  className="rounded-full border px-5 py-2.5 transition-all duration-300 group-hover:px-7"
                  style={{ borderColor: "currentColor" }}
                >
                  View case study →
                </span>
              </div>
            </div>

            {/* image side — cover composed as an elevated card */}
            <div
              className={`relative ${i % 2 === 1 ? "md:order-1" : ""}`}
            >
              <div
                className={`relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-sm shadow-[0_30px_90px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] ${
                  i % 2 === 1 ? "md:-rotate-2" : "md:rotate-2"
                } group-hover:rotate-0`}
              >
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(min-width: 768px) 420px, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
