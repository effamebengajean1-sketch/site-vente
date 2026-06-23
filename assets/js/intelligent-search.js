/**
 * Intelligent Search System - Recherche avec suggestions temps réel
 * Améliore l'expérience de recherche avec autocomplétion et suggestions intelligentes
 */

class IntelligentSearch {
  constructor() {
    this.searchInput = null;
    this.suggestionsContainer = null;
    this.searchData = [];
    this.currentSuggestions = [];
    this.selectedIndex = -1;
    this.searchTimeout = null;
    this.isVisible = false;
    
    this.init();
  }
  
  init() {
    this.setupSearchElements();
    this.loadSearchData();
    this.createSuggestionStyles();
    this.bindEvents();
    console.log('Intelligent Search System Initialized');
  }
  
  // Configurer les éléments de recherche
  setupSearchElements() {
    // Chercher le champ de recherche existant
    this.searchInput = document.querySelector('.search-box input[type="search"]') || 
                      document.querySelector('.header-search input') ||
                      document.querySelector('input[placeholder*="earch"]') ||
                      document.querySelector('#search');
    
    if (!this.searchInput) {
      // Créer un champ de recherche si il n'existe pas
      this.createSearchField();
    }
  }
  
  // Créer un champ de recherche si nécessaire
  createSearchField() {
    const header = document.querySelector('.header .container') || document.querySelector('header .container');
    if (!header) return;
    
    const searchHTML = `
      <div class="intelligent-search-container">
        <div class="search-input-wrapper">
          <input 
            type="text" 
            class="intelligent-search-input" 
            placeholder="Rechercher un produit, une marque..." 
            autocomplete="off"
          >
          <button class="search-button">
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>
        <div class="search-suggestions" id="search-suggestions"></div>
      </div>
    `;
    
    header.insertAdjacentHTML('beforeend', searchHTML);
    this.searchInput = document.querySelector('.intelligent-search-input');
  }
  
  // Charger les données de recherche
  loadSearchData() {
    if (typeof ProductDatabase !== 'undefined') {
      // Charger depuis la base de données produits
      if (ProductDatabase.highTech) {
        Object.values(ProductDatabase.highTech).forEach(product => {
          this.searchData.push({
            ...product,
            type: 'product',
            searchTerms: this.generateSearchTerms(product)
          });
        });
      }
      
      if (ProductDatabase.fashion) {
        Object.values(ProductDatabase.fashion).forEach(product => {
          this.searchData.push({
            ...product,
            type: 'product',
            searchTerms: this.generateSearchTerms(product)
          });
        });
      }
    }
    
    // Ajouter des termes de recherche populaires
    this.searchData.push(
      { title: 'iPhone', type: 'category', url: 'laptops.html?brand=apple', searchTerms: ['smartphone', 'apple', 'téléphone'] },
      { title: 'Samsung', type: 'brand', url: 'laptops.html?brand=samsung', searchTerms: ['galaxy', 'smartphone', 'téléphone'] },
      { title: 'Laptop Gaming', type: 'category', url: 'laptops.html?filter=gaming', searchTerms: ['pc portable', 'gaming', 'ordinateur'] },
      { title: 'Casque Audio', type: 'category', url: 'audio-hifi.html?type=headphones', searchTerms: ['écouteurs', 'son', 'audio'] },
      { title: 'Canapé', type: 'category', url: 'salon.html?category=canapes', searchTerms: ['mobilier', 'salon', 'meuble'] }
    );
  }
  
  // Générer des termes de recherche
  generateSearchTerms(product) {
    const terms = [];
    terms.push(product.title.toLowerCase());
    terms.push(product.name?.toLowerCase() || '');
    terms.push(product.category?.toLowerCase() || '');
    
    if (product.features) {
      product.features.forEach(feature => terms.push(feature.toLowerCase()));
    }
    
    return [...new Set(terms.filter(term => term.length > 0))];
  }
  
