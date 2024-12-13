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
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details");
        }
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
      const ingredients = Array.from({ length: 20}, (_, i) =>
        recipe[`strIngredient${i + 1}`]
      ). filter (Boolean);
      addToCart(ingredients);
      alert("Ingredients add to cart!");
    }
  };

  // Add to favourites handler
  const addToFavorites = async () => {
    try {
      const response = await fetch("http://localhost:5001/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: recipe.idMeal,
          title: recipe.strMeal,
          image: recipe.strMealThumb,
        }),
      });
      if (response.ok) {
        alert("Recipe added to favourites!");
      } else {
        const errorText = await response.text();
        alert(`Failed to add to favourites: ${errorText}`);
      }
    } catch (err) {
      console.error("Error adding to favourites:", err);
    }
  };

  if (error) {
    return <p className="error" aria-live="polite">{error}</p>;
  }

  if (!recipe) {
    return <p aria-live="polite">Loading...</p>;
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
        {Array.from({ length: 20 }, (_, i) =>
          recipe[`strIngredient${i + 1}`]
        )
          .filter(Boolean)
          .map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
      </ul>
      <h2>Instructions</h2>
      <ol className="instructions-list">
        {instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <div className="buttons-container">
        {/* Add Ingredients to Cart */}
        <button className="add-to-cart-btn" onClick={addToCartHandler}>
          Add Ingredients to Cart
        </button>

        {/* Add to Favourites */}
        <button className="add-to-favorites-btn" onClick={addToFavorites}>
          Add to Favourites
        </button>
      </div>

    </div>
  );
}

export default DetailsPage;