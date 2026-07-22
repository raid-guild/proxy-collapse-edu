"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SPREADS, type Hotspot, type ComicSpread } from "@/data/comic";
import { CoverView } from "./CoverView";
import { BridgeView } from "./BridgeView";
import { ComicPageView } from "./ComicPageView";
import { ConclusionView } from "./ConclusionView";
import { Lightbox } from "./Lightbox";

type FlipDir = "next" | "prev" | null;

const SWIPE_MIN = 48;
/** Full turn duration — keep in sync with CSS animations */
const FLIP_MS = 780;
const FLIP_SWAP_MS = 390;

export function ComicBook() {
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState<FlipDir>(null);
  const [displayed, setDisplayed] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<Hotspot | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const flipTimer = useRef<number[]>([]);

  const total = SPREADS.length;
  const spread = SPREADS[displayed];
  const nextSpread = incoming != null ? SPREADS[incoming] : null;

  const clearFlipTimers = () => {
    flipTimer.current.forEach((id) => window.clearTimeout(id));
    flipTimer.current = [];
  };

  const goTo = useCallback(
    (nextIdx: number, dir: FlipDir) => {
      if (nextIdx < 0 || nextIdx >= total || nextIdx === index || flip) return;
      clearFlipTimers();
      setIncoming(nextIdx);
      setFlip(dir);
      setIndex(nextIdx);
      flipTimer.current.push(
        window.setTimeout(() => {
          setDisplayed(nextIdx);
        }, FLIP_SWAP_MS),
      );
      flipTimer.current.push(
        window.setTimeout(() => {
          setFlip(null);
          setIncoming(null);
        }, FLIP_MS),
      );
    },
    [total, index, flip],
  );

  useEffect(() => () => clearFlipTimers(), []);

  const next = useCallback(() => goTo(index + 1, "next"), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, "prev"), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        goTo(0, "prev");
      } else if (e.key === "End") {
        goTo(total - 1, "next");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, total, lightbox]);

  const onTouchStart = (e: React.TouchEvent) => {
    if (lightbox) return;
    const t = e.changedTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (lightbox || !touchStart.current || flip) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    // Horizontal swipe wins over vertical scroll intent
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * 1.15) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    <div className="comic-shell">
      <header className="app-header">
        <div className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/raidguild-logo.png"
            alt="Raid Guild"
            className="brand-logo"
            width={168}
            height={44}
          />
          <div className="brand-text">
            <p className="brand-title">Proxy Collapse</p>
            <p className="brand-sub">An interactive comic</p>
          </div>
        </div>
        <nav className="spread-nav" aria-label="Book progress">
          {SPREADS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`dot ${i === index ? "active" : ""} ${s.kind}`}
              aria-label={`Go to ${labelOf(s)}`}
              aria-current={i === index ? "page" : undefined}
              onClick={() => goTo(i, i > index ? "next" : "prev")}
              title={labelOf(s)}
            />
          ))}
        </nav>
      </header>

      <main
        className="stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          className="edge-nav prev"
          onClick={prev}
          disabled={index === 0 || !!flip}
          aria-label="Previous page"
        >
          ‹
        </button>

        <div
          className={`flip-scene ${flip ? `is-flipping flip-${flip}` : ""}`}
          aria-busy={!!flip}
        >
          {/* Page under the turn — next/prev content peeks as the leaf peels away */}
          <div className="flip-stack">
            <div
              className={`flip-sheet flip-sheet--under ${
                flip ? "is-visible" : ""
              }`}
              aria-hidden={!flip}
            >
              {nextSpread && (
                <SpreadContent
                  spread={nextSpread}
                  onBegin={next}
                  onRestart={() => goTo(0, "prev")}
                  onHotspot={setLightbox}
                />
              )}
            </div>

            <div
              className="flip-sheet flip-sheet--leaf"
              style={{ pointerEvents: flip ? "none" : undefined }}
            >
              <div className="flip-leaf-face">
                <SpreadContent
                  spread={spread}
                  onBegin={next}
                  onRestart={() => goTo(0, "prev")}
                  onHotspot={setLightbox}
                />
              </div>
              {/* Curl + shadow overlays ride with the turning leaf */}
              <div className="flip-curl" aria-hidden />
              <div className="flip-edge-light" aria-hidden />
              <div className="flip-cast-shadow" aria-hidden />
            </div>
          </div>
          <div className="flip-floor-shadow" aria-hidden />
        </div>

        <button
          type="button"
          className="edge-nav next"
          onClick={next}
          disabled={index === total - 1 || !!flip}
          aria-label="Next page"
        >
          ›
        </button>
      </main>

      <footer className="app-footer">
        <button type="button" className="text-btn" onClick={prev} disabled={index === 0 || !!flip}>
          Previous
        </button>
        <p className="page-indicator">
          {index + 1} / {total}
          <span className="page-name">{labelOf(SPREADS[index])}</span>
        </p>
        <button
          type="button"
          className="text-btn primary"
          onClick={next}
          disabled={index === total - 1 || !!flip}
        >
          {index === total - 1 ? "End" : "Next page"}
        </button>
      </footer>

      <Lightbox hotspot={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}

function labelOf(s: ComicSpread) {
  switch (s.kind) {
    case "cover":
      return "Cover";
    case "bridge":
      return s.title;
    case "comic":
      return s.title;
    case "conclusion":
      return "Conclusion";
  }
}

function SpreadContent({
  spread,
  onBegin,
  onRestart,
  onHotspot,
}: {
  spread: ComicSpread;
  onBegin: () => void;
  onRestart: () => void;
  onHotspot: (h: Hotspot) => void;
}) {
  switch (spread.kind) {
    case "cover":
      return <CoverView image={spread.image} title={spread.title} onBegin={onBegin} />;
    case "bridge":
      return (
        <BridgeView
          title={spread.title}
          kicker={spread.kicker}
          body={spread.body}
          quote={spread.quote}
        />
      );
    case "comic":
      return (
        <ComicPageView
          image={spread.image}
          title={spread.title}
          act={spread.act}
          hotspots={spread.hotspots}
          onHotspot={onHotspot}
        />
      );
    case "conclusion":
      return (
        <ConclusionView
          title={spread.title}
          body={spread.body}
          options={spread.options}
          closing={spread.closing}
          links={spread.links}
          cta={spread.cta}
          sourceNote={spread.sourceNote}
          onRestart={onRestart}
        />
      );
  }
}
