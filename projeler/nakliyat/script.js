        // Hamburger Menu & Full Screen Menu
        const hamburger = document.getElementById('hamburger');
        const fullscreenMenu = document.getElementById('fullscreenMenu');
        const menuClose = document.getElementById('menuClose');
        const menuLinks = document.querySelectorAll('.menu-link');

        function openMenu() {
            hamburger.classList.add('active');
            fullscreenMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            hamburger.classList.remove('active');
            fullscreenMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        hamburger.addEventListener('click', openMenu);
        menuClose.addEventListener('click', closeMenu);

        // Menu links close menu when clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // ESC key to close menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (fullscreenMenu.classList.contains('active')) {
                    closeMenu();
                }
                if (document.getElementById('contactModal').style.display === 'block') {
                    closeContactModal();
                }
            }
        });

        // Smooth scrolling
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

        // Contact Modal functions
        function openContactModal() {
            document.getElementById('contactModal').style.display = 'block';
        }

        function closeContactModal() {
            document.getElementById('contactModal').style.display = 'none';
        }

        function callMehmet() {
            window.open('tel:+902125554433', '_self');
            closeContactModal();
        }

        function callAhmet() {
            window.open('tel:+905325554433', '_self');
            closeContactModal();
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('contactModal');
            if (event.target == modal) {
                closeContactModal();
            }
        }

        // Intersection Observer for animations
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

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('[data-count]');
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const current = parseInt(counter.textContent);
                const increment = target / 100;
                
                if (current < target) {
                    counter.textContent = Math.ceil(current + increment);
                    setTimeout(() => animateCounters(), 50);
                } else {
                    counter.textContent = target;
                }
            });
        }

        // Start counter animation when stats section is visible
        const statsSection = document.querySelector('.stats');
        let statsAnimated = false;

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    setTimeout(animateCounters, 300);
                }
            });
        });

        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(30, 58, 138, 0.95), rgba(59, 130, 246, 0.95))';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #1e3a8a, #3b82f6)';
                header.style.backdropFilter = 'none';
            }
        });