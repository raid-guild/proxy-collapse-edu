"use client";

import { PageStage } from "./PageStage";

type Props = {
  image: string;
  title: string;
  onBegin: () => void;
};

export function CoverView({ image, title, onBegin }: Props) {
  return (
    <figure className="spread-figure">
      <PageStage className="page-stage--cover">
        <button type="button" className="cover-hit" onClick={onBegin} aria-label="Open the book">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} className="cover-fill" draggable={false} />
        </button>
      </PageStage>
      <figcaption className="spread-caption">
        <button type="button" className="begin-btn" onClick={onBegin}>
          Open the book
        </button>
        <p className="hint">Swipe or press →</p>
      </figcaption>
    </figure>
  );
}
