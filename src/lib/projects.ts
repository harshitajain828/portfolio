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
  imageCaptions?: string[];
  accent: string;
  accentFg: string;
  narrative: Narrative;
};

const img = (slug: string, names: string[]) =>
  names.map((n) => `/projects/${slug}/${n}`);

export const projects: Project[] = [
  {
    slug: "cyclesync",
    title: "CycleSync",
    year: "2026",
    role: "Product Designer",
    type: "Self-initiated concept",
    skills: ["UX Research", "Product Design", "Design Systems", "Health UX"],
    tools: ["Figma", "Claude + Figma MCP"],
    summary:
      "PCOS affects 8–13% of women — roughly 1 in 5 young women in India — and produces the least predictable cycles there are. Yet every mainstream tracker is built on a 28-day assumption, ignores the 3–8× higher rate of anxiety and depression, and has burned user trust. CycleSync is a cycle + wellbeing companion built for irregular bodies first: a Year Ring that shows irregularity as an honest shape, predictions that admit uncertainty, wellbeing woven in, and a trust-first, local-first data posture.",
    statement: "Built for cycles that don’t fit a calendar.",
    outcomeLine: "A 24-screen mobile system on one design system · designed for irregular bodies first",
    cover: "/projects/cyclesync/cover.png",
    images: img("cyclesync", ["01.png", "02.png", "03.png", "04.png"]),
    imageCaptions: [
      "The Year Ring — a 12-month radial view, so an irregular cycle reads as an honest shape, not a broken month.",
      "Honest prediction — a low-confidence window instead of a fake countdown, plus a doctor-ready summary.",
      "Onboarding where “I'm not sure” and “very irregular” are valid, first-class answers.",
      "Anonymous community circles, woven-in wellbeing, and trust-first, local-first data controls.",
    ],
    accent: "#f48ab4",
    accentFg: "#2A0E1C",
    narrative: {
      problem:
        "The most common menstrual condition produces the most unpredictable cycles — yet the tools are built for predictability. PCOS affects 8–13% of women globally (about 1 in 5 young women in India), up to ~70% go undiagnosed, and the average path to a diagnosis is years and several doctors. Mainstream apps assume a 28-day, ovulation-on-day-14 cycle, so a 45- or 72-day cycle reads as an error and a countdown keeps promising a date that never arrives — actively stressful for a group already 3–8× more likely to live with anxiety and depression. On top of that, trust is broken: a leading tracker settled with the FTC and later a $56M class action over sharing intimate cycle data. The people who most need a tool are served worst.",
      decisions: [
        {
          title: "Invert the calendar into a Year Ring",
          body: "The signature move: a 12-month radial view instead of a monthly grid. Period days, cycle lengths and symptom dots plot around a circle, so a long or skipped cycle reads as an honest shape — your real pattern — not a broken month. Tradeoff: it’s unfamiliar at first glance and has a learning curve, so a month-detail drill-in keeps the familiar grid one tap away.",
        },
        {
          title: "Ship honesty over certainty",
          body: "Instead of “Period in 3 days,” CycleSync shows a probability window with confidence (“likely Jun 18–26, low confidence — your cycles vary 31–68 days”) and names anovulatory cycles plainly. Tradeoff: it feels less magical in a demo — but calendar-only prediction is roughly ~18% accurate for irregular cycles, so presenting certainty would be a design lie. For an anxious population, not lying is the trust unlock.",
        },
        {
          title: "Weave wellbeing into the cycle, not a separate tab",
          body: "Mood, energy and body-image check-ins live in the same log as physical symptoms, and insights connect them (“acne flares cluster after low-sleep weeks”). A light, CBT-informed support layer appears contextually. Tradeoff: sensitivity risk — mitigated by an explicit “explains and supports, never diagnoses” line, cited content, and routing to real help when mood lingers.",
        },
        {
          title: "Make trust a visible feature — and drop the pink",
          body: "A local-first, no-sell pledge is surfaced in the first 30 seconds, with easy export and delete. The palette is deliberately warm terracotta, sage and plum — not clinical pink. Tradeoff: pink is the expected genre signal, but research shows it reads as stereotype and shame to this user; “attention” is a gentle amber, never a shaming red.",
        },
        {
          title: "Scope to a companion, not contraception or diagnosis",
          body: "CycleSync is explicitly a literacy, tracking and wellbeing companion — not a contraceptive or diagnostic device. Tradeoff: a smaller feature footprint than fertility-first apps, but it removes regulatory overreach and keeps the product honest about what it can and can’t claim.",
        },
      ],
      outcome:
        "CycleSync is a concept, framed honestly — no real users, deployments, or shipped metrics. What it demonstrates is a complete, coherent system: a 24-screen mobile flow (onboarding, the Year Ring, symptom-and-mood logging, honest insights, a doctor-summary export, anonymous community circles, cited resources, privacy controls, and states) built on a reusable design system, with the Year Ring as a signature interaction. The intended validation is moderated usability testing with 5–8 people with irregular cycles — to test Year Ring comprehension vs a monthly grid, emotional response to confidence bands vs countdowns, and the trust impact of privacy-first onboarding. Success is defined as comprehension and trust signals in testing, not adoption numbers.",
      learnings: [
        "Designing for an anxious, underserved group changes the brief: the most important feature was often restraint — not predicting, not shaming, not surveilling.",
        "Honesty is a UX pattern. Showing uncertainty (a window, a confidence level, a named anovulatory cycle) built more trust than any confident-but-wrong prediction could.",
        "Research reframed the aesthetics: the ‘obvious’ pink-and-flowers genre look is exactly what the target user experiences as stereotype — so the anti-pink palette is a research decision, not a taste one.",
        "A 24-screen system forced real systems discipline — tokens and components first, so a symptom or a mood reads the same way on the ring, the log and the doctor summary.",
      ],
      stats: ["8–13% have PCOS", "Honest windows, not countdowns", "Local-first by design"],
      insights: [
        {
          title: "Irregularity isn’t an error",
          body: "A 28-day calendar UI makes a 60-day cycle look like a mistake. For PCOS, the variation is the norm — the interface should say so.",
        },
        {
          title: "Accuracy theatre erodes trust",
          body: "Calendar prediction is ~18% accurate for irregular cycles. A confident wrong date, repeated monthly, teaches people to distrust the app and themselves.",
        },
        {
          title: "Mental health is the hardest part",
          body: "With anxiety and depression 3–8× more common in PCOS, wellbeing isn’t a soft add-on — it’s core to the condition, and CBT has real evidence behind it.",
        },
      ],
      flow: {
        steps: [
          "See your Year Ring",
          "Log flow, symptoms & mood",
          "Read honest insights",
          "Export a doctor summary",
        ],
        note: "Understand your pattern, then act on it — without the pressure.",
      },
      compare: {
        theirLabel: "Typical tracker",
        ourLabel: "CycleSync",
        theirs: [
          "Assumes a 28-day loop; irregularity = error",
          "“Period in 3 days” — precise, often wrong",
          "Mental health lives in another app",
          "Pink-and-flowers; data monetised",
        ],
        ours: [
          "A Year Ring built for irregular bodies",
          "Confidence windows, named anovulatory cycles",
          "Mood & wellbeing in the same log",
          "Warm, non-pink; local-first, no-sell",
        ],
      },
    },
  },
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
    imageCaptions: [
      "Agent detail — confidence over the last hour, crossing the 85% drift gate that auto-throttled the agent.",
      "The oversight gate — an agent's full reasoning trace, and the human's approve / reject decision.",
      "Investigation — replaying a past decision step by step, with the fairness lens overlaid.",
      "Audit trail — a tamper-evident timeline of every system, agent and human action.",
      "Review queue — high-risk actions, risk-ranked so the most dangerous is always on top.",
      "The design system every screen is assembled from — tokens and domain components.",
      "Oversight analytics — how the human-in-the-loop is actually performing over time.",
    ],
    accent: "#4F86E6",
    accentFg: "#fcfaf5",
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
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
