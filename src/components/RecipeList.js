// Description: This file contains the RecipeList component which is responsible for rendering the list of recipes returned from the API.
// Name: Nicole Sparkes
// Date: Dec/10/2024

import React from 'react';
import './RecipeList.css';

function RecipeList({ recipes }) {
    const limitedRecipes = recipes.slice(0, 6); // Limit to 6 recipes

    if (!limitedRecipes.length) {
        return <p>No recipes found. Try searching for something else!</p>;
    }

    return (
        <div className="recipe-list">
            {limitedRecipes.map((recipe) => (
                <div className="recipe-card" key={recipe.idMeal}>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                    <h3>{recipe.strMeal}</h3>
                    <p>Category: {recipe.strCategory}</p>
                    <a href={`/details/${recipe.idMeal}`}>View Recipe</a>
                </div>
            ))}
        </div>
    );
}

export default RecipeList;