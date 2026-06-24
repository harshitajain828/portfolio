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
  figmaUrl?: string;
  narrative: Narrative;
};

const img = (slug: string, names: string[]) =>
  names.map((n) => `/projects/${slug}/${n}`);

export const projects: Project[] = [
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
    statement: "A camera-first repair application that helps users repair everyday objects, and defers to a professional when a task is unsafe.",
    outcomeLine:
      "A 94-screen iOS system on one design system, built around confidence calibration and safety-first deferral",
    cover: "/projects/fixit/cover.png",
    images: img("fixit", ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png"]),
    imageCaptions: [
      "The core loop, from pointing the camera to a completed repair.",
      "The diagnosis: several likely faults, ranked, with a calibrated level of certainty.",
      "Guided repair, presented one step at a time, with the parts required for each step.",
      "For hazardous work, the application stops and directs the user to a professional.",
      "A 3D scan, for larger items or faults that are difficult to photograph.",
      "The required parts and tools, organised into a clear checklist.",
    ],
    accent: "#0071C2",
    accentFg: "#FFFFFF",
    figmaUrl: "https://www.figma.com/proto/7I0mUprnWqPlUPdNT92tA6/Fixit-%E2%80%94-AI-Repair-Companion?node-id=175-3&starting-point-node-id=175-3&scaling=scale-down&content-scaling=fixed",
    narrative: {
      problem:
        "E-waste is the fastest-growing waste stream on Earth — 62 million tonnes in 2022, up 82% since 2010, and only about a fifth recycled — and textiles are larger still. When things break, people bin them: around 56% of US homeowners would now rather replace than repair, and roughly one in three have thrown out a broken appliance specifically because they couldn’t find someone they trusted to fix it. The barrier isn’t unwillingness, it’s a single intimidating moment — ‘I don’t know what’s wrong, I don’t know what it’s called, and I’m scared I’ll make it worse.’ Every existing tool makes it harder: iFixit, YouTube and manuals all force a text query you can’t write yet, and the new wave of AI chatbots will confidently hallucinate a fix — which, on electrical, gas or structural work, can injure or kill.",
      decisions: [
        {
          title: "The camera, rather than search, is the primary entry point",
          body: "Naming the problem is the most difficult step for a non-expert, so the application removes it. The central control is a capture button rather than a feed; the user points the phone at the object and the app identifies the item and the fault across common categories — appliances, electronics, clothing, furniture and bicycles.",
        },
        {
          title: "Confidence is communicated in plain language",
          body: "Each result presents a ranked set of possible faults with a calibrated indication of certainty in words rather than a percentage, which would imply false precision. Whether the guidance is drawn from the model’s manual or is general is shown explicitly. This prevents a single, potentially incorrect answer from being presented as definitive.",
        },
        {
          title: "When uncertain, the system requests a simple check",
          body: "Where confidence is low, the application does not guess. It asks the user to perform one safe, reversible check — for example, photographing a specific component — and then re-evaluates, rather than presenting an unreliable conclusion.",
        },
        {
          title: "Hazardous repairs are blocked, not merely flagged",
          body: "When a hazardous category is detected — gas, mains electricity, sealed refrigerant, capacitors or structural work — the application presents a blocking screen with no option to proceed, and directs the user to a professional. An incorrect instruction in these areas can cause injury, so the system is deliberately cautious.",
        },
        {
          title: "An honest repair-or-replace assessment",
          body: "An assessment compares the cost of parts and effort against replacement, weighted by the age of the item, and recommends replacement and responsible disposal where appropriate. Advice that reflects the user’s actual interest, including the decision not to repair, supports long-term trust.",
        },
      ],
      outcome:
        "Fixit is a concept — no real users, no launch, no shipped metrics. What it is, is a complete, coherent system: 94 screens across 17 flows covering the camera-first core loop, confidence-calibrated diagnosis, the low-confidence guided-test loop, a 3D scan, parts and ordering, repair-vs-replace, the blocking safety system, library, account, paywall and the full set of edge and error states — all built from one reusable design system, with confidence and safety as the spine. The honest test would be an expert review: would a repair professional accept that it guides a beginner safely, and refuses at the right moments?",
      learnings: [
        "Designing for an intimidated novice changed the brief — the most valuable decisions were about restraint, not features: not naming, not guessing, not coaching danger.",
        "Honesty is a UX pattern. Showing uncertainty, and a safe way to resolve it, built more trust than any confident answer could.",
        "Regulation-grade safety thinking sharpens a product. Treating the hard-stop as a designed, first-class state — not a footnote — is what separates this from the AI-chatbot wave.",
        "A 94-screen system forces real systems discipline — tokens and components first, so a confidence reading or a severity dot means the same thing everywhere.",
      ],
      stats: ["62 Mt of e-waste a year", "56% would rather replace than repair", "~1 in 3 discarded a fixable appliance"],
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
    slug: "cyclesync",
    title: "CycleSync",
    year: "2026",
    role: "Product Designer",
    type: "Product concept",
    skills: ["UX Research", "Product Design", "Design Systems", "Health UX"],
    tools: ["Figma", "Claude + Figma MCP"],
    summary:
      "PCOS affects 8–13% of women, about 1 in 5 young women in India, and it causes some of the most unpredictable cycles there are. Yet almost every tracker still assumes a tidy 28-day month, overlooks the much higher rates of anxiety and depression that come with the condition, and has a shaky record on privacy. CycleSync is a cycle and wellbeing companion built for irregular bodies first. It shows your real pattern instead of a broken month, is honest when it isn't sure, keeps wellbeing in the same place you log symptoms, and treats your data as yours.",
    statement: "A cycle and wellbeing companion designed for irregular cycles, such as those caused by PCOS.",
    outcomeLine:
      "A 24-screen mobile system on one design system, designed for irregular bodies first",
    cover: "/projects/cyclesync/cover.png",
    images: img("cyclesync", ["01.png", "02.png", "03.png", "04.png"]),
    imageCaptions: [
      "The Year Ring — a 12-month radial view, so an irregular cycle reads as a pattern rather than an error.",
      "An estimate shown as a window with its confidence, rather than a precise countdown, alongside a doctor-ready summary.",
      "Onboarding in which “not sure” and “very irregular” are valid, first-class answers.",
      "Anonymous community spaces, wellbeing kept alongside tracking, and local-first data controls.",
    ],
    accent: "#C2674A",
    accentFg: "#F6F0E6",
    figmaUrl: "https://www.figma.com/proto/PCa7rf0Pd4CKfOzdhjo8M1/CycleSync-%E2%80%94-Cycle-Wellbeing-Companion?node-id=51-29&starting-point-node-id=51-29&scaling=scale-down&content-scaling=fixed",
    narrative: {
      problem:
        "The most common hormonal condition in women also produces the most unpredictable cycles, and the tools are all built for predictability. PCOS affects 8–13% of women globally (about 1 in 5 young women in India), up to 70% of cases go undiagnosed, and getting a diagnosis often takes years and several doctors. Mainstream apps assume a 28-day cycle with ovulation on day 14, so a 45- or 72-day cycle looks like an error, and the countdown keeps promising a date that never comes. For a group that is already three to eight times more likely to live with anxiety or depression, that is genuinely stressful. Trust is shaky too: a leading tracker settled with the FTC, then a $56M class action, over how it shared intimate cycle data. The people who need a good tool the most are the ones served worst.",
      decisions: [
        {
          title: "Turn the calendar into a Year Ring",
          body: "The signature interaction is a 12-month radial view instead of a monthly grid. Period days, cycle lengths and symptom markers sit around a circle, so a long or skipped cycle reads as the user’s real pattern rather than a mistake. It is unfamiliar at first, so a familiar month-detail grid remains one tap away.",
        },
        {
          title: "Choose honesty over certainty",
          body: "Rather than a precise date, the app shows a probability window with its confidence (“likely Jun 18–26, low confidence — cycles vary 31–68 days”), and names anovulatory cycles plainly. Calendar prediction is only around 18% accurate for irregular cycles, so a confident date would often be wrong. For an anxious audience, being clear about uncertainty is what builds trust.",
        },
        {
          title: "Keep wellbeing in the cycle, not in a separate tab",
          body: "Mood, energy and body-image check-ins sit in the same log as physical symptoms, and the insights connect them. A light, CBT-informed support layer appears when it is relevant. The app is explicit that it explains and supports but does not diagnose, cites its sources, and points to professional help when low mood persists.",
        },
        {
          title: "Make trust visible, and avoid the default pink",
          body: "The local-first, no-sell commitment appears in the first 30 seconds, with straightforward export and delete. The palette is warm terracotta, sage and plum rather than the clinical pink typical of the category — research indicates that pink can read as a stereotype to this user, so the choice is deliberate. Attention states use a gentle amber rather than a warning red.",
        },
        {
          title: "Scope it to a companion, not a medical device",
          body: "CycleSync is a literacy, tracking and wellbeing companion — not a contraceptive or a diagnostic tool. This means a smaller feature set than fertility-first apps, but it keeps the product honest about what it can claim, and clear of regulatory overreach.",
        },
      ],
      outcome:
        "CycleSync is a concept: no real users, no launch, no shipped metrics. It is a complete, coherent system — a 24-screen mobile flow covering onboarding, the Year Ring, symptom and mood logging, honest insights, a doctor-summary export, anonymous community spaces, cited resources, privacy controls and edge states — all built on one design system, with the Year Ring as the signature interaction. A meaningful evaluation would be moderated testing with people who have irregular cycles: whether the Year Ring reads more clearly than a monthly grid, how confidence windows feel next to countdowns, and whether privacy-first onboarding builds trust. Success would be comprehension and trust, not download numbers.",
      learnings: [
        "Designing for an anxious, underserved group changed the brief. The most important decisions were often about restraint: not predicting, not shaming, not surveilling.",
        "Honesty turned out to be a UX pattern in itself. Showing uncertainty built far more trust than any confident-but-wrong prediction could.",
        "Research changed the look. The obvious pink-and-flowers style is exactly what this user reads as stereotype, so the calmer palette is a research decision, not a taste one.",
        "A 24-screen system forced real systems discipline. Tokens and components first, so a symptom or a mood reads the same way on the ring, the log and the doctor summary.",
      ],
      stats: ["8–13% of women have PCOS", "~70% of cases go undiagnosed", "~18% prediction accuracy for irregular cycles"],
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
    slug: "appeal",
    title: "Appeal",
    year: "2026",
    role: "Product Designer",
    type: "Product concept",
    skills: ["Product Design", "AI / Trust UX", "Design Systems", "Mobile"],
    tools: ["Figma", "Claude + Figma MCP"],
    summary:
      "Fewer than 1% of denied health-insurance claims are ever appealed — yet 40–80% of the appeals people do file succeed. The gap isn’t the merits, it’s the giving up: denials are written to be opaque and exhausting. Appeal closes that gap. Photograph a denial letter and it decodes the real reason behind the boilerplate, surfaces the specific grounds that win — each cited back to your own documents — and drafts an appeal you edit, own, and send. It’s a calm, evidence-led decoder that never pretends to be a lawyer.",
    statement: "An AI tool that decodes a health-insurance denial letter and helps the user assemble and send an appeal.",
    outcomeLine:
      "A 78-screen iOS system on one design system, built on traceable citations and honest, calibrated confidence",
    cover: "/projects/appeal/cover.png",
    images: img("appeal", ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png"]),
    imageCaptions: [
      "An overview of the flow, from the denial letter to a sent appeal.",
      "The decode: the decisive clause highlighted in the user’s own letter, with a plain-language explanation.",
      "The verdict: a calibrated strength estimate and base rate, with each ground cited to the user’s documents.",
      "The draft: an editable appeal in the user’s name, with AI-written passages marked and each point linked to evidence.",
      "The case timeline — filed, sent, under review, outcome — showing the current stage and the next step.",
      "Data handling is local-first and made clear to the user before any information is requested.",
    ],
    accent: "#E0A23B",
    accentFg: "#16243D",
    figmaUrl: "https://www.figma.com/proto/UHfATn5ewYgSJJQIgwdIkT/Appeal-%E2%80%94-Fight-Your-Denial?node-id=52-98&starting-point-node-id=52-98&scaling=scale-down&content-scaling=fixed",
    narrative: {
      problem:
        "About one in five health-insurance claims is denied, but under 1% are appealed — not from laziness, but by design. The deterrent is administrative burden: the learning, paperwork and emotional cost of fighting back. 69% of denied patients don’t know they can appeal and 85% never file. And the denials people surrender to are mostly beatable — the largest category is ‘other’ (no stated reason) followed by administrative errors; genuine medical-necessity calls are a small minority. Letter-writing is already commoditised; what no one owns is the real bottleneck — the moment at the kitchen table of ‘what does this even mean, do I have a case, what do I say?’ The cautionary tale is DoNotPay, whose FTC settlement reads like a spec of what not to do: never tested against lawyers, hallucinated documents, faked endorsements.",
      decisions: [
        {
          title: "Confirm what was read before building on it",
          body: "After the letter is read, the application does not proceed silently. It displays the extracted fields over an image of the user’s letter; tapping a field highlights its source. Low-confidence reads are marked for confirmation, and nothing downstream relies on an unconfirmed value, which keeps every later citation dependable.",
        },
        {
          title: "Translate the real reason into plain language",
          body: "The central screen presents the user’s letter with the decisive clause highlighted, alongside a plain-language explanation. Where a denial gives no stated reason — the largest single category — that absence is itself presented as a basis for appeal rather than a dead end.",
        },
        {
          title: "A calibrated verdict, supported by citations",
          body: "The verdict combines a strength estimate with an honest base rate, and every ground is accompanied by a citation that traces to a specific line in the user’s documents or a named regulation. Weak cases are described as such, and genuinely complex matters are referred to a lawyer or advocate.",
        },
        {
          title: "The user remains the author and sender",
          body: "The appeal is presented as an editable letter; passages written by the system are marked, and suggested changes are offered as accept-or-reject edits. A review step is required before sending. This keeps the user in control and draws a clear boundary: the tool assists, but does not act as a lawyer.",
        },
        {
          title: "The decode is never behind a paywall",
          body: "Understanding the denial and seeing the available grounds is always free; payment applies only at the point of sending, and a hardship path provides full access. The intent is to avoid charging people at their most vulnerable.",
        },
      ],
      outcome:
        "Appeal is a concept: there are no real users, no launch and no shipped metrics. It is a complete, coherent system — 78 screens across 19 flows covering capture, the show-your-work decode, adaptive intake, the cited verdict, the editable draft, send-and-track, the evidence locker, deadlines, guidance, escalation, account and security, privacy controls, the paywall, and the full set of edge and error states — all built from a single design system, with traceable citations and calibrated confidence at its centre. A meaningful evaluation would be an expert review: whether a patient advocate would accept that it helps a layperson understand and contest a denial without overstating its role.",
      learnings: [
        "Designing against an anti-pattern (DoNotPay’s FTC settlement) was clarifying — every trust mechanic is a direct answer to a documented failure.",
        "Traceability is the whole product. A citation you can tap back to your own letter is what separates this from a confident letter-generator.",
        "Honesty scales down as well as up — the weak-case path and the ‘see a lawyer’ route earn the trust that the strong-case path spends.",
        "A 78-screen system forced real systems discipline — one verdict component, one citation chip, one strength meter, reused everywhere.",
      ],
      stats: ["<1% of denials are appealed", "40–80% of filed appeals succeed", "5% are true medical-necessity calls"],
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
    slug: "sentinel",
    title: "Sentinel",
    year: "2026",
    role: "Product Designer",
    type: "Product concept",
    skills: ["Product Design", "Design Systems", "Enterprise UX", "AI / Agent UX"],
    tools: ["Figma", "Claude + Figma MCP"],
    summary:
      "Banks are starting to hand underwriting, collections and KYC to AI agents. But from August 2026, the EU AI Act makes a human overseer legally required for high-risk credit decisions. Sentinel is an oversight console where one operator supervises a fleet of financial agents: spot an agent drifting, approve or reject a high-risk action before it runs, and reconstruct any past decision for an auditor. Designed end to end on a real design system.",
    statement: "An oversight console for supervising the AI agents that make high-stakes financial decisions.",
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
    figmaUrl: "https://www.figma.com/proto/vOnjwRDnkrFdrgh5bBRMYw/SENTINEL-%E2%80%94-Agent-Oversight-Console?node-id=103-2&starting-point-node-id=103-2&scaling=scale-down&content-scaling=fixed",
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
          body: "An oversight tool lives or dies on consistency — the same status read the same way everywhere. The product is built from primitives and semantic tokens first, then domain components (agent card, decision inspector, audit timeline), with every screen assembled from them. It is slower to the first pixel, but the screens stay consistent and the system is itself part of the work.",
        },
      ],
      outcome:
        "Sentinel is a concept: no invented users, no launch, no shipped metrics. It is the harder thing a high-stakes product is judged on — a complete, coherent system. Forty screens cover fleet monitoring and analytics, the human-in-the-loop review gate, reasoning-replay and fairness investigation, the tamper-evident audit trail, policy governance with versioned diffs, agent configuration and deployment, the full shell (sign-in, settings, command palette, empty/loading/error states) and a responsive mobile set — all from one design system, each surface designed against a named regulatory requirement. A meaningful evaluation would be an expert review: whether a risk officer would accept that it plausibly supports pre-authorisation, intervention, and a contestable, auditable rationale.",
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
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
