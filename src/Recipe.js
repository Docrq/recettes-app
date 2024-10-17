import React from 'react';

function Recipe({ recipe }) {
  return (
    <div className="recipe-card">
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
  );
}

export default Recipe;
