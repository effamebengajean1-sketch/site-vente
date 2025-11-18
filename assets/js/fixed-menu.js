/*==================================*\
    SCRIPT MENU FIXE ET RESPONSIVE
\*==================================*/

class FixedMenu {
  constructor() {
    this.lastScrollY = window.scrollY;
    this.menuVisible = true;
    this.mobileMenuActive = false;
    this.init();
  }

  init() {
    this.createFixedMenu();
    this.setupEventListeners();
    this.handleMobileMenu();
  }

  // Créer le menu fixe
  createFixedMenu() {
    // Créer l'élément du menu fixe
    const fixedMenu = document.createElement('nav');
    fixedMenu.className = 'fixed-navigation-menu';
    fixedMenu.innerHTML = `
      <div class="container">
        <a href="#" class="fixed-logo">
          <span class="orange-letter">N</span>exus<span class="orange-letter">C</span>hop
        </a>
        
        <button class="mobile-menu-toggle" aria-label="Menu mobile">
          <div class="hamburger-lines">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </div>
        </button>
        
        <ul class="fixed-menu-list">
          <li class="fixed-menu-item">
            <a href="index.html" class="fixed-menu-link">Accueil</a>
          </li>
          <li class="fixed-menu-item">
            <a href="#" class="fixed-menu-link" data-submenu="categories">Catégories</a>
          </li>
          <li class="fixed-menu-item">
            <a href="laptops.html" class="fixed-menu-link">Laptops</a>
          </li>
          <li class="fixed-menu-item">
            <a href="pc-fixes-ecran.html" class="fixed-menu-link">PC & Écrans</a>
          </li>
          <li class="fixed-menu-item">
            <a href="hightech.html" class="fixed-menu-link">High-Tech</a>
          </li>
        </ul>
      </div>
      
      <!-- Menu mobile déroulant -->
      <div class="mobile-menu-dropdown">
        <div class="container">
          <ul class="mobile-menu-items">
            <li class="mobile-menu-item">
              <a href="index.html" class="mobile-menu-link">Accueil</a>
            </li>
            <li class="mobile-menu-item">
              <a href="#" class="mobile-menu-link" data-submenu="categories">Catégories</a>
            </li>
            <li class="mobile-menu-item">
              <a href="laptops.html" class="mobile-menu-link">Laptops</a>
            </li>
            <li class="mobile-menu-item">
              <a href="pc-fixes-ecran.html" class="mobile-menu-link">PC & Écrans</a>
            </li>
            <li class="mobile-menu-item">
              <a href="hightech.html" class="mobile-menu-link">High-Tech</a>
            </li>
          </ul>
        </div>
      </div>
    `;

    // Insérer le menu fixe au début du body
    document.body.insertBefore(fixedMenu, document.body.firstChild);

    // Ajouter la classe main-content au contenu principal
    const main = document.querySelector('main');
    if (main) {
      main.classList.add('main-content');
    }
  }

  // Configurer les Event Listeners
  setupEventListeners() {
    // Gestion du scroll pour masquer/afficher le menu
    window.addEventListener('scroll', this.handleScroll.bind(this));
    
    // Gestion du resize pour le responsive
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Gestion du menu mobile
    this.handleMobileMenu();
  }

  // Gérer le scroll du menu fixe
  handleScroll() {
    const currentScrollY = window.scrollY;
    const fixedMenu = document.querySelector('.fixed-navigation-menu');
    
    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      // Scroll vers le bas - masquer le menu
      if (this.menuVisible) {
        fixedMenu.classList.add('hidden');
        fixedMenu.classList.remove('visible');
        this.menuVisible = false;
      }
    } else {
      // Scroll vers le haut - afficher le menu
      if (!this.menuVisible) {
        fixedMenu.classList.remove('hidden');
        fixedMenu.classList.add('visible');
        this.menuVisible = true;
      }
    }
    
    this.lastScrollY = currentScrollY;
  }

  // Gérer le resize pour le responsive
  handleResize() {
    const fixedMenu = document.querySelector('.fixed-navigation-menu');
    const mobileMenuDropdown = document.querySelector('.mobile-menu-dropdown');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth > 768) {
      // Sur desktop - fermer le menu mobile
      if (this.mobileMenuActive) {
        this.closeMobileMenu();
      }
    }
    
    // Ajuster l'espacement du header principal
    this.adjustMainSpacing();
  }

  // Gérer le menu mobile
  handleMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuDropdown = document.querySelector('.mobile-menu-dropdown');
    
    if (mobileMenuToggle && mobileMenuDropdown) {
      mobileMenuToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
      
      // Fermer le menu mobile en cliquant en dehors
      document.addEventListener('click', (e) => {
        if (this.mobileMenuActive && 
            !mobileMenuToggle.contains(e.target) && 
            !mobileMenuDropdown.contains(e.target)) {
          this.closeMobileMenu();
        }
      });
      
      // Fermer avec la touche Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.mobileMenuActive) {
          this.closeMobileMenu();
        }
      });
    }
  }

  // Basculer l'état du menu mobile
  toggleMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuDropdown = document.querySelector('.mobile-menu-dropdown');
    
    if (this.mobileMenuActive) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  // Ouvrir le menu mobile
  openMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuDropdown = document.querySelector('.mobile-menu-dropdown');
    
    mobileMenuToggle.classList.add('active');
    mobileMenuDropdown.classList.add('active');
    this.mobileMenuActive = true;
    
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
  }

  // Fermer le menu mobile
  closeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuDropdown = document.querySelector('.mobile-menu-dropdown');
    
    mobileMenuToggle.classList.remove('active');
    mobileMenuDropdown.classList.remove('active');
    this.mobileMenuActive = false;
    
    // Réactiver le scroll du body
    document.body.style.overflow = '';
  }

  // Ajuster l'espacement du contenu principal
  adjustMainSpacing() {
    const headerMain = document.querySelector('.header-main');
    
    if (headerMain) {
      if (window.innerWidth <= 768) {
        headerMain.style.paddingTop = '70px';
      } else if (window.innerWidth <= 480) {
        headerMain.style.paddingTop = '60px';
      } else {
        headerMain.style.paddingTop = '90px';
      }
    }
  }

  // Initialiser le spacing
  initialSpacing() {
    this.adjustMainSpacing();
  }
}

// Initialiser le menu fixe quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  new FixedMenu();
});

// Fonctions utilitaires pour les liens de catégories
document.addEventListener('DOMContentLoaded', () => {
  // Gestion des liens de catégories avec mega menu
  const categoryLinks = document.querySelectorAll('[data-submenu="categories"]');
  
  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Ici vous pouvez ajouter la logique pour afficher le mega menu
      // ou rediriger vers la page des catégories
      console.log('Clic sur catégories');
      
      // Exemple: redirection vers une page de catégories
      // window.location.href = 'categories.html';
    });
  });
  
  // Smooth scroll pour les liens d'ancrage
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});