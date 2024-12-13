import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price || 0), 0);

    // Calculate HST (13% for example)
    const HST_RATE = 0.15;
    const hst = subtotal * HST_RATE;

    // Calculate total
    const total = subtotal + hst;

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, subtotal, hst, total }}
        >
            {children}
        </CartContext.Provider>
    );
}
