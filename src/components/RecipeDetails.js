import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5001/recipes/${id}`)
            .then((res) => res.json())
            .then((data) => setRecipe(data))
            .catch((err) => console.error('Error fetching recipe', error));
    }, [id]);

    const addToFavourites = () => {
        fetch('http://localhost:5001/favourites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipe),
        });
        alert('Recipe added to favourites!');
    };

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className="recipe-details">
            <h1>Recipe Details for ID: {id}</h1>
            <h2>{recipe.title}</h2>
            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>
            <button onClick={addToFavourites}>Add to Favourites</button>
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default RecipeDetails;