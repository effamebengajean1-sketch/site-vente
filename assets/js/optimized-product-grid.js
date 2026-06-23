/**
 * Optimized Product Grid - Grille de produits légère et performante
 * Optimise l'affichage des produits pour une meilleure UX
 */

class OptimizedProductGrid {
  constructor() {
    this.observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };
    
    this.imageObserver = null;
    this.lazyLoadThreshold = 3;
    this.visibleProducts = [];
    this.loadedImages = new Set();
    
    this.init();
  }
  
  init() {
    this.createOptimizationStyles();
    this.setupIntersectionObserver();
    this.optimizeExistingGrids();
    this.bindEvents();
    console.log('Optimized Product Grid Initialized');
  }
  
  // Créer les styles d'optimisation
  createOptimizationStyles() {
    const styles = `
      <style id="optimized-product-grid-styles">
        /* Grille de produits optimisée */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          padding: 20px 0;
          margin: 0 auto;
          max-width: 1200px;
        }
        
        .product-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .product-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Image optimisée */
        .product-image-container {
          position: relative;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          background: #f8f9fa;
        }
        
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          opacity: 0;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        .product-image.loaded {
          opacity: 1;
          animation: none;
          background: none;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        
        /* Badges optimisés */
        .product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #ff6600;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          z-index: 2;
          opacity: 0;
          animation: slideInLeft 0.3s ease-out 0.2s forwards;
        }
        
        .discount-badge {
          background: #dc3545;
        }
        
        .new-badge {
          background: #28a745;
        }
        
        .popular-badge {
          background: #ffc107;
          color: #333;
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
        
        /* Contenu optimisé */
        .product-content {
          padding: 16px;
        }
        
        .product-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 2.8em;
        }
        
        .product-category {
          font-size: 13px;
          color: #666;
          margin: 0 0 12px 0;
        }
        
        .product-price {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .current-price {
          font-size: 18px;
          font-weight: 700;
          color: #ff6600;
        }
        
        .original-price {
          font-size: 14px;
          color: #999;
          text-decoration: line-through;
        }
        
        .discount-text {
          font-size: 12px;
          color: #dc3545;
          font-weight: 600;
          background: rgba(220, 53, 69, 0.1);
          padding: 2px 6px;
          border-radius: 10px;
        }
        
        /* Rating optimisé */
        .product-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          font-size: 14px;
        }
        
        .rating-stars {
          color: #ffc107;
          font-size: 14px;
        }
        
        .rating-count {
          color: #666;
          font-size: 12px;
        }
        
        /* Bouton d'action optimisé */
        .product-actions {
          display: flex;
          gap: 8px;
        }
        
        .btn-add-cart {
          flex: 1;
          background: #ff6600;
          color: white;
          border: none;
          padding: 12px 16px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .btn-add-cart:hover {
          background: #ff5200;
          transform: translateY(-2px);
        }
        
        .btn-add-cart:active {
          transform: translateY(0);
        }
        
        .btn-wishlist {
          width: 44px;
          height: 44px;
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-wishlist:hover {
          background: #ff6600;
          color: white;
          border-color: #ff6600;
        }
        
        .btn-wishlist.active {
          background: #ff6600;
          color: white;
          border-color: #ff6600;
        }
        
        /* États de chargement */
        .product-card.loading {
          pointer-events: none;
        }
        
        .product-card.loading .product-image {
          animation: shimmer 1.5s infinite;
        }
        
        /* No results */
        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }
        
        .no-results h3 {
          margin: 0 0 16px 0;
          font-size: 24px;
          color: #333;
        }
        
        .no-results p {
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
        }
        
        /* Animation de chargement progressive */
        .product-card:nth-child(1) { animation-delay: 0.1s; }
        .product-card:nth-child(2) { animation-delay: 0.2s; }
        .product-card:nth-child(3) { animation-delay: 0.3s; }
        .product-card:nth-child(4) { animation-delay: 0.4s; }
        .product-card:nth-child(5) { animation-delay: 0.5s; }
        .product-card:nth-child(n+6) { animation-delay: 0.6s; }
        
        /* Responsive optimisé */
        @media (max-width: 1200px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 18px;
          }
        }
        
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 16px;
            padding: 16px 0;
          }
          
          .product-content {
            padding: 14px;
          }
          
          .product-title {
            font-size: 15px;
          }
          
          .current-price {
            font-size: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 12px;
          }
          
          .product-content {
            padding: 12px;
          }
          
          .product-actions {
            flex-direction: column;
          }
          
          .btn-add-cart {
            width: 100%;
            margin-bottom: 8px;
          }
          
          .btn-wishlist {
            width: 100%;
            height: 40px;
          }
        }
        
        /* Lazy loading indicator */
        .lazy-loading {
          position: relative;
        }
        
        .lazy-loading::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #ff6600;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        /* Hover effects améliorés */
        .product-card {
          will-change: transform, box-shadow;
        }
        
        .product-image {
          will-change: transform;
        }
        
        /* Performance optimizations */
        .product-card {
          contain: layout style paint;
        }
        
        .product-image {
          contain: layout style paint;
        }
      </style>
    `;
    
    if (!document.getElementById('optimized-product-grid-styles')) {
      document.head.insertAdjacentHTML('beforeend', styles);
    }
  }
  
  // Configurer l'Intersection Observer pour le lazy loading
  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            this.imageObserver.unobserve(img);
          }
        });
      }, this.observerOptions);
    }
  }
  
  // Optimiser les grilles existantes
  optimizeExistingGrids() {
    const grids = document.querySelectorAll('.product-grid, #product-grid');
    grids.forEach(grid => {
      this.optimizeGrid(grid);
    });
  }
  
  // Optimiser une grille spécifique
  optimizeGrid(grid) {
    const cards = grid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
      this.optimizeProductCard(card, index);
    });
  }
  
  // Optimiser une carte produit
  optimizeProductCard(card, index) {
    // Ajouter la classe d'animation
    card.classList.add('product-card');
    
    // Observer les images pour le lazy loading
    const image = card.querySelector('.product-image, img');
    if (image && this.imageObserver) {
      image.classList.add('lazy-image');
      this.imageObserver.observe(image);
    } else if (image) {
      this.loadImage(image);
    }
    
    // Optimiser le contenu
    this.optimizeCardContent(card);
    
    // Ajouter les interactions
    this.addCardInteractions(card);
  }
  
  // Optimiser le contenu d'une carte
  optimizeCardContent(card) {
    // S'assurer que la structure est correcte
    if (!card.querySelector('.product-content')) {
      const content = document.createElement('div');
      content.className = 'product-content';
      
      // Déplacer le contenu existant
      const existingContent = Array.from(card.children).filter(child => 
        !child.classList.contains('product-image-container') && 
        !child.classList.contains('product-image') &&
        child.tagName !== 'IMG'
      );
      
      existingContent.forEach(child => content.appendChild(child));
      card.appendChild(content);
    }
    
    // Ajouter la classe visible avec délai
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 100);
  }
  
  // Charger une image avec optimisations
  loadImage(img) {
    if (this.loadedImages.has(img.src)) {
      img.classList.add('loaded');
      return;
    }
    
    img.addEventListener('load', () => {
      img.classList.add('loaded');
      this.loadedImages.add(img.src);
    }, { once: true });
    
    img.addEventListener('error', () => {
      img.classList.add('loaded');
      img.src = this.getPlaceholderImage();
    }, { once: true });
    
    // Charger l'image si ce n'est pas déjà fait
    if (img.dataset.src) {
      img.src = img.dataset.src;
      delete img.dataset.src;
    }
  }
  
  // Obtenir une image placeholder
  getPlaceholderImage() {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xMDAgMTAwQzEwMCA4Mi43ODYgMTE2LjcxNCA2NiAxMzQgNjZDMTUxLjI4NiA2NiAxNjggODIuNzg2IDE2OCAxMDBDMTY4IDExNy4yMTQgMTUxLjI4NiAxMzQgMTM0IDEzNEMxMTYuNzE0IDEzNCAxMDAgMTE3LjIxNCAxMDAgMTAwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
  }
  
  // Ajouter les interactions à une carte
  addCardInteractions(card) {
    // Ajout au panier
    const addToCartBtn = card.querySelector('.btn-add-cart, [onclick*="addToCart"]');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleAddToCart(card);
      });
    }
    
    // Favoris
    const wishlistBtn = card.querySelector('.btn-wishlist, .wishlist-btn');
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleWishlistToggle(card, wishlistBtn);
      });
    }
    
    // Navigation vers la page détail
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.product-actions') && 
          !e.target.closest('.btn-wishlist') &&
          !e.target.closest('.btn-add-cart')) {
        this.handleProductClick(card);
      }
    });
    
    // Effets hover
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  }
  
  // Gérer l'ajout au panier
  handleAddToCart(card) {
    const productId = card.dataset.productId || this.extractProductId(card);
    const product = this.extractProductData(card);
    
    if (product && window.enhancedCart) {
      window.enhancedCart.addItem(product, 1);
    } else if (window.panier) {
      window.panier.addItem(product);
    }
  }
  
  // Gérer l'ajout aux favoris
  handleWishlistToggle(card, button) {
    const productId = card.dataset.productId || this.extractProductId(card);
    button.classList.toggle('active');
    
    // Animation
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 150);
  }
  
  // Gérer le clic sur le produit
  handleProductClick(card) {
    const productId = card.dataset.productId || this.extractProductId(card);
    if (productId) {
      window.location.href = `produit-detail.html?id=${productId}`;
    }
  }
  
  // Extraire les données du produit depuis la carte
  extractProductData(card) {
    const title = card.querySelector('.product-title')?.textContent?.trim();
    const priceText = card.querySelector('.current-price')?.textContent?.trim();
    const image = card.querySelector('.product-image')?.src;
    const category = card.querySelector('.product-category')?.textContent?.trim();
    
    if (!title || !priceText) return null;
    
    // Parser le prix
    const price = this.parsePrice(priceText);
    
    return {
      id: card.dataset.productId || this.extractProductId(card),
      title: title,
      price: price,
      image: image,
      category: category || 'Produit'
    };
  }
  
  // Parser le prix depuis le texte
  parsePrice(priceText) {
    const match = priceText.match(/[\d\s]+/);
    return match ? parseInt(match[0].replace(/\s/g, '')) : 0;
  }
  
  // Extraire l'ID du produit
  extractProductId(card) {
    // Chercher dans divers attributs possibles
    const possibleIds = [
      card.dataset.productId,
      card.dataset.id,
      card.id,
      card.querySelector('[data-product-id]')?.dataset.productId
    ];
    
    return possibleIds.find(id => id) || 'product-' + Date.now();
  }
  
  // Lier les événements généraux
  bindEvents() {
    // Observer les nouvelles grilles ajoutées dynamiquement
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.classList.contains('product-grid') || 
                  node.querySelector('.product-grid')) {
                setTimeout(() => this.optimizeExistingGrids(), 100);
              }
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Créer une nouvelle carte produit optimisée
  createOptimizedCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    card.innerHTML = `
      <div class="product-image-container">
        ${product.discount ? `<span class="product-badge discount-badge">-${product.discount}%</span>` : ''}
        ${product.isNew ? `<span class="product-badge new-badge">Nouveau</span>` : ''}
        ${product.isPopular ? `<span class="product-badge popular-badge">Populaire</span>` : ''}
        <img 
          class="product-image lazy-image" 
          data-src="${product.image}" 
          alt="${product.title}"
          loading="lazy"
        >
      </div>
      <div class="product-content">
        <h3 class="product-title">${product.title}</h3>
        ${product.category ? `<p class="product-category">${product.category}</p>` : ''}
        
        <div class="product-rating">
          ${this.generateRatingStars(product.rating || 0)}
          ${product.reviewCount ? `<span class="rating-count">(${product.reviewCount})</span>` : ''}
        </div>
        
        <div class="product-price">
          <span class="current-price">${this.formatPrice(product.price)}</span>
          ${product.originalPrice ? `
            <span class="original-price">${this.formatPrice(product.originalPrice)}</span>
            <span class="discount-text">-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
          ` : ''}
        </div>
        
        <div class="product-actions">
          <button class="btn-add-cart" onclick="optimizedGrid.handleAddToCart(this.closest('.product-card'))">
            <ion-icon name="cart-outline"></ion-icon>
            Ajouter au panier
          </button>
          <button class="btn-wishlist" onclick="optimizedGrid.handleWishlistToggle(this.closest('.product-card'), this)">
            <ion-icon name="heart-outline"></ion-icon>
          </button>
        </div>
      </div>
    `;
    
    return card;
  }
  
  // Générer les étoiles de rating
  generateRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += `<span class="rating-star ${i <= rating ? 'filled' : ''}">★</span>`;
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
}

// Initialisation automatique
let optimizedGrid;

document.addEventListener('DOMContentLoaded', function() {
  optimizedGrid = new OptimizedProductGrid();
  window.optimizedGrid = optimizedGrid;
});