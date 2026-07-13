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

/* === LÓGICA DE FILTRO DO MENU === */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Atualiza aba ativa
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
