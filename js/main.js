// Ana JavaScript Dosyası - Ortak Fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeStatsCounter();
    initializeNewsletterForm();
    initializeScrollEffects();
    
    // Sayfa özel init fonksiyonlarını çalıştır
    if (typeof initializePage === 'function') {
        initializePage();
    }
});

// Navigasyon Menüsü
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Mobil menü toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Menü dışına tıklandığında menüyü kapat
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
                const icon = navToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    }
    
    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Eğer href # ile başlıyorsa smooth scroll uygula
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Mobil menüyü kapat
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    const icon = navToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    });
}

// Scroll Efektleri
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    
    // Header scroll efekti
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Scroll to top button
    createScrollToTopButton();
    
    // Intersection Observer ile animasyonlar
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Animasyon yapılacak elementleri gözlemle
    const animatedElements = document.querySelectorAll(
        '.course__card, .category__card, .feature, .stat__item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Scroll to Top Button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Scroll olayını dinle
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Üste scroll
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animasyonları Başlat
function initializeAnimations() {
    // AOS benzeri basit animasyon sistemi
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1
    });
    
    // Animasyon için hazırla
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// İstatistik Sayaçları
function initializeStatsCounter() {
    const stats = document.querySelectorAll('.stat__number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.dataset.target);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Özel formatlar
            if (element.textContent.includes('.')) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    };
    
    // Intersection Observer ile sayaçları başlat
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        counterObserver.observe(stat);
    });
}

// Newsletter Form
function initializeNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            const button = form.querySelector('button');
            const originalText = button.innerHTML;
            
            // Loading state
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            button.disabled = true;
            
            try {
                // Simulated API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success
                showNotification('Başarılı! E-posta listemize katıldınız.', 'success');
                form.reset();
                
            } catch (error) {
                showNotification('Bir hata oluştu. Lütfen tekrar deneyiniz.', 'error');
            } finally {
                button.innerHTML = originalText;
                button.disabled = false;
            }
        });
    }
}

