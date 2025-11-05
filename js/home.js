// Ana Sayfa JavaScript
function initializePage() {
    loadCategories();
    loadFeaturedCourses();
    initializeContactForm();
}

// Kategorileri yükle
async function loadCategories() {
    try {
        const categoriesGrid = document.getElementById('categoriesGrid');
        if (!categoriesGrid) return;
        
        // Loading göster
        categoriesGrid.innerHTML = createCategorySkeleton(6);
        
        const categories = await window.CourseData.API.getCategories();
        
        const categoriesHTML = categories.map(category => 
            window.EduUtils.createCategoryCard(category)
        ).join('');
        
        categoriesGrid.innerHTML = categoriesHTML;
        
        // Animasyon ekle
        setTimeout(() => {
            const cards = categoriesGrid.querySelectorAll('.category__card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 100);
        
    } catch (error) {
        console.error('Kategoriler yüklenemedi:', error);
        const categoriesGrid = document.getElementById('categoriesGrid');
        if (categoriesGrid) {
            categoriesGrid.innerHTML = '<p class="error-message">Kategoriler yüklenirken bir hata oluştu.</p>';
        }
    }
}

// Öne çıkan kursları yükle
async function loadFeaturedCourses() {
    try {
        const featuredCourses = document.getElementById('featuredCourses');
        if (!featuredCourses) return;
        
        // Loading göster
        featuredCourses.innerHTML = createCourseSkeleton(6);
        
        const courses = await window.CourseData.API.getFeaturedCourses(6);
        
        if (courses.length === 0) {
            featuredCourses.innerHTML = `
                <div class="no-courses">
                    <div class="no-courses__icon">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <h3>Henüz öne çıkan kurs bulunmuyor</h3>
                    <p>Yakında yeni kurslarımızla buradayız!</p>
                    <a href="courses.html" class="btn btn--primary">
                        <i class="fas fa-search"></i>
                        Tüm Kursları İncele
                    </a>
                </div>
            `;
            return;
        }
        
        const coursesHTML = courses.map(course => 
            window.EduUtils.createCourseCard(course)
        ).join('');
        
        featuredCourses.innerHTML = coursesHTML;
        
        // Animasyon ekle
        setTimeout(() => {
            const cards = featuredCourses.querySelectorAll('.course__card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }, 200);
        
    } catch (error) {
        console.error('Öne çıkan kurslar yüklenemedi:', error);
        const featuredCourses = document.getElementById('featuredCourses');
        if (featuredCourses) {
            featuredCourses.innerHTML = `
                <div class="error-state">
                    <h3>Kurslar yüklenirken bir hata oluştu</h3>
                    <button class="btn btn--primary" onclick="loadFeaturedCourses()">
                        <i class="fas fa-refresh"></i>
                        Tekrar Dene
                    </button>
                </div>
            `;
        }
    }
}

// İletişim formu
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validasyon
            if (!validateContactForm(data)) {
                return;
            }
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            submitButton.disabled = true;
            
            try {
                // API call simülasyonu
                await sendContactMessage(data);
                
                // Başarı mesajı
                window.EduUtils.showNotification(
                    'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 
                    'success'
                );
                
                // Formu temizle
                form.reset();
                
            } catch (error) {
                window.EduUtils.showNotification(
                    'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.',
                    'error'
                );
            } finally {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
}

// Form validasyonu
function validateContactForm(data) {
    const errors = [];
    
    if (!data.firstName || data.firstName.trim().length < 2) {
        errors.push('Ad en az 2 karakter olmalıdır');
    }
    
    if (!data.lastName || data.lastName.trim().length < 2) {
        errors.push('Soyad en az 2 karakter olmalıdır');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Geçerli bir e-posta adresi giriniz');
    }
    
    if (!data.subject) {
        errors.push('Lütfen bir konu seçiniz');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Mesajınız en az 10 karakter olmalıdır');
    }
    
    if (!data.privacy) {
        errors.push('Gizlilik politikasını kabul etmeniz gerekmektedir');
    }
    
    if (errors.length > 0) {
        window.EduUtils.showNotification(
            `Lütfen aşağıdaki hataları düzeltin:\n• ${errors.join('\n• ')}`,
            'error',
            6000
        );
        return false;
    }
    
    return true;
}

// E-posta validasyonu
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mesaj gönderme (API simülasyonu)
async function sendContactMessage(data) {
    // Gerçek API entegrasyonu için bu kısmı değiştirin
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // %10 hata simülasyonu
            if (Math.random() < 0.1) {
                reject(new Error('Network error'));
            } else {
                resolve({ success: true, messageId: Date.now() });
            }
        }, 2000);
    });
}

// Kategori skeleton
function createCategorySkeleton(count = 6) {
    const skeleton = `
        <div class="category__skeleton">
            <div class="skeleton__icon"></div>
            <div class="skeleton__content">
                <div class="skeleton__line skeleton__line--short"></div>
                <div class="skeleton__line"></div>
                <div class="skeleton__line skeleton__line--medium"></div>
            </div>
        </div>
    `;
    
    return Array(count).fill(skeleton).join('');
}

// Kurs skeleton
function createCourseSkeleton(count = 6) {
    const skeleton = `
        <div class="course__skeleton">
            <div class="skeleton__image"></div>
            <div class="skeleton__content">
                <div class="skeleton__line skeleton__line--short"></div>
                <div class="skeleton__line"></div>
                <div class="skeleton__line skeleton__line--medium"></div>
                <div class="skeleton__line skeleton__line--short"></div>
                <div class="skeleton__line skeleton__line--medium"></div>
            </div>
        </div>
    `;
    
    return Array(count).fill(skeleton).join('');
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', function() {
    // Eğer ana sayfadaysak
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        setTimeout(initializePage, 100);
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadCategories,
        loadFeaturedCourses,
        validateContactForm,
        isValidEmail
    };
}