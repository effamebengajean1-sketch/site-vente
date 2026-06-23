#!/bin/bash

# Fix Universal Modal Data Integration
# This script adds missing product data to all pages that have modal buttons but no product data

echo "🔧 Fixing Universal Modal Data Integration..."
echo "=============================================="

# Pages that already have proper product data integration
COMPLETE_PAGES=(
    "laptops.html"
    "tv-home-cinema.html" 
    "jeux-video.html"
)

# Function to add product data to a page
add_product_data() {
    local page=$1
    local product_data=$2
    local data_call=$3
    
    echo "📝 Adding product data to $page..."
    
    # Check if page already has product data
    if grep -q "const.*Products.*=" "$page" || grep -q "setProductsData" "$page"; then
        echo "✅ $page already has product data integration"
        return 0
    fi
    
    # Create temporary file
    temp_file=$(mktemp)
    
    # Find the position before the closing </body> tag
    awk -v product_data="$product_data" -v data_call="$data_call" '
    /<\/body>/ {
        print product_data
        print data_call
        print ""
    }
    {print}
    ' "$page" > "$temp_file"
    
    # Replace original file
    mv "$temp_file" "$page"
    
    echo "✅ Product data added to $page"
}

# Generate product data for each page type

# Canapé/Luminaire/Rangements - Furniture category
furniture_data='
        // Furniture products data for modal
        const furnitureProducts = {
            "canape-fixe-confort": {
                id: "canape-fixe-confort",
                title: "Canapé Fixe Confort Premium",
                price: "XAF 1,300,000",
                originalPrice: "XAF 1,638,000",
                image: "images arbre/Canapés fixe.jpg",
                category: "Canapé",
                rating: 5,
                description: "Canapé fixe confort premium avec finition cuir et structure en bois massif.",
                features: ["Cuir véritable", "Structure bois massif", "Confort premium", "Garantie 5 ans"]
            },
            "canape-royale": {
                id: "canape-royale", 
                title: "Canapé Royale",
                price: "XAF 145,000",
                originalPrice: "XAF 175,000",
                image: "images_electro_menager/SALON ROYALE.jpg",
                category: "Canapés",
                rating: 4,
                description: "Canapé royal avec design moderne et confort optimal.",
                features: ["Design moderne", "Confort optimal", "Tissu de qualité", "Garantie 3 ans"]
            },
            "fauteuil-relax": {
                id: "fauteuil-relax",
                title: "Fauteuil Relax Design",
                price: "XAF 458,000", 
                originalPrice: "XAF 589,000",
                image: "images arbre/fauteuils.jpeg",
                category: "Fauteuils",
                rating: 5,
                description: "Fauteuil relax design avec mécanisme de relaxation.",
                features: ["Mécanisme relaxation", "Design élégant", "Tissu premium", "Garantie 3 ans"]
            },
            "decoration-murale": {
                id: "decoration-murale",
                title: "Décoration Murale Art Moderne", 
                price: "XAF 58,900",
                originalPrice: "XAF 85,000",
                image: "images arbre/decoration muraille.jpg",
                category: "Décoration",
                rating: 4,
                description: "Décoration murale art moderne pour intérieur contemporain.",
                features: ["Art moderne", "Matériaux nobles", "Installation facile", "Design unique"]
            }
        };
        
        // Initialize modal with furniture products
        if (window.universalModal) {
            window.universalModal.setProductsData(furnitureProducts);
        }'

furniture_call='
        // Initialize modal with furniture products
        if (window.universalModal) {
            window.universalModal.setProductsData(furnitureProducts);
        }'

# Kitchen/Appliances product data
appliance_data='
        // Appliance products data for modal
        const applianceProducts = {
            "machine-a-laver-lg": {
                id: "machine-a-laver-lg",
                title: "Machine à Laver LG 9kg",
                price: "XAF 485,000",
                originalPrice: "XAF 620,000", 
                image: "Projet 1 - MarketPlace/images_electromenager/images/MACHINE A LAVER.jpg",
                category: "Lavage et séchage",
                rating: 4,
                description: "Machine à laver LG 9kg avec technologie AI Direct Drive.",
                features: ["Capacité 9kg", "Technologie AI", "Efficacité énergétique A+++", "Garantie 5 ans"]
            },
            "fer-a-repasser-samsung": {
                id: "fer-a-repasser-samsung",
                title: "Fer à Repasser Samsung",
                price: "XAF 42,500",
                image: "Projet 1 - MarketPlace/images_electromenager/images/FER A REPASSER.jpg", 
                category: "Entretien maison",
                rating: 4,
                description: "Fer à Repasser Samsung avec technologie anti-calcaire.",
                features: ["Technologie anti-calcaire", "Sole anti-adhérente", "Vapeur continue", "Garantie 2 ans"]
            },
            "ventilateur-bosch": {
                id: "ventilateur-bosch",
                title: "Ventilateur de Séchage Bosch", 
                price: "XAF 68,500",
                image: "Projet 1 - MarketPlace/images_electromenager/images/VENTILLATEURS.jpg",
                category: "Climatisation, ventilation",
                rating: 4,
                description: "Ventilateur de séchage Bosch pour sèche-linge.",
                features: ["Technologie Bosch", "Efficacité énergétique", "Installation facile", "Garantie 3 ans"]
            }
        };
        
        // Initialize modal with appliance products
        if (window.universalModal) {
            window.universalModal.setProductsData(applianceProducts);
        }'

# Fix each furniture page
echo "🏠 Fixing furniture pages..."
add_product_data "canape.html" "$furniture_data" "$furniture_call"
add_product_data "luminaire.html" "$furniture_data" "$furniture_call" 
add_product_data "rangements.html" "$furniture_data" "$furniture_call"

# Fix each appliance page
echo "🔧 Fixing appliance pages..."
add_product_data "lavage-sechage.html" "$appliance_data" ""
add_product_data "froid.html" "$appliance_data" ""

echo "✅ Modal data integration fix completed!"
echo "All pages now have proper product data for the universal modal."