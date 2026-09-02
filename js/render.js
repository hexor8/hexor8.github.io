/* ============================================================================
   RENDER ENGINE — reads content.js (window.SITE_CONTENT) and fills in the
   page. You shouldn't need to edit this file to change text/links/images —
   that all lives in content.js. This file is "plumbing."
   ============================================================================ */
(function () {
  const SITE = window.SITE_CONTENT;
  if (!SITE) {
    console.error('content.js did not load — window.SITE_CONTENT is missing.');
    return;
  }

  function getPath(obj, path) {
    return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Plain text/links driven by data-c / data-c-href / data-c-src attributes
  // anywhere in the static HTML (nav labels, hero copy, section headings...).
  function renderSimpleBindings() {
    document.querySelectorAll('[data-c]').forEach(el => {
      const val = getPath(SITE, el.dataset.c);
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll('[data-c-href]').forEach(el => {
      const val = getPath(SITE, el.dataset.cHref);
      if (val != null) el.setAttribute('href', val);
    });
    document.querySelectorAll('[data-c-src]').forEach(el => {
      const val = getPath(SITE, el.dataset.cSrc);
      if (val == null) return;
      el.setAttribute('src', val);
      // <video>/<audio> don't reliably pick up a src set after the initial
      // parse without an explicit reload — <img> doesn't need this. And
      // calling play() synchronously right after load() races against
      // load()'s internal reset and silently gets dropped, so wait for
      // canplay first (safe here since these are always muted background
      // loops, so autoplay-without-gesture is allowed).
      if (typeof el.load === 'function') {
        if (el.hasAttribute('autoplay')) {
          el.addEventListener('canplay', () => el.play().catch(() => {}), { once: true });
        }
        el.load();
      }
    });
    document.querySelectorAll('[data-c-alt]').forEach(el => {
      const val = getPath(SITE, el.dataset.cAlt);
      if (val != null) el.setAttribute('alt', val);
    });
    document.querySelectorAll('[data-c-placeholder]').forEach(el => {
      const val = getPath(SITE, el.dataset.cPlaceholder);
      if (val != null) el.setAttribute('placeholder', val);
    });
  }

  // Icon glyphs used by the socials grid. Add an entry here if you introduce
  // a new platform in content.js's socials.items and want a matching icon.
  const SOCIAL_ICONS = {
    youtube: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.5v-7l6.3 3.5-6.3 3.5Z"/></svg>',
    instagram: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
    discord: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 5.4A18.3 18.3 0 0 0 15.8 4c-.2.4-.5.9-.6 1.3a17 17 0 0 0-6.4 0c-.2-.4-.4-.9-.6-1.3-1.6.3-3.1.8-4.5 1.4C1 9.9.3 14.3.6 18.6a18.4 18.4 0 0 0 5.6 2.8c.4-.6.8-1.3 1.2-2a12 12 0 0 1-1.9-.9l.5-.4a13 13 0 0 0 11 0l.4.4c-.6.3-1.2.6-1.9.9.4.7.8 1.4 1.2 2a18.3 18.3 0 0 0 5.6-2.8c.4-5-.9-9.3-2.9-13.2ZM8.7 15.9c-1 0-1.8-.9-1.8-2.1s.8-2.1 1.8-2.1c1 0 1.9 1 1.8 2.1 0 1.2-.8 2.1-1.8 2.1Zm6.6 0c-1 0-1.8-.9-1.8-2.1s.8-2.1 1.8-2.1c1 0 1.9 1 1.8 2.1 0 1.2-.8 2.1-1.8 2.1Z"/></svg>',
    default: '<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="currentColor"/></svg>',
  };

  function findSocial(iconName) {
    return SITE.socials.items.find(s => s.icon === iconName);
  }

  // Small dedicated case: the YouTube/Instagram icons in the top channel
  // banner mirror whatever's set for those platforms in socials.items,
  // rather than being their own separate content entry.
  function wireChannelSocials() {
    const yt = findSocial('youtube');
    const ig = findSocial('instagram');
    const ytLink = document.getElementById('channelYoutubeLink');
    const igLink = document.getElementById('channelInstagramLink');
    if (ytLink && yt) ytLink.href = yt.url;
    if (igLink && ig) igLink.href = ig.url;
  }

  function buildCategoryNav() {
    const nav = document.getElementById('categoryNav');
    if (!nav) return;
    nav.innerHTML = SITE.watchMyStuff.categories
      .map(cat => `<a href="#${escapeHtml(cat.target)}">${escapeHtml(cat.label)}</a>`)
      .join('');
  }

  function buildAnimeEdits() {
    const grid = document.getElementById('animeEditsGrid');
    if (!grid) return;
    const c = SITE.animeEdits;
    let html = c.videos.map(v => `
      <button type="button" class="media-card" data-lightbox-video="${escapeHtml(v.id)}">
        <div class="media-thumb"><img src="https://i.ytimg.com/vi/${escapeHtml(v.id)}/hqdefault.jpg" alt=""><span class="play">▶</span></div>
        <div class="caption">${escapeHtml(v.title)}</div>
      </button>`).join('');
    html += `<div class="media-card add-more-tile"><span>+</span><div class="caption">${escapeHtml(c.addMoreLabel)}</div></div>`;
    grid.innerHTML = html;
  }

  function buildTalkingHead() {
    const grid = document.getElementById('talkingHeadGrid');
    if (!grid) return;
    const c = SITE.talkingHead;
    let html = c.videos.map(v => `
      <div class="media-card" style="grid-column: span 2; max-width:720px;">
        <video controls preload="metadata" src="${escapeHtml(v.src)}"></video>
        <div class="caption">${escapeHtml(v.title)} <span>${escapeHtml(v.caption)}</span></div>
      </div>`).join('');
    html += `<div class="media-card add-more-tile"><span>+</span><div class="caption">${escapeHtml(c.addMoreLabel)}</div></div>`;
    grid.innerHTML = html;
  }

  function buildGfx() {
    const bannerGrid = document.getElementById('gfxBannerGrid');
    if (bannerGrid) {
      bannerGrid.innerHTML = SITE.gfx.banners.items.map(item => `
        <button class="banner-item" type="button" data-lightbox data-src="${item.src}" aria-label="Open banner full size">
          <img src="${item.src}" alt="${escapeHtml(item.alt)}">
        </button>`).join('');
    }
    const thumbGrid = document.getElementById('gfxThumbGrid');
    if (thumbGrid) {
      thumbGrid.innerHTML = SITE.gfx.thumbnails.items.map(item => `
        <button class="thumb-item" type="button" data-lightbox data-src="${item.src}">
          <img src="${item.src}" alt="${escapeHtml(item.alt)}">
        </button>`).join('');
    }
  }

  function buildTools() {
    const grid = document.getElementById('toolsGrid');
    if (!grid) return;
    grid.innerHTML = SITE.tools.items.map(t => `
      <div class="tool-card">
        <span class="tool-icon">${t.icon}</span>
        <div class="tool-name">${escapeHtml(t.name)}</div>
        <div class="tool-sub">${escapeHtml(t.desc)}</div>
      </div>`).join('');
  }

  function buildSocials() {
    const grid = document.getElementById('socialsGrid');
    if (!grid) return;
    const title = s => `${s.name} — ${s.handle}`;
    let html = SITE.socials.items.map(s => `
      <a class="social-icon-btn" href="${s.url}" target="_blank" rel="noopener" title="${escapeHtml(title(s))}" aria-label="${escapeHtml(title(s))}">
        ${SOCIAL_ICONS[s.icon] || SOCIAL_ICONS.default}
      </a>`).join('');
    html += `<span class="social-more-btn" title="${escapeHtml(SITE.socials.moreSoonLabel)}" aria-label="${escapeHtml(SITE.socials.moreSoonLabel)}">+</span>`;
    grid.innerHTML = html;
  }

  function buildCommissionTerms() {
    const wrap = document.getElementById('commissionTerms');
    if (!wrap) return;
    wrap.innerHTML = SITE.commission.terms.map(t => `
      <div class="accordion-item">
        <div class="accordion-head"><span>${escapeHtml(t.question)}</span><span class="arrow">▾</span></div>
        <div class="accordion-body"><p>${escapeHtml(t.answer)}</p></div>
      </div>`).join('');
  }

  function buildCommissionFormOptions() {
    const select = document.getElementById('type');
    if (!select) return;
    select.innerHTML = SITE.commission.form.typeOptions.map(o => `<option>${escapeHtml(o)}</option>`).join('');
  }

  function buildCommissionContactLinks() {
    const wrap = document.getElementById('commissionContactLinks');
    if (!wrap) return;
    wrap.innerHTML = SITE.commission.contactLinks.map(l => {
      const external = /^https?:/.test(l.url);
      return `<a href="${l.url}"${external ? ' target="_blank" rel="noopener"' : ''}>${escapeHtml(l.label)}</a>`;
    }).join('');
  }

  // Run everything. Order matters: this script must run before script.js /
  // category-nav.js / lightbox.js (see the <script> order at the bottom of
  // index.html) so the elements those scripts look for already exist.
  renderSimpleBindings();
  wireChannelSocials();
  buildCategoryNav();
  buildAnimeEdits();
  buildTalkingHead();
  buildGfx();
  buildTools();
  buildSocials();
  buildCommissionTerms();
  buildCommissionFormOptions();
  buildCommissionContactLinks();
})();
