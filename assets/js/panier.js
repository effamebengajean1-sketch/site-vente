// Panier Marketplace - gestion complète avec localStorage
class Panier {
  constructor() {
    this.items = this.loadPanier();
    this.initEventListeners();
  }

  // Ajouter un produit au panier
  addItem(product) {
    const found = this.items.find(item => item.id === product.id);
    if (found) {
      found.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.savePanier();
    this.updateCartCount();
    this.showNotification(`${product.title} ajouté au panier!`, 'success');
  }

  // Supprimer un produit du panier avec confirmation
  removeItem(productId) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      this.showRemoveItemModal(item);
    }
  }

  // Confirmer la suppression d'un produit
  confirmRemoveItem(productId) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      this.items = this.items.filter(item => item.id !== productId);
      this.savePanier();
      this.updateCartCount();
      this.updatePanierPage();
      this.showNotification(`${item.title} retiré du panier`, 'info');
    }
  }

  // Afficher le modal de confirmation pour supprimer un produit
  showRemoveItemModal(item) {
    const modal = this.createRemoveItemModal(item);
    document.body.appendChild(modal);
    
    // Animation d'apparition
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
  }

  // Créer le modal de confirmation pour un produit
  createRemoveItemModal(item) {
    const modal = document.createElement('div');
    modal.className = 'remove-item-modal';
    modal.innerHTML = `
      <div class="remove-item-modal-content">
        <div class="remove-item-modal-header">
          <h3>
            <ion-icon name="warning-outline" style="color: #dc3545; margin-right: 8px;"></ion-icon>
            Confirmer la suppression
          </h3>
        </div>
        <div class="remove-item-modal-body">
          <p>Êtes-vous sûr de vouloir retirer <strong>"${item.title}"</strong> de votre panier ?</p>
          <div class="item-summary" style="background: #f8f9fa; padding: 10px; border-radius: 6px; margin: 15px 0;">
            <p><strong>Quantité:</strong> ${item.quantity}</p>
            <p><strong>Prix unitaire:</strong> ${item.price.toLocaleString()} XAF</p>
            <p><strong>Sous-total:</strong> ${(item.price * item.quantity).toLocaleString()} XAF</p>
          </div>
        </div>
        <div class="remove-item-modal-footer">
          <button class="btn-cancel-remove" onclick="this.closest('.remove-item-modal').remove()">
            <ion-icon name="close-outline"></ion-icon>
            Annuler
          </button>
          <button class="btn-confirm-remove" onclick="window.panier.confirmRemoveItem('${item.id}'); this.closest('.remove-item-modal').remove();">
            <ion-icon name="trash-outline"></ion-icon>
            Retirer du panier
          </button>
        </div>
      </div>
    `;

    // Fermer en cliquant à l'extérieur
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    return modal;
  }

  // Mettre à jour la quantité d'un produit
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, parseInt(quantity));
      this.savePanier();
      this.updatePanierPage();
    }
  }

  // Augmenter la quantité
  increaseQuantity(productId) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity += 1;
      this.savePanier();
      this.updatePanierPage();
    }
  }

  // Diminuer la quantité
  decreaseQuantity(productId) {
    const item = this.items.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.savePanier();
      this.updatePanierPage();
    }
  }

  // Calculer le total
  getTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Obtenir le nombre total d'articles
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  // Sauvegarder le panier dans localStorage
  savePanier() {
    localStorage.setItem('panier', JSON.stringify(this.items));
  }

  // Charger le panier depuis localStorage
  loadPanier() {
    const data = localStorage.getItem('panier');
    return data ? JSON.parse(data) : [];
  }

  // Vider le panier
  clearPanier() {
    this.showClearCartModal();
  }

  // Afficher le modal de confirmation pour vider le panier
  showClearCartModal() {
    const modal = this.createClearCartModal();
    document.body.appendChild(modal);
    
    // Animation d'apparition
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
  }

  // Créer le modal de confirmation
  createClearCartModal() {
    const modal = document.createElement('div');
    modal.className = 'clear-cart-modal';
    modal.innerHTML = `
      <div class="clear-cart-modal-content">
        <div class="clear-cart-modal-header">
          <h3>
            <ion-icon name="warning-outline" style="color: #dc3545; margin-right: 8px;"></ion-icon>
            Confirmer la suppression
          </h3>
        </div>
        <div class="clear-cart-modal-body">
          <p>Êtes-vous sûr de vouloir vider votre panier ?</p>
          <p style="color: #dc3545; font-size: 14px; margin-top: 8px;">
            Cette action est irréversible et tous les articles seront supprimés.
          </p>
        </div>
        <div class="clear-cart-modal-footer">
          <button class="btn-cancel-clear" onclick="this.closest('.clear-cart-modal').remove()">
            <ion-icon name="close-outline"></ion-icon>
            Annuler
          </button>
          <button class="btn-confirm-clear" onclick="window.panier.confirmClearCart(); this.closest('.clear-cart-modal').remove();">
            <ion-icon name="trash-outline"></ion-icon>
            Vider le panier
          </button>
        </div>
      </div>
    `;

    // Fermer en cliquant à l'extérieur
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    return modal;
  }

  // Confirmer le vidage du panier
  confirmClearCart() {
    this.items = [];
    this.savePanier();
    this.updateCartCount();
    this.updatePanierPage();
    this.showNotification('Panier vidé avec succès', 'info');
  }

  // Mettre à jour le compteur du panier
  updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = this.getItemCount();
    cartCountElements.forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-block' : 'none';
    });
  }

  // Afficher une notification
  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    
    const colors = {
      success: '#28a745',
      error: '#dc3545',
      info: '#17a2b8',
      warning: '#ffc107'
    };
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${colors[type] || colors.success};
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      animation: slideIn 0.3s ease;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
    `;
    
    notification.innerHTML = `
      <ion-icon name="${type === 'success' ? 'checkmark-circle' : type === 'error' ? 'close-circle' : 'information-circle'}" style="font-size: 24px;"></ion-icon>
      ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Mettre à jour la page panier
  updatePanierPage() {
    const cartList = document.getElementById('cart-list');
    const totalPrice = document.getElementById('total-price');
    const subtotalPrice = document.getElementById('subtotal-price');
    const itemsCount = document.getElementById('items-count');
    const emptyMessage = document.getElementById('empty-cart-message');
    const cartTotal = document.getElementById('cart-total');

    if (!cartList) return;

    cartList.innerHTML = '';

    if (this.items.length === 0) {
      if (emptyMessage) emptyMessage.style.display = 'block';
      if (cartTotal) cartTotal.style.display = 'none';
      return;
    }

    if (emptyMessage) emptyMessage.style.display = 'none';
    if (cartTotal) cartTotal.style.display = 'block';

    this.items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="cart-item-content">
          <img src="${item.image}" alt="${item.title}" class="cart-item-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPg=='">
          <div class="cart-item-details">
            <h3 class="cart-item-title">${item.title}</h3>
            <p class="cart-item-price">${item.price.toLocaleString()} XAF</p>
            <div class="cart-item-quantity">
              <label>Quantité:</label>
              <div class="quantity-controls">
                <button class="quantity-btn" onclick="window.panier.decreaseQuantity('${item.id}')">
                  <ion-icon name="remove-outline"></ion-icon>
                </button>
                <input type="number" min="1" value="${item.quantity}" 
                       onchange="window.panier.updateQuantity('${item.id}', this.value)"
                       class="quantity-input">
                <button class="quantity-btn" onclick="window.panier.increaseQuantity('${item.id}')">
                  <ion-icon name="add-outline"></ion-icon>
                </button>
              </div>
            </div>
            <p class="cart-item-subtotal">Sous-total: ${(item.price * item.quantity).toLocaleString()} XAF</p>
          </div>
          <button onclick="window.panier.removeItem('${item.id}')" class="remove-btn">
            <ion-icon name="trash-outline"></ion-icon> Supprimer
          </button>
        </div>
      `;
      cartList.appendChild(li);
    });

    const total = this.getTotal();
    const count = this.getItemCount();
    
    if (totalPrice) totalPrice.textContent = total.toLocaleString();
    if (subtotalPrice) subtotalPrice.textContent = total.toLocaleString() + ' XAF';
    if (itemsCount) itemsCount.textContent = count;
  }

  // Ouvrir le modal de paiement
  openPaymentModal() {
    if (this.items.length === 0) {
      this.showNotification('Votre panier est vide', 'warning');
      return;
    }

    const modal = document.getElementById('payment-modal');
    const modalItemsCount = document.getElementById('modal-items-count');
    const modalSubtotal = document.getElementById('modal-subtotal');
    const modalTotal = document.getElementById('modal-total');

    const total = this.getTotal();
    const count = this.getItemCount();

    if (modalItemsCount) modalItemsCount.textContent = count;
    if (modalSubtotal) modalSubtotal.textContent = total.toLocaleString() + ' XAF';
    if (modalTotal) modalTotal.textContent = total.toLocaleString() + ' XAF';

    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // Fermer le modal de paiement
  closePaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  // Traiter le paiement
  processPayment(formData) {
    // Simuler le traitement du paiement
    const orderData = {
      items: this.items,
      customer: {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address')
      },
      paymentMethod: formData.get('payment-method'),
      total: this.getTotal(),
      date: new Date().toISOString(),
      orderNumber: 'NC' + Date.now()
    };

    // Sauvegarder la commande dans localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Vider le panier
    this.items = [];
    this.savePanier();
    this.updateCartCount();
    this.updatePanierPage();

    // Fermer le modal
    this.closePaymentModal();

    // Afficher un message de succès
    this.showNotification(`Commande ${orderData.orderNumber} confirmée avec succès!`, 'success');

    // Rediriger vers la page d'accueil après 2 secondes
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  }

  // Initialiser les écouteurs d'événements
  initEventListeners() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
    } else {
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    // Mettre à jour la page panier
    this.updatePanierPage();
    this.updateCartCount();

    // Attendre un peu pour s'assurer que le DOM est complètement chargé
    setTimeout(() => {
      // Bouton vider le panier
      const clearCartBtn = document.getElementById('clear-cart-btn');
      if (clearCartBtn) {
        clearCartBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.clearPanier();
        });
      }

      // Bouton checkout
      const checkoutBtn = document.getElementById('checkout-btn');
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openPaymentModal();
        });
      }

      // Bouton fermer modal
      const closeModalBtn = document.getElementById('close-modal');
      if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => this.closePaymentModal());
      }

      // Fermer le modal en cliquant à l'extérieur
      const modal = document.getElementById('payment-modal');
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            this.closePaymentModal();
          }
        });
      }

      // Gestion des méthodes de paiement
      const paymentMethods = document.querySelectorAll('.payment-method');
      paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
          // Retirer la classe selected de tous les éléments
          paymentMethods.forEach(m => m.classList.remove('selected'));
          // Ajouter la classe selected à l'élément cliqué
          method.classList.add('selected');
          
          // Cocher le radio button
          const radio = method.querySelector('input[type="radio"]');
          if (radio) radio.checked = true;

          // Afficher les détails de paiement correspondants
          this.showPaymentDetails(radio.value);
        });
      });

      // Gestion du formulaire de paiement
      const paymentForm = document.getElementById('payment-form');
      if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const formData = new FormData(paymentForm);
          const paymentMethod = formData.get('payment-method');

          if (!paymentMethod) {
            this.showNotification('Veuillez sélectionner un mode de paiement', 'warning');
            return;
          }

          // Valider les champs spécifiques selon la méthode de paiement
          if (paymentMethod === 'orange-money') {
            const orangeNumber = document.getElementById('orange-number').value;
            if (!orangeNumber) {
              this.showNotification('Veuillez entrer votre numéro Orange Money', 'warning');
              return;
            }
          } else if (paymentMethod === 'mtn-momo') {
            const mtnNumber = document.getElementById('mtn-number').value;
            if (!mtnNumber) {
              this.showNotification('Veuillez entrer votre numéro MTN MoMo', 'warning');
              return;
            }
          } else if (paymentMethod === 'bank-card') {
            const cardNumber = document.getElementById('card-number').value;
            const cardExpiry = document.getElementById('card-expiry').value;
            const cardCvv = document.getElementById('card-cvv').value;
            
            if (!cardNumber || !cardExpiry || !cardCvv) {
              this.showNotification('Veuillez remplir toutes les informations de carte', 'warning');
              return;
            }
          }

          this.processPayment(formData);
        });
      }

      // Formatage automatique du numéro de carte
      const cardNumberInput = document.getElementById('card-number');
      if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
          let value = e.target.value.replace(/\s/g, '');
          let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
          e.target.value = formattedValue;
        });
      }

      // Formatage automatique de la date d'expiration
      const cardExpiryInput = document.getElementById('card-expiry');
      if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', (e) => {
          let value = e.target.value.replace(/\D/g, '');
          if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
          }
          e.target.value = value;
        });
      }
    }, 100);
  }

  // Afficher les détails de paiement selon la méthode sélectionnée
  showPaymentDetails(method) {
    const allDetails = document.querySelectorAll('.payment-details');
    allDetails.forEach(detail => detail.classList.remove('active'));

    const detailsMap = {
      'orange-money': 'orange-money-details',
      'mtn-momo': 'mtn-momo-details',
      'bank-card': 'bank-card-details',
      'cash-delivery': 'cash-delivery-details'
    };

    const detailsId = detailsMap[method];
    if (detailsId) {
      const details = document.getElementById(detailsId);
      if (details) details.classList.add('active');
    }
  }
}

// Ne pas initialiser le panier ici - cela sera fait dans panier.html

// Styles pour le modal de suppression d'un produit
const removeItemModalStyles = document.createElement('style');
removeItemModalStyles.textContent = `
  .remove-item-modal {
    display: none;
    position: fixed;
    z-index: 1001;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    animation: fadeIn 0.3s ease;
  }

  .remove-item-modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .remove-item-modal-content {
    background: white;
    border-radius: 12px;
    padding: 30px;
    max-width: 450px;
    width: 90%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
    border: 2px solid var(--danger-color, #dc3545);
  }

  .remove-item-modal-header h3 {
    font-size: 20px;
    color: #333;
    margin: 0;
    display: flex;
    align-items: center;
    font-weight: bold;
  }

  .remove-item-modal-body {
    margin: 20px 0;
  }

  .remove-item-modal-body p {
    font-size: 16px;
    color: #333;
    margin: 0;
    line-height: 1.5;
  }

  .remove-item-modal-footer {
    display: flex;
    gap: 15px;
    justify-content: flex-end;
    margin-top: 25px;
  }

  .btn-cancel-remove, .btn-confirm-remove {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
  }

  .btn-cancel-remove {
    background: #6c757d;
    color: white;
  }

  .btn-cancel-remove:hover {
    background: #5a6268;
    transform: translateY(-1px);
  }

  .btn-confirm-remove {
    background: #dc3545;
    color: white;
  }

  .btn-confirm-remove:hover {
    background: #c82333;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
  }

  .item-summary p {
    margin: 5px 0;
    font-size: 14px;
  }

  .item-summary strong {
    color: #333;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(removeItemModalStyles);

// Ajouter les styles d'animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Helper global pour compatibilité avec les pages qui appellent
// directement `ajouterAuPanier({...})` depuis les boutons HTML.
// Si le panier n'est pas encore instancié, on l'initialise ici.
window.ajouterAuPanier = function(product) {
  try {
    if (!window.panier) {
      window.panier = new Panier();
    }
    if (product && typeof product === 'object') {
      window.panier.addItem(product);
    } else {
      console.warn('ajouterAuPanier appelé sans produit valide:', product);
    }
  } catch (err) {
    console.error('Erreur lors de l\'appel de ajouterAuPanier:', err);
  }
};

