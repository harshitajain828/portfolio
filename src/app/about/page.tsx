import Link from "next/link";
import FooterStrip from "@/components/FooterStrip";
import { projects } from "@/lib/projects";

export const metadata = { title: "About" };

/* ── tool logos (simplified brand marks, used as a toolkit grid) ── */
type Tool = { name: string; note: string; mark: React.ReactNode };

const tools: Tool[] = [
  {
    name: "Figma",
    note: "Design & systems",
    mark: (
      <svg viewBox="0 0 38 57" className="h-7 w-auto" aria-hidden>
        <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
        <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
        <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
        <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
        <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
      </svg>
    ),
  },
  {
    name: "Framer",
    note: "Build & ship",
    mark: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <path fill="#0055FF" d="M5 3h14v7h-7zM5 10h7l7 7h-7v7l-7-7z" />
      </svg>
    ),
  },
  {
    name: "Claude Code",
    note: "AI pair-builder",
    mark: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <g stroke="#D97757" strokeWidth="2.3" strokeLinecap="round">
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
          <line x1="18.4" y1="5.6" x2="5.6" y2="18.4" />
        </g>
      </svg>
    ),
  },
  {
    name: "GSAP",
    note: "Motion",
    mark: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#0AE448" />
        <path
          d="M7 9.5h6.5M16 7.5c-1-1-3.2-1.4-5 0-2 1.6-2 5.4 0 7 1.6 1.3 3.6 1 4.6 0 .6-.6.9-1.6.9-2.6h-3.2"
          fill="none"
          stroke="#0e0e0e"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Adobe CC",
    note: "Craft & assets",
    mark: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#FA0F00" />
        <path
          d="M12 6.5 16.5 17h-2.6l-.95-2.4h-3.1L12 11.7l.0 0"
          fill="#fff"
        />
        <path d="M12 6.5 7.5 17h2.55l2-5.1 1 2.6h-1.6l-.8 2.5H7.5z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Midjourney",
    note: "Imagery",
    mark: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#0e0e0e" />
        <path
          d="M5 16c2-5 5.5-8 9.5-9-1.5 2-2 4-2 6 2.2-.3 3.6-.3 4.5.2-3 .8-5.3 1.8-7 2.8-1.6 1-3 .8-5 0z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    name: "Gemini",
    note: "Research & ideas",
    mark: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <path
          d="M12 2c.7 5.3 3.9 8.5 9.2 9.2C15.9 11.9 12.7 15.1 12 20.4 11.3 15.1 8.1 11.9 2.8 11.2 8.1 10.5 11.3 7.3 12 2z"
          fill="#3F7DF6"
        />
      </svg>
    ),
  },
];

const capabilities = [
  "Product design",
  "UI / UX design",
  "User research",
  "Design systems",
  "Interaction design",
  "Prototyping",
];

const credentials: { label: string; items: string[] }[] = [
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
        <h1 className="serif max-w-[24ch] text-[34px] leading-[1.12] md:text-[56px]">
          I&apos;m Harshita — a product &amp; UI/UX designer who likes working
          out <em className="serif-italic">how a thing should actually work,</em>{" "}
          then building it.
        </h1>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <p className="max-w-[52ch] text-[15px] normal-case leading-relaxed opacity-85">
            I&apos;m based in Udaipur, India, and I have a computer science
            background (MCA). I like taking a product all the way through —
            research, user flows, the design system, and the final interface.
            My case studies are self-initiated on purpose: each one is a whole
            product I thought through end to end, rather than a slice of
            someone else&apos;s brief.
          </p>
          <p className="max-w-[52ch] text-[15px] normal-case leading-relaxed opacity-85">
            I&apos;m AI-native. I use tools like Claude Code and Framer to turn
            my designs into prototypes you can actually use, instead of static
            screens. This site is one example — I designed every part of it,
            then built it with that same set of tools.
          </p>
        </div>
      </section>

      {/* role strip */}
      <section className="label grid grid-cols-1 gap-4 border-t border-ink/10 px-5 py-8 sm:grid-cols-3 md:px-8">
        <div className="flex items-center gap-3">
          <span className="rec-dot" style={{ color: "#ff4d1c" }} />
          <span>Open to product roles</span>
        </div>
        <div className="sm:text-center">Udaipur, India</div>
        <a
          href="mailto:harshitajain828@gmail.com"
          className="hover-line sm:text-right"
        >
          Email
        </a>
      </section>

      {/* toolkit — logo grid */}
      <section className="px-5 py-20 md:px-8">
        <div className="label mb-10 flex items-center gap-3 opacity-70">
          <span className="bracket" />
          <span>Tools I design and build with</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {tools.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-4 rounded-sm border border-ink/12 bg-cream p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center">
                {t.mark}
              </span>
              <span>
                <span className="block text-[15px] leading-tight">
                  {t.name}
                </span>
                <span className="label mt-1 block opacity-55">{t.note}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* black ledger — capabilities + credentials + how I work */}
      <section className="bg-ink px-5 py-24 text-cream md:px-8">
        <div className="grid gap-14 md:grid-cols-3">
          <div>
            <div className="label mb-6 border-b border-cream/20 pb-2 text-cream/80">
              What I do:
            </div>
            <ul className="flex flex-col gap-2 text-[13px] text-cream/60">
              {capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {credentials.map((l) => (
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
            Figma → AI tools →{" "}
            <em className="serif-italic font-normal">working prototype</em>
          </p>
        </div>
      </section>

      {/* bridge to work */}
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
