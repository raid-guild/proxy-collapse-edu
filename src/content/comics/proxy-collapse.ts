import type { Comic, ComicSpread } from "@/lib/comic-types";

/**
 * Proxy Collapse — interactive comic book content.
 *
 * Spreads: cover → bridge → page1 → bridge → page2 → bridge → page3 → conclusion
 * Hotspot rects use *framed* panel bounds (includes double-rule border), % of 1600×1994 page.
 */

/** Page canvas (matches assembled JPEGs). */
export const PAGE_ASPECT = 1600 / 1994;

const PAGE_W = 1600;
const PAGE_H = 1994;
const FRAME_PAD = 12;
const MARGIN = 40 + FRAME_PAD; // 52
const GUTTER = 14 + 2 * FRAME_PAD; // 38
const CELL = 473;
const BOTTOM_W = 729;
const BOTTOM_H = 838;

function pct(x: number, y: number, w: number, h: number) {
  return {
    left: (x / PAGE_W) * 100,
    top: (y / PAGE_H) * 100,
    width: (w / PAGE_W) * 100,
    height: (h / PAGE_H) * 100,
  };
}

/** Framed panel bounds (outer double-rule edge) for 3-3-2 grid. */
function framedCell(col: 0 | 1 | 2, row: 0 | 1) {
  const x = MARGIN + col * (CELL + GUTTER) - FRAME_PAD;
  const y = MARGIN + row * (CELL + GUTTER) - FRAME_PAD;
  const s = CELL + 2 * FRAME_PAD;
  return pct(x, y, s, s);
}

function framedTall(col: 0 | 1) {
  const x = MARGIN + col * (BOTTOM_W + GUTTER) - FRAME_PAD;
  const y = MARGIN + 2 * (CELL + GUTTER) - FRAME_PAD;
  return pct(x, y, BOTTOM_W + 2 * FRAME_PAD, BOTTOM_H + 2 * FRAME_PAD);
}

/** Page 3 expanded 3+2 layout (no redundant punchline row). */
function page3Top(col: 0 | 1 | 2) {
  const row1H = 728;
  const x = MARGIN + col * (CELL + GUTTER) - FRAME_PAD;
  const y = MARGIN - FRAME_PAD;
  return pct(x, y, CELL + 2 * FRAME_PAD, row1H + 2 * FRAME_PAD);
}

function page3Bot(col: 0 | 1) {
  const row1H = 728;
  const row2H = 1094;
  const y2 = MARGIN + row1H + GUTTER;
  const x = MARGIN + col * (BOTTOM_W + GUTTER) - FRAME_PAD;
  const y = y2 - FRAME_PAD;
  return pct(x, y, BOTTOM_W + 2 * FRAME_PAD, row2H + 2 * FRAME_PAD);
}

