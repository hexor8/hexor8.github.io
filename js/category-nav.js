// Category nav: active-section highlighting + a simple fixed/unfixed
// toggle so it stays available while scrolling. No scroll-linked
// resizing or FLIP-style animation — just plain show/hide.
(function () {
  const nav = document.getElementById('categoryNav');
  const sentinel = document.getElementById('categoryNavSentinel');
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll('a'));
  const sections = links
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  if (sections.length) {
    const activeIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(sec => activeIO.observe(sec));
  }

  if (sentinel) {
    const fixIO = new IntersectionObserver(([entry]) => {
      nav.classList.toggle('is-fixed', !entry.isIntersecting && entry.boundingClientRect.top < 0);
    }, { threshold: 0 });
    fixIO.observe(sentinel);
  }
})();
