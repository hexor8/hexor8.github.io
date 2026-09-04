# Editing site content

The site's text/links/images/videos live in **`content.json`**, not in any
HTML file. `js/content-loader.js` fetches it, then `js/render.js` builds
the page from it — the same way `content.js` used to work before this file
replaced it (see `admin-worker/` for why: that's a small backend that lets
routine additions happen through a web form instead of a hand edit + git
push each time).

## Two ways to change content

- **Routine additions** (a new Edit, a new banner/thumbnail, a new tool, a
  new free Shop download) — use the admin panel (`admin-worker/`, deployed
  as a Cloudflare Worker). Log in, fill the form, done — it commits
  straight to the repo and the file upload goes with it.
- **Everything else** (rewriting the hero copy, tweaking commission terms,
  restructuring a section, anything the admin panel doesn't have a form
  for) — hand-edit `content.json` directly. It's plain JSON: keep the
  quotes, keep the commas, copy an existing `{ ... }` block to add a new
  one of the same shape.

## Sections in content.json

- `brand`, `nav` — site name, top nav labels, nav icon image
- `hero` — the big intro at the top (heading, experience line, skills tags)
- `watchMyStuff` — intro line + category buttons above Professional Video
  Editing / GFX / Edits
- `animeEdits` — displays as "Edits" — YouTube video entries (`id` is the
  part of the YouTube URL after `v=`, `title` is shown as the caption)
- `talkingHead` — displays as "Professional Video Editing" — uploaded video
  files (`src` points into `assets/videos/`)
- `gfx` — `banners.items` and `thumbnails.items`, each `{ src, alt }`
  pointing into `assets/images/BANNER/` or `assets/images/THUMBNAILS/`
- `aboutMe` — just the outer label/heading for the section that wraps
  `myStory`, `legal.terms*`, and `legal.privacy*` below
- `myStory` — the bio text (blank line between paragraphs = paragraph
  break; only the first paragraph shows until "Read More" is clicked)
- `tools` — software/skills list, each `{ icon, name, desc }`
- `socials` — social links (`icon` must be `youtube`/`instagram`/`discord`
  or it falls back to a plain dot icon)
- `shop` — `freeCategories` (each `{ label, items }`) and `paidCategories`
  (still just labels — Paid Products has no real items or payment method
  yet, everything there renders as "Coming Soon")
- `scraps` — the small bonus section, currently empty
- `commission` — displays as "Hire Me": the 4-step "How Commissions Work",
  the 6-step "Your Process", the terms accordion, the disguised Google
  Form's field-id mapping (`customForm`), and the contact links
- `legal` — Terms & Conditions / Privacy Policy, each a list of
  `{ heading, text }` sections (first one visible, rest behind "Read Full
  Policy"), plus the downloadable `.txt` file paths under `assets/legal/`
- `footer` — the copyright line

## The Google Form coupling (read before editing `commission.customForm`)

The disguised commission form submits straight to the real Google Form's
`formResponse` endpoint using the entry IDs and dropdown option text
recorded in `commission.customForm`. If the live Google Form's questions
or option wording change, these need re-extracting to match — a mismatched
dropdown value gets silently rejected by Google (this happened once
already: the live form has a typo, "Professional **yalking** head videos",
and the dropdown option here must match it exactly).
