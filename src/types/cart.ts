// src/types/cart.ts
export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}
