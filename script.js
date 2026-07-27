/* ================================================================
   SKY FOUNDATION - MAIN JAVASCRIPT
   Premium NGO Website - Interactive Features & Functionality
   ================================================================ */

// ================================================================
// 1. CONFIGURATION & STATE MANAGEMENT
// ================================================================

const Config = {
    animationDuration: 300,
    scrollThrottleTime: 50,
    counterAnimationDuration: 2000,
    language: localStorage.getItem('language') || 'en',
    theme: localStorage.getItem('theme') || 'light',
};

let State = {
    isScrolling: false,
    lastScrollY: 0,
    headerScrolled: false,
    volunteersPerPage: 10,
};

// ================================================================
// 2. UTILITY FUNCTIONS
// ================================================================

function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function getElement(selector) {
    return document.querySelector(selector);
}

function getElements(selector) {
    return document.querySelectorAll(selector);
}

function addEventListeners(selector, event, callback) {
    getElements(selector).forEach((el) => {
        el.addEventListener(event, callback);
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight &&
        rect.bottom >= 0 &&
        rect.left <= window.innerWidth &&
        rect.right >= 0
    );
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// ================================================================
// 3. LANGUAGE SWITCHING
// ================================================================

class LanguageManager {
    constructor() {
        this.currentLanguage = Config.language;
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.applyLanguage(this.currentLanguage);
    }

    attachEventListeners() {
        addEventListeners('.lang-btn', 'click', (e) => {
            const lang = e.target.dataset.lang;
            this.setLanguage(lang);
        });
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        Config.language = lang;
        localStorage.setItem('language', lang);
        this.applyLanguage(lang);
    }

    applyLanguage(lang) {
        getElements('.lang-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        getElements('[data-text]').forEach((element) => {
            const elementLang = element.dataset.text;
            if (elementLang === 'en' || elementLang === 'mr') {
                element.style.display = elementLang === lang ? '' : 'none';
            }
        });

        document.documentElement.lang = lang;
    }
}

// ================================================================
// 4. THEME MANAGEMENT (DARK/LIGHT MODE)
// ================================================================

class ThemeManager {
    constructor() {
        this.theme = Config.theme;
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.attachEventListeners();
    }

    attachEventListeners() {
        const themeToggle = getElement('#themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        localStorage.setItem('theme', this.theme);
    }

    applyTheme(theme) {
        const body = document.body;
        const themeIcon = getElement('#themeToggle i');

        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
        } else {
            body.classList.remove('dark-mode');
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon';
            }
        }
    }
}

// ================================================================
// 5. HEADER MANAGEMENT
// ================================================================

class HeaderManager {
    constructor() {
        this.header = getElement('#header');
        this.mobileMenuToggle = getElement('#mobileMenuToggle');
        this.mobileMenu = getElement('#mobileMenu');
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.setupScroll();
    }

    attachEventListeners() {
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        addEventListeners('.mobile-nav-link', 'click', () => {
            this.closeMobileMenu();
        });

        document.addEventListener('click', (e) => {
            if (
                !this.mobileMenu?.contains(e.target) &&
                !this.mobileMenuToggle?.contains(e.target)
            ) {
                this.closeMobileMenu();
            }
        });

        addEventListeners('#donateBtn, #heroDonateBtn, #onlineDonateBtn', 'click', (e) => {
            e.preventDefault();
            this.scrollToSection('#donate');
        });

        addEventListeners('#volunteerBtn', 'click', (e) => {
            e.preventDefault();
            this.scrollToSection('#volunteers');
        });
    }

    toggleMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.classList.toggle('active');
            this.mobileMenuToggle.classList.toggle('active');
        }
    }

    closeMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.classList.remove('active');
            this.mobileMenuToggle?.classList.remove('active');
        }
    }

    setupScroll() {
        window.addEventListener(
            'scroll',
            throttle(() => {
                this.handleScroll();
            }, Config.scrollThrottleTime)
        );
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const isScrolled = scrollY > 50;

        if (isScrolled && !State.headerScrolled) {
            this.header?.classList.add('scrolled');
            State.headerScrolled = true;
        } else if (!isScrolled && State.headerScrolled) {
            this.header?.classList.remove('scrolled');
            State.headerScrolled = false;
        }

        State.lastScrollY = scrollY;
    }

    scrollToSection(selector) {
        const element = getElement(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        this.closeMobileMenu();
    }
}

// ================================================================
// 6. SCROLL PROGRESS BAR
// ================================================================

