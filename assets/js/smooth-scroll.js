// ===============================
// PROFESSIONAL SMOOTH SCROLLING
// ===============================
class SmoothScroll {
    constructor() {
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.targetSection = null;
        this.sections = [];
        this.currentSectionIndex = 0;
        
        console.log('SmoothScroll constructor called');
        this.init();
    }

    init() {
        this.sections = Array.from(document.querySelectorAll('section')).filter((section, index) => {
            return section.offsetHeight >= window.innerHeight * 0.5 && index < 3;
        });
        
        console.log('Found sections (first 3 only):', this.sections.length);
        this.bindEvents();
        this.updateCurrentSection();
    }

    bindEvents() {
        let scrollDelta = 0;
        let scrollDirection = 0;
        const getThirdSectionBottom = () => {
            return this.sections.length > 0 ?
                this.sections[this.sections.length - 1].offsetTop + this.sections[this.sections.length - 1].offsetHeight :
                window.innerHeight * 3;
        };
        
        const handleWheel = (e) => {
            // Check if we're still in the first 3 sections area
            const currentScrollPosition = window.scrollY;
            const thirdSectionBottom = getThirdSectionBottom();
            
            // If we're past the first 3 sections, allow normal scrolling
            if (currentScrollPosition > thirdSectionBottom) {
                return; // Let normal scrolling take over
            }

            const atFirst = this.currentSectionIndex <= 0;
            const atLast = this.currentSectionIndex >= this.sections.length - 1;

            // Boundary behavior:
            // - On the 3rd section scrolling down => allow normal scrolling to the rest of the page.
            // - On the 1st section scrolling up => allow normal scrolling (e.g. trackpad bounce / browser behavior).
            if ((atLast && e.deltaY > 0) || (atFirst && e.deltaY < 0)) {
                return;
            }
            
            e.preventDefault();
            
            scrollDelta += e.deltaY;
            scrollDirection = e.deltaY > 0 ? 1 : -1;
            
            clearTimeout(this.scrollTimeout);
            
            this.scrollTimeout = setTimeout(() => {
                if (Math.abs(scrollDelta) > 30) {
                    console.log('Scrolling to section, direction:', scrollDirection);
                    this.scrollToSection(scrollDirection);
                }
                scrollDelta = 0;
            }, 50);
        };
        
        window.addEventListener('wheel', handleWheel, { passive: false });
        
        window.addEventListener('scroll', () => {
            this.updateCurrentSection();
        });
        
        // Keyboard navigation (only for first 3 sections)
        window.addEventListener('keydown', (e) => {
            const currentScrollPosition = window.scrollY;
            const thirdSectionBottom = getThirdSectionBottom();
            
            if (currentScrollPosition > thirdSectionBottom) return;

            const atFirst = this.currentSectionIndex <= 0;
            const atLast = this.currentSectionIndex >= this.sections.length - 1;
            
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                if (atLast) return;
                e.preventDefault();
                this.scrollToSection(1);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                if (atFirst) return;
                e.preventDefault();
                this.scrollToSection(-1);
            }
        });
        
        console.log('SmoothScroll events bound (first 3 sections only)');
    }

    scrollToSection(direction) {
        if (this.isScrolling) return;
        
        const newIndex = this.currentSectionIndex + direction;
        
        if (newIndex >= 0 && newIndex < this.sections.length) {
            this.targetSection = this.sections[newIndex];
            this.isScrolling = true;
            
            console.log('Scrolling to section index:', newIndex);
            
            this.targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            setTimeout(() => {
                this.isScrolling = false;
                this.currentSectionIndex = newIndex;
            }, 1000);
        }
    }

    updateCurrentSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        this.sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                this.currentSectionIndex = index;
            }
        });
    }
}

// Initialize smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing SmoothScroll...');
    new SmoothScroll();
});
