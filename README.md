# Al-Hayy — Mappila (Kerala Muslim) Housewarming Invitation Site

A single-page, self-hosted housewarming invitation styled after the
printed "Al-Hayy" Nadran cards used for Malabar Muslim housewarmings —
a doorway-arch motif (a threshold, fitting for a new home), kasavu-style
gold borders, and an Islamic star divider. Fully static — no server,
database, or build step. Companion to the Nikah/Walima wedding template —
same structure, so anyone who has edited one can edit the other.

## What's "stunning" about it

- **Opening ceremony**: a full-screen "Open Invitation" entrance before the
  page reveals itself, with the house's name fading in.
- **Hand-drawn doorway arch**: the hero's arch draws itself in on load.
- **Drifting gold dust**: a soft, ambient canvas animation throughout the
  page (auto-disables if the visitor has reduced-motion turned on).
- **Flip-style countdown**: each digit flips like a departure board when it
  changes.
- **Optional background music toggle** (off by default — set
  `music.enabled: true` in `config.js` and add an MP3 to `assets/audio/`).
- Scroll-reveal sections, hover-tilt gallery tiles, fully responsive.

## Files

```
housewarming-invite/
├── index.html      ← page structure (you shouldn't need to touch this)
├── styles.css       ← all design/colour/type — edit only if you want a different look
├── config.js        ← ✏️ EDIT THIS for each family — names, dates, venue, RSVP
├── script.js        ← reads config.js and fills in the page (no need to touch)
├── assets/gallery/  ← drop home photos here
└── README.md
```

## Making a new site for a new family

1. Duplicate this whole folder, e.g. `cp -r housewarming-invite saleem-jaseela-housewarming`.
2. Open **config.js** and fill in:
   - `houseName` — the house's name, shown large (e.g. "Al-Hayy")
   - `heroTagline` — the short line above it (e.g. "Warming Our New Home")
   - `owners.line` — e.g. "Mr. Saleem & Mrs. Jaseela"
   - `memoryNote` — optional, for remembering parents/elders (e.g.
     "(Late Kunjahammed Haji & Khalid KP)"); leave `""` to hide
   - `children` — optional names line; leave `names: []` to hide the card
   - `eventDateISO` — main date shown in the countdown
   - `hijriDate` / `heroTimeNote` — optional Hijri date and time line
   - `events` — add/remove/reorder as many event cards as you like
     (Ceremony, Open House, Dinner, etc.)
   - `venue` — name, address, and `mapQuery` (a plain-text search like
     "Muttiacherry Kadayankot Kerala" works fine — no API key needed)
   - `gallery` — list of photo paths, e.g. `"assets/gallery/home1.jpg"`.
     Leave the array empty to show tasteful placeholder tiles instead.
   - `contact` — a phone number for the "Call Us" button (tap-to-call via
     `tel:`), with an optional `displayLabel` (e.g. "Call Saleem"). No
     backend needed. Leave `phone` empty to hide the section entirely.
   - `complimentsFrom` — the "Best compliments from: ..." footer line
3. Drop real photos of the home into `assets/gallery/` and reference them
   in `config.js`.
4. Open `index.html` in a browser to preview.

## Adapting the design for a different community or region

The palette, type, and motifs live entirely in `styles.css` as CSS custom
properties and a few reusable classes, so a new theme is mostly a copy of
this folder with `styles.css` (and a couple of `index.html` phrases like the
Bismillah line) swapped out:

- **Colour** — edit the `:root` block at the top of `styles.css` (`--green`,
  `--gold`, `--terracotta`, `--ivory`, `--sand`). You can also do this
  per-family without touching CSS, via `paletteOverride` in `config.js`.
- **Signature motif** — the doorway shape is one `<path>` in the hero
  section of `index.html` (`.arch-svg path`). Swap it for a different
  silhouette (e.g. a temple gopuram outline for a Hindu griha pravesh, or a
  simple gabled roofline for a Christian house blessing) and adjust
  `.kasavu-border` / `.star-divider` to motifs appropriate to that theme.
- **Wording** — the Bismillah/dua lines are specific to a Muslim
  housewarming. For other themes replace with what's appropriate (e.g. a
  Sanskrit invocation for a griha pravesh, or a short blessing verse
  reference for a Christian house blessing) — keep any religious phrases
  short, well-known, and respectfully presented rather than reproducing
  lengthy scripture text.
- **Regional touches** — event names, the kasavu border tone (more gold vs
  more silver), and language of family titles. Keep these as config-level
  or copy-level changes rather than rebuilding the layout.

This structure is intentionally kept as separate self-contained folders per
theme (rather than one site with a theme switcher), because it lets each
family's site be fully deliberate rather than a generic template with a
colour swap — and it means one family's edits never risk breaking another's
site.

## Hosting it (all free, all static — pick one)

**Netlify (easiest)**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole folder in. You get a live URL in seconds.
3. Optional: add a custom domain / subdomain under Site settings.

**Vercel**
1. `npm i -g vercel` (once), then from inside the folder run `vercel`.
2. Follow the prompts — no config needed for a static site.

**GitHub Pages**
1. Push the folder's contents to a GitHub repo.
2. Repo Settings → Pages → Deploy from branch → `main` / root.
3. Site is live at `https://<username>.github.io/<repo>/`.

Any of these give you a shareable link and a QR-code-friendly URL you can
put on printed cards too.

## Notes

- No tracking, no analytics, no external calls except Google Fonts and the
  Google Maps embed (both work without an API key).
- Fully responsive and respects `prefers-reduced-motion`.
- If you want a password/guest-list gate, a form that actually saves RSVPs
  to a spreadsheet, or a multi-family admin dashboard instead of editing
  `config.js` by hand, that's a reasonable next step — just ask.
