// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSR034xiY-S7Eulyv_X9FSFJf0b41q1zU",
  authDomain: "metropoldogalgaz-fcdb0.firebaseapp.com",
  projectId: "metropoldogalgaz-fcdb0",
  storageBucket: "metropoldogalgaz-fcdb0.firebasestorage.app",
  messagingSenderId: "96877532918",
  appId: "1:96877532918:web:41c28010ad99cce3bf7ed7",
  measurementId: "G-1RZFYWE25F",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// State Management
let projects = [];
let products = [];
let editingProjectId = null;
let editingProductId = null;
let isLoggedIn = false;
let partners = [];
let references = [];
let editingPartnerId = null;
let editingReferenceId = null;

// Navigation Functions
window.navigateTo = function (page) {
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("aboutPage").classList.add("hidden");
  document.getElementById("projectsPage").classList.add("hidden");
  document.getElementById("productsPage").classList.add("hidden");
  document.getElementById("contactPage").classList.add("hidden");
  document.getElementById('partnersPage').classList.add('hidden');
  document.getElementById('referencesPage').classList.add('hidden');

  if (page === "home") {
    document.getElementById("homePage").classList.remove("hidden");
  } else if (page === "about") {
    document.getElementById("aboutPage").classList.remove("hidden");
  } else if (page === "projects") {
    document.getElementById("projectsPage").classList.remove("hidden");
    loadProjects();
  } else if (page === "products") {
    document.getElementById("productsPage").classList.remove("hidden");
    loadProducts();
  } else if (page === "contact") {
    document.getElementById("contactPage").classList.remove("hidden");
  }
  else if (page === 'partners') {
  document.getElementById('partnersPage').classList.remove('hidden');
  loadPartnersPage();
} else if (page === 'references') {
  document.getElementById('referencesPage').classList.remove('hidden');
  loadReferencesPage();
}

  window.scrollTo({ top: 0, behavior: "smooth" });

  // Close mobile menu if open
  const mobileMenu = document.querySelector(".mobile-menu");
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.querySelector(".menu-overlay");
  if (mobileMenu.classList.contains("active")) {
    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
  }
};

window.smoothScroll = function (id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

window.toggleMenu = function () {
  const mobileMenu = document.querySelector(".mobile-menu");
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.querySelector(".menu-overlay");

  mobileMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Login Functions
window.openLoginModal = function () {
  document.getElementById("loginModal").classList.add("active");
};

window.closeLoginModal = function () {
  document.getElementById("loginModal").classList.remove("active");
  document.getElementById("loginForm").reset();
};

window.handleLogin = function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "furkan" && password === "furkan") {
    isLoggedIn = true;
    closeLoginModal();
    openAdminPanel();
  } else {
    alert("Kullanıcı adı veya şifre hatalı!");
  }
};

// Admin Panel Functions
window.openAdminPanel = function () {
  if (!isLoggedIn) {
    openLoginModal();
    return;
  }
  document.getElementById("adminPanel").style.display = "block";
  document.body.style.overflow = "hidden";
  loadProjectsAdmin();
  loadProductsAdmin();
  loadPartnersAdmin();
  loadReferencesAdmin();
};

window.closeAdminPanel = function () {
  document.getElementById("adminPanel").style.display = "none";
  document.body.style.overflow = "auto";
  editingProjectId = null;
  editingProductId = null;
  document.getElementById("projectForm").reset();
  document.getElementById("productForm").reset();
  editingPartnerId = null;
  editingReferenceId = null;
  document.getElementById('partnerForm').reset();
  document.getElementById('referenceForm').reset();
};