  // Créer les styles CSS pour les suggestions
  createSuggestionStyles() {
    const styles = `
      <style id="intelligent-search-styles">
        .intelligent-search-container {
          position: relative;
          max-width: 500px;
          width: 100%;
        }
        
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .intelligent-search-input {
          width: 100%;
          padding: 12px 50px 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 25px;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
          background: white;
        }
        
        .intelligent-search-input:focus {
          border-color: #ff6600;
          box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
        }
        
        .search-button {
          position: absolute;
          right: 8px;
          background: #ff6600;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }
        
        .search-button:hover {
          background: #ff5200;
        }
        
        .search-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          max-height: 400px;
          overflow-y: auto;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          margin-top: 5px;
        }
        
        .search-suggestions.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .suggestion-group {
          border-bottom: 1px solid #f0f0f0;
        }
        
        .suggestion-group:last-child {
          border-bottom: none;
        }
        
        .suggestion-header {
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          color: #666;
          background: #f8f9fa;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .suggestion-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.3s ease;
          text-decoration: none;
          color: #333;
        }
        
        .suggestion-item:hover,
        .suggestion-item.selected {
          background: #f8f9fa;
        }
        
        .suggestion-item .suggestion-icon {
          font-size: 20px;
          margin-right: 12px;
          width: 24px;
          text-align: center;
        }
        
        .suggestion-item .suggestion-content {
          flex: 1;
        }
        
        .suggestion-item .suggestion-title {
          font-weight: 500;
          margin-bottom: 2px;
        }
        
        .suggestion-item .suggestion-subtitle {
          font-size: 12px;
          color: #666;
        }
        
        .suggestion-item .suggestion-price {
          font-weight: 600;
          color: #ff6600;
          font-size: 14px;
        }
        
        .popular-searches {
          padding: 16px;
        }
        
        .popular-title {
          font-size: 14px;
          font-weight: 600;
          color: #666;
          margin-bottom: 12px;
        }
        
        .popular-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .popular-tag {
          background: #f0f0f0;
          color: #666;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }
        
        .popular-tag:hover {
          background: #ff6600;
          color: white;
        }
        
        .no-results {
          padding: 20px;
          text-align: center;
          color: #666;
        }
        
        .no-results .suggestion-icon {
          font-size: 32px;
          margin-bottom: 8px;
          opacity: 0.5;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .intelligent-search-container {
            max-width: 100%;
          }
          
          .intelligent-search-input {
            font-size: 16px; /* Évite le zoom sur iOS */
          }
          
          .search-suggestions {
            position: fixed;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            max-height: 60vh;
            border-radius: 20px 20px 0 0;
            margin-top: 0;
          }
        }
        
        /* Animations */
        .suggestion-item {
          animation: slideInLeft 0.2s ease-out;
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Loading state */
        .search-loading {
          padding: 16px;
          text-align: center;
          color: #666;
        }
        
        .search-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #ff6600;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    
    if (!document.getElementById('intelligent-search-styles')) {
      document.head.insertAdjacentHTML('beforeend', styles);
    }
  }
  
  // Lier les événements
  bindEvents() {
    if (!this.searchInput) return;
    
    // Focus sur le champ de recherche
    this.searchInput.addEventListener('focus', () => {
      this.showSuggestions();
    });
    
    // Saisie dans le champ de recherche
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearchInput(e.target.value);
    });
    
    // Navigation au clavier
    this.searchInput.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });
    
    // Clic sur les suggestions
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.intelligent-search-container')) {
        this.hideSuggestions();
      }
    });
    
    // Soumission du formulaire de recherche
    const searchForm = this.searchInput.closest('form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.performSearch(this.searchInput.value);
      });
    }
  }
  
  // Gérer la saisie de recherche
  handleSearchInput(query) {
    clearTimeout(this.searchTimeout);
    
    if (query.length < 2) {
      this.showPopularSearches();
      return;
    }
    
    // Délai pour éviter trop de requêtes
    this.searchTimeout = setTimeout(() => {
      this.searchSuggestions(query);
    }, 300);
  }
  
  // Rechercher des suggestions
  searchSuggestions(query) {
    const normalizedQuery = query.toLowerCase().trim();
    const suggestions = [];
    
    // Rechercher dans les produits
    const productMatches = this.searchData
      .filter(item => item.type === 'product')
      .filter(product => {
        return product.searchTerms.some(term => 
          term.includes(normalizedQuery)
        );
      })
      .slice(0, 5);
    
    // Rechercher dans les catégories et marques
    const categoryMatches = this.searchData
      .filter(item => item.type !== 'product')
      .filter(item => {
        return item.searchTerms.some(term => 
          term.includes(normalizedQuery)
        );
      })
      .slice(0, 3);
    
    // Regrouper les suggestions
    if (productMatches.length > 0) {
      suggestions.push({
        type: 'products',
        title: 'Produits',
        items: productMatches.map(product => this.createProductSuggestion(product))
      });
    }
    
    if (categoryMatches.length > 0) {
      suggestions.push({
        type: 'categories',
        title: 'Catégories & Marques',
        items: categoryMatches.map(item => this.createCategorySuggestion(item))
      });
    }
    
    this.currentSuggestions = suggestions;
    this.renderSuggestions();
  }
  
  // Créer une suggestion de produit
  createProductSuggestion(product) {
    return {
      type: 'product',
      title: product.title,
      subtitle: `${product.category} • ${product.brand || ''}`,
      price: product.price,
      image: product.image,
      url: `produit-detail.html?id=${product.id}`,
      icon: '🛍️'
    };
  }
  
  // Créer une suggestion de catégorie
  createCategorySuggestion(item) {
    const icons = {
      'category': '📱',
      'brand': '🏷️'
    };
    
    return {
      type: item.type,
      title: item.title,
      subtitle: `Parcourir la catégorie`,
      url: item.url,
      icon: icons[item.type] || '🔍'
    };
  }
  
  // Afficher les recherches populaires
  showPopularSearches() {
    const popular = [
      'iPhone 12',
      'Laptop Gaming',
      'Casque Audio',
      'Samsung Galaxy',
      'TV Samsung',
      'Canapé',
      'Appareil photo'
    ];
    
    const suggestion = {
      type: 'popular',
      title: 'Recherches populaires',
      items: popular.map(term => ({
        type: 'search',
        title: term,
        subtitle: `Rechercher "${term}"`,
        url: `?search=${encodeURIComponent(term)}`,
        icon: '🔥'
      }))
    };
    
    this.currentSuggestions = [suggestion];
    this.renderSuggestions();
  }
  
  // Rendu des suggestions
  renderSuggestions() {
    const container = document.getElementById('search-suggestions');
    if (!container) return;
    
    if (this.currentSuggestions.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <div class="suggestion-icon">🔍</div>
          <p>Aucun résultat trouvé</p>
          <small>Essayez avec d'autres mots-clés</small>
        </div>
      `;
    } else {
      container.innerHTML = this.currentSuggestions.map(group => 
        this.renderSuggestionGroup(group)
      ).join('');
    }
    
