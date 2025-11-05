// Eğitim Detay Sayfası JavaScript
let currentCourse = null;
let currentTab = 'overview';

// Sayfa yüklendiğinde çalışacak fonksiyon
function initializePage() {
    const params = window.CourseData.utils.getUrlParams();
    const courseSlug = params.course;
    
    if (!courseSlug) {
        showError('Kurs bulunamadı');
        return;
    }
    
    loadCourseDetails(courseSlug);
    initializeTabs();
    initializeCurriculum();
    initializeModal();
    initializeShareButtons();
    initializeWishlistButton();
}

// Kurs detaylarını yükle
async function loadCourseDetails(slug) {
    try {
        showLoading('course-hero');
        
        // Kurs detaylarını al
        const course = await window.CourseData.API.getCourse(slug);
        currentCourse = course;
        
        // Son görüntülenen kurslara ekle
        window.EduUtils.RecentlyViewed.add(course.id);
        
        // Sayfa başlığını güncelle
        updatePageTitle(course.title);
        
        // Kurs hero bölümünü render et
        renderCourseHero(course);
        
        // Kurs içeriğini render et
        renderCourseContent(course);
        
        // Benzer kursları yükle
        loadSimilarCourses(course.id);
        
        // Reviews yükle
        loadReviews(course.id);
        
        hideLoading('course-hero');
        
    } catch (error) {
        console.error('Kurs yükleme hatası:', error);
        showError('Kurs yüklenirken bir hata oluştu');
    }
}

// Sayfa başlığını güncelle
function updatePageTitle(title) {
    document.title = `${title} - EğitimAkademi`;
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = `${title} - EğitimAkademi`;
    }
}

// Kurs hero bölümünü render et
function renderCourseHero(course) {
    const instructor = course.instructorDetails;
    const category = window.CourseData.categories.find(c => c.id === course.category);
    
    // Breadcrumb güncelle
    document.getElementById('breadcrumbCategory').textContent = category.name;
    document.getElementById('breadcrumbTitle').textContent = course.title;
    
    // Kurs bilgilerini güncelle
    document.getElementById('courseCategory').textContent = category.name;
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseSubtitle').textContent = course.subtitle;
    
    // Rating güncelle
    const ratingStars = document.getElementById('ratingStars');
    const ratingText = document.getElementById('ratingText');
    ratingStars.innerHTML = window.CourseData.utils.generateStars(course.rating);
    ratingText.textContent = `${course.rating} (${course.reviewCount} değerlendirme)`;
    
    // İstatistikleri güncelle
    document.getElementById('studentCount').textContent = course.studentCount.toLocaleString();
    document.getElementById('courseDuration').textContent = course.duration;
    document.getElementById('courseLevel').textContent = getLevelText(course.level);
    document.getElementById('lastUpdated').textContent = window.CourseData.utils.formatDate(course.lastUpdated);
    
    // Eğitmen bilgisi
    const instructorAvatar = document.getElementById('instructorAvatar');
    const instructorName = document.getElementById('instructorName');
    instructorAvatar.src = instructor.avatar;
    instructorAvatar.alt = instructor.name;
    instructorName.textContent = instructor.name;
    
    // Fiyat bilgisi
    const currentPrice = document.getElementById('currentPrice');
    const originalPrice = document.getElementById('originalPrice');
    const discountBadge = document.getElementById('discountBadge');
    
    currentPrice.textContent = window.CourseData.utils.formatPrice(course.price);
    
    if (course.originalPrice > course.price) {
        originalPrice.textContent = window.CourseData.utils.formatPrice(course.originalPrice);
        originalPrice.style.display = 'inline';
        discountBadge.textContent = `%${course.discount} İndirim`;
        discountBadge.style.display = 'inline';
    } else {
        originalPrice.style.display = 'none';
        discountBadge.style.display = 'none';
    }
    
    // Kurs içeriği
    const courseIncludes = document.getElementById('courseIncludes');
    if (course.includes) {
        courseIncludes.innerHTML = course.includes.map(item => 
            `<li><i class="fas fa-check"></i> ${item}</li>`
        ).join('');
    }
}

