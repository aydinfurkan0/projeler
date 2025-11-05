// Veri Yapısı ve API Simülasyonu
// Bu dosya admin panelinden eklenecek dinamik veriler için hazırlanmıştır

// Kategoriler
const categories = [
    {
        id: 'teknoloji',
        name: 'Teknoloji',
        description: 'Yazılım geliştirme, web tasarım ve IT eğitimleri',
        icon: 'fas fa-laptop-code',
        courseCount: 25,
        color: '#6366f1'
    },
    {
        id: 'tasarim',
        name: 'Tasarım',
        description: 'Grafik tasarım, UI/UX ve yaratıcı sanatlar',
        icon: 'fas fa-palette',
        courseCount: 18,
        color: '#8b5cf6'
    },
    {
        id: 'pazarlama',
        name: 'Pazarlama',
        description: 'Dijital pazarlama, sosyal medya ve satış',
        icon: 'fas fa-bullhorn',
        courseCount: 15,
        color: '#06d6a0'
    },
    {
        id: 'dil',
        name: 'Dil Eğitimi',
        description: 'İngilizce ve diğer yabancı dil eğitimleri',
        icon: 'fas fa-globe',
        courseCount: 12,
        color: '#f59e0b'
    },
    {
        id: 'is-gelistirme',
        name: 'İş Geliştirme',
        description: 'Girişimcilik, liderlik ve kariyer geliştirme',
        icon: 'fas fa-chart-line',
        courseCount: 10,
        color: '#ef4444'
    },
    {
        id: 'kisisel-gelisim',
        name: 'Kişisel Gelişim',
        description: 'Yaşam koçluğu ve kişisel beceri geliştirme',
        icon: 'fas fa-user-graduate',
        courseCount: 8,
        color: '#84cc16'
    }
];

// Eğitmenler
const instructors = [
    {
        id: 1,
        name: 'Ahmet Yılmaz',
        title: 'Full Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: '10+ yıl yazılım geliştirme deneyimi. Google ve Microsoft\'ta çalışmış, 50+ proje tamamlamış.',
        rating: 4.9,
        studentCount: 15420,
        courseCount: 12,
        totalHours: 180,
        expertise: ['JavaScript', 'React', 'Node.js', 'Python']
    },
    {
        id: 2,
        name: 'Elif Demir',
        title: 'UI/UX Designer',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332529c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Kullanıcı deneyimi uzmanı. Adobe Creative Suite sertifikalı, 100+ tasarım projesi tamamlamış.',
        rating: 4.8,
        studentCount: 12350,
        courseCount: 8,
        totalHours: 120,
        expertise: ['Figma', 'Adobe XD', 'Photoshop', 'User Research']
    },
    {
        id: 3,
        name: 'Can Özkan',
        title: 'Dijital Pazarlama Uzmanı',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Google Ads ve Facebook Marketing sertifikalı. 200+ başarılı kampanya yönetmiş.',
        rating: 4.7,
        studentCount: 9870,
        courseCount: 6,
        totalHours: 90,
        expertise: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics']
    }
];