window.switchTab = function (tab) {
  document
    .querySelectorAll(".admin-tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));

  event.target.classList.add("active");
  document.getElementById(tab + "Tab").classList.add("active");
};

window.toggleImageInput = function () {
  const method = document.getElementById("imageMethod").value;
  const urlGroup = document.getElementById("imageUrlGroup");
  const fileGroup = document.getElementById("imageFileGroup");
  const urlInput = document.getElementById("productImageUrl");
  const fileInput = document.getElementById("productImageFile");

  if (method === "url") {
    urlGroup.classList.remove("hidden");
    fileGroup.classList.add("hidden");
    urlInput.required = true;
    fileInput.required = false;
  } else {
    urlGroup.classList.add("hidden");
    fileGroup.classList.remove("hidden");
    urlInput.required = false;
    fileInput.required = true;
  }
};

window.togglePartnerImageInput = function () {
  const method = document.getElementById('partnerImageMethod').value;
  const urlGroup = document.getElementById('partnerImageUrlGroup');
  const fileGroup = document.getElementById('partnerImageFileGroup');
  const urlInput = document.getElementById('partnerImageUrl');
  const fileInput = document.getElementById('partnerImageFile');

  if (method === 'url') {
    urlGroup.classList.remove('hidden');
    fileGroup.classList.add('hidden');
    urlInput.required = true;
    fileInput.required = false;
  } else {
    urlGroup.classList.add('hidden');
    fileGroup.classList.remove('hidden');
    urlInput.required = false;
    fileInput.required = true;
  }
};

window.toggleReferenceImageInput = function () {
  const method = document.getElementById('referenceImageMethod').value;
  const urlGroup = document.getElementById('referenceImageUrlGroup');
  const fileGroup = document.getElementById('referenceImageFileGroup');
  const urlInput = document.getElementById('referenceImageUrl');
  const fileInput = document.getElementById('referenceImageFile');

  if (method === 'url') {
    urlGroup.classList.remove('hidden');
    fileGroup.classList.add('hidden');
    urlInput.required = true;
    fileInput.required = false;
  } else {
    urlGroup.classList.add('hidden');
    fileGroup.classList.remove('hidden');
    urlInput.required = false;
    fileInput.required = true;
  }
};

// Projects Functions
async function loadProjects() {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    displayProjects();
  } catch (error) {
    console.error("Projeler yüklenemedi:", error);
  }
}

async function loadProjectsAdmin() {
  await loadProjects();
  displayProjectsList();
}

function displayProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";

  if (projects.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
          <i class="fas fa-folder-open"></i>
          <p>Henüz proje eklenmemiş.</p>
      </div>
  `;
    return;
  }

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "content-card";

    // YouTube URL'sini düzgün embed formatına çevir
    let embedUrl = project.videoUrl;
    if (project.videoUrl.includes("youtube.com/watch?v=")) {
      const videoId = project.videoUrl.split("v=")[1].split("&")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (project.videoUrl.includes("youtu.be/")) {
      const videoId = project.videoUrl
        .split("youtu.be/")[1]
        .split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (!project.videoUrl.includes("youtube.com/embed/")) {
      console.warn("Geçersiz YouTube URL formatı:", project.videoUrl);
    }

    card.innerHTML = `
      <iframe class="content-media" 
              src="${embedUrl}" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen
              loading="lazy"></iframe>
      <div class="content-info">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
      </div>
  `;
    grid.appendChild(card);
  });
}

function displayProjectsList() {
  const list = document.getElementById("projectsList");
  list.innerHTML = "";

  if (projects.length === 0) {
    list.innerHTML = `
              <div class="empty-state">
                  <i class="fas fa-folder-open"></i>
                  <p>Henüz proje eklenmemiş.</p>
              </div>
          `;
    return;
  }

  projects.forEach((project) => {
    const item = document.createElement("div");
    item.className = "admin-item";
    item.innerHTML = `
              <div class="admin-item-info">
                  <strong>${project.name}</strong>
                  <p>${project.description}</p>
              </div>
              <div class="admin-item-actions">
                  <button class="btn btn-primary" onclick="editProject('${project.id}')">
                      <i class="fas fa-edit"></i> Düzenle
                  </button>
                  <button class="btn btn-danger" onclick="deleteProject('${project.id}')">
                      <i class="fas fa-trash"></i> Sil
                  </button>
              </div>
          `;
    list.appendChild(item);
  });
}

window.handleProjectSubmit = async function (event) {
  event.preventDefault();

  const name = document.getElementById("projectName").value;
  const description = document.getElementById("projectDesc").value;
  const videoUrl = document.getElementById("projectVideo").value;

  try {
    if (editingProjectId) {
      await updateDoc(doc(db, "projects", editingProjectId), {
        name,
        description,
        videoUrl,
        updatedAt: new Date(),
      });
      editingProjectId = null;
      alert("✓ Proje başarıyla güncellendi!");
    } else {
      await addDoc(collection(db, "projects"), {
        name,
        description,
        videoUrl,
        createdAt: new Date(),
      });
      alert("✓ Proje başarıyla eklendi!");
    }

    document.getElementById("projectForm").reset();
    loadProjectsAdmin();
  } catch (error) {
    console.error("Hata:", error);
    alert("✗ Bir hata oluştu: " + error.message);
  }
};

window.editProject = function (id) {
  const project = projects.find((p) => p.id === id);
  if (project) {
    document.getElementById("projectName").value = project.name;
    document.getElementById("projectDesc").value = project.description;
    document.getElementById("projectVideo").value = project.videoUrl;
    editingProjectId = id;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

window.deleteProject = async function (id) {
  if (confirm("Bu projeyi silmek istediğinizden emin misiniz?")) {
    try {
      await deleteDoc(doc(db, "projects", id));
      alert("✓ Proje başarıyla silindi!");
      loadProjectsAdmin();
    } catch (error) {
      console.error("Hata:", error);
      alert("✗ Proje silinirken bir hata oluştu.");
    }
  }
};

// Products Functions
async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    displayProducts();
  } catch (error) {
    console.error("Ürünler yüklenemedi:", error);
  }
}

async function loadProductsAdmin() {
  await loadProducts();
  displayProductsList();
}

function displayProducts() {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  if (products.length === 0) {
    grid.innerHTML = `
              <div class="empty-state" style="grid-column: 1/-1;">
                  <i class="fas fa-box-open"></i>
                  <p>Henüz ürün eklenmemiş.</p>
              </div>
          `;
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "content-card";
    card.onclick = () => openProductModal(product);
    card.innerHTML = `
              <img class="content-media" src="${product.imageUrl}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400'">
              <div class="content-info">
                  <h3>${product.name}</h3>
                  <p>${product.description}</p>
              </div>
          `;
    grid.appendChild(card);
  });
}

function displayProductsList() {
  const list = document.getElementById("productsList");
  list.innerHTML = "";

  if (products.length === 0) {
    list.innerHTML = `
              <div class="empty-state">
                  <i class="fas fa-box-open"></i>
                  <p>Henüz ürün eklenmemiş.</p>
              </div>
          `;
    return;
  }

  products.forEach((product) => {
    const item = document.createElement("div");
    item.className = "admin-item";
    item.innerHTML = `
              <div class="admin-item-info">
                  <strong>${product.name}</strong>
                  <p>${product.description}</p>
              </div>
              <div class="admin-item-actions">
                  <button class="btn btn-primary" onclick="editProduct('${product.id}')">
                      <i class="fas fa-edit"></i> Düzenle
                  </button>
                  <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">
                      <i class="fas fa-trash"></i> Sil
                  </button>
              </div>
          `;
    list.appendChild(item);
  });
}

window.openProductModal = function (product) {
  document.getElementById("modalImage").src = product.imageUrl;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalDescription").textContent =
    product.description;

  const featuresDiv = document.getElementById("modalFeatures");
  featuresDiv.innerHTML = `
  <h3>Teknik Özellikler</h3>
  <table class="features-table">
      <tbody>
          ${product.features
            .map(
              (f) => `
              <tr>
                  <td class="feature-icon"><i class="fas fa-check-circle"></i></td>
                  <td class="feature-text">${f}</td>
              </tr>
          `
            )
            .join("")}
      </tbody>
  </table>
`;

  document.getElementById("productModal").classList.add("active");
};

window.closeModal = function () {
  document.getElementById("productModal").classList.remove("active");
};

window.handleProductSubmit = async function (event) {
  event.preventDefault();

  const name = document.getElementById("productName").value;
  const description = document.getElementById("productDesc").value;
  const features = document
    .getElementById("productFeatures")
    .value.split("\n")
    .filter((f) => f.trim());
  const method = document.getElementById("imageMethod").value;

  try {
    let imageUrl;

    if (method === "url") {
      imageUrl = document.getElementById("productImageUrl").value;
      if (!imageUrl) {
        alert("Lütfen bir görsel URL'si girin.");
        return;
      }
    } else {
      const file = document.getElementById("productImageFile").files[0];
      if (!file) {
        alert("Lütfen bir görsel dosyası seçin.");
        return;
      }
      const storageRef = ref(
        storage,
        `products/${Date.now()}_${file.name}`
      );
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    }

    if (editingProductId) {
      await updateDoc(doc(db, "products", editingProductId), {
        name,
        description,
        features,
        imageUrl,
        updatedAt: new Date(),
      });
      editingProductId = null;
      alert("✓ Ürün başarıyla güncellendi!");
    } else {
      await addDoc(collection(db, "products"), {
        name,
        description,
        features,
        imageUrl,
        createdAt: new Date(),
      });
      alert("✓ Ürün başarıyla eklendi!");
    }

    document.getElementById("productForm").reset();
    document.getElementById("imageMethod").value = "url";
    toggleImageInput();
    loadProductsAdmin();
  } catch (error) {
    console.error("Hata:", error);
    alert("✗ Bir hata oluştu: " + error.message);
  }
};

window.editProduct = function (id) {
  const product = products.find((p) => p.id === id);
  if (product) {
    document.getElementById("productName").value = product.name;
    document.getElementById("productDesc").value = product.description;
    document.getElementById("productFeatures").value =
      product.features.join("\n");
    document.getElementById("imageMethod").value = "url";
    document.getElementById("productImageUrl").value = product.imageUrl;
    toggleImageInput();
    editingProductId = id;
    switchTab("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

window.deleteProduct = async function (id) {
  if (confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
    try {
      await deleteDoc(doc(db, "products", id));
      alert("✓ Ürün başarıyla silindi!");
      loadProductsAdmin();
    } catch (error) {
      console.error("Hata:", error);
      alert("✗ Ürün silinirken bir hata oluştu.");
    }
  }
};

// Partners Functions
async function loadPartners() {
  try {
    const querySnapshot = await getDocs(collection(db, 'partners'));
    partners = [];
    querySnapshot.forEach((doc) => {
      partners.push({ id: doc.id, ...doc.data() });
    });
    displayPartnersHome();
  } catch (error) {
    console.error('İş ortakları yüklenemedi:', error);
  }
}

async function loadPartnersAdmin() {
  await loadPartners();
  displayPartnersList();
}

async function loadPartnersPage() {
  await loadPartners();
  displayPartnersFullPage();
}

function displayPartnersHome() {
  const grid = document.getElementById('partnersGrid');
  
  if (!grid) {
    console.error('partnersGrid elementi bulunamadı!');
    return;
  }
  
  grid.innerHTML = '';

  if (partners.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-handshake"></i>
        <p>Henüz iş ortağı eklenmemiş.</p>
      </div>
    `;
    return;
  }

  partners.forEach((partner) => {
    const item = document.createElement('div');
    item.className = 'partner-item';
    item.onclick = () => openPartnerModal(partner.id);
    item.innerHTML = `
      <img src="${partner.logoUrl}" alt="${partner.name}" onerror="this.src='https://via.placeholder.com/200x200?text=${encodeURIComponent(partner.name)}'">
    `;
    grid.appendChild(item);
  });
  
  console.log('✅ Partners yüklendi:', partners.length, 'adet');
}

