// Eğitimler Sayfası JavaScript
let currentFilters = {
    search: '',
    category: 'all',
    level: 'all',
    priceRange: 'all',
    sort: 'popular'
};

let currentView = 'grid';
let currentPage = 1;
const coursesPerPage = 12;
let allCourses = [];
let filteredCourses = [];

// Sayfa yüklendiğinde çalışacak fonksiyon
function initializePage() {
    initializeFilters();
    initializeViewToggle();
    loadInitialData();
    handleUrlParameters();
}

// URL parametrelerini işle
function handleUrlParameters() {
    const params = window.CourseData.utils.getUrlParams();
    
    if (params.category) {
        currentFilters.category = params.category;
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.value = params.category;
        }
    }
    
    if (params.search) {
        currentFilters.search = params.search;
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = params.search;
        }
    }
}

// İlk veri yüklemesi
async function loadInitialData() {
    try {
        // Skeleton loading göster
        showSkeletonLoading('coursesGrid', 12);
        
        // Kategorileri yükle
        await loadCategories();
        
        // Kursları yükle
        await loadCourses();
        
    } catch (error) {
        console.error('Veri yükleme hatası:', error);
        showErrorState();
    }
}

// Kategorileri yükle
async function loadCategories() {
    try {
        const categories = await window.CourseData.API.getCategories();
        const categoryFilter = document.getElementById('categoryFilter');
        
        if (categoryFilter) {
            // Mevcut seçenekleri temizle (ilk "Tüm Kategoriler" hariç)
            const firstOption = categoryFilter.querySelector('option[value="all"]');
            categoryFilter.innerHTML = '';
            categoryFilter.appendChild(firstOption);
            
            // Kategorileri ekle
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = `${category.name} (${category.courseCount})`;
                categoryFilter.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Kategori yükleme hatası:', error);
    }
}

// Kursları yükle
async function loadCourses() {
    try {
        const courses = await window.CourseData.API.getCourses(currentFilters);
        allCourses = courses;
        filteredCourses = courses;
        
        updateResultsCount();
        renderCourses();
        updatePagination();
        
    } catch (error) {
        console.error('Kurs yükleme hatası:', error);
        showErrorState();
    }
}

// Filtreleri başlat
function initializeFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    const clearFilters = document.getElementById('clearFilters');
    
    // Arama filtresi
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentFilters.search = e.target.value;
                applyFilters();
            }, 300);
        });
    }
    
    // Kategori filtresi
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            applyFilters();
            updateUrl();
        });
    }
    
    // Seviye filtresi
    if (levelFilter) {
        levelFilter.addEventListener('change', (e) => {
            currentFilters.level = e.target.value;
            applyFilters();
        });
    }
    
    // Fiyat filtresi
    if (priceFilter) {
        priceFilter.addEventListener('change', (e) => {
            currentFilters.priceRange = e.target.value;
            applyFilters();
        });
    }
    
    // Sıralama filtresi
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            applyFilters();
        });
    }
    
    // Filtreleri temizle
    if (clearFilters) {
        clearFilters.addEventListener('click', clearAllFilters);
    }
}

// Filtreleri uygula
async function applyFilters() {
    currentPage = 1;
    showSkeletonLoading('coursesGrid', 6);
    
    try {
        const courses = await window.CourseData.API.getCourses(currentFilters);
        filteredCourses = courses;
        
        updateResultsCount();
        renderCourses();
        updatePagination();
        
        // Eğer sonuç yoksa "sonuç bulunamadı" göster
        if (courses.length === 0) {
            showNoResults();
        }
        
    } catch (error) {
        console.error('Filtreleme hatası:', error);
        showErrorState();
    }
}

// Tüm filtreleri temizle
function clearAllFilters() {
    currentFilters = {
        search: '',
        category: 'all',
        level: 'all',
        priceRange: 'all',
        sort: 'popular'
    };
    
    // Form elemanlarını sıfırla
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('levelFilter').value = 'all';
    document.getElementById('priceFilter').value = 'all';
    document.getElementById('sortFilter').value = 'popular';
    
    // URL'i temizle
    window.history.pushState({}, '', 'courses.html');
    
    applyFilters();
}

// Görünüm değişikliği
function initializeViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            changeView(view);
            
            // Aktif butonu güncelle
            viewBtns.forEach(b => b.classList.remove('view-btn--active'));
            btn.classList.add('view-btn--active');
        });
    });
}

// Görünümü değiştir
function changeView(view) {
    currentView = view;
    const coursesGrid = document.getElementById('coursesGrid');
    
    if (view === 'list') {
        coursesGrid.classList.add('courses__grid--list');
    } else {
        coursesGrid.classList.remove('courses__grid--list');
    }
    
    renderCourses();
}

