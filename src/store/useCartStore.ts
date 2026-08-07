"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    totalItems: () => number;
    subtotal: () => number;
}

export const SHIPPING_COST = 15000;
export const TAX_RATE = 0.11;

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addToCart: (item, quantity = 1) =>
                set((state) => {
                    const existing = state.items.find((i) => i.id === item.id);
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id
                                    ? { ...i, quantity: i.quantity + quantity }
                                    : i
                            ),
                            isOpen: true,
                        };
                    }
                    return {
                        items: [...state.items, { ...item, quantity }],
                        isOpen: true,
                    };
                }),

            removeFromCart: (id) =>
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id),
                })),

            updateQuantity: (id, quantity) =>
                set((state) => {
                    if (quantity <= 0) {
                        return { items: state.items.filter((i) => i.id !== id) };
                    }
                    return {
                        items: state.items.map((i) =>
                            i.id === id ? { ...i, quantity } : i
                        ),
                    };
                }),

            clearCart: () => set({ items: [] }),

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            totalItems: () =>
                get().items.reduce((sum, item) => sum + item.quantity, 0),

            subtotal: () =>
                get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }),
        {
            name: "web-dagang-cart",
        }
    )
);