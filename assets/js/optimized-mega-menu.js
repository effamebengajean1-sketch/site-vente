/**
 * Optimized Mega Menu System - Navigation intuitive améliorée
 * Améliore l'expérience utilisateur avec une navigation plus claire et efficace
 */

class OptimizedMegaMenu {
  constructor() {
    this.activeMenu = null;
    this.menuData = {
      'high-tech': {
        title: 'High-Tech',
        icon: '🔧',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        categories: [
          {
            name: 'Ordinateurs & Laptops',
            icon: '💻',
            subcategories: [
              { name: 'Laptops Gaming', href: 'laptops.html?filter=gaming', popular: true },
              { name: 'PC Fixes', href: 'pc-fixes-ecran.html', popular: true },
              { name: 'MacBook', href: 'laptops.html?brand=apple' },
              { name: 'Ultrabooks', href: 'laptops.html?filter=ultrabook' }
            ]
          },
          {
            name: 'Téléphonie',
            icon: '📱',
            subcategories: [
              { name: 'iPhone', href: 'telephonie.html?brand=apple', popular: true },
              { name: 'Samsung Galaxy', href: 'telephonie.html?brand=samsung', popular: true },
              { name: 'Accessoires', href: 'accessoires.html?category=telephone' },
              { name: 'Recharges', href: 'telephonie.html?category=recharge' }
            ]
          },
          {
            name: 'Photo & Vidéo',
            icon: '📷',
            subcategories: [
              { name: 'Appareils Photo', href: 'photo-camescope.html?type=camera', popular: true },
              { name: 'Caméras', href: 'photo-camescope.html?type=video', popular: true },
              { name: 'Objectifs', href: 'composants.html?category=optique' },
              { name: 'Accessoires', href: 'accessoires.html?category=photo' }
            ]
          },
          {
            name: 'Audio & Hi-Fi',
            icon: '🎧',
            subcategories: [
              { name: 'Écouteurs', href: 'audio-hifi.html?type=earphones', popular: true },
              { name: 'Enceintes', href: 'audio-hifi.html?type=speakers', popular: true },
              { name: 'Casques', href: 'audio-hifi.html?type=headphones' },
              { name: 'Amplificateurs', href: 'audio-hifi.html?type=amplifier' }
            ]
          },
          {
            name: 'TV & Home Cinéma',
            icon: '📺',
            subcategories: [
              { name: 'Smart TV', href: 'tv-home-cinema.html?type=smart-tv', popular: true },
              { name: 'Projecteurs', href: 'tv-home-cinema.html?type=projector' },
              { name: 'Barres de son', href: 'tv-home-cinema.html?type=soundbar' },
              { name: 'Supports TV', href: 'accessoires.html?category=tv-support' }
            ]
          },
          {
            name: 'Jeux & Loisirs',
            icon: '🎮',
            subcategories: [
              { name: 'Console PS5', href: 'jeux-video.html?console=ps5', popular: true },
              { name: 'Console Xbox', href: 'jeux-video.html?console=xbox' },
              { name: 'PC Gaming', href: 'pc-fixes-ecran.html?gaming=true', popular: true },
              { name: 'Accessoires', href: 'accessoires.html?category=gaming' }
            ]
          }
        ],
        featured: [
          { name: 'Promotions High-Tech', href: 'index.html#promotions', badge: '🔥' },
          { name: 'Nouveautés', href: 'index.html#nouveautes', badge: '✨' },
          { name: 'Meilleures ventes', href: 'index.html#bestsellers', badge: '🏆' }
        ]
      },
      'fashion': {
        title: 'Mode & Accessoires',
        icon: '👗',
        color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
        categories: [
          {
            name: 'Femme',
            icon: '👩',
            subcategories: [
              { name: 'Vêtements', href: 'femme.html?category=vêtements', popular: true },
              { name: 'Chaussures', href: 'femme.html?category=chaussures', popular: true },
              { name: 'Sacs & Accessoires', href: 'femme.html?category=sacs' },
              { name: 'Lingerie', href: 'femme.html?category=lingerie' }
            ]
          },
          {
            name: 'Homme',
            icon: '👨',
            subcategories: [
              { name: 'Vêtements', href: 'homme.html?category=vêtements', popular: true },
              { name: 'Chaussures', href: 'homme.html?category=chaussures', popular: true },
              { name: 'Accessoires', href: 'homme.html?category=accessoires' },
              { name: 'Costumes', href: 'homme.html?category=costumes' }
            ]
          },
          {
            name: 'Enfants',
            icon: '👶',
            subcategories: [
              { name: 'Bébé', href: 'enfants.html?age=bebe', popular: true },
              { name: 'Enfant 3-12 ans', href: 'enfants.html?age=enfant', popular: true },
              { name: 'Adolescent', href: 'enfants.html?age=ado' },
              { name: 'Jouets', href: 'enfants.html?category=jouets' }
            ]
          }
        ],
        featured: [
          { name: 'Collection Été', href: 'femme.html?season=ete', badge: '☀️' },
          { name: 'Mode Homme', href: 'homme.html', badge: '👔' },
          { name: 'Enfants', href: 'enfants.html', badge: '🧸' }
        ]
      },
      'maison': {
        title: 'Maison & Jardin',
        icon: '🏠',
        color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        categories: [
          {
            name: 'Salon',
            icon: '🛋️',
            subcategories: [
              { name: 'Canapés', href: 'salon.html?category=canapes', popular: true },
              { name: 'Mobilier', href: 'salon.html?category=mobilier', popular: true },
              { name: 'Décoration', href: 'salon.html?category=decoration' },
              { name: 'Rangements', href: 'salon.html?category=rangements' }
            ]
          },
          {
            name: 'Électroménager',
            icon: '🔌',
            subcategories: [
              { name: 'Lavage & Séchage', href: 'lavage-sechage.html', popular: true },
              { name: 'Froid', href: 'froid.html', popular: true },
              { name: 'Cuisson', href: 'cuisson.html', popular: true },
              { name: 'Climatisation', href: 'climatisation-ventilation.html' }
            ]
          },
          {
            name: 'Jardin',
            icon: '🌿',
            subcategories: [
              { name: 'Mobilier Jardin', href: 'salon.html?category=jardin' },
              { name: 'Outils', href: 'accessoires.html?category=jardin' },
              { name: 'Plantes', href: 'accessoires.html?category=plantes' },
              { name: 'Arrosage', href: 'accessoires.html?category=arrosage' }
            ]
          }
        ],
        featured: [
          { name: 'Promotions', href: 'index.html#promotions-maison', badge: '💰' },
          { name: 'Nouveautés', href: 'index.html#nouveautes-maison', badge: '🏠' }
        ]
      }
    };
    
    this.init();
  }
  