// Kursları render et
function renderCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    const noResults = document.getElementById('noResults');
    
    if (!coursesGrid) return;
    
    // Sayfalama için kursları böl
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const coursesToShow = filteredCourses.slice(startIndex, endIndex);
    
    if (coursesToShow.length === 0) {
        showNoResults();
        return;
    }
    
    // No results'u gizle
    if (noResults) {
        noResults.style.display = 'none';
    }
    
    // Kurs kartlarını oluştur
    const coursesHTML = coursesToShow.map(course => {
        if (currentView === 'list') {
            return createCourseCardList(course);
        } else {
            return createCourseCard(course);
        }
    }).join('');
    
    coursesGrid.innerHTML = coursesHTML;
    
    // Animasyon ekle
    const cards = coursesGrid.querySelectorAll('.course__card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Liste görünümü için kurs kartı
function createCourseCardList(course) {
    const instructor = window.CourseData.instructors.find(i => i.id === course.instructor);
    const categoryData = window.CourseData.categories.find(c => c.id === course.category);
    
    const badges = [];
    if (course.new) badges.push('<span class="course__badge course__badge--new">Yeni</span>');
    if (course.bestseller) badges.push('<span class="course__badge course__badge--popular">Popüler</span>');
    if (course.discount > 0) badges.push(`<span class="course__badge course__badge--sale">${course.discount}% İndirim</span>`);
    
    return `
        <div class="course__card course__card--list" onclick="window.location.href='${window.CourseData.utils.getCourseURL(course.slug)}'">
            ${badges.length ? badges.join('') : ''}
            
            <div class="course__image">
                <i class="${categoryData.icon}"></i>
            </div>
            
            <div class="course__content">
                <div class="course__header">
                    <span class="course__category">${categoryData.name}</span>
                    <div class="course__rating">
                        <div class="rating-stars">${window.CourseData.utils.generateStars(course.rating)}</div>
                        <span class="rating-text">${course.rating} (${course.reviewCount})</span>
                    </div>
                </div>
                
                <h4 class="course__title">${course.title}</h4>
                <p class="course__description">${course.description}</p>
                
                <div class="course__meta">
                    <div class="course__instructor">
                        <img src="${instructor.avatar}" alt="${instructor.name}" class="instructor__avatar">
                        <span>${instructor.name}</span>
                    </div>
                    
                    <div class="course__stats">
                        <span><i class="fas fa-users"></i> ${course.studentCount.toLocaleString()}</span>
                        <span><i class="fas fa-clock"></i> ${course.duration}s</span>
                        <span><i class="fas fa-signal"></i> ${getLevelText(course.level)}</span>
                    </div>
                </div>
            </div>
            
            <div class="course__actions">
                <div class="course__price-group">
                    ${course.originalPrice > course.price ? 
                        `<span class="course__price--original">${window.CourseData.utils.formatPrice(course.originalPrice)}</span>` : ''
                    }
                    <span class="course__price">${window.CourseData.utils.formatPrice(course.price)}</span>
                </div>
                
                <button class="btn btn--primary" onclick="event.stopPropagation(); enrollCourse(${course.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Kayıt Ol
                </button>
                
                <button class="btn btn--outline btn--small" onclick="event.stopPropagation(); toggleWishlist(${course.id})">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        </div>
    `;
}

// Sonuç sayısını güncelle
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = filteredCourses.length;
    }
}

// Sayfalamayı güncelle
function updatePagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination || filteredCourses.length <= coursesPerPage) {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'flex';
    
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    let paginationHTML = '';
    
    // Önceki sayfa
    paginationHTML += `
        <button class="pagination__btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
            Önceki
        </button>
    `;
    
    // Sayfa numaraları
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        paginationHTML += `<button class="pagination__btn" onclick="changePage(1)">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span class="pagination__dots">...</span>`;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination__btn ${i === currentPage ? 'pagination__btn--active' : ''}" onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="pagination__dots">...</span>`;
        }
        paginationHTML += `<button class="pagination__btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
    }
    
    // Sonraki sayfa
    paginationHTML += `
        <button class="pagination__btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            Sonraki
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Sayfa değiştir
function changePage(page) {
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderCourses();
    updatePagination();
    
    // Sayfanın üstüne scroll
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = coursesSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Sonuç bulunamadı durumunu göster
function showNoResults() {
    const coursesGrid = document.getElementById('coursesGrid');
    const noResults = document.getElementById('noResults');
    
    if (coursesGrid) {
        coursesGrid.innerHTML = '';
    }
    
    if (noResults) {
        noResults.style.display = 'flex';
    }
    
    // Sayfalamayı gizle
    const pagination = document.getElementById('pagination');
    if (pagination) {
        pagination.style.display = 'none';
    }
}

// Hata durumunu göster
function showErrorState() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (coursesGrid) {
        coursesGrid.innerHTML = `
            <div class="error-state">
                <div class="error-state__icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Bir hata oluştu</h3>
                <p>Kurslar yüklenirken bir sorun yaşandı. Lütfen sayfayı yenileyin.</p>
                <button class="btn btn--primary" onclick="location.reload()">
                    <i class="fas fa-refresh"></i>
                    Sayfayı Yenile
                </button>
            </div>
        `;
    }
}

