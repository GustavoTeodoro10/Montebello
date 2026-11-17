/* ============================================================
   Espaço VIP Montebello — app.js
   ============================================================ */

/* ---- Navbar scroll ---- */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 48);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

/* ---- Mobile menu ---- */
(function () {
  const btn  = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  const closeBtn = document.getElementById('menu-close');

  function open() {
    menu.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    btn.setAttribute('aria-expanded', 'true');
  }

  function close() {
    menu.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
    btn.setAttribute('aria-expanded', 'false');
  }

  if (btn)     btn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (overlay)  overlay.addEventListener('click', close);

  // Close on nav link click
  menu && menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();

/* ---- Smooth nav links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ---- FAQ Accordion ---- */
(function () {
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) item.classList.add('open');

      this.setAttribute('aria-expanded', item.classList.contains('open').toString());
    });
  });
})();

/* ---- Scroll Reveal ---- */
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ---- GoatCounter analytics & CTA tracking ---- */
(function () {
  document.querySelectorAll('[data-gc-event]').forEach(el => {
    el.addEventListener('click', function () {
      const eventName = this.getAttribute('data-gc-event');
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({
          path:  eventName,
          title: eventName,
          event: true,
        });
      }
    });
  });
})();

/* ---- Active nav link on scroll ---- */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();
