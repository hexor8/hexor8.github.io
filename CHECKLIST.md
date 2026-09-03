# Website Build Checklist

## This is WEBSITE-v2 — a copy, not the original
Per your request, this round of changes (content system + ribbon) was done in a **new copy** of the site at `C:\Users\pritam\Videos\WEBSITE-v2`, so `C:\Users\pritam\Videos\WEBSITE` (the original) is completely untouched. Git history was carried over into the copy, so all prior checkpoints are still there (`git log` shows the full history back to the very first checkpoint). Once you've looked this over and I'm told to proceed, WEBSITE-v2 can become the "real" one — or we can keep iterating here first. Nothing is deleted either way.

## Logo, banner, socials round (latest)
- **Nav logo** → now your real `FINAL RENDER LOGO 2.mp4`, converted (via ffmpeg) to a small looping animated WebP (`assets/images/LOGO ANIMATION/logo-badge.webp`) rather than played as a `<video>`. Reason: Chrome auto-pauses `<video>` elements that render as small as this 30px nav badge as a battery-saving measure — confirmed this was happening (it played briefly then silently stopped every time), so I converted to an animated image instead, which loops reliably at any size. Verified live: it's genuinely animating frame-to-frame and still going after several seconds.
- Your other webp (`LOGO_WEBPAGE.webp`) is left in place but unused — I checked it directly in Chrome at full size and it's solid black with only a couple of stray white pixels, not a usable export. Left untouched in case you want to fix/re-export it yourself.
- **Banner cropping** → fixed by matching the CSS aspect ratio to the banner image's exact pixel dimensions (7680×1267) instead of an approximate one with a height cap. No more cropping at any screen width.
- **Socials** → restyled to a compact row of icon-only circles (name + handle now show as a tooltip on hover instead of always-visible text). I inferred this was "how they looked previously" based on the very first design (checked git history — the card style had actually been unchanged since the first checkpoint, so this must mean something further back) — flag it if that's not the look you meant.

## Commission form -> Google Form (latest)
- Removed the old custom `<form>` (it never went anywhere — just showed an alert). Replaced with an embedded **Google Form** in the same spot, so submissions go straight to Google/a Google Sheet and never touch this site, repo, or git history.
- **Still needed from you**: build the actual Google Form (exact field spec was given in chat), then paste its embed URL and link into `content.js` under `commission.googleForm` (`embedUrl` and `url`). Until then, the page shows a friendly "form isn't set up yet" message instead of a broken iframe — verified this live.
- Updated the 4 commission terms (Payment/Revisions/Turnaround Time/Usage Rights) to your latest exact wording.
- Cleaned up now-dead code: the old alert-on-submit handler in `script.js`, the old `commission.form.*` content fields, and the unused `.form-row` CSS.
- Verified via the page's DOM directly (not just screenshots, which were glitching this session for an unrelated automation reason) that all 4 terms render exactly right, the process steps are correct, and the form's not-configured fallback state works.

## Mobile nav bug, thumbnails, real content
- **Mobile category-nav wrapping** → fixed. It was using `flex-wrap: wrap`, which on narrow screens caused the 3 buttons to break onto two lines (matching the screenshot you sent). Changed to `flex-wrap: nowrap` with `flex-shrink: 0` on each button and horizontal scroll as a fallback — it now stays one row exactly like desktop, same as the "how I want it" screenshot. **Not visually re-verified this round** — the browser automation tool was disconnected for this whole batch of fixes, so I syntax-checked everything and reasoned through the CSS carefully, but please actually check this one on your phone since it was the reported bug.
- **Thumbnails scaled up** → grid columns went from a 220px minimum to 340px, and switched to `auto-fit` so fewer, bigger thumbnails per row instead of 8 tiny ones crammed in.
- **My Story** → your real bio is in now (`content.js` → `myStory.paragraph`), written as a template string so paragraph breaks work naturally.
- **Commission terms** → your real Payment/Revisions/Turnaround/Usage Rights text is in.
- **New "How Commissions Work" section** → added above the terms accordion in Hire Me: your 4-step process (You Reach Out → We Discuss The Project → I Make The Thing → Final Delivery) with arrows between steps, title, and subheading. Content lives in `content.js` → `commission.process`, `processHeading`, `processSubheading`.

## Versioning
This folder is a git repo, used purely as a safety net — every meaningful change gets committed as a checkpoint, so if something breaks or you don't like a change, it can be reverted without losing other progress. You don't need to do anything; just ask if you ever want to "go back" to before a specific change and I'll find the right checkpoint.

