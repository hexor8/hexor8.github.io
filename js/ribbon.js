/* ============================================================================
   RIBBON — the thin flowing line connecting Hero -> Watch My Stuff ->
   Anime Edits -> My Story -> Tools as the user scrolls.

   This is pure animation/design plumbing, not content. To change WHICH
   sections it connects, edit ANCHOR_IDS below (must match real section
   ids in index.html). To change the colors, edit the gradient <stop>
   colors on #ribbonGradient in index.html.
   ============================================================================ */
(function () {
  const ANCHOR_IDS = ['hero', 'watch-my-stuff', 'anime-edits', 'my-story', 'tools'];
  // Stays inside the left page margin the whole way down (a gentle wave, not
  // a full-width zigzag) so it never crosses over text, images, or cards.
  const X_PERCENTS = [4, 9, 5, 10, 4];

  const wrap = document.getElementById('ribbonWrap');
  const svg = document.getElementById('ribbonSvg');
  const path = document.getElementById('ribbonPath');
  if (!wrap || !svg || !path) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth curve through a list of {x,y} points (quadratic bezier segments,
  // each point acting as its own control point toward the next midpoint).
  function smoothPathD(points) {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midX = (p0.x + p1.x) / 2;
      const midY = (p0.y + p1.y) / 2;
      d += ` Q ${p0.x} ${p0.y} ${midX} ${midY}`;
    }
    const last = points[points.length - 1];
    d += ` L ${last.x} ${last.y}`;
    return d;
  }

  let cachedLength = 0;

  function build() {
    const totalHeight = document.documentElement.scrollHeight;
    const vw = window.innerWidth;

    const points = ANCHOR_IDS.map((id, i) => {
      const x = (X_PERCENTS[i] / 100) * vw;
      const el = document.getElementById(id);
      if (!el) return { x, y: (i / (ANCHOR_IDS.length - 1)) * totalHeight };
      const rect = el.getBoundingClientRect();
      const y = rect.top + window.scrollY + rect.height / 2;
      return { x, y };
    });

    wrap.style.height = totalHeight + 'px';
    svg.setAttribute('viewBox', `0 0 ${vw} ${totalHeight}`);
    path.setAttribute('d', smoothPathD(points));

    cachedLength = path.getTotalLength();
    if (prefersReduced) {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
    } else {
      path.style.strokeDasharray = cachedLength;
      updateDashOffset();
    }
  }

  function updateDashOffset() {
    if (prefersReduced || !cachedLength) return;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0
      ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
      : 1;
    path.style.strokeDashoffset = cachedLength * (1 - progress);
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updateDashOffset(); ticking = false; });
  }

  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 200);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('load', build);

  // Images (thumbnails, banners) loading in can change the page height
  // after our first measurement — catch that and re-measure.
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => onResize());
    ro.observe(document.body);
  }

  build();
})();
