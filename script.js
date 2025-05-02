document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');
    const body = document.body;

    // ===== SCROLL-BASED THEME CHANGE =====
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        const aboutTop = aboutSection.offsetTop;
        const contactTop = contactSection.offsetTop;

        if (scrollPosition >= aboutTop && scrollPosition < contactTop) {
            body.classList.add('alt-theme');
            body.classList.remove('passed-contact');
        } else if (scrollPosition >= contactTop) {
            body.classList.add('alt-theme', 'passed-contact');
        } else {
            body.classList.remove('alt-theme', 'passed-contact');
        }
    });

    // ===== SCROLL FADE-IN =====
    const fadeInElements = document.querySelectorAll('.service-item, .media-img, .media-video');

    function revealOnScroll() {
        fadeInElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            }
        });
    }

    fadeInElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ===== HOVER ZOOM EFFECT =====
    document.querySelectorAll('.media-img, .media-video').forEach(el => {
        el.style.transition = 'transform 0.3s ease';
        el.addEventListener('mouseover', () => el.style.transform = 'scale(1.05)');
        el.addEventListener('mouseout', () => el.style.transform = 'scale(1)');
    });

    // ===== FLIP CARD ON CLICK =====
    document.querySelectorAll('.service-item').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // ===== SCROLL-TO-TOP BUTTON =====
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== PARALLAX TILT EFFECT ON SERVICE CARDS =====
    document.querySelectorAll('.service-item').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0)';
        });

        card.style.transition = 'transform 0.2s ease';
        card.style.transformStyle = 'preserve-3d';
    });

    // ===== TYPING TEXT ANIMATION FOR SERVICE DESCRIPTIONS =====
    function typeWriter(el, text, speed = 40) {
        el.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            el.textContent += text.charAt(i);
            i++;
            if (i > text.length) clearInterval(interval);
        }, speed);
    }

    document.querySelectorAll('.service-item .desc').forEach((el, i) => {
        const fullText = el.dataset.fulltext || el.textContent;
        setTimeout(() => {
            typeWriter(el, fullText);
        }, i * 800); // stagger typing for each
    });
});

const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    
        // Show the button when user scrolls down
        window.onscroll = function () {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };
    
        // Smooth scroll to top
        scrollToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.addEventListener("DOMContentLoaded", function () {
            const form = document.getElementById("contactForm");
            const modal = document.getElementById("thankYouModal");
    
            form.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevents default form submission
    
                if (form.checkValidity()) {
                    fetch(form.action, {
                        method: "POST",
                        body: new FormData(form)
                    }).then(response => {
                        if (response.ok) {
                            modal.style.display = "flex"; // Show modal after successful submission
    
                            setTimeout(() => {
                                modal.style.display = "none"; // Hide after 7 seconds
                            }, 7000);
    
                            form.reset(); // Clear form fields
                        } else {
                            alert("Something went wrong, please try again.");
                        }
                    }).catch(() => {
                        alert("Error sending message. Please try again later.");
                    });
                } else {
                    form.reportValidity();
                }
            });
    
            // Ensure modal is hidden on page load
            modal.style.display = "none";
        });