// URL'i güncelle
function updateUrl() {
    const params = new URLSearchParams();
    
    if (currentFilters.category !== 'all') {
        params.set('category', currentFilters.category);
    }
    
    if (currentFilters.search) {
        params.set('search', currentFilters.search);
    }
    
    if (currentFilters.level !== 'all') {
        params.set('level', currentFilters.level);
    }
    
    if (currentFilters.priceRange !== 'all') {
        params.set('price', currentFilters.priceRange);
    }
    
    if (currentFilters.sort !== 'popular') {
        params.set('sort', currentFilters.sort);
    }
    
    const newUrl = `courses.html${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({}, '', newUrl);
}

// Wishlist toggle
function toggleWishlist(courseId) {
    const isInWishlist = window.EduUtils.Wishlist.isInWishlist(courseId);
    
    if (isInWishlist) {
        window.EduUtils.Wishlist.remove(courseId);
    } else {
        window.EduUtils.Wishlist.add(courseId);
    }
    
    // Wishlist button'unu güncelle
    updateWishlistButtons();
}

// Wishlist butonlarını güncelle
function updateWishlistButtons() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
        const courseId = parseInt(btn.dataset.courseId);
        const isInWishlist = window.EduUtils.Wishlist.isInWishlist(courseId);
        const icon = btn.querySelector('i');
        
        if (isInWishlist) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.classList.add('btn--active');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.classList.remove('btn--active');
        }
    });
}

// Gelişmiş filtreleri göster/gizle
function toggleAdvancedFilters() {
    const advancedFilters = document.getElementById('advancedFilters');
    const toggleBtn = document.getElementById('toggleAdvanced');
    
    if (advancedFilters && toggleBtn) {
        const isVisible = advancedFilters.classList.contains('show');
        
        if (isVisible) {
            advancedFilters.classList.remove('show');
            toggleBtn.innerHTML = '<i class="fas fa-plus"></i> Gelişmiş Filtreler';
        } else {
            advancedFilters.classList.add('show');
            toggleBtn.innerHTML = '<i class="fas fa-minus"></i> Gelişmiş Filtreleri Gizle';
        }
    }
}

// Fiyat aralığı filtresi
function initializePriceRangeFilter() {
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    
    if (minPriceInput && maxPriceInput) {
        const applyPriceFilter = () => {
            const minPrice = parseInt(minPriceInput.value) || 0;
            const maxPrice = parseInt(maxPriceInput.value) || Infinity;
            
            currentFilters.priceRange = `${minPrice}-${maxPrice}`;
            applyFilters();
        };
        
        let priceTimeout;
        [minPriceInput, maxPriceInput].forEach(input => {
            input.addEventListener('input', () => {
                clearTimeout(priceTimeout);
                priceTimeout = setTimeout(applyPriceFilter, 500);
            });
        });
    }
}

// Keyboard shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl + F: Focus search
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape: Clear search
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('searchInput');
            if (searchInput && searchInput === document.activeElement) {
                searchInput.value = '';
                currentFilters.search = '';
                applyFilters();
            }
        }
    });
}

// Infinite scroll (opsiyonel)
function initializeInfiniteScroll() {
    let isLoading = false;
    
    const observer = new IntersectionObserver((entries) => {
        const lastEntry = entries[0];
        
        if (lastEntry.isIntersecting && !isLoading) {
            const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
            
            if (currentPage < totalPages) {
                isLoading = true;
                currentPage++;
                
                // Loading indicator göster
                const coursesGrid = document.getElementById('coursesGrid');
                const loadingDiv = document.createElement('div');
                loadingDiv.className = 'loading-more';
                loadingDiv.innerHTML = `
                    <div class="loading-spinner">
                        <i class="fas fa-spinner fa-spin"></i>
                    </div>
                    <p>Daha fazla kurs yükleniyor...</p>
                `;
                coursesGrid.appendChild(loadingDiv);
                
                // Yeni kursları yükle
                setTimeout(() => {
                    const startIndex = (currentPage - 1) * coursesPerPage;
                    const endIndex = startIndex + coursesPerPage;
                    const newCourses = filteredCourses.slice(startIndex, endIndex);
                    
                    const newCoursesHTML = newCourses.map(course => {
                        return currentView === 'list' ? createCourseCardList(course) : createCourseCard(course);
                    }).join('');
                    
                    // Loading indicator'ı kaldır
                    loadingDiv.remove();
                    
                    // Yeni kursları ekle
                    coursesGrid.insertAdjacentHTML('beforeend', newCoursesHTML);
                    
                    isLoading = false;
                }, 1000);
            }
        }
    }, {
        rootMargin: '100px'
    });
    
    // Son kurs kartını gözlemle
    const observeLastCard = () => {
        const cards = document.querySelectorAll('.course__card');
        const lastCard = cards[cards.length - 1];
        
        if (lastCard) {
            observer.observe(lastCard);
        }
    };
    
    // İlk yüklemeden sonra gözlemlemeyi başlat
    setTimeout(observeLastCard, 1000);
}

// Kurs karşılaştırma özelliği
const CourseComparison = {
    selectedCourses: [],
    maxComparisons: 3,
    
    add: (courseId) => {
        if (CourseComparison.selectedCourses.length >= CourseComparison.maxComparisons) {
            window.EduUtils.showNotification(
                `En fazla ${CourseComparison.maxComparisons} kurs karşılaştırabilirsiniz.`,
                'warning'
            );
            return;
        }
        
        if (!CourseComparison.selectedCourses.includes(courseId)) {
            CourseComparison.selectedCourses.push(courseId);
            CourseComparison.updateComparisonBar();
            window.EduUtils.showNotification('Kurs karşılaştırmaya eklendi!', 'success');
        }
    },
    
    remove: (courseId) => {
        const index = CourseComparison.selectedCourses.indexOf(courseId);
        if (index > -1) {
            CourseComparison.selectedCourses.splice(index, 1);
            CourseComparison.updateComparisonBar();
        }
    },
    
    updateComparisonBar: () => {
        let comparisonBar = document.getElementById('comparisonBar');
        
        if (CourseComparison.selectedCourses.length === 0) {
            if (comparisonBar) {
                comparisonBar.remove();
            }
            return;
        }
        
        if (!comparisonBar) {
            comparisonBar = document.createElement('div');
            comparisonBar.id = 'comparisonBar';
            comparisonBar.className = 'comparison-bar';
            document.body.appendChild(comparisonBar);
        }
        
        const courses = CourseComparison.selectedCourses.map(id => 
            window.CourseData.courses.find(c => c.id === id)
        );
        
        comparisonBar.innerHTML = `
            <div class="comparison-bar__content">
                <div class="comparison-bar__courses">
                    ${courses.map(course => `
                        <div class="comparison-course">
                            <span>${course.title}</span>
                            <button onclick="CourseComparison.remove(${course.id})">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <div class="comparison-bar__actions">
                    <button class="btn btn--primary" onclick="CourseComparison.compare()">
                        <i class="fas fa-balance-scale"></i>
                        Karşılaştır
                    </button>
                    <button class="btn btn--outline" onclick="CourseComparison.clear()">
                        Temizle
                    </button>
                </div>
            </div>
        `;
    },
    
    compare: () => {
        // Karşılaştırma sayfasına git
        const courseIds = CourseComparison.selectedCourses.join(',');
        window.location.href = `course-comparison.html?courses=${courseIds}`;
    },
    
    clear: () => {
        CourseComparison.selectedCourses = [];
        CourseComparison.updateComparisonBar();
    }
};

// Sayfa yüklendiğinde çalışacak ek fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Keyboard shortcuts
    initializeKeyboardShortcuts();
    
    // Wishlist butonlarını güncelle
    setTimeout(updateWishlistButtons, 500);
    
    // Performance monitoring
    performance.mark('courses-page-start');
    
    // Page load tamamlandığında
    window.addEventListener('load', () => {
        performance.mark('courses-page-end');
        performance.measure('courses-page-load', 'courses-page-start', 'courses-page-end');
        
        const measure = performance.getEntriesByName('courses-page-load')[0];
        console.log(`Courses page loaded in ${measure.duration}ms`);
    });
});

// Service Worker registration (PWA için)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        applyFilters,
        changeView,
        changePage,
        clearAllFilters,
        CourseComparison
    };
}