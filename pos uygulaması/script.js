// Global Variables
const socket = io('http://localhost:1999');
let cart = [];
let products = [];
let customers = [];
let paymentMethod = 'cash';
let currentDiscount = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
  products = await fetchProducts();
  customers = await fetchCustomers();
  loadProducts();
  loadProductsTable();
  loadCustomersTable();
  updateLowStockAlert();
  loadCustomerOptions();

  // Socket listeners
  socket.on('product-added', (newProduct) => {
    products.push(newProduct);
    loadProducts();
    loadProductsTable();
    updateLowStockAlert();
  });

  socket.on('product-updated', (updatedProduct) => {
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      loadProducts();
      loadProductsTable();
      updateLowStockAlert();
    }
  });

  socket.on('product-deleted', (id) => {
    products = products.filter(p => p.id !== id);
    loadProducts();
    loadProductsTable();
    updateLowStockAlert();
  });

  socket.on('customer-added', (newCustomer) => {
    customers.push(newCustomer);
    loadCustomersTable();
    loadCustomerOptions();
  });

  socket.on('customer-updated', (updatedCustomer) => {
    const index = customers.findIndex(c => c.id === updatedCustomer.id);
    if (index !== -1) {
      customers[index] = updatedCustomer;
      loadCustomersTable();
      loadCustomerOptions();
    }
  });

  socket.on('customer-deleted', (id) => {
    customers = customers.filter(c => c.id !== id);
    loadCustomersTable();
    loadCustomerOptions();
  });
});

// Fetch functions
// Fetch functions
async function fetchProducts() {
  try {
    const res = await fetch('http://localhost:1999/products');
    if (!res.ok) {
      throw new Error('Ürünler yüklenemedi: ' + res.status);
    }
    return await res.json();
  } catch (error) {
    console.error('Ürünler yüklenirken hata:', error);
    alert('Sunucu bağlantı hatası: Ürünler yüklenemedi. Lütfen server ı kontrol edin ve yeniden deneyin.');
    return [];
  }
}

async function fetchCustomers() {
  try {
    const res = await fetch('http://localhost:1999/customers');
    if (!res.ok) {
      throw new Error('Müşteriler yüklenemedi: ' + res.status);
    }
    return await res.json();
  } catch (error) {
    console.error('Müşteriler yüklenirken hata:', error);
    alert('Sunucu bağlantı hatası: Müşteriler yüklenemedi. Lütfen server ı kontrol edin ve yeniden deneyin.');
    return [];
  }
}

// Sidebar Functions
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('collapsed');
  
  const toggleBtn = document.querySelector('.sidebar-toggle');
  if (sidebar.classList.contains('collapsed')) {
    toggleBtn.innerHTML = '›';
  } else {
    toggleBtn.innerHTML = '‹';
  }
}

function showSection(sectionName) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('active');
  });
  
  document.getElementById(sectionName).classList.add('active');
  
  event.currentTarget.classList.add('active');
  
  const titles = {
    'dashboard': 'Ana Sayfa',
    'sales': 'Satış',
    'products': 'Ürün Yönetimi',
    'customers': 'Müşteri Yönetimi',
    'employees': 'Çalışan Yönetimi',
    'tables': 'Masa Yönetimi',
    'discounts': 'İndirim & Kampanya',
    'reports': 'Raporlar',
    'cash': 'Kasa Yönetimi',
    'settings': 'Ayarlar'
  };
  document.getElementById('page-title').textContent = titles[sectionName];
}

// Product Functions
function loadProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  
  products.forEach(product => {
    const stockClass = product.stock > product.minStock ? 'high' : 
                     product.stock > 0 ? 'medium' : 'low';
    
    const productCard = document.createElement('div');
    productCard.className = `product-card ${product.stock === 0 ? 'out-of-stock' : ''}`;
    productCard.onclick = () => addToCart(product);
    
    productCard.innerHTML = `
        <h4>${product.name}</h4>
        <div class="category">${product.category}</div>
        <div class="price">${product.price.toFixed(2)}₺</div>
        <div class="stock ${stockClass}">Stok: ${product.stock}</div>
    `;
    
    grid.appendChild(productCard);
  });
}

