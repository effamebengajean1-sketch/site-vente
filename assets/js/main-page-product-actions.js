// Main Page Product Actions - Handles add to cart functionality for the homepage
document.addEventListener('DOMContentLoaded', function() {
  // Initialize panier globally
  window.panier = new Panier();

  // Handle product grid add to cart buttons
  function initializeProductActions() {
    const productButtons = document.querySelectorAll('.product-item .add-to-cart-btn, .showcase .btn-action');
    
    productButtons.forEach((button, index) => {
      // Skip if it's not an add to cart button
      if (button.querySelector('ion-icon[name="bag-add-outline"]') || 
          button.classList.contains('add-to-cart-btn')) {
        
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Find the product container
          const productItem = button.closest('.product-item, .showcase');
          if (!productItem) return;
          
          // Extract product data
          const title = productItem.querySelector('.product-title, .showcase-title, h3')?.textContent || '';
          const priceText = productItem.querySelector('.price, .product-price')?.textContent || '';
          const image = productItem.querySelector('.product-img, img')?.src || '';
          
          // Parse price (remove "XAF" and commas)
          const price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;
          
          // Create product object
          const product = {
            id: `home-${index}-${Date.now()}`,
            title: title,
            price: price,
            image: image,
            category: 'Accueil'
          };
          
          // Add to cart
          if (window.panier) {
            window.panier.addItem(product);
          } else {
            console.error('Panier not initialized');
          }
        });
      }
    });
  }

  // Initialize when DOM is ready
  initializeProductActions();
});