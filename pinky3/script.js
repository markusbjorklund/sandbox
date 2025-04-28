document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // relative to document viewport
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // Apply delay if specified
                    const delay = el.getAttribute('data-animation-delay');
                    if (delay) {
                        el.style.transitionDelay = delay;
                    }
                    el.classList.add('visible'); // Add class to trigger animation
                    observer.unobserve(el); // Stop observing this element
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        animatedElements.forEach(el => observer.observe(el));

    } else {
        // Fallback for browsers without IntersectionObserver
        animatedElements.forEach(el => el.classList.add('visible'));
        console.warn("IntersectionObserver not supported, animations triggered immediately.");
    }


    // --- Scroll Indicator Hide/Show Logic ---
    const scrollIndicator = document.querySelector('.scroll-down-indicator');

    if (scrollIndicator) {
        // Function to check scroll position and toggle indicator visibility
        const checkScroll = () => {
            // Add 'hidden' class if scrolled down more than 50px, otherwise remove it
            if (window.scrollY > 50) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
        };

        // Initial check in case the page loads already scrolled
        checkScroll();

        // Add scroll event listener
        // Use passive: true for potentially better performance
        window.addEventListener('scroll', checkScroll, { passive: true });

        // Optional: Hide indicator if user manually clicks somewhere
        // document.body.addEventListener('click', () => {
        //    if (window.scrollY <= 50) { // Only hide if near top
        //       scrollIndicator.classList.add('hidden');
        //    }
        // }, { once: true }); // Only run this click listener once
    }

}); // End DOMContentLoaded