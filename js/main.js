/* Портфолио — Мухаммад */
(function () {
  'use strict';

  /* ---------- Шапка: тень при скролле ---------- */
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Бургер-меню ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Появление секций при скролле ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Лайтбокс: дизайн-концепции ---------- */
  const conceptGroups = [
    ['концепции/концепция-1.1.png', 'концепции/концепция-1.2.png', 'концепции/концепция-1.3.png'],
    ['концепции/концепция-2.1.png', 'концепции/концепция-2.2.png', 'концепции/концепция-2.3.png'],
    ['концепции/концепция-3.1.png', 'концепции/концепция-3.2.png', 'концепции/концепция-3.3.png', 'концепции/концепция-3.4.png'],
    ['концепции/концепция-4.1.png', 'концепции/концепция-4.2.png', 'концепции/концепция-4.3.png', 'концепции/концепция-4.4.png']
  ];

  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxPrev = lightbox.querySelector('.lightbox__nav--prev');
    const lightboxNext = lightbox.querySelector('.lightbox__nav--next');
    const lightboxClose = lightbox.querySelector('.lightbox__close');
    let currentGroup = [];
    let currentIndex = 0;

    const render = () => {
      lightboxImg.src = currentGroup[currentIndex];
      lightboxImg.alt = 'Дизайн-концепция ' + String(currentIndex + 1).padStart(2, '0');
    };
    const open = (index) => {
      currentIndex = index;
      render();
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    };
    const close = () => {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    const step = (dir) => {
      currentIndex = (currentIndex + dir + currentGroup.length) % currentGroup.length;
      render();
    };

    document.querySelectorAll('.concept__frame').forEach((btn) => {
      btn.addEventListener('click', () => {
        const groupIndex = Number(btn.closest('.concept').dataset.concept);
        currentGroup = conceptGroups[groupIndex];
        open(0);
      });
    });

    lightboxPrev.addEventListener('click', () => step(-1));
    lightboxNext.addEventListener('click', () => step(1));
    lightboxClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }
})();