// Kurs içeriğini render et
function renderCourseContent(course) {
    // Overview tab
    renderOverviewTab(course);
    
    // Curriculum tab
    renderCurriculumTab(course);
    
    // Instructor tab
    renderInstructorTab(course.instructorDetails);
}

// Overview tab render
function renderOverviewTab(course) {
    const courseDescription = document.getElementById('courseDescription');
    const courseObjectives = document.getElementById('courseObjectives');
    const courseRequirements = document.getElementById('courseRequirements');
    
    // Açıklama
    if (course.longDescription) {
        courseDescription.innerHTML = course.longDescription.replace(/\n/g, '<br>');
    }
    
    // Hedefler
    if (course.objectives) {
        courseObjectives.innerHTML = course.objectives.map(objective => 
            `<li>${objective}</li>`
        ).join('');
    }
    
    // Gereksinimler
    if (course.requirements) {
        courseRequirements.innerHTML = course.requirements.map(requirement => 
            `<li>${requirement}</li>`
        ).join('');
    }
}

// Curriculum tab render
function renderCurriculumTab(course) {
    const curriculumContent = document.getElementById('curriculumContent');
    const sectionCount = document.getElementById('sectionCount');
    const lectureCount = document.getElementById('lectureCount');
    const totalDuration = document.getElementById('totalDuration');
    
    if (!course.curriculum) return;
    
    // İstatistikler
    const totalLectures = course.curriculum.reduce((sum, section) => sum + section.lectures.length, 0);
    const totalMinutes = course.curriculum.reduce((sum, section) => 
        sum + section.lectures.reduce((sectionSum, lecture) => {
            const [minutes, seconds] = lecture.duration.split(':').map(Number);
            return sectionSum + minutes + (seconds / 60);
        }, 0), 0
    );
    
    sectionCount.textContent = course.curriculum.length;
    lectureCount.textContent = totalLectures;
    totalDuration.textContent = `${Math.floor(totalMinutes / 60)}s ${Math.round(totalMinutes % 60)}dk`;
    
    // Bölümleri render et
    const curriculumHTML = course.curriculum.map((section, sectionIndex) => `
        <div class="curriculum-section">
            <div class="section-header" onclick="toggleSection(${sectionIndex})">
                <div class="section-info">
                    <h4 class="section-title">${section.title}</h4>
                    <span class="section-meta">${section.lectures.length} ders</span>
                </div>
                <i class="fas fa-chevron-down section-toggle" id="toggle-${sectionIndex}"></i>
            </div>
            <div class="section-content" id="content-${sectionIndex}">
                ${section.lectures.map((lecture, lectureIndex) => `
                    <div class="lecture-item" onclick="playLecture(${sectionIndex}, ${lectureIndex})">
                        <div class="lecture-icon">
                            <i class="fas fa-${getLectureIcon(lecture.type)}"></i>
                        </div>
                        <div class="lecture-info">
                            <div class="lecture-title">${lecture.title}</div>
                            <div class="lecture-duration">${lecture.duration}</div>
                        </div>
                        ${lecture.preview ? '<span class="lecture-preview">Önizle</span>' : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    curriculumContent.innerHTML = curriculumHTML;
}

// Eğitmen tab render
function renderInstructorTab(instructor) {
    const instructorProfile = document.getElementById('instructorProfile');
    
    const instructorHTML = `
        <div class="instructor-profile">
            <img src="${instructor.avatar}" alt="${instructor.name}" class="instructor-avatar-large">
            <div class="instructor-details">
                <h3>${instructor.name}</h3>
                <p class="instructor-title">${instructor.title}</p>
                
                <div class="instructor-stats">
                    <div class="instructor-stat">
                        <i class="fas fa-star"></i>
                        <span>${instructor.rating} eğitmen puanı</span>
                    </div>
                    <div class="instructor-stat">
                        <i class="fas fa-users"></i>
                        <span>${instructor.studentCount.toLocaleString()} öğrenci</span>
                    </div>
                    <div class="instructor-stat">
                        <i class="fas fa-play-circle"></i>
                        <span>${instructor.courseCount} kurs</span>
                    </div>
                    <div class="instructor-stat">
                        <i class="fas fa-clock"></i>
                        <span>${instructor.totalHours} saat içerik</span>
                    </div>
                </div>
                
                <div class="instructor-bio">
                    <p>${instructor.bio}</p>
                </div>
                
                <div class="instructor-expertise">
                    <h4>Uzmanlık Alanları:</h4>
                    <div class="expertise-tags">
                        ${instructor.expertise.map(skill => 
                            `<span class="expertise-tag">${skill}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    instructorProfile.innerHTML = instructorHTML;
}

// Reviews yükle
async function loadReviews(courseId) {
    try {
        const reviews = await window.CourseData.API.getReviews(courseId);
        renderReviews(reviews);
    } catch (error) {
        console.error('Yorumlar yüklenemedi:', error);
    }
}

// Reviews render et
function renderReviews(reviews) {
    const reviewsSummary = document.getElementById('reviewsSummary');
    const reviewsList = document.getElementById('reviewsList');
    
    if (!currentCourse) return;
    
    // Özet
    const summaryHTML = `
        <div class="overall-rating">
            <div class="rating-number">${currentCourse.rating}</div>
            <div class="rating-stars">${window.CourseData.utils.generateStars(currentCourse.rating)}</div>
            <div class="rating-text">${currentCourse.reviewCount} değerlendirme</div>
        </div>
        <div class="rating-distribution">
            ${[5, 4, 3, 2, 1].map(star => {
                const count = reviews.filter(r => r.rating === star).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return `
                    <div class="rating-row">
                        <div class="rating-stars-small">
                            ${Array(star).fill('<i class="fas fa-star"></i>').join('')}
                        </div>
                        <div class="rating-bar">
                            <div class="rating-fill" style="width: ${percentage}%"></div>
                        </div>
                        <span class="rating-count">${count}</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    reviewsSummary.innerHTML = summaryHTML;
    
    // Yorumlar listesi
    const reviewsHTML = reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <img src="${review.studentAvatar}" alt="${review.studentName}" class="review-avatar">
                <div class="review-info">
                    <div class="review-author">${review.studentName}</div>
                    <div class="review-meta">
                        <div class="rating-stars">${window.CourseData.utils.generateStars(review.rating)}</div>
                        <span>${window.CourseData.utils.formatDate(review.date)}</span>
                        ${review.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Doğrulanmış</span>' : ''}
                    </div>
                </div>
            </div>
            <div class="review-content">
                ${review.title ? `<h5>${review.title}</h5>` : ''}
                <p>${review.content}</p>
                <div class="review-actions">
                    <button class="review-helpful" onclick="markHelpful(${review.id})">
                        <i class="far fa-thumbs-up"></i>
                        Yararlı (${review.helpful})
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    reviewsList.innerHTML = reviewsHTML;
}

// Benzer kursları yükle
async function loadSimilarCourses(courseId) {
    try {
        const similarCourses = await window.CourseData.API.getSimilarCourses(courseId);
        renderSimilarCourses(similarCourses);
    } catch (error) {
        console.error('Benzer kurslar yüklenemedi:', error);
    }
}

// Benzer kursları render et
function renderSimilarCourses(courses) {
    const similarCourses = document.getElementById('similarCourses');
    const relatedCourses = document.getElementById('relatedCourses');
    
    const coursesHTML = courses.map(course => window.EduUtils.createCourseCard(course)).join('');
    
    if (similarCourses) {
        similarCourses.innerHTML = coursesHTML;
    }
    
    // Sidebar'da da göster
    if (relatedCourses) {
        const relatedHTML = courses.slice(0, 3).map(course => {
            const category = window.CourseData.categories.find(c => c.id === course.category);
            return `
                <div class="related-course" onclick="window.location.href='${window.CourseData.utils.getCourseURL(course.slug)}'">
                    <div class="related-course-image">
                        <i class="${category.icon}"></i>
                    </div>
                    <div class="related-course-info">
                        <div class="related-course-title">${course.title}</div>
                        <div class="related-course-price">${window.CourseData.utils.formatPrice(course.price)}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        relatedCourses.innerHTML = relatedHTML;
    }
}

// Tab sistemi
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            switchTab(tabId);
            
            // Aktif tab butonunu güncelle
            tabBtns.forEach(b => b.classList.remove('nav-btn--active'));
            btn.classList.add('nav-btn--active');
        });
    });
}

// Tab değiştir
function switchTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Tüm tabları gizle
    tabContents.forEach(content => {
        content.classList.remove('tab-content--active');
    });
    
    // Seçilen tabı göster
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('tab-content--active');
    }
    
    currentTab = tabId;
}

// Müfredat bölümlerini başlat
function initializeCurriculum() {
    // Bu fonksiyon curriculum render edildikten sonra çalışacak
    // Şimdilik boş bırakıyoruz, gerekirse daha sonra ekleyeceğiz
}

// Bölüm aç/kapa
function toggleSection(sectionIndex) {
    const content = document.getElementById(`content-${sectionIndex}`);
    const toggle = document.getElementById(`toggle-${sectionIndex}`);
    
    if (content && toggle) {
        const isOpen = content.classList.contains('show');
        
        if (isOpen) {
            content.classList.remove('show');
            toggle.classList.remove('rotate');
        } else {
            content.classList.add('show');
            toggle.classList.add('rotate');
        }
    }
}

// Ders oynat
function playLecture(sectionIndex, lectureIndex) {
    if (!currentCourse.curriculum) return;
    
    const lecture = currentCourse.curriculum[sectionIndex].lectures[lectureIndex];
    
    if (lecture.preview) {
        // Önizleme için modal aç
        openPreviewModal(lecture);
    } else {
        // Giriş yapılması gerektiğini bildir
        window.EduUtils.showNotification('Bu derse erişim için kursa kayıt olmanız gerekmektedir.', 'info');
    }
}

// Önizleme modal'ını aç
function openPreviewModal(lecture) {
    const modal = document.getElementById('previewModal');
    const video = document.getElementById('previewVideoPlayer');
    
    if (modal && video) {
        // Video source'u set et (demo için placeholder)
        video.src = `https://www.w3schools.com/html/mov_bbb.mp4`; // Demo video
        
        window.EduUtils.openModal('previewModal');
    }
}

// Modal sistemi
function initializeModal() {
    const modal = document.getElementById('previewModal');
    const closeBtn = document.getElementById('closeModal');
    const video = document.getElementById('previewVideoPlayer');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            window.EduUtils.closeModal('previewModal');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
    }
    
    // Modal dışına tıklandığında kapat
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                window.EduUtils.closeModal('previewModal');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }
    
    // Önizleme butonunu başlat
    const previewVideo = document.getElementById('previewVideo');
    if (previewVideo) {
        previewVideo.addEventListener('click', () => {
            openPreviewModal({ title: 'Kurs Önizleme' });
        });
    }
}

// Paylaşım butonları
function initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.dataset.platform;
            const url = window.location.href;
            const title = currentCourse ? currentCourse.title : 'EğitimAkademi Kursu';
            
            window.EduUtils.shareOnSocialMedia(platform, url, title);
        });
    });
}

