let currentSlide = 0;
const totalSlides = 4;
let slideInterval;
let audio = null;
let scrollListener = null;

// Modal ve müzik başlatma
function startExperience() {
    // İstiklal Marşı full screen göster
    showIstiklalFullscreen();
    
    // Modal'ı kapat
    setTimeout(() => {
        document.getElementById('modal').style.display = 'none';
    }, 500);
    
    // Müzik başlat
    startMusic();
    
    // Header müzik bilgisini güncelle
    document.getElementById('musicInfo').innerHTML = '🎵 Müzik Çalıyor';
    
    // Slider'ı başlat
    setTimeout(() => {
        startSlideShow();
    }, 6000);
    
    // Scroll listener ekle
    setTimeout(() => {
        addScrollListener();
    }, 6000);
}

function showIstiklalFullscreen() {
    const istiklal = document.getElementById('istiklalFullscreen');
    istiklal.style.display = 'block';
    
    // 5 saniye sonra kapat
    setTimeout(() => {
        istiklal.style.display = 'none';
    }, 5000);
}

function startMusic() {
    try {
        // Ana müzik - YouTube iframe ile
        audio = document.createElement('iframe');
        audio.width = "0";
        audio.height = "0";
        audio.src = "https://www.youtube.com/embed/V88rmlzIp5k?autoplay=1&loop=1&playlist=V88rmlzIp5k&controls=0&mute=0";
        audio.style.display = 'none';
        audio.allow = "autoplay; encrypted-media";
        document.body.appendChild(audio);
        
        console.log('Müzik başlatıldı!');
        
    } catch (error) {
        console.log('Müzik yüklenirken hata:', error);
        
        // Alternatif yöntem
        setTimeout(() => {
            const audio2 = document.createElement('iframe');
            audio2.width = "1";
            audio2.height = "1";
            audio2.src = "https://www.youtube.com/embed/V88rmlzIp5k?autoplay=1&loop=1&playlist=V88rmlzIp5k";
            audio2.style.opacity = '0';
            audio2.style.position = 'absolute';
            audio2.style.top = '-1000px';
            document.body.appendChild(audio2);
        }, 1000);
    }
}

function addScrollListener() {
    scrollListener = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        // Sayfa %85 scroll edildiğinde final animasyonu başlat
        if (scrollPercent >= 85) {
            showFinalAnimation();
            window.removeEventListener('scroll', scrollListener);
            scrollListener = null;
        }
    };
    
    window.addEventListener('scroll', scrollListener);
    
    // 25 saniye sonra otomatik göster
    setTimeout(() => {
        if (scrollListener) {
            showFinalAnimation();
            window.removeEventListener('scroll', scrollListener);
            scrollListener = null;
        }
    }, 25000);
}

function showFinalAnimation() {
    const finalAnimation = document.getElementById('finalAnimation');
    finalAnimation.style.display = 'flex';
    
    // Animasyon efektleri
    setTimeout(() => {
        finalAnimation.style.opacity = '1';
    }, 100);
    
    // 10 saniye sonra kapat
    setTimeout(() => {
        finalAnimation.style.opacity = '0';
        setTimeout(() => {
            finalAnimation.style.display = 'none';
        }, 1000);
    }, 10000);
}

// Slider fonksiyonları
function startSlideShow() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 4000);
}

function stopSlideShow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

function goToSlide(n) {
    currentSlide = n;
    updateSlider();
    updateNav();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
    updateNav();
}

function prevSlide() {
    currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    updateSlider();
    updateNav();
}

function updateSlider() {
    const slider = document.getElementById('slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function updateNav() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Klavye kontrolü
document.addEventListener('keydown', function(e) {
    if (e.code === 'ArrowLeft') {
        prevSlide();
    } else if (e.code === 'ArrowRight') {
        nextSlide();
    } else if (e.code === 'Space') {
        e.preventDefault();
        showFinalAnimation();
    }
});

// Sayfa yüklendiğinde modal göster
window.addEventListener('load', function() {
    document.getElementById('modal').style.display = 'flex';
});

// Mouse ile slider kontrolü
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopSlideShow);
    sliderContainer.addEventListener('mouseleave', () => {
        if (audio) startSlideShow();
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
}

// Sayfa kapatılırken müziği durdur
window.addEventListener('beforeunload', function() {
    if (audio && audio.parentNode) {
        audio.parentNode.removeChild(audio);
    }
});

// Müzik kontrolü için ekstra güvenlik
document.addEventListener('click', function() {
    if (!audio) {
        startMusic();
    }
});

// Responsive için window resize event'ı
window.addEventListener('resize', function() {
    updateSlider();
});