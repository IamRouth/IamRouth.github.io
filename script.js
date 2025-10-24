const TYPEWRITER_TEXT = `👋 Hi, I am Radheshyam Routh. Welcome to my website. I am an M.Sc. student specializing in Data Science (Big Data Analytics) at Ramakrishna Mission Vivekananda Educational and Research Institute (RKMVERI), Belur.

My interests include Deep Learning, Computer Vision, Natural Language Processing (NLP), Time Series Analysis, and Large Language Models (LLMs).

🧪 Currently, I am doing a summer internship under Dr. Ruchira Naskar at IIEST, Shibpur, on GAN-based image generation, blending deep learning and generative modeling.`;

const THEME_KEY = 'rr-portfolio-theme';

const selectors = {
  sections: 'section[data-section]',
  navLink: '.nav-link',
  themeToggle: '.theme-toggle',
  navToggle: '.nav-toggle',
  navList: '#primary-navigation',
  backToTop: '.back-to-top',
  contactForm: '#contact-form',
  typewriterTarget: '#typewriter-text',
};

const createObserver = () => {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.25,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        if (!id) return;
        const navLink = document.querySelector(`${selectors.navLink}[href="#${id}"]`);
        if (!navLink) return;
        if (entry.isIntersecting) {
          document.querySelectorAll(selectors.navLink).forEach((link) => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      });
    },
    {
      threshold: 0.45,
      rootMargin: '-15% 0px -35% 0px',
    }
  );

  return { revealObserver, navObserver };
};

const initTypewriter = (target) => {
  if (!target) return;
  let index = 0;

  const typeCharacter = () => {
    if (index < TYPEWRITER_TEXT.length) {
      const currentChar = TYPEWRITER_TEXT.charAt(index);
      target.innerHTML += currentChar === '\n' ? '<br />' : currentChar;
      index += 1;
      setTimeout(typeCharacter, 28);
    } else {
      setTimeout(() => {
        target.innerHTML = '';
        index = 0;
        typeCharacter();
      }, 28000);
    }
  };

  typeCharacter();
};

const initTheme = (root, toggle) => {
  if (!root || !toggle) return;

  const label = toggle.querySelector('.theme-toggle-text');
  const sunIcon = toggle.querySelector('.fa-sun');
  const moonIcon = toggle.querySelector('.fa-moon');

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    toggle.setAttribute('data-theme-mode', theme);
    toggle.setAttribute('title', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);

    if (label) {
      label.textContent = theme === 'light' ? 'Light' : 'Dark';
    }

    if (sunIcon && moonIcon) {
      sunIcon.classList.toggle('is-active', theme === 'light');
      moonIcon.classList.toggle('is-active', theme === 'dark');
    }
  };

  const storedTheme = window.localStorage.getItem(THEME_KEY);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(storedTheme || (prefersLight ? 'light' : 'dark'));

  toggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
  });
};

const initNavigation = (toggle, navList) => {
  if (!toggle || !navList) return;

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', (!isExpanded).toString());
    navList.dataset.open = (!isExpanded).toString();
  });

  navList.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      navList.dataset.open = 'false';
    })
  );
};

const initBackToTop = (button) => {
  if (!button) return;

  button.hidden = true;

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    const shouldShow = window.scrollY > 320;
    button.hidden = !shouldShow;
  });
};

const initContactForm = (form) => {
  if (!form || typeof emailjs === 'undefined') return;

  emailjs.init('7eDg_5x0ObR1KvLoZ');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const initialText = submitButton ? submitButton.innerHTML : '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span>Sending...</span>';
    }

    emailjs.sendForm('service_mktzdl9', 'template_5jpdwjg', form).then(
      () => {
        alert('Message sent successfully!');
        form.reset();
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = initialText;
        }
      },
      (error) => {
        alert(`Failed to send message. Error: ${JSON.stringify(error)}`);
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = initialText;
        }
      }
    );
  });
};

const init = () => {
  document.body.classList.add('js-enabled');
  const { revealObserver, navObserver } = createObserver();
  const sections = document.querySelectorAll(selectors.sections);
  sections.forEach((section) => {
    revealObserver.observe(section);
    navObserver.observe(section);
  });

  initTypewriter(document.querySelector(selectors.typewriterTarget));
  initTheme(document.body, document.querySelector(selectors.themeToggle));
  initNavigation(document.querySelector(selectors.navToggle), document.querySelector(selectors.navList));
  initBackToTop(document.querySelector(selectors.backToTop));
  initContactForm(document.querySelector(selectors.contactForm));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
