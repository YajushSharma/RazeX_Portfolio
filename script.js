// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#contact') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const targetPosition = target.offsetTop - 100;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe video cards
document.querySelectorAll('.video-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Observe section headers
document.querySelectorAll('.section-header').forEach(header => {
    header.classList.add('fade-in');
    observer.observe(header);
});

// ===== CONTACT MODAL =====
const contactModal = document.getElementById('contactModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const contactBtns = [
    document.getElementById('contactBtn'),
    document.getElementById('heroContactBtn'),
    document.getElementById('ctaContactBtn')
];

function openContactModal() {
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
}

contactBtns.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openContactModal();
        });
    }
});

modalOverlay.addEventListener('click', closeContactModal);
modalClose.addEventListener('click', closeContactModal);

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeContactModal();
        closeVideoModal();
    }
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // Show success message (in production, this would send to a server)
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    
    // Reset form and close modal
    contactForm.reset();
    closeContactModal();
});

// ===== VIDEO MODAL =====
const videoModal = document.getElementById('videoModal');
const videoModalOverlay = document.getElementById('videoModalOverlay');
const videoModalClose = document.getElementById('videoModalClose');
const videoCards = document.querySelectorAll('.video-card');
const videoPlayer = document.getElementById('videoPlayer');

function openVideoModal(videoId) {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // In production, load actual video here
    videoPlayer.innerHTML = `
        <div style="padding: 2rem; text-align: center;">
            <p style="font-size: 1.2rem; margin-bottom: 1rem;">Video: ${videoId}</p>
            <p style="color: var(--color-text-secondary);">In production, this would load the actual video player with the selected video.</p>
            <p style="color: var(--color-text-tertiary); margin-top: 1rem; font-size: 0.9rem;">You can integrate with YouTube, Vimeo, or use HTML5 video player.</p>
        </div>
    `;
}

function closeVideoModal() {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    videoPlayer.innerHTML = '';
}

videoCards.forEach(card => {
    card.addEventListener('click', () => {
        const videoId = card.getAttribute('data-video');
        openVideoModal(videoId);
    });
});

videoModalOverlay.addEventListener('click', closeVideoModal);
videoModalClose.addEventListener('click', closeVideoModal);

// ===== VIEW WORKS BUTTON =====
const viewWorksBtn = document.getElementById('viewWorksBtn');
if (viewWorksBtn) {
    viewWorksBtn.addEventListener('click', () => {
        const shortsSection = document.getElementById('shorts');
        if (shortsSection) {
            const targetPosition = shortsSection.offsetTop - 100;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.3 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== INITIALIZE ANIMATIONS =====
window.addEventListener('load', () => {
    // Add animation classes
    document.querySelectorAll('.about-features .feature-item').forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });
    
    // Testimonial cards animation
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Why choose us items
    document.querySelectorAll('.why-item').forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
});
