// Menu Logic Implementation for NexusChop
'use strict';

// Product database with categories
const productDatabase = {
  // High-Tech Category
  'high-tech': {
    name: 'High-Tech',
    description: 'Découvrez les dernières technologies et innovations',
    products: [
      {
        id: 'iphone12promax_1',
        name: 'iPhone 12 Pro Max',
        category: 'Téléphonie',
        price: '1,048,000',
        originalPrice: '1,310,000',
        image: 'Projet 1 - MarketPlace/produits/iphone12promax_1.jpg',
        rating: 5,
        badge: 'best-seller'
      },
      {
        id: 'garminvenu_1',
        name: 'Garmin Venu Montre Connectée',
        category: 'Objets connectés',
        price: '261,000',
        originalPrice: '327,000',
        image: 'Projet 1 - MarketPlace/produits/garminvenu_1.jpg',
        rating: 4,
        badge: 'new'
      },
      {
        id: 'oculusquest2_1',
        name: 'Casque VR Oculus Quest 2',
        category: 'Jeux vidéo',
        price: '786,000',
        originalPrice: '982,000',
        image: 'Projet 1 - MarketPlace/produits/oculusquest2_1.jpg',
        rating: 5,
        badge: 'trending'
      },
      {
        id: 'cameraetancheip_1',
        name: 'Caméra Étanche 4K',
        category: 'Photo, caméscope',
        price: '327,000',
        originalPrice: '458,000',
        image: 'Projet 1 - MarketPlace/produits/cameraetancheip_1.jpg',
        rating: 4
      },
      {
        id: 'jblflip_1',
        name: 'JBL Flip 5 Enceinte Bluetooth',
        category: 'Audio, Hifi',
        price: '97,600',
        originalPrice: '130,000',
        image: 'Projet 1 - MarketPlace/produits/jblflip_1.jpg',
        rating: 4,
        badge: 'popular'
      },
      {
        id: 'videoprojecteur_1',
        name: 'Vidéoprojecteur 4K',
        category: 'TV, Home Cinéma',
        price: '654,000',
        originalPrice: '916,000',
        image: 'Projet 1 - MarketPlace/produits/videoprojecteur_1.jpg',
        rating: 4
      }
    ]
  },
  
  // Informatique Category
  'informatique': {
    name: 'Informatique',
    description: 'Ordinateurs, laptops et composants pour tous vos besoins',
    products: [
      {
        id: 'apple_mp2019_1',
        name: 'MacBook Pro 2019 13"',
        category: 'Laptops',
        price: '1,310,000',
        originalPrice: '1,638,000',
        image: 'Projet 1 - MarketPlace/produits/apple_mp2019_1.jpg',
        rating: 5,
        badge: 'premium'
      },
      {
        id: 'laptop_gaming_hp15dk1003sf_1',
        name: 'Laptop Gaming HP 15',
        category: 'Laptops',
        price: '589,000',
        originalPrice: '720,000',
        image: 'Projet 1 - MarketPlace/produits/laptop_gaming_hp15dk1003sf_1.jpg',
        rating: 4,
        badge: 'gaming'
      },
      {
        id: 'laptop_win_dellinspiron_1',
        name: 'Dell Inspiron 15',
        category: 'Laptops',
        price: '589,000',
        originalPrice: '720,000',
        image: 'Projet 1 - MarketPlace/produits/laptop_win_dellinspiron_1.jpg',
        rating: 4
      },
      {
        id: 'allinonehp24_df0102ns_1',
        name: 'PC Portable HP All-in-One 24"',
        category: 'Pc fixes, écran',
        price: '850,000',
        originalPrice: '982,000',
        image: 'Projet 1 - MarketPlace/produits/allinonehp24_df0102ns_1.jpg',
        rating: 4
      },
      {
        id: 'i7-11700K.jpg',
        name: 'Processeur Intel i7-11700K',
        category: 'Composants',
        price: '327,000',
        originalPrice: '392,000',
        image: 'Projet 1 - MarketPlace/produits/i7-11700K.jpg',
        rating: 5,
        badge: 'performance'
      },
      {
        id: 'minipcsei8_1',
        name: 'Mini PC Intel SEi8',
        category: 'Pc fixes, écran',
        price: '458,000',
        originalPrice: '589,000',
        image: 'Projet 1 - MarketPlace/produits/minipcsei8_1.jpg',
        rating: 4
      }
    ]
  },

  // Electroménager Category  
  'electromenager': {
    name: 'Electroménager',
    description: 'Électroménager moderne pour votre foyer',
    products: [
      {
        id: 'imprimante_hpenvy_1',
        name: 'Imprimante HP Envy',
        category: 'Entretien maison',
        price: '157,000',
        originalPrice: '196,000',
        image: 'Projet 1 - MarketPlace/produits/imprimante_hpenvy_1.jpg',
        rating: 4
      },
      {
        id: 'alarmemaison_1',
        name: 'Alarme Maison Intelligente',
        category: 'Sécurité maison',
        price: '196,000',
        originalPrice: '294,000',
        image: 'Projet 1 - MarketPlace/produits/alarmemaison_1.jpg',
        rating: 4,
        badge: 'smart-home'
      },
      {
        id: 'mixbatt_1',
        name: 'Mixeur sur Batterie Portable',
        category: 'Cuisson',
        price: '58,900',
        originalPrice: '78,600',
        image: 'Projet 1 - MarketPlace/produits/mixbatt_1.jpg',
        rating: 4,
        badge: 'practical'
      }
    ]
  },

  // Meuble et décoration Category
  'meuble-decoration': {
    name: 'Meuble et décoration',
    description: 'Meubles et objets de décoration pour embellir votre intérieur',
    products: [
      {
        id: 'canape_1',
        name: 'Canapé Moderne 3 Places',
        category: 'Salon',
        price: '458,000',
        originalPrice: '589,000',
        image: 'Projet 1 - MarketPlace/produits/canape_1.jpg',
        rating: 5,
        badge: 'comfort'
      },
      {
        id: 'table_1',
        name: 'Table Basse Design',
        category: 'Salon',
        price: '196,000',
        originalPrice: '261,000',
        image: 'Projet 1 - MarketPlace/produits/table_1.jpg',
        rating: 4
      },
      {
        id: 'lamp_1',
        name: 'Lampe Suspension LED',
        category: 'Luminaire',
        price: '65,600',
        originalPrice: '85,800',
        image: 'Projet 1 - MarketPlace/produits/lamp_1.jpg',
        rating: 4,
        badge: 'eco-friendly'
      }
    ]
  },

  // Modes et vêtements Category
  'modes-vetements': {
    name: 'Modes et vêtements',
    description: 'Mode tendance pour homme, femme et enfant',
    products: [
      {
        id: 'vetement_femme_1',
        name: 'Robe Femme Élégante',
        category: 'Femme',
        price: '65,600',
        originalPrice: '85,800',
        image: 'Projet 1 - MarketPlace/produits/vetement_femme_1.jpg',
        rating: 4,
        badge: 'fashion'
      },
      {
        id: 'veste_homme_1',
        name: 'Veste Homme Classique',
        category: 'Homme',
        price: '98,400',
        originalPrice: '130,000',
        image: 'Projet 1 - MarketPlace/produits/veste_homme_1.jpg',
        rating: 4
      },
      {
        id: 'sac_femme_1',
        name: 'Sac à Main Femme Cuir',
        category: 'Femme',
        price: '131,200',
        originalPrice: '163,500',
        image: 'Projet 1 - MarketPlace/produits/sac_femme_1.jpg',
        rating: 5,
        badge: 'luxury'
      }
    ]
  },

  // Blog Section
  'blog': {
    name: 'Blog',
    description: 'Articles et conseils sur la technologie et lifestyle',
    articles: [
      {
        id: 'tech-trends-2024',
        title: 'Tendances Technologiques 2024',
        excerpt: 'Découvrez les dernières innovations qui révolutionnent notre quotidien',
        image: 'Projet 1 - MarketPlace/produits/blog-tech-2024.jpg',
        date: '2024-11-12',
        author: 'Expert Tech'
      },
      {
        id: 'gaming-guide',
        title: 'Guide Gaming 2024',
        excerpt: 'Tout ce que vous devez savoir sur l\'univers du gaming',
        image: 'Projet 1 - MarketPlace/produits/blog-gaming.jpg',
        date: '2024-11-10',
        author: 'Gaming Pro'
      },
      {
        id: 'smart-home',
        title: 'Maison Intelligente',
        excerpt: 'Transformez votre foyer en maison connectée',
        image: 'Projet 1 - MarketPlace/produits/blog-smart-home.jpg',
        date: '2024-11-08',
        author: 'Domotique Expert'
      }
    ]
  },

  // Offres spéciales
  'offres-speciales': {
    name: 'Offres spéciales',
    description: 'Profitez de nos promotions exclusives',
    deals: [
      {
        id: 'mega-sale',
        title: 'Vente Flash - Jusqu\'à 50% de réduction',
        description: 'Sur une sélection de produits High-Tech',
        discount: '50%',
        validUntil: '2024-11-30',
        image: 'Projet 1 - MarketPlace/produits/sale-banner.jpg'
      },
      {
        id: 'bundle-deal',
        title: 'Pack Gaming Complet',
        description: 'Console + Manette + Jeu à prix préférentiel',
        saving: 'XAF 150,000',
        validUntil: '2024-11-25',
        image: 'Projet 1 - MarketPlace/produits/gaming-bundle.jpg'
      }
    ]
  }
};

