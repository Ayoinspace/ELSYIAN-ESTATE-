/* ==========================================================================
   Elysian Estates - Sliders & Carousels
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Background Image Slider
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    const intervalTime = 6000;

    const nextSlide = () => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    };

    setInterval(nextSlide, intervalTime);
  }

  // 2. Testimonials Carousel Slider
  const testimonialContainer = document.querySelector('.testimonial-slider');
  if (testimonialContainer) {
    const slides = testimonialContainer.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-dots');

    if (slides.length > 0) {
      let activeIndex = 0;

      // Create dots
      if (dotsContainer && slides.length > 1) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
          const dot = document.createElement('button');
          dot.className = `testimonial-dot ${idx === 0 ? 'active' : ''}`;
          dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
          dot.addEventListener('click', () => goToSlide(idx));
          dotsContainer.appendChild(dot);
        });
      }

      const goToSlide = (index) => {
        slides.forEach((slide, idx) => {
          slide.style.display = idx === index ? 'block' : 'none';
        });
        activeIndex = index;

        if (dotsContainer) {
          const dots = dotsContainer.querySelectorAll('.testimonial-dot');
          dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
          });
        }
      };

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          const newIdx = (activeIndex - 1 + slides.length) % slides.length;
          goToSlide(newIdx);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const newIdx = (activeIndex + 1) % slides.length;
          goToSlide(newIdx);
        });
      }

      // Initialize
      goToSlide(0);
    }
  }
});
