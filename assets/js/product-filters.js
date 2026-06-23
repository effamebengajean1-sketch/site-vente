/*==================================*\
    SYSTÈME DE FILTRES ET TRI AVANCÉS
    Filtrage par catégorie, prix, note
    Tri par pertinence, prix, popularité
\*==================================*/

class ProductFilters {
  constructor() {
    this.products = [];
    this.filteredProducts = [];
    this.currentFilters = {
      category: 'all',
      minPrice: 0,
      maxPrice: Infinity,
      minRating: 0,
      sortBy: 'default'
    };
    this.init();
  }

  init() {
    this.loadProductsFromPage();
    this.createFilterUI();
    this.setupEventListeners();
    console.log('Product Filters System Initialized');
  }

  // Charger les produits depuis la page actuelle
  loadProductsFromPage() {
    const showcases = document.querySelectorAll('.showcase');
    
    showcases.forEach((showcase, index) => {
      const titleElement = showcase.querySelector('.showcase-title');
      const categoryElement = showcase.querySelector('.showcase-category');
      const priceElement = showcase.querySelector('.price');
      const ratingElement = showcase.querySelector('.showcase-rating');
      const imageElement = showcase.querySelector('.product-img.default');
      const badgeElement = showcase.querySelector('.showcase-badge');
      
      if (titleElement && priceElement) {
        const product = {
          id: `product-${index}`,
          element: showcase,
          name: titleElement.textContent.trim(),
          category: categoryElement ? categoryElement.textContent.trim() : 'Autre',
          price: this.extractPrice(priceElement.textContent),
          priceText: priceElement.textContent.trim(),
          rating: this.extractRating(ratingElement),
          image: imageElement ? imageElement.src : '',
          badge: badgeElement ? badgeElement.textContent.trim() : null
        };
        
        this.products.push(product);
      }
    });
    
    this.filteredProducts = [...this.products];
    console.log(`Loaded ${this.products.length} products`);
  }

  // Extraire le prix numérique
  extractPrice(priceText) {
    const match = priceText.match(/[\d,]+/);
    if (match) {
      return parseFloat(match[0].replace(/,/g, ''));
    }
    return 0;
  }

  // Extraire la note
  extractRating(ratingElement) {
    if (!ratingElement) return 0;
    
    const fullStars = ratingElement.querySelectorAll('ion-icon[name="star"]').length;
    const halfStars = ratingElement.querySelectorAll('ion-icon[name="star-half-outline"]').length;
    
    return fullStars + (halfStars * 0.5);
  }

  // Créer l'interface de filtrage
  createFilterUI() {
    const productMain = document.querySelector('.product-main');
    if (!productMain) return;

    // Créer le conteneur de filtres
    const filterContainer = document.createElement('div');
    filterContainer.className = 'product-filters-container';
    filterContainer.innerHTML = `
      <div class="filters-wrapper">
        <div class="filters-header">
          <h3 class="filters-title">
            <ion-icon name="options-outline"></ion-icon>
            Filtres & Tri
          </h3>
          <button class="filters-reset-btn" title="Réinitialiser les filtres">
            <ion-icon name="refresh-outline"></ion-icon>
            Réinitialiser
          </button>
        </div>
        
        <div class="filters-content">
          <!-- Filtre par catégorie -->
          <div class="filter-group">
            <label class="filter-label">
              <ion-icon name="pricetags-outline"></ion-icon>
              Catégorie
            </label>
            <select class="filter-select" id="category-filter">
              <option value="all">Toutes les catégories</option>
            </select>
          </div>

          <!-- Filtre par prix -->
          <div class="filter-group">
            <label class="filter-label">
              <ion-icon name="cash-outline"></ion-icon>
              Prix (XAF)
            </label>
            <div class="price-filter-inputs">
              <input type="number" id="min-price" class="filter-input" placeholder="Min" min="0">
              <span class="price-separator">-</span>
              <input type="number" id="max-price" class="filter-input" placeholder="Max" min="0">
            </div>
            <div class="price-range-display">
              <span id="price-range-text">Tous les prix</span>
            </div>
          </div>

          <!-- Filtre par note -->
          <div class="filter-group">
            <label class="filter-label">
              <ion-icon name="star-outline"></ion-icon>
              Note minimum
            </label>
            <div class="rating-filter">
              <div class="rating-options">
                <button class="rating-btn" data-rating="0">
                  <span>Toutes</span>
                </button>
                <button class="rating-btn" data-rating="3">
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <span>3+</span>
                </button>
                <button class="rating-btn" data-rating="4">
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <span>4+</span>
                </button>
                <button class="rating-btn active" data-rating="5">
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <span>5</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Tri -->
          <div class="filter-group">
            <label class="filter-label">
              <ion-icon name="swap-vertical-outline"></ion-icon>
              Trier par
            </label>
            <select class="filter-select" id="sort-filter">
              <option value="default">Par défaut</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name-asc">Nom A-Z</option>
              <option value="name-desc">Nom Z-A</option>
              <option value="rating-desc">Meilleures notes</option>
              <option value="new">Nouveautés</option>
              <option value="sale">Promotions</option>
            </select>
          </div>
        </div>

        <!-- Résultats -->
        <div class="filter-results">
          <span class="results-count">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <span id="results-count">${this.products.length}</span> produit(s) trouvé(s)
          </span>
        </div>
      </div>
    `;

    // Insérer avant la grille de produits
    const productGrid = productMain.querySelector('.product-grid');
    if (productGrid) {
      productMain.insertBefore(filterContainer, productGrid);
    }

    // Remplir les catégories
    this.populateCategories();
  }

