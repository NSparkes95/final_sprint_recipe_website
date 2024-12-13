// Description: This page displays the user's cart. It shows the ingredients that the user has added to their cart. The user can remove ingredients from their cart or clear their cart.
// Name: Nicole Sparkes
// Date: 12/06/2024

import React from "react";
import { useCart } from "../Context/CartContext"; // Assuming this context handles cart state
import "./CartPage.css";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = React.useState(false);

  // Calculate subtotal, HST, and total
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const HST_RATE = 0.13;
  const hst = subtotal * HST_RATE;
  const total = subtotal + hst;

  const handleCheckout = () => {
    setShowCheckout(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowCheckout(false); // Close the modal
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    alert("Checkout Complete! Thank you for your order.");
    clearCart(); // Clear the cart upon successful checkout
    setShowCheckout(false); // Close the modal
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      {cart.length > 0 ? (
        <div>
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li className="cart-item" key={index}>
                <span className="cart-item-name">{item.title}</span>
                <span className="cart-item-price">${item.price.toFixed(2)}</span>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>HST (13%): ${hst.toFixed(2)}</p>
            <p>Total: ${total.toFixed(2)}</p>
          </div>
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="checkout-modal">
          <div className="checkout-modal-content">
            <h2>Checkout</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Name:
                <input type="text" name="name" required />
              </label>
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <label>
                Address:
                <textarea name="address" required></textarea>
              </label>
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">
                  Complete Order
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
