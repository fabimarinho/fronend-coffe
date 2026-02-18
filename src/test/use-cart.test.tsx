import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCart } from "../hooks/useCart";

const success = vi.fn();
const error = vi.fn();

vi.mock("react-hot-toast", () => ({
  toast: {
    success: (...args: unknown[]) => success(...args),
    error: (...args: unknown[]) => error(...args),
  },
}));

describe("useCart", () => {
  beforeEach(() => {
    localStorage.clear();
    success.mockReset();
    error.mockReset();
  });

  it("loads saved cart and normalizes legacy product field", async () => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify([{ id: "1", product: "Cafe", quantity: 2, price: 8 }])
    );

    const { result } = renderHook(() => useCart());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]?.name).toBe("Cafe");
    expect(result.current.totalItems).toBe(2);
  });

  it("adds, updates and removes cart items", async () => {
    const { result } = renderHook(() => useCart());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.addItem({ name: "Latte", quantity: 1, price: 10 });
    });
    expect(result.current.items).toHaveLength(1);

    const id = result.current.items[0]?.id ?? "";
    act(() => {
      result.current.updateQuantity(id, 3);
    });
    expect(result.current.items[0]?.quantity).toBe(3);
    expect(result.current.summary.total).toBe(30);

    act(() => {
      result.current.removeItem(id);
    });
    expect(result.current.items).toHaveLength(0);
  });

  it("rejects invalid quantity boundaries", async () => {
    const { result } = renderHook(() => useCart());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.addItem({ name: "Mocha", quantity: 1, price: 12 });
    });

    const id = result.current.items[0]?.id ?? "";
    act(() => {
      result.current.updateQuantity(id, 0);
    });

    expect(result.current.items[0]?.quantity).toBe(1);
    expect(error).toHaveBeenCalled();
  });
});
