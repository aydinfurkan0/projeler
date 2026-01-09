/* ========================================
   MOBILE.JS - ALDEX RESPONSIVE MENU
======================================== */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
    });

    function initMobileMenu() {
        // Create mobile menu HTML
        createMobileMenuHTML();

        // Get elements
        const hamburger = document.querySelector('.hamburger');
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
        const mobileNavClose = document.querySelector('.mobile-nav-close');
        const menuLinks = document.querySelectorAll('.mobile-nav-link.has-submenu');
        const body = document.body;

        // Toggle menu
        if (hamburger) {
            hamburger.addEventListener('click', function() {
                toggleMenu();
            });
        }

        // Close menu
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', function() {
                closeMenu();
            });
        }

        // Close menu when clicking overlay
        if (mobileNavOverlay) {
            mobileNavOverlay.addEventListener('click', function() {
                closeMenu();
            });
        }

        // Toggle submenus
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                toggleSubmenu(this);
            });
        });

        // Close menu on window resize if open
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 992) {
                    closeMenu();
                }
            }, 250);
        });

        // Handle submenu links
        const submenuLinks = document.querySelectorAll('.mobile-submenu-link');
        submenuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        function toggleMenu() {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        }

        function closeMenu() {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            body.classList.remove('menu-open');

            // Close all submenus
            const activeSubmenus = document.querySelectorAll('.mobile-submenu.active');
            const activeLinks = document.querySelectorAll('.mobile-nav-link.has-submenu.active');
            
            activeSubmenus.forEach(function(submenu) {
                submenu.classList.remove('active');
            });

            activeLinks.forEach(function(link) {
                link.classList.remove('active');
            });
        }

        function toggleSubmenu(link) {
            const submenu = link.nextElementSibling;
            const isActive = link.classList.contains('active');

            // Close all other submenus
            const allSubmenus = document.querySelectorAll('.mobile-submenu');
            const allLinks = document.querySelectorAll('.mobile-nav-link.has-submenu');

            allSubmenus.forEach(function(item) {
                if (item !== submenu) {
                    item.classList.remove('active');
                }
            });

            allLinks.forEach(function(item) {
                if (item !== link) {
                    item.classList.remove('active');
                }
            });

            // Toggle current submenu
            if (isActive) {
                link.classList.remove('active');
                submenu.classList.remove('active');
            } else {
                link.classList.add('active');
                submenu.classList.add('active');
            }
        }
    }

    function createMobileMenuHTML() {
        // Check if mobile menu already exists
        if (document.querySelector('.mobile-nav')) {
            return;
        }

        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Menüyü Aç');
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        // Add hamburger to nav container
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(hamburger);
        }

        // Create mobile nav overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';

        // Create mobile nav menu
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
            <div class="mobile-nav-header">
                <div class="mobile-nav-logo">ALDEX<span>.</span></div>
                <button class="mobile-nav-close" aria-label="Menüyü Kapat">×</button>
            </div>
            <div class="mobile-nav-body">
                <ul class="mobile-nav-list">
                    <li class="mobile-nav-item">
                        <a href="index.html#anasayfa" class="mobile-nav-link">Ana Sayfa</a>
                    </li>
                    <li class="mobile-nav-item">
                        <a href="index.html#hizmetler" class="mobile-nav-link">Hizmetler</a>
                    </li>
                    <li class="mobile-nav-item">
                        <a href="#" class="mobile-nav-link has-submenu">Projeler</a>
                        <ul class="mobile-submenu">
                            <li class="mobile-submenu-item">
                                <a href="projeler.html" class="mobile-submenu-link">Tüm Projeler</a>
                            </li>
                            <li class="mobile-submenu-item">
                                <a href="projeler.html?filter=tamamlandi" class="mobile-submenu-link">Tamamlanan Projeler</a>
                            </li>
                            <li class="mobile-submenu-item">
                                <a href="projeler.html?filter=devam" class="mobile-submenu-link">Devam Eden Projeler</a>
                            </li>
                            <li class="mobile-submenu-item">
                                <a href="projeler.html?filter=yapilacan" class="mobile-submenu-link">Yapılacak Projeler</a>
                            </li>
                        </ul>
                    </li>
                    <li class="mobile-nav-item">
                        <a href="#" class="mobile-nav-link has-submenu">Kurumsal</a>
                        <ul class="mobile-submenu">
                            <li class="mobile-submenu-item">
                                <a href="hakkimizda.html" class="mobile-submenu-link">Hakkımızda</a>
                            </li>
                            <li class="mobile-submenu-item">
                                <a href="hakkimizda.html#tarihce" class="mobile-submenu-link">Tarihçemiz</a>
                            </li>
                            <li class="mobile-submenu-item">
                                <a href="hakkimizda.html#ekip" class="mobile-submenu-link">Yönetim Ekibi</a>
                            </li>
                            <li class="mobile-submenu-item">
                                <a href="vizyon-misyon.html" class="mobile-submenu-link">Vizyon & Misyon</a>
                            </li>
                            <li class="mobile-submenu-item">
                                <a href="hakkimizda.html#sertifikalar" class="mobile-submenu-link">Sertifikalar</a>
                            </li>
                            <li class="mobile-submenu-item">
                                <a href="kariyer.html" class="mobile-submenu-link">Kariyer</a>
                            </li>
                        </ul>
                    </li>
                    <li class="mobile-nav-item">
                        <a href="iletisim.html" class="mobile-nav-link">İletişim</a>
                    </li>
                </ul>

                <div class="mobile-contact-info">
                    <h4>İletişim Bilgileri</h4>
                    <div class="mobile-contact-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        +90 312 123 45 67
                    </div>
                    <div class="mobile-contact-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        info@aldexinsaat.com
                    </div>
                    <div class="mobile-contact-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        Pzt-Cuma: 08:00 - 18:00
                    </div>
                </div>

                <div class="mobile-social">
                    <a href="#" aria-label="Facebook">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                    </a>
                    <a href="#" aria-label="Instagram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                    </a>
                    <a href="#" aria-label="LinkedIn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                            <rect x="2" y="9" width="4" height="12"/>
                            <circle cx="4" cy="4" r="2"/>
                        </svg>
                    </a>
                    <a href="#" aria-label="Twitter">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                        </svg>
                    </a>
                </div>
            </div>
        `;

        // Add to body
        document.body.appendChild(overlay);
        document.body.appendChild(mobileNav);
    }

})();