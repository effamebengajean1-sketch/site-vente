/*==================================*\
    COMPREHENSIVE SEARCH SYSTEM
    Recherche globale pour tous les produits
   across all pages and categories
\*==================================*/

class ComprehensiveSearch {
  constructor() {
    this.products = [];
    this.categories = [
      { slug: 'laptops', name: 'Laptops', file: 'laptops.html' },
      { slug: 'telephonie', name: 'Téléphonie', file: 'telephonie.html' },
      { slug: 'photo-camescope', name: 'Photo, caméscope', file: 'photo-camescope.html' },
      { slug: 'jeux-video', name: 'Jeux vidéo', file: 'jeux-video.html' },
      { slug: 'pc-fixes-ecran', name: 'PC fixes, écran', file: 'pc-fixes-ecran.html' },
      { slug: 'tablettes', name: 'Tablettes', file: 'tablettes.html' },
      { slug: 'composants', name: 'Composants', file: 'composants.html' },
      { slug: 'stockage', name: 'Stockage', file: 'stockage.htm' },
      { slug: 'accessoires', name: 'Accessoires', file: 'accessoires.html' },
      { slug: 'objets-connectes', name: 'Objets connectés', file: 'objets-connectes.html' },
      { slug: 'audio-hifi', name: 'Audio & Hi-Fi', file: 'audio-hifi.html' },
      { slug: 'tv-home-cinema', name: 'TV & Home Cinéma', file: 'tv-home-cinema.html' },
      { slug: 'femme', name: 'Femme', file: 'femme.html' },
      { slug: 'homme', name: 'Homme', file: 'homme.html' },
      { slug: 'enfants', name: 'Enfants', file: 'enfants.html' },
      { slug: 'bagages', name: 'Bagages', file: 'bagages.html' },
      { slug: 'lavage-sechage', name: 'Lavage et séchage', file: 'lavage-sechage.html' },
      { slug: 'froid', name: 'Froid', file: 'froid.html' },
      { slug: 'cuisson', name: 'Cuisson', file: 'cuisson.html' },
      { slug: 'climatisation-ventilation', name: 'Climatisation & Ventilation', file: 'climatisation-ventilation.html' },
      { slug: 'entretien-maison', name: 'Entretien maison', file: 'entretien-maison.html' },
      { slug: 'beaute-hygiene-sante', name: 'Beauté, hygiène & santé', file: 'beaute-hygiene-sante.html' },
      { slug: 'salon', name: 'Salon', file: 'salon.html' },
      { slug: 'luminaire', name: 'Luminaire', file: 'luminaire.html' },
      { slug: 'rangements', name: 'Rangements', file: 'rangements.html' }
    ];
    
    this.currentResults = [];
    this.isSearchActive = false;
    this.searchIndex = 0;
    this.init();
  }

  init() {
    this.loadAllProducts();
    this.setupSearchFunctionality();
    console.log('Comprehensive Search System Initialized');
  }

  // Charger tous les produits depuis tous les fichiers JSON et pages
  async loadAllProducts() {
    try {
      // Charger les produits depuis high-tech-products.json
      const highTechResponse = await fetch('high-tech-products.json');
      if (highTechResponse.ok) {
        const highTechData = await highTechResponse.json();
        if (highTechData['high-tech'] && highTechData['high-tech'].products) {
          highTechData['high-tech'].products.forEach(product => {
            product.category = 'High-Tech';
            product.page = this.getCategoryFile(product.subcategory);
            this.products.push(product);
          });
        }
      }
    } catch (error) {
      console.warn('Could not load high-tech products:', error);
    }

    // Charger les produits de mode depuis fashion-products.json
    try {
      const fashionResponse = await fetch('fashion-products.json');
      if (fashionResponse.ok) {
        const fashionData = await fashionResponse.json();
        if (fashionData.fashion && fashionData.fashion.products) {
          fashionData.fashion.products.forEach(product => {
            product.category = product.category || 'Mode';
            product.page = this.getFashionCategoryFile(product.subcategory);
            if (!product.keywords) {
              product.keywords = this.generateKeywords(product);
            }
            this.products.push(product);
          });
        }
      }
    } catch (error) {
      console.warn('Could not load fashion products:', error);
    }

    // Ajouter les produits statiques des pages category
    this.addStaticProducts();
    
    // Trier les produits par nom
    this.products.sort((a, b) => a.name.localeCompare(b.name));
    
    console.log(`Loaded ${this.products.length} products total`);
  }

  // Obtenir le fichier de catégorie à partir du slug
  getCategoryFile(subcategorySlug) {
    const categoryMap = {
      'telephonie': 'telephonie.html',
      'photo-camescope': 'photo-camescope.html',
      'jeux-video': 'jeux-video.html',
      'objets-connectes': 'objets-connectes.html',
      'audio-hifi': 'audio-hifi.html',
      'tv-home-cinema': 'tv-home-cinema.html',
      'informatique': 'laptops.html'
    };
    return categoryMap[subcategorySlug] || 'index.html';
  }

  // Obtenir le fichier de catégorie pour les produits de mode
  getFashionCategoryFile(subcategorySlug) {
    const categoryMap = {
      'vestes': 'homme.html',
      'shorts': 'homme.html',
      'sportif': 'homme.html',
      'bottes': 'homme.html',
      'officiel': 'homme.html',
      'occasionnel': 'homme.html'
    };
    return categoryMap[subcategorySlug] || 'index.html';
  }