// Menu configuration
const menuConfig = {
  'home': {
    title: 'Accueil',
    type: 'home'
  },
  'categories': {
    title: 'Catégories',
    type: 'mega-menu',
    sections: ['high-tech', 'informatique', 'modes-vetements', 'electromenager']
  },
  'informatique': {
    title: 'Informatique',
    type: 'category',
    categoryId: 'informatique'
  },
  'electromenager': {
    title: 'Electroménager',
    type: 'category',
    categoryId: 'electromenager'
  },
  // New direct HTML file navigation for electroménager subcategories
  'lavage-sechage': {
    title: 'Lavage et séchage',
    type: 'direct',
    file: 'lavage-sechage.html'
  },
  'froid': {
    title: 'Froid',
    type: 'direct',
    file: 'froid.html'
  },
  'cuisson': {
    title: 'Cuisson',
    type: 'direct',
    file: 'cuisson.html'
  },
  'entretien-maison': {
    title: 'Entretien maison',
    type: 'direct',
    file: 'entretien-maison.html'
  },
  'beaute-hygiene-sante': {
    title: 'Beauté, Hygiène, santé',
    type: 'direct',
    file: 'beaute-hygiene-sante.html'
  },
  'climatisation-ventilation': {
    title: 'Climatisation, ventilation',
    type: 'direct',
    file: 'climatisation-ventilation.html'
  },
  'meuble-decoration': {
    title: 'Meuble et décoration',
    type: 'category',
    categoryId: 'meuble-decoration'
  },
  'modes-vetements': {
    title: 'Modes et vêtements',
    type: 'category',
    categoryId: 'modes-vetements'
  },
  'blog': {
    title: 'Blog',
    type: 'blog'
  },
  'offres-speciales': {
    title: 'Offres spéciales',
    type: 'deals'
  }
};