// Bildirim Sistemi
function showNotification(message, type = 'info', duration = 4000) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification__close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Stil ekle
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animasyon ile göster
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Kapatma butonu
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Otomatik kapatma
    setTimeout(() => {
        closeNotification(notification);
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#6366f1'
    };
    return colors[type] || '#6366f1';
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Kurs Kartları Oluşturma
function createCourseCard(course) {
    const instructor = window.CourseData.instructors.find(i => i.id === course.instructor);
    const categoryData = window.CourseData.categories.find(c => c.id === course.category);
    
    const badges = [];
    if (course.new) badges.push('<span class="course__badge course__badge--new">Yeni</span>');
    if (course.bestseller) badges.push('<span class="course__badge course__badge--popular">Popüler</span>');
    if (course.discount > 0) badges.push(`<span class="course__badge course__badge--sale">${course.discount}% İndirim</span>`);
    
    return `
        <div class="course__card" data-category="${course.category}" onclick="window.location.href='${window.CourseData.utils.getCourseURL(course.slug)}'">
            ${badges.length ? badges.join('') : ''}
            <div class="course__image">
                <i class="${categoryData.icon}"></i>
            </div>
            <div class="course__content">
                <span class="course__category">${categoryData.name}</span>
                <h4 class="course__title">${course.title}</h4>
                <p class="course__description">${course.description}</p>
                
                <div class="course__instructor">
                    <img src="${instructor.avatar}" alt="${instructor.name}" class="instructor__avatar">
                    <span>${instructor.name}</span>
                </div>
                
                <div class="course__stats">
                    <span><i class="fas fa-users"></i> ${course.studentCount.toLocaleString()}</span>
                    <span><i class="fas fa-clock"></i> ${course.duration}s</span>
                    <span><i class="fas fa-signal"></i> ${getLevelText(course.level)}</span>
                </div>
                
                <div class="course__meta">
                    <div class="course__price-group">
                        ${course.originalPrice > course.price ? 
                            `<span class="course__price--original">${window.CourseData.utils.formatPrice(course.originalPrice)}</span>` : ''
                        }
                        <span class="course__price">${window.CourseData.utils.formatPrice(course.price)}</span>
                    </div>
                    <div class="course__rating">
                        <div class="rating-stars">${window.CourseData.utils.generateStars(course.rating)}</div>
                        <span class="rating-text">${course.rating} (${course.reviewCount})</span>
                    </div>
                </div>
                
                <button class="btn btn--primary course__button" onclick="event.stopPropagation(); enrollCourse(${course.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Hemen Kayıt Ol
                </button>
            </div>
        </div>
    `;
}

// Kategori Kartları Oluşturma
function createCategoryCard(category) {
    return `
        <div class="category__card" data-category="${category.id}" onclick="window.location.href='courses.html?category=${category.id}'">
            <div class="category__icon">
                <i class="${category.icon}"></i>
            </div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <div class="category__meta">
                <span class="category__count">${category.courseCount} eğitim</span>
            </div>
        </div>
    `;
}

// Yardımcı Fonksiyonlar
function getLevelText(level) {
    const levels = {
        beginner: 'Başlangıç',
        intermediate: 'Orta',
        advanced: 'İleri'
    };
    return levels[level] || 'Bilinmiyor';
}

function enrollCourse(courseId) {
    showNotification('Kayıt işlemi için giriş yapmanız gerekmektedir.', 'info');
    // Burada gerçek bir kayıt sistemi entegrasyonu yapılabilir
}

// Loading State Yönetimi
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="loading">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <p>Yükleniyor...</p>
            </div>
        `;
    }
}

function hideLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        const loading = container.querySelector('.loading');
        if (loading) {
            loading.remove();
        }
    }
}

// Skeleton Loading
function createCourseSkeleton() {
    return `
        <div class="course__skeleton">
            <div class="skeleton__image"></div>
            <div class="skeleton__content">
                <div class="skeleton__line skeleton__line--short"></div>
                <div class="skeleton__line"></div>
                <div class="skeleton__line skeleton__line--medium"></div>
                <div class="skeleton__line skeleton__line--short"></div>
            </div>
        </div>
    `;
}

function showSkeletonLoading(containerId, count = 6) {
    const container = document.getElementById(containerId);
    if (container) {
        const skeletons = Array(count).fill(createCourseSkeleton()).join('');
        container.innerHTML = skeletons;
    }
}

// Modal Yönetimi
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // ESC tuşu ile kapatma
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal(modalId);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Paylaşım Fonksiyonları
function shareOnSocialMedia(platform, url, title) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Local Storage Yönetimi
const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn('LocalStorage kullanılamıyor:', error);
        }
    },
    
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.warn('LocalStorage okunamıyor:', error);
            return defaultValue;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn('LocalStorage\'dan silinemedi:', error);
        }
    }
};

// Wishlist Yönetimi
const Wishlist = {
    add: (courseId) => {
        const wishlist = Storage.get('wishlist', []);
        if (!wishlist.includes(courseId)) {
            wishlist.push(courseId);
            Storage.set('wishlist', wishlist);
            showNotification('Kurs istek listenize eklendi!', 'success');
        } else {
            showNotification('Kurs zaten istek listenizde!', 'warning');
        }
    },
    
    remove: (courseId) => {
        const wishlist = Storage.get('wishlist', []);
        const index = wishlist.indexOf(courseId);
        if (index > -1) {
            wishlist.splice(index, 1);
            Storage.set('wishlist', wishlist);
            showNotification('Kurs istek listenizden çıkarıldı!', 'success');
        }
    },
    
    isInWishlist: (courseId) => {
        const wishlist = Storage.get('wishlist', []);
        return wishlist.includes(courseId);
    },
    
    getAll: () => {
        return Storage.get('wishlist', []);
    }
};

// Görüntülenen Kurslar (Son Görüntülenen)
const RecentlyViewed = {
    add: (courseId) => {
        const recent = Storage.get('recentlyViewed', []);
        const index = recent.indexOf(courseId);
        
        // Eğer zaten varsa çıkar
        if (index > -1) {
            recent.splice(index, 1);
        }
        
        // Başa ekle
        recent.unshift(courseId);
        
        // Maksimum 10 tane tut
        if (recent.length > 10) {
            recent.pop();
        }
        
        Storage.set('recentlyViewed', recent);
    },
    
    getAll: () => {
        return Storage.get('recentlyViewed', []);
    }
};

// Performance Monitoring
function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
}

// Lazy Loading Images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Tema Değiştirici (Opsiyonel)
const ThemeManager = {
    init: () => {
        const savedTheme = Storage.get('theme', 'light');
        ThemeManager.setTheme(savedTheme);
    },
    
    setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        Storage.set('theme', theme);
    },
    
    toggle: () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        ThemeManager.setTheme(newTheme);
    }
};

// Global Error Handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Production'da error tracking servisine gönderebilirsiniz
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Production'da error tracking servisine gönderebilirsiniz
});

// Global utility functions
window.EduUtils = {
    showNotification,
    Storage,
    Wishlist,
    RecentlyViewed,
    createCourseCard,
    createCategoryCard,
    shareOnSocialMedia,
    openModal,
    closeModal,
    showLoading,
    hideLoading,
    enrollCourse
};