function displayPartnersFullPage() {
  const grid = document.getElementById('partnersPageGrid');
  grid.innerHTML = '';

  if (partners.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-handshake"></i>
        <p>Henüz iş ortağı eklenmemiş.</p>
      </div>
    `;
    return;
  }

  partners.forEach((partner) => {
    const card = document.createElement('div');
    card.className = 'content-card';
    card.onclick = () => openPartnerModal(partner.id);
    card.style.cursor = 'pointer';
    card.innerHTML = `
      <div class="partner-logo-full">
        <img src="${partner.logoUrl}" alt="${partner.name}" onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(partner.name)}'">
      </div>
      <div class="content-info">
        <h3>${partner.name}</h3>
        <p>${partner.description || 'Güvenilir iş ortağımız'}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}
function displayPartnersList() {
  const list = document.getElementById('partnersList');
  list.innerHTML = '';

  if (partners.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-handshake"></i>
        <p>Henüz iş ortağı eklenmemiş.</p>
      </div>
    `;
    return;
  }

  partners.forEach((partner) => {
    const item = document.createElement('div');
    item.className = 'admin-item';
    item.innerHTML = `
      <div class="admin-item-info">
        <strong>${partner.name}</strong>
        <p>${partner.description || 'Açıklama yok'}</p>
      </div>
      <div class="admin-item-actions">
        <button class="btn btn-primary" onclick="editPartner('${partner.id}')">
          <i class="fas fa-edit"></i> Düzenle
        </button>
        <button class="btn btn-danger" onclick="deletePartner('${partner.id}')">
          <i class="fas fa-trash"></i> Sil
        </button>
      </div>
    `;
    list.appendChild(item);
  });
}

window.handlePartnerSubmit = async function (event) {
  event.preventDefault();

  const name = document.getElementById('partnerName').value;
  const description = document.getElementById('partnerDesc').value;
  const method = document.getElementById('partnerImageMethod').value;

  try {
    let logoUrl;

    if (method === 'url') {
      logoUrl = document.getElementById('partnerImageUrl').value;
      if (!logoUrl) {
        alert('Lütfen bir logo URL\'si girin.');
        return;
      }
    } else {
      const file = document.getElementById('partnerImageFile').files[0];
      if (!file) {
        alert('Lütfen bir logo dosyası seçin.');
        return;
      }
      const storageRef = ref(storage, `partners/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      logoUrl = await getDownloadURL(storageRef);
    }

    if (editingPartnerId) {
      await updateDoc(doc(db, 'partners', editingPartnerId), {
        name,
        description,
        logoUrl,
        updatedAt: new Date(),
      });
      editingPartnerId = null;
      alert('✓ İş ortağı başarıyla güncellendi!');
    } else {
      await addDoc(collection(db, 'partners'), {
        name,
        description,
        logoUrl,
        createdAt: new Date(),
      });
      alert('✓ İş ortağı başarıyla eklendi!');
    }

    document.getElementById('partnerForm').reset();
    document.getElementById('partnerImageMethod').value = 'url';
    togglePartnerImageInput();
    loadPartnersAdmin();
  } catch (error) {
    console.error('Hata:', error);
    alert('✗ Bir hata oluştu: ' + error.message);
  }
};

