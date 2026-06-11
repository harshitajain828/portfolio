export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  type: string;
  skills: string[];
  tools: string[];
  summary: string;
  statement: string;
  cover: string;
  images: string[];
  accent: string;
};

const img = (slug: string, names: string[]) =>
  names.map((n) => `/projects/${slug}/${n}`);

export const projects: Project[] = [
  {
    slug: "streamnow",
    title: "StreamNow",
    year: "2025",
    role: "Product Designer",
    type: "Self-initiated concept",
    skills: ["UX Research", "UI Design", "Prototyping", "User Testing"],
    tools: ["Figma"],
    summary:
      "People spend around 45 hours a year deciding what to watch. StreamNow tackles that decision fatigue head-on: Quick Match serves three tailored recommendations in under 90 seconds, Taste Match learns from directors, actors and watch history, and mood + duration filters meet you where you are.",
    statement: "Your next watch in under 90 seconds.",
    cover: "/projects/streamnow/cover.png",
    images: img("streamnow", ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png"]),
    accent: "#ff4d1c",
  },
  {
    slug: "cyclesync",
    title: "CycleSync",
    year: "2025",
    role: "Product Designer",
    type: "Self-initiated concept",
    skills: ["UX Research", "UI Design", "Health UX"],
    tools: ["Figma"],
    summary:
      "PCOS affects 6–12% of reproductive-aged women, yet most tracking apps assume regular cycles and ignore mental health entirely. CycleSync pairs a yearly circular tracker designed for irregular cycles with community support and AI-personalised resources. Validated with 3 users and 1 domain expert.",
    statement: "Cycle tracking built for irregularity.",
    cover: "/projects/cyclesync/cover.png",
    images: img("cyclesync", ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png"]),
    accent: "#f48ab4",
  },
  {
    slug: "finance-ai",
    title: "Finance AI",
    year: "2026",
    role: "Product Designer",
    type: "Self-initiated concept · 7-hour sprint",
    skills: ["Product Design", "AI UX"],
    tools: ["Figma"],
    summary:
      "Digital money made spending frictionless — and saving an afterthought. Finance AI is a web platform concept that counters that drift with AI-guided saving habits, nudging users toward a healthier financial perspective. Designed solo in a 7-hour sprint from problem framing to presented solution.",
    statement: "Mindful money habits, AI-guided.",
    cover: "/projects/finance-ai/cover.png",
    images: [],
    accent: "#437ee6",
  },
  {
    slug: "mushroom-juniors",
    title: "Mushroom Juniors",
    year: "2025",
    role: "UI/UX Designer",
    type: "Self-initiated concept",
    skills: ["E-commerce UX", "Visual Design", "Interaction Design"],
    tools: ["Figma", "React"],
    summary:
      "An end-to-end e-commerce redesign concept for a juniors' clothing brand: a clean, modular design language, low-friction product discovery and checkout, and category-management workflows for the operations side. Designed responsive-first with a cohesive visual system, built with React components in mind.",
    statement: "Fresh e-commerce for a fresh brand.",
    cover: "/projects/mushroom-juniors/cover.png",
    images: img("mushroom-juniors", ["01.png", "02.png", "03.png", "04.png"]),
    accent: "#c8e84f",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
