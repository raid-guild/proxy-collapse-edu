import type { Comic, ComicSpread } from "@/lib/comic-types";

const PAGE_W = 2006;
const PAGE_H = 3136;

function panel(left: number, top: number, width: number, height: number) {
  return {
    left: (left / PAGE_W) * 100,
    top: (top / PAGE_H) * 100,
    width: (width / PAGE_W) * 100,
    height: (height / PAGE_H) * 100,
  };
}

const spreads: ComicSpread[] = [
  {
    id: "cover",
    kind: "cover",
    title: "Do Agents Dream of Electric Sheep?",
    image: "/comics/electric-sheep/concept/cover-concept.png",
    watch: {
      duration: 9,
      narration:
        "Do agents dream of electric sheep? A story about prompts, loops, and the work required to turn an artificial helper into a governed system.",
    },
  },
  {
    id: "page-1",
    kind: "comic",
    title: "One Sheep, One Prompt",
    act: "Page I",
    image: "/comics/electric-sheep/pages/page1-v2-2x.png",
    watch: {
      duration: 28,
      narration:
        "One sheep receives one instruction. The first result looks perfect. But the same instruction produces something different the next time. The human responds by adding conditions, qualifications, and still more context, until writing the instructions becomes more work than the original task.",
    },
    hotspots: [
      {
        id: "p1-1",
        label: "One instruction",
        caption:
          "One sheep receives one apparently simple instruction, while the human still carries the goal and all of its unstated context.",
        ...panel(60, 64, 926, 910),
        image: "/comics/electric-sheep/panels/page1/01-one-instruction.png",
        video: "/comics/electric-sheep/videos/page1-sheep-building-silent.mp4",
      },
      {
        id: "p1-2",
        label: "The first success",
        caption:
          "The first result looks perfect, making a single instruction feel more reliable than it really is.",
        ...panel(1020, 64, 926, 910),
        image: "/comics/electric-sheep/panels/page1/02-first-success.png",
      },
      {
        id: "p1-3",
        label: "An inconsistent repeat",
        caption:
          "The same sealed instruction produces a different and precarious result on the next attempt.",
        ...panel(60, 1008, 926, 878),
        image: "/comics/electric-sheep/panels/page1/03-inconsistent-repeat.png",
      },
      {
        id: "p1-4",
        label: "More instructions",
        caption:
          "The human tries to remove uncertainty by adding every condition they can think of to the prompt.",
        ...panel(1020, 1008, 926, 878),
        image: "/comics/electric-sheep/panels/page1/04-more-instructions.png",
      },
      {
        id: "p1-5",
        label: "The instruction pile",
        caption:
          "The prompt becomes a mountain, but the human is still responsible for the map, clock, rules, and judgment surrounding the work.",
        ...panel(60, 1920, 1886, 1118),
        image: "/comics/electric-sheep/panels/page1/05-instruction-pile.png",
        video: "/comics/electric-sheep/videos/page1-sheep-struggle-pile-silent.mp4",
      },
    ],
  },
  {
    id: "bridge-1",
    kind: "bridge",
    title: "Prompt Engineering Is Not a System",
    kicker: "Bridge I",
    body: [
      "A prompt can shape an instruction, but it does not create the organization around that instruction. The human is still supplying continuity, remembering history, choosing tools, checking the result, and deciding what counts as done.",
      "Adding more words can improve one run while quietly moving even more system design into a fragile block of prose. The prompt grows, but durable intent, permissions, state, evidence, and acceptance criteria remain outside it.",
      "That hidden work is the first governance surface to measure. How many minutes of human review are required for each accepted result? How often does the same instruction create an exception? A useful agent system must reduce that burden without making its failures harder to see.",
      "The next step is not simply a larger prompt. The sheep needs selected context: enough organizational memory to act coherently, but not so much that relevance and authority disappear inside the backpack.",
    ],
    quote: "Adding instructions did not create a system. It created a bottleneck.",
    watch: {
      duration: 35,
      narration:
        "A prompt can shape an instruction, but it does not create the organization around it. The human still supplies memory, tools, judgment, and the definition of done. Adding more words may improve one run, but it moves more system design into a fragile block of prose. The next step is selected context, not simply a larger prompt.",
    },
  },
  {
    id: "page-2",
    kind: "comic",
    title: "The Backpack",
    act: "Page II",
    image: "/comics/electric-sheep/pages/page2-v2-2x.png",
    watch: {
      duration: 31,
      narration:
        "The sheep receives a backpack containing the context relevant to its task. With a focused map, it can follow the right path. But when the human adds every document, rule, clock, and possibility, context becomes another burden. After the pack is sorted, the sheep reaches the right destination, only to discover that knowing what to do is not the same as having tools or permission to act.",
    },
    hotspots: [
      {
        id: "p2-1",
        label: "A focused backpack",
        caption:
          "The sheep receives a small selection of relevant history, constraints, and directions rather than the entire archive.",
        ...panel(72, 76, 908, 944),
        image: "/comics/electric-sheep/panels/page2/01-focused-backpack.png",
      },
      {
        id: "p2-2",
        label: "A clear path",
        caption:
          "Focused context makes the relevant path visible without asking the sheep to carry everything the organization knows.",
        ...panel(1024, 76, 912, 944),
        image: "/comics/electric-sheep/panels/page2/02-clear-path.png",
      },
      {
        id: "p2-3",
        label: "Everything, just in case",
        caption:
          "The human begins adding every available document and constraint, hoping that more context will eliminate uncertainty.",
        ...panel(72, 1060, 908, 876),
        image: "/comics/electric-sheep/panels/page2/03-overpacking.png",
        video: "/comics/electric-sheep/videos/page2-overload-silent.mp4",
      },
      {
        id: "p2-4",
        label: "Context overload",
        caption:
          "Contradictory maps and indiscriminate memory immobilize the sheep instead of helping it decide.",
        ...panel(1024, 1060, 912, 876),
        image: "/comics/electric-sheep/panels/page2/04-context-overload.png",
      },
      {
        id: "p2-5",
        label: "The locked tools",
        caption:
          "The right context reaches the right destination, but credentials, operational tools, write access, software, and budget remain permissioned.",
        ...panel(72, 1982, 1864, 1052),
        image: "/comics/electric-sheep/panels/page2/05-locked-tools.png",
        video: "/comics/electric-sheep/videos/page2-find-tools-silent.mp4",
      },
    ],
  },
  {
    id: "bridge-2",
    kind: "bridge",
    title: "Context Is a Selection Problem",
    kicker: "Bridge II",
    body: [
      "Context engineering decides which parts of organizational memory enter a particular run. The goal is not maximum context. It is sufficient, relevant, current, and authoritative context for the role performing the work.",
      "Too little context leaves the sheep guessing. Too much can bury the task beneath stale history, contradictory policy, irrelevant detail, and information the role never needed to see. A larger context window does not resolve those selection and authority problems by itself.",
      "Multiplayer systems make that distinction especially important. An orchestrator, worker, judge, and verifier should not automatically receive identical backpacks. Each role needs the intent, evidence, permissions, and history relevant to its responsibility—and a way to locate more when an exception requires it.",
      "Even perfect context is still knowledge, not capability. The locked cabinet separates knowing from acting. Page three adds the harness: scoped tools, credentials, budgets, completion rules, failure behavior, and receipts for what actually happened.",
    ],
    quote: "The useful context is not everything the organization knows. It is what this role needs now.",
    watch: {
      duration: 38,
      narration:
        "Context engineering is a selection problem. Too little leaves the sheep guessing. Too much buries the task beneath stale history, contradictory policy, and irrelevant detail. Different roles need different backpacks. And even perfect context is still knowledge, not capability. The locked cabinet separates knowing from acting. Next, the sheep needs a harness of scoped tools, permissions, completion rules, and evidence.",
    },
  },
  {
    id: "page-3",
    kind: "comic",
    title: "The Harness",
    act: "Page III",
    image: "/comics/electric-sheep/pages/page3-v1-2x.png",
    watch: {
      duration: 33,
      narration:
        "The steward opens the cabinet, but does not hand over everything. The sheep receives scoped tools, a bounded budget, and a pouch for evidence. Its harness blocks a forbidden action, permits a repair inside the boundary, and returns a receipt that can be checked against the finished work. One safe run is useful. Repeating it reliably will require a defined path.",
    },
    hotspots: [
      {
        id: "p3-1",
        label: "A scoped harness",
        caption:
          "The steward selects specific tools, access, and budget rather than granting every capability in the cabinet.",
        ...panel(72, 76, 906, 952),
        image: "/comics/electric-sheep/panels/page3/01-scoped-harness.png",
      },
      {
        id: "p3-2",
        label: "A permission boundary",
        caption:
          "The harness prevents a forbidden action before it happens and keeps the sheep inside its authorized scope.",
        ...panel(1026, 76, 912, 952),
        image: "/comics/electric-sheep/panels/page3/02-permission-boundary.png",
      },
      {
        id: "p3-3",
        label: "A permitted repair",
        caption:
          "Inside the boundary, the sheep can use an approved tool and a bounded budget without waiting for step-by-step direction.",
        ...panel(72, 1072, 906, 900),
        image: "/comics/electric-sheep/panels/page3/03-permitted-repair.png",
      },
      {
        id: "p3-4",
        label: "Evidence, not a claim",
        caption:
          "The harness returns a receipt that the steward can compare with the completed bridge and explicit acceptance criteria.",
        ...panel(1026, 1072, 912, 900),
        image: "/comics/electric-sheep/panels/page3/04-verified-evidence.png",
        video: "/comics/electric-sheep/videos/page3-verify-evidence-silent.mp4",
      },
      {
        id: "p3-5",
        label: "One run is not a loop",
        caption:
          "A safe completion leaves useful evidence, but repeated work still needs an explicit route through work, judgment, verification, and improvement.",
        ...panel(72, 2014, 1866, 1032),
        image: "/comics/electric-sheep/panels/page3/05-repeatable-route.png",
        video: "/comics/electric-sheep/videos/page3-form-loop-silent.mp4",
      },
    ],
  },
  {
    id: "bridge-3",
    kind: "bridge",
    title: "Tools Need Boundaries and Receipts",
    kicker: "Bridge III",
    body: [
      "A harness turns an informed model into a bounded worker for one run. It combines tools, scoped credentials, state, budgets, completion rules, failure behavior, and evidence capture around the task.",
      "Capability is not permission. A system may know that an API, treasury, publishing channel, or deployment control exists without receiving unrestricted access to it. Useful permissions are narrow enough to limit damage, explicit enough to audit, and paired with a clear escalation path when the task falls outside them.",
      "Completion also needs more than a confident claim. A receipt records what changed, which tool acted, what it spent, and what observable result can be checked against acceptance criteria. Evidence reduces review cost only when it is meaningful and accessible to the person or process doing the verification.",
      "The harness makes one run safer and easier to inspect. Loop engineering makes that work repeatable: it connects execution to judgment, verification, exceptions, and proposed improvements without asking a human to manually carry every ordinary result between them.",
    ],
    quote: "Capability answers what the sheep can do. A harness defines what it may do—and what it must prove.",
    watch: {
      duration: 40,
      narration:
        "A harness combines tools, scoped credentials, state, budgets, completion rules, and evidence around one run. Capability is not permission. The system needs narrow access and a clear escalation path. Completion also needs more than a confident claim. A useful receipt records what changed and what result can be verified. The harness makes one run safer. Loop engineering makes the work repeatable.",
    },
  },
  {
    id: "page-4",
    kind: "comic",
    title: "The Loop",
    act: "Page IV",
    image: "/comics/electric-sheep/pages/page4-v1-2x.png",
    watch: {
      duration: 36,
      narration:
        "Work becomes a loop connecting execution, judgment, verification, and improvement. At first, the steward must unlock every station and inspect every receipt. The backlog grows even though the boundaries look safe. Explicit evidence checks allow routine work to continue, while a genuinely unusual result is diverted to the steward as an exception.",
    },
    hotspots: [
      {
        id: "p4-1",
        label: "A four-station route",
        caption:
          "Work, judgment, verification, and improvement become connected stages rather than separate manual handoffs.",
        ...panel(72, 76, 906, 950),
        image: "/comics/electric-sheep/panels/page4/01-four-station-route.png",
      },
      {
        id: "p4-2",
        label: "Approval everywhere",
        caption:
          "The steward must unlock every ordinary step, turning human attention into the loop’s slowest dependency.",
        ...panel(1022, 76, 914, 950),
        image: "/comics/electric-sheep/panels/page4/02-approval-everywhere.png",
        video: "/comics/electric-sheep/videos/page4-approval-bottleneck-silent.mp4",
      },
      {
        id: "p4-3",
        label: "The review backlog",
        caption:
          "Tasks, unfinished work, and receipts accumulate while the steward can inspect only one routine result at a time.",
        ...panel(72, 1068, 906, 882),
        image: "/comics/electric-sheep/panels/page4/03-review-backlog.png",
      },
      {
        id: "p4-4",
        label: "Evidence opens the gate",
        caption:
          "Explicit checks allow ordinary evidence to pass while an unusual red result is diverted for human attention.",
        ...panel(1022, 1068, 914, 882),
        image: "/comics/electric-sheep/panels/page4/04-evidence-checks.png",
      },
      {
        id: "p4-5",
        label: "Governance by exception",
        caption:
          "Routine bounded work continues through visible checks while the steward reviews the exceptional case and watches the whole system.",
        ...panel(72, 1994, 1864, 1056),
        image: "/comics/electric-sheep/panels/page4/05-governance-by-exception.png",
        video: "/comics/electric-sheep/videos/page4-governance-by-exception-silent.mp4",
      },
    ],
  },
  {
    id: "bridge-4",
    kind: "bridge",
    title: "From Human in Every Step to Governance by Exception",
    kicker: "Bridge IV",
    body: [
      "Governance minification is the deliberate reduction of routine human participation without reducing accountability. The target is not autonomy for its own sake. It is human authority without making human latency a dependency of every ordinary run.",
      "A routine review gate asks a person to inspect normal work by default. A justified review gate exists because a concrete uncertainty or consequence has not yet been engineered away. Every gate should be able to name the failure it prevents, the condition that triggers it, and the evidence that would allow it to retire.",
      "Trust is earned inside a stable risk class. A hundred clean bridge repairs do not authorize the sheep to publish policy or spend an unlimited treasury. Useful measures include human review minutes per accepted result, exception rate, escaped defects, reversibility, and the cost of producing evidence strong enough to verify.",
      "As routine checks become explicit and measurable, the steward’s attention moves toward ambiguous intent, policy changes, unusual evidence, and consequential exceptions. The empty stations beyond the loop point to the next challenge: separating work among specialists without losing shared intent or accountability.",
    ],
    quote: "The human leaves the ordinary path, not the system.",
    watch: {
      duration: 43,
      narration:
        "Governance minification reduces routine human participation without reducing accountability. Every review gate should name the failure it prevents, what triggers it, and what evidence would allow it to retire. Trust is earned inside a stable risk class; success repairing bridges does not authorize unrelated actions. As routine checks become explicit, human attention moves toward ambiguous intent, policy changes, unusual evidence, and meaningful exceptions.",
    },
  },
  {
    id: "page-5",
    kind: "comic",
    title: "The Governed Flock",
    act: "Page V",
    image: "/comics/electric-sheep/pages/page5-v1-2x.png",
    watch: {
      duration: 36,
      narration:
        "One organizational request enters a shared boundary. An orchestrator divides it into durable tasks for a worker, judge, and verifier. Each sheep receives different context, tools, and permissions. Artifacts and evidence move between them until a subtle failure is diverted to the steward. The organization can trace who knew what, changed what, and passed which evidence onward.",
    },
    hotspots: [
      {
        id: "p5-1",
        label: "One shared request",
        caption:
          "The steward defines one durable organizational request at the boundary rather than directing every specialist action.",
        ...panel(72, 76, 906, 952),
        image: "/comics/electric-sheep/panels/page5/01-shared-request.png",
      },
      {
        id: "p5-2",
        label: "Split context",
        caption:
          "The orchestrator divides the request and routes only the relevant task, context, and state to each specialist role.",
        ...panel(1024, 76, 914, 952),
        image: "/comics/electric-sheep/panels/page5/02-split-context.png",
      },
      {
        id: "p5-3",
        label: "Specialist roles",
        caption:
          "Execution, judgment, and verification remain separated so no single role silently performs and certifies the entire task.",
        ...panel(72, 1070, 906, 898),
        image: "/comics/electric-sheep/panels/page5/03-specialist-roles.png",
      },
      {
        id: "p5-4",
        label: "A traceable handoff",
        caption:
          "Artifacts and receipts follow a visible evidence chain until independent verification discovers an exception.",
        ...panel(1024, 1070, 914, 898),
        image: "/comics/electric-sheep/panels/page5/04-evidence-handoff.png",
      },
      {
        id: "p5-5",
        label: "The governed flock",
        caption:
          "Four specialist roles operate inside one shared boundary while the steward can trace the request, artifacts, evidence, and exception.",
        ...panel(72, 2008, 1866, 1052),
        image: "/comics/electric-sheep/panels/page5/05-governed-flock.png",
        video: "/comics/electric-sheep/videos/page5-governed-flock-silent.mp4",
      },
    ],
  },
  {
    id: "bridge-5",
    kind: "bridge",
    title: "Multiplayer Agents Need Shared Intent and Split Context",
    kicker: "Bridge V",
    body: [
      "Several agents do not become an organization merely because they can message one another. Multiplayer work needs durable requests, shared intent, explicit roles, scoped context, permissions, artifacts, evidence, and execution history that the organization—not an individual run—owns.",
      "Role separation changes what each sheep can know and do. The orchestrator sees routing and state. The worker receives the tools and context needed to execute. The judge evaluates against acceptance criteria. The verifier independently checks the evidence. Split context can improve focus and control, but only if provenance survives every handoff.",
      "Specialization also adds coordination cost and new failure modes. Tasks can be lost between roles, context can become stale, and a persuasive judge can repeat the worker’s mistake. The architecture is worthwhile only when separation produces enough control, throughput, or independent evidence to justify that complexity.",
      "At the end of the day, the flock leaves behind more than completed bridges. It leaves requests, artifacts, receipts, exceptions, and execution traces. Those records become the raw material for graph memory: determining what should persist, connect, decay, and resurface during the dream cycle.",
    ],
    quote: "A flock becomes an organization when its intent and evidence survive the individual sheep.",
    watch: {
      duration: 44,
      narration:
        "Multiple agents do not become an organization just because they can communicate. Multiplayer work needs durable requests, shared intent, explicit roles, split context, scoped permissions, artifacts, and evidence owned by the organization. Specialization adds coordination cost, so it is worthwhile only when separation creates enough control, throughput, or independent verification. At day’s end, the flock leaves traces that can become organizational memory.",
    },
  },
  {
    id: "page-6",
    kind: "comic",
    title: "The Dream Cycle",
    act: "Page VI",
    image: "/comics/electric-sheep/pages/page6-v1-2x.png",
    watch: {
      duration: 38,
      narration:
        "At night, the flock rests while its evidence remains. Provenance links requests, artifacts, judgments, and receipts into durable memory. Repeated friction becomes visible as a pattern, producing a proposal rather than a silent rewrite. At dawn, the steward checks the evidence, tests the proposed change, and releases a verified improvement. The next loop begins with a lighter harness, preserved history, and the same visible boundary.",
    },
    hotspots: [
      {
        id: "p6-1",
        label: "Evidence at rest",
        caption:
          "The flock sleeps inside its boundary while completed artifacts and receipts remain available as durable organizational evidence.",
        ...panel(72, 76, 914, 976),
        image: "/comics/electric-sheep/panels/page6/01-evidence-at-rest.png",
      },
      {
        id: "p6-2",
        label: "Provenance becomes memory",
        caption:
          "Requests, artifacts, judgments, and receipts connect without changing the historical records beneath them.",
        ...panel(1024, 76, 912, 976),
        image: "/comics/electric-sheep/panels/page6/02-provenance-memory.png",
        animation: "page6-dream",
      },
      {
        id: "p6-3",
        label: "A recurring pattern",
        caption:
          "Independent traces reveal the same bridge-joint failure repeating across runs, turning accumulated evidence into actionable friction.",
        ...panel(72, 1090, 914, 946),
        image: "/comics/electric-sheep/panels/page6/03-recurring-pattern.png",
      },
      {
        id: "p6-4",
        label: "A reviewable proposal",
        caption:
          "The steward tests a proposed harness improvement while canonical policy and historical evidence remain locked and unchanged.",
        ...panel(1024, 1090, 912, 946),
        image: "/comics/electric-sheep/panels/page6/04-reviewable-proposal.png",
      },
      {
        id: "p6-5",
        label: "The next bounded loop",
        caption:
          "After human review, the verified improvement enters the next loop with its provenance, evidence stations, and authority boundary intact.",
        ...panel(72, 2084, 1864, 976),
        image: "/comics/electric-sheep/panels/page6/05-next-bounded-loop.png",
      },
    ],
  },
  {
    id: "conclusion",
    kind: "conclusion",
    title: "Improving the Source Without Rewriting the Past",
    body: [
      "The dream cycle is graph engineering: traces from real work are consolidated into durable relationships that can reveal repeated friction, exceptions, and opportunities for improvement.",
      "The graph does not silently rewrite policy or history. It produces a provenance-linked proposal that can be tested separately, reviewed against explicit criteria, and released deliberately.",
    ],
    options: [
      {
        title: "Observe the target",
        blurb:
          "Real work produces artifacts, receipts, exceptions, and measurable friction inside a locally governed organization.",
      },
      {
        title: "Propose at the source",
        blurb:
          "Repeated evidence can suggest a change to the reusable harness or workflow without mutating running systems.",
      },
      {
        title: "Test before release",
        blurb:
          "The proposal is evaluated independently, with acceptance criteria and provenance available to its human reviewers.",
      },
      {
        title: "Preserve local authority",
        blurb:
          "Approved improvements can reach future loops while each target retains its own policy, memory, history, and boundaries.",
      },
    ],
    closing:
      "The goal was never a sheep without a shepherd. It was a system that knew when the shepherd was needed.",
    links: [
      {
        label: "Explore Raid Guild Portal",
        href: "https://portal.raidguild.org/",
      },
    ],
    cta: {
      label: "Join Raid Guild Portal",
      href: "https://portal.raidguild.org/join",
    },
    watch: {
      duration: 30,
      narration:
        "The dream cycle turns traces from real work into reviewable proposals. It does not rewrite policy or history. Improvements are tested separately, released deliberately, and adopted without surrendering local authority. The goal was never a sheep without a shepherd. It was a system that knew when the shepherd was needed.",
    },
  },
];

export const electricSheep: Comic = {
  slug: "electric-sheep",
  title: "Do Agents Dream of Electric Sheep?",
  subtitle: "Governance Minification Through Loop Engineering",
  description:
    "A silent woodcut story about prompts, context, agent loops, and moving human attention from constant approval toward meaningful exceptions.",
  cover: "/comics/electric-sheep/concept/cover-concept.png",
  pageRatio: "1003 / 1568",
  topics: ["AI agents", "Governance", "Loop engineering"],
  readingTime: 18,
  publishedAt: "2026-07-27",
  status: "published",
  featured: true,
  spreads,
};
