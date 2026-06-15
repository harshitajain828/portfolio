import Link from "next/link";

export default function FooterStrip({ dark = false }: { dark?: boolean }) {
  return (
    <footer
      className={`label flex items-center justify-between gap-4 border-t px-5 py-4 md:px-8 ${
        dark
          ? "border-cream/15 bg-ink text-cream"
          : "border-ink/10 bg-cream text-ink"
      }`}
    >
      <span className="mono">©2026</span>
      <span className="hidden md:block">Udaipur, India</span>
      <a
        href="mailto:harshitajain828@gmail.com"
        className="hover-line lowercase"
      >
        Email
      </a>
      <Link href="/contact" className="hover-line hidden sm:block">
        Contact
      </Link>
      <span className="hidden lg:block">Designed by Harshita Jain</span>
    </footer>
  );
}
