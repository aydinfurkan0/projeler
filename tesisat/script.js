// Navigation Functions
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

function showHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('servicesPage').style.display = 'none';
   
    // Close mobile menu
    document.querySelector('.nav-menu').classList.remove('active');
   
    // Scroll to top
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function showServices() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('servicesPage').style.display = 'block';
   
    // Close mobile menu
    document.querySelector('.nav-menu').classList.remove('active');
   
    // Scroll to top
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentNode;
            item.classList.toggle('active');
        });
    });
});

// Image Modal Functions
function openImageModal(src) {
    document.getElementById('imageModal').style.display = "flex";
    document.getElementById('modalImage').src = src;
}

function closeImageModal() {
    document.getElementById('imageModal').style.display = "none";
}

// Search Functions
function openSearch() {
    document.getElementById('searchModal').style.display = 'block';
    document.querySelector('.search-input').focus();
}

function closeSearch() {
    document.getElementById('searchModal').style.display = 'none';
    document.querySelector('.search-input').value = '';
    document.getElementById('searchResults').innerHTML = '';
}

function performSearch(query) {
    const results = document.getElementById('searchResults');
   
    if (query.length < 2) {
        results.innerHTML = '';
        return;
    }
    // Search data with all service areas
    const searchData = [
        // Konut Alanları
        { title: 'Villa İlaçlama Ankara', desc: 'Geniş villa alanları ve bahçeler için kapsamlı ilaçlama hizmetleri', action: 'showServices()' },
        { title: 'Köy Evi İlaçlama', desc: 'Kırsal alanlardaki köy evleri için özel ilaçlama çözümleri', action: 'showServices()' },
        { title: 'Kış Bahçesi İlaçlama', desc: 'Bitki dostu ürünlerle kış bahçesi haşere kontrolü', action: 'showServices()' },
        { title: 'Apartman İlaçlama', desc: 'Apartman daireleri ve ortak alanlar için düzenli ilaçlama', action: 'showServices()' },
       
        // Ticari Alanlar
        { title: 'Ofis İlaçlama Ankara', desc: 'Çalışanların sağlığını koruyacak ofis ilaçlama hizmetleri', action: 'showServices()' },
        { title: 'Banka İlaçlama', desc: 'Hassas finansal ortamlar için özel ilaçlama protokolleri', action: 'showServices()' },
        { title: 'Okul İlaçlama', desc: 'Öğrenci ve personel sağlığı öncelikli okul ilaçlama', action: 'showServices()' },
        { title: 'Restoran İlaçlama', desc: 'Gıda güvenliği standartlarına uygun mutfak ilaçlama', action: 'showServices()' },
        { title: 'Mağaza İlaçlama', desc: 'Perakende satış alanları için işletme dostu ilaçlama', action: 'showServices()' },
       
        // Açık Alanlar
        { title: 'Bağ Bahçe İlaçlama', desc: 'Meyve bahçeleri ve bağlar için organik ürünlerle zararlı kontrolü', action: 'showServices()' },
        { title: 'Tarla İlaçlama', desc: 'Tahıl tarlaları ve tarımsal alanlar için haşere kontrolü', action: 'showServices()' },
        { title: 'Arsa İlaçlama', desc: 'Boş arsalar ve inşaat alanları için kapsamlı temizlik', action: 'showServices()' },
        { title: 'Park İlaçlama', desc: 'Kamu parkları ve yeşil alanlar için çevre güvenli ilaçlama', action: 'showServices()' },
       
        // Özel Alanlar
        { title: 'Cami İlaçlama', desc: 'Dini mekanlar için hassas ve saygılı ilaçlama hizmetleri', action: 'showServices()' },
        { title: 'Halı Saha İlaçlama', desc: 'Spor tesisleri ve halı sahalar için sporcu güvenliği öncelikli', action: 'showServices()' },
       
        // Genel Hizmetler
        { title: 'Böcek İlaçlama', desc: 'Karınca, hamamböceği, güve, sivrisinek kontrolü', action: 'showServices()' },
        { title: 'Dezenfeksiyon', desc: 'Virus, bakteri ve mikroorganizma temizliği', action: 'showServices()' },
       
        // Sayfalar
        { title: 'İletişim Bilgileri', desc: 'Telefon, adres ve iletişim bilgileri', action: 'showHome(); document.getElementById("iletisim").scrollIntoView();' },
        { title: 'Konum ve Yol Tarifi', desc: 'Ankara ofis konumu ve Google Maps yol tarifi', action: 'showHome(); document.getElementById("iletisim").scrollIntoView();' },
        { title: 'Hakkımızda', desc: 'Firma bilgileri ve avantajlarımız', action: 'showHome(); document.getElementById("hakkimizda").scrollIntoView();' },
        { title: 'Sıkça Sorulan Sorular', desc: 'İlaçlama hizmetlerimizle ilgili sık sorulan sorular', action: 'showHome(); document.getElementById("sss").scrollIntoView();' }
    ];
    const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase())
    );
    let html = '';
    filtered.forEach(item => {
        html += `
            <div class="search-result-item" onclick="${item.action}; closeSearch();">
                <strong>${item.title}</strong>
                <small>${item.desc}</small>
            </div>
        `;
    });
    if (filtered.length === 0) {
        html = '<div class="search-result-item"><strong>Sonuç bulunamadı</strong><small>Farklı anahtar kelimeler deneyiniz</small></div>';
    }
    results.innerHTML = html;
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Make sure we're on home page
                showHome();
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        }
    });
});

