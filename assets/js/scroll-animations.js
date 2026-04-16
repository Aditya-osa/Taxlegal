// Scroll-triggered animations for about page
document.addEventListener('DOMContentLoaded', function() {
    // Elements for different animation types
    const slideInElements = [
        document.querySelector('.about-text'),
        document.querySelector('.about-image')
    ];
    
    const zoomInElements = [
        document.querySelector('.mission-box'),
        ...document.querySelectorAll('.value-card')
    ];
    
    const fadeElements = [
        ...document.querySelectorAll('.about-text p'),
        ...document.querySelectorAll('.mission-box p')
    ];

    // Function to check if element is in viewport
    function isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to trigger slide-in animations
    function triggerSlideIn() {
        slideInElements.forEach((element, index) => {
            if (element && isInViewport(element) && !element.classList.contains('slide-in-left') && !element.classList.contains('slide-in-right')) {
                if (element.classList.contains('about-text')) {
                    element.classList.add('slide-in-left');
                } else if (element.classList.contains('about-image')) {
                    element.classList.add('slide-in-right');
                }
            }
        });
    }

    // Function to trigger zoom-in animations
    function triggerZoomIn() {
        zoomInElements.forEach((element, index) => {
            if (element && isInViewport(element) && !element.classList.contains('zoom-in')) {
                setTimeout(() => {
                    element.classList.add('zoom-in');
                }, index * 100); // Staggered delay for multiple elements
            }
        });
    }

    // Function to trigger fade animations
    function triggerFade() {
        fadeElements.forEach((element, index) => {
            if (element && isInViewport(element) && !element.classList.contains('active')) {
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 50); // Staggered delay for paragraphs
            }
        });
    }

    // Main function to check all animations
    function checkAnimations() {
        triggerSlideIn();
        triggerZoomIn();
        triggerFade();
    }

    // Initial check
    checkAnimations();

    // Listen for scroll events with throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(checkAnimations, 50); // Throttle to 50ms
    });

    // Check on resize
    window.addEventListener('resize', checkAnimations);

    // Check after a short delay for any dynamic content
    setTimeout(checkAnimations, 100);
});
