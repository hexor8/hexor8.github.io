/* ============================================================================
   SITE CONTENT — edit this file to change anything you SEE on the site.
   ============================================================================
   This is the ONLY file you should need to touch for text, links, videos,
   images, tools, socials, and commission info. Nothing in here controls
   layout, colors, fonts, or animation — that's all in css/style.css and the
   files in js/ (render.js, ribbon.js, etc).

   Rules for editing safely:
   - Keep the quotes ("...") around every piece of text.
   - Keep the commas at the end of each line inside a list.
   - To add a new item to a list (a video, a tool, a social link...), copy
     one of the existing { ... } blocks in that list, paste it as a new
     line, and change the values inside.
   - To remove an item, delete its whole { ... } block (and its comma).
   - Save the file and refresh the page (via Start Website.bat) to see it.

   Sections in this file are listed in the order they're defined below,
   which is NOT the same as the order they appear on the page anymore —
   the page order is controlled separately by section order in index.html.

   As of the current page layout, top to bottom, the page actually goes:
     Hero -> Watch My Stuff (intro) -> Professional Video Editing
     (data key: talkingHead) -> GFX -> Edits (data key: animeEdits) ->
     Hire Me (data key: commission) -> Socials (Find Me) -> Scraps ->
     Tools -> My Story

   Data keys in this file (unchanged even though display names changed,
   so section ids in index.html don't have to be touched):
     brand, nav            — site name, top nav labels, nav logo GIF
     hero                  — the big intro at the top of the page
     watchMyStuff          — the intro line + buttons above the categories
     animeEdits            — displays as "Edits" — your YouTube video links
     talkingHead           — displays as "Professional Video Editing"
     gfx                   — banner and thumbnail images
     myStory               — the about-me section
     tools                 — software/skills list
     socials               — social media links
     scraps                — the bonus section
     commission            — displays as "Hire Me" — pricing/terms/form text
     footer
   ============================================================================ */

