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
        console.log("Texte extrait :", text);

        if (!text.trim()) {
            throw new Error("Aucun texte n'a été extrait du fichier Word.");
        }

        const recipe = {
            name: "Tarte aux Pommes",
            ingredients: [
                "4 pommes",
                "200g de sucre",
                "1 pâte brisée",
                "50g de beurre"
            ],
            instructions: text
        };

        console.log("Recette à enregistrer :", JSON.stringify(recipe, null, 2));

        console.log("Écriture du fichier JSON...");
        await fs.writeFile(outputPath, JSON.stringify(recipe, null, 2));
        console.log(`Recette enregistrée dans ${outputPath}`);
        
        console.log("Fin du script");
    } catch (err) {
        console.error("Erreur lors du traitement :", err);
    }
}

extractAndSaveRecipe();