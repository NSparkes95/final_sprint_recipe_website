import React, { createContext, useState, useContext} from 'react';

const CartContext = createContext ();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (ingredients) => {
        if (Array.isArray(ingredients)) {
          setCart((prevCart) => [...prevCart, ...ingredients]);
        } else {
            console.error('Ingredients must be an array:', ingredients);
        }
      };

    const removeFromCart = (ingredient) => {
        setCart((prevCart) => prevCart.filter((item) => item !== ingredient));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value ={{ cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);