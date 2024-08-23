// src/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemExistIndex = prevCart.findIndex((i) => i._id === item._id);

      if (itemExistIndex !== -1) {
        // If the item already exists in the cart, update the quantity
        const updatedCart = [...prevCart];
        updatedCart[itemExistIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        // Add the new item to the cart
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
