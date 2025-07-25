"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useCart } from '@/hooks/useCart';
import { CartContextType } from '@/types';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const cartHook = useCart();

  const contextValue: CartContextType = {
    items: cartHook.items,
    addItem: cartHook.addItem,
    removeItem: cartHook.removeItem,
    updateQuantity: cartHook.updateQuantity,
    clearCart: cartHook.clearCart,
    getTotalItems: cartHook.getTotalItems,
    getTotalPrice: cartHook.getTotalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext deve ser usado dentro de um CartProvider');
  }
  return context;
}

