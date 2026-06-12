import Link from "next/link";
import FooterStrip from "@/components/FooterStrip";
import { projects } from "@/lib/projects";

export const metadata = { title: "About — Harshita Jain®" };

const ledgers: { label: string; items: string[] }[] = [
  {
    label: "Design",
    items: [
      "Product design",
      "UI / UX design",
      "User research",
      "Design systems",
      "Interaction design",
      "Visual design",
      "Prototyping",
    ],
  },
  {
    label: "AI toolchain",
    items: [
      "Figma",
      "Framer + Framer MCP",
      "Claude Code",
      "Figma ↔ Claude connectors",
      "GSAP (directing motion)",
      "Adobe Creative Cloud",
      "Midjourney · Gemini · Claude",
    ],
  },
  {
    label: "Certifications",
    items: [
      "Meta Front-End Developer",
      "Meta Back-End Developer",
      "Google Cloud Foundations",
      "CCNA — Intro to Networks",
    ],
  },
  {
    label: "Education",
    items: [
      "MCA — Amrita Vishwa Vidyapeetham",
      "BCA — Mohanlal Sukhadia University",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="bg-cream">
      {/* intro */}
      <section className="px-5 pt-36 pb-20 md:px-8">
        <div className="label mb-10 flex items-center gap-3 opacity-70">
          <span className="bracket" />
          <span>About</span>
        </div>
        <h1 className="serif max-w-[26ch] text-[34px] leading-[1.12] md:text-[56px]">
          I&apos;m Harshita — a product &amp; UI/UX designer who treats{" "}
          <em className="serif-italic">curiosity as a tool</em> and AI as a
          studio.
        </h1>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <p className="max-w-[52ch] text-[15px] normal-case leading-relaxed opacity-85">
            Based in Udaipur, India, with a computer science background (MCA),
            I take products from problem framing to polished interface —
            research, flows, design systems, the whole arc. My case studies
            are self-initiated by choice: each one is a complete product
            thought through end-to-end, not a fragment of someone else&apos;s
            brief.
          </p>
          <p className="max-w-[52ch] text-[15px] normal-case leading-relaxed opacity-85">
            I work AI-native — Claude Code, Framer MCP, the connectors most
            designers haven&apos;t opened yet — so my designs become living
            prototypes instead of static screens. This site is the proof:
            every pixel designed and art-directed by me, brought to life with
            my AI toolchain.
          </p>
        </div>
      </section>

      {/* role strip */}
      <section className="label grid grid-cols-1 gap-4 border-t border-ink/10 px-5 py-8 sm:grid-cols-3 md:px-8">
        <div className="flex items-center gap-3">
          <span className="rec-dot" style={{ color: "#ff4d1c" }} />
          <span>Open to product roles</span>
        </div>
        <div className="sm:text-center">Udaipur, IN — Remote-ready</div>
        <div className="sm:text-right lowercase">harshitajain828@gmail.com</div>
      </section>

      {/* black ledger */}
      <section className="bg-ink px-5 py-24 text-cream md:px-8">
        <div className="grid gap-14 md:grid-cols-4">
          {ledgers.map((l) => (
            <div key={l.label}>
              <div className="label mb-6 border-b border-cream/20 pb-2 text-cream/80">
                {l.label}:
              </div>
              <ul className="flex flex-col gap-2 text-[13px] text-cream/60">
                {l.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <div className="label mb-6 border-b border-cream/20 pb-2 text-cream/80">
            How I work:
          </div>
          <p className="font-display max-w-[16ch] text-[10vw] leading-[1] md:text-[5.5vw]">
            Figma → AI toolchain →{" "}
            <em className="serif-italic font-normal">live prototype</em>
          </p>
        </div>
      </section>

      {/* colorful bridge to work */}
      <section className="px-5 py-20 md:px-8">
        <div className="label mb-8 flex items-center gap-3 opacity-70">
          <span className="bracket" />
          <span>The proof</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group flex min-h-[160px] flex-col justify-between rounded-sm p-5 transition-transform duration-300 hover:-translate-y-1"
              style={{ backgroundColor: p.accent, color: p.accentFg }}
            >
              <span className="mono opacity-70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="font-display block text-[26px] leading-none">
                  {p.title}
                </span>
                <span className="label mt-2 block opacity-80">
                  View case study →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FooterStrip />
    </main>
  );
}
