/* ============================================================================
   PARTICLES — subtle decorative floating dots (design/animation only).
   To change count/colors/speed, edit the constants below.
   ============================================================================ */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const COUNT = 16;
  const COLORS = ['var(--coral)', 'var(--purple)', 'var(--gold)', 'var(--rose)'];

  const wrap = document.createElement('div');
  wrap.className = 'particles-wrap';
  wrap.setAttribute('aria-hidden', 'true');

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = 4 + Math.random() * 6;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = COLORS[i % COLORS.length];
    p.style.opacity = (0.15 + Math.random() * 0.25).toFixed(2);
    p.style.animationDuration = (14 + Math.random() * 12) + 's';
    p.style.animationDelay = (Math.random() * -24) + 's';
    wrap.appendChild(p);
  }

  // Inserted as the very first element in <body> so it paints behind the
  // rest of the page's content (same approach the old ribbon used).
  document.body.insertBefore(wrap, document.body.firstChild);
})();
