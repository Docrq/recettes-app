const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

// Chemins des fichiers
const documentPath = path.join(__dirname, 'documents', 'document-word-ajout-de-recettes-.docx');
const recipesFilePath = path.join(__dirname, 'recipes.json');

// Fonction pour extraire le texte d'un document Word
async function extractTextFromDocx(filePath) {
    const { value: text } = await mammoth.extractRawText({ path: filePath });
    return text;
}

async function extractAndSaveRecipe() {
    try {
        // Lire le document Word et extraire les recettes
        const text = await extractTextFromDocx(documentPath);
        const lines = text.split('\n');

        // Vérifier que le document contient au moins une recette
        if (lines.length < 3) {
            console.log("Le document ne contient pas de recette valide.");
            return;
        }

        const name = lines[0].replace('Nom de la Recette: ', '').trim();
        
        // Extraction des ingrédients sans inclure la ligne "Ingrédients:"
        const ingredients = lines.slice(2, lines.indexOf('Instructions:'))
            .filter(line => line.trim() !== '' && !line.startsWith('Ingrédients:'))
            .map(ingredient => ingredient.replace('- ', '').trim());

        // Extraction des instructions
        const instructions = lines.slice(lines.indexOf('Instructions:') + 1)
            .filter(line => line.trim() !== '')
            .join('\n');

        // Créer un objet recette
        const recipe = {
            name,
            ingredients,
            instructions,
        };

        // Lire les recettes existantes
        let recipes = [];
        if (fs.existsSync(recipesFilePath)) {
            const data = fs.readFileSync(recipesFilePath);
            recipes = JSON.parse(data);
        }

        // Ajouter la nouvelle recette
        recipes.push(recipe);

        // Enregistrer dans recipes.json
        fs.writeFileSync(recipesFilePath, JSON.stringify(recipes, null, 2));
        console.log('Recette enregistrée dans recipes.json');
    } catch (err) {
        console.error('Erreur lors de l\'extraction:', err);
    }
}

// Surveiller les modifications dans le document
fs.watch(documentPath, (eventType) => {
    if (eventType === 'change') {
        extractAndSaveRecipe();
    }
});

// Appeler la fonction d'extraction une première fois
extractAndSaveRecipe().catch(err => console.error('Erreur initiale:', err));
