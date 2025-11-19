/*==================================*\
    SCRIPT DE RECHERCHE GLOBAL - VERSION COMPLÈTE
\*==================================*/

class GlobalSearch {
  constructor() {
    this.products = [];
    this.currentResults = [];
    this.isSearchActive = false;
    this.init();
  }

  init() {
    this.loadProducts();
    this.setupSearchFunctionality();
  }

  // Charger la base de données des produits - VERSION COMPLÈTE
  loadProducts() {
    // Produits ajoutés depuis toutes les pages HTML analysées
    this.products = [
      // ========== OBJETS CONNECTÉS ==========
      {
        id: 1,
        name: "Alarme Maison Intelligente",
        category: "Sécurité",
        price: "196,000 XAF",
        originalPrice: "294,000 XAF",
        page: "objets-connectes.html",
        image: "Projet 1 - MarketPlace/produits/alarmemaison_1.jpg",
        keywords: ["alarme", "maison", "connectée", "sécurité", "intelligente"]
      },
      {
        id: 2,
        name: "Drone DJI Mini 2",
        category: "Drones",
        price: "392,000 XAF",
        originalPrice: "523,000 XAF",
        page: "objets-connectes.html",
        image: "Projet 1 - MarketPlace/produits/djim-2.jpg",
        keywords: ["drone", "dji", "mini", "vol", "aérien"]
      },
      {
        id: 3,
        name: "Garmin Venu Montre Connectée",
        category: "Montres Connectées",
        price: "261,000 XAF",
        originalPrice: "327,000 XAF",
        page: "objets-connectes.html",
        image: "Projet 1 - MarketPlace/produits/garminvenu_1.jpg",
        keywords: ["montre", "connectée", "garmin", "fitness", "sport"]
      },
      {
        id: 4,
        name: "Casque VR Oculus Quest 2",
        category: "Réalité Virtuelle",
        price: "786,000 XAF",
        originalPrice: "982,000 XAF",
        page: "objets-connectes.html",
        image: "Projet 1 - MarketPlace/produits/oculusquest2_1.jpg",
        keywords: ["vr", "réalité virtuelle", "oculus", "quest", "casque"]
      },
      {
        id: 5,
        name: "Prise Connectée TP-Link",
        category: "Maison Intelligente",
        price: "32,700 XAF",
        originalPrice: "45,800 XAF",
        page: "objets-connectes.html",
        image: "Projet 1 - MarketPlace/produits/tplinkpriseconnectee_1.jpg",
        keywords: ["prise", "connectée", "tp-link", "domotique", "smart home"]
      },
      {
        id: 6,
        name: "Apple Hub Multiport 7-en-2",
        category: "Accessoires",
        price: "78,600 XAF",
        originalPrice: "104,800 XAF",
        page: "objets-connectes.html",
        image: "Projet 1 - MarketPlace/produits/apple_hub7en2_1.jpg",
        keywords: ["apple", "hub", "multiport", "usb-c", "adaptateur"]
      },
      {
        id: 7,
        name: "Convertisseur Adaptateur USB-C",
        category: "Accessoires",
        price: "26,000 XAF",
        originalPrice: "39,000 XAF",
        page: "objets-connectes.html",
        image: "Projet 1 - MarketPlace/produits/converteradapter_1.jpg",
        keywords: ["convertisseur", "adaptateur", "usb-c", "conversion", "câble"]
      },
      {
        id: 8,
        name: "Support Téléphone Voiture Connecté",
        category: "Auto",
        price: "45,500 XAF",
        originalPrice: "65,400 XAF",
        page: "objets-connectes.html",
        image: "Projet 1 - MarketPlace/produits/supporttelephonevoiture_1.jpg",
        keywords: ["support", "téléphone", "voiture", "auto", "montage"]
      },

      // ========== LAPTOPS ==========
      {
        id: 9,
        name: "Acer Predator Helios 300",
        category: "Gaming",
        price: "1,632,000 XAF",
        originalPrice: "1,960,000 XAF",
        page: "laptops.html",
        image: "Projet 1 - MarketPlace/produits/laptop_gaming_acerhelios300_1.jpg",
        keywords: ["laptop", "acer", "predator", "helios", "gaming", "gamer"]
      },
      {
        id: 10,
        name: "HP Pavilion 15",
        category: "Bureautique",
        price: "785,000 XAF",
        originalPrice: "982,000 XAF",
        page: "laptops.html",
        image: "Projet 1 - MarketPlace/produits/laptop_win_hp_1.jpg",
        keywords: ["laptop", "hp", "pavilion", "bureautique", "bureau"]
      },
      {
        id: 11,
        name: "Dell Inspiron 15 3000",
        category: "Bureautique",
        price: "654,000 XAF",
        originalPrice: "818,000 XAF",
        page: "laptops.html",
        image: "Projet 1 - MarketPlace/produits/laptop_win_dellinspiron_1.jpg",
        keywords: ["laptop", "dell", "inspiron", "bureautique"]
      },
      {
        id: 12,
        name: "Chromebook 14",
        category: "Chromebook",
        price: "458,000 XAF",
        originalPrice: "572,000 XAF",
        page: "laptops.html",
        image: "Projet 1 - MarketPlace/produits/laptop_win_chrom_1.jpg",
        keywords: ["chromebook", "google", "chrome", "14"]
      },
      {
        id: 13,
        name: "HP Pavilion Gaming 15",
        category: "Gaming",
        price: "1,144,000 XAF",
        originalPrice: "1,310,000 XAF",
        page: "laptops.html",
        image: "Projet 1 - MarketPlace/produits/laptop_gaming_hp15dk1003sf_1.jpg",
        keywords: ["laptop", "hp", "pavilion", "gaming", "gamer"]
      },

      // ========== JEUX VIDÉO ==========
      {
        id: 14,
        name: "Console Xbox Series S",
        category: "Consoles",
        price: "491,000 XAF",
        originalPrice: "557,000 XAF",
        page: "jeux-video.html",
        image: "Projet 1 - MarketPlace/produits/xbox_assassincreed_1.jpg",
        keywords: ["xbox", "series s", "console", "gaming", "microsoft"]
      },
      {
        id: 15,
        name: "PlayStation 4",
        category: "Consoles",
        price: "327,000 XAF",
        originalPrice: "392,000 XAF",
        page: "jeux-video.html",
        image: "Projet 1 - MarketPlace/produits/ps4_1.jpg",
        keywords: ["playstation", "ps4", "console", "sony", "gaming"]
      },
      {
        id: 16,
        name: "PlayStation 5",
        category: "Consoles",
        price: "850,000 XAF",
        originalPrice: "1,048,000 XAF",
        page: "jeux-video.html",
        image: "Projet 1 - MarketPlace/produits/ps5_1.jpg",
        keywords: ["playstation", "ps5", "console", "sony", "gaming", "next-gen"]
      },
      {
        id: 17,
        name: "Console Xbox One X",
        category: "Consoles",
        price: "392,000 XAF",
        originalPrice: "458,000 XAF",
        page: "jeux-video.html",
        image: "Projet 1 - MarketPlace/produits/xbox_1.jpg",
        keywords: ["xbox", "one x", "console", "gaming", "microsoft"]
      },
      {
        id: 18,
        name: "PlayStation 4 FIFA 21 Bundle",
        category: "Jeux",
        price: "261,000 XAF",
        originalPrice: "392,000 XAF",
        page: "jeux-video.html",
        image: "Projet 1 - MarketPlace/produits/ps4_fifa21_1.jpg",
        keywords: ["ps4", "fifa", "fifa 21", "bundle", "jeu", "football", "sport"]
      },
      {
        id: 19,
        name: "FIFA 21 Jeu PS4",
        category: "Jeux",
        price: "32,700 XAF",
        originalPrice: "45,800 XAF",
        page: "jeux-video.html",
        image: "Projet 1 - MarketPlace/produits/fifa21_1.jpg",
        keywords: ["fifa", "fifa 21", "jeu", "ps4", "football", "sport"]
      },
      {
        id: 20,
        name: "Mario Bros Deluxe Switch",
        category: "Jeux",
        price: "26,000 XAF",
        originalPrice: "32,500 XAF",
        page: "jeux-video.html",
        image: "Projet 1 - MarketPlace/produits/mariobrosdeluxe_1.jpg",
        keywords: ["mario", "mario bros", "switch", "nintendo", "jeu", "deluxe"]
      },
      {
        id: 21,
        name: "Battlefield 5 PC",
        category: "Jeux",
        price: "39,200 XAF",
        originalPrice: "58,800 XAF",
        page: "jeux-video.html",
        image: "Projet 1 - MarketPlace/produits/battlefield5_1.jpg",
        keywords: ["battlefield", "battlefield 5", "pc", "jeu", "fps", "guerre"]
      },
      {
        id: 22,
        name: "Need for Speed Heat",
        category: "Jeux",
        price: "45,500 XAF",
        originalPrice: "65,400 XAF",
        page: "jeux-video.html",
        image: "Projet 1 - MarketPlace/produits/nfsh_1.jpg",
        keywords: ["need for speed", "nfs", "heat", "jeu", "course", "voiture"]
      },

      // ========== TÉLÉPHONIE ==========
      {
        id: 23,
        name: "iPhone 12 Pro Max",
        category: "Smartphones",
        price: "1,048,000 XAF",
        originalPrice: "1,310,000 XAF",
        page: "telephonie.html",
        image: "Projet 1 - MarketPlace/produits/iphone12promax_1.jpg",
        keywords: ["iphone", "12", "pro max", "apple", "smartphone", "ios"]
      },
      {
        id: 24,
        name: "Samsung Galaxy S21",
        category: "Smartphones",
        price: "785,000 XAF",
        originalPrice: "982,000 XAF",
        page: "telephonie.html",
        image: "Projet 1 - MarketPlace/produits/samsunggalxys21_1.jpg",
        keywords: ["samsung", "galaxy", "s21", "smartphone", "android"]
      },
      {
        id: 25,
        name: "Huawei P30 Lite",
        category: "Smartphones",
        price: "262,000 XAF",
        originalPrice: "327,000 XAF",
        page: "telephonie.html",
        image: "Projet 1 - MarketPlace/produits/huaweip30lite_1.jpg",
        keywords: ["huawei", "p30", "lite", "smartphone", "android"]
      },
      {
        id: 26,
        name: "Xiaomi Redmi Note 9",
        category: "Smartphones",
        price: "196,000 XAF",
        originalPrice: "327,000 XAF",
        page: "telephonie.html",
        image: "Projet 1 - MarketPlace/produits/xiaomiredminote9_1.jpg",
        keywords: ["xiaomi", "redmi", "note 9", "smartphone", "android"]
      },
      {
        id: 27,
        name: "Alcatel F890",
        category: "Smartphones",
        price: "85,000 XAF",
        originalPrice: "117,000 XAF",
        page: "telephonie.html",
        image: "Projet 1 - MarketPlace/produits/alcatelf890_1.jpg",
        keywords: ["alcatel", "f890", "smartphone", "android"]
      },
      {
        id: 28,
        name: "Huawei MatePad 11",
        category: "Tablettes",
        price: "392,000 XAF",
        originalPrice: "458,000 XAF",
        page: "telephonie.html",
        image: "Projet 1 - MarketPlace/produits/ta_huawei_matepad11_1.jpg",
        keywords: ["huawei", "matepad", "11", "tablette", "android"]
      },
      {
        id: 29,
        name: "iPad 10.2",
        category: "Tablettes",
        price: "458,000 XAF",
        originalPrice: "539,000 XAF",
        page: "telephonie.html",
        image: "Projet 1 - MarketPlace/produits/ehp_ipad102_1.jpg",
        keywords: ["ipad", "10.2", "apple", "tablette", "ios"]
      },
      {
        id: 30,
        name: "Samsung Galaxy Tab A7",
        category: "Tablettes",
        price: "261,000 XAF",
        originalPrice: "327,000 XAF",
        page: "telephonie.html",
        image: "Projet 1 - MarketPlace/produits/ta_sg_a7_1.jpg",
        keywords: ["samsung", "galaxy", "tab", "a7", "tablette", "android"]
      },

      // ========== TV, HOME CINÉMA ==========
      {
        id: 31,
        name: "Téléviseur Samsung 55\" 4K Smart TV",
        category: "Téléviseurs",
        price: "589,000 XAF",
        originalPrice: "851,000 XAF",
        page: "tv-home-cinema.html",
        image: "Projet 1 - MarketPlace/produits/tvsamsung_1.jpg",
        keywords: ["samsung", "téléviseur", "55", "4k", "smart tv"]
      },
      {
        id: 32,
        name: "Téléviseur Sony 65\" 4K HDR",
        category: "Téléviseurs",
        price: "982,000 XAF",
        originalPrice: "1,310,000 XAF",
        page: "tv-home-cinema.html",
        image: "Projet 1 - MarketPlace/produits/sony_x90j_1.jpg",
        keywords: ["sony", "téléviseur", "65", "4k", "hdr"]
      },
      {
        id: 33,
        name: "NVIDIA Shield TV Pro",
        category: "Boîtiers TV",
        price: "458,000 XAF",
        originalPrice: "491,000 XAF",
        page: "tv-home-cinema.html",
        image: "Projet 1 - MarketPlace/produits/nvidia_shield.jpg",
        keywords: ["nvidia", "shield", "tv", "pro", "boîtier", "streaming"]
      },
      {
        id: 34,
        name: "Support Mural TV Réglable",
        category: "Accessoires TV",
        price: "65,400 XAF",
        originalPrice: "98,100 XAF",
        page: "tv-home-cinema.html",
        image: "Projet 1 - MarketPlace/produits/supportmuraltv_1.jpg",
        keywords: ["support", "mural", "tv", "réglable", "accessoire"]
      },
      {
        id: 35,
        name: "Décodeur Satellite Numérique",
        category: "Décodeurs",
        price: "130,800 XAF",
        originalPrice: "163,500 XAF",
        page: "tv-home-cinema.html",
        image: "Projet 1 - MarketPlace/produits/decodeur_1.jpg",
        keywords: ["décodeur", "satellite", "numérique", "tv"]
      },
      {
        id: 36,
        name: "Lecteur Blu-ray 4K",
        category: "Lecteurs",
        price: "327,000 XAF",
        originalPrice: "392,000 XAF",
        page: "tv-home-cinema.html",
        image: "Projet 1 - MarketPlace/produits/lecteurbluray_1.jpg",
        keywords: ["lecteur", "blu-ray", "4k", "dvd", "film"]
      },
      {
        id: 37,
        name: "Vidéoprojecteur Home Cinéma",
        category: "Vidéoprojecteurs",
        price: "1,147,500 XAF",
        originalPrice: "1,350,000 XAF",
        page: "tv-home-cinema.html",
        image: "Projet 1 - MarketPlace/produits/videoprojecteur_1.jpg",
        keywords: ["vidéoprojecteur", "home cinéma", "projection", "cinéma"]
      },
      {
        id: 38,
        name: "Antenne Satellite TNT",
        category: "Antennes",
        price: "85,650 XAF",
        originalPrice: "130,800 XAF",
        page: "tv-home-cinema.html",
        image: "Projet 1 - MarketPlace/produits/tntsatellite_1.jpg",
        keywords: ["antenne", "satellite", "tnt", "réception", "tv"]
      },

      // ========== PHOTO, CAMÉSCOPE ==========
      {
        id: 39,
        name: "Canon EOS M6 Mark II",
        category: "Appareils photo",
        price: "1,632,000 XAF",
        originalPrice: "1,960,000 XAF",
        page: "photo-camescope.html",
        image: "Projet 1 - MarketPlace/produits/canoneosm6mark2_1.jpg",
        keywords: ["canon", "eos", "m6", "mark ii", "appareil photo", "mirrorless"]
      },
      {
        id: 40,
        name: "Sony Alpha ZV-E10",
        category: "Appareils photo",
        price: "1,472,000 XAF",
        originalPrice: "1,792,000 XAF",
        page: "photo-camescope.html",
        image: "Projet 1 - MarketPlace/produits/sonyalphazve10_1.jpg",
        keywords: ["sony", "alpha", "zv-e10", "appareil photo", "mirrorless"]
      },
      {
        id: 41,
        name: "Panasonic Lumix FZ4 Bridge",
        category: "Appareils photo",
        price: "982,000 XAF",
        originalPrice: "1,178,400 XAF",
        page: "photo-camescope.html",
        image: "Projet 1 - MarketPlace/produits/panasoniclumixf4_1.jpg",
        keywords: ["panasonic", "lumix", "fz4", "bridge", "appareil photo"]
      },
      {
        id: 42,
        name: "Pentax K-70 + Objectif 18-135mm",
        category: "Reflex",
        price: "1,142,000 XAF",
        originalPrice: "1,437,000 XAF",
        page: "photo-camescope.html",
        image: "Projet 1 - MarketPlace/produits/reflexpentaxk70_1.jpg",
        keywords: ["pentax", "k-70", "reflex", "objectif", "18-135mm"]
      },
      {
        id: 43,
        name: "Caméscope Agfa 4K",
        category: "Caméscopes",
        price: "327,000 XAF",
        originalPrice: "458,000 XAF",
        page: "photo-camescope.html",
        image: "Projet 1 - MarketPlace/produits/camescopeagfa_1.jpg",
        keywords: ["caméscope", "agfa", "4k", "vidéo", "film"]
      },
      {
        id: 44,
        name: "Caméra Action Hero 8",
        category: "Caméras d'action",
        price: "785,000 XAF",
        originalPrice: "982,000 XAF",
        page: "photo-camescope.html",
        image: "Projet 1 - MarketPlace/produits/cameraactionher08_1.jpg",
        keywords: ["caméra", "action", "hero 8", "sport", "go pro"]
      },
      {
        id: 45,
        name: "Caméra Étanche IP68",
        category: "Caméras d'action",
        price: "196,000 XAF",
        originalPrice: "245,000 XAF",
        page: "photo-camescope.html",
        image: "Projet 1 - MarketPlace/produits/cameraetancheip_1.jpg",
        keywords: ["caméra", "étanche", "ip68", "sport", "imperméable"]
      },
      {
        id: 46,
        name: "Canon PowerShot A2200",
        category: "Compacts",
        price: "327,000 XAF",
        originalPrice: "392,000 XAF",
        page: "photo-camescope.html",
        image: "Projet 1 - MarketPlace/produits/canonpowershota2200_1.jpg",
        keywords: ["canon", "powershot", "a2200", "compact", "appareil photo"]
      },

      // ========== PC FIXES, ÉCRANS ==========
      {
        id: 47,
        name: "Dell OptiPlex 3280 All-in-One",
        category: "Ordinateurs fixes",
        price: "785,000 XAF",
        originalPrice: "982,000 XAF",
        page: "pc-fixes-ecran.html",
        image: "Projet 1 - MarketPlace/produits/delloptiplex3280_1.jpg",
        keywords: ["dell", "optiplex", "3280", "all-in-one", "ordinateur"]
      },
      {
        id: 48,
        name: "HP EliteDesk 8300 SFF",
        category: "Ordinateurs fixes",
        price: "523,000 XAF",
        originalPrice: "654,000 XAF",
        page: "pc-fixes-ecran.html",
        image: "Projet 1 - MarketPlace/produits/hpelite8300_1.jpg",
        keywords: ["hp", "elitedesk", "8300", "sff", "ordinateur"]
      },
      {
        id: 49,
        name: "Écran Dell 24\" Full HD",
        category: "Écrans",
        price: "327,000 XAF",
        originalPrice: "392,000 XAF",
        page: "pc-fixes-ecran.html",
        image: "Projet 1 - MarketPlace/produits/ecrandell_1.jpg",
        keywords: ["dell", "écran", "24", "full hd", "monitor"]
      },
      {
        id: 50,
        name: "Écran Samsung 27\" 4K",
        category: "Écrans",
        price: "654,000 XAF",
        originalPrice: "818,000 XAF",
        page: "pc-fixes-ecran.html",
        image: "Projet 1 - MarketPlace/produits/ecransamsung_1.jpg",
        keywords: ["samsung", "écran", "27", "4k", "monitor"]
      },
      {
        id: 51,
        name: "Écran LG 32\" UltraWide",
        category: "Écrans",
        price: "785,000 XAF",
        originalPrice: "982,000 XAF",
        page: "pc-fixes-ecran.html",
        image: "Projet 1 - MarketPlace/produits/ecranlg_1.jpg",
        keywords: ["lg", "écran", "32", "ultrawide", "monitor"]
      },
      {
        id: 52,
        name: "MSI Pro 24X All-in-One",
        category: "Ordinateurs fixes",
        price: "982,000 XAF",
        originalPrice: "1,144,000 XAF",
        page: "pc-fixes-ecran.html",
        image: "Projet 1 - MarketPlace/produits/allinone_msipro24x_1.jpg",
        keywords: ["msi", "pro", "24x", "all-in-one", "ordinateur"]
      },
      {
        id: 53,
        name: "HP 24-DF0102NS All-in-One",
        category: "Ordinateurs fixes",
        price: "851,000 XAF",
        originalPrice: "1,001,000 XAF",
        page: "pc-fixes-ecran.html",
        image: "Projet 1 - MarketPlace/produits/allinonehp24_df0102ns_1.jpg",
        keywords: ["hp", "24-df0102ns", "all-in-one", "ordinateur"]
      },
      {
        id: 54,
        name: "Lenovo ThinkCentre M58p",
        category: "Ordinateurs fixes",
        price: "458,000 XAF",
        originalPrice: "572,000 XAF",
        page: "pc-fixes-ecran.html",
        image: "Projet 1 - MarketPlace/produits/ucthinkcentrem58p_1.jpg",
        keywords: ["lenovo", "thinkcentre", "m58p", "ordinateur"]
      },

      // ========== COMPOSANTS ==========
      {
        id: 55,
        name: "Intel Core i7-11700K",
        category: "Processeurs",
        price: "392,000 XAF",
        originalPrice: "458,000 XAF",
        page: "composants.html",
        image: "Projet 1 - MarketPlace/produits/processeur_intel11700k_1.jpg",
        keywords: ["intel", "core", "i7", "11700k", "processeur", "cpu"]
      },
      {
        id: 56,
        name: "Intel Core i7-10700K",
        category: "Processeurs",
        price: "327,000 XAF",
        originalPrice: "392,000 XAF",
        page: "composants.html",
        image: "Projet 1 - MarketPlace/produits/i7-11700K.jpg",
        keywords: ["intel", "core", "i7", "10700k", "processeur", "cpu"]
      },
      {
        id: 57,
        name: "Intel Core i5-11600K",
        category: "Processeurs",
        price: "261,000 XAF",
        originalPrice: "327,000 XAF",
        page: "composants.html",
        image: "Projet 1 - MarketPlace/produits/i5-11600K.jpg",
        keywords: ["intel", "core", "i5", "11600k", "processeur", "cpu"]
      },
      {
        id: 58,
        name: "Intel Core i5-10600K",
        category: "Processeurs",
        price: "228,000 XAF",
        originalPrice: "261,000 XAF",
        page: "composants.html",
        image: "Projet 1 - MarketPlace/produits/i5-10600K.jpg",
        keywords: ["intel", "core", "i5", "10600k", "processeur", "cpu"]
      },
      {
        id: 59,
        name: "Kit Mémoire RAM 16GB DDR4",
        category: "Mémoire",
        price: "98,000 XAF",
        originalPrice: "130,000 XAF",
        page: "composants.html",
        image: "Projet 1 - MarketPlace/produits/pcgamer_memory_1.jpg",
        keywords: ["mémoire", "ram", "16gb", "ddr4", "ram"]
      },
      {
        id: 60,
        name: "Mini PC Intel i5-8259U",
        category: "Mini PC",
        price: "392,000 XAF",
        originalPrice: "458,000 XAF",
        page: "composants.html",
        image: "Projet 1 - MarketPlace/produits/minipcsei8_1.jpg",
        keywords: ["mini", "pc", "intel", "i5", "8259u"]
      },
      {
        id: 61,
        name: "Mini PC Intel i5-7200U",
        category: "Mini PC",
        price: "327,000 XAF",
        originalPrice: "385,000 XAF",
        page: "composants.html",
        image: "Projet 1 - MarketPlace/produits/minipcum700_1.jpg",
        keywords: ["mini", "pc", "intel", "i5", "7200u"]
      },
      {
        id: 62,
        name: "PC Gaming Cérbère RTX 3060",
        category: "PC Gaming",
        price: "1,632,000 XAF",
        originalPrice: "1,960,000 XAF",
        page: "composants.html",
        image: "Projet 1 - MarketPlace/produits/pcgaming_cerbere_1.jpg",
        keywords: ["pc", "gaming", "cérbère", "rtx", "3060", "gamer"]
      }
    ];
  }

