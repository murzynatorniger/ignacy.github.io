// ========================================
// NAVIGATION & HAMBURGER MENU
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// LOGIN SYSTEM
// ========================================

const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const closeLoginBtn = document.getElementById('closeLogin');
const loginBtns = document.querySelectorAll('#loginBtn, #loginBtn2');
const logoutBtns = document.querySelectorAll('#logoutBtn, #logoutBtn2');

// Credentials
const VALID_USERNAME = 'ignacy';
const VALID_PASSWORD = '1234';

// Open login modal
loginBtns.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openLoginModal();
        });
    }
});

// Close login modal
if (closeLoginBtn) {
    closeLoginBtn.addEventListener('click', closeLoginModal);
}

// Close modal when clicking outside
if (loginModal) {
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });
}

function openLoginModal() {
    if (loginModal) {
        loginModal.classList.add('active');
        if (usernameInput) usernameInput.focus();
    }
}

function closeLoginModal() {
    if (loginModal) {
        loginModal.classList.remove('active');
        if (loginForm) loginForm.reset();
    }
}

// Handle login form submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            // Save login state to localStorage
            localStorage.setItem('ignacy_logged_in', 'true');
            closeLoginModal();
            
            // Redirect to secret page after a short delay
            setTimeout(() => {
                window.location.href = 'secret.html';
            }, 500);
        } else {
            showLoginError('❌ Zły login lub hasło!');
            passwordInput.value = '';
            usernameInput.focus();
        }
    });
}

function showLoginError(message) {
    // Visual feedback for wrong credentials
    loginForm.style.animation = 'shake 0.5s ease-in-out';
    
    const existingError = document.querySelector('.login-error');
    if (existingError) existingError.remove();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'login-error';
    errorDiv.style.cssText = `
        color: #ff007f;
        margin-top: 1rem;
        padding: 0.8rem;
        background: rgba(255, 0, 127, 0.1);
        border: 1px solid rgba(255, 0, 127, 0.3);
        border-radius: 8px;
        animation: slideInUp 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    loginForm.appendChild(errorDiv);
    
    setTimeout(() => {
        loginForm.style.animation = 'none';
        errorDiv.remove();
    }, 3000);
}

// Add shake animation to style
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ========================================
// LOGOUT
// ========================================

logoutBtns.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('ignacy_logged_in');
            window.location.href = 'index.html';
        });
    }
});

// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            // Show success message
            showFormMessage('✅ Wiadomość została wysłana! (Symulacja)', 'success');
            contactForm.reset();
        } else {
            showFormMessage('❌ Proszę wypełnić wszystkie pola!', 'error');
        }
    });
}

function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 4000);
    }
}

// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================

function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

setActiveNav();

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    }
});

// ========================================
// INTERACTIVE BUTTONS
// ========================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// CARD HOVER EFFECTS
// ========================================

document.querySelectorAll('.card, .gallery-item, .info-card, .trait-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// TYPING ANIMATION EFFECT
// ========================================

function typeText(element, text, speed = 50) {
    if (!element) return;
    
    element.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ========================================
// FORM INPUT VALIDATION
// ========================================

const inputElements = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea');

inputElements.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--neon-cyan)';
    });
    
    input.addEventListener('blur', function() {
        this.style.borderColor = 'var(--glass-border)';
    });
});

// ========================================
// EASTER EGGS
// ========================================

let secretKeySequence = [];
const secretCode = ['i', 'g', 'n', 'a', 'c', 'y'];

document.addEventListener('keydown', (e) => {
    secretKeySequence.push(e.key.toLowerCase());
    secretKeySequence = secretKeySequence.slice(-6);

    if (secretKeySequence.join('') === secretCode.join('')) {
        triggerEasterEgg();
        secretKeySequence = [];
    }
});

function triggerEasterEgg() {
    const audio = new Audio('data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==');
    audio.play().catch(() => {});
    
    // Create floating text
    const messages = ['🎮', '⚡', '👑', '🏆', '🌟'];
    for (let i = 0; i < 10; i++) {
        const floatingText = document.createElement('div');
        floatingText.textContent = messages[Math.floor(Math.random() * messages.length)];
        floatingText.style.cssText = `
            position: fixed;
            font-size: ${20 + Math.random() * 30}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            z-index: 9999;
            animation: floatUp ${3 + Math.random() * 2}s ease-out forwards;
        `;
        document.body.appendChild(floatingText);
        
        setTimeout(() => floatingText.remove(), 5000);
    }
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
        closeLoginModal();
    }
});

// ========================================
// PAGE LOAD ANIMATIONS
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Trigger animations for hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInScale 1s ease-out';
    }
    if (heroButtons) {
        heroButtons.style.animation = 'fadeInSlide 1s ease-out 0.6s both';
    }
});

// ========================================
// MOBILE MENU CLOSE ON LINK CLICK
// ========================================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ========================================
// PREVENT MULTIPLE FORM SUBMISSIONS
// ========================================

let isSubmitting = false;

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        isSubmitting = true;
        setTimeout(() => { isSubmitting = false; }, 1000);
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        isSubmitting = true;
        setTimeout(() => { isSubmitting = false; }, 1000);
    });
}

// ========================================
// THEME DETECTION
// ========================================

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.style.colorScheme = 'dark';
}

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c🎮 Witaj w świecie Ignacego! 🎮', 'font-size: 20px; color: #00f2fe; text-shadow: 0 0 10px #00f2fe; font-weight: bold;');
console.log('%cTa strona została stworzona dla legendy komputera!', 'color: #ff006e; font-size: 14px;');
console.log('%cSpróbuj wpisać: ignacy', 'color: #667eea; font-size: 12px;');
