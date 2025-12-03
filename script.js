// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

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

    // Check if videoId is a URL (YouTube/Vimeo embed)
    if (videoId.startsWith('http')) {
        let embedUrl = videoId;
        let isYouTube = false;

        // 1. Robust Regex to extract ID from any YouTube URL (Shorts, Watch, Embed, Short-link)
        // This handles:
        // - youtube.com/shorts/ID
        // - youtube.com/watch?v=ID
        // - youtu.be/ID
        // - youtube.com/embed/ID
        // - And ignores extra parameters like &feature=share
        const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = videoId.match(ytRegExp);

        if (match && match[2].length === 11) {
            const ytId = match[2];
            // Add 'rel=0' to not show random videos after finish
            // Add 'origin' to satisfy CORS requirements
            embedUrl = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&origin=${window.location.origin}`;
            isYouTube = true;
            console.log('Generated YouTube Embed URL:', embedUrl);
        }

        // 2. Create iframe with strict permissions (Fixes Error 153)
        videoPlayer.innerHTML = `
            <iframe 
                src="${embedUrl}" 
                title="Video player"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                style="width: 100%; height: 100%; border-radius: 20px;"
            ></iframe>
        `;
    } else {
        // It's a local video file path
        videoPlayer.innerHTML = `
            <video 
                controls 
                autoplay 
                style="width: 100%; height: 100%; border-radius: 20px;"
            >
                <source src="${videoId}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }
}

function closeVideoModal() {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    // Clear video to stop playback
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

// ===== OPTIMIZED SCROLL HANDLER WITH DEBOUNCING =====
let scrollTimeout;
let lastScroll = 0;

function handleScroll() {
    const currentScroll = window.pageYOffset;

    // Navbar scroll effect
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active navigation highlighting
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');

        if (currentScroll > sectionTop && currentScroll <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    lastScroll = currentScroll;
}

// Debounced scroll handler for better performance
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(handleScroll);
});

// Initial call
handleScroll();

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
// ===== TYPING EFFECT =====
const textsToTypeElement = document.querySelector('.textsToType');

if (textsToTypeElement) {
    const textsToType = [
        'Stunning Content',
        'Engaging Stories',
        'Amazing Edits',
        'Epic Moments',
        'Creative Magic'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Settings for speed (lower = faster)
    const typeSpeed = 100; // Normal typing speed
    const deleteSpeed = 50; // Backspace speed
    const pauseDelay = 2000; // Pause at end of word

    function typeText() {
        const currentText = textsToType[textIndex];
        let speed = typeSpeed;

        if (isDeleting) {
            // DELETING
            charIndex--;
            textsToTypeElement.textContent = currentText.substring(0, charIndex);
            speed = deleteSpeed;
        } else {
            // TYPING
            textsToTypeElement.textContent = currentText.substring(0, charIndex);
            charIndex++;
            speed = typeSpeed;
        }

        // LOGIC TO SWITCH STATES
        if (!isDeleting && charIndex > currentText.length) {
            // Finished typing word - Pause then delete
            isDeleting = true;
            speed = pauseDelay;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting - Move to next word
            isDeleting = false;
            textIndex = (textIndex + 1) % textsToType.length;
            speed = 500; // Small pause before typing next word
        }

        setTimeout(typeText, speed);
    }

    // START IMMEDIATELY
    textsToTypeElement.textContent = '';
    typeText();
}
// ===== CACHE SECTIONS FOR SCROLL HANDLER =====
// ===== CACHE SECTIONS FOR SCROLL HANDLER =====
// sections is defined at the top

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach(faq => faq.classList.remove('active'));

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== STATS COUNTER ANIMATION =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumber = entry.target;
            const targetText = statNumber.textContent.trim();
            const target = parseInt(targetText.replace(/\D/g, ''));

            if (isNaN(target)) return;

            let current = 0;
            const increment = target / 60;
            const suffix = targetText.replace(/[0-9,+]/g, '');

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    statNumber.textContent = Math.ceil(current).toLocaleString() + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    statNumber.textContent = target.toLocaleString() + suffix;
                    statNumber.classList.add('counted');
                }
            };

            updateCount();
        }
    });
}, { threshold: 0.5 });

// Observe all stat numbers
document.querySelectorAll('.stat-number, .stat-number-big').forEach(stat => {
    statsObserver.observe(stat);
});

// ===== PAGE LOADER =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});

