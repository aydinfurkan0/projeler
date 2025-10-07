// Firebase Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

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

// Global Variables
let isAdmin = false;
let cart = [];
let products = [];
let editingProductId = null;
let paymentSettings = {
    bankName: '',
    accountName: '',
    iban: '',
    qrCode: '',
    whatsappNumber: ''
};

// Admin Auth
const ADMIN_USERNAME = 'furkan';
const ADMIN_PASSWORD = 'furkan';

// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);
});

// Initialize
document.addEventListener('DOMContentLoaded', async function() {
    loadCartFromStorage();
    await loadProducts();
    await loadPaymentSettings();
    updateCartUI();
});

// Load Payment Settings from Firestore
async function loadPaymentSettings() {
    try {
        const settingsDoc = await getDoc(doc(db, 'settings', 'payment'));
        if (settingsDoc.exists()) {
            paymentSettings = settingsDoc.data();
        }
    } catch (error) {
        console.error('Ödeme ayarları yüklenirken hata:', error);
    }
}

// Save Payment Settings to Firestore
async function savePaymentSettings() {
    try {
        await setDoc(doc(db, 'settings', 'payment'), paymentSettings);
        alert('Ödeme bilgileri kaydedildi!');
    } catch (error) {
        console.error('Ödeme ayarları kaydedilirken hata:', error);
        alert('Bir hata oluştu!');
    }
}



// Load Payment Settings Form
function loadPaymentSettingsForm() {
    const form = document.getElementById('paymentSettingsForm');
    form.bankName.value = paymentSettings.bankName || '';
    form.accountName.value = paymentSettings.accountName || '';
    form.iban.value = paymentSettings.iban || '';
    form.qrCode.value = paymentSettings.qrCode || '';
    form.whatsappNumber.value = paymentSettings.whatsappNumber || '';
}

// Payment Settings Form Submit
document.getElementById('paymentSettingsForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    paymentSettings = {
        bankName: formData.get('bankName'),
        accountName: formData.get('accountName'),
        iban: formData.get('iban'),
        qrCode: formData.get('qrCode'),
        whatsappNumber: formData.get('whatsappNumber')
    };
    
    await savePaymentSettings();
});

// Admin - Product Management
document.getElementById('productForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const productData = {
        name: formData.get('name'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        image: formData.get('image'),
        sizes: formData.get('sizes'),
        description: formData.get('description')
    };
    
    try {
        if (editingProductId) {
            const productRef = doc(db, 'products', editingProductId);
            await updateDoc(productRef, productData);
            alert('Ürün güncellendi!');
            editingProductId = null;
        } else {
            await addDoc(collection(db, 'products'), productData);
            alert('Ürün eklendi!');
        }
        
        await loadProducts();
        e.target.reset();
    } catch (error) {
        console.error('Ürün kaydedilirken hata:', error);
        alert('Bir hata oluştu!');
    }
});



// Load Products from Firestore
async function loadProducts() {
    try {
        const productsSnapshot = await getDocs(collection(db, 'products'));
        products = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        displayProducts();
        if (isAdmin) {
            displayAdminProducts();
        }
    } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
    }
}

// Display Products
function displayProducts(filter = '') {
    const grid = document.getElementById('productsGrid');
    let filteredProducts = products;
    
    if (filter) {
        filteredProducts = products.filter(p => p.category === filter);
    }
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductDetail('${product.id}')">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${product.price} ₺</div>
                <div class="product-stock ${product.stock > 0 ? '' : 'out-of-stock'}">
                    ${product.stock > 0 ? `Stokta: ${product.stock} adet` : 'Stokta Yok'}
                </div>
                <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${product.id}')" ${product.stock === 0 ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i> Sepete Ekle
                </button>
            </div>
        </div>
    `).join('');
}

// Filter Products
function filterProducts() {
    const filter = document.getElementById('categoryFilter').value;
    displayProducts(filter);
}

// Show Product Detail
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const sizes = product.sizes ? product.sizes.split(',').map(s => s.trim()) : [];
    
    document.getElementById('productDetail').innerHTML = `
        <div class="product-detail">
            <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            <div>
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h2>${product.name}</h2>
                <div class="product-price">${product.price} ₺</div>
                <p style="margin: 15px 0; color: var(--gray);">${product.description || ''}</p>
                
                ${sizes.length > 0 ? `
                    <h4>Beden Seçin:</h4>
                    <div class="product-detail-sizes">
                        ${sizes.map(size => `
                            <button class="size-btn" onclick="selectSize(this)">${size}</button>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="product-stock ${product.stock > 0 ? '' : 'out-of-stock'}">
                    ${product.stock > 0 ? `Stokta: ${product.stock} adet` : 'Stokta Yok'}
                </div>
                
                <button class="btn-primary full-width" onclick="addToCartFromDetail('${product.id}')" ${product.stock === 0 ? 'disabled' : ''} style="margin-top: 20px;">
                    <i class="fas fa-shopping-cart"></i> Sepete Ekle
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('productModal').classList.add('active');
}

function selectSize(btn) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function addToCartFromDetail(productId) {
    const selectedSize = document.querySelector('.size-btn.active');
    addToCart(productId, selectedSize ? selectedSize.textContent : null);
    closeModal('productModal');
}

// Add to Cart
function addToCart(productId, size = null) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;
    
    const existingItem = cart.find(item => item.id === productId && item.size === size);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            alert('Stok yetersiz!');
            return;
        }
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartUI();
    alert('Ürün sepete eklendi!');
}