  // Générer des mots-clés pour un produit
  generateKeywords(product) {
    const keywords = [];
    const name = product.name.toLowerCase();
    
    // Ajouter des mots du nom
    keywords.push(...name.split(' ').filter(word => word.length > 2));
    
    // Ajouter la catégorie
    if (product.category) {
      keywords.push(product.category.toLowerCase());
    }
    
    // Ajouter des mots-clés spécifiques selon le type
    if (name.includes('chaussure') || name.includes('shoe')) {
      keywords.push('chaussure', 'shoe', 'footwear');
    }
    if (name.includes('veste') || name.includes('jacket')) {
      keywords.push('veste', 'jacket', 'manteau');
    }
    if (name.includes('short')) {
      keywords.push('short', 'pantalon');
    }
    
    return keywords;
  }

  // Ajouter les produits statiques des pages HTML
  addStaticProducts() {
    // Laptops
    const laptops = [
      {
        id: 'lt001',
        name: 'Acer Predator Helios 300',
        category: 'Gaming',
        subcategory: 'laptops',
        price: '1,632,000',
        originalPrice: '1,960,000',
        page: 'laptops.html',
        image: 'Projet 1 - MarketPlace/produits/laptop_gaming_acerhelios300_1.jpg',
        keywords: ['laptop', 'acer', 'predator', 'helios', 'gaming', 'gamer'],
        rating: 5
      },
      {
        id: 'lt002',
        name: 'HP Pavilion 15',
        category: 'Bureautique',
        subcategory: 'laptops',
        price: '785,000',
        originalPrice: '982,000',
        page: 'laptops.html',
        image: 'Projet 1 - MarketPlace/produits/laptop_win_hp_1.jpg',
        keywords: ['laptop', 'hp', 'pavilion', 'bureautique', 'bureau'],
        rating: 5
      },
      {
        id: 'lt003',
        name: 'Dell Inspiron 15 3000',
        category: 'Bureautique',
        subcategory: 'laptops',
        price: '654,000',
        originalPrice: '818,000',
        page: 'laptops.html',
        image: 'Projet 1 - MarketPlace/produits/laptop_win_dellinspiron_1.jpg',
        keywords: ['laptop', 'dell', 'inspiron', 'bureautique'],
        rating: 4
      },
      {
        id: 'lt004',
        name: 'Chromebook 14"',
        category: 'Chromebook',
        subcategory: 'laptops',
        price: '458,000',
        originalPrice: '572,000',
        page: 'laptops.html',
        image: 'Projet 1 - MarketPlace/produits/laptop_win_chrom_1.jpg',
        keywords: ['chromebook', 'google', 'chrome', '14'],
        rating: 4
      },
      {
        id: 'lt005',
        name: 'HP Pavilion Gaming 15',
        category: 'Gaming',
        subcategory: 'laptops',
        price: '1,144,000',
        originalPrice: '1,310,000',
        page: 'laptops.html',
        image: 'Projet 1 - MarketPlace/produits/laptop_gaming_hp15dk1003sf_1.jpg',
        keywords: ['laptop', 'hp', 'pavilion', 'gaming', 'gamer'],
        rating: 4
      },
      {
        id: 'lt006',
        name: 'ASUS Chromebook Flip C434',
        category: 'Tactile',
        subcategory: 'laptops',
        price: '718,000',
        originalPrice: '851,000',
        page: 'laptops.html',
        image: 'Projet 1 - MarketPlace/produits/laptop_tactile_asusc434ta_1.jpg',
        keywords: ['chromebook', 'asus', 'flip', 'tactile'],
        rating: 5
      },
      {
        id: 'lt007',
        name: 'Lenovo Yoga 7i 14"',
        category: 'Tactile',
        subcategory: 'laptops',
        price: '982,000',
        originalPrice: '1,155,000',
        page: 'laptops.html',
        image: 'Projet 1 - MarketPlace/produits/laptop_tactile_len14ITL05_1.jpg',
        keywords: ['laptop', 'lenovo', 'yoga', 'tactile'],
        rating: 4
      },
      {
        id: 'lt008',
        name: 'LincPlus C3 14"',
        category: 'Budget',
        subcategory: 'laptops',
        price: '327,000',
        originalPrice: '392,000',
        page: 'laptops.html',
        image: 'Projet 1 - MarketPlace/produits/laptop_win_lincplus_1.jpg',
        keywords: ['laptop', 'lincplus', 'budget', 'pas cher'],
        rating: 3
      }
    ];

    // Téléphonie
    const phones = [
      {
        id: 'ph001',
        name: 'iPhone 12 Pro Max',
        category: 'Smartphones',
        subcategory: 'telephonie',
        price: '1,048,000',
        originalPrice: '1,310,000',
        page: 'telephonie.html',
        image: 'Projet 1 - MarketPlace/produits/iphone12promax_1.jpg',
        keywords: ['iphone', 'apple', 'smartphone', '12', 'pro', 'max'],
        rating: 5
      },
      {
        id: 'ph002',
        name: 'Samsung Galaxy S21',
        category: 'Smartphones',
        subcategory: 'telephonie',
        price: '785,000',
        originalPrice: '982,000',
        page: 'telephonie.html',
        image: 'Projet 1 - MarketPlace/produits/samsunggalxys21_1.jpg',
        keywords: ['samsung', 'galaxy', 'smartphone', 's21'],
        rating: 4
      },
      {
        id: 'ph003',
        name: 'Huawei P30 Lite',
        category: 'Smartphones',
        subcategory: 'telephonie',
        price: '262,000',
        originalPrice: '327,000',
        page: 'telephonie.html',
        image: 'Projet 1 - MarketPlace/produits/huaweip30lite_1.jpg',
        keywords: ['huawei', 'p30', 'smartphone', 'lite'],
        rating: 4
      },
      {
        id: 'ph004',
        name: 'Xiaomi Redmi Note 9',
        category: 'Smartphones',
        subcategory: 'telephonie',
        price: '196,000',
        originalPrice: '327,000',
        page: 'telephonie.html',
        image: 'Projet 1 - MarketPlace/produits/xiaomiredminote9_1.jpg',
        keywords: ['xiaomi', 'redmi', 'note', 'smartphone'],
        rating: 4
      },
      {
        id: 'ph005',
        name: 'Alcatel F890',
        category: 'Smartphones',
        subcategory: 'telephonie',
        price: '85,000',
        originalPrice: '117,000',
        page: 'telephonie.html',
        image: 'Projet 1 - MarketPlace/produits/alcatelf890_1.jpg',
        keywords: ['alcatel', 'smartphone', 'f890'],
        rating: 4
      },
      {
        id: 'ph006',
        name: 'Huawei MatePad 11',
        category: 'Tablettes',
        subcategory: 'telephonie',
        price: '392,000',
        originalPrice: '458,000',
        page: 'telephonie.html',
        image: 'Projet 1 - MarketPlace/produits/ta_huawei_matepad11_1.jpg',
        keywords: ['tablette', 'huawei', 'matepad', 'android'],
        rating: 5
      },
      {
        id: 'ph007',
        name: 'iPad 10.2"',
        category: 'Tablettes',
        subcategory: 'telephonie',
        price: '458,000',
        originalPrice: '539,000',
        page: 'telephonie.html',
        image: 'Projet 1 - MarketPlace/produits/ehp_ipad102_1.jpg',
        keywords: ['ipad', 'apple', 'tablette', '10.2'],
        rating: 4
      },
      {
        id: 'ph008',
        name: 'Samsung Galaxy Tab A7',
        category: 'Tablettes',
        subcategory: 'telephonie',
        price: '261,000',
        originalPrice: '327,000',
        page: 'telephonie.html',
        image: 'Projet 1 - MarketPlace/produits/ta_sg_a7_1.jpg',
        keywords: ['tablette', 'samsung', 'galaxy', 'tab'],
        rating: 3
      }
    ];

    // Photo, caméscope
    const photo = [
      {
        id: 'phc001',
        name: 'Canon EOS M6 Mark II',
        category: 'Appareils photo',
        subcategory: 'photo-camescope',
        price: '1,632,000',
        originalPrice: '1,960,000',
        page: 'photo-camescope.html',
        image: 'Projet 1 - MarketPlace/produits/canoneosm6mark2_1.jpg',
        keywords: ['canon', 'eos', 'appareil photo', 'm6', 'mark2'],
        rating: 5
      },
      {
        id: 'phc002',
        name: 'Sony Alpha ZV-E10',
        category: 'Appareils photo',
        subcategory: 'photo-camescope',
        price: '1,472,000',
        originalPrice: '1,792,000',
        page: 'photo-camescope.html',
        image: 'Projet 1 - MarketPlace/produits/sonyalphazve10_1.jpg',
        keywords: ['sony', 'alpha', 'zv-e10', 'appareil photo', 'vlog'],
        rating: 4
      },
      {
        id: 'phc003',
        name: 'Panasonic Lumix FZ4 Bridge',
        category: 'Appareils photo',
        subcategory: 'photo-camescope',
        price: '982,000',
        originalPrice: '1,178,400',
        page: 'photo-camescope.html',
        image: 'Projet 1 - MarketPlace/produits/panasoniclumixf4_1.jpg',
        keywords: ['panasonic', 'lumix', 'fz4', 'bridge', 'appareil photo'],
        rating: 4
      },
      {
        id: 'phc004',
        name: 'Pentax K-70 + Objectif 18-135mm',
        category: 'Reflex',
        subcategory: 'photo-camescope',
        price: '1,142,000',
        originalPrice: '1,437,000',
        page: 'photo-camescope.html',
        image: 'Projet 1 - MarketPlace/produits/reflexpentaxk70_1.jpg',
        keywords: ['pentax', 'k-70', 'reflex', 'objectif'],
        rating: 4
      },
      {
        id: 'phc005',
        name: 'Caméscope Agfa 4K',
        category: 'Caméscopes',
        subcategory: 'photo-camescope',
        price: '327,000',
        originalPrice: '458,000',
        page: 'photo-camescope.html',
        image: 'Projet 1 - MarketPlace/produits/camescopeagfa_1.jpg',
        keywords: ['caméscope', 'agfa', '4k', 'vidéo'],
        rating: 4
      },
      {
        id: 'phc006',
        name: 'Caméra Action Hero 8',
        category: 'Caméras d\'action',
        subcategory: 'photo-camescope',
        price: '785,000',
        originalPrice: '982,000',
        page: 'photo-camescope.html',
        image: 'Projet 1 - MarketPlace/produits/cameraactionher08_1.jpg',
        keywords: ['caméra action', 'hero8', 'étanche', 'sport'],
        rating: 5
      },
      {
        id: 'phc007',
        name: 'Caméra Étanche IP68',
        category: 'Caméras d\'action',
        subcategory: 'photo-camescope',
        price: '196,000',
        originalPrice: '245,000',
        page: 'photo-camescope.html',
        image: 'Projet 1 - MarketPlace/produits/cameraetancheip_1.jpg',
        keywords: ['caméra', 'étanche', 'ip68', 'sport'],
        rating: 4
      },
      {
        id: 'phc008',
        name: 'Canon PowerShot A2200',
        category: 'Compacts',
        subcategory: 'photo-camescope',
        price: '327,000',
        originalPrice: '392,000',
        page: 'photo-camescope.html',
        image: 'Projet 1 - MarketPlace/produits/canonpowershota2200_1.jpg',
        keywords: ['canon', 'powershot', 'compact', 'a2200'],
        rating: 3
      }
    ];

    // Jeux vidéo
    const gaming = [
      {
        id: 'gv001',
        name: 'Console Xbox Series S',
        category: 'Consoles',
        subcategory: 'jeux-video',
        price: '491,000',
        originalPrice: '557,000',
        page: 'jeux-video.html',
        image: 'Projet 1 - MarketPlace/produits/xbox_assassincreed_1.jpg',
        keywords: ['xbox', 'series s', 'console', 'gaming'],
        rating: 4
      },
      {
        id: 'gv002',
        name: 'PlayStation 4',
        category: 'Consoles',
        subcategory: 'jeux-video',
        price: '327,000',
        originalPrice: '392,000',
        page: 'jeux-video.html',
        image: 'Projet 1 - MarketPlace/produits/ps4_1.jpg',
        keywords: ['playstation', 'ps4', 'console', 'gaming'],
        rating: 5
      },
      {
        id: 'gv003',
        name: 'PlayStation 5',
        category: 'Consoles',
        subcategory: 'jeux-video',
        price: '850,000',
        originalPrice: '1,048,000',
        page: 'jeux-video.html',
        image: 'Projet 1 - MarketPlace/produits/ps5_1.jpg',
        keywords: ['playstation', 'ps5', 'console', 'gaming'],
        rating: 5
      },
      {
        id: 'gv004',
        name: 'Console Xbox One X',
        category: 'Consoles',
        subcategory: 'jeux-video',
        price: '392,000',
        originalPrice: '458,000',
        page: 'jeux-video.html',
        image: 'Projet 1 - MarketPlace/produits/xbox_1.jpg',
        keywords: ['xbox', 'one x', 'console', 'gaming'],
        rating: 4
      },
      {
        id: 'gv005',
        name: 'PlayStation 4 FIFA 21 Bundle',
        category: 'Jeux',
        subcategory: 'jeux-video',
        price: '261,000',
        originalPrice: '392,000',
        page: 'jeux-video.html',
        image: 'Projet 1 - MarketPlace/produits/ps4_fifa21_1.jpg',
        keywords: ['fifa21', 'bundle', 'ps4', 'football'],
        rating: 4
      },
      {
        id: 'gv006',
        name: 'FIFA 21 Jeu PS4',
        category: 'Jeux',
        subcategory: 'jeux-video',
        price: '32,700',
        originalPrice: '45,800',
        page: 'jeux-video.html',
        image: 'Projet 1 - MarketPlace/produits/fifa21_1.jpg',
        keywords: ['fifa', 'football', 'ps4', 'jeu'],
        rating: 4
      },
      {
        id: 'gv007',
        name: 'Mario Bros Deluxe Switch',
        category: 'Jeux',
        subcategory: 'jeux-video',
        price: '26,000',
        originalPrice: '32,500',
        page: 'jeux-video.html',
        image: 'Projet 1 - MarketPlace/produits/mariobrosdeluxe_1.jpg',
        keywords: ['mario', 'bros', 'switch', 'nintendo'],
        rating: 5
      },
      {
        id: 'gv008',
        name: 'Battlefield 5 PC',
        category: 'Jeux',
        subcategory: 'jeux-video',
        price: '39,200',
        originalPrice: '58,800',
        page: 'jeux-video.html',
        image: 'Projet 1 - MarketPlace/produits/battlefield5_1.jpg',
        keywords: ['battlefield', '5', 'pc', 'fps'],
        rating: 4
      },
      {
        id: 'gv009',
        name: 'Need for Speed Heat',
        category: 'Jeux',
        subcategory: 'jeux-video',
        price: '45,500',
        originalPrice: '65,400',
        page: 'jeux-video.html',
        image: 'Projet 1 - MarketPlace/produits/nfsh_1.jpg',
        keywords: ['need for speed', 'heat', 'course', 'auto'],
        rating: 4
      }
    ];

    // PC Fixes, écrans
    const pcFixes = [
      {
        id: 'pcf001',
        name: 'Dell OptiPlex 3280 All-in-One',
        category: 'Ordinateurs fixes',
        subcategory: 'pc-fixes-ecran',
        price: '785,000',
        originalPrice: '982,000',
        page: 'pc-fixes-ecran.html',
        image: 'Projet 1 - MarketPlace/produits/delloptiplex3280_1.jpg',
        keywords: ['dell', 'optiplex', 'all-in-one', 'pc', 'ordinateur'],
        rating: 5
      },
      {
        id: 'pcf002',
        name: 'HP EliteDesk 8300 SFF',
        category: 'Ordinateurs fixes',
        subcategory: 'pc-fixes-ecran',
        price: '523,000',
        originalPrice: '654,000',
        page: 'pc-fixes-ecran.html',
        image: 'Projet 1 - MarketPlace/produits/hpelite8300_1.jpg',
        keywords: ['hp', 'elitedesk', 'sff', 'pc', 'ordinateur'],
        rating: 4
      },
      {
        id: 'pcf003',
        name: 'Écran Dell 24" Full HD',
        category: 'Écrans',
        subcategory: 'pc-fixes-ecran',
        price: '327,000',
        originalPrice: '392,000',
        page: 'pc-fixes-ecran.html',
        image: 'Projet 1 - MarketPlace/produits/ecrandell_1.jpg',
        keywords: ['dell', 'écran', '24', 'full hd', 'monitor'],
        rating: 4
      },
      {
        id: 'pcf004',
        name: 'Écran Samsung 27" 4K',
        category: 'Écrans',
        subcategory: 'pc-fixes-ecran',
        price: '654,000',
        originalPrice: '818,000',
        page: 'pc-fixes-ecran.html',
        image: 'Projet 1 - MarketPlace/produits/ecransamsung_1.jpg',
        keywords: ['samsung', 'écran', '27', '4k', 'monitor'],
        rating: 4
      },
      {
        id: 'pcf005',
        name: 'Écran LG 32" UltraWide',
        category: 'Écrans',
        subcategory: 'pc-fixes-ecran',
        price: '785,000',
        originalPrice: '982,000',
        page: 'pc-fixes-ecran.html',
        image: 'Projet 1 - MarketPlace/produits/ecranlg_1.jpg',
        keywords: ['lg', 'écran', '32', 'ultrawide', 'monitor'],
        rating: 4
      },
      {
        id: 'pcf006',
        name: 'MSI Pro 24X All-in-One',
        category: 'Ordinateurs fixes',
        subcategory: 'pc-fixes-ecran',
        price: '982,000',
        originalPrice: '1,144,000',
        page: 'pc-fixes-ecran.html',
        image: 'Projet 1 - MarketPlace/produits/allinone_msipro24x_1.jpg',
        keywords: ['msi', 'pro', '24x', 'all-in-one', 'pc'],
        rating: 5
      },
      {
        id: 'pcf007',
        name: 'HP 24-DF0102NS All-in-One',
        category: 'Ordinateurs fixes',
        subcategory: 'pc-fixes-ecran',
        price: '851,000',
        originalPrice: '1,001,000',
        page: 'pc-fixes-ecran.html',
        image: 'Projet 1 - MarketPlace/produits/allinonehp24_df0102ns_1.jpg',
        keywords: ['hp', '24', 'df0102ns', 'all-in-one', 'pc'],
        rating: 4
      },
      {
        id: 'pcf008',
        name: 'Lenovo ThinkCentre M58p',
        category: 'Ordinateurs fixes',
        subcategory: 'pc-fixes-ecran',
        price: '458,000',
        originalPrice: '572,000',
        page: 'pc-fixes-ecran.html',
        image: 'Projet 1 - MarketPlace/produits/ucthinkcentrem58p_1.jpg',
        keywords: ['lenovo', 'thinkcentre', 'm58p', 'pc', 'ordinateur'],
        rating: 3
      }
    ];

    // Accessoires
    const accessoires = [
      {
        id: 'acc001',
        name: 'Hub USB-C 7-en-2 Apple',
        category: 'Hubs USB',
        subcategory: 'accessoires',
        price: '75,000',
        originalPrice: '95,000',
        page: 'accessoires.html',
        image: 'Projet 1 - MarketPlace/produits/apple_hub7en2_1.jpg',
        keywords: ['apple', 'hub', 'usb-c', '7-en-2', 'adaptateur'],
        rating: 5
      },
      {
        id: 'acc002',
        name: 'Adaptateur Dongle iPhone',
        category: 'Adaptateurs',
        subcategory: 'accessoires',
        price: '15,000',
        originalPrice: '20,000',
        page: 'accessoires.html',
        image: 'Projet 1 - MarketPlace/produits/adapteurdongleiphone_1.jpg',
        keywords: ['adaptateur', 'dongle', 'iphone', 'apple'],
        rating: 4
      },
      {
        id: 'acc003',
        name: 'Convertisseur Adaptateur Universel',
        category: 'Convertisseurs',
        subcategory: 'accessoires',
        price: '25,000',
        originalPrice: '35,000',
        page: 'accessoires.html',
        image: 'Projet 1 - MarketPlace/produits/converteradapter_1.jpg',
        keywords: ['convertisseur', 'adaptateur', 'universel'],
        rating: 4
      },
      {
        id: 'acc004',
        name: 'Prise Connectée WiFi TP-Link',
        category: 'Domotique',
        subcategory: 'accessoires',
        price: '18,000',
        originalPrice: '25,000',
        page: 'accessoires.html',
        image: 'Projet 1 - MarketPlace/produits/tplinkpriseconnectee_1.jpg',
        keywords: ['prise', 'connectée', 'wifi', 'tp-link', 'domotique'],
        rating: 4
      },
      {
        id: 'acc005',
        name: 'Support Téléphone Voiture Magnétique',
        category: 'Supports',
        subcategory: 'accessoires',
        price: '12,000',
        originalPrice: '18,000',
        page: 'accessoires.html',
        image: 'Projet 1 - MarketPlace/produits/supporttelephonevoiture_1.jpg',
        keywords: ['support', 'téléphone', 'voiture', 'magnétique'],
        rating: 4
      },
      {
        id: 'acc006',
        name: 'Tablette Graphique Wacom CTL-672',
        category: 'Tablettes graphiques',
        subcategory: 'accessoires',
        price: '85,000',
        originalPrice: '110,000',
        page: 'accessoires.html',
        image: 'Projet 1 - MarketPlace/produits/tg_wacom_ctl_672_1.jpg',
        keywords: ['tablette', 'graphique', 'wacom', 'ctl-672'],
        rating: 5
      },
      {
        id: 'acc007',
        name: 'Pare-soleil Objectif Universel',
        category: 'Accessoires photo',
        subcategory: 'accessoires',
        price: '8,000',
        originalPrice: '12,000',
        page: 'accessoires.html',
        image: 'Projet 1 - MarketPlace/produits/paresoleil_1.jpg',
        keywords: ['pare-soleil', 'objectif', 'universel', 'photo'],
        rating: 4
      },
      {
        id: 'acc008',
        name: 'Manette de Jeu Sans Fil',
        category: 'Gaming',
        subcategory: 'accessoires',
        price: '35,000',
        originalPrice: '45,000',
        page: 'accessoires.html',
        image: 'Projet 1 - MarketPlace/produits/access_manette_1.jpg',
        keywords: ['manette', 'jeu', 'sans fil', 'gaming'],
        rating: 3
      }
    ];

    // Ajouter tous les produits au tableau principal
    this.products.push(...laptops, ...phones, ...photo, ...gaming, ...pcFixes, ...accessoires);
    
    // Ajouter les produits électroménager
    this.addElectroProducts();
    
    // Ajouter les produits de meubles et maison
    this.addHomeProducts();
  }

