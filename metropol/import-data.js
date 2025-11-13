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

// Örnek İş Ortakları Verisi
const partners = [
  {
    name: "Baymak",
    description: "Türkiye'nin önde gelen kombi ve ısıtma sistemleri üreticisi. 40 yılı aşkın deneyimiyle sektörün lideri.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Baymak_logo.svg/1200px-Baymak_logo.svg.png",
    createdAt: new Date("2025-01-01T10:00:00Z")
  },
  {
    name: "Vaillant",
    description: "Alman kalitesiyle dünya çapında tanınan ısıtma teknolojileri markası. Yoğuşmalı kombi teknolojisinde öncü.",
    logoUrl: "https://companieslogo.com/img/orig/VAI.DE-8c4c75c3.png",
    createdAt: new Date("2025-01-01T10:05:00Z")
  },
  {
    name: "Buderus",
    description: "1731'den beri kaliteli ısıtma sistemleri üreten Alman markası. Premium segment lider.",
    logoUrl: "https://www.buderus.com/resource/image/434738/ratio3x1/960/320/f2c0d3e8e8e8e8e8e8e8e8e8e8e8e8e8/tY/buderus-logo.jpg",
    createdAt: new Date("2025-01-01T10:10:00Z")
  },
  {
    name: "Viessmann",
    description: "Enerji verimliliği ve çevre dostu çözümlerde dünya lideri. Akıllı ısıtma sistemleri uzmanı.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Viessmann_Logo.svg/2560px-Viessmann_Logo.svg.png",
    createdAt: new Date("2025-01-01T10:15:00Z")
  },
  {
    name: "Bosch Termoteknik",
    description: "Bosch kalitesiyle ısıtma ve soğutma sistemleri. Yenilikçi teknoloji ve güvenilirlik.",
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/08/Bosch-Logo.png",
    createdAt: new Date("2025-01-01T10:20:00Z")
  },
  {
    name: "Protherm",
    description: "Yoğuşmalı kombi teknolojisinde uzman marka. Ekonomik ve verimli çözümler sunar.",
    logoUrl: "https://www.protherm.com.tr/assets/images/protherm-logo.png",
    createdAt: new Date("2025-01-01T10:25:00Z")
  },
  {
    name: "Demirdöküm",
    description: "Türkiye'nin en köklü ısıtma markası. 65 yılı aşkın tecrübe ve güvenilirlik.",
    logoUrl: "https://www.demirdokum.com.tr/images/demirdokum-logo.png",
    createdAt: new Date("2025-01-01T10:30:00Z")
  },
  {
    name: "Ferroli",
    description: "İtalyan tasarımı ve teknolojisi. Şık ve verimli ısıtma çözümleri.",
    logoUrl: "https://www.ferroli.com.tr/assets/images/ferroli-logo.png",
    createdAt: new Date("2025-01-01T10:35:00Z")
  },
  {
    name: "Ariston",
    description: "İtalyan kalitesi ve tasarımı. Konforlu yaşam için ısıtma sistemleri.",
    logoUrl: "https://www.ariston.com/content/dam/ariston/logo/ariston_logo_2021.png",
    createdAt: new Date("2025-01-01T10:40:00Z")
  },
  {
    name: "ECA",
    description: "Türk mühendislik gücü. Yerli üretim ısıtma ve sıhhi tesisat çözümleri.",
    logoUrl: "https://www.eca.com.tr/images/eca-logo-yeni.png",
    createdAt: new Date("2025-01-01T10:45:00Z")
  }
];

