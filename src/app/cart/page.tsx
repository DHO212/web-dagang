"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { formatRupiah } from "@/lib/utils";
import {
    SHIPPING_COST,
    TAX_RATE,
    useCartStore,
} from "@/store/useCartStore";

export default function CartPage() {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    const items = useCartStore((s) => s.items);
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const removeFromCart = useCartStore((s) => s.removeFromCart);
    const clearCart = useCartStore((s) => s.clearCart);

    if (!mounted) {
        return (
            <div className="mx-auto w-full max-w-7xl px-4 py-24 md:py-32">
                <div className="h-8 w-48 animate-pulse rounded-full bg-secondary" />
                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="h-64 animate-pulse rounded-[2rem] bg-secondary/60 lg:col-span-2" />
                    <div className="h-64 animate-pulse rounded-[2rem] bg-secondary/60" />
                </div>
            </div>
        );
    }

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax + SHIPPING_COST;

    if (items.length === 0) {
        return (
            <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-24 text-center md:py-32">
                <div className="flex size-20 items-center justify-center rounded-[2rem] bg-secondary/60 ring-1 ring-border/50">
                    <ShoppingBag className="size-8 text-muted-foreground" />
                </div>
                <h1 className="mt-8 text-2xl font-semibold tracking-tight md:text-3xl">
                    Keranjang Anda kosong
                </h1>
                <p className="mt-3 text-muted-foreground">
                    Jelajahi katalog kami dan temukan produk favorit Anda.
                </p>
                <Link
                    href="/#katalog"
                    className="group mt-8 flex h-11 items-center gap-3 rounded-full bg-primary pl-6 pr-1.5 text-sm font-medium text-primary-foreground transition-all duration-500 ease-out-expo active:scale-[0.98]"
                >
                    Mulai Belanja
                    <span className="flex size-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1">
                        <ArrowRight className="size-4" />
                    </span>
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-24 md:py-32">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <span className="inline-block rounded-full bg-secondary/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground ring-1 ring-border/50">
                        Keranjang
                    </span>
                    <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                        Keranjang Belanja
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {items.length} item di keranjang Anda
                    </p>
                </div>
                <button
                    type="button"
                    onClick={clearCart}
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-destructive transition-colors duration-300 hover:bg-destructive/10"
                >
                    <Trash2 className="size-3.5" />
                    Kosongkan
                </button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* ===== Daftar Item ===== */}
                <ul className="flex flex-col gap-4 lg:col-span-2">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className="rounded-[2rem] bg-card p-2.5 ring-1 ring-border/40"
                        >
                            <div className="flex flex-wrap items-center gap-4 rounded-[calc(2rem-0.625rem)] bg-secondary/30 p-3 sm:flex-nowrap">
                                {/* Thumbnail */}
                                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="min-w-0 flex-1">
                                    <p className="line-clamp-2 text-sm font-medium leading-snug">
                                        {item.name}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-accent">
                                        {formatRupiah(item.price)}
                                    </p>
                                </div>

                                {/* Stepper */}
                                <div className="flex items-center gap-1 rounded-full bg-card p-1 ring-1 ring-border/50">
                                    <button
                                        type="button"
                                        aria-label="Kurangi"
                                        onClick={() =>
                                            updateQuantity(item.id, item.quantity - 1)
                                        }
                                        className="flex size-8 items-center justify-center rounded-full transition-colors duration-300 hover:bg-secondary"
                                    >
                                        <Minus className="size-3.5" />
                                    </button>
                                    <span className="w-8 text-center text-sm font-semibold tabular-nums">
                                        {item.quantity}
                                    </span>
                                    <button
                                        type="button"
                                        aria-label="Tambah"
                                        onClick={() =>
                                            updateQuantity(item.id, item.quantity + 1)
                                        }
                                        className="flex size-8 items-center justify-center rounded-full transition-colors duration-300 hover:bg-secondary"
                                    >
                                        <Plus className="size-3.5" />
                                    </button>
                                </div>

                                {/* Hapus */}
                                <button
                                    type="button"
                                    aria-label="Hapus item"
                                    onClick={() => removeFromCart(item.id)}
                                    className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:bg-destructive/10 hover:text-destructive"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* ===== Ringkasan Pesanan — Double Bezel ===== */}
                <aside className="h-fit rounded-[2rem] bg-secondary/40 p-2.5 ring-1 ring-border/40 lg:sticky lg:top-24">
                    <div className="rounded-[calc(2rem-0.625rem)] bg-card p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                        <h2 className="text-lg font-semibold tracking-tight">
                            Ringkasan Pesanan
                        </h2>

                        <dl className="mt-6 flex flex-col gap-3 text-sm">
                            <SummaryRow label="Subtotal" value={formatRupiah(subtotal)} />
                            <SummaryRow label="Pajak (11%)" value={formatRupiah(tax)} />
                            <SummaryRow
                                label="Estimasi Ongkir"
                                value={formatRupiah(SHIPPING_COST)}
                            />
                            <div className="my-2 border-t border-border/50" />
                            <div className="flex items-center justify-between">
                                <dt className="text-base font-semibold">Total</dt>
                                <dd className="text-xl font-bold tracking-tight text-accent">
                                    {formatRupiah(total)}
                                </dd>
                            </div>
                        </dl>

                        <Link
                            href="/checkout"
                            className="group mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-full bg-primary pl-6 pr-1.5 text-sm font-medium text-primary-foreground transition-all duration-500 ease-out-expo active:scale-[0.98]"
                        >
                            Lanjut ke Checkout
                            <span className="flex size-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1">
                                <ArrowRight className="size-4" />
                            </span>
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="font-medium tabular-nums">{value}</dd>
        </div>
    );
}