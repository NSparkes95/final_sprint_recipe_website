import React, { useEffect, useState } from 'react';
import './FavoritesPage.css'; // Keep this if you have specific styles for FavoritesPage

function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);

    // Fetch favorite recipes
    const fetchFavorites = () => {
        fetch('http://localhost:5001/favorites')
            .then((res) => res.json())
            .then((data) => setFavorites(data))
            .catch((err) => console.error('Error fetching favorites:', err));
    };

    // Remove recipe from favorites
    const removeFromFavorites = (id) => {
        fetch(`http://localhost:5001/favorites/${id}`, { method: 'DELETE' })
            .then(() => fetchFavorites())
            .catch((err) => console.error('Error removing favorite:', err));
    };

    // Fetch favorites when the page loads
    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div className="main-content">
            <h1>Your Favorite Recipes</h1>
            {favorites.length > 0 ? (
                <ul>
                    {favorites.map((recipe) => (
                        <li key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <button onClick={() => removeFromFavorites(recipe.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You haven't added any favorite recipes yet!</p>
            )}
        </div>
    );
}

export default FavoritesPage;
