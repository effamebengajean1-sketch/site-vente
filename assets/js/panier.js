// Panier Marketplace - gestion complète
class Panier {
  constructor() {
    this.items = this.loadPanier();
    this.initEventListeners();
  }

  addItem(product) {
    const found = this.items.find(item => item.id === product.id);
    if (found) {
      found.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.savePanier();
    this.updateCartCount();
    this.showNotification(`${product.title} ajouté au panier!`);
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.savePanier();
    this.updateCartCount();
    this.updatePanierPage();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, parseInt(quantity));
      this.savePanier();
      this.updatePanierPage();
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  savePanier() {
    localStorage.setItem('panier', JSON.stringify(this.items));
  }

  loadPanier() {
    const data = localStorage.getItem('panier');
    return data ? JSON.parse(data) : [];
  }

  clearPanier() {
    this.items = [];
    this.savePanier();
    this.updateCartCount();
    this.updatePanierPage();
  }

  updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = this.getItemCount();
    cartCountElements.forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-block' : 'none';
    });
  }

  showNotification(message) {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff6600;
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  updatePanierPage() {
    // Mise à jour de la page panier.html
    const cartList = document.getElementById('cart-list');
    const totalPrice = document.getElementById('total-price');
    const emptyMessage = document.getElementById('empty-cart-message');
    const cartTotal = document.getElementById('cart-total');
    const paymentInfo = document.getElementById('payment-info');

    if (!cartList) return;

    cartList.innerHTML = '';

    if (this.items.length === 0) {
      if (emptyMessage) emptyMessage.style.display = 'block';
      if (cartTotal) cartTotal.style.display = 'none';
      if (paymentInfo) paymentInfo.style.display = 'none';
      return;
    }

    if (emptyMessage) emptyMessage.style.display = 'none';
    if (cartTotal) cartTotal.style.display = 'block';
    if (paymentInfo) paymentInfo.style.display = 'block';

    this.items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="cart-item-content">
          <img src="${item.image}" alt="${item.title}" class="cart-item-image">
          <div class="cart-item-details">
            <h3 class="cart-item-title">${item.title}</h3>
            <p class="cart-item-price">${item.price.toLocaleString()} XAF</p>
            <div class="cart-item-quantity">
              <label>Quantité:</label>
              <input type="number" min="1" value="${item.quantity}" 
                     onchange="window.panier.updateQuantity('${item.id}', this.value)"
                     class="quantity-input">
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

    if (totalPrice) {
      totalPrice.textContent = this.getTotal().toLocaleString();
    }
  }

  initEventListeners() {
    // Initialiser les événements après le chargement du DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
    } else {
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    // Mise à jour du compteur de panier
    this.updateCartCount();

    // Si on est sur la page panier.html
    if (window.location.pathname.endsWith('panier.html')) {
      this.updatePanierPage();

      // Gestion du formulaire de paiement
      const paymentForm = document.getElementById('payment-form');
      if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.processOrder();
        });
      }

      // Bouton vider le panier
      const clearBtn = document.getElementById('clear-cart-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
            this.clearPanier();
          }
        });
      }

      // Bouton continuer les achats
      const continueBtn = document.getElementById('continue-shopping-btn');
      if (continueBtn) {
        continueBtn.addEventListener('click', () => {
          window.location.href = 'index.html';
        });
      }
    }
  }

  processOrder() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      customer: { name, email, phone, address },
      items: this.items,
      total: this.getTotal()
    };

    // Sauvegarder la commande
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Vider le panier
    this.clearPanier();

    // Afficher message de confirmation
    alert(`Commande validée avec succès!\n\nNuméro de commande: ${order.id}\nTotal: ${order.total.toLocaleString()} XAF\n\nVous recevrez un email de confirmation à ${email}`);
    
    // Rediriger vers la page d'accueil
    window.location.href = 'index.html';
  }
}

// Ajouter les animations CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Singleton panier global
window.panier = new Panier();

// Fonction utilitaire pour ajouter au panier depuis un bouton
window.ajouterAuPanier = function(product) {
  window.panier.addItem(product);
};
