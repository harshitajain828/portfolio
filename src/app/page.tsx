import Link from "next/link";
import WorkStack from "@/components/home/WorkStack";
import DoodleTrail from "@/components/home/DoodleTrail";
import HeroPills from "@/components/home/HeroPills";
import FooterStrip from "@/components/FooterStrip";
import MagnifyText from "@/components/MagnifyText";
import { projects } from "@/lib/projects";

const steps = [
  {
    n: "01",
    t: "Design",
    d: "I start with research and user flows, then design the screens and a proper design system in Figma.",
  },
  {
    n: "02",
    t: "Prototype",
    d: "I use AI tools like Claude Code and Framer to turn those designs into prototypes you can actually click through. This site is one of them.",
  },
  {
    n: "03",
    t: "Hand off",
    d: "My computer science background means I can hand work over the way developers need it — clear specs, with the awkward edge cases already worked out.",
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
            <p className="mask-line max-w-[44ch] text-[17px] leading-snug md:text-[20px]">
              <span style={{ animationDelay: "0.38s" }}>
                <strong>Product designer, AI-native.</strong>{" "}
                <em className="serif-italic text-[1.25em]">
                  I use AI tools to take an idea from first research all the way
                  to a working prototype.
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
        <p className="serif max-w-[26ch] text-[34px] leading-[1.15] md:text-[54px]">
          Three products I took from first research to a
          <em className="serif-italic"> working prototype.</em>
        </p>
        <p className="label mt-6 opacity-60">
          Designed end to end, from the problem to the prototype. Scroll ↓
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
              I&apos;m a product and UI/UX designer based in Udaipur, India,
              with a background in computer science. I&apos;m AI-native —{" "}
              <em className="serif-italic">
                I use AI tools to carry an idea from research through to a
                working prototype.
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
          <MagnifyText
            href="mailto:harshitajain828@gmail.com"
            className="font-display inline-block text-[11vw] leading-none md:text-[7vw]"
            sigma={95}
            scale={0.28}
            lift={12}
            parts={[
              { text: "Let's work " },
              { text: "together", className: "serif-italic font-normal" },
              { text: " →" },
            ]}
          />
        </div>
      </section>

      <FooterStrip />
    </main>
  );
}