  // Ajouter les produits électroménager
  addElectroProducts() {
    const electroProducts = [
      // Lavage et séchage
      {
        id: 'elec001',
        name: 'Lave-linge Samsung 8kg',
        category: 'Lavage',
        subcategory: 'lavage-sechage',
        price: '450,000',
        originalPrice: '550,000',
        page: 'lavage-sechage.html',
        image: 'images_electro_menager/lave-linge-1.jpg',
        keywords: ['lave-linge', 'samsung', 'machine', 'lavage', '8kg'],
        rating: 4
      },
      {
        id: 'elec002',
        name: 'Lave-vaisselle Bosch 12 couverts',
        category: 'Lavage',
        subcategory: 'lavage-sechage',
        price: '520,000',
        originalPrice: '650,000',
        page: 'lavage-sechage.html',
        image: 'images_electro_menager/lave-vaisselle-1.jpg',
        keywords: ['lave-vaisselle', 'bosch', 'vaisselle', '12 couverts'],
        rating: 5
      },
      // Froid
      {
        id: 'elec003',
        name: 'Réfrigérateur LG 350L',
        category: 'Froid',
        subcategory: 'froid',
        price: '680,000',
        originalPrice: '850,000',
        page: 'froid.html',
        image: 'images_electro_menager/refrigerateur-1.jpg',
        keywords: ['réfrigérateur', 'lg', 'frigo', 'froid', '350l'],
        rating: 4
      },
      {
        id: 'elec004',
        name: 'Congélateur Whirlpool 200L',
        category: 'Froid',
        subcategory: 'froid',
        price: '420,000',
        originalPrice: '520,000',
        page: 'froid.html',
        image: 'images_electro_menager/congelateur-1.jpg',
        keywords: ['congélateur', 'whirlpool', 'freezer', 'froid'],
        rating: 4
      },
      // Cuisson
      {
        id: 'elec005',
        name: 'Cuisinière Mixte Beko 4 feux',
        category: 'Cuisson',
        subcategory: 'cuisson',
        price: '380,000',
        originalPrice: '480,000',
        page: 'cuisson.html',
        image: 'images_electro_menager/cuisiniere-1.jpg',
        keywords: ['cuisinière', 'beko', 'cuisson', '4 feux', 'four'],
        rating: 4
      },
      {
        id: 'elec006',
        name: 'Micro-ondes Samsung 28L',
        category: 'Cuisson',
        subcategory: 'cuisson',
        price: '125,000',
        originalPrice: '165,000',
        page: 'cuisson.html',
        image: 'images_electro_menager/micro-ondes-1.jpg',
        keywords: ['micro-ondes', 'samsung', 'microwave', '28l'],
        rating: 4
      },
      // Climatisation
      {
        id: 'elec007',
        name: 'Climatiseur Split LG 12000 BTU',
        category: 'Climatisation',
        subcategory: 'climatisation-ventilation',
        price: '520,000',
        originalPrice: '650,000',
        page: 'climatisation-ventilation.html',
        image: 'images_electro_menager/climatiseur-1.jpg',
        keywords: ['climatiseur', 'lg', 'clim', 'split', '12000 btu', 'air conditionné'],
        rating: 5
      },
      {
        id: 'elec008',
        name: 'Ventilateur sur pied Rowenta',
        category: 'Ventilation',
        subcategory: 'climatisation-ventilation',
        price: '45,000',
        originalPrice: '65,000',
        page: 'climatisation-ventilation.html',
        image: 'images_electro_menager/ventilateur-1.jpg',
        keywords: ['ventilateur', 'rowenta', 'fan', 'sur pied'],
        rating: 4
      },
      // Entretien maison
      {
        id: 'elec009',
        name: 'Aspirateur Dyson V11',
        category: 'Entretien',
        subcategory: 'entretien-maison',
        price: '580,000',
        originalPrice: '720,000',
        page: 'entretien-maison.html',
        image: 'images_electro_menager/aspirateur-1.jpg',
        keywords: ['aspirateur', 'dyson', 'v11', 'vacuum', 'sans fil'],
        rating: 5
      },
      {
        id: 'elec010',
        name: 'Fer à repasser Philips',
        category: 'Entretien',
        subcategory: 'entretien-maison',
        price: '35,000',
        originalPrice: '48,000',
        page: 'entretien-maison.html',
        image: 'images_electro_menager/fer-repasser-1.jpg',
        keywords: ['fer à repasser', 'philips', 'iron', 'repassage'],
        rating: 4
      },
      // Beauté et hygiène
      {
        id: 'elec011',
        name: 'Sèche-cheveux Remington',
        category: 'Beauté',
        subcategory: 'beaute-hygiene-sante',
        price: '28,000',
        originalPrice: '38,000',
        page: 'beaute-hygiene-sante.html',
        image: 'images_electro_menager/seche-cheveux-1.jpg',
        keywords: ['sèche-cheveux', 'remington', 'hair dryer', 'coiffure'],
        rating: 4
      },
      {
        id: 'elec012',
        name: 'Tondeuse Philips OneBlade',
        category: 'Hygiène',
        subcategory: 'beaute-hygiene-sante',
        price: '45,000',
        originalPrice: '58,000',
        page: 'beaute-hygiene-sante.html',
        image: 'images_electro_menager/tondeuse-1.jpg',
        keywords: ['tondeuse', 'philips', 'oneblade', 'rasoir', 'barbe'],
        rating: 5
      }
    ];
    
    this.products.push(...electroProducts);
  }

