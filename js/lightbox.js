(function () {
  const overlay = document.getElementById('lightboxOverlay');
  const img = document.getElementById('lightboxImg');
  const videoWrap = document.getElementById('lightboxVideoWrap');
  const video = document.getElementById('lightboxVideo');
  const closeBtn = document.getElementById('lightboxClose');
  if (!overlay || !img) return;

  function openImage(src, alt) {
    img.src = src;
    img.alt = alt || '';
    img.hidden = false;
    if (videoWrap) videoWrap.hidden = true;
    if (video) video.src = '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function openVideo(videoId) {
    if (!video || !videoWrap) return;
    video.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
    videoWrap.hidden = false;
    img.hidden = true;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    img.src = '';
    if (video) video.src = ''; // stops playback/audio
  }

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const src = el.dataset.src || el.querySelector('img')?.src;
      const alt = el.querySelector('img')?.alt || '';
      if (src) openImage(src, alt);
    });
  });

  document.querySelectorAll('[data-lightbox-video]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openVideo(el.dataset.lightboxVideo);
    });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
})();

// Warn if the page was opened directly (file://) instead of through Start Website.bat —
// YouTube's embed player can't play inline in that case.
(function () {
  if (location.protocol !== 'file:') return;
  const banner = document.getElementById('fileProtocolWarning');
  const closeBtn = document.getElementById('fileProtocolWarningClose');
  if (!banner) return;
  banner.classList.add('show');
  if (closeBtn) closeBtn.addEventListener('click', () => banner.classList.remove('show'));
})();
