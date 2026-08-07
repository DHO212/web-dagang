"use client";

import Link from "next/link";
import { Plus, Star } from "lucide-react";

import { cn, formatRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/useCartStore";

export interface ProductCardData {
    id: string;
    name: string;
    slug: string;
    price: number;
    stock: number;
    images: string[];
    categoryName?: string;
}

const PLACEHOLDER_IMAGE =
    "https://placehold.co/400x400/png?text=Product";

export function ProductCard({ product }: { product: ProductCardData }) {
    const addToCart = useCartStore((s) => s.addToCart);
    const imageUrl = product.images[0] || PLACEHOLDER_IMAGE;
    const isOutOfStock = product.stock <= 0;
    const isLowStock = product.stock > 0 && product.stock <= 5;

    const handleAddToCart = () => {
        try {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: imageUrl,
            });
        } catch (error) {
            console.error("Gagal menambahkan ke keranjang:", error);
        }
    };

    return (
        <div
            className={cn(
                "group rounded-[2rem] bg-secondary/50 p-1.5 ring-1 ring-border/50",
                "transition-all duration-700 ease-out-expo",
                "hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(28,25,23,0.12)]"
            )}
        >
            {/* Inner core — concentric radius */}
            <div className="flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                {/* Image */}
                <Link
                    href={`/product/${product.slug}`}
                    className="relative block aspect-square overflow-hidden bg-muted"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageUrl}
                        alt={product.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                    />
                    {/* Badge stok */}
                    <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                        {isOutOfStock && (
                            <Badge variant="destructive">Habis</Badge>
                        )}
                        {isLowStock && (
                            <Badge variant="accent">
                                Sisa {product.stock}
                            </Badge>
                        )}
                    </div>
                </Link>

                {/* Body */}
                <div className="flex flex-1 flex-col gap-2 p-5">
                    {product.categoryName && (
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            {product.categoryName}
                        </span>
                    )}

                    <Link
                        href={`/product/${product.slug}`}
                        className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight transition-colors duration-300 hover:text-accent"
                    >
                        {product.name}
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-medium text-foreground">4.8</span>
                        <span>(120)</span>
                    </div>

                    {/* Price + CTA */}
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                        <span className="text-base font-semibold tracking-tight">
                            {formatRupiah(product.price)}
                        </span>

                        {/* Button-in-button nested icon */}
                        <button
                            type="button"
                            disabled={isOutOfStock}
                            onClick={handleAddToCart}
                            aria-label={`Tambah ${product.name} ke keranjang`}
                            className={cn(
                                "group/btn flex h-9 items-center gap-1.5 rounded-full bg-primary pl-4 pr-1.5 text-xs font-medium text-primary-foreground",
                                "transition-all duration-500 ease-out-expo active:scale-[0.96]",
                                "disabled:pointer-events-none disabled:opacity-40"
                            )}
                        >
                            + Keranjang
                            <span className="flex size-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-out-expo group-hover/btn:scale-105">
                                <Plus className="size-3.5" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}