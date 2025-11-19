#!/bin/bash

# Script pour ajouter les scripts panier manquants aux pages de sous-catégories
# Ce script ajoute panier.js et panier-integration.js aux pages qui ne les ont pas

echo "=== Correction des scripts panier pour toutes les pages ==="

# Liste des pages à corriger (exclut index.html)
pages=(
    "objets-connectes.html"
    "audio-hifi.html" 
    "tv-home-cinema.html"
    "laptops.html"
    "pc-fixes-ecran.html"
    "composants.html"
    "stockage.htm"
    "femme.html"
    "homme.html"
    "enfants.html"
    "bagages.html"
    "lavage-sechage.html"
    "froid.html"
    "cuisson.html"
    "entretien-maison.html"
    "beaute-hygiene-sante.html"
    "climatisation-ventilation.html"
)

for page in "${pages[@]}"; do
    if [ -f "$page" ]; then
        echo "Correction de $page..."
        
        # Vérifier si le script panier.js est déjà présent
        if ! grep -q "panier.js" "$page"; then
            echo "  -> Ajout de panier.js"
            # Ajouter panier.js avant </body>
            sed -i 's|</body>|  <script src="./assets/js/panier.js"></script>\n</body>|' "$page"
        else
            echo "  -> panier.js déjà présent"
        fi
        
        # Vérifier si le script panier-integration.js est déjà présent
        if ! grep -q "panier-integration.js" "$page"; then
            echo "  -> Ajout de panier-integration.js"
            # Ajouter panier-integration.js avant </body>
            sed -i 's|</body>|  <script src="./assets/js/panier-integration.js"></script>\n</body>|' "$page"
        else
            echo "  -> panier-integration.js déjà présent"
        fi
    else
        echo "Page $page non trouvée"
    fi
done

echo "=== Correction terminée ==="