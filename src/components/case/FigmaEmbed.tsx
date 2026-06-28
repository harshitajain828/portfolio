/**
 * FigmaEmbed — embeds a Figma file via the official embed.figma.com URL.
 * `url` is the embed.figma.com link (file must be shared "anyone with the
 * link can view"). The "Open in Figma" link points at the normal file URL.
 *
 * `kind` controls framing: "phone" prototypes render in a centered portrait
 * box (so the device is large on every screen instead of a sliver inside a
 * 16:9 letterbox); "desktop" prototypes use a wide 16:9 frame.
 */
export default function FigmaEmbed({
  url,
  title,
  accent = "#0071C2",
  kind = "desktop",
}: {
  url: string;
  title: string;
  accent?: string;
  kind?: "phone" | "desktop";
}) {
  const open = url.replace("embed.figma.com", "www.figma.com");
  const isPhone = kind === "phone";
  return (
    <div className={isPhone ? "mx-auto w-full max-w-[400px]" : ""}>
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black/20"
        style={{ aspectRatio: isPhone ? "9 / 16" : "16 / 9" }}
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
