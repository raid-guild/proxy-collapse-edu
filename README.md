# Proxy Collapse — Interactive Comic

Next.js app: one-page-at-a-time comic book with page-flip transitions, narrative bridges, and panel lightboxes (image or video).

## Flow

1. **Cover**
2. **Bridge** — concept intro
3. **Page 1** — The Collapse
4. **Bridge** — “the old way worked”
5. **Page 2** — The Old Ways (with hood transform hotspots)
6. **Bridge** — redesign pivot
7. **Page 3** — The Redesign
8. **Conclusion** — four options + closing line

## Dev

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Controls

- **Next / Previous** buttons or `→` / `←` / Space
- Progress dots in the header jump to a spread
- **Click a panel** on comic pages for lightbox (video when available)

## Assets

Under `public/comic/`:

- `pages/` — cover + full page JPEGs
- `panels/page{1,2,3}/` — per-panel stills
- `videos/` — optional panel animations

Content and hotspot geometry live in `src/data/comic.ts`.

## Railway

The app is ready for Railway's Railpack builder. Railway installs dependencies,
runs `npm run build`, and starts the production server with `npm start`.

To deploy this directory to the linked service:

```bash
railway up
```

No application environment variables are required. Railway provides `PORT`,
which the Next.js production server reads automatically.
