const siteHeader = document.querySelector('.site-header');
const mainNav = document.querySelector('.main-nav');

if (siteHeader && mainNav) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateMenuState = () => {
    const shouldShrink = window.scrollY > 50;

    if (shouldShrink) {
      siteHeader.classList.add('is-scrolled');
      mainNav.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
      mainNav.classList.remove('is-scrolled');
    }
  };

  if (!prefersReducedMotion) {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateMenuState();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateMenuState);
  }

  updateMenuState();
}

const menuToggle = document.querySelector('.menu-toggle');
const closeMenuBtn = document.querySelector('.close-menu');
const navMenuLinks = document.querySelectorAll('.nav-menu a');
const mobileOverlay = document.querySelector('.mobile-overlay');

if (menuToggle && siteHeader) {
  const openMenu = () => {
    siteHeader.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    siteHeader.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);


  navMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {

      tabs.forEach(t => t.classList.remove('menu-tab--active'));
      tab.classList.add('menu-tab--active');

      const category = tab.getAttribute('data-category');

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || category === cardCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
