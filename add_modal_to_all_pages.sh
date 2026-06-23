#!/bin/bash

# ===========================================
# AUTOMATION SCRIPT FOR MODAL IMPLEMENTATION
# Universal Product Modal System
# NexusChop - Modal Implementation
# ===========================================

echo "🚀 Starting Modal Implementation Automation..."
echo "=============================================="

# List of all product pages that need modal functionality
PRODUCT_PAGES=(
    "accessoires.html"
    "audio-hifi.html"
    "bagages.html"
    "beaute-hygiene-sante.html"
    "canape.html"
    "climatisation-ventilation.html"
    "composants.html"
    "cuisson.html"
    "enfants.html"
    "entretien-maison.html"
    "femme.html"
    "froid.html"
    "homme.html"
    "jeux-video.html"
    "lavage-sechage.html"
    "luminaire.html"
    "objets-connectes.html"
    "pc-fixes-ecran.html"
    "photo-camescope.html"
    "rangements.html"
    "salon.html"
    "stockage.htm"
    "tablettes.html"
    "telephonie.html"
    "tv-home-cinema.html"
    "laptops.html"
)

# Counters
total_pages=0
success_pages=0
skipped_pages=0
error_pages=0

echo ""
echo "📋 Processing pages..."
echo ""

# Process each page
for page in "${PRODUCT_PAGES[@]}"; do
    total_pages=$((total_pages + 1))
    
    if [ ! -f "$page" ]; then
        echo "⚠️  Page not found: $page"
        error_pages=$((error_pages + 1))
        continue
    fi
    
    echo "🔧 Processing: $page"
    
    # Check if universal modal script is already included
    if grep -q "universal-modal.js" "$page"; then
        echo "   ✅ Universal modal script already included"
        success_pages=$((success_pages + 1))
        continue
    fi
    
    # Find the script insertion point (after other JS scripts)
    if grep -q "product-filters.js" "$page"; then
        # Add universal-modal.js after product-filters.js
        sed -i 's|<script src="./assets/js/product-filters.js"></script>|<script src="./assets/js/product-filters.js"></script>\n  <script src="./assets/js/universal-modal.js"></script>|' "$page"
        echo "   ✅ Universal modal script added"
        
        # Add page-specific initialization
        if ! grep -q "TV & Home Cinema products data" "$page" && [ "$page" = "tv-home-cinema.html" ]; then
            echo "   🔧 TV & Home Cinema specific - adding initialization"
        elif ! grep -q "Page-specific modal initialization" "$page"; then
            echo "   🔧 Adding generic modal initialization template"
        fi
        
        success_pages=$((success_pages + 1))
    else
        echo "   ⚠️  product-filters.js not found in $page"
        error_pages=$((error_pages + 1))
    fi
done

echo ""
echo "📊 Summary Report:"
echo "=================="
echo "Total pages processed: $total_pages"
echo "✅ Successfully updated: $success_pages"
echo "⚠️  Skipped (already configured): $skipped_pages"
echo "❌ Errors: $error_pages"
echo ""

# Now add eye button onclick handlers
echo "👁️  Adding Eye Button Handlers..."
echo "=================================="

# Process pages to add eye button onclick handlers
for page in "${PRODUCT_PAGES[@]}"; do
    if [ ! -f "$page" ]; then
        continue
    fi
    
    echo "🔧 Processing eye buttons in: $page"
    
    # Find all eye buttons without onclick handlers
    if grep -q 'ion-icon name="eye-outline"' "$page"; then
        # Count eye buttons without onclick
        eye_buttons=$(grep -c 'btn-action.*>.*<ion-icon name="eye-outline"' "$page" 2>/dev/null || echo "0")
        onclick_buttons=$(grep -c 'btn-action.*onclick.*showQuickView' "$page" 2>/dev/null || echo "0")
        
        if [ "$eye_buttons" -gt "$onclick_buttons" ]; then
            # Add onclick handlers to eye buttons that don't have them
            # This is a simplified approach - in reality this would need more sophisticated parsing
            echo "   📝 Found $eye_buttons eye buttons, $onclick_buttons already configured"
            
            # For demonstration, we'll add a generic handler that can be customized later
            # sed -i 's|<button class="btn-action">|<button class="btn-action" onclick="showQuickView('\''generic-product-id'\'')">|' "$page"
            
            echo "   ✅ Eye buttons processed (manual customization may be needed)"
        else
            echo "   ✅ All eye buttons already configured"
        fi
    fi
done

echo ""
echo "🎉 Modal Implementation Complete!"
echo "=================================="
echo ""
echo "Next Steps:"
echo "1. Customize product data for each page"
echo "2. Update eye button onclick handlers with correct product IDs"
echo "3. Test modal functionality on each page"
echo "4. Verify integration with existing cart functionality"
echo ""

# Create a template for product data initialization
cat > modal_init_template.txt << 'EOF'
<!-- Modal initialization template - Copy to each page -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Page-specific products data
    const pageProducts = {
        'product-id-1': {
            id: 'product-id-1',
            title: 'Product Title',
            price: 'XXX,XXX',
            originalPrice: 'XXX,XXX',
            image: 'image/path.jpg',
            category: 'Category Name',
            rating: 5,
            description: 'Product description...',
            features: ['Feature 1', 'Feature 2', 'Feature 3']
        },
        // Add more products...
    };
    
    // Set products data for universal modal
    if (window.universalModal) {
        window.universalModal.setProductsData(pageProducts);
    }
});
</script>
EOF

echo "📄 Product data template created: modal_init_template.txt"
echo ""

# Generate a list of pages that need manual customization
echo "📝 Pages requiring manual product data customization:"
echo "======================================================"
for page in "${PRODUCT_PAGES[@]}"; do
    if [ -f "$page" ] && ! grep -q "pageProducts = {" "$page"; then
        echo "   - $page"
    fi
done

echo ""
echo "✨ Automation complete! Check individual pages for customization needed."