import HomeHero from "@/components/home/HomeHero";
import FooterStrip from "@/components/FooterStrip";

export const metadata = { title: "Playground — Harshita Jain" };

export default function PlaygroundPage() {
  return (
    <main className="bg-cream">
      <div className="px-5 pt-32 pb-6 md:px-8">
        <h1 className="font-display text-[16vw] leading-none md:text-[10vw]">
          Playground
        </h1>
        <p className="label mt-4 max-w-[52ch] opacity-70">
          Interaction experiments, designed and coded by me. Exhibit 01: a
          scroll-driven deck of cards — Lenis smooth scroll + GSAP, mapped to
          per-frame transforms.
        </p>
      </div>

      {/* exhibit 01 — the deck */}
      <HomeHero />

      <FooterStrip />
    </main>
  );
}
