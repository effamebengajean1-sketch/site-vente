#!/bin/bash

# Script pour ajouter le système de filtres sur toutes les pages de produits
# NexusChop - Automatisation des filtres

echo "🚀 Ajout du système de filtres sur toutes les pages de produits..."

# Liste des pages de produits (catégories et sous-catégories)
PRODUCT_PAGES=(
    "accessoires.html"
    "audio-hifi.html"
    "bagages.html"
    "beaute-hygiene-sante.html"
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
)

# Compteur
count=0
success=0
skipped=0

# Parcourir chaque page
for page in "${PRODUCT_PAGES[@]}"; do
    count=$((count + 1))
    
    if [ ! -f "$page" ]; then
        echo "⚠️  Page non trouvée: $page"
        skipped=$((skipped + 1))
        continue
    fi
    
    # Vérifier si le script est déjà présent
    if grep -q "product-filters.js" "$page"; then
        echo "✓ $page - Déjà configuré"
        skipped=$((skipped + 1))
        continue
    fi
    
    # Vérifier si la page a une grille de produits
    if ! grep -q "product-grid" "$page"; then
        echo "⚠️  $page - Pas de grille de produits détectée"
        skipped=$((skipped + 1))
        continue
    fi
    
    # Trouver la ligne avant </body>
    if grep -q "comprehensive-search.js" "$page"; then
        # Ajouter après comprehensive-search.js
        sed -i 's|<script src="./assets/js/comprehensive-search.js"></script>|<script src="./assets/js/comprehensive-search.js"></script>\n  <script src="./assets/js/product-filters.js"></script>|' "$page"
        echo "✅ $page - Filtres ajoutés"
        success=$((success + 1))
    elif grep -q "panier-integration.js" "$page"; then
        # Ajouter avant panier-integration.js
        sed -i 's|<script src="./assets/js/panier-integration.js">|<script src="./assets/js/product-filters.js"></script>\n  <script src="./assets/js/panier-integration.js">|' "$page"
        echo "✅ $page - Filtres ajoutés"
        success=$((success + 1))
    else
        echo "⚠️  $page - Point d'insertion non trouvé"
        skipped=$((skipped + 1))
    fi
done

echo ""
echo "📊 Résumé:"
echo "   Total de pages: $count"
echo "   ✅ Succès: $success"
echo "   ⚠️  Ignorées: $skipped"
echo ""
echo "✨ Terminé!"
