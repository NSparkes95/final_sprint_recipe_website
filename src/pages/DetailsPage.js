// Description: This file contains the main component of the website.
// Name: Nicole Sparkes
// Date: 12/06/2024

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext"; // Import CartContext
import "./DetailsPage.css";

function DetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Access addToCart function from context

  // Fetch recipe details based on the ID
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        setRecipe(data.meals[0]);
      } catch (err) {
        setError("Failed to fetch recipe details. Please try again.");
      }
    };
    fetchRecipeDetails();
  }, [id]);

  // Add to cart handler
  const addToCartHandler = () => {
    if (recipe) {
      // Extract ingredients into an array
      const ingredients = Object.keys(recipe)
        .filter((key) => key.startsWith("strIngredient") && recipe[key])
        .map((key) => recipe[key]);
      addToCart(ingredients); // Use the addToCart function from the context
      alert("Ingredients added to cart!");
    }
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  // Split instructions into steps
  const instructions = recipe.strInstructions
    ? recipe.strInstructions.split(". ").filter((step) => step.trim() !== "")
    : [];

  return (
    <div className="details-page">
      <h1>{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="recipe-image"
      />
      <h2>Ingredients</h2>
      <ul>
        {Object.keys(recipe)
          .filter((key) => key.startsWith("strIngredient") && recipe[key])
          .map((key, index) => (
            <li key={index}>{recipe[key]}</li>
          ))}
      </ul>
      <h2>Instructions</h2>
      <ol className="instructions-list">
        {instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <button className="add-to-favorites-btn" onClick={addToCartHandler}>
        Add Ingredients to Cart
      </button>
    </div>
  );
}

export default DetailsPage;