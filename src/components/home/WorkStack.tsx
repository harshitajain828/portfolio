import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function WorkStack() {
  return (
    <section>
      {projects.map((p, i) => (
        <Link
          key={p.slug}
          href={`/work/${p.slug}`}
          className="group sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
          style={{ backgroundColor: p.accent, color: p.accentFg }}
        >
          {/* giant number watermark */}
          <span
            className="font-display pointer-events-none absolute -top-[6vw] right-[-2vw] text-[36vw] leading-none opacity-[0.08] md:text-[26vw]"
            aria-hidden
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className="relative z-10 grid h-full items-center gap-8 px-5 py-20 md:grid-cols-[1.05fr_1fr] md:px-12">
            {/* text */}
            <div>
              <div className="label mb-5 flex items-center gap-4 opacity-80">
                <span className="mono">
                  {String(i + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
                </span>
                <span>{p.type}</span>
                <span className="mono">{p.year}</span>
              </div>
              <h2 className="font-display text-[13vw] leading-[0.95] md:text-[6vw]">
                {p.title}
              </h2>
              <p className="serif-italic mt-4 max-w-[26ch] text-[22px] leading-snug md:text-[30px]">
                {p.statement}
              </p>
              <div className="label mt-5 max-w-[44ch] opacity-80">
                {p.outcomeLine}
              </div>
              <span className="label mt-8 inline-block rounded-full border border-current px-5 py-2.5 transition-all duration-300 group-hover:px-7">
                View case study →
              </span>
            </div>

            {/* image composition — cover anchored low, bleeding off the
                panel edge; secondary shot floating above it */}
            <div className="relative hidden h-full md:block">
              <div className="absolute bottom-[-12%] right-[2%] aspect-[3/4] w-[68%] overflow-hidden rounded-sm shadow-[0_32px_90px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-4">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="34vw"
                  className="object-cover"
                />
              </div>
              {p.images[0] && (
                <div className="absolute left-[2%] top-[10%] aspect-[4/3] w-[44%] -rotate-3 overflow-hidden rounded-sm shadow-[0_18px_50px_rgba(0,0,0,0.3)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-0 group-hover:-translate-y-2">
                  <Image
                    src={p.images[0]}
                    alt=""
                    fill
                    sizes="22vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* mobile image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-[0_18px_50px_rgba(0,0,0,0.3)] md:hidden">
              <Image
                src={p.cover}
                alt={p.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
