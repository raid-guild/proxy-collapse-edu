"use client";

import { PageStage } from "./PageStage";

type Props = {
  image: string;
  title: string;
  onBegin: () => void;
  onWatch: () => void;
};

export function CoverView({ image, title, onBegin, onWatch }: Props) {
  return (
    <figure className="spread-figure">
      <PageStage className="page-stage--cover">
        <button type="button" className="cover-hit" onClick={onBegin} aria-label="Open the book">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} className="cover-fill" draggable={false} />
        </button>
      </PageStage>
      <figcaption className="spread-caption">
        <div className="cover-actions">
          <button type="button" className="begin-btn" onClick={onBegin}>
            Read the story
          </button>
          <button type="button" className="begin-btn begin-btn--watch" onClick={onWatch}>
            <span aria-hidden>▶</span> Watch the story
          </button>
        </div>
        <p className="hint">Swipe or press →</p>
      </figcaption>
    </figure>
  );
}
