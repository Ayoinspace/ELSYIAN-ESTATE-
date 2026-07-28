/* ==========================================================================
   Elysian Estates - Animated Statistics Counter
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const statElements = document.querySelectorAll('.counter-value');

  if (statElements.length === 0) return;

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target') || '0');
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const duration = 2000; // ms
    const startTime = performance.now();

    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = target * easedProgress;

      el.textContent = `${prefix}${currentValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        el.textContent = `${prefix}${target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${suffix}`;
      }
    };

    requestAnimationFrame(updateValue);
  };

  const observerOptions = {
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statElements.forEach(el => observer.observe(el));
});
