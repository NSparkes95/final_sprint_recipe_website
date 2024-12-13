import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      setFavorites((prev) => [...prev, recipe]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