  init() {
    this.createOptimizedMenus();
    this.bindEvents();
    this.addKeyboardNavigation();
    console.log('Optimized Mega Menu Initialized');
  }
  
  // Créer les menus optimisés
  createOptimizedMenus() {
    const desktopNav = document.querySelector('.desktop-navigation-menu, nav .menu-category-list');
    const mobileNav = document.querySelector('.mobile-nav-menu');
    
    if (!desktopNav && !mobileNav) {
      console.warn('Navigation menu not found');
      return;
    }
    
    // Créer le menu desktop
    if (desktopNav) {
      Object.entries(this.menuData).forEach(([key, menu]) => {
        const menuItem = this.createMenuItem(menu, key);
        desktopNav.insertAdjacentHTML('beforeend', menuItem);
      });
    }
    
    // Créer le menu mobile
    if (mobileNav) {
      Object.entries(this.menuData).forEach(([key, menu]) => {
        const mobileMenuItem = this.createMobileMenuItem(menu, key);
        mobileNav.insertAdjacentHTML('beforeend', mobileMenuItem);
      });
    }
    
    this.addMenuStyles();
  }
  
  // Créer un élément de menu
  createMenuItem(menu, key) {
    return `
      <li class="menu-category">
        <button class="mega-menu-trigger" data-menu="${key}">
          <span class="menu-icon">${menu.icon}</span>
          <span class="menu-title">${menu.title}</span>
          <ion-icon name="chevron-down-outline" class="menu-arrow"></ion-icon>
        </button>
        
        <div class="mega-menu-dropdown" id="mega-menu-${key}">
          <div class="mega-menu-content">
            <div class="mega-menu-header">
              <h3>${menu.title}</h3>
              <p>Découvrez notre large gamme de ${menu.title.toLowerCase()}</p>
            </div>
            
            <div class="mega-menu-grid">
              ${menu.categories.map(category => this.createCategorySection(category)).join('')}
            </div>
            
            <div class="mega-menu-featured">
              <h4>Accès rapide</h4>
              <div class="featured-links">
                ${menu.featured.map(feature => `
                  <a href="${feature.href}" class="featured-link">
                    <span class="featured-badge">${feature.badge}</span>
                    ${feature.name}
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </li>
    `;
  }
  
  // Créer une section de catégorie
  createCategorySection(category) {
    return `
      <div class="category-section">
        <h4 class="category-title">
          <span class="category-icon">${category.icon}</span>
          ${category.name}
        </h4>
        <ul class="subcategory-list">
          ${category.subcategories.map(sub => `
            <li>
              <a href="${sub.href}" class="subcategory-link ${sub.popular ? 'popular' : ''}">
                ${sub.name}
                ${sub.popular ? '<span class="popular-badge">Populaire</span>' : ''}
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
  
  // Créer un élément de menu mobile
  createMobileMenuItem(menu, key) {
    return `
      <div class="mobile-menu-item">
        <button class="mobile-menu-trigger" data-menu="${key}">
          <span class="mobile-menu-icon">${menu.icon}</span>
          <span class="mobile-menu-title">${menu.title}</span>
          <ion-icon name="chevron-down-outline" class="mobile-menu-arrow"></ion-icon>
        </button>
        
        <div class="mobile-mega-menu" id="mobile-mega-menu-${key}">
          ${menu.categories.map(category => `
            <div class="mobile-category">
              <h5>${category.icon} ${category.name}</h5>
              <ul>
                ${category.subcategories.map(sub => `
                  <li><a href="${sub.href}">${sub.name}</a></li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // Ajouter les styles CSS
  addMenuStyles() {
    const styles = `
      <style id="optimized-mega-menu-styles">
        /* Menu principal optimisé */
        .mega-menu-trigger {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          padding: 12px 16px;
          font-size: 16px;
          font-weight: 500;
          color: #333;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 8px;
          position: relative;
        }
        
        .mega-menu-trigger:hover {
          background: #f8f9fa;
          color: #ff6600;
        }
        
        .mega-menu-trigger.active {
          background: #ff6600;
          color: white;
        }
        
        .menu-icon {
          font-size: 20px;
        }
        
        .menu-arrow {
          font-size: 14px;
          transition: transform 0.3s ease;
        }
        
        .mega-menu-trigger.active .menu-arrow {
          transform: rotate(180deg);
        }
        
        /* Dropdown Mega Menu */
        .mega-menu-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100vw;
          max-width: 1200px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 1000;
          margin-top: 10px;
        }
        
        .mega-menu-dropdown.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .mega-menu-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 0;
          min-height: 400px;
        }
        
        .mega-menu-header {
          grid-column: 1 / -1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        
        .mega-menu-header h3 {
          margin: 0 0 10px 0;
          font-size: 28px;
          font-weight: 700;
        }
        
        .mega-menu-header p {
          margin: 0;
          font-size: 16px;
          opacity: 0.9;
        }
        
        .mega-menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          padding: 30px;
          background: white;
        }
        
        .category-section {
          animation: slideInUp 0.4s ease-out;
        }
        
        .category-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 15px 0;
          font-size: 18px;
          font-weight: 600;
          color: #333;
          padding-bottom: 10px;
          border-bottom: 2px solid #ff6600;
        }
        
        .category-icon {
          font-size: 24px;
        }
        
        .subcategory-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .subcategory-list li {
          margin-bottom: 8px;
        }
        
        .subcategory-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          color: #666;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .subcategory-link:hover {
          background: #f8f9fa;
          color: #ff6600;
          transform: translateX(5px);
        }
        
        .subcategory-link.popular {
          font-weight: 600;
          color: #333;
        }
        
        .popular-badge {
          background: #ff6600;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 600;
        }
        
        .mega-menu-featured {
          padding: 30px;
          background: #f8f9fa;
          border-left: 1px solid #eee;
        }
        
        .mega-menu-featured h4 {
          margin: 0 0 20px 0;
          font-size: 18px;
          color: #333;
        }
        
        .featured-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .featured-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: white;
          color: #333;
          text-decoration: none;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        
        .featured-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        
        .featured-badge {
          font-size: 20px;
        }
        
        /* Mobile Menu */
        .mobile-menu-item {
          border-bottom: 1px solid #eee;
        }
        
        .mobile-menu-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 15px 0;
          background: none;
          border: none;
          font-size: 16px;
          font-weight: 500;
          color: #333;
          cursor: pointer;
        }
        
        .mobile-mega-menu {
          display: none;
          padding: 20px 0;
          background: #f8f9fa;
        }
        
        .mobile-mega-menu.show {
          display: block;
          animation: slideDown 0.3s ease-out;
        }
        
        .mobile-category {
          margin-bottom: 20px;
        }
        
        .mobile-category h5 {
          margin: 0 0 10px 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }
        
        .mobile-category ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .mobile-category li {
          margin-bottom: 8px;
        }
        
        .mobile-category a {
          display: block;
          padding: 8px 12px;
          color: #666;
          text-decoration: none;
          border-radius: 6px;
          transition: background 0.3s ease;
        }
        
        .mobile-category a:hover {
          background: white;
          color: #ff6600;
        }
        
        /* Animations */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .mega-menu-dropdown {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            max-width: none;
            border-radius: 0;
          }
          
          .mega-menu-content {
            grid-template-columns: 1fr;
            overflow-y: auto;
            height: calc(100vh - 100px);
          }
          
          .mega-menu-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px;
          }
          
          .mega-menu-featured {
            border-left: none;
            border-top: 1px solid #eee;
          }
        }
        
        @media (max-width: 1024px) {
          .mega-menu-dropdown {
            left: 50%;
            transform: translateX(-50%) translateY(-10px);
          }
          
          .mega-menu-dropdown.show {
            transform: translateX(-50%) translateY(0);
          }
        }
      </style>
    `;
    
    if (!document.getElementById('optimized-mega-menu-styles')) {
      document.head.insertAdjacentHTML('beforeend', styles);
    }
  }
  
  // Gérer les événements
  bindEvents() {
    // Menu desktop
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.mega-menu-trigger');
      if (trigger) {
        e.preventDefault();
        this.toggleMenu(trigger.dataset.menu);
        return;
      }
      
      // Fermer le menu si clic extérieur
      if (!e.target.closest('.mega-menu-dropdown') && !e.target.closest('.mega-menu-trigger')) {
        this.closeAllMenus();
      }
    });
    
    // Menu mobile
    document.addEventListener('click', (e) => {
      const mobileTrigger = e.target.closest('.mobile-menu-trigger');
      if (mobileTrigger) {
        e.preventDefault();
        this.toggleMobileMenu(mobileTrigger.dataset.menu);
      }
    });
    
    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllMenus();
      }
    });
  }
  
