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
    slug: "fixit",
    title: "Fixit",
    year: "2026",
    role: "Product Designer",
    type: "Product concept",
    skills: ["Product Design", "AI / Vision UX", "Design Systems", "Mobile"],
    tools: ["Figma", "Claude + Figma MCP"],
    summary:
      "The world bins tens of millions of tonnes of fixable goods a year — not because repair is impossible, but because the knowledge to fix is locked behind a moment of intimidation. Fixit is a camera-first AI repair companion: point your phone at a broken thing and it identifies the item and the likely fault with visible confidence, guides the fix step by step, names the exact parts and tools, and — honestly and visibly — knows when to stop and tell you to call a pro.",
    statement: "Point. Diagnose. Fix — and know when to stop.",
    outcomeLine:
      "A 94-screen iOS system on one design system, built around confidence calibration and safety-first deferral",
    cover: "/projects/fixit/cover.png",
    images: img("fixit", ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png"]),
    imageCaptions: [
      "The core loop at a glance — point, analyze, diagnose, plan, fix.",
      "The diagnosis that sells the product — a ranked differential with calibrated confidence, never a bare verdict.",
      "Cook-mode guided repair — one step at a time, the exact parts for this step, a timer when it matters.",
      "The safety hard-stop — for gas, mains, refrigerant or structural work it refuses to coach, and routes to a pro.",
      "3D point-cloud scan — the premium capture path for larger or hard-to-photograph faults.",
      "Parts & tools turned into an orderable, have-it / need-it checklist.",
    ],
    accent: "#E2641F",
    accentFg: "#FBF7F0",
    narrative: {
      problem:
        "E-waste is the fastest-growing waste stream on Earth — 62 million tonnes in 2022, up 82% since 2010, and only about a fifth recycled — and textiles are larger still. When things break, people bin them: around 56% of US homeowners would now rather replace than repair, and roughly one in three have thrown out a broken appliance specifically because they couldn’t find someone they trusted to fix it. The barrier isn’t unwillingness, it’s a single intimidating moment — ‘I don’t know what’s wrong, I don’t know what it’s called, and I’m scared I’ll make it worse.’ Every existing tool makes it harder: iFixit, YouTube and manuals all force a text query you can’t write yet, and the new wave of AI chatbots will confidently hallucinate a fix — which, on electrical, gas or structural work, can injure or kill.",
      decisions: [
        {
          title: "Camera as the front door, not search",
          body: "The hardest moment is naming the problem, so Fixit removes naming entirely. The centre of the tab bar is a capture button, not a feed — point the phone at the broken thing and the product identifies the item and fault across the everyday long tail (appliances, electronics, clothing, furniture, bikes). Out-breadth the guide libraries on coverage; out-design the chatbots on trust.",
        },
        {
          title: "Show confidence — never a bare verdict, never a cold %",
          body: "The result screen always shows a ranked differential (most likely / possible / less likely) with a calibrated-language confidence bar — ‘a hunch’ through ‘fairly sure’ — not a false-precision percentage. Grounded (‘based on the manual for your model’) versus inferred guidance is a first-class, labelled state. This structurally prevents the confidently-wrong single answer that is a vision model’s default failure.",
        },
        {
          title: "When unsure, run a safe test — don’t guess",
          body: "If confidence sits in the uncertain band, Fixit doesn’t improvise. It hands the user one cheap, safe, reversible test (‘open the bottom panel and photograph the pump’), then re-analyses and animates the confidence moving. Uncertainty becomes productive instead of scary, and the human becomes the model’s sensor.",
        },
        {
          title: "Safety as the product, not a disclaimer",
          body: "When a hazardous class is detected — gas, mains voltage, sealed refrigerant, a microwave capacitor, structural — Fixit routes to a blocking screen with no ‘proceed anyway’ button, only ‘why’ and ‘find a pro’. Declining to help is the feature: false ‘stop’ is cheap, false ‘proceed’ can kill, so caution is deliberately asymmetric.",
        },
        {
          title: "Honest repair-vs-replace",
          body: "A ‘worth fixing?’ verdict makes the 50% rule visual — part-and-effort cost against a new unit, weighted by age — and will, when honest, recommend replacing and route to responsible disposal. Advice aligned with the user’s actual interest, including ‘don’t bother’, is what earns trust for the next repair.",
        },
      ],
      outcome:
        "Fixit is a concept, and I’ve framed it as one: no real users, no launch, no shipped metrics. What it shows is a complete, coherent system — 94 screens across 17 flows covering the camera-first core loop, confidence-calibrated diagnosis, the low-confidence guided-test loop, a 3D AR scan, parts and ordering, repair-vs-replace, the blocking safety system, library, account, paywall and the full set of edge and error states — all assembled from one reusable design system, with confidence calibration and safety-first deferral as the signature. The honest test is an expert review: would a repair professional accept that this guides a novice safely, and refuses at the right moments? That’s the bar I designed to.",
      learnings: [
        "Designing for an intimidated novice changed the brief — the most valuable decisions were about restraint, not features: not naming, not guessing, not coaching danger.",
        "Honesty is a UX pattern. Showing uncertainty, and a safe way to resolve it, built more trust than any confident answer could.",
        "Regulation-grade safety thinking sharpens a product. Treating the hard-stop as a designed, first-class state — not a footnote — is what separates this from the AI-chatbot wave.",
        "A 94-screen system forces real systems discipline — tokens and components first, so a confidence reading or a severity dot means the same thing everywhere.",
      ],
      stats: ["62 Mt e-waste a year", "Confidence, never a bare verdict", "It refuses dangerous fixes"],
      insights: [
        {
          title: "The barrier is intimidation, not laziness",
          body: "People want to fix things — Repair Cafés prove demand outstrips access. What stops them is not knowing the fault or its name, and the fear of making it worse.",
        },
        {
          title: "A confident wrong answer is the real danger",
          body: "Vision models hallucinate, and their ‘confidence’ is token probability, not diagnostic certainty. On electrical or gas work, one confidently-wrong step is a safety incident.",
        },
        {
          title: "Declining builds trust",
          body: "A tool that sometimes says ‘stop, get a pro’ or ‘replace this one’ is a tool you believe the rest of the time.",
        },
      ],
      flow: {
        steps: ["Point the camera", "Analyzing", "Diagnosis + confidence", "Repair plan", "Guided fix", "Fixed"],
        note: "The core loop — from a broken thing to a fix, with a human always able to stop.",
      },
      compare: {
        theirLabel: "Guides & AI chatbots",
        ourLabel: "Fixit",
        theirs: [
          "A text query you can’t write yet",
          "One confident answer — often wrong",
          "Safety treated as a footnote",
          "No idea when to stop",
        ],
        ours: [
          "Point the camera — no naming needed",
          "A ranked differential with honest confidence",
          "Blocking safety stops, by design",
          "Refuses danger, routes to a pro",
        ],
      },
    },
  },
  {
    slug: "appeal",
    title: "Appeal",
    year: "2026",
    role: "Product Designer",
    type: "Product concept",
    skills: ["Product Design", "AI / Trust UX", "Design Systems", "Mobile"],
    tools: ["Figma", "Claude + Figma MCP"],
    summary:
      "Fewer than 1% of denied health-insurance claims are ever appealed — yet 40–80% of the appeals people do file succeed. The gap isn’t the merits, it’s the giving up: denials are written to be opaque and exhausting. Appeal closes that gap. Photograph a denial letter and it decodes the real reason behind the boilerplate, surfaces the specific grounds that win — each cited back to your own documents — and drafts an appeal you edit, own, and send. It’s a calm, evidence-led decoder that never pretends to be a lawyer.",
    statement: "Decode the denial. Win the appeal.",
    outcomeLine:
      "A 78-screen iOS system on one design system, built on traceable citations and honest, calibrated confidence",
    cover: "/projects/appeal/cover.png",
    images: img("appeal", ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png"]),
    imageCaptions: [
      "The journey at a glance — decode, argue, send.",
      "The Decode — the boilerplate reason translated into plain language, the decisive clause highlighted in your own letter.",
      "The Verdict — a calibrated strength meter and an honest base rate, with each ground cited back to your documents.",
      "The Draft — the appeal in your name, AI-authored runs marked, leverage points pinned to your evidence.",
      "The case timeline — filed, sent, under review, outcome — so you always know what happens next.",
      "Trust as a feature — local-first, HIPAA-grade handling, surfaced before anything is asked of you.",
    ],
    accent: "#E0A23B",
    accentFg: "#16243D",
    narrative: {
      problem:
        "About one in five health-insurance claims is denied, but under 1% are appealed — not from laziness, but by design. The deterrent is administrative burden: the learning, paperwork and emotional cost of fighting back. 69% of denied patients don’t know they can appeal and 85% never file. And the denials people surrender to are mostly beatable — the largest category is ‘other’ (no stated reason) followed by administrative errors; genuine medical-necessity calls are a small minority. Letter-writing is already commoditised; what no one owns is the real bottleneck — the moment at the kitchen table of ‘what does this even mean, do I have a case, what do I say?’ The cautionary tale is DoNotPay, whose FTC settlement reads like a spec of what not to do: never tested against lawyers, hallucinated documents, faked endorsements.",
      decisions: [
        {
          title: "Show your work before building on it",
          body: "After reading the letter, Appeal never silently proceeds. It shows the fields it extracted over a thumbnail of your actual letter; tap any field to see the exact source region. High-confidence reads are quiet, low-confidence reads get an amber ‘tap to confirm’, and nothing downstream runs on an unconfirmed read. That’s the foundation that makes every later citation trustworthy.",
        },
        {
          title: "Decode the real reason — the empathy moment",
          body: "The hero screen is a split: your scanned letter with the decisive clause highlighted in brick, and a plain-language ‘what this actually means’ beside it. The 36%-of-denials ‘they didn’t actually say why’ case isn’t a failure state — it’s reframed as leverage: ‘that’s common, and it’s a weakness we can use.’",
        },
        {
          title: "A calibrated verdict, with citations",
          body: "The verdict pairs a strength meter with an honest base rate (‘appeals like yours succeed about X% of the time’), and every ground carries a citation chip that traces to the exact line in your own document or a named regulation — never an unverifiable claim. Weak cases get an honest ‘this is a harder case’ path; genuinely complex ones are routed to a lawyer or advocate.",
        },
        {
          title: "A draft the user owns and sends",
          body: "The appeal is presented as a finished letter you can edit anywhere; AI-authored runs carry a subtle marigold rule so authorship is always legible, and refine suggestions come as accept/reject diffs. The flow forces a ‘review before you send’ checklist and an explicit ‘I’m sending my appeal’ — deliberate friction that is both a trust feature and the legal firewall: the user is always the author and the sender.",
        },
        {
          title: "Never paywall the decode",
          body: "Understanding your denial and seeing your grounds is always free; payment is asked only at send, with a hardship path that grants full access. The ethical north star is to not monetise desperation — the inverse of the failure mode the product was designed against.",
        },
      ],
      outcome:
        "Appeal is a concept and I’ve framed it as one: no real users, no launch, no shipped metrics. What it shows is a complete, coherent system — 78 screens across 19 flows covering capture, show-your-work decode, adaptive intake, the cited verdict, the user-owned draft editor, send-and-track, the evidence locker, deadlines, learn, escalation, account, security and app-lock, privacy controls, the ethical paywall, and the full edge-and-error set — all on one design system, with traceable citations and calibrated confidence as the spine. The honest test is an expert review: would a patient advocate accept that this helps a layperson understand and contest a denial without ever overclaiming or posing as a lawyer? That’s the bar I designed to.",
      learnings: [
        "Designing against an anti-pattern (DoNotPay’s FTC settlement) was clarifying — every trust mechanic is a direct answer to a documented failure.",
        "Traceability is the whole product. A citation you can tap back to your own letter is what separates this from a confident letter-generator.",
        "Honesty scales down as well as up — the weak-case path and the ‘see a lawyer’ route earn the trust that the strong-case path spends.",
        "A 78-screen system forced real systems discipline — one verdict component, one citation chip, one strength meter, reused everywhere.",
      ],
      stats: ["<1% of denials are appealed", "40–80% of appeals win", "Every ground cited to your docs"],
      insights: [
        {
          title: "Giving up is the design problem",
          body: "The barrier to appealing isn’t the merits — most filed appeals win. It’s administrative burden: not knowing you can, and the exhaustion of trying.",
        },
        {
          title: "Opacity is leverage, not a dead end",
          body: "The biggest denial category has no stated reason. That looks like a wall, but a missing rationale is itself a weakness you can appeal on.",
        },
        {
          title: "Trust is the product, not the model",
          body: "Letter-writing is commoditised. What wins is traceable citations, calibrated confidence, and a user who is always the author — never a tool pretending to be a lawyer.",
        },
      ],
      flow: {
        steps: ["Photograph the denial", "Decode the real reason", "See your grounds", "Draft your appeal", "Send & track"],
        note: "From a confusing letter to a sent appeal you own — understanding first, then action.",
      },
      compare: {
        theirLabel: "DIY / letter generators",
        ourLabel: "Appeal",
        theirs: [
          "Boilerplate you can’t decode",
          "A letter with unverifiable claims",
          "Confidence with no basis",
          "Tools that imply they’re lawyers",
        ],
        ours: [
          "The real reason, in plain language",
          "Grounds cited to your own documents",
          "An honest strength meter and base rate",
          "You’re always the author and sender",
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
