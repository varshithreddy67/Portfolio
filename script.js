// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'rgba(11, 17, 30, 0.95)';
            navLinks.style.padding = '2rem';
        });
    }

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Scroll reveal animation for sections
    const scrollSections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.2
    });

    scrollSections.forEach((section, index) => {
        section.classList.add('scroll-reveal');
        section.style.transitionDelay = `${index * 0.15}s`;
        revealObserver.observe(section);
    });

    const skillFills = document.querySelectorAll('.skill-fill');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach(fill => {
                    const width = fill.dataset.fill || '0%';
                    fill.style.setProperty('--fill-width', width);
                    fill.classList.add('filled');
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25
    });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    const certCards = document.querySelectorAll('.cert-card');
    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                certObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    certCards.forEach(card => {
        certObserver.observe(card);
    });

    // Add next-page scroll hint for hero
    const scrollHint = document.createElement('div');
    scrollHint.className = 'next-page-hint';
    scrollHint.innerHTML = '<i class="fa-solid fa-arrow-down"></i> Scroll to explore';
    document.body.appendChild(scrollHint);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            scrollHint.classList.add('hidden');
        } else {
            scrollHint.classList.remove('hidden');
        }
    });

    // Theme Toggle (Optional feature)
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const lightIcon = document.querySelector('.light-icon');
    const darkIcon = document.querySelector('.dark-icon');
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            
            if (body.classList.contains('light-theme')) {
                lightIcon.style.display = 'block';
                darkIcon.style.display = 'none';
            } else {
                lightIcon.style.display = 'none';
                darkIcon.style.display = 'block';
            }
        });
    }

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            
            // Simulate sending delay
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent Successfully!';
                btn.style.backgroundColor = '#28a745';
                btn.style.color = 'white';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 3000);
            }, 1500);
        });
    }
});
