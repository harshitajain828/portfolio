import Link from "next/link";
import WorkStack from "@/components/home/WorkStack";
import DoodleTrail from "@/components/home/DoodleTrail";
import HeroPills from "@/components/home/HeroPills";
import FooterStrip from "@/components/FooterStrip";
import { projects } from "@/lib/projects";

const steps = [
  {
    n: "01",
    t: "Design",
    d: "Research, flows and UI in Figma — from problem framing to a full design system.",
  },
  {
    n: "02",
    t: "Prototype",
    d: "AI-native: Claude Code, Framer MCP, the new toolchain — designs become real, clickable prototypes. This site is one.",
  },
  {
    n: "03",
    t: "Hand off",
    d: "A CS background means I speak engineer — specs and edge cases land build-ready.",
  },
];

export default function Home() {
  return (
    <main>
      {/* hero — identity + doodle trail */}
      <section className="relative flex min-h-[92vh] flex-col justify-end px-5 pb-10 pt-32 md:px-8">
        <DoodleTrail />
        <div className="pointer-events-none relative z-10">
          <h1 className="font-display flex flex-wrap items-baseline gap-x-4">
            <span className="mask-line">
              <span
                className="serif-italic block text-[6vw] leading-none opacity-75 md:text-[2.4vw]"
                style={{ animationDelay: "0s" }}
              >
                hi, I&apos;m
              </span>
            </span>
            <span className="mask-line">
              <span
                className="items-center gap-[1.4vw] text-[10vw] leading-none md:text-[6.2vw]"
                style={{ animationDelay: "0.1s", display: "flex" }}
              >
                Harshita
                <HeroPills />
              </span>
            </span>
          </h1>

          <h2 className="font-display mt-3 text-[12vw] leading-[0.92] md:text-[7.4vw]">
            <span className="mask-line">
              <span style={{ animationDelay: "0.3s" }}>I turn ideas</span>
            </span>
            <span className="mask-line">
              <span style={{ animationDelay: "0.4s" }}>into interfaces.</span>
            </span>
          </h2>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <p className="mask-line max-w-[42ch] text-[17px] leading-snug md:text-[20px]">
              <span style={{ animationDelay: "0.38s" }}>
                <strong>Product designer, AI-native</strong> —{" "}
                <em className="serif-italic text-[1.25em]">
                  fluent in the AI toolchain that&apos;s reshaping how products
                  get designed.
                </em>
              </span>
            </p>
            <div className="label flex items-center gap-3">
              <span className="rec-dot" style={{ color: "#ff4d1c" }} />
              <span>Open to product roles</span>
            </div>
          </div>
        </div>
      </section>

      {/* bridge — sets up the work before showing it */}
      <section className="border-t border-ink/10 px-5 py-28 md:px-8 md:py-36">
        <div className="label mb-8 flex items-center gap-3 opacity-70">
          <span className="bracket" />
          <span>Selected work</span>
          <sup className="mono">({projects.length})</sup>
        </div>
        <p className="serif max-w-[24ch] text-[34px] leading-[1.15] md:text-[54px]">
          Three products, taken from research to
          <em className="serif-italic"> living prototype.</em>
        </p>
        <p className="label mt-6 opacity-60">
          Self-initiated, owned end to end. Scroll ↓
        </p>
      </section>

      {/* stacked project panels */}
      <WorkStack />

      {/* about + process, one human section */}
      <section className="relative z-10 border-t border-ink/10 bg-cream px-5 py-28 md:px-8">
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="label mb-8 flex items-center gap-3 opacity-70">
              <span className="bracket" />
              <span>About</span>
            </div>
            <p className="serif max-w-[36ch] text-[26px] leading-snug md:text-[34px]">
              I&apos;m a product &amp; UI/UX designer from Udaipur, India, with
              a computer science background. I work AI-native —{" "}
              <em className="serif-italic">
                carrying ideas from research through to working prototypes.
              </em>
            </p>
            <Link href="/about" className="hover-line label mt-8 inline-block">
              More about me →
            </Link>
          </div>

          <div className="flex flex-col gap-8 border-ink/10 md:border-l md:pl-12">
            <div className="label opacity-70">How I work:</div>
            {steps.map((s) => (
              <div key={s.n} className="flex gap-5">
                <span className="mono pt-1 opacity-60">{s.n}</span>
                <div>
                  <h3 className="font-display text-[22px]">{s.t}</h3>
                  <p className="mt-1 max-w-[40ch] text-[13px] normal-case leading-snug opacity-75">
                    {s.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* contact CTA */}
      <section className="relative overflow-hidden border-t border-ink/10 px-5 py-28 text-center md:px-8">
        <DoodleTrail />
        <div className="relative z-10">
          <div className="label mb-6 opacity-70">
            Have a product that needs designing?
          </div>
          <a
            href="mailto:harshitajain828@gmail.com"
            className="font-display inline-block text-[11vw] leading-none transition-opacity hover:opacity-60 md:text-[7vw]"
          >
            Let&apos;s work{" "}
            <em className="serif-italic font-normal">together</em> →
          </a>
        </div>
      </section>

      <FooterStrip />
    </main>
  );
}
