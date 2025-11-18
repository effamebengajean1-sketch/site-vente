/*==================================*\
    SCRIPT DE RECHERCHE GLOBAL
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

  // Charger la base de données des produits
  loadProducts() {
    // Produits ajoutés depuis les fichiers JSON existants
    this.products = [
      // Objets connectés
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

      // Laptops
      {
        id: 6,
        name: "Acer Predator Helios 300",
        category: "Gaming",
        price: "1,632,000 XAF",
        originalPrice: "1,960,000 XAF",
        page: "laptops.html",
        image: "Projet 1 - MarketPlace/produits/laptop_gaming_acerhelios300_1.jpg",
        keywords: ["laptop", "acer", "predator", "helios", "gaming", "gamer"]
      },
      {
        id: 7,
        name: "HP Pavilion 15",
        category: "Bureautique",
        price: "785,000 XAF",
        originalPrice: "982,000 XAF",
        page: "laptops.html",
        image: "Projet 1 - MarketPlace/produits/laptop_win_hp_1.jpg",
        keywords: ["laptop", "hp", "pavilion", "bureautique", "bureau"]
      },
      {
        id: 8,
        name: "Dell Inspiron 15 3000",
        category: "Bureautique",
        price: "654,000 XAF",
        originalPrice: "818,000 XAF",
        page: "laptops.html",
        image: "Projet 1 - MarketPlace/produits/laptop_win_dellinspiron_1.jpg",
        keywords: ["laptop", "dell", "inspiron", "bureautique"]
      },
      {
        id: 9,
        name: "Chromebook 14",
        category: "Chromebook",
        price: "458,000 XAF",
        originalPrice: "572,000 XAF",
        page: "laptops.html",
        image: "Projet 1 - MarketPlace/produits/laptop_win_chrom_1.jpg",
        keywords: ["chromebook", "google", "chrome", "14"]
      },
      {
        id: 10,
        name: "HP Pavilion Gaming 15",
        category: "Gaming",
        price: "1,144,000 XAF",
        originalPrice: "1,310,000 XAF",
        page: "laptops.html",
        image: "Projet 1 - MarketPlace/produits/laptop_gaming_hp15dk1003sf_1.jpg",
        keywords: ["laptop", "hp", "pavilion", "gaming", "gamer"]
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