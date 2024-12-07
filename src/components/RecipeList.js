import React from 'react';
import './RecipeList.css';

function RecipeList({ recipes }) {
    if (!recipes.length) {
        return <p>No recipes found. Try searching for something else!</p>
    }
    return (
        <div className="recipe-list">
            {recipes.map((recipe) => (
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