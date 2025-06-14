// Home Page Specific JavaScript

// DOM Elements
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevTestimonialBtn = document.querySelector('.prev-testimonial');
const nextTestimonialBtn = document.querySelector('.next-testimonial');

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Testimonials Slider
  initTestimonialsSlider();
});

// Testimonials Slider
function initTestimonialsSlider() {
  if (!testimonialSlides.length) return;
  
  let currentSlide = 0;
  
  // Show initial slide
  showSlide(currentSlide);
  
  // Previous button click
  if (prevTestimonialBtn) {
    prevTestimonialBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
      showSlide(currentSlide);
    });
  }
  
  // Next button click
  if (nextTestimonialBtn) {
    nextTestimonialBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    });
  }
  
  // Dot navigation
  testimonialDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  // Auto advance slides
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  }, 6000);
  
  // Show slide function
  function showSlide(index) {
    testimonialSlides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
    
    testimonialDots.forEach((dot, i) => {
      dot.classList.remove('active');
      if (i === index) {
        dot.classList.add('active');
      }
    });
  }
}

// Parallax Hero Effect
window.addEventListener('scroll', () => {
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    const scrollPosition = window.scrollY;
    heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
  }
});

// Service Cards Interaction
const serviceCards = document.querySelectorAll('.service-card');
if (serviceCards.length) {
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('.service-title').style.color = 'var(--color-accent)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.querySelector('.service-title').style.color = '';
    });
  });
}