function svgPl(w, h, text, sub, bg, fg) {
  const s = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${bg}"/><text x="${w/2}" y="${sub ? h/2-14 : h/2}" text-anchor="middle" dominant-baseline="middle" font-family="Inter,sans-serif" font-size="${Math.round(Math.min(w,h)/22)}" font-weight="500" fill="${fg}">${text}</text>${sub ? `<text x="${w/2}" y="${h/2+18}" text-anchor="middle" dominant-baseline="middle" font-family="Inter,sans-serif" font-size="${Math.round(Math.min(w,h)/35)}" fill="${fg}" opacity="0.6">${sub}</text>` : ''}<rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="${fg}" stroke-width="0.5" opacity="0.08"/></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(s);
}

    const projects = [
      {
        id: 1,
        title: 'AESTHETE',
        desc: 'Сайт-каталог для мебельного магазина с удобным поиском и фильтрацией товаров.',
        tags: ['HTML', 'CSS', 'JS'],
        preview: 'проекты/мебельный магазин-1.png',
        images: [
          'проекты/мебельный магазин-1.png',
          'проекты/мебельный магазин-2.png'
        ],
        task: 'Создать удобный каталог с фильтрацией для увеличения продаж',
        tech: 'HTML, CSS, JavaScript',
        term: '7 дней'
      },
      {
        id: 2,
        title: 'KARCAS',
        desc: 'Корпоративный сайт для строительной компании с портфолио объектов и услуг.',
        tags: ['HTML', 'CSS', 'JS'],
        preview: 'проекты/строй компания-1.png',
        images: [
          'проекты/строй компания-1.png',
          'проекты/строй компания-2.png'
        ],
        task: 'Разработать имиджевый сайт для привлечения новых клиентов',
        tech: 'HTML, CSS, JavaScript',
        term: '10 дней'
      },
      {
        id: 3,
        title: 'SnovaVtur',
        desc: 'Полноценный сайт для тур-компании с подборками туров по Дагестану.',
        tags: ['HTML', 'CSS', 'JS'],
        preview: 'проекты/SnovaVtur-1.png',
        images: [
          'проекты/SnovaVtur-1.png',
          'проекты/SnovaVtur-2.png',
          'проекты/SnovaVtur-3.png'
        ],
        task: 'Привлечь больше заявок на туры через продающий сайт',
        tech: 'HTML, CSS, JavaScript',
        term: '5 дней'
      },
      {
        id: 4,
        title: 'CRUDO',
        desc: 'Сайт для кафе в Махачкале с меню, галереей и контактами.',
        tags: ['HTML', 'CSS', 'JS'],
        preview: 'проекты/crudo-1.png',
        images: [
          'проекты/crudo-1.png',
          'проекты/crudo-2.png',
          'проекты/crudo-3.png'
        ],
        task: 'Создать атмосферный сайт для привлечения гостей',
        tech: 'HTML, CSS, JavaScript',
        term: '2 дня'
      }
    ];

const templates = [
  {
    title: 'Шаблон №1',
    category: 'Кафе / Ресторан',
    images: [
      'шаблоны/шаблон-1.1.png',
      'шаблоны/шаблон-1.2.png',
      'шаблоны/шаблон-1.3.png'
    ]
  },
  {
    title: 'Шаблон №2',
    category: 'Кафе / Ресторан',
    images: [
      'шаблоны/шаблон-2.1.png',
      'шаблоны/шаблон-2.2.png',
      'шаблоны/шаблон-2.3.png'
    ]
  },
  {
    title: 'Шаблон №3',
    category: 'Кафе / Ресторан',
    images: [
      'шаблоны/шаблон-3.1.png',
      'шаблоны/шаблон-3.2.png',
      'шаблоны/шаблон-3.3.png'
    ]
  }
];

// Render projects
const projectsGrid = document.getElementById('projectsGrid');
projectsGrid.innerHTML = projects.map(p => `
  <article class="project-card animate" data-id="${p.id}" data-delay="1">
    <div class="card-image">
      <img src="${p.preview}" alt="${p.title}" loading="lazy" />
      <div class="card-overlay"><span>Смотреть проект →</span></div>
    </div>
    <div class="card-body">
      <div class="card-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-desc">${p.desc}</p>
    </div>
  </article>
`).join('');

