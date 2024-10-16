import React from 'react';

const recipes = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    image: 'https://via.placeholder.com/200', // Remplace par une vraie image
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
    image: 'https://via.placeholder.com/200', // Remplace par une vraie image
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
    image: 'https://via.placeholder.com/200', // Remplace par une vraie image
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
];

function RecipeList() {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <img src={recipe.image} alt={recipe.name} className="recipe-image" />
          <div className="recipe-details">
            <h3>{recipe.name}</h3>
            <p><strong>Calories :</strong> {recipe.calories}</p>
            <h4>Ingrédients :</h4>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h4>Instructions :</h4>
            <p>{recipe.instructions}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
