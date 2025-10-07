// Firebase Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase yapılandırmanızı buraya ekleyin
const firebaseConfig = {
  apiKey: "AIzaSyDHp9cMI601QBTZZK4UkBgTyuQuEayFmqs",
  authDomain: "avsarspor-ec614.firebaseapp.com",
  projectId: "avsarspor-ec614",
  storageBucket: "avsarspor-ec614.firebasestorage.app",
  messagingSenderId: "924334180385",
  appId: "1:924334180385:web:101467892143c70d887b60",
  measurementId: "G-8BT3TDPJ0M"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Admin Authentication
let isAdminLoggedIn = false;
const ADMIN_USERNAME = 'furkan';
const ADMIN_PASSWORD = 'furkan';

let appData = {
    players: [],
    news: [],
    fixtures: [],
    gallery: [],
    members: []
};

let currentSlide = 0;
let editingItem = null;

// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);
});

// Firebase'den veri yükleme fonksiyonları
async function loadDataFromFirestore() {
    try {
        // Oyuncuları yükle
        const playersSnapshot = await getDocs(collection(db, 'players'));
        appData.players = playersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Haberleri yükle
        const newsQuery = query(collection(db, 'news'), orderBy('date', 'desc'));
        const newsSnapshot = await getDocs(newsQuery);
        appData.news = newsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Fikstürü yükle
        const fixturesQuery = query(collection(db, 'fixtures'), orderBy('date', 'desc'));
        const fixturesSnapshot = await getDocs(fixturesQuery);
        appData.fixtures = fixturesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Galeriyi yükle
        const gallerySnapshot = await getDocs(collection(db, 'gallery'));
        appData.gallery = gallerySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Üyeleri yükle
        const membersSnapshot = await getDocs(collection(db, 'members'));
        appData.members = membersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Tüm sayfaları yenile
        loadNewsSlider();
        loadSquad();
        loadNews();
        loadFixtures();
        loadGallery();
    } catch (error) {
        console.error('Firestore verisi yüklenirken hata:', error);
        alert('Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
    }
}

// Admin Login Modal
function showAdminLogin() {
    const modalHTML = `
        <div style="padding: 30px;">
            <h3 style="margin-bottom: 20px; color: var(--dark);">Admin Girişi</h3>
            <form id="adminLoginForm" style="display: flex; flex-direction: column; gap: 15px;">
                <div class="form-group">
                    <label>Kullanıcı Adı</label>
                    <input type="text" id="adminUsername" required style="padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                </div>
                <div class="form-group">
                    <label>Şifre</label>
                    <input type="password" id="adminPassword" required style="padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    <i class="fas fa-sign-in-alt"></i> Giriş Yap
                </button>
            </form>
        </div>
    `;
    
    document.getElementById('modalBody').innerHTML = modalHTML;
    document.getElementById('modalTitle').textContent = 'Admin Paneli Girişi';
    document.getElementById('editModal').classList.add('active');
    
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            isAdminLoggedIn = true;
            closeModal();
            navigateTo('admin');
            alert('Admin paneline hoş geldiniz!');
        } else {
            alert('Kullanıcı adı veya şifre hatalı!');
        }
    });
}

// Navigation
function navigateTo(page) {
    if (page === 'admin' && !isAdminLoggedIn) {
        showAdminLogin();
        return;
    }
    
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('onclick').includes(page)) {
            link.classList.add('active');
        }
    });
    
    document.getElementById('navLinks').classList.remove('active');
    document.getElementById('menuToggle').querySelector('i').className = 'fas fa-bars';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (page === 'squad') loadSquad();
    if (page === 'news') loadNews();
    if (page === 'fixtures') loadFixtures();
    if (page === 'gallery') loadGallery();
    if (page === 'admin') loadAdminData();
    if (page === 'home') loadNewsSlider();
}

