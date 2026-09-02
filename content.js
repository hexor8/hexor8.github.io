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

   Sections in this file, top to bottom:
     BRAND & NAV        — site name, top nav labels
     HERO               — the big intro at the top of the page
     WATCH MY STUFF      — the intro line above the category buttons
     ANIME EDITS        — your YouTube video links
     TALKING HEAD        — the talking-head video section
     GFX                — banner and thumbnail images
     MY STORY           — the about-me section
     TOOLS              — software/skills list
     SOCIALS            — social media links
     SCRAPS             — the bonus section near the bottom
     COMMISSION / HIRE ME — pricing/terms/contact form text
     FOOTER
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
    iconImage: "assets/images/LOGO%20ANIMATION/MYICONSHIT.png",
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
  // WATCH MY STUFF — short intro line shown above the Anime Edits /
  // Talking-Head / GFX buttons
  // --------------------------------------------------------------------
  watchMyStuff: {
    label: "Watch My Stuff",
    paragraph: "Anime edits, talking-head videos, and GFX.",
    // These 3 buttons must keep the same "target" values (anime-edits,
    // talking-head, gfx) unless you also rename the matching section ids
    // in index.html — the label is what changes the button text.
    categories: [
      { label: "Anime Edits", target: "anime-edits" },
      { label: "Talking-Head", target: "talking-head" },
      { label: "GFX", target: "gfx" },
    ],
  },

  // --------------------------------------------------------------------
  // ANIME EDITS — your YouTube videos
  // --------------------------------------------------------------------
  // To add a video: find the video's ID from its YouTube URL —
  // https://youtu.be/THIS_PART_IS_THE_ID — and add a new block below.
  // The thumbnail image is pulled automatically from YouTube using the id.
  animeEdits: {
    label: "Anime Edits",
    heading: "Anime Edits",
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
  // TALKING HEAD — the talking-head video section
  // --------------------------------------------------------------------
  // "src" points to a video file inside assets/videos/. To swap the video,
  // put the new file in that folder and change "src" to its filename.
  talkingHead: {
    label: "Talking-Head Videos",
    heading: "Talking-Head Videos",
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
        { src: "assets/images/THUMBNAILS/THUMBNIAL_1.jpeg", alt: "Thumbnail" },
        { src: "assets/images/THUMBNAILS/THUMBNIAL_2.jpeg", alt: "Thumbnail" },
        { src: "assets/images/THUMBNAILS/Tadimeline%201_ad01_0ad0_54_08.jpg", alt: "Thumbnail" },
        { src: "assets/images/THUMBNAILS/Tawdimawdeaawdline%201wd_awd0awd1_03_04_09.jpg", alt: "Thumbnail" },
        { src: "assets/images/THUMBNAILS/Timeline%201_01_00_45_10.jpg", alt: "Thumbnail" },
        { src: "assets/images/THUMBNAILS/Timeline%201_0awd1_00_45_10.jpg", alt: "Thumbnail" },
        { src: "assets/images/THUMBNAILS/Timwdeline%201_01_00awdawd_22_09.jpg", alt: "Thumbnail" },
        { src: "assets/images/THUMBNAILS/f25c7923-db4c-4cdc-a902-9851927ede61.png", alt: "Thumbnail" },
      ],
    },
  },

  // --------------------------------------------------------------------
  // MY STORY — the about-me section (new)
  // --------------------------------------------------------------------
  myStory: {
    label: "My Story",
    heading: "My Story",
    // Replace this with your real bio whenever you're ready — this is
    // just a placeholder paragraph.
    paragraph: "Placeholder bio — write a few sentences about who you are, how you got into editing/motion design, and what you're into. This shows up as its own section between GFX and Tools.",
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

    // Each of these becomes a click-to-expand row. Add/remove/edit freely.
    terms: [
      { question: "Payment", answer: "Placeholder: e.g. 50% upfront, 50% on delivery. Payment methods accepted: TBD." },
      { question: "Revisions", answer: "Placeholder: number of free revisions included, extra revisions billed at $TBD each." },
      { question: "Turnaround Time", answer: "Placeholder: estimated delivery windows, rush order policy TBD." },
      { question: "Usage Rights", answer: "Placeholder: what the client can/can't do with the finished work." },
    ],

    form: {
      nameLabel: "Your name",
      typeLabel: "What do you need?",
      typeOptions: ["Anime Edit", "Talking-Head Edit", "GFX (Thumbnail / Banner)", "Custom / Other"],
      detailsLabel: "Details",
      detailsPlaceholder: "Describe what you're looking for...",
      contactLabel: "Best way to reach you (email/Discord)",
      submitButton: "Send request",
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
