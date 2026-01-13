// ===== HERO SLIDER =====
const cols = 3;
const main = document.getElementById('main');
let parts = [];

let images = [
    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
    "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80"
];
let current = 0;
let playing = false;

// Preload images
for (let i in images) {
    new Image().src = images[i];
}

// Create slider parts
for (let col = 0; col < cols; col++) {
    let part = document.createElement('div');
    part.className = 'part';
    let el = document.createElement('div');
    el.className = "section";
    let img = document.createElement('img');
    img.src = images[current];
    el.appendChild(img);
    part.style.setProperty('--x', -100 / cols * col + 'vw');
    part.appendChild(el);
    main.appendChild(part);
    parts.push(part);
}

let animOptions = {
    duration: 2.3,
    ease: Power4.easeInOut
};

function go(dir) {
    if (!playing) {
        playing = true;
        if (current + dir < 0) current = images.length - 1;
        else if (current + dir >= images.length) current = 0;
        else current += dir;

        function up(part, next) {
            part.appendChild(next);
            gsap.to(part, { ...animOptions, y: -window.innerHeight }).then(function () {
                part.children[0].remove();
                gsap.to(part, { duration: 0, y: 0 });
            })
        }

        function down(part, next) {
            part.prepend(next);
            gsap.to(part, { duration: 0, y: -window.innerHeight });
            gsap.to(part, { ...animOptions, y: 0 }).then(function () {
                part.children[1].remove();
                playing = false;
            })
        }

        for (let p in parts) {
            let part = parts[p];
            let next = document.createElement('div');
            next.className = 'section';
            let img = document.createElement('img');
            img.src = images[current];
            next.appendChild(img);

            if ((p - Math.max(0, dir)) % 2) {
                down(part, next);
            } else {
                up(part, next);
            }
        }
    }
}

// Keyboard navigation
window.addEventListener('keydown', function (e) {
    if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
        go(1);
    } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
        go(-1);
    }
});

// Mouse wheel navigation
let scrollTimeout;
function wheel(e) {
    clearTimeout(scrollTimeout);
    setTimeout(function () {
        if (e.deltaY < -40) {
            go(-1);
        } else if (e.deltaY >= 40) {
            go(1);
        }
    })
}
window.addEventListener('mousewheel', wheel, false);
window.addEventListener('wheel', wheel, false);

// Touch/swipe navigation
let startY;
let endY;
let clicked = false;

function mousedown(e) {
    gsap.to('.cursor', { scale: 4.5 });
    gsap.to('.cursor-f', { scale: .4 });
    clicked = true;
    startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
}

function mouseup(e) {
    gsap.to('.cursor', { scale: 1 });
    gsap.to('.cursor-f', { scale: 1 });
    endY = e.clientY || endY;
    if (clicked && startY && Math.abs(startY - endY) >= 40) {
        go(!Math.min(0, startY - endY) ? 1 : -1);
        clicked = false;
        startY = null;
        endY = null;
    }
}

window.addEventListener('mousedown', mousedown, false);
window.addEventListener('touchstart', mousedown, false);
window.addEventListener('touchmove', function (e) {
    if (clicked) {
        endY = e.touches[0].clientY || e.targetTouches[0].clientY;
    }
}, false);
window.addEventListener('touchend', mouseup, false);
window.addEventListener('mouseup', mouseup, false);

// ===== CUSTOM CURSOR =====
function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end
}

const cursor = document.querySelector('.cursor');
const cursorF = document.querySelector('.cursor-f');
let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;
let size = 8;
let sizeF = 36;
let followSpeed = .16;

if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorF.style.display = 'none';
}

cursor.style.setProperty('--size', size + 'px');
cursorF.style.setProperty('--size', sizeF + 'px');

window.addEventListener('mousemove', function (e) {
    pageX = e.clientX;
    pageY = e.clientY;
    cursor.style.left = e.clientX - size / 2 + 'px';
    cursor.style.top = e.clientY - size / 2 + 'px';
});

function loop() {
    cursorX = lerp(cursorX, pageX, followSpeed);
    cursorY = lerp(cursorY, pageY, followSpeed);
    cursorF.style.top = cursorY - sizeF / 2 + 'px';
    cursorF.style.left = cursorX - sizeF / 2 + 'px';
    requestAnimationFrame(loop);
}
loop();

// ===== NAVBAR CONTROLS =====
var bars = document.getElementById("nav-action");
var nav = document.getElementById("nav");

bars.addEventListener("click", barClicked, false);

function barClicked() {
    bars.classList.toggle('active');
    nav.classList.toggle('visible');
}

// ===== SECTION CONTROLS =====
const portfolioSection = document.getElementById('portfolio-section');
const aboutSection = document.getElementById('about-section');
const heroSection = document.getElementById('hero-section');
const partnersSection = document.getElementById('partners-section');
const contactSection = document.getElementById('contact');
const footer = document.querySelector('.new_footer_area');

const productsLink = document.getElementById('products-link');
const aboutLink = document.getElementById('about-link');
const homeLink = document.getElementById('home-link');
const backHomeBtn = document.getElementById('back-home');
const backHomeAboutBtn = document.getElementById('back-home-about');
const aboutToHomeBtn = document.getElementById('about-to-home');

let swiperInstance = null;

// Initialize Swiper for About Section
function initSwiper() {
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
    }

    swiperInstance = new Swiper('.blog-slider', {
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        mousewheel: {
            invert: false,
        },
        pagination: {
            el: '.blog-slider__pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        }
    });
}

