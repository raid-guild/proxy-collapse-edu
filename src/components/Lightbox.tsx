"use client";

import { useEffect, useRef } from "react";
import type { Hotspot } from "@/lib/comic-types";
import { LivingWoodcut } from "./LivingWoodcut";

type Props = {
  hotspot: Hotspot | null;
  onClose: () => void;
};

export function Lightbox({ hotspot, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!hotspot) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    const video = videoRef.current;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      video?.pause();
    };
  }, [hotspot, onClose]);

  if (!hotspot) return null;

  const isVideo = Boolean(hotspot.video);
  const isAnimation = Boolean(hotspot.animation);

  return (
    <div
      className="lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={onClose}
    >
      <div
        className={`lightbox-panel ${isAnimation ? "has-animation" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div
          className={`lightbox-media ${
            isVideo ? "is-video" : isAnimation ? "is-animation" : "is-image"
          }`}
        >
          {isVideo ? (
            <video
              ref={videoRef}
              key={hotspot.video + hotspot.id}
              src={hotspot.video}
              controls
              autoPlay
              playsInline
              poster={hotspot.image}
              className="lightbox-video"
            />
          ) : isAnimation ? (
            <LivingWoodcut scene={hotspot.animation!} label={hotspot.label} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={hotspot.image}
              alt={hotspot.label}
              className="lightbox-image"
            />
          )}
        </div>

        {!isVideo && !isAnimation && (
          <footer className="lightbox-caption-block">
            <p id="lightbox-title" className="lightbox-label">
              {hotspot.label}
            </p>
            <p className="lightbox-caption">{hotspot.caption}</p>
          </footer>
        )}

        {(isVideo || isAnimation) && (
          <footer className="lightbox-caption-block">
            <p id="lightbox-title" className="lightbox-label">
              {hotspot.label}
            </p>
            <p className="lightbox-caption">{hotspot.caption}</p>
            <p className="lightbox-hint">
              {isAnimation ? "Live canvas scene" : "Animated panel"} · Esc to close
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}
