// Enable progressive reveal
document.documentElement.classList.add('js-enabled');

// Theme toggle (default: dark)
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
const themeText = document.querySelector('.theme-toggle-text');
const sun = document.querySelector('.fa-sun');
const moon = document.querySelector('.fa-moon');

// Respect saved preference
const saved = localStorage.getItem('theme');
if (saved === 'light') root.setAttribute('data-theme', 'light');
if (saved === 'dark') root.setAttribute('data-theme', 'dark');

// Update UI labels
function refreshThemeLabel() {
  const isLight = root.getAttribute('data-theme') === 'light';
  themeText.textContent = isLight ? 'Light' : 'Dark';
  sun.classList.toggle('is-active', isLight);
  moon.classList.toggle('is-active', !isLight);
  themeBtn.setAttribute('aria-pressed', (!isLight).toString());
}
refreshThemeLabel();

themeBtn?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  refreshThemeLabel();
});

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('primary-navigation');
navToggle?.addEventListener('click', () => {
  const open = navList.getAttribute('data-open') === 'true';
  navList.setAttribute('data-open', String(!open));
  navToggle.setAttribute('aria-expanded', String(!open));
});

// Back to top
const backToTop = document.querySelector('.back-to-top');
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backToTop?.removeAttribute('hidden');
  else backToTop?.setAttribute('hidden', '');
});
backToTop?.setAttribute('hidden', '');

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add('is-visible');
  });
}, { threshold: 0.18 });
document.querySelectorAll('.section[data-section]').forEach((s) => observer.observe(s));

// Typewriter text
const typewriterTarget = document.getElementById('typewriter-text');
const typeText = `👋 Hi, I am Radheshyam Routh. Welcome to my website. I am an M.Sc. student specializing in Data Science (Big Data Analytics) at RKMVERI, Belur.

My interests include Deep Learning, Computer Vision, NLP, Time Series Analysis, and Large Language Models (LLMs).`;
let tIndex = 0;
function typeWriter() {
  if (!typewriterTarget) return;
  if (tIndex < typeText.length) {
    typewriterTarget.textContent += typeText.charAt(tIndex++);
    setTimeout(typeWriter, 30);
  } else {
    setTimeout(() => {
      typewriterTarget.textContent = '';
      tIndex = 0;
      typeWriter();
    }, 30000);
  }
}
typeWriter();

// EmailJS (replace with your public key / service / template)
(function () {
  // 👉 Replace with your own public key from EmailJS dashboard
  // Example from your older code (if still valid): emailjs.init("7eDg_5x0ObR1KvLoZ");
  emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
})();

const form = document.getElementById('contact-form');
form?.addEventListener('submit', function (event) {
  event.preventDefault();

  // 👉 Replace with your own service ID and template ID
  const SERVICE_ID = "YOUR_SERVICE_ID";
  const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
    .then(() => {
      alert("Message sent successfully!");
      form.reset();
    })
    .catch((error) => {
      alert("Failed to send message. Error: " + JSON.stringify(error));
    });
});