// Örnek Referanslar Verisi
const references = [
  {
    name: "Çankaya Residence",
    description: "250 daireli lüks rezidans projesi. Tam doğalgaz tesisatı kurulumu, merkezi sistem montajı ve kombi tesisatları yapıldı. 6 aylık proje süresi içinde eksiksiz tamamlandı.",
    logoUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    createdAt: new Date("2025-01-02T09:00:00Z")
  },
  {
    name: "Ankuva AVM",
    description: "30.000 m² kapalı alan için merkezi ısıtma sistemi kurulumu. Enerji verimliliği sağlayan yoğuşmalı kazan sistemi ve tam otomasyon. Yıllık %35 enerji tasarrufu sağlandı.",
    logoUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&h=300&fit=crop",
    createdAt: new Date("2025-01-02T09:10:00Z")
  },
  {
    name: "Mesa Koru Sitesi",
    description: "180 villalı sitede bireysel kombi montajları ve yerden ısıtma sistemleri. Her villa için özel projelendirme yapılarak maksimum verimlilik sağlandı.",
    logoUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    createdAt: new Date("2025-01-02T09:20:00Z")
  },
  {
    name: "Bilkent Ofis Plaza",
    description: "25 katlı ofis binası için doğalgaz dönüşüm projesi. Eski kalorifer sisteminden modern doğalgaz sistemine geçiş. Bakım ve işletme maliyetlerinde %40 düşüş.",
    logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    createdAt: new Date("2025-01-02T09:30:00Z")
  },
  {
    name: "Çayyolu Towers",
    description: "3 blok 450 daireli konut projesi. A'dan Z'ye doğalgaz altyapısı ve bireysel sayaç sistemleri kurulumu. TSE belgeli eksiksiz teslimat.",
    logoUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&q=80",
    createdAt: new Date("2025-01-02T09:40:00Z")
  },
  {
    name: "Ankara Teknokent",
    description: "Teknoloji ve AR-GE merkezi için özel ısıtma-soğutma sistemi. Laboratuvar ve ofis alanları için ayrı zonlama. Hassas sıcaklık kontrolü.",
    logoUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    createdAt: new Date("2025-01-02T09:50:00Z")
  },
  {
    name: "Şehir Hastanesi Ek Bina",
    description: "15.000 m² hastane ek binası için kesintisiz ısıtma sistemi. Yedekli kazan sistemi ve 7/24 izleme. Kritik alanlarda tam güvenlik.",
    logoUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    createdAt: new Date("2025-01-02T10:00:00Z")
  },
  {
    name: "Gordion AVM",
    description: "55.000 m² alışveriş merkezi ısıtma modernizasyonu. Eski sisteme dokunmadan yeni nesil yoğuşmalı sistemlere geçiş. İşletme giderlerinde yıllık 2M TL tasarruf.",
    logoUrl: "https://images.unsplash.com/photo-1590642916589-592bca10dfbf?w=400&h=300&fit=crop",
    createdAt: new Date("2025-01-02T10:10:00Z")
  },
  {
    name: "İncek Loft Evleri",
    description: "95 müstakil ev projesi. Her ev için akıllı termostat sistemi ve yerden ısıtma. Mobil uygulama ile uzaktan kontrol imkanı.",
    logoUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    createdAt: new Date("2025-01-02T10:20:00Z")
  },
  {
    name: "Üniversite Yurtları Kampüsü",
    description: "2.500 öğrenci kapasiteli yurt kompleksi. Merkezi sistem ve bireysel oda kontrolleri. Enerji kimlik belgesi A+ sınıfı sertifikası alındı.",
    logoUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    createdAt: new Date("2025-01-02T10:30:00Z")
  },
  {
    name: "Panora AVM",
    description: "40.000 m² karma kullanımlı kompleks. AVM, ofis ve residans alanları için entegre doğalgaz sistemi. Farklı kullanım alanları için özel çözümler.",
    logoUrl: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&h=300&fit=crop",
    createdAt: new Date("2025-01-02T10:40:00Z")
  },
  {
    name: "Tekstil Fabrikası",
    description: "Endüstriyel doğalgaz tesisatı ve buhar kazanı sistemi. 24/7 kesintisiz üretim için yedekli sistem. Yıllık bakım anlaşması ile sürekli destek.",
    logoUrl: "https://images.unsplash.com/photo-1565071559227-20ab25b7685e?w=400&h=300&fit=crop",
    createdAt: new Date("2025-01-02T10:50:00Z")
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

// İş Ortaklarını Firebase'e yükleme fonksiyonu
async function importPartners() {
  console.log('🤝 İş ortakları yükleniyor...');
  
  const batch = db.batch();
  
  partners.forEach((partner) => {
    const docRef = db.collection('partners').doc();
    batch.set(docRef, partner);
  });
  
  await batch.commit();
  console.log(`✅ ${partners.length} iş ortağı başarıyla yüklendi!`);
}

// Referansları Firebase'e yükleme fonksiyonu
async function importReferences() {
  console.log('⭐ Referanslar yükleniyor...');
  
  const batch = db.batch();
  
  references.forEach((reference) => {
    const docRef = db.collection('references').doc();
    batch.set(docRef, reference);
  });
  
  await batch.commit();
  console.log(`✅ ${references.length} referans başarıyla yüklendi!`);
}

// Ana fonksiyon
async function main() {
  try {
    console.log('🚀 Firebase veri import işlemi başlıyor...\n');
    
    await importProjects();
    await importProducts();
    await importPartners();
    await importReferences();
    
    console.log('\n🎉 Tüm veriler başarıyla yüklendi!');
    console.log('🌐 Web sitenizi kontrol edebilirsiniz.');
    console.log('\n📊 Yüklenen Veri Özeti:');
    console.log(`   • Projeler: ${projects.length} adet`);
    console.log(`   • Ürünler: ${products.length} adet`);
    console.log(`   • İş Ortakları: ${partners.length} adet`);
    console.log(`   • Referanslar: ${references.length} adet`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Hata oluştu:', error);
    process.exit(1);
  }
}

// Scripti çalıştır
main();