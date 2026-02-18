"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import type { CartItem, CartSummary } from "@/types/cart";

const STORAGE_KEY = "cartItems";
const SHIPPING_COST = 0;

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart) as Array<CartItem & { product?: string }>;
        const normalized = parsed.map((item) => ({
          ...item,
          name: item.name || item.product || "Produto",
        }));
        setItems(normalized);
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      toast.error("Erro ao carregar carrinho");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoading]);

  const addItem = useCallback((newItem: Omit<CartItem, "id">) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.name === newItem.name);

      if (existingItem) {
        return prev.map((item) =>
          item.id === existingItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }

      const id = Date.now().toString() + Math.random().toString(36).substring(2, 11);
      return [...prev, { ...newItem, id }];
    });

    toast.success(`${newItem.name} adicionado ao carrinho`);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const item = prev.find((currentItem) => currentItem.id === id);
      if (item) {
        toast.success(`${item.name} removido do carrinho`);
      }
      return prev.filter((currentItem) => currentItem.id !== id);
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1 || quantity > 99) {
      toast.error("A quantidade deve estar entre 1 e 99");
      return;
    }

    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    toast.success("Carrinho limpo");
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const shipping = SHIPPING_COST;
  const discount = 0;
  const total = subtotal + shipping - discount;
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const summary: CartSummary = {
    totalItems,
    totalPrice: total,
    subtotal,
    shipping,
    discount,
    total,
  };

  return {
    items,
    summary,
    totalItems,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}