// Kurslar
const courses = [
    {
        id: 1,
        title: 'Modern JavaScript ve ES6+ ile Web Geliştirme',
        slug: 'modern-javascript-es6-web-gelistirme',
        subtitle: 'Sıfırdan ileri seviyeye JavaScript öğrenin ve modern web uygulamaları geliştirin',
        description: `Bu kapsamlı JavaScript kursu ile modern web geliştirmenin temellerini öğrenin. 
        ES6+ özelliklerini kullanarak profesyonel web uygulamaları geliştirmeyi, DOM manipülasyonu, 
        asenkron programlama, ve modern JavaScript framework'lerinin temellerini keşfedin.`,
        longDescription: `Modern JavaScript ve ES6+ ile Web Geliştirme kursu, web geliştirme dünyasına adım atmak 
        isteyen veya mevcut becerilerini güncellemek isteyen herkes için tasarlanmıştır. Bu kurs boyunca JavaScript'in 
        en güncel özelliklerini öğrenecek, pratik projeler yaparak deneyim kazanacaksınız.
        
        Kursta yer alan konular arasında değişkenler, fonksiyonlar, objeler, arrays, DOM manipülasyonu, event handling, 
        asenkron programlama, promises, async/await, ES6+ özellikleri (arrow functions, destructuring, modules, classes), 
        ve modern web API'leri bulunmaktadır.`,
        category: 'teknoloji',
        instructor: 1,
        level: 'intermediate',
        duration: 45,
        price: 899,
        originalPrice: 1299,
        discount: 31,
        rating: 4.8,
        reviewCount: 2847,
        studentCount: 15420,
        language: 'Türkçe',
        lastUpdated: '2025-01-15',
        featured: true,
        bestseller: true,
        new: false,
        tags: ['JavaScript', 'ES6', 'Web Development', 'DOM', 'Async Programming'],
        objectives: [
            'Modern JavaScript syntax ve ES6+ özelliklerini kullanabileceksiniz',
            'DOM manipülasyonu ile dinamik web sayfaları oluşturabileceksiniz',
            'Asenkron programlama konseptlerini anlayıp uygulayabileceksiniz',
            'Modern web API\'lerini kullanarak etkileşimli uygulamalar geliştirebileceksiniz',
            'JavaScript best practices ve clean code prensiplerini uygulayabileceksiniz'
        ],
        requirements: [
            'Temel HTML ve CSS bilgisi',
            'Bilgisayar ve internet erişimi',
            'Öğrenme motivasyonu ve zaman ayırabilme'
        ],
        includes: [
            '45 saat video içerik',
            'Kaynak kodlar ve projeler',
            'Yaşam boyu erişim',
            'Mobil ve desktop erişim',
            'Bitirme sertifikası',
            'Topluluk desteği'
        ],
        curriculum: [
            {
                title: 'JavaScript Temelleri',
                lectures: [
                    { title: 'Kursa Giriş ve Genel Bakış', duration: '10:30', type: 'video', preview: true },
                    { title: 'JavaScript Nedir ve Nerede Kullanılır?', duration: '15:45', type: 'video' },
                    { title: 'Değişkenler ve Veri Tipleri', duration: '20:15', type: 'video' },
                    { title: 'Operatörler ve İfadeler', duration: '18:30', type: 'video' },
                    { title: 'Pratik Alıştırmalar', duration: '25:00', type: 'exercise' }
                ]
            },
            {
                title: 'ES6+ Özellikleri',
                lectures: [
                    { title: 'Let, Const ve Var Farkları', duration: '12:20', type: 'video' },
                    { title: 'Arrow Functions', duration: '16:45', type: 'video' },
                    { title: 'Template Literals', duration: '14:30', type: 'video' },
                    { title: 'Destructuring Assignment', duration: '19:15', type: 'video' },
                    { title: 'Spread ve Rest Operatörleri', duration: '17:00', type: 'video' }
                ]
            },
            {
                title: 'DOM Manipülasyonu',
                lectures: [
                    { title: 'DOM Nedir?', duration: '13:45', type: 'video' },
                    { title: 'Element Seçme ve Değiştirme', duration: '22:30', type: 'video' },
                    { title: 'Event Handling', duration: '25:15', type: 'video' },
                    { title: 'Dinamik İçerik Oluşturma', duration: '28:00', type: 'video' },
                    { title: 'Mini Proje: Todo List', duration: '45:00', type: 'project' }
                ]
            }
        ]
    },
    {
        id: 2,
        title: 'React ile Modern Web Uygulamaları Geliştirme',
        slug: 'react-modern-web-uygulamalari',
        subtitle: 'React ekosistemi ile profesyonel single-page uygulamalar geliştirin',
        description: 'React\'in temellerinden ileri seviye konularına kadar her şeyi öğrenin. Hooks, Context API, Redux ve modern React patterns ile gerçek dünya projeleri geliştirin.',
        longDescription: `React ile Modern Web Uygulamaları Geliştirme kursu, JavaScript bilgisi olan geliştiricilerin React ekosistemini derinlemesine öğrenmelerini sağlar. Bu kurs ile component-based architecture, state management, ve modern React patterns konularında uzmanlaşacaksınız.`,
        category: 'teknoloji',
        instructor: 1,
        level: 'advanced',
        duration: 60,
        price: 1299,
        originalPrice: 1899,
        discount: 32,
        rating: 4.9,
        reviewCount: 1923,
        studentCount: 8765,
        language: 'Türkçe',
        lastUpdated: '2025-01-10',
        featured: true,
        bestseller: false,
        new: true,
        tags: ['React', 'JavaScript', 'Hooks', 'Redux', 'Next.js'],
        objectives: [
            'React component\'leri ve JSX syntax\'ını kullanabileceksiniz',
            'React Hooks ile modern state management yapabileceksiniz',
            'Context API ve Redux ile global state yönetimi yapabileceksiniz',
            'React Router ile SPA uygulamaları geliştirebileceksiniz',
            'Next.js ile full-stack uygulamalar oluşturabileceksiniz'
        ],
        requirements: [
            'JavaScript ES6+ bilgisi',
            'HTML ve CSS temel bilgisi',
            'Node.js ve npm kullanım deneyimi'
        ],
        includes: [
            '60 saat video içerik',
            '10+ gerçek proje',
            'Kaynak kodlar',
            'Yaşam boyu erişim',
            'Bitirme sertifikası',
            '1-1 mentoring seansı'
        ]
    },
    {
        id: 3,
        title: 'UI/UX Tasarım Masterclass',
        slug: 'ui-ux-tasarim-masterclass',
        subtitle: 'Kullanıcı odaklı tasarım prensipleri ile profesyonel arayüzler oluşturun',
        description: 'User research\'ten wireframe\'e, prototype\'tan final tasarıma kadar tüm UI/UX sürecini öğrenin. Figma ve Adobe XD ile hands-on projeler yapın.',
        longDescription: `UI/UX Tasarım Masterclass kursu, tasarım dünyasına adım atmak isteyen veya mevcut becerilerini geliştirmek isteyen herkese yöneliktir. Bu kurs ile kullanıcı deneyimi tasarımının her aşamasını öğreneceksiniz.`,
        category: 'tasarim',
        instructor: 2,
        level: 'beginner',
        duration: 40,
        price: 799,
        originalPrice: 1199,
        discount: 33,
        rating: 4.7,
        reviewCount: 1456,
        studentCount: 6543,
        language: 'Türkçe',
        lastUpdated: '2024-12-28',
        featured: false,
        bestseller: true,
        new: false,
        tags: ['UI Design', 'UX Design', 'Figma', 'Adobe XD', 'User Research'],
        objectives: [
            'Kullanıcı araştırması yapabileceksiniz',
            'Wireframe ve mockup oluşturabileceksiniz',
            'Figma ile profesyonel tasarımlar yapabileceksiniz',
            'Design system oluşturabileceksiniz',
            'Usability testing yapabileceksiniz'
        ],
        requirements: [
            'Temel bilgisayar kullanımı',
            'Yaratıcılık ve detaylara dikkat',
            'Figma hesabı (ücretsiz)'
        ],
        includes: [
            '40 saat video içerik',
            'Figma template\'leri',
            'Design system kiti',
            'Yaşam boyu erişim',
            'Bitirme sertifikası'
        ]
    },
    {
        id: 4,
        title: 'Dijital Pazarlama ve Google Ads Uzmanlığı',
        slug: 'dijital-pazarlama-google-ads',
        subtitle: 'ROI odaklı dijital pazarlama stratejileri ve Google Ads kampanya yönetimi',
        description: 'SEO, SEM, sosyal medya pazarlama ve Google Ads ile etkili dijital pazarlama kampanyaları oluşturun. Gerçek kampanya örnekleri ile öğrenin.',
        longDescription: `Dijital Pazarlama ve Google Ads Uzmanlığı kursu, pazarlama alanında kariyer yapmak isteyenler için tasarlanmıştır. Bu kurs ile modern dijital pazarlama araçlarını kullanarak başarılı kampanyalar oluşturmayı öğreneceksiniz.`,
        category: 'pazarlama',
        instructor: 3,
        level: 'intermediate',
        duration: 35,
        price: 699,
        originalPrice: 999,
        discount: 30,
        rating: 4.6,
        reviewCount: 987,
        studentCount: 4321,
        language: 'Türkçe',
        lastUpdated: '2025-01-05',
        featured: false,
        bestseller: false,
        new: false,
        tags: ['Digital Marketing', 'Google Ads', 'SEO', 'SEM', 'Analytics'],
        objectives: [
            'Dijital pazarlama stratejisi geliştirebileceksiniz',
            'Google Ads kampanyaları oluşturup optimize edebileceksiniz',
            'SEO ve SEM teknikleri uygulayabileceksiniz',
            'Google Analytics ile veri analizi yapabileceksiniz',
            'Social media marketing stratejileri geliştirebileceksiniz'
        ],
        requirements: [
            'Temel pazarlama bilgisi',
            'Google hesabı',
            'Analitik düşünme becerisi'
        ],
        includes: [
            '35 saat video içerik',
            'Kampanya template\'leri',
            'Google Ads kredisi',
            'Yaşam boyu erişim',
            'Google Ads sertifikası'
        ]
    }
];

