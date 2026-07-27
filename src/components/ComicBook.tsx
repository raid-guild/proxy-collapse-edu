"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import type { Comic, Hotspot, ComicSpread } from "@/lib/comic-types";
import { CoverView } from "./CoverView";
import { BridgeView } from "./BridgeView";
import { ComicPageView } from "./ComicPageView";
import { ConclusionView } from "./ConclusionView";
import { Lightbox } from "./Lightbox";

type FlipDir = "next" | "prev" | null;
type ExperienceMode = "read" | "watch";

const SWIPE_MIN = 48;
/** Full turn duration — keep in sync with CSS animations */
const FLIP_MS = 780;
const FLIP_SWAP_MS = 390;

export function ComicBook({ comic }: { comic: Comic }) {
  const spreads = comic.spreads;
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState<FlipDir>(null);
  const [displayed, setDisplayed] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<Hotspot | null>(null);
  const [mode, setMode] = useState<ExperienceMode>("read");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [captionIndex, setCaptionIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const flipTimer = useRef<number[]>([]);
  const narrationTimer = useRef<number | null>(null);
  const captionTimer = useRef<number | null>(null);
  const narrationAudio = useRef<HTMLAudioElement | null>(null);

  const total = spreads.length;
  const spread = spreads[displayed];
  const nextSpread = incoming != null ? spreads[incoming] : null;
  const watchCue = spreads[displayed].watch;
  const captionChunks = splitNarration(watchCue.narration);
  const activeCaption = captionChunks[Math.min(captionIndex, captionChunks.length - 1)];

  const clearFlipTimers = () => {
    flipTimer.current.forEach((id) => window.clearTimeout(id));
    flipTimer.current = [];
  };

  const stopNarration = useCallback(() => {
    if (narrationTimer.current != null) {
      window.clearTimeout(narrationTimer.current);
      narrationTimer.current = null;
    }
    if (captionTimer.current != null) {
      window.clearInterval(captionTimer.current);
      captionTimer.current = null;
    }
    narrationAudio.current?.pause();
    narrationAudio.current = null;
    window.speechSynthesis?.cancel();
  }, []);

  const goTo = useCallback(
    (nextIdx: number, dir: FlipDir) => {
      if (nextIdx < 0 || nextIdx >= total || nextIdx === index || flip) return;
      clearFlipTimers();
      setIncoming(nextIdx);
      setFlip(dir);
      setIndex(nextIdx);
      setCaptionIndex(0);
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

  const beginWatch = useCallback(() => {
    stopNarration();
    setCaptionIndex(0);
    setMode("watch");
    setPlaying(true);
  }, [stopNarration]);

  const selectReadMode = useCallback(() => {
    stopNarration();
    setPlaying(false);
    setMode("read");
  }, [stopNarration]);

  const beginRead = useCallback(() => {
    selectReadMode();
    next();
  }, [next, selectReadMode]);

  const selectWatchMode = useCallback(() => {
    setCaptionIndex(0);
    setMode("watch");
  }, []);

  const togglePlayback = useCallback(() => {
    setMode("watch");
    setPlaying((value) => {
      if (!value) setCaptionIndex(0);
      return !value;
    });
  }, []);

  useEffect(() => {
    stopNarration();
    if (mode !== "watch" || !playing || flip || lightbox) return;

    let active = true;
    const cue = spreads[displayed].watch;
    const chunks = splitNarration(cue.narration);
    const advance = () => {
      if (!active) return;
      active = false;
      stopNarration();
      if (displayed >= total - 1) {
        setPlaying(false);
        return;
      }
      goTo(displayed + 1, "next");
    };
    const scheduleTimedFallback = () => {
      if (!active || narrationTimer.current != null) return;
      narrationTimer.current = window.setTimeout(advance, cue.duration * 1000);
    };

    if (chunks.length > 1) {
      const captionMs = (cue.duration * 1000) / chunks.length;
      captionTimer.current = window.setInterval(() => {
        setCaptionIndex((value) => Math.min(value + 1, chunks.length - 1));
      }, captionMs);
    }

    if (!muted && cue.audio) {
      const audio = new Audio(cue.audio);
      narrationAudio.current = audio;
      audio.onended = advance;
      audio.onerror = scheduleTimedFallback;
      audio.play().catch(scheduleTimedFallback);
    } else if (!muted && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(cue.narration);
      utterance.rate = 0.95;
      utterance.onend = advance;
      utterance.onerror = (event) => {
        if (event.error !== "canceled" && event.error !== "interrupted") {
          scheduleTimedFallback();
        }
      };
      // Some browsers expose speech synthesis but never emit completion.
      // Keep the authored cue duration as a watchdog so Watch mode advances.
      scheduleTimedFallback();
      window.speechSynthesis.speak(utterance);
    } else {
      scheduleTimedFallback();
    }

    return () => {
      active = false;
      stopNarration();
    };
  }, [displayed, flip, goTo, lightbox, mode, muted, playing, spreads, stopNarration, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) return;
      if (e.key === " " && mode === "watch") {
        e.preventDefault();
        togglePlayback();
      } else if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
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
  }, [next, prev, goTo, total, lightbox, mode, togglePlayback]);

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
    <div
      className={`comic-shell ${mode === "watch" ? "watch-mode" : "read-mode"}`}
      style={
        comic.pageRatio
          ? ({ "--page-ratio": comic.pageRatio } as CSSProperties)
          : undefined
      }
    >
      <header className="app-header">
        <Link className="library-back-link" href="/" aria-label="Back to comic library">
          <span aria-hidden>←</span> Library
        </Link>
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
            <p className="brand-title">{comic.title}</p>
            <p className="brand-sub">An interactive comic</p>
          </div>
        </div>
        <div className="mode-switch" role="group" aria-label="Story mode">
          <button
            type="button"
            className={mode === "read" ? "active" : ""}
            aria-pressed={mode === "read"}
            onClick={selectReadMode}
          >
            Read
          </button>
          <button
            type="button"
            className={mode === "watch" ? "active" : ""}
            aria-pressed={mode === "watch"}
            onClick={selectWatchMode}
          >
            Watch
          </button>
        </div>
        <nav className="spread-nav" aria-label="Book progress">
          {spreads.map((s, i) => (
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
                  onBegin={beginRead}
                  onWatch={beginWatch}
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
                  onBegin={beginRead}
                  onWatch={beginWatch}
                  onRestart={() => goTo(0, "prev")}
                  onHotspot={(hotspot) => {
                    if (mode === "watch") setPlaying(false);
                    setLightbox(hotspot);
                  }}
                />
              </div>
              {/* Curl + shadow overlays ride with the turning leaf */}
              <div className="flip-curl" aria-hidden />
              <div className="flip-edge-light" aria-hidden />
              <div className="flip-cast-shadow" aria-hidden />
            </div>
          </div>
          <div className="flip-floor-shadow" aria-hidden />
          {mode === "watch" && (
            <div className={`watch-caption ${playing ? "is-playing" : "is-paused"}`}>
              <span className="watch-caption-label">
                {playing ? "Narration" : "Paused"}
              </span>
              <p aria-live="polite">{activeCaption}</p>
            </div>
          )}
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
        <div className="footer-center">
          <p className="page-indicator">
            {index + 1} / {total}
            <span className="page-name">{labelOf(spreads[index])}</span>
          </p>
          {mode === "watch" && (
            <div className="watch-controls" role="group" aria-label="Narration controls">
              <button type="button" onClick={togglePlayback} aria-pressed={playing}>
                <span aria-hidden>{playing ? "❚❚" : "▶"}</span>
                {playing ? "Pause" : "Play"}
              </button>
              <button type="button" onClick={() => setMuted((value) => !value)} aria-pressed={muted}>
                <span aria-hidden>{muted ? "🔇" : "🔊"}</span>
                {muted ? "Voice off" : "Voice on"}
              </button>
              {!watchCue.audio && <span className="voice-preview">Voice preview</span>}
            </div>
          )}
        </div>
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
  onWatch,
  onRestart,
  onHotspot,
}: {
  spread: ComicSpread;
  onBegin: () => void;
  onWatch: () => void;
  onRestart: () => void;
  onHotspot: (h: Hotspot) => void;
}) {
  switch (spread.kind) {
    case "cover":
      return (
        <CoverView
          image={spread.image}
          title={spread.title}
          onBegin={onBegin}
          onWatch={onWatch}
        />
      );
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

function splitNarration(narration: string) {
  return narration.match(/[^.!?]+[.!?]+(?:[”'\"])?|[^.!?]+$/g)?.map((part) => part.trim()) ?? [narration];
}
