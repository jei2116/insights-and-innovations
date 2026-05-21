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

  // -------- ConnectInk replica demo --------
  const coachTrigger   = document.getElementById('pp-coach-trigger');
  const lensTrigger    = document.getElementById('pp-lens-trigger');
  const ppReset        = document.getElementById('pp-reset');
  const ppHint         = document.getElementById('pp-hint');
  const ppResponse     = document.getElementById('pp-response');
  const ppResponseText = document.getElementById('pp-response-text');
  const ppResponseLabel = ppResponse ? ppResponse.querySelector('.pp-replica-response-label') : null;

  function generateResponse(mode, text) {
    const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 4);
    const first = sentences[0] || text.trim();
    const last  = sentences[sentences.length - 1] || first;
    const snippet = first.length > 45 ? first.slice(0, 45).trim() + '…' : first;

    // KB principle: flag vague emotion/abstraction — push toward concrete sensory detail
    const vagueMatch = text.match(/\b(fun|amazing|good|great|nice|cool|awesome|beautiful|wonderful|interesting|everything|so many|many things|a lot|excited|happy|sad|bad|difficult|hard|easy|memorable|incredible|unforgettable|special|important|meaningful|life-changing|eye-opening|fantastic|terrible|horrible|scary|loved|loved it)\b/i);
    const vague = vagueMatch ? vagueMatch[0].toLowerCase() : null;

    // KB principle: recognize specific sensory grounding as a strength
    const hasSensory = /\b(smell|smelled|sound|heard|saw|felt|touch|tasted|looked|color|light|dark|warm|cold|quiet|loud|voice|hands|eyes|face|room|street|kitchen|window|floor|wall|door|chair|table|outside|inside|morning|night|sun|rain|wind)\b/i.test(text);

    if (mode === 'coach') {
      // KB: "The most important moves are slowing down at moments that matter
      //       and grounding writing in concrete sensory detail."
      if (vague) {
        return `You say it was "${vague}" — I need to slow down there with you. What's the one moment that made it feel that way? Put me in the exact scene: where were you, what were you doing, what did you notice around you?`;
      }
      if (sentences.length === 1) {
        return `You've started. Now find the moment — not the summary of what happened, but the scene itself. Where were you standing? Who was there? What did you notice first?`;
      }
      if (hasSensory) {
        return `"${last}" — you're close to something. Don't rush to the conclusion. Stay in the moment a little longer. What else were you aware of right then — in your body, around you?`;
      }
      return `"${snippet}" — you're moving fast through this. Slow down. Find the moment that matters most and stay there. What did you see, hear, or feel right then?`;
    }

    if (mode === 'lens') {
      // KB: Reader's Lens responds to how the text lands on a reader —
      //     what draws them in, what keeps them at a distance.
      if (vague) {
        return `As a reader, "${vague}" keeps me on the outside. I know something happened — but I can't feel it yet. I want the scene: what would I have seen if I'd been standing right there with you?`;
      }
      if (hasSensory) {
        return `As a reader, the specific detail is pulling me in — but then you move on. Don't. Stay in the scene longer. I want more of that texture. What else was there?`;
      }
      if (sentences.length === 1) {
        return `As a reader, "${snippet}" makes me lean in — and then it ends. What am I supposed to feel here? Give me one concrete image and I'll follow you anywhere.`;
      }
      return `As a reader, I'm following you — but you're moving fast. I want to slow down at "${snippet}…" What's underneath that moment? What do you want me to carry away?`;
    }
  }

  if (coachTrigger && lensTrigger) {
    let typeTimer = null;

    function streamText(text) {
      let i = 0;
      ppResponseText.textContent = '';
      ppResponseText.classList.add('pp-cursor');
      clearInterval(typeTimer);
      typeTimer = setInterval(() => {
        ppResponseText.textContent += text[i++];
        if (i >= text.length) {
          clearInterval(typeTimer);
          ppResponseText.classList.remove('pp-cursor');
        }
      }, 18);
    }

    function activate(mode) {
      const textArea = document.getElementById('pp-text-area');
      const hasText  = textArea && textArea.innerText.trim().length > 0;

      if (!hasText) {
        ppHint.textContent = 'Write something first, then try a tool.';
        ppHint.classList.remove('pp-replica-hint--hidden');
        ppResponse.classList.remove('pp-replica-response--visible');
        return;
      }

      // swap active tab
      coachTrigger.classList.toggle('pp-replica-tab--active', mode === 'coach');
      lensTrigger.classList.toggle('pp-replica-tab--active', mode === 'lens');
      // update label
      if (ppResponseLabel) {
        ppResponseLabel.textContent = mode === 'coach' ? 'AI Coach' : "Reader's Lens";
      }
      // show response
      const text = document.getElementById('pp-text-area').innerText.trim();
      ppHint.classList.add('pp-replica-hint--hidden');
      ppResponse.classList.add('pp-replica-response--visible');
      streamText(generateResponse(mode, text));
    }

    function resetDemo() {
      clearInterval(typeTimer);
      ppHint.textContent = 'Edit the text, then try a tool above.';
      ppHint.classList.remove('pp-replica-hint--hidden');
      ppResponse.classList.remove('pp-replica-response--visible');
      ppResponseText.textContent = '';
      ppResponseText.classList.remove('pp-cursor');
      coachTrigger.classList.add('pp-replica-tab--active');
      lensTrigger.classList.remove('pp-replica-tab--active');
      if (ppResponseLabel) ppResponseLabel.textContent = 'AI Coach';
    }

    coachTrigger.addEventListener('click', () => activate('coach'));
    lensTrigger.addEventListener('click',  () => activate('lens'));
    if (ppReset) ppReset.addEventListener('click', resetDemo);
  }

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
