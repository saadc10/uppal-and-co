// === Uppal & Co — Main JS ===

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 20);
        });
    }

    // --- Mobile nav toggle ---
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    function closeNav() {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function openNav() {
        toggle.classList.add('open');
        navLinks.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        // Focus first link for keyboard users
        const firstLink = navLinks.querySelector('a');
        if (firstLink) firstLink.focus();
    }

    if (toggle && navLinks) {
        toggle.setAttribute('aria-expanded', 'false');

        toggle.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                closeNav();
            } else {
                openNav();
            }
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeNav);
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                closeNav();
                toggle.focus();
            }

            // Trap focus within open nav
            if (e.key === 'Tab' && navLinks.classList.contains('open')) {
                const focusable = navLinks.querySelectorAll('a');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

    // --- Active nav link ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // --- Scroll fade-in ---
    const faders = document.querySelectorAll('.fade-up');
    if (faders.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        faders.forEach(el => observer.observe(el));
    }

    // --- Contact form (non-functional, visual only) ---
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn');
            const original = btn.textContent;
            btn.textContent = 'Message sent — we\'ll be in touch';
            btn.style.background = 'var(--green-600)';
            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

});
