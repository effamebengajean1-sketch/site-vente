/*==================================*\
    SYSTÈME DE MODAL UNIVERSEL
    Modal de visualisation rapide des produits
    Compatible avec toutes les pages produits
\*==================================*/

// Système de modal universel pour toutes les pages produits
class UniversalProductModal {
    constructor() {
        this.productsData = {}; // Sera rempli par chaque page
        this.init();
    }

    init() {
        // Définir les fonctions globalement pour qu'elles soient disponibles pour les onclick
        window.showQuickView = (productId) => this.showQuickView(productId);
        window.closeQuickViewModal = () => this.closeQuickViewModal();
        window.addToCartFromModal = (productId) => this.addToCartFromModal(productId);
        window.addToFavorites = (productId) => this.addToFavorites(productId);
        
        console.log('Universal Product Modal initialized');
    }

    // Afficher le modal avec les détails du produit
    showQuickView(productId) {
        console.log('showQuickView called with:', productId);
        
        const product = this.productsData[productId];
        if (!product) {
            alert('Produit non trouvé');
            return;
        }
        
        // Créer le HTML du modal
        const modalHTML = `
            <div id="quick-view-modal" class="quick-view-modal-overlay" style="
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
                animation: fadeIn 0.3s ease;
            ">
                <div class="quick-view-modal-content" style="
                    background: white;
                    border-radius: 15px;
                    max-width: 900px;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    padding: 30px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    animation: slideIn 0.3s ease;
                ">
                    <button class="quick-view-close" onclick="closeQuickViewModal()" style="
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        background: none;
                        border: none;
                        font-size: 32px;
                        cursor: pointer;
                        color: #666;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    " onmouseover="this.style.background='#ff6600'; this.style.color='white'" onmouseout="this.style.background='none'; this.style.color='#666'">&times;</button>
                    
                    <div class="quick-view-product" style="display: flex; gap: 30px; align-items: flex-start;">
                        <div class="quick-view-image" style="flex: 0 0 350px;">
                            <img src="${product.image}" alt="${product.title}" style="
                                width: 100%; 
                                height: auto; 
                                border-radius: 12px;
                                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                                transition: transform 0.3s ease;
                            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
                        </div>
                        
                        <div class="quick-view-details" style="flex: 1; padding-right: 20px;">
                            <div style="margin-bottom: 15px;">
                                <span style="
                                    background: #ff6600; 
                                    color: white; 
                                    padding: 4px 12px; 
                                    border-radius: 20px; 
                                    font-size: 12px; 
                                    font-weight: 600;
                                    text-transform: uppercase;
                                ">${product.category}</span>
                            </div>
                            
                            <h3 style="margin: 0 0 15px 0; color: #333; font-size: 28px; line-height: 1.2;">${product.title}</h3>
                            
                            <div class="quick-view-rating" style="color: #ffb400; margin-bottom: 20px; font-size: 18px;">
                                ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                                <span style="color: #666; font-size: 14px; margin-left: 10px;">(${product.rating}/5)</span>
                            </div>
                            
                            <div class="quick-view-price" style="margin-bottom: 25px;">
                                <span class="current-price" style="font-size: 32px; font-weight: bold; color: #ff6600; margin-right: 15px;">
                                    ${product.price} XAF
                                </span>
                                ${product.originalPrice ? `
                                    <span class="original-price" style="text-decoration: line-through; color: #999; font-size: 18px;">
                                        ${product.originalPrice} XAF
                                    </span>
                                    <span style="
                                        background: #e74c3c; 
                                        color: white; 
                                        padding: 2px 8px; 
                                        border-radius: 12px; 
                                        font-size: 12px; 
                                        font-weight: bold;
                                        margin-left: 10px;
                                    ">
                                        -${Math.round((1 - product.price / product.originalPrice) * 100)}%
                                    </span>
                                ` : ''}
                            </div>
                            
                            <p class="quick-view-description" style="margin-bottom: 25px; line-height: 1.6; color: #555; font-size: 16px;">${product.description}</p>
                            
                            ${product.features ? `
                                <div class="quick-view-features" style="margin-bottom: 25px;">
                                    <h4 style="margin-bottom: 15px; color: #333; font-size: 18px;">Caractéristiques :</h4>
                                    <ul style="list-style: none; padding: 0;">
                                        ${product.features.map(feature => `
                                            <li style="
                                                padding: 8px 0; 
                                                border-bottom: 1px solid #f0f0f0;
                                                display: flex;
                                                align-items: center;
                                            ">
                                                <span style="
                                                    color: #ff6600; 
                                                    margin-right: 10px; 
                                                    font-weight: bold;
                                                ">✓</span>
                                                ${feature}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            <div class="quick-view-actions" style="margin-top: 30px; display: flex; gap: 15px;">
                                <button class="btn btn-primary" onclick="addToCartFromModal('${product.id}')" style="
                                    padding: 15px 30px; 
                                    border: none; 
                                    border-radius: 8px; 
                                    cursor: pointer; 
                                    font-weight: bold; 
                                    background: #ff6600; 
                                    color: white;
                                    font-size: 16px;
                                    transition: all 0.3s ease;
                                    flex: 1;
                                    box-shadow: 0 4px 15px rgba(255, 102, 0, 0.3);
                                " onmouseover="this.style.background='#ff5200'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#ff6600'; this.style.transform='translateY(0)'">
                                    🛒 Ajouter au panier
                                </button>
                                <button class="btn btn-secondary" onclick="addToFavorites('${product.id}')" style="
                                    padding: 15px 20px; 
                                    border: 2px solid #ff6600; 
                                    border-radius: 8px; 
                                    cursor: pointer; 
                                    font-weight: bold; 
                                    background: white; 
                                    color: #ff6600;
                                    font-size: 16px;
                                    transition: all 0.3s ease;
                                " onmouseover="this.style.background='#ff6600'; this.style.color='white'" onmouseout="this.style.background='white'; this.style.color='#ff6600'">
                                    ❤️ Favoris
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Supprimer le modal existant s'il y en a un
        const existingModal = document.getElementById('quick-view-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Ajouter le modal au body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Ajouter la fonctionnalité de fermeture
        document.getElementById('quick-view-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('quick-view-modal')) {
                this.closeQuickViewModal();
            }
        });
        
        // Empêcher le scroll du body quand le modal est ouvert
        document.body.style.overflow = 'hidden';
    }

    // Fermer le modal
    closeQuickViewModal() {
        const modal = document.getElementById('quick-view-modal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    // Ajouter au panier depuis le modal
    addToCartFromModal(productId) {
        const product = this.productsData[productId];
        if (product && typeof ajouterAuPanier === 'function') {
            const cartProduct = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image
            };
            ajouterAuPanier(cartProduct);
            alert(product.title + ' ajouté au panier!');
            this.closeQuickViewModal();
        } else {
            alert('Erreur lors de l\'ajout au panier');
        }
    }

    // Ajouter aux favoris
    addToFavorites(productId) {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites.includes(productId)) {
            favorites.push(productId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        alert('Produit ajouté aux favoris!');
        this.closeQuickViewModal();
    }

    // Définir les données des produits pour une page spécifique
    setProductsData(productsData) {
        this.productsData = productsData;
    }
}

// Styles CSS pour les animations
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideIn {
        from { 
            opacity: 0; 
            transform: translateY(-50px) scale(0.9); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
        }
    }
    
    .quick-view-modal-overlay {
        backdrop-filter: blur(5px);
    }
    
    .quick-view-modal-content::-webkit-scrollbar {
        width: 8px;
    }
    
    .quick-view-modal-content::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }
    
    .quick-view-modal-content::-webkit-scrollbar-thumb {
        background: #ff6600;
        border-radius: 4px;
    }
    
    .quick-view-modal-content::-webkit-scrollbar-thumb:hover {
        background: #ff5200;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
        .quick-view-product {
            flex-direction: column !important;
            gap: 20px !important;
        }
        
        .quick-view-image {
            flex: none !important;
            max-width: 300px;
            margin: 0 auto;
        }
        
        .quick-view-details {
            padding-right: 0 !important;
        }
        
        .quick-view-modal-content {
            margin: 20px !important;
            padding: 20px !important;
            max-width: calc(100% - 40px) !important;
        }
        
        .quick-view-actions {
            flex-direction: column !important;
        }
    }
`;
document.head.appendChild(modalStyles);

// Initialiser le système de modal universel
document.addEventListener('DOMContentLoaded', () => {
    window.universalModal = new UniversalProductModal();
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalProductModal;
}