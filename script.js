/* ========================================
   GARIMA SHARMA — DATA ANALYST PORTFOLIO
   JavaScript
   ======================================== */

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observerNav.observe(s));

// ---- TYPED TEXT ANIMATION ----
const phrases = [
  'actionable insights.',
  'stunning dashboards.',
  'business growth.',
  'clear decisions.',
  'compelling stories.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed');

function typeText() {
  const current = phrases[phraseIndex];
  if (!typedEl) return;

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeText, delay);
}
setTimeout(typeText, 1200);

// ---- COUNTER ANIMATION ----
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    update();
  });
}

// Trigger once hero is visible
const heroSection = document.getElementById('home');
const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
    heroObserver.disconnect();
  }
}, { threshold: 0.5 });
if (heroSection) heroObserver.observe(heroSection);

// ---- PARTICLE GENERATOR ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 6 + 3;
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.4 + 0.1};
    `;
    container.appendChild(particle);
  }
}
createParticles();

// ---- SCROLL REVEAL ----
const revealElements = document.querySelectorAll(
  '.about-card, .education-card, .skill-card, .project-card, .contact-link-card, .about-detail'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (i % 4));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ---- SKILL BAR ANIMATION ----
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.skill-bar');
      const fill = entry.target.querySelector('.skill-fill');
      if (bar && fill) {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
      }
      entry.target.classList.add('visible');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

skillCards.forEach(card => skillObserver.observe(card));

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
let mobileMenuOpen = false;
let mobileMenu = null;

hamburger && hamburger.addEventListener('click', () => {
  mobileMenuOpen = !mobileMenuOpen;

  if (mobileMenuOpen) {
    mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(255,255,255,0.98);
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      animation: fadeIn .2s ease;
    `;
    mobileMenu.innerHTML = `
      <button id="close-menu" style="position:absolute;top:20px;right:24px;background:none;border:none;font-size:1.5rem;cursor:pointer;color:#334155">
        <i class="fas fa-times"></i>
      </button>
      ${['home','about','education','skills','projects','contact'].map(s =>
        `<a href="#${s}" style="font-size:1.4rem;font-weight:700;color:#0f172a;padding:10px 24px;text-transform:capitalize">${s}</a>`
      ).join('')}
      <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;justify-content:center;">
        <a href="Garima_Sharma_Resume.pdf" download="Garima_Sharma_Resume.pdf"
          style="padding:12px 24px;background:#10b981;color:white;border-radius:12px;font-weight:600;font-size:0.95rem;display:inline-flex;align-items:center;gap:8px;">
          <i class="fas fa-file-arrow-down"></i> Resume
        </a>
        <a href="https://www.linkedin.com/in/garima-sharma-6a645243a/" target="_blank"
          style="padding:12px 24px;background:#2563eb;color:white;border-radius:12px;font-weight:600;font-size:0.95rem;display:inline-flex;align-items:center;gap:8px;">
          <i class="fab fa-linkedin"></i> LinkedIn
        </a>
      </div>
    `;
    document.body.appendChild(mobileMenu);

    // Close on link click
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        document.body.removeChild(mobileMenu);
        mobileMenuOpen = false;
      });
    });

    document.getElementById('close-menu').addEventListener('click', () => {
      document.body.removeChild(mobileMenu);
      mobileMenuOpen = false;
    });
  } else if (mobileMenu && document.body.contains(mobileMenu)) {
    document.body.removeChild(mobileMenu);
  }
});

// ---- CONTACT FORM SUBMIT (CONNECTED TO GMAIL VIA FORMSUBMIT) ----
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formError = document.getElementById('form-error');
const submitBtn = document.getElementById('submit-btn');

contactForm && contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) return;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.8';
  if (formError) formError.style.display = 'none';

  try {
    const response = await fetch('https://formsubmit.co/ajax/garimagks002@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        _subject: `Portfolio Message: ${subject} (${name})`,
        message: message,
        _template: 'table',
        _captcha: 'false'
      })
    });

    const data = await response.json();

    if (response.ok || data.success === 'true') {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      formSuccess && formSuccess.classList.add('show');
      contactForm.reset();

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        formSuccess && formSuccess.classList.remove('show');
      }, 5000);
    } else {
      throw new Error(data.message || 'Submission error');
    }
  } catch (err) {
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '';
    if (formError) {
      formError.style.display = 'block';
    } else {
      alert('Message could not be sent. Please email directly at garimagks002@gmail.com');
    }
  }
});

// ---- SMOOTH SCROLL FOR ALL ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- PROJECT CARD HOVER EFFECTS ----
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.background = '#fafbff';
  });
  card.addEventListener('mouseleave', function() {
    this.style.background = '';
  });
});

// ---- INIT ----
console.log('🚀 Portfolio of Garima Sharma — Data Analyst');
console.log('📊 Built with passion for data & design');
