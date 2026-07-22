"use client";

import { PageStage } from "./PageStage";
import { RichText } from "./RichText";

type Props = {
  title: string;
  body: string[];
  options: { title: string; blurb: string }[];
  closing: string;
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
  sourceNote?: string;
  onRestart: () => void;
};

export function ConclusionView({
  title,
  body,
  options,
  closing,
  links,
  cta,
  sourceNote,
  onRestart,
}: Props) {
  return (
    <figure className="spread-figure">
      <PageStage className="page-stage--text">
        <article className="text-spread conclusion-spread">
          <p className="kicker">Closing</p>
          <h1 className="bridge-title">{title}</h1>
          <div className="rule" />
          <div className="bridge-body">
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="option-grid">
            {options.map((o) => (
              <li key={o.title} className="option-card">
                <h3>{o.title}</h3>
                <p>{o.blurb}</p>
              </li>
            ))}
          </ul>
          <blockquote className="bridge-quote closing-line">
            <span className="diamond" aria-hidden>
              ◆
            </span>
            {closing}
            <span className="diamond" aria-hidden>
              ◆
            </span>
          </blockquote>

          <div className="cta-block">
            <a className="cta-btn" href={cta.href} target="_blank" rel="noopener noreferrer">
              {cta.label}
            </a>
            <ul className="ref-links">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            {sourceNote && (
              <p className="source-note">
                <RichText text={sourceNote} />
              </p>
            )}
          </div>

          <button type="button" className="begin-btn restart-btn" onClick={onRestart}>
            Read again
          </button>
        </article>
      </PageStage>
      <figcaption className="spread-caption">
        <span className="hint">End of book</span>
      </figcaption>
    </figure>
  );
}
