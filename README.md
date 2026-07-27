# Raid Guild Comics

Next.js app for a growing library of interactive Raid Guild comics. Each comic
uses the shared one-page-at-a-time reader with page-flip transitions, narrative
bridges, and panel lightboxes (image or video).

## Routes

- `/` — comic library
- `/comics/[slug]` — shared reader for a published comic
- `/comics/proxy-collapse` — the first published comic

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

Each comic owns an asset directory under `public/comics/[slug]/`. Proxy
Collapse uses `public/comics/proxy-collapse/`:

- `pages/` — cover + full page JPEGs
- `panels/page{1,2,3}/` — per-panel stills
- `videos/` — optional panel animations

Shared content types live in `src/lib/comic-types.ts`. Comic definitions live
under `src/content/comics/` and are published through the registry in
`src/content/comics/index.ts`.

To add a comic:

1. Add its namespaced media under `public/comics/[slug]/`.
2. Create a typed comic definition in `src/content/comics/[slug].ts`.
3. Add it to the registry in `src/content/comics/index.ts`.
4. Set `status: "published"` when it is ready for the library and dynamic route.

## Watch mode and narration

The header and cover offer **Read** and **Watch** modes. Watch mode advances
through the eight spreads, speaks each spread's short narration script, and
shows synchronized caption chunks. Until recorded narration is available, it
uses the browser's built-in voice as a production preview.

Watch cues live beside each spread in its comic definition:

```ts
watch: {
  duration: 28,
  narration: "The spoken script and accessible caption text.",
  audio: "/comics/proxy-collapse/narration/bridge-1.mp3", // optional
}
```

To replace the preview voice, put an MP3, M4A, or browser-compatible audio file
under the comic's `narration/` directory, set its `audio` path on the matching cue, and
adjust `duration` to the recording's length in seconds. Recorded cues and
preview cues can be mixed, so narration can be added one spread at a time.

## Railway

The app is ready for Railway's Railpack builder. Railway installs dependencies,
runs `npm run build`, and starts the production server with `npm start`.

To deploy this directory to the linked service:

```bash
railway up
```

No application environment variables are required. Railway provides `PORT`,
which the Next.js production server reads automatically.
