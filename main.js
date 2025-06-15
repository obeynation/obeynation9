// Main JavaScript for all pages

// DOM Elements
const body = document.body;
const loader = document.querySelector('.loader');
const loaderProgressBar = document.querySelector('.loader-progress-bar');
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const themeToggle = document.querySelector('.theme-toggle');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const revealElements = document.querySelectorAll('.reveal-element');
const revealTexts = document.querySelectorAll('.reveal-text');

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
  // Start the page loader
  startLoader();
  
  // Initialize event listeners
  initEventListeners();
  
  // Check for dark mode preference
  checkDarkMode();
  
  // Initialize custom cursor
  initCursor();
});

// Page Loader
function startLoader() {
  let loadProgress = 0;
  const interval = setInterval(() => {
    loadProgress += Math.random() * 15;
    if (loadProgress > 100) {
      loadProgress = 100;
      clearInterval(interval);
      
      // Delay the loader removal slightly for smoother transition
      setTimeout(() => {
        loader.classList.add('loaded');
        
        // Start revealing elements after loader is gone
        setTimeout(() => {
          revealOnScroll();
          observeElements();
        }, 500);
      }, 300);
    }
    loaderProgressBar.style.width = `${loadProgress}%`;
  }, 100);
}

// Event Listeners
function initEventListeners() {
  // Menu Toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      body.classList.toggle('menu-active');
    });
  }
  
  // Theme Toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      // Save preference
      const isDarkMode = body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
    });
  }
  
  // Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Check for elements to reveal
    revealOnScroll();
  });
}

// Check Dark Mode Preference
function checkDarkMode() {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedDarkMode = localStorage.getItem('darkMode');
  
  if (storedDarkMode === 'true' || (storedDarkMode === null && prefersDarkMode)) {
    body.classList.add('dark-mode');
  }
}

// Custom Cursor
function initCursor() {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    // Delay follower slightly for effect
    setTimeout(() => {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
    }, 70);
  });
  
  // Hover effect for links
  const links = document.querySelectorAll('a, button, .filter-btn, .testimonial-dot, .faq-question');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.borderColor = 'transparent';
      cursorFollower.style.backgroundColor = 'rgba(255, 51, 102, 0.2)';
    });
    
    link.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.borderColor = 'var(--color-accent)';
      cursorFollower.style.backgroundColor = 'transparent';
    });
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
  });
}

// Reveal Elements on Scroll
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) {
      element.classList.add('active');
    }
  });
  
  revealTexts.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) {
      element.classList.add('active');
    }
  });
}

// Observe Elements using Intersection Observer
function observeElements() {
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const elementsObserver = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all reveal elements
    revealElements.forEach(element => {
      elementsObserver.observe(element);
    });
    
    // Observe all reveal texts
    revealTexts.forEach(element => {
      elementsObserver.observe(element);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    revealElements.forEach(element => element.classList.add('active'));
    revealTexts.forEach(element => element.classList.add('active'));
  }
}