/** Inline markdown-lite: [label](https://url) → external link */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return <span key={i}>{part}</span>;
        return (
          <a
            key={i}
            href={m[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            {m[1]}
          </a>
        );
      })}
    </>
  );
}
