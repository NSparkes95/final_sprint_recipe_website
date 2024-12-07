import React, { useEffect, useState } from 'react';
import RecipeList from '../components/RecipeList';
import SearchBar from '../components/SearchBar';
import { fetchRecipes } from '../api/recipesApi';


function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchRandomRecipes = async (query = '') => {
        setLoading(true);
        setError('');
        try {
            const randomRecipes = await fetchRecipes(); // Call API to get recipes
            setRecipes(randomRecipes);
        } catch (error) {
            setError('Error fetching recipes. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomRecipes(); // Fetch recipes when the page loads
    }, []);

    return (
        <div>
            <SearchBar onSearch={fetchRandomRecipes} />
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <RecipeList recipes={recipes} />
        </div>
    );
}

export default HomePage;