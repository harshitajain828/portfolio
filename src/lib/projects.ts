export type Decision = { title: string; body: string };

export type Narrative = {
  problem: string;
  decisions: Decision[];
  outcome: string;
  learnings: string[];
  stats: string[];
  insights?: { title: string; body: string }[];
  flow?: { steps: string[]; note?: string };
  compare?: {
    theirLabel: string;
    ourLabel: string;
    theirs: string[];
    ours: string[];
  };
};

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
  outcomeLine: string;
  cover: string;
  images: string[];
  accent: string;
  accentFg: string;
  narrative: Narrative;
};

const img = (slug: string, names: string[]) =>
  names.map((n) => `/projects/${slug}/${n}`);

export const projects: Project[] = [
  {
    slug: "sentinel",
    title: "Sentinel",
    year: "2026",
    role: "Product Designer",
    type: "Self-initiated concept",
    skills: ["Product Design", "Design Systems", "Enterprise UX", "AI / Agent UX"],
    tools: ["Figma", "Claude + Figma MCP"],
    summary:
      "Banks are handing underwriting, collections and KYC to AI agents — but from August 2026 the EU AI Act makes a human overseer legally mandatory for high-risk credit decisions. Sentinel is an oversight console where one operator supervises a fleet of financial agents: catch a drifting agent, approve or reject a high-risk action before it executes, and reconstruct any past decision for an auditor. A self-initiated concept, designed end-to-end on a real design system.",
    statement: "Keep a human in the loop — at the scale agents now run.",
    outcomeLine: "40 screens on one design system · 3 end-to-end flows · designed against EU AI Act Art. 14",
    cover: "/projects/sentinel/cover.png",
    images: img("sentinel", ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png"]),
    accent: "#4338ca",
    accentFg: "#f5f3ff",
    narrative: {
      problem:
        "High-stakes finance is rapidly delegating decisions — who gets a loan, whose account is frozen for an AML hit, which borrower gets a collections message — to AI agents that act faster than any human can watch. The catch: these are exactly the decisions regulators refuse to leave unattended. From 2 August 2026 the EU AI Act treats credit scoring as high-risk and requires (Art. 14) a human who can understand the system, override it, and halt it. The cost of getting it wrong is already concrete: in July 2025 the Massachusetts AG settled with Earnest Operations for $2.5M over an AI lending model that produced disparate impact through a proxy variable. So the real design problem isn't building the agents — it's building the cockpit that lets one person meaningfully supervise many of them, intervene in seconds, and prove afterwards that a human was genuinely in control.",
      decisions: [
        {
          title: "Insert the human at the riskiest moments — not all of them",
          body: "Oversight only scales if you don't ask the operator to review everything. Sentinel gates on risk: an agent pauses and parks an action only when it crosses a human-gate threshold (loan above a cap, any adverse action, an AML escalation), and the review queue is risk-ranked so the most dangerous item is always on top. Tradeoff: a badly tuned threshold either floods the human (back to rubber-stamping) or lets a risky action slip through — so the thresholds themselves became a first-class, auditable setting, not a hidden constant.",
        },
        {
          title: "Per-agent pause and throttle, not one global stop button",
          body: "When an agent drifts, halting the entire fleet is its own incident. Sentinel lets the operator throttle or pause the single misbehaving agent while the rest keep running — containing the blast radius without paging engineering. Tradeoff: partial-halt states are confusing, so the fleet view had to make 'what's running vs. what's contained' unmistakable at a glance.",
        },
        {
          title: "Show confidence — and its limits — at the point of decision",
          body: "The AI Act explicitly warns against automation bias: humans nodding through whatever the machine suggests. So every decision surfaces the model's confidence, the policy checks it passed or failed, and a step-by-step reasoning trace — including a fairness check — before the operator commits. Tradeoff: more to read per decision, but a decision a human can't interrogate isn't oversight, it's theater.",
        },
        {
          title: "Make the audit trail a feature, not an export",
          body: "Defensibility is the compliance officer's whole job. Instead of reconstructing events from logs after a regulator asks, Sentinel records a tamper-evident timeline as work happens — every system, agent and human action in order, reconstructable exactly as it stood at decision time, and mapped to the specific regulations it satisfies. Tradeoff: more state and integrity machinery up front, in exchange for an answer that already exists when someone asks 'why did the agent do this?'",
        },
        {
          title: "Build on a real design system, not one-off screens",
          body: "An oversight tool lives or dies on consistency — the same status, read the same way, everywhere. I built primitives and semantic tokens, then domain components (agent card, decision inspector, audit timeline), and assembled every screen from them. Tradeoff: slower to first pixel, but the screens are trivially consistent and the system itself is evidence of how I think.",
        },
      ],
      outcome:
        "Sentinel is a concept, and I've framed it as one — no fabricated users, deployments, or shipped metrics. What it demonstrates is the harder thing a high-stakes product is judged on: a complete, coherent system — 40 screens spanning fleet monitoring and analytics, the human-in-the-loop review gate, reasoning-replay and fairness investigation, a tamper-evident audit trail, policy governance with versioned diffs, agent configuration and deployment, the full shell (sign-in, settings, command palette, empty/loading/error states) and a responsive mobile set — all assembled from one design system, each surface designed against a named regulatory requirement. The honest success criterion is an expert review: would a risk officer accept that this plausibly supports pre-authorization, intervention, and a contestable, auditable rationale? That's the bar I designed to.",
      learnings: [
        "Designing for two opposed users sharpened everything: the operations lead wants speed and fewer interruptions; the compliance officer wants friction and a paper trail. The product is the negotiation between them.",
        "Regulation is a design brief, not a constraint to route around — reading the AI Act, ECOA and SR 11-7 closely turned vague 'trust' into concrete, testable requirements.",
        "Designing 40 screens forced real systems discipline: tokens and components first, so a status reads the same way on the fleet grid, the audit log and a mobile card — consistency is the product.",
        "An AI-native workflow let me move fast — generating and assembling screens from the system with Figma MCP — but the load-bearing work was judgment: what to surface vs. hide on a dense fleet view, and how much friction a kill-switch should have.",
      ],
      stats: ["Art. 14 by design", "40 screens · one system", "Every action auditable"],
      insights: [
        {
          title: "Accuracy isn't trust",
          body: "A model can be 99% accurate and still need a human who can say no — the 1% in high-stakes finance is someone's loan, account, or livelihood.",
        },
        {
          title: "Rubber-stamping fails the test",
          body: "Article 14 isn't satisfied by a human clicking approve. Oversight only counts if the person can actually see why — and is given a real reason to look.",
        },
        {
          title: "The loop is now mandatory",
          body: "From August 2026, human oversight and auditability for high-risk credit AI are legal requirements, not product nice-to-haves. The market needs this cockpit whether it wants it or not.",
        },
      ],
      flow: {
        steps: [
          "Agent pauses a high-risk action",
          "Operator sees the full context",
          "Approve, reject, or send back",
          "Decision lands in the audit log",
        ],
        note: "The Article 14 moment — a human decides before anything executes.",
      },
      compare: {
        theirLabel: "Autonomous agents",
        ourLabel: "Sentinel",
        theirs: [
          "Agents act; humans find out later",
          "'99% accurate' — but nobody's accountable",
          "Reasoning buried in logs",
          "Audit means an export after the fact",
        ],
        ours: [
          "High-risk actions pause for a human",
          "Confidence and limits shown at decision time",
          "The agent's reasoning trace, step by step",
          "A tamper-evident record, built as you go",
        ],
      },
    },
  },
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
    outcomeLine: "3 recommendations in <90 sec · 2 matching modes · user-tested",
    cover: "/projects/streamnow/cover.png",
    images: img("streamnow", ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png"]),
    accent: "#ff4d1c",
    accentFg: "#fcfaf5",
    narrative: {
      problem:
        "People spend around 45 hours a year just deciding what to watch. Streaming catalogs are huge, browsing UIs are optimized for inventory rather than decisions, and the result is decision paralysis — you scroll, you sample trailers, you give up, and your downtime shrinks. The design question: how do you get someone from “opening the app” to “watching something they'll enjoy” in under two minutes?",
      decisions: [
        {
          title: "Quick Match over endless browse",
          body: "The core flow asks for minimal input and returns exactly three recommendations in under 90 seconds. Three, not thirty — the constraint is the feature. Every additional option re-introduces the paralysis the product exists to remove.",
        },
        {
          title: "Taste Match for users who want depth",
          body: "A second, longer path covers directors, actors and previously watched titles, so recommendations compound over time. Casual users never see it; invested users self-select into it.",
        },
        {
          title: "Mood and duration as first-class filters",
          body: "What you watch depends on the evening you're having, not on the catalog taxonomy. Mood and available-time filters sit directly in the matching flow instead of buried in settings.",
        },
        {
          title: "Watch Party for shared decisions",
          body: "Half of “what should we watch” is a group negotiation. Watch Party lets multiple people feed the same match, so the recommendation settles the debate.",
        },
      ],
      outcome:
        "The final design takes a user from open to a confident pick in under 90 seconds. The flow was prototyped at low and high fidelity and refined through user testing across the matching, filtering and watch-party flows.",
      learnings: [
        "Iterating from user feedback beat my initial assumptions more than once — the testing rounds reshaped the matching flow.",
        "Thinking like a business: which features earn their place against monetization and build cost, not just user delight.",
      ],
      stats: ["<90 sec to a pick", "45 hrs/yr wasted choosing", "2 matching modes"],
      insights: [
        {
          title: "Decision fatigue is the real product problem",
          body: "People scroll, sample trailers, second-guess, and give up — the catalog isn't the bottleneck, the deciding is.",
        },
        {
          title: "Choosing is social",
          body: "A large share of 'what should we watch' happens in groups — the decision is a negotiation, not a query.",
        },
        {
          title: "Context beats catalog",
          body: "Mood and available time predict what gets watched better than genre taxonomy does.",
        },
      ],
      flow: {
        steps: [
          "Pick your subscriptions",
          "Watch 3 clips",
          "Like / dislike",
          "Get 3 picks",
        ],
        note: "Quick Match — under 90 seconds end to end.",
      },
      compare: {
        theirLabel: "Endless browse",
        ourLabel: "StreamNow",
        theirs: [
          "Rows of thumbnails with no opinion",
          "Trailers as commitment tests",
          "Catalog-first navigation",
          "Group nights become remote wars",
        ],
        ours: [
          "Exactly three recommendations",
          "A 90-second match flow",
          "Mood + duration come first",
          "Watch Party settles the debate",
        ],
      },
    },
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
    outcomeLine: "Built for irregular cycles · tested with 3 users + 1 expert",
    cover: "/projects/cyclesync/cover.png",
    images: img("cyclesync", ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png"]),
    accent: "#f48ab4",
    accentFg: "#0e0e0e",
    narrative: {
      problem:
        "PCOS affects roughly 6–12% of reproductive-aged women, and the experience is isolating: menstrual health is taboo, patients often don't know who to talk to after diagnosis, and mainstream tracking apps make it worse — their monthly-calendar model assumes regular cycles, so irregularity reads as an error state. Patients told me it made them feel “abnormal.” Mental and emotional wellbeing, the hardest part of PCOS, is absent from these products entirely.",
      decisions: [
        {
          title: "A yearly circular tracker, not a monthly calendar",
          body: "The signature decision: replace the month grid with a yearly circular view designed for irregularity. When the model doesn't assume a 28-day loop, an irregular cycle stops looking like a mistake.",
        },
        {
          title: "Community as a core surface, not a tab",
          body: "Isolation was the loudest research finding. CycleSync builds in experience-sharing and peer encouragement, and lets users invite trusted friends and family into their support loop.",
        },
        {
          title: "AI-personalised resources, filtered by symptoms",
          body: "Instead of a generic content feed, suggested reading is filtered by each user's symptoms and preferences — lowering the barrier to finding information that actually applies to them.",
        },
        {
          title: "Personalise everything",
          body: "No two PCOS patients present the same. Symptoms, quick links, community recommendations and monthly insights are all user-configurable rather than fixed.",
        },
      ],
      outcome:
        "Tested with 3 users and 1 domain expert: positive reactions to using the product for mental wellbeing alongside menstrual tracking, with feedback that the design streamlined tracking and encouraged a more proactive approach to self-care.",
      learnings: [
        "Research beats hypothesis: I expected CBT-style interventions to matter most; users prioritized tracking and community.",
        "Empathy sometimes means restraint — in sensitive health contexts, some problem-solving approaches shouldn't ship.",
        "Next time: empathy mapping earlier, and lo-fi prototype testing before committing to features.",
      ],
      stats: ["6–12% of women affected", "3 users + 1 expert", "Yearly circular model"],
      insights: [
        {
          title: "“I don't know who to talk to”",
          body: "Isolation after a PCOS diagnosis came up again and again — support mattered more than any single feature.",
        },
        {
          title: "Taboo creates information gaps",
          body: "Because menstrual health stays unspoken, patients struggle to find information that applies to them.",
        },
        {
          title: "Irregularity reads as an error state",
          body: "Standard 28-day calendar UIs make irregular cycles feel 'abnormal' — the UI itself was hurting users.",
        },
      ],
      flow: {
        steps: ["Daily check-in", "Log symptoms", "See insights", "Lean on community"],
        note: "Tracking, understanding and support in one loop.",
      },
      compare: {
        theirLabel: "Typical tracker",
        ourLabel: "CycleSync",
        theirs: [
          "Assumes a regular 28-day loop",
          "Mental health lives in a separate app",
          "Generic one-size content feed",
          "Fixed layout, fixed assumptions",
        ],
        ours: [
          "Yearly circular model, built for irregularity",
          "Mood and wellbeing tracked alongside cycles",
          "AI-filtered resources by symptom",
          "Everything personalisable",
        ],
      },
    },
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
    outcomeLine: "Problem → presented solution in a 7-hour solo sprint",
    cover: "/projects/finance-ai/cover.png",
    images: [],
    accent: "#437ee6",
    accentFg: "#fcfaf5",
    narrative: {
      problem:
        "Digital money removed every point of friction from spending — and with it, every natural moment of reflection. Saving became invisible: there's no equivalent of watching cash leave your wallet. The brief: design a web platform that fosters mindful spending and savings habits, and counters the negative behavioral effects of digital money.",
      decisions: [
        {
          title: "AI as a coach, not a dashboard",
          body: "Most finance tools answer “what happened to my money?” with charts. Finance AI is built around habit guidance — the AI surfaces nudges and savings moves at decision moments, rather than reporting after the fact.",
        },
        {
          title: "Make saving visible where spending happens",
          body: "The design puts savings progress and trade-offs into the spending flow itself, restoring the moment of reflection that cash used to provide.",
        },
        {
          title: "The 7-hour constraint as a method",
          body: "Problem framing, flows, UI and a presentable solution in a single solo sprint. The timebox forced ruthless scoping: one core loop, designed well, instead of five designed halfway.",
        },
      ],
      outcome:
        "A complete, presented product concept produced in seven hours of focused solo work — the project doubles as a proof of design velocity: how far a focused process gets from a standing start in one day.",
      learnings: [
        "Constraints sharpen scope — the timebox made prioritization decisions for me that would otherwise have taken days.",
        "Presenting under time pressure is its own skill: the story of the design matters as much as the screens.",
      ],
      stats: ["7-hour sprint", "Solo, end-to-end", "AI-guided habits"],
      insights: [
        {
          title: "Digital money removed the pause",
          body: "Cash forced a moment of reflection at every payment; tap-to-pay deleted it — and saving lost its trigger.",
        },
        {
          title: "Charts answer the wrong question",
          body: "Dashboards explain what happened. Habit change needs 'what should I do right now'.",
        },
        {
          title: "Nudges work at the decision moment",
          body: "A savings prompt inside the spending flow beats a guilt-trip report at the end of the month.",
        },
      ],
      compare: {
        theirLabel: "Finance dashboards",
        ourLabel: "Finance AI",
        theirs: [
          "Reports after the money is gone",
          "Charts you have to interpret",
          "Guilt as the motivator",
        ],
        ours: [
          "Coaching at the decision moment",
          "One clear next move",
          "Habits framed as wins",
        ],
      },
    },
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
    outcomeLine: "Storefront + ops workflows · design system mapped to React",
    cover: "/projects/mushroom-juniors/cover.png",
    images: img("mushroom-juniors", ["01.png", "02.png", "03.png", "04.png"]),
    accent: "#c8e84f",
    accentFg: "#0e0e0e",
    narrative: {
      problem:
        "A juniors' clothing brand needs an e-commerce experience that actually reflects its fresh identity — vibrant without being noisy — while solving the unglamorous half of commerce: product browsing that converts, checkout that doesn't leak, operational workflows for the people running the store, and reliability across every device a parent might shop on.",
      decisions: [
        {
          title: "A modular design language mapped to React components",
          body: "Every pattern in the visual system was designed as a buildable component, not a static picture — so the design system and the eventual codebase share the same vocabulary.",
        },
        {
          title: "Low-friction discovery and checkout",
          body: "Category browsing, product pages and checkout were designed as one continuous flow, trimming the steps and decisions between “that's cute” and “order placed.”",
        },
        {
          title: "Design for the operations side too",
          body: "Category management and workflow-automation interfaces for the team running the store — because a storefront is only half the product.",
        },
        {
          title: "One cohesive visual system",
          body: "Typography, palette and iconography defined as a single system, so the brand reads consistently from homepage to order-confirmation email.",
        },
      ],
      outcome:
        "A complete e-commerce concept covering storefront and operations: responsive-first layouts, a performance- and SEO-minded structure, and a design system ready to be built — demonstrating end-to-end ownership from research and visual design to interaction and workflow detail.",
      learnings: [
        "End-to-end e-commerce means designing for three users at once: the shopper, the store operator, and the developer building it.",
        "Designing against real build constraints (React components, responsive behavior) makes the design stronger, not smaller.",
      ],
      stats: ["Storefront + ops", "Design system → React", "Responsive-first"],
      insights: [
        {
          title: "The shopper wants speed",
          body: "Parents shop in stolen minutes — discovery and checkout had to lose every unnecessary decision.",
        },
        {
          title: "The operator runs the store",
          body: "Category management and workflow tools are the invisible half of e-commerce — designed, not bolted on.",
        },
        {
          title: "The developer has to build it",
          body: "Every pattern was designed as a React-mappable component, so the system survives contact with the codebase.",
        },
      ],
      flow: {
        steps: ["Land", "Browse by category", "Product page", "Checkout"],
        note: "The fewest decisions between 'that's cute' and 'ordered'.",
      },
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
