"use client";

import type { Hotspot } from "@/lib/comic-types";
import { PageStage } from "./PageStage";

type Props = {
  image: string;
  title: string;
  act?: string;
  hotspots: Hotspot[];
  onHotspot: (h: Hotspot) => void;
};

export function ComicPageView({ image, title, act, hotspots, onHotspot }: Props) {
  return (
    <figure className="spread-figure">
      <PageStage>
        <div className="comic-page-layer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} className="comic-page-image" draggable={false} />
          {hotspots.map((h) => (
            <button
              key={h.id}
              type="button"
              className="hotspot"
              style={{
                left: `${h.left}%`,
                top: `${h.top}%`,
                width: `${h.width}%`,
                height: `${h.height}%`,
              }}
              aria-label={
                h.video || h.animation
                  ? `Open animation: ${h.label}`
                  : `Open panel: ${h.label}`
              }
              title={h.label}
              onClick={(e) => {
                e.stopPropagation();
                onHotspot(h);
              }}
            >
              {(h.video || h.animation) && (
                <span className="hotspot-play" aria-hidden />
              )}
            </button>
          ))}
        </div>
      </PageStage>
      <figcaption className="spread-caption">
        {act && <span className="act-tag">{act}</span>}
        <span>{title}</span>
        <span className="hint">
          Tap a panel to zoom
          {hotspots.some((h) => h.video || h.animation) ? " or play" : ""}
        </span>
      </figcaption>
    </figure>
  );
}
