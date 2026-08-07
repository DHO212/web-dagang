import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock, MapPin, User } from "lucide-react";
import type { Order, OrderItem, Product } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

type OrderWithItems = Order & {
    orderItems: (OrderItem & { product: Product })[];
};

interface OrderSuccessPageProps {
    params: Promise<{ id: string }>;
}

export default async function OrderSuccessPage({
    params,
}: OrderSuccessPageProps) {
    const { id } = await params;

    let order: OrderWithItems | null = null;
    try {
        order = await prisma.order.findUnique({
            where: { id },
            include: {
                orderItems: { include: { product: true } },
            },
        });
    } catch (error) {
        console.error("[OrderSuccessPage] Gagal mengambil pesanan:", error);
    }

    if (!order) notFound();

    const statusLabel: Record<string, string> = {
        PENDING: "Menunggu Pembayaran",
        PAID: "Sudah Dibayar",
        SHIPPED: "Sedang Dikirim",
        COMPLETED: "Selesai",
        CANCELLED: "Dibatalkan",
    };

    return (
        <div className="mx-auto w-full max-w-3xl px-4 py-24 md:py-32">
            {/* Header sukses */}
            <div className="flex flex-col items-center text-center">
                <div className="flex size-20 items-center justify-center rounded-[2rem] bg-emerald-50 ring-1 ring-emerald-200">
                    <CheckCircle2 className="size-9 text-emerald-600" />
                </div>
                <h1 className="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">
                    Pesanan Berhasil Dibuat!
                </h1>
                <p className="mt-3 max-w-md text-muted-foreground">
                    Terima kasih, <strong>{order.customerName}</strong>. Pesanan
                    Anda sudah kami terima dan sedang menunggu pembayaran.
                </p>

                {/* Order ID + Status */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <span className="rounded-full bg-secondary/70 px-4 py-1.5 font-mono text-xs text-muted-foreground ring-1 ring-border/50">
                        ID: {order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-medium text-amber-800 ring-1 ring-amber-200">
                        <Clock className="size-3.5" />
                        {statusLabel[order.status] ?? order.status}
                    </span>
                </div>
            </div>

            {/* Detail Pesanan */}
            <div className="mt-12 rounded-[2rem] bg-secondary/40 p-2.5 ring-1 ring-border/40">
                <div className="rounded-[calc(2rem-0.625rem)] bg-card p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] md:p-8">
                    <h2 className="text-lg font-semibold tracking-tight">
                        Rincian Pesanan
                    </h2>

                    {/* Info pengiriman */}
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-start gap-3 rounded-2xl bg-secondary/40 p-4">
                            <User className="mt-0.5 size-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Penerima</p>
                                <p className="mt-0.5 text-sm font-medium">
                                    {order.customerName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {order.customerEmail}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-2xl bg-secondary/40 p-4">
                            <MapPin className="mt-0.5 size-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Alamat Pengiriman
                                </p>
                                <p className="mt-0.5 text-sm font-medium leading-snug">
                                    {order.shippingAddress}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Item list */}
                    <ul className="mt-6 flex flex-col gap-3">
                        {order.orderItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center gap-3 rounded-2xl bg-secondary/30 p-3"
                            >
                                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                                    <Image
                                        src={
                                            item.product.images[0] ??
                                            "https://placehold.co/400x400/png?text=Product"
                                        }
                                        alt={item.product.name}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="line-clamp-1 text-sm font-medium">
                                        {item.product.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {item.quantity} × {formatRupiah(item.price)}
                                    </p>
                                </div>
                                <p className="text-sm font-semibold tabular-nums">
                                    {formatRupiah(item.price * item.quantity)}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="my-5 border-t border-border/50" />

                    {/* Total */}
                    <div className="flex items-center justify-between">
                        <span className="text-base font-semibold">Total Pembayaran</span>
                        <span className="text-2xl font-bold tracking-tight text-accent">
                            {formatRupiah(order.totalAmount)}
                        </span>
                    </div>

                    <p className="mt-2 text-xs text-muted-foreground">
                        *Total belum termasuk pajak & ongkos kirim. Rincian
                        final akan dikirim ke email Anda.
                    </p>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex justify-center">
                <Link
                    href="/"
                    className="group flex h-12 items-center gap-3 rounded-full bg-primary pl-6 pr-1.5 text-sm font-medium text-primary-foreground transition-all duration-500 active:scale-[0.98]"
                >
                    Kembali Berbelanja
                    <span className="flex size-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1">
                        <ArrowRight className="size-4" />
                    </span>
                </Link>
            </div>
        </div>
    );
}