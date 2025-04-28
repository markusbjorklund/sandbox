document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = el.getAttribute('data-animation-delay');
                    if (delay) {
                        el.style.transitionDelay = delay;
                    }
                    el.classList.add('visible');
                    observer.unobserve(el);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        animatedElements.forEach(el => observer.observe(el));

    } else {
        animatedElements.forEach(el => el.classList.add('visible'));
        console.warn("IntersectionObserver not supported, animations triggered immediately.");
    }


    // --- Click-to-Scroll Logic for Arrows ---
    const scrollArrows = document.querySelectorAll('.scroll-to-next');

    scrollArrows.forEach(arrow => {
        arrow.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior if it were an <a>

            // Find the section containing the clicked arrow
            const currentSection = arrow.closest('.full-screen-section, .lyric-section');

            if (currentSection) {
                // Find the very next sibling element that is a section
                let nextSection = currentSection.nextElementSibling;
                // Skip over non-section elements like <main> if necessary
                while(nextSection && !nextSection.matches('.full-screen-section, .lyric-section')) {
                    nextSection = nextSection.nextElementSibling;
                }


                if (nextSection) {
                    // Scroll smoothly to the top of the next section
                    nextSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start' // Align the top of the next section to the top of the viewport
                    });
                }
            }
        });
    });

    // --- Optional: Hide Initial Arrow on Manual Scroll (If desired) ---
    // You might want the initial arrow to disappear once the user manually scrolls
    // past a certain point, even if they don't click it.
    const initialIndicator = document.getElementById('initial-scroll-indicator');
    if (initialIndicator) {
        const hideInitialIndicator = () => {
             if (window.scrollY > 100) { // Hide after scrolling 100px
                 initialIndicator.classList.add('hidden');
                 // Optional: remove listener after hiding to improve performance
                 // window.removeEventListener('scroll', hideInitialIndicator);
             } else {
                 initialIndicator.classList.remove('hidden'); // Show if scrolled back up
             }
        }
        window.addEventListener('scroll', hideInitialIndicator, { passive: true });
        // Initial check
        hideInitialIndicator();
    }


}); // End DOMContentLoaded