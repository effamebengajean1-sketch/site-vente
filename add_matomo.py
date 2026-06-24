import os
import re
from pathlib import Path

# Votre code Matomo à insérer
MATOMO_CODE = """<!-- Matomo -->
<script>
  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://effa.matomo.cloud/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '3']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='https://cdn.matomo.cloud/effa.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Matomo Code -->"""

def add_matomo_to_html(file_path, backup=True):
    """
    Ajoute le code Matomo dans un fichier HTML juste avant </head>
    
    Args:
        file_path: Chemin vers le fichier HTML
        backup: Créer une sauvegarde (.bak) du fichier original
    """
    try:
        # Lire le contenu du fichier
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifier si le code Matomo est déjà présent
        if '<!-- Matomo -->' in content:
            print(f"⚠️  {file_path} - Code Matomo déjà présent, ignoré")
            return False
        
        # Vérifier si la balise </head> existe
        if '</head>' not in content:
            print(f"❌  {file_path} - Balise </head> non trouvée, ignoré")
            return False
        
        # Créer une sauvegarde
        if backup:
            backup_path = file_path + '.bak'
            with open(backup_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"📁  Sauvegarde créée : {backup_path}")
        
        # Insérer le code avant </head>
        # Utiliser re.sub pour une insertion propre
        new_content = re.sub(
            r'</head>',
            f'{MATOMO_CODE}\n</head>',
            content,
            flags=re.IGNORECASE
        )
        
        # Écrire le nouveau contenu
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅  {file_path} - Code Matomo ajouté avec succès")
        return True
        
    except Exception as e:
        print(f"❌  Erreur avec {file_path}: {str(e)}")
        return False

def process_directory(directory='.', extensions=('.html', '.htm'), recursive=True):
    """
    Parcourt un dossier et ajoute Matomo à tous les fichiers HTML
    
    Args:
        directory: Dossier à parcourir
        extensions: Extensions de fichiers à traiter
        recursive: Parcourir les sous-dossiers
    """
    files_processed = 0
    files_modified = 0
    
    # Parcourir le dossier
    path = Path(directory)
    
    if recursive:
        # Parcourir récursivement
        files = path.rglob('*')
    else:
        # Seulement le dossier courant
        files = path.glob('*')
    
    for file_path in files:
        # Vérifier si c'est un fichier HTML
        if file_path.is_file() and file_path.suffix.lower() in extensions:
            if add_matomo_to_html(str(file_path)):
                files_modified += 1
            files_processed += 1
    
    print(f"\n📊  Résumé : {files_modified} fichiers modifiés sur {files_processed} traités")
    return files_modified

# ============ EXÉCUTION ============

if __name__ == "__main__":
    print("=" * 60)
    print("🔍  Recherche et ajout du code Matomo dans les fichiers HTML")
    print("=" * 60)
    
    # Option 1: Traiter le dossier courant et tous les sous-dossiers
    process_directory('.')
    
    # Option 2: Traiter un dossier spécifique
    # process_directory('/chemin/vers/votre/dossier')
    
    # Option 3: Traiter un seul fichier
    # add_matomo_to_html('index.html')
    
    print("\n✨  Terminé !")
