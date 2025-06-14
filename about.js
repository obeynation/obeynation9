// About Page Specific JavaScript

// DOM Elements
const storyImage = document.querySelector('.story-image img');
const valueCards = document.querySelectorAll('.value-card');
const teamMembers = document.querySelectorAll('.team-member');
const clientLogos = document.querySelectorAll('.client-logo');

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
  // Initialize hover effects
  initHoverEffects();
  
  // Initialize Parallax effect
  initParallax();
});

// Initialize Hover Effects
function initHoverEffects() {
  // Value Cards
  if (valueCards.length) {
    valueCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.querySelector('.value-title').style.color = 'var(--color-accent)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.querySelector('.value-title').style.color = '';
      });
    });
  }
  
  // Team Members
  if (teamMembers.length) {
    teamMembers.forEach(member => {
      member.addEventListener('mouseenter', () => {
        member.querySelector('.member-name').style.color = 'var(--color-accent)';
      });
      
      member.addEventListener('mouseleave', () => {
        member.querySelector('.member-name').style.color = '';
      });
    });
  }
  
  // Client Logos
  if (clientLogos.length) {
    clientLogos.forEach(logo => {
      logo.addEventListener('mouseenter', () => {
        logo.style.backgroundColor = 'var(--color-accent)';
        logo.querySelector('.client-logo-inner').style.color = 'white';
      });
      
      logo.addEventListener('mouseleave', () => {
        logo.style.backgroundColor = '';
        logo.querySelector('.client-logo-inner').style.color = '';
      });
    });
  }
}

// Parallax Effect
function initParallax() {
  window.addEventListener('scroll', () => {
    const aboutHeroImage = document.querySelector('.about-hero-image');
    if (aboutHeroImage) {
      const scrollPosition = window.scrollY;
      aboutHeroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
  });
}

// Add transition effect when scrolling to values section
window.addEventListener('scroll', () => {
  const valuesSection = document.querySelector('.our-values');
  if (valuesSection) {
    const sectionTop = valuesSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
      setTimeout(() => {
        valueCards.forEach((card, index) => {
          setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
          }, index * 100);
        });
      }, 300);
    }
  }
});

// Story Image Interaction
if (storyImage) {
  storyImage.addEventListener('mouseenter', () => {
    storyImage.style.transform = 'scale(1.05)';
    storyImage.style.filter = 'grayscale(0%)';
  });
  
  storyImage.addEventListener('mouseleave', () => {
    storyImage.style.transform = '';
    storyImage.style.filter = '';
  });
}