// ============================================
// Kids Menu Carousel Logic
// ============================================

const initKidsCarousel = () => {
  const slides = [
    'public/images/tartarugas.png',
    'public/images/samurai.png'
  ];

  let currentIndex = 0;
  let autoPlayTimer;
  const kidsInner = document.querySelector('.kids-inner');
  const slideImage = document.querySelector('.kids-slide-card img');
  const prevBtn = document.querySelector('.kids-arrow--prev');
  const nextBtn = document.querySelector('.kids-arrow--next');
  const dots = document.querySelectorAll('.kids-dot');

  if (!kidsInner || !slideImage || !prevBtn || !nextBtn) return;

  const updateDots = () => {
    dots.forEach((dot, index) => {
      dot.classList.toggle('kids-dot--active', index === currentIndex);
    });
  };

  const updateSlide = () => {
    // Inicia a transição de saída de todo o conteúdo
    kidsInner.style.opacity = '0';
    kidsInner.style.transform = 'scale(0.98)';
    kidsInner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    setTimeout(() => {
      // Troca a imagem enquanto o conteúdo está invisível
      slideImage.src = slides[currentIndex];

      // Atualiza os dots
      updateDots();

      // Retorna o conteúdo com efeito de entrada
      kidsInner.style.opacity = '1';
      kidsInner.style.transform = 'scale(1)';
    }, 300);
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlide();
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  };

  prevBtn.addEventListener('click', () => {
    stopAutoPlay();
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
    startAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    stopAutoPlay();
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
    startAutoPlay();
  });

  // Inicia o autoplay e a primeira renderização dos dots
  updateDots();
  startAutoPlay();
};

document.addEventListener('DOMContentLoaded', initKidsCarousel);
