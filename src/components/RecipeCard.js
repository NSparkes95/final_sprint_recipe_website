import React from 'react';
import './RecipeCard.css'; // Ensure this file exists

function RecipeCard({ recipe, onRemove }) {
    return (
        <div className="recipe-card">
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            <h3>{recipe.title}</h3>
            <button className="remove-button" onClick={onRemove}>
                Remove
            </button>
        </div>
    );
}

export default RecipeCard;