// Mobile Menu
document.getElementById('menuToggle').addEventListener('click', function() {
    const navLinks = document.getElementById('navLinks');
    const icon = this.querySelector('i');
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// News Slider
function loadNewsSlider() {
    const slider = document.getElementById('newsSlider');
    const latestNews = appData.news.slice(0, 6);
    
    let slidesHTML = '';
    for (let i = 0; i < latestNews.length; i += 3) {
        const slideNews = latestNews.slice(i, i + 3);
        slidesHTML += '<div class="slide">';
        slideNews.forEach(news => {
            const badgeClass = news.type === 'news' ? 'badge-news' : news.type === 'transfer' ? 'badge-transfer' : 'badge-announcement';
            const badgeText = news.type === 'news' ? 'Haber' : news.type === 'transfer' ? 'Transfer' : 'Duyuru';
            const icon = news.type === 'news' ? 'fa-newspaper' : news.type === 'transfer' ? 'fa-exchange-alt' : 'fa-bullhorn';
            
            // Eğer imageUrl varsa göster, yoksa icon göster
            const imageSection = news.imageUrl ? 
                `<img src="${news.imageUrl}" alt="${news.title}" style="width: 100%; height: 100%; object-fit: cover;">` :
                `<i class="fas ${icon}"></i>`;
            
            slidesHTML += `
                <div class="news-slide-card" onclick="navigateTo('news')">
                    <div class="news-slide-image">
                        ${imageSection}
                    </div>
                    <div class="news-slide-content">
                        <span class="news-type-badge ${badgeClass}">${badgeText}</span>
                        <h3 style="font-size: 18px; font-weight: 700; margin: 10px 0; color: var(--dark);">${news.title}</h3>
                        <p style="color: #64748b; font-size: 14px; line-height: 1.5;">${news.content.substring(0, 80)}...</p>
                    </div>
                </div>
            `;
        });
        slidesHTML += '</div>';
    }
    
    slider.innerHTML = slidesHTML;
}

function slideNews(direction) {
    const slider = document.getElementById('newsSlider');
    const slides = slider.querySelectorAll('.slide');
    
    currentSlide += direction;
    
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Load Squad
function loadSquad() {
    const grid = document.getElementById('squadGrid');
    grid.innerHTML = appData.players.map(player => `
        <div class="player-card">
            <div class="player-image-container">
                <img src="${player.photo || 'https://via.placeholder.com/400x250?text=Oyuncu'}" alt="${player.name}">
                <div class="player-number-overlay">${player.number}</div>
            </div>
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-position">${player.position}</div>
                <div class="player-stats">
                    <div class="stat-item">
                        <div class="stat-item-label">Yaş</div>
                        <div class="stat-item-value">${player.age}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-item-label">Forma No</div>
                        <div class="stat-item-value">${player.number}</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load News
function loadNews() {
    const grid = document.getElementById('newsGrid');
    grid.innerHTML = appData.news.map(news => {
        const badgeClass = news.type === 'news' ? 'badge-news' : news.type === 'transfer' ? 'badge-transfer' : 'badge-announcement';
        const badgeText = news.type === 'news' ? 'Haber' : news.type === 'transfer' ? 'Transfer' : 'Duyuru';
        const icon = news.type === 'news' ? 'fa-newspaper' : news.type === 'transfer' ? 'fa-exchange-alt' : 'fa-bullhorn';
        
        // Eğer imageUrl varsa göster, yoksa icon göster
        const imageSection = news.imageUrl ? 
            `<img src="${news.imageUrl}" alt="${news.title}" style="width: 100%; height: 200px; object-fit: cover;">` :
            `<div class="news-slide-image" style="height: 200px;"><i class="fas ${icon}"></i></div>`;
        
        return `
            <div class="player-card">
                ${imageSection}
                <div style="padding: 25px;">
                    <span class="news-type-badge ${badgeClass}">${badgeText}</span>
                    <div style="color: #64748b; font-size: 14px; margin: 10px 0;">
                        <i class="far fa-calendar"></i> ${new Date(news.date).toLocaleDateString('tr-TR')}
                    </div>
                    <h3 style="font-size: 20px; font-weight: 700; margin: 10px 0; color: var(--dark);">${news.title}</h3>
                    <p style="color: #64748b; line-height: 1.6;">${news.content}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Load Fixtures
function loadFixtures() {
    const tbody = document.getElementById('fixturesBody');
    tbody.innerHTML = appData.fixtures.map(fix => {
        const statusColor = fix.status === 'Bitti' ? '#dcfce7' : fix.status === 'Canlı' ? '#fee2e2' : '#dbeafe';
        const statusTextColor = fix.status === 'Bitti' ? '#166534' : fix.status === 'Canlı' ? '#991b1b' : '#1e40af';
        
        // AVŞARSPOR logosu
        const avsarsporLogo = 'img/logo/avsarfk.svg';
        
        // Ev sahibi takım
        const homeTeamContent = fix.home === 'AVŞARSPOR' 
            ? `<div style="display: flex; align-items: center; gap: 10px;">
                <img src="${avsarsporLogo}" alt="AVŞARSPOR" style="width: 30px; height: 30px; object-fit: contain;">
                <strong>${fix.home}</strong>
               </div>`
            : fix.homeLogo 
                ? `<div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${fix.homeLogo}" alt="${fix.home}" style="width: 30px; height: 30px; object-fit: contain;">
                    <strong>${fix.home}</strong>
                   </div>`
                : `<strong>${fix.home}</strong>`;
        
        // Deplasman takımı
        const awayTeamContent = fix.away === 'AVŞARSPOR'
            ? `<div style="display: flex; align-items: center; gap: 10px;">
                <img src="${avsarsporLogo}" alt="AVŞARSPOR" style="width: 30px; height: 30px; object-fit: contain;">
                <strong>${fix.away}</strong>
               </div>`
            : fix.awayLogo
                ? `<div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${fix.awayLogo}" alt="${fix.away}" style="width: 30px; height: 30px; object-fit: contain;">
                    <strong>${fix.away}</strong>
                   </div>`
                : `<strong>${fix.away}</strong>`;
        
        return `
            <tr>
                <td>${new Date(fix.date).toLocaleString('tr-TR')}</td>
                <td>${homeTeamContent}</td>
                <td style="text-align: center; font-size: 20px; font-weight: bold; color: var(--turquoise);">
                    ${fix.score || '-'}
                </td>
                <td>${awayTeamContent}</td>
                <td>${fix.league}</td>
                <td>
                    <span style="display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 600; background: ${statusColor}; color: ${statusTextColor};">
                        ${fix.status}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

// Load Gallery
function loadGallery() {
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = appData.gallery.map(item => `
        <div class="gallery-item">
            <img src="${item.imageUrl}" alt="${item.caption}">
            <div class="gallery-caption">
                <strong style="font-size: 16px;">${item.caption}</strong><br>
                <small style="opacity: 0.9;">${item.description}</small>
            </div>
        </div>
    `).join('');
}

// Admin Section Management
function showAdminSection(section) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.admin-tab-btn').classList.add('active');
    
    document.querySelectorAll('.admin-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('admin-' + section).classList.add('active');
}

// Load Admin Data
function loadAdminData() {
    loadPlayersAdmin();
    loadNewsAdmin();
    loadFixturesAdmin();
    loadGalleryAdmin();
    loadMembersAdmin();
}

function loadPlayersAdmin() {
    const tbody = document.getElementById('playersTable');
    tbody.innerHTML = appData.players.map(player => `
        <tr>
            <td>${player.number}</td>
            <td>${player.name}</td>
            <td>${player.position}</td>
            <td>${player.age}</td>
            <td>
                <button class="btn-edit" onclick="editPlayer('${player.id}')">
                    <i class="fas fa-edit"></i> Düzenle
                </button>
                <button class="btn-delete" onclick="deletePlayer('${player.id}')">
                    <i class="fas fa-trash"></i> Sil
                </button>
            </td>
        </tr>
    `).join('');
}

function loadNewsAdmin() {
    const tbody = document.getElementById('newsTable');
    tbody.innerHTML = appData.news.map(news => `
        <tr>
            <td>${news.title}</td>
            <td>${news.type === 'news' ? 'Haber' : news.type === 'transfer' ? 'Transfer' : 'Duyuru'}</td>
            <td>${new Date(news.date).toLocaleDateString('tr-TR')}</td>
            <td>
                <button class="btn-delete" onclick="deleteNews('${news.id}')">
                    <i class="fas fa-trash"></i> Sil
                </button>
            </td>
        </tr>
    `).join('');
}

function loadFixturesAdmin() {
    const tbody = document.getElementById('fixturesAdminTable');
    tbody.innerHTML = appData.fixtures.map(fix => `
        <tr>
            <td>${new Date(fix.date).toLocaleString('tr-TR')}</td>
            <td>${fix.home}</td>
            <td>${fix.score || '-'}</td>
            <td>${fix.away}</td>
            <td>${fix.status}</td>
            <td>
                <button class="btn-edit" onclick="editFixture('${fix.id}')">
                    <i class="fas fa-edit"></i> Düzenle
                </button>
                <button class="btn-delete" onclick="deleteFixture('${fix.id}')">
                    <i class="fas fa-trash"></i> Sil
                </button>
            </td>
        </tr>
    `).join('');
}

function loadGalleryAdmin() {
    const tbody = document.getElementById('galleryAdminTable');
    tbody.innerHTML = appData.gallery.map(item => `
        <tr>
            <td>${item.caption}</td>
            <td>${item.description}</td>
            <td>${new Date(item.date).toLocaleDateString('tr-TR')}</td>
            <td>
                <button class="btn-delete" onclick="deleteGallery('${item.id}')">
                    <i class="fas fa-trash"></i> Sil
                </button>
            </td>
        </tr>
    `).join('');
}

function loadMembersAdmin() {
    const tbody = document.getElementById('membersTable');
    tbody.innerHTML = appData.members.map(member => `
        <tr>
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.phone}</td>
            <td>${new Date(member.date).toLocaleDateString('tr-TR')}</td>
            <td>
                <span style="display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 600; background: ${member.approved ? '#dcfce7' : '#fef3c7'}; color: ${member.approved ? '#166534' : '#92400e'};">
                    ${member.approved ? 'Onaylandı' : 'Beklemede'}
                </span>
            </td>
            <td>
                ${!member.approved ? `<button class="btn-edit" onclick="approveMember('${member.id}')">
                    <i class="fas fa-check"></i> Onayla
                </button>` : ''}
                <button class="btn-delete" onclick="deleteMember('${member.id}')">
                    <i class="fas fa-trash"></i> Sil
                </button>
            </td>
        </tr>
    `).join('');
}

// Form Submissions
document.getElementById('playerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        if (editingItem) {
            const playerRef = doc(db, 'players', editingItem);
            await updateDoc(playerRef, {
                name: formData.get('name'),
                number: parseInt(formData.get('number')),
                position: formData.get('position'),
                age: parseInt(formData.get('age')),
                photo: formData.get('photo') || 'https://via.placeholder.com/400x250?text=Oyuncu'
            });
            editingItem = null;
            alert('Oyuncu başarıyla güncellendi!');
        } else {
            await addDoc(collection(db, 'players'), {
                name: formData.get('name'),
                number: parseInt(formData.get('number')),
                position: formData.get('position'),
                age: parseInt(formData.get('age')),
                photo: formData.get('photo') || 'https://via.placeholder.com/400x250?text=Oyuncu'
            });
            alert('Oyuncu başarıyla eklendi!');
        }
        
        await loadDataFromFirestore();
        e.target.reset();
    } catch (error) {
        console.error('Hata:', error);
        alert('İşlem sırasında bir hata oluştu!');
    }
});

document.getElementById('newsForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        await addDoc(collection(db, 'news'), {
            title: formData.get('title'),
            type: formData.get('type'),
            content: formData.get('content'),
            imageUrl: formData.get('imageUrl') || '',
            date: new Date().toISOString()
        });
        
        await loadDataFromFirestore();
        e.target.reset();
        alert('Haber başarıyla eklendi!');
    } catch (error) {
        console.error('Hata:', error);
        alert('İşlem sırasında bir hata oluştu!');
    }
});

document.getElementById('fixtureForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        if (editingItem) {
            const fixtureRef = doc(db, 'fixtures', editingItem);
            await updateDoc(fixtureRef, {
                date: formData.get('date'),
                home: formData.get('home'),
                away: formData.get('away'),
                score: formData.get('score'),
                league: formData.get('league'),
                status: formData.get('status')
            });
            editingItem = null;
            closeModal();
            alert('Maç başarıyla güncellendi!');
        } else {
            await addDoc(collection(db, 'fixtures'), {
                date: formData.get('date'),
                home: formData.get('home'),
                away: formData.get('away'),
                score: formData.get('score'),
                league: formData.get('league'),
                status: formData.get('status')
            });
            alert('Maç başarıyla eklendi!');
        }
        
        await loadDataFromFirestore();
        e.target.reset();
    } catch (error) {
        console.error('Hata:', error);
        alert('İşlem sırasında bir hata oluştu!');
    }
});

document.getElementById('galleryForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        await addDoc(collection(db, 'gallery'), {
            caption: formData.get('caption'),
            imageUrl: formData.get('imageUrl'),
            description: formData.get('description'),
            date: new Date().toISOString()
        });
        
        await loadDataFromFirestore();
        e.target.reset();
        alert('Fotoğraf başarıyla eklendi!');
    } catch (error) {
        console.error('Hata:', error);
        alert('İşlem sırasında bir hata oluştu!');
    }
});

document.getElementById('membershipForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        await addDoc(collection(db, 'members'), {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            birthdate: formData.get('birthdate'),
            address: formData.get('address'),
            date: new Date().toISOString(),
            approved: false
        });
        
        e.target.reset();
        alert('Üyelik başvurunuz alındı! En kısa sürede sizinle iletişime geçeceğiz.');
    } catch (error) {
        console.error('Hata:', error);
        alert('İşlem sırasında bir hata oluştu!');
    }
});

// Edit Functions
function editPlayer(id) {
    const player = appData.players.find(p => p.id === id);
    editingItem = id;
    
    const form = document.getElementById('playerForm');
    form.querySelector('[name="name"]').value = player.name;
    form.querySelector('[name="number"]').value = player.number;
    form.querySelector('[name="position"]').value = player.position;
    form.querySelector('[name="age"]').value = player.age;
    form.querySelector('[name="photo"]').value = player.photo || '';
    
    form.scrollIntoView({ behavior: 'smooth' });
}

function editFixture(id) {
    const fixture = appData.fixtures.find(f => f.id === id);
    editingItem = id;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div style="padding: 30px;">
            <form id="editFixtureForm" class="admin-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Tarih *</label>
                        <input type="datetime-local" name="date" value="${fixture.date}" required>
                    </div>
                    <div class="form-group">
                        <label>Ev Sahibi *</label>
                        <input type="text" name="home" value="${fixture.home}" required>
                    </div>
                    <div class="form-group">
                        <label>Deplasman *</label>
                        <input type="text" name="away" value="${fixture.away}" required>
                    </div>
                    <div class="form-group">
                        <label>Lig *</label>
                        <input type="text" name="league" value="${fixture.league}" required>
                    </div>
                    <div class="form-group">
                        <label>Skor</label>
                        <input type="text" name="score" value="${fixture.score}" placeholder="Örn: 2-1">
                    </div>
                    <div class="form-group">
                        <label>Durum *</label>
                        <select name="status" required>
                            <option value="Gelecek" ${fixture.status === 'Gelecek' ? 'selected' : ''}>Gelecek</option>
                            <option value="Canlı" ${fixture.status === 'Canlı' ? 'selected' : ''}>Canlı</option>
                            <option value="Bitti" ${fixture.status === 'Bitti' ? 'selected' : ''}>Bitti</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 20px;">
                    <i class="fas fa-save"></i> Kaydet
                </button>
            </form>
        </div>
    `;
    
    document.getElementById('modalTitle').textContent = 'Maç Düzenle';
    document.getElementById('editModal').classList.add('active');
    
    document.getElementById('editFixtureForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const fixtureRef = doc(db, 'fixtures', editingItem);
            await updateDoc(fixtureRef, {
                date: formData.get('date'),
                home: formData.get('home'),
                away: formData.get('away'),
                score: formData.get('score'),
                league: formData.get('league'),
                status: formData.get('status')
            });
            
            await loadDataFromFirestore();
            closeModal();
            editingItem = null;
            alert('Maç başarıyla güncellendi!');
        } catch (error) {
            console.error('Hata:', error);
            alert('İşlem sırasında bir hata oluştu!');
        }
    });
}

async function approveMember(id) {
    try {
        const memberRef = doc(db, 'members', id);
        await updateDoc(memberRef, { approved: true });
        
        const member = appData.members.find(m => m.id === id);
        alert(`✅ Üyelik Onaylandı!\n\n${member.name} adlı üyeye WhatsApp üzerinden bildirim gönderildi:\n\n"Sayın ${member.name},\nAVŞARSPOR Futbol Kulübü üyeliğiniz onaylanmıştır. Hoş geldiniz! 🎉⚽"`);
        
        await loadDataFromFirestore();
    } catch (error) {
        console.error('Hata:', error);
        alert('İşlem sırasında bir hata oluştu!');
    }
}

// Delete Functions
async function deletePlayer(id) {
    if (confirm('Bu oyuncuyu silmek istediğinizden emin misiniz?')) {
        try {
            await deleteDoc(doc(db, 'players', id));
            await loadDataFromFirestore();
            alert('Oyuncu silindi!');
        } catch (error) {
            console.error('Hata:', error);
            alert('İşlem sırasında bir hata oluştu!');
        }
    }
}

async function deleteNews(id) {
    if (confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
        try {
            await deleteDoc(doc(db, 'news', id));
            await loadDataFromFirestore();
            alert('Haber silindi!');
        } catch (error) {
            console.error('Hata:', error);
            alert('İşlem sırasında bir hata oluştu!');
        }
    }
}

async function deleteFixture(id) {
    if (confirm('Bu maçı silmek istediğinizden emin misiniz?')) {
        try {
            await deleteDoc(doc(db, 'fixtures', id));
            await loadDataFromFirestore();
            alert('Maç silindi!');
        } catch (error) {
            console.error('Hata:', error);
            alert('İşlem sırasında bir hata oluştu!');
        }
    }
}

async function deleteGallery(id) {
    if (confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) {
        try {
            await deleteDoc(doc(db, 'gallery', id));
            await loadDataFromFirestore();
            alert('Fotoğraf silindi!');
        } catch (error) {
            console.error('Hata:', error);
            alert('İşlem sırasında bir hata oluştu!');
        }
    }
}

async function deleteMember(id) {
    if (confirm('Bu üye başvurusunu silmek istediğinizden emin misiniz?')) {
        try {
            await deleteDoc(doc(db, 'members', id));
            await loadDataFromFirestore();
            alert('Başvuru silindi!');
        } catch (error) {
            console.error('Hata:', error);
            alert('İşlem sırasında bir hata oluştu!');
        }
    }
}

// Modal Functions
function closeModal() {
    document.getElementById('editModal').classList.remove('active');
    editingItem = null;
}

// Close modal when clicking outside
document.getElementById('editModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Global fonksiyonları window objesine ekle
window.navigateTo = navigateTo;
window.slideNews = slideNews;
window.showAdminSection = showAdminSection;
window.editPlayer = editPlayer;
window.editFixture = editFixture;
window.deletePlayer = deletePlayer;
window.deleteNews = deleteNews;
window.deleteFixture = deleteFixture;
window.deleteGallery = deleteGallery;
window.deleteMember = deleteMember;
window.approveMember = approveMember;
window.closeModal = closeModal;

// Initialize on page load
window.addEventListener('DOMContentLoaded', async function() {
    await loadDataFromFirestore();
    
    // Auto slide news every 5 seconds
    setInterval(() => {
        slideNews(1);
    }, 5000);
});