const spreads: ComicSpread[] = [
  {
    id: "cover",
    kind: "cover",
    title: "Proxy Collapse",
    image: "/comics/proxy-collapse/pages/cover.jpg",
    watch: {
      duration: 7,
      narration:
        "Proxy Collapse. What happens when artificial intelligence makes the artifact cheap, but the understanding behind it still matters?",
    },
  },
  {
    id: "bridge-1",
    kind: "bridge",
    title: "The Quiet Bargain",
    kicker: "Before we begin",
    body: [
      "There is a quiet bargain inside a lot of serious work: the thing you turn in is not the thing we actually care about.",
      "A reflection paper, a vow, a manifesto — nobody needs another two pages of tidy prose. The document is supposed to stand in for something harder to see: did you read, think, connect the idea to your own experience, and come away able to say something back?",
      "For a long time that bargain mostly held, because faking the artifact still took work. The submitted document was never the same as understanding. It was a proxy — just a proxy with a cost attached.",
    ],
    quote:
      "The submitted document was never the same thing as understanding. It was a proxy.",
    watch: {
      duration: 28,
      narration:
        "There is a quiet bargain inside a lot of serious work. The thing you turn in is not the thing we actually care about. A reflection, vow, or manifesto is supposed to show that you read, thought, and connected an idea to your experience. The document was never understanding itself. It was a proxy, but for a long time it was a proxy with a cost attached.",
    },
  },
  {
    id: "page-1",
    kind: "comic",
    title: "The Collapse",
    act: "Act I",
    image: "/comics/proxy-collapse/pages/page1.jpg",
    watch: {
      duration: 17,
      narration:
        "Then the cost collapses. The initiate can generate a flawless vow in seconds. The Gatekeeper receives polished words without the thought, struggle, or commitment those words used to signal. The artifact survives, but its value as evidence does not.",
    },
    hotspots: [
      {
        id: "p1-1",
        label: "Pile of Vow Resumes",
        caption:
          "Identical scrolls stack up on the desk — every initiate’s vow looks perfect, and exactly the same.",
        ...framedCell(0, 0),
        image: "/comics/proxy-collapse/panels/page1/gatekepper-pile-resumes.jpg",
      },
      {
        id: "p1-2",
        label: "Nervous initiate",
        caption:
          "A new applicant waits for judgment, hoping the paper will speak for a heart that never wrote it.",
        ...framedCell(1, 0),
        image: "/comics/proxy-collapse/panels/page1/nerveous-initiate.jpg",
      },
      {
        id: "p1-3",
        label: "Laptop generation",
        caption:
          "In seconds, a glowing laptop drafts a flawless Vow Resume from a few empty bullet points.",
        ...framedCell(2, 0),
        image: "/comics/proxy-collapse/panels/page1/laptop.jpg",
      },
      {
        id: "p1-4",
        label: "Hand-off",
        caption:
          "The initiate presents the scroll with pride, as if the words were earned rather than generated.",
        ...framedCell(0, 1),
        image: "/comics/proxy-collapse/panels/page1/handoff.jpg",
      },
      {
        id: "p1-5",
        label: "Gatekeeper reads",
        caption:
          "The Gatekeeper studies the vow carefully, searching for devotion between the polished lines.",
        ...framedCell(1, 1),
        image: "/comics/proxy-collapse/panels/page1/gatekeeper-reading-resume.jpg",
        video: "/comics/proxy-collapse/videos/gatekeeper-frustrated.mp4",
      },
      {
        id: "p1-6",
        label: "Relief",
        caption:
          "For a moment it seems to work — a soft smile, the relief of a signal that still feels true.",
        ...framedCell(2, 1),
        image: "/comics/proxy-collapse/panels/page1/happy-initiate.jpg",
      },
      {
        id: "p1-7",
        label: "AI tells",
        caption:
          "Then the tells appear: chatbot polish, optional poetry, and a vow that never belonged to anyone.",
        ...framedTall(0),
        image: "/comics/proxy-collapse/panels/page1/aitells.jpg",
      },
      {
        id: "p1-8",
        label: "Caught",
        caption:
          "Proxy collapse lands in the room — the shrug of someone who outsourced the only proof that mattered.",
        ...framedTall(1),
        image: "/comics/proxy-collapse/panels/page1/shrgging-initiate.jpg",
      },
    ],
  },
  {
    id: "bridge-2",
    kind: "bridge",
    title: "When the Proxy Collapses",
    kicker: "Bridge",
    body: [
      "[Adam Kerpelman](https://www.linkedin.com/in/adamkerpelman/) put a name to the breakage: proxy collapse. AI makes the old proxy cheap enough that it stops proving what it used to prove.",
      "That lands harder than the usual cheating panic. The issue is not simply that anyone can generate text — it is that a format we already used indirectly has become too weak to carry the weight we put on it.",
      "If assessment depends on polished prose as evidence that understanding happened, the signal is compromised. The old artifact can be produced without the old path.",
    ],
    quote:
      '[Kerp](https://www.linkedin.com/in/adamkerpelman/): "The AI breaks the thing where it used to be too costly to fake things."',
    watch: {
      duration: 25,
      narration:
        "Adam Kerpelman gave this breakage a name: proxy collapse. Artificial intelligence makes the old proxy cheap enough that it stops proving what it used to prove. This is more than a cheating problem. If polished prose is our evidence that understanding happened, the signal is compromised. The old artifact can now be produced without the old path.",
    },
  },
  {
    id: "page-2",
    kind: "comic",
    title: "The Old Ways",
    act: "Act II",
    image: "/comics/proxy-collapse/pages/page2.jpg",
    watch: {
      duration: 15,
      narration:
        "One response is to make the signal painfully expensive again: hot coals, glowing cubes, branding irons, and a hood that erases your face. These rites are hard to fake. They are also an absurd answer to a design problem.",
    },
    hotspots: [
      {
        id: "p2-1",
        label: "Hot coals invitation",
        caption:
          "Before cheap words, devotion was tested in the body — the Gatekeeper points toward the fire.",
        ...framedCell(0, 0),
        image: "/comics/proxy-collapse/panels/page2/1-old-ways.png",
        video: "/comics/proxy-collapse/videos/hot-coals.mp4",
      },
      {
        id: "p2-2",
        label: "Stepping on",
        caption:
          "Bare feet meet the coals: an initiation you cannot prompt, paste, or polish.",
        ...framedCell(1, 0),
        image: "/comics/proxy-collapse/panels/page2/2-stepping-on.png",
        video: "/comics/proxy-collapse/videos/stepping-on.mp4",
      },
      {
        id: "p2-3",
        label: "Owie!",
        caption:
          "Pain is an honest signal — the initiate hops, and the ritual still holds.",
        ...framedCell(2, 0),
        image: "/comics/proxy-collapse/panels/page2/3-owie.png",
        video: "/comics/proxy-collapse/videos/hopping-owie.mp4",
      },
      {
        id: "p2-4",
        label: "Hand over the cube",
        caption:
          "Next comes the glowing cube — a trial of will that cannot be completed by proxy.",
        ...framedCell(0, 1),
        image: "/comics/proxy-collapse/panels/page2/4-hand-over-box.png",
      },
      {
        id: "p2-5",
        label: "Hand in the cube",
        caption:
          "The hand goes in; whatever burns inside, the commitment is witnessed live.",
        ...framedCell(1, 1),
        image: "/comics/proxy-collapse/panels/page2/5-hand-in-box.png",
        video: "/comics/proxy-collapse/videos/hand-in-box.mp4",
      },
      {
        id: "p2-6",
        label: "Raised brand",
        caption:
          "A brand rises — marks that once meant you stood for the words you claimed.",
        ...framedCell(2, 1),
        image: "/comics/proxy-collapse/panels/page2/6-raised-brand.png",
      },
      {
        id: "p2-7",
        label: "Brand that tickles",
        caption:
          "Even the sting becomes a story — funny later, but impossible to fake in the moment.",
        ...framedTall(0),
        image: "/comics/proxy-collapse/panels/page2/7-brand-that-tickels.png",
        video: "/comics/proxy-collapse/videos/brand-tickels.mp4",
      },
      {
        id: "p2-8",
        label: "Hood descends",
        caption:
          "Face, shadow, void: the hood comes down and a private self becomes the Order’s mask.",
        ...framedTall(1),
        image: "/comics/proxy-collapse/panels/page2/hood-triptych.jpg",
        video: "/comics/proxy-collapse/videos/hood-goes-on.mp4",
      },
    ],
  },
  {
    id: "bridge-3",
    kind: "bridge",
    title: "We Don't Have to Go Back",
    kicker: "After the absurd rites",
    body: [
      "Yes — the Guild could restore signal the hard way: hot coals, branding irons, glowing cubes, and a hood that erases your face. Those tests are costly to fake. They also hurt. (The page you just saw is the joke version of a real temptation: if writing is free, escalate the pain until the proxy works again.)",
      "We do not have to walk on coals. Detection asks: did they use AI to make this artifact? Design asks: what interaction or defense would show the understanding we actually care about?",
      "Once production is cheap, explanation gets more valuable — process, follow-ups, revision, and the ability to stand behind the claim without setting anyone on fire.",
    ],
    quote:
      "But we don't have to go back to the old ways. When writing is free, we redesign the test.",
    watch: {
      duration: 28,
      narration:
        "We do not have to go back. Detection asks whether someone used artificial intelligence to make the artifact. Design asks what interaction would reveal the understanding we actually care about. Once production is cheap, explanation becomes more valuable: process, follow-up questions, revision, and the ability to stand behind a claim without setting anyone on fire.",
    },
  },
  {
    id: "page-3",
    kind: "comic",
    title: "The Redesign",
    act: "Act III",
    image: "/comics/proxy-collapse/pages/page3.jpg",
    watch: {
      duration: 20,
      narration:
        "So we redesign the gate. Ask for an oral defense. Use artificial intelligence together in the open. Think aloud while working, or make the process visible. When the scroll is cheap, judgment and explanation become the evidence.",
    },
    hotspots: [
      {
        id: "p3-1",
        label: "Oral Defense",
        caption:
          "Say the vow out loud — follow-up questions expose who understands the commitment and who only pasted it.",
        ...page3Top(0),
        image: "/comics/proxy-collapse/panels/page3/04-oral-defense.jpg",
      },
      {
        id: "p3-2",
        label: "Live AI collaboration",
        caption:
          "Use the model in the open, then critique and improve it on the spot to prove you can steer the tool.",
        ...page3Top(1),
        image: "/comics/proxy-collapse/panels/page3/05-live-ai-collab.jpg",
      },
      {
        id: "p3-3",
        label: "Think-aloud",
        caption:
          "Narrate the reasoning while you write — genuine thought sounds different from pure prompting.",
        ...page3Top(2),
        image: "/comics/proxy-collapse/panels/page3/06-think-aloud.jpg",
      },
      {
        id: "p3-4",
        label: "Witnessed process",
        caption:
          "Compose under watchful hoods so the process itself — not just the artifact — becomes the test.",
        ...page3Bot(0),
        image: "/comics/proxy-collapse/panels/page3/07-witnessed-process.jpg",
      },
      {
        id: "p3-5",
        label: "A fairer test",
        caption:
          "When the scroll is cheap, the guild redesigns the gate — devotion measured by judgment, not paper.",
        ...page3Bot(1),
        image: "/comics/proxy-collapse/panels/page3/08-redesign-close.jpg",
      },
    ],
  },
  {
    id: "conclusion",
    kind: "conclusion",
    title: "Build Another Window",
    body: [
      "The better response is not to mourn the paper. It is to get more honest about what the paper was doing — and to build assessments that survive contact with cheap fluency.",
      "Four paths that move the test closer to real understanding:",
    ],
    options: [
      {
        title: "Oral Defense",
        blurb:
          "Explain the vows out loud. Follow-ups probe whether the commitment is real or only rendered.",
      },
      {
        title: "Live AI-Collaboration Test",
        blurb:
          "Use the model in the open, then critique and improve it — prove you can steer the tool, not hide behind it.",
      },
      {
        title: "Recorded Think-Aloud",
        blurb:
          "Narrate the reasoning while writing. Genuine thought sounds different from pure prompting.",
      },
      {
        title: "Witnessed Process",
        blurb:
          "Compose under observation or version history so the path — not just the artifact — is visible.",
      },
    ],
    closing:
      "The work now is to build assessments that can survive contact with cheap fluency.",
    links: [
      {
        label: "Read the Portal post",
        href: "https://portal.raidguild.org/posts/proxy-collapse-came-for-the-reflection-paper",
      },
      {
        label: "Watch the fireside (YouTube)",
        href: "https://youtu.be/LNOk_voJNkg",
      },
      {
        label: "Session page on Portal",
        href: "https://portal.raidguild.org/events/53",
      },
    ],
    cta: {
      label: "Join Raid Guild Portal",
      href: "https://portal.raidguild.org/join",
    },
    sourceNote:
      "Source: June Cohort Fireside — How to RaidGuild / Field Experience from the Edge ([Adam Kerpelman](https://www.linkedin.com/in/adamkerpelman/)).",
    watch: {
      duration: 22,
      narration:
        "The better response is not to mourn the paper. It is to get honest about what the paper was doing, and build another window into understanding. Oral defense, live collaboration, recorded thinking, and witnessed process all move the test closer to what matters. The work now is to build assessments that survive contact with cheap fluency.",
    },
  },
];

export const proxyCollapse: Comic = {
  slug: "proxy-collapse",
  title: "Proxy Collapse",
  subtitle: "When the artifact becomes cheap, redesign the test.",
  description:
    "An interactive Raid Guild comic about what happens when polished work stops proving the understanding behind it.",
  cover: "/comics/proxy-collapse/pages/cover.jpg",
  topics: ["Artificial intelligence", "Education", "Assessment design"],
  readingTime: 8,
  publishedAt: "2026-07-27",
  status: "published",
  featured: true,
  spreads,
};
