document.getElementById('year').textContent = new Date().getFullYear();

const heroBg = document.querySelector('.hero-bg');
const scrollIndicator = document.querySelector('.scroll-indicator');
let scrollHidden = false;

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

const form = document.querySelector('.contact-form');
const successBox = document.querySelector('.form-success');
const errorBox = document.querySelector('.form-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorBox.textContent = '';
  successBox.style.display = 'none';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error();

    form.reset();
    successBox.textContent =
      'Thank you! Your message has been sent. We’ll be in touch shortly.';
    successBox.style.display = 'block';

    setTimeout(() => {
      successBox.style.display = 'none';
    }, 6000);

  } catch {
    errorBox.textContent =
      'Something went wrong. Please try again or call us directly.';
  }
});