## NEW: Editable content system
**Everything you listed — headings, paragraphs, section titles, button text, links, social links, commission info, skill labels, tool descriptions — now lives in one file: `content.js`.**

- Open `content.js` in any text editor. It's organized top-to-bottom exactly like the page, with a comment block explaining the rules (keep quotes, keep commas, copy-paste a block to add a list item, delete a block to remove one).
- To change ANY text on the site, edit the matching value in `content.js`, save, and refresh the page (via `Start Website.bat`). No HTML/CSS editing needed, and you don't need to ask me to make text changes going forward.
- Specifically, this is where each thing you asked about lives in `content.js`:
  - **HERO text** → `hero` section
  - **About/My Story text** → `myStory` section (this is a brand-new section, see below)
  - **Work categories** (the Anime Edits / Talking-Head / GFX buttons) → `watchMyStuff.categories`
  - **YouTube links** → `animeEdits.videos` (just the video ID + title — thumbnail is automatic)
  - **Talking-Head video** → `talkingHead.videos`
  - **GFX images** → `gfx.banners.items` and `gfx.thumbnails.items`
  - **Social links** → `socials.items`
  - **Commission information** → `commission` (terms, form labels, contact links)
  - **Tools and skills** → `tools.items`

How it works under the hood (you don't need to touch these, just know they exist): `js/render.js` reads `content.js` and fills in the page at load time. `index.html` now contains the page's structure/design but the actual words and links come from `content.js`. This is why design/animation and content are now separate — editing text never requires touching layout code, and editing layout/design never requires hunting through paragraphs of text.

## NEW: My Story section
Added between GFX and Tools (per your ribbon diagram). Currently placeholder bio text in `content.js` under `myStory.paragraph` — replace it with your real bio whenever you're ready.

## NEW: Flowing ribbon
A thin animated line (coral → purple → coral, slowly shimmering) connects Hero → Watch My Stuff → Anime Edits → My Story → Tools as you scroll — it "draws itself in" as you scroll down the page, and reverses if you scroll back up.

- Kept deliberately simple per your past feedback about overly-complex scroll animations: it's one SVG path, driven by a single scroll-position calculation — no pinning, no per-section morphing.
- **Kept subtle on purpose**: after an initial pass had it cutting across the hero text, I moved it into the left-page margin only (a gentle wave, never crossing into the content column), and lowered its opacity. Verified visually in a live browser — it no longer overlaps any text, image, or card.
- **Hidden on small screens** (below 720px width) since there isn't enough margin there for it to stay clear of content — rather than risk it overlapping something on mobile, it just doesn't render there.
- Lives in `js/ribbon.js` (which sections it connects) and the `#ribbonGradient` colors in `index.html` (if you want different colors) — this is animation/design, not content, so it's separate from `content.js` on purpose.
- **Not verified on an actual narrow/mobile viewport** — the browser automation tool's window resize isn't reflecting in its screenshots in this environment (a recurring limitation, not a code issue), so please double check on your phone that the ribbon is indeed hidden and nothing looks off.

## Verified this round (live in a browser)
- All content renders identically to before the refactor (visual regression check passed) — nothing broke from moving text into content.js
- Video lightbox still opens and plays correctly with content pulled from `content.js`
- Category nav (Anime Edits/Talking-Head/GFX) still highlights the active section and still works as a fixed bar once scrolled past
- Accordion (commission terms) still opens/closes correctly, now built from `content.js`
- GFX banners/thumbnails, Tools, Socials all render correctly from `content.js` lists
- No console errors


Living checklist for the site at `C:\Users\pritam\Videos\WEBSITE`. Update as decisions are made.

## This round — visually verified live in a browser
The Chrome extension connected this time, so I served the site locally and drove a real browser through it (screenshots + console + network checks), rather than just reasoning through the code. Confirmed working:
- Banner (`assets/images/BANNER/banner_1.jpeg`) displays correctly at the top
- Brand icon (`MYICONSHIT.png` from your LOGO ANIMATION folder) shows as a white mark on a coral badge next to "HEXOR_8" in the nav
- Sakura cursor (`assets/cursors/sakura-arrow.cur`) is correctly wired up in CSS and the file loads (200 OK) — actual on-screen cursor shape couldn't be confirmed via screenshot (automation tools don't reliably capture custom OS cursor rendering), but the CSS is correctly applied and the file resolves
- All 11 real YouTube links from `assets/images/LINKS.txt` are embedded in Anime Edits, with real thumbnails/titles loading (e.g. "TOY-BOX – E.T", "Neon Genesis Evange...", "Columbina // DUMBO")
- GFX → Banners & Headers shows your 4 real banner images; GFX → Thumbnails shows your 8 real thumbnail images
- Lightbox works: click a thumbnail/banner → opens full-size, uncropped, closes via ✕
- Tools section shows exactly DaVinci Resolve 21 + Blender with your exact descriptions
- Socials section shows YouTube/Instagram/Discord (@hexor_mp4) + "More soon" placeholder
- Category nav (Anime Edits/Talking-Head/GFX): starts in-flow under the hero, switches to a fixed pill bar once scrolled past, correctly highlights the active section while scrolling — **no scroll-driven resize/morph animation**, just a plain show/hide as you asked
- No console errors

