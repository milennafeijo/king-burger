if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const observerOptions = {
  root: null,
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {

      if (entry.target.classList.contains("reveal-jump") &&
        entry.target.closest(".ingredients-grid")) {
        const grid = entry.target.closest(".ingredients-grid");
        const cards = grid.querySelectorAll(".reveal-jump");
        cards.forEach(card => card.classList.add("reveal-jump--visible"));
        observer.unobserve(entry.target);
        cards.forEach(card => observer.unobserve(card));
      } else if (entry.target.classList.contains("reveal-counter")) {

        const targetValue = parseInt(entry.target.innerText);
        const duration = 600;
        let startTime = null;

        const animateCounter = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const currentValue = Math.floor(progress * (targetValue + 1));


          entry.target.innerText = Math.min(currentValue, targetValue);

          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            entry.target.innerText = targetValue;
          }
        };

        requestAnimationFrame(animateCounter);
        observer.unobserve(entry.target);
      } else if (entry.target.classList.contains("reveal-jump")) {
        entry.target.classList.add("reveal-jump--visible");
      } else if (entry.target.classList.contains("reveal-right")) {
        entry.target.classList.add("reveal-right--visible");
      } else if (entry.target.classList.contains("reveal-elastic")) {
        entry.target.classList.add("reveal-elastic--visible");
      } else {
        entry.target.classList.add("reveal--visible");
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);


document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal, .reveal-jump, .reveal-counter, .reveal-right, .reveal-elastic");
  revealElements.forEach((el) => observer.observe(el));
});

