/* =====================================================
   SUBHRAJEET SWAIN — PORTFOLIO JAVASCRIPT
   ===================================================== */

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(sec => observer.observe(sec));

// ---- Mobile Menu ----
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinksEl.classList.toggle('open');
  document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
});
navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinksEl.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---- Hero Typing Effect ----
const roles = [
  'BCA Graduate',
  'MCA Student',
  'Software Tester',
  'Problem Solver',
  'Tech Enthusiast',
  'Quick Learner'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleDynamic = document.getElementById('role-dynamic');

function typeRole() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    roleDynamic.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    roleDynamic.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, isDeleting ? 60 : 100);
}
setTimeout(typeRole, 1200);

// ---- Particle System ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.setProperty('--duration', `${6 + Math.random() * 10}s`);
    p.style.setProperty('--delay', `${Math.random() * 8}s`);
    if (Math.random() > 0.6) {
      p.style.background = 'rgba(139, 92, 246, 0.8)';
    }
    if (Math.random() > 0.8) {
      p.style.width = '5px';
      p.style.height = '5px';
    }
    container.appendChild(p);
  }
}
createParticles();

// ---- Reveal on Scroll ----
function addRevealClasses() {
  const revealTargets = [
    ...document.querySelectorAll('.about-grid, .stat-card, .timeline-item, .experience-card, .skill-category, .project-card, .contact-card, .contact-form-wrap')
  ];
  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });
}
addRevealClasses();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Skill Progress Bars ----
const skillBarsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-progress').forEach(bar => {
        bar.classList.add('animated');
      });
      skillBarsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(el => skillBarsObserver.observe(el));

// ---- Contact Form ----
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success-msg');
const btnText = document.getElementById('btn-text');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();
    if (!name || !email || !subject || !message) return;

    btnText.textContent = 'Sending...';
    const submitBtn = document.getElementById('form-submit-btn');
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate send (replace with actual backend/email service)
    setTimeout(() => {
      submitBtn.style.display = 'none';
      successMsg.style.display = 'block';
      form.reset();
    }, 1500);
  });
}

// ---- Counter Animation for stats ----
function animateCounter(el, target, decimals = 0) {
  const start = 0;
  const duration = 1500;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;
    el.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = decimals > 0 ? target.toFixed(decimals) : target;
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statValues = entry.target.querySelectorAll('.stat-value');
      statValues.forEach(el => {
        const raw = el.textContent;
        if (raw.includes('.')) {
          animateCounter(el, parseFloat(raw), 2);
        } else {
          const num = parseInt(raw);
          if (!isNaN(num)) animateCounter(el, num);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.getElementById('about');
if (aboutSection) statsObserver.observe(aboutSection);

// ---- Smooth scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---- Cursor glow effect on hero ----
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.querySelector('.hero-bg').style.background = `
      radial-gradient(ellipse 70% 60% at ${x}% ${y}%, rgba(59,130,246,0.18) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at ${100 - x}% ${100 - y}%, rgba(139,92,246,0.12) 0%, transparent 60%),
      linear-gradient(180deg, #060d1f 0%, #050b18 100%)
    `;
  });
}

console.log('%c👋 Hey! Portfolio of Subhrajeet Swain', 'font-size:16px; font-weight:bold; color:#3b82f6;');
console.log('%cBuilt with ❤️ using HTML, CSS & Vanilla JS', 'font-size:12px; color:#94a3b8;');
