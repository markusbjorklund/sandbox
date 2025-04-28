document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers: show all and remove animation prep
        animatedElements.forEach(el => {
            el.classList.add('visible');
            el.style.opacity = 1; // Ensure visibility if no JS animation
            el.style.transform = 'translateY(0)';
        });
        return; // Exit
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible (adjust as needed)
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                // Get delay from data attribute
                const delay = el.getAttribute('data-animation-delay');
                if (delay) {
                    el.style.transitionDelay = delay; // Apply delay directly
                }
                el.classList.add('visible'); // Trigger animation
                observer.unobserve(el); // Stop observing once animated
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(el => {
        // Set initial animation delay property in CSS variable (optional way)
        // const delay = el.getAttribute('data-animation-delay');
        // if (delay) {
        //    el.style.setProperty('--animation-delay', delay);
        // }
        observer.observe(el);
    });


    // Hide scroll indicator logic (remains the same)
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollIndicator) {
       let scrolled = false;
       window.addEventListener('scroll', () => {
         if (!scrolled && window.scrollY > 50) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.5s ease';
            scrolled = true;
         } else if (scrolled && window.scrollY <= 50) { // Optional: Bring it back
            scrollIndicator.style.opacity = '0.7'; // Match initial opacity
            scrolled = false;
          }
       }, { passive: true }); // Improve scroll performance
    }
});