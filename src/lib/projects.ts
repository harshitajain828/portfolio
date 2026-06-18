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
    type: "Product concept",
    skills: ["UX Research", "Product Design", "Design Systems", "Health UX"],
    tools: ["Figma", "Claude + Figma MCP"],
    summary:
      "PCOS affects 8–13% of women, about 1 in 5 young women in India, and it causes some of the most unpredictable cycles there are. Yet almost every tracker still assumes a tidy 28-day month, overlooks the much higher rates of anxiety and depression that come with the condition, and has a shaky record on privacy. CycleSync is a cycle and wellbeing companion built for irregular bodies first. It shows your real pattern instead of a broken month, is honest when it isn't sure, keeps wellbeing in the same place you log symptoms, and treats your data as yours.",
    statement: "Built for cycles that don’t fit a calendar.",
    outcomeLine:
      "A 24-screen mobile system on one design system, designed for irregular bodies first",
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
        "The most common hormonal condition in women also produces the most unpredictable cycles, and the tools are all built for predictability. PCOS affects 8–13% of women globally (about 1 in 5 young women in India), up to 70% of cases go undiagnosed, and getting a diagnosis often takes years and several doctors. Mainstream apps assume a 28-day cycle with ovulation on day 14, so a 45- or 72-day cycle looks like an error, and the countdown keeps promising a date that never comes. For a group that is already three to eight times more likely to live with anxiety or depression, that is genuinely stressful. Trust is shaky too: a leading tracker settled with the FTC, then a $56M class action, over how it shared intimate cycle data. The people who need a good tool the most are the ones served worst.",
      decisions: [
        {
          title: "Turn the calendar into a Year Ring",
          body: "The signature move is a 12-month radial view instead of a monthly grid. Period days, cycle lengths and symptom dots sit around a circle, so a long or skipped cycle reads as your real pattern rather than a mistake. It is unfamiliar at first, so a month-detail view keeps the usual grid one tap away for anyone who wants it.",
        },
        {
          title: "Choose honesty over certainty",
          body: "Instead of “Period in 3 days,” CycleSync shows a probability window with its confidence (“likely Jun 18–26, low confidence — your cycles vary 31–68 days”), and it names anovulatory cycles plainly. It feels less magical in a demo, but calendar prediction is only around 18% accurate for irregular cycles, so a confident date would be a quiet lie. For an anxious audience, not lying is the whole trust unlock.",
        },
        {
          title: "Keep wellbeing in the cycle, not in a separate tab",
          body: "Mood, energy and body-image check-ins live in the same log as physical symptoms, and the insights connect them (“acne tends to flare after low-sleep weeks”). A light, CBT-informed support layer shows up when it’s relevant. Mental health is sensitive ground, so the app is explicit that it explains and supports but never diagnoses, cites its sources, and points to real help when low mood lingers.",
        },
        {
          title: "Make trust visible, and drop the pink",
          body: "The local-first, no-sell promise appears in the first 30 seconds, with easy export and delete. The palette is warm terracotta, sage and plum rather than clinical pink. Pink is the expected signal for this category, but research shows it reads as stereotype and even shame to this user, so the choice is deliberate. Attention states use a gentle amber, never a shaming red.",
        },
        {
          title: "Scope it to a companion, not a medical device",
          body: "CycleSync is a literacy, tracking and wellbeing companion, not a contraceptive or a diagnostic tool. That means a smaller feature set than fertility-first apps, but it keeps the product honest about what it can and can’t claim, and well clear of regulatory overreach.",
        },
      ],
      outcome:
        "CycleSync is a concept, and I’ve been upfront about that: no real users, no launch, no shipped metrics. What it shows is a complete, coherent system — a 24-screen mobile flow covering onboarding, the Year Ring, symptom and mood logging, honest insights, a doctor-summary export, anonymous community circles, cited resources, privacy controls and edge states — all built on one reusable design system, with the Year Ring as the signature interaction. The way I’d validate it is moderated testing with 5–8 people who have irregular cycles: does the Year Ring read more clearly than a monthly grid, how do confidence windows feel next to countdowns, and does privacy-first onboarding actually build trust. Success would be comprehension and trust in testing, not download numbers.",
      learnings: [
        "Designing for an anxious, underserved group changed the brief. The most important decisions were often about restraint: not predicting, not shaming, not surveilling.",
        "Honesty turned out to be a UX pattern in itself. Showing uncertainty built far more trust than any confident-but-wrong prediction could.",
        "Research changed the look. The obvious pink-and-flowers style is exactly what this user reads as stereotype, so the calmer palette is a research decision, not a taste one.",
        "A 24-screen system forced real systems discipline. Tokens and components first, so a symptom or a mood reads the same way on the ring, the log and the doctor summary.",
      ],
      stats: ["8–13% have PCOS", "Honest windows, not countdowns", "Local-first by design"],
      insights: [
        {
          title: "Irregularity isn’t an error",
          body: "A 28-day calendar makes a 60-day cycle look broken. For PCOS, the variation is the norm, and the interface should treat it that way.",
        },
        {
          title: "Accuracy theatre erodes trust",
          body: "Calendar prediction is roughly 18% accurate for irregular cycles. A confident wrong date, month after month, teaches people to distrust the app and themselves.",
        },
        {
          title: "Mental health is the hardest part",
          body: "Anxiety and depression are three to eight times more common with PCOS, so wellbeing isn’t a soft add-on. It’s core to the condition, and CBT has real evidence behind it.",
        },
      ],
      flow: {
        steps: [
          "See your Year Ring",
          "Log flow, symptoms & mood",
          "Read honest insights",
          "Export a doctor summary",
        ],
        note: "Understand your pattern, then act on it, without the pressure.",
      },
      compare: {
        theirLabel: "Typical tracker",
        ourLabel: "CycleSync",
        theirs: [
          "Assumes a 28-day loop; irregularity reads as error",
          "“Period in 3 days” — precise, often wrong",
          "Mental health lives in another app",
          "Pink-and-flowers; data monetised",
        ],
        ours: [
          "A Year Ring built for irregular bodies",
          "Confidence windows, named anovulatory cycles",
          "Mood and wellbeing in the same log",
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
    type: "Product concept",
    skills: ["Product Design", "Design Systems", "Enterprise UX", "AI / Agent UX"],
    tools: ["Figma", "Claude + Figma MCP"],
    summary:
      "Banks are starting to hand underwriting, collections and KYC to AI agents. But from August 2026, the EU AI Act makes a human overseer legally required for high-risk credit decisions. Sentinel is an oversight console where one operator supervises a fleet of financial agents: spot an agent drifting, approve or reject a high-risk action before it runs, and reconstruct any past decision for an auditor. Designed end to end on a real design system.",
    statement: "Keep a human in the loop — at the scale agents now run.",
    outcomeLine:
      "40 screens on one design system · 3 end-to-end flows · designed against EU AI Act Art. 14",
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
        "High-stakes finance is starting to hand its decisions to AI agents that act faster than any person can watch: who gets a loan, whose account is frozen for an AML hit, which borrower gets a collections message. The catch is that these are exactly the decisions regulators won’t leave unattended. From 2 August 2026 the EU AI Act treats credit scoring as high-risk and requires (Article 14) a human who can understand the system, override it and stop it. The cost of getting it wrong is already real: in July 2025 the Massachusetts Attorney General settled with Earnest Operations for $2.5M over an AI lending model that produced disparate impact through a proxy variable. So the design problem isn’t building the agents. It’s building the cockpit that lets one person genuinely supervise many of them, step in within seconds, and prove afterwards that a human was actually in control.",
      decisions: [
        {
          title: "Put the human at the riskiest moments, not all of them",
          body: "Oversight only scales if the operator isn’t asked to review everything. Sentinel gates on risk: an agent pauses and parks an action only when it crosses a threshold (a loan above a cap, any adverse action, an AML escalation), and the review queue is ranked so the most dangerous item is always on top. A badly tuned threshold either floods the human or lets something risky slip through, so the thresholds are a visible, auditable setting rather than a hidden constant.",
        },
        {
          title: "Pause one agent, not the whole fleet",
          body: "When an agent drifts, halting everything is its own incident. Sentinel lets the operator throttle or pause the single misbehaving agent while the rest keep running, which contains the damage without paging engineering. Partial-halt states are easy to misread, so the fleet view makes “what’s running vs. what’s contained” obvious at a glance.",
        },
        {
          title: "Show confidence, and its limits, right where the decision is made",
          body: "The AI Act specifically warns about automation bias, people rubber-stamping whatever the machine suggests. So every decision surfaces the model’s confidence, the policy checks it passed or failed, and a step-by-step reasoning trace including a fairness check, before the operator commits. It’s more to read per decision, but a decision a human can’t interrogate isn’t oversight.",
        },
        {
          title: "Treat the audit trail as a feature, not an export",
          body: "Defensibility is the compliance officer’s whole job. Rather than reconstructing events from logs after a regulator asks, Sentinel records a tamper-evident timeline as the work happens: every system, agent and human action in order, reconstructable exactly as it stood at decision time, and mapped to the rule it satisfies. It’s more machinery up front, in exchange for an answer that already exists when someone asks why an agent did something.",
        },
        {
          title: "Build on a real design system",
          body: "An oversight tool lives or dies on consistency, the same status read the same way everywhere. I built primitives and semantic tokens first, then domain components (agent card, decision inspector, audit timeline), and assembled every screen from them. It’s slower to the first pixel, but the screens stay consistent and the system itself shows how I think.",
        },
      ],
      outcome:
        "Sentinel is a concept and I’ve framed it as one: no invented users, no launch, no shipped metrics. What it shows is the harder thing a high-stakes product is judged on, a complete and coherent system. Forty screens cover fleet monitoring and analytics, the human-in-the-loop review gate, reasoning-replay and fairness investigation, the tamper-evident audit trail, policy governance with versioned diffs, agent configuration and deployment, the full shell (sign-in, settings, command palette, empty/loading/error states) and a responsive mobile set, all from one design system, each surface designed against a named regulatory requirement. The honest test is an expert review: would a risk officer accept that this plausibly supports pre-authorisation, intervention and a contestable, auditable rationale? That’s the bar I designed to.",
      learnings: [
        "Designing for two opposed users sharpened everything. The operations lead wants speed and fewer interruptions; the compliance officer wants friction and a paper trail. The product is the negotiation between them.",
        "Regulation is a design brief, not a constraint to route around. Reading the AI Act, ECOA and SR 11-7 closely turned a vague idea of “trust” into concrete, testable requirements.",
        "Forty screens forced real systems discipline. Tokens and components first, so a status reads the same way on the fleet grid, the audit log and a mobile card.",
        "An AI-native workflow let me move fast, generating and assembling screens from the system with Figma MCP, but the load-bearing work was judgment: what to show versus hide on a dense fleet view, and how much friction a kill-switch should have.",
      ],
      stats: ["Art. 14 by design", "40 screens · one system", "Every action auditable"],
      insights: [
        {
          title: "Accuracy isn’t trust",
          body: "A model can be 99% accurate and still need a human who can say no. In high-stakes finance the other 1% is someone’s loan, account or livelihood.",
        },
        {
          title: "Rubber-stamping fails the test",
          body: "Article 14 isn’t satisfied by a human clicking approve. Oversight only counts if the person can actually see why, and has a real reason to look.",
        },
        {
          title: "The loop is now mandatory",
          body: "From August 2026, human oversight and auditability for high-risk credit AI are legal requirements, not nice-to-haves. The market needs this cockpit whether it wants it or not.",
        },
      ],
      flow: {
        steps: [
          "Agent pauses a high-risk action",
          "Operator sees the full context",
          "Approve, reject, or send back",
          "Decision lands in the audit log",
        ],
        note: "The Article 14 moment: a human decides before anything executes.",
      },
      compare: {
        theirLabel: "Autonomous agents",
        ourLabel: "Sentinel",
        theirs: [
          "Agents act; humans find out later",
          "“99% accurate” — but nobody’s accountable",
          "Reasoning buried in logs",
          "Audit means an export after the fact",
        ],
        ours: [
          "High-risk actions pause for a human",
          "Confidence and limits shown at decision time",
          "The agent’s reasoning trace, step by step",
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
    type: "Product concept",
    skills: ["UX Research", "UI Design", "Prototyping", "User Testing"],
    tools: ["Figma"],
    summary:
      "People spend around 45 hours a year just deciding what to watch. StreamNow goes straight at that decision fatigue: Quick Match gives you three tailored picks in under 90 seconds, Taste Match learns from directors, actors and your watch history, and mood and time filters meet you where your evening actually is.",
    statement: "Your next watch in under 90 seconds.",
    outcomeLine: "3 recommendations in <90 sec · 2 matching modes · user-tested",
    cover: "/projects/streamnow/cover.png",
    images: img("streamnow", ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png"]),
    accent: "#ff4d1c",
    accentFg: "#fcfaf5",
    narrative: {
      problem:
        "People spend around 45 hours a year just deciding what to watch. The catalogues are enormous, the browsing UIs are built to show off inventory rather than help you choose, and the result is paralysis: you scroll, you sample a few trailers, you give up, and your free evening shrinks. The question I set out to answer was simple. How do you get someone from opening the app to actually watching something they enjoy in under two minutes?",
      decisions: [
        {
          title: "Quick Match instead of endless browsing",
          body: "The main flow asks for very little and returns exactly three recommendations in under 90 seconds. Three, not thirty. The limit is the point, because every extra option brings back the paralysis the product exists to remove.",
        },
        {
          title: "Taste Match for people who want depth",
          body: "A second, longer path takes in directors, actors and titles you’ve already watched, so the recommendations get better over time. Casual users never have to see it; the invested ones opt in.",
        },
        {
          title: "Mood and time as first-class filters",
          body: "What you watch depends on the kind of evening you’re having, not on how the catalogue is categorised. So mood and available-time filters sit right in the matching flow instead of being buried in settings.",
        },
        {
          title: "Watch Party for shared decisions",
          body: "Half of “what should we watch” is a negotiation between people. Watch Party lets a few people feed the same match, so the recommendation settles the argument.",
        },
      ],
      outcome:
        "The final design gets someone from opening the app to a confident pick in under 90 seconds. I prototyped it at low and high fidelity and refined it through user testing across the matching, filtering and watch-party flows.",
      learnings: [
        "User feedback beat my own assumptions more than once. The testing rounds reshaped the matching flow in ways I wouldn’t have predicted.",
        "Thinking like the business mattered: which features actually earn their place against build cost and monetisation, not just which ones delight.",
      ],
      stats: ["<90 sec to a pick", "45 hrs/yr wasted choosing", "2 matching modes"],
      insights: [
        {
          title: "Decision fatigue is the real problem",
          body: "People scroll, sample trailers, second-guess and give up. The catalogue isn’t the bottleneck, the deciding is.",
        },
        {
          title: "Choosing is social",
          body: "A big share of “what should we watch” happens in groups. The decision is a negotiation, not a search query.",
        },
        {
          title: "Context beats catalogue",
          body: "Mood and the time you have predict what actually gets watched better than genre ever does.",
        },
      ],
      flow: {
        steps: [
          "Pick your subscriptions",
          "Watch 3 clips",
          "Like / dislike",
          "Get 3 picks",
        ],
        note: "Quick Match, under 90 seconds end to end.",
      },
      compare: {
        theirLabel: "Endless browse",
        ourLabel: "StreamNow",
        theirs: [
          "Rows of thumbnails with no opinion",
          "Trailers as commitment tests",
          "Catalogue-first navigation",
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
