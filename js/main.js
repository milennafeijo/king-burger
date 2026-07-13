const header = document.querySelector('.site-header');
const toggleButton = document.querySelector('.menu-toggle');
const closeButton = document.querySelector('.close-menu');
const menu = document.querySelector('.nav-menu');
const overlay = document.querySelector('.mobile-overlay');
const menuIcon = toggleButton?.querySelector('.menu-icon');
const navLinks = document.querySelectorAll('.nav-menu a');

function setMenuState(isOpen) {
  header?.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);

  if (toggleButton) {
    toggleButton.setAttribute('aria-expanded', String(isOpen));
    toggleButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  }

  if (menuIcon) {
    menuIcon.textContent = isOpen ? '✕' : '☰';
  }
}

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    const isOpen = header?.classList.contains('is-open');
    setMenuState(!isOpen);
  });
}

if (closeButton) {
  closeButton.addEventListener('click', () => setMenuState(false));
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      setMenuState(false);
    }
  });
});

if (overlay) {
  overlay.addEventListener('click', () => setMenuState(false));
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    setMenuState(false);
  }
});

setMenuState(false);
