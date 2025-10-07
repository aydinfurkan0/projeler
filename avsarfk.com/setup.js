// setup.js - AVŞARSPOR Tam Kurulum Scripti
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// ---------------------------
// 1️⃣ Firebase Admin Setup
// ---------------------------
const serviceAccountPath = path.resolve('./avsarsporfk.json');
if (!fs.existsSync(serviceAccountPath)) {
    console.error('❌ avsarsporfk.json dosyası bulunamadı!');
    console.log('💡 Firebase Console -> Project Settings -> Service Accounts -> Generate New Private Key');
    process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ---------------------------
// 2️⃣ Ana Site JSON Dosyaları
// ---------------------------
const mainSiteFiles = {
    'players.json': 'players',
    'news.json': 'news',
    'fixtures.json': 'fixtures',
    'gallery.json': 'gallery',
    'members.json': 'members'
};

async function uploadMainSite() {
    console.log('🏟️  ANA SİTE VERİLERİ YÜKLENİYOR...\n');
    
    for (const [fileName, collectionName] of Object.entries(mainSiteFiles)) {
        const filePath = path.resolve(`./data/${fileName}`);
        
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  Atlandı: ${fileName} bulunamadı`);
            continue;
        }

        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        if (!Array.isArray(fileData) || fileData.length === 0) {
            console.log(`⚠️  Atlandı: ${fileName} boş veya geçersiz`);
            continue;
        }

        console.log(`📂 ${collectionName.toUpperCase()} koleksiyonu yükleniyor...`);

        for (const docData of fileData) {
            try {
                await db.collection(collectionName).add(docData);
                const displayName = docData.name || docData.title || docData.caption || 'Veri';
                console.log(`   ✅ ${displayName}`);
            } catch (error) {
                console.error(`   ❌ Hata:`, error.message);
            }
        }
        console.log('');
    }
}

// ---------------------------
// 3️⃣ Mağaza Ürünleri
// ---------------------------
async function uploadProducts() {
    console.log('🛍️  MAĞAZA ÜRÜNLERİ YÜKLENİYOR...\n');
    
    const productsPath = path.resolve('./data/products.json');
    
    if (!fs.existsSync(productsPath)) {
        console.log('⚠️  products.json bulunamadı!\n');
        return;
    }

    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    
    if (!Array.isArray(products) || products.length === 0) {
        console.log('⚠️  products.json boş veya geçersiz!\n');
        return;
    }

    console.log('📦 PRODUCTS koleksiyonu yükleniyor...');
    
    for (const product of products) {
        try {
            await db.collection('products').add(product);
            console.log(`   ✅ ${product.name} - ${product.price} ₺`);
        } catch (error) {
            console.error(`   ❌ ${product.name} - Hata:`, error.message);
        }
    }
    console.log('');
}

// ---------------------------
// 4️⃣ Ödeme Ayarları
// ---------------------------
async function uploadPaymentSettings() {
    console.log('💳 ÖDEME AYARLARI YÜKLENİYOR...\n');
    
    const settingsPath = path.resolve('./data/payment-settings.json');
    
    if (!fs.existsSync(settingsPath)) {
        console.log('⚠️  payment-settings.json bulunamadı!\n');
        return;
    }

    const paymentSettings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    
    console.log('💰 SETTINGS/PAYMENT dökümanı oluşturuluyor...');
    
    try {
        await db.collection('settings').doc('payment').set(paymentSettings);
        console.log('   ✅ Ödeme ayarları eklendi');
        console.log(`   📌 Banka: ${paymentSettings.bankName}`);
        console.log(`   📌 IBAN: ${paymentSettings.iban}`);
        console.log(`   📌 WhatsApp: ${paymentSettings.whatsappNumber}`);
        console.log('   ⚠️  UYARI: Admin panelinden gerçek bilgileri güncelleyin!\n');
    } catch (error) {
        console.error('   ❌ Ödeme ayarları eklenirken hata:', error.message);
    }
}

// ---------------------------
// 5️⃣ Ana Çalıştırma
// ---------------------------
async function setupAll() {
    console.clear();
    console.log('═══════════════════════════════════════════════════════════');
    console.log('          🔥 AVŞARSPOR FIRESTORE KURULUM 🔥');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    try {
        // Ana site
        await uploadMainSite();
        
        // Mağaza ürünleri
        await uploadProducts();
        
        // Ödeme ayarları
        await uploadPaymentSettings();
        
        console.log('═══════════════════════════════════════════════════════════');
        console.log('✅ KURULUM TAMAMLANDI!');
        console.log('═══════════════════════════════════════════════════════════\n');
        
        console.log('📊 YÜKLENEN KOLEKSİYONLAR:');
        console.log('   • players          → Oyuncular');
        console.log('   • news             → Haberler');
        console.log('   • fixtures         → Fikstür');
        console.log('   • gallery          → Galeri');
        console.log('   • members          → Üyeler');
        console.log('   • products         → Mağaza Ürünleri');
        console.log('   • settings/payment → Ödeme Bilgileri\n');
        
        console.log('🔐 ADMİN GİRİŞ BİLGİLERİ:');
        console.log('   📌 Ana Site Admin    : furkan / furkan');
        console.log('   📌 Mağaza Admin      : furkan / furkan\n');
        
        console.log('⚠️  YAPILMASI GEREKENLER:');
        console.log('   1. Mağaza admin paneline gir (footer logosu)');
        console.log('   2. "Ödeme Bilgileri" sekmesine tıkla');
        console.log('   3. Gerçek IBAN, Banka ve WhatsApp bilgilerini gir');
        console.log('   4. Kaydet\n');
        
        console.log('🎉 Siteniz kullanıma hazır!\n');
        
        process.exit(0);
    } catch (error) {
        console.error('\n❌ KURULUM SIRASINDA HATA:', error);
        process.exit(1);
    }
}

// Çalıştır
setupAll();