window.SITE_CONTENT = {

  // --------------------------------------------------------------------
  // BRAND & NAV — shows in the banner header and the top nav bar
  // --------------------------------------------------------------------
  brand: {
    name: "HEXOR_8",
    handle: "@hexor_8",
    bannerImage: "assets/images/BANNER/banner_1.jpeg",
    avatarImage: "assets/images/PFP.jpeg",
    // Animated logo-into-signature mark shown in the top nav bar (replaces
    // the old separate icon + "HEXOR_8" text). This is a WebP re-exported
    // from your FINAL RENDER LOGO 2.mp4 with the black background keyed
    // out to real transparency (video/GIF formats can't do this — see
    // CHECKLIST.md for why). The mark itself is white, so it needs a
    // colored badge behind it to read — sits on a coral badge in the nav.
    navGif: "assets/images/LOGO%20ANIMATION/logo-badge-transparent.webp",
  },

  nav: {
    home: "Home",
    watchMyStuff: "Watch My Stuff",
    hireMe: "Hire Me",
  },

  // --------------------------------------------------------------------
  // HERO — the big introduction at the very top of the page
  // --------------------------------------------------------------------
  hero: {
    badge: "welcome!",
    headingBeforeName: "Hey, I'm ",   // text before your name
    headingName: "HEXOR_8",           // your name (shown in coral)
    paragraph: "Editing, compositing, and motion design.",
    primaryButton: "Watch My Stuff",  // scrolls down to the categories
    secondaryButton: "Hire Me",       // scrolls down to the commission section
    portraitImage: "assets/images/PFP.jpeg",
  },

  // --------------------------------------------------------------------
  // WATCH MY STUFF — short intro line shown above the category buttons.
  // Order of this list = order the buttons appear in AND (since the nav
  // just reads this array) the order they highlight while scrolling —
  // but it does NOT change the order the actual sections appear on the
  // page. That's controlled by the section order in index.html.
  // --------------------------------------------------------------------
  watchMyStuff: {
    label: "Watch My Stuff",
    paragraph: "Professional video editing, GFX, and edits.",
    // These 3 buttons must keep the same "target" values (anime-edits,
    // talking-head, gfx) unless you also rename the matching section ids
    // in index.html — the label is what changes the button text.
    categories: [
      { label: "Professional Video Editing", target: "talking-head" },
      { label: "GFX", target: "gfx" },
      { label: "Edits", target: "anime-edits" },
    ],
  },

  // --------------------------------------------------------------------
  // EDITS (internally still called "animeEdits") — your YouTube videos
  // --------------------------------------------------------------------
  // To add a video: find the video's ID from its YouTube URL —
  // https://youtu.be/THIS_PART_IS_THE_ID — and add a new block below.
  // The thumbnail image is pulled automatically from YouTube using the id.
  animeEdits: {
    label: "Edits",
    heading: "Edits",
    paragraph: "Anime edits from my YouTube channel.",
    addMoreLabel: "More go here",
    videos: [
      { id: "qrsYoF5Jc30", title: "Himouto! Umaru-chan Edit // Mograph" },
      { id: "e5PxljLup4M", title: "TOY-BOX – E.T | Urusei Yatsura Mograph edit" },
      { id: "rPurzqi0o5Y", title: "LOVE ME HARDER // Violet Evergarden" },
      { id: "zScqKy7-MB4", title: "Oshi no ko & My Dress Up Darling — Rather Lie" },
      { id: "UimwnZVS4TQ", title: "Arknights Enfield edit // Dancing Nihilist" },
      { id: "4qrnhV2cNgI", title: "Sumi Sakurasawa | Mograph Edit" },
      { id: "gdacI2X2xB0", title: "Mad Tsai – Boys Beware // Hayuki" },
      { id: "LiK25yVyXMM", title: "Neon Genesis Evangelion × Serial Experiments Lain — Softcore" },
      { id: "oYssVWLPUzc", title: "Columbina // DUMBO - Travis Scott" },
      { id: "TgU05miaB58", title: "REFLECTIONS - Denji [Chainsaw Man]" },
      { id: "U0BdjW1KutY", title: "MC Leren | New Person, Same Old Mistakes" },
    ],
  },

  // --------------------------------------------------------------------
  // PROFESSIONAL VIDEO EDITING (internally still called "talkingHead")
  // --------------------------------------------------------------------
  // "src" points to a video file inside assets/videos/. To swap the video,
  // put the new file in that folder and change "src" to its filename.
  talkingHead: {
    label: "Professional Video Editing",
    heading: "Professional Video Editing",
    paragraph: "Commentary and talking-head editing.",
    addMoreLabel: "More go here",
    videos: [
      { src: "assets/videos/trial-render.mp4", title: "Trial Render", caption: "Graded · 2026" },
    ],
  },

  // --------------------------------------------------------------------
  // GFX — banner and thumbnail images
  // --------------------------------------------------------------------
  // "src" points to an image file inside assets/images/. To add an image,
  // put the file in the matching folder (BANNER or THUMBNAILS) and add a
  // new { src: "...", alt: "..." } block.
  gfx: {
    label: "GFX",
    heading: "GFX",
    banners: {
      heading: "Banners & Headers",
      items: [
        { src: "assets/images/BANNER/banner_1.jpeg", alt: "HEXOR_8 channel banner" },
        { src: "assets/images/BANNER/BANNER_3.jpeg", alt: "HEXOR banner design, orange theme" },
        { src: "assets/images/BANNER/BANNER_4.png", alt: "HEXOR banner design, gold theme" },
        { src: "assets/images/BANNER/COLUMBIA%20BANNER.jpg", alt: "HEXOR banner design, purple theme" },
      ],
    },
    thumbnails: {
      heading: "Thumbnails",
      items: [
        { src: "assets/images/THUMBNAILS/THUMBNIAL_1.jpeg", alt: "\"I Like The Way You Kiss Me\" anime edit thumbnail" },
        { src: "assets/images/THUMBNAILS/THUMBNIAL_2.jpeg", alt: "\"TOY-BOX – E.T\" Urusei Yatsura anime edit thumbnail" },
        { src: "assets/images/THUMBNAILS/Tadimeline%201_ad01_0ad0_54_08.jpg", alt: "\"HEXOR\" anime edit thumbnail" },
        { src: "assets/images/THUMBNAILS/Tawdimawdeaawdline%201wd_awd0awd1_03_04_09.jpg", alt: "\"DUMBO\" Travis Scott anime edit thumbnail" },
        { src: "assets/images/THUMBNAILS/Timeline%201_01_00_45_10.jpg", alt: "\"Buckshot Fever\" anime edit thumbnail" },
        { src: "assets/images/THUMBNAILS/Timwdeline%201_01_00awdawd_22_09.jpg", alt: "\"How Long\" Charlie Puth anime edit thumbnail" },
        { src: "assets/images/THUMBNAILS/f25c7923-db4c-4cdc-a902-9851927ede61.png", alt: "\"Love Me Harder\" Violet Evergarden anime edit thumbnail" },
      ],
    },
  },

  // --------------------------------------------------------------------
  // MY STORY — the about-me section (new)
  // --------------------------------------------------------------------
  myStory: {
    label: "My Story",
    heading: "My Story",
    // Uses backticks (`) instead of quotes so you can write multiple
    // paragraphs naturally — just leave a blank line between paragraphs,
    // same as this one does.
    paragraph: `I started editing because I liked taking ordinary clips and seeing how far I could push them. What began with experimenting with anime edits gradually turned into a much bigger interest in motion, pacing, design, and visual storytelling.

Since then, I've been learning and experimenting across different styles—from anime edits and talking-head videos to thumbnails, banners, graphics, and motion design. Most of what I know came from curiosity, experimentation, and repeatedly trying to figure out "how the hell did they make that?" 😭

I'm still learning, still experimenting, and still building. This portfolio is basically a collection of that journey so far—and there's a lot more I want to create.`,
  },

  // --------------------------------------------------------------------
  // TOOLS — software / skills list
  // --------------------------------------------------------------------
  tools: {
    label: "Tools",
    heading: "Tools",
    items: [
      { icon: "🎛", name: "DaVinci Resolve 21", desc: "Editing · Fusion · Color · Audio" },
      { icon: "🧊", name: "Blender", desc: "3D · Modeling · Animation" },
    ],
  },

  // --------------------------------------------------------------------
  // SOCIALS — social media links
  // --------------------------------------------------------------------
  // "icon" must be one of: "youtube", "instagram", "discord". If you add a
  // platform that isn't one of those, it'll show a plain dot icon instead —
  // ask to have a new icon added for it.
  socials: {
    label: "Socials",
    heading: "Find Me",
    moreSoonLabel: "More soon",
    items: [
      { icon: "youtube", name: "YouTube", handle: "@hexor_8", url: "https://www.youtube.com/@hexor_8" },
      { icon: "instagram", name: "Instagram", handle: "@hexor_8", url: "https://instagram.com/hexor_8" },
      { icon: "discord", name: "Discord", handle: "@hexor_mp4", url: "https://discord.com/users/hexor_mp4" },
    ],
  },

  // --------------------------------------------------------------------
  // SCRAPS — small bonus section further down the page
  // --------------------------------------------------------------------
  scraps: {
    label: "Scraps",
    heading: "Scraps",
    paragraph: "Experiments and miscellaneous stuff that didn't become a full project.",
    emptyText: "Nothing here yet.",
  },

  // --------------------------------------------------------------------
  // COMMISSION / HIRE ME — pricing/terms/contact form text
  // --------------------------------------------------------------------
  commission: {
    label: "Hire Me",
    heading: "Commission Me",
    paragraph: "Fill out the form below or reach out directly.",

    // The 4-step "how it works" list shown above the terms. Add/remove
    // steps freely — the arrows between them are automatic.
    processHeading: "How Commissions Work",
    processSubheading: "Simple process. Clear communication. No unnecessary bullshit. 😭🔥",
    process: [
      { title: "You Reach Out", description: "Tell me what you need." },
      { title: "We Discuss The Project", description: "Style, references, timeline and pricing." },
      { title: "I Make The Thing", description: "You'll receive progress updates when appropriate." },
      { title: "Final Delivery", description: "The project is delivered after everything is agreed upon." },
    ],

    // Each of these becomes a click-to-expand row. Add/remove/edit freely.
    // Use backticks (`) with a blank line between paragraphs if you want a
    // multi-paragraph answer.
    terms: [
      { question: "Payment", answer: "Payment terms are discussed before work begins. For larger projects, an upfront payment may be required. Final pricing and payment arrangements will be agreed upon before the project starts." },
      { question: "Revisions", answer: "Reasonable revisions are included depending on the project. Major changes that significantly change the original direction may require additional time or cost." },
      { question: "Turnaround Time", answer: "Turnaround time depends on the type and complexity of the project. The expected timeline will be discussed before starting." },
      { question: "Usage Rights", answer: "The final work is created for the agreed project and intended use. Commercial or promotional usage should be discussed before the project begins. I may showcase completed work in my portfolio unless otherwise agreed." },
    ],

    // ------------------------------------------------------------------
    // GOOGLE FORM — the commission request form embedded below.
    // Submissions go straight to Google (and a Google Sheet, if you
    // connect one) — nothing touches this site, this repo, or its git
    // history, so client info never ends up in a public place.
    //
    // HOW TO GET THESE TWO URLS, after building the form in Google Forms
    // (field spec was given to you separately — ask again if you need it
    // re-sent):
    //   1. In your form, click "Send" (top right).
    //   2. Click the "<>" embed tab.
    //   3. Copy the URL inside the src="..." of the <iframe> shown there
    //      and paste it below as `embedUrl`.
    //   4. Click the link tab (🔗) in that same "Send" dialog, copy that
    //      link, and paste it below as `url` (this is the fallback link
    //      for anyone whose browser won't show the embed, e.g. some
    //      in-app browsers).
    //   5. To collect responses in a spreadsheet: in the form editor, go
    //      to the "Responses" tab and click the green Sheets icon.
    // ------------------------------------------------------------------
    googleForm: {
      url: "PASTE_YOUR_GOOGLE_FORM_LINK_HERE",
      embedUrl: "PASTE_YOUR_GOOGLE_FORM_EMBED_SRC_HERE",
      fallbackText: "Having trouble seeing the form? Open it directly:",
      fallbackLinkText: "Open the commission form",
    },

    // Quick contact links shown below the form.
    contactLinks: [
      { label: "Email", url: "mailto:hello@example.com" },
      { label: "Discord", url: "https://discord.com/users/hexor_mp4" },
      { label: "YouTube", url: "https://www.youtube.com/@hexor_8" },
      { label: "Instagram", url: "https://instagram.com/hexor_8" },
    ],
  },

  // --------------------------------------------------------------------
  // FOOTER
  // --------------------------------------------------------------------
  footer: {
    text: "© 2026 HEXOR_8. All rights reserved.",
  },
};
