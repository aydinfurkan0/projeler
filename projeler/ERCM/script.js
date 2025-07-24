// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
  const isDark = body.classList.contains("dark");
  themeToggle.innerHTML = `<i class="fas ${
    isDark ? "fa-sun" : "fa-moon"
  }"></i>`;
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Load Theme
const savedTheme = localStorage.getItem("theme") || "light";
body.classList.add(savedTheme);
themeToggle.innerHTML = `<i class="fas ${
  savedTheme === "dark" ? "fa-sun" : "fa-moon"
}"></i>`;

// Mobile Menu Toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Navbar Hide on Scroll
let lastScrollTop = 0;
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }
  lastScrollTop = scrollTop;
});

// Sidebar (Masaüstü için)
const sidebar = document.querySelector(".sidebar");
const isDesktop = window.innerWidth > 1024;

if (isDesktop) {
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    if (window.scrollY > 100) {
      sidebar.classList.add("active");
      sidebar.classList.add("icon-only");
    } else {
      sidebar.classList.remove("active");
      sidebar.classList.remove("icon-only");
    }
    scrollTimeout = setTimeout(() => {
      if (window.scrollY > 100) {
        sidebar.classList.add("icon-only");
      }
    }, 1000);
  });

  sidebar.addEventListener("mouseenter", () => {
    clearTimeout(scrollTimeout);
    sidebar.classList.remove("icon-only");
  });

  sidebar.addEventListener("mouseleave", () => {
    sidebar.classList.add("icon-only");
  });
}

// Hero Slider
const heroSwiper = new Swiper(".hero .swiper", {
  loop: true,
  initialSlide: 0,
  preloadImages: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  lazy: {
    loadPrevNext: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  speed: 800,
});

// Language Support
const translations = {
  tr: {
    "nav-home": "Ana Sayfa",
    "nav-about": "Hakkımızda",
    "nav-products": "Ürünler",
    "nav-services": "Hizmetler",
    "nav-contact": "İletişim",
    "hero-title-1": "Otomotivde Güven ve Dayanıklılık",
    "hero-text-1":
      "Otobüs, minibüs, tekne ve trenler için yüksek kaliteli camlar.",
    "hero-btn-1": "Keşfet",
    "hero-title-2": "Estetik ve Modern Dekoratif Camlar",
    "hero-text-2": "Serigraf baskılı camlarla mekanlarınıza şıklık katın.",
    "hero-btn-2": "İncele",
    "hero-title-3": "Endüstriyel Güç ve Performans",
    "hero-text-3": "Buzdolabı, fırın ve iş makinası camları için çözümler.",
    "hero-btn-3": "Detaylar",
    "products-title": "Ürünlerimiz",
    "product-otomotiv-title": "Otomotiv Camları",
    "product-otomotiv-text":
      "Otobüs, minibüs, panelvan, tekne, yat, gemi ve trenler için dayanıklı camlar.",
    "product-kursun-title": "Kurşun Geçirmez Camlar",
    "product-kursun-text": "Yüksek güvenlik için özel tasarlanmış camlar.",
    "product-jaluzili-title": "Jaluzili Camlar",
    "product-jaluzili-text": "Gizlilik ve estetik için jaluzi entegre camlar.",
    "product-traktor-title": "Traktör Kabin Camları",
    "product-traktor-text": "Dayanıklı ve güvenli traktör kabin camları.",
    "product-forklift-title": "Forklift Kabin Camları",
    "product-forklift-text": "Endüstriyel kullanım için yüksek dayanıklılık.",
    "product-spot-title": "Spot Aydınlatma Camları",
    "product-spot-text": "Modern aydınlatma için şeffaf ve estetik camlar.",
    "product-yol-title": "Yol Aydınlatma Camları",
    "product-yol-text": "Dış mekanlar için dayanıklı aydınlatma camları.",
    "product-dijital-title": "Serigraf Baskılı Camlar",
    "product-dijital-text":
      "Mutfak, duşakabin ve dış cephe için özel baskılı camlar.",
    "product-satinaj-title": "Satinaj Dekoratif Camlar",
    "product-satinaj-text": "Mat ve şık görünüm için dekoratif camlar.",
    "product-buzdolabi-title": "Endüstriyel Buzdolabı Camları",
    "product-buzdolabi-text": "Soğuk hava depoları için dayanıklı camlar.",
    "product-firin-title": "Fırın Kapak Camları",
    "product-firin-text": "Yüksek ısıya dayanıklı fırın camları.",
    "product-isitmali-title": "Isıtmalı Camlar",
    "product-isitmali-text": "Rezistans baskılı, ısıtmalı cam çözümleri.",
    "product-balkon-title": "Cam Balkon Kapama",
    "product-balkon-text": "Modern ve pratik cam balkon sistemleri.",
    "product-korkuluk-title": "Cam Korkuluklar",
    "product-korkuluk-text": "Estetik ve güvenli cam korkuluk sistemleri.",
    "product-btn": "Detaylar",
    "filter-all": "Tümü",
    "filter-otomotiv": "Otomotiv Camları",
    "filter-is-makinasi": "İş Makinası Camları",
    "filter-aydinlatma": "Aydınlatma Camları",
    "filter-dekoratif": "Dekoratif Camlar",
    "filter-endustriyel": "Endüstriyel Camlar",
    "about-title": "Hakkımızda",
    "about-text-1":
      "2006 yılında kurulan firmamız, uzman kadrosu ve modern teknolojik ekipmanlarıyla otomotiv, endüstriyel ve dekoratif cam üretiminde liderdir.",
    "about-text-2":
      "Yurt içi ve yurt dışı pazarlarda müşteri memnuniyetini ön planda tutarak, yüksek kaliteli cam ürünleri sunuyoruz.",
    "about-text-3":
      "Misyonumuz, dayanıklı, estetik ve çevre dostu cam ürünleri ile yaşam alanlarınızı güzelleştirmektir.",
    "services-title": "Hizmetlerimiz",
    "service-1-title": "Özel Kesim",
    "service-1-text":
      "Otomotiv, dekoratif ve endüstriyel projeler için milimetrik hassasiyetle cam kesim hizmetleri.",
    "service-2-title": "Güvenlik Camları",
    "service-2-text":
      "Lamine, temperli ve kurşun geçirmez camlarla maksimum güvenlik.",
    "service-3-title": "Hızlı Teslimat",
    "service-3-text":
      "Türkiye geneli ve uluslararası teslimat. Güvenli paketleme.",
    "service-4-title": "Serigraf Baskı",
    "service-4-text":
      "Mutfak tezgahları, duşakabinler ve dış cephe için özelleştirilmiş baskılı camlar.",
    "service-5-title": "Montaj Hizmetleri",
    "service-5-text":
      "Cam balkon, korkuluk ve özel camların profesyonel montajı.",
    "service-6-title": "Teknik Danışmanlık",
    "service-6-text":
      "Proje bazlı cam seçimi ve uygulama için uzman danışmanlık.",
    "service-7-title": "Geri Dönüşüm",
    "service-7-text":
      "Çevre dostu üretim süreçleri ve cam geri dönüşüm hizmetleri.",
    "service-8-title": "Bakım ve Onarım",
    "service-8-text": "Cam sistemlerinin düzenli bakımı ve onarımı.",
    "contact-title": "İletişim",
    "contact-address": "İstanbul, Türkiye",
    "contact-phone": "+90 123 456 7890",
    "contact-email": "info@camfabrikasi.com",
    "contact-map-title": "Adresimiz",
    "contact-map-btn": "Konumu Aç",
    "form-name": "Adınız",
    "form-email": "E-posta",
    "form-message": "Mesajınız",
    "form-btn": "Gönder",
    "form-success": "Mesajınız başarıyla gönderildi!",
    "form-error": "Lütfen tüm alanları doldurun.",
    "footer-brand": "Cam Fabrikası",
    "footer-services": "Hizmetlerimiz",
    "footer-products": "Ürünlerimiz",
    "footer-contact": "İletişim",
    "footer-links": "Hızlı Linkler",
    "footer-designed": "Site tasarımı",
    "ultra-clear-title": "Ultra Clear Cam",
    "ultra-clear-text":
      "Ultra Clear (Extra Clear) cam, düşük demir içeriği sayesinde yüksek şeffaflık sağlar.",
    "modal-close": "Kapat",
  },
  en: {
    "nav-home": "Home",
    "nav-about": "About Us",
    "nav-products": "Products",
    "nav-services": "Services",
    "nav-contact": "Contact",
    "hero-title-1": "Safety and Durability in Automotive",
    "hero-text-1":
      "High-quality glass for buses, minibuses, boats, and trains.",
    "hero-btn-1": "Explore",
    "hero-title-2": "Aesthetic and Modern Decorative Glass",
    "hero-text-2": "Add elegance to your spaces with digitally printed glass.",
    "hero-btn-2": "View",
    "hero-title-3": "Industrial Strength and Performance",
    "hero-text-3": "Solutions for refrigerators, ovens, and machinery glass.",
    "hero-btn-3": "Details",
    "products-title": "Our Products",
    "product-otomotiv-title": "Automotive Glass",
    "product-otomotiv-text":
      "Durable glass for buses, minibuses, boats, yachts, ships, and trains.",
    "product-kursun-title": "Bulletproof Glass",
    "product-kursun-text": "Specially designed glass for high security.",
    "product-jaluzili-title": "Blinded Glass",
    "product-jaluzili-text": "Integrated blinds for privacy and aesthetics.",
    "product-traktor-title": "Tractor Cabin Glass",
    "product-traktor-text": "Durable and safe tractor cabin glass.",
    "product-forklift-title": "Forklift Cabin Glass",
    "product-forklift-text": "High durability for industrial use.",
    "product-spot-title": "Spot Lighting Glass",
    "product-spot-text": "Transparent and aesthetic glass for modern lighting.",
    "product-yol-title": "Road Lighting Glass",
    "product-yol-text": "Durable glass for outdoor lighting.",
    "product-dijital-title": "Digitally Printed Glass",
    "product-dijital-text":
      "Custom printed glass for kitchens, showers, and facades.",
    "product-satinaj-title": "Satin Decorative Glass",
    "product-satinaj-text": "Matte and stylish decorative glass.",
    "product-buzdolabi-title": "Industrial Refrigerator Glass",
    "product-buzdolabi-text": "Durable glass for cold storage units.",
    "product-firin-title": "Oven Door Glass",
    "product-firin-text": "High heat-resistant oven glass.",
    "product-isitmali-title": "Heated Glass",
    "product-isitmali-text": "Resistive printed, heated glass solutions.",
    "product-balkon-title": "Glass Balcony Enclosure",
    "product-balkon-text": "Modern and practical glass balcony systems.",
    "product-korkuluk-title": "Glass Railings",
    "product-korkuluk-text": "Aesthetic and safe glass railing systems.",
    "product-btn": "Details",
    "filter-all": "All",
    "filter-otomotiv": "Automotive Glass",
    "filter-is-makinasi": "Machinery Glass",
    "filter-aydinlatma": "Lighting Glass",
    "filter-dekoratif": "Decorative Glass",
    "filter-endustriyel": "Industrial Glass",
    "about-title": "About Us",
    "about-text-1":
      "Established in 2006, our company is a leader in automotive, industrial, and decorative glass production.",
    "about-text-2":
      "We offer high-quality glass products, prioritizing customer satisfaction in domestic and international markets.",
    "about-text-3":
      "Our mission is to enhance living spaces with durable, aesthetic, and eco-friendly glass products.",
    "services-title": "Our Services",
    "service-1-title": "Custom Cutting",
    "service-1-text":
      "Precision glass cutting services for automotive and decorative applications.",
    "service-2-title": "Safety Glass",
    "service-2-text":
      "High security with laminated, tempered, and bulletproof glass.",
    "service-3-title": "Fast Delivery",
    "service-3-text":
      "Nationwide and international delivery with secure packaging.",
    "service-4-title": "Digital Printing",
    "service-4-text": "High-resolution digitally printed glass.",
    "service-5-title": "Installation Services",
    "service-5-text":
      "Professional installation of glass balconies and railings.",
    "service-6-title": "Technical Consultancy",
    "service-6-text": "Expert consultancy for glass selection.",
    "service-7-title": "Recycling",
    "service-7-text": "Eco-friendly production and glass recycling.",
    "service-8-title": "Maintenance and Repair",
    "service-8-text": "Regular maintenance and repair of glass systems.",
    "contact-title": "Contact",
    "contact-address": "Istanbul, Turkey",
    "contact-phone": "+90 123 456 7890",
    "contact-email": "info@camfabrikasi.com",
    "contact-map-title": "Our Address",
    "contact-map-btn": "Open Location",
    "form-name": "Your Name",
    "form-email": "Email",
    "form-message": "Your Message",
    "form-btn": "Send",
    "form-success": "Your message has been sent successfully!",
    "form-error": "Please fill in all fields.",
    "footer-brand": "Glass Factory",
    "footer-services": "Our Services",
    "footer-products": "Our Products",
    "footer-contact": "Contact",
    "footer-links": "Quick Links",
    "footer-designed": "Website designed by",
    "ultra-clear-title": "Ultra Clear Glass",
    "ultra-clear-text":
      "Ultra Clear glass provides high transparency due to its low iron content.",
    "modal-close": "Close",
  },
  de: {
    "nav-home": "Startseite",
    "nav-about": "Über Uns",
    "nav-products": "Produkte",
    "nav-services": "Dienstleistungen",
    "nav-contact": "Kontakt",
    "hero-title-1": "Sicherheit und Langlebigkeit im Automobilbereich",
    "hero-text-1": "Hochwertiges Glas für Busse, Minibusse, Boote und Züge.",
    "hero-btn-1": "Entdecken",
    "hero-title-2": "Ästhetisches und modernes Dekorglas",
    "hero-text-2":
      "Verleihen Sie Ihren Räumen mit digital bedrucktem Glas Eleganz.",
    "hero-btn-2": "Ansehen",
    "hero-title-3": "Industrielle Stärke und Leistung",
    "hero-text-3": "Lösungen für Kühlschränke, Öfen und Maschinenglas.",
    "hero-btn-3": "Details",
    "products-title": "Unsere Produkte",
    "product-otomotiv-title": "Automobilglas",
    "product-otomotiv-text":
      "Langlebiges Glas für Busse, Minibusse, Boote, Yachten, Schiffe und Züge.",
    "product-kursun-title": "Kugelsicheres Glas",
    "product-kursun-text": "Speziell für hohe Sicherheit entwickeltes Glas.",
    "product-jaluzili-title": "Jalousieglas",
    "product-jaluzili-text":
      "Integrierte Jalousien für Privatsphäre und Ästhetik.",
    "product-traktor-title": "Traktorkabinenglas",
    "product-traktor-text": "Langlebiges und sicheres Glas für Traktorkabinen.",
    "product-forklift-title": "Gabelstaplerkabinenglas",
    "product-forklift-text": "Hohe Haltbarkeit für industrielle Nutzung.",
    "product-spot-title": "Spot-Beleuchtungsglas",
    "product-spot-text":
      "Transparentes und ästhetisches Glas für moderne Beleuchtung.",
    "product-yol-title": "Straßenbeleuchtungsglas",
    "product-yol-text": "Langlebiges Glas für Außenbeleuchtung.",
    "product-dijital-title": "Digital bedrucktes Glas",
    "product-dijital-text":
      "Maßgeschneidertes bedrucktes Glas für Küchen, Duschen und Fassaden.",
    "product-satinaj-title": "Satin-Dekorglas",
    "product-satinaj-text": "Mattes und stilvolles Dekorglas.",
    "product-buzdolabi-title": "Industriekühlschrankglas",
    "product-buzdolabi-text": "Langlebiges Glas für Kälte-Lagerungseinheiten.",
    "product-firin-title": "Ofentürglas",
    "product-firin-text": "Hochtemperaturbeständiges Ofenglas.",
    "product-isitmali-title": "Beheiztes Glas",
    "product-isitmali-text": "Widerstandsbedrucktes, beheiztes Glaslösungen.",
    "product-balkon-title": "Glasbalkonverkleidung",
    "product-balkon-text": "Moderne und praktische Glasbalkonsysteme.",
    "product-korkuluk-title": "Glasgeländer",
    "product-korkuluk-text": "Ästhetische und sichere Glasgeländersysteme.",
    "product-btn": "Details",
    "filter-all": "Alle",
    "filter-otomotiv": "Automobilglas",
    "filter-is-makinasi": "Maschinenglas",
    "filter-aydinlatma": "Beleuchtungsglas",
    "filter-dekoratif": "Dekorglas",
    "filter-endustriyel": "Industrieglas",
    "about-title": "Über Uns",
    "about-text-1":
      "Gegründet 2006, ist unser Unternehmen führend in der Herstellung von Automobil-, Industrie- und Dekorglas.",
    "about-text-2":
      "Wir bieten hochwertige Glasprodukte mit Fokus auf Kundenzufriedenheit.",
    "about-text-3":
      "Unsere Mission ist es, Wohnräume mit langlebigen, ästhetischen Glasprodukten zu verbessern.",
    "services-title": "Unsere Dienstleistungen",
    "service-1-title": "Spezialschnitt",
    "service-1-text": "Präzise Glasschneidedienste.",
    "service-2-title": "Sicherheitsglas",
    "service-2-text": "Hohe Sicherheit mit Verbundglas.",
    "service-3-title": "Schnelle Lieferung",
    "service-3-text": "Landesweite Lieferung.",
    "service-4-title": "Digitaldruck",
    "service-4-text": "Hochauflösendes bedrucktes Glas.",
    "service-5-title": "Installationsdienste",
    "service-5-text": "Professionelle Glasinstallation.",
    "service-6-title": "Technische Beratung",
    "service-6-text": "Beratung für Glasauswahl.",
    "service-7-title": "Recycling",
    "service-7-text": "Umweltfreundliche Prozesse.",
    "service-8-title": "Wartung und Reparatur",
    "service-8-text": "Regelmäßige Wartung von Glassystemen.",
    "contact-title": "Kontakt",
    "contact-address": "Istanbul, Türkei",
    "contact-phone": "+90 123 456 7890",
    "contact-email": "info@camfabrikasi.com",
    "contact-map-title": "Unsere Adresse",
    "contact-map-btn": "Standort öffnen",
    "form-name": "Ihr Name",
    "form-email": "E-Mail",
    "form-message": "Ihre Nachricht",
    "form-btn": "Senden",
    "form-success": "Ihre Nachricht wurde erfolgreich gesendet!",
    "form-error": "Bitte füllen Sie alle Felder aus.",
    "footer-brand": "Glasfabrik",
    "footer-services": "Unsere Dienstleistungen",
    "footer-products": "Unsere Produkte",
    "footer-contact": "Kontakt",
    "footer-links": "Schnelllinks",
    "footer-designed": "Website gestaltet von",
    "ultra-clear-title": "Ultra Clear Glas",
    "ultra-clear-text": "Ultra Clear Glas bietet hohe Transparenz.",
    "modal-close": "Schließen",
  },
  ru: {
    "nav-home": "Главная",
    "nav-about": "О нас",
    "nav-products": "Продукты",
    "nav-services": "Услуги",
    "nav-contact": "Контакты",
    "hero-title-1": "Безопасность и долговечность в автомобилях",
    "hero-text-1":
      "Высококачественное стекло для автобусов, микроавтобусов, лодок и поездов.",
    "hero-btn-1": "Исследовать",
    "hero-title-2": "Эстетичные и современные декоративные стекла",
    "hero-text-2":
      "Добавьте элегантности вашим пространствам с цифровой печатью на стекле.",
    "hero-btn-2": "Посмотреть",
    "hero-title-3": "Промышленная прочность и производительность",
    "hero-text-3": "Решения для стекол холодильников, печей и машин.",
    "hero-btn-3": "Подробности",
    "products-title": "Наши продукты",
    "product-otomotiv-title": "Автомобильное стекло",
    "product-otomotiv-text":
      "Прочное стекло для автобусов, микроавтобусов, лодок, яхт, кораблей и поездов.",
    "product-kursun-title": "Пуленепробиваемое стекло",
    "product-kursun-text":
      "Специально разработанное стекло для высокой безопасности.",
    "product-jaluzili-title": "Стекло с жалюзи",
    "product-jaluzili-text":
      "Интегрированные жалюзи для конфиденциальности и эстетики.",
    "product-traktor-title": "Стекло для кабины трактора",
    "product-traktor-text": "Прочное и безопасное стекло для кабин тракторов.",
    "product-forklift-title": "Стекло для кабины погрузчика",
    "product-forklift-text":
      "Высокая прочность для промышленного использования.",
    "product-spot-title": "Стекло для точечного освещения",
    "product-spot-text":
      "Прозрачное и эстетичное стекло для современного освещения.",
    "product-yol-title": "Стекло для дорожного освещения",
    "product-yol-text": "Прочное стекло для наружного освещения.",
    "product-dijital-title": "Стекло с цифровой печатью",
    "product-dijital-text":
      "Индивидуально напечатанное стекло для кухонь, душевых и фасадов.",
    "product-satinaj-title": "Сатиновое декоративное стекло",
    "product-satinaj-text": "Матовое и стильное декоративное стекло.",
    "product-buzdolabi-title": "Промышленное стекло для холодильников",
    "product-buzdolabi-text": "Прочное стекло для холодильных установок.",
    "product-firin-title": "Стекло для дверцы печи",
    "product-firin-text": "Термостойкое стекло для печей.",
    "product-isitmali-title": "Нагреваемое стекло",
    "product-isitmali-text":
      "Решения для нагреваемого стекла с резистивной печатью.",
    "product-balkon-title": "Остекление балконов",
    "product-balkon-text":
      "Современные и практичные системы остекления балконов.",
    "product-korkuluk-title": "Стеклянные перила",
    "product-korkuluk-text":
      "Эстетичные и безопасные системы стеклянных перил.",
    "product-btn": "Подробности",
    "filter-all": "Все",
    "filter-otomotiv": "Автомобильное стекло",
    "filter-is-makinasi": "Машинное стекло",
    "filter-aydinlatma": "Осветительное стекло",
    "filter-dekoratif": "Декоративное стекло",
    "filter-endustriyel": "Промышленное стекло",
    "about-title": "О нас",
    "about-text-1":
      "Основанная в 2006 году, наша компания является лидером в производстве автомобильных, промышленных и декоративных стекол.",
    "about-text-2":
      "Мы предлагаем высококачественные стеклянные изделия, уделяя приоритетное внимание удовлетворенности клиентов.",
    "about-text-3":
      "Наша миссия — улучшать жилые пространства с помощью прочных, эстетичных и экологичных стеклянных изделий.",
    "services-title": "Наши услуги",
    "service-1-title": "Индивидуальная резка",
    "service-1-text": "Услуги точной резки стекла.",
    "service-2-title": "Безопасное стекло",
    "service-2-text": "Высокая безопасность с ламинированным стеклом.",
    "service-3-title": "Быстрая доставка",
    "service-3-text": "Доставка по всей стране.",
    "service-4-title": "Цифровая печать",
    "service-4-text": "Цифровое печатное стекло.",
    "service-5-title": "Услуги по установке",
    "service-5-text": "Профессиональная установка стекла.",
    "service-6-title": "Техническое консультирование",
    "service-6-text": "Консультации по выбору стекла.",
    "service-7-title": "Переработка",
    "service-7-text": "Экологически чистые процессы.",
    "service-8-title": "Обслуживание и ремонт",
    "service-8-text": "Регулярное обслуживание стеклянных систем.",
    "contact-title": "Контакты",
    "contact-address": "Стамбул, Турция",
    "contact-phone": "+90 123 456 7890",
    "contact-email": "info@camfabrikasi.com",
    "contact-map-title": "Наш адрес",
    "contact-map-btn": "Открыть местоположение",
    "form-name": "Ваше имя",
    "form-email": "Электронная почта",
    "form-message": "Ваше сообщение",
    "form-btn": "Отправить",
    "form-success": "Ваше сообщение успешно отправлено!",
    "form-error": "Пожалуйста, заполните все поля.",
    "footer-brand": "Стекольный завод",
    "footer-services": "Наши услуги",
    "footer-products": "Наши продукты",
    "footer-contact": "Контакты",
    "footer-links": "Быстрые ссылки",
    "footer-designed": "Сайт разработан",
    "ultra-clear-title": "Ультрапрозрачное стекло",
    "ultra-clear-text":
      "Ультрапрозрачное стекло обеспечивает высокую прозрачность.",
    "modal-close": "Закрыть",
  },
  ar: {
    "nav-home": "الرئيسية",
    "nav-about": "من نحن",
    "nav-products": "المنتجات",
    "nav-services": "الخدمات",
    "nav-contact": "اتصل بنا",
    "hero-title-1": "الأمان والمتانة في السيارات",
    "hero-text-1": "زجاج عالي الجودة للحافلات، الميني باص، القوارب، والقطارات.",
    "hero-btn-1": "استكشف",
    "hero-title-2": "زجاج ديكوري أنيق وعصري",
    "hero-text-2": "أضف الأناقة إلى مساحاتك مع الزجاج المطبوع رقميًا.",
    "hero-btn-2": "عرض",
    "hero-title-3": "القوة والأداء الصناعي",
    "hero-text-3": "حلول لزجاج الثلاجات، الأفران، وآلات العمل.",
    "hero-btn-3": "التفاصيل",
    "products-title": "منتجاتنا",
    "product-otomotiv-title": "زجاج السيارات",
    "product-otomotiv-text":
      "زجاج متين للحافلات، الميني باص، القوارب، اليخوت، السفن، والقطارات.",
    "product-kursun-title": "زجاج مقاوم للرصاص",
    "product-kursun-text": "زجاج مصمم خصيصًا للأمان العالي.",
    "product-jaluzili-title": "زجاج مع شتر",
    "product-jaluzili-text": "شتر مدمج للخصوصية والجماليات.",
    "product-traktor-title": "زجاج كابينة الجرار",
    "product-traktor-text": "زجاج متين وآمن لكابينات الجرارات.",
    "product-forklift-title": "زجاج كابينة الرافعة الشوكية",
    "product-forklift-text": "متانة عالية للاستخدام الصناعي.",
    "product-spot-title": "زجاج الإضاءة النقطية",
    "product-spot-text": "زجاج شفاف وجمالي للإضاءة العصرية.",
    "product-yol-title": "زجاج إضاءة الطرق",
    "product-yol-text": "زجاج متين للإضاءة الخارجية.",
    "product-dijital-title": "زجاج مطبوع رقميًا",
    "product-dijital-text": "زجاج مطبوع حسب الطلب للمطابخ والحمامات والواجهات.",
    "product-satinaj-title": "زجاج ديكوري ساتان",
    "product-satinaj-text": "زجاج ديكوري غير لامع وأنيق.",
    "product-buzdolabi-title": "زجاج ثلاجات صناعية",
    "product-buzdolabi-text": "زجاج متين لوحدات التخزين البارد.",
    "product-firin-title": "زجاج باب الفرن",
    "product-firin-text": "زجاج مقاوم للحرارة العالية.",
    "product-isitmali-title": "زجاج مدفأ",
    "product-isitmali-text": "حلول زجاج مدفأ مطبوع بالمقاومة.",
    "product-balkon-title": "تغطية الشرفات الزجاجية",
    "product-balkon-text": "أنظمة تغطية شرفات زجاجية عصرية.",
    "product-korkuluk-title": "الدرابزين الزجاجي",
    "product-korkuluk-text": "أنظمة درابزين زجاجية جمالية.",
    "product-btn": "التفاصيل",
    "filter-all": "الكل",
    "filter-otomotiv": "زجاج السيارات",
    "filter-is-makinasi": "زجاج الآلات",
    "filter-aydinlatma": "زجاج الإضاءة",
    "filter-dekoratif": "زجاج ديكوري",
    "filter-endustriyel": "زجاج صناعي",
    "about-title": "من نحن",
    "about-text-1":
      "تأسست شركتنا عام 2006، وهي رائدة في إنتاج زجاج السيارات والصناعة والديكور.",
    "about-text-2":
      "نقدم منتجات زجاجية عالية الجودة مع التركيز على رضا العملاء.",
    "about-text-3":
      "مهمتنا تحسين المساحات المعيشية بمنتجات زجاجية متينة وجمالية.",
    "services-title": "خدماتنا",
    "service-1-title": "القطع المخصص",
    "service-1-text": "خدمات قطع الزجاج الدقيقة.",
    "service-2-title": "الزجاج الآمن",
    "service-2-text": "أمان عالي مع الزجاج الرقائقي.",
    "service-3-title": "التوصيل السريع",
    "service-3-text": "توصيل على مستوى البلاد.",
    "service-4-title": "الطباعة الرقمية",
    "service-4-text": "زجاج مطبوع رقميًا.",
    "service-5-title": "خدمات التركيب",
    "service-5-text": "تركيب احترافي للزجاج.",
    "service-6-title": "الاستشارات الفنية",
    "service-6-text": "استشارات لاختيار الزجاج.",
    "service-7-title": "إعادة التدوير",
    "service-7-text": "عمليات إنتاج صديقة للبيئة.",
    "service-8-title": "الصيانة والإصلاح",
    "service-8-text": "صيانة دورية للزجاج.",
    "contact-title": "اتصل بنا",
    "contact-address": "إسطنبول، تركيا",
    "contact-phone": "+90 123 456 7890",
    "contact-email": "info@camfabrikasi.com",
    "contact-map-title": "عنواننا",
    "contact-map-btn": "فتح الموقع",
    "form-name": "اسمك",
    "form-email": "البريد الإلكتروني",
    "form-message": "رسالتك",
    "form-btn": "إرسال",
    "form-success": "تم إرسال رسالتك بنجاح!",
    "form-error": "يرجى تعبئة جميع الحقول.",
    "footer-brand": "مصنع الزجاج",
    "footer-services": "خدماتنا",
    "footer-products": "منتجاتنا",
    "footer-contact": "اتصل بنا",
    "footer-links": "روابط سريعة",
    "footer-designed": "تصميم الموقع بواسطة",
    "ultra-clear-title": "زجاج فائق النقاء",
    "ultra-clear-text": "زجاج فائق النقاء يوفر شفافية عالية.",
    "modal-close": "إغلاق",
  },
};

const langSelector = document.getElementById("lang-switch");
langSelector.addEventListener("change", (e) => {
  const lang = e.target.value;
  document.documentElement.lang = lang;
  document.title = `KURUMSAL ÇÖZÜM - ${translations[lang]["nav-home"]}`;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", translations[lang]["about-text-1"]);
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    el.textContent = translations[lang][key];
  });
  document.querySelectorAll("[data-lang-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-lang-placeholder");
    el.placeholder = translations[lang][key];
  });
  localStorage.setItem("lang", lang);
  body.setAttribute("lang", lang);
});

// Load Language
const savedLang = localStorage.getItem("lang") || "tr";
langSelector.value = savedLang;
document.documentElement.lang = savedLang;
document.title = `KURUMSAL ÇÖZÜM - ${translations[savedLang]["nav-home"]}`;
document
  .querySelector('meta[name="description"]')
  .setAttribute("content", translations[savedLang]["about-text-1"]);
document.querySelectorAll("[data-lang]").forEach((el) => {
  const key = el.getAttribute("data-lang");
  el.textContent = translations[savedLang][key];
});
document.querySelectorAll("[data-lang-placeholder]").forEach((el) => {
  const key = el.getAttribute("data-lang-placeholder");
  el.placeholder = translations[savedLang][key];
});
body.setAttribute("lang", savedLang);

// Ultra Clear Modal
const ultraClearModal = document.getElementById("ultra-clear-modal");
const modalCloseButtons = document.querySelectorAll(
  ".modal-close, .modal-close-btn"
);

document.addEventListener("DOMContentLoaded", () => {
  ultraClearModal.classList.add("active");
});

modalCloseButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    ultraClearModal.classList.remove("active");
    document.getElementById("product-modal").classList.remove("active");
  });
});

// Product Modal Data
const productDetails = {
  otomotiv: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-otomotiv-title",
    text: "product-otomotiv-text",
  },
  kursun: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-kursun-title",
    text: "product-kursun-text",
  },
  jaluzili: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-jaluzili-title",
    text: "product-jaluzili-text",
  },
  traktor: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-traktor-title",
    text: "product-traktor-text",
  },
  forklift: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-forklift-title",
    text: "product-forklift-text",
  },
  spot: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-spot-title",
    text: "product-spot-text",
  },
  yol: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-yol-title",
    text: "product-yol-text",
  },
  dijital: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-dijital-title",
    text: "product-dijital-text",
  },
  satinaj: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-satinaj-title",
    text: "product-satinaj-text",
  },
  buzdolabi: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-buzdolabi-title",
    text: "product-buzdolabi-text",
  },
  firin: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-firin-title",
    text: "product-firin-text",
  },
  isitmali: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-isitmali-title",
    text: "product-isitmali-text",
  },
  balkon: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-balkon-title",
    text: "product-balkon-text",
  },
  korkuluk: {
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    ],
    title: "product-korkuluk-title",
    text: "product-korkuluk-text",
  },
};

// Product Modal Click
const productModal = document.getElementById("product-modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalSliderImages = document.getElementById("modal-slider-images");

document.querySelectorAll("[data-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId = btn.getAttribute("data-modal");
    const product = productDetails[productId];
    const lang = document.documentElement.lang || "tr";

    modalTitle.textContent = translations[lang][product.title];
    modalText.textContent = translations[lang][product.text];

    modalSliderImages.innerHTML = product.images
      .map(
        (img) =>
          `<div class="swiper-slide"><img src="${img}" alt="${
            translations[lang][product.title]
          }" loading="lazy"></div>`
      )
      .join("");

    const modalSwiper = new Swiper(".modal-slider", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      lazy: {
        loadPrevNext: true,
      },
      autoplay: {
        delay: 3000,
      },
    });

    productModal.classList.add("active");
  });
});

// Modal Kapatma
document.querySelectorAll(".modal-close, .modal-close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    productModal.classList.remove("active");
    ultraClearModal.classList.remove("active");
  });
});

// Product Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");
    productCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      card.style.display =
        filter === "all" || filter === category ? "block" : "none";
    });
  });
});

// Contact Form Validation
const form = document.getElementById("contact-form");
const formNotification = document.querySelector(".form-notification");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const lang = document.documentElement.lang || "tr";

  if (name && email && message) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        }
      );
      if (response.ok) {
        formNotification.textContent = translations[lang]["form-success"];
        formNotification.className = "form-notification success";
        form.reset();
      } else {
        throw new Error("Gönderim hatası");
      }
    } catch (error) {
      formNotification.textContent = "Bir hata oluştu, lütfen tekrar deneyin.";
      formNotification.className = "form-notification error";
    }
    setTimeout(() => (formNotification.textContent = ""), 3000);
  } else {
    formNotification.textContent = translations[lang]["form-error"];
    formNotification.className = "form-notification error";
    setTimeout(() => (formNotification.textContent = ""), 3000);
  }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(
  ".product-card, .service-card, .about-text"
);
const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
};

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(50px)";
  el.style.transition = "all 0.5s ease";
});

window.addEventListener("scroll", revealOnScroll);

// SEO ve Ads için Dinamik Meta
const updateMeta = () => {
  const lang = document.documentElement.lang || "tr";
  document.title = `KURUMSAL ÇÖZÜM - ${translations[lang]["nav-home"]}`;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", translations[lang]["about-text-1"]);
  document
    .querySelector('meta[name="keywords"]')
    .setAttribute(
      "content",
      "cam fabrikası, otomotiv camları, dekoratif camlar, endüstriyel camlar"
    );
};

window.addEventListener("load", updateMeta);
