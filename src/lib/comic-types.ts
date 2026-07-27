export type Hotspot = {
  id: string;
  label: string;
  /** One-sentence caption for image lightboxes. */
  caption: string;
  left: number;
  top: number;
  width: number;
  height: number;
  image: string;
  video?: string;
};

export type WatchCue = {
  /** Approximate fallback length when audio is muted or unavailable. */
  duration: number;
  /** Spoken script and the accessible on-screen caption. */
  narration: string;
  /** Optional recorded narration. Falls back to browser voice preview. */
  audio?: string;
};

export type ComicSpread =
  | {
      id: string;
      kind: "cover";
      title: string;
      image: string;
      watch: WatchCue;
    }
  | {
      id: string;
      kind: "bridge";
      title: string;
      kicker?: string;
      body: string[];
      quote?: string;
      watch: WatchCue;
    }
  | {
      id: string;
      kind: "comic";
      title: string;
      act: string;
      image: string;
      hotspots: Hotspot[];
      watch: WatchCue;
    }
  | {
      id: string;
      kind: "conclusion";
      title: string;
      body: string[];
      options: { title: string; blurb: string }[];
      closing: string;
      links: { label: string; href: string }[];
      cta: { label: string; href: string };
      sourceNote?: string;
      watch: WatchCue;
    };

export type ComicStatus = "published" | "coming-soon" | "draft";

export type Comic = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  /** CSS aspect-ratio used by every physical spread in this comic. */
  pageRatio?: string;
  topics: string[];
  readingTime: number;
  publishedAt: string;
  status: ComicStatus;
  featured?: boolean;
  spreads: ComicSpread[];
};
