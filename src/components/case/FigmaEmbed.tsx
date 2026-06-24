/**
 * FigmaEmbed — embeds a Figma file or prototype.
 * Renders once the target file is shared as "Anyone with the link can view";
 * otherwise Figma shows an access prompt inside the frame. The accompanying
 * link is always available as a fallback.
 */
export default function FigmaEmbed({
  url,
  title,
  accent = "#0071C2",
}: {
  url: string;
  title: string;
  accent?: string;
}) {
  const src = `https://www.figma.com/embed?embed_host=harshita-portfolio&url=${encodeURIComponent(
    url
  )}`;
  return (
    <div>
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black/20"
        style={{ aspectRatio: "16 / 10" }}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-[14px] font-semibold"
        style={{ backgroundColor: accent, color: "#fff" }}
      >
        Open in Figma <span aria-hidden>↗</span>
      </a>
    </div>
  );
}
