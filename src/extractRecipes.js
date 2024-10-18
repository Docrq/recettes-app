const fs = require('fs');
const mammoth = require('mammoth');
const path = require('path');

// Chemins des fichiers
const wordFilePath = path.join(__dirname, 'documents', 'document-word-ajout-de-recettes-.docx');
const jsonFilePath = path.join(__dirname, 'recipes.json');

// Fonction pour parser la recette
const parseRecipe = (text) => {
  const lines = text.split('\n');
  const name = lines[0].replace('Nom de la Recette: ', '').trim();
  const ingredients = lines.slice(3, lines.indexOf('Instructions:')).map(line => line.replace('- ', '').trim());
  const instructions = lines.slice(lines.indexOf('Instructions:') + 1).join('\n').trim();

  return {
    name,
    ingredients,
    instructions,
  };
};

// Fonction pour extraire et sauvegarder la recette
const extractAndSaveRecipe = () => {
  mammoth.extractRawText({ path: wordFilePath })
    .then(result => {
      const text = result.value;
      console.log("Texte extrait :", text);

      // Traiter le texte extrait pour construire la recette
      const recipe = parseRecipe(text);
      console.log("Recette à enregistrer :", recipe); // Log pour vérifier la recette

      // Lire les recettes existantes
      fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
          console.error('Erreur lors de la lecture de recipes.json:', err);
          return;
        }

        let recipes = [];
        if (data) {
          try {
            recipes = JSON.parse(data);
          } catch (e) {
            console.error('Erreur de parsing JSON:', e);
            return;
          }
        }

        // Ajout de la nouvelle recette
        recipes.push(recipe);
        console.log("Recettes après ajout :", recipes); // Log pour vérifier le tableau de recettes

        // Sauvegarder dans recipes.json
        fs.writeFile(jsonFilePath, JSON.stringify(recipes, null, 2), (err) => {
          if (err) {
            console.error('Erreur lors de l\'écriture dans recipes.json:', err);
          } else {
            console.log('Recette enregistrée dans recipes.json');
          }
        });
      });
    })
    .catch(err => {
      console.error('Erreur lors de l\'extraction:', err);
    });
};

// Surveiller le fichier Word
fs.watch(wordFilePath, (eventType) => {
  if (eventType === 'change') {
    console.log('Le fichier a été modifié, extraction en cours...');
    extractAndSaveRecipe();
  }
});

// Appel initial pour extraire la recette
extractAndSaveRecipe();
