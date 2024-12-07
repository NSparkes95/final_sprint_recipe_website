import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1'; // Replace with your API

// Fetch recipes based on a search query
export const fetchRecipes = async () => {
    try {
        const requests = Array.from({ length: 5 }, () => axios.get(`${API_BASE_URL}/random.php`));
        const responses = await Promise.all(requests);
        return responses.map((res) => res.data.meals[0]); // Combine all random recipes into an array
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

// Fetch detailed information about a recipe by ID
export const fetchRecipeDetails = async(id) => {
    try {
        const res = await axios.get (`${API_BASE_URL}/lookup.php?i=${id}`);
        return res.data.meals[0]; // Return the first meal object
    } catch (err) {
        console.error('Error fetching recipe details:', err);
        throw err;
    }
};