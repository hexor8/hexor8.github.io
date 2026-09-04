/* ============================================================================
   RENDER ENGINE — reads content.json (window.SITE_CONTENT) and fills in the
   page. You shouldn't need to edit this file to change text/links/images —
   that all lives in content.json. This file is "plumbing."
   ============================================================================ */
(function () {
  const SITE = window.SITE_CONTENT;
  if (!SITE) {
    console.error('content.json did not load — window.SITE_CONTENT is missing.');
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
  // a new platform in content.json's socials.items and want a matching icon.
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

  // Shows only the first `limit` children of `grid` (those children must
  // carry "extra-item hidden-extra" for the ones beyond the limit), then
  // appends a button right after the grid that toggles the rest open and
  // closed again — every "Show More" on this site can also "Show Less".
  function attachShowMore(grid, hiddenCount, moreLabel, lessLabel) {
    if (!grid || hiddenCount <= 0) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'show-more-btn';
    btn.textContent = moreLabel;
    let expanded = false;
    btn.addEventListener('click', () => {
      expanded = !expanded;
      grid.querySelectorAll('.extra-item').forEach(el => el.classList.toggle('hidden-extra', !expanded));
      btn.textContent = expanded ? lessLabel : moreLabel;
    });
    grid.insertAdjacentElement('afterend', btn);
  }

  const GRID_VISIBLE_LIMIT = 2;
  const BANNER_VISIBLE_LIMIT = 1;

  function buildAnimeEdits() {
    const grid = document.getElementById('animeEditsGrid');
    if (!grid) return;
    const c = SITE.animeEdits;
    const html = c.videos.map((v, i) => `
      <button type="button" class="media-card${i >= GRID_VISIBLE_LIMIT ? ' extra-item hidden-extra' : ''}" data-lightbox-video="${escapeHtml(v.id)}">
        <div class="media-thumb"><img src="https://i.ytimg.com/vi/${escapeHtml(v.id)}/hqdefault.jpg" alt=""><span class="play">▶</span></div>
        <div class="caption">${escapeHtml(v.title)}</div>
      </button>`).join('');
    grid.innerHTML = html;
    const hidden = Math.max(0, c.videos.length - GRID_VISIBLE_LIMIT);
    attachShowMore(grid, hidden, `Show ${hidden} More`, 'Show Less');
  }

  function buildTalkingHead() {
    const grid = document.getElementById('talkingHeadGrid');
    if (!grid) return;
    const c = SITE.talkingHead;
    const html = c.videos.map((v, i) => `
      <div class="media-card${i >= GRID_VISIBLE_LIMIT ? ' extra-item hidden-extra' : ''}" style="grid-column: span 2; max-width:720px;">
        <video controls preload="metadata" src="${escapeHtml(v.src)}"></video>
        <div class="caption">${escapeHtml(v.title)} <span>${escapeHtml(v.caption)}</span></div>
      </div>`).join('');
    grid.innerHTML = html;
    const hidden = Math.max(0, c.videos.length - GRID_VISIBLE_LIMIT);
    attachShowMore(grid, hidden, `Show ${hidden} More`, 'Show Less');
  }

  function buildGfx() {
    const bannerGrid = document.getElementById('gfxBannerGrid');
    if (bannerGrid) {
      bannerGrid.innerHTML = SITE.gfx.banners.items.map((item, i) => `
        <button class="banner-item${i >= BANNER_VISIBLE_LIMIT ? ' extra-item hidden-extra' : ''}" type="button" data-lightbox data-src="${item.src}" aria-label="Open banner full size">
          <img src="${item.src}" alt="${escapeHtml(item.alt)}">
        </button>`).join('');
      const hiddenBanners = Math.max(0, SITE.gfx.banners.items.length - BANNER_VISIBLE_LIMIT);
      attachShowMore(bannerGrid, hiddenBanners, `Show ${hiddenBanners} More Banners`, 'See Less');
    }
    const thumbGrid = document.getElementById('gfxThumbGrid');
    if (thumbGrid) {
      thumbGrid.innerHTML = SITE.gfx.thumbnails.items.map((item, i) => `
        <button class="thumb-item${i >= GRID_VISIBLE_LIMIT ? ' extra-item hidden-extra' : ''}" type="button" data-lightbox data-src="${item.src}">
          <img src="${item.src}" alt="${escapeHtml(item.alt)}">
        </button>`).join('');
      const hiddenThumbs = Math.max(0, SITE.gfx.thumbnails.items.length - GRID_VISIBLE_LIMIT);
      attachShowMore(thumbGrid, hiddenThumbs, `Show ${hiddenThumbs} More`, 'Show Less');
    }
  }

  function buildHeroSkills() {
    const wrap = document.getElementById('heroSkills');
    if (!wrap) return;
    wrap.innerHTML = SITE.hero.skills.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('');
  }

  function buildTalkingHeadTags() {
    const wrap = document.getElementById('talkingHeadTags');
    if (!wrap) return;
    wrap.innerHTML = SITE.talkingHead.sampleWorkTags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
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

  function buildCommissionProcess() {
    const wrap = document.getElementById('commissionProcess');
    if (!wrap) return;
    const steps = SITE.commission.process;
    wrap.innerHTML = steps.map((step, i) => `
      <div class="process-step">
        <div class="process-num">${i + 1}</div>
        <div class="process-title">${escapeHtml(step.title)}</div>
        <div class="process-desc">${escapeHtml(step.description)}</div>
      </div>
      ${i < steps.length - 1 ? '<div class="process-arrow">↓</div>' : ''}`).join('');
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

  function buildYourProcess() {
    const wrap = document.getElementById('yourProcessSteps');
    if (!wrap) return;
    const steps = SITE.commission.yourProcess;
    wrap.innerHTML = steps.map((step, i) => `
      <div class="process-step">
        <div class="process-num">${i + 1}</div>
        <div class="process-title">${escapeHtml(step.title)}</div>
        <div class="process-desc">${escapeHtml(step.description)}</div>
      </div>
      ${i < steps.length - 1 ? '<div class="process-arrow">↓</div>' : ''}`).join('');
  }

  // Renders one Shop sub-category (Macros/PowerGrades/Assets/Other) as a
  // heading plus either real item cards or a "Coming Soon" placeholder.
  function shopCategoryHtml(cat) {
    const itemsHtml = cat.items.length
      ? cat.items.map((item, i) => {
          // A same-origin asset (assets/...) triggers a real browser download
          // via the `download` attribute. An external link (e.g. Google
          // Drive) can't do that cross-origin anyway, so it just opens the
          // file's Drive page in a new tab instead — which is the point.
          const isExternal = /^https?:\/\//.test(item.fileUrl);
          const downloadAttrs = isExternal ? 'target="_blank" rel="noopener"' : 'download';
          return `
        <div class="shop-item${i >= GRID_VISIBLE_LIMIT ? ' extra-item hidden-extra' : ''}">
          <div class="shop-item-name">${escapeHtml(item.name)}</div>
          <p class="shop-item-desc">${escapeHtml(item.description)}</p>
          <div class="shop-item-actions">
            <a class="btn btn-primary" href="${escapeHtml(item.fileUrl)}" ${downloadAttrs}>Download — ${escapeHtml(item.price)}</a>
            ${item.videoUrl ? `<a class="btn btn-outline" href="${escapeHtml(item.videoUrl)}" target="_blank" rel="noopener">Watch the Edit</a>` : ''}
          </div>
        </div>`;
        }).join('')
      : '<div class="shop-item shop-item-empty">Coming Soon</div>';
    return `
      <div class="shop-category">
        <h4>${escapeHtml(cat.label)}</h4>
        <div class="shop-item-grid">${itemsHtml}</div>
      </div>`;
  }

  // Shop shows only its real, downloadable free items up front; every
  // empty free category and all of Paid Products sit behind one dropdown
  // toggle (#shopMore) instead of a wall of "Coming Soon" placeholders.
  function buildShop() {
    const populated = SITE.shop.freeCategories.filter(cat => cat.items.length > 0);
    const empty = SITE.shop.freeCategories.filter(cat => cat.items.length === 0);

    const freeWrap = document.getElementById('shopFreeCategories');
    if (freeWrap) {
      freeWrap.innerHTML = populated.map(shopCategoryHtml).join('');
      freeWrap.querySelectorAll('.shop-item-grid').forEach((grid, idx) => {
        const hidden = Math.max(0, populated[idx].items.length - GRID_VISIBLE_LIMIT);
        attachShowMore(grid, hidden, `Show ${hidden} More`, 'Show Less');
      });
    }

    const moreCategoriesWrap = document.getElementById('shopFreeMoreCategories');
    if (moreCategoriesWrap) {
      moreCategoriesWrap.innerHTML = empty.map(shopCategoryHtml).join('');
    }

    const paidWrap = document.getElementById('shopPaidCategories');
    if (paidWrap) {
      paidWrap.innerHTML = SITE.shop.paidCategories.map(label => `
        <div class="shop-category">
          <h4>${escapeHtml(label)}</h4>
          <div class="shop-item-grid"><div class="shop-item shop-item-empty">${escapeHtml(SITE.shop.paidComingSoonText)}</div></div>
        </div>`).join('');
    }

    const moreSection = document.getElementById('shopMore');
    if (moreSection) {
      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'show-more-btn';
      toggleBtn.textContent = 'Show More ▾';
      toggleBtn.addEventListener('click', () => {
        const isOpen = moreSection.classList.toggle('open');
        moreSection.classList.toggle('hidden-extra', !isOpen);
        toggleBtn.textContent = isOpen ? 'Show Less ▴' : 'Show More ▾';
      });
      moreSection.insertAdjacentElement('beforebegin', toggleBtn);
    }
  }

  // My Story is written in content.json as one multi-paragraph string (blank
  // line = paragraph break, see the file's own comment on that). Only the
  // first paragraph shows by default; the rest sit behind "Read More".
  function buildMyStory() {
    const wrap = document.getElementById('myStoryText');
    if (!wrap) return;
    const paragraphs = SITE.myStory.paragraph.split(/\n\s*\n/);
    const html = paragraphs.map((p, i) => `<p${i > 0 ? ' class="extra-item hidden-extra"' : ''}>${escapeHtml(p)}</p>`).join('');
    wrap.innerHTML = html;
    attachShowMore(wrap, paragraphs.length - 1, 'Read More', 'Show Less');
  }

  // Shared renderer for the Terms & Conditions / Privacy Policy sections —
  // both are a list of {heading, text} entries in content.json "legal". Only
  // the first section shows by default, the rest sit behind one "Read Full
  // Policy" toggle instead of a wall of text.
  function buildLegalSection(containerId, sections) {
    const wrap = document.getElementById(containerId);
    if (!wrap || !sections.length) return;
    const html = sections.map((s, i) => `
      <div class="legal-section${i > 0 ? ' extra-item hidden-extra' : ''}">
        <h4>${escapeHtml(s.heading)}</h4>
        <p>${escapeHtml(s.text)}</p>
      </div>`).join('');
    wrap.innerHTML = html;
    attachShowMore(wrap, sections.length - 1, SITE.legal.readMoreLabel, 'Show Less');
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
  buildHeroSkills();
  buildTalkingHeadTags();
  buildCategoryNav();
  buildAnimeEdits();
  buildTalkingHead();
  buildGfx();
  buildTools();
  buildSocials();
  buildCommissionProcess();
  buildCommissionTerms();
  buildYourProcess();
  buildCommissionContactLinks();
  buildShop();
  buildMyStory();
  buildLegalSection('termsSections', SITE.legal.termsSections);
  buildLegalSection('privacySections', SITE.legal.privacySections);
})();
