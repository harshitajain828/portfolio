import FooterStrip from "@/components/FooterStrip";
import DoodleTrail from "@/components/home/DoodleTrail";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-cream">
      <section className="relative flex flex-1 flex-col items-center justify-center px-5 pt-32 pb-20 text-center md:px-8">
        <DoodleTrail />
        <div className="pointer-events-none relative z-10">
          <div className="label mb-8 flex items-center justify-center gap-3 opacity-70">
            <span className="rec-dot" style={{ color: "#ff4d1c" }} />
            <span>Open to product design roles</span>
          </div>
          <h1 className="font-display text-[13vw] leading-[0.95] md:text-[8.5vw]">
            Let&apos;s build
            <br />
            something{" "}
            <em className="serif-italic font-normal">worth using</em>
          </h1>
          <p className="mx-auto mt-8 max-w-[40ch] text-[15px] normal-case leading-relaxed opacity-75">
            Looking for a product or UI/UX design role. If that&apos;s you,
            I&apos;d love to talk — send me a note and I&apos;ll reply within a
            day.
          </p>
          <a
            href="mailto:harshitajain828@gmail.com"
            style={{ color: "var(--cream)" }}
            className="pointer-events-auto label mt-10 inline-block rounded-full bg-ink px-8 py-4 transition-opacity duration-300 hover:opacity-80"
          >
            harshitajain828@gmail.com →
          </a>
        </div>
      </section>

      {/* details strip */}
      <section className="label grid grid-cols-1 gap-4 border-t border-ink/10 px-5 py-8 sm:grid-cols-3 md:px-8">
        <div>
          <span className="opacity-60">Based in:</span> Udaipur, India (IST)
        </div>
        <div className="sm:text-center">
          <span className="opacity-60">Open to:</span> Remote &amp; hybrid roles
        </div>
        <div className="sm:text-right">
          <span className="opacity-60">Reply time:</span> Within a day
        </div>
      </section>

      <FooterStrip />
    </main>
  );
}
