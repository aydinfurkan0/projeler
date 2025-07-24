// script.js
const products = JSON.parse(localStorage.getItem('products')) || [
    // Köpek Ürünleri
    {
        id: 1,
        name: "Royal Canin Köpek Maması - Büyük Irk",
        price: 299,
        originalPrice: 349,
        image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=300&fit=crop",
        category: "köpek",
        discount: "15%"
    },
    {
        id: 2,
        name: "Premium Köpek Oyuncağı - Çiğneme Kemik",
        price: 45,
        image: "https://images.unsplash.com/photo-1581122949079-09fb1dfd8c4e?w=400&h=300&fit=crop",
        category: "köpek"
    },
    {
        id: 3,
        name: "Deri Köpek Tasması - Ayarlanabilir",
        price: 125,
        image: "https://images.unsplash.com/photo-1594736797933-d0688a67c7ac?w=400&h=300&fit=crop",
        category: "köpek"
    },
    {
        id: 4,
        name: "Köpek Yatağı - Ortopedik Büyük Boy",
        price: 299,
        originalPrice: 399,
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
        category: "köpek",
        discount: "25%"
    },
    {
        id: 5,
        name: "Köpek Mama Kabı - Çift Bölmeli",
        price: 75,
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
        category: "köpek"
    },
    {
        id: 6,
        name: "Köpek Diş Fırçası ve Diş Macunu Set",
        price: 55,
        image: "https://images.unsplash.com/photo-1601758174493-bea9f73b58c4?w=400&h=300&fit=crop",
        category: "köpek"
    },
    {
        id: 7,
        name: "Pedigree Köpek Maması - Küçük Irk",
        price: 189,
        image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=300&fit=crop",
        category: "köpek"
    },
    {
        id: 8,
        name: "Köpek Kayışı - Otomatik Geri Dönüşlü",
        price: 85,
        image: "https://images.unsplash.com/photo-1594736797933-d0688a67c7ac?w=400&h=300&fit=crop",
        category: "köpek"
    },
    
    // Kedi Ürünleri
    {
        id: 9,
        name: "Whiskas Kedi Maması - Yetişkin",
        price: 159,
        image: "https://images.unsplash.com/photo-1606050428059-62ca8739b59e?w=400&h=300&fit=crop",
        category: "kedi"
    },
    {
        id: 10,
        name: "Premium Kedi Kumu - Topaklanan",
        price: 89,
        originalPrice: 110,
        image: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400&h=300&fit=crop",
        category: "kedi",
        discount: "20%"
    },
    {
        id: 11,
        name: "Kedi Tırmalama Tahtası - Büyük Boy",
        price: 145,
        image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop",
        category: "kedi"
    },
    {
        id: 12,
        name: "Kedi Taşıma Çantası - Hava Geçirgen",
        price: 199,
        image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=300&fit=crop",
        category: "kedi"
    },
    {
        id: 13,
        name: "Kedi Şampuanı - Organik",
        price: 67,
        image: "https://images.unsplash.com/photo-1597626133572-53b74c4fe7cb?w=400&h=300&fit=crop",
        category: "kedi"
    },
    {
        id: 14,
        name: "İnteraktif Kedi Oyuncağı - Lazer",
        price: 85,
        image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&h=300&fit=crop",
        category: "kedi"
    },
    {
        id: 15,
        name: "Pro Plan Kedi Maması - Sterilised",
        price: 245,
        image: "https://images.unsplash.com/photo-1606050428059-62ca8739b59e?w=400&h=300&fit=crop",
        category: "kedi"
    },
    {
        id: 16,
        name: "Kedi Yaş Mama - Tavuklu 12'li Paket",
        price: 95,
        originalPrice: 120,
        image: "https://images.unsplash.com/photo-1606050428059-62ca8739b59e?w=400&h=300&fit=crop",
        category: "kedi",
        discount: "21%"
    },

    // Kuş Ürünleri
    {
        id: 17,
        name: "Muhabbet Kuşu Yemi - Premium",
        price: 28,
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
        category: "kuş"
    },
    {
        id: 18,
        name: "Kuş Kafesi - Orta Boy Deluxe",
        price: 245,
        image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=400&h=300&fit=crop",
        category: "kuş"
    },
    {
        id: 19,
        name: "Doğal Ahşap Kuş Tüneği",
        price: 35,
        image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&h=300&fit=crop",
        category: "kuş"
    },
    {
        id: 20,
        name: "Kanarya Yemi - Vitamin Katkılı",
        price: 42,
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
        category: "kuş"
    },
    {
        id: 21,
        name: "Kuş Kafesi - Büyük Boy Villa",
        price: 395,
        image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=400&h=300&fit=crop",
        category: "kuş"
    },
    {
        id: 22,
        name: "Papağan Yemi - Tropik Karışım",
        price: 65,
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
        category: "kuş"
    },

    // Balık & Akvaryum Ürünleri
    {
        id: 23,
        name: "Tropikal Balık Yemi - Flake",
        price: 32,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        category: "balık"
    },
    {
        id: 24,
        name: "Akvaryum Filtresi - Dahili",
        price: 189,
        image: "https://images.unsplash.com/photo-1520637836862-4d197d17c38a?w=400&h=300&fit=crop",
        category: "balık"
    },
    {
        id: 25,
        name: "Akvaryum Dekorasyon Seti",
        price: 95,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
        category: "balık"
    },
    {
        id: 26,
        name: "LED Akvaryum Işığı - RGB",
        price: 275,
        originalPrice: 320,
        image: "https://images.unsplash.com/photo-1520637836862-4d197d17c38a?w=400&h=300&fit=crop",
        category: "balık",
        discount: "15%"
    },
    {
        id: 27,
        name: "Akvaryum - 100 Litre Komple Set",
        price: 895,
        image: "https://images.unsplash.com/photo-1520637836862-4d197d17c38a?w=400&h=300&fit=crop",
        category: "balık"
    },
    {
        id: 28,
        name: "Japon Balığı Yemi - Premium",
        price: 48,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        category: "balık"
    },
    {
        id: 29,
        name: "Akvaryum Temizlik Kiti",
        price: 125,
        image: "https://images.unsplash.com/photo-1520637836862-4d197d17c38a?w=400&h=300&fit=crop",
        category: "balık"
    },
    {
        id: 30,
        name: "Su Kondisyoneri - 500ml",
        price: 55,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        category: "balık"
    },

    // Bakım Ürünleri
    {
        id: 31,
        name: "Universal Pet Şampuanı",
        price: 75,
        image: "https://images.unsplash.com/photo-1597626133572-53b74c4fe7cb?w=400&h=300&fit=crop",
        category: "bakım"
    },
    {
        id: 32,
        name: "Tüy Bakım Fırça Seti",
        price: 45,
        image: "https://images.unsplash.com/photo-1601758174493-bea9f73b58c4?w=400&h=300&fit=crop",
        category: "bakım"
    },
    {
        id: 33,
        name: "Tırnak Makası - Profesyonel",
        price: 35,
        image: "https://images.unsplash.com/photo-1601758174493-bea9f73b58c4?w=400&h=300&fit=crop",
        category: "bakım"
    },
    {
        id: 34,
        name: "Kulak Temizlik Solüsyonu",
        price: 42,
        image: "https://images.unsplash.com/photo-1597626133572-53b74c4fe7cb?w=400&h=300&fit=crop",
        category: "bakım"
    },
    {
        id: 35,
        name: "Pet Parfümü - Lavanta",
        price: 65,
        originalPrice: 85,
        image: "https://images.unsplash.com/photo-1597626133572-53b74c4fe7cb?w=400&h=300&fit=crop",
        category: "bakım",
        discount: "24%"
    },
    {
        id: 36,
        name: "Diş Bakım Kiti - Komple",
        price: 85,
        image: "https://images.unsplash.com/photo-1601758174493-bea9f73b58c4?w=400&h=300&fit=crop",
        category: "bakım"
    },

    // Oyuncaklar
    {
        id: 37,
        name: "İnteraktif Puzzle Oyuncağı",
        price: 95,
        image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&h=300&fit=crop",
        category: "oyuncak"
    },
    {
        id: 38,
        name: "Peluş Hayvan Oyuncağı - Köpek İçin",
        price: 55,
        image: "https://images.unsplash.com/photo-1581122949079-09fb1dfd8c4e?w=400&h=300&fit=crop",
        category: "oyuncak"
    },
    {
        id: 39,
        name: "Lazer Pointer - Kedi İçin",
        price: 40,
        image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop",
        category: "oyuncak"
    },
    {
        id: 40,
        name: "Uçan Disk - Köpek Eğlencesi",
        price: 35,
        originalPrice: 50,
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
        category: "oyuncak",
        discount: "30%"
    },
    {
        id: 41,
        name: "Tünel Oyuncağı - Kedi İçin",
        price: 75,
        image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=300&fit=crop",
        category: "oyuncak"
    },
    {
        id: 42,
        name: "Kuş Salıncağı - Eğlenceli",
        price: 25,
        image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&h=300&fit=crop",
        category: "oyuncak"
    },
    {
        id: 43,
        name: "Balık Oyuncağı - Su İçin Dekoratif",
        price: 45,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
        category: "oyuncak"
    }
];