## What changed this round (per your last message)
- **Removed** the large 3/4-card morph section entirely, along with the "shrink from middle to top-right" scroll animation — replaced with a simple compact pill nav (`js/category-nav.js`, no `morph-nav.js` anymore)
- **Fixed the banner** — now points at your actual `BANNER/banner_1.jpeg`
- **Added the brand icon** (`MYICONSHIT.png`) — a real visible logo mark in the nav, not just tucked into the favicon
- **Added the sakura cursor** — custom cursor site-wide (arrow) and on interactive elements (link cursor)
- **Anime Edits now has real content** — all 11 links from `LINKS.txt`, embedded as playable YouTube videos (titled "Anime Edit 1"–"11" in the HTML `title` attribute, but YouTube's own oEmbed shows their real titles/thumbnails)
- **GFX restructured to 2 subcategories** per your instruction: Banners & Headers (4 real images) and Thumbnails (8 real images) — Posters subcategory removed since it's no longer part of your spec
- Cleaned up superseded duplicate image copies at the root of `assets/images/` (kept your organized `BANNER/`, `THUMBNAILS/`, `LOGO ANIMATION/`, `CURSER/` folders as the source of truth)

## YouTube "Error 153" — fixed
The Anime Edits section used `<iframe>` embeds, which YouTube's player refuses to run when the page is opened directly as a file (`file://...`, e.g. double-clicking `index.html`) instead of served over http(s) — that's what caused the "Video player configuration error / Error 153" boxes. Fixed by replacing the iframes with real thumbnail images (fetched from YouTube, e.g. `TOY-BOX – E.T`, `Columbina // DUMBO`, etc.) that link out to the actual YouTube watch page in a new tab. This works no matter how the page is opened, and the real video titles now show as captions too.

## Inline video playback (new)
Anime Edits videos now play right on the page in a fullscreen lightbox — no more leaving to YouTube or opening a new tab. Verified live: real thumbnail → click → real video title/player loads and plays inline; closing stops playback.

**Important**: inline playback only works when the site is opened through **`Start Website.bat`** (double-click it, in the site folder) instead of double-clicking `index.html` directly. YouTube's video player refuses to run when opened as a raw file — that's what caused the Error 153 you saw before. `Start Website.bat` starts a tiny local server and opens the page from there automatically; it's still just one double-click. If you do open `index.html` directly by mistake, a small dismissible notice at the bottom of the page will tell you so.

## Still open / for you
- [ ] `LOGO ANIMATION/FINAL RENDER LOGO 2.mp4` exists in your assets but isn't used anywhere yet — let me know if/where you want it (e.g. a future "Logo Animation" GFX category)
- [ ] Anime Edit video captions are generic ("Anime Edit 1", etc.) since no titles were provided — happy to swap in real titles if you want specific captions instead of relying on YouTube's own title showing through the embed
- [ ] Real terms & conditions details (turnaround, revisions, payment, usage rights, refunds) — still placeholder text
- [ ] Real contact email (currently placeholder `hello@example.com`)
- [ ] Discord link currently points to `discord.com/users/hexor_mp4` (a profile link) — confirm that's right vs. a server invite link
- [ ] Scraps section still intentionally empty ("Nothing here yet.") — add content whenever you have some
- [ ] Mobile layout uses the same responsive breakpoints as before (media queries at 860px/720px/600px) — I could not visually confirm the mobile view this session (the browser automation tool's window resize didn't reflect in its screenshot capture), so it's worth a manual check on your phone
