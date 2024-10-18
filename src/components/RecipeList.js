import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';

// Importation des images (si nécessaire pour les recettes par défaut)
import spaghettiImage from '../images/spaghetti-carbonara.webp';
import saladeCesarImage from '../images/salade-cesar.webp';
import pizzaMargheritaImage from '../images/pizza-margherita.webp';
import saladeConcombreImage from '../images/salade-concombre.webp';

// Définition des recettes par défaut
const defaultRecipes = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    image: spaghettiImage,
    calories: 400,
    ingredients: [
      '200g de spaghetti',
      '100g de lardons',
      '2 œufs',
      '50g de parmesan',
      'Sel et poivre',
    ],
    instructions: 'Faire cuire les spaghetti. Dans une poêle, faire revenir les lardons. Battre les œufs et ajouter le parmesan. Mélanger le tout et servir chaud.',
  },
  {
    id: 2,
    name: 'Salade César',
    image: saladeCesarImage,
    calories: 300,
    ingredients: [
      '1 romaine',
      '100g de poulet grillé',
      '30g de parmesan',
      'Croutons',
      'Sauce César',
    ],
    instructions: 'Laver la romaine et la couper. Ajouter le poulet, le parmesan et les croutons. Verser la sauce et mélanger.',
  },
  {
    id: 3,
    name: 'Pizza Margherita',
    image: pizzaMargheritaImage,
    calories: 600,
    ingredients: [
      '1 pâte à pizza',
      '200g de tomate',
      '150g de mozzarella',
      'Basilic frais',
      'Huile d\'olive',
    ],
    instructions: 'Étaler la pâte, ajouter la tomate et la mozzarella. Cuire au four pendant 15 minutes à 220°C. Ajouter le basilic et l\'huile d\'olive avant de servir.',
  },
  {
    id: 4,
    name: 'Salade de concombre',
    image: saladeConcombreImage,
    calories: 70,
    ingredients: [
      '100g de concombre',
      '100g de tomates cerise'
    ],
    instructions: 'Laver et couper le concombre et les tomates. Mélanger les deux et servir frais.',
  },
];

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Charger les recettes depuis le fichier JSON
    fetch('/recipes.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des recettes');
        }
        return response.json();
      })
      .then(data => {
        console.log('Données chargées:', data);
        // Vérifiez que les données sont bien un tableau
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error('Les données chargées ne sont pas un tableau. Utilisation des recettes par défaut.');
          setRecipes(defaultRecipes);
        }
      })
      .catch(error => {
        console.error('Erreur lors du chargement des recettes:', error);
        // Utilisation des recettes par défaut en cas d'erreur
        setRecipes(defaultRecipes);
      });
  }, []);

  return (
    <div className="recipe-grid">
      {Array.isArray(recipes) && recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} />
        ))
      ) : (
        <p>Aucune recette trouvée.</p>
      )}
    </div>
  );
}

export default RecipeList;
