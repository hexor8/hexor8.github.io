/* ============================================================================
   TEXT ANIMATIONS — word-by-word fade-up for the hero heading on load.
   Runs after render.js so it operates on the real text, not placeholders.
   ============================================================================ */
(function () {
  const heading = document.querySelector('.hero h1');
  if (!heading) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function wrapWords(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) textNodes.push(node);

    let wordIndex = 0;
    textNodes.forEach((tn) => {
      const parts = tn.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      parts.forEach((part) => {
        if (part.trim() === '') {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        const span = document.createElement('span');
        span.className = 'word-anim';
        span.style.animationDelay = (wordIndex * 0.08) + 's';
        span.textContent = part;
        frag.appendChild(span);
        wordIndex++;
      });
      tn.parentNode.replaceChild(frag, tn);
    });
  }

  wrapWords(heading);
})();
