"use client";

import * as React from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

interface AddToCartSectionProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
        stock: number;
    };
}

export function AddToCartSection({ product }: AddToCartSectionProps) {
    const [quantity, setQuantity] = React.useState(1);
    const addToCart = useCartStore((s) => s.addToCart);

    const isOutOfStock = product.stock <= 0;
    const maxQty = Math.max(product.stock, 1);

    const decrement = () => setQuantity((q) => Math.max(1, q - 1));
    const increment = () => setQuantity((q) => Math.min(maxQty, q + 1));

    const handleAddToCart = () => {
        try {
            addToCart(
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                },
                quantity
            );
        } catch (error) {
            console.error("Gagal menambahkan ke keranjang:", error);
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Stepper kuantitas — double bezel */}
            <div className="flex items-center gap-1 rounded-full bg-secondary/60 p-1 ring-1 ring-border/50">
                <button
                    type="button"
                    onClick={decrement}
                    disabled={quantity <= 1}
                    aria-label="Kurangi kuantitas"
                    className="flex size-9 items-center justify-center rounded-full transition-colors duration-300 hover:bg-card disabled:pointer-events-none disabled:opacity-40"
                >
                    <Minus className="size-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">
                    {quantity}
                </span>
                <button
                    type="button"
                    onClick={increment}
                    disabled={quantity >= maxQty}
                    aria-label="Tambah kuantitas"
                    className="flex size-9 items-center justify-center rounded-full transition-colors duration-300 hover:bg-card disabled:pointer-events-none disabled:opacity-40"
                >
                    <Plus className="size-3.5" />
                </button>
            </div>

            {/* CTA utama — button-in-button */}
            <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={cn(
                    "group flex h-11 flex-1 items-center justify-center gap-3 rounded-full bg-primary pl-6 pr-1.5 text-sm font-medium text-primary-foreground",
                    "transition-all duration-500 ease-out-expo active:scale-[0.98]",
                    "disabled:pointer-events-none disabled:opacity-40"
                )}
            >
                {isOutOfStock ? "Stok Habis" : "Tambah ke Keranjang"}
                {!isOutOfStock && (
                    <span className="flex size-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-out-expo group-hover:scale-105">
                        <ShoppingBag className="size-4" />
                    </span>
                )}
            </button>
        </div>
    );
}