// Wishlist butonu
function initializeWishlistButton() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            if (currentCourse) {
                toggleWishlist(currentCourse.id);
            }
        });
        
        // Başlangıç durumunu güncelle
        updateWishlistButton();
    }
}

// Wishlist toggle
function toggleWishlist(courseId) {
    const isInWishlist = window.EduUtils.Wishlist.isInWishlist(courseId);
    
    if (isInWishlist) {
        window.EduUtils.Wishlist.remove(courseId);
    } else {
        window.EduUtils.Wishlist.add(courseId);
    }
    
    updateWishlistButton();
}

// Wishlist butonunu güncelle
function updateWishlistButton() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    
    if (wishlistBtn && currentCourse) {
        const isInWishlist = window.EduUtils.Wishlist.isInWishlist(currentCourse.id);
        const icon = wishlistBtn.querySelector('i');
        const text = wishlistBtn.querySelector('span');
        
        if (isInWishlist) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            if (text) text.textContent = 'İstek Listesinden Çıkar';
            wishlistBtn.classList.add('btn--active');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            if (text) text.textContent = 'İstek Listesine Ekle';
            wishlistBtn.classList.remove('btn--active');
        }
    }
}

// Kayıt ol butonu
function initializeEnrollButton() {
    const enrollBtn = document.getElementById('enrollBtn');
    
    if (enrollBtn) {
        enrollBtn.addEventListener('click', () => {
            if (currentCourse) {
                enrollInCourse(currentCourse);
            }
        });
    }
}