// Menu Logic Class
class NexusChopMenu {
  constructor() {
    this.currentContent = null;
    this.isLoading = false;
    this.init();
  }

  init() {
    this.bindEvents();
    console.log('NexusChop Menu System Initialized');
  }

  bindEvents() {
    // Desktop menu events with data-menu attributes
    const menuLinks = document.querySelectorAll('[data-menu]');
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const menuType = link.getAttribute('data-menu');
        console.log('Menu clicked:', menuType); // Debug log
        this.navigateToContent(menuType, link);
      });
    });

    // Handle mega menu triggers
    const megaMenuLinks = document.querySelectorAll('[data-mega-menu]');
    megaMenuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const megaMenuType = link.getAttribute('data-mega-menu');
        console.log('Mega menu clicked:', megaMenuType); // Debug log
        this.showMegaMenu(megaMenuType, link);
      });
    });

    // Desktop main menu items (fallback)
    const mainMenuItems = document.querySelectorAll('.desktop-menu-category-list .menu-category > .menu-title');
    mainMenuItems.forEach(link => {
      link.addEventListener('click', (e) => {
        if (!link.hasAttribute('data-menu')) {
          e.preventDefault();
          const menuText = link.textContent.trim();
          console.log('Main menu clicked:', menuText); // Debug log
          const menuKey = this.getMenuKey(menuText);
          if (menuKey) {
            this.navigateToContent(menuKey, link);
          }
        }
      });
    });

    // Mobile menu events
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-category-list .menu-title');
    mobileMenuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        if (item.hasAttribute('data-menu')) {
          e.preventDefault();
          const menuType = item.getAttribute('data-menu');
          console.log('Mobile menu clicked:', menuType); // Debug log
          this.navigateToContent(menuType, item);
        } else {
          // Handle mobile menu text-based navigation
          e.preventDefault();
          const menuText = item.textContent.trim();
          const menuKey = this.getMenuKey(menuText);
          if (menuKey) {
            this.navigateToContent(menuKey, item);
          }
        }
      });
    });

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', () => {
      this.handleHashChange();
    });

    // Category button handlers in the main page
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryItem = btn.closest('.category-item');
        if (categoryItem) {
          const categoryTitle = categoryItem.querySelector('.category-item-title').textContent;
          this.handleCategoryClick(categoryTitle);
        }
      });
    });
  }

  handleHashChange() {
    const hash = window.location.hash.substring(1);
    console.log('Hash changed:', hash); // Debug log
    if (hash && hash !== this.currentContent) {
      this.showContent(hash);
    }
  }

  navigateToContent(menuType, clickedLink = null) {
    console.log('Navigating to:', menuType); // Debug log
    this.currentContent = menuType;
    
    // Update URL hash
    window.location.hash = menuType;
    
    // Show the content
    this.showContent(menuType);
    
    // Update active states
    if (clickedLink) {
      this.updateActiveMenuStates(clickedLink);
    }
  }

  updateActiveMenuStates(activeLink) {
    // Remove active class from all menu items
    document.querySelectorAll('.menu-title, .submenu-title').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to clicked link
    activeLink.classList.add('active');
  }

  handleCategoryClick(categoryTitle) {
    console.log('Category clicked:', categoryTitle); // Debug log
    const categoryMap = {
      'High-Tech': 'high-tech',
      'Informatique': 'informatique',
      'Electroménager': 'electromenager',
      'Modes et vêtements': 'modes-vetements',
      'Meuble et décoration': 'meuble-decoration'
    };

    const menuType = categoryMap[categoryTitle];
    if (menuType) {
      this.navigateToContent(menuType);
    }
  }

