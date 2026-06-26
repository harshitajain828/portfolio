import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import FooterStrip from "@/components/FooterStrip";

export const metadata = { title: "Index" };

export default function IndexPage() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <div className="px-5 pt-32 md:px-8">
        <h1 className="font-display text-[18vw] leading-[0.9] md:text-[11vw]">
          Index
        </h1>
        <p className="serif-italic mt-3 text-[20px] text-cream/70 md:text-[24px]">
          Everything, in one ledger.
        </p>
      </div>

      <div className="grid gap-12 px-5 pt-16 pb-24 md:grid-cols-[1.3fr_auto_1fr] md:gap-16 md:px-8">
        {/* left ledger — project / skills */}
        <div>
          <div className="label mb-6 flex items-baseline justify-between border-b border-cream/20 pb-2 text-cream/80">
            <span>Project — Skills</span>
            <sup className="mono">({projects.length})</sup>
          </div>
          <ul>
            {projects.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/work/${p.slug}`}
                  className="idx-row flex items-baseline justify-between gap-6 py-3 text-cream/45"
                  style={{ "--acc": p.accent } as React.CSSProperties}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="mono opacity-60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[22px]">{p.title}</span>
                  </span>
                  <span className="text-right text-[12px]">
                    {p.skills.slice(0, 2).join(" // ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="label mt-14 mb-6 border-b border-cream/20 pb-2 text-cream/80">
            Pages
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 py-1">
            {[
              ["Work", "/work"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover-line text-[13px] text-cream/60">
                  {label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* center thumbnails */}
        <div className="order-first grid w-full grid-cols-4 gap-2 self-start md:order-none md:w-auto md:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="relative block h-20 w-full overflow-hidden rounded-sm opacity-80 transition-all duration-300 hover:scale-[1.04] hover:opacity-100 md:h-28 md:w-24"
            >
              <Image
                src={p.cover}
                alt={p.title}
                fill
                sizes="120px"
                className="object-cover"
              />
            </Link>
          ))}
        </div>

        {/* right ledger — type / year */}
        <div>
          <div className="label mb-6 border-b border-cream/20 pb-2 text-cream/80">
            Type — Year
          </div>
          <ul>
            {projects.map((p) => (
              <li
                key={p.slug}
                className="flex items-baseline justify-between gap-6 py-3 text-[12px] text-cream/45"
              >
                <span>{p.type}</span>
                <span className="mono">{p.year}</span>
              </li>
            ))}
          </ul>

          <div className="label mt-14 mb-6 border-b border-cream/20 pb-2 text-cream/80">
            Status
          </div>
          <div className="flex items-center gap-3 py-3 text-[12px] text-cream/60">
            <span className="rec-dot" style={{ color: "#c8e84f" }} />
            <span>Open to product roles</span>
          </div>
          <a
            href="mailto:harshitajain828@gmail.com"
            className="hover-line block py-1 text-[12px] text-cream/60"
          >
            harshitajain828@gmail.com
          </a>
        </div>
      </div>

      <FooterStrip dark />
    </main>
  );
}
