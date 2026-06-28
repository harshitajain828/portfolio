import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

// which screen to feature per project, and how to frame it
const SHOWCASE: Record<string, { img: number; device: "phone" | "desktop" }> = {
  fixit: { img: 1, device: "phone" },
  appeal: { img: 1, device: "phone" },
  sentinel: { img: 1, device: "desktop" },
  cyclesync: { img: 0, device: "phone" },
};

function PhoneMock({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`rounded-[30px] bg-white p-[7px] shadow-[0_44px_90px_rgba(0,0,0,0.4)] ${className}`}>
      <div className="relative overflow-hidden rounded-[24px]" style={{ aspectRatio: "390 / 844" }}>
        <Image src={src} alt="" fill sizes="(max-width:768px) 64vw, 24vw" className="object-cover" />
      </div>
    </div>
  );
}

function DesktopMock({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[16px] bg-white shadow-[0_44px_90px_rgba(0,0,0,0.4)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-black/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
      </div>
      <div className="relative" style={{ aspectRatio: "16 / 10" }}>
        <Image src={src} alt="" fill sizes="(max-width:768px) 92vw, 46vw" className="object-cover object-top" />
      </div>
    </div>
  );
}

export default function WorkStack() {
  return (
    <section>
      {projects.map((p, i) => {
        const conf = SHOWCASE[p.slug] ?? { img: 0, device: "phone" as const };
        const src = p.images[conf.img] ?? p.cover;
        const isPhone = conf.device === "phone";
        return (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group relative flex min-h-screen flex-col justify-center overflow-hidden md:sticky md:top-0 md:h-screen"
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

              {/* device mockup */}
              <div className="relative hidden h-full items-center justify-center md:flex">
                {/* soft halo for depth */}
                <span
                  className="pointer-events-none absolute h-[58%] w-[58%] rounded-full"
                  style={{ backgroundColor: p.accentFg, opacity: 0.12 }}
                  aria-hidden
                />
                {isPhone ? (
                  <PhoneMock
                    src={src}
                    className="relative w-[clamp(200px,23vw,300px)] rotate-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-0 group-hover:-translate-y-2"
                  />
                ) : (
                  <DesktopMock
                    src={src}
                    className="relative w-[clamp(380px,46vw,640px)] rotate-1 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-0 group-hover:-translate-y-2"
                  />
                )}
              </div>

              {/* mobile mockup */}
              <div className="flex justify-center md:hidden">
                {isPhone ? (
                  <PhoneMock src={src} className="w-[62vw] max-w-[280px]" />
                ) : (
                  <DesktopMock src={src} className="w-full" />
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
