import HomeHero from "@/components/home/HomeHero";
import FooterStrip from "@/components/FooterStrip";
import Link from "next/link";

const steps = [
  {
    n: "01",
    t: "Design",
    d: "Research, flows and UI in Figma — end-to-end, from problem framing to a full design system.",
  },
  {
    n: "02",
    t: "Build",
    d: "The design becomes a working product — AI-native workflow with Claude Code, GSAP and modern web tooling. This site is the receipt.",
  },
  {
    n: "03",
    t: "Ship",
    d: "Live, responsive, fast. No handoff gap, no translation loss between the design and what users actually get.",
  },
];

export default function Home() {
  return (
    <main>
      <HomeHero />

      {/* how I build */}
      <section className="border-t border-ink/10 bg-cream px-5 py-24 md:px-8">
        <div className="label mb-12 flex items-center gap-3">
          <span className="bracket" />
          <span>How I build</span>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n}>
              <div className="mono mb-4 opacity-60">{s.n}</div>
              <h3 className="font-display mb-3 text-[40px]">{s.t}</h3>
              <p className="max-w-[34ch] text-[14px] leading-snug opacity-80">
                {s.d}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16">
          <Link href="/about" className="hover-line label">
            More about me →
          </Link>
        </div>
      </section>

      <FooterStrip />
    </main>
  );
}
