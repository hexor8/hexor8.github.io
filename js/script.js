// Nav toggle (mobile)
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// The sticky nav's name/logo only shows once the channel header (which
// already shows the name big) has scrolled out of view — otherwise the
// name appears twice, stacked right on top of each other.
const channelBar = document.querySelector('.channel-bar');
const navBrand = document.querySelector('.site-nav .brand');
if (channelBar && navBrand) {
  const brandIO = new IntersectionObserver(([entry]) => {
    navBrand.classList.toggle('brand-hidden', entry.isIntersecting);
  }, { threshold: 0 });
  brandIO.observe(channelBar);
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

// Generic collapsed-section toggle: any button with data-toggle-target
// shows/hides the element with that id (Payment/Revisions/etc., and the
// "Wanna know more?" toggles on How Commissions Work / Your Process).
document.querySelectorAll('[data-toggle-target]').forEach(btn => {
  const body = document.getElementById(btn.dataset.toggleTarget);
  if (!body) return;
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    body.classList.toggle('hidden-extra', !isOpen);
  });
});

// Terms accordion
document.querySelectorAll('.accordion-head').forEach(head => {
  head.addEventListener('click', () => {
    const item = head.parentElement;
    const body = item.querySelector('.accordion-body');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.accordion-body').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});
