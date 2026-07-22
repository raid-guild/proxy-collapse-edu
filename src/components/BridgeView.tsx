"use client";

import { PageStage } from "./PageStage";
import { RichText } from "./RichText";

type Props = {
  title: string;
  kicker?: string;
  body: string[];
  quote?: string;
};

export function BridgeView({ title, kicker, body, quote }: Props) {
  return (
    <figure className="spread-figure">
      <PageStage className="page-stage--text">
        <article className="text-spread">
          {kicker && <p className="kicker">{kicker}</p>}
          <h1 className="bridge-title">{title}</h1>
          <div className="rule" />
          <div className="bridge-body">
            {body.map((p, i) => (
              <p key={i}>
                <RichText text={p} />
              </p>
            ))}
          </div>
          {quote && (
            <blockquote className="bridge-quote">
              <span className="diamond" aria-hidden>
                ◆
              </span>
              <RichText text={quote} />
              <span className="diamond" aria-hidden>
                ◆
              </span>
            </blockquote>
          )}
        </article>
      </PageStage>
      <figcaption className="spread-caption">
        <span className="hint">Swipe to continue</span>
      </figcaption>
    </figure>
  );
}
