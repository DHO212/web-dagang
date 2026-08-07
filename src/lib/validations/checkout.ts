import { z } from "zod";

export const checkoutSchema = z.object({
    customerName: z
        .string()
        .min(3, "Nama lengkap minimal 3 karakter")
        .max(100, "Nama terlalu panjang"),
    customerEmail: z.string().email("Format email tidak valid"),
    customerPhone: z
        .string()
        .min(10, "Nomor telepon minimal 10 digit")
        .max(15, "Nomor telepon maksimal 15 digit")
        .regex(/^[0-9+\-\s]+$/, "Nomor telepon hanya boleh berisi angka"),
    address: z
        .string()
        .min(10, "Alamat lengkap minimal 10 karakter")
        .max(500, "Alamat terlalu panjang"),
    city: z.string().min(3, "Kota minimal 3 karakter").max(100),
    postalCode: z
        .string()
        .length(5, "Kode pos harus 5 digit")
        .regex(/^[0-9]+$/, "Kode pos hanya boleh angka"),
    paymentMethod: z.enum(["BANK_TRANSFER", "COD", "E_WALLET"], {
        message: "Pilih metode pembayaran",
    }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;