  // Navigation clavier
  addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll('.mega-menu-trigger, .subcategory-link, .featured-link');
        // Logique de navigation Tab personnalisée si nécessaire
      }
    });
  }
  
  // Basculer l'état du menu
  toggleMenu(menuKey) {
    const trigger = document.querySelector(`[data-menu="${menuKey}"]`);
    const dropdown = document.getElementById(`mega-menu-${menuKey}`);
    
    if (!trigger || !dropdown) return;
    
    const isActive = trigger.classList.contains('active');
    
    // Fermer tous les menus
    this.closeAllMenus();
    
    // Ouvrir le menu cliqué si il n'était pas actif
    if (!isActive) {
      trigger.classList.add('active');
      dropdown.classList.add('show');
      this.activeMenu = menuKey;
    }
  }
  
  // Basculer le menu mobile
  toggleMobileMenu(menuKey) {
    const trigger = document.querySelector(`[data-menu="${menuKey}"]`);
    const mobileMenu = document.getElementById(`mobile-mega-menu-${menuKey}`);
    
    if (!trigger || !mobileMenu) return;
    
    const isActive = trigger.classList.contains('active');
    
    // Fermer tous les menus mobiles
    document.querySelectorAll('.mobile-menu-trigger').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.mobile-mega-menu').forEach(m => m.classList.remove('show'));
    
    // Ouvrir le menu cliqué si il n'était pas actif
    if (!isActive) {
      trigger.classList.add('active');
      mobileMenu.classList.add('show');
    }
  }
  
  // Fermer tous les menus
  closeAllMenus() {
    document.querySelectorAll('.mega-menu-trigger').forEach(trigger => trigger.classList.remove('active'));
    document.querySelectorAll('.mega-menu-dropdown').forEach(dropdown => dropdown.classList.remove('show'));
    document.querySelectorAll('.mobile-menu-trigger').forEach(trigger => trigger.classList.remove('active'));
    document.querySelectorAll('.mobile-mega-menu').forEach(menu => menu.classList.remove('show'));
    this.activeMenu = null;
  }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
  // Vérifier si on est sur la page d'accueil ou une page avec navigation
  if (document.querySelector('.desktop-navigation-menu, nav, .header')) {
    const optimizedMegaMenu = new OptimizedMegaMenu();
    window.optimizedMegaMenu = optimizedMegaMenu;
  }
});