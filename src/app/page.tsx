import Link from "next/link";
import WorkList from "@/components/home/WorkList";
import FooterStrip from "@/components/FooterStrip";
import { projects } from "@/lib/projects";

const steps = [
  {
    n: "01",
    t: "Design",
    d: "Research, flows and UI in Figma — end-to-end, from problem framing to a full design system.",
  },
  {
    n: "02",
    t: "Prototype",
    d: "AI-native: Claude Code, Framer MCP, the whole new toolchain — designs become real, clickable prototypes in days, not sprints. This site is one.",
  },
  {
    n: "03",
    t: "Hand off",
    d: "A CS background means I speak engineer. Specs, components and edge cases land build-ready — nothing lost in translation.",
  },
];

export default function Home() {
  return (
    <main>
      {/* identity hero — who, what, available. 3 seconds, no hostage-taking */}
      <section className="flex min-h-[92vh] flex-col justify-end px-5 pb-10 pt-32 md:px-8">
        <h1 className="font-display text-[14.5vw] leading-[0.92] md:text-[10.5vw]">
          <span className="mask-line">
            <span style={{ animationDelay: "0.1s" }}>Harshita</span>
          </span>
          <span className="mask-line">
            <span
              className="items-center gap-[2vw]"
              style={{ animationDelay: "0.22s", display: "flex" }}
            >
              Jain<sup className="align-super text-[2.5vw]">®</sup>
              {/* project accent pills */}
              <span className="ml-[2vw] hidden items-center gap-3 md:flex">
                {projects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/work/${p.slug}`}
                    aria-label={p.title}
                    className="block h-[5.5vw] w-[2.6vw] rounded-full transition-transform duration-300 hover:scale-110"
                    style={{ backgroundColor: p.accent }}
                  />
                ))}
              </span>
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="mask-line max-w-[42ch] text-[17px] leading-snug md:text-[20px]">
            <span style={{ animationDelay: "0.38s" }}>
              <strong>Product designer, AI-native</strong> —{" "}
              <em className="serif-italic text-[1.25em]">
                fluent in the tools most designers haven&apos;t opened yet.
              </em>
            </span>
          </p>
          <div className="label flex items-center gap-3">
            <span className="rec-dot" style={{ color: "#ff4d1c" }} />
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
          <p className="serif max-w-[40ch] text-[24px] leading-snug md:text-[32px]">
            I&apos;m a product &amp; UI/UX designer from Udaipur, India, with a
            computer science background. I work AI-native —{" "}
            <em className="serif-italic">
              so my designs don&apos;t sit in Figma waiting to become real.
            </em>
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
          Have a product that needs designing?
        </div>
        <a
          href="mailto:harshitajain828@gmail.com"
          className="font-display inline-block text-[11vw] leading-none transition-opacity hover:opacity-60 md:text-[7vw]"
        >
          Let&apos;s work{" "}
          <em className="serif-italic font-normal">together</em> →
        </a>
      </section>

      <FooterStrip />
    </main>
  );
}
