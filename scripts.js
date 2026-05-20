/* ============================================================
   Insights & Innovations — Site behavior
   - Mobile nav toggle
   - Contact form submission (via Formspree)
   - Respects prefers-reduced-motion
   ============================================================ */

(function () {
  'use strict';

  // -------- Mobile nav toggle --------
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-mobile-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu when an anchor link is clicked
    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-mobile-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // -------- Contact form submission --------
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (form && formStatus) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      formStatus.textContent = 'Sending...';
      formStatus.className = 'form-status';

      const action = form.getAttribute('action');
      // If the form hasn't been wired up yet, show a clear local message
      if (!action || action.includes('YOUR_FORMSPREE_ID')) {
        formStatus.textContent = 'Form is not configured yet. See README for setup.';
        formStatus.className = 'form-status error';
        return;
      }

      try {
        const data = new FormData(form);
        const response = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          formStatus.textContent = 'Thanks! Your message is on its way.';
          formStatus.className = 'form-status success';
          form.reset();
        } else {
          const result = await response.json().catch(() => ({}));
          if (result.errors) {
            formStatus.textContent = result.errors.map((e) => e.message).join(', ');
          } else {
            formStatus.textContent = 'Something went wrong. Please email rahul@innovateinsightfully.com directly.';
          }
          formStatus.className = 'form-status error';
        }
      } catch (err) {
        formStatus.textContent = 'Network error. Please email rahul@innovateinsightfully.com directly.';
        formStatus.className = 'form-status error';
      }
    });
  }

  // -------- Cycle diagram: sync SVG node hover with text steps --------
  document.querySelectorAll('.how-grid').forEach(grid => {
    const nodes = grid.querySelectorAll('.cycle-node');
    const steps = grid.querySelectorAll('.step');

    if (!nodes.length || !steps.length) return;

    function activate(index) {
      steps.forEach((step, i) => {
        step.classList.toggle('step-active', i === index);
        step.classList.toggle('step-dimmed', i !== index);
      });
    }

    function clear() {
      steps.forEach(step => {
        step.classList.remove('step-active', 'step-dimmed');
      });
    }

    nodes.forEach((node, index) => {
      node.addEventListener('mouseenter', () => activate(index));
      node.addEventListener('mouseleave', clear);
      node.addEventListener('focus', () => activate(index));
      node.addEventListener('blur', clear);
      node.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          steps[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  });

  // -------- Video play button (placeholder, no actual video yet) --------
  const videoPlay = document.querySelector('.video-play');
  if (videoPlay) {
    videoPlay.addEventListener('click', () => {
      // For now this is a no-op. When you add a real video,
      // replace the video-frame element with a <video> or YouTube embed.
      console.log('Video placeholder clicked. Replace with real video.');
    });
  }

})();
