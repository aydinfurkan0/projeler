// Firebase Admin SDK ile veri import scripti
// import-data.js

const admin = require('firebase-admin');
const fs = require('fs');

// Firebase Admin SDK'yı başlat
// serviceAccountKey.json dosyanızı Firebase Console'dan indirmeniz gerekiyor
const serviceAccount = require('./metropol.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Örnek Projeler Verisi
const projects = [
  {
    name: "Çankaya Rezidans Doğalgaz Projesi",
    description: "300 daireli lüks rezidans kompleksinde komple doğalgaz altyapısı kurulumu. Merkezi sistem kurulumu, ısıtma ve sıcak su sistemleri entegrasyonu gerçekleştirildi.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    createdAt: new Date("2025-01-15T10:30:00Z")
  },
  {
    name: "Kızılay AVM Doğalgaz Sistemi",
    description: "5 katlı AVM'de endüstriyel doğalgaz sistemi kurulumu. Enerji verimliliği odaklı akıllı otomasyon sistemleri ile entegre edildi.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    createdAt: new Date("2025-01-10T14:20:00Z")
  },
  {
    name: "Keçiören Hastanesi Doğalgaz Modernizasyonu",
    description: "Hastane binasının eski doğalgaz sisteminin yenilenmesi ve modernizasyonu. Kesintisiz hizmet garantisi ile 7/24 bakım desteği sağlandı.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    createdAt: new Date("2025-01-05T09:15:00Z")
  },
  {
    name: "Eryaman Toplu Konut Projesi",
    description: "500+ daireli toplu konut projesinde doğalgaz altyapısı ve kombi montaj hizmetleri. TSE standartlarında kaliteli işçilik.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    createdAt: new Date("2024-12-28T11:45:00Z")
  },
  {
    name: "Batıkent Plaza Doğalgaz Entegrasyonu",
    description: "İş merkezi kompleksinde doğalgaz sistemleri kurulumu ve enerji yönetim sistemleri entegrasyonu. Akıllı termostat sistemleri kuruldu.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    createdAt: new Date("2024-12-20T16:00:00Z")
  }
];

// Örnek Ürünler Verisi
const products = [
  {
    name: "Vaillant EcoTEC Plus Yoğuşmalı Kombi",
    description: "Yeni nesil yoğuşmalı teknoloji ile %109'a varan verimlilik sağlayan, çevre dostu ve ekonomik kombi. A sınıfı enerji verimliliği ile enerji tasarrufu garantisi.",
    features: [
      "Yoğuşmalı teknoloji ile yüksek verimlilik",
      "A sınıfı enerji verimliliği",
      "Düşük NOx emisyon değerleri",
      "Sessiz çalışma (max 48 dB)",
      "LCD ekran ve kullanıcı dostu kontrol paneli",
      "5 yıl üretici garantisi",
      "Akıllı termostat uyumlu",
      "Kompakt tasarım"
    ],
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600",
    createdAt: new Date("2025-01-15T10:00:00Z")
  },
  {
    name: "Baymak Duotec Premix Kombi",
    description: "Türk mühendisliğinin gücü ile üretilen, dayanıklı ve verimli kombi. Premix brülör teknolojisi ile mükemmel yanma performansı sunar.",
    features: [
      "Premix brülör teknolojisi",
      "Paslanmaz çelik ısı eşanjörü",
      "Modülasyonlu fan sistemi",
      "Otomatik hava tahliye sistemi",
      "Donma koruma sistemi",
      "3 yıl garanti",
      "Türkiye'de üretim",
      "Ekonomik servis hizmeti"
    ],
    imageUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600",
    createdAt: new Date("2025-01-12T11:30:00Z")
  },
  {
    name: "Protherm Leopard Yoğuşmalı Kombi",
    description: "Avrupa kalitesi ve yüksek teknoloji bir arada. Uzun ömürlü ve güvenilir ısınma çözümü. Akıllı sistemler ile tam kontrol.",
    features: [
      "Yoğuşmalı teknoloji",
      "Akıllı termostat desteği",
      "WiFi bağlantı seçeneği",
      "Otomatik hava atma",
      "Geniş modülasyon aralığı",
      "5 yıl garanti",
      "Sessiz çalışma teknolojisi",
      "Kolay montaj ve bakım"
    ],
    imageUrl: "https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=600",
    createdAt: new Date("2025-01-08T14:20:00Z")
  },
  {
    name: "Ferroli Bluehelix Tech RRT Kombi",
    description: "İtalyan tasarım ve mühendislik harikası. Kompakt yapısı ile her mekana uyum sağlar. Yüksek performans ve dayanıklılık garantisi.",
    features: [
      "Kompakt tasarım",
      "Paslanmaz çelik eşanjör",
      "Elektronik ateşleme sistemi",
      "Dijital sıcaklık kontrolü",
      "Anti-freeze koruma",
      "2 yıl garanti",
      "Düşük gaz tüketimi",
      "Kolay kullanım"
    ],
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    createdAt: new Date("2025-01-05T09:45:00Z")
  },
  {
    name: "Akıllı Oda Termostatı",
    description: "WiFi destekli akıllı termostat ile evinizi uzaktan kontrol edin. Enerji tasarrufu ve konfor bir arada. Tüm kombi markalarıyla uyumlu.",
    features: [
      "WiFi bağlantısı",
      "Mobil uygulama desteği",
      "Haftalık programlama",
      "Sesli asistan uyumlu (Alexa, Google)",
      "Enerji tüketim raporu",
      "Kolay kurulum",
      "Şık tasarım",
      "1 yıl garanti"
    ],
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600",
    createdAt: new Date("2025-01-02T13:15:00Z")
  },
  {
    name: "Doğalgaz Basınç Düşürücü Regülatör",
    description: "Yüksek kaliteli basınç düşürücü regülatör. Güvenli ve stabil gaz akışı sağlar. Endüstriyel ve konut tipi projeler için ideal.",
    features: [
      "Hassas basınç kontrolü",
      "Paslanmaz gövde",
      "Güvenlik valf sistemi",
      "Kolay ayar mekanizması",
      "Uzun ömürlü",
      "TSE belgeli",
      "Korozyon direnci",
      "2 yıl garanti"
    ],
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600",
    createdAt: new Date("2024-12-28T10:30:00Z")
  }
];

// Projeleri Firebase'e yükleme fonksiyonu
async function importProjects() {
  console.log('📁 Projeler yükleniyor...');
  
  const batch = db.batch();
  
  projects.forEach((project) => {
    const docRef = db.collection('projects').doc();
    batch.set(docRef, project);
  });
  
  await batch.commit();
  console.log(`✅ ${projects.length} proje başarıyla yüklendi!`);
}

// Ürünleri Firebase'e yükleme fonksiyonu
async function importProducts() {
  console.log('📦 Ürünler yükleniyor...');
  
  const batch = db.batch();
  
  products.forEach((product) => {
    const docRef = db.collection('products').doc();
    batch.set(docRef, product);
  });
  
  await batch.commit();
  console.log(`✅ ${products.length} ürün başarıyla yüklendi!`);
}

// Ana fonksiyon
async function main() {
  try {
    console.log('🚀 Firebase veri import işlemi başlıyor...\n');
    
    await importProjects();
    await importProducts();
    
    console.log('\n🎉 Tüm veriler başarıyla yüklendi!');
    console.log('🌐 Web sitenizi kontrol edebilirsiniz.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Hata oluştu:', error);
    process.exit(1);
  }
}

// Scripti çalıştır
main();