// Update the getMenuKey method to include new electroménager subcategories
  getMenuKey(title) {
    const titleMap = {
      'home': 'home',
      'accueil': 'home',
      'catégories': 'categories',
      'informatique': 'informatique',
      'electroménager': 'electromenager',
      'electromenager': 'electromenager',
      'lavage et séchage': 'lavage-sechage',
      'lavage & séchage': 'lavage-sechage',
      'froid': 'froid',
      'cuisson': 'cuisson',
      'entretien maison': 'entretien-maison',
      'entretien & maison': 'entretien-maison',
      'beauté, hygiène, santé': 'beaute-hygiene-sante',
      'beauté & hygiène & santé': 'beaute-hygiene-sante',
      'climatisation, ventilation': 'climatisation-ventilation',
      'climatisation & ventilation': 'climatisation-ventilation',
      'meuble et décoration': 'meuble-decoration',
      'meuble & décoration': 'meuble-decoration',
      'modes et vêtements': 'modes-vetements',
      'modes & vêtements': 'modes-vetements',
      'blog': 'blog',
      'offres spéciales': 'offres-speciales',
      'offres & spéciales': 'offres-speciales'
    };

    const normalizedTitle = title.toLowerCase().trim();
    console.log('Looking for menu key for:', normalizedTitle); // Debug log
    return titleMap[normalizedTitle] || null;
  }

  showContent(menuKey) {
    if (this.isLoading) return;
    
    this.isLoading = true;
    console.log('Showing content for:', menuKey); // Debug log
    
    const config = menuConfig[menuKey];
    if (!config) {
      console.error('Menu configuration not found:', menuKey);
      this.isLoading = false;
      return;
    }

    // Hide the main content section
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.style.display = 'none';
    }

    // Create or get main content area
    let contentArea = document.getElementById('menu-content');
    if (!contentArea) {
      contentArea = this.createContentArea();
    }

