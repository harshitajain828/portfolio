import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import FooterStrip from "@/components/FooterStrip";

export const metadata = { title: "Work — Harshita Jain®" };

export default function WorkPage() {
  return (
    <main className="bg-cream">
      <div className="px-5 pt-32 pb-10 md:px-8">
        <h1 className="font-display text-[16vw] leading-none md:text-[10vw]">
          Work
          <sup className="mono ml-2 align-super text-[14px]">
            ({projects.length})
          </sup>
        </h1>
      </div>

      <div className="grid gap-px border-t border-ink/10 md:grid-cols-2">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group relative block overflow-hidden"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={p.cover}
                alt={p.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="px-5 py-5 md:px-6">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-[28px] md:text-[36px]">
                  {p.title}
                </span>
                <span className="mono opacity-60">
                  {String(i + 1).padStart(2, "0")} · {p.year}
                </span>
              </div>
              <div className="label mt-1 opacity-60">{p.outcomeLine}</div>
            </div>
          </Link>
        ))}
      </div>

      <FooterStrip />
    </main>
  );
}