// Kursa kayıt ol
function enrollInCourse(course) {
    // Gerçek uygulamada burada ödeme sistemi entegrasyonu olacak
    window.EduUtils.showNotification(
        `${course.title} kursu sepete eklendi! Ödeme sayfasına yönlendiriliyorsunuz...`,
        'success'
    );
    
    // Sepet işlemi simülasyonu
    setTimeout(() => {
        // window.location.href = 'checkout.html?course=' + course.id;
        console.log('Ödeme sayfasına yönlendiriliyor...');
    }, 2000);
}

// Yararlı işaretleme
function markHelpful(reviewId) {
    // API call simülasyonu
    window.EduUtils.showNotification('Yorumu yararlı olarak işaretlediniz!', 'success');
    
    // Button güncelleme
    const btn = document.querySelector(`[onclick="markHelpful(${reviewId})"]`);
    if (btn) {
        const countSpan = btn.textContent.match(/\((\d+)\)/);
        if (countSpan) {
            const newCount = parseInt(countSpan[1]) + 1;
            btn.innerHTML = `<i class="fas fa-thumbs-up"></i> Yararlı (${newCount})`;
        }
        btn.disabled = true;
        btn.style.opacity = '0.6';
    }
}

// Yardımcı fonksiyonlar
function getLevelText(level) {
    const levels = {
        beginner: 'Başlangıç',
        intermediate: 'Orta',
        advanced: 'İleri'
    };
    return levels[level] || 'Bilinmiyor';
}