// Show About Section
function showAbout() {
    bars.classList.remove('active');
    nav.classList.remove('visible');

    heroSection.style.display = 'none';
    partnersSection.style.display = 'none';
    contactSection.style.display = 'none';
    footer.style.display = 'none';
    portfolioSection.style.display = 'none';

    aboutSection.style.display = 'flex';

    gsap.fromTo(aboutSection,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    setTimeout(() => {
        initSwiper();
    }, 100);
}

// Show Portfolio Section
function showPortfolio() {
    bars.classList.remove('active');
    nav.classList.remove('visible');

    heroSection.style.display = 'none';
    partnersSection.style.display = 'none';
    contactSection.style.display = 'none';
    footer.style.display = 'none';
    aboutSection.style.display = 'none';

    portfolioSection.style.display = 'block';

    gsap.fromTo(portfolioSection,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    const animationManager = new AnimationManager();
    animationManager.initializeAnimations();
}

// Show Home Section
function showHome() {
    bars.classList.remove('active');
    nav.classList.remove('visible');

    heroSection.style.display = 'block';
    partnersSection.style.display = 'block';
    contactSection.style.display = 'block';
    footer.style.display = 'block';

    portfolioSection.style.display = 'none';
    aboutSection.style.display = 'none';

    if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
    }
}

// Event Listeners
productsLink.addEventListener('click', function (e) {
    e.preventDefault();
    showPortfolio();
});

aboutLink.addEventListener('click', function (e) {
    e.preventDefault();
    showAbout();
});

homeLink.addEventListener('click', function (e) {
    e.preventDefault();
    showHome();
});

backHomeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    showHome();
});

backHomeAboutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    showHome();
});

if (aboutToHomeBtn) {
    aboutToHomeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showHome();
    });
}

// ===== PORTFOLIO ANIMATION MANAGER =====
class AnimationManager {
    constructor() {
        this.backgroundImage = document.getElementById("backgroundImage");
        this.projectItems = document.querySelectorAll(".project-item");
        this.portfolioContainer = document.querySelector(".portfolio-container");
        this.currentActiveIndex = -1;
        this.originalTexts = new Map();
        this.debounceTimeout = null;

        this.projectItems.forEach(item => {
            const textElements = item.querySelectorAll(".hover-text");
            const texts = Array.from(textElements).map(el => el.textContent);
            this.originalTexts.set(item, texts);
        });
    }

    initializeAnimations() {
        this.preloadImages();
        this.projectItems.forEach((item, index) => {
            this.addEventListeners(item, index);
        });

        const container = document.querySelector(".portfolio-container");
        if (container) {
            container.addEventListener("mouseleave", () => {
                if (this.debounceTimeout) {
                    clearTimeout(this.debounceTimeout);
                }
                this.clearActiveStates();
                this.hideBackgroundImage();
            });
        }
    }

    preloadImages() {
        this.projectItems.forEach(item => {
            const imageUrl = item.dataset.image;
            if (imageUrl) {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.src = imageUrl;
            }
        });
    }

    addEventListeners(item, index) {
        const textElements = item.querySelectorAll(".hover-text");
        const imageUrl = item.dataset.image;
        const originalTexts = this.originalTexts.get(item);

        const handleMouseEnter = () => {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }

            if (this.currentActiveIndex === index) return;

            this.updateActiveStates(index);

            if (imageUrl) {
                this.showBackgroundImage(imageUrl);
            }
        };

        const handleMouseLeave = () => {
            this.debounceTimeout = setTimeout(() => {
                textElements.forEach((element, i) => {
                    if (originalTexts && originalTexts[i]) {
                        element.textContent = originalTexts[i];
                    }
                });
            }, 50);
        };

        item.addEventListener("mouseenter", handleMouseEnter);
        item.addEventListener("mouseleave", handleMouseLeave);
    }

    updateActiveStates(activeIndex) {
        this.currentActiveIndex = activeIndex;
        this.portfolioContainer.classList.add("has-active");

        this.projectItems.forEach((item, index) => {
            if (index === activeIndex) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    clearActiveStates() {
        this.currentActiveIndex = -1;
        this.portfolioContainer.classList.remove("has-active");

        this.projectItems.forEach(item => {
            item.classList.remove("active");
            const textElements = item.querySelectorAll(".hover-text");
            const originalTexts = this.originalTexts.get(item);
            textElements.forEach((element, i) => {
                if (originalTexts && originalTexts[i]) {
                    element.textContent = originalTexts[i];
                }
            });
        });
    }

    showBackgroundImage(imageUrl) {
        this.backgroundImage.style.transition = "none";
        this.backgroundImage.style.transform = "translate(-50%, -50%) scale(1.2)";
        this.backgroundImage.style.backgroundImage = `url(${imageUrl})`;
        this.backgroundImage.style.opacity = "1";

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.backgroundImage.style.transition = "opacity 0.6s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                this.backgroundImage.style.transform = "translate(-50%, -50%) scale(1.0)";
            });
        });
    }

    hideBackgroundImage() {
        this.backgroundImage.style.opacity = "0";
    }
}

// ===== CATEGORY FILTER =====
const categoryBtns = document.querySelectorAll('.category-btn');
const projectItems = document.querySelectorAll('.project-item');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const category = this.dataset.category;

        // Filter projects
        projectItems.forEach(item => {
            if (category === 'all') {
                item.classList.remove('hidden');
            } else {
                if (item.dataset.category === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// ===== CONTACT FORM =====
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.');
        this.reset();
    });
}