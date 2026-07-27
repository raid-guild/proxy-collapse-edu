import type { Comic } from "@/lib/comic-types";
import { electricSheep } from "./electric-sheep";
import { proxyCollapse } from "./proxy-collapse";

export const comics: Comic[] = [proxyCollapse, electricSheep];

export const publishedComics = comics.filter((comic) => comic.status === "published");

/** Drafts are readable by direct URL during local development, but never in production. */
const readableComics = process.env.NODE_ENV === "development" ? comics : publishedComics;

export function getComic(slug: string) {
  return readableComics.find((comic) => comic.slug === slug);
}
