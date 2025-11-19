/**
 * Main Page Product Actions
 * Functions for product showcase-actions (wishlist, quick view, compare, cart)
 */

// Initialize product actions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Product Actions initialized');
});

// Product data storage for wishlist, compare, etc.
let productActionsData = {
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
    compare: JSON.parse(localStorage.getItem('compare')) || [],
    quickView: null
};

/**
 * Toggle wishlist status for a product
 * @param {string} productId - The unique product identifier
 */
function toggleWishlist(productId) {
    const index = productActionsData.wishlist.indexOf(productId);
    
    if (index > -1) {
        // Remove from wishlist
        productActionsData.wishlist.splice(index, 1);
        showNotification('Produit retiré des favoris', 'info');
    } else {
        // Add to wishlist
        productActionsData.wishlist.push(productId);
        showNotification('Produit ajouté aux favoris', 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(productActionsData.wishlist));
    
    // Update wishlist count in header if exists
    updateWishlistCount();
    
    // Update button appearance
    updateWishlistButton(productId);
}

/**
 * Show quick view modal for a product
 * @param {string} productId - The unique product identifier
 */
function showQuickView(productId) {
    // Get product data (in a real app, this would come from an API)
    const productData = getProductData(productId);
    
    if (!productData) {
        showNotification('Produit non trouvé', 'error');
        return;
    }
    
    // Create and show quick view modal
    createQuickViewModal(productData);
}

/**
 * Add/remove product from comparison list
 * @param {string} productId - The unique product identifier
 */
function compareProduct(productId) {
    const index = productActionsData.compare.indexOf(productId);
    
    if (index > -1) {
        // Remove from comparison
        productActionsData.compare.splice(index, 1);
        showNotification('Produit retiré de la comparaison', 'info');
    } else {
        // Add to comparison (limit to 4 products)
        if (productActionsData.compare.length >= 4) {
            showNotification('Vous pouvez comparer maximum 4 produits', 'warning');
            return;
        }
        productActionsData.compare.push(productId);
        showNotification('Produit ajouté à la comparaison', 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('compare', JSON.stringify(productActionsData.compare));
    
    // Update compare count in header if exists
    updateCompareCount();
    
    // Update button appearance
    updateCompareButton(productId);
}

/**
 * Get product data by ID (mock data - in real app would come from API)
 * @param {string} productId - The unique product identifier
 * @returns {object|null} Product data object or null if not found
 */
function getProductData(productId) {
    // Try to get product from the global ProductDatabase first
    if (window.ProductDatabase) {
        const product = window.getProductById(productId);
        if (product) {
            return product;
        }
    }
    
    // Fallback to legacy product database for backward compatibility
    const productDatabase = {
        'canon-eos-m50': {
            id: 'canon-eos-m50',
            title: 'Canon EOS M50 Hybride',
            price: 589000,
            originalPrice: 851000,
            image: 'Projet 1 - MarketPlace/produits/canonhybrideeosm50_1.jpg',
            category: 'High-Tech',
            rating: 4,
            description: 'Canon EOS M50 Hybride avec objectifs 15-45mm. Parfait pour la photographie et la vidéo.',
            features: ['Capteur APS-C 24.1 MP', 'Vidéo 4K', 'Écran tactile orientable', 'Wi-Fi intégré']
        },
        'mens-winter-jacket': {
            id: 'mens-winter-jacket',
            title: 'Mens Winter Leathers Jackets',
            price: 30000,
            originalPrice: 45000,
            image: './assets/images/products/jacket-3.jpg',
            category: 'vestes',
            rating: 4,
            description: 'Veste d\'hiver en cuir pour homme, style moderne et élégant.',
            features: ['Cuir véritable', 'Doublure chaude', 'Poches zippées', 'Coupe moderne']
        },
        'french-terry-shorts': {
            id: 'french-terry-shorts',
            title: 'Short de survêtement en molleton français Better Basics',
            price: 12000,
            originalPrice: 18000,
            image: './assets/images/products/shorts-1.jpg',
            category: 'shorts',
            rating: 4,
            description: 'Short de survêtement confortable en molleton français.',
            features: ['Molleton français', 'Taille ajustable', 'Poches laterales', 'Confort optimal']
        },
        'air-shoes-white': {
            id: 'air-shoes-white',
            title: 'Chaussures de tekking à air comprimé - blanches',
            price: 31200,
            originalPrice: 33000,
            image: './assets/images/products/sports-6.jpg',
            category: 'sportif',
            rating: 4,
            description: 'Chaussures de tekking avec technologie d\'air comprimé.',
            features: ['Technologie Air', 'Respirant', 'Semelle antidérapante', 'Design moderne']
        },
        'boot-suede-detail': {
            id: 'boot-suede-detail',
            title: 'Botte avec détail en daim',
            price: 12000,
            originalPrice: 18000,
            image: './assets/images/products/shoe-3.jpg',
            category: 'bottes',
            rating: 4,
            description: 'Botte élégante avec détails en daim de qualité.',
            features: ['Matériau daim', 'Semelle cuir', 'Fermeture zip', 'Style urbain']
        },
        'mens-leather-shoes': {
            id: 'mens-leather-shoes',
            title: 'chaussures habillées en cuir pour hommes',
            price: 33600,
            originalPrice: 46800,
            image: './assets/images/products/shoe-1.jpg',
            category: 'officiel',
            rating: 5,
            description: 'Chaussures habillées en cuir véritable pour homme.',
            features: ['Cuir véritable', 'Semelle cuir', 'Design classique', 'Confort premium']
        },
        'casual-brown-shoes': {
            id: 'casual-brown-shoes',
            title: 'chaussures marron décontractées pour hommes',
            price: 30000,
            originalPrice: 33000,
            image: './assets/images/products/shoe-2.jpg',
            category: 'occasionnel',
            rating: 4,
            description: 'Chaussures décontractées en cuir marron pour homme.',
            features: ['Cuir marron', 'Style décontracté', 'Semelle confortable', 'Usage quotidien']
        },
        'iphone-12-pro-max': {
            id: 'iphone-12-pro-max',
            title: 'iPhone 12 Pro Max',
            price: 1048000,
            originalPrice: 1310000,
            image: 'Projet 1 - MarketPlace/produits/iphone12promax_1.jpg',
            category: 'Téléphonie',
            rating: 5,
            description: 'iPhone 12 Pro Max avec écran Super Retina XDR de 6,7 pouces et puce A14 Bionic.',
            features: ['Écran 6,7" Super Retina XDR', 'Puce A14 Bionic', 'Triple appareil photo pro', '128GB stockage']
        },
        'huawei-p30-lite': {
            id: 'huawei-p30-lite',
            title: 'Huawei P30 Lite',
            price: 262000,
            originalPrice: 327000,
            image: 'Projet 1 - MarketPlace/produits/huaweip30lite_1.jpg',
            category: 'Téléphonie',
            rating: 4,
            description: 'Smartphone Huawei P30 Lite avec triple caméra et design élégant.',
            features: ['Triple caméra 24MP', 'Écran 6,15"', 'Kirin 710', 'Design premium']
        },
        'xiaomi-redmi-note-9': {
            id: 'xiaomi-redmi-note-9',
            title: 'Xiaomi Redmi Note 9',
            price: 196000,
            originalPrice: 327000,
            image: 'Projet 1 - MarketPlace/produits/xiaomiredminote9_1.jpg',
            category: 'Téléphonie',
            rating: 4,
            description: 'Smartphone Xiaomi Redmi Note 9 avec quadruple caméra et excellente autonomie.',
            features: ['Quadruple caméra 48MP', 'Écran 6,53"', 'Batterie 5020mAh', 'Rapport qualité-prix']
        },
        'oculus-quest-2': {
            id: 'oculus-quest-2',
            title: 'Casque VR Oculus Quest 2',
            price: 786000,
            originalPrice: 982000,
            image: 'Projet 1 - MarketPlace/produits/oculusquest2_1.jpg',
            category: 'Jeux vidéo',
            rating: 5,
            description: 'Casque VR Oculus Quest 2 autonome pour une expérience VR immersive.',
            features: ['Casque VR autonome', 'Écran haute résolution', 'Contrôleurs tactiles', 'Liberté de mouvement']
        },
        'machine-a-laver-lg': {
            id: 'machine-a-laver-lg',
            title: 'Machine à Laver LG 9kg',
            price: 485000,
            originalPrice: 650000,
            image: 'Projet 1 - MarketPlace/images_electromenager/images/MACHINE A LAVER.jpg',
            category: 'Lavage et séchage',
            rating: 5,
            description: 'Machine à laver LG 9kg avec technologie avancée.',
            features: ['Capacité 9kg', 'Technologie SmartThinQ', 'Efficacité énergétique A+++', 'Programmes multiples']
        },
        'fer-a-repasser-samsung': {
            id: 'fer-a-repasser-samsung',
            title: 'Fer à Repasser Samsung',
            price: 42500,
            originalPrice: 55000,
            image: 'Projet 1 - MarketPlace/images_electromenager/images/FER A REPASSER.jpg',
            category: 'Entretien maison',
            rating: 4,
            description: 'Fer à repasser Samsung avec technologie AntiCalc.',
            features: ['Technologie AntiCalc', 'Semelle anti-adhésive', 'Réservoir 350ml', 'Vapor boost']
        },
        'ventilateur-bosch': {
            id: 'ventilateur-bosch',
            title: 'Ventilateur de Séchage Bosch',
            price: 68500,
            originalPrice: 85000,
            image: 'Projet 1 - MarketPlace/images_electromenager/images/VENTILLATEURS.jpg',
            category: 'Climatisation, ventilation',
            rating: 4,
            description: 'Ventilateur de séchage Bosch pour un séchage efficace.',
            features: ['Puissance 1500W', 'Séchage rapide', 'Sécurité thermique', 'Compact et portable']
        },
        'panier-linge-hoover': {
            id: 'panier-linge-hoover',
            title: 'Panier à Linge Hoover 10kg',
            price: 57500,
            originalPrice: 75000,
            image: 'Projet 1 - MarketPlace/images_electromenager/images/PANIER A LINGE SALLE.jpg',
            category: 'Lavage et séchage',
            rating: 4,
            description: 'Panier à linge Hoover avec capacité 10kg.',
            features: ['Capacité 10kg', 'Design ergonomique', 'Matériau durable', 'Transport facile']
        },
        'refrigerateur-samsung-450l': {
            id: 'refrigerateur-samsung-450l',
            title: 'Réfrigérateur Samsung 450L No Frost',
            price: 485000,
            originalPrice: 650000,
            image: 'Projet 1 - MarketPlace/images_electromenager/images/FRIGO.jpg',
            category: 'Froid',
            rating: 5,
            description: 'Réfrigérateur Samsung 450L avec technologie No Frost.',
            features: ['Capacité 450L', 'No Frost', 'Technologie invert', 'Économies d\'énergie']
        },
        'congelateur-lg-500l': {
            id: 'congelateur-lg-500l',
            title: 'Congélateur LG 500L DoorCooling+',
            price: 575000,
            originalPrice: 750000,
            image: 'Projet 1 - MarketPlace/images_electromenager/images/CONGELATEUR ALLEMAND.jpg',
            category: 'Froid',
            rating: 4,
            description: 'Congélateur LG 500L avec technologie DoorCooling+.',
            features: ['Capacité 500L', 'DoorCooling+', 'Système de refroidissement rapide', 'Contrôle digital']
        },
        'salon-imperial': {
            id: 'salon-imperial',
            title: 'Salon Imperial',
            price: 2850000,
            originalPrice: 3200000,
            image: 'Projet 1 - MarketPlace/images_electromenager/images/CHAISE IMPERIAL.jpg',
            category: 'Meuble et décoration',
            rating: 5,
            description: 'Salon Imperial en cuir véritable avec design luxueux.',
            features: ['Cuir véritable', 'Design luxueux', 'Configuration modulable', 'Garantie 5 ans']
        },
        'salon-a-manger': {
            id: 'salon-a-manger',
            title: 'Salon à Manger Complet',
            price: 1250000,
            originalPrice: 1500000,
            image: 'Projet 1 - MarketPlace/images_electromenager/images/SALON A MANGER.jpg',
            category: 'Meuble et décoration',
            rating: 4,
            description: 'Salon à manger complet avec table et chaises.',
            features: ['Table + 6 chaises', 'Matériau premium', 'Finition moderne', 'Assemblage inclus']
        },
        'salon-royal': {
            id: 'salon-royal',
            title: 'Salon Royal',
            price: 1850000,
            originalPrice: 2200000,
            image: 'Projet 1 - MarketPlace/images_electromenager/images/SALON ROYALE.jpg',
            category: 'Meuble et décoration',
            rating: 5,
            description: 'Salon Royal en cuir italien premium.',
            features: ['Cuir italien', 'Design royal', 'Mousse haute densité', 'Bois noble']
        },
        'table-bancs-enfant': {
            id: 'table-bancs-enfant',
            title: 'Table et Bancs pour Enfant',
            price: 185000,
            originalPrice: 225000,
            image: 'Projet 1 - MarketPlace/images_electromenager/images/TABLE BANCS POUR ENFANT.jpg',
            category: 'Meuble et décoration',
            rating: 4,
            description: 'Table et bancs adaptés pour enfants.',
            features: ['Matériau sécurisé', 'Bordures arrondies', 'Hauteur adaptée', 'Facile à nettoyer']
        },
        'table-salle-manger': {
            id: 'table-salle-manger',
            title: 'Table Salle à Manger',
            price: 485000,
            originalPrice: 585000,
            image: 'Projet 1 - MarketPlace/images_electromenager/images/TABLE POUR SALLE A MANGER.jpg',
            category: 'Meuble et décoration',
            rating: 4,
            description: 'Table salle à manger en bois massif.',
            features: ['Bois massif', 'Capacité 6-8 personnes', 'Finition premium', 'Design intemporel']
        }
    };
    
    return productDatabase[productId] || null;
}

/**
 * Create and show quick view modal
 * @param {object} productData - Product data object
 */
function createQuickViewModal(productData) {
    // Remove existing modal if any
    const existingModal = document.getElementById('quick-view-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHTML = `
        <div id="quick-view-modal" class="quick-view-modal-overlay">
            <div class="quick-view-modal-content">
                <button class="quick-view-close" onclick="closeQuickViewModal()">&times;</button>
                <div class="quick-view-product">
                    <div class="quick-view-image">
                        <img src="${productData.image}" alt="${productData.title}" />
                    </div>
                    <div class="quick-view-details">
                        <h3>${productData.title}</h3>
                        <div class="quick-view-rating">
                            ${'★'.repeat(productData.rating)}${'☆'.repeat(5 - productData.rating)}
                        </div>
                        <div class="quick-view-price">
                            <span class="current-price">XAF ${productData.price.toLocaleString()}</span>
                            <span class="original-price">XAF ${productData.originalPrice.toLocaleString()}</span>
                        </div>
                        <p class="quick-view-description">${productData.description}</p>
                        <div class="quick-view-features">
                            <h4>Caractéristiques :</h4>
                            <ul>
                                ${productData.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="quick-view-actions">
                            <button class="btn btn-primary" onclick="ajouterAuPanier(${JSON.stringify(productData).replace(/"/g, '"')})">Ajouter au panier</button>
                            <button class="btn btn-secondary" onclick="toggleWishlist('${productData.id}')">Favoris</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add CSS if not exists
    if (!document.getElementById('quick-view-styles')) {
        const styles = document.createElement('style');
        styles.id = 'quick-view-styles';
        styles.textContent = `
            .quick-view-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            }
            .quick-view-modal-content {
                background: white;
                border-radius: 10px;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                padding: 20px;
            }
            .quick-view-close {
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 30px;
                cursor: pointer;
                color: #666;
            }
            .quick-view-product {
                display: flex;
                gap: 20px;
            }
            .quick-view-image img {
                width: 300px;
                height: auto;
                border-radius: 8px;
            }
            .quick-view-details {
                flex: 1;
            }
            .quick-view-details h3 {
                margin: 0 0 10px 0;
                color: #333;
            }
            .quick-view-rating {
                color: #ffb400;
                margin-bottom: 10px;
            }
            .quick-view-price {
                margin-bottom: 15px;
            }
            .current-price {
                font-size: 24px;
                font-weight: bold;
                color: #ff6600;
                margin-right: 10px;
            }
            .original-price {
                text-decoration: line-through;
                color: #999;
            }
            .quick-view-description {
                margin-bottom: 15px;
                line-height: 1.5;
            }
            .quick-view-features h4 {
                margin-bottom: 10px;
            }
            .quick-view-features ul {
                list-style: none;
                padding: 0;
            }
            .quick-view-features li {
                padding: 5px 0;
                border-bottom: 1px solid #eee;
            }
            .quick-view-actions {
                margin-top: 20px;
                display: flex;
                gap: 10px;
            }
            .btn {
                padding: 12px 24px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            }
            .btn-primary {
                background: #ff6600;
                color: white;
            }
            .btn-primary:hover {
                background: #ff5200;
            }
            .btn-secondary {
                background: #f5f5f5;
                color: #333;
            }
            .btn-secondary:hover {
                background: #e5e5e5;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add close functionality
    document.getElementById('quick-view-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeQuickViewModal();
        }
    });
}

/**
 * Close quick view modal
 */
function closeQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
        modal.remove();
    }
}

/**
 * Update wishlist count in header
 */
function updateWishlistCount() {
    const countElement = document.querySelector('.action-btn .count');
    if (countElement && countElement.parentElement.querySelector('ion-icon[name="heart-outline"]')) {
        countElement.textContent = productActionsData.wishlist.length;
    }
}

/**
 * Update compare count in header
 */
function updateCompareCount() {
    // This would update a compare count if you have one in your header
    console.log('Compare count updated:', productActionsData.compare.length);
}

/**
 * Update wishlist button appearance
 * @param {string} productId - The unique product identifier
 */
function updateWishlistButton(productId) {
    const buttons = document.querySelectorAll(`[onclick="toggleWishlist('${productId}')"]`);
    buttons.forEach(button => {
        const icon = button.querySelector('ion-icon');
        if (icon) {
            if (productActionsData.wishlist.includes(productId)) {
                icon.setAttribute('name', 'heart');
                button.style.color = '#ff6600';
            } else {
                icon.setAttribute('name', 'heart-outline');
                button.style.color = '';
            }
        }
    });
}

/**
 * Update compare button appearance
 * @param {string} productId - The unique product identifier
 */
function updateCompareButton(productId) {
    const buttons = document.querySelectorAll(`[onclick="compareProduct('${productId}')"]`);
    buttons.forEach(button => {
        const icon = button.querySelector('ion-icon');
        if (icon) {
            if (productActionsData.compare.includes(productId)) {
                button.style.color = '#ff6600';
            } else {
                button.style.color = '';
            }
        }
    });
}

/**
 * Show notification to user
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info, warning)
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification-popup');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification-popup notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-popup button {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Make functions globally available
window.toggleWishlist = toggleWishlist;
window.showQuickView = showQuickView;
window.compareProduct = compareProduct;
window.closeQuickViewModal = closeQuickViewModal;