    // Lier les événements sur les suggestions
    this.bindSuggestionEvents();
    this.showSuggestions();
  }
  
  // Rendu d'un groupe de suggestions
  renderSuggestionGroup(group) {
    const itemsHTML = group.items.map((item, index) => `
      <div class="suggestion-item" data-index="${index}" data-url="${item.url}">
        <div class="suggestion-icon">${item.icon}</div>
        <div class="suggestion-content">
          <div class="suggestion-title">${this.highlightQuery(item.title)}</div>
          <div class="suggestion-subtitle">${item.subtitle}</div>
        </div>
        ${item.price ? `<div class="suggestion-price">${this.formatPrice(item.price)}</div>` : ''}
      </div>
    `).join('');
    
    return `
      <div class="suggestion-group">
        <div class="suggestion-header">${group.title}</div>
        ${itemsHTML}
      </div>
    `;
  }
  
  // Mettre en évidence le terme de recherche
  highlightQuery(text) {
    const query = this.searchInput.value.toLowerCase().trim();
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  }
  
  // Formater le prix
  formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price);
  }
  
  // Lier les événements sur les suggestions
  bindSuggestionEvents() {
    document.querySelectorAll('.suggestion-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        const url = item.dataset.url;
        this.selectSuggestion(url);
      });
      
      item.addEventListener('mouseenter', () => {
        this.selectedIndex = index;
        this.updateSelection();
      });
    });
  }
  
  // Gérer la navigation au clavier
  handleKeyboardNavigation(e) {
    const items = document.querySelectorAll('.suggestion-item');
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
        this.updateSelection();
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        this.updateSelection();
        break;
        
      case 'Enter':
        e.preventDefault();
        if (this.selectedIndex >= 0 && items[this.selectedIndex]) {
          const url = items[this.selectedIndex].dataset.url;
          this.selectSuggestion(url);
        } else {
          this.performSearch(this.searchInput.value);
        }
        break;
        
      case 'Escape':
        this.hideSuggestions();
        break;
    }
  }
  
  // Mettre à jour la sélection visuelle
  updateSelection() {
    document.querySelectorAll('.suggestion-item').forEach((item, index) => {
      item.classList.toggle('selected', index === this.selectedIndex);
    });
  }
  
  // Sélectionner une suggestion
  selectSuggestion(url) {
    if (url.startsWith('?')) {
      // Redirection vers la page de résultats
      window.location.href = url;
    } else {
      // Navigation directe
      window.location.href = url;
    }
  }
  
  // Effectuer une recherche
  performSearch(query) {
    const searchTerm = query.trim();
    if (!searchTerm) return;
    
    // Rediriger vers une page de résultats ou utiliser la recherche existante
    if (window.location.pathname.includes('laptops.html') || 
        window.location.pathname.includes('audio-hifi.html')) {
      // Utiliser les filtres avancés
      if (window.advancedFilters) {
        const searchInput = document.querySelector('#search-input') || 
                           document.querySelector('.search-input');
        if (searchInput) {
          searchInput.value = searchTerm;
          window.advancedFilters.searchProducts(searchTerm);
        }
      }
    }
    
    // Fallback: redirection vers la page d'accueil avec paramètre de recherche
    window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
  }
  
  // Afficher les suggestions
  showSuggestions() {
    const container = document.getElementById('search-suggestions');
    if (container && this.currentSuggestions.length > 0) {
      container.classList.add('show');
      this.isVisible = true;
    }
  }
  
  // Masquer les suggestions
  hideSuggestions() {
    const container = document.getElementById('search-suggestions');
    if (container) {
      container.classList.remove('show');
      this.isVisible = false;
    }
    this.selectedIndex = -1;
  }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
  // Attendre un peu pour que les autres systèmes se chargent
  setTimeout(() => {
    const intelligentSearch = new IntelligentSearch();
    window.intelligentSearch = intelligentSearch;
  }, 500);
});

// Intégration avec le système de recherche existant
if (window.ComprehensiveSearch) {
  const originalSearch = ComprehensiveSearch.prototype.search;
  ComprehensiveSearch.prototype.search = function(query) {
    // Utiliser la recherche intelligente d'abord
    if (window.intelligentSearch) {
      window.intelligentSearch.handleSearchInput(query);
    }
    // Puis utiliser la recherche originale
    return originalSearch.call(this, query);
  };
}