  // Remplir le select des catégories
  populateCategories() {
    const categorySelect = document.getElementById('category-filter');
    if (!categorySelect) return;

    const categories = [...new Set(this.products.map(p => p.category))].sort();
    
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  }

  // Configurer les écouteurs d'événements
  setupEventListeners() {
    // Filtre par catégorie
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.currentFilters.category = e.target.value;
        this.applyFilters();
      });
    }

    // Filtre par prix
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    
    if (minPriceInput) {
      minPriceInput.addEventListener('input', () => {
        this.currentFilters.minPrice = parseFloat(minPriceInput.value) || 0;
        this.updatePriceRangeDisplay();
        this.applyFilters();
      });
    }
    
    if (maxPriceInput) {
      maxPriceInput.addEventListener('input', () => {
        this.currentFilters.maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        this.updatePriceRangeDisplay();
        this.applyFilters();
      });
    }

    // Filtre par note
    const ratingButtons = document.querySelectorAll('.rating-btn');
    ratingButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        ratingButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilters.minRating = parseFloat(btn.dataset.rating);
        this.applyFilters();
      });
    });

    // Tri
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
      sortFilter.addEventListener('change', (e) => {
        this.currentFilters.sortBy = e.target.value;
        this.applyFilters();
      });
    }

    // Bouton de réinitialisation
    const resetBtn = document.querySelector('.filters-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }
  }

  // Mettre à jour l'affichage de la plage de prix
  updatePriceRangeDisplay() {
    const priceRangeText = document.getElementById('price-range-text');
    if (!priceRangeText) return;

    const min = this.currentFilters.minPrice;
    const max = this.currentFilters.maxPrice;

    if (min === 0 && max === Infinity) {
      priceRangeText.textContent = 'Tous les prix';
    } else if (max === Infinity) {
      priceRangeText.textContent = `À partir de ${min.toLocaleString()} XAF`;
    } else if (min === 0) {
      priceRangeText.textContent = `Jusqu'à ${max.toLocaleString()} XAF`;
    } else {
      priceRangeText.textContent = `${min.toLocaleString()} - ${max.toLocaleString()} XAF`;
    }
  }

  // Appliquer les filtres
  applyFilters() {
    // Filtrer les produits
    this.filteredProducts = this.products.filter(product => {
      // Filtre par catégorie
      if (this.currentFilters.category !== 'all' && product.category !== this.currentFilters.category) {
        return false;
      }

      // Filtre par prix
      if (product.price < this.currentFilters.minPrice || product.price > this.currentFilters.maxPrice) {
        return false;
      }

      // Filtre par note
      if (product.rating < this.currentFilters.minRating) {
        return false;
      }

      return true;
    });

    // Trier les produits
    this.sortProducts();

    // Mettre à jour l'affichage
    this.updateDisplay();
  }

  // Trier les produits
  sortProducts() {
    switch (this.currentFilters.sortBy) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'new':
        this.filteredProducts.sort((a, b) => {
          const aIsNew = a.badge && a.badge.toLowerCase().includes('new');
          const bIsNew = b.badge && b.badge.toLowerCase().includes('new');
          return bIsNew - aIsNew;
        });
        break;
      case 'sale':
        this.filteredProducts.sort((a, b) => {
          const aIsSale = a.badge && a.badge.toLowerCase().includes('sale');
          const bIsSale = b.badge && b.badge.toLowerCase().includes('sale');
          return bIsSale - aIsSale;
        });
        break;
      default:
        // Ordre par défaut (ordre original)
        break;
    }
  }

  // Mettre à jour l'affichage
  updateDisplay() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    // Masquer tous les produits
    this.products.forEach(product => {
      product.element.style.display = 'none';
    });

    // Afficher les produits filtrés dans l'ordre trié
    this.filteredProducts.forEach((product, index) => {
      product.element.style.display = 'block';
      product.element.style.order = index;
    });

    // Mettre à jour le compteur
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
      resultsCount.textContent = this.filteredProducts.length;
    }

    // Animation d'apparition
    this.animateProducts();

    // Message si aucun résultat
    this.showNoResultsMessage();
  }

  // Animer l'apparition des produits
  animateProducts() {
    this.filteredProducts.forEach((product, index) => {
      product.element.style.animation = 'none';
      setTimeout(() => {
        product.element.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s forwards`;
      }, 10);
    });
  }

  // Afficher un message si aucun résultat
  showNoResultsMessage() {
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (this.filteredProducts.length === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
          <div class="no-results-content">
            <ion-icon name="search-outline"></ion-icon>
            <h3>Aucun produit trouvé</h3>
            <p>Essayez de modifier vos critères de recherche</p>
            <button class="btn-reset-filters" onclick="window.productFilters.resetFilters()">
              Réinitialiser les filtres
            </button>
          </div>
        `;
        
        const productGrid = document.querySelector('.product-grid');
        if (productGrid) {
          productGrid.parentNode.insertBefore(noResultsMsg, productGrid.nextSibling);
        }
      }
      noResultsMsg.style.display = 'flex';
    } else {
      if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
      }
    }
  }

  // Réinitialiser les filtres
  resetFilters() {
    this.currentFilters = {
      category: 'all',
      minPrice: 0,
      maxPrice: Infinity,
      minRating: 0,
      sortBy: 'default'
    };

    // Réinitialiser les inputs
    const categoryFilter = document.getElementById('category-filter');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const sortFilter = document.getElementById('sort-filter');
    const ratingButtons = document.querySelectorAll('.rating-btn');

    if (categoryFilter) categoryFilter.value = 'all';
    if (minPriceInput) minPriceInput.value = '';
    if (maxPriceInput) maxPriceInput.value = '';
    if (sortFilter) sortFilter.value = 'default';
    
    ratingButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.rating === '0') {
        btn.classList.add('active');
      }
    });

    this.updatePriceRangeDisplay();
    this.applyFilters();
  }

  // Obtenir les statistiques
  getStats() {
    return {
      total: this.products.length,
      filtered: this.filteredProducts.length,
      categories: [...new Set(this.products.map(p => p.category))].length,
      priceRange: {
        min: Math.min(...this.products.map(p => p.price)),
        max: Math.max(...this.products.map(p => p.price))
      }
    };
  }
}

