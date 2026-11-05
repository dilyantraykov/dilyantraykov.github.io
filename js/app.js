/**
 * Dilyan Traykov — Portfolio & Showcase
 * Interactive, clean, dependency-free vanilla JavaScript
 */

(function () {
  'use strict';

  // --- Theme Management ---
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setTheme(theme) {
    if (theme === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
    } else {
      htmlEl.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }

  // Initialize Theme
  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      setTheme(next);
    });
  }

  // Listen for OS scheme change
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'light' : 'dark');
    }
  });

  // --- Mobile Navigation ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Active Nav Link Scroll Spy ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // --- Copy Email with Toast ---
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = message || 'Copied to clipboard!';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'dtraykov94@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard! ✉️');
      }).catch(() => {
        // Fallback prompt
        prompt('Copy my email address:', email);
      });
    });
  }

  // --- Certificate Modal Lightbox (Images & PDFs) ---
  const certModal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-cert-img');
  const modalPdf = document.getElementById('modal-cert-pdf');
  const modalTitle = document.getElementById('modal-cert-title');
  const modalExt = document.getElementById('modal-cert-ext');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openModal(src, title) {
    if (!certModal) return;
    const isPdf = src.toLowerCase().endsWith('.pdf');

    if (modalTitle) modalTitle.textContent = title || 'Certificate Preview';
    if (modalExt) {
      modalExt.href = src;
      modalExt.setAttribute('title', isPdf ? 'Open PDF in new tab / download' : 'Open image in new tab');
    }

    if (isPdf) {
      if (modalImg) {
        modalImg.style.display = 'none';
        modalImg.src = '';
      }
      if (modalPdf) {
        modalPdf.style.display = 'block';
        modalPdf.src = src;
      }
    } else {
      if (modalPdf) {
        modalPdf.style.display = 'none';
        modalPdf.src = '';
      }
      if (modalImg) {
        modalImg.style.display = 'block';
        modalImg.src = src;
        modalImg.alt = title || 'Certificate';
      }
    }

    certModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!certModal) return;
    certModal.classList.remove('open');
    document.body.style.overflow = '';
    // Reset sources to pause audio/PDF renderers
    if (modalPdf) {
      modalPdf.src = '';
      modalPdf.style.display = 'none';
    }
    if (modalImg) {
      modalImg.src = '';
      modalImg.style.display = 'none';
    }
  }

  document.querySelectorAll('[data-cert-src], [data-cert-img]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const src = el.getAttribute('data-cert-src') || el.getAttribute('data-cert-img') || el.getAttribute('href');
      const title = el.getAttribute('data-cert-title') || el.textContent.trim() || 'Certificate';
      if (src) {
        openModal(src, title);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // --- Easter Egg on Casual Quote ---
  const eminemHook = document.getElementById('eminem-quote');
  if (eminemHook) {
    const funnyGreetings = [
      "Slim Shady has entered the chat! 🎤",
      "Yes, that Dilyan Traykov! 🚀",
      "Ready to build cool software or drink a beer? 🍻",
      "Still 100% human, 0% AI generated! 🤖❌",
      "Guess who's back, back again? 🎶"
    ];
    let greetIndex = 0;
    eminemHook.addEventListener('click', () => {
      showToast(funnyGreetings[greetIndex % funnyGreetings.length]);
      greetIndex++;
    });
  }
})();

