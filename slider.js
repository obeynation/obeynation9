// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  if (!slides.length || !dots.length) return;
  
  let currentSlide = 0;
  let slideInterval;
  
  // Initialize slider
  initSlider();
  
  function initSlider() {
    // Start automatic slideshow
    startSlideshow();
    
    // Add event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-index'));
        goToSlide(slideIndex);
      });
    });
    
    // Pause slideshow on hover
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopSlideshow);
      sliderContainer.addEventListener('mouseleave', startSlideshow);
    }
  }
  
  function startSlideshow() {
    stopSlideshow(); // Clear any existing interval
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  function stopSlideshow() {
    clearInterval(slideInterval);
  }
  
  function goToSlide(index) {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Update current slide index
    currentSlide = index;
    
    // Handle index bounds
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    } else if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
    
    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Reset interval
    if (slideInterval) {
      stopSlideshow();
      startSlideshow();
    }
  }
  
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
});