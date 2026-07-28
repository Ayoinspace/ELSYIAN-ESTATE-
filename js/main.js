/* ==========================================================================
   Elysian Estates - Main Application Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer for Scroll Animations
  const animElements = document.querySelectorAll('.animate-on-scroll');
  if (animElements.length > 0) {
    const animObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animElements.forEach(el => animObserver.observe(el));
  }

  // 2. Accordion FAQ Handler
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close other accordion items
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const content = otherItem.querySelector('.accordion-content');
          if (content) content.style.maxHeight = null;
        }
      });

      // Toggle current item
      item.classList.toggle('active', !isActive);
      const content = item.querySelector('.accordion-content');
      if (content) {
        content.style.maxHeight = !isActive ? `${content.scrollHeight}px` : null;
      }
    });
  });

  // 3. Back-To-Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Mortgage Calculator Functionality
  const calcForm = document.querySelector('#mortgage-calc-form');
  if (calcForm) {
    const homePriceInput = document.querySelector('#calc-home-price');
    const downPaymentInput = document.querySelector('#calc-down-payment');
    const interestRateInput = document.querySelector('#calc-interest-rate');
    const loanTermInput = document.querySelector('#calc-loan-term');
    const monthlyResultEl = document.querySelector('#calc-monthly-result');

    const calculateMortgage = () => {
      const homePrice = parseFloat(homePriceInput.value) || 0;
      const downPayment = parseFloat(downPaymentInput.value) || 0;
      const annualRate = parseFloat(interestRateInput.value) || 0;
      const years = parseInt(loanTermInput.value) || 30;

      const principal = Math.max(0, homePrice - downPayment);
      const monthlyRate = annualRate / 100 / 12;
      const numberOfPayments = years * 12;

      let monthlyPayment = 0;
      if (monthlyRate > 0 && numberOfPayments > 0) {
        monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      } else if (numberOfPayments > 0) {
        monthlyPayment = principal / numberOfPayments;
      }

      if (monthlyResultEl) {
        monthlyResultEl.textContent = `$${Math.round(monthlyPayment).toLocaleString()}`;
      }
    };

    [homePriceInput, downPaymentInput, interestRateInput, loanTermInput].forEach(input => {
      if (input) input.addEventListener('input', calculateMortgage);
    });

    calculateMortgage(); // Initial run
  }

  // 5. Image Lightbox Handler
  const galleryImages = document.querySelectorAll('.lightbox-trigger');
  if (galleryImages.length > 0) {
    const lightboxModal = document.createElement('div');
    lightboxModal.className = 'modal-backdrop lightbox-modal';
    lightboxModal.innerHTML = `
      <div class="modal-dialog" style="max-width: 1000px; padding: 0; background: transparent; border: none; box-shadow: none;">
        <button class="modal-close" style="color: #fff; top: -40px; right: 0;">&times;</button>
        <img src="" alt="Property Gallery" class="w-full h-full object-cover" style="border-radius: var(--radius-md); max-height: 80vh;" />
      </div>
    `;
    document.body.appendChild(lightboxModal);

    const lightboxImg = lightboxModal.querySelector('img');
    const closeBtn = lightboxModal.querySelector('.modal-close');

    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.getAttribute('data-fullsrc') || img.src;
        lightboxModal.classList.add('active');
      });
    });

    closeBtn.addEventListener('click', () => lightboxModal.classList.remove('active'));
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) lightboxModal.classList.remove('active');
    });
  }
});