class ScrollProgressBar {
    constructor() {
        this.progressBar = getElement('#scrollProgressBar');
        this.init();
    }

    init() {
        window.addEventListener(
            'scroll',
            throttle(() => {
                this.updateProgress();
            }, Config.scrollThrottleTime)
        );
    }

    updateProgress() {
        if (!this.progressBar) return;

        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        this.progressBar.style.width = scrolled + '%';
    }
}

// ================================================================
// 7. SCROLL TO TOP BUTTON
// ================================================================

class ScrollToTopButton {
    constructor() {
        this.button = getElement('#scrollToTop');
        this.init();
    }

    init() {
        if (!this.button) return;

        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener(
            'scroll',
            throttle(() => {
                this.toggleVisibility();
            }, Config.scrollThrottleTime)
        );
    }

    toggleVisibility() {
        if (window.scrollY > 300) {
            this.button?.classList.add('show');
        } else {
            this.button?.classList.remove('show');
        }
    }
}

// ================================================================
// 8. COUNTER ANIMATION
// ================================================================

class CounterAnimation {
    constructor() {
        this.counters = getElements('.stat-number');
        this.animated = new Set();
        this.init();
    }

    init() {
        window.addEventListener(
            'scroll',
            throttle(() => {
                this.checkCounters();
            }, Config.scrollThrottleTime)
        );

        this.checkCounters();
    }

    checkCounters() {
        this.counters.forEach((counter) => {
            if (isInViewport(counter) && !this.animated.has(counter)) {
                this.animateCounter(counter);
                this.animated.add(counter);
            }
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target, 10);
        const duration = Config.counterAnimationDuration;
        const start = 0;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(start + (target - start) * progress);
            element.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };

        animate();
    }
}

// ================================================================
// 9. SCROLL REVEAL ANIMATIONS
// ================================================================

class ScrollReveal {
    constructor() {
        this.elements = getElements('.glass, .service-card, .project-card, .story-card, .testimonial-card, .info-card, .faq-item');
        this.init();
    }

    init() {
        window.addEventListener(
            'scroll',
            throttle(() => {
                this.revealElements();
            }, Config.scrollThrottleTime)
        );

        this.revealElements();
    }

    revealElements() {
        this.elements.forEach((element) => {
            if (isInViewport(element)) {
                element.classList.add('reveal');
            }
        });
    }
}

// ================================================================
// 10. PROJECT FILTER
// ================================================================

class ProjectFilter {
    constructor() {
        this.filterButtons = getElements('.filter-btn');
        this.projectCards = getElements('[data-project]');
        this.init();
    }

    init() {
        this.filterButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                this.handleFilter(e.target.dataset.filter);
                this.updateActiveButton(e.target);
            });
        });
    }

    handleFilter(filter) {
        this.projectCards.forEach((card) => {
            const shouldShow = filter === 'all' || card.dataset.project === filter;
            card.style.display = shouldShow ? '' : 'none';
            card.style.animation = shouldShow ? 'fadeInUp 0.6s ease-out' : 'none';
        });
    }

    updateActiveButton(activeBtn) {
        this.filterButtons.forEach((btn) => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
}

// ================================================================
// 11. FORM MANAGEMENT
// ================================================================

class FormManager {
    constructor() {
        this.volunteerForm = getElement('#volunteerForm');
        this.contactForm = getElement('#contactForm');
        this.init();
    }

    init() {
        if (this.volunteerForm) {
            this.volunteerForm.addEventListener('submit', (e) => {
                this.handleVolunteerForm(e);
            });
        }

        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                this.handleContactForm(e);
            });
        }
    }

    handleVolunteerForm(e) {
        e.preventDefault();

        const formData = new FormData(this.volunteerForm);
        const data = Object.fromEntries(formData);

        if (!this.validateForm(data)) {
            showNotification('Please fill all fields correctly', 'error');
            return;
        }

        console.log('Volunteer Registration:', data);
        showNotification(
            'Thank you for registering! We will contact you soon.',
            'success'
        );

        this.volunteerForm.reset();
    }

    handleContactForm(e) {
        e.preventDefault();

        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);

        if (!this.validateForm(data)) {
            showNotification('Please fill all fields correctly', 'error');
            return;
        }

        console.log('Contact Form:', data);
        showNotification(
            'Thank you for contacting us! We will get back to you soon.',
            'success'
        );

        this.contactForm.reset();
    }

    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;

        if (data.email && !emailRegex.test(data.email)) {
            return false;
        }

        if (data.phone && !phoneRegex.test(data.phone)) {
            return false;
        }

        return true;
    }
}

