// Projects Page Specific JavaScript

// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');
const projectLinks = document.querySelectorAll('.project-link');
const projectModal = document.querySelector('.project-modal');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.querySelector('.modal-body');

// Project Details (sample data)
const projectDetails = {
  project1: {
    title: 'Ethereal Identity',
    category: 'Branding',
    client: 'Ethereal Studios',
    date: 'January 2025',
    description: 'A comprehensive brand identity project for Ethereal Studios, a digital art collective. We created a distinctive visual language that reflects their innovative approach to digital art and immersive experiences.',
    services: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines'],
    images: [
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  // Additional project details would be defined here
};

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Project Filtering
  initProjectFiltering();
  
  // Initialize Project Modal
  initProjectModal();
  
  // Initialize Parallax effect
  initParallax();
});

// Project Filtering
function initProjectFiltering() {
  if (!filterButtons.length || !projectItems.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter projects
      const filterValue = button.getAttribute('data-filter');
      
      projectItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// Project Modal
function initProjectModal() {
  if (!projectModal || !modalClose || !modalBody) return;
  
  // Open modal when project is clicked
  projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = link.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });
  
  // Close modal when close button is clicked
  modalClose.addEventListener('click', () => {
    closeProjectModal();
  });
  
  // Close modal when clicking outside
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

// Open Project Modal
function openProjectModal(projectId) {
  const project = projectDetails[projectId];
  if (!project) return;
  
  const modalContent = `
    <div class="project-detail">
      <div class="project-detail-header">
        <h2 class="project-detail-title">${project.title}</h2>
        <div class="project-detail-category">${project.category}</div>
      </div>
      
      <div class="project-detail-gallery">
        <img src="${project.images[0]}" alt="${project.title}" class="project-detail-image">
      </div>
      
      <div class="project-detail-content">
        <div class="project-detail-info">
          <div class="project-info-item">
            <h3>Client</h3>
            <p>${project.client}</p>
          </div>
          <div class="project-info-item">
            <h3>Date</h3>
            <p>${project.date}</p>
          </div>
          <div class="project-info-item">
            <h3>Services</h3>
            <ul>
              ${project.services.map(service => `<li>${service}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div class="project-detail-description">
          <h3>Project Overview</h3>
          <p>${project.description}</p>
        </div>
      </div>
    </div>
  `;
  
  modalBody.innerHTML = modalContent;
  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close Project Modal
function closeProjectModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = '';
  
  // Clear modal content after transition
  setTimeout(() => {
    modalBody.innerHTML = '';
  }, 300);
}

// Parallax Effect
function initParallax() {
  window.addEventListener('scroll', () => {
    const projectsHeroImage = document.querySelector('.projects-hero-image');
    if (projectsHeroImage) {
      const scrollPosition = window.scrollY;
      projectsHeroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
  });
}

// Add animation to project items on hover
if (projectItems.length) {
  projectItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const overlay = item.querySelector('.project-overlay');
      const image = item.querySelector('img');
      
      if (overlay) overlay.style.opacity = '1';
      if (image) image.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
      const overlay = item.querySelector('.project-overlay');
      const image = item.querySelector('img');
      
      if (overlay) overlay.style.opacity = '';
      if (image) image.style.transform = '';
    });
  });
}