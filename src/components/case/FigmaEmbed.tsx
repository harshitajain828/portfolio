/**
 * FigmaEmbed — embeds a Figma file via the official embed.figma.com URL.
 * `url` is the embed.figma.com link (file must be shared "anyone with the
 * link can view"). The "Open in Figma" link points at the normal file URL.
 */
export default function FigmaEmbed({
  url,
  title,
  accent = "#0071C2",
  aspect = "16 / 9",
}: {
  url: string;
  title: string;
  accent?: string;
  aspect?: string;
}) {
  const open = url.replace("embed.figma.com", "www.figma.com");
  return (
    <div>
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black/20"
        style={{ aspectRatio: aspect }}
      >
        <iframe
          src={url}
          title={title}
          loading="lazy"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <a
        href={open}
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
