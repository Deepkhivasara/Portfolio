// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.querySelectorAll('.nav-link');

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        // Mobile menu toggle
        hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.toggleMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !navbar.contains(e.target)) {
                this.toggleMenu();
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Active link highlighting
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', scrolled);
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Animation Observer
class AnimationObserver {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Check if Intersection Observer is supported
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            // Observe all sections and cards
            const elementsToObserve = document.querySelectorAll(
                'section, .education-card, .experience-card, .skill-category, .project-card, .certificate-card, .achievement-card, .volunteer-card'
            );

            elementsToObserve.forEach(el => {
                this.observer.observe(el);
            });
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Simple Contact Section Handler
class ContactSectionHandler {
    constructor() {
        this.init();
    }

    init() {
        // Add click tracking for contact links (optional analytics)
        const contactLinks = document.querySelectorAll('.contact-item a');
        contactLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Contact link clicked:', link.href);
            });
        });
    }
}

// Skill Tags Interaction
class SkillTagsInteraction {
    constructor() {
        this.init();
    }

    init() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'scale(1.05) rotate(2deg)';
            });

            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images if any are added later
        this.setupLazyLoading();
        
        // Optimize scroll events
        this.optimizeScrollEvents();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    optimizeScrollEvents() {
        let ticking = false;

        const optimizedScroll = () => {
            // Handle scroll-dependent functions here
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll handlers are already optimized in NavigationManager
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', optimizedScroll, { passive: true });
    }
}

// Accessibility Enhancements
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Focus management
        this.setupFocusManagement();
        
        // Reduced motion support
        this.handleReducedMotion();
    }

    setupKeyboardNavigation() {
        // ESC key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.click();
            }
        });

        // Tab navigation for mobile menu
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && navMenu.classList.contains('active')) {
                    if (e.shiftKey && index === 0) {
                        e.preventDefault();
                        navLinks[navLinks.length - 1].focus();
                    } else if (!e.shiftKey && index === navLinks.length - 1) {
                        e.preventDefault();
                        navLinks[0].focus();
                    }
                }
            });
        });
    }

    setupFocusManagement() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        
        Object.assign(skipLink.style, {
            position: 'absolute',
            top: '-40px',
            left: '6px',
            background: 'var(--primary-color)',
            color: 'white',
            padding: '8px',
            textDecoration: 'none',
            borderRadius: '4px',
            zIndex: '10000',
            transition: 'top 0.3s ease'
        });

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    handleReducedMotion() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleReducedMotion = (e) => {
            if (e.matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
                document.documentElement.style.setProperty('--transition-duration', '0.01ms');
            } else {
                document.documentElement.style.removeProperty('--animation-duration');
                document.documentElement.style.removeProperty('--transition-duration');
            }
        };

        mediaQuery.addListener(handleReducedMotion);
        handleReducedMotion(mediaQuery);
    }
}

// Error Handling
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
            // Could send to error tracking service in production
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
            // Could send to error tracking service in production
        });
    }
}

// Initialize Application
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeModules());
        } else {
            this.initializeModules();
        }
    }

    initializeModules() {
        try {
            // Initialize all modules
            new ErrorHandler();
            new ThemeManager();
            new NavigationManager();
            new SmoothScroll();
            new AnimationObserver();
            new ContactSectionHandler();
            new SkillTagsInteraction();
            new PerformanceOptimizer();
            new AccessibilityEnhancer();

            // Add loaded class to body for CSS animations
            document.body.classList.add('loaded');

            console.log('Portfolio application initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio application:', error);
        }
    }
}

// Start the application
new PortfolioApp();

// Service Worker Registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be registered here in a full PWA implementation
        console.log('Service Worker support detected');
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PortfolioApp,
        ThemeManager,
        NavigationManager,
        SmoothScroll,
        AnimationObserver,
        ContactSectionHandler
    };
}