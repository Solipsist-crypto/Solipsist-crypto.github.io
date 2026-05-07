// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(2)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animated counter for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stat-card')) {
                const number = entry.target.querySelector('.stat-number');
                const target = parseInt(number.getAttribute('data-target'));
                animateCounter(number, target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-card, .contact-method');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Glitch effect on hero title
const glitchText = document.querySelector('.glitch');
let glitchInterval;

const createGlitch = () => {
    const text = glitchText.getAttribute('data-text');
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    let iterations = 0;
    clearInterval(glitchInterval);

    glitchInterval = setInterval(() => {
        glitchText.textContent = text
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return text[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iterations >= text.length) {
            clearInterval(glitchInterval);
        }

        iterations += 1 / 3;
    }, 30);
};

// Trigger glitch effect on page load
window.addEventListener('load', () => {
    setTimeout(createGlitch, 500);
});

// Trigger glitch effect on hover
glitchText.addEventListener('mouseenter', createGlitch);

// Typing effect for subtitle
const subtitle = document.querySelector('.subtitle');
const subtitleText = 'Python Developer';
let charIndex = 0;

const typeWriter = () => {
    if (charIndex < subtitleText.length) {
        subtitle.textContent = subtitleText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 100);
    } else {
        // Add cursor after typing is complete
        const cursor = document.querySelector('.typing-cursor');
        if (cursor) {
            cursor.style.display = 'inline';
        }
    }
};

// Start typing effect after page load
window.addEventListener('load', () => {
    subtitle.textContent = '';
    setTimeout(typeWriter, 1000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// Add smooth reveal animation for portfolio items
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Particle effect for hero background (optional enhancement)
const createParticle = () => {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 5 + 1;
    const x = Math.random() * window.innerWidth;
    const duration = Math.random() * 3 + 2;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: var(--primary-color);
        border-radius: 50%;
        left: ${x}px;
        bottom: -10px;
        opacity: ${Math.random() * 0.5 + 0.2};
        pointer-events: none;
        animation: float ${duration}s ease-in forwards;
    `;

    hero.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
};

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        to {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 300);

// Tech stack items hover effect
const techItems = document.querySelectorAll('.tech-item');

techItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service cards tilt effect
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--accent-gradient);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Hide cursor on mobile devices
if (window.innerWidth <= 768) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

// Console message for developers
console.log('%c👋 Привіт, розробнику!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cЯкщо ти читаєш це, значить тобі цікаво, як працює цей сайт.', 'color: #0099ff; font-size: 14px;');

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById('modal-' + modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById('modal-' + modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});
console.log('%cЗв\'яжись зі мною, якщо хочеш обговорити проєкт!', 'color: #00ff88; font-size: 14px;');
console.log('%cTelegram: @solipsist_dev', 'color: #a0aec0; font-size: 12px;');