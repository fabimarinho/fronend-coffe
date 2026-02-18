import { describe, expect, it } from "vitest";
import { isOrderStatus, parseDateFilter, sanitizeOrderItems } from "../lib/orders";

describe("orders helpers", () => {
  it("validates allowed statuses", () => {
    expect(isOrderStatus("pending")).toBe(true);
    expect(isOrderStatus("paid")).toBe(true);
    expect(isOrderStatus("delivered")).toBe(true);
    expect(isOrderStatus("unknown")).toBe(false);
  });

  it("parses only valid date filters", () => {
    expect(parseDateFilter("2026-01-01")).toBeInstanceOf(Date);
    expect(parseDateFilter("")).toBeNull();
    expect(parseDateFilter("invalid-date")).toBeNull();
  });

  it("sanitizes valid order items", () => {
    const items = sanitizeOrderItems([
      { name: "Espresso", quantity: 2, price: 9 },
      { name: "", quantity: 1, price: 1 },
      { name: "Mocha", quantity: 0, price: 10 },
      { name: "Latte", quantity: 1, price: -1 },
    ]);

    expect(items).toEqual([{ name: "Espresso", quantity: 2, price: 9 }]);
  });
});
