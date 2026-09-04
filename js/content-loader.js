/* ============================================================================
   CONTENT LOADER — fetches content.json (instead of a hardcoded content.js)
   and only then loads the rest of the page's scripts, in the same order
   they used to run as plain <script> tags. This lets the admin panel
   (admin-worker/) edit content.json directly and have it show up here
   without editing any HTML/JS.
   ============================================================================ */
(function () {
  // Cache-busted so a fresh edit shows up on reload instead of a stale
  // cached copy (matters once this is served from GitHub Pages/a CDN).
  fetch('content.json?_=' + Date.now())
    .then(function (res) {
      if (!res.ok) throw new Error('content.json responded with ' + res.status);
      return res.json();
    })
    .then(function (data) {
      window.SITE_CONTENT = data;
      return loadScriptsInOrder([
        'js/render.js',
        'js/script.js',
        'js/category-nav.js',
        'js/lightbox.js',
        'js/particles.js',
        'js/text-animate.js',
        'js/commission-form.js',
      ]);
    })
    .catch(function (err) {
      console.error('Failed to load site content:', err);
    });

  function loadScriptsInOrder(srcs) {
    return srcs.reduce(function (chain, src) {
      return chain.then(function () {
        return new Promise(function (resolve, reject) {
          var s = document.createElement('script');
          s.src = src;
          s.onload = resolve;
          s.onerror = function () { reject(new Error('Failed to load ' + src)); };
          document.body.appendChild(s);
        });
      });
    }, Promise.resolve());
  }
})();
