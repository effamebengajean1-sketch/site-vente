/**
 * Enhanced Cart System - Panier amélioré avec notifications et gestion avancée
 * Améliore l'expérience utilisateur avec feedback visuel et gestion intuitive
 */

class EnhancedCart {
  constructor() {
    this.cartItems = [];
    this.notificationQueue = [];
    this.isProcessing = false;
    
    this.init();
  }
  
  init() {
    this.loadCartFromStorage();
    this.createNotificationSystem();
    this.enhanceCartInterface();
    this.bindEvents();
    console.log('Enhanced Cart System Initialized');
  }
  
  // Charger le panier depuis le localStorage
  loadCartFromStorage() {
    try {
      const savedCart = localStorage.getItem('nexusChop_cart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
        this.updateCartUI();
      }
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
      this.cartItems = [];
    }
  }
  
  // Sauvegarder le panier dans localStorage
  saveCartToStorage() {
    try {
      localStorage.setItem('nexusChop_cart', JSON.stringify(this.cartItems));
      localStorage.setItem('nexusChop_cart_updated', Date.now().toString());
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier:', error);
    }
  }
  
  // Créer le système de notifications
  createNotificationSystem() {
    const notificationStyles = `
      <style id="enhanced-cart-notifications">
        .cart-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          padding: 16px 20px;
          min-width: 300px;
          max-width: 400px;
          z-index: 10000;
          transform: translateX(100%);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-left: 4px solid #ff6600;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .cart-notification.show {
          transform: translateX(0);
          opacity: 1;
        }
        
        .cart-notification.success {
          border-left-color: #28a745;
        }
        
        .cart-notification.error {
          border-left-color: #dc3545;
        }
        
        .cart-notification.warning {
          border-left-color: #ffc107;
        }
        
        .notification-icon {
          font-size: 24px;
          flex-shrink: 0;
        }
        
        .notification-content {
          flex: 1;
        }
        
        .notification-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 4px;
          font-size: 14px;
        }
        
        .notification-message {
          color: #666;
          font-size: 13px;
          line-height: 1.4;
        }
        
        .notification-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }
        
        .notification-btn {
          background: #ff6600;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .notification-btn:hover {
          background: #ff5200;
        }
        
        .notification-btn.secondary {
          background: #f8f9fa;
          color: #666;
          border: 1px solid #dee2e6;
        }
        
        .notification-btn.secondary:hover {
          background: #e9ecef;
        }
        
        .notification-close {
          position: absolute;
          top: 8px;
          right: 8px;
          background: none;
          border: none;
          font-size: 18px;
          color: #666;
          cursor: pointer;
          padding: 4px;
          line-height: 1;
        }
        
        .notification-close:hover {
          color: #333;
        }
        
        /* Animation d'entrée */
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .cart-notification.entering {
          animation: slideInRight 0.4s ease-out;
        }
        
        .cart-notification.leaving {
          animation: slideOutRight 0.4s ease-in;
        }
        
        /* Badge de panier amélioré */
        .cart-count {
          background: #ff6600 !important;
          color: white !important;
          border-radius: 50% !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          height: 18px !important;
          line-height: 18px !important;
          position: absolute !important;
          right: -5px !important;
          text-align: center !important;
          top: -5px !important;
          width: 18px !important;
          animation: pulse 0.5s ease-out;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        /* Cart preview dropdown */
        .cart-preview {
          position: absolute;
          top: 100%;
          right: 0;
          width: 350px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          border: 1px solid #e0e0e0;
          z-index: 1000;
          transform: translateY(-10px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          max-height: 400px;
          overflow: hidden;
        }
        
        .cart-preview.show {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }
        
        .cart-preview-header {
          padding: 16px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .cart-preview-title {
          font-weight: 600;
          color: #333;
        }
        
        .cart-preview-count {
          color: #666;
          font-size: 14px;
        }
        
        .cart-preview-items {
          max-height: 250px;
          overflow-y: auto;
        }
        
        .cart-preview-item {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .cart-preview-item:last-child {
          border-bottom: none;
        }
        
        .cart-preview-item img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 6px;
        }
        
        .cart-preview-item-info {
          flex: 1;
        }
        
        .cart-preview-item-title {
          font-size: 13px;
          font-weight: 500;
          color: #333;
          margin-bottom: 2px;
        }
        
        .cart-preview-item-price {
          font-size: 12px;
          color: #666;
        }
        
        .cart-preview-item-qty {
          font-size: 12px;
          color: #ff6600;
          font-weight: 500;
        }
        
        .cart-preview-footer {
          padding: 16px;
          border-top: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .cart-preview-total {
          font-weight: 600;
          color: #333;
        }
        
        .cart-preview-actions {
          display: flex;
          gap: 8px;
        }
        
        .cart-preview-btn {
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .cart-preview-btn.view {
          background: #f8f9fa;
          color: #333;
          border: 1px solid #dee2e6;
        }
        
        .cart-preview-btn.checkout {
          background: #ff6600;
          color: white;
          border: 1px solid #ff6600;
        }
        
        .cart-preview-btn:hover {
          transform: translateY(-1px);
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .cart-notification {
            right: 10px;
            left: 10px;
            min-width: auto;
            max-width: none;
          }
          
          .cart-preview {
            right: -50%;
            width: 100vw;
            max-width: 350px;
          }
        }
      </style>
    `;
    
    if (!document.getElementById('enhanced-cart-notifications')) {
      document.head.insertAdjacentHTML('beforeend', notificationStyles);
    }
  }
  