function filterProducts() {
  const searchTerm = document.getElementById('productSearch').value.toLowerCase();
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.barcode.includes(searchTerm)
  );
  
  filteredProducts.forEach(product => {
    const stockClass = product.stock > product.minStock ? 'high' : 
                     product.stock > 0 ? 'medium' : 'low';
    
    const productCard = document.createElement('div');
    productCard.className = `product-card ${product.stock === 0 ? 'out-of-stock' : ''}`;
    productCard.onclick = () => addToCart(product);
    
    productCard.innerHTML = `
        <h4>${product.name}</h4>
        <div class="category">${product.category}</div>
        <div class="price">${product.price.toFixed(2)}₺</div>
        <div class="stock ${stockClass}">Stok: ${product.stock}</div>
    `;
    
    grid.appendChild(productCard);
  });
}

function handleBarcodeEnter(event) {
  if (event.key === 'Enter') {
    searchByBarcode();
  }
}

function searchByBarcode() {
  const barcode = document.getElementById('barcodeInput').value.trim();
  if (!barcode) return;
  
  const product = products.find(p => p.barcode === barcode);
  if (product) {
    addToCart(product);
    document.getElementById('barcodeInput').value = '';
    document.getElementById('barcodeInput').focus();
  } else {
    alert('Ürün bulunamadı!');
    document.getElementById('barcodeInput').value = '';
  }
}

// Cart Functions
function addToCart(product) {
  if (product.stock <= 0) {
    alert('Bu ürün stokta yok!');
    return;
  }
  
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    if (existingItem.quantity + 1 > product.stock) {
      alert('Stokta yeterli ürün yok!');
      return;
    }
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCart();
}