// Generate content based on menu type
    switch (config.type) {
      case 'home':
        this.showHomeContent(contentArea);
        break;
      case 'category':
        this.showCategoryContent(contentArea, config.categoryId);
        break;
      case 'blog':
        this.showBlogContent(contentArea);
        break;
      case 'deals':
        this.showDealsContent(contentArea);
        break;
      case 'mega-menu':
        this.showMegaMenuContent(contentArea, config.sections);
        break;
      case 'direct':
        // For direct file navigation, redirect to the HTML file
        window.location.href = config.file;
        return;
      default:
        this.showDefaultContent(contentArea);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.isLoading = false;
  }

  createContentArea() {
    // Create main content container
    const contentArea = document.createElement('div');
    contentArea.id = 'menu-content';
    contentArea.className = 'menu-content-area';
    
    // Insert after the main content
    const mainContent = document.querySelector('main');
    if (mainContent && mainContent.parentNode) {
      mainContent.parentNode.insertBefore(contentArea, mainContent.nextSibling);
    } else {
      // Fallback: insert at the end of body
      document.body.appendChild(contentArea);
    }

    return contentArea;
  }

  showHomeContent(container) {
    container.innerHTML = `
      <div class="container">
        <div class="home-welcome">
          <h1 class="page-title">Bienvenue sur NexusChop</h1>
          <p class="page-description">Votre marketplace de confiance pour tous vos achats en ligne</p>
          <button class="back-to-main" onclick="nexusChopMenu.showMainContent()" style="margin: 20px auto; padding: 12px 24px; background: #ff6600; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            Voir le contenu principal
          </button>
          <div class="home-stats">
            <div class="stat-item">
              <h3>10,000+</h3>
              <p>Produits disponibles</p>
            </div>
            <div class="stat-item">
              <h3>50,000+</h3>
              <p>Clients satisfaits</p>
            </div>
            <div class="stat-item">
              <h3>99%</h3>
              <p>Satisfaction client</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  showMainContent() {
    // Show the main content section
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.style.display = 'block';
    }
    
    // Hide dynamic content
    const dynamicContent = document.getElementById('menu-content');
    if (dynamicContent) {
      dynamicContent.style.display = 'none';
    }
    
    // Clear hash and current content
    window.location.hash = '';
    this.currentContent = null;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showCategoryContent(container, categoryId) {
    const category = productDatabase[categoryId];
    if (!category) {
      container.innerHTML = '<div class="container"><p>Catégorie non trouvée</p></div>';
      return;
    }

    container.innerHTML = `
      <div class="container">
        <div class="category-header">
          <h1 class="page-title">${category.name}</h1>
          <p class="page-description">${category.description}</p>
        </div>
        <div class="products-grid">
          ${category.products.map(product => this.createProductCard(product)).join('')}
        </div>
      </div>
    `;
  }

  showBlogContent(container) {
    const blogData = productDatabase.blog;
    
    container.innerHTML = `
      <div class="container">
        <div class="blog-header">
          <h1 class="page-title">${blogData.name}</h1>
          <p class="page-description">${blogData.description}</p>
        </div>
        <div class="blog-grid">
          ${blogData.articles.map(article => this.createBlogCard(article)).join('')}
        </div>
      </div>
    `;
  }

  showDealsContent(container) {
    const dealsData = productDatabase['offres-speciales'];
    
    container.innerHTML = `
      <div class="container">
        <div class="deals-header">
          <h1 class="page-title">${dealsData.name}</h1>
          <p class="page-description">${dealsData.description}</p>
        </div>
        <div class="deals-grid">
          ${dealsData.deals.map(deal => this.createDealCard(deal)).join('')}
        </div>
      </div>
    `;
  }

  showMegaMenuContent(container, sections) {
    container.innerHTML = `
      <div class="container">
        <div class="mega-menu-content">
          <h1 class="page-title">Toutes nos Catégories</h1>
          <p class="page-description">Explorez notre large gamme de produits</p>
          <div class="mega-menu-grid">
            ${sections.map(section => this.createCategoryCard(section)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  showDefaultContent(container) {
    container.innerHTML = `
      <div class="container">
        <div class="default-content">
          <h1 class="page-title">Contenu en construction</h1>
          <p class="page-description">Cette section sera bientôt disponible</p>
        </div>
      </div>
    `;
  }

  createProductCard(product) {
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    
    return `
      <div class="product-showcase" data-product-id="${product.id}">
        <div class="showcase-banner">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          ${product.badge ? `<div class="showcase-badge">${product.badge}</div>` : ''}
          <div class="showcase-actions">
            <button class="btn-action" title="Ajouter aux favoris">
              <ion-icon name="heart-outline"></ion-icon>
            </button>
            <button class="btn-action" title="Aperçu rapide">
              <ion-icon name="eye-outline"></ion-icon>
            </button>
            <button class="btn-action" title="Comparer">
              <ion-icon name="repeat-outline"></ion-icon>
            </button>
            <button class="btn-action" title="Ajouter au panier">
              <ion-icon name="bag-add-outline"></ion-icon>
            </button>
          </div>
        </div>
        <div class="showcase-content">
          <a href="#" class="showcase-category">${product.category}</a>
          <h3><a href="#" class="showcase-title">${product.name}</a></h3>
          <div class="showcase-rating">${stars}</div>
          <div class="price-box">
            <p class="price">XAF ${product.price}</p>
            <del>XAF ${product.originalPrice}</del>
          </div>
        </div>
      </div>
    `;
  }

  createBlogCard(article) {
    return `
      <div class="blog-card" data-article-id="${article.id}">
        <a href="#" class="blog-banner-link">
          <img src="assets/images/${article.image}" alt="${article.title}" class="blog-banner">
        </a>
        <div class="blog-content">
          <a href="#" class="blog-category">Article</a>
          <h3><a href="#" class="blog-title">${article.title}</a></h3>
          <p class="blog-excerpt">${article.excerpt}</p>
          <p class="blog-meta">
            Par <cite>${article.author}</cite> / 
            <time datetime="${article.date}">${this.formatDate(article.date)}</time>
          </p>
        </div>
      </div>
    `;
  }

  createDealCard(deal) {
    return `
      <div class="deal-card" data-deal-id="${deal.id}">
        <div class="deal-banner">
          <img src="assets/images/${deal.image}" alt="${deal.title}" class="deal-image">
          <div class="deal-badge">Offre spéciale</div>
        </div>
        <div class="deal-content">
          <h3 class="deal-title">${deal.title}</h3>
          <p class="deal-description">${deal.description}</p>
          ${deal.discount ? `<div class="deal-discount">Réduction: ${deal.discount}</div>` : ''}
          ${deal.saving ? `<div class="deal-saving">Économisez: ${deal.saving}</div>` : ''}
          <p class="deal-validity">Valable jusqu'au ${this.formatDate(deal.validUntil)}</p>
          <button class="deal-btn">Profiter de l'offre</button>
        </div>
      </div>
    `;
  }

  createCategoryCard(categoryId) {
    const category = productDatabase[categoryId];
    const productCount = category.products ? category.products.length : 0;
    
    return `
      <div class="category-card" data-category-id="${categoryId}">
        <div class="category-header">
          <h3 class="category-name">${category.name}</h3>
          <p class="category-description">${category.description}</p>
          <span class="product-count">${productCount} produits</span>
        </div>
        <div class="category-preview">
          ${category.products ? 
            category.products.slice(0, 3).map(product => `
              <div class="preview-product">
                <img src="${product.image}" alt="${product.name}">
                <span class="preview-price">XAF ${product.price}</span>
              </div>
            `).join('') :
            '<div class="no-products">Aucun produit disponible</div>'
          }
        </div>
        <button class="category-btn" onclick="nexusChopMenu.showContent('${categoryId}')">
          Voir tous les produits
        </button>
        <button class="back-to-home" onclick="nexusChopMenu.showContent('home')" style="margin-top: 10px; background: #6c757d;">
          Retour à l'accueil
        </button>
      </div>
    `;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  showMegaMenu(megaMenuType, clickedLink = null) {
    console.log('Showing mega menu:', megaMenuType); // Debug log

    // Hide the main content section
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.style.display = 'none';
    }

    // Create or get main content area
    let contentArea = document.getElementById('menu-content');
    if (!contentArea) {
      contentArea = this.createContentArea();
    }

    // Handle specific mega menu types
    if (megaMenuType === 'high-tech' && window.highTechMenu) {
      window.highTechMenu.showHighTechContent(contentArea);
    } else {
      // Fallback for other mega menus
      contentArea.innerHTML = `
        <div class="container">
          <div class="mega-menu-placeholder">
            <h1 class="page-title">Mega Menu ${megaMenuType}</h1>
            <p class="page-description">Cette fonctionnalité sera bientôt disponible</p>
          </div>
        </div>
      `;
    }

    // Update URL hash
    window.location.hash = megaMenuType;

    // Update active states
    if (clickedLink) {
      this.updateActiveMenuStates(clickedLink);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// CSS Styles for Menu Content
const menuStyles = `
  .menu-content-area {
    background: #f8f9fa;
    padding: 40px 0;
    margin-top: 20px;
  }

  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 15px;
    text-align: center;
  }

  .page-description {
    font-size: 1.2rem;
    color: #666;
    text-align: center;
    margin-bottom: 40px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .home-welcome {
    text-align: center;
    padding: 60px 0;
  }

  .home-stats {
    display: flex;
    justify-content: center;
    gap: 60px;
    margin-top: 40px;
  }

  .stat-item {
    text-align: center;
  }

  .stat-item h3 {
    font-size: 3rem;
    font-weight: 700;
    color: #ff6600;
    margin-bottom: 10px;
  }

  .stat-item p {
    font-size: 1.1rem;
    color: #666;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }

  .category-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .mega-menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }

  .category-card {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }

  .category-card:hover {
    transform: translateY(-5px);
  }

  .category-header {
    margin-bottom: 20px;
  }

  .category-name {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }

  .category-description {
    color: #666;
    margin-bottom: 15px;
  }

  .product-count {
    color: #ff6600;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .category-preview {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .preview-product {
    flex: 1;
    text-align: center;
  }

  .preview-product img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 5px;
  }

  .preview-price {
    font-size: 0.8rem;
    color: #ff6600;
    font-weight: 600;
  }

  .category-btn {
    width: 100%;
    padding: 12px;
    background: #ff6600;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .category-btn:hover {
    background: #ff5200;
  }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }

  .deals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }

  .deal-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }

  .deal-card:hover {
    transform: translateY(-5px);
  }

  .deal-banner {
    position: relative;
  }

  .deal-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .deal-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #ff6600;
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .deal-content {
    padding: 25px;
  }

  .deal-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }

  .deal-description {
    color: #666;
    margin-bottom: 15px;
  }

  .deal-discount {
    background: #e8f5e8;
    color: #28a745;
    padding: 8px 12px;
    border-radius: 6px;
    font-weight: 600;
    margin-bottom: 10px;
    display: inline-block;
  }

  .deal-saving {
    background: #fff3cd;
    color: #856404;
    padding: 8px 12px;
    border-radius: 6px;
    font-weight: 600;
    margin-bottom: 10px;
    display: inline-block;
  }

  .deal-validity {
    font-size: 0.9rem;
    color: #999;
    margin-bottom: 20px;
  }

  .deal-btn {
    background: #ff6600;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .deal-btn:hover {
    background: #ff5200;
  }

  .default-content {
    text-align: center;
    padding: 60px 0;
  }

  @media (max-width: 768px) {
    .page-title {
      font-size: 2rem;
    }
    
    .home-stats {
      flex-direction: column;
      gap: 30px;
    }
    
    .products-grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .mega-menu-grid {
      grid-template-columns: 1fr;
    }
    
    .blog-grid {
      grid-template-columns: 1fr;
    }
    
    .deals-grid {
      grid-template-columns: 1fr;
    }
  }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = menuStyles;
document.head.appendChild(styleSheet);

// Initialize menu system
const nexusChopMenu = new NexusChopMenu();

// Export for use in other scripts
window.nexusChopMenu = nexusChopMenu;

console.log('NexusChop Menu System Loaded Successfully');