// Kategori modal verileri
const categoryData = {
    'köpek': {
        title: 'Köpek Ürünleri',
        description: 'Sadık dostlarınız için her şey burada!',
        items: [
            { name: 'Mama Çeşitleri', desc: 'Besleyici ve lezzetli', img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=80' },
            { name: 'Oyuncaklar', desc: 'Eğlenceli oyunlar', img: 'https://images.unsplash.com/photo-1581122949079-09fb1dfd8c4e?w=80' }
        ]
    },
    'kedi': {
        title: 'Kedi Ürünleri',
        description: 'Sevimli kediler için özel ürünler.',
        items: [
            { name: 'Kum ve Tuvalet', desc: 'Hijyenik çözümler', img: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=80' },
            { name: 'Tırmalama', desc: 'Pençe bakımı', img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=80' }
        ]
    },
    'kuş': {
        title: 'Kuş Ürünleri',
        description: 'Renkli kuşlar için yem ve kafesler.',
        items: [
            { name: 'Yem Çeşitleri', desc: 'Vitaminli yemler', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=80' },
            { name: 'Kafes Aksesuarları', desc: 'Konforlu yaşam', img: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=80' }
        ]
    },
    'balık': {
        title: 'Akvaryum Ürünleri',
        description: 'Su altı dünyası için her şey.',
        items: [
            { name: 'Filtre Sistemleri', desc: 'Temiz su', img: 'https://images.unsplash.com/photo-1520637836862-4d197d17c38a?w=80' },
            { name: 'Dekorasyon', desc: 'Güzel ortam', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=80' }
        ]
    },
    'bakım': {
        title: 'Bakım Ürünleri',
        description: 'Evcil hayvan bakımı için essentials.',
        items: [
            { name: 'Şampuanlar', desc: 'Temizlik ürünleri', img: 'https://images.unsplash.com/photo-1597626133572-53b74c4fe7cb?w=80' },
            { name: 'Fırçalar', desc: 'Tüy bakımı', img: 'https://images.unsplash.com/photo-1601758174493-bea9f73b58c4?w=80' }
        ]
    },
    'oyuncak': {
        title: 'Oyuncaklar',
        description: 'Eğlence dolu oyuncaklar.',
        items: [
            { name: 'İnteraktif Oyuncaklar', desc: 'Zeka geliştirici', img: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=80' },
            { name: 'Peluşlar', desc: 'Yumuşak arkadaşlar', img: 'https://images.unsplash.com/photo-1581122949079-09fb1dfd8c4e?w=80' }
        ]
    }
};

// Sepet verileri
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    renderSlider();
    renderProducts(products);
    updateCartCount();
    renderCartItems();
});

// Ürünleri render et
function renderProducts(filteredProducts) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = product.category;
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">₺${product.price} ${product.originalPrice ? `<span style="text-decoration: line-through; color: #999;">₺${product.originalPrice}</span>` : ''}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Sepete Ekle</button>
                ${product.discount ? `<span class="discount-badge">-${product.discount}</span>` : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filtreleme
function filterProducts(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    renderProducts(filtered);
}

// Sepete ekle
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Sepet sayısını güncelle
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Sepet render
function renderCartItems() {
    const itemsContainer = document.getElementById('cartItems');
    const totalContainer = document.getElementById('cartTotal');
    const actionsContainer = document.getElementById('cartActions');
    itemsContainer.innerHTML = '';

    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Sepetiniz boş!</p>
            </div>
        `;
        totalContainer.style.display = 'none';
        actionsContainer.style.display = 'none';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name} (x${item.quantity})</p>
                <p class="cart-item-price">₺${item.price * item.quantity}</p>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Sil</button>
        `;
        itemsContainer.appendChild(cartItem);
    });

    document.getElementById('totalAmount').textContent = `₺${total}`;
    totalContainer.style.display = 'block';
    actionsContainer.style.display = 'flex';
}

// Sepetten sil
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Slider
let currentSlide = 0;

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Otomatik slider
setInterval(() => {
    const slides = document.querySelectorAll('.slide');
    let next = (currentSlide + 1) % slides.length;
    goToSlide(next);
}, 5000);

// Kategori modal
function openCategoryModal(category) {
    const modal = document.getElementById('categoryModal');
    const title = document.getElementById('modalTitle');
    const desc = document.getElementById('modalDescription');
    const grid = document.getElementById('modalGrid');

    const data = categoryData[category];
    title.textContent = data.title;
    desc.textContent = data.description;
    grid.innerHTML = '';
    data.items.forEach(item => {
        const modalItem = document.createElement('div');
        modalItem.className = 'modal-item';
        modalItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>${item.desc}</p>
        `;
        grid.appendChild(modalItem);
    });

    modal.classList.add('show');
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('show');
}

function goToProducts() {
    closeCategoryModal();
    const cat = document.getElementById('modalTitle').textContent.toLowerCase().split(' ')[0];
    const btn = document.querySelector(`.filter-btn[onclick="filterProducts('${cat}')"]`);
    if (btn) btn.click();
    window.scrollTo({ top: document.getElementById('products').offsetTop, behavior: 'smooth' });
}

// Sepet modal
function openCartModal() {
    renderCartItems();
    document.getElementById('cartModal').classList.add('show');
}

function closeCartModal() {
    document.getElementById('cartModal').classList.remove('show');
}

// Sipariş onayla
function confirmOrder() {
    if (cart.length === 0) return;

    let message = 'Siparişim:\n\n';
    let total = 0;
    cart.forEach(item => {
        message += `${item.name} - x${item.quantity} - ₺${item.price * item.quantity}\n`;
        total += item.price * item.quantity;
    });
    message += `\nToplam: ₺${total}\n\nTeşekkürler!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/905321234567?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    closeCartModal();
}

// Hamburger menü
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

// Admin Panel
const ADMIN_PASSWORD = 'petlove123';

function openAdminPanel() {
    document.getElementById('adminModal').classList.add('show');
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
}

function closeAdminPanel() {
    document.getElementById('adminModal').classList.remove('show');
}

function loginAdmin() {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        renderAdminProducts();
        renderAdminSlides();
    } else {
        alert('Yanlış şifre!');
    }
}

// Ürün yönetimi
let adminProducts = JSON.parse(localStorage.getItem('products')) || products;

document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    let imageSrc = document.getElementById('prodImageUrl').value;
    
    const file = document.getElementById('prodImageFile').files[0];
    if (file) {
        imageSrc = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }
    
    const newProduct = {
        id: adminProducts.length + 1,
        name: document.getElementById('prodName').value,
        price: parseFloat(document.getElementById('prodPrice').value),
        image: imageSrc,
        category: document.getElementById('prodCategory').value,
        originalPrice: parseFloat(document.getElementById('prodOriginalPrice').value) || undefined,
        discount: document.getElementById('prodDiscount').value || undefined
    };
    adminProducts.push(newProduct);
    localStorage.setItem('products', JSON.stringify(adminProducts));
    renderAdminProducts();
    renderProducts(adminProducts);
    e.target.reset();
});

function renderAdminProducts() {
    const list = document.getElementById('productList');
    list.innerHTML = '';
    adminProducts.forEach(prod => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <span>${prod.name} - ₺${prod.price} (${prod.category})</span>
            <button onclick="deleteAdminProduct(${prod.id})">Sil</button>
        `;
        list.appendChild(item);
    });
}

function deleteAdminProduct(id) {
    adminProducts = adminProducts.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(adminProducts));
    renderAdminProducts();
    renderProducts(adminProducts);
}

// Slider yönetimi
let adminSlides = JSON.parse(localStorage.getItem('slides')) || [
    { bg: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920&h=1080&fit=crop', title: 'Evcil Dostlarınız İçin Her Şey', desc: 'Kaliteli mama, oyuncak ve bakım ürünleriyle sevimli arkadaşlarınızı mutlu edin', buttonText: '🛍️ Alışverişe Başla', buttonLink: '#products' },
    { bg: 'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=1920&h=1080&fit=crop', title: 'Premium Mama Çeşitleri', desc: 'Köpek, kedi ve diğer evcil hayvanlar için besleyici ve lezzetli mamalar', buttonText: '🍽️ Mama Kategorisi', buttonLink: '#products' },
    { bg: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1920&h=1080&fit=crop', title: 'Eğlenceli Oyuncaklar', desc: 'Evcil dostlarınızın oyun zamanını daha eğlenceli hale getirin', buttonText: '🎮 Oyuncakları Keşfet', buttonLink: '#products' },
    { bg: 'https://images.unsplash.com/photo-1520637736862-4d197d17c38a?w=1920&h=1080&fit=crop', title: 'Akvaryum Dünyası', desc: 'Su altı dostlarınız için modern akvaryumlar ve kaliteli balık ürünleri', buttonText: '🐠 Akvaryumu Keşfet', buttonLink: '#products' }
];

document.getElementById('sliderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    let bgSrc = document.getElementById('slideBgUrl').value;
    
    const file = document.getElementById('slideBgFile').files[0];
    if (file) {
        bgSrc = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }
    
    const newSlide = {
        bg: bgSrc,
        title: document.getElementById('slideTitle').value,
        desc: document.getElementById('slideDesc').value,
        buttonText: document.getElementById('slideButtonText').value,
        buttonLink: document.getElementById('slideButtonLink').value
    };
    adminSlides.push(newSlide);
    localStorage.setItem('slides', JSON.stringify(adminSlides));
    renderAdminSlides();
    renderSlider();
    e.target.reset();
});

function renderAdminSlides() {
    const list = document.getElementById('sliderList');
    list.innerHTML = '';
    adminSlides.forEach((slide, index) => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <span>${slide.title} - ${slide.bg.slice(0, 20)}...</span>
            <button onclick="deleteAdminSlide(${index})">Sil</button>
        `;
        list.appendChild(item);
    });
}

function deleteAdminSlide(index) {
    adminSlides.splice(index, 1);
    localStorage.setItem('slides', JSON.stringify(adminSlides));
    renderAdminSlides();
    renderSlider();
}

// Slider render
function renderSlider() {
    const slider = document.querySelector('.slider');
    slider.innerHTML = '';
    adminSlides.forEach((slide, index) => {
        const slideElem = document.createElement('div');
        slideElem.className = `slide ${index === 0 ? 'active' : ''}`;
        slideElem.style.backgroundImage = `url('${slide.bg}')`;
        slideElem.innerHTML = `
            <div class="floating-animals">
                <div class="floating-animal">🐕</div>
                <div class="floating-animal">🐱</div>
                <div class="floating-animal">🦜</div>
                <div class="floating-animal">🐠</div>
                <div class="floating-animal">🐰</div>
            </div>
            <div class="slide-content">
                <h1>${slide.title}</h1>
                <p>${slide.desc}</p>
                <a href="${slide.buttonLink}" class="cta-button">${slide.buttonText}</a>
            </div>
        `;
        slider.appendChild(slideElem);
    });

    const sliderNav = document.querySelector('.slider-nav');
    sliderNav.innerHTML = '';
    adminSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        sliderNav.appendChild(dot);
    });

    currentSlide = 0;
}