import FooterStrip from "@/components/FooterStrip";

export const metadata = { title: "Contact — Harshita Jain®" };

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-cream">
      <section className="flex flex-1 flex-col items-center justify-center px-5 pt-32 pb-16 text-center md:px-8">
        <div className="label mb-8 flex items-center gap-3 opacity-70">
          <span className="rec-dot" />
          <span>Available for product design roles</span>
        </div>
        <a
          href="mailto:harshitajain828@gmail.com"
          className="font-display text-[10vw] leading-none transition-opacity hover:opacity-60 md:text-[6.5vw]"
        >
          Let&apos;s work
          <br />
          together →
        </a>
        <a
          href="mailto:harshitajain828@gmail.com"
          className="mono mt-10 lowercase opacity-70 hover-line"
        >
          harshitajain828@gmail.com
        </a>
      </section>
      <FooterStrip />
    </main>
  );
}
