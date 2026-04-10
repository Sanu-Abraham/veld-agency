// ================================
// VELD - ANIMATIONS JS
// Scroll reveal animations
// ================================

const revealElements = document.querySelectorAll(
  ".section, .page-hero, .service-card, .project-card, .process-step, .value-card, .team-card, .service-block, .portfolio-item"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-show");
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach(el => {
  el.classList.add("reveal-hidden");
  revealObserver.observe(el);
});