// Close search modal when clicking outside
document.getElementById('searchModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeSearch();
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.remove('active');
    });
});

// SEO and Performance Optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Add more structured data dynamically
    const additionalStructuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Ankara Villa Köy Evi Kış Bahçesi İlaçlama Hizmetleri",
        "description": "Ankara'da tüm alan türleri için profesyonel ilaçlama hizmetleri",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Emek Grup İlaçlama",
            "telephone": "+90-507-030-3630",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ankara",
                "addressCountry": "TR"
            }
        },
        "areaServed": "Ankara",
        "serviceType": [
            "Villa İlaçlama",
            "Köy Evi İlaçlama",
            "Kış Bahçesi İlaçlama",
            "Bağ Bahçe İlaçlama",
            "Tarla İlaçlama",
            "Arsa İlaçlama",
            "Apartman İlaçlama",
            "Okul İlaçlama",
            "Ofis İlaçlama",
            "Banka İlaçlama",
            "Cami İlaçlama",
            "Park İlaçlama",
            "Halı Saha İlaçlama"
        ]
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(additionalStructuredData);
    document.head.appendChild(script);
    // Add FAQ structured data
    const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "İlaçlama işlemi ne kadar sürer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "İlaçlama süresi, alanın büyüklüğüne ve haşere türüne bağlı olarak değişir. Ortalama olarak, bir villa veya apartman dairesi için 1-2 saat, tarla veya bahçe gibi açık alanlar için 3-4 saat sürebilir."
                }
            },
            {
                "@type": "Question",
                "name": "Kullandığınız ilaçlar evcil hayvanlar için güvenli midir?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Evet, kullandığımız ürünler Sağlık Bakanlığı onaylı ve çevre dostudur. Evcil hayvanlarınız için güvenli olan ilaçlar kullanıyor, işlem öncesi gerekli önlemleri alıyoruz."
                }
            },
            {
                "@type": "Question",
                "name": "İlaçlama sonrası alan ne zaman kullanılabilir?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "İlaçlama türüne bağlı olarak, alan genellikle 2-4 saat sonra güvenli bir şekilde kullanılabilir. Size işlem sonrası detaylı bilgi ve öneriler sunuyoruz."
                }
            },
            {
                "@type": "Question",
                "name": "İlaçlama garantisi ne kadar süre için geçerlidir?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tüm ilaçlama hizmetlerimiz için 3 ay garanti sunuyoruz. Garanti süresi içinde herhangi bir sorun yaşarsanız, ücretsiz ek müdahale sağlıyoruz."
                }
            }
        ]
    };
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqData);
    document.head.appendChild(faqScript);
});

// Track user interactions for analytics
function trackInteraction(action, element) {
    console.log(`User interaction: ${action} on ${element}`);
    // Here you would typically send data to Google Analytics
    // gtag('event', action, {'event_category': 'engagement', 'event_label': element});
}


// Add event listeners for tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track button clicks
    document.querySelector('.whatsapp-btn').addEventListener('click', () => trackInteraction('click', 'whatsapp-button'));
    document.querySelector('.search-btn').addEventListener('click', () => trackInteraction('click', 'search-button'));
   
    // Track map interactions
    document.querySelectorAll('.map-link').forEach(link => {
        link.addEventListener('click', () => trackInteraction('click', 'map-link'));
    });
    // Track service page visits
    window.showServices = function() {
        document.getElementById('homePage').style.display = 'none';
        document.getElementById('servicesPage').style.display = 'block';
        document.querySelector('.nav-menu').classList.remove('active');
        window.scrollTo({top: 0, behavior: 'smooth'});
        trackInteraction('page_view', 'services-page');
    };
   
    // Video yüklemesini optimize et
    const video = document.querySelector('.hero-video');
    if (video) {
        // Mobil ve masaüstü için doğru kaynağı yükle
        const sources = video.querySelectorAll('source');
        sources.forEach(source => {
            if (window.matchMedia(source.media).matches) {
                video.src = source.src; // Eşleşen kaynağı yükle
            }
        });
        video.load(); // Videoyu yeniden yükle
    }
});
// Lazy loading for performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload critical resources
const preloadLink = document.createElement('link');
preloadLink.rel = 'preload';
preloadLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
preloadLink.as = 'style';
document.head.appendChild(preloadLink);

// Service Worker for caching (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration would go here
    });
}

// Optimize images loading
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// Call optimization functions
document.addEventListener('DOMContentLoaded', optimizeImages);