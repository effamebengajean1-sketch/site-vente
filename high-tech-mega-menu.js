// High Tech Mega Menu Implementation for NexusChop
'use strict';

class HighTechMegaMenu {
  constructor() {
    this.highTechData = null;
    this.categoriesData = null;
  }

  async init() {
    await this.loadData();
    this.createHighTechMegaMenu();
    this.bindEvents();
    console.log('High Tech Mega Menu Initialized');
  }

  async loadData() {
    try {
      // Load High Tech products data
      const response = await fetch('high-tech-products.json');
      if (response.ok) {
        const productsData = await response.json();
        this.highTechData = productsData['high-tech'];

        // If no children, try to load from categorie_marketplace.json
        if (!this.highTechData.children) {
          const catResponse = await fetch('categorie_marketplace.json');
          if (catResponse.ok) {
            const catData = await catResponse.json();
            const highTechCat = catData.categories.find(cat => cat.slug === 'high-tech');
            if (highTechCat) {
              this.highTechData.children = highTechCat.children;
            }
          }
        }

        // Make products available globally
        window.productDatabase = window.productDatabase || {};
        window.productDatabase['high-tech'] = this.highTechData;
      } else {
        // Fallback: load from categorie_marketplace.json
        const catResponse = await fetch('categorie_marketplace.json');
        if (catResponse.ok) {
          const catData = await catResponse.json();
          this.highTechData = catData.categories.find(cat => cat.slug === 'high-tech');
          if (this.highTechData) {
            // Add products from existing database
            this.highTechData.products = window.productDatabase?.['high-tech']?.products || [];
          }
        }
      }
    } catch (error) {
      console.error('Error loading High Tech products data:', error);
      // Fallback: load from categorie_marketplace.json
      try {
        const catResponse = await fetch('categorie_marketplace.json');
        if (catResponse.ok) {
          const catData = await catResponse.json();
          this.highTechData = catData.categories.find(cat => cat.slug === 'high-tech');
          if (this.highTechData) {
            // Add products from existing database
            this.highTechData.products = window.productDatabase?.['high-tech']?.products || [];
          }
        }
      } catch (fallbackError) {
        console.error('Fallback loading also failed:', fallbackError);
        this.highTechData = window.productDatabase?.['high-tech'];
      }
    }
  }

  createHighTechMegaMenu() {
    if (!this.highTechData) return;

    // Create High Tech mega menu container
    const megaMenuHTML = `
      <div class="high-tech-mega-menu">
        <div class="mega-menu-header">
          <h2>${this.highTechData.name}</h2>
          <p>${this.highTechData.description}</p>
        </div>
        
        <div class="high-tech-subcategories">
          ${this.highTechData.children.map(child => this.createSubcategoryCard(child)).join('')}
        </div>

        <div class="high-tech-featured">
          <h3 class="featured-title">Produits Vedettes High-Tech</h3>
          <div class="featured-products">
            ${this.getFeaturedProducts().map(product => this.createFeaturedProduct(product)).join('')}
          </div>
        </div>

        <div class="category-images-showcase">
          <h3 class="showcase-title">Explorez toutes les catégories</h3>
          <div class="images-grid">
            ${this.createCategoryImagesGrid()}
          </div>
        </div>
      </div>
    `;

    // Store the HTML for use in the main menu system
    window.highTechMegaMenuHTML = megaMenuHTML;
  }

  createSubcategoryCard(subcategory) {
    const productCount = this.getProductCount(subcategory.slug);
    
    return `
      <div class="high-tech-subcategory" data-subcategory="${subcategory.slug}">
        <div class="subcategory-header">
          <h4 class="subcategory-title">${subcategory.name}</h4>
          <p class="product-count">${productCount} produits disponibles</p>
        </div>
        <div class="subcategory-content">
          <p class="subcategory-description">${this.getSubcategoryDescription(subcategory.slug)}</p>
          <div class="sub-items-grid">
            ${subcategory.children ? subcategory.children.map(item => 
              `<div class="sub-item" onclick="highTechMenu.showSubcategoryProducts('${subcategory.slug}', '${item.slug}')">${item.name}</div>`
            ).join('') : this.getDefaultItems(subcategory.name)}
          </div>
        </div>
      </div>
    `;
  }

  createFeaturedProduct(product) {
    return `
      <div class="featured-product" data-product-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        </div>
        <div class="product-info">
          <h5 class="product-name">${product.name}</h5>
          <p class="product-price">XAF ${product.price}</p>
        </div>
      </div>
    `;
  }

