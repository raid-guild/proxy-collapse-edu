import { ComicCard } from "@/components/library/ComicCard";
import { publishedComics } from "@/content/comics";

export default function Home() {
  const featured = publishedComics.find((comic) => comic.featured) ?? publishedComics[0];
  const remaining = publishedComics.filter((comic) => comic.slug !== featured?.slug);

  return (
    <main className="library-shell">
      <header className="library-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/raidguild-logo.png" alt="Raid Guild" className="library-logo" />
        <p className="library-kicker">Raid Guild illustrated field notes</p>
        <h1>Comics for complicated ideas.</h1>
        <p className="library-intro">
          Short, interactive stories about technology, coordination, education, and the
          strange systems we build together.
        </p>
      </header>

      {featured && (
        <section className="library-feature" aria-label="Featured comic">
          <ComicCard comic={featured} featured />
        </section>
      )}

      {remaining.length > 0 && (
        <section className="library-collection" aria-labelledby="all-comics-heading">
          <div className="library-section-heading">
            <p>Browse the collection</p>
            <h2 id="all-comics-heading">All comics</h2>
          </div>
          <div className="library-grid">
            {remaining.map((comic) => (
              <ComicCard key={comic.slug} comic={comic} />
            ))}
          </div>
        </section>
      )}

      <section className="library-coming-soon" aria-labelledby="coming-soon-heading">
        <p>Issue 02</p>
        <h2 id="coming-soon-heading">More field notes are being drawn.</h2>
        <span>New comics will appear here as the library grows.</span>
      </section>
    </main>
  );
}