function getLectureIcon(type) {
    const icons = {
        video: 'play-circle',
        exercise: 'code',
        project: 'folder-open',
        quiz: 'question-circle',
        reading: 'file-text'
    };
    return icons[type] || 'play-circle';
}

// Loading state göster
function showLoading(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.opacity = '0.5';
        section.style.pointerEvents = 'none';
    }
}

// Loading state gizle
function hideLoading(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.opacity = '1';
        section.style.pointerEvents = 'auto';
    }
}

// Hata göster
function showError(message) {
    const container = document.querySelector('.course-hero');
    if (container) {
        container.innerHTML = `
            <div class="container">
                <div class="error-state">
                    <div class="error-state__icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h2>Hata</h2>
                    <p>${message}</p>
                    <button class="btn btn--primary" onclick="window.history.back()">
                        <i class="fas fa-arrow-left"></i>
                        Geri Dön
                    </button>
                </div>
            </div>
        `;
    }
}

// Sticky sidebar
function initializeStickySidebar() {
    const sidebar = document.querySelector('.course-hero__card');
    const stickyOffset = sidebar ? sidebar.offsetTop : 0;
    
    function handleSticky() {
        if (window.pageYOffset >= stickyOffset - 120) {
            if (sidebar) {
                sidebar.style.position = 'fixed';
                sidebar.style.top = '120px';
                sidebar.style.width = 'calc(33.333% - 2rem)';
                sidebar.style.zIndex = '100';
            }
        } else {
            if (sidebar) {
                sidebar.style.position = 'static';
                sidebar.style.width = 'auto';
            }
        }
    }
    
    window.addEventListener('scroll', handleSticky);
}

