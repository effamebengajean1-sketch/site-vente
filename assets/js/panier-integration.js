// Script d'intégration panier automatisé pour toutes les sous-pages
// Ce script détecte automatiquement l'icône numéro 4 (bag-add-outline) et ajoute la fonctionnalité panier

// Fonction pour initialiser la fonctionnalité panier
function initializePanierFunctionality() {
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupPanierButtons);
        document.addEventListener('DOMContentLoaded', setupCartCounter);
    } else {
        setupPanierButtons();
        setupCartCounter();
    }
    
    // Observer les changements DOM pour les pages dynamiquement chargées
    observeDOMChanges();
}

// Fonction pour observer les changements DOM et configurer les nouveaux boutons
function observeDOMChanges() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // Reconfigurer les boutons après chaque modification du DOM
                setTimeout(setupPanierButtons, 100);
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Fonction pour configurer les boutons "Ajouter au panier" avec l'icône bag-add-outline
function setupPanierButtons() {
    // Cibler spécifiquement les boutons avec l'icône bag-add-outline (icône numéro 4)
    const cartButtons = document.querySelectorAll('.btn-action ion-icon[name="bag-add-outline"]');
    
    cartButtons.forEach((icon) => {
        const button = icon.closest('.btn-action');
        if (!button) return;
        
        // Éviter les doublons d'initialisation
        if (button.dataset.panierInitialized) return;
        
        const showcase = button.closest('.showcase');
        if (!showcase) return;
        
        // Extraire les données du produit
        const productData = extractProductData(showcase);
        
        if (productData) {
            // Configurer le bouton avec les données du produit
            configureCartButton(button, productData);
            button.dataset.panierInitialized = 'true';
            
            // Ajouter le title pour l'accessibilité
            button.setAttribute('title', 'Ajouter au panier');
            
            // Ajouter un effet visuel pour montrer que le bouton est activé
            button.style.cursor = 'pointer';
            button.style.transition = 'all 0.3s ease';
        }
    });
    
    // Gérer aussi les boutons existants avec l'attribut title
    const existingCartButtons = document.querySelectorAll('.btn-action[title="Ajouter au panier"]');
    existingCartButtons.forEach((button) => {
        if (!button.dataset.panierInitialized) {
            const showcase = button.closest('.showcase');
            if (showcase) {
                const productData = extractProductData(showcase);
                if (productData) {
                    configureCartButton(button, productData);
                    button.dataset.panierInitialized = 'true';
                }
            }
        }
    });
}

// Fonction pour extraire les données du produit d'un showcase
function extractProductData(showcase) {
    const titleElement = showcase.querySelector('.showcase-title');
    const priceElement = showcase.querySelector('.price');
    const imageElement = showcase.querySelector('.product-img');
    const categoryElement = showcase.querySelector('.showcase-category');
    
    if (!titleElement || !priceElement || !imageElement) {
        console.warn('Données produit incomplètes:', showcase);
        return null;
    }
    
    const title = titleElement.textContent.trim();
    const priceText = priceElement.textContent.replace(/[^\d,]/g, '');
    const image = imageElement.src;
    const category = categoryElement ? categoryElement.textContent.trim() : getCategoryFromPage();
    
    if (!title || !priceText || !image) {
        console.warn('Données produit invalides:', { title, priceText, image });
        return null;
    }
    
    const price = parseInt(priceText.replace(/,/g, ''));
    const productId = generateProductId(title);
    
    return {
        id: productId,
        title: title,
        price: price,
        image: image,
        category: category
    };
}

// Fonction pour générer un ID unique pour le produit
function generateProductId(title) {
    return title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

// Fonction pour obtenir la catégorie de la page actuelle
function getCategoryFromPage() {
    // Essayer de détecter la catégorie depuis le titre de la page
    const pageTitle = document.querySelector('.page-title, h1');
    if (pageTitle) {
        return pageTitle.textContent.trim();
    }
    
    // Ou depuis l'URL
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    
    const categoryMap = {
        'objets-connectes': 'Objets Connectés',
        'audio-hifi': 'Audio, Hifi',
        'tv-home-cinema': 'TV, Home Cinéma',
        'photo-camescope': 'Photo, caméscope',
        'laptops': 'Laptops',
        'pc-fixes-ecran': 'Pc fixes, écran',
        'composants': 'Composants',
        'stockage': 'Stockage',
        'femme': 'Femme',
        'homme': 'Homme',
        'enfants': 'Enfants',
        'bagages': 'Bagages',
        'lavage-sechage': 'Lavage et séchage',
        'froid': 'Froid',
        'cuisson': 'Cuisson',
        'entretien-maison': 'Entretien maison',
        'beaute-hygiene-sante': 'Beauté, Hygiène, santé',
        'climatisation-ventilation': 'Climatisation, ventilation'
    };
    
    return categoryMap[filename] || 'Produit';
}

// Fonction pour configurer un bouton panier avec les données du produit
function configureCartButton(button, productData) {
    // Utiliser JSON.stringify pour éviter les problèmes d'échappement
    const productString = JSON.stringify(productData);
    
    button.setAttribute('onclick', `window.ajouterAuPanier(${productString})`);
    button.setAttribute('title', 'Ajouter au panier');
    
    // Ajouter un effet hover pour indiquer que le bouton est interactif
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.backgroundColor = 'rgba(255, 102, 0, 0.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.backgroundColor = '';
    });
}

