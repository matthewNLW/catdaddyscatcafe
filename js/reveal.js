/**
 * reveal.js
 * Calming Guided Tour Reveal System
 * Elements above the fold are visible immediately.
 * Elements below animate in gently on scroll.
 */

(function() {
    document.documentElement.classList.add('js-enabled');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal');

    // Immediately show all if reduced motion or no observer
    if (reducedMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    // Check if element is already in viewport on page load
    function isAboveFold(el) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight;
    }

    // Immediately reveal anything already visible (above the fold)
    revealElements.forEach(el => {
        if (isAboveFold(el)) {
            el.classList.add('is-visible');
            el.style.transition = 'none'; // No animation for above-fold content
        }
    });

    // Observer for below-fold content only
    const observerOptions = {
        threshold: 0,
        rootMargin: '0px 0px -15% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                // Skip if already revealed (above fold)
                if (el.classList.contains('is-visible')) {
                    observer.unobserve(el);
                    return;
                }
                
                // Apply delay with a reasonable cap
                const delay = el.dataset.delay ? Math.min(parseInt(el.dataset.delay), 400) : 0;
                el.style.setProperty('--d', `${delay}ms`);
                
                el.classList.add('is-visible');
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        // Only observe elements that weren't already revealed
        if (!el.classList.contains('is-visible')) {
            observer.observe(el);
        }
    });
})();