// Update Cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartBadge.textContent = totalItems;
    cartTotal.textContent = total.toFixed(2) + ' ₺';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--gray);">Sepetiniz boş</p>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    ${item.size ? `<p>Beden: ${item.size}</p>` : ''}
                    <div class="cart-item-price">${item.price} ₺</div>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="cart-item-qty">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Update Quantity
function updateQuantity(index, change) {
    const item = cart[index];
    const product = products.find(p => p.id === item.id);
    
    if (change > 0 && item.quantity >= product.stock) {
        alert('Stok yetersiz!');
        return;
    }
    
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    saveCartToStorage();
    updateCartUI();
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartUI();
}

// Toggle Cart
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

// Checkout - Ödeme Bilgileri Göster
function checkout() {
    if (cart.length === 0) {
        alert('Sepetiniz boş!');
        return;
    }
    
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} ${item.size ? `(${item.size})` : ''} x ${item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)} ₺</span>
        </div>
    `).join('');
    
    checkoutTotal.textContent = total.toFixed(2) + ' ₺';
    
    // Ödeme bilgilerini göster
    document.getElementById('paymentInfo').innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h4 style="margin-bottom: 20px;">Ödeme Bilgileri</h4>
            <div style="background: var(--light-gray); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                <div style="margin-bottom: 15px;">
                    <strong>Banka:</strong> ${PAYMENT_INFO.bankName}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Hesap Adı:</strong> ${PAYMENT_INFO.accountName}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>IBAN:</strong><br>
                    <code style="background: white; padding: 10px; border-radius: 6px; display: inline-block; margin-top: 5px;">${PAYMENT_INFO.iban}</code>
                </div>
            </div>
            <div style="margin: 20px 0;">
                <img src="${PAYMENT_INFO.qrCode}" alt="QR Kod" style="border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <p style="margin-top: 10px; font-size: 14px; color: var(--gray);">QR Kod ile hızlı ödeme</p>
            </div>
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; font-size: 14px; color: #92400e;">
                <i class="fas fa-info-circle"></i> Ödeme yaptıktan sonra dekontunuzu WhatsApp'tan gönderiniz
            </div>
        </div>
    `;
    
    toggleCart();
    document.getElementById('paymentModal').classList.add('active');
}

