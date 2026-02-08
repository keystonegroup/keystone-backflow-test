const heroBg = document.querySelector('.hero-bg');
const scrollIndicator = document.querySelector('.scroll-indicator');
const backToTop = document.querySelector('.back-to-top');
const contactSection = document.getElementById('contact');

let scrollHidden = false;

document.getElementById('year').textContent =
  new Date().getFullYear();

window.addEventListener('scroll', () => {
  if (window.innerWidth > 768) {
    heroBg.style.transform =
      `skewY(-6deg) translateY(${window.scrollY * 0.25}px)`;
  }

  if (!scrollHidden && window.scrollY > 60) {
    scrollIndicator.style.opacity = '0';
    scrollHidden = true;
  }
});

new IntersectionObserver(entries => {
  entries.forEach(entry => {
    backToTop.classList.toggle(
      'is-visible',
      entry.isIntersecting
    );
  });
}, { threshold: 0.3 }).observe(contactSection);

/* Form UX */
const form = document.querySelector('.contact-form');
const successBox = document.querySelector('.form-success');
const errorBox = document.querySelector('.form-error');

form.addEventListener('submit', async e => {
  e.preventDefault();
  errorBox.textContent = '';
  successBox.style.display = 'none';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (!res.ok) throw new Error();

    form.reset();
    successBox.textContent = 'Thanks! We’ll be in touch shortly.';
    successBox.style.display = 'block';

    setTimeout(() => {
      successBox.style.display = 'none';
    }, 6000);

  } catch {
    errorBox.textContent =
      'Something went wrong. Please call us directly.';
  }
});
