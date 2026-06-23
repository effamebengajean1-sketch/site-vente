/**
 * Product Detail JavaScript
 * Gestion complète des fonctionnalités de la page détail produit
 */

class ProductDetailManager {
  constructor() {
    this.currentProduct = null;
    this.productImages = [];
    this.currentImageIndex = 0;
    this.lightboxOpen = false;
    this.quantity = 1;
    
    this.init();
  }
  
  init() {
    this.loadProductFromURL();
    this.setupEventListeners();
    this.setupLightbox();
    this.setupQuantityControls();
    this.setupProductTabs();
    this.setupImageGallery();
    this.updateCartCount();
  }
  
  // Charger les données produit depuis l'URL
  loadProductFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
      this.findProductById(productId);
    } else {
      // Par défaut, charger le premier produit pour la démonstration
      this.loadDefaultProduct();
    }
  }
  
  // Chercher un produit par ID
  findProductById(id) {
    // Chercher dans la base de données produits
    if (typeof ProductDatabase !== 'undefined') {
      // High-Tech products
      if (ProductDatabase.highTech && ProductDatabase.highTech[id]) {
        this.currentProduct = ProductDatabase.highTech[id];
        this.displayProduct(this.currentProduct);
        return;
      }
      
      // Fashion products (si disponible)
      if (ProductDatabase.fashion && ProductDatabase.fashion[id]) {
        this.currentProduct = ProductDatabase.fashion[id];
        this.displayProduct(this.currentProduct);
        return;
      }
    }
    
    console.error('Produit non trouvé:', id);
    this.loadDefaultProduct();
  }
  
  // Charger un produit par défaut pour la démonstration
  loadDefaultProduct() {
    const defaultProduct = {
      id: 'ht001',
      title: 'iPhone 12 Pro Max 256GB',
      name: 'iPhone 12 Pro Max 256GB',
      price: 1048000,
      originalPrice: 1310000,
      image: 'Projet 1 - MarketPlace/produits/iphone12promax_1.jpg',
      category: 'Téléphonie',
      rating: 5,
      description: 'iPhone 12 Pro Max avec 256GB de stockage et puce A14 Bionic.',
      features: ['256GB stockage', 'Puce A14 Bionic', 'Caméra triple 12MP', '5G'],
      detailedDescription: 'L\'iPhone 12 Pro Max représente le summum de la technologie Apple avec son écran Super Retina XDR de 6,7 pouces, sa puce A14 Bionic ultra-performante et son système de caméra professionnel triple 12MP avec LiDAR.',
      stock: 25,
      seller: 'NexusStor'
    };
    
    this.currentProduct = defaultProduct;
    this.displayProduct(this.currentProduct);
  }
  
  // Afficher les informations du produit
  displayProduct(product) {
    // Breadcrumb
    document.getElementById('category-link').textContent = product.category;
    document.getElementById('product-title').textContent = product.title;
    
    // Image principale
    document.getElementById('main-product-image').src = product.image;
    document.getElementById('main-product-image').alt = product.title;
    
    // Titre du produit
    document.getElementById('product-detail-title').textContent = product.title;
    
    // Prix
    document.getElementById('current-price').textContent = this.formatPrice(product.price);
    if (product.originalPrice && product.originalPrice > product.price) {
      document.getElementById('original-price').textContent = this.formatPrice(product.originalPrice);
      const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      document.getElementById('discount').textContent = `-${discount}%`;
    }
    
    // Description
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('detailed-description').textContent = product.detailedDescription || product.description;
    
    // Caractéristiques
    this.displayFeatures(product.features);
    
    // Vendeur
    document.getElementById('seller-name').textContent = product.seller || 'NexusStor';
    
    // Stock
    document.getElementById('stock-status').textContent = product.stock > 10 ? 'En stock' : 
                                                       product.stock > 0 ? 'Stock limité' : 'Rupture de stock';
    document.getElementById('stock-status').className = `stock-status ${product.stock > 10 ? '' : 
                                                        product.stock > 0 ? 'low-stock' : 'out-of-stock'}`;
    document.getElementById('stock-quantity').textContent = 
      product.stock > 0 ? `${product.stock} articles disponibles` : 'Produit indisponible';
    
    // Galerie d'images
    this.setupImageGallery(product);
    
    // Note et avis
    this.displayRating(product.rating || 5);
    
    // Limiter la quantité max selon le stock
    document.getElementById('quantity').max = product.stock || 25;
    
    console.log('Produit affiché:', product);
  }
  
  // Afficher les caractéristiques du produit
  displayFeatures(features) {
    const featuresList = document.getElementById('product-features-list');
    featuresList.innerHTML = '';
    
    if (features && features.length > 0) {
      features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
      });
    }
  }
  
  // Afficher la note du produit
  displayRating(rating) {
    const starsContainer = document.getElementById('product-stars');
    starsContainer.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = 'star' + (i <= rating ? '' : ' empty');
      star.textContent = '★';
      starsContainer.appendChild(star);
    }
    
    document.getElementById('rating-count').textContent = `(${Math.floor(Math.random() * 50) + 5} avis)`;
  }
  
  // Configurer la galerie d'images
  setupImageGallery(product = this.currentProduct) {
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    thumbnailGallery.innerHTML = '';
    
    // Images multiples (simulation avec variations)
    this.productImages = [
      product.image,
      product.image, // Dans un vrai cas, ce seraient des images différentes
      product.image,
      product.image
    ];
    
    this.productImages.forEach((imageSrc, index) => {
      const thumbnailBtn = document.createElement('button');
      thumbnailBtn.className = 'thumbnail' + (index === 0 ? ' active' : '');
      thumbnailBtn.setAttribute('data-image', imageSrc);
      
      const img = document.createElement('img');
      img.src = imageSrc;
      img.alt = `${product.title} - Image ${index + 1}`;
      img.className = 'thumbnail-image';
      
      thumbnailBtn.appendChild(img);
      thumbnailBtn.addEventListener('click', () => this.changeMainImage(imageSrc, index));
      
      thumbnailGallery.appendChild(thumbnailBtn);
    });
  }
  
  // Changer l'image principale
  changeMainImage(imageSrc, index) {
    document.getElementById('main-product-image').src = imageSrc;
    this.currentImageIndex = index;
    
    // Mettre à jour la classe active des thumbnails
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }
  
  // Configurer les contrôles de quantité
  setupQuantityControls() {
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('quantity');
    
    decreaseBtn.addEventListener('click', () => {
      if (this.quantity > 1) {
        this.quantity--;
        quantityInput.value = this.quantity;
        this.updateAddToCartButton();
      }
    });
    
    increaseBtn.addEventListener('click', () => {
      const maxQty = parseInt(quantityInput.max) || 25;
      if (this.quantity < maxQty) {
        this.quantity++;
        quantityInput.value = this.quantity;
        this.updateAddToCartButton();
      }
    });
    
    quantityInput.addEventListener('input', (e) => {
      const value = parseInt(e.target.value) || 1;
      const maxQty = parseInt(quantityInput.max) || 25;
      this.quantity = Math.max(1, Math.min(value, maxQty));
      e.target.value = this.quantity;
      this.updateAddToCartButton();
    });
  }
  
  // Mettre à jour le bouton ajouter au panier
  updateAddToCartButton() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const stock = this.currentProduct?.stock || 25;
    
    if (this.quantity > stock) {
      addToCartBtn.disabled = true;
      addToCartBtn.innerHTML = '<ion-icon name="alert-circle-outline"></ion-icon> Stock insuffisant';
    } else {
      addToCartBtn.disabled = false;
      addToCartBtn.innerHTML = '<ion-icon name="cart-outline"></ion-icon> Ajouter au panier';
    }
  }
  
  // Configurer les onglets produit
  setupProductTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Retirer la classe active de tous les onglets
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Ajouter la classe active à l'onglet cliqué
        btn.classList.add('active');
        document.getElementById(`${targetTab}-panel`).classList.add('active');
      });
    });
  }
  
  // Configurer la lightbox
  setupLightbox() {
    const mainImage = document.getElementById('main-product-image');
    const zoomBtn = document.querySelector('.zoom-btn');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxClose = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');
    
    // Ouvrir la lightbox
    const openLightbox = (imageSrc, caption) => {
      lightboxImage.src = imageSrc;
      document.getElementById('lightbox-caption').textContent = caption;
      lightboxModal.classList.add('active');
      this.lightboxOpen = true;
      document.body.style.overflow = 'hidden';
      
      // Mettre à jour les boutons de navigation
      this.updateLightboxNavigation();
    };
    
    // Fermer la lightbox
    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      this.lightboxOpen = false;
      document.body.style.overflow = '';
    };
    
    // Événements click
    mainImage.addEventListener('click', () => {
      openLightbox(mainImage.src, this.currentProduct?.title || '');
    });
    
    zoomBtn.addEventListener('click', () => {
      openLightbox(mainImage.src, this.currentProduct?.title || '');
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
    
    // Navigation dans la lightbox
    prevBtn.addEventListener('click', () => {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
        const newImage = this.productImages[this.currentImageIndex];
        lightboxImage.src = newImage;
        mainImage.src = newImage;
        this.changeMainImage(newImage, this.currentImageIndex);
        this.updateLightboxNavigation();
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (this.currentImageIndex < this.productImages.length - 1) {
        this.currentImageIndex++;
        const newImage = this.productImages[this.currentImageIndex];
        lightboxImage.src = newImage;
        mainImage.src = newImage;
        this.changeMainImage(newImage, this.currentImageIndex);
        this.updateLightboxNavigation();
      }
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
      if (!this.lightboxOpen) return;
      
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          prevBtn.click();
          break;
        case 'ArrowRight':
          nextBtn.click();
          break;
      }
    });
  }
  
  // Mettre à jour la navigation de la lightbox
  updateLightboxNavigation() {
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');
    
    prevBtn.disabled = this.currentImageIndex === 0;
    nextBtn.disabled = this.currentImageIndex === this.productImages.length - 1;
  }
  
  // Ajouter au panier
  addToCart() {
    if (!this.currentProduct) return;
    
    const quantity = this.quantity;
    const stock = this.currentProduct.stock || 25;
    
    if (quantity > stock) {
      this.showNotification('Stock insuffisant!', 'error');
      return;
    }
    
    const productToAdd = {
      id: this.currentProduct.id,
      title: this.currentProduct.title,
      name: this.currentProduct.name,
      price: this.currentProduct.price,
      image: this.currentProduct.image,
      quantity: quantity
    };
    
    // Utiliser la classe Panier existante
    if (typeof window.panier !== 'undefined') {
      window.panier.addItem(productToAdd);
    } else {
      // Fallback si la classe Panier n'est pas disponible
      this.fallbackAddToCart(productToAdd);
    }
    
    this.showNotification(`${quantity}x ${this.currentProduct.title} ajouté au panier!`, 'success');
  }
  
  // Fallback pour ajouter au panier
  fallbackAddToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartCount();
  }
  
  // Mettre à jour le compteur du panier
  updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Mettre à jour tous les éléments avec la classe .cart-count
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = totalItems;
      el.style.display = totalItems > 0 ? 'block' : 'none';
    });
  }
  
  // Gérer les favoris
  toggleWishlist() {
    const wishlistBtn = document.getElementById('wishlist-btn');
    const productId = this.currentProduct?.id;
    
    if (!productId) return;
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
      wishlist.splice(index, 1);
      wishlistBtn.classList.remove('active');
      wishlistBtn.innerHTML = '<ion-icon name="heart-outline"></ion-icon>';
      this.showNotification('Produit retiré des favoris', 'info');
    } else {
      wishlist.push(productId);
      wishlistBtn.classList.add('active');
      wishlistBtn.innerHTML = '<ion-icon name="heart"></ion-icon>';
      this.showNotification('Produit ajouté aux favoris', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
  
  // Gérer la comparaison
  toggleCompare() {
    const compareBtn = document.getElementById('compare-btn');
    const productId = this.currentProduct?.id;
    
    if (!productId) return;
    
    let compare = JSON.parse(localStorage.getItem('compare')) || [];
    const index = compare.indexOf(productId);
    
    if (index > -1) {
      compare.splice(index, 1);
      compareBtn.classList.remove('active');
      compareBtn.innerHTML = '<ion-icon name="git-compare-outline"></ion-icon>';
      this.showNotification('Produit retiré de la comparaison', 'info');
    } else {
      compare.push(productId);
      compareBtn.classList.add('active');
      compareBtn.innerHTML = '<ion-icon name="git-compare"></ion-icon>';
      this.showNotification('Produit ajouté à la comparaison', 'success');
    }
    
    localStorage.setItem('compare', JSON.stringify(compare));
  }
  
  // Afficher les notifications
  showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <ion-icon name="${type === 'success' ? 'checkmark-circle' : 
                        type === 'error' ? 'alert-circle' : 
                        type === 'warning' ? 'warning' : 'information-circle'}"></ion-icon>
        <span>${message}</span>
      </div>
    `;
    
    // Ajouter les styles si pas déjà présents
    if (!document.querySelector('#notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'notification-styles';
      styles.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10001;
          max-width: 400px;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }
        .notification.show {
          transform: translateX(0);
        }
        .notification-success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .notification-error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        .notification-warning {
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
        }
        .notification-info {
          background: #d1ecf1;
          color: #0c5460;
          border: 1px solid #bee5eb;
        }
        .notification-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .notification-content ion-icon {
          font-size: 1.2rem;
        }
      `;
      document.head.appendChild(styles);
    }
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Afficher avec animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Retirer après 3 secondes
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
  
  // Formater le prix
  formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price);
  }
  
  // Configurer tous les event listeners
  setupEventListeners() {
    // Bouton ajouter au panier
    document.getElementById('add-to-cart-btn').addEventListener('click', () => this.addToCart());
    
    // Bouton favoris
    document.getElementById('wishlist-btn').addEventListener('click', () => this.toggleWishlist());
    
    // Bouton comparer
    document.getElementById('compare-btn').addEventListener('click', () => this.toggleCompare());
    
    // Vérifier l'état initial des favoris et de la comparaison
    this.updateActionButtonsState();
  }
  
  // Mettre à jour l'état des boutons d'action
  updateActionButtonsState() {
    const productId = this.currentProduct?.id;
    if (!productId) return;
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const compare = JSON.parse(localStorage.getItem('compare')) || [];
    
    const wishlistBtn = document.getElementById('wishlist-btn');
    const compareBtn = document.getElementById('compare-btn');
    
    // État des favoris
    if (wishlist.includes(productId)) {
      wishlistBtn.classList.add('active');
      wishlistBtn.innerHTML = '<ion-icon name="heart"></ion-icon>';
    }
    
    // État de la comparaison
    if (compare.includes(productId)) {
      compareBtn.classList.add('active');
      compareBtn.innerHTML = '<ion-icon name="git-compare"></ion-icon>';
    }
  }
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initialisation de ProductDetailManager...');
  
  // Initialiser le gestionnaire de détail produit
  const productDetail = new ProductDetailManager();
  
  // Exposer globalement pour le débogage
  window.productDetail = productDetail;
});

// Service Worker pour la mise en cache des images (optionnel)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker enregistré avec succès:', registration.scope);
      })
      .catch(function(error) {
        console.log('Échec de l\'enregistrement du ServiceWorker:', error);
      });
  });
}