import FooterStrip from "@/components/FooterStrip";
import DoodleTrail from "@/components/home/DoodleTrail";

export const metadata = { title: "Contact — Harshita Jain®" };

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-cream">
      <section className="relative flex flex-1 flex-col items-center justify-center px-5 pt-32 pb-20 text-center md:px-8">
        <DoodleTrail />
        <div className="pointer-events-none relative z-10">
          <div className="label mb-8 flex items-center justify-center gap-3 opacity-70">
            <span className="rec-dot" style={{ color: "#ff4d1c" }} />
            <span>Available for product design roles</span>
          </div>
          <h1 className="font-display text-[13vw] leading-[0.95] md:text-[8.5vw]">
            Let&apos;s make
            <br />
            something{" "}
            <em className="serif-italic font-normal">good</em>
          </h1>
          <a
            href="mailto:harshitajain828@gmail.com"
            className="pointer-events-auto label mt-12 inline-block rounded-full border border-ink px-8 py-4 transition-colors duration-300 hover:bg-ink hover:text-cream"
          >
            harshitajain828@gmail.com →
          </a>
        </div>
      </section>

      {/* details strip */}
      <section className="label grid grid-cols-1 gap-4 border-t border-ink/10 px-5 py-8 sm:grid-cols-3 md:px-8">
        <div>
          <span className="opacity-60">Base:</span> Udaipur, IN (IST)
        </div>
        <div className="sm:text-center">
          <span className="opacity-60">Looking for:</span> Product / UI/UX
          design roles
        </div>
        <div className="sm:text-right">
          <span className="opacity-60">Replies:</span> Within 24 hours
        </div>
      </section>

      <FooterStrip />
    </main>
  );
}
