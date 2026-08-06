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

  /* ---------- Слайдеры портфолио ---------- */
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const track = slider.querySelector('.slider__track');
    const slides = slider.querySelectorAll('.slider__slide');
    const prev = slider.querySelector('.slider__btn--prev');
    const next = slider.querySelector('.slider__btn--next');
    const dotsWrap = slider.querySelector('.slider__dots');
    let index = 0;

    const setIndex = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(' + -index * 100 + '%)';
      dotsWrap.querySelectorAll('.slider__dot').forEach((dot, j) => {
        dot.classList.toggle('is-active', j === index);
      });
      prev.classList.toggle('is-hidden', slides.length <= 1);
      next.classList.toggle('is-hidden', slides.length <= 1);
    };

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider__dot';
      dot.setAttribute('aria-label', 'Скриншот ' + (i + 1));
      dot.addEventListener('click', () => setIndex(i));
      dotsWrap.appendChild(dot);
    });

    prev.addEventListener('click', () => setIndex(index - 1));
    next.addEventListener('click', () => setIndex(index + 1));

    let startX = null;
    slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) setIndex(index + (dx < 0 ? 1 : -1));
      startX = null;
    }, { passive: true });

    setIndex(0);
  });

  /* ---------- Шаблоны: переключение превью ---------- */
  document.querySelectorAll('.template').forEach((template) => {
    const stage = template.querySelector('.template__stage img');
    const thumbs = template.querySelectorAll('.template__thumb');

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        stage.style.opacity = '0';
        setTimeout(() => {
          stage.src = thumb.dataset.img;
          stage.style.opacity = '1';
        }, 160);
        thumbs.forEach((t) => t.classList.remove('is-active'));
        thumb.classList.add('is-active');
      });
    });
  });
})();
