/**
 * Advanced Filter System - Système de filtres temps réel
 * Permet de filtrer les produits sans rechargement de page
 */

class AdvancedFilters {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector) || document.body;
    this.allProducts = [];
    this.filteredProducts = [];
    this.activeFilters = {
      price: { min: 0, max: Infinity },
      categories: [],
      brands: [],
      rating: 0,
      inStock: false
    };
    
    this.init();
  }
  
  init() {
    this.loadProducts();
    this.createFilterUI();
    this.bindEvents();
    this.renderProducts(this.allProducts);
    console.log('Advanced Filters System Initialized');
  }
  
  // Charger les produits depuis la base de données
  loadProducts() {
    if (typeof ProductDatabase !== 'undefined') {
      // Récupérer tous les produits
      if (ProductDatabase.highTech) {
        Object.values(ProductDatabase.highTech).forEach(product => {
          this.allProducts.push({
            ...product,
            category: product.category || 'High-Tech',
            brand: this.extractBrand(product.title)
          });
        });
      }
      
      if (ProductDatabase.fashion) {
        Object.values(ProductDatabase.fashion).forEach(product => {
          this.allProducts.push({
            ...product,
            category: product.category || 'Fashion',
            brand: this.extractBrand(product.title)
          });
        });
      }
    } else {
      // Données de fallback pour les tests
      this.allProducts = [
        {
          id: 'f001',
          title: 'Mens Winter Leathers Jackets',
          price: 30000,
          category: 'Vestes',
          brand: 'Winter Style',
          rating: 4,
          inStock: true,
          image: 'assets/images/products/jacket-3.jpg'
        },
        {
          id: 'f002',
          title: 'Short de survêtement',
          price: 12000,
          category: 'Shorts',
          brand: 'Better Basics',
          rating: 5,
          inStock: true,
          image: 'assets/images/products/shorts-1.jpg'
        }
      ];
    }
  }
  
  // Extraire la marque du titre du produit
  extractBrand(title) {
    const brands = ['Apple', 'Samsung', 'Sony', 'Canon', 'Dell', 'HP', 'Lenovo', 'Acer', 'Asus', 'Nike', 'Adidas'];
    for (const brand of brands) {
      if (title.toLowerCase().includes(brand.toLowerCase())) {
        return brand;
      }
    }
    return 'Autre';
  }
  
  // Créer l'interface des filtres
  createFilterUI() {
    const filterHTML = `
      <div class="advanced-filters" id="advanced-filters">
        <div class="filters-header">
          <h3>Filtres</h3>
          <button class="clear-filters-btn" onclick="advancedFilters.clearAllFilters()">
            Réinitialiser
          </button>
        </div>
        
        <div class="filters-container">
          <!-- Filtre Prix -->
          <div class="filter-group">
            <h4>Prix</h4>
            <div class="price-filter">
              <div class="price-inputs">
                <input type="number" id="min-price" placeholder="Min" min="0">
                <span>-</span>
                <input type="number" id="max-price" placeholder="Max" min="0">
              </div>
              <div class="price-range">
                <input type="range" id="price-range-slider" min="0" max="2000000" value="2000000">
              </div>
              <div class="price-display">
                <span id="price-display">0 - 2 000 000 XAF</span>
              </div>
            </div>
          </div>
          
          <!-- Filtre Catégories -->
          <div class="filter-group">
            <h4>Catégories</h4>
            <div class="checkbox-filters" id="category-filters">
              <!-- Généré dynamiquement -->
            </div>
          </div>
          
          <!-- Filtre Marques -->
          <div class="filter-group">
            <h4>Marques</h4>
            <div class="checkbox-filters" id="brand-filters">
              <!-- Généré dynamiquement -->
            </div>
          </div>
          
          <!-- Filtre Note -->
          <div class="filter-group">
            <h4>Note minimum</h4>
            <div class="rating-filter">
              <div class="stars-display">
                <span class="star active" data-rating="1">★</span>
                <span class="star active" data-rating="2">★</span>
                <span class="star active" data-rating="3">★</span>
                <span class="star active" data-rating="4">★</span>
                <span class="star active" data-rating="5">★</span>
              </div>
              <span class="rating-text" id="rating-text">Toutes les notes</span>
            </div>
          </div>
          
          <!-- Filtre Stock -->
          <div class="filter-group">
            <label class="checkbox-label">
              <input type="checkbox" id="in-stock-only">
              <span class="checkmark"></span>
              En stock uniquement
            </label>
          </div>
        </div>
        
        <!-- Résultats -->
        <div class="filter-results">
          <div class="results-count">
            <span id="results-count">${this.allProducts.length} produits trouvés</span>
          </div>
          <div class="sort-options">
            <select id="sort-select">
              <option value="relevance">Pertinence</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating-desc">Meilleure note</option>
              <option value="name-asc">Nom A-Z</option>
            </select>
          </div>
        </div>
      </div>
    `;
    
    // Insérer le filtre avant la grille de produits
    const productGrid = document.querySelector('.product-grid') || document.querySelector('#product-grid');
    if (productGrid) {
      productGrid.insertAdjacentHTML('beforebegin', filterHTML);
      this.generateDynamicFilters();
      this.addFilterStyles();
    }
  }
  
  // Générer les filtres dynamiques
  generateDynamicFilters() {
    const categories = [...new Set(this.allProducts.map(p => p.category))];
    const brands = [...new Set(this.allProducts.map(p => p.brand))];
    
    // Filtres catégories
    const categoryContainer = document.getElementById('category-filters');
    categories.forEach(category => {
      const count = this.allProducts.filter(p => p.category === category).length;
      categoryContainer.insertAdjacentHTML('beforeend', `
        <label class="checkbox-label">
          <input type="checkbox" value="${category}" data-filter="category">
          <span class="checkmark"></span>
          ${category} (${count})
        </label>
      `);
    });
    
    // Filtres marques
    const brandContainer = document.getElementById('brand-filters');
    brands.forEach(brand => {
      const count = this.allProducts.filter(p => p.brand === brand).length;
      brandContainer.insertAdjacentHTML('beforeend', `
        <label class="checkbox-label">
          <input type="checkbox" value="${brand}" data-filter="brand">
          <span class="checkmark"></span>
          ${brand} (${count})
        </label>
      `);
    });
  }
  
  // Ajouter les styles CSS pour les filtres
  addFilterStyles() {
    const styles = `
      <style id="advanced-filters-styles">
        .advanced-filters {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          padding: 20px;
          margin-bottom: 20px;
        }
        
        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        
        .filters-header h3 {
          margin: 0;
          color: #333;
          font-size: 1.5rem;
        }
        
        .clear-filters-btn {
          background: #ff6600;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.3s;
        }
        
        .clear-filters-btn:hover {
          background: #ff5200;
        }
        
        .filter-group {
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .filter-group:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        
        .filter-group h4 {
          margin: 0 0 15px 0;
          color: #555;
          font-size: 1.1rem;
        }
        
        .price-filter .price-inputs {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .price-filter input[type="number"] {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 0.9rem;
        }
        
        .price-range {
          margin-bottom: 10px;
        }
        
        .price-range input[type="range"] {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #ddd;
          outline: none;
        }
        
        .price-display {
          font-size: 0.9rem;
          color: #666;
        }
        
        .checkbox-filters {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .checkbox-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 0.9rem;
          color: #555;
        }
        
        .checkbox-label input[type="checkbox"] {
          display: none;
        }
        
        .checkmark {
          width: 18px;
          height: 18px;
          border: 2px solid #ddd;
          border-radius: 3px;
          margin-right: 10px;
          position: relative;
          transition: all 0.3s;
        }
        
        .checkbox-label input:checked + .checkmark {
          background: #ff6600;
          border-color: #ff6600;
        }
        
        .checkbox-label input:checked + .checkmark::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        
        .rating-filter {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .stars-display {
          display: flex;
          gap: 5px;
        }
        
        .stars-display .star {
          font-size: 1.5rem;
          color: #ddd;
          cursor: pointer;
          transition: color 0.3s;
        }
        
        .stars-display .star.active {
          color: #ffc107;
        }
        
        .stars-display .star:hover {
          color: #ff9800;
        }
        
        .rating-text {
          font-size: 0.9rem;
          color: #666;
        }
        
        .filter-results {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid #eee;
          margin-top: 20px;
        }
        
        .results-count {
          font-size: 1rem;
          color: #666;
        }
        
        .sort-options select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          background: white;
          font-size: 0.9rem;
        }
        
        /* Animations */
        .filter-group {
          animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .advanced-filters {
            padding: 15px;
          }
          
          .filters-header {
            flex-direction: column;
            gap: 10px;
            align-items: stretch;
          }
          
          .filter-results {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }
        }
      </style>
    `;
    
    if (!document.getElementById('advanced-filters-styles')) {
      document.head.insertAdjacentHTML('beforeend', styles);
    }
  }
  
  // Gérer les événements
  bindEvents() {
    // Filtres checkbox
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-filter]')) {
        this.updateFilter(e.target);
      }
    });
    
    // Prix
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const priceRangeSlider = document.getElementById('price-range-slider');
    
    if (minPriceInput && maxPriceInput && priceRangeSlider) {
      minPriceInput.addEventListener('input', () => this.updatePriceFilter());
      maxPriceInput.addEventListener('input', () => this.updatePriceFilter());
      priceRangeSlider.addEventListener('input', () => this.updatePriceSlider());
    }
    
    // Note
    document.addEventListener('click', (e) => {
      if (e.target.matches('.star')) {
        this.updateRatingFilter(parseInt(e.target.dataset.rating));
      }
    });
    
    // Stock
    const stockCheckbox = document.getElementById('in-stock-only');
    if (stockCheckbox) {
      stockCheckbox.addEventListener('change', () => this.updateStockFilter());
    }
    
    // Tri
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => this.sortProducts());
    }
  }
  
  // Mettre à jour les filtres
  updateFilter(checkbox) {
    const filterType = checkbox.dataset.filter;
    const value = checkbox.value;
    const isChecked = checkbox.checked;
    
    if (isChecked) {
      this.activeFilters[filterType + 's'].push(value);
    } else {
      this.activeFilters[filterType + 's'] = this.activeFilters[filterType + 's'].filter(v => v !== value);
    }
    
    this.applyFilters();
  }
  
  updatePriceFilter() {
    const minPrice = parseInt(document.getElementById('min-price').value) || 0;
    const maxPrice = parseInt(document.getElementById('max-price').value) || Infinity;
    
    this.activeFilters.price = { min: minPrice, max: maxPrice };
    this.updatePriceDisplay();
    this.applyFilters();
  }
  
  updatePriceSlider() {
    const maxPrice = parseInt(document.getElementById('price-range-slider').value);
    document.getElementById('max-price').value = maxPrice;
    this.updatePriceFilter();
  }
  
  updatePriceDisplay() {
    const minPrice = this.activeFilters.price.min;
    const maxPrice = this.activeFilters.price.max === Infinity ? '2 000 000+' : this.activeFilters.price.max;
    document.getElementById('price-display').textContent = `${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()} XAF`;
  }
  
  updateRatingFilter(rating) {
    this.activeFilters.rating = rating;
    
    // Mettre à jour l'affichage des étoiles
    document.querySelectorAll('.stars-display .star').forEach((star, index) => {
      star.classList.toggle('active', index < rating);
    });
    
    const ratingText = rating === 0 ? 'Toutes les notes' : `${rating}+ étoiles`;
    document.getElementById('rating-text').textContent = ratingText;
    
    this.applyFilters();
  }
  
  updateStockFilter() {
    const stockCheckbox = document.getElementById('in-stock-only');
    this.activeFilters.inStock = stockCheckbox.checked;
    this.applyFilters();
  }
  
  // Appliquer tous les filtres
  applyFilters() {
    this.filteredProducts = this.allProducts.filter(product => {
      // Filtre prix
      if (product.price < this.activeFilters.price.min || product.price > this.activeFilters.price.max) {
        return false;
      }
      
      // Filtre catégories
      if (this.activeFilters.categories.length > 0 && !this.activeFilters.categories.includes(product.category)) {
        return false;
      }
      
      // Filtre marques
      if (this.activeFilters.brands.length > 0 && !this.activeFilters.brands.includes(product.brand)) {
        return false;
      }
      
      // Filtre note
      if (this.activeFilters.rating > 0 && (product.rating || 0) < this.activeFilters.rating) {
        return false;
      }
      
      // Filtre stock
      if (this.activeFilters.inStock && !product.inStock) {
        return false;
      }
      
      return true;
    });
    
    this.sortProducts();
    this.renderProducts(this.filteredProducts);
    this.updateResultsCount();
  }
  
  // Trier les produits
  sortProducts() {
    const sortBy = document.getElementById('sort-select').value;
    
    switch (sortBy) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        this.filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name-asc':
        this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // relevance
        // Garder l'ordre original
        break;
    }
  }
  
  // Rendu des produits
  renderProducts(products) {
    const productGrid = document.querySelector('.product-grid') || document.querySelector('#product-grid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    if (products.length === 0) {
      productGrid.innerHTML = `
        <div class="no-results">
          <h3>Aucun produit trouvé</h3>
          <p>Essayez de modifier vos filtres pour voir plus de résultats.</p>
        </div>
      `;
      return;
    }
    
    products.forEach(product => {
      const productCard = this.createProductCard(product);
      productGrid.insertAdjacentHTML('beforeend', productCard);
    });
  }
  
  // Créer une carte produit
  createProductCard(product) {
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    return `
      <div class="product-card" data-product-id="${product.id}" onclick="viewProductDetail('${product.id}')">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.title}" class="product-image">
          ${discount > 0 ? `<div class="discount-badge">-${discount}%</div>` : ''}
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-category">${product.category} • ${product.brand}</p>
          <div class="product-rating">
            ${this.generateStars(product.rating || 0)}
            <span class="rating-count">(${Math.floor(Math.random() * 50) + 5})</span>
          </div>
          <div class="product-price">
            <span class="current-price">${this.formatPrice(product.price)}</span>
            ${product.originalPrice ? `<span class="original-price">${this.formatPrice(product.originalPrice)}</span>` : ''}
          </div>
          <button class="btn-add-cart" onclick="event.stopPropagation(); advancedFilters.addToCart('${product.id}')">
            Ajouter au Panier
          </button>
        </div>
      </div>
    `;
  }
  
  // Générer les étoiles de rating
  generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += `<span class="star ${i <= rating ? 'filled' : ''}">★</span>`;
    }
    return stars;
  }
  
  // Formater le prix
  formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price);
  }
  
  // Ajouter au panier
  addToCart(productId) {
    const product = this.allProducts.find(p => p.id === productId);
    if (product && typeof window.panier !== 'undefined') {
      window.panier.addItem(product);
      this.showNotification(`✅ ${product.title} ajouté au panier!`, 'success');
    }
  }
  
  // Afficher notification
  showNotification(message, type = 'info') {
    // Créer et afficher la notification
    const notification = document.createElement('div');
    notification.className = `filter-notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
      </div>
    `;
    
    // Styles de notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#28a745' : '#17a2b8'};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  // Mettre à jour le compteur de résultats
  updateResultsCount() {
    const count = this.filteredProducts.length;
    document.getElementById('results-count').textContent = `${count} produit${count !== 1 ? 's' : ''} trouvé${count !== 1 ? 's' : ''}`;
  }
  
  // Effacer tous les filtres
  clearAllFilters() {
    // Réinitialiser les filtres actifs
    this.activeFilters = {
      price: { min: 0, max: Infinity },
      categories: [],
      brands: [],
      rating: 0,
      inStock: false
    };
    
    // Réinitialiser l'interface
    document.querySelectorAll('[data-filter]').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('in-stock-only').checked = false;
    document.getElementById('sort-select').value = 'relevance';
    
    // Réinitialiser le slider de prix
    const priceSlider = document.getElementById('price-range-slider');
    if (priceSlider) priceSlider.value = 2000000;
    
    // Réinitialiser les étoiles
    document.querySelectorAll('.stars-display .star').forEach(star => {
      star.classList.add('active');
    });
    document.getElementById('rating-text').textContent = 'Toutes les notes';
    
    this.updatePriceDisplay();
    this.applyFilters();
  }
}

// Initialisation automatique
let advancedFilters;

document.addEventListener('DOMContentLoaded', function() {
  // Vérifier s'il y a une grille de produits sur la page
  if (document.querySelector('.product-grid') || document.querySelector('#product-grid')) {
    advancedFilters = new AdvancedFilters();
    window.advancedFilters = advancedFilters; // Exposition globale pour débogage
  }
});

// CSS animations pour les notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(notificationStyles);