// Yorumlar
const reviews = [
    {
        id: 1,
        courseId: 1,
        studentName: 'Mehmet Kaya',
        studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face',
        rating: 5,
        date: '2025-01-20',
        title: 'Mükemmel bir kurs!',
        content: 'JavaScript konusunda sıfırdan başladım ve şimdi kendimi çok daha güçlü hissediyorum. Ahmet hoca\'nın anlatımı çok net ve anlaşılır. Kesinlikle tavsiye ederim.',
        helpful: 42,
        verified: true
    },
    {
        id: 2,
        courseId: 1,
        studentName: 'Ayşe Demir',
        studentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332529c?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face',
        rating: 4,
        date: '2025-01-18',
        title: 'Çok faydalı',
        content: 'ES6+ özellikleri konusunda çok şey öğrendim. Projeler gerçekten pratik ve işe yarar. Sadece biraz daha fazla örnek olabilirdi.',
        helpful: 28,
        verified: true
    }
];

// API Simülasyonu Fonksiyonları
const API = {
    // Kategoriler
    getCategories: () => {
        return new Promise(resolve => {
            setTimeout(() => resolve(categories), 300);
        });
    },

    // Kurslar
    getCourses: (filters = {}) => {
        return new Promise(resolve => {
            setTimeout(() => {
                // Admin panelden eklenen kursları da dahil et
                const adminCourses = JSON.parse(localStorage.getItem('adminCourses') || '[]');
                let allCourses = [...courses, ...adminCourses];
                
                let filteredCourses = [...allCourses];

                // Kategori filtresi
                if (filters.category && filters.category !== 'all') {
                    filteredCourses = filteredCourses.filter(course => 
                        course.category === filters.category
                    );
                }

                // Seviye filtresi
                if (filters.level && filters.level !== 'all') {
                    filteredCourses = filteredCourses.filter(course => 
                        course.level === filters.level
                    );
                }

                // Fiyat filtresi
                if (filters.priceRange && filters.priceRange !== 'all') {
                    const [min, max] = filters.priceRange.split('-').map(p => 
                        p === '2000+' ? Infinity : parseInt(p)
                    );
                    filteredCourses = filteredCourses.filter(course => 
                        course.price >= min && course.price <= max
                    );
                }

                // Arama filtresi
                if (filters.search) {
                    const searchTerm = filters.search.toLowerCase();
                    filteredCourses = filteredCourses.filter(course =>
                        course.title.toLowerCase().includes(searchTerm) ||
                        course.description.toLowerCase().includes(searchTerm) ||
                        (course.tags && course.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
                    );
                }

                // Sıralama
                if (filters.sort) {
                    switch (filters.sort) {
                        case 'newest':
                            filteredCourses.sort((a, b) => 
                                new Date(b.lastUpdated) - new Date(a.lastUpdated)
                            );
                            break;
                        case 'price-low':
                            filteredCourses.sort((a, b) => a.price - b.price);
                            break;
                        case 'price-high':
                            filteredCourses.sort((a, b) => b.price - a.price);
                            break;
                        case 'rating':
                            filteredCourses.sort((a, b) => b.rating - a.rating);
                            break;
                        case 'popular':
                        default:
                            filteredCourses.sort((a, b) => b.studentCount - a.studentCount);
                            break;
                    }
                }

                resolve(filteredCourses);
            }, 500);
        });
    },

    // Tek kurs detayı
    getCourse: (slug) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const course = courses.find(c => c.slug === slug);
                if (course) {
                    // Eğitmen bilgisini ekle
                    const instructor = instructors.find(i => i.id === course.instructor);
                    resolve({ ...course, instructorDetails: instructor });
                } else {
                    reject(new Error('Kurs bulunamadı'));
                }
            }, 300);
        });
    },

    // Öne çıkan kurslar
    getFeaturedCourses: (limit = 6) => {
        return new Promise(resolve => {
            setTimeout(() => {
                // Admin panelden eklenen kursları da dahil et
                const adminCourses = JSON.parse(localStorage.getItem('adminCourses') || '[]');
                let allCourses = [...courses, ...adminCourses];
                
                const featured = allCourses
                    .filter(course => course.featured)
                    .slice(0, limit);
                resolve(featured);
            }, 300);
        });
    },

    // Benzer kurslar
    getSimilarCourses: (courseId, limit = 4) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const currentCourse = courses.find(c => c.id === courseId);
                if (!currentCourse) {
                    resolve([]);
                    return;
                }

                const similar = courses
                    .filter(course => 
                        course.id !== courseId && 
                        course.category === currentCourse.category
                    )
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, limit);
                resolve(similar);
            }, 400);
        });
    },

    // Yorumlar
    getReviews: (courseId) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const courseReviews = reviews.filter(r => r.courseId === courseId);
                resolve(courseReviews);
            }, 300);
        });
    },

    // Eğitmen bilgisi
    getInstructor: (instructorId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const instructor = instructors.find(i => i.id === instructorId);
                if (instructor) {
                    resolve(instructor);
                } else {
                    reject(new Error('Eğitmen bulunamadı'));
                }
            }, 200);
        });
    }
};

