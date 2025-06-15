// Contact Page Specific JavaScript

// DOM Elements
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const btnReset = document.querySelector('.btn-reset');
const faqItems = document.querySelectorAll('.faq-item');

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Contact Form
  initContactForm();

  // Initialize FAQ Accordions
  initFaqAccordions();

  // Initialize Parallax effect
  initParallax();
});

// Contact Form Handling
function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    // Get form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    // Get error displays
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    // Reset errors
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';

    nameField.classList.remove('error');
    emailField.classList.remove('error');
    subjectField.classList.remove('error');
    messageField.classList.remove('error');

    // Validate form
    let isValid = true;

    if (!nameField.value.trim()) {
      nameField.classList.add('error');
      nameError.textContent = 'Please enter your name';
      isValid = false;
    }

    if (!emailField.value.trim()) {
      emailField.classList.add('error');
      emailError.textContent = 'Please enter your email';
      isValid = false;
    } else if (!isValidEmail(emailField.value)) {
      emailField.classList.add('error');
      emailError.textContent = 'Please enter a valid email address';
      isValid = false;
    }

    if (!subjectField.value.trim()) {
      subjectField.classList.add('error');
      subjectError.textContent = 'Please enter a subject';
      isValid = false;
    }

    if (!messageField.value.trim()) {
      messageField.classList.add('error');
      messageError.textContent = 'Please enter your message';
      isValid = false;
    }

    // Only prevent submission if invalid
    if (!isValid) {
      e.preventDefault();
    }
    // If valid, allow normal submission to Formsubmit (do not call e.preventDefault)
  });

  // Reset form button
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (formSuccess) {
        formSuccess.classList.remove('active');
      }
      contactForm.reset();
    });
  }
}

// Validate Email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// FAQ Accordions
function initFaqAccordions() {
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(faq => {
          faq.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// Parallax Effect
function initParallax() {
  window.addEventListener('scroll', () => {
    const contactHeroImage = document.querySelector('.contact-hero-image');
    if (contactHeroImage) {
      const scrollPosition = window.scrollY;
      contactHeroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
  });
}

// Form Input Focus Effects
const formInputs = document.querySelectorAll('.form-input, .form-textarea');
if (formInputs.length) {
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      const label = input.previousElementSibling;
      if (label && label.classList.contains('form-label')) {
        label.style.color = 'var(--color-accent)';
      }
    });

    input.addEventListener('blur', () => {
      const label = input.previousElementSibling;
      if (label && label.classList.contains('form-label')) {
        label.style.color = '';
      }
    });
  });
}