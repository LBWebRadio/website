// main.js - JavaScript for Live Beats WebRadio Player website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                valid = false;
                alert('Please fill out all required fields.');
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                valid = false;
                alert('Please enter a valid email address.');
            }
            
            // If valid, you would normally submit the form
            if (valid) {
                alert('Thank you for your message! We will respond shortly.');
                this.reset();
            }
        });
    }

    // Mobile menu toggle (for responsive design)
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        if (header && nav) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
            
            mobileMenuBtn.addEventListener('click', () => {
                nav.classList.toggle('active');
            });
            
            // Insert before the first child of header
            header.insertBefore(mobileMenuBtn, header.firstChild);
            
            // Add close functionality when clicking a link
            const navLinks = nav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                });
            });
        }
    };
    
    // Only create mobile menu if viewport is narrow
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Window resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            // Only create if it doesn't exist
            if (!document.querySelector('.mobile-menu-btn')) {
                createMobileMenu();
            }
        }
    });

    // Add animation to feature cards when they come into view
    const observeElements = (elements, className) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                }
            });
        }, { threshold: 0.3 });
        
        elements.forEach(el => {
            observer.observe(el);
        });
    };
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length) {
        observeElements(featureCards, 'animate-in');
    }
    
    // Observe testimonials
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length) {
        observeElements(testimonials, 'animate-in');
    }
    
    // FAQ Toggle functionality - FIXED VERSION
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            const answer = item.querySelector('p');
            
            // Hide all answers initially
            answer.style.display = 'none';
            
            // Add click event to questions
            question.addEventListener('click', function() {
                // Toggle the answer's visibility
                if (answer.style.display === 'none') {
                    answer.style.display = 'block';
                    this.classList.add('active');
                } else {
                    answer.style.display = 'none';
                    this.classList.remove('active');
                }
            });
        });
    }
});
