import FooterStrip from "@/components/FooterStrip";

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
    label: "Build",
    items: [
      "Figma",
      "Framer",
      "Claude Code",
      "Figma ↔ Claude MCP",
      "GSAP",
      "HTML / CSS",
      "React (working knowledge)",
      "Adobe Creative Cloud",
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
      {/* manifesto */}
      <section className="mx-auto max-w-[820px] px-5 pt-40 pb-24 text-center md:px-8">
        <p className="text-[17px] leading-relaxed md:text-[19px]">
          I&apos;m a product and UI/UX designer with a computer science
          background, based in Udaipur, India. I take products from problem
          framing to shipped interface — and because I build what I design,
          nothing gets lost in the handoff.
        </p>
        <p className="mt-8 text-[15px] leading-relaxed opacity-75">
          My workflow is AI-native: Figma for design, Claude Code and modern
          web tooling for the build. This site is itself the proof — designed
          and coded by me.
        </p>
      </section>

      {/* role row */}
      <section className="label grid grid-cols-1 gap-4 border-t border-ink/10 px-5 py-10 sm:grid-cols-3 md:px-8">
        <div>
          <span className="opacity-60">Role:</span> Product Designer
        </div>
        <div className="sm:text-center">
          <span className="opacity-60">Base:</span> Udaipur, IN — Remote-ready
        </div>
        <div className="sm:text-right">
          <span className="opacity-60">Status:</span> Open to product roles
        </div>
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
            How I build:
          </div>
          <p className="font-display max-w-[18ch] text-[9vw] leading-[0.95] md:text-[5vw]">
            Figma → Claude Code → Live product
          </p>
        </div>
      </section>

      <FooterStrip dark />
    </main>
  );
}