// ================================================================
// 12. ACCORDION/FAQ
// ================================================================

class Accordion {
    constructor() {
        this.faqItems = getElements('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach((item) => {
            const header = item.querySelector('.faq-header');
            const body = item.querySelector('.faq-body');

            if (header) {
                header.addEventListener('click', () => {
                    this.toggleItem(item, header, body);
                });
            }
        });
    }

    toggleItem(item, header, body) {
        const isActive = header.classList.contains('active');

        this.faqItems.forEach((otherItem) => {
            const otherHeader = otherItem.querySelector('.faq-header');
            const otherBody = otherItem.querySelector('.faq-body');

            if (otherItem !== item && otherHeader?.classList.contains('active')) {
                this.closeItem(otherItem, otherHeader, otherBody);
            }
        });

        if (isActive) {
            this.closeItem(item, header, body);
        } else {
            this.openItem(item, header, body);
        }
    }

    openItem(item, header, body) {
        header.classList.add('active');
        body.style.display = 'block';
    }

    closeItem(item, header, body) {
        header.classList.remove('active');
        body.style.display = 'none';
    }
}

// ================================================================
// 13. DONATION CARDS
// ================================================================

class DonationCards {
    constructor() {
        this.donationCards = getElements('.donation-card');
        this.init();
    }

    init() {
        this.donationCards.forEach((card) => {
            card.addEventListener('click', () => {
                this.selectCard(card);
            });
        });
    }

    selectCard(card) {
        this.donationCards.forEach((c) => {
            c.classList.remove('active');
        });
        card.classList.add('active');
    }
}

// ================================================================
// 14. SCROLL INDICATOR
// ================================================================

class ScrollIndicator {
    constructor() {
        this.indicator = getElement('#scrollIndicator');
        this.init();
    }

    init() {
        if (this.indicator) {
            this.indicator.addEventListener('click', () => {
                const nextSection = getElement('#about');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            });

            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    this.indicator.style.opacity = '0';
                    this.indicator.style.pointerEvents = 'none';
                } else {
                    this.indicator.style.opacity = '1';
                    this.indicator.style.pointerEvents = 'auto';
                }
            });
        }
    }
}

// ================================================================
// 15. NEWSLETTER FORM
// ================================================================

class NewsletterForm {
    constructor() {
        this.forms = getElements('.newsletter-form');
        this.init();
    }

    init() {
        this.forms.forEach((form) => {
            form.addEventListener('submit', (e) => {
                this.handleSubmit(e);
            });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const input = e.target.querySelector('input[type="email"]');

        if (input?.value) {
            console.log('Newsletter subscription:', input.value);
            showNotification('Thank you for subscribing!', 'success');
            input.value = '';
        }
    }
}

// ================================================================
// 16. LAZY LOADING FOR IMAGES
// ================================================================

class LazyLoader {
    constructor() {
        this.images = getElements('img[loading="lazy"]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        observer.unobserve(img);
                    }
                });
            });

            this.images.forEach((img) => {
                observer.observe(img);
            });
        } else {
            this.images.forEach((img) => {
                img.src = img.dataset.src || img.src;
            });
        }
    }
}

// ================================================================
// 17. SMOOTH SCROLLING
// ================================================================

class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                const href = link.getAttribute('href');
                const target = getElement(href);

                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
}

// ================================================================
// 18. INITIALIZATION ON DOM READY
// ================================================================

function initializeApp() {
    setTimeout(() => {
        const loadingScreen = getElement('#loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 2500);

    new LanguageManager();
    new ThemeManager();
    new HeaderManager();
    new ScrollProgressBar();
    new ScrollToTopButton();
    new CounterAnimation();
    new ScrollReveal();
    new ProjectFilter();
    new FormManager();
    new Accordion();
    new DonationCards();
    new ScrollIndicator();
    new NewsletterForm();
    new LazyLoader();
    new SmoothScroller();

    console.log('Sky Foundation website initialized successfully!');
}

// ================================================================
// 19. EVENT LISTENERS
// ================================================================

document.addEventListener('DOMContentLoaded', initializeApp);

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        console.log('Page is now visible');
    }
});

window.addEventListener(
    'resize',
    debounce(() => {
        console.log('Window resized');
    }, 250)
);

// ================================================================
// 20. ERROR HANDLING
// ================================================================

window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
