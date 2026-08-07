"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import {
    useCartStore,
    SHIPPING_COST,
    TAX_RATE,
} from "@/store/useCartStore";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
    const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal } =
        useCartStore();

    const sub = subtotal();
    const tax = Math.round(sub * TAX_RATE);
    const shipping = items.length > 0 ? SHIPPING_COST : 0;
    const total = sub + tax + shipping;

    return (
        <>
            {/* Backdrop */}
            <div
                aria-hidden
                onClick={closeCart}
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
            />

            {/* Panel */}
            <aside
                role="dialog"
                aria-label="Keranjang belanja"
                className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-[0_0_60px_rgba(28,25,23,0.15)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-stone-200/80 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100">
                            <ShoppingBag className="h-4 w-4 text-stone-700" strokeWidth={1.75} />
                        </span>
                        <h2 className="text-lg font-semibold tracking-tight text-stone-900">
                            Keranjang
                        </h2>
                    </div>
                    <button
                        onClick={closeCart}
                        aria-label="Tutup keranjang"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors duration-300 hover:bg-stone-200"
                    >
                        <X className="h-4 w-4" strokeWidth={1.75} />
                    </button>
                </div>

                {/* Body */}
                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100">
                            <ShoppingBag className="h-6 w-6 text-stone-400" strokeWidth={1.5} />
                        </span>
                        <p className="text-sm font-medium text-stone-900">
                            Keranjang kamu kosong
                        </p>
                        <p className="text-sm text-stone-500">
                            Jelajahi katalog dan temukan produk favoritmu.
                        </p>
                        <Button variant="outline" className="mt-2" onClick={closeCart}>
                            Mulai Belanja
                        </Button>
                    </div>
                ) : (
                    <>
                        <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                            {items.map((item) => (
                                <li key={item.id} className="flex gap-4">
                                    {/* Image - double bezel */}
                                    <div className="shrink-0 rounded-2xl bg-stone-100 p-1 ring-1 ring-stone-900/5">
                                        <div className="relative h-20 w-20 overflow-hidden rounded-[calc(1rem-0.25rem)] bg-white">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="80px"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-1 flex-col">
                                        <p className="line-clamp-2 text-sm font-medium text-stone-900">
                                            {item.name}
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-terracotta-600">
                                            {formatRupiah(item.price)}
                                        </p>

                                        {/* Qty controls */}
                                        <div className="mt-auto flex items-center gap-3 pt-2">
                                            <div className="flex items-center rounded-full bg-stone-100 p-1">
                                                <button
                                                    aria-label="Kurangi"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-stone-600 shadow-sm transition-transform duration-200 active:scale-90"
                                                >
                                                    <Minus className="h-3.5 w-3.5" strokeWidth={1.75} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium tabular-nums text-stone-900">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    aria-label="Tambah"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-stone-600 shadow-sm transition-transform duration-200 active:scale-90"
                                                >
                                                    <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
                                                </button>
                                            </div>
                                            <button
                                                aria-label="Hapus item"
                                                onClick={() => removeFromCart(item.id)}
                                                className="flex h-7 w-7 items-center justify-center rounded-full text-stone-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Summary */}
                        <div className="space-y-3 border-t border-stone-200/80 bg-stone-50/80 px-6 py-6">
                            <div className="flex justify-between text-sm text-stone-600">
                                <span>Subtotal</span>
                                <span className="tabular-nums">{formatRupiah(sub)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-stone-600">
                                <span>Pajak (11%)</span>
                                <span className="tabular-nums">{formatRupiah(tax)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-stone-600">
                                <span>Ongkir</span>
                                <span className="tabular-nums">{formatRupiah(shipping)}</span>
                            </div>
                            <div className="flex justify-between border-t border-stone-200/80 pt-3 text-base font-semibold text-stone-900">
                                <span>Total</span>
                                <span className="tabular-nums">{formatRupiah(total)}</span>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" className="flex-1" asChild>
                                    <Link href="/cart" onClick={closeCart}>
                                        Lihat Keranjang
                                    </Link>
                                </Button>
                                <Button className="group flex-1" asChild>
                                    <Link href="/checkout" onClick={closeCart}>
                                        Checkout
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                                            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                                        </span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
}