// Yardımcı fonksiyonlar
const utils = {
    // Fiyat formatı
    formatPrice: (price) => {
        return `₺${price.toLocaleString('tr-TR')}`;
    },

    // Tarih formatı
    formatDate: (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Süre formatı
    formatDuration: (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}:${mins.toString().padStart(2, '0')}`;
    },

    // Rating yıldızları
    generateStars: (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let starsHTML = '';
        
        // Dolu yıldızlar
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        // Yarım yıldız
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Boş yıldızlar
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        
        return starsHTML;
    },

    // URL slug oluşturma
    generateSlug: (title) => {
        return title
            .toLowerCase()
            .replace(/[şŞ]/g, 's')
            .replace(/[ğĞ]/g, 'g')
            .replace(/[üÜ]/g, 'u')
            .replace(/[öÖ]/g, 'o')
            .replace(/[çÇ]/g, 'c')
            .replace(/[ıİ]/g, 'i')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    // Sayfa URL'si oluşturma
    getCourseURL: (slug) => {
        return `course-detail.html?course=${slug}`;
    },

    // Query parametrelerini alma
    getUrlParams: () => {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (let [key, value] of params) {
            result[key] = value;
        }
        return result;
    },

    // Loading state yönetimi
    showLoading: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = 'block';
        }
    },

    hideLoading: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = 'none';
        }
    }
};

// Global değişken olarak export et
window.CourseData = {
    API,
    utils,
    categories,
    instructors,
    courses
};