document.addEventListener('DOMContentLoaded', () => {
  /* ================= FOOTER YEAR ================= */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ================= REDUCED MOTION ================= */
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================= HERO SCROLL EFFECT ================= */
  const heroBg = document.querySelector('.hero-bg');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  let scrollHidden = false;

  window.addEventListener('scroll', () => {
    if (!prefersReducedMotion && window.innerWidth > 768 && heroBg) {
      heroBg.style.transform =
        `skewY(-6deg) translateY(${window.scrollY * 0.25}px)`;
    }

    if (!scrollHidden && scrollIndicator && window.scrollY > 60) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.transform = 'translate(-50%, 10px)';
      scrollHidden = true;
    }
  });

  /* ================= GAUGE HOVER RE-ANIMATION ================= */
  const gaugeWrapper = document.querySelector('.gauge-wrapper');
  let gaugeHoveredOnce = false;

  if (gaugeWrapper) {
    gaugeWrapper.addEventListener('mouseenter', () => {
      if (gaugeHoveredOnce) return;

      const svg = gaugeWrapper.querySelector('svg');
      if (!svg) return;

      const clone = svg.cloneNode(true);
      gaugeWrapper.replaceChild(clone, svg);
      gaugeHoveredOnce = true;
    });
  }

  /* ================= CONTACT FORM ================= */
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const consentCheckbox = document.getElementById('consent');
  const errorBox = document.querySelector('.form-error');
  const successBox = document.querySelector('.form-success');

  /* ================= PHONE FORMAT ================= */
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      let digits = phoneInput.value.replace(/\D/g, '').slice(0, 10);

      if (digits.length > 6) {
        phoneInput.value =
          `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      } else if (digits.length > 3) {
        phoneInput.value =
          `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else if (digits.length > 0) {
        phoneInput.value = `(${digits}`;
      } else {
        phoneInput.value = '';
      }
    });
  }

  /* ================= SUBMIT HANDLER ================= */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (errorBox) errorBox.textContent = '';
    if (successBox) successBox.style.display = 'none';

    const name = form.name?.value.trim();
    const rawPhone = phoneInput?.value.replace(/\D/g, '');
    const email = emailInput?.value.trim();

    if (!name) {
      if (errorBox) errorBox.textContent = 'Please enter your name.';
      return;
    }

    if (!rawPhone && !email) {
      if (errorBox) {
        errorBox.textContent =
          'Please provide at least a phone number or an email address.';
      }
      return;
    }

    if (rawPhone && rawPhone.length !== 10) {
      if (errorBox) {
        errorBox.textContent = 'Phone number must be exactly 10 digits.';
      }
      return;
    }

    if (!consentCheckbox?.checked) {
      if (errorBox) {
        errorBox.textContent =
          'You must agree to be contacted before submitting this form.';
      }
      return;
    }

    const formData = new FormData(form);
    if (rawPhone) {
      formData.set('phone', rawPhone);
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error();

      form.reset();

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.style.display = 'none';

      if (successBox) {
        successBox.textContent =
          'Thank you! Your message has been sent. We’ll be in touch shortly.';
        successBox.style.display = 'block';
      }

    } catch {
      if (errorBox) {
        errorBox.textContent =
          'Something went wrong. Please try again or call us directly.';
      }
    }
  });

  /* ================= BACK TO TOP ================= */
  const backToTopBtn = document.querySelector('.back-to-top');
  const contactSection = document.getElementById('contact');

  if (backToTopBtn && contactSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            backToTopBtn.classList.add('is-visible');
          } else {
            backToTopBtn.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(contactSection);
  }
});