  // Améliorer l'interface du panier
  enhanceCartInterface() {
    // Améliorer le badge du panier
    document.querySelectorAll('.cart-count').forEach(badge => {
      badge.style.display = 'block';
      badge.classList.add('enhanced-badge');
    });
    
    // Ajouter le dropdown de prévisualisation panier
    const cartButton = document.querySelector('.action-btn[aria-label="Panier"]') || 
                      document.querySelector('#cart-button') ||
                      document.querySelector('[href="panier.html"]').parentElement;
    
    if (cartButton) {
      this.createCartPreview(cartButton);
    }
  }
  
  // Créer la prévisualisation du panier
  createCartPreview(cartButton) {
    const previewHTML = `
      <div class="cart-preview" id="cart-preview">
        <div class="cart-preview-header">
          <div class="cart-preview-title">Panier</div>
          <div class="cart-preview-count">
            <span id="cart-preview-count">0</span> article(s)
          </div>
        </div>
        <div class="cart-preview-items" id="cart-preview-items">
          <div class="cart-empty-message">
            Votre panier est vide
          </div>
        </div>
        <div class="cart-preview-footer" id="cart-preview-footer" style="display: none;">
          <div class="cart-preview-total">
            Total: <span id="cart-preview-total">0 XAF</span>
          </div>
          <div class="cart-preview-actions">
            <button class="cart-preview-btn view" onclick="window.location.href='panier.html'">
              Voir le panier
            </button>
            <button class="cart-preview-btn checkout" onclick="enhancedCart.checkout()">
              Commander
            </button>
          </div>
        </div>
      </div>
    `;
    
    cartButton.insertAdjacentHTML('afterend', previewHTML);
    
    // Lier les événements
    cartButton.addEventListener('mouseenter', () => this.showCartPreview());
    cartButton.addEventListener('mouseleave', () => this.hideCartPreview());
    
    const preview = document.getElementById('cart-preview');
    preview.addEventListener('mouseenter', () => this.showCartPreview());
    preview.addEventListener('mouseleave', () => this.hideCartPreview());
  }
  
