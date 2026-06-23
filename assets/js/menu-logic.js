// Menu Logic - Core navigation and menu functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize core menu functionality
  function initializeMenuLogic() {
    // Navigation active state management
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.menu-title, .nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
    
    // Dropdown menu management
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuCategories.forEach(category => {
      const dropdown = category.querySelector('.dropdown-panel, .dropdown-menu');
      const trigger = category.querySelector('.menu-title');
      
      if (!dropdown || !trigger) return;
      
      // Click to toggle dropdown
      trigger.addEventListener('click', function(e) {
        // If this trigger is the "Informatique" button, prevent navigation
        // and do NOT toggle the dropdown on click (hover should still work).
        if (this.matches('a[href="#informatique"], .menu-title[data-menu="informatique"]')) {
          e.preventDefault();
          // Stop other click handlers from running for this element
          e.stopImmediatePropagation();
          return;
        }

        // Only prevent default if it's a submenu trigger
        if (dropdown.children.length > 0) {
          e.preventDefault();
        }
        
        // Close other dropdowns
        menuCategories.forEach(otherCategory => {
          if (otherCategory !== category) {
            const otherDropdown = otherCategory.querySelector('.dropdown-panel, .dropdown-menu');
            if (otherDropdown) {
              otherDropdown.classList.remove('active');
            }
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!category.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });
    });

    // Specific handling for the "Informatique" menu button:
    // Prevent the anchor from navigating to `#informatique` on click,
    // but keep showing the submenu on hover.
    const informatiqueTriggers = document.querySelectorAll('a[href="#informatique"], .menu-title[data-menu="informatique"]');

    informatiqueTriggers.forEach(trigger => {
      // Always prevent navigation when clicked
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
      });

      // Show submenu on hover (mirror dropdown behavior)
      trigger.addEventListener('mouseenter', function() {
        const category = this.closest('.menu-category');
        if (!category) return;
        const dropdown = category.querySelector('.dropdown-panel, .dropdown-menu');
        if (dropdown) dropdown.classList.add('active');
      });

      // Hide submenu when mouse leaves the trigger (but allow moving to panel)
      trigger.addEventListener('mouseleave', function() {
        const category = this.closest('.menu-category');
        if (!category) return;
        const dropdown = category.querySelector('.dropdown-panel, .dropdown-menu');
        if (dropdown) {
          setTimeout(() => {
            if (!dropdown.matches(':hover')) {
              dropdown.classList.remove('active');
            }
          }, 100);
        }
      });
    });
    
    // Mobile menu functionality
    initializeMobileMenu();
    
    // Mega menu initialization
    initializeMegaMenu();
  }
  
  // Mobile menu handling
  function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle, .menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu, .mobile-navigation-menu');
    const overlay = document.querySelector('.overlay');
    
    if (!mobileToggle || !mobileMenu) return;
    
    mobileToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      
      // Update toggle icon
      const icon = this.querySelector('ion-icon');
      if (icon) {
        icon.setAttribute('name', 
          mobileMenu.classList.contains('active') ? 'close-outline' : 'menu-outline'
        );
      }
    });
    
    // Close mobile menu when clicking overlay
    if (overlay) {
      overlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    }
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }
  
  // Mega menu functionality
  function initializeMegaMenu() {
    const megaMenuTriggers = document.querySelectorAll('[data-mega-menu]');
    
    megaMenuTriggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', function() {
        const megaMenuType = this.getAttribute('data-mega-menu');
        const megaPanel = document.querySelector(`[data-mega-panel="${megaMenuType}"]`);
        
        if (megaPanel) {
          megaPanel.classList.add('active');
        }
      });
      
      trigger.addEventListener('mouseleave', function() {
        const megaMenuType = this.getAttribute('data-mega-menu');
        const megaPanel = document.querySelector(`[data-mega-panel="${megaMenuType}"]`);
        
        if (megaPanel) {
          // Delay hiding to allow mouse movement to panel
          setTimeout(() => {
            if (!megaPanel.matches(':hover')) {
              megaPanel.classList.remove('active');
            }
          }, 100);
        }
      });
    });
    
    // Hide mega menu when clicking outside
    document.addEventListener('click', function(e) {
      const megaPanels = document.querySelectorAll('[data-mega-panel]');
      
      megaPanels.forEach(panel => {
        if (!panel.contains(e.target) && !e.target.hasAttribute('data-mega-menu')) {
          panel.classList.remove('active');
        }
      });
    });
  }
  
  // Search functionality integration
  function initializeSearchIntegration() {
    const searchForms = document.querySelectorAll('.search-form, .header-search-container');
    
    searchForms.forEach(form => {
      const searchInput = form.querySelector('.search-field, input[type="search"]');
      const searchBtn = form.querySelector('.search-btn');
      
      if (searchInput && searchBtn) {
        // Search on button click
        searchBtn.addEventListener('click', function(e) {
          e.preventDefault();
          performSearch(searchInput.value);
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(searchInput.value);
          }
        });
        
        // Search suggestions (basic implementation)
        searchInput.addEventListener('input', function() {
          const query = this.value.toLowerCase();
          if (query.length > 2) {
            showSearchSuggestions(query);
          } else {
            hideSearchSuggestions();
          }
        });
      }
    });
  }
  
  // Basic search implementation
  function performSearch(query) {
    if (!query.trim()) return;
    
    // You can implement actual search logic here
    console.log('Searching for:', query);
    
    // For now, redirect to a search results page
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  }
  
  // Search suggestions (placeholder)
  function showSearchSuggestions(query) {
    // This is a placeholder for search suggestions
    // You can implement actual suggestion logic
  }
  
  function hideSearchSuggestions() {
    // Hide search suggestions
  }
  
  // Initialize all menu logic
  initializeMenuLogic();
  initializeSearchIntegration();
  
  // Cart integration for menu
  function initializeMenuCartIntegration() {
    // Handle cart icon clicks
    const cartIcons = document.querySelectorAll('.action-btn ion-icon[name="bag-handle-outline"]');
    
    cartIcons.forEach(icon => {
      const button = icon.closest('.action-btn');
      if (button) {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          window.location.href = 'panier.html';
        });
      }
    });
    
    // Update cart count in real-time
    if (window.panier) {
      const updateCartDisplay = () => {
        const cartCountElements = document.querySelectorAll('.cart-count, .count');
        const count = window.panier.getItemCount();
        
        cartCountElements.forEach(el => {
          el.textContent = count;
          if (count > 0) {
            el.style.display = 'inline-block';
          } else {
            el.style.display = 'none';
          }
        });
      };
      
      // Update on page load
      updateCartDisplay();
      
      // Listen for cart updates
      document.addEventListener('cartUpdated', updateCartDisplay);
      document.addEventListener('cartChanged', updateCartDisplay);
    }
  }
  
  // Initialize cart integration
  initializeMenuCartIntegration();
});