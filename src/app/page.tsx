import Link from "next/link";
import WorkList from "@/components/home/WorkList";
import FooterStrip from "@/components/FooterStrip";

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
      {/* identity hero — who, what, available. 3 seconds, no hostage-taking */}
      <section className="flex min-h-[92vh] flex-col justify-end px-5 pb-10 pt-32 md:px-8">
        <h1 className="font-display text-[16.5vw] leading-[0.86] md:text-[13vw]">
          <span className="mask-line">
            <span style={{ animationDelay: "0.1s" }}>Harshita</span>
          </span>
          <span className="mask-line">
            <span style={{ animationDelay: "0.22s" }}>
              Jain<sup className="align-super text-[2.5vw]">®</sup>
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="mask-line max-w-[34ch] text-[17px] leading-snug md:text-[19px]">
            <span style={{ animationDelay: "0.38s" }}>
              <strong>Product designer who ships</strong> — designs in Figma,
              builds in code.
            </span>
          </p>
          <div className="label flex items-center gap-3">
            <span className="rec-dot" />
            <span>Open to product roles · Remote-ready</span>
          </div>
        </div>
      </section>

      <WorkList />

      {/* about teaser — the human element */}
      <section className="grid gap-10 px-5 py-24 md:grid-cols-[1fr_1.4fr] md:px-8">
        <div className="label flex items-start gap-3 opacity-70">
          <span className="bracket" />
          <span>About</span>
        </div>
        <div>
          <p className="max-w-[44ch] text-[20px] normal-case leading-relaxed md:text-[24px]">
            I&apos;m a product &amp; UI/UX designer from Udaipur, India, with a
            computer science background. Most designers stop at the handoff —
            I keep going until it&apos;s live.
          </p>
          <Link href="/about" className="hover-line label mt-8 inline-block">
            More about me →
          </Link>
        </div>
      </section>

      {/* how I build */}
      <section className="border-t border-ink/10 px-5 py-24 md:px-8">
        <div className="label mb-12 flex items-center gap-3">
          <span className="bracket" />
          <span>How I build</span>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n}>
              <div className="mono mb-4 opacity-60">{s.n}</div>
              <h3 className="font-display mb-3 text-[40px]">{s.t}</h3>
              <p className="max-w-[34ch] text-[14px] normal-case leading-snug opacity-80">
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* contact CTA */}
      <section className="border-t border-ink/10 px-5 py-28 text-center md:px-8">
        <div className="label mb-6 opacity-70">
          Have a product that needs designing — and shipping?
        </div>
        <a
          href="mailto:harshitajain828@gmail.com"
          className="font-display inline-block text-[11vw] leading-none transition-opacity hover:opacity-60 md:text-[7vw]"
        >
          Let&apos;s work together →
        </a>
      </section>

      <FooterStrip />
    </main>
  );
}