  // Lier les événements
  bindEvents() {
    // Synchronisation entre les onglets
    window.addEventListener('storage', (e) => {
      if (e.key === 'nexusChop_cart' || e.key === 'nexusChop_cart_updated') {
        this.loadCartFromStorage();
      }
    });
    
    // Fermer les notifications avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideAllNotifications();
      }
    });
  }
  
  // Ajouter un produit au panier
  addItem(product, quantity = 1) {
    if (this.isProcessing) return;
    
    this.isProcessing = true;
    
    try {
      const existingItem = this.cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          ...product,
          quantity: quantity,
          addedAt: Date.now()
        });
      }
      
      this.saveCartToStorage();
      this.updateCartUI();
      this.updateCartPreview();
      
      this.showNotification(
        'Produit ajouté au panier!',
        `${quantity}x ${product.title} ajouté avec succès`,
        'success',
        [
          {
            text: 'Voir le panier',
            action: () => window.location.href = 'panier.html',
            style: 'secondary'
          },
          {
            text: 'Continuer mes achats',
            action: () => this.hideAllNotifications(),
            style: 'primary'
          }
        ]
      );
      
      // Animation du badge
      this.animateCartBadge();
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      this.showNotification(
        'Erreur',
        'Impossible d\'ajouter le produit au panier',
        'error'
      );
    } finally {
      this.isProcessing = false;
    }
  }
  
  // Supprimer un article du panier
  removeItem(productId) {
    const item = this.cartItems.find(item => item.id === productId);
    if (!item) return;
    
    this.showConfirmation(
      'Supprimer du panier',
      `Êtes-vous sûr de vouloir retirer "${item.title}" de votre panier ?`,
      'warning',
      () => {
        this.cartItems = this.cartItems.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateCartUI();
        this.updateCartPreview();
        
        this.showNotification(
          'Produit retiré',
          `${item.title} a été retiré de votre panier`,
          'info'
        );
      }
    );
  }
  
  // Mettre à jour la quantité
  updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeItem(productId);
      return;
    }
    
    const item = this.cartItems.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity = newQuantity;
    this.saveCartToStorage();
    this.updateCartUI();
    this.updateCartPreview();
    
    this.showNotification(
      'Quantité mise à jour',
      `Quantité de "${item.title}" mise à jour: ${newQuantity}`,
      'success',
      [
        {
          text: 'Voir le panier',
          action: () => window.location.href = 'panier.html',
          style: 'secondary'
        }
      ]
    );
  }
  
  // Vider le panier
  clearCart() {
    this.showConfirmation(
      'Vider le panier',
      'Êtes-vous sûr de vouloir vider complètement votre panier ?',
      'warning',
      () => {
        this.cartItems = [];
        this.saveCartToStorage();
        this.updateCartUI();
        this.updateCartPreview();
        
        this.showNotification(
          'Panier vidé',
          'Votre panier a été complètement vidé',
          'info'
        );
      }
    );
  }
  
  // Afficher une notification
  showNotification(title, message, type = 'info', actions = []) {
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.innerHTML = `
      <div class="notification-icon">
        ${this.getNotificationIcon(type)}
      </div>
      <div class="notification-content">
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
        ${actions.length > 0 ? `
          <div class="notification-actions">
            ${actions.map(action => `
              <button class="notification-btn ${action.style || 'primary'}" onclick="enhancedCart.executeAction(${action.action.toString()})">
                ${action.text}
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
      <button class="notification-close" onclick="enhancedCart.hideNotification(this.closest('.cart-notification'))">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => notification.classList.add('entering', 'show'), 100);
    
    // Auto-suppression après 5 secondes
    setTimeout(() => {
      if (notification.parentNode) {
        this.hideNotification(notification);
      }
    }, 5000);
    
    return notification;
  }
  
  // Obtenir l'icône de notification
  getNotificationIcon(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type] || icons.info;
  }
  
  // Cacher une notification
  hideNotification(notification) {
    if (!notification) return;
    
    notification.classList.add('leaving');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 400);
  }
  
  // Cacher toutes les notifications
  hideAllNotifications() {
    document.querySelectorAll('.cart-notification').forEach(notification => {
      this.hideNotification(notification);
    });
  }
  
  // Afficher une confirmation
  showConfirmation(title, message, type = 'warning', onConfirm) {
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.innerHTML = `
      <div class="notification-icon">
        ${this.getNotificationIcon(type)}
      </div>
      <div class="notification-content">
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
        <div class="notification-actions">
          <button class="notification-btn secondary" onclick="enhancedCart.hideNotification(this.closest('.cart-notification'))">
            Annuler
          </button>
          <button class="notification-btn primary" onclick="enhancedCart.executeConfirm('${notification.dataset.actionId}')">
            Confirmer
          </button>
        </div>
      </div>
      <button class="notification-close" onclick="enhancedCart.hideNotification(this.closest('.cart-notification'))">&times;</button>
    `;
    
    const actionId = 'action_' + Date.now();
    notification.dataset.actionId = actionId;
    
    // Stocker l'action de confirmation
    this.confirmationActions = this.confirmationActions || {};
    this.confirmationActions[actionId] = onConfirm;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('entering', 'show'), 100);
  }
  
  // Exécuter une action
  executeAction(action) {
    try {
      action();
    } catch (error) {
      console.error('Erreur lors de l\'exécution de l\'action:', error);
    }
  }
  
  // Exécuter une confirmation
  executeConfirm(actionId) {
    const action = this.confirmationActions?.[actionId];
    if (action) {
      action();
      delete this.confirmationActions[actionId];
    }
    
    // Fermer la notification
    const notification = document.querySelector(`[data-action-id="${actionId}"]`);
    if (notification) {
      this.hideNotification(notification);
    }
  }
  
  // Mettre à jour l'interface du panier
  updateCartUI() {
    const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Mettre à jour tous les badges de panier
    document.querySelectorAll('.cart-count').forEach(badge => {
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? 'block' : 'none';
    });
    
    // Mettre à jour les compteurs de total
    document.querySelectorAll('.cart-total, #cart-total').forEach(el => {
      el.textContent = this.formatPrice(totalPrice);
    });
  }
  
  // Mettre à jour la prévisualisation du panier
  updateCartPreview() {
    const preview = document.getElementById('cart-preview');
    if (!preview) return;
    
    const countEl = document.getElementById('cart-preview-count');
    const itemsEl = document.getElementById('cart-preview-items');
    const footerEl = document.getElementById('cart-preview-footer');
    const totalEl = document.getElementById('cart-preview-total');
    
    if (this.cartItems.length === 0) {
      countEl.textContent = '0';
      itemsEl.innerHTML = '<div class="cart-empty-message">Votre panier est vide</div>';
      footerEl.style.display = 'none';
    } else {
      countEl.textContent = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      
      itemsEl.innerHTML = this.cartItems.slice(0, 3).map(item => `
        <div class="cart-preview-item">
          <img src="${item.image}" alt="${item.title}">
          <div class="cart-preview-item-info">
            <div class="cart-preview-item-title">${item.title}</div>
            <div class="cart-preview-item-price">${this.formatPrice(item.price)}</div>
            <div class="cart-preview-item-qty">Qty: ${item.quantity}</div>
          </div>
        </div>
      `).join('');
      
      if (this.cartItems.length > 3) {
        itemsEl.innerHTML += `<div class="cart-more-items">Et ${this.cartItems.length - 3} autre(s) article(s)...</div>`;
      }
      
      const total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      totalEl.textContent = this.formatPrice(total);
      footerEl.style.display = 'flex';
    }
  }
  
  // Afficher la prévisualisation du panier
  showCartPreview() {
    const preview = document.getElementById('cart-preview');
    if (preview) {
      preview.classList.add('show');
    }
  }
  
  // Masquer la prévisualisation du panier
  hideCartPreview() {
    const preview = document.getElementById('cart-preview');
    if (preview) {
      preview.classList.remove('show');
    }
  }
  
  // Animer le badge du panier
  animateCartBadge() {
    document.querySelectorAll('.cart-count').forEach(badge => {
      badge.style.animation = 'none';
      setTimeout(() => {
        badge.style.animation = 'pulse 0.5s ease-out';
      }, 10);
    });
  }
  
  // Procéder au checkout
  checkout() {
    if (this.cartItems.length === 0) {
      this.showNotification(
        'Panier vide',
        'Votre panier est vide. Ajoutez des produits avant de commander.',
        'warning'
      );
      return;
    }
    
    this.showNotification(
      'Redirection vers le checkout',
      'Vous allez être redirigé vers la page de commande.',
      'info',
      [
        {
          text: 'Continuer',
          action: () => window.location.href = 'commande.html',
          style: 'primary'
        }
      ]
    );
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
let enhancedCart;

document.addEventListener('DOMContentLoaded', function() {
  enhancedCart = new EnhancedCart();
  window.enhancedCart = enhancedCart;
  
  // Intégration avec le système de panier existant
  if (window.Panier) {
    const originalAddItem = window.Panier.prototype.addItem;
    window.Panier.prototype.addItem = function(product) {
      const result = originalAddItem.call(this, product);
      if (enhancedCart) {
        enhancedCart.addItem(product, 1);
      }
      return result;
    };
  }
});

// CSS pour les éléments additionnels
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  .cart-empty-message {
    padding: 40px 20px;
    text-align: center;
    color: #666;
    font-style: italic;
  }
  
  .cart-more-items {
    padding: 12px 16px;
    text-align: center;
    color: #999;
    font-size: 12px;
    border-top: 1px solid #f0f0f0;
  }
`;
document.head.appendChild(additionalStyles);