window.editPartner = function (id) {
  const partner = partners.find((p) => p.id === id);
  if (partner) {
    document.getElementById('partnerName').value = partner.name;
    document.getElementById('partnerDesc').value = partner.description || '';
    document.getElementById('partnerImageMethod').value = 'url';
    document.getElementById('partnerImageUrl').value = partner.logoUrl;
    togglePartnerImageInput();
    editingPartnerId = id;
    switchTab('partners');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.deletePartner = async function (id) {
  if (confirm('Bu iş ortağını silmek istediğinizden emin misiniz?')) {
    try {
      await deleteDoc(doc(db, 'partners', id));
      alert('✓ İş ortağı başarıyla silindi!');
      loadPartnersAdmin();
    } catch (error) {
      console.error('Hata:', error);
      alert('✗ İş ortağı silinirken bir hata oluştu.');
    }
  }
};

// References Functions
async function loadReferences() {
  try {
    const querySnapshot = await getDocs(collection(db, 'references'));
    references = [];
    querySnapshot.forEach((doc) => {
      references.push({ id: doc.id, ...doc.data() });
    });
    displayReferencesHome();
  } catch (error) {
    console.error('Referanslar yüklenemedi:', error);
  }
}

async function loadReferencesAdmin() {
  await loadReferences();
  displayReferencesList();
}

async function loadReferencesPage() {
  await loadReferences();
  displayReferencesFullPage();
}

function displayReferencesHome() {
  const sliderRight = document.getElementById('sliderTrackRight');
  const sliderLeft = document.getElementById('sliderTrackLeft');
  
  sliderRight.innerHTML = '';
  sliderLeft.innerHTML = '';

  if (references.length === 0) {
    sliderRight.innerHTML = `
      <div class="empty-state" style="padding: 4rem;">
        <i class="fas fa-star"></i>
        <p>Henüz referans eklenmemiş.</p>
      </div>
    `;
    return;
  }

  // Her iki slider için de aynı referansları ekle
  const createReferenceItems = () => {
    return references.map(ref => `
      <div class="reference-item" onclick="openReferenceModal('${ref.id}')">
        <div class="reference-logo-container">
          <img src="${ref.logoUrl}" alt="${ref.name}" onerror="this.src='https://via.placeholder.com/200x150?text=${ref.name}'">
        </div>
        <h3>${ref.name}</h3>
        <p>${ref.description}</p>
      </div>
    `).join('');
  };

  // Her slider için içeriği iki kez ekle (sonsuz döngü için)
  const items = createReferenceItems();
  sliderRight.innerHTML = items + items;
  sliderLeft.innerHTML = items + items;
}

function displayReferencesFullPage() {
  const grid = document.getElementById('referencesPageGrid');
  grid.innerHTML = '';

  if (references.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-star"></i>
        <p>Henüz referans eklenmemiş.</p>
      </div>
    `;
    return;
  }

  references.forEach((reference) => {
    const card = document.createElement('div');
    card.className = 'content-card';
    card.onclick = () => openReferenceModal(reference.id);
    card.innerHTML = `
      <div class="reference-logo-container">
        <img src="${reference.logoUrl}" alt="${reference.name}" onerror="this.src='https://via.placeholder.com/400x300?text=${reference.name}'">
      </div>
      <div class="content-info">
        <h3>${reference.name}</h3>
        <p>${reference.description}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function displayReferencesList() {
  const list = document.getElementById('referencesList');
  list.innerHTML = '';

  if (references.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-star"></i>
        <p>Henüz referans eklenmemiş.</p>
      </div>
    `;
    return;
  }

  references.forEach((reference) => {
    const item = document.createElement('div');
    item.className = 'admin-item';
    item.innerHTML = `
      <div class="admin-item-info">
        <strong>${reference.name}</strong>
        <p>${reference.description}</p>
      </div>
      <div class="admin-item-actions">
        <button class="btn btn-primary" onclick="editReference('${reference.id}')">
          <i class="fas fa-edit"></i> Düzenle
        </button>
        <button class="btn btn-danger" onclick="deleteReference('${reference.id}')">
          <i class="fas fa-trash"></i> Sil
        </button>
      </div>
    `;
    list.appendChild(item);
  });
}

// Partner Modal Functions
window.openPartnerModal = function (id) {
  const partner = partners.find((p) => p.id === id);
  if (partner) {
    document.getElementById('partnerModalLogo').src = partner.logoUrl;
    document.getElementById('partnerModalTitle').textContent = partner.name;
    document.getElementById('partnerModalDescription').textContent = partner.description || 'Güvenilir iş ortağımız';
    document.getElementById('partnerModal').classList.add('active');
  }
};

window.closePartnerModal = function () {
  document.getElementById('partnerModal').classList.remove('active');
};

window.openReferenceModal = function (id) {
  const reference = references.find((r) => r.id === id);
  if (reference) {
    document.getElementById('referenceModalLogo').src = reference.logoUrl;
    document.getElementById('referenceModalTitle').textContent = reference.name;
    document.getElementById('referenceModalDescription').textContent = reference.description;
    document.getElementById('referenceModal').classList.add('active');
  }
};

window.closeReferenceModal = function () {
  document.getElementById('referenceModal').classList.remove('active');
};

window.handleReferenceSubmit = async function (event) {
  event.preventDefault();

  const name = document.getElementById('referenceName').value;
  const description = document.getElementById('referenceDesc').value;
  const method = document.getElementById('referenceImageMethod').value;

  try {
    let logoUrl;

    if (method === 'url') {
      logoUrl = document.getElementById('referenceImageUrl').value;
      if (!logoUrl) {
        alert('Lütfen bir logo URL\'si girin.');
        return;
      }
    } else {
      const file = document.getElementById('referenceImageFile').files[0];
      if (!file) {
        alert('Lütfen bir logo dosyası seçin.');
        return;
      }
      const storageRef = ref(storage, `references/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      logoUrl = await getDownloadURL(storageRef);
    }

    if (editingReferenceId) {
      await updateDoc(doc(db, 'references', editingReferenceId), {
        name,
        description,
        logoUrl,
        updatedAt: new Date(),
      });
      editingReferenceId = null;
      alert('✓ Referans başarıyla güncellendi!');
    } else {
      await addDoc(collection(db, 'references'), {
        name,
        description,
        logoUrl,
        createdAt: new Date(),
      });
      alert('✓ Referans başarıyla eklendi!');
    }

    document.getElementById('referenceForm').reset();
    document.getElementById('referenceImageMethod').value = 'url';
    toggleReferenceImageInput();
    loadReferencesAdmin();
  } catch (error) {
    console.error('Hata:', error);
    alert('✗ Bir hata oluştu: ' + error.message);
  }
};

window.editReference = function (id) {
  const reference = references.find((r) => r.id === id);
  if (reference) {
    document.getElementById('referenceName').value = reference.name;
    document.getElementById('referenceDesc').value = reference.description;
    document.getElementById('referenceImageMethod').value = 'url';
    document.getElementById('referenceImageUrl').value = reference.logoUrl;
    toggleReferenceImageInput();
    editingReferenceId = id;
    switchTab('references');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.deleteReference = async function (id) {
  if (confirm('Bu referansı silmek istediğinizden emin misiniz?')) {
    try {
      await deleteDoc(doc(db, 'references', id));
      alert('✓ Referans başarıyla silindi!');
      loadReferencesAdmin();
    } catch (error) {
      console.error('Hata:', error);
      alert('✗ Referans silinirken bir hata oluştu.');
    }
  }
};

// Initial Load
  loadProjects();
  loadProducts();
  loadPartners();
  loadReferences();