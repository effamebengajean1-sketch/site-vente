// High-tech Mega Menu - Enhanced menu functionality for the website
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize high-tech menu features
  function initializeHighTechMenu() {
    // Enhanced dropdown menu interactions
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuCategories.forEach(category => {
      const dropdown = category.querySelector('.dropdown-panel, .dropdown-menu');
      if (!dropdown) return;
      
      // Add hover effects
      category.addEventListener('mouseenter', function() {
        dropdown.style.display = 'block';
        dropdown.style.opacity = '1';
        dropdown.style.transform = 'translateY(0)';
      });
      
      category.addEventListener('mouseleave', function() {
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          if (dropdown.style.opacity === '0') {
            dropdown.style.display = 'none';
          }
        }, 300);
      });
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const desktopMenu = document.querySelector('.desktop-navigation-menu');
    
    if (mobileMenuToggle && desktopMenu) {
      mobileMenuToggle.addEventListener('click', function() {
        desktopMenu.classList.toggle('active');
        this.classList.toggle('active');
      });
    }
    
    // Mega menu enhancements
    const megaMenuTriggers = document.querySelectorAll('[data-mega-menu]');
    
    megaMenuTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        
        const megaMenuType = this.getAttribute('data-mega-menu');
        const megaPanel = document.querySelector(`[data-mega-panel="${megaMenuType}"]`);
        
        if (megaPanel) {
          // Toggle mega menu visibility
          megaPanel.classList.toggle('active');
          
          // Update trigger state
          this.classList.toggle('active');
        }
      });
    });
    
    // Enhanced search functionality
    const searchField = document.querySelector('.search-field');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchField && searchBtn) {
      searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch(searchField.value);
      });
      
      searchField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          performSearch(searchField.value);
        }
      });
    }
  }
  
  // Search function
  function performSearch(query) {
    if (!query.trim()) return;
    
    // Basic search implementation
    console.log('Searching for:', query);
    
    // You can expand this to perform actual product search
    // For now, we'll just log the search term
    const searchResults = document.querySelector('.search-results');
    if (searchResults) {
      searchResults.innerHTML = `<p>Recherche pour: "${query}"</p>`;
    }
  }
  
  // Initialize all menu features
  initializeHighTechMenu();
  
  // Cart integration for menu actions
  function initializeMenuCartIntegration() {
    // Handle cart icon clicks in menu
    const cartIcons = document.querySelectorAll('.action-btn ion-icon[name="bag-handle-outline"]');
    
    cartIcons.forEach(icon => {
      const button = icon.closest('.action-btn');
      if (button) {
        button.addEventListener('click', function() {
          // Navigate to cart page
          window.location.href = 'panier.html';
        });
      }
    });
    
    // Update cart count in menu
    if (window.panier) {
      const cartCountElements = document.querySelectorAll('.count');
      const updateCartCount = () => {
        const count = window.panier.getItemCount();
        cartCountElements.forEach(el => {
          el.textContent = count;
          el.style.display = count > 0 ? 'inline-block' : 'none';
        });
      };
      
      // Update on page load and cart changes
      updateCartCount();
      
      // Listen for cart updates
      document.addEventListener('cartUpdated', updateCartCount);
    }
  }
  
  // Initialize cart integration
  initializeMenuCartIntegration();
});