// Render templates
const templatesGrid = document.getElementById('templatesGrid');
templatesGrid.innerHTML = templates.map((t, idx) => `
  <article class="template-card animate" data-delay="1" data-template="${idx}">
    <div class="card-image">
      <img src="${t.images[0]}" alt="${t.title}" loading="lazy" />
      <div class="card-overlay">Посмотреть</div>
    </div>
    <div class="card-body">
      <span class="category-badge">${t.category}</span>
      <h3>${t.title}</h3>
    </div>
  </article>
`).join('');

// Modal
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalMainImg = document.getElementById('modalMainImg');
const modalTags = document.getElementById('modalTags');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalMeta = document.getElementById('modalMeta');

const modalImages = document.getElementById('modalImages');

let currentProject = null;
let currentImageIndex = 0;

function openModal(id) {
  const p = projects.find(proj => proj.id === id);
  if (!p) return;
  currentProject = p;
  currentImageIndex = 0;

  modalTags.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalMeta.innerHTML = `
    <div class="meta-block"><span class="meta-label">ЗАДАЧА</span><span class="meta-text">${p.task}</span></div>
    <div class="meta-block"><span class="meta-label">ТЕХНОЛОГИИ</span><span class="meta-text">${p.tech}</span></div>
    <div class="meta-block"><span class="meta-label">СРОК</span><span class="meta-text">${p.term}</span></div>
  `;


  updateCarousel();
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateCarousel() {
  if (!currentProject) return;
  const img = currentProject.images[currentImageIndex];
  modalMainImg.src = img;
  modalMainImg.alt = currentProject.title;

  modalImages.querySelectorAll('.modal-carousel-btn').forEach(b => b.remove());

  if (currentProject.images.length > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'modal-carousel-btn prev';
    prevBtn.innerHTML = '‹';
    prevBtn.onclick = () => {
      currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
      updateCarousel();
    };
    const nextBtn = document.createElement('button');
    nextBtn.className = 'modal-carousel-btn next';
    nextBtn.innerHTML = '›';
    nextBtn.onclick = () => {
      currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
      updateCarousel();
    };
    modalImages.appendChild(prevBtn);
    modalImages.appendChild(nextBtn);
  }
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  currentProject = null;
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeLightbox();
  }
});

// Project card click
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    openModal(parseInt(card.dataset.id));
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentTemplate = null;
let currentTmplIndex = 0;

function openLightbox(tmplIdx, imgIdx) {
  currentTemplate = templates[tmplIdx];
  currentTmplIndex = imgIdx;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateLightbox() {
  if (!currentTemplate) return;
  lightboxImg.src = currentTemplate.images[currentTmplIndex];
  lightboxImg.alt = currentTemplate.title;
  lightboxPrev.style.display = currentTemplate.images.length > 1 ? '' : 'none';
  lightboxNext.style.display = currentTemplate.images.length > 1 ? '' : 'none';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  currentTemplate = null;
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

lightboxPrev.addEventListener('click', () => {
  if (!currentTemplate) return;
  currentTmplIndex = (currentTmplIndex - 1 + currentTemplate.images.length) % currentTemplate.images.length;
  updateLightbox();
});

lightboxNext.addEventListener('click', () => {
  if (!currentTemplate) return;
  currentTmplIndex = (currentTmplIndex + 1) % currentTemplate.images.length;
  updateLightbox();
});

document.querySelectorAll('.template-card').forEach(card => {
  card.addEventListener('click', () => {
    const idx = parseInt(card.dataset.template);
    if (!isNaN(idx)) openLightbox(idx, 0);
  });
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Header scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// Hero stagger + about photo on load
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('aboutPhoto').src = 'img/фон-1.png';
  document.querySelectorAll('.hero-stagger').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 100);
  });

  // Header CTA button
  document.querySelector('.header-cta')?.addEventListener('click', () => {
    document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
  });
});
