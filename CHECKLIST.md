# Website Build Checklist

## This is WEBSITE-v2 — a copy, not the original
Per your request, this round of changes (content system + ribbon) was done in a **new copy** of the site at `C:\Users\pritam\Videos\WEBSITE-v2`, so `C:\Users\pritam\Videos\WEBSITE` (the original) is completely untouched. Git history was carried over into the copy, so all prior checkpoints are still there (`git log` shows the full history back to the very first checkpoint). Once you've looked this over and I'm told to proceed, WEBSITE-v2 can become the "real" one — or we can keep iterating here first. Nothing is deleted either way.

## Logo, banner, socials round (latest)
- **Nav logo** → now your real `FINAL RENDER LOGO 2.mp4`, converted (via ffmpeg) to a small looping animated WebP (`assets/images/LOGO ANIMATION/logo-badge.webp`) rather than played as a `<video>`. Reason: Chrome auto-pauses `<video>` elements that render as small as this 30px nav badge as a battery-saving measure — confirmed this was happening (it played briefly then silently stopped every time), so I converted to an animated image instead, which loops reliably at any size. Verified live: it's genuinely animating frame-to-frame and still going after several seconds.
- Your other webp (`LOGO_WEBPAGE.webp`) is left in place but unused — I checked it directly in Chrome at full size and it's solid black with only a couple of stray white pixels, not a usable export. Left untouched in case you want to fix/re-export it yourself.
- **Banner cropping** → fixed by matching the CSS aspect ratio to the banner image's exact pixel dimensions (7680×1267) instead of an approximate one with a height cap. No more cropping at any screen width.
- **Socials** → restyled to a compact row of icon-only circles (name + handle now show as a tooltip on hover instead of always-visible text). I inferred this was "how they looked previously" based on the very first design (checked git history — the card style had actually been unchanged since the first checkpoint, so this must mean something further back) — flag it if that's not the look you meant.

## Google Form wired in (latest) — site side done, form content still needs a fix
Wired the two links you sent into `content.js` under `commission.googleForm` (`url` and `embedUrl`). Verified live: the embed loads with no console errors, and I independently opened the form URL directly (bypassing our site) to confirm it's genuinely public and working — title "Commission Inquiry Form" renders correctly.

**But the form content itself still has the old generic template fields** — this is on the Google Forms side, not something I can fix (I don't have your Google account, and shouldn't). Read the live form directly and got its exact current fields:

1. Full Name ✓
2. Email Address (not in original spec, but a reasonable extra)
3. **"What type of commission are you requesting?" — still has the OLD options**: Illustration, Digital Art, Writing, Graphic Design, Logo Design, Software Development, Other. Needs to become: Anime edit, Talking-head video, Thumbnail, Banner, Poster / GFX, Logo animation, Other.
4. Project description ✓ (matches "project details")
5. Preferred Deadline (date) — not in original spec, your call whether to keep it
6. Estimated Budget Range ($ tiers) — not in original spec either; doesn't conflict with "pricing discussed privately" since it's just asking the client's budget, not publishing your prices — your call whether to keep it
7. Link to references ✓ (matches "reference links")

**Missing from the original 7-field spec**: "Best way to reach you" and "Additional notes" were never added.

Once you fix the dropdown (and optionally add the 2 missing fields), nothing else needs to change on my end — same URL, it'll just show correctly.

## Nav logo transparency fix (completed)
You were right that the source render likely had transparency — but **MP4 and GIF are both hard format limits that cannot carry it, no matter what codec/settings are used**: MP4/H.264 has no alpha channel at all (industry-wide limitation, not a settings issue), and GIF only supports 1-bit "on/off" transparency (no smooth edges) which would look jagged on a logo like this anyway. That's why every export you gave me came out with a baked-in black background.

**Fix**: used ffmpeg's `colorkey` filter to key out the black (verified first that the background was a perfectly flat, zero-variance black — ideal for clean keying, confirmed via signalstats) and re-encoded as an animated WebP with a real 8-bit alpha channel, which does support smooth, anti-aliased transparency. Verified in an isolated test page that it renders with clean transparent edges and no color fringing on the actual brand coral.

**Important discovery along the way**: the logo mark itself is pure **white**, not coral — what looked coral before was just the glow blending with the black backdrop. This means it needs a colored (or dark) background to read at all; it'll disappear on white/light backgrounds. Swapped the nav badge from black to coral to match, which also looks more intentional now that the badge follows the logo's real transparent silhouette instead of a hard-edged black box.

**For future exports**: if you (or anyone) re-renders this logo, exporting a **ProRes 4444** or **QuickTime Animation** file with alpha directly from the NLE (DaVinci Resolve supports this), or a PNG sequence with alpha, would preserve transparency natively with no keying needed — ask me if you want to try that route instead of the keying approach.

**Not fully visually confirmed live**: the browser automation tool in this session reports the test tab as `document.hidden: true` (not focused), and Chrome throttles animated image playback on unfocused tabs — so my later checks in the real nav kept showing a static frame while an *isolated* test page (caught right as it loaded, before throttling kicked in) clearly showed multiple distinct animated frames with clean transparency. I'm confident this is a testing-artifact, not a real bug, but you should take a quick look yourself to confirm it animates smoothly in the actual nav.

## Restructure round: banner grid, GIF logo, section reorder
Checklist for this round, as requested — everything below is done and verified (live in a browser, with DOM-level checks where the screenshot tool itself got flaky):

