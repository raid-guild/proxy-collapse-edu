import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComicBook } from "@/components/ComicBook";
import { getComic, publishedComics } from "@/content/comics";

export function generateStaticParams() {
  return publishedComics.map((comic) => ({ slug: comic.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/comics/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const comic = getComic(slug);

  if (!comic) return {};

  return {
    title: comic.title,
    description: comic.description,
    openGraph: {
      title: comic.title,
      description: comic.description,
      type: "article",
      images: [{ url: comic.cover, alt: `${comic.title} cover` }],
    },
  };
}

export default async function ComicPage({ params }: PageProps<"/comics/[slug]">) {
  const { slug } = await params;
  const comic = getComic(slug);

  if (!comic) notFound();

  return <ComicBook comic={comic} />;
}
