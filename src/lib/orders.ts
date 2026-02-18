export const ORDER_STATUSES = ["pending", "paid", "delivered"] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export function isOrderStatus(value: string): value is OrderStatus {
  return ORDER_STATUSES.includes(value as OrderStatus);
}

export type OrderItemInput = {
  name: string;
  quantity: number;
  price: number;
};

export function parseDateFilter(value: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function sanitizeOrderItems(value: unknown): OrderItemInput[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => ({
      name: String((item as { name?: unknown })?.name ?? "").trim(),
      quantity: Number((item as { quantity?: unknown })?.quantity ?? 0),
      price: Number((item as { price?: unknown })?.price ?? -1),
    }))
    .filter(
      (item) =>
        item.name.length > 0 &&
        Number.isFinite(item.quantity) &&
        Number.isFinite(item.price) &&
        item.quantity > 0 &&
        item.price >= 0
    );
}
