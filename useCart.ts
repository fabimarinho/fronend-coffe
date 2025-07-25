"use client";

import { useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '@/types';

const CART_STORAGE_KEY = 'coffee-cart-items';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar itens do localStorage na inicialização
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(CART_STORAGE_KEY);
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        setItems(parsedItems);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Salvar no localStorage sempre que items mudar
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Erro ao salvar carrinho:', error);
      }
    }
  }, [items, isLoading]);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Item já existe, atualizar quantidade
        return currentItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Novo item
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          price: product.price,
        };
        return [...currentItems, newItem];
      }
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(currentItems =>
      currentItems.filter(item => item.product.id !== productId)
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  const getItemQuantity = useCallback((productId: string) => {
    const item = items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }, [items]);

  return {
    items,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemQuantity,
  };
}

