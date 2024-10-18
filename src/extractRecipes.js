const mammoth = require("mammoth");
const fs = require("fs").promises;
const path = require("path");

const inputPath = path.join(__dirname, "document-word-ajout-de-recettes-.docx");
const outputPath = path.join(__dirname, "recipes.json");

async function extractAndSaveRecipe() {
    try {
        console.log("Début du script");
        console.log(`Chemin du fichier Word: ${inputPath}`);
        console.log(`Chemin du fichier de sortie JSON: ${outputPath}`);

        console.log("Vérification de l'existence du fichier Word...");
        await fs.access(inputPath);
        console.log("Le fichier Word existe.");

        console.log("Lecture du fichier Word...");
        const result = await mammoth.extractRawText({ path: inputPath });
        const text = result.value;

        if (!text.trim()) {
            throw new Error("Aucun texte n'a été extrait du fichier Word.");
        }

        // Parsing du texte extrait
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const name = lines[0].replace('Nom de la Recette:', '').trim();
        const ingredientsIndex = lines.findIndex(line => line.includes('Ingrédients:'));
        const instructionsIndex = lines.findIndex(line => line.includes('Instructions:'));

        const ingredients = lines.slice(ingredientsIndex + 1, instructionsIndex)
            .filter(line => line.trim().startsWith('-'))
            .map(line => line.replace('-', '').trim());

        const instructions = lines.slice(instructionsIndex + 1).join('\n');

        const recipe = {
            id: Date.now(), // Générer un ID unique
            name: name,
            image: '', // Vous devrez gérer l'ajout d'images séparément
            calories: 0, // Vous pouvez ajouter cette information dans votre document Word si nécessaire
            ingredients: ingredients,
            instructions: instructions
        };

        console.log("Recette extraite :", JSON.stringify(recipe, null, 2));

        // Lire les recettes existantes
        let recipes = [];
        try {
            const existingData = await fs.readFile(outputPath, 'utf8');
            recipes = JSON.parse(existingData);
        } catch (error) {
            console.log("Aucun fichier de recettes existant trouvé. Création d'un nouveau fichier.");
        }

        // Ajouter la nouvelle recette
        recipes.push(recipe);

        // Écrire toutes les recettes dans le fichier
        console.log("Écriture du fichier JSON...");
        await fs.writeFile(outputPath, JSON.stringify(recipes, null, 2));
        console.log(`Recettes enregistrées dans ${outputPath}`);

        console.log("Fin du script");
    } catch (err) {
        console.error("Erreur lors du traitement :", err);
    }
}

extractAndSaveRecipe();