  // Configurer la fonctionnalité de recherche
  setupSearchFunctionality() {
    // Trouver tous les champs de recherche
    const searchFields = document.querySelectorAll('.search-field');
    
    searchFields.forEach((searchField, index) => {
      // Créer le conteneur des résultats
      this.createSearchResultsContainer(searchField);
      
      // Event listeners
      searchField.addEventListener('input', (e) => {
        this.handleSearch(e.target.value, index);
      });
      
      searchField.addEventListener('focus', (e) => {
        this.handleSearch(e.target.value, index);
      });
      
      // Fermer les résultats en cliquant ailleurs
      document.addEventListener('click', (e) => {
        const searchContainer = searchField.closest('.header-search-container');
        const resultsContainer = searchContainer?.querySelector('.search-results');
        
        if (!searchContainer?.contains(e.target) && resultsContainer) {
          this.hideResults(index);
        }
      });
      
      // Gérer la touche Enter
      searchField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.performSearch(searchField.value, index);
        }
        if (e.key === 'Escape') {
          this.hideResults(index);
          searchField.blur();
        }
      });
    });
  }

  // Créer le conteneur des résultats de recherche
  createSearchResultsContainer(searchField) {
    const searchContainer = searchField.closest('.header-search-container');
    if (!searchContainer) return;

    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    resultsContainer.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-height: 400px;
      overflow-y: auto;
      z-index: 1000;
      display: none;
    `;
    
    searchContainer.style.position = 'relative';
    searchContainer.appendChild(resultsContainer);
  }

  // Gérer la recherche en temps réel
  handleSearch(query, searchIndex) {
    if (query.trim().length < 2) {
      this.hideResults(searchIndex);
      return;
    }

    const results = this.searchProducts(query);
    this.displayResults(results, searchIndex);
  }

  // Rechercher dans les produits
  searchProducts(query) {
    const searchTerm = query.toLowerCase().trim();
    
    return this.products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const categoryMatch = product.category.toLowerCase().includes(searchTerm);
      const keywordMatch = product.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      );
      
      return nameMatch || categoryMatch || keywordMatch;
    }).slice(0, 8); // Limiter à 8 résultats
  }

  // Afficher les résultats
  displayResults(results, searchIndex) {
    const searchFields = document.querySelectorAll('.search-field');
    const searchField = searchFields[searchIndex];
    const searchContainer = searchField.closest('.header-search-container');
    const resultsContainer = searchContainer?.querySelector('.search-results');
    
    if (!resultsContainer) return;

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-no-results" style="padding: 20px; text-align: center; color: #666;">
          Aucun produit trouvé pour "${searchField.value}"
        </div>
      `;
    } else {
      resultsContainer.innerHTML = results.map(product => `
        <div class="search-result-item" style="
          display: flex; 
          align-items: center; 
          padding: 12px; 
          border-bottom: 1px solid #f0f0f0; 
          cursor: pointer;
          transition: background-color 0.2s;
        " onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='white'">
          <img src="${product.image}" alt="${product.name}" style="
            width: 50px; 
            height: 50px; 
            object-fit: cover; 
            border-radius: 6px; 
            margin-right: 12px;
          ">
          <div style="flex: 1;">
            <div style="font-weight: 600; color: #333; margin-bottom: 4px;">${product.name}</div>
            <div style="color: #666; font-size: 14px; margin-bottom: 4px;">${product.category}</div>
            <div style="color: #ff6600; font-weight: 600; font-size: 14px;">${product.price}</div>
          </div>
        </div>
      `).join('');
      
      // Ajouter des événements click
      resultsContainer.querySelectorAll('.search-result-item').forEach((item, index) => {
        item.addEventListener('click', () => {
          this.goToProduct(results[index]);
        });
      });
    }
    
    resultsContainer.style.display = 'block';
    this.isSearchActive = true;
  }

  // Cacher les résultats
  hideResults(searchIndex) {
    const searchFields = document.querySelectorAll('.search-field');
    const searchField = searchFields[searchIndex];
    const searchContainer = searchField.closest('.header-search-container');
    const resultsContainer = searchContainer?.querySelector('.search-results');
    
    if (resultsContainer) {
      resultsContainer.style.display = 'none';
    }
    this.isSearchActive = false;
  }

  // Effectuer une recherche complète
  performSearch(query, searchIndex) {
    if (query.trim().length < 2) {
      alert('Veuillez entrer au moins 2 caractères pour la recherche.');
      return;
    }

    const results = this.searchProducts(query);
    
    if (results.length === 0) {
      alert(`Aucun produit trouvé pour "${query}". Essayez d'autres mots-clés.`);
      return;
    }

    // Rediriger vers la page du premier résultat ou afficher tous les résultats
    this.goToProduct(results[0]);
  }

  // Aller à un produit
  goToProduct(product) {
    // Option 1: Rediriger vers la page du produit
    window.location.href = product.page;
    
    // Option 2: Afficher les détails du produit (si vous voulez une modal)
    // this.showProductModal(product);
  }

  // Ajouter un produit à la base de données
  addProduct(product) {
    this.products.push({
      ...product,
      id: this.products.length + 1
    });
  }

  // Recherche avancée (optionnel)
  advancedSearch(filters) {
    return this.products.filter(product => {
      let match = true;
      
      if (filters.category && product.category !== filters.category) {
        match = false;
      }
      
      if (filters.minPrice && parseFloat(product.price.replace(/[^\d]/g, '')) < filters.minPrice) {
        match = false;
      }
      
      if (filters.maxPrice && parseFloat(product.price.replace(/[^\d]/g, '')) > filters.maxPrice) {
        match = false;
      }
      
      return match;
    });
  }
}

// Initialiser la recherche globale quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  window.globalSearch = new GlobalSearch();
});

// Ajouter quelques styles CSS pour la recherche
const searchStyles = document.createElement('style');
searchStyles.textContent = `
  .search-results {
    animation: fadeIn 0.2s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .search-result-item:hover {
    background-color: #f8f9fa;
  }
  
  .search-no-results {
    animation: fadeIn 0.2s ease;
  }
`;
document.head.appendChild(searchStyles);