function updateCart() {
  const cartContainer = document.getElementById('cartItems');
  
  if (cart.length === 0) {
    cartContainer.innerHTML = '<div style="text-align: center; color: #7f8c8d; padding: 20px;">Sepet boş</div>';
  } else {
    cartContainer.innerHTML = '';
    
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
          <div class="cart-item-info">
              <h5>${item.name}</h5>
              <div class="price">${(item.price * item.quantity).toFixed(2)}₺ (Birim: ${item.price.toFixed(2)}₺)</div>
          </div>
          <div class="quantity-controls">
              <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Sil</button>
      `;
      cartContainer.appendChild(cartItem);
    });
  }
  
  updateTotals();
}

function updateQuantity(productId, newQuantity) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }

  if (newQuantity > product.stock) {
    alert('Stokta yeterli ürün yok!');
    return;
  }
  
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity = newQuantity;
    updateCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

function updateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax - currentDiscount;
  
  document.getElementById('subtotal').textContent = subtotal.toFixed(2) + '₺';
  document.getElementById('tax').textContent = tax.toFixed(2) + '₺';
  document.getElementById('total').textContent = total.toFixed(2) + '₺';
  
  if (currentDiscount > 0) {
    document.getElementById('discountRow').style.display = 'flex';
    document.getElementById('discount').textContent = '-' + currentDiscount.toFixed(2) + '₺';
  } else {
    document.getElementById('discountRow').style.display = 'none';
  }
  
  const checkoutBtn = document.getElementById('checkoutBtn');
  checkoutBtn.disabled = cart.length === 0 || total <= 0;
}

function applyDiscount() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = parseFloat(prompt('İndirim tutarını girin (₺):') || '0');
  if (discount >= 0 && discount <= subtotal) {
    currentDiscount = discount;
    updateTotals();
  } else {
    alert('İndirim tutarı geçersiz veya ara toplamdan fazla!');
  }
}

function selectPaymentMethod(method) {
  paymentMethod = method;
  
  document.getElementById('cashBtn').classList.remove('active');
  document.getElementById('cardBtn').classList.remove('active');
  
  if (method === 'cash') {
    document.getElementById('cashBtn').classList.add('active');
  } else {
    document.getElementById('cardBtn').classList.add('active');
  }
}

async function processPayment() {
  if (cart.length === 0) {
    alert('Sepet boş!');
    return;
  }
  
  const total = parseFloat(document.getElementById('total').textContent.replace('₺', ''));
  if (total <= 0) {
    alert('Toplam tutar geçersiz!');
    return;
  }

  const customerId = document.getElementById('customerSelect').value;
  const tableId = document.getElementById('tableSelect').value;

  if (!tableId) {
    alert('Lütfen bir masa seçin!');
    return;
  }

  if (paymentMethod === 'cash') {
    alert(`KASA AÇILIYOR...\n\nTutar: ${total.toFixed(2)}₺\nÖdeme: Nakit\nMasa: ${tableId}\n\nKasa çekmecesi açıldı!`);
  } else if (paymentMethod === 'card') {
    alert(`POS CİHAZINA TUTAR GÖNDERİLİYOR...\n\nTutar: ${total.toFixed(2)}₺\nÖdeme: Kredi/Banka Kartı\nMasa: ${tableId}\n\nLütfen kartı okutun veya temassız ödemesini yapın.`);
  }
  
  try {
    const response = await fetch('http://localhost:1999/process-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart, paymentMethod, total, customerId: customerId ? parseInt(customerId) : null })
    });

    if (!response.ok) throw new Error('Ödeme işlemi başarısız');
    
    cart = [];
    currentDiscount = 0;
    updateCart();
    
    setTimeout(() => {
      alert('FİŞ YAZDIRILIYOR...\n\nFiş başarıyla yazdırıldı!');
    }, 1500);
  } catch (error) {
    alert('Ödeme sırasında hata oluştu: ' + error.message);
  }
}

// Product Management Functions
function loadProductsTable() {
  const tbody = document.getElementById('productsTable');
  tbody.innerHTML = '';
  
  products.forEach(product => {
    const row = document.createElement('tr');
    const stockClass = product.stock <= product.minStock ? 'low' : 
                     product.stock <= product.minStock * 2 ? 'medium' : 'high';
    
    row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.barcode}</td>
        <td>${product.category}</td>
        <td>${product.price.toFixed(2)}₺</td>
        <td><span class="stock ${stockClass}">${product.stock}</span></td>
        <td>
            <button class="action-btn btn-edit" onclick="editProduct(${product.id})"><i class="fa-solid fa-pencil"></i></button>
            <button class="action-btn btn-delete" onclick="deleteProduct(${product.id})"><i class="fa-solid fa-trash"></i></button>
        </td>
    `;
    tbody.appendChild(row);
  });
}

function showProductModal(editId = null) {
  const modal = document.getElementById('productModal');
  modal.style.display = 'block';
  document.getElementById('productModalTitle').textContent = editId ? 'Ürün Düzenle' : 'Yeni Ürün';
  document.getElementById('productForm').onsubmit = (e) => saveProduct(e, editId);

  if (editId) {
    const product = products.find(p => p.id === editId);
    if (product) {
      document.getElementById('productId').value = product.id;
      document.getElementById('productName').value = product.name;
      document.getElementById('productBarcode').value = product.barcode;
      document.getElementById('productCategory').value = product.category;
      document.getElementById('productPrice').value = product.price;
      document.getElementById('productCost').value = product.cost;
      document.getElementById('productStock').value = product.stock;
      document.getElementById('productMinStock').value = product.minStock;
    }
  } else {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
  }
}