  // Ajouter les produits de meubles et maison
  addHomeProducts() {
    const homeProducts = [
      // Meubles salon
      {
        id: 'home001',
        name: 'Canapé 3 places en tissu gris',
        category: 'Salon',
        subcategory: 'salon',
        price: '450,000',
        originalPrice: '580,000',
        page: 'salon.html',
        image: 'images_electro_menager/canape-1.jpg',
        keywords: ['canapé', 'sofa', '3 places', 'tissu', 'gris', 'salon'],
        rating: 4
      },
      {
        id: 'home002',
        name: 'Table basse moderne en bois',
        category: 'Salon',
        subcategory: 'salon',
        price: '120,000',
        originalPrice: '165,000',
        page: 'salon.html',
        image: 'images_electro_menager/table-basse-1.jpg',
        keywords: ['table basse', 'bois', 'moderne', 'salon', 'coffee table'],
        rating: 4
      },
      // Luminaires
      {
        id: 'home003',
        name: 'Lampadaire LED design',
        category: 'Luminaire',
        subcategory: 'luminaire',
        price: '85,000',
        originalPrice: '115,000',
        page: 'luminaire.html',
        image: 'images_electro_menager/lampadaire-1.jpg',
        keywords: ['lampadaire', 'led', 'design', 'éclairage', 'floor lamp'],
        rating: 4
      },
      {
        id: 'home004',
        name: 'Lustre moderne 5 branches',
        category: 'Luminaire',
        subcategory: 'luminaire',
        price: '125,000',
        originalPrice: '168,000',
        page: 'luminaire.html',
        image: 'images_electro_menager/lustre-1.jpg',
        keywords: ['lustre', 'chandelier', '5 branches', 'moderne', 'éclairage'],
        rating: 5
      },
      // Rangements
      {
        id: 'home005',
        name: 'Armoire 3 portes en bois',
        category: 'Rangement',
        subcategory: 'rangements',
        price: '320,000',
        originalPrice: '420,000',
        page: 'rangements.html',
        image: 'images_electro_menager/armoire-1.jpg',
        keywords: ['armoire', 'wardrobe', '3 portes', 'bois', 'rangement'],
        rating: 4
      },
      {
        id: 'home006',
        name: 'Étagère murale 5 niveaux',
        category: 'Rangement',
        subcategory: 'rangements',
        price: '65,000',
        originalPrice: '85,000',
        page: 'rangements.html',
        image: 'images_electro_menager/etagere-1.jpg',
        keywords: ['étagère', 'shelf', 'murale', '5 niveaux', 'rangement'],
        rating: 4
      }
    ];
    
    this.products.push(...homeProducts);
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
    resultsContainer.className = 'search-results comprehensive-search-results';
    resultsContainer.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-height: 500px;
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
      const subcategoryMatch = product.subcategory.toLowerCase().includes(searchTerm);
      const keywordMatch = product.keywords && product.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      );
      
