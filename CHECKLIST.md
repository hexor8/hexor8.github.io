# Website Build Checklist

## Versioning (new)
This folder is now a git repo, used purely as a safety net — every meaningful change gets committed as a checkpoint, so if something breaks or you don't like a change, it can be reverted without losing other progress. You don't need to do anything; just ask if you ever want to "go back" to before a specific change and I'll find the right checkpoint.


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