async function saveProduct(e, editId) {
  e.preventDefault();
  const product = {
    name: document.getElementById('productName').value,
    barcode: document.getElementById('productBarcode').value,
    category: document.getElementById('productCategory').value,
    price: parseFloat(document.getElementById('productPrice').value),
    cost: parseFloat(document.getElementById('productCost').value),
    stock: parseInt(document.getElementById('productStock').value),
    minStock: parseInt(document.getElementById('productMinStock').value)
  };

  if (editId) {
    await fetch(`http://localhost:1999/products/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
  } else {
    await fetch('http://localhost:1999/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
  }
  closeModal('productModal');
}

function editProduct(id) {
  showProductModal(id);
}

async function deleteProduct(id) {
  if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
    await fetch(`http://localhost:1999/products/${id}`, { method: 'DELETE' });
  }
}

// Customer Management Functions
function loadCustomersTable() {
  const tbody = document.getElementById('customersTable');
  tbody.innerHTML = '';
  
  customers.forEach(customer => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${customer.name}</td>
        <td>${customer.phone}</td>
        <td>${customer.email}</td>
        <td><span style="background: #3498db; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${customer.points}</span></td>
        <td>${customer.totalSpent.toFixed(2)}₺</td>
        <td>
            <button class="action-btn btn-edit" onclick="editCustomer(${customer.id})"><i class="fa-solid fa-pencil"></i></button>
            <button class="action-btn btn-delete" onclick="deleteCustomer(${customer.id})"><i class="fa-solid fa-trash"></i></button>
        </td>
    `;
    tbody.appendChild(row);
  });
}

function loadCustomerOptions() {
  const select = document.getElementById('customerSelect');
  select.innerHTML = '<option value="">Müşteri Seç</option>';
  customers.forEach(c => {
    const option = document.createElement('option');
    option.value = c.id;
    option.textContent = `${c.name} - ${c.points} puan`;
    select.appendChild(option);
  });
}

function showCustomerModal(editId = null) {
  const modal = document.getElementById('customerModal');
  modal.style.display = 'block';
  document.getElementById('customerModalTitle').textContent = editId ? 'Müşteri Düzenle' : 'Yeni Müşteri';
  document.getElementById('customerForm').onsubmit = (e) => saveCustomer(e, editId);

  if (editId) {
    const customer = customers.find(c => c.id === editId);
    if (customer) {
      document.getElementById('customerId').value = customer.id;
      document.getElementById('customerName').value = customer.name;
      document.getElementById('customerPhone').value = customer.phone;
      document.getElementById('customerEmail').value = customer.email;
      document.getElementById('customerPoints').value = customer.points;
      document.getElementById('customerTotalSpent').value = customer.totalSpent;
      document.getElementById('customerVisits').value = customer.visits;
    }
  } else {
    document.getElementById('customerForm').reset();
    document.getElementById('customerId').value = '';
  }
}

async function saveCustomer(e, editId) {
  e.preventDefault();
  const customer = {
    name: document.getElementById('customerName').value,
    phone: document.getElementById('customerPhone').value,
    email: document.getElementById('customerEmail').value,
    points: parseInt(document.getElementById('customerPoints').value),
    totalSpent: parseFloat(document.getElementById('customerTotalSpent').value),
    visits: parseInt(document.getElementById('customerVisits').value)
  };

  if (editId) {
    await fetch(`http://localhost:1999/customers/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    });
  } else {
    await fetch('http://localhost:1999/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    });
  }
  closeModal('customerModal');
}

function editCustomer(id) {
  showCustomerModal(id);
}

async function deleteCustomer(id) {
  if (confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) {
    await fetch(`http://localhost:1999/customers/${id}`, { method: 'DELETE' });
  }
}

// Utility Functions
function updateLowStockAlert() {
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
  document.getElementById('lowStockAlert').textContent = lowStockCount;
  document.getElementById('lowStockCount').textContent = lowStockCount;
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Auto-focus barcode input when on sales page
document.addEventListener('click', function(e) {
  if (document.getElementById('sales').classList.contains('active')) {
    setTimeout(() => {
      document.getElementById('barcodeInput').focus();
    }, 100);
  }
});