  createCategoryImagesGrid() {
    const categoryImages = [
      { name: 'Objets connectés', image: 'assets/images/obj_connecte.jpg', slug: 'objets-connectes' },
      { name: 'Audio, Hifi', image: 'assets/images/audio.jpg', slug: 'audio-hifi' },
      { name: 'TV, Home Cinéma', image: 'assets/images/tv_cinema.jpg', slug: 'tv-home-cinema' },
      { name: 'Jeux vidéo', image: 'assets/images/jeuxvideo.jpg', slug: 'jeux-video' },
      { name: 'Téléphonie', image: 'assets/images/telephone.jpg', slug: 'telephonie' },
      { name: 'Photo, caméscope', image: 'assets/images/photo_camera.jpg', slug: 'photo-camescope' }
    ];

    return categoryImages.map(item => `
      <div class="category-image" onclick="highTechMenu.showSubcategoryProducts('${item.slug}')">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="image-overlay">${item.name}</div>
      </div>
    `).join('');
  }

  getProductCount(subcategorySlug) {
    // Get product count for subcategory
    const subcategory = this.highTechData?.children.find(child => child.slug === subcategorySlug);
    return subcategory?.children?.length || 0;
  }

  getSubcategoryDescription(subcategorySlug) {
    const descriptions = {
      'objets-connectes': 'Découvrez les derniers objets connectés pour une maison intelligente',
      'audio-hifi': 'Systèmes audio haut de gamme pour une expérience sonore exceptionnelle',
      'tv-home-cinema': 'Téléviseurs et équipements home cinéma pour votre divertissement',
      'jeux-video': 'Consoles, jeux et accessoires gaming pour tous les passionnés',
      'telephonie': 'Smartphones et accessoires de communication modernes',
      'photo-camescope': 'Matériel photo et vidéo professionnel pour immortaliser vos moments'
    };
    return descriptions[subcategorySlug] || 'Explorez notre gamme de produits High-Tech';
  }

  getDefaultItems(subcategoryName) {
    const defaultItems = {
      'Objets connectés': ['Drones', 'Montres connectées', 'Réalité virtuelle', 'Maison connectée'],
      'Audio, Hifi': ['Casques', 'Enceintes', 'Amplificateurs', 'Lecteurs'],
      'TV, Home Cinéma': ['Téléviseurs', 'Vidéoprojecteurs', 'Barres de son', 'Supports'],
      'Jeux vidéo': ['Consoles', 'Jeux', 'Manettes', 'Accessoires'],
      'Téléphonie': ['Smartphones', 'Accessoires', 'Coques', 'Chargeurs'],
      'Photo, caméscope': ['Caméras', 'Objectifs', 'Accessoires', 'Trépieds']
    };
    return (defaultItems[subcategoryName] || ['Produits populaires', 'Nouveautés', 'Promotions']).map(item => 
      `<div class="sub-item">${item}</div>`
    ).join('');
  }

  getFeaturedProducts() {
    const highTechProducts = window.productDatabase?.['high-tech']?.products || [];
    return highTechProducts.slice(0, 8); // Show first 8 products as featured
  }

  bindEvents() {
    // Event listeners will be added here
    document.addEventListener('click', (e) => {
      if (e.target.closest('.high-tech-subcategory')) {
        const subcategory = e.target.closest('.high-tech-subcategory').dataset.subcategory;
        this.showSubcategoryProducts(subcategory);
      }
    });
  }

  showSubcategoryProducts(subcategorySlug, itemSlug = null) {
    // Hide main content
    const mainContent = document.querySelector('main');
    if (mainContent) mainContent.style.display = 'none';

    // Create or get content area
    let contentArea = document.getElementById('menu-content');
    if (!contentArea) {
      contentArea = this.createContentArea();
    }

    // Show filtered products
    const products = this.getProductsBySubcategory(subcategorySlug, itemSlug);
    this.renderSubcategoryContent(contentArea, subcategorySlug, products, itemSlug);

    // Update URL hash
    const hash = itemSlug ? `high-tech/${subcategorySlug}/${itemSlug}` : `high-tech/${subcategorySlug}`;
    window.location.hash = hash;
  }

  getProductsBySubcategory(subcategorySlug, itemSlug = null) {
    const highTechProducts = window.productDatabase?.['high-tech']?.products || [];
    return highTechProducts.filter(product => product.subcategory === subcategorySlug);
  }

  renderSubcategoryContent(container, subcategorySlug, products, itemSlug = null) {
    const subcategory = this.highTechData.children.find(child => child.slug === subcategorySlug);
    const itemName = itemSlug ? subcategory.children.find(item => item.slug === itemSlug)?.name : null;

    container.innerHTML = `
      <div class="container">
        <div class="subcategory-page-header">
          <button class="back-btn" onclick="highTechMenu.showHighTechMainMenu()">
            ← Retour au menu High-Tech
          </button>
          <h1 class="page-title">${subcategory.name}${itemName ? ` - ${itemName}` : ''}</h1>
          <p class="page-description">${this.getSubcategoryDescription(subcategorySlug)}</p>
          <p class="products-count">${products.length} produit${products.length > 1 ? 's' : ''} trouvé${products.length > 1 ? 's' : ''}</p>
        </div>
        
        ${itemSlug ? this.renderSubItemsNavigation(subcategory) : ''}
        
        <div class="products-grid">
          ${products.map(product => this.createProductCard(product)).join('')}
        </div>
        
        ${products.length === 0 ? '<div class="no-products">Aucun produit disponible dans cette catégorie</div>' : ''}
      </div>
    `;
  }

