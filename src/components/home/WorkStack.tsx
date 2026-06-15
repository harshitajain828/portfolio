import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

// A framed "stamp / plate" around a screenshot: cream mat, caption metadata
// top and bottom, corner registration marks, drop shadow, slight rotation.
function Plate({
  src,
  fig,
  year,
  topRight,
  bottomLeft,
  bottomRight,
  accent,
  aspect = "4/5",
  small = false,
}: {
  src: string;
  fig?: string;
  year?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
  accent: string;
  aspect?: string;
  small?: boolean;
}) {
  const pad = small ? "p-[0.7vw]" : "p-[1vw]";
  const cap = small ? "text-[0.62vw]" : "text-[0.74vw]";
  return (
    <div
      className={`bg-cream ${pad} shadow-[0_30px_70px_rgba(0,0,0,0.32)] ring-1 ring-ink/10`}
    >
      {(fig || year) && (
        <div className={`mono ${cap} flex items-center justify-between pb-[0.6vw] text-ink/50`}>
          <span>{fig}</span>
          <span>{topRight ?? year}</span>
        </div>
      )}
      <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
        <Image
          src={src}
          alt=""
          fill
          sizes={small ? "20vw" : "34vw"}
          className="object-cover"
        />
        {/* corner registration marks */}
        <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-cream/80" />
        <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-cream/80" />
        {/* accent quote glyph */}
        <span
          className="serif pointer-events-none absolute -top-[0.4vw] left-[0.4vw] text-[3.2vw] leading-none"
          style={{ color: accent }}
        >
          &ldquo;
        </span>
      </div>
      {(bottomLeft || bottomRight) && (
        <div className={`label ${cap} flex items-end justify-between pt-[0.6vw] text-ink/65`}>
          <span>{bottomLeft}</span>
          <span>{bottomRight}</span>
        </div>
      )}
    </div>
  );
}

export default function WorkStack() {
  return (
    <section>
      {projects.map((p, i) => {
        const fig = `FIG. ${String(i + 1).padStart(2, "0")}`;
        return (
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
                    {String(i + 1).padStart(2, "0")}/
                    {String(projects.length).padStart(2, "0")}
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

              {/* image composition — stamp plates */}
              <div className="relative hidden h-full items-center justify-center md:flex">
                {p.images[0] && (
                  <div className="absolute left-[2%] top-[15%] w-[40%] -rotate-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-3 group-hover:-translate-y-1">
                    <Plate
                      src={p.images[0]}
                      accent={p.accent}
                      aspect="4/3"
                      small
                    />
                  </div>
                )}
                <div className="relative z-10 w-[62%] rotate-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-0 group-hover:-translate-y-2">
                  <Plate
                    src={p.cover}
                    fig={fig}
                    year={p.year}
                    bottomLeft={p.type}
                    bottomRight={p.role}
                    accent={p.accent}
                  />
                </div>
              </div>

              {/* mobile plate */}
              <div className="md:hidden">
                <Plate
                  src={p.cover}
                  fig={fig}
                  year={p.year}
                  bottomLeft={p.type}
                  bottomRight={p.role}
                  accent={p.accent}
                  aspect="4/3"
                />
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