// WhatsApp'a Yönlendir
function sendToWhatsApp() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Sipariş mesajını oluştur
    let message = '🛍️ *AVŞARSPOR MAĞAZA SİPARİŞİ*\n\n';
    message += '📦 *Sipariş Detayları:*\n';
    message += '━━━━━━━━━━━━━━━━\n';
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}`;
        if (item.size) message += ` (${item.size})`;
        message += `\n   ${item.quantity} adet x ${item.price} ₺ = ${(item.quantity * item.price).toFixed(2)} ₺\n\n`;
    });
    
    message += '━━━━━━━━━━━━━━━━\n';
    message += `💰 *Toplam: ${total.toFixed(2)} ₺*\n\n`;
    message += `💳 *Ödeme Bilgileri:*\n`;
    message += `Banka: ${PAYMENT_INFO.bankName}\n`;
    message += `IBAN: ${PAYMENT_INFO.iban}\n\n`;
    message += `📸 Dekontunuzu bu mesaja yanıt olarak gönderebilirsiniz.\n\n`;
    message += `🚚 Ödemeniz onaylandıktan sonra kargoya verilecektir.`;
    
    // WhatsApp URL'i oluştur
    const phone = '905551234567'; // WhatsApp numaranızı buraya ekleyin
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    // Yönlendir
    window.open(whatsappURL, '_blank');
    
    // Sepeti temizle
    cart = [];
    saveCartToStorage();
    updateCartUI();
    closeModal('paymentModal');
    
    alert('WhatsApp\'a yönlendiriliyorsunuz. Dekontunuzu gönderdikten sonra siparişiniz kargoya verilecektir.');
}

// Admin Login
function showAdminLogin() {
    const username = prompt('Kullanıcı Adı:');
    const password = prompt('Şifre:');
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        isAdmin = true;
        navigateTo('admin');
        alert('Admin paneline hoş geldiniz!');
        document.getElementById('adminNav').style.display = 'block';
    } else {
        alert('Kullanıcı adı veya şifre hatalı!');
    }
}

// Admin - Product Management
document.getElementById('productForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const productData = {
        name: formData.get('name'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        image: formData.get('image'),
        sizes: formData.get('sizes'),
        description: formData.get('description')
    };
    
    try {
        if (editingProductId) {
            const productRef = doc(db, 'products', editingProductId);
            await updateDoc(productRef, productData);
            alert('Ürün güncellendi!');
            editingProductId = null;
        } else {
            await addDoc(collection(db, 'products'), productData);
            alert('Ürün eklendi!');
        }
        
        await loadProducts();
        e.target.reset();
    } catch (error) {
        console.error('Ürün kaydedilirken hata:', error);
        alert('Bir hata oluştu!');
    }
});

// Display Admin Products
function displayAdminProducts() {
    const grid = document.getElementById('productsAdminGrid');
    
    grid.innerHTML = products.map(product => `
        <div class="admin-product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="admin-product-info">
                <strong>${product.name}</strong>
                <div style="color: var(--gray); font-size: 13px; margin: 5px 0;">${product.price} ₺</div>
                <div style="color: var(--gray); font-size: 12px;">Stok: ${product.stock}</div>
                <div class="admin-product-actions">
                    <button class="btn-edit" onclick="editProduct('${product.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteProduct('${product.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Edit Product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const form = document.getElementById('productForm');
    form.name.value = product.name;
    form.category.value = product.category;
    form.price.value = product.price;
    form.stock.value = product.stock;
    form.image.value = product.image;
    form.sizes.value = product.sizes || '';
    form.description.value = product.description || '';
    
    editingProductId = productId;
    form.scrollIntoView({ behavior: 'smooth' });
}

// Delete Product
async function deleteProduct(productId) {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;
    
    try {
        await deleteDoc(doc(db, 'products', productId));
        await loadProducts();
        alert('Ürün silindi!');
    } catch (error) {
        console.error('Ürün silinirken hata:', error);
        alert('Bir hata oluştu!');
    }
}

// Helper Functions
function getCategoryName(category) {
    const categories = {
        forma: 'Forma',
        esofman: 'Eşofman',
        aksesuar: 'Aksesuar',
        ayakkabi: 'Ayakkabı'
    };
    return categories[category] || category;
}

// Navigation
function navigateTo(page) {
    if (page === 'admin' && !isAdmin) {
        showAdminLogin();
        return;
    }
    
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    
    if (page === 'admin') {
        displayAdminProducts();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Admin Section Toggle
function showAdminSection(section) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.admin-tab-btn').classList.add('active');
    
    document.querySelectorAll('.admin-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('admin-' + section).classList.add('active');
}

// Modals
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Cart Storage
function saveCartToStorage() {
    localStorage.setItem('shopCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('shopCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Global functions
window.navigateTo = navigateTo;
window.filterProducts = filterProducts;
window.showProductDetail = showProductDetail;
window.selectSize = selectSize;
window.addToCart = addToCart;
window.addToCartFromDetail = addToCartFromDetail;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.checkout = checkout;
window.sendToWhatsApp = sendToWhatsApp;
window.showAdminSection = showAdminSection;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.closeModal = closeModal;
window.showAdminLogin = showAdminLogin;