  renderSubItemsNavigation(subcategory) {
    return `
      <div class="sub-items-navigation">
        <h3>Sous-catégories</h3>
        <div class="sub-items-grid">
          ${subcategory.children.map(item => `
            <button class="sub-item-nav" onclick="highTechMenu.showSubcategoryProducts('${subcategory.slug}', '${item.slug}')">
              ${item.name} (${item.productCount || 0})
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  createProductCard(product) {
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    const badgeClass = product.badge ? `showcase-badge ${product.badge}` : '';
    
    return `
      <div class="showcase" data-product-id="${product.id}">
        <div class="showcase-banner">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          ${product.badge ? `<div class="${badgeClass}">${product.badge}</div>` : ''}
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

  showHighTechMainMenu() {
    // Show the high tech mega menu
    if (window.nexusChopMenu) {
      window.nexusChopMenu.showMegaMenu('high-tech');
    }
  }

  createContentArea() {
    const contentArea = document.createElement('div');
    contentArea.id = 'menu-content';
    contentArea.className = 'menu-content-area high-tech-content';
    
    const mainContent = document.querySelector('main');
    if (mainContent && mainContent.parentNode) {
      mainContent.parentNode.insertBefore(contentArea, mainContent.nextSibling);
    } else {
      document.body.appendChild(contentArea);
    }

    return contentArea;
  }

  showHighTechContent(container) {
    container.innerHTML = window.highTechMegaMenuHTML || '<div>Chargement...</div>';
    
    // Add animation class
    container.querySelector('.high-tech-mega-menu')?.classList.add('glow-effect');
    
    // Initialize subcategory click handlers
    this.bindSubcategoryEvents();
  }

  bindSubcategoryEvents() {
    // Use event delegation to handle dynamically inserted content
    document.addEventListener('click', (e) => {
      // Handle subcategory card clicks
      const card = e.target.closest('.high-tech-subcategory');
      if (card && !e.target.closest('.sub-item')) {
        const subcategory = card.dataset.subcategory;
        this.showSubcategoryProducts(subcategory);
      }

      // Handle sub-item clicks
      const subItem = e.target.closest('.sub-item');
      if (subItem) {
        // The onclick is already set in the HTML, so this is handled by the inline onclick
        // But we can prevent the card click if sub-item is clicked
        e.stopPropagation();
      }
    });
  }
}

// Enhanced CSS styles for High Tech mega menu
const highTechStyles = `
  .high-tech-content {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px 0;
  }

  .subcategory-page-header {
    background: white;
    padding: 30px;
    border-radius: 15px;
    margin-bottom: 30px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    text-align: center;
  }

  .back-btn {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }

  .back-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  .products-count {
    color: #667eea;
    font-weight: 600;
    font-size: 1.1rem;
  }

  .sub-items-navigation {
    background: white;
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 30px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }

  .sub-items-navigation h3 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 1.3rem;
    font-weight: 600;
  }

  .sub-items-navigation .sub-items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }

  .sub-item-nav {
    background: linear-gradient(135deg, #f093fb, #f5576c);
    color: white;
    border: none;
    padding: 12px 16px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }

  .sub-item-nav:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(240, 147, 251, 0.4);
  }

  .no-products {
    text-align: center;
    padding: 60px 20px;
    color: #666;
    font-size: 1.2rem;
  }

  .product-badge {
    position: absolute;
    top: 15px;
    left: 15px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    z-index: 2;
  }

  .product-badge.new {
    background: linear-gradient(135deg, #11998e, #38ef7d);
  }

  .product-badge.best-seller {
    background: linear-gradient(135deg, #fc466b, #3f5efb);
  }

  .product-badge.trending {
    background: linear-gradient(135deg, #f093fb, #f5576c);
  }

  .product-badge.featured {
    background: linear-gradient(135deg, #ffecd2, #fcb69f);
    color: #333;
  }

  .product-badge.bundle {
    background: linear-gradient(135deg, #a8edea, #fed6e3);
    color: #333;
  }

  .product-badge.smart-tv {
    background: linear-gradient(135deg, #667eea, #764ba2);
  }
`;

// Add styles to document
const highTechStyleSheet = document.createElement('style');
highTechStyleSheet.textContent = highTechStyles;
document.head.appendChild(highTechStyleSheet);

// Initialize High Tech mega menu
(async () => {
  const highTechMenu = new HighTechMegaMenu();
  await highTechMenu.init();
  window.highTechMenu = highTechMenu;
  console.log('High Tech Mega Menu System Loaded Successfully');
})();