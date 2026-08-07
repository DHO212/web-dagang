"use server";

import { prisma } from "@/lib/prisma";
import {
    checkoutSchema,
    type CheckoutFormValues,
} from "@/lib/validations/checkout";
import type { CartItem } from "@/store/useCartStore";

type CreateOrderResult =
    | { success: true; orderId: string }
    | { success: false; error: string };

export async function createOrder(
    formData: CheckoutFormValues,
    cartItems: CartItem[]
): Promise<CreateOrderResult> {
    try {
        // 1. Validasi ulang di server (jangan percaya data client)
        const parsed = checkoutSchema.safeParse(formData);
        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.issues[0]?.message ?? "Data tidak valid",
            };
        }

        if (cartItems.length === 0) {
            return { success: false, error: "Keranjang belanja kosong" };
        }

        // 2. Ambil harga aktual dari database (anti manipulasi harga)
        const productIds = cartItems.map((item) => item.id);
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
        });

        if (products.length !== productIds.length) {
            return {
                success: false,
                error: "Beberapa produk tidak ditemukan di database",
            };
        }

        const priceMap = new Map(products.map((p) => [p.id, p.price]));

        // 3. Hitung total dari harga server-side
        const totalAmount = cartItems.reduce((sum, item) => {
            const serverPrice = priceMap.get(item.id) ?? item.price;
            return sum + serverPrice * item.quantity;
        }, 0);

        // 4. Buat order + order items dalam satu transaksi
        const order = await prisma.order.create({
            data: {
                customerName: parsed.data.customerName,
                customerEmail: parsed.data.customerEmail,
                shippingAddress: `${parsed.data.address}, ${parsed.data.city}, ${parsed.data.postalCode}`,
                totalAmount,
                status: "PENDING",
                orderItems: {
                    create: cartItems.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: priceMap.get(item.id) ?? item.price,
                    })),
                },
            },
        });

        return { success: true, orderId: order.id };
    } catch (error) {
        console.error("[createOrder] Gagal membuat pesanan:", error);
        return {
            success: false,
            error: "Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.",
        };
    }
}