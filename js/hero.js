const heroContent = document.querySelector(".hero-content");
const heroVisual = document.querySelector(".hero-visual");
const heroButton = document.querySelector(".hero-button");

if (heroContent && heroVisual && heroButton) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion) {
    window.addEventListener("load", () => {
      requestAnimationFrame(() => {
        heroContent.classList.add("hero-show");
        heroVisual.classList.add("hero-show");
        heroButton.classList.add("hero-pulse");
      });
    });
  } else {
    heroContent.classList.add("hero-show");
    heroVisual.classList.add("hero-show");
  }
