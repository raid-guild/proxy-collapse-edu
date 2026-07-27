import Link from "next/link";
import type { Comic } from "@/lib/comic-types";

export function ComicCard({ comic, featured = false }: { comic: Comic; featured?: boolean }) {
  return (
    <article className={`library-card ${featured ? "library-card--featured" : ""}`}>
      <Link className="library-cover-link" href={`/comics/${comic.slug}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="library-cover" src={comic.cover} alt={`${comic.title} cover`} />
      </Link>
      <div className="library-card-copy">
        {featured && <p className="library-eyebrow">Featured comic</p>}
        <h2>
          <Link href={`/comics/${comic.slug}`}>{comic.title}</Link>
        </h2>
        <p className="library-subtitle">{comic.subtitle}</p>
        <p className="library-description">{comic.description}</p>
        <ul className="library-topics" aria-label="Topics">
          {comic.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
        <div className="library-card-footer">
          <span>{comic.readingTime} min read</span>
          <Link className="library-read-link" href={`/comics/${comic.slug}`}>
            Read comic <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
