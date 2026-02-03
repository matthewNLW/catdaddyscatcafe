/**
 * Cat Daddy Cat Cafe - Mobile App Logic
 * Handles Navigation Toggle and PWA Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navOverlay = document.getElementById('navOverlay');
    const closeNav = document.getElementById('closeNav');
    const navLinks = document.querySelectorAll('.mobile-nav-link');

    if (navToggle && navOverlay) {
        // Toggle Menu
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close button click
        if (closeNav) {
            closeNav.addEventListener('click', closeMenu);
        }

        // Close on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    function openMenu() {
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMenu() {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});