// Video progress tracking
const VideoTracker = {
    watchedTime: 0,
    totalTime: 0,
    
    init: (videoElement) => {
        if (!videoElement) return;
        
        videoElement.addEventListener('loadedmetadata', () => {
            VideoTracker.totalTime = videoElement.duration;
        });
        
        videoElement.addEventListener('timeupdate', () => {
            VideoTracker.watchedTime = videoElement.currentTime;
            VideoTracker.updateProgress();
        });
    },
    
    updateProgress: () => {
        if (VideoTracker.totalTime > 0) {
            const progress = (VideoTracker.watchedTime / VideoTracker.totalTime) * 100;
            
            // Progress bar güncelle
            const progressBar = document.querySelector('.video-progress-bar');
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            
            // %80 izlendiğinde badge ver
            if (progress >= 80 && !VideoTracker.badgeGiven) {
                VideoTracker.badgeGiven = true;
                window.EduUtils.showNotification('Tebrikler! Videoyu büyük oranda tamamladınız!', 'success');
            }
        }
    },
    
    badgeGiven: false
};

// Keyboard shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Space: Play/Pause video
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            const video = document.querySelector('video');
            if (video) {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        }
        
        // Tab switching with numbers
        if (e.key >= '1' && e.key <= '4' && !e.ctrlKey) {
            const tabs = ['overview', 'curriculum', 'instructor', 'reviews'];
            const tabIndex = parseInt(e.key) - 1;
            if (tabs[tabIndex]) {
                switchTab(tabs[tabIndex]);
                document.querySelector(`[data-tab="${tabs[tabIndex]}"]`).click();
            }
        }
        
        // Escape: Close modal
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal.show');
            if (modal) {
                window.EduUtils.closeModal(modal.id);
            }
        }
    });
}

// Note taking system
const NoteSystem = {
    notes: window.EduUtils.Storage.get('courseNotes', {}),
    
    addNote: (courseId, timestamp, note) => {
        if (!NoteSystem.notes[courseId]) {
            NoteSystem.notes[courseId] = [];
        }
        
        NoteSystem.notes[courseId].push({
            id: Date.now(),
            timestamp,
            note,
            date: new Date().toISOString()
        });
        
        window.EduUtils.Storage.set('courseNotes', NoteSystem.notes);
        NoteSystem.renderNotes(courseId);
    },
    
    deleteNote: (courseId, noteId) => {
        if (NoteSystem.notes[courseId]) {
            NoteSystem.notes[courseId] = NoteSystem.notes[courseId].filter(note => note.id !== noteId);
            window.EduUtils.Storage.set('courseNotes', NoteSystem.notes);
            NoteSystem.renderNotes(courseId);
        }
    },
    
    renderNotes: (courseId) => {
        const notesContainer = document.getElementById('courseNotes');
        if (!notesContainer || !NoteSystem.notes[courseId]) return;
        
        const notesHTML = NoteSystem.notes[courseId].map(note => `
            <div class="note-item">
                <div class="note-header">
                    <span class="note-timestamp">${note.timestamp}</span>
                    <button class="note-delete" onclick="NoteSystem.deleteNote(${courseId}, ${note.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="note-content">${note.note}</div>
                <div class="note-date">${window.CourseData.utils.formatDate(note.date)}</div>
            </div>
        `).join('');
        
        notesContainer.innerHTML = notesHTML;
    }
};

// Sayfa yüklendiğinde çalışacak ek fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Keyboard shortcuts
    initializeKeyboardShortcuts();
    
    // Sticky sidebar (desktop only)
    if (window.innerWidth > 1024) {
        initializeStickySidebar();
    }
    
    // Kayıt ol butonunu başlat
    initializeEnrollButton();
    
    // Video tracker'ı başlat
    const video = document.querySelector('video');
    if (video) {
        VideoTracker.init(video);
    }
});

// Window resize handler
window.addEventListener('resize', () => {
    // Mobile'da sticky sidebar'ı kaldır
    const sidebar = document.querySelector('.course-hero__card');
    if (window.innerWidth <= 1024 && sidebar) {
        sidebar.style.position = 'static';
        sidebar.style.width = 'auto';
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadCourseDetails,
        switchTab,
        toggleSection,
        NoteSystem,
        VideoTracker
    };
}