// Styles CSS pour les filtres
const filterStyles = document.createElement('style');
filterStyles.textContent = `
  .product-filters-container {
    margin-bottom: 30px;
    animation: fadeInDown 0.5s ease;
  }

  .filters-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 20px;
  }

  .filters-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;
  }

  .filters-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .filters-title ion-icon {
    font-size: 24px;
    color: #ff6600;
  }

  .filters-reset-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    color: #666;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .filters-reset-btn:hover {
    background: #ff6600;
    color: white;
    border-color: #ff6600;
  }

  .filters-reset-btn ion-icon {
    font-size: 18px;
  }

  .filters-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .filter-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: #333;
    font-size: 14px;
  }

  .filter-label ion-icon {
    font-size: 18px;
    color: #ff6600;
  }

  .filter-select,
  .filter-input {
    padding: 10px 12px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    font-size: 14px;
    transition: all 0.3s ease;
  }

  .filter-select:focus,
  .filter-input:focus {
    outline: none;
    border-color: #ff6600;
    box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
  }

  .price-filter-inputs {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .price-filter-inputs .filter-input {
    flex: 1;
  }

  .price-separator {
    color: #999;
    font-weight: 600;
  }

  .price-range-display {
    padding: 8px 12px;
    background: #f8f9fa;
    border-radius: 6px;
    text-align: center;
    font-size: 13px;
    color: #666;
  }

  .rating-filter {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .rating-options {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .rating-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 12px;
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 12px;
  }

  .rating-btn ion-icon {
    font-size: 14px;
    color: #ffc107;
  }

  .rating-btn:hover {
    border-color: #ff6600;
    background: #fff5f0;
  }

  .rating-btn.active {
    background: #ff6600;
    border-color: #ff6600;
    color: white;
  }

  .rating-btn.active ion-icon {
    color: white;
  }

  .filter-results {
    padding: 15px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    text-align: center;
  }

  .results-count {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: white;
    font-weight: 600;
    font-size: 16px;
  }

  .results-count ion-icon {
    font-size: 20px;
  }

  .no-results-message {
    display: none;
    justify-content: center;
    align-items: center;
    padding: 60px 20px;
    text-align: center;
  }

  .no-results-content {
    max-width: 400px;
  }

  .no-results-content ion-icon {
    font-size: 80px;
    color: #dee2e6;
    margin-bottom: 20px;
  }

  .no-results-content h3 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }

  .no-results-content p {
    color: #666;
    margin-bottom: 20px;
  }

  .btn-reset-filters {
    padding: 12px 24px;
    background: #ff6600;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-reset-filters:hover {
    background: #ff5200;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 102, 0, 0.3);
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .filters-content {
      grid-template-columns: 1fr;
    }

    .filters-header {
      flex-direction: column;
      gap: 15px;
      align-items: stretch;
    }

    .filters-reset-btn {
      justify-content: center;
    }
  }
`;
document.head.appendChild(filterStyles);

// Initialiser les filtres quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  // Vérifier si on est sur une page de produits
  const productGrid = document.querySelector('.product-grid');
  if (productGrid && productGrid.querySelectorAll('.showcase').length > 0) {
    window.productFilters = new ProductFilters();
  }
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProductFilters;
}
