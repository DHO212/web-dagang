import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLACEHOLDER_IMG = (name: string) =>
    `https://placehold.co/400x400/png?text=${encodeURIComponent(name)}`;

const categories = [
    { name: "Elektronik", slug: "elektronik" },
    { name: "Fashion", slug: "fashion" },
    { name: "Makanan & Minuman", slug: "makanan-minuman" },
    { name: "Kesehatan & Kecantikan", slug: "kesehatan-kecantikan" },
    { name: "Rumah Tangga", slug: "rumah-tangga" },
];

const products = [
    // Elektronik (3)
    {
        name: "Wireless Bluetooth Earbuds Pro",
        slug: "wireless-bluetooth-earbuds-pro",
        description:
            "Earbuds nirkabel dengan noise cancellation aktif, baterai 30 jam, dan driver Hi-Fi 11mm. Cocok untuk musik, panggilan, dan olahraga.",
        price: 349000,
        stock: 45,
        images: [PLACEHOLDER_IMG("Earbuds Pro")],
        categorySlug: "elektronik",
    },
    {
        name: "Smart Watch Series 5",
        slug: "smart-watch-series-5",
        description:
            "Jam tangan pintar dengan layar AMOLED 1.9 inci, GPS built-in, monitor detak jantung, SpO2, dan 100+ mode olahraga.",
        price: 1299000,
        stock: 20,
        images: [PLACEHOLDER_IMG("Smart Watch")],
        categorySlug: "elektronik",
    },
    {
        name: "Mechanical Keyboard RGB",
        slug: "mechanical-keyboard-rgb",
        description:
            "Keyboard mechanical dengan switch Gateron Brown, hot-swappable, RGB per-key, dan konektivitas Bluetooth + USB-C wired.",
        price: 549000,
        stock: 30,
        images: [PLACEHOLDER_IMG("Keyboard RGB")],
        categorySlug: "elektronik",
    },
    // Fashion (3)
    {
        name: "Kaos Polos Premium Cotton",
        slug: "kaos-polos-premium-cotton",
        description:
            "Kaos polos bahan combed 30s, jahitan rantai, tersedia dalam 8 warna. Nyaman dipakai sehari-hari, tidak mudah melar.",
        price: 89000,
        stock: 100,
        images: [PLACEHOLDER_IMG("Kaos Premium")],
        categorySlug: "fashion",
    },
    {
        name: "Celana Chino Slim Fit",
        slug: "celana-chino-slim-fit",
        description:
            "Celana chino bahan katun stretch, potongan slim fit modern, tersedia ukuran 28-38. Cocok untuk kasual maupun semi-formal.",
        price: 189000,
        stock: 60,
        images: [PLACEHOLDER_IMG("Celana Chino")],
        categorySlug: "fashion",
    },
    {
        name: "Hoodie Oversized Unisex",
        slug: "hoodie-oversized-unisex",
        description:
            "Hoodie oversized bahan fleece 280gsm, ribbed cuff dan hem, kantong kangaroo. Desain minimalis cocok untuk layering.",
        price: 259000,
        stock: 40,
        images: [PLACEHOLDER_IMG("Hoodie")],
        categorySlug: "fashion",
    },
    // Makanan & Minuman (2)
    {
        name: "Kopi Arabica Gayo 250g",
        slug: "kopi-arabica-gayo-250g",
        description:
            "Biji kopi arabica single origin dari dataran tinggi Gayo, Aceh. Roasting medium, notes cokelat, karamel, dan citrus.",
        price: 95000,
        stock: 80,
        images: [PLACEHOLDER_IMG("Kopi Gayo")],
        categorySlug: "makanan-minuman",
    },
    {
        name: "Madu Hutan Murni 500ml",
        slug: "madu-hutan-murni-500ml",
        description:
            "Madu hutan asli tanpa campuran, dipanen langsung dari lebah liar hutan Sumatera. Kental, manis alami, tanpa pengawet.",
        price: 135000,
        stock: 50,
        images: [PLACEHOLDER_IMG("Madu Hutan")],
        categorySlug: "makanan-minuman",
    },
    // Kesehatan & Kecantikan (2)
    {
        name: "Serum Vitamin C 20%",
        slug: "serum-vitamin-c-20",
        description:
            "Serum wajah dengan 20% Vitamin C (Ethyl Ascorbic Acid), membantu mencerahkan, meratakan warna kulit, dan memudarkan bekas jerawat.",
        price: 175000,
        stock: 70,
        images: [PLACEHOLDER_IMG("Serum Vit C")],
        categorySlug: "kesehatan-kecantikan",
    },
    {
        name: "Masker Clay Detox 100g",
        slug: "masker-clay-detox-100g",
        description:
            "Masker wajah dengan kaolin clay dan charcoal, membantu mengangkat kotoran, minyak berlebih, dan membersihkan pori-pori.",
        price: 85000,
        stock: 90,
        images: [PLACEHOLDER_IMG("Masker Clay")],
        categorySlug: "kesehatan-kecantikan",
    },
    // Rumah Tangga (2)
    {
        name: "Set Panci Stainless Steel 5pcs",
        slug: "set-panci-stainless-5pcs",
        description:
            "Set panci stainless steel 304 food-grade, termasuk 3 ukuran panci, 1 wajan, dan 1 tutup kaca. Anti lengket, tahan lama.",
        price: 549000,
        stock: 25,
        images: [PLACEHOLDER_IMG("Set Panci")],
        categorySlug: "rumah-tangga",
    },
    {
        name: "Lampu Meja LED Minimalis",
        slug: "lampu-meja-led-minimalis",
        description:
            "Lampu meja LED dengan 3 mode warna (warm, natural, cool), tingkat kecerahan adjustable, dan desain modern minimalis.",
        price: 199000,
        stock: 55,
        images: [PLACEHOLDER_IMG("Lampu LED")],
        categorySlug: "rumah-tangga",
    },
];

async function main() {
    console.log("🌱 Mulai seeding database...");

    // Hapus data lama (reset)
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    console.log("🗑️  Data lama dihapus.");

    // Buat kategori
    const categoryMap = new Map<string, string>();
    for (const cat of categories) {
        const created = await prisma.category.create({
            data: cat,
        });
        categoryMap.set(cat.slug, created.id);
        console.log(`✅ Kategori dibuat: ${created.name}`);
    }

    // Buat produk
    for (const product of products) {
        const { categorySlug, ...productData } = product;
        const categoryId = categoryMap.get(categorySlug);
        if (!categoryId) {
            throw new Error(`Kategori "${categorySlug}" tidak ditemukan.`);
        }
        await prisma.product.create({
            data: {
                ...productData,
                categoryId,
            },
        });
        console.log(`✅ Produk dibuat: ${product.name}`);
    }

    const totalCategories = await prisma.category.count();
    const totalProducts = await prisma.product.count();
    console.log(
        `\n🎉 Seeding selesai! ${totalCategories} kategori, ${totalProducts} produk.`
    );
}

main()
    .catch((e) => {
        console.error("❌ Error saat seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });