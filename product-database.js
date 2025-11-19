// Comprehensive Product Database for NexusChop
// Contains all products from High-Tech and Fashion categories

const ProductDatabase = {
  // High-Tech Products
  highTech: {
    "ht001": {
      id: "ht001",
      title: "iPhone 12 Pro Max 256GB",
      name: "iPhone 12 Pro Max 256GB",
      price: 1048000,
      originalPrice: 1310000,
      image: "Projet 1 - MarketPlace/produits/iphone12promax_1.jpg",
      category: "Téléphonie",
      subcategory: "telephonie",
      rating: 5,
      description: "iPhone 12 Pro Max avec 256GB de stockage et puce A14 Bionic.",
      features: ["256GB stockage", "Puce A14 Bionic", "Caméra triple 12MP", "5G"]
    },
    "ht002": {
      id: "ht002",
      title: "Samsung Galaxy S21 Ultra",
      name: "Samsung Galaxy S21 Ultra",
      price: 785000,
      originalPrice: 980000,
      image: "Projet 1 - MarketPlace/produits/samsunggalxys21_1.jpg",
      category: "Téléphonie",
      subcategory: "telephonie",
      rating: 5,
      description: "Samsung Galaxy S21 Ultra avec stylet S Pen intégré.",
      features: ["Stylet S Pen", "Écran 6.8\"", "Caméra 108MP", "Batterie 5000mAh"]
    },
    "ht003": {
      id: "ht003",
      title: "Sony Alpha ZV-E10 Vlog Camera",
      name: "Sony Alpha ZV-E10 Vlog Camera",
      price: 654000,
      originalPrice: 916000,
      image: "Projet 1 - MarketPlace/produits/sonyalphazve10_1.jpg",
      category: "Photo, caméscope",
      subcategory: "photo-camescope",
      rating: 5,
      description: "Caméra Sony Alpha ZV-E10 spécialement conçue pour le vlog.",
      features: ["Capteur APS-C 24.2 MP", "Vlog créatif", "Écran orientable", "Micro intégré"]
    },
    "ht004": {
      id: "ht004",
      title: "Canon EOS M50 Hybride",
      name: "Canon EOS M50 Hybride",
      price: 589000,
      originalPrice: 851000,
      image: "Projet 1 - MarketPlace/produits/canonhybrideeosm50_1.jpg",
      category: "Photo, caméscope",
      subcategory: "photo-camescope",
      rating: 4,
      description: "Canon EOS M50 Hybride avec objectifs 15-45mm.",
      features: ["Capteur APS-C 24.1 MP", "Vidéo 4K", "Écran tactile orientable", "Wi-Fi intégré"]
    },
    "ht005": {
      id: "ht005",
      title: "Bose 500 Barre de Son",
      name: "Bose 500 Barre de Son",
      price: 392000,
      originalPrice: 523000,
      image: "Projet 1 - MarketPlace/produits/bose500_.jpg",
      category: "Audio, Hifi",
      subcategory: "audio-hifi",
      rating: 5,
      description: "Barre de son Bose 500 avec technologie Bose Voice4Video.",
      features: ["Son surround virtuel", "Alexa intégrée", "Bluetooth/Wi-Fi", "Contrôle vocal"]
    },
    "ht006": {
      id: "ht006",
      title: "Samsung TV 55\" 4K Smart TV",
      name: "Samsung TV 55\" 4K Smart TV",
      price: 589000,
      originalPrice: 851000,
      image: "Projet 1 - MarketPlace/produits/tvsamsung_1.jpg",
      category: "TV, Home Cinéma",
      subcategory: "tv-home-cinema",
      rating: 5,
      description: "Smart TV Samsung 55\" 4K UHD avec Tizen OS.",
      features: ["4K UHD", "HDR10+", "Smart TV Tizen", "Contrôle vocal"]
    },
    "ht007": {
      id: "ht007",
      title: "JBL Flip 5 Enceinte Bluetooth",
      name: "JBL Flip 5 Enceinte Bluetooth",
      price: 97600,
      originalPrice: 130000,
      image: "Projet 1 - MarketPlace/produits/jblflip_1.jpg",
      category: "Audio, Hifi",
      subcategory: "audio-hifi",
      rating: 4,
      description: "Enceinte Bluetooth JBL Flip 5 resistente à l'eau.",
      features: ["Étanchéité IPX7", "Autonomie 12h", "JBL PartyBoost", "Bluetooth 4.2"]
    },
    "ht008": {
      id: "ht008",
      title: "Garmin Venu Montre Connectée",
      name: "Garmin Venu Montre Connectée",
      price: 261000,
      originalPrice: 327000,
      image: "Projet 1 - MarketPlace/produits/garminvenu_1.jpg",
      category: "Objets connectés",
      subcategory: "objets-connectes",
      rating: 4,
      description: "Montre connectée Garmin Venu avec GPS et suivi fitness avancé.",
      features: ["GPS intégré", "Suivi 24/7", "Écran AMOLED", "Autonomie 5 jours"]
    },
    "ht403": {
      id: "ht403",
      title: "NVIDIA Shield TV Pro",
      name: "NVIDIA Shield TV Pro",
      price: 458000,
      originalPrice: 491000,
      image: "Projet 1 - MarketPlace/produits/nvidia_shield.jpg",
      category: "TV, Home Cinéma",
      subcategory: "tv-home-cinema",
      rating: 5,
      description: "NVIDIA Shield TV Pro - Streaming box haute performance.",
      features: ["Tegra X1+", "4K HDR", "Android TV", "Gaming"]
    },
    "ht502": {
      id: "ht502",
      title: "Xbox Series S",
      name: "Xbox Series S",
      price: 491000,
      originalPrice: 557000,
      image: "Projet 1 - MarketPlace/produits/xbox_assassincreed_1.jpg",
      category: "Jeux vidéo",
      "subcategory": "jeux-video",
      rating: 5,
      description: "Console Xbox Series S nouvelle génération.",
      features: ["GPU 4 TFLOPs", "SSD 512GB", "120 FPS", "Ray tracing"]
    },
    "ht603": {
      id: "ht603",
      title: "Drone DJI Mini 2",
      name: "Drone DJI Mini 2",
      price: 275000,
      originalPrice: 65500,
      image: "Projet 1 - MarketPlace/produits/outi234_1.jpg",
      category: "Objets connectés",
      subcategory: "objets-connectes",
      rating: 5,
      description: "Drone DJI Mini 2 ultra-compact avec caméra 4K.",
      features: ["Caméra 4K", "Flight time 31min", "Poids 249g", "Portée 10km"]
    },
    "ht605": {
      id: "ht605",
      title: "Robot Aspirateur Intelligent",
      name: "Robot Aspirateur Intelligent",
      price: 392000,
      originalPrice: 523000,
      image: "Projet 1 - MarketPlace/produits/robotscuisseur.jpg",
      category: "Objets connectés",
      subcategory: "objets-connectes",
      rating: 4,
      description: "Robot aspirateur intelligent avec navigation laser.",
      features: ["Navigation laser", "Contrôle app", "Auto-recharge", "Capteurs anti-chute"]
    },
    "ht802": {
      id: "ht802",
      title: "Laptop Gaming Acer Helios 300",
      name: "Laptop Gaming Acer Helios 300",
      price: 982000,
      originalPrice: 1310000,
      image: "Projet 1 - MarketPlace/produits/laptop_gaming_acerhelios300_1.jpg",
      category: "Informatique",
      subcategory: "informatique",
      rating: 5,
      description: "Laptop gaming Acer Helios 300 avec carte graphique RTX.",
      features: ["NVIDIA RTX 3060", "Intel i7 11ème gen", "16Go RAM", "512Go SSD"]
    },
    "ht806": {
      id: "ht806",
      title: "PC Portable HP 24",
      name: "PC Portable HP 24",
      price: 850000,
      originalPrice: 982000,
      image: "Projet 1 - MarketPlace/produits/allinonehp24_df0102ns_1.jpg",
      category: "Informatique",
      subcategory: "informatique",
      rating: 4,
      description: "PC Portable HP All-in-One 24\" performance et élégance.",
      features: ["All-in-One", "Écran 24\"", "Intel i5", "512Go SSD"]
    },
    "ht402": {
      id: "ht402",
      title: "Sony 4K HDR Smart TV",
      name: "Sony 4K HDR Smart TV",
      price: 982000,
      originalPrice: 1310000,
      image: "Projet 1 - MarketPlace/produits/sony_x90j_1.jpg",
      category: "TV, Home Cinéma",
      subcategory: "tv-home-cinema",
      rating: 5,
      description: "Téléviseur Sony 65\" 4K HDR avec Google TV.",
      features: ["65\" 4K", "Google TV", "HDR", "Dolby Vision"]
    },
    "ht805": {
      id: "ht805",
      title: "Mini PC SEi8",
      name: "Mini PC SEi8",
      price: 458000,
      originalPrice: 589000,
      image: "Projet 1 - MarketPlace/produits/minipcsei8_1.jpg",
      category: "Informatique",
      subcategory: "informatique",
      rating: 4,
      description: "Mini PC Intel SEi8 compact et performant.",
      features: ["Intel i5", "Compact", "Wi-Fi 6", "Multi ports"]
    }
  },

  // Fashion Products
  fashion: {
    "f001": {
      id: "f001",
      title: "Mens Winter Leathers Jackets",
      name: "Mens Winter Leathers Jackets",
      price: 30000,
      originalPrice: 45000,
      image: "assets/images/products/jacket-3.jpg",
      category: "Vestes",
      subcategory: "vestes",
      rating: 4,
      description: "Veste d'hiver en cuir pour homme, style moderne et élégant.",
      features: ["Cuir véritable", "Doublure chaude", "Poches zippées", "Coupe moderne"]
    },
    "f002": {
      id: "f002",
      title: "Short de survêtement en molleton français Better Basics",
      name: "Short de survêtement en molleton français Better Basics",
      price: 12000,
      originalPrice: 18000,
      image: "assets/images/products/shorts-1.jpg",
      category: "Shorts",
      subcategory: "shorts",
      rating: 4,
      description: "Short de survêtement confortable en molleton français.",
      features: ["Molleton français", "Taille ajustable", "Poches laterales", "Confort optimal"]
    },
    "f003": {
      id: "f003",
      title: "Chaussures de tekking à air comprimé - blanches",
      name: "Chaussures de tekking à air comprimé - blanches",
      price: 31200,
      originalPrice: 33000,
      image: "assets/images/products/sports-6.jpg",
      category: "Chaussures Sport",
      subcategory: "sportif",
      rating: 4,
      description: "Chaussures de tekking avec technologie d'air comprimé.",
      features: ["Technologie Air", "Respirant", "Semelle antidérapante", "Design moderne"]
    },
    "f401": {
      id: "f401",
      title: "Boot With Suede Detail",
      name: "Boot With Suede Detail",
      price: 12000,
      originalPrice: 18000,
      image: "assets/images/products/shoe-3.jpg",
      category: "Bottes",
      subcategory: "bottes",
      rating: 4,
      description: "Botte élégante avec détails en daim de qualité.",
      features: ["Matériau daim", "Semelle cuir", "Fermeture zip", "Style urbain"]
    },
    "f501": {
      id: "f501",
      title: "men's leather formal wear shoes",
      name: "men's leather formal wear shoes",
      price: 33600,
      originalPrice: 46800,
      image: "assets/images/products/shoe-1.jpg",
      category: "Chaussures Habillées",
      subcategory: "officiel",
      rating: 5,
      description: "Chaussures habillées en cuir véritable pour homme.",
      features: ["Cuir véritable", "Semelle cuir", "Design classique", "Confort premium"]
    },
    "f601": {
      id: "f601",
      title: "casual men's brown shoes",
      name: "casual men's brown shoes",
      price: 30000,
      originalPrice: 33000,
      image: "assets/images/products/shoe-2.jpg",
      category: "Chaussures Décontractées",
      subcategory: "occasionnel",
      rating: 4,
      description: "Chaussures décontractées en cuir marron pour homme.",
      features: ["Cuir marron", "Style décontracté", "Semelle confortable", "Usage quotidien"]
    }
  }
};

// Global function to get product by ID
window.getProductById = function(productId) {
  // Search in high-tech products first
  if (ProductDatabase.highTech[productId]) {
    return ProductDatabase.highTech[productId];
  }
  
  // Search in fashion products
  if (ProductDatabase.fashion[productId]) {
    return ProductDatabase.fashion[productId];
  }
  
  // Fallback: search in main-page-product-actions.js productDatabase
  if (typeof getProductData === 'function') {
    return getProductData(productId);
  }
  
  return null;
};

// Make ProductDatabase globally available
window.ProductDatabase = ProductDatabase;