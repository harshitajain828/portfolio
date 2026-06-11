import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import FooterStrip from "@/components/FooterStrip";

export const metadata = { title: "Index — Harshita Jain®" };

export default function IndexPage() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <div className="grid gap-10 px-5 pt-32 pb-24 md:grid-cols-[1.2fr_auto_1fr] md:gap-16 md:px-8">
        {/* left ledger — project / skills */}
        <div>
          <div className="label mb-6 border-b border-cream/20 pb-2">
            Project — Skills
          </div>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/work/${p.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-2 text-[15px] text-cream/45 transition-colors duration-300 hover:text-cream"
                >
                  <span>{p.title}</span>
                  <span className="text-right text-[12px]">
                    {p.skills.slice(0, 2).join(" // ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="label mt-14 mb-6 border-b border-cream/20 pb-2">
            Playground
          </div>
          <p className="text-[13px] text-cream/45">
            Motion + interaction experiments — coming soon.
          </p>
        </div>

        {/* center thumbnails */}
        <div className="order-first grid w-full grid-cols-4 gap-2 self-start md:order-none md:w-auto md:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="relative block h-20 w-full opacity-80 transition-opacity hover:opacity-100 md:h-28 md:w-24"
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
          <div className="label mb-6 border-b border-cream/20 pb-2">
            Type — Year
          </div>
          <ul>
            {projects.map((p) => (
              <li
                key={p.slug}
                className="flex items-baseline justify-between gap-6 py-2 text-[12px] text-cream/45"
              >
                <span>{p.type}</span>
                <span className="mono">{p.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <FooterStrip dark />
    </main>
  );
}
