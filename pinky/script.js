// Simple Intersection Observer for fade-in effect on scroll

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers: just show everything
        fadeElements.forEach(el => el.classList.add('visible'));
        return; // Exit if IntersectionObserver is not supported
    }

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
            // No 'else' needed if we only want the fade-in once
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Hide scroll indicator once user starts scrolling
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollIndicator) {
       let scrolled = false;
       window.addEventListener('scroll', () => {
         if (!scrolled && window.scrollY > 50) { // Check if scrolled more than 50px
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.5s ease';
            scrolled = true; // Prevent this from running repeatedly
         }
         // Optional: Bring it back if scrolled to top?
         // else if (scrolled && window.scrollY <= 50) {
         //    scrollIndicator.style.opacity = '1';
         //    scrolled = false;
         // }
       });
    }
});