      return nameMatch || categoryMatch || subcategoryMatch || keywordMatch;
    }).slice(0, 12); // Limiter à 12 résultats
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
          <div style="margin-bottom: 10px;">🔍 Aucun produit trouvé pour "${searchField.value}"</div>
          <div style="font-size: 14px; color: #999;">Essayez d'autres mots-clés comme "laptop", "iPhone", "Canon"...</div>
        </div>
      `;
    } else {
      resultsContainer.innerHTML = `
        <div class="search-results-header" style="padding: 12px; background: #f8f9fa; border-bottom: 1px solid #dee2e6; font-weight: 600; color: #333;">
          ${results.length} produit${results.length > 1 ? 's' : ''} trouvé${results.length > 1 ? 's' : ''}
        </div>
        <div class="search-results-list">
          ${results.map(product => this.createResultItemHTML(product)).join('')}
        </div>
      `;
      
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

  // Créer le HTML pour un élément de résultat
  createResultItemHTML(product) {
    const categoryColor = this.getCategoryColor(product.subcategory);
    
    return `
      <div class="search-result-item comprehensive-search-result" style="
        display: flex; 
        align-items: center; 
        padding: 12px; 
        border-bottom: 1px solid #f0f0f0; 
        cursor: pointer;
        transition: background-color 0.2s;
      " onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='white'">
        <img src="${product.image}" alt="${product.name}" style="
          width: 60px; 
          height: 60px; 
          object-fit: cover; 
          border-radius: 6px; 
          margin-right: 12px;
        " onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyNEMyNi4yMDkxIDIgMjggMy43OTA4OCAyOCA2QzI4IDguMjA5MTggMjYuMjA5MSA5NiAyNCA5NkMyMS43OTA4IDk2IDIwIDguMjA5MTggMjAgNkMyMCAzLjc5MDg4IDIxLjc5MDggMiAyNCAyMFoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+'">
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #333; margin-bottom: 4px; font-size: 14px;">${product.name}</div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="background: ${categoryColor}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 500;">${product.category}</span>
            <span style="color: #666; font-size: 12px;">${this.getCategoryName(product.subcategory)}</span>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="color: #ff6600; font-weight: 600; font-size: 14px;">${product.price ? 'XAF ' + product.price : 'Prix sur demande'}</div>
            ${product.originalPrice ? `<div style="color: #999; font-size: 12px; text-decoration: line-through;">XAF ${product.originalPrice}</div>` : ''}
          </div>
        </div>
        <div style="color: #007bff; font-size: 12px; margin-left: 8px;">Voir →</div>
      </div>
    `;
  }

  // Obtenir la couleur de catégorie
  getCategoryColor(subcategory) {
    const colors = {
      'laptops': '#007bff',
      'telephonie': '#28a745',
      'photo-camescope': '#6f42c1',
      'jeux-video': '#fd7e14',
      'pc-fixes-ecran': '#20c997',
      'tablettes': '#17a2b8',
      'composants': '#6c757d',
      'stockage': '#495057',
      'accessoires': '#e83e8c',
      'objets-connectes': '#00bcd4',
      'audio-hifi': '#9c27b0',
      'tv-home-cinema': '#3f51b5',
      'femme': '#ff69b4',
      'homme': '#007bff',
      'enfants': '#20c997',
      'bagages': '#6f42c1',
      'lavage-sechage': '#ffc107',
      'froid': '#17a2b8',
      'cuisson': '#ff5722',
      'climatisation-ventilation': '#00bcd4',
      'entretien-maison': '#4caf50',
      'beaute-hygiene-sante': '#e91e63',
      'salon': '#795548',
      'luminaire': '#ffeb3b',
      'rangements': '#607d8b',
      'vestes': '#007bff',
      'shorts': '#28a745',
      'sportif': '#fd7e14',
      'bottes': '#6f42c1',
      'officiel': '#495057',
      'occasionnel': '#20c997'
    };
    return colors[subcategory] || '#6c757d';
  }

  // Obtenir le nom de la catégorie
  getCategoryName(subcategory) {
    const category = this.categories.find(cat => cat.slug === subcategory);
    return category ? category.name : subcategory;
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
      this.showMessage('Veuillez entrer au moins 2 caractères pour la recherche.');
      return;
    }

    const results = this.searchProducts(query);
    
    if (results.length === 0) {
      this.showMessage(`Aucun produit trouvé pour "${query}". Essayez d'autres mots-clés.`);
      return;
    }

    // Rediriger vers la page du premier résultat
    this.goToProduct(results[0]);
  }

  // Aller à un produit
  goToProduct(product) {
    // Ajouter un paramètre de recherche pour scroller vers le produit
    const url = `${product.page}?search=${encodeURIComponent(product.name)}&highlight=${product.id}`;
    window.location.href = url;
  }

  // Afficher un message
  showMessage(message) {
    // Créer un toast de notification
    const toast = document.createElement('div');
    toast.className = 'search-toast';
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #dc3545;
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      z-index: 10000;
      font-size: 14px;
      max-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Supprimer le toast après 3 secondes
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Obtenir tous les produits
  getAllProducts() {
    return this.products;
  }

  // Obtenir les produits par catégorie
  getProductsByCategory(categorySlug) {
    return this.products.filter(product => product.subcategory === categorySlug);
  }

  // Recherche avancée
  advancedSearch(filters) {
    return this.products.filter(product => {
      let match = true;
      
      if (filters.category && product.subcategory !== filters.category) {
        match = false;
      }
      
      if (filters.subcategory && product.subcategory !== filters.subcategory) {
        match = false;
      }
      
      if (filters.minPrice && this.extractPrice(product.price) < filters.minPrice) {
        match = false;
      }
      
      if (filters.maxPrice && this.extractPrice(product.price) > filters.maxPrice) {
        match = false;
      }
      
      if (filters.query) {
        const searchTerm = filters.query.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(searchTerm);
        const categoryMatch = product.category.toLowerCase().includes(searchTerm);
        const keywordMatch = product.keywords && product.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm)
        );
        match = nameMatch || categoryMatch || keywordMatch;
      }
      
      return match;
    });
  }

  // Extraire le prix numérique
  extractPrice(priceString) {
    if (!priceString) return 0;
    return parseFloat(priceString.replace(/[^\d]/g, ''));
  }
}

// Ajouter les styles CSS
const comprehensiveSearchStyles = document.createElement('style');
comprehensiveSearchStyles.textContent = `
  .comprehensive-search-results {
    animation: fadeIn 0.2s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
  
  .search-result-item:hover {
    background-color: #f8f9fa;
  }
  
  .search-no-results {
    animation: fadeIn 0.2s ease;
  }

  .comprehensive-search-result {
    position: relative;
  }

  .comprehensive-search-result::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #dee2e6, transparent);
  }

  .comprehensive-search-result:last-child::after {
    display: none;
  }
`;
document.head.appendChild(comprehensiveSearchStyles);

// Initialiser la recherche globale quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  window.comprehensiveSearch = new ComprehensiveSearch();
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ComprehensiveSearch;
}