// ============================================
// Bypass Captcha - Landing Page Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
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

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        }

        lastScroll = currentScroll;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.feature-card, .step, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Stagger animation for grid items
    document.querySelectorAll('.features-grid .feature-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.steps-container .step').forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.15}s`;
    });

    // Play button click (placeholder)
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', () => {
            // When video is added, this will play it
            alert('วิดีโอกำลังจะมาเร็วๆ นี้!');
        });
    }

    // Mouse follow effect for cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Counter animation for stats
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(update);
    };

    // Trigger counter animation when stats are visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    const text = statNumber.textContent;
                    if (text === '99%') {
                        statNumber.textContent = '0';
                        animateCounter(statNumber, 99, 1500);
                        setTimeout(() => statNumber.textContent = '99%', 1500);
                    }
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });

    console.log('🔓 Bypass Captcha Website Loaded');
});
