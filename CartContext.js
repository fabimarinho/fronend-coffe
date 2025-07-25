"use client";

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    // Dados iniciais fictícios; substitua pela lógica de adicionar itens no carrinho
    { id: 1, name: "Café com leite", quantity: 1, price: 5.0 },
    { id: 2, name: "Bolo de Morango", quantity: 1, price: 10.0 },
  ]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
