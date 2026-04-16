// ===============================
// UTILITY FUNCTIONS
// ===============================
function getCurrentSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    const sections = document.querySelectorAll('section');
    
    if (window.scrollY < 100) {
        return document.querySelector('.professional-intro') || document.querySelector('section');
    }
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            return section;
        }
    }
    return document.querySelector('section');
}

// ===============================
// DISCLAIMER
// ===============================
function acceptDisclaimer() {
    localStorage.setItem('disclaimerAgreed', 'true');
    document.getElementById('disclaimerOverlay').classList.add('hidden');
    document.getElementById('mainSite').classList.add('active');
    initScrollAnimations();
}

// ===============================
// MOBILE MENU
// ===============================
function toggleMobileMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// ===============================
// ANIMATIONS
// ===============================
function initScrollAnimations() {
    if (window.__animationsInit) return;
    window.__animationsInit = true;

    const selector = '.reveal, .fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-item';

    // Respect user preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll(selector).forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                try {
                    // Auto-stagger for common groups
                    if (entry.target.classList.contains('stagger-item')) {
                        const siblings = Array.from(entry.target.parentNode.querySelectorAll('.stagger-item'));
                        const idx = siblings.indexOf(entry.target);
                        entry.target.style.transitionDelay = `${Math.min(idx * 120, 600)}ms`;
                    } else if (entry.target.closest('.intro-text-group')) {
                        const group = entry.target.closest('.intro-text-group');
                        const items = Array.from(group.querySelectorAll('.reveal'));
                        const idx = items.indexOf(entry.target);
                        if (idx >= 0) entry.target.style.transitionDelay = `${Math.min(idx * 120, 600)}ms`;
                    } else if (entry.target.closest('.team-grid') || entry.target.closest('.practice-areas-grid')) {
                        const grid = entry.target.parentNode;
                        const items = Array.from(grid.querySelectorAll('.slide-in-left, .stagger-item'));
                        const idx = items.indexOf(entry.target);
                        if (idx >= 0) entry.target.style.transitionDelay = `${Math.min(idx * 100, 600)}ms`;
                    }
                } catch (e) {
                    // defensive: ignore and continue
                }

                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

// ===============================
// PARALLAX (Professional Implementation)
// ===============================
function initParallax() {
    let latestScroll = 0;
    let ticking = false;

    function update() {
        const scroll = latestScroll;
        const windowHeight = window.innerHeight;

        // Enhanced parallax for background images
        document.querySelectorAll('.services-right, .hero-right, .intro-right').forEach(el => {
            const rect = el.getBoundingClientRect();
            const speed = parseFloat(el.dataset.speed) || 0.15;
            
            // Only apply parallax when element is in viewport
            if (rect.bottom >= 0 && rect.top <= windowHeight) {
                const yPos = -(scroll * speed);
                el.style.backgroundPosition = `center ${yPos}px`;
                el.style.transform = `translate3d(0, ${yPos * 0.1}px, 0)`;
            }
        });

        // General parallax elements
        document.querySelectorAll('.parallax').forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.18;
            const yPos = scroll * speed;
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        latestScroll = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    // Initial update
    update();
}

// ===============================
// CARD TILT
// ===============================
function initCardTilt() {
    document.querySelectorAll('.practice-card, .team-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = (y - rect.height / 2) / 12;
            const rotateY = (rect.width / 2 - x) / 12;

            card.style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
        });
    });
}

// ===============================
// TYPING EFFECT
// ===============================
function initTypingEffect() {
    const el = document.querySelector('.hero-left h1');
    if (!el || el.dataset.done) return;

    const text = el.textContent;
    el.textContent = '';
    el.dataset.done = true;

    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text[i++];
            setTimeout(type, 60);
        }
    }
    type();
}

// ===============================
// SMOOTH ANCHOR SCROLL
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))
            ?.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===============================
// INITIALIZATION
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('disclaimerAgreed') === 'true') {
        document.getElementById('disclaimerOverlay')?.classList.add('hidden');
        document.getElementById('mainSite')?.classList.add('active');

        initScrollAnimations();
        initParallax();
        initCardTilt();
        setTimeout(initTypingEffect, 800);
    }
});

// Debug helper: enable outlines when visiting with #debug or ?debug=1
(function(){
    const hasHash = window.location.hash === '#debug';
    const hasQuery = window.location.search.indexOf('debug=1') !== -1;
    if (hasHash || hasQuery) {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('debug-show-outlines');

            // Log layout blocks to console for quick inspection
            const blocks = document.querySelectorAll('header, .topbar, section, .hero-wrapper, .intro-wrapper');
            console.group('Layout debug');
            blocks.forEach(b => {
                const r = b.getBoundingClientRect();
                console.log(b.tagName || b.className, r.top, r.height, getComputedStyle(b).background || 'no-bg');
            });
            console.groupEnd();
        });
    }
})();
