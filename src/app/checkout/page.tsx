"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ArrowLeft,
    ArrowRight,
    Banknote,
    CreditCard,
    Loader2,
    ShoppingBag,
    Wallet,
} from "lucide-react";

import { createOrder } from "@/actions/order";
import {
    checkoutSchema,
    type CheckoutFormValues,
} from "@/lib/validations/checkout";
import { formatRupiah } from "@/lib/utils";
import {
    SHIPPING_COST,
    TAX_RATE,
    useCartStore,
} from "@/store/useCartStore";

const PAYMENT_METHODS = [
    {
        value: "BANK_TRANSFER",
        label: "Transfer Bank",
        description: "BCA, Mandiri, BNI",
        icon: CreditCard,
    },
    {
        value: "E_WALLET",
        label: "E-Wallet",
        description: "GoPay, OVO, DANA",
        icon: Wallet,
    },
    {
        value: "COD",
        label: "COD",
        description: "Bayar di tempat",
        icon: Banknote,
    },
] as const;

export default function CheckoutPage() {
    const router = useRouter();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    const items = useCartStore((s) => s.items);
    const clearCart = useCartStore((s) => s.clearCart);

    const [serverError, setServerError] = React.useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: { paymentMethod: "BANK_TRANSFER" },
    });

    const selectedPayment = watch("paymentMethod");

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax + SHIPPING_COST;

    async function onSubmit(data: CheckoutFormValues) {
        setServerError(null);
        try {
            const result = await createOrder(data, items);
            if (result.success) {
                clearCart();
                router.push(`/order-success/${result.orderId}`);
            } else {
                setServerError(result.error);
            }
        } catch (error) {
            console.error("[CheckoutPage] onSubmit error:", error);
            setServerError("Terjadi kesalahan tak terduga. Silakan coba lagi.");
        }
    }

    if (!mounted) {
        return (
            <div className="mx-auto w-full max-w-7xl px-4 py-24 md:py-32">
                <div className="h-8 w-48 animate-pulse rounded-full bg-secondary" />
                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
                    <div className="h-96 animate-pulse rounded-[2rem] bg-secondary/60 lg:col-span-3" />
                    <div className="h-96 animate-pulse rounded-[2rem] bg-secondary/60 lg:col-span-2" />
                </div>
            </div>
        );
    }

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
                    Tambahkan produk ke keranjang sebelum melakukan checkout.
                </p>
                <Link
                    href="/#katalog"
                    className="group mt-8 flex h-11 items-center gap-3 rounded-full bg-primary pl-6 pr-1.5 text-sm font-medium text-primary-foreground transition-all duration-500 active:scale-[0.98]"
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
            <Link
                href="/cart"
                className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Kembali ke Keranjang
            </Link>

            <div>
                <span className="inline-block rounded-full bg-secondary/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground ring-1 ring-border/50">
                    Checkout
                </span>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                    Informasi Pengiriman
                </h1>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5"
            >
                {/* ===== Form Pengiriman ===== */}
                <div className="lg:col-span-3">
                    <div className="rounded-[2rem] bg-secondary/40 p-2.5 ring-1 ring-border/40">
                        <div className="flex flex-col gap-5 rounded-[calc(2rem-0.625rem)] bg-card p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] md:p-8">
                            <FormField
                                label="Nama Lengkap"
                                error={errors.customerName?.message}
                            >
                                <input
                                    {...register("customerName")}
                                    placeholder="cth: Budi Santoso"
                                    className={inputClass(!!errors.customerName)}
                                />
                            </FormField>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <FormField
                                    label="Email"
                                    error={errors.customerEmail?.message}
                                >
                                    <input
                                        {...register("customerEmail")}
                                        type="email"
                                        placeholder="budi@email.com"
                                        className={inputClass(!!errors.customerEmail)}
                                    />
                                </FormField>
                                <FormField
                                    label="No. Telepon"
                                    error={errors.customerPhone?.message}
                                >
                                    <input
                                        {...register("customerPhone")}
                                        placeholder="081234567890"
                                        className={inputClass(!!errors.customerPhone)}
                                    />
                                </FormField>
                            </div>

                            <FormField
                                label="Alamat Lengkap"
                                error={errors.address?.message}
                            >
                                <textarea
                                    {...register("address")}
                                    rows={3}
                                    placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                                    className={`${inputClass(!!errors.address)} resize-none`}
                                />
                            </FormField>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <FormField label="Kota" error={errors.city?.message}>
                                    <input
                                        {...register("city")}
                                        placeholder="Jakarta Selatan"
                                        className={inputClass(!!errors.city)}
                                    />
                                </FormField>
                                <FormField
                                    label="Kode Pos"
                                    error={errors.postalCode?.message}
                                >
                                    <input
                                        {...register("postalCode")}
                                        placeholder="12345"
                                        inputMode="numeric"
                                        maxLength={5}
                                        className={inputClass(!!errors.postalCode)}
                                    />
                                </FormField>
                            </div>

                            {/* Metode Pembayaran */}
                            <fieldset>
                                <legend className="text-sm font-medium">
                                    Metode Pembayaran
                                </legend>
                                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    {PAYMENT_METHODS.map((method) => {
                                        const Icon = method.icon;
                                        const isActive = selectedPayment === method.value;
                                        return (
                                            <button
                                                key={method.value}
                                                type="button"
                                                onClick={() =>
                                                    setValue("paymentMethod", method.value, {
                                                        shouldValidate: true,
                                                    })
                                                }
                                                className={`flex flex-col items-start gap-2 rounded-2xl p-4 text-left ring-1 transition-all duration-300 ${isActive
                                                        ? "bg-primary/5 ring-2 ring-primary"
                                                        : "bg-secondary/40 ring-border/40 hover:ring-border"
                                                    }`}
                                            >
                                                <Icon
                                                    className={`size-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                                                />
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {method.label}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {method.description}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.paymentMethod && (
                                    <p className="mt-2 text-xs text-destructive">
                                        {errors.paymentMethod.message}
                                    </p>
                                )}
                            </fieldset>
                        </div>
                    </div>
                </div>

                {/* ===== Ringkasan Pesanan ===== */}
                <aside className="lg:col-span-2">
                    <div className="h-fit rounded-[2rem] bg-secondary/40 p-2.5 ring-1 ring-border/40 lg:sticky lg:top-24">
                        <div className="rounded-[calc(2rem-0.625rem)] bg-card p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                            <h2 className="text-lg font-semibold tracking-tight">
                                Ringkasan Pesanan
                            </h2>

                            {/* Item list */}
                            <ul className="mt-5 flex max-h-56 flex-col gap-3 overflow-y-auto pr-1">
                                {items.map((item) => (
                                    <li key={item.id} className="flex items-center gap-3">
                                        <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="line-clamp-1 text-xs font-medium">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {item.quantity} × {formatRupiah(item.price)}
                                            </p>
                                        </div>
                                        <p className="text-xs font-semibold tabular-nums">
                                            {formatRupiah(item.price * item.quantity)}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                            <div className="my-5 border-t border-border/50" />

                            <dl className="flex flex-col gap-2.5 text-sm">
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

                            {/* Server error toast */}
                            {serverError && (
                                <div className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-xs font-medium text-destructive">
                                    {serverError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-full bg-primary pl-6 pr-1.5 text-sm font-medium text-primary-foreground transition-all duration-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        Memproses…
                                    </>
                                ) : (
                                    <>
                                        Bayar Sekarang — {formatRupiah(total)}
                                        <span className="flex size-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1">
                                            <ArrowRight className="size-4" />
                                        </span>
                                    </>
                                )}
                            </button>

                            <p className="mt-3 text-center text-[11px] text-muted-foreground">
                                Dengan membayar, Anda menyetujui Syarat & Ketentuan kami.
                            </p>
                        </div>
                    </div>
                </aside>
            </form>
        </div>
    );
}

/* ---------- Helper Components ---------- */

function FormField({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">{label}</label>
            {children}
            {error && <p className="text-xs text-destructive">{error}</p>}
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

function inputClass(hasError: boolean): string {
    return `w-full rounded-xl bg-secondary/40 px-4 py-2.5 text-sm outline-none ring-1 transition-all duration-300 placeholder:text-muted-foreground/60 focus:ring-2 ${hasError
            ? "ring-destructive focus:ring-destructive"
            : "ring-border/40 focus:ring-primary/50"
        }`;
}