- [x] GFX Banners & Headers: was 1 huge full-width banner per row — now a 2×2 grid, noticeably smaller, confirmed visually.
- [x] Removed `Timeline 1_0awd1_00_45_10.jpg` from Thumbnails — confirmed 7 thumbnails now (was 8).
- [x] Replaced the nav bar's icon + "HEXOR_8" text with your `WEBSITE_GIF.gif` (logo morphing into the "Hexor_8" signature). It has a solid black background (not transparent), so it sits on a small black badge to look intentional rather than showing hard edges. Confirmed it's genuinely animating (checked 3 different frames over time, not just a static image).
- [x] Renamed **Talking-Head Videos → Professional Video Editing**, **Anime Edits → Edits** (both the section headings and the category-nav buttons).
- [x] Reordered categories: Professional Video Editing → GFX → Edits (was Anime Edits → Talking-Head → GFX).
- [x] Reordered everything after the portfolio categories to: Hire Me → Find Me (Socials) → Scraps → Tools → **My Story last**.
- [x] Updated the ribbon's connection points and the footer link list to match the new order.
- [x] Verified live: correct section order (checked via DOM), category nav shows the right 3 buttons in the right order with correct active-highlighting, no console errors, GIF confirmed animating, all headings/labels read correctly.

**One thing I want to flag rather than assume silently:** you said to place the commission section "right after the thumbnail," but you also said to reorder the 3 portfolio categories so Edits (the category that contains no thumbnails, but comes right after GFX which does) is now 3rd, not 2nd. Taken completely literally, those two instructions conflict — "right after the thumbnail" would put Hire Me between GFX and Edits, splitting up the portfolio browsing experience. I went with **grouping all 3 categories together first (Professional Video Editing → GFX → Edits), then Hire Me** — the standard "show all your work, then invite commissions" pattern — since interrupting the portfolio with a form in the middle seemed unlikely to be what you actually wanted. **Say the word and I'll move Hire Me to right after GFX instead** if that literal placement is what you meant.

**Still open (need you specifically):**
- [ ] Real email for `commission.contactLinks` (still `hello@example.com`).
- [ ] The Google Form itself — still on hold per your earlier "don't connect it yet."
- [ ] Redeploying — the site only exists locally right now.

## SEO / production hardening pass (completed)
Verified live in a fresh browser after finishing — no console errors, exact color match confirmed, all values spot-checked via the DOM (see below).

**Done:**
- Real, unique alt text on all 8 GFX thumbnails (was generic "Thumbnail" on every one) — identified each by actually viewing the images.
- `<head>`: unique descriptive title, meta description, `robots` meta, canonical link, Open Graph + Twitter Card tags (for link previews in Discord/iMessage/Slack/etc.), JSON-LD structured data. These are hardcoded directly in `index.html` rather than driven by `content.js` **on purpose** — link-preview bots and some crawlers read raw HTML without running this site's JavaScript, so anything only set by `render.js` would be invisible to them. If you rename the brand or get a custom domain, these need a manual update (or ask me).
- `sitemap.xml`, `robots.txt`, `llms.txt` at the project root.
- Custom `404.html`, styled to match the site, using root-relative paths so it works regardless of what URL depth triggered it (GitHub Pages serves this automatically for any unmatched path).
- Footer internal-links row (Home / Anime Edits / Talking-Head / GFX / My Story / Hire Me).
- Fixed a real bug found via live testing: the site had no `color-scheme` declared, so browsers with system dark mode on could auto-invert the whole page to a broken-looking dark palette that didn't match any of the actual CSS. Added `color-scheme: light` (both as a meta tag and in CSS) — confirmed via computed styles that the page now renders at the exact intended color (`#fdf2f0`) regardless of system theme.

**Items from the original ask that don't actually fit this project** (explained rather than forced):
- *"Make sure the tab doesn't say Vite or React"* — this was never applicable; the site has zero build tooling, it's hand-written HTML/CSS/JS. Confirmed via search: no Vite/React/webpack references anywhere.
- *"Remove production source maps"* / *"reduce huge JavaScript"* — nothing to remove; there's no bundler or source maps, and the combined custom JS across all 5 scripts is under 20KB total (`content.js`, which is your editable content, isn't code).
- *Local business schema* — used `Person` schema instead. HEXOR_8 is an individual freelancer with no physical address or business hours, so `LocalBusiness` markup would be inaccurate — Google's own structured data guidelines call this out as markup that shouldn't be added if it doesn't reflect reality.
- *Breadcrumbs* — these represent a page's position in a multi-page hierarchy. This is a genuinely single-page site (by explicit earlier requirement), so there isn't a real hierarchy to reflect. Real internal navigation already exists via the nav bar, category nav, and the new footer links.
- *Custom domain* — still needs you to actually purchase one (I can't make purchases); the canonical/OG URLs currently point at `https://hexor8.github.io/`, which is also not live right now since that repo was deleted earlier in this project's history. Once you redeploy (and/or get a domain), tell me the URL and I'll update the hardcoded tags above.

**Still open:**
- [ ] `commission.contactLinks` still has a placeholder `mailto:hello@example.com` — needs your real email, or say the word and I'll drop the Email option until you have one.
- [ ] Redeploy to GitHub Pages (or wherever) whenever you're ready — the site currently only exists locally.

## Commission form -> Google Form
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