// Fonction pour configurer le compteur du panier
function setupCartCounter() {
    const cartButtons = document.querySelectorAll('.action-btn');
    
    cartButtons.forEach(button => {
        const icon = button.querySelector('ion-icon');
        if (icon && icon.getAttribute('name') === 'bag-handle-outline') {
            // Vérifier s'il y a déjà un compteur
            let countSpan = button.querySelector('.count');
            
            if (!countSpan) {
                countSpan = document.createElement('span');
                countSpan.className = 'count cart-count';
                countSpan.textContent = '0';
                countSpan.style.cssText = `
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #ff6600;
                    color: white;
                    border-radius: 50%;
                    width: 18px;
                    height: 18px;
                    font-size: 11px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                `;
                button.style.position = 'relative';
                button.appendChild(countSpan);
            } else {
                countSpan.classList.add('cart-count');
            }
            
            // Ajouter le lien vers la page panier si pas déjà présent
            if (!button.onclick && !button.getAttribute('onclick')) {
                button.addEventListener('click', function() {
                    if (window.location.pathname.endsWith('panier.html')) {
                        return;
                    }
                    window.location.href = 'panier.html';
                });
                button.style.cursor = 'pointer';
            }
        }
    });
}

// Fonction pour ajouter automatiquement la fonctionnalité panier à un bouton
function addPanierToButton(button, productData) {
    const product = {
        id: productData.id || `product-${Date.now()}`,
        title: productData.title,
        price: productData.price,
        image: productData.image,
        category: productData.category || 'Produit'
    };
    
    button.setAttribute('onclick', `window.ajouterAuPanier(${JSON.stringify(product)})`);
    button.setAttribute('title', 'Ajouter au panier');
    button.dataset.panierInitialized = 'true';
}

// Fonction utilitaire pour trouver tous les produits sur une page et leurs boutons
function findAndEnableAllCartButtons() {
    const showcases = document.querySelectorAll('.showcase');
    
    showcases.forEach((showcase, index) => {
        const titleElement = showcase.querySelector('.showcase-title');
        const priceElement = showcase.querySelector('.price');
        const imageElement = showcase.querySelector('.product-img');
        const categoryElement = showcase.querySelector('.showcase-category');
        const cartButton = showcase.querySelector('.btn-action ion-icon[name="bag-add-outline"]')?.closest('.btn-action');
        
        if (titleElement && priceElement && imageElement && cartButton) {
            const title = titleElement.textContent.trim();
            const priceText = priceElement.textContent.replace(/[^\d,]/g, '');
            const image = imageElement.src;
            const category = categoryElement ? categoryElement.textContent.trim() : getCategoryFromPage();
            const productId = generateProductId(title);
            const price = parseInt(priceText.replace(/,/g, ''));
            
            if (price > 0) {
                const productData = {
                    id: productId,
                    title: title,
                    price: price,
                    image: image,
                    category: category
                };
                
                configureCartButton(cartButton, productData);
                cartButton.dataset.panierInitialized = 'true';
            }
        }
    });
    
    setupCartCounter();
}

// Fonction pour synchroniser avec la page principale
function syncWithMainPage() {
    // S'assurer que le panier.js est chargé
    if (!window.panier) {
        console.warn('Panier non trouvé. Assurez-vous que panier.js est inclus.');
        return;
    }
    
    // Si on est sur la page principale, utiliser la logique existante
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        return;
    }
    
    // Pour les sous-pages, s'assurer que les boutons sont configurés
    setupPanierButtons();
}

// Fonction pour déboguer et afficher les produits détectés
function debugProducts() {
    const showcases = document.querySelectorAll('.showcase');
    console.log(`Produits détectés sur la page: ${showcases.length}`);
    
    showcases.forEach((showcase, index) => {
        const productData = extractProductData(showcase);
        if (productData) {
            console.log(`Produit ${index + 1}:`, productData);
        }
    });
}

// Fonction pour tester la fonctionnalité sur la page actuelle
function testCartFunctionality() {
    console.log('Test de la fonctionnalité panier...');
    
    // Vérifier si les boutons sont configurés
    const cartButtons = document.querySelectorAll('.btn-action ion-icon[name="bag-add-outline"]');
    console.log(`Boutons panier trouvés: ${cartButtons.length}`);
    
    // Vérifier si le panier est disponible
    if (window.panier) {
        console.log('Panier disponible:', window.panier);
    } else {
        console.warn('Panier non disponible. Assurez-vous que panier.js est chargé.');
    }
    
    // Tester l'ajout d'un produit
    if (cartButtons.length > 0) {
        const firstButton = cartButtons[0].closest('.btn-action');
        console.log('Premier bouton:', firstButton);
        console.log('Onclick:', firstButton.getAttribute('onclick'));
    }
}

// Initialiser automatiquement
initializePanierFunctionality();

// Exposer les fonctions globalement pour le débogage et l'utilisation manuelle
window.panierIntegration = {
    initializePanierFunctionality,
    setupPanierButtons,
    addPanierToButton,
    findAndEnableAllCartButtons,
    syncWithMainPage,
    debugProducts,
    testCartFunctionality,
    extractProductData,
    generateProductId,
    getCategoryFromPage
};

// Log de confirmation
console.log('Script panier-integration.js chargé avec succès!');
console.log('Détection automatique de l\'icône bag-add-outline activée.');

// Test automatique après un court délai
setTimeout(() => {
    console.log('=== Test automatique ===